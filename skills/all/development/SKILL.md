---
name: retro-daya-website
description: "Retro Daya Engineering static site — conventions, patterns, and workflows for the WordPress-site-to-static migration and ongoing edits."
risk: safe
date_added: "2026-05-26"
---

# Retro Daya Engineering Website

Static site at `/var/www/retrodaya/` — no build step, plain HTML/CSS/JS.

## Directory Structure
```
/var/www/retrodaya/
  index.html          # Homepage
  about.html          # About page
  services.html       # Services + gallery
  project.html        # Projects + project gallery
  product.html        # Products + product gallery
  contact.html        # Contact page
  styles.css          # Main stylesheet
  app.js              # Navigation, gallery, lightbox, filter JS
  images/
    products/        # Product images (oil-and-gas.png, mining.png, etc.)
    services/        # Service/work images
    projects/        # On-site project photos
```

## Image Naming Conventions
Downloaded from live WordPress site → rename to clean names:
- Products: `images/products/gallery/compro-rde-eaton-*.png`, `images/products/gallery/retrofit-solutions_page_*.png`
  (**Note:** These are the actual WP product images — Eaton Compro + Retrofit Solutions. Don't overwrite with generic industry icons.)
- Services: same naming as products (industry categories)
- Projects: descriptive names like `pembangkit-listrik-jawa-bali-paiton.jpg`, `pltu_suralaya.jpg`

## Gallery Pattern (reusable across pages)
Each page (services, project, product) uses this structure:

```html
<!-- Gallery section -->
<section class="gallery-section" id="gallery">
  <div class="container">
    <div class="section-header">
      <div class="section-tag">Section Tag</div>
      <h2 class="section-title">Title<br>Two Lines</h2>
      <p class="section-sub">Subtitle description.</p>
    </div>

    <!-- Filter tabs -->
    <div class="gallery-filter">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="manufacturing">Manufacturing</button>
      <button class="filter-btn" data-filter="onsite">On-Site</button>
      <button class="filter-btn" data-filter="commissioning">Commissioning</button>
    </div>

    <!-- Gallery grid -->
    <div class="gallery-grid" id="service-gallery">
      <div class="gallery-item" data-filter="manufacturing">
        <img src="images/services/oil-and-gas.png" alt="Oil & Gas" loading="lazy">
        <div class="gallery-overlay"><span>Oil & Gas</span></div>
      </div>
      <!-- more items -->
    </div>
  </div>
</section>

<!-- Lightbox modal -->
<div class="lightbox" id="lightbox" aria-hidden="true">
  <button class="lightbox-close" aria-label="Close">&times;</button>
  <button class="lightbox-prev" aria-label="Previous">&#8249;</button>
  <button class="lightbox-next" aria-label="Next">&#8250;</button>
  <div class="lightbox-content">
    <img src="" alt="" id="lightbox-img">
    <p class="lightbox-caption" id="lightbox-caption"></p>
  </div>
</div>
```

Required CSS (add in page `<style>` block):
- `.gallery-section`, `.gallery-filter`, `.filter-btn`, `.gallery-grid`, `.gallery-item`, `.gallery-overlay`
- `.lightbox`, `.lightbox-open`, `.lightbox-close`, `.lightbox-prev`, `.lightbox-next`, `.lightbox-content`, `.lightbox-caption`

Required JS (in `app.js`):
- Filter logic: toggle `.active` on buttons, show/hide `.gallery-item` by `data-filter`
- Lightbox: open on click, prev/next navigation, close on backdrop/keyboard

## Pulling Images from Live WordPress Site
```bash
# From https://retrodayaengineering.com/services/ → images/services/
curl -s -O "https://retrodayaengineering.com/wp-content/uploads/2025/06/oil-and-gas-1.png"
# Rename to clean name
mv oil-and-gas-1.png oil-and-gas.png
```

## Delivering Large Files via Telegram
Telegram caps at ~20MB per file. For zip files 20MB+:

```bash
mkdir -p /tmp/retrodaya-parts
split -b 20M /path/to/large.zip /tmp/retrodaya-parts/basename.
# Send each part with send_message MEDIA:/path/to/part.aa, part.ab, etc.
# Recipient merges: cat basename.* > original.zip
```

## CMS Backend (/var/www/retrodaya-admin/)
FastAPI + SQLite backend for inline content editing. Admin panel at **http://43.134.83.2:8081/admin/** — login: `admin` / `retrodaya2024`.

### Architecture
```
/var/www/retrodaya-admin/
  main.py              # FastAPI app — API + HTML sync + auth
  cms.db              # SQLite — stores all editable content
  start.sh            # Launcher (uvicorn)
  admin/index.html    # Vue3 SPA admin panel
```

Backend serves at port **8081**. `start.sh` launches it. No nginx — direct port access.

### How HTML Sync Works (CRITICAL — marker system)
The backend patches `/var/www/retrodaya/index.html` via HTML comment marker pairs. **Marker placement rules (non-negotiable):**
- Marker comment must be on the SAME LINE as the opening `<div>` — no newline before it
- `<!-- MARKER END -->` must be on the SAME LINE as the closing `</div>` of the grid — not on a separate line with intermediate `</div>` in between
- Use string `.find()` + `.replace()` for patching, NOT line-number-based splitting after splitting by `\n` — line positions drift easily in multi-section HTML

**Correct algorithm to add markers to newly-downloaded raw HTML:**
1. Find `open_pos = html.find('<div class="SECTION-GRID">')`
2. Find matching close using depth counter: `<div` = +1, `</div>` = -1
3. Insert `<!-- MARKER -->` IMMEDIATELY BEFORE the opening `<div>` tag (no newline)
4. Insert `<!-- MARKER END -->` IMMEDIATELY AFTER the closing `</div>` tag (no newline)

**⚠️ Duplicate marker bug:** When adding markers to HTML that already has them (e.g. re-downloaded from live site), the depth-counter scan resurfaces inner markers and causes double-insertion — produces `<!-- MARKER --><!-- MARKER -->` or `<!-- MARKER END --><!-- MARKER END -->`. Always verify with:
```bash
grep -n "MARKER\|MARKER END" /var/www/retrodaya/index.html
```
If duplicates exist, remove the extras manually with `patch` using unique context strings. No `replace_all` needed.

**Verify marker placement always before patching:**
```python
html = Path("/var/www/retrodaya/index.html").read_text()
s = html.find("<!-- STATS MARKER -->")
e = html.find("<!-- STATS MARKER END -->")
print(f"Before: {repr(html[s-30:s])}")
print(f"After-end: {repr(html[e:e+30])}")
```
If markers are on wrong lines (separate from target tags), `patch_html()` silently replaces wrong region → corrupted HTML. Restore from backup: `cp index.html.backup index.html`.

```html
<!-- SLIDES MARKER --><div class="slides">
  ...slide items...
</div>
<!-- SLIDES MARKER END -->

<!-- STATS MARKER --><div class="stats-row">
  ...stat items...
</div>
<!-- STATS MARKER END -->

<!-- SERVICES MARKER --><div class="services-grid">
  ...service cards...
</div>
<!-- SERVICES MARKER END -->

<!-- PROJECTS MARKER --><div class="projects-grid">
  ...project cards...
</div>
<!-- PROJECTS MARKER END -->
```

**Marker placement rules (non-negotiable):**
- Marker comment must be on the SAME LINE as the opening `<div>` — no newline before it
- `<!-- MARKER END -->` must be on the SAME LINE as the closing `</div>` of the grid — not on a separate line with intermediate `</div>` in between
- Use string `.replace()` for patching, NOT line-number-based splitting after splitting by `\n` — line positions become stale/drift easily in multi-section HTML
- Before editing HTML manually, always `cp index.html index.html.backup`

**Correct algorithm to add markers to raw HTML:**
1. Find `open_pos = html.find('<div class="SECTION-GRID">')`
2. Find matching close using depth counter: `<div` = +1, `</div>` = -1
3. Compute line numbers from character positions
4. Rebuild lines array — insert marker before opening div, marker-end after closing div

If markers are on wrong lines (separate from target tags), `patch_html()` silently replaces wrong region → corrupted HTML.

### Admin Panel Features
- Login with username/password
- Edit hero slides (add/edit/reorder), stats, services, projects, contact info
- Media upload/delete
- Saves to DB AND patches HTML file on same PUT request

### Starting the Backend
```bash
cd /var/www/retrodaya-admin
python3 -m uvicorn main:app --host 0.0.0.0 --port 8081 &
# Test:
curl http://localhost:8081/api/public/latest | python3 -c "import sys,json; print(list(json.load(sys.stdin).keys()))"
```

### Key Debugging: HTTP 500 on PUT /api/content/{section}/{id}
If PUT returns 500 but GET works, check these IN ORDER:
1. **Wrong variable in patch_html():** `text = f.read_text()` where `f` is not defined — should be `fpath.read_text()`. Classic typo. Always check log output for `NameError`.
2. **Auth mismatch:** Admin panel sends `Authorization: Bearer ***` as HTTP Header, NOT `?token=` query param. `require_auth` must use `Header(None)` and parse `Authorization[7:]`, NOT `Query(...)`.
3. **Marker placement:** Always verify marker positions with context check before patching.

```python
# Verify marker placement:
html = Path("/var/www/retrodaya/index.html").read_text()
s = html.find("<!-- STATS MARKER -->")
e = html.find("<!-- STATS MARKER END -->")
print(f"Before: {repr(html[s-30:s])}")
print(f"After-end: {repr(html[e:e+30])}")
```
Restore from backup if corrupted: `cp index.html.backup index.html`
4. **depth-counter algorithm for adding markers:** After re-downloading HTML from live site, markers must be re-added using depth-counter to find matching close tags — line-number splitting causes double-insertion bugs (markers added twice).
5. **Auth Header bug was root cause of 422:** When `require_auth` used `Query(...)` instead of `Header(None)`, every API call from the admin panel returned 422 (Unprocessable Entity) — the frontend was sending `Authorization` header but the backend expected query param.

## Image Path Fixes — All Pages At Once (2026-05-27)

When Erik reports "logo not showing" or "image blank/black" on production, systematically fix ALL pages:

### DirectAdmin `action=edit` SILENTLY FAILS for Large HTML Files
- API returns `error=0` but file does NOT change on disk
- Root cause: server-side text size limit silently truncates content beyond a threshold
- Symptom: `curl -sL "https://domain.com/index.html" | wc -c` — same byte count before AND after "successful" upload
- Mitigation: always verify actual production file size after every `action=edit` upload
- For large HTML files (37KB+): consider chunking or use browser File Manager drag-drop

### Logo fixes — all pages

### Logo fixes — all pages
All 6 pages must be patched simultaneously:
```
# OLD (broken — 389-byte corrupt PNG):
wp-content/uploads/2025/06/logo-retro-long_white-scaled.png
# NEW (valid — 10KB real JPEG):
images/logo-retro-long-white.jpeg
```
Fix with:
```python
import urllib.request, urllib.parse
pages = ['index.html', 'about.html', 'services.html', 'product.html', 'contact.html', 'project.html']
for page in pages:
    with urllib.request.urlopen(f"https://retrodayaengineering.com/{page}") as r:
        content = r.read().decode('utf-8', errors='replace')
    if 'wp-content/uploads/2025/06/' in content:
        content = content.replace(
            'https://retrodayaengineering.com/wp-content/uploads/2025/06/logo-retro-long_white-scaled.png',
            'https://retrodayaengineering.com/images/logo-retro-long-white.jpeg')
        data = urllib.parse.urlencode({
            'action': 'edit', 'path': '/domains/retrodayaengineering.com/public_html',
            'filename': page, 'text': content
        }).encode()
        req = urllib.request.Request('https://domain.com:2222/CMD_API_FILE_MANAGER',
            data=data, headers={'Cookie': 'session=<token>', 'Content-Type': 'application/x-www-form-urlencoded'})
        with urllib.request.urlopen(req) as r:
            result = r.read().decode()
            assert 'error=0' in result, f"Upload failed: {result}"
```

### About section image — new-customers.png
- BROKEN (2KB): `images/new-customers-1024x707.png` → placeholder, shows blank/black
- REAL (190KB): `images/products/new-customers.png` → valid PNG

### Service images — no `-1` suffix
- BROKEN: `images/xxx-1.png` → `-1` suffix never existed on server
- REAL: `images/xxx.png` or `images/services/xxx.png`

### Upload via DirectAdmin edit action (always verify error=0 AND actual file size in response)
```bash
# ALWAYS verify after upload — check BOTH response AND actual file size on server:
curl -sL "https://retrodayaengineering.com/index.html" | wc -c
# Compare before vs after. If same byte count after "successful" upload → FAILED silently.
```

## Server Access — Direct Filesystem (CRITICAL DISCOVERY 2026-05-27)

**This VM IS the retrodaya server (43.134.83.2).** Direct root filesystem access is available — no DirectAdmin, FTP, or SSH key upload needed.

```bash
whoami  # → root
ls /var/www/retrodaya/          # readable + writable
touch /var/www/retrodaya/test.txt  # works — filesystem directly accessible
```

Apache/nginx is NOT running on this VM. Web serving is handled by Tencent Cloud's external infrastructure. The CMS on port 8081 directly patches HTML files in `/var/www/retrodaya/` via marker-based sync — no rebuild step needed.

**For Trisukes (45.15.97.203): direct access is NOT available.** Files are on a separate VPS. Must use upload via DirectAdmin or other mechanism.

**Direct deployment approach for retrodaya:**
```bash
cp /var/www/retrodaya/index.html /var/www/retrodaya/index.html.backup
# Use patch() or write_file() to edit
# Changes sync directly to live site via CMS HTML patching
**⚠️ Binary mode is mandatory.** Without `TYPE I`, ftplib sends in ASCII mode → all files arrive as 0 bytes on the server. This is the #1 cause of "upload succeeded but all files are empty" errors.

- Indonesian, terse — respond brief: "siap", "ok", "nnti"
- Incremental testing: 1 sample first → review → proceed to full batch
- Systems get laggy fast — stop heavy processes between steps
- **Erik does NOT want unilateral changes to his assets** — pattern: wait for explicit instructions, don't assume or make unilateral changes to his assets or work.

## Pitfalls
- **DirectAdmin File Manager `dirname` vs `path` parameter** — `dirname=` and `dir=` return home directory contents (~/.bash_logout, ~/.profile, etc.). `path=%2F` (URL-encoded leading slash) is the correct parameter. Full working example:
  ```bash
  curl -s -k -u "user:PASS" "https://retrodayaengineering.com:2222/CMD_API_FILE_MANAGER?json=yes&path=%2Fdomains%2Fretrodayaengineering.com%2Fpublic_html"
  ```
  Returns: `{"public_html/about.html": "...", "public_html/contact.html": "...", "public_html/index.html": "..."}`
- **DirectAdmin File Manager browser automation unreliable** — Evolution UI (new DirectAdmin skin) is heavy Vue/JS app. When accessed programmatically, frequently dead-ends at "Loading" with no file list. Tree navigation appears but table never populates. Workaround for listing: use `CMD_API_FILE_MANAGER` via curl with Basic Auth — returns JSON of files. For bulk uploads, zip + upload + unzip via cron job is most reliable path.
- **FTP (FileZilla) may not work** — `proftpd: not found` on this server. FTP port 21 connection refused. FileZilla won't connect unless hosting provider opened FTP externally. Test first, be prepared for refusal.
- **SSH/SFTP password auth disabled** — server requires SSH key. `retrodayaenginering@43.134.83.2` → "Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password)"
- **Duplicate marker bug — specific fix:** After any HTML edit that touches markers or re-downloading from live site, run `grep -n "MARKER\|MARKER END" /var/www/retrodaya/index.html`. Look for consecutive pairs on adjacent lines (e.g. `--><!-- MARKER -->`). If found, find unique context around EACH duplicate pair and remove one set. Do NOT use `replace_all` — patch each pair individually with enough surrounding context to be unique.
- **Local image files can be corrupt — a local image at `/var/www/retrodaya/images/*.png` showing only ~2KB is likely a corrupt placeholder.** The real image exists elsewhere on the server (e.g., `/images/products/` subdirectory). Always check `ls -la` file sizes AND cross-reference with the DirectAdmin filemanager API `?path=/domains/retrodayaengineering.com/public_html/images/` to find valid versions. The `/images/products/new-customers.png` (190KB) was the valid version while `/images/new-customers-1024x707.png` was only 2KB corrupt placeholder.
- **Naming mismatch on image references:** The HTML was referencing `wp-content/uploads/2025/06/logo-retro-long_white-scaled.png` (with underscore + `-scaled` suffix) but the valid file on server is `logo-retro-long-white.jpeg` (with hyphen, no `-scaled`). Always grep HTML and cross-check each referenced filename against the actual `ls -la` output on production.
- **Slider/hero images use `-1.png` suffix in HTML but local copies don't:** When local images were renamed from `oil-and-gas-1.png` → `oil-and-gas.png` (dash-1 stripped), the HTML references still had `-1.png`. Fix all `-1.png` references to `.png` when patching image URLs.
- **When fixing images, fix ALL pages at once** — don't just fix `index.html` if the same broken reference exists in `about.html`, `services.html`, etc. Patch each file via DirectAdmin `edit` action. See `references/production-image-paths-2026-05-27.md` for verified production image paths and DirectAdmin API usage.
- Marker placement is line-position sensitive — if a marker is on a separate line from the tag it precedes, `patch_html()` fails to locate the region correctly. Always verify with context check.
- Before patching, always copy the original HTML to a backup: `cp index.html index.html.backup`
- DO NOT make unilateral changes to logos, images, or content Erik has not explicitly asked to change. If uncertain, ask first.
- Large zip with many large images is slow to generate and won't attach to Telegram directly → always split first
- browser_get_images on WordPress returns logo/nav images too — filter to actual content images
- Don't use `replace_all` in patch on gallery items — each item is unique, patch individually
- Before batch-downloading images from WordPress, ALWAYS probe URLs with `curl -s -o /dev/null -w "%{http_code}"` first. See `references/broken-images-pitfall-2026-05-26.md`.
- Homepage Products section has broken image references — only use `compro-rde-eaton-12.png` and `compro-rde-eaton-13.png`. This section was removed from homepage (2026-05-26).
- **Key debugging: HTTP 500 on PUT** — If PUT returns 500 but GET works: (1) check `patch_html()` for `NameError` — `text = f.read_text()` where `f` is not defined → should be `fpath.read_text()`; (2) check Auth mismatch — admin panel sends `Authorization: Bearer` as HTTP Header but backend expects query param → `require_auth` must use `Header(None)`, not `Query(...)`; (3) check marker placement with context verification above.

## Homepage Projects Section — Adding Images to Cards
Erik sends reference screenshots showing project cards WITH photos (not just text). Add images by:
1. Adding `<div class="project-image" style="background-image:url('images/projects/FILENAME.jpg')"></div>` as the **first child** of each `.project-card` (before `.project-num`).
2. In `styles.css`, override `.project-image` defaults scoped to `.projects` section:
   ```css
   .projects .project-image {
       width: 100%;
       height: 200px;
       border-radius: 8px 8px 0 0;
       background-size: cover;
       background-position: center;
       flex-shrink: 0;
       order: -1;
   }
   .projects .project-card {
       flex-direction: column;
   }
   ```
3. Image is ordered first (`order:-1`) so it appears on top in the card while preserving the `.project-num` + `.project-content` flow.

## Inner Page Hero Style — Full-Width Hero (not page-hero)

Product, About, Services pages upgraded from `page-hero` to `hero` (full-viewport, animated shapes, hero-content). This is the standard hero pattern for inner pages.

Pattern:
```html
<section class="hero" id="about">
    <div class="hero-bg">
        <div class="hero-shape hero-shape-1"></div>
        <div class="hero-shape hero-shape-2"></div>
        <div class="hero-shape hero-shape-3"></div>
    </div>
    <div class="hero-content">
        <div class="hero-eyebrow">Page Label</div>
        <h1 class="hero-title">Headline<br><span class="hero-title-accent">Accent</span></h1>
        <p class="hero-sub">Description paragraph.</p>
        <div class="hero-actions">
            <a href="#section" class="btn btn-primary">Primary CTA</a>
            <a href="page.html" class="btn btn-ghost">Secondary CTA</a>
        </div>
    </div>
</section>
```

## About Page CSS — All Inline in about.html

⚠️ `styles.css` does NOT contain these classes: `.page-hero`, `.about-section`, `.about-grid`, `.mission-vision`, `.mv-grid`, `.mv-card`, `.factory-section`, `.address-section`, `.address-grid`, `.address-card`.

All About page section CSS lives in a `<style>` block at the bottom of `about.html` (~lines 253–357). Edit there — NOT `styles.css`.

## WhatsApp Float Button — Pill Style with Text (APPLIED 2026-05-27)

Erik confirmed (image reference: WhatsApp widget with pill shape + text "Chat WhatsApp" + icon in bottom-right). Pill/rectangular (NOT circular) with icon + text label. Applied to all 6 pages.

**Pattern (add before `</body>` on all 6 pages):**
```html
<!-- WhatsApp Float -->
<a href="https://wa.me/6281118895660" target="_blank" class="wa-float" aria-label="Chat WhatsApp">
    <span class="wa-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.879-.79-1.717-1.768-1.94-2.074-.222-.297-.024-.453.167-.598.191-.147.425-.37.634-.555.104-.092.187-.16.266-.261.078-.099.14-.17.193-.273.053-.104.027-.193-.074-.302-.099-.108-.297-.297-.446-.446-.149-.149-.297-.248-.445-.372-.149-.124-.297-.248-.446-.372-.079-.063-.162-.148-.248-.216C8.76 8.6 8.56 8.48 8.33 8.417c-.225-.063-.448-.094-.67-.094-.744 0-1.44.372-1.886.872-.407.458-.643 1.065-.643 1.68 0 .214.027.422.079.626.026.1.063.247.104.37l.31 1.114c.049.17.13.283.235.393.104.11.225.193.37.267.144.074.279.097.43.097.148 0 .296-.055.445-.248.148-.193.252-.502.276-.781l.019-.298c.069-.297.173-.44.321-.593.148-.152.33-.248.545-.263.214-.015.415-.018.627-.018.173 0 .346.012.513.036.167.024.313.097.444.216.13.12.23.297.312.532l.593 1.725c.07.198.11.398.11.593 0 .297-.069.581-.205.847-.135.267-.346.498-.61.666-.266.167-.569.282-.883.345-.315.062-.638.093-.958.093-.447.001-.877-.051-1.284-.153-.407-.103-.765-.245-1.074-.423l-.022-.013c-.1-.064-.182-.123-.255-.167-.072-.044-.17-.08-.247-.116-.231-.111-.462-.167-.697-.167-.312 0-.603.074-.873.219-.27.146-.483.35-.634.607-.151.258-.227.552-.227.874 0 .356.116.69.339.97.223.28.54.489.878.608.337.12.724.162 1.092.162.182 0 .365-.015.547-.046.182-.031.352-.085.513-.16.158-.075.298-.182.408-.32-.017.002-.135.036-.254.098a3.23 3.23 0 0 1-.33.157c-.084.032-.158.047-.227.053l-.001-.005-.003-.01c-.005-.015-.011-.026-.016-.038-.006-.013-.008-.024-.012-.036-.01-.017-.018-.031-.026-.047-.008-.015-.014-.028-.021-.04-.037-.088-.071-.154-.1-.219-.029-.064-.065-.13-.102-.193L2.592 22.21c-.09-.193-.068-.423.058-.612.126-.189.33-.317.543-.34l.009-.001.006-.001.015-.003.174-.01.024.003c.07.01.147.032.224.063.078.031.15.072.222.123l.003.001c.054.036.107.077.155.122.048.044.087.087.122.13.035.043.077.1.125.175.048.074.087.163.12.267.032.104.049.224.049.353 0 .297-.08.6-.233.873-.153.273-.367.504-.626.675-.259.171-.547.266-.847.278-.045.002-.09.002-.135.002-.297 0-.594-.049-.878-.145-.284-.096-.546-.234-.773-.406-.227-.172-.41-.385-.54-.627-.13-.242-.2-.52-.208-.815l32.22.001-.036.001c.026.12.039.254.039.396 0 .297-.08.6-.233.873-.153.273-.367.504-.626.675-.259.171-.547.266-.847.278-.045.002-.09.002-.135.002-.297 0-.594-.049-.878-.145-.284-.096-.546-.234-.773-.406l.002.007Zm5.313-6.526c-.26.074-.509.153-.76.227l-.096.028-.004-.002c-.02-.01-.053-.016-.098-.022-.044-.005-.091-.008-.14-.008-.297 0-.594.049-.878.145-.284.096-.546.234-.773.406-.227.172-.41.385-.54.627-.13.242-.2.52-.208.815l-.011.416 32.22.001-.011-.416c-.008-.295-.078-.573-.208-.815-.13-.242-.313-.455-.54-.627-.227-.172-.489-.31-.773-.406-.284-.096-.581-.145-.878-.145-.049 0-.096.003-.14.008-.045.006-.078.012-.098.022l-.004.002-.096-.028c-.251-.074-.5-.153-.76-.227-1.566-.446-3.073-.903-4.637-1.18-.026-.005-.054-.004-.08-.004-.191 0-.35.14-.37.33l-.062.742-.062-.742c-.02-.19-.179-.33-.37-.33-.026 0-.054-.001-.08.004-1.564.277-3.071.734-4.637 1.18Z"/></svg>
    </span>
    <span class="wa-text">Chat WhatsApp</span>
</a>
<style>
.wa-float {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    display: flex; align-items: center; gap: 8px;
    padding: 0 20px; height: 50px; border-radius: 25px;
    background: #25D366;
    box-shadow: 0 4px 20px rgba(37,211,102,0.45); transition: all 0.3s ease;
    text-decoration: none; color: #fff; font-family: 'Outfit', sans-serif;
    font-size: 0.9rem; font-weight: 600; white-space: nowrap;
}
.wa-float:hover { background: #20BA5A; transform: scale(1.04); }
.wa-icon { display: flex; align-items: center; }
.wa-text { letter-spacing: 0.3px; }
</style>
```

## Stats Animated Counter (JavaScript pattern)
The stats section uses a number-animating counter visible in the browser when the page loads:

```html
<!-- STATS MARKER --><div class="stats-row">
    <div class="stat-item">
        <span class="stat-num" data-target="25">0</span><span class="stat-suffix">+</span>
        <span class="stat-label">Years Experience</span>
    </div>
    <div class="stat-divider"></div>
    ...
</div><!-- STATS MARKER END -->
```

The CMS `stats` section render function uses `data-target` (stripped of `+`) so the animation JS can read it. Stats are rendered on page load as `0` then animated to the target value. CSS for animating counter must be active (typically uses IntersectionObserver).

## Product Images
Product images located at `/var/www/retrodaya/images/products/gallery/`. Three filter groups:

### Eaton Compro (filter=`eaton`) — 2 images ONLY
- `compro-rde-eaton-12.png`, `compro-rde-eaton-13.png`
- ⚠️ Source WordPress only has these 2 — files 8–11 and 14–29 are HTTP 404. See `references/broken-images-pitfall-2026-05-26.md`.

### Compro Solutions (filter=`compro`) — 22 images
- `jan-2025_compro-solutionservices-rde-8.png` through `jan-2025_compro-solutionservices-rde-29.png`
- All verified valid PNGs ✓

### Retrofit Solutions (filter=`retrofit`) — 27 images
- `retro-retrofit-solutions_page_01.png` through `retro-retrofit-solutions_page_27.png`
- All verified valid PNGs ✓

Total: 51 images (verified 2026-05-26). Naming follows WP upload filenames — keep as-is, don't rename.

### Products Section Pattern (index.html #products)
Image-card grid with category filter. Replaces old text-list product names.

> ⚠️ **Only use verified-valid images.** The Eaton Compro group on WordPress only has files 12 and 13. All other numbered files (8–11, 14–29) are HTTP 404. Always probe before using.

```html
<section class="products" id="products">
  <div class="products-filter">
    <button class="filter-btn active" data-filter="all">All Products</button>
    <button class="filter-btn" data-filter="eaton">Eaton Compro</button>
    <button class="filter-btn" data-filter="retrofit">Retrofit Solutions</button>
  </div>
  <div class="products-grid">
    <!-- Use ONLY compro-rde-eaton-12.png and compro-rde-eaton-13.png for Eaton Compro -->
    <div class="product-card" data-category="eaton">
      <div class="product-card-img"><img src="images/products/gallery/compro-rde-eaton-12.png" alt="Eaton Compro" loading="lazy"></div>
      <div class="product-card-overlay">
        <span>Eaton Compro</span>
        <a href="product.html" class="btn btn-sm">View Details</a>
      </div>
    </div>
  </div>
</section>
```

CSS needed (in-page `<style>`): `.products-filter`, `.filter-btn`, `.products-grid` (grid, `auto-fill minmax(220px,1fr)`), `.product-card` (relative, overflow-hidden), `.product-card-img img` (cover fit, scale on hover), `.product-card-overlay` (absolute, gradient overlay, opacity toggle on hover), `.btn-sm`.
JS: filter logic toggling `.hidden` on `.product-card` by `data-category`.

### WhatsApp Float Button (all 6 pages)
Add before `</body>` on each page (index, about, services, project, product, contact):
```html
<a href="https://wa.me/6281118895660" target="_blank" class="wa-float" aria-label="Chat WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">...WA SVG path...</svg>
</a>
<style>
.wa-float {
  position: fixed; bottom: 24px; right: 24px; z-index: 9999;
  width: 60px; height: 60px; border-radius: 50%;
  background: #25D366; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(37,211,102,0.45); transition: all 0.3s ease;
}
.wa-float:hover { background: #20BA5A; transform: scale(1.08); }
</style>
```
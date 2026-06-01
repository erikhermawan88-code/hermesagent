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
 index.html     # Homepage
 about.html     # About page
 services.html    # Services + gallery
 project.html    # Projects + project gallery
 product.html    # Products + product gallery
 contact.html    # Contact page
 styles.css     # Main stylesheet
 app.js       # Navigation, gallery, lightbox, filter JS
 images/
  products/    # Product images (oil-and-gas.png, mining.png, etc.)
  services/    # Service/work images
  projects/    # On-site project photos
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

## Retro Daya ERP Dashboard
**URL:** https://digitalnusa.com/retro-daya-erp/

Full ERP with Invoice, Purchasing, Inventory, Email, File System, Project modules.
localStorage-backed (localStorage MVP → future FastAPI + SQLite backend).
Design: slate sidebar (#0f172a), amber accent (#f59e0b), Outfit font, GSAP animations.

### ⚠️ Critical: JavaScript String Literals in HTML `<script>` Tags

When embedding multi-line email templates inside JavaScript string literals in a `<script>` tag within a single HTML file, actual newline characters (0x0a / `\n`) INSIDE a single-quoted string literal cause `SyntaxError: Invalid or unexpected token` — the JS parser treats the newline as the end of the statement, not as a character inside the string.

**Broken pattern (causes SyntaxError):**
```javascript
openEmailCompose({
  subject: 'Invoice',
  body: 'Dear ' + name + ', Please find attached invoice.\n\nDue date: ' + date + '\n\nFor any questions...'
});
```

The `\n\n` creates actual newlines in the source, breaking the string literal.

**Correct patterns (choose one):**
```javascript
// Option 1: escaped newlines only (no actual newlines in string)
body: 'Dear ' + name + ', Please find attached invoice.\\n\\nDue date: ' + date,

// Option 2: template literals (backticks) — allows actual newlines
body: `Dear ${name}, Please find attached invoice.

Due date: ${date}

// Option 3: concatenate with + on each line
body: 'Dear ' + name + ', Please find attached invoice.' +
  '\n\nDue date: ' + date +
  '\n\nFor any questions...',
```

**Why this matters for single-file HTML:** When `node --check` or the browser JS engine parses the script block, any actual newline (not escaped) inside a single-quoted or double-quoted string literal is a syntax error. Template literals (backticks) are safest for multi-line content.

**Verification:** Run `node --check /path/to/script.js` on extracted JS before deploying. If it fails on a line with email body text, find and fix string literal newlines.

**For production ERP:** Consider FastAPI + SQLite backend instead of single HTML file. Single-file HTML is fine for static marketing sites but becomes fragile for complex stateful apps with 6+ modules.

See `references/retro-daya-erp-dashboard-2026-05-31.md` for full troubleshooting and current status.

## CMS Backend (TO BE BUILT — currently does not exist on this VM)
**Status (2026-05-29):** The CMS backend described below was previously on a different server. On this VM it does not exist yet — it needs to be rebuilt.

FastAPI + SQLite backend for inline content editing. Admin panel pages go UNDER the Dashboard menu in the adminator sidebar, styled to match the adminator template exactly.

### Target Architecture
```
/var/www/adminator/
 [existing adminator files: 2026.js, index.html, etc.]
 cms.html          # CMS dashboard (main entry — hero section cards)
 cms-hero.html     # Edit hero slides
 cms-services.html # Edit services
 cms-projects.html # Edit projects
 cms-stats.html   # Edit stats
 cms-contact.html  # Edit contact info
```

### Integrating CMS into Adminator Sidebar (CRITICAL)
The sidebar is generated entirely from the `NAV` array in `2026.js` (lines 36–163). To add CMS as a sub-menu under Dashboard:

```javascript
// In NAV array, add to Workspace section items:
{
  key: 'cms',
  text: 'CMS',
  icon: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  children: [
    { key: 'cms-dashboard', text: 'Dashboard', href: 'cms.html' },
    { key: 'cms-hero', text: 'Hero / Slides', href: 'cms-hero.html' },
    { key: 'cms-services', text: 'Services', href: 'cms-services.html' },
    { key: 'cms-projects', text: 'Projects', href: 'cms-projects.html' },
    { key: 'cms-stats', text: 'Stats', href: 'cms-stats.html' },
    { key: 'cms-contact', text: 'Contact', href: 'cms-contact.html' },
  ]
}
```

Then in each CMS HTML page, set `data-active` on `<body>` to match the nav key:
```html
<body data-active="cms-dashboard" data-crumbs="Workspace | CMS | Dashboard">
```

Each page uses the same shell pattern as other adminator pages:
```html
<div class="shell">
  <div data-shell-sidebar></div>
  <div class="main">
    <div data-shell-topbar></div>
    <main class="content">
      <!-- page-specific content -->
    </main>
  </div>
</div>
```

### Backend API Design (FastAPI + SQLite)
```
GET/POST  /api/auth/login
GET       /api/content/{section}     # hero, stats, services, projects, contact
PUT       /api/content/{section}/{id}
POST      /api/upload
GET       /api/media
DELETE    /api/media/{filename}
```

### CMS Pages Must Match Adminator Design
Erik explicitly said "menu cms itu harus sesuai design nya kyk template dashboardnya" — CMS pages must look and feel identical to other adminator pages. Use:
- Same `<div data-shell-sidebar>` + `<div data-shell-topbar>` shell
- Same CSS classes: `.card`, `.card-head`, `.card-title-wrap`, `.eyebrow`, `.btn`, `.input`, etc.
- Same hero section pattern with `.hero`, `.hero-text`, `.eyebrow`, `.hero-title`
- Same data table pattern for listing items (as shown in datatable.html)
- Same color variables: `var(--primary)`, `var(--success)`, `var(--danger)`, etc.

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

## Server Access — Retrodaya IS Two Different Servers

**Server 1 (DirectAdmin) — hosts the live site files:**
- IP: `109.123.232.85:2222`
- Contains: `/domains/retrodayaengineering.com/public_html/` (all 6 HTML pages + images)
- Access: DirectAdmin web UI (session cookie auth) — session expires, get IP blacklisted on failed attempts
- No SSH/SFTP available

**Server 2 (CMS backend) — the FastAPI admin panel:**
- IP: ``
- Contains: `/var/www/retrodaya-admin/` (FastAPI + SQLite + Vue3 admin SPA)
- Contains: HTML files that get synced FROM DirectAdmin to this server
- Access: CMS admin panel `/admin/` — login: `admin` / `retrodaya2024`
- CMS patches HTML files via marker system

**⚠️ This VM (43.134.83.2) is NOT the retrodaya server.** Files are on `109.123.232.85`. The CMS on 8081 pulls/patches files from there. Direct filesystem access to `/var/www/retrodaya/` only works on 109.123.232.85, not this VM.

**When editing via DirectAdmin:**
- Session cookie auth — expires over time
- IP gets blacklisted after 3+ failed login attempts
- If stuck: use CMS admin at `/admin/` instead
- Large file upload (>37KB HTML) can silently fail — always verify file size after upload
**⚠️ Binary mode is mandatory.** Without `TYPE I`, ftplib sends in ASCII mode → all files arrive as 0 bytes on the server. This is the #1 cause of "upload succeeded but all files are empty" errors.

- Indonesian, terse — respond brief: "siap", "ok", "nnti"
- Incremental testing: 1 sample first → review → proceed to full batch
- Systems get laggy fast — stop heavy processes between steps
- **Erik does NOT want unilateral changes to his assets** — pattern: wait for explicit instructions, don't assume or make unilateral changes to his assets or work.
- **Erik prefers HTTP server download link** (`python3 -m http.server`) over Telegram attachment — faster + no 20MB cap. Always serve first, then share link.
- **Light theme + teal accent is Erik's default design system** — confirmed across multiple projects. Default palette:
  - Primary: `#009F75` (teal)
  - Background: `#F8FAFC` (near-white)
  - Card bg: `#FFFFFF`
  - Text primary: `#1a1a2e`
  - Text secondary: `#64748b`
  - Font: `Inter` (Google Fonts)
  - Card-based layout (image top + content bottom, 3-col grid)
  - Border radius: `12px`–`16px`
  - Shadow: `0 4px 12px rgba(0,0,0,0.1)` on card hover
- **Hates "tidak pasaran"** — generic/template-looking outputs. Must feel premium, not cookie-cutter.
- **Font Awesome CDN — ALWAYS include** in `<head>` when using `fa-*` icon classes. Without it, icons render as empty squares. Add BEFORE the main stylesheet link:
  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  ```
- **Cache-bust static CSS/JS on every deploy** — browser caches old CSS. Always add `?v=2` (increment the number) to the stylesheet link when you've made updates. Example: `<link rel="stylesheet" href="/hermes/static/css/style.css?v=2">`
- **Browser console debugging menu-cards** — `getBoundingClientRect()` on CSS grid cards returns empty/falsy because the cards are grid items. Don't rely on it for layout verification. Instead use `getComputedStyle()` or just visually inspect the actual rendered page. The real issue when cards look broken is usually: missing Font Awesome CDN, missing CSS file in `<head>`, or cache-bust issue.
- **Project subfolder location**: all new projects go under `/home/admin/domains/digitalnusa.com/public_html/[project-name]/` (static files only, no backend)

## Pitfalls
- **DirectAdmin File Manager `dirname` vs `path` parameter** — `dirname=` and `dir=` return home directory contents (~/.bash_logout, ~/.profile, etc.). `path=%2F` (URL-encoded leading slash) is the correct parameter. Full working example:
 ```bash
 curl -s -k -u "user:PASS" "https://retrodayaengineering.com:2222/CMD_API_FILE_MANAGER?json=yes&path=%2Fdomains%2Fretrodayaengineering.com%2Fpublic_html"
 ```
 Returns: `{"public_html/about.html": "...", "public_html/contact.html": "...", "public_html/index.html": "..."}`
- **DirectAdmin session cookie expires and gets IP blacklisted after failed login attempts.** When cookie is invalid (`"error":"Not logged in"`), re-login via browser to get fresh cookie. DO NOT keep retrying with old cookie — repeated failed attempts get the IP blacklisted. Workaround: use CMS admin at `/admin/` instead of DirectAdmin for content edits (no auth session needed).
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

**⚠️ CRITICAL: Use official WhatsApp SVG logo, NOT a custom path.** The icon must be the recognizable WhatsApp logo (two-tone chat bubble with phone handle). Here's the correct SVG:

```html
<!-- WhatsApp Float — PILL STYLE -->
<a href="https://wa.me/6281118895660" target="_blank" class="wa-float" aria-label="Chat WhatsApp">
  <span class="wa-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 224.7 32 124.5 32 45.5 116.4 45.5 227.1c0 27.2 6.3 53.7 18.3 77.8L34.6 413.1c-1.5 6.6-3 13.3 5.3 17.4 6.6 3.1 14.1 1.8 19.8-3.3l87-72.9c20.3 11.1 43.1 17.3 67.1 17.3 110.2 0 189.2-93.4 189.2-204.4 0-51.3-18.5-96.6-50.1-134.7zM224 338.3c11.4 0 22.8-1.5 33.8-4.3l-9.4-24.1c-3.1-.6-6.3-.9-9.4-.9-33.4 0-60.6 27.9-60.6 62.1 0 16.9 6.9 32.3 17.9 43.8 11.3 11.7 27.9 18.6 44.3 18.6 2.7 0 5.3-.2 7.9-.6l-.4-1.2c-.6-1.9-1.3-3.8-1.9-5.6-5-14.1-3.1-29.2 4.9-41.3 8.8-13.3 23.3-21.9 39.5-21.9 4.2 0 8.3.6 12.3 1.6-2.3-9.1-8.6-16.8-17-21.7-1-.6-2.1-1.1-3.3-1.6-2.9-1.2-6-2.1-9.1-2.7 1.7 1.2 3.4 2.3 5 3.6-7.4-3.8-14.4-8.1-20.9-13-1.4-1-2.7-2.1-4-3.2 2.9 2.3 6 4.4 9 6.5-3.4-1.3-6.8-2.6-10.1-4.1 9.5 5.5 19.8 9.8 30.5 13 1.7.5 3.5.9 5.2 1.3 1.1.3 2.3.5 3.4.8.8.2 1.7.3 2.5.5 5 .9 10.1 1.6 15.2 2.1 5.1.5 10.2.7 15.4.7 33.4 0 60.6-27.9 60.6-62.1 0-16.9-6.9-32.3-17.9-43.8-11.3-11.7-27.9-18.6-44.3-18.6-11.4 0-22.8 1.5-33.8 4.3l9.4 24.1c3.1.6 6.3.9 9.4.9 33.4 0 60.6-27.9 60.6-62.1 0-16.9-6.9-32.3-17.9-43.8-11.3-11.7-27.9-18.6-44.3-18.6-33.4 0-60.6 27.9-60.6 62.1 0 16.9 6.9 32.3 17.9 43.8 11.3 11.7 27.9 18.6 44.3 18.6 2.7 0 5.3-.2 7.9-.6l-.4-1.2z"/>
    </svg>
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

> ⚠️ **If the icon looks wrong (not WhatsApp logo):** The SVG path in the skill is wrong. Replace with the official WhatsApp SVG above. Use `fill="currentColor"` so the icon inherits the button's green color.

> **⚠️ DO NOT use `fill="#fff"`** on WhatsApp icon — it makes the white icon invisible on white backgrounds. Always use `fill="currentColor"`.

## Erik's Design System (when Erik wants "same style as digitalnusa.com")
See `references/digitalnusa-design-tokens-2026-05-29.md` for extracted color palette (CSS variables), typography (Inter font), design tokens, and reusable HTML patterns (navbar, hero, menu card). The key differentiator from Retro Daya's style:
- **Light theme** (not dark) — `--bg-dark: #F8FAFC`
- **Teal primary** `#009F75` (not navy/gold)
- **Inter font** (not Outfit)
- **Image-top card layout** with shadow-on-hover
- **No Flask/p backend** — static HTML/CSS/JS only from DirectAdmin public_html

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
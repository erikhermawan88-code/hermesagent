---
name: premium-company-profile
description: "Build premium static single-page company profile websites for Indonesian businesses — animated hero, scroll-motion, 3D depth, real content from PDF docs. For Erik's VPS: /var/www/<project>/ — no build step, pure HTML/CSS/JS."
risk: safe
date_added: "2026-05-27"
source: personal
---

# Premium Company Profile Websites

Build premium static single-page websites from company profile PDF docs — animated hero, scroll-motion, 3D depth, real content. Deliver on Erik's VPS at `/var/www/<folder>/` with `python3 -m http.server <port>`.

## Trigger Conditions
- User sends a PDF company profile and asks for a website
- User asks to redesign / rebuild a company website
- User says "modern", "professional", "tidak pasaran" (not generic-template) for a company site

## Workflow

### 1. PDF Content Extraction
Use `/usr/bin/python3` (system Python 3.11, NOT the venv Python):
```bash
/usr/bin/python3 -c "
import sys
sys.path.insert(0, '/usr/local/lib64/python3.11/site-packages')
import fitz
doc = fitz.open('/path/to/pdf.pdf')
print(f'Pages: {len(doc)}')
for i, page in enumerate(doc):
    t = page.get_text()
    print(f'=== PAGE {i+1} ===')
    print(t[:800] if t else '[image/graphic]')
"
```
Module path: `/usr/local/lib64/python3.11/site-packages` (pymupdf installed system-wide via `pip3`)

### 2. Project Setup
```bash
# Erik's standard directory — each project gets its own folder
mkdir -p /home/admin/domains/digitalnusa.com/public_html/<folder>/images
# Deliver via HTTP (Erik preference over Telegram attachment)
cd /home/admin/domains/digitalnusa.com/public_html && python3 -m http.server <port> --bind 0.0.0.0
```
No build step — pure HTML/CSS/JS files served directly. Single-page scroll (`index.html`) with all sections in one file.

### 3. Design System (Erik's Anti-Template Rules)
Active on every project — do NOT deviate:
- ❌ Purple/blue neon gradients
- ❌ Centered hero sections → asymmetric layouts
- ❌ 3-column equal card grids → vary column counts
- ❌ Inter font → use Outfit or Satoshi
- ❌ `h-screen` → use `min-height: 100dvh`
- ❌ Lorem ipsum / placeholder text
- ❌ Basic/static hero → MUST have scroll animation / parallax / text motion
- ❌ Generic template feel → every section must feel unique

### 4. Hero Section (Mandatory)
For Erik, the hero MUST NOT be template-basic. Required elements:
- Full-screen with `min-height: 100dvh`
- Background: animated grid pattern, subtle parallax, or gradient mesh
- Text entrance: staggered `animation-delay` — title slides in from left, badge fades, CTA bounces
- Floating badge cards with `box-shadow: var(--shadow-lg)` for 3D depth
- If no product image available: use CSS-generated geometric shapes or emoji-based visual

Example hero CSS animation:
```css
@keyframes slideUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
.hero-badge { animation: slideUp 0.6s ease 0.1s both; }
.hero h1 { animation: slideUp 0.7s ease 0.2s both; }
.hero-desc { animation: slideUp 0.7s ease 0.35s both; }
.hero-actions { animation: slideUp 0.7s ease 0.5s both; }
```

### 5. Scroll Reveal
```js
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));
```
Add `class="reveal"` to section elements; CSS: `opacity:0; transform:translateY(24px)` → `.visible { opacity:1; transform:translateY(0) }`

### 6. Sections (Vary the Layout)
Never repeat the same card pattern. Example section variations:
- Stats grid: `grid-template-columns: 1fr 1fr` or `repeat(4, 1fr)` — never 3-col equal
- Partner chips: wrap in rows with `flex-wrap: wrap`, varying widths
- Legalitas / table: multi-column card grids, not all the same
- Organization: visual org-chart using CSS flex with connecting lines
- Contact: split grid (info left + card right)

### 7. WA Float Button (Mandatory)
```html
<a href="https://wa.me/<number>" target="_blank" class="wa-float" aria-label="Chat WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    [official WA SVG path]
  </svg>
</a>
```
⚠️ CRITICAL: Use `fill="currentColor"` NOT `fill="#fff"` — otherwise the white icon disappears on white background buttons. The icon inherits the button's green background color.

### 8. Delivery
1. Zip: `cd /var/www/<folder> && zip -r /tmp/<folder>.zip . -x "*.DS_Store"`
2. HTTP serve: `python3 -m http.server <port> --bind 0.0.0.0` (background)
3. Send link: `http://43.134.83.2:<port>/<folder>.zip`

## Erik's Preference Notes
- Terse Bahasa Indonesia responses: "siap", "ok", "nnti"
- Incremental testing: preview first → review → full batch
- **Design**: Erik likes the digitalnusa.com style (light theme, teal `#009F75`, Inter font, clean card grid). Hates "tidak pasaran" — must feel premium. See `retro-daya-website/references/digitalnusa-design-tokens-2026-05-29.md` for full token set.
- **Delivery**: Erik prefers HTTP server link (`python3 -m http.server`) over Telegram attachment — always serve first.
- "Jd lag berat soalnya sistem kita" → avoid heavy background processes
- Erik prefers HTTP download link over Telegram attachment for large files
- "slider nya template bgt" = hero needs DRAMATIC animated motion, not basic static layout

## Live Projects

### CPM Geologix (May 2025)
- **URL:** http://43.134.83.2:8082
- **File:** `/var/www/cpm-geologix/index.html` (46KB, single HTML)
- **Source:** Chat PDF — "Company Profile CPM-Geologix 2025.pdf"
- **Palette:** Navy `#0f2c4a` · Teal `#0d7377` · Gold `#d4a843`
- **Stack:** Pure HTML/CSS/JS, Outfit font, IntersectionObserver reveal, CSS grid hero

### Retro Daya Engineering
- **URL:** http://43.134.83.2:3001 (retrodayaengineering.com assets)
- **Files:** `/var/www/retrodaya/` (6 static HTML pages)
- **Reference:** `references/retro-daya-website.md`

## Erik's Project Structure Convention
- **Root:** `/home/admin/domains/digitalnusa.com/public_html/`
- **Each new website:** own folder (e.g., `playbie/`, `hermes/`, `<new-project>/`)
- **All project data** (source, config, assets, db exports) stored inside the project folder
- **GitHub backup:** push project folders to `erikhermawan88-code/hermesagent` repo for disaster recovery
- **Delivery:** HTTP serve from the project folder (Erik prefers download links over Telegram attachments)

## Pitfalls
- `python3` in terminal → resolves to venv path → pymupdf import fails → use `/usr/bin/python3` explicitly
- WA button icon: `fill="#fff"` makes icon invisible on white bg → swap to `fill="currentColor"`
- pip3 install pymupdf → installs to `/usr/local/lib64/python3.11/site-packages` (system Python site-packages, NOT venv)
- Large zip: use HTTP server link, not Telegram attachment (Erik preference)
- **Hermes dashboard build is NOT standalone** — the web UI build output (`web_dist/`) requires the Python `hermes dashboard` backend running at `localhost:9119`. It will not serve as a static site alone. Build output is at `hermes_cli/web_dist/` AFTER running `npm run build` in the project folder.

---
name: website-workflow
description: "Panduan complete workflow bikin website: Adminator dashboard + PHP/JSON backend + public pages, semua sync. Domain: digitalnusa.com, GitHub: hermesagent."
---

# Website Workflow — Hermes Agent

Bikin website lengkap: **Adminator dashboard** (backend/admin) + **public frontend** + **PHP API** + **auto-sync**. Semua dari nol sampai live.

## MANDATORY 4-SKILL WORKFLOW

**Before starting any website project, load and combine ALL FOUR skills:**

1. **`popular-web-designs`** → 54 design systems reference (Stripe, Linear, Vercel, etc.)
2. **`claude-design`** → one-off HTML artifacts (landing, deck, prototype)
3. **`ui-ux-audit`** → checklist-based review sebelum launch
4. **`gsap-animation`** → scroll-triggered animations, parallax, staggered reveals

**Process flow:**
```
Brief → Load 4 skills → Design 1 sample → Erik review → Full build → ui-ux-audit → Live
```

**Trigger:** Any time user says "bikin website", "design website", "redesign", "buatin landing page", or any request in the website-build class. Load all 4 skills before doing anything else.

## Design Principles

- **Creative freedom — NO palette/font constraints.** Unique, tidak pasaran. No template-look outputs.
- **Light theme** for public frontend, **dark theme** for admin panel
- **Outfit font** for Indonesian client work when client doesn't specify
- **Incremental delivery:** 1 sample → review → proceed — never dump full build before Erik approves sample
- **Link format:** `digitalnusa.com/<folder>` (no full URL in casual reference)
- **This machine = server:** files written to `public_html/` are immediately live — no deploy step
- **Design Mode A (Erik specifies reference):** match reference exactly, ask clarifying questions first
- **Design Mode B (Erik asks to design):** propose design direction, show 1 sample URL, wait for approval before full build

## Prerequisites
- Domain: `digitalnusa.com` (shared hosting DirectAdmin)
- Path: `/home/admin/domains/digitalnusa.com/public_html/<folder>/`
- GitHub repo: `erikhermawan88-code/hermesagent`
- Adminator: `/home/admin/domains/digitalnusa.com/public_html/adminator_temp/` (built dist, siap copy)
- GitHub token: di `~/.git-credentials`
- Design ref: `digitalnusa.com` (light theme, teal #009F75, Inter font)

## Workflow Steps

### 1. Setup Folder + Copy Adminator
```bash
cd /home/admin/domains/digitalnusa.com/public_html/

# Setup project folder
mkdir -p <nama-project>/{api,data/backups,public,assets}

# Copy Adminator built dist sebagai admin/
mkdir -p <nama-project>/admin
cp -r adminator_temp/dist/* <nama-project>/admin/
```

> **Adminator sudah built** di `adminator_temp/dist/` — tinggal copy. Jangan re-build setiap project, cukup copy dist.

Struktur:
```
/<nama-project>/
├── admin/                  # Adminator dashboard (dark theme, 18 pages)
├── api/                    # PHP API endpoints
│   └── content.php         # GET/POST/PUT/DELETE
├── data/                   # JSON data store
│   ├── content.json        # Source of truth
│   └── backups/            # Auto-backup
├── public/                 # Public frontend (light theme)
│   ├── index.html
│   └── style.css
└── index.html              # Redirect → public/
```

### 2. Buat Data JSON (`data/content.json`)

Schema fleksibel — top-level keys, bukan `menu` array:

```json
{
  "info": {
    "name": "Nama Bisnis",
    "tagline": "Tagline bisnis",
    "description": "Deskripsi lengkap",
    "experience": "10+ Tahun"
  },
  "contact": {
    "phone": "+62 xxx",
    "whatsapp": "628xxxx",
    "email": "email@domain.com",
    "address": "Alamat lengkap",
    "hours": "Senin - Sabtu: 08.00 - 17.00"
  },
  "services": [
    { "id": 1, "name": "Service Name", "description": "...", "icon": "fa-star" }
  ],
  "why_us": [
    { "title": "Judul", "value": "Nilai" }
  ],
  "stats": [
    { "label": "Label", "value": "500+" }
  ],
  "testimonials": [
    { "id": 1, "name": "Nama", "role": "Role", "quote": "...", "avatar": "https://..." }
  ]
}
```

> **Format:** `info`, `contact`, `services`, `why_us`, `stats`, `testimonials` sebagai object keys — BUKAN `menu` array. Load di frontend: `data.info?.name`, `data.services.map(...)`, dll.

### 3. Buat PHP API (`api/content.php`)

GET = baca, POST = simpan (full), PUT = partial update, DELETE = restore backup:

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$base_dir = dirname(__DIR__);
$json_file = $base_dir . '/data/content.json';
$backup_dir = $base_dir . '/data/backups';

if (!is_dir($backup_dir)) mkdir($backup_dir, 0755, true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo file_get_contents($json_file);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    copy($json_file, $backup_dir . '/content_' . date('Y-m-d_His') . '.json');
    file_put_contents($json_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['success' => true]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $update = json_decode(file_get_contents('php://input'), true);
    $current = json_decode(file_get_contents($json_file), true);
    $updated = array_merge($current, $update);
    copy($json_file, $backup_dir . '/content_' . date('Y-m-d_His') . '.json');
    file_put_contents($json_file, json_encode($updated, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['success' => true]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $bp = $backup_dir . '/' . $_GET['backup'];
    if (file_exists($bp)) {
        copy($bp, $json_file);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Backup not found']);
    }
    exit;
}
?>
```

> **PATH FIX:** `$base_dir = dirname(__DIR__)` — karena `__DIR__` = `/path/to/project/api/`, maka `dirname(__DIR__)` = `/path/to/project/` → `data/content.json` valid.

### 4. Buat Public Frontend (`public/index.html`)

Fetch dari API, render dynamic. Contoh pattern:

```html
<script>
const API = '/<nama-project>/api/content.php';

async function loadContent() {
  const res = await fetch(API);
  const data = await res.json();
  
  // Hero
  document.getElementById('hero-title').textContent = data.info?.name;
  
  // Services
  document.getElementById('services-grid').innerHTML = data.services.map(s => `
    <div class="service-card">
      <div class="service-icon"><i class="fas ${s.icon}"></i></div>
      <h3>${s.name}</h3>
      <p>${s.description}</p>
    </div>
  `).join('');
  
  // Testimonials
  document.getElementById('testimonials-grid').innerHTML = data.testimonials.map(t => `
    <div class="testimonial-card">
      <img src="${t.avatar}" alt="${t.name}">
      <p>"${t.quote}"</p>
      <strong>${t.name}</strong>
    </div>
  `).join('');
}
loadContent();
</script>
```

Data sync flow:
```
Admin (Adminator) → POST /api/content.php → content.json → GET /api/content.php → Public (real-time)
```

### 5. GitHub Push
```bash
cd /home/admin/domains/digitalnusa.com/public_html/<nama-project>/
git init && git config user.name "Erik Hermawan" && git config user.email "erik@digitalnusa.com"
git remote add origin https://erikhermawan88-code:$(git credential fill <<EOF | grep password= | cut -d= -f2
protocol=https
host=github.com
username=erikhermawan88-code
EOF
)@github.com/erikhermawan88-code/hermesagent.git
git add -A && git commit -m "Add <nama-project> website" && git push -u origin master
```

> **First push to existing repo:** remote sudah punya commits → `git push --force`

### 6. Backup (SETELAH selesai)
```bash
cd /home/admin/domains/digitalnusa.com/public_html/<nama-project>/
/usr/local/php83/bin/php -r "
copy('data/content.json', 'data/backups/content_final_' . date('Y-m-d') . '.json');
echo 'Backup done';
"
```

## Verify Live
After writing any file, verify immediately:
```bash
curl -sI "https://digitalnusa.com/<folder>/" | head -3
```
Should return `HTTP/2 200`. No restart, no reload — files are live the moment they're written.

## Design Approach — Ask Before Building

Erik has taste and gets upset when you unilaterally change his assets. Two modes:

**Mode A — Erik specifies layout:** "bikin website mirip X" → match reference exactly, ask clarifying questions first.

**Mode B — Erik asks you to design:** "coba design yang beda" → propose a design direction, show 1 sample URL, wait for approval before full build.

Three proven design directions (present option(s) when Erik asks for design):

### Option A — Bento Grid (light theme)
Background: cream (#FAFAFA), cards with border-radius, soft shadows
Typography: Space Grotesk (headings) + DM Sans (body)
Palette: navy (#0F172A) + teal (#0D9488) + gold (#F59E0B)
Features: asymmetric bento cards, floating tags, orb effect, marquee ticker
Ref: `references/bento-grid-design.md`

### Option B — Brutalist-Editorial (light theme)
Background: warm off-white (#F4F3EE), zero rounded corners, thick 2px borders everywhere
Typography: Bricolage Grotesque (headings, editorial weight) + Manrope (body)
Palette: pitch black (#0C0C0C) + red (#E84040) + blue (#2550E0) + green (#00C950)
Features: split hero (text left / data blocks right), marquee ticker, dark stat strip, oversized CTA background text, vertical text labels
Ref: `references/brutalist-editorial-design.md`

### Option C — Dark Admin Dashboard
Background: dark (#0F172A), accent glows, glassmorphism panels
Use for: SaaS products, developer tools, data-heavy platforms

### Option D — Wibify-Inspired Editorial (light theme) — NeuralFlow
Reference: Wibify agency (wibify.agency/en) — section numbers [01][02], bold Syne headings with italic teal emphasis, Epilogue body, clean editorial grid. Distinct from Wibify: teal/navy/gold palette (not Wibify's style), fullscreen hero slider option, FAQ accordion, marquee ticker, animated stats strip.

Background: warm off-white (#F7F6F2)
Typography: Syne (headings, 800 weight, tight letter-spacing) + Epilogue (body)
Palette: navy (#0C1A2E) + teal (#0D7377) + teal-light (#14919B) + gold (#D4A853)
Features:
- Section numbers: `[01]`, `[02]` with teal left-border line
- Word emphasis via `.em { color: var(--teal); font-style: italic; }` in headings
- Fullscreen hero image slider (3 slides, autoplay 5s, dots + prev/next + keyboard, Unsplash images)
- Marquee ticker with diamond separators
- Stats strip on dark navy background with hover underline animation
- Process cards with ghost large numbers (opacity 0.12)
- FAQ accordion (Wibify-style "Answers up front")
- CTA section with oversized background text ( FLOW ) on teal
- Custom teal scrollbar, teal text selection color
- Reveal-on-scroll animation throughout
- Teal dot logo marker in nav

Ref: `references/wibify-editorial-design.md`

## Backend Customization Options

PHP native + JSON adalah default karena simpel dan cukup untuk大多数use case. Berikut opsi customization kalau client butuh lebih:

### 1. Endpoint Design
```
Default (single):  GET/POST /api/content.php  (all-in-one)
Alternative (per-section):
  GET/POST /api/info.php
  GET/POST /api/services.php
  GET/POST /api/contact.php
  (separate endpoints per section — lebih RESTful, lebih scalable)
```

### 2. Data Structure
```
Default (flat JSON):      { "info": {}, "services": [], "contact": {} }
Relational style:         services table, contact table, info table (multiple JSON files)
Custom schema:            any structure client wants
```

### 3. Auth / Admin Protection
```
No auth (default):        anyone can POST/PUT — OK for internal use
Basic Auth:               user/pass di PHP, return token
Session-based:            login form → session cookie → protect POST
JWT:                      stateless token auth (complex, usually overkill untuk ini)
```

### 4. Additional Features
```
Image upload:             <input type=file> → move_uploaded_file() → serve via API
Activity log:             log every POST/PUT dengan timestamp + user
Versioning/undo:           backup per-change (already implemented), restore via GET /api/content.php?version=YYYY-MM-DD
Rate limiting:            throttle POST calls
Rich API responses:       add metadata { success, timestamp, data }
Pagination:               for large arrays (services list, testimonials)
```

### 5. Stack Alternatives
```
PHP native (default):     single file, no deps, works everywhere
Express.js:               Node.js, JSON files, API routes
FastAPI (Python):         Pydantic models, auto-docs
Laravel:                  full framework, ORM, migrations
```

**User preference:** Erik mau flexibility — kasih options, tanya mau kayak gimana sebelum build. Jangan assume, jangan unilaterally change.

---

## ⚠️ CRITICAL — This Machine IS the Server

**The agent runs ON the server itself.** Files written to `/home/admin/domains/digitalnusa.com/public_html/<folder>/` are immediately live at `https://digitalnusa.com/<folder>/`. No SSH, no FTP, no rsync, no upload step needed.

What this means in practice:
- ✅ Write a file → it's live in seconds (verify with `curl -sI https://digitalnusa.com/<folder>/`)
- ❌ Do NOT try SSH/SFTP/rsync to deploy — ports 22 and 21 are firewalled from this machine
- ❌ Do NOT try DirectAdmin port 2222 — it's firewalled from this machine too
- ✅ The nginx web root IS `/home/admin/domains/digitalnusa.com/public_html/`
- ✅ If you need to verify: `curl -s "https://digitalnusa.com/<folder>/"` returns the live file

**Erik's preferred link format:** `digitalnusa.com/<folder>` (no `https://` prefix in casual speech, but both work)

## Pitfalls
- **"Tidak pasaran"** — outputs must be unique, no generic/template-look. Erik explicitly hates this. No recycled layouts or stock design patterns.
- **Adminator dark theme** untuk admin panel (backend UI)
- **Light theme** untuk public frontend
- **JSON** sebagai single source of truth — tidak ada database
- **Backup** auto di `data/backups/` setiap POST/PUT
- **CSS cache** — increment `?v=` setelah edit CSS

## Troubleshooting
- **System python no fastmcp** — use `/home/admin/.hermes/hermes-agent/venv/bin/python3`
- **CSS cache** — increment `?v=` di CSS link
- **GitHub push reject** — `git push --force` (remote punya commits)
- **Adminator already built** — copy from `adminator_temp/dist/`, don't rebuild every project
- **Erik prefers no-backend** — always ask before adding PHP. He chose static-only CMS for NeuralFlow (edit → localStorage → export JSON → replace on VPS). See `references/neuralflow-no-backend-cms.md` for the pattern.
- **Design Mode B violation** — when Erik says "coba design yang beda", do NOT build the full redesign immediately. Present options first, get Erik to pick, build ONE section sample, wait for review. Going straight to full build without Erik's explicit approval on a sample violates the incremental workflow rule.
- **PHP API subfolder routing** — when `content.php` is in a subfolder (e.g. `/jelajah/api/`), path parsing gets the folder name instead of the resource. Fix: see `references/php-api-subfolder-routing.md`
- **article.html 404 — wrong URL path** — If public folder is `/project/public/`, article detail URL must be `/project/public/article.html` (NOT `/project/article.html`). Update ALL href links in index.html to match the actual deployed URL structure.
- **PHP ID routing — direct article ID access** — `GET /api/articles.php/art_xxx` needs special handling: add `if (preg_match('/^art_/', $parts[0])) { $id = $parts[0]; $route = ''; }` before normal route parsing, otherwise returns API info instead of article. See `references/articles-cms-api.md`
- **Region filter function** — Homepage `filterByRegion()` should navigate to `/project/public/region.html?name=...` (redirect to dedicated page), not do client-side filter. This ensures proper URL sharing/bookmarking.
- **Category/Region pages empty state** — Always handle zero results with a friendly empty state UI (icon + message), not a blank screen or raw error.
- **article.html 404 — wrong URL path** — If public folder is `/project/public/`, article detail URL must be `/project/public/article.html` (NOT `/project/article.html`). Update ALL href links in index.html to match the actual deployed URL structure.
- **PHP ID routing — direct article ID access** — `GET /api/articles.php/art_xxx` needs special handling: add `if (preg_match('/^art_/', $parts[0])) { $id = $parts[0]; $route = ''; }` before normal route parsing, otherwise returns API info instead of article. See `references/articles-cms-api.md`

## Design Reference Library
- `references/bento-grid-design.md` — Bento grid layout patterns
- `references/brutalist-editorial-design.md` — Brutalist-editorial patterns
- `references/wibify-editorial-design.md` — Wibify-inspired editorial patterns
- `references/articles-cms-api.md` — News portal / blog CMS API pattern (articles CRUD, JSON store, frontend fetch)
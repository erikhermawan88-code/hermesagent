# NeuralFlow No-Backend CMS Pattern

**Project:** `/home/admin/ai-automation/`
**Date:** 2026-05-30

## Structure (Erik-specified)

```
/home/admin/ai-automation/
├── public/
│   └── index.html          ← Landing page (light theme, fetch dari JSON)
├── admin/
│   ├── index.html           ← Dashboard CMS (dark theme, Adminator style)
│   ├── cms-hero.html        ← Hero section editor
│   ├── cms-services.html    ← 6 service cards editor
│   ├── cms-stats.html       ← 4 stats editor
│   ├── cms-process.html     ← 4 process steps editor
│   ├── cms-results.html     ← 3 case studies editor
│   ├── cms-pricing.html     ← 3 pricing tiers + featured toggle
│   ├── cms-testimonials.html← 3 testimonials editor
│   ├── cms-cta.html         ← CTA section editor
│   ├── cms-contact.html     ← email & WhatsApp editor
│   └── cms-footer.html      ← footer description & links editor
└── data/
    └── content.json         ← Source of truth (edit di CMS → export → replace)
```

## Key Differences from PHP Backend Pattern

| Aspect | PHP Backend (existing skill) | No-Backend (this pattern) |
|---|---|---|
| Data storage | `api/content.php` writes to `data/content.json` | Export JSON from CMS → manually replace `data/content.json` |
| Real-time sync | Yes (POST → JSON → fetch) | No (manual export step) |
| Backend needed | PHP hosting required | Pure static, any host works |
| Auth | Optional | None (client-side only) |

## CMS → Live Site Workflow

```
Admin edits (localStorage)
    ↓ "Export JSON" button
Downloads content.json
    ↓
Replace /data/content.json on server
    ↓
Public site auto-updates (fetches new JSON)
```

## When to Use This Pattern

- **Use no-backend** when: client wants simple landing page, no PHP hosting available, low update frequency
- **Use PHP backend** when: client needs real-time CMS editing that immediately reflects on live site, multiple editors

## Public Frontend Pattern (fetch JSON directly)

```javascript
async function loadContent() {
    const res = await fetch('data/content.json');
    const c = await res.json();
    
    // Hero
    document.getElementById('heroBadge').textContent = c.hero?.badge;
    document.getElementById('heroLine1').textContent = c.hero?.headline1;
    
    // Services (dynamic cards)
    document.getElementById('servicesGrid').innerHTML = c.services.map(s => `
        <div class="service-card">
            <div class="service-icon">${ICONS[s.icon]}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <div class="service-tags">${s.tags.map(t => `<span class="service-tag">${t}</span>`).join('')}</div>
        </div>
    `).join('');
}
```

## Content JSON Schema (NeuralFlow example)

```json
{
  "hero": {
    "badge": "AI Automation Agency — Open for Projects",
    "headline1": "Otomasi Bisnis",
    "headlineAccent": "dengan AI Cerdas",
    "description": "...",
    "ctaPrimary": "Konsultasi Gratis",
    "ctaSecondary": "Lihat Services",
    "metric1Value": "+340%",
    "metric1Label": "Lead Conversion",
    "metric2Value": "24/7",
    "metric2Label": "AI Response"
  },
  "services": [
    { "icon": "chat", "title": "...", "description": "...", "tags": ["Tag1", "Tag2"] }
  ],
  "stats": [{ "value": "98%", "label": "Client Satisfaction" }],
  "process": [{ "step": "01", "title": "...", "description": "..." }],
  "results": [{ "metric": "+340%", "title": "...", "description": "..." }],
  "pricing": [{ "name": "Starter", "price": "$500", "period": "/project", "description": "...", "features": [], "featured": false }],
  "testimonials": [{ "quote": "...", "name": "...", "role": "...", "initials": "AB" }],
  "cta": { "label": "...", "headline": "...", "headlineLine2": "...", "subtitle": "...", "buttonPrimary": "...", "buttonSecondary": "..." },
  "contact": { "email": "...", "whatsapp": "62xxxxxxxxxx" },
  "footer": {
    "description": "...",
    "links": {
      "services": ["AI Chatbot", "Workflow Automation"],
      "company": ["Case Studies", "Pricing"],
      "contact": ["hello@...", "WhatsApp"]
    }
  }
}
```

## CMS Editor Pattern (per section)

Each `cms-*.html` uses this pattern:
- Fixed sidebar with all section links
- Form fields for the section data
- `localStorage` for auto-save (survives page refresh)
- `exportJSON()` function → downloads merged `content.json`
- "Preview" button links to `../public/index.html`

```javascript
// Save to localStorage
localStorage.setItem('neuralflow_hero', JSON.stringify(data));
localStorage.setItem('neuralflow_hero_saved', new Date().toLocaleTimeString('id-ID'));

// Export all sections as one JSON
function exportJSON() {
    const all = JSON.parse(localStorage.getItem('neuralflow_content')) || {};
    all.hero = JSON.parse(localStorage.getItem('neuralflow_hero'));
    // merge other sections...
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.json';
    a.click();
}
```

## Server Serving

```bash
cd /home/admin/ai-automation
python3 -m http.server 8787 --bind 0.0.0.0
# Landing: http://host:8787/public/
# CMS:     http://host:8787/admin/
```

## Erik's Preference

Erik prefers: **no backend = simpler, faster**. He explicitly rejected PHP backend for this project. For future projects, present both options and let him choose. Don't assume PHP backend is always needed.

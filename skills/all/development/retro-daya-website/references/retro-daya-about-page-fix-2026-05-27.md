# About Page Layout Fix — 2026-05-27

## Problem
The `about.html` page had its own custom sections (`.about-section`, `.mission-vision`, `.factory-section`, `.address-section`) referenced in HTML but **zero CSS definitions** — both in `styles.css` AND in any page-level `<style>` block. Result: layout was completely broken (stacked vertically, no grid, no spacing).

## Fix Applied
Added a full `<style>` block directly in `about.html` (lines 253–333) covering all page-specific sections:

```css
.page-hero { padding: 140px 0 80px; position: relative; overflow: hidden; }
.page-hero-bg { position: absolute; inset: 0; z-index: 0; }
.page-hero .container { position: relative; z-index: 1; }

.about-section { padding: 80px 0; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.about-left .section-tag { margin-bottom: 8px; }
.about-left .section-title { margin-bottom: 24px; }
.about-body { color: #6B7280; line-height: 1.8; margin-bottom: 16px; }
.about-bullets { list-style: none; padding: 0; margin: 24px 0; display: flex; flex-direction: column; gap: 14px; }
.about-bullets li { display: flex; align-items: flex-start; gap: 12px; color: #374151; line-height: 1.6; }
.about-bullets li svg { flex-shrink: 0; margin-top: 2px; color: #0D9488; }
.about-img-wrap { position: relative; }
.about-img-wrap img { width: 100%; border-radius: 16px; display: block; }
.about-badge { position: absolute; bottom: -20px; right: -20px; background: #0D9488; color: #fff; padding: 20px 24px; border-radius: 12px; text-align: center; }
.about-badge-num { display: block; font-size: 2rem; font-weight: 800; line-height: 1; }
.about-badge-text { display: block; font-size: 0.75rem; font-weight: 500; margin-top: 4px; }

.mission-vision { padding: 80px 0; background: #F8FAFC; }
.mission-vision .container { max-width: 960px; }
.mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.mv-card { background: #fff; padding: 32px; border-radius: 16px; border: 1px solid #E5E7EB; }
.mv-icon { color: #0D9488; margin-bottom: 16px; }
.mv-card h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 12px; color: #111827; }
.mv-card p { color: #6B7280; line-height: 1.7; font-size: 0.9375rem; }

.factory-section { padding: 80px 0; }
.factory-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.factory-img img { width: 100%; border-radius: 12px; display: block; aspect-ratio: 16/9; object-fit: cover; }

.address-section { padding: 80px 0; background: #F8FAFC; }
.address-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.address-cards { display: flex; flex-direction: column; gap: 20px; margin-top: 24px; }
.address-card { display: flex; gap: 16px; align-items: flex-start; }
.address-icon { color: #0D9488; flex-shrink: 0; }
.address-card h4 { font-weight: 700; margin-bottom: 4px; font-size: 0.9375rem; }
.address-card p { color: #6B7280; font-size: 0.875rem; line-height: 1.6; }
#map { border-radius: 12px; overflow: hidden; min-height: 300px; }
#map iframe { width: 100%; height: 100%; min-height: 300px; border: 0; }

@media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .about-badge { bottom: -16px; right: 16px; }
    .mv-grid, .factory-grid, .address-grid { grid-template-columns: 1fr; }
}
```

## Rule: Sub-Page CSS Isolation
Each sub-page (about, services, project, product, contact) may use sections NOT in `styles.css`. **Always `grep styles.css` first** — if a class doesn't exist there and the page renders broken, the sub-page needs its own inline `<style>` block. Rule: `about.html` sections → inline `<style>` in `about.html`, never assume they'll be in `styles.css`.

## Sections on about.html
1. `.page-hero` — hero with breadcrumb
2. `.about-section` — 2-col: bullet list left + team photo + badge right
3. `.mission-vision` — grey bg, 2-col mission/vision cards
4. `.factory-section` — factory photos 2-col grid
5. `.address-section` — grey bg, address info + Google Maps iframe

## Map Embed
`about.html` has a `<div id="map">` placeholder that gets filled with a Google Maps iframe. Needs CSS for container height. Both covered in the fix above.

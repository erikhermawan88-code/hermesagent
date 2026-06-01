# Adminator CMS Page Pattern — Standalone Approach

Created: 2026-05-29

Erik wanted CMS pages positioned under the Dashboard menu in the Adminator sidebar, styled to match the Adminator template exactly. This reference documents the standalone CMS page approach (no NAV array modification required).

## When to Use This vs. Proper Integration

**Use standalone approach** (this doc):
- Need CMS working NOW, don't want to touch `2026.js`
- Only 1–2 CMS pages needed
- Future pages can also be standalone

**Use proper integration** (NAV array in `2026.js`):
- 5+ CMS pages planned — sidebar maintenance becomes burden
- Want unified sidebar state (active item highlighting, responsive drawer)
- Will maintain long-term

## Standalone CMS Page Pattern

Template: `/home/admin/domains/digitalnusa.com/public_html/furnicraft/admin/cms.html`

### Shell Structure (matches Adminator exactly)
```html
<body data-active="cms" data-crumbs="Workspace | CMS">
  <div class="shell">
    <!-- Hardcoded sidebar matching Adminator NAV -->
    <aside class="d-sidebar" id="sidebar">
      <div class="brand">...</div>
      <nav class="nav-section">
        <div class="workspace">WORKSPACE</div>
        <a class="nav-link" href="index.html">
          <svg viewBox="0 0 24 24">...</svg>
          <span>Dashboard</span>
        </a>
        <a class="nav-link is-active" href="cms.html">
          <svg viewBox="0 0 24 24">...</svg>
          <span>CMS</span>
        </a>
      </nav>
      <!-- other sections: COMMUNICATIONS, COMPONENTS, PAGES -->
    </aside>

    <div class="main">
      <header class="d-topbar">
        <div class="topbar-left">
          <button class="hamburger" id="drawerToggle">...</button>
          <div class="crumbs">
            <span>Workspace</span>
            <span>›</span>
            <span class="current">CMS</span>
          </div>
        </div>
        <div class="topbar-right">...</div>
      </header>

      <main class="content">
        <!-- Hero + tabbed CMS panels -->
      </main>

      <footer class="d-footer">...</footer>
    </div>
  </div>
</body>
```

### Key Adminator CSS Classes Used
| Class | Purpose |
|---|---|
| `.shell` | Flex container: sidebar + main |
| `.d-sidebar` | Dark sidebar panel |
| `.brand` | Logo area at top of sidebar |
| `.brand-text` | Brand name text |
| `.workspace` | Section label in sidebar |
| `.nav-link` | Sidebar menu item |
| `.nav-link.is-active` | Active/highlighted nav item |
| `.d-topbar` | Top navigation bar |
| `.topbar-left` / `.topbar-right` | Topbar halves |
| `.crumbs` | Breadcrumb trail |
| `.hamburger` | Mobile drawer toggle |
| `.cmd` | Search button |
| `.topbar-icon-btn` | Notification/message icons |
| `.avatar` | User avatar circle |
| `.content` | Main page content area |
| `.card` | White card container |
| `.card-head` | Card header row |
| `.card-title` | Card heading |
| `.hero` | Hero section |
| `.hero-title` | Large heading |
| `.hero-sub` | Subtitle paragraph |
| `.eyebrow` | Small uppercase label |
| `.btn` | Button base |
| `.btn--primary` | Primary button (teal fill) |
| `.btn--ghost` | Ghost/outline button |
| `.btn--sm` | Small button variant |
| `.form-group` | Form field wrapper |
| `.form-label` | Field label |
| `.form-input` | Input/textarea field |
| `.badge` | Small badge (NEW, primary, etc.) |
| `.d-footer` | Page footer |

### Color Variables
```css
--primary: #009F75    /* teal — buttons, active states */
--success: #10b981    /* green */
--danger: #ef4444     /* red */
--warning: #f59e0b   /* amber */
--info: #3b82f6       /* blue */
--purple: #8b5cf6     /* purple */
--bg-card: #ffffff
--bg-muted: #f1f5f9
--border: #e2e8f0
--t-base: #1e293b
--t-muted: #64748b
--t-light: #94a3b8
```

### Tab Pattern
```html
<div class="cms-tabs" role="tablist">
  <button class="cms-tab is-active" data-tab="info">Info & Contact</button>
  <button class="cms-tab" data-tab="services">Services</button>
</div>
<div class="cms-panel is-active" id="panel-info">...</div>
<div class="cms-panel" id="panel-services">...</div>
```

JS tab switch:
```javascript
document.querySelectorAll('.cms-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cms-tab').forEach(t => t.classList.remove('is-active'));
    document.querySelectorAll('.cms-panel').forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('is-active');
  });
});
```

### Repeater Pattern (add/remove list items)
For services, testimonials, stats — items can be added or removed dynamically.

```javascript
// Add item
function addService() {
  const list = document.getElementById('services-list');
  list.appendChild(makeServiceItem({ name: '', icon: '', description: '' }, list.children.length));
}

// Remove item — removes closest .cms-repeater-item
function removeItem(btn, section, idx) {
  btn.closest('.cms-repeater-item').remove();
}

// Read all items from DOM
function readServices() {
  return Array.from(document.querySelectorAll('#services-list .cms-repeater-item')).map((item, i) => ({
    id: i + 1,
    name: item.querySelector('.svc-name').value.trim(),
    icon: item.querySelector('.svc-icon').value.trim(),
    description: item.querySelector('.svc-desc').value.trim()
  }));
}
```

### API Integration
All CMS pages share the same `content.php` API:

```
GET  https://digitalnusa.com/furnicraft/api/content.php
PUT  https://digitalnusa.com/furnicraft/api/content.php
     Body: { "info": {...}, "contact": {...} }  // partial update, merges
```

PUT uses `array_merge($current, $update)` so only changed sections are overwritten.

### Toast Notification Pattern
```javascript
function showToast(msg, type) { // type: 'success' | 'error'
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.className = 'cms-toast ' + type + ' is-visible';
  setTimeout(() => toast.classList.remove('is-visible'), 3000);
}
```

### Furnicraft CMS File
`/home/admin/domains/digitalnusa.com/public_html/furnicraft/admin/cms.html` — 5 tabs:
- Info & Contact
- Services
- Why Us
- Statistics
- Testimonials

## Future CMS Pages
If Erik wants separate pages (cms-hero.html, cms-services.html, etc.), each follows the same standalone pattern. Consider migrating to proper Adminator integration (NAV array in `2026.js`) if 3+ pages are needed — less duplication.

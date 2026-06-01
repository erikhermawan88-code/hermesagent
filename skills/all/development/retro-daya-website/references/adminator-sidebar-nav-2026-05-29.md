# Adminator Sidebar NAV Structure (2026-05-29)

## How the Sidebar Works

All adminator pages use `<div data-shell-sidebar></div>` as a placeholder. At runtime, `2026.js` reads `data-active` from `<body>` and renders the matching sidebar.

## Key Files
- `2026.js` — contains `NAV` array (lines 36–163) + `renderSidebar()`, `renderNavLink()`, `renderNavGroup()` functions
- All HTML pages — use `<div data-shell-sidebar></div>` placeholder

## NAV Array Structure
```javascript
const NAV = [{
  label: 'Section Label',    // appears as nav section header
  items: [{
    key: 'unique-key',       // matches body[data-active]
    text: 'Menu Text',
    href: 'page.html',       // relative link
    icon: '<svg paths>',     // inline SVG icon
    badge: { kind: 'new|pro|primary', text: 'BADGE' },  // optional
    children: [{             // optional submenu → renders as collapsible group
      key: 'sub-key',
      text: 'Sub Text',
      href: 'sub.html'
    }]
  }]
}, { ... }];
```

## Rendering Functions
- `renderNavLink(item, activeKey)` → `<a class="nav-link is-active">` if key matches
- `renderNavGroup(item, activeKey)` → collapsible `<div class="nav-item-group is-open">` if any child matches
- `renderSection(section, activeKey)` → wraps items in `<nav class="nav-section">`

## Adding a New Menu Item (e.g. CMS)
1. Add item to `NAV` array in `2026.js` under appropriate section
2. Set `body data-active="page-key"` to mark active state
3. If submenu: use `children: [{ key, text, href }]` array
4. If standalone link: just `key + text + href + icon`

## Sidebar Shell HTML Pattern (all pages)
```html
<body data-active="dashboard" data-crumbs="Workspace | Dashboard">
  <div class="shell">
    <div data-shell-sidebar></div>   <!-- sidebar injected here -->
    <div class="main">
      <div data-shell-topbar></div>  <!-- topbar injected here -->
      <main class="content">
        <!-- page content -->
      </main>
    </div>
  </div>
```

## Breadcrumb Format
`data-crumbs="Section | Page"` — topbar renders this as breadcrumb trail.

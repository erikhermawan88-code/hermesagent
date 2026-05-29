"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["2026"],{

/***/ "./assets/scripts/2026/Shell.js"
/*!**************************************!*\
  !*** ./assets/scripts/2026/Shell.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NAV: () => (/* binding */ NAV),
/* harmony export */   mountShell: () => (/* binding */ mountShell)
/* harmony export */ });
/**
 * 2026 Shell renderer.
 *
 * Each page provides:
 *   <body data-active="dashboard" data-crumbs="Workspace | Dashboard">
 *     <div class="shell">
 *       <div data-shell-sidebar></div>
 *       <div class="main">
 *         <div data-shell-topbar></div>
 *         <main class="content"> ...page content... </main>
 *         <div data-shell-footer></div>
 *       </div>
 *     </div>
 *   </body>
 *
 * mountShell() fills the three placeholder divs with the shared chrome,
 * marking the active sidebar item and writing the breadcrumbs.
 *
 * NAV is the single source of truth — adding a page is one entry here.
 */

const NAV = [{
  label: 'Workspace',
  items: [{
    key: 'dashboard',
    text: 'Dashboard',
    href: 'index.html',
    icon: '<path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/>'
  }, {
    key: 'docs',
    text: 'Documentation',
    href: 'https://adminator.colorlib.com/docs/',
    badge: {
      kind: 'new',
      text: 'DOCS'
    },
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
  }, {
    key: 'pro',
    text: 'Go Pro',
    href: 'https://dashboardpack.com/?utm_source=colorlib&utm_medium=adminator-demo&utm_campaign=sidebar-go-pro',
    badge: {
      kind: 'pro',
      text: 'PRO'
    },
    icon: '<path d="M12 2 15 8l6.5 1-4.8 4.6L18 20l-6-3-6 3 1.3-6.4L2.5 9 9 8z"/>'
  }]
}, {
  label: 'Communications',
  items: [{
    key: 'email',
    text: 'Email',
    href: 'email.html',
    icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
  }, {
    key: 'compose',
    text: 'Compose',
    href: 'compose.html',
    icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z"/>'
  }, {
    key: 'calendar',
    text: 'Calendar',
    href: 'calendar.html',
    icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
  }, {
    key: 'chat',
    text: 'Chat',
    href: 'chat.html',
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
  }]
}, {
  label: 'Components',
  items: [{
    key: 'charts',
    text: 'Charts',
    href: 'charts.html',
    badge: {
      kind: 'new',
      text: 'NEW'
    },
    icon: '<path d="M3 20V4M7 20v-6M11 20v-10M15 20v-4M19 20V8"/>'
  }, {
    key: 'forms',
    text: 'Forms',
    href: 'forms.html',
    icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10h10M7 14h7"/>'
  }, {
    key: 'ui',
    text: 'UI Elements',
    href: 'ui.html',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>'
  }, {
    key: 'buttons',
    text: 'Buttons',
    href: 'buttons.html',
    icon: '<rect x="3" y="8" width="18" height="8" rx="4"/>'
  }, {
    key: 'tables',
    text: 'Tables',
    icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 16h18M9 4v16"/>',
    children: [{
      key: 'basic-table',
      text: 'Basic Table',
      href: 'basic-table.html'
    }, {
      key: 'datatable',
      text: 'Data Table',
      href: 'datatable.html'
    }]
  }, {
    key: 'maps',
    text: 'Maps',
    icon: '<path d="M9 20V4l6 4v16z"/><path d="M3 7l6-3v16l-6 3z"/><path d="M15 8l6-3v16l-6 3"/>',
    children: [{
      key: 'google-maps',
      text: 'Google Map',
      href: 'google-maps.html'
    }, {
      key: 'vector-maps',
      text: 'Vector Map',
      href: 'vector-maps.html'
    }]
  }, {
    key: 'pages',
    text: 'Pages',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    children: [{
      key: 'blank',
      text: 'Blank',
      href: 'blank.html'
    }, {
      key: '404',
      text: '404',
      href: '404.html'
    }, {
      key: '500',
      text: '500',
      href: '500.html'
    }, {
      key: 'signin',
      text: 'Sign In',
      href: 'signin.html'
    }, {
      key: 'signup',
      text: 'Sign Up',
      href: 'signup.html'
    }]
  }]
}];
const BRAND_LOGO = `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
  <path fill="#ffffff" d="M14.747 9.125c.527-1.426 1.736-2.573 3.317-2.573c1.643 0 2.792 1.085 3.318 2.573l6.077 16.867c.186.496.248.931.248 1.147c0 1.209-.992 2.046-2.139 2.046c-1.303 0-1.954-.682-2.264-1.611l-.931-2.915h-8.62l-.93 2.884c-.31.961-.961 1.642-2.232 1.642c-1.24 0-2.294-.93-2.294-2.17c0-.496.155-.868.217-1.023l6.233-16.867zm.34 11.256h5.891l-2.883-8.992h-.062l-2.946 8.992z"/>
</svg>`;
const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 18 6-6-6-6"/></svg>';
function renderNavLink(item, activeKey) {
  const active = item.key === activeKey ? ' is-active' : '';
  const badge = item.badge ? `<span class="nav-badge ${item.badge.kind}">${item.badge.text}</span>` : '';
  const external = /^https?:\/\//.test(item.href) ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `
    <a class="nav-link${active}" href="${item.href}"${external}>
      <svg viewBox="0 0 24 24">${item.icon}</svg>
      <span>${item.text}</span>
      ${badge}
    </a>`;
}
function renderNavGroup(item, activeKey) {
  const open = item.children.some(c => c.key === activeKey) ? ' is-open' : '';
  const submenu = item.children.map(c => `<a href="${c.href}">${c.text}</a>`).join('');
  return `
    <div class="nav-item-group${open}" data-nav-group>
      <a class="nav-link" href="javascript:void(0)" data-nav-toggle>
        <svg viewBox="0 0 24 24">${item.icon}</svg>
        <span>${item.text}</span>
        ${CHEV}
      </a>
      <div class="nav-submenu">${submenu}</div>
    </div>`;
}
function renderSection(section, activeKey) {
  const items = section.items.map(item => item.children ? renderNavGroup(item, activeKey) : renderNavLink(item, activeKey)).join('');
  return `
    <nav class="nav-section">
      <div class="nav-label">${section.label}</div>
      ${items}
    </nav>`;
}
function renderSidebar(activeKey) {
  const sections = NAV.map(s => renderSection(s, activeKey)).join('');
  return `
    <aside class="d-sidebar">
      <div class="brand">
        <div class="brand-logo">${BRAND_LOGO}</div>
        <div class="brand-text">
          <div class="brand-name">Adminator</div>
          <div class="brand-tag">v4.1.5 · preview</div>
        </div>
      </div>
      ${sections}
      <div class="sidebar-footer">
        <div class="workspace">
          <div class="workspace-avatar">JD</div>
          <div class="workspace-text">
            <div class="workspace-name">John Doe</div>
            <div class="workspace-role">admin</div>
          </div>
          <svg class="workspace-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="m7 9 5-5 5 5"/><path d="m7 15 5 5 5-5"/>
          </svg>
        </div>
      </div>
    </aside>`;
}
function renderCrumbs(crumbsAttr) {
  if (!crumbsAttr) return '';
  const parts = crumbsAttr.split('|').map(p => p.trim()).filter(Boolean);
  const sep = '<svg class="sep" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
  return parts.map((p, i) => {
    const cls = i === parts.length - 1 ? ' class="current"' : '';
    return `${i > 0 ? sep : ''}<span${cls}>${p}</span>`;
  }).join('');
}
function renderTopbar(crumbsAttr) {
  return `
    <header class="d-topbar">
      <div class="crumbs">
        <button class="hamburger" data-drawer-open aria-label="Open navigation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        ${renderCrumbs(crumbsAttr)}
      </div>
      <div class="topbar-actions">
        <button class="cmd" data-palette-open>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Search...</span>
          <kbd class="kbd">⌘K</kbd>
        </button>

        <div class="dd-wrap">
          <button class="icon-btn" data-dropdown aria-label="Notifications">
            <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span class="count danger">3</span>
          </button>
          <div class="dd-menu" role="menu">
            <div class="dd-head">
              <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notifications
            </div>
            <div class="dd-list">
              <a class="dd-item" href="#">
                <div class="dd-avatar a1">JD</div>
                <div class="dd-body">
                  <div class="dd-text"><strong>John Doe</strong> liked your <em>post</em></div>
                  <div class="dd-time">5 MIN AGO</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a2">MD</div>
                <div class="dd-body">
                  <div class="dd-text"><strong>Moo Doe</strong> liked your <em>cover image</em></div>
                  <div class="dd-time">7 MIN AGO</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a3">LD</div>
                <div class="dd-body">
                  <div class="dd-text"><strong>Lee Doe</strong> commented on your <em>video</em></div>
                  <div class="dd-time">10 MIN AGO</div>
                </div>
              </a>
            </div>
            <a class="dd-footer" href="#">View all notifications →</a>
          </div>
        </div>

        <div class="dd-wrap">
          <button class="icon-btn" data-dropdown aria-label="Messages">
            <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            <span class="count info">3</span>
          </button>
          <div class="dd-menu" role="menu">
            <div class="dd-head">
              <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              Messages
            </div>
            <div class="dd-list">
              <a class="dd-item" href="#">
                <div class="dd-avatar a1">JD</div>
                <div class="dd-body">
                  <div class="dd-row-head"><strong>John Doe</strong><span class="dd-time">5 MIN</span></div>
                  <div class="dd-preview">Want to create your own customized data generator for your app…</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a2">MD</div>
                <div class="dd-body">
                  <div class="dd-row-head"><strong>Moo Doe</strong><span class="dd-time">15 MIN</span></div>
                  <div class="dd-preview">Want to create your own customized data generator for your app…</div>
                </div>
              </a>
              <a class="dd-item" href="#">
                <div class="dd-avatar a3">LD</div>
                <div class="dd-body">
                  <div class="dd-row-head"><strong>Lee Doe</strong><span class="dd-time">25 MIN</span></div>
                  <div class="dd-preview">Want to create your own customized data generator for your app…</div>
                </div>
              </a>
            </div>
            <a class="dd-footer" href="#">View all messages →</a>
          </div>
        </div>

        <button class="icon-btn" id="themeToggle" aria-label="Toggle theme"></button>

        <div class="dd-wrap">
          <div class="avatar" data-dropdown tabindex="0" role="button" aria-label="Account menu">JD</div>
          <div class="dd-menu dd-profile" role="menu">
            <div class="dd-profile-head">
              <div class="dd-profile-name">John Doe</div>
              <div class="dd-profile-email">john@adminator.app</div>
            </div>
            <a class="dd-menu-item" href="#">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Settings
            </a>
            <a class="dd-menu-item" href="#">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profile
            </a>
            <a class="dd-menu-item" href="email.html">
              <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              Messages
            </a>
            <div class="dd-divider"></div>
            <a class="dd-menu-item danger" href="#">
              <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>`;
}
function renderFooter() {
  return `
    <footer class="d-footer">
      <div>© 2026 · Designed by <a href="https://colorlib.com" target="_blank" rel="nofollow noopener noreferrer">Colorlib</a></div>
      <div class="d-footer-meta">
        <span>v4.1.5</span>
        <span>preview build</span>
      </div>
    </footer>`;
}
function mountShell() {
  const body = document.body;
  const activeKey = body.getAttribute('data-active') || '';
  const crumbs = body.getAttribute('data-crumbs') || '';
  const sidebarHost = document.querySelector('[data-shell-sidebar]');
  const topbarHost = document.querySelector('[data-shell-topbar]');
  const footerHost = document.querySelector('[data-shell-footer]');
  if (sidebarHost) sidebarHost.outerHTML = renderSidebar(activeKey);
  if (topbarHost) topbarHost.outerHTML = renderTopbar(crumbs);
  if (footerHost) footerHost.outerHTML = renderFooter();
}

/***/ },

/***/ "./assets/scripts/2026/calendar.js"
/*!*****************************************!*\
  !*** ./assets/scripts/2026/calendar.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initCalendarPage: () => (/* binding */ initCalendarPage)
/* harmony export */ });
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core */ "../node_modules/@fullcalendar/core/index.js");
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/daygrid */ "../node_modules/@fullcalendar/daygrid/index.js");
/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fullcalendar/timegrid */ "../node_modules/@fullcalendar/timegrid/index.js");
/* harmony import */ var _fullcalendar_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/list */ "../node_modules/@fullcalendar/list/index.js");
/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fullcalendar/interaction */ "../node_modules/@fullcalendar/interaction/index.js");
/**
 * FullCalendar wiring for the 2026 design system.
 *
 * A page declares the calendar mount as <div data-fc></div>; this module
 * initializes FullCalendar with the seed events below, themes it via the
 * 2026 toolbar (we hide FC's built-in toolbar and let our own buttons drive
 * .next() / .prev() / .today() / .changeView()), and re-renders on theme
 * change so colors stay in sync.
 */






const SEED_EVENTS = [{
  title: 'Q2 kickoff',
  start: '2026-04-01T09:00',
  classNames: ['fc-cat-work']
}, {
  title: 'Design review',
  start: '2026-04-02T11:00',
  classNames: ['fc-cat-team']
}, {
  title: 'Lunch w/ Marcus',
  start: '2026-04-03T13:00',
  classNames: ['fc-cat-personal']
}, {
  title: '🎂 Sara birthday',
  start: '2026-04-05',
  allDay: true,
  classNames: ['fc-cat-birthday']
}, {
  title: 'Standup',
  start: '2026-04-07T10:00',
  classNames: ['fc-cat-work']
}, {
  title: 'Brand workshop',
  start: '2026-04-07T14:00',
  classNames: ['fc-cat-team']
}, {
  title: 'All-hands',
  start: '2026-04-08T15:00',
  classNames: ['fc-cat-work']
}, {
  title: '✈ Lisbon trip',
  start: '2026-04-09',
  end: '2026-04-13',
  allDay: true,
  classNames: ['fc-cat-travel']
}, {
  title: 'Investor sync',
  start: '2026-04-14T16:00',
  classNames: ['fc-cat-work']
}, {
  title: '📑 Tax deadline',
  start: '2026-04-15',
  allDay: true,
  classNames: ['fc-cat-finance']
}, {
  title: 'Invoice approval',
  start: '2026-04-17T12:00',
  classNames: ['fc-cat-finance']
}, {
  title: 'Run with Mira',
  start: '2026-04-20T07:00',
  classNames: ['fc-cat-personal']
}, {
  title: 'Earth day talk',
  start: '2026-04-22T14:00',
  classNames: ['fc-cat-team']
}, {
  title: '✓ Dependency merge',
  start: '2026-04-23',
  allDay: true,
  classNames: ['fc-cat-work']
}, {
  title: 'Coffee w/ Rita',
  start: '2026-04-24T10:00',
  classNames: ['fc-cat-personal']
}, {
  title: 'PR reviews',
  start: '2026-04-24T15:00',
  classNames: ['fc-cat-work']
}, {
  title: 'Run · 5K',
  start: '2026-04-25T07:00',
  classNames: ['fc-cat-personal']
}, {
  title: "Dinner @ Carla's",
  start: '2026-04-25T20:00',
  classNames: ['fc-cat-personal']
}, {
  title: 'Sprint planning',
  start: '2026-04-27T10:00',
  classNames: ['fc-cat-work']
}, {
  title: 'Board review',
  start: '2026-04-28T14:00',
  classNames: ['fc-cat-work']
}, {
  title: 'Eng review',
  start: '2026-04-28T17:00',
  classNames: ['fc-cat-team']
}, {
  title: 'Anya 1:1',
  start: '2026-04-29T11:30',
  classNames: ['fc-cat-team']
}, {
  title: 'Newsletter goes out',
  start: '2026-04-30T09:00',
  classNames: ['fc-cat-team']
}, {
  title: 'Yoga',
  start: '2026-04-30T19:00',
  classNames: ['fc-cat-personal']
}];
const VIEW_MAP = {
  Day: 'timeGridDay',
  Week: 'timeGridWeek',
  Month: 'dayGridMonth',
  Agenda: 'listWeek'
};
let calendar = null;
function bindToolbar(host) {
  // Wire the page's existing toolbar buttons to the FC instance.
  const root = host.closest('.cal-main') || document;
  const monthEl = root.querySelector('.cal-month');
  const updateTitle = () => {
    if (!monthEl || !calendar) return;
    const d = calendar.getDate();
    const month = d.toLocaleString('en-US', {
      month: 'long'
    });
    const year = d.getFullYear();
    monthEl.innerHTML = `${month} <span class="yr">${year}</span>`;
  };
  root.querySelectorAll('.cal-nav-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (!calendar) return;
      if (idx === 0) calendar.prev();
      if (idx === 1) calendar.next();
      updateTitle();
    });
  });
  const today = root.querySelector('.cal-today-btn');
  if (today) today.addEventListener('click', () => {
    calendar.today();
    updateTitle();
  });
  root.querySelectorAll('.cal-view-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const label = tab.textContent.trim();
      const view = VIEW_MAP[label] || 'dayGridMonth';
      root.querySelectorAll('.cal-view-tab').forEach(t => t.classList.toggle('is-active', t === tab));
      calendar.changeView(view);
      updateTitle();
    });
  });

  // Title isn't filled in until the calendar is rendered.
  setTimeout(updateTitle, 0);
}
function build(host) {
  if (calendar) {
    try {
      calendar.destroy();
    } catch {/* re-build below */}
  }
  calendar = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_0__.Calendar(host, {
    plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__["default"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_2__["default"], _fullcalendar_list__WEBPACK_IMPORTED_MODULE_3__["default"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_4__["default"]],
    initialView: 'dayGridMonth',
    initialDate: '2026-04-25',
    headerToolbar: false,
    height: '100%',
    expandRows: true,
    dayMaxEvents: 3,
    fixedWeekCount: false,
    firstDay: 0,
    nowIndicator: true,
    selectable: true,
    editable: true,
    events: SEED_EVENTS,
    dayHeaderFormat: {
      weekday: 'short'
    }
  });
  calendar.render();
  bindToolbar(host);
}
function initCalendarPage() {
  const host = document.querySelector('[data-fc]');
  if (!host) return;
  build(host);
  // Re-render on theme change so any token-driven colors update.
  const observer = new MutationObserver(records => {
    if (records.some(r => r.attributeName === 'data-theme')) {
      // Just trigger a redraw — colors come from CSS, not from JS.
      if (calendar) calendar.render();
    }
  });
  observer.observe(document.documentElement, {
    attributes: true
  });
}

/***/ },

/***/ "./assets/scripts/2026/charts.js"
/*!***************************************!*\
  !*** ./assets/scripts/2026/charts.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEEDS: () => (/* binding */ SEEDS),
/* harmony export */   initCharts: () => (/* binding */ initCharts)
/* harmony export */ });
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ "../node_modules/chart.js/dist/chart.js");
/**
 * Chart.js wiring for the 2026 design system.
 *
 * Pages declare charts as <canvas data-chart="<type>" data-key="<seed>"></canvas>.
 * This module reads CSS variables for theme colors so charts match the active
 * theme, instantiates a Chart.js instance, and re-renders on theme toggle.
 *
 * To keep the chart-page demo visually rich, the seeds are baked-in samples
 * keyed by data-key.
 */


chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(...chart_js__WEBPACK_IMPORTED_MODULE_0__.registerables);
function tokens() {
  const cs = getComputedStyle(document.documentElement);
  return {
    primary: cs.getPropertyValue('--primary').trim(),
    success: cs.getPropertyValue('--success').trim(),
    danger: cs.getPropertyValue('--danger').trim(),
    warning: cs.getPropertyValue('--warning').trim(),
    info: cs.getPropertyValue('--info').trim(),
    purple: cs.getPropertyValue('--purple').trim(),
    pink: cs.getPropertyValue('--pink').trim(),
    orange: cs.getPropertyValue('--orange').trim(),
    teal: cs.getPropertyValue('--teal').trim(),
    text: cs.getPropertyValue('--t-base').trim(),
    muted: cs.getPropertyValue('--t-muted').trim(),
    light: cs.getPropertyValue('--t-light').trim(),
    border: cs.getPropertyValue('--border').trim(),
    soft: cs.getPropertyValue('--border-soft').trim(),
    bg: cs.getPropertyValue('--bg-card').trim()
  };
}
function applyDefaults(t) {
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.font.size = 12;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.color = t.muted;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.borderColor = t.soft;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.legend.position = 'bottom';
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.legend.labels.usePointStyle = true;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.legend.labels.padding = 16;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.legend.labels.boxWidth = 8;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.legend.labels.boxHeight = 8;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.tooltip.backgroundColor = t.text;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.tooltip.titleColor = t.bg;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.tooltip.bodyColor = t.bg;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.tooltip.padding = 10;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.tooltip.cornerRadius = 6;
  chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.defaults.plugins.tooltip.displayColors = false;
}
const SEEDS = {
  'revenue-line': t => ({
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: '2026',
        data: [42, 56, 50, 78, 88, 96, 110, 124, 118, 142, 158, 184],
        borderColor: t.primary,
        backgroundColor: `${t.primary}20`,
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2.5
      }, {
        label: '2025',
        data: [38, 44, 46, 60, 70, 74, 82, 90, 92, 102, 110, 118],
        borderColor: t.muted,
        backgroundColor: 'transparent',
        tension: 0.35,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
        borderDash: [4, 4]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: {
            color: t.soft,
            drawBorder: false
          },
          ticks: {
            color: t.light
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: t.light
          }
        }
      }
    }
  }),
  'channels-bar': t => ({
    type: 'bar',
    data: {
      labels: ['Direct', 'Search', 'Social', 'Email', 'Affiliate', 'Display', 'Other'],
      datasets: [{
        label: 'Visitors',
        data: [124, 88, 72, 54, 36, 28, 18],
        backgroundColor: [t.primary, t.success, t.purple, t.info, t.warning, t.pink, t.muted],
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          grid: {
            color: t.soft,
            drawBorder: false
          },
          ticks: {
            color: t.light
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: t.muted
          }
        }
      }
    }
  }),
  'devices-doughnut': t => ({
    type: 'doughnut',
    data: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [{
        data: [62, 30, 8],
        backgroundColor: [t.primary, t.purple, t.info],
        borderColor: t.bg,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  }),
  'sources-radar': t => ({
    type: 'radar',
    data: {
      labels: ['Speed', 'UX', 'Reliability', 'Pricing', 'Support', 'Features'],
      datasets: [{
        label: 'Adminator',
        data: [85, 92, 88, 76, 80, 95],
        borderColor: t.primary,
        backgroundColor: `${t.primary}30`,
        pointBackgroundColor: t.primary
      }, {
        label: 'Competitor',
        data: [70, 65, 75, 82, 60, 70],
        borderColor: t.muted,
        backgroundColor: `${t.muted}20`,
        pointBackgroundColor: t.muted
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: t.soft
          },
          grid: {
            color: t.soft
          },
          pointLabels: {
            color: t.muted,
            font: {
              size: 11
            }
          },
          ticks: {
            display: false
          }
        }
      }
    }
  }),
  'mrr-stacked': t => ({
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Starter',
        data: [12, 18, 22, 28],
        backgroundColor: t.info,
        borderRadius: 4,
        stack: 'a'
      }, {
        label: 'Pro',
        data: [38, 48, 56, 64],
        backgroundColor: t.primary,
        borderRadius: 4,
        stack: 'a'
      }, {
        label: 'Team',
        data: [22, 28, 36, 44],
        backgroundColor: t.purple,
        borderRadius: 4,
        stack: 'a'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: true,
          grid: {
            color: t.soft,
            drawBorder: false
          },
          ticks: {
            color: t.light
          }
        },
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: t.muted
          }
        }
      }
    }
  }),
  'dashboard-monthly': t => ({
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Revenue',
        data: [42, 38, 56, 50, 78, 70, 96, 88, 118, 102, 144, 168],
        borderColor: t.primary,
        backgroundColor: `${t.primary}24`,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: t.primary,
        pointHoverBorderColor: t.bg,
        pointHoverBorderWidth: 3,
        borderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          grid: {
            color: t.soft,
            drawBorder: false
          },
          ticks: {
            color: t.light,
            maxTicksLimit: 4
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: t.light,
            font: {
              size: 10
            }
          }
        }
      }
    }
  }),
  'sessions-area': t => ({
    type: 'line',
    data: {
      labels: Array.from({
        length: 30
      }, (_, i) => `${i + 1}`),
      datasets: [{
        label: 'Sessions',
        data: [120, 132, 110, 145, 162, 158, 175, 188, 172, 195, 210, 224, 218, 240, 256, 248, 272, 290, 282, 308, 322, 318, 340, 358, 352, 376, 392, 388, 410, 432],
        borderColor: t.success,
        backgroundColor: `${t.success}24`,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          grid: {
            color: t.soft,
            drawBorder: false
          },
          ticks: {
            color: t.light
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: t.light,
            maxTicksLimit: 6
          }
        }
      }
    }
  })
};
const instances = new Map();
function buildAll() {
  const t = tokens();
  applyDefaults(t);
  document.querySelectorAll('canvas[data-chart-key]').forEach(canvas => {
    const key = canvas.getAttribute('data-chart-key');
    const seed = SEEDS[key];
    if (!seed) return;
    const existing = instances.get(canvas);
    if (existing) existing.destroy();
    instances.set(canvas, new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(canvas, seed(t)));
  });
}
function initCharts() {
  if (!document.querySelector('canvas[data-chart-key]')) return;
  buildAll();
  // Re-render charts whenever the theme changes.
  const observer = new MutationObserver(records => {
    if (records.some(r => r.attributeName === 'data-theme')) buildAll();
  });
  observer.observe(document.documentElement, {
    attributes: true
  });
}

/***/ },

/***/ "./assets/scripts/2026/index.js"
/*!**************************************!*\
  !*** ./assets/scripts/2026/index.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_2026_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/2026/index.scss */ "./assets/styles/2026/index.scss");
/* harmony import */ var _Shell_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shell.js */ "./assets/scripts/2026/Shell.js");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init.js */ "./assets/scripts/2026/init.js");
/* harmony import */ var _charts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./charts.js */ "./assets/scripts/2026/charts.js");
/* harmony import */ var _maps_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./maps.js */ "./assets/scripts/2026/maps.js");
/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./calendar.js */ "./assets/scripts/2026/calendar.js");
/* harmony import */ var _palette_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./palette.js */ "./assets/scripts/2026/palette.js");
/**
 * 2026 entry point.
 *
 * Order of operations:
 *   1. Import the SCSS bundle (extracted to its own CSS file in production).
 *   2. Mount the shell (sidebar/topbar/footer) into the page placeholders.
 *   3. Wire shell behaviors (theme toggle, dropdowns, nav groups, todos).
 *
 * Each *-2026.html page has data-active + data-crumbs on <body> and three
 * placeholder divs ([data-shell-sidebar], [data-shell-topbar],
 * [data-shell-footer]) inside the .shell wrapper.
 */








function start() {
  (0,_Shell_js__WEBPACK_IMPORTED_MODULE_1__.mountShell)();
  (0,_init_js__WEBPACK_IMPORTED_MODULE_2__.initShellBehaviors)();
  (0,_palette_js__WEBPACK_IMPORTED_MODULE_6__.initPalette)();
  (0,_charts_js__WEBPACK_IMPORTED_MODULE_3__.initCharts)();
  (0,_maps_js__WEBPACK_IMPORTED_MODULE_4__.initVectorMaps)();
  (0,_calendar_js__WEBPACK_IMPORTED_MODULE_5__.initCalendarPage)();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}

/***/ },

/***/ "./assets/scripts/2026/init.js"
/*!*************************************!*\
  !*** ./assets/scripts/2026/init.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initShellBehaviors: () => (/* binding */ initShellBehaviors)
/* harmony export */ });
/**
 * 2026 Shell behaviors:
 *  - theme toggle (icon swap + persistence)
 *  - dropdown open/close
 *  - sidebar nav-group expand/collapse
 *  - hero date population
 *  - todo checkbox state
 *
 * The early-paint <script> in each page body sets the initial data-theme
 * attribute to avoid a flash; this module only handles runtime toggles.
 */

const STORE_KEY = 'dash26-theme';
const SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const update = () => {
    toggle.innerHTML = root.getAttribute('data-theme') === 'dark' ? SUN_ICON : MOON_ICON;
  };
  update();
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORE_KEY, next);
    } catch {/* localStorage may be unavailable */}
    update();
  });
}
function initHeroDate() {
  const el = document.getElementById('heroDate');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());
  const parts = fmt.replace(/,/g, '').split(' ');
  el.textContent = `${parts[0]} · ${parts[1]} ${parts[2]} · ${parts[3]}`;
}
function initNavGroups() {
  // Rail mode (sidebar collapsed to 72px) renders the submenu as a flyout,
  // so only one should be open at a time and outside-clicks should dismiss it.
  // The flyout is position:fixed (see _responsive.scss) — we position it here
  // via getBoundingClientRect so it survives a scrolling sidebar and clamps to
  // the viewport bottom on short screens (e.g. 750×590).
  const railMQ = window.matchMedia('(min-width: 721px) and (max-width: 1100px)');
  const positionFlyout = group => {
    const trigger = group.querySelector('[data-nav-toggle]');
    const submenu = group.querySelector('.nav-submenu');
    if (!trigger || !submenu) return;
    const r = trigger.getBoundingClientRect();
    const h = submenu.offsetHeight; // natural content height (max-height: 400 clamp)
    let top = Math.round(r.top);
    const maxTop = window.innerHeight - h - 8;
    if (top > maxTop) top = Math.max(8, maxTop);
    submenu.style.left = `${Math.round(r.right + 10)}px`;
    submenu.style.top = `${top}px`;
  };
  document.querySelectorAll('[data-nav-toggle]').forEach(a => {
    a.addEventListener('click', e => {
      const group = a.closest('[data-nav-group]');
      if (!group) return;
      e.stopPropagation();
      const willOpen = !group.classList.contains('is-open');
      if (railMQ.matches) {
        document.querySelectorAll('[data-nav-group].is-open').forEach(g => {
          if (g !== group) g.classList.remove('is-open');
        });
      }
      group.classList.toggle('is-open', willOpen);
      if (willOpen && railMQ.matches) positionFlyout(group);
    });
  });
  document.addEventListener('click', e => {
    if (!railMQ.matches) return;
    if (e.target.closest('[data-nav-group]')) return;
    document.querySelectorAll('[data-nav-group].is-open').forEach(g => g.classList.remove('is-open'));
  });

  // Keep the open flyout pinned to its trigger when the sidebar scrolls or the viewport resizes.
  const reposition = () => {
    if (!railMQ.matches) return;
    document.querySelectorAll('[data-nav-group].is-open').forEach(positionFlyout);
  };
  const sidebar = document.querySelector('.d-sidebar');
  if (sidebar) sidebar.addEventListener('scroll', reposition, {
    passive: true
  });
  window.addEventListener('resize', reposition);
}
function initDropdowns() {
  const closeAll = except => {
    document.querySelectorAll('.dd-wrap.is-open').forEach(w => {
      if (w !== except) w.classList.remove('is-open');
    });
  };
  document.querySelectorAll('[data-dropdown]').forEach(trigger => {
    const wrap = trigger.closest('.dd-wrap');
    if (!wrap) return;
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const willOpen = !wrap.classList.contains('is-open');
      closeAll(wrap);
      wrap.classList.toggle('is-open', willOpen);
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.dd-wrap')) closeAll();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
}
function initTodos() {
  document.querySelectorAll('.todo-check').forEach(cb => {
    cb.addEventListener('change', () => {
      const item = cb.closest('.todo-item');
      if (item) item.classList.toggle('is-done', cb.checked);
    });
  });
}
function initAccordions() {
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('[data-accordion]');
      if (item) item.classList.toggle('is-open');
    });
  });
}
function initTabGroups() {
  // Tabs that opt in by sharing a [data-tab-group] container.
  // Each .tab inside gets click → toggles is-active on siblings and
  // matches a sibling .tab-panel by data-tab-target.
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const tabs = group.querySelectorAll('.tab');
    const panels = group.querySelectorAll('.tab-panel');
    tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.preventDefault();
        const target = tab.getAttribute('data-tab-target');
        tabs.forEach(t => t.classList.toggle('is-active', t === tab));
        panels.forEach(p => p.classList.toggle('is-active', p.getAttribute('data-tab-id') === target));
      });
    });
  });
}
function initMobileDrawer() {
  // Mobile: hamburger button (rendered in topbar at ≤720px) opens an off-canvas
  // sidebar drawer. Closes on backdrop click, Esc, or selecting a nav link.
  const body = document.body;
  if (!body) return;

  // Inject a backdrop element once (used by CSS via body.has-drawer-open).
  if (!document.querySelector('.drawer-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    body.appendChild(backdrop);
    backdrop.addEventListener('click', closeDrawer);
  }
  function openDrawer() {
    body.classList.add('has-drawer-open');
  }
  function closeDrawer() {
    body.classList.remove('has-drawer-open');
  }
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-drawer-open]');
    if (trigger) {
      e.preventDefault();
      openDrawer();
      return;
    }
    // Auto-close when a sidebar nav link is selected (so the next page opens cleanly).
    const linkInDrawer = e.target.closest('.d-sidebar a[href]:not([href^="#"]):not([href="javascript:void(0)"])');
    if (body.classList.contains('has-drawer-open') && linkInDrawer) {
      closeDrawer();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && body.classList.contains('has-drawer-open')) closeDrawer();
  });
}
function initShellBehaviors() {
  initThemeToggle();
  initHeroDate();
  initNavGroups();
  initDropdowns();
  initTodos();
  initAccordions();
  initTabGroups();
  initMobileDrawer();
}

/***/ },

/***/ "./assets/scripts/2026/maps.js"
/*!*************************************!*\
  !*** ./assets/scripts/2026/maps.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initVectorMaps: () => (/* binding */ initVectorMaps)
/* harmony export */ });
/* harmony import */ var jsvectormap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsvectormap */ "../node_modules/jsvectormap/dist/jsvectormap.esm.js");
/* harmony import */ var jsvectormap_dist_maps_world_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsvectormap/dist/maps/world.js */ "../node_modules/jsvectormap/dist/maps/world.js");
/* harmony import */ var jsvectormap_dist_maps_world_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsvectormap_dist_maps_world_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsvectormap_dist_jsvectormap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsvectormap/dist/jsvectormap.css */ "../node_modules/jsvectormap/dist/jsvectormap.css");
/**
 * jsvectormap wiring for the 2026 design system.
 *
 * Pages declare a vector map as <div data-vmap></div>; this module fills it
 * with a world map themed using the active CSS variables and re-renders on
 * theme change.
 */




const MARKERS = [{
  name: 'Riga',
  coords: [56.95, 24.10]
}, {
  name: 'New York',
  coords: [40.71, -74.00]
}, {
  name: 'San Francisco',
  coords: [37.77, -122.42]
}, {
  name: 'London',
  coords: [51.50, -0.12]
}, {
  name: 'Berlin',
  coords: [52.52, 13.40]
}, {
  name: 'Tokyo',
  coords: [35.68, 139.69]
}, {
  name: 'Sydney',
  coords: [-33.86, 151.21]
}, {
  name: 'São Paulo',
  coords: [-23.55, -46.63]
}, {
  name: 'Cape Town',
  coords: [-33.92, 18.42]
}, {
  name: 'Dubai',
  coords: [25.27, 55.30]
}];
const instances = new Map();
function tokens() {
  const cs = getComputedStyle(document.documentElement);
  return {
    primary: cs.getPropertyValue('--primary').trim(),
    purple: cs.getPropertyValue('--purple').trim(),
    soft: cs.getPropertyValue('--bg-muted').trim(),
    border: cs.getPropertyValue('--border').trim(),
    text: cs.getPropertyValue('--t-base').trim(),
    bg: cs.getPropertyValue('--bg-card').trim()
  };
}
function buildOne(host) {
  // Destroy old instance if rebuilding
  const prev = instances.get(host);
  if (prev) {
    try {
      prev.destroy();
    } catch {/* swallow — host is about to be replaced */}
    host.innerHTML = '';
  }
  const t = tokens();
  const map = new jsvectormap__WEBPACK_IMPORTED_MODULE_0__["default"]({
    selector: host,
    map: 'world',
    backgroundColor: 'transparent',
    zoomOnScroll: false,
    regionStyle: {
      initial: {
        fill: t.soft,
        stroke: t.border,
        strokeWidth: 0.4,
        fillOpacity: 1
      },
      hover: {
        fill: t.primary,
        fillOpacity: 0.5
      }
    },
    markers: MARKERS,
    markerStyle: {
      initial: {
        fill: t.primary,
        stroke: t.bg,
        strokeWidth: 2,
        r: 5
      },
      hover: {
        fill: t.purple,
        stroke: t.bg,
        strokeWidth: 2,
        r: 7
      }
    },
    labels: {
      markers: {
        render: m => m.name
      }
    }
  });
  instances.set(host, map);
}
function buildAll() {
  document.querySelectorAll('[data-vmap]').forEach(buildOne);
}
function initVectorMaps() {
  if (!document.querySelector('[data-vmap]')) return;
  buildAll();
  const observer = new MutationObserver(records => {
    if (records.some(r => r.attributeName === 'data-theme')) buildAll();
  });
  observer.observe(document.documentElement, {
    attributes: true
  });
}

/***/ },

/***/ "./assets/scripts/2026/palette.js"
/*!****************************************!*\
  !*** ./assets/scripts/2026/palette.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   close: () => (/* binding */ close),
/* harmony export */   initPalette: () => (/* binding */ initPalette),
/* harmony export */   isOpen: () => (/* binding */ isOpen),
/* harmony export */   open: () => (/* binding */ open)
/* harmony export */ });
/* harmony import */ var _Shell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shell.js */ "./assets/scripts/2026/Shell.js");
/**
 * Command palette (⌘K / Ctrl+K).
 *
 * Builds a searchable modal of every NAV item plus a few global actions
 * (toggle theme, view docs/repo). Opens via:
 *   - Click on any [data-palette-open] element (the topbar .cmd button)
 *   - Cmd/Ctrl + K keyboard shortcut, anywhere on the page
 *   - "/" keypress when no input is focused
 *
 * Closes via:
 *   - Esc
 *   - Click outside the panel
 *   - Selecting a result (Enter or click)
 *
 * Keyboard navigation: ↑ / ↓ to move, Enter to select.
 *
 * The palette renders into <body> the first time it's opened, then re-uses
 * that DOM node. All state is local to this module.
 */


const PANEL_HTML = `
  <div class="palette-modal" role="dialog" aria-modal="true" aria-label="Command palette">
    <div class="palette-input-row">
      <svg viewBox="0 0 24 24" class="palette-icon" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="m21 21-4.3-4.3" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
      <input class="palette-input" type="text" placeholder="Search pages, actions…" autocomplete="off" spellcheck="false">
      <kbd class="palette-esc">esc</kbd>
    </div>
    <div class="palette-results" role="listbox"></div>
    <div class="palette-foot">
      <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
      <span><kbd>↵</kbd> select</span>
      <span><kbd>esc</kbd> close</span>
    </div>
  </div>
`;
let backdrop = null;
let modal = null;
let input = null;
let resultsEl = null;
let allItems = [];
let filtered = [];
let cursor = 0;
function buildItems() {
  // Flatten the NAV manifest into a single list of selectable rows.
  const items = [];
  for (const section of _Shell_js__WEBPACK_IMPORTED_MODULE_0__.NAV) {
    for (const item of section.items) {
      if (item.children) {
        for (const child of item.children) {
          items.push({
            kind: 'page',
            label: child.text,
            section: `${section.label} › ${item.text}`,
            href: child.href,
            icon: item.icon
          });
        }
      } else if (item.href && item.href !== '#') {
        items.push({
          kind: 'page',
          label: item.text,
          section: section.label,
          href: item.href,
          icon: item.icon
        });
      }
    }
  }

  // Static actions
  items.push({
    kind: 'action',
    label: 'Toggle theme (light / dark)',
    section: 'Action',
    action: () => {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('dash26-theme', next);
      } catch {/* no localStorage */}
      // Update the toggle button icon if init.js wired one.
      const toggle = document.getElementById('themeToggle');
      if (toggle) toggle.click(); // no-op if already in the right state, or just nudge it
    },
    icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
  });
  items.push({
    kind: 'link',
    label: 'View on GitHub',
    section: 'External',
    href: 'https://github.com/puikinsh/Adminator-admin-dashboard',
    target: '_blank',
    icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'
  });
  items.push({
    kind: 'link',
    label: 'Documentation',
    section: 'External',
    href: 'https://puikinsh.github.io/Adminator-admin-dashboard/',
    target: '_blank',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'
  });
  return items;
}
function score(item, query) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const label = item.label.toLowerCase();
  if (label === q) return 100;
  if (label.startsWith(q)) return 50;
  if (label.includes(q)) return 20;
  if (item.section.toLowerCase().includes(q)) return 5;
  return 0;
}
function renderResults() {
  resultsEl.innerHTML = filtered.length === 0 ? '<div class="palette-empty">No results</div>' : filtered.map((item, i) => `
      <div class="palette-result${i === cursor ? ' is-selected' : ''}" role="option" data-index="${i}" aria-selected="${i === cursor}">
        <span class="palette-result-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">${item.icon || ''}</svg></span>
        <span class="palette-result-label">${item.label}</span>
        <span class="palette-result-section">${item.section}</span>
      </div>
    `).join('');
}
function update(query) {
  filtered = allItems.map(item => ({
    item,
    s: score(item, query)
  })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 12).map(x => x.item);
  cursor = 0;
  renderResults();
}
function activate(item) {
  if (!item) return;
  close();
  if (item.kind === 'action' && typeof item.action === 'function') {
    item.action();
  } else if (item.href) {
    if (item.target === '_blank') {
      window.open(item.href, '_blank', 'noopener');
    } else {
      window.location.href = item.href;
    }
  }
}
function ensureMounted() {
  // If the cached modal was removed from the DOM (e.g. by a test or by code
  // that wipes <body>), drop the stale refs and remount.
  if (modal && !document.contains(modal)) {
    modal = null;
    backdrop = null;
    input = null;
    resultsEl = null;
  }
  if (modal) return;
  backdrop = document.createElement('div');
  backdrop.className = 'palette-backdrop';
  backdrop.innerHTML = PANEL_HTML;
  document.body.appendChild(backdrop);
  modal = backdrop.querySelector('.palette-modal');
  input = backdrop.querySelector('.palette-input');
  resultsEl = backdrop.querySelector('.palette-results');
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) close();
  });
  input.addEventListener('input', () => update(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cursor = Math.min(cursor + 1, filtered.length - 1);
      renderResults();
      scrollCursorIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cursor = Math.max(cursor - 1, 0);
      renderResults();
      scrollCursorIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      activate(filtered[cursor]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  });
  resultsEl.addEventListener('click', e => {
    const row = e.target.closest('.palette-result');
    if (row) activate(filtered[Number(row.getAttribute('data-index'))]);
  });
}
function scrollCursorIntoView() {
  const sel = resultsEl.querySelector('.palette-result.is-selected');
  if (sel && typeof sel.scrollIntoView === 'function') {
    sel.scrollIntoView({
      block: 'nearest'
    });
  }
}
function open() {
  ensureMounted();
  if (allItems.length === 0) allItems = buildItems();
  input.value = '';
  update('');
  document.body.classList.add('has-palette-open');
  // Focus on next tick (jsdom-friendly).
  setTimeout(() => input.focus(), 0);
}
function close() {
  if (!modal) return;
  document.body.classList.remove('has-palette-open');
}
function isOpen() {
  return document.body.classList.contains('has-palette-open');
}
let _initialized = false;
function initPalette() {
  // Guard against being called twice (e.g. when init runs on both
  // DOMContentLoaded and on a manual re-init after hot reload). Without
  // this, every keydown handler runs N times, which causes Cmd+K to net-no-op
  // on the second invocation.
  if (_initialized) return;
  _initialized = true;
  document.addEventListener('click', e => {
    if (e.target.closest('[data-palette-open]')) {
      e.preventDefault();
      open();
    }
  });
  document.addEventListener('keydown', e => {
    // Cmd+K (Mac) / Ctrl+K (Windows/Linux): open from anywhere
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      isOpen() ? close() : open();
      return;
    }
    // Slash: open when no input is focused
    if (e.key === '/' && !isOpen()) {
      const tag = document.activeElement && document.activeElement.tagName;
      const editable = document.activeElement && document.activeElement.isContentEditable;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT' && !editable) {
        e.preventDefault();
        open();
      }
    }
  });
}

/***/ },

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./assets/styles/2026/index.scss"
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./assets/styles/2026/index.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748B%27 stroke-width=%272%27><path d=%27m6 9 6 6 6-6%27/></svg> */ "data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748B%27 stroke-width=%272%27><path d=%27m6 9 6 6 6-6%27/></svg>"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
/* ============================================
   2026 Design System — Entry
   ============================================ */
/* ============ RESET + BASE — 2026 ============ */
/* ============ DESIGN TOKENS — 2026 ============ */
:root[data-theme=light] {
  /* Surfaces */
  --bg-body: #F0F4F8;
  --bg-card: #FFFFFF;
  --bg-sidebar: #FFFFFF;
  --bg-hover: #F8FAFC;
  --bg-muted: #F1F5F9;
  /* Text */
  --t-base: #1E293B;
  --t-muted: #64748B;
  --t-light: #94A3B8;
  --t-inverse: #FFFFFF;
  /* Borders */
  --border: #E4E8EF;
  --border-soft: #EEF1F5;
  /* Brand — blue */
  --primary: #2563EB;
  --primary-light: #3B82F6;
  --primary-dark: #1D4ED8;
  --primary-soft: #EFF6FF;
  --primary-ring: rgba(37, 99, 235, 0.18);
  /* Semantic */
  --success: #10B981;
  --success-soft: #ECFDF5;
  --warning: #F59E0B;
  --warning-soft: #FFFBEB;
  --danger: #EF4444;
  --danger-soft: #FEF2F2;
  --info: #0EA5E9;
  --info-soft: #F0F9FF;
  --purple: #8B5CF6;
  --purple-soft: #F5F3FF;
  --pink: #EC4899;
  --pink-soft: #FDF2F8;
  --teal: #14B8A6;
  --teal-soft: #F0FDFA;
  --orange: #F97316;
  --orange-soft: #FFF7ED;
  --shadow-sm: 0 1px 2px 0 rgb(15 23 42 / 0.04);
  --shadow-card: 0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.04);
  --shadow-lg: 0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.05);
  --overlay: rgba(240, 244, 248, 0.72);
}

:root[data-theme=dark] {
  --bg-body: #0B1120;
  --bg-card: #141B2D;
  --bg-sidebar: #141B2D;
  --bg-hover: #1C2438;
  --bg-muted: #1A2237;
  --t-base: #F1F5F9;
  --t-muted: #94A3B8;
  --t-light: #64748B;
  --t-inverse: #0B1120;
  --border: #222C42;
  --border-soft: #1A2237;
  --primary: #60A5FA;
  --primary-light: #93C5FD;
  --primary-dark: #3B82F6;
  --primary-soft: #0F2847;
  --primary-ring: rgba(96, 165, 250, 0.24);
  --success: #34D399;
  --success-soft: #0F2A20;
  --warning: #FBBF24;
  --warning-soft: #2B1F08;
  --danger: #F87171;
  --danger-soft: #2B1414;
  --info: #38BDF8;
  --info-soft: #0D2232;
  --purple: #A78BFA;
  --purple-soft: #1E1A2C;
  --pink: #F472B6;
  --pink-soft: #2A1424;
  --teal: #2DD4BF;
  --teal-soft: #0E2826;
  --orange: #FB923C;
  --orange-soft: #2A1810;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.4);
  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.25);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4);
  --overlay: rgba(11, 17, 32, 0.72);
}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  -webkit-text-decoration: none;
  text-decoration: none;
}

button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
}

ul, ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

img, svg {
  display: block;
  max-width: 100%;
}

input, textarea {
  font: inherit;
  color: inherit;
}

body {
  font-family: "Inter",system-ui,Segoe UI,Ubuntu,Cantarell,Noto Sans, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-feature-settings: "cv11", "ss01", "ss03";
  font-weight: 400;
  background: var(--bg-body);
  color: var(--t-base);
  font-size: 14px;
  line-height: 1.55;
  letter-spacing: -0.003em;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: background-color 280ms ease, color 280ms ease;
}

::-moz-selection {
  background: var(--primary);
  color: #fff;
}

::selection {
  background: var(--primary);
  color: #fff;
}

.mono {
  font-family: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;
}

.eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--t-light);
  font-weight: 500;
}

/* ============ ANIMATIONS — 2026 ============ */
@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bar-in {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes fade-in {
  to {
    opacity: 1;
  }
}
/* ============ SHELL ============ */
.shell {
  display: grid;
  grid-template-columns: 248px 1fr;
  min-height: 100vh;
}

/* ============ SIDEBAR ============ */
.d-sidebar {
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  padding: 22px 16px 18px;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 22px;
  overflow-y: auto;
}

.d-sidebar::-webkit-scrollbar {
  width: 4px;
}

.d-sidebar::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 10px 20px;
  border-bottom: 1px solid var(--border-soft);
}

.brand-logo {
  width: 32px;
  height: 32px;
  background: var(--primary);
  border-radius: 8px;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 10px -2px color-mix(in oklab, var(--primary) 40%, transparent);
}

.brand-logo svg {
  width: 18px;
  height: 18px;
}

.brand-text {
  line-height: 1.1;
}

.brand-name {
  font-family: "Inter Tight", "Inter", sans-serif;
  font-weight: 700;
  font-size: 15.5px;
  color: var(--t-base);
  letter-spacing: -0.02em;
}

.brand-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  color: var(--t-light);
  letter-spacing: 0.1em;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--t-light);
  padding: 0 10px 6px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 8px;
  color: var(--t-muted);
  font-size: 13px;
  font-weight: 500;
  transition: background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
  line-height: 1.2;
}

.nav-link > svg {
  width: 17px;
  height: 17px;
  stroke: currentColor;
  stroke-width: 1.75;
  fill: none;
  flex-shrink: 0;
  display: block;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav-link > span:not(.nav-badge) {
  min-width: 0;
  flex: 1;
}

.nav-link:hover {
  background: var(--bg-hover);
  color: var(--t-base);
}

.nav-link.is-active {
  color: var(--primary);
  background: var(--primary-soft);
  box-shadow: inset 3px 0 0 var(--primary);
}

.nav-badge {
  flex: 0 0 auto;
  margin-left: auto;
  font-family: "Inter", sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 2px 6px;
  line-height: 1.4;
  border-radius: 999px;
}

.nav-badge.pro {
  background: var(--primary);
  color: #fff;
}

.nav-badge.hot {
  background: var(--danger-soft);
  color: var(--danger);
}

.nav-badge.new {
  background: var(--success-soft);
  color: var(--success);
}

/* Dropdown nav items */
.nav-item-group .nav-link .chev {
  width: 11px;
  height: 11px;
  margin-left: auto;
  transition: transform 200ms ease;
}

.nav-item-group.is-open .nav-link .chev {
  transform: rotate(90deg);
}

.nav-submenu {
  overflow: hidden;
  max-height: 0;
  margin-left: 20px;
  padding-left: 14px;
  position: relative;
  transition: max-height 280ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-submenu::before {
  content: "";
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: var(--border);
}

.nav-item-group.is-open .nav-submenu {
  max-height: 400px;
  padding-top: 4px;
  padding-bottom: 6px;
}

.nav-submenu a {
  display: flex;
  align-items: center;
  padding: 7px 10px;
  font-size: 12.5px;
  color: var(--t-muted);
  border-radius: 6px;
  transition: color 160ms ease, background-color 160ms ease, padding-left 160ms ease;
}

.nav-submenu a:hover {
  color: var(--t-base);
  background: var(--bg-hover);
  padding-left: 13px;
}

.nav-submenu a.is-active {
  color: var(--primary);
  font-weight: 600;
  background: var(--primary-soft);
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border-soft);
}

.workspace {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 180ms ease;
}

.workspace:hover {
  background: var(--bg-hover);
}

.workspace-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--purple));
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 600;
  font-size: 12.5px;
  flex-shrink: 0;
}

.workspace-text {
  line-height: 1.2;
  min-width: 0;
}

.workspace-name {
  font-size: 13px;
  color: var(--t-base);
  font-weight: 600;
}

.workspace-role {
  font-size: 11px;
  color: var(--t-light);
}

.workspace-chev {
  margin-left: auto;
  color: var(--t-light);
}

/* ============ MAIN ============ */
.main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ============ HAMBURGER (mobile only — see _responsive.scss) ============ */
.hamburger {
  display: none; /* Shown via media query under 720px */
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--t-base);
  margin-right: 4px;
  transition: background 160ms;
}

.hamburger:hover {
  background: var(--bg-hover);
}

.hamburger svg {
  width: 20px;
  height: 20px;
}

/* ============ MOBILE DRAWER BACKDROP ============ */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  -webkit-backdrop-filter: blur(2px);
          backdrop-filter: blur(2px);
  z-index: 90;
  opacity: 0;
  visibility: hidden;
  transition: opacity 240ms ease, visibility 240ms;
}

body.has-drawer-open .drawer-backdrop {
  opacity: 1;
  visibility: visible;
}

/* ============ TOPBAR ============ */
.d-topbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: saturate(140%) blur(10px);
  -webkit-backdrop-filter: saturate(140%) blur(10px);
  background: var(--overlay);
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--t-muted);
  font-size: 13px;
  font-weight: 500;
}

.crumbs .sep {
  color: var(--t-light);
}

.crumbs .current {
  color: var(--t-base);
  font-weight: 600;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cmd {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px 7px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--t-light);
  font-size: 13px;
  transition: all 200ms ease;
  min-width: 220px;
}

.cmd:hover {
  border-color: var(--primary);
  color: var(--t-muted);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.cmd svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.cmd span {
  flex: 1;
  text-align: left;
}

.kbd {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-muted);
  color: var(--t-muted);
  border: 1px solid var(--border);
}

.icon-btn {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: var(--t-muted);
  transition: background 180ms, color 180ms;
  position: relative;
}

.icon-btn:hover {
  background: var(--bg-hover);
  color: var(--t-base);
}

.icon-btn > svg {
  width: 17px;
  height: 17px;
  stroke: currentColor;
  stroke-width: 1.8;
  fill: none;
}

.icon-btn .count {
  position: absolute;
  top: 5px;
  right: 5px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 600;
  display: grid;
  place-items: center;
  border: 2px solid var(--bg-body);
  line-height: 1;
}

.icon-btn .count.danger {
  background: var(--danger);
  color: #fff;
}

.icon-btn .count.info {
  background: var(--info);
  color: #fff;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--purple));
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 600;
  font-size: 13px;
  margin-left: 6px;
  border: 2px solid var(--bg-card);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

/* ============ FOOTER ============ */
.d-footer {
  padding: 24px 32px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--t-muted);
  font-size: 12px;
}

.d-footer a {
  color: var(--primary);
  font-weight: 600;
}

.d-footer a:hover {
  color: var(--primary-dark);
}

.d-footer-meta {
  display: flex;
  gap: 20px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--t-light);
  letter-spacing: 0.06em;
}

/* ============ DROPDOWNS ============ */
.dd-wrap {
  position: relative;
}

.dd-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 340px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 180ms ease, transform 180ms ease, visibility 180ms;
  overflow: hidden;
  z-index: 100;
}

.dd-wrap.is-open .dd-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dd-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-soft);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--t-base);
  letter-spacing: 0.01em;
}

.dd-head svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 1.8;
  fill: none;
  color: var(--t-muted);
}

.dd-list {
  max-height: 320px;
  overflow-y: auto;
}

.dd-list::-webkit-scrollbar {
  width: 4px;
}

.dd-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.dd-item {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 1px solid var(--border-soft);
  transition: background 150ms ease;
}

.dd-item:last-child {
  border-bottom: 0;
}

.dd-item:hover {
  background: var(--bg-hover);
}

.dd-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}

.dd-avatar.a1 {
  background: linear-gradient(135deg, var(--primary), var(--purple));
}

.dd-avatar.a2 {
  background: linear-gradient(135deg, var(--success), var(--teal));
}

.dd-avatar.a3 {
  background: linear-gradient(135deg, var(--danger), var(--warning));
}

.dd-body {
  min-width: 0;
}

.dd-text {
  font-size: 13px;
  color: var(--t-muted);
  line-height: 1.4;
  margin-bottom: 3px;
}

.dd-text strong {
  color: var(--t-base);
  font-weight: 600;
}

.dd-text em {
  color: var(--primary);
  font-style: normal;
}

.dd-preview {
  font-size: 12.5px;
  color: var(--t-muted);
  line-height: 1.45;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 2px;
}

.dd-row-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}

.dd-row-head strong {
  font-size: 13px;
  color: var(--t-base);
  font-weight: 600;
}

.dd-time {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.dd-footer {
  display: block;
  padding: 12px 18px;
  text-align: center;
  font-size: 12.5px;
  color: var(--primary);
  font-weight: 600;
  border-top: 1px solid var(--border-soft);
  transition: color 180ms, background 180ms;
}

.dd-footer:hover {
  color: var(--primary-dark);
  background: var(--bg-hover);
}

/* Profile menu variant */
.dd-menu.dd-profile {
  min-width: 220px;
}

.dd-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  font-size: 13px;
  color: var(--t-base);
  transition: background 150ms, color 150ms;
}

.dd-menu-item:hover {
  background: var(--bg-hover);
}

.dd-menu-item svg {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  stroke-width: 1.75;
  fill: none;
  color: var(--t-muted);
}

.dd-menu-item.danger {
  color: var(--danger);
}

.dd-menu-item.danger svg {
  color: var(--danger);
}

.dd-menu-item.danger:hover {
  background: var(--danger-soft);
}

.dd-divider {
  height: 1px;
  background: var(--border-soft);
  margin: 6px 0;
}

.dd-profile-head {
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-soft);
}

.dd-profile-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--t-base);
}

.dd-profile-email {
  font-size: 11.5px;
  color: var(--t-muted);
  margin-top: 2px;
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 0.02em;
}

/* ============ CONTENT + COMMON COMPONENTS ============ */
.content {
  padding: 32px 32px 24px;
  width: 100%;
}

/* Hero */
.hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  margin-bottom: 28px;
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.hero-text .eyebrow {
  display: block;
  margin-bottom: 10px;
}

.hero-title {
  font-family: "Inter Tight", "Inter", sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 3.2vw, 36px);
  line-height: 1.15;
  letter-spacing: -0.028em;
  color: var(--t-base);
  margin: 0 0 8px;
}

.hero-title .accent {
  color: var(--primary);
}

.hero-sub {
  font-size: 14px;
  color: var(--t-muted);
  max-width: 60ch;
  line-height: 1.6;
}

.hero-sub strong {
  color: var(--success);
  font-weight: 600;
}

.hero-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: all 180ms ease;
  border: 1px solid transparent;
  white-space: nowrap;
}

.btn svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.btn--ghost {
  color: var(--t-base);
  border-color: var(--border);
  background: var(--bg-card);
}

.btn--ghost:hover {
  border-color: var(--t-light);
  box-shadow: var(--shadow-sm);
}

.btn--primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 1px 2px var(--primary-ring);
}

.btn--primary:hover {
  background: var(--primary-dark);
}

/* Card */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-soft);
  gap: 16px;
}

.card-head > :last-child {
  flex-shrink: 0;
  padding-bottom: 2px;
}

.card-title-wrap {
  min-width: 0;
}

.card-title-wrap .eyebrow {
  display: block;
  margin-bottom: 4px;
}

.card-title {
  font-family: "Inter Tight", "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.02em;
  color: var(--t-base);
  margin: 0;
}

.card-action {
  font-size: 12px;
  color: var(--primary);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: color 180ms;
}

.card-action:hover {
  color: var(--primary-dark);
}

.card-action svg {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  stroke-width: 2.2;
  fill: none;
}

/* Generic 12-column grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px;
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: 260ms;
}

.grid > * {
  min-width: 0;
}

.col-6 {
  grid-column: span 6;
}

.col-12 {
  grid-column: span 12;
}

/* Horizontal-scroll wrapper for tables that overflow on narrow viewports */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-scroll::-webkit-scrollbar {
  height: 4px;
}

.table-scroll::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

/* Generic table */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead th {
  text-align: left;
  padding: 10px 0 12px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--t-light);
  font-weight: 500;
  border-bottom: 1px solid var(--border);
}

.table tbody td {
  padding: 11px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--border-soft);
}

.table tbody tr:last-child td {
  border-bottom: 0;
}

.table tbody tr {
  transition: background-color 160ms ease;
}

.table tbody tr:hover td {
  background: var(--bg-hover);
}

.table .cell-name {
  color: var(--t-base);
  font-weight: 600;
}

.table .cell-date {
  color: var(--t-muted);
  font-size: 12px;
}

.table .cell-price {
  font-weight: 600;
  color: var(--t-base);
  text-align: right;
}

.table .cell-price.pos {
  color: var(--success);
}

.table .cell-price.neg {
  color: var(--danger);
}

/* Generic tag */
.tag {
  font-size: 10.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

.tag.t-new {
  background: var(--purple-soft);
  color: var(--purple);
}

.tag.t-used {
  background: var(--orange-soft);
  color: var(--orange);
}

.tag.t-old {
  background: var(--warning-soft);
  color: var(--warning);
}

.tag.t-unavail {
  background: var(--danger-soft);
  color: var(--danger);
}

.tag.t-active {
  background: var(--success-soft);
  color: var(--success);
}

.tag.t-info {
  background: var(--info-soft);
  color: var(--info);
}

/* ============ FORMS ============ */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 22px;
}

.form-grid .span-2 {
  grid-column: span 2;
}

@media (max-width: 720px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-grid .span-2 {
    grid-column: span 1;
  }
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--t-base);
  letter-spacing: -0.005em;
  display: flex;
  align-items: center;
  gap: 6px;
}

.field-label .req {
  color: var(--danger);
}

.field-help {
  font-size: 11.5px;
  color: var(--t-muted);
  line-height: 1.45;
}

.field-error {
  font-size: 11.5px;
  color: var(--danger);
  display: flex;
  align-items: center;
  gap: 4px;
}

.input,
.select,
.textarea {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--t-base);
  font-size: 13px;
  font-family: inherit;
  outline: 0;
  transition: border-color 180ms, box-shadow 180ms, background 180ms;
}

.input::-moz-placeholder, .textarea::-moz-placeholder {
  color: var(--t-light);
}

.input::placeholder,
.textarea::placeholder {
  color: var(--t-light);
}

.input:focus,
.select:focus,
.textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.input:disabled,
.select:disabled,
.textarea:disabled {
  background: var(--bg-muted);
  color: var(--t-light);
  cursor: not-allowed;
}

.input.is-invalid,
.select.is-invalid,
.textarea.is-invalid {
  border-color: var(--danger);
}

.input.is-invalid:focus,
.select.is-invalid:focus,
.textarea.is-invalid:focus {
  box-shadow: 0 0 0 3px var(--danger-soft);
}

.textarea {
  min-height: 96px;
  resize: vertical;
  line-height: 1.5;
}

.select {
  -moz-appearance: none;
       appearance: none;
  -webkit-appearance: none;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 32px;
}

.input-icon {
  position: relative;
}

.input-icon .ico {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: var(--t-light);
  pointer-events: none;
}

.input-icon .ico svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.input-icon .input {
  padding-left: 34px;
}

/* Inline addon (e.g. https://) */
.input-group {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
  overflow: hidden;
  transition: border-color 180ms, box-shadow 180ms;
}

.input-group:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.input-group .addon {
  padding: 0 12px;
  display: grid;
  place-items: center;
  background: var(--bg-muted);
  color: var(--t-muted);
  font-size: 12px;
  font-family: "JetBrains Mono", monospace;
  border-right: 1px solid var(--border);
}

.input-group .input {
  border: 0;
  border-radius: 0;
  background: transparent;
}

.input-group .input:focus {
  box-shadow: none;
}

/* Checkbox / radio */
.check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: var(--t-base);
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}

.check input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.check .box {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--t-light);
  border-radius: 5px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: all 160ms;
  background: var(--bg-card);
}

.check input:checked + .box {
  background: var(--primary);
  border-color: var(--primary);
}

.check input:checked + .box::after {
  content: "";
  width: 4px;
  height: 8px;
  border: solid #fff;
  border-width: 0 1.8px 1.8px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}

.check.radio .box {
  border-radius: 50%;
}

.check.radio input:checked + .box::after {
  width: 7px;
  height: 7px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  transform: none;
}

.check:hover .box {
  border-color: var(--primary);
}

.check input:disabled + .box {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Toggle switch */
.switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 13px;
  color: var(--t-base);
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}

.switch input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.switch .track {
  width: 34px;
  height: 20px;
  background: var(--bg-muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  position: relative;
  transition: background 200ms;
  flex-shrink: 0;
}

.switch .track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.switch input:checked + .track {
  background: var(--primary);
  border-color: var(--primary);
}

.switch input:checked + .track::after {
  transform: translateX(14px);
}

/* Form actions row */
.form-actions {
  display: flex;
  gap: 10px;
  align-items: center;
  padding-top: 18px;
  margin-top: 18px;
  border-top: 1px solid var(--border-soft);
}

.form-actions .spacer {
  flex: 1;
}

/* ============ UI ELEMENTS ============ */
/* ---- Button variants (extends .btn from _components) ---- */
.btn--secondary {
  background: var(--bg-muted);
  color: var(--t-base);
  border-color: var(--border);
}

.btn--secondary:hover {
  background: var(--bg-hover);
  border-color: var(--t-light);
}

.btn--success {
  background: var(--success);
  color: #fff;
}

.btn--success:hover {
  background: color-mix(in oklab, var(--success) 90%, black);
}

.btn--danger {
  background: var(--danger);
  color: #fff;
}

.btn--danger:hover {
  background: color-mix(in oklab, var(--danger) 90%, black);
}

.btn--warning {
  background: var(--warning);
  color: #fff;
}

.btn--warning:hover {
  background: color-mix(in oklab, var(--warning) 90%, black);
}

.btn--info {
  background: var(--info);
  color: #fff;
}

.btn--info:hover {
  background: color-mix(in oklab, var(--info) 90%, black);
}

.btn--soft-primary {
  background: var(--primary-soft);
  color: var(--primary);
}

.btn--soft-primary:hover {
  background: color-mix(in oklab, var(--primary-soft) 80%, var(--primary) 8%);
}

.btn--soft-success {
  background: var(--success-soft);
  color: var(--success);
}

.btn--soft-danger {
  background: var(--danger-soft);
  color: var(--danger);
}

.btn--soft-warning {
  background: var(--warning-soft);
  color: var(--warning);
}

.btn--soft-info {
  background: var(--info-soft);
  color: var(--info);
}

.btn--outline-primary {
  background: transparent;
  color: var(--primary);
  border-color: var(--primary);
}

.btn--outline-primary:hover {
  background: var(--primary-soft);
}

.btn--outline-danger {
  background: transparent;
  color: var(--danger);
  border-color: var(--danger);
}

.btn--outline-danger:hover {
  background: var(--danger-soft);
}

.btn--outline-success {
  background: transparent;
  color: var(--success);
  border-color: var(--success);
}

.btn--outline-success:hover {
  background: var(--success-soft);
}

.btn--lg {
  padding: 12px 18px;
  font-size: 14px;
}

.btn--sm {
  padding: 6px 10px;
  font-size: 11.5px;
}

.btn--icon {
  padding: 9px;
}

.btn--icon svg {
  margin: 0;
}

.btn-group {
  display: inline-flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--border);
}

.btn-group .btn {
  border-radius: 0;
  border: 0;
  box-shadow: none;
  border-right: 1px solid var(--border);
}

.btn-group .btn:last-child {
  border-right: 0;
}

.btn-group .btn.is-active {
  background: var(--primary-soft);
  color: var(--primary);
}

/* ---- Alert ---- */
.alert {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  gap: 12px;
  align-items: start;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
  background: var(--bg-muted);
  color: var(--t-base);
  border-left: 3px solid var(--t-muted);
}

.alert + .alert {
  margin-top: 10px;
}

.alert .ico {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  color: var(--t-muted);
  flex-shrink: 0;
}

.alert .ico svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.alert .body {
  min-width: 0;
}

.alert .title {
  font-weight: 600;
  color: var(--t-base);
  margin-bottom: 2px;
}

.alert .close {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 5px;
  color: var(--t-light);
  transition: background 160ms, color 160ms;
}

.alert .close:hover {
  background: var(--bg-hover);
  color: var(--t-base);
}

.alert .close svg {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.alert.success {
  background: var(--success-soft);
  border-left-color: var(--success);
}

.alert.success .ico {
  background: color-mix(in oklab, var(--success) 14%, transparent);
  color: var(--success);
}

.alert.danger {
  background: var(--danger-soft);
  border-left-color: var(--danger);
}

.alert.danger .ico {
  background: color-mix(in oklab, var(--danger) 14%, transparent);
  color: var(--danger);
}

.alert.warning {
  background: var(--warning-soft);
  border-left-color: var(--warning);
}

.alert.warning .ico {
  background: color-mix(in oklab, var(--warning) 14%, transparent);
  color: var(--warning);
}

.alert.info {
  background: var(--info-soft);
  border-left-color: var(--info);
}

.alert.info .ico {
  background: color-mix(in oklab, var(--info) 14%, transparent);
  color: var(--info);
}

.alert.primary {
  background: var(--primary-soft);
  border-left-color: var(--primary);
}

.alert.primary .ico {
  background: color-mix(in oklab, var(--primary) 14%, transparent);
  color: var(--primary);
}

/* ---- Badge ---- */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  letter-spacing: 0.02em;
  line-height: 1.4;
  background: var(--bg-muted);
  color: var(--t-muted);
}

.badge.primary {
  background: var(--primary-soft);
  color: var(--primary);
}

.badge.success {
  background: var(--success-soft);
  color: var(--success);
}

.badge.danger {
  background: var(--danger-soft);
  color: var(--danger);
}

.badge.warning {
  background: var(--warning-soft);
  color: var(--warning);
}

.badge.info {
  background: var(--info-soft);
  color: var(--info);
}

.badge.purple {
  background: var(--purple-soft);
  color: var(--purple);
}

.badge.solid {
  background: var(--primary);
  color: #fff;
}

.badge.dot::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

/* ---- Progress ---- */
.progress {
  width: 100%;
  height: 8px;
  background: var(--bg-muted);
  border-radius: 999px;
  overflow: hidden;
}

.progress.thin {
  height: 4px;
}

.progress.tall {
  height: 14px;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 999px;
  transform-origin: left;
  animation: bar-in 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.progress-fill.success {
  background: var(--success);
}

.progress-fill.danger {
  background: var(--danger);
}

.progress-fill.warning {
  background: var(--warning);
}

.progress-fill.info {
  background: var(--info);
}

.progress-fill.gradient {
  background: linear-gradient(90deg, var(--primary), var(--purple));
}

.progress-fill.striped {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.16) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.16) 75%, transparent 75%, transparent);
  background-size: 12px 12px;
}

/* ---- Spinner ---- */
.spinner {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2.5px solid var(--bg-muted);
  border-top-color: var(--primary);
  animation: spin 700ms linear infinite;
  display: inline-block;
}

.spinner.sm {
  width: 14px;
  height: 14px;
  border-width: 2px;
}

.spinner.lg {
  width: 36px;
  height: 36px;
  border-width: 3px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
/* ---- Tabs ---- */
.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 18px;
}

.tab {
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--t-muted);
  border-bottom: 2px solid transparent;
  transition: color 160ms, border-color 160ms;
  position: relative;
  top: 1px;
  cursor: pointer;
}

.tab:hover {
  color: var(--t-base);
}

.tab.is-active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  font-weight: 600;
}

.tab .badge {
  margin-left: 6px;
}

.tabs.pills {
  border-bottom: 0;
  background: var(--bg-muted);
  border-radius: 9px;
  padding: 3px;
  display: inline-flex;
}

.tabs.pills .tab {
  border-radius: 7px;
  border-bottom: 0;
  top: 0;
  padding: 7px 12px;
  font-size: 12.5px;
}

.tabs.pills .tab.is-active {
  background: var(--bg-card);
  color: var(--t-base);
  box-shadow: var(--shadow-sm);
}

.tab-panel {
  display: none;
}

.tab-panel.is-active {
  display: block;
  animation: rise-in 320ms ease both;
}

/* ---- Accordion ---- */
.accordion {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.accordion-item {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-card);
}

.accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--t-base);
  text-align: left;
  transition: background 160ms;
}

.accordion-trigger:hover {
  background: var(--bg-hover);
}

.accordion-trigger .chev {
  width: 13px;
  height: 13px;
  transition: transform 240ms ease;
  color: var(--t-muted);
}

.accordion-trigger .chev svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.accordion-item.is-open .accordion-trigger .chev {
  transform: rotate(180deg);
}

.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 320ms cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 13px;
  color: var(--t-muted);
  line-height: 1.6;
}

.accordion-body-inner {
  padding: 0 16px 14px;
}

.accordion-item.is-open .accordion-body {
  max-height: 400px;
}

/* ---- Modal (static demo) ---- */
.modal-demo {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  max-width: 480px;
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-soft);
}

.modal-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--t-base);
  letter-spacing: -0.012em;
}

.modal-body {
  padding: 18px 20px;
  font-size: 13.5px;
  color: var(--t-muted);
  line-height: 1.6;
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px;
  border-top: 1px solid var(--border-soft);
  background: var(--bg-card);
}

/* ---- Tooltip / Popover (static demo positioning) ---- */
.popover-demo {
  position: relative;
  display: inline-block;
}

.popover-demo .pop {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--t-base);
  color: var(--bg-card);
  font-size: 11.5px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  box-shadow: var(--shadow-lg);
}

.popover-demo .pop::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--t-base);
}

/* ---- Avatar group ---- */
.avatar-group {
  display: inline-flex;
  align-items: center;
}

.avatar-group .av {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
  border: 2px solid var(--bg-card);
  margin-left: -8px;
  flex-shrink: 0;
}

.avatar-group .av:first-child {
  margin-left: 0;
}

.avatar-group .av.more {
  background: var(--bg-muted);
  color: var(--t-muted);
  font-size: 10.5px;
}

/* ---- Section heading helper ---- */
.section-h {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--t-base);
  letter-spacing: -0.012em;
  margin: 0 0 14px;
}

.section-h .num {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: var(--t-light);
  font-weight: 500;
  letter-spacing: 0.06em;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

/* ============ AUTH PAGES ============ */
.auth-shell {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: var(--bg-body);
}

/* Responsive override for .auth-aside lives in _responsive.scss to win over
   the default rules below — see chat note for why. */
.auth-aside {
  position: relative;
  background: linear-gradient(135deg, var(--primary), var(--purple));
  color: #fff;
  padding: 40px 48px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.auth-aside::before {
  content: "";
  position: absolute;
  inset: -40% -20% auto auto;
  width: 80%;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 60%);
  pointer-events: none;
}

.auth-aside::after {
  content: "";
  position: absolute;
  inset: auto auto -30% -20%;
  width: 80%;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 60%);
  pointer-events: none;
}

.auth-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.auth-brand .logo {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
  border-radius: 9px;
  display: grid;
  place-items: center;
}

.auth-brand .logo svg {
  width: 20px;
  height: 20px;
}

.auth-brand .name {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.018em;
}

.auth-aside-body {
  margin-top: auto;
  position: relative;
  z-index: 1;
  max-width: 440px;
}

.auth-aside-eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 14px;
  display: block;
}

.auth-aside h1 {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 3vw, 38px);
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin: 0 0 14px;
}

.auth-aside p {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin: 0 0 24px;
}

.auth-quote {
  margin-top: 32px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
  border-radius: 12px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.auth-quote-author {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
}

.auth-quote-author .av {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 600;
}

.auth-aside-footer {
  margin-top: auto;
  padding-top: 24px;
  position: relative;
  z-index: 1;
  display: flex;
  gap: 18px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.06em;
}

.auth-main {
  display: flex;
  flex-direction: column;
  padding: 32px 48px;
  min-height: 100vh;
}

.auth-main-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auth-main-top .switch-link {
  font-size: 12.5px;
  color: var(--t-muted);
}

.auth-main-top .switch-link a {
  color: var(--primary);
  font-weight: 600;
  margin-left: 4px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 8px 0;
}

.auth-card h2 {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 26px;
  letter-spacing: -0.022em;
  color: var(--t-base);
  margin: 0 0 6px;
}

.auth-card .sub {
  font-size: 13.5px;
  color: var(--t-muted);
  margin: 0 0 24px;
  line-height: 1.55;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.auth-form .field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auth-form .field-row a {
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
}

.auth-submit {
  margin-top: 4px;
}

.auth-submit.btn {
  padding: 11px 14px;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 18px 0;
}

.auth-divider::before,
.auth-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

.social-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--t-base);
  font-size: 12.5px;
  font-weight: 600;
  transition: border-color 160ms, box-shadow 160ms, background 160ms;
}

.social-btn:hover {
  border-color: var(--t-light);
  box-shadow: var(--shadow-sm);
}

.social-btn svg {
  width: 14px;
  height: 14px;
}

.auth-main-bottom {
  margin-top: 24px;
  font-size: 11.5px;
  color: var(--t-light);
  text-align: center;
}

.auth-main-bottom a {
  color: var(--t-muted);
}

/* ============ ERROR PAGES (404 / 500) ============ */
.error-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  background: var(--bg-body);
  position: relative;
  overflow: hidden;
}

.error-shell::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto auto;
  width: 60vmax;
  aspect-ratio: 1;
  background: radial-gradient(circle, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%);
  pointer-events: none;
}

.error-shell::after {
  content: "";
  position: absolute;
  inset: auto auto -20% -10%;
  width: 60vmax;
  aspect-ratio: 1;
  background: radial-gradient(circle, color-mix(in oklab, var(--purple) 8%, transparent), transparent 70%);
  pointer-events: none;
}

.error-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow-lg);
  padding: 48px 56px;
  max-width: 540px;
  width: 100%;
  text-align: center;
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@media (max-width: 600px) {
  .error-card {
    padding: 32px 24px;
  }
}
.error-eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--t-light);
  margin-bottom: 14px;
  display: block;
}

.error-code {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: clamp(96px, 16vw, 160px);
  line-height: 0.95;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, var(--primary), var(--purple));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
}

.error-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.022em;
  color: var(--t-base);
  margin: 0 0 10px;
}

.error-sub {
  font-size: 14px;
  color: var(--t-muted);
  line-height: 1.6;
  margin: 0 0 24px;
  max-width: 40ch;
  margin-left: auto;
  margin-right: auto;
}

.error-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-meta {
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px dashed var(--border);
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--t-light);
  letter-spacing: 0.06em;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-meta strong {
  color: var(--t-muted);
  font-weight: 600;
}

/* ============ CHAT PAGE ============ */
.chat-shell {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  height: calc(100vh - 220px);
  min-height: 560px;
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

/* Responsive overrides for chat live in _responsive.scss so they win over
   the default rules below (Sass preserves source order, so a @media block
   placed before the default rules would be defeated by the same-specificity
   later rule). */
/* ---- Conversations rail ---- */
.chat-rail {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-soft);
  background: var(--bg-card);
  min-width: 0;
  min-height: 0; /* let the rail honour the shell's row height in CSS Grid */
  overflow: hidden; /* mirrors .chat-pane — needed so .chat-list-scroll's overflow-y: auto actually engages instead of growing past the rail */
}

.chat-rail-head {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-soft);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-rail-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-rail-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 14.5px;
  color: var(--t-base);
  letter-spacing: -0.012em;
}

.chat-rail-title .meta {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  font-weight: 500;
  margin-left: 8px;
  letter-spacing: 0.04em;
}

.chat-search {
  position: relative;
}

.chat-search input {
  width: 100%;
  padding: 8px 10px 8px 32px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-muted);
  font-size: 12.5px;
  color: var(--t-base);
  outline: 0;
  transition: border-color 180ms, box-shadow 180ms, background 180ms;
}

.chat-search input::-moz-placeholder {
  color: var(--t-light);
}

.chat-search input::placeholder {
  color: var(--t-light);
}

.chat-search input:focus {
  border-color: var(--primary);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.chat-search svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 13px;
  stroke: var(--t-light);
  stroke-width: 2;
  fill: none;
  pointer-events: none;
}

.chat-list-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.chat-list-scroll::-webkit-scrollbar {
  width: 4px;
}

.chat-list-scroll::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.chat-conv {
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 10px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--border-soft);
  cursor: pointer;
  transition: background 160ms ease;
  position: relative;
}

.chat-conv:hover {
  background: var(--bg-hover);
}

.chat-conv.is-active {
  background: var(--primary-soft);
  box-shadow: inset 3px 0 0 var(--primary);
}

.chat-conv-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
  position: relative;
}

.chat-conv-avatar .presence {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--success);
  border: 2px solid var(--bg-card);
}

.chat-conv-avatar .presence.away {
  background: var(--warning);
}

.chat-conv-avatar .presence.off {
  background: var(--t-light);
}

.chat-conv-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-conv-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
}

.chat-conv-name {
  font-size: 13px;
  color: var(--t-base);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-conv-time {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.chat-conv-preview {
  font-size: 12px;
  color: var(--t-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-conv.is-unread .chat-conv-preview {
  color: var(--t-base);
  font-weight: 500;
}

.chat-conv.is-unread .chat-conv-time {
  color: var(--primary);
}

.chat-conv-badge {
  position: absolute;
  right: 14px;
  top: 14px;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--primary);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

/* ---- Conversation pane ---- */
.chat-pane {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  min-width: 0;
  overflow: hidden;
}

.chat-pane-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  border-bottom: 1px solid var(--border-soft);
}

.chat-pane-head .av {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  position: relative;
}

.chat-pane-head .av .presence {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--success);
  border: 2px solid var(--bg-card);
}

.chat-pane-head .meta {
  line-height: 1.3;
  min-width: 0;
  flex: 1;
}

.chat-pane-head .name {
  font-size: 14px;
  font-weight: 600;
  color: var(--t-base);
}

.chat-pane-head .status {
  font-size: 11.5px;
  color: var(--t-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.chat-pane-head .status .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
}

.chat-pane-head-tools {
  display: flex;
  gap: 2px;
}

.chat-thread {
  flex: 1;
  overflow-y: auto;
  padding: 22px 28px;
  background: var(--bg-muted);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-thread::-webkit-scrollbar {
  width: 5px;
}

.chat-thread::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.chat-day-sep {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0;
  color: var(--t-light);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.chat-day-sep::before,
.chat-day-sep::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

.chat-msg {
  display: flex;
  gap: 10px;
  max-width: min(75%, 600px);
}

.chat-msg.me {
  margin-left: auto;
  flex-direction: row-reverse;
}

.chat-msg-av {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 11.5px;
  flex-shrink: 0;
  align-self: flex-end;
}

.chat-msg-av.me {
  background: linear-gradient(135deg, var(--primary), var(--purple));
}

.chat-msg-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.chat-msg.me .chat-msg-stack {
  align-items: flex-end;
}

.chat-bub {
  padding: 10px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  border-top-left-radius: 4px;
  font-size: 13.5px;
  color: var(--t-base);
  line-height: 1.5;
  box-shadow: var(--shadow-sm);
  word-wrap: break-word;
}

.chat-msg.me .chat-bub {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  border-top-left-radius: 14px;
  border-top-right-radius: 4px;
}

.chat-msg-meta {
  display: flex;
  gap: 6px;
  align-items: center;
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  color: var(--t-light);
  letter-spacing: 0.04em;
  padding: 0 4px;
}

.chat-msg-meta .read {
  color: var(--primary);
}

.chat-typing {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: var(--t-muted);
  margin-top: 4px;
}

.chat-typing-dots {
  display: inline-flex;
  gap: 3px;
}

.chat-typing-dots span {
  width: 4px;
  height: 4px;
  background: var(--t-light);
  border-radius: 50%;
  animation: typing 1.2s infinite ease-in-out;
}

.chat-typing-dots span:nth-child(2) {
  animation-delay: 0.15s;
}

.chat-typing-dots span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-3px);
  }
}
.chat-composer {
  padding: 14px 22px 18px;
  border-top: 1px solid var(--border-soft);
  background: var(--bg-card);
}

.chat-composer-input {
  display: flex;
  align-items: end;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-muted);
  padding: 8px 10px;
  transition: border-color 180ms, box-shadow 180ms;
}

.chat-composer-input:focus-within {
  border-color: var(--primary);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.chat-composer-input textarea {
  flex: 1;
  background: transparent;
  border: 0;
  outline: 0;
  resize: none;
  min-height: 22px;
  max-height: 120px;
  font-size: 13.5px;
  color: var(--t-base);
  padding: 4px 4px;
  font-family: inherit;
  line-height: 1.5;
}

.chat-composer-input textarea::-moz-placeholder {
  color: var(--t-light);
}

.chat-composer-input textarea::placeholder {
  color: var(--t-light);
}

.chat-composer-tools {
  display: flex;
  gap: 2px;
  align-items: center;
  flex-shrink: 0;
}

.chat-composer-tools .tool {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  color: var(--t-muted);
  transition: background 160ms, color 160ms;
}

.chat-composer-tools .tool:hover {
  background: var(--bg-hover);
  color: var(--t-base);
}

.chat-composer-tools .tool svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 1.8;
  fill: none;
}

.chat-composer-send {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  display: grid;
  place-items: center;
  transition: background 180ms;
  flex-shrink: 0;
}

.chat-composer-send:hover {
  background: var(--primary-dark);
}

.chat-composer-send svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* ============ DATA TABLE / RICH TABLE ============ */
.data-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.data-toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 240px;
}

.data-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.data-toolbar .input-icon {
  flex: 1;
  max-width: 320px;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.data-table thead th {
  position: sticky;
  top: 0;
  background: var(--bg-card);
  text-align: left;
  padding: 12px 14px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--t-light);
  font-weight: 500;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.data-table thead th .sort {
  display: inline-flex;
  vertical-align: middle;
  margin-left: 4px;
  color: var(--t-light);
}

.data-table thead th.sorted-asc .sort,
.data-table thead th.sorted-desc .sort {
  color: var(--primary);
}

.data-table thead th.sorted-asc .sort svg {
  transform: rotate(180deg);
}

.data-table thead th .sort svg {
  width: 10px;
  height: 10px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: transform 160ms;
}

.data-table tbody td {
  padding: 12px 14px;
  font-size: 13px;
  color: var(--t-base);
  border-bottom: 1px solid var(--border-soft);
  white-space: nowrap;
}

.data-table tbody tr {
  transition: background 140ms;
}

.data-table tbody tr:hover td {
  background: var(--bg-hover);
}

.data-table tbody tr.is-selected td {
  background: var(--primary-soft);
}

.data-cell-user {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.data-cell-user .av {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 11px;
  flex-shrink: 0;
}

.data-cell-user-meta {
  line-height: 1.3;
  min-width: 0;
}

.data-cell-user-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--t-base);
}

.data-cell-user-email {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: var(--t-muted);
  letter-spacing: 0.02em;
}

.data-cell-mono {
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: var(--t-muted);
  letter-spacing: 0.02em;
}

.data-cell-actions {
  display: flex;
  gap: 2px;
}

.data-cell-actions .btn--icon {
  padding: 6px;
  background: transparent;
  border: 0;
  color: var(--t-muted);
  border-radius: 6px;
  transition: background 140ms, color 140ms;
}

.data-cell-actions .btn--icon:hover {
  background: var(--bg-hover);
  color: var(--t-base);
}

.data-cell-actions .btn--icon svg {
  width: 13px;
  height: 13px;
  stroke: currentColor;
  stroke-width: 1.8;
  fill: none;
}

.data-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid var(--border-soft);
  font-size: 12px;
  color: var(--t-muted);
}

.data-foot-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.data-foot-info .select {
  width: auto;
  padding: 6px 28px 6px 10px;
  font-size: 12px;
}

.pager {
  display: flex;
  gap: 4px;
  align-items: center;
}

.pager-btn {
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  color: var(--t-muted);
  transition: background 160ms, color 160ms;
}

.pager-btn:hover:not(:disabled) {
  background: var(--bg-hover);
  color: var(--t-base);
}

.pager-btn.is-active {
  background: var(--primary);
  color: #fff;
}

.pager-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pager-btn svg {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* ============ CHARTS PAGE ============ */
.chart-pad {
  position: relative;
  padding: 8px 0 4px;
}

.chart-canvas-wrap {
  position: relative;
  width: 100%;
  min-height: 240px;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border-soft);
}

.chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--t-muted);
}

.chart-legend-item .swatch {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}

.chart-meta-row {
  display: flex;
  gap: 18px;
  padding-top: 14px;
  border-top: 1px dashed var(--border-soft);
  margin-top: 14px;
  flex-wrap: wrap;
}

.chart-meta-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 90px;
}

.chart-meta-label {
  font-size: 10.5px;
  color: var(--t-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: "JetBrains Mono", monospace;
}

.chart-meta-value {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.02em;
  color: var(--t-base);
}

.chart-meta-value.up {
  color: var(--success);
}

.chart-meta-value.down {
  color: var(--danger);
}

/* ============ DASHBOARD-SPECIFIC ============ */
/* KPI grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.kpi-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px 22px 20px;
  box-shadow: var(--shadow-card);
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  position: relative;
  overflow: hidden;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 220ms ease, border-color 220ms ease;
}

.kpi-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto auto;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle at top right, currentColor, transparent 65%);
  opacity: 0.08;
  pointer-events: none;
  transition: opacity 220ms ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.kpi-card:hover::before {
  opacity: 0.14;
}

.kpi-card.c-success {
  color: var(--success);
}

.kpi-card.c-danger {
  color: var(--danger);
}

.kpi-card.c-purple {
  color: var(--purple);
}

.kpi-card.c-primary {
  color: var(--primary);
}

.kpi-card:nth-child(1) {
  animation-delay: 60ms;
}

.kpi-card:nth-child(2) {
  animation-delay: 120ms;
}

.kpi-card:nth-child(3) {
  animation-delay: 180ms;
}

.kpi-card:nth-child(4) {
  animation-delay: 240ms;
}

.kpi-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: relative;
}

.kpi-identity {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.kpi-icon {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.kpi-icon svg {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  stroke-width: 1.9;
  fill: none;
}

.kpi-icon.primary {
  background: var(--primary-soft);
  color: var(--primary);
}

.kpi-icon.success {
  background: var(--success-soft);
  color: var(--success);
}

.kpi-icon.info {
  background: var(--info-soft);
  color: var(--info);
}

.kpi-icon.purple {
  background: var(--purple-soft);
  color: var(--purple);
}

.kpi-icon.danger {
  background: var(--danger-soft);
  color: var(--danger);
}

.kpi-icon.warning {
  background: var(--warning-soft);
  color: var(--warning);
}

.kpi-label {
  font-size: 13px;
  color: var(--t-muted);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.kpi-value {
  font-family: "Inter Tight", "Inter", sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.035em;
  color: var(--t-base);
  position: relative;
}

.kpi-value sup {
  font-size: 17px;
  color: var(--t-muted);
  vertical-align: top;
  font-weight: 500;
  margin-left: 3px;
  line-height: 2.1;
}

.kpi-compare {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: var(--t-light);
  font-weight: 500;
  padding-top: 12px;
  border-top: 1px dashed var(--border-soft);
  margin-top: auto;
}

.kpi-compare strong {
  color: var(--t-base);
  font-weight: 600;
  font-family: "JetBrains Mono", monospace;
  font-size: 11.5px;
  letter-spacing: -0.01em;
}

.kpi-compare svg {
  width: 11px;
  height: 11px;
  stroke: currentColor;
  stroke-width: 2.2;
  fill: none;
  flex-shrink: 0;
}

.kpi-compare .up {
  color: var(--success);
}

.kpi-compare .down {
  color: var(--danger);
}

.kpi-compare .flat {
  color: var(--purple);
}

.kpi-compare .info {
  color: var(--info);
}

.kpi-compare .sep {
  color: var(--t-light);
  opacity: 0.45;
  font-weight: 400;
}

.kpi-pill {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  font-weight: 500;
  padding: 4px 9px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.kpi-pill.up {
  background: var(--success-soft);
  color: var(--success);
}

.kpi-pill.down {
  background: var(--danger-soft);
  color: var(--danger);
}

.kpi-pill.flat {
  background: var(--purple-soft);
  color: var(--purple);
}

.kpi-pill.info {
  background: var(--info-soft);
  color: var(--info);
}

.kpi-pill svg {
  width: 10px;
  height: 10px;
  stroke: currentColor;
  stroke-width: 2.5;
  fill: none;
}

/* Site Visits regional + radials */
.sv-regions {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 36px;
}

.sv-region {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.sv-region-head {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  color: var(--t-muted);
  font-weight: 500;
}

.sv-region-head .marker {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sv-region-value {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--t-base);
  letter-spacing: -0.03em;
  line-height: 1.05;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.sv-region-value .pct {
  font-family: "JetBrains Mono", monospace;
  font-size: 11.5px;
  color: var(--t-light);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.sv-region-bar {
  height: 3px;
  background: var(--bg-muted);
  border-radius: 99px;
  overflow: hidden;
  margin-top: 2px;
}

.sv-region-bar-fill {
  height: 100%;
  border-radius: 99px;
  transform-origin: left;
  animation: bar-in 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 300ms both;
}

.sv-divider {
  height: 1px;
  background: var(--border-soft);
  margin: 28px 0;
}

.sv-radials {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.sv-radial {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 16px;
  align-items: center;
}

.sv-radial-chart {
  width: 72px;
  height: 72px;
  position: relative;
  flex-shrink: 0;
}

.sv-radial-chart svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.radial-track {
  stroke: var(--bg-muted);
  stroke-width: 5;
  fill: none;
}

.radial-fill {
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
}

.radial-fill.danger {
  stroke: var(--danger);
}

.radial-fill.info {
  stroke: var(--info);
}

.radial-fill.warning {
  stroke: var(--warning);
}

.sv-radial-chart .pct {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--t-base);
  letter-spacing: -0.022em;
}

.sv-radial-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.sv-radial-name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--t-base);
  letter-spacing: -0.005em;
}

.sv-radial-caption {
  font-size: 11.5px;
  color: var(--t-muted);
}

/* Monthly chart */
.chart-svg {
  width: 100%;
  height: auto;
  display: block;
}

.chart-svg .grid-line {
  stroke: var(--border-soft);
  stroke-width: 1;
  stroke-dasharray: 2 4;
}

.chart-svg .axis-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  fill: var(--t-light);
  letter-spacing: 0.04em;
}

.chart-svg .area {
  fill: url("#chartGrad");
}

.chart-svg .line {
  fill: none;
  stroke: var(--primary);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 2400;
  stroke-dashoffset: 2400;
  animation: draw 1400ms cubic-bezier(0.55, 0.15, 0.2, 1) 400ms forwards;
}

.chart-svg .dot-peak {
  fill: var(--primary);
  stroke: var(--bg-card);
  stroke-width: 3;
  opacity: 0;
  animation: fade-in 600ms ease 1400ms forwards;
}

.monthly-footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--border-soft);
  margin-top: 18px;
}

.stat-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-cell-label {
  font-size: 11px;
  color: var(--t-muted);
  font-weight: 500;
}

.stat-cell-value {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.022em;
  color: var(--t-base);
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-cell-value .trend-ic {
  width: 11px;
  height: 11px;
  color: var(--success);
  flex-shrink: 0;
}

/* Todo list */
.todo-list {
  display: flex;
  flex-direction: column;
}

.todo-item {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 11px 0;
  border-bottom: 1px solid var(--border-soft);
}

.todo-item:last-child {
  border-bottom: 0;
}

.todo-check {
  -moz-appearance: none;
       appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--t-light);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: all 160ms ease;
  background: transparent;
}

.todo-check:hover {
  border-color: var(--primary);
}

.todo-check:checked {
  background: var(--primary);
  border-color: var(--primary);
}

.todo-check:checked::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 1px;
  width: 4px;
  height: 9px;
  border: solid #fff;
  border-width: 0 1.8px 1.8px 0;
  transform: rotate(45deg);
}

.todo-item.is-done .todo-text {
  color: var(--t-light);
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
}

.todo-text {
  font-size: 13.5px;
  color: var(--t-base);
  cursor: pointer;
}

.todo-badge {
  font-size: 10.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  letter-spacing: 0.02em;
  line-height: 1;
}

.todo-badge.low {
  background: var(--bg-muted);
  color: var(--t-muted);
}

.todo-badge.upcoming {
  background: var(--info-soft);
  color: var(--info);
}

.todo-badge.urgent {
  background: var(--danger-soft);
  color: var(--danger);
}

.todo-badge.warn {
  background: var(--warning-soft);
  color: var(--warning);
}

.todo-badge.done {
  background: var(--success-soft);
  color: var(--success);
}

/* Sales report */
.sales-summary {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0 20px;
  margin-bottom: 4px;
}

.sales-summary-label .eyebrow {
  display: block;
  margin-bottom: 4px;
}

.sales-summary h4 {
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: var(--t-base);
  margin: 0;
}

.sales-summary-total {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.03em;
  color: var(--t-base);
  line-height: 1;
}

.sales-summary-total sup {
  font-size: 15px;
  color: var(--t-muted);
  vertical-align: top;
  font-weight: 500;
  margin-right: 1px;
  line-height: 2;
}

.sales-all {
  padding: 18px 0 0;
  text-align: center;
  margin-top: 6px;
  border-top: 1px solid var(--border-soft);
}

.sales-all a {
  font-size: 12.5px;
  color: var(--primary);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: color 180ms;
}

.sales-all a:hover {
  color: var(--primary-dark);
}

.sales-all svg {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  stroke-width: 2.2;
  fill: none;
}

/* Weather */
.wx-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 8px 0;
}

.wx-temp-block {
  display: flex;
  align-items: center;
  gap: 16px;
}

.wx-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--info-soft), var(--primary-soft));
  color: var(--info);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.wx-icon svg {
  width: 34px;
  height: 34px;
  stroke: currentColor;
  stroke-width: 1.3;
  fill: none;
}

.wx-temp {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.035em;
  color: var(--t-base);
}

.wx-temp sup {
  font-size: 18px;
  color: var(--t-muted);
  vertical-align: top;
  font-weight: 500;
  line-height: 1.6;
}

.wx-condition {
  margin-top: 4px;
  color: var(--t-muted);
  font-size: 13px;
}

.wx-condition strong {
  color: var(--t-base);
  font-weight: 600;
}

.wx-date {
  text-align: right;
}

.wx-date h5 {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--t-base);
  margin: 0 0 2px;
  letter-spacing: -0.02em;
}

.wx-date p {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--t-light);
  letter-spacing: 0.06em;
  margin: 0;
}

.wx-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin: 20px 0 16px;
}

.wx-stats > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wx-stat-label {
  font-size: 11px;
  color: var(--t-muted);
  font-weight: 500;
}

.wx-stat-value {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--t-base);
  letter-spacing: -0.018em;
}

.wx-stat-value .unit {
  font-size: 11px;
  color: var(--t-light);
  margin-left: 3px;
  font-weight: 500;
  letter-spacing: 0;
}

.wx-forecast {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
}

.wx-day {
  padding: 10px 4px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 160ms ease;
}

.wx-day:hover {
  background: var(--bg-hover);
}

.wx-day.is-today {
  background: var(--primary);
  color: #fff;
}

.wx-day-name {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--t-muted);
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.wx-day.is-today .wx-day-name {
  color: rgba(255, 255, 255, 0.85);
}

.wx-day-icon {
  width: 22px;
  height: 22px;
  margin: 0 auto 6px;
  color: var(--t-muted);
}

.wx-day-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 1.6;
  fill: none;
}

.wx-day.is-today .wx-day-icon {
  color: #fff;
}

.wx-day-temp {
  font-size: 12.5px;
  color: var(--t-base);
  font-weight: 600;
}

.wx-day.is-today .wx-day-temp {
  color: #fff;
}

/* Quick chat */
.chat-frame {
  margin: -6px -6px 0;
  border-radius: 12px;
  background: var(--bg-muted);
  overflow: hidden;
}

.chat-messages {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 200px;
}

.chat-row {
  display: flex;
  gap: 10px;
  max-width: min(85%, 560px);
}

.chat-row.me {
  margin-left: auto;
  flex-direction: row-reverse;
}

.chat-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--t-base);
  display: grid;
  place-items: center;
  font-weight: 600;
  font-size: 11.5px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}

.chat-avatar.me {
  background: linear-gradient(135deg, var(--primary), var(--purple));
  color: #fff;
  border: 0;
}

.chat-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.chat-row.me .chat-stack {
  align-items: flex-end;
}

.chat-bubble {
  padding: 8px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  border-top-left-radius: 4px;
  font-size: 13px;
  color: var(--t-base);
  line-height: 1.45;
  box-shadow: var(--shadow-sm);
}

.chat-row.me .chat-bubble {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  border-top-left-radius: 14px;
  border-top-right-radius: 4px;
}

.chat-ts {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  color: var(--t-light);
  letter-spacing: 0.04em;
  padding: 0 4px;
}

.chat-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
}

.chat-input {
  flex: 1;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 13.5px;
  color: var(--t-base);
  padding: 4px 0;
}

.chat-input::-moz-placeholder {
  color: var(--t-light);
}

.chat-input::placeholder {
  color: var(--t-light);
}

.chat-send {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: var(--primary);
  color: #fff;
  transition: background 180ms;
  flex-shrink: 0;
  box-shadow: 0 2px 6px -1px color-mix(in oklab, var(--primary) 40%, transparent);
}

.chat-send:hover {
  background: var(--primary-dark);
}

.chat-send svg {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* ============ EMAIL — 3-pane layout ============ */
.mail-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 20px;
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.mail-hero .hero-title {
  font-size: clamp(24px, 2.4vw, 28px);
  margin-bottom: 6px;
}

.mail-hero .hero-sub {
  font-size: 13.5px;
}

.mail-shell {
  display: grid;
  grid-template-columns: 220px minmax(320px, 1fr) minmax(0, 1.4fr);
  gap: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  height: calc(100vh - 240px);
  min-height: 560px;
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: 80ms;
}

/* ---- Folder rail ---- */
.mail-rail {
  display: flex;
  flex-direction: column;
  padding: 18px 14px;
  border-right: 1px solid var(--border-soft);
  background: var(--bg-card);
  overflow-y: auto;
  gap: 18px;
}

.mail-rail::-webkit-scrollbar {
  width: 4px;
}

.mail-rail::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.mail-compose {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--primary);
  color: #fff;
  padding: 11px 14px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 6px -1px var(--primary-ring);
  transition: background 180ms;
}

.mail-compose:hover {
  background: var(--primary-dark);
}

.mail-compose svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.mail-rail-section {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.mail-rail-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--t-light);
  padding: 0 10px 8px;
}

.mail-folder {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--t-muted);
  font-size: 13px;
  font-weight: 500;
  transition: background 160ms ease, color 160ms ease;
  cursor: pointer;
}

.mail-folder svg {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  stroke-width: 1.75;
  fill: none;
  flex-shrink: 0;
}

.mail-folder:hover {
  background: var(--bg-hover);
  color: var(--t-base);
}

.mail-folder.is-active {
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 600;
}

.mail-folder-name {
  flex: 1;
  min-width: 0;
}

.mail-folder-count {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--t-light);
  font-weight: 500;
}

.mail-folder.is-active .mail-folder-count {
  color: var(--primary);
}

.mail-folder-count.is-strong {
  background: var(--primary);
  color: #fff;
  padding: 2px 7px;
  border-radius: 999px;
  font-size: 10px;
}

.mail-folder.is-active .mail-folder-count.is-strong {
  background: var(--primary);
  color: #fff;
}

.mail-label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.mail-rail-storage {
  margin-top: auto;
  padding: 14px 10px 4px;
  border-top: 1px solid var(--border-soft);
}

.mail-storage-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11.5px;
  color: var(--t-muted);
  font-weight: 500;
  margin-bottom: 8px;
}

.mail-storage-head .num {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--t-light);
  letter-spacing: 0.04em;
}

.mail-storage-bar {
  height: 4px;
  background: var(--bg-muted);
  border-radius: 99px;
  overflow: hidden;
}

.mail-storage-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--purple));
  border-radius: 99px;
  animation: bar-in 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 300ms both;
  transform-origin: left;
}

.mail-storage-foot {
  font-size: 11px;
  color: var(--t-light);
  margin-top: 6px;
}

.mail-storage-foot a {
  color: var(--primary);
  font-weight: 600;
}

/* ---- Message list ---- */
.mail-list {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-soft);
  background: var(--bg-card);
  min-width: 0;
  overflow: hidden;
}

.mail-list-head {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-soft);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mail-list-toptools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.mail-list-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--t-base);
  letter-spacing: -0.018em;
}

.mail-list-title .meta {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--t-light);
  font-weight: 500;
  margin-left: 8px;
  letter-spacing: 0.04em;
}

.mail-list-tools {
  display: flex;
  gap: 2px;
}

.mail-tool {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  color: var(--t-muted);
  transition: background 160ms, color 160ms;
}

.mail-tool:hover {
  background: var(--bg-hover);
  color: var(--t-base);
}

.mail-tool svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 1.8;
  fill: none;
}

.mail-search {
  position: relative;
}

.mail-search input {
  width: 100%;
  padding: 8px 10px 8px 32px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-muted);
  font-size: 12.5px;
  color: var(--t-base);
  outline: 0;
  transition: border-color 180ms, box-shadow 180ms, background 180ms;
}

.mail-search input::-moz-placeholder {
  color: var(--t-light);
}

.mail-search input::placeholder {
  color: var(--t-light);
}

.mail-search input:focus {
  border-color: var(--primary);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.mail-search svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 13px;
  stroke: var(--t-light);
  stroke-width: 2;
  fill: none;
  pointer-events: none;
}

.mail-tabs {
  display: flex;
  gap: 4px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-soft);
  background: var(--bg-card);
}

.mail-tab {
  padding: 10px 4px;
  margin-right: 14px;
  font-size: 12px;
  color: var(--t-muted);
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: color 160ms, border-color 160ms;
  position: relative;
  top: 1px;
}

.mail-tab:hover {
  color: var(--t-base);
}

.mail-tab.is-active {
  color: var(--primary);
  border-bottom-color: var(--primary);
  font-weight: 600;
}

.mail-tab .num {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  margin-left: 4px;
  letter-spacing: 0.04em;
}

.mail-tab.is-active .num {
  color: var(--primary);
}

.mail-list-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.mail-list-scroll::-webkit-scrollbar {
  width: 4px;
}

.mail-list-scroll::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.mail-row {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-soft);
  cursor: pointer;
  transition: background 160ms ease;
  position: relative;
}

.mail-row:hover {
  background: var(--bg-hover);
}

.mail-row.is-active {
  background: var(--primary-soft);
  box-shadow: inset 3px 0 0 var(--primary);
}

.mail-row.is-unread::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 18px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary);
}

.mail-row-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}

.ma-1 {
  background: linear-gradient(135deg, var(--primary), var(--purple));
}

.ma-2 {
  background: linear-gradient(135deg, var(--success), var(--teal));
}

.ma-3 {
  background: linear-gradient(135deg, var(--danger), var(--warning));
}

.ma-4 {
  background: linear-gradient(135deg, var(--info), var(--primary-light));
}

.ma-5 {
  background: linear-gradient(135deg, var(--orange), var(--pink));
}

.ma-6 {
  background: linear-gradient(135deg, var(--purple), var(--pink));
}

.mail-row-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.mail-row-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.mail-row-from {
  font-size: 13px;
  color: var(--t-base);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.mail-row.is-unread .mail-row-from {
  font-weight: 700;
}

.mail-row-time {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.mail-row.is-unread .mail-row-time {
  color: var(--primary);
}

.mail-row-subject {
  font-size: 12.5px;
  color: var(--t-base);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mail-row.is-unread .mail-row-subject {
  font-weight: 600;
}

.mail-row-preview {
  font-size: 12px;
  color: var(--t-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mail-row-tags {
  display: flex;
  gap: 5px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.mail-tag {
  font-size: 9.5px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.4;
}

.mail-tag.work {
  background: var(--primary-soft);
  color: var(--primary);
}

.mail-tag.team {
  background: var(--success-soft);
  color: var(--success);
}

.mail-tag.finance {
  background: var(--purple-soft);
  color: var(--purple);
}

.mail-tag.invoice {
  background: var(--warning-soft);
  color: var(--warning);
}

.mail-tag.travel {
  background: var(--info-soft);
  color: var(--info);
}

.mail-tag.attach {
  background: var(--bg-muted);
  color: var(--t-muted);
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.mail-tag.attach svg {
  width: 9px;
  height: 9px;
  stroke: currentColor;
  stroke-width: 2.4;
  fill: none;
}

.mail-star {
  position: absolute;
  right: 16px;
  bottom: 12px;
  color: var(--t-light);
  cursor: pointer;
  transition: color 160ms;
}

.mail-star svg {
  width: 13px;
  height: 13px;
  stroke: currentColor;
  stroke-width: 1.8;
  fill: none;
}

.mail-star:hover {
  color: var(--warning);
}

.mail-star.is-on {
  color: var(--warning);
}

.mail-star.is-on svg {
  fill: var(--warning);
}

/* ---- Reader pane ---- */
.mail-reader {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  min-width: 0;
  overflow: hidden;
}

.reader-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px;
  border-bottom: 1px solid var(--border-soft);
  gap: 10px;
}

.reader-tools-group {
  display: flex;
  gap: 2px;
  align-items: center;
}

.reader-tools-group .sep {
  width: 1px;
  height: 18px;
  background: var(--border-soft);
  margin: 0 6px;
}

.reader-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px 28px;
}

.reader-scroll::-webkit-scrollbar {
  width: 5px;
}

.reader-scroll::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.reader-head {
  margin-bottom: 18px;
}

.reader-subject {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.25;
  letter-spacing: -0.022em;
  color: var(--t-base);
  margin: 0 0 10px;
}

.reader-meta-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.reader-meta-row .mail-tag {
  font-size: 10px;
  padding: 3px 8px;
}

.reader-card {
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 14px;
}

.reader-card-head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-soft);
}

.reader-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
}

.reader-from-block {
  flex: 1;
  min-width: 0;
  line-height: 1.3;
}

.reader-from-name {
  font-size: 13.5px;
  color: var(--t-base);
  font-weight: 600;
}

.reader-from-email {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: var(--t-muted);
  letter-spacing: 0.02em;
}

.reader-from-meta {
  font-size: 11.5px;
  color: var(--t-light);
  margin-top: 4px;
}

.reader-time-block {
  text-align: right;
  font-size: 11.5px;
  color: var(--t-muted);
  flex-shrink: 0;
}

.reader-time-block .mono {
  font-family: "JetBrains Mono", monospace;
  color: var(--t-light);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  display: block;
  margin-top: 2px;
}

.reader-actions {
  display: flex;
  gap: 4px;
  margin-left: 4px;
}

.reader-body {
  padding: 18px 16px;
  font-size: 13.5px;
  color: var(--t-base);
  line-height: 1.65;
  background: var(--bg-card);
}

.reader-body p {
  margin: 0 0 12px;
}

.reader-body p:last-child {
  margin-bottom: 0;
}

.reader-body strong {
  color: var(--t-base);
  font-weight: 600;
}

.reader-body a {
  color: var(--primary);
  font-weight: 500;
}

.reader-body ul {
  margin: 0 0 12px;
  padding-left: 18px;
  list-style: disc;
}

.reader-body li {
  margin: 4px 0;
}

.reader-quote {
  margin: 14px 0 4px;
  padding: 12px 14px;
  border-left: 2px solid var(--border);
  background: var(--bg-muted);
  border-radius: 0 8px 8px 0;
  font-size: 12.5px;
  color: var(--t-muted);
}

.reader-attach {
  padding: 14px 16px;
  border-top: 1px solid var(--border-soft);
  background: var(--bg-card);
}

.reader-attach-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--t-light);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.reader-attach-head svg {
  width: 11px;
  height: 11px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.reader-attach-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 10px;
}

.reader-attach-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--border-soft);
  border-radius: 9px;
  background: var(--bg-card);
  transition: border-color 160ms, box-shadow 160ms, transform 160ms;
  cursor: pointer;
}

.reader-attach-item:hover {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}

.attach-ico {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff;
}

.attach-ico.pdf {
  background: var(--danger);
}

.attach-ico.doc {
  background: var(--primary);
}

.attach-ico.xls {
  background: var(--success);
}

.attach-ico.img {
  background: var(--purple);
}

.attach-ico.zip {
  background: var(--orange);
}

.attach-meta {
  line-height: 1.3;
  min-width: 0;
}

.attach-name {
  font-size: 12.5px;
  color: var(--t-base);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attach-size {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
}

.reader-collapsed {
  padding: 12px 16px;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background 160ms;
}

.reader-collapsed:hover {
  background: var(--bg-hover);
}

.reader-collapsed .reader-avatar {
  width: 28px;
  height: 28px;
  font-size: 11px;
}

.reader-collapsed-from {
  font-size: 12.5px;
  color: var(--t-base);
  font-weight: 600;
}

.reader-collapsed-preview {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: var(--t-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reader-collapsed-time {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
}

.reader-replybar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 16px;
  margin-top: 8px;
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  background: var(--bg-muted);
}

.reader-replybar input {
  flex: 1;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 13px;
  color: var(--t-base);
  padding: 4px 6px;
}

.reader-replybar input::-moz-placeholder {
  color: var(--t-light);
}

.reader-replybar input::placeholder {
  color: var(--t-light);
}

.reader-replybar .reply-send {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  transition: background 180ms;
  flex-shrink: 0;
}

.reader-replybar .reply-send:hover {
  background: var(--primary-dark);
}

.reader-replybar .reply-send svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* ============ CALENDAR ============ */
.cal-hero {
  margin-bottom: 20px;
}

.cal-hero .hero-title {
  font-size: clamp(24px, 2.4vw, 28px);
  margin-bottom: 6px;
}

.cal-hero .hero-sub {
  font-size: 13.5px;
}

.cal-shell {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 20px;
  animation: rise-in 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: 80ms;
}

/* ---- Left rail ---- */
.cal-rail {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.cal-quickadd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--primary);
  color: #fff;
  padding: 11px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 6px -1px var(--primary-ring);
  transition: background 180ms;
}

.cal-quickadd:hover {
  background: var(--primary-dark);
}

.cal-quickadd svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.cal-rail-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cal-rail-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.cal-rail-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 13.5px;
  color: var(--t-base);
  letter-spacing: -0.01em;
}

.cal-rail-tools {
  display: flex;
  gap: 2px;
}

/* Mini calendar */
.mini-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.mini-cal-wd {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  color: var(--t-light);
  text-align: center;
  padding: 4px 0 6px;
  letter-spacing: 0.06em;
}

.mini-cal-day {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  font-size: 11.5px;
  color: var(--t-base);
  border-radius: 7px;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease;
  position: relative;
}

.mini-cal-day:hover {
  background: var(--bg-hover);
}

.mini-cal-day.is-other {
  color: var(--t-light);
}

.mini-cal-day.is-today {
  background: var(--primary);
  color: #fff;
  font-weight: 700;
}

.mini-cal-day.has-event::after {
  content: "";
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--primary);
}

.mini-cal-day.is-today.has-event::after {
  background: #fff;
}

/* My calendars */
.cal-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cal-list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 7px;
  cursor: pointer;
  transition: background 140ms ease;
}

.cal-list-item:hover {
  background: var(--bg-hover);
}

.cal-list-check {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  flex-shrink: 0;
  position: relative;
  border: 1.5px solid currentColor;
  background: currentColor;
}

.cal-list-check::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 0;
  width: 3px;
  height: 7px;
  border: solid #fff;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
}

.cal-list-check.is-off {
  background: transparent;
}

.cal-list-check.is-off::after {
  display: none;
}

.cal-list-name {
  font-size: 12.5px;
  color: var(--t-base);
  flex: 1;
  min-width: 0;
}

.cal-list-item.is-off .cal-list-name {
  color: var(--t-light);
}

.cal-list-count {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
}

/* Upcoming list */
.upc-list {
  display: flex;
  flex-direction: column;
}

.upc-item {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 12px;
  padding: 11px 0;
  border-top: 1px solid var(--border-soft);
  align-items: center;
}

.upc-item:first-child {
  border-top: 0;
  padding-top: 4px;
}

.upc-date {
  text-align: center;
  line-height: 1.05;
  padding: 6px 0;
  border-radius: 8px;
  background: var(--bg-muted);
}

.upc-date .day {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: var(--t-base);
  letter-spacing: -0.022em;
}

.upc-date .mo {
  font-family: "JetBrains Mono", monospace;
  font-size: 9px;
  color: var(--t-light);
  letter-spacing: 0.08em;
  margin-top: 2px;
  display: block;
  text-transform: uppercase;
}

.upc-date.is-today {
  background: var(--primary-soft);
}

.upc-date.is-today .day {
  color: var(--primary);
}

.upc-date.is-today .mo {
  color: var(--primary);
}

.upc-meta {
  min-width: 0;
  line-height: 1.35;
}

.upc-title {
  font-size: 13px;
  color: var(--t-base);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upc-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: var(--t-muted);
  margin-top: 3px;
}

.upc-time .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.upc-time .mono {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: var(--t-light);
}

/* ---- Main calendar ---- */
.cal-main {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.cal-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-soft);
}

.cal-toolbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.cal-month {
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--t-base);
  letter-spacing: -0.022em;
  line-height: 1;
  white-space: nowrap;
}

.cal-month .yr {
  color: var(--t-light);
  font-weight: 500;
  margin-left: 4px;
}

.cal-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cal-nav-btn {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  color: var(--t-muted);
  transition: background 160ms, color 160ms;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.cal-nav-btn:hover {
  background: var(--bg-hover);
  color: var(--t-base);
  border-color: var(--t-light);
}

.cal-nav-btn svg {
  width: 13px;
  height: 13px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.cal-today-btn {
  padding: 0 12px;
  height: 30px;
  font-size: 12px;
  font-weight: 600;
  color: var(--t-base);
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--bg-card);
  transition: border-color 160ms, background 160ms;
}

.cal-today-btn:hover {
  background: var(--bg-hover);
  border-color: var(--t-light);
}

.cal-views {
  display: flex;
  background: var(--bg-muted);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.cal-view-tab {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--t-muted);
  border-radius: 6px;
  transition: background 160ms, color 160ms, box-shadow 160ms;
}

.cal-view-tab:hover {
  color: var(--t-base);
}

.cal-view-tab.is-active {
  background: var(--bg-card);
  color: var(--t-base);
  box-shadow: var(--shadow-sm);
}

.cal-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Weekday header row */
.cal-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
}

.cal-weekdays > div {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--t-light);
  font-weight: 500;
  padding: 10px 12px;
  text-align: left;
}

/* Month grid */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(110px, 1fr);
  flex: 1;
}

.cal-cell {
  border-right: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  padding: 8px 8px 6px;
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: background 160ms ease;
}

.cal-cell:hover {
  background: var(--bg-hover);
}

.cal-cell:nth-child(7n) {
  border-right: 0;
}

.cal-grid > .cal-cell:nth-last-child(-n+7) {
  border-bottom: 0;
}

.cal-cell.is-other {
  background: var(--bg-muted);
}

.cal-cell.is-other:hover {
  background: var(--bg-hover);
}

.cal-day-num {
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: var(--t-base);
  line-height: 1;
  align-self: flex-start;
  padding: 2px 4px;
  border-radius: 6px;
  margin-bottom: 2px;
}

.cal-cell.is-other .cal-day-num {
  color: var(--t-light);
  font-weight: 500;
}

.cal-cell.is-today .cal-day-num {
  background: var(--primary);
  color: #fff;
  min-width: 22px;
  text-align: center;
  padding: 4px 6px;
}

.cal-cell.is-weekend:not(.is-today):not(.is-other) .cal-day-num {
  color: var(--t-muted);
}

.cal-chips {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.cal-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.3;
  cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  border-left: 2px solid transparent;
}

.cal-chip:hover {
  transform: translateX(1px);
}

.cal-chip-time {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.cal-chip-title {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cal-chip.work {
  background: var(--primary-soft);
  color: var(--primary);
  border-left-color: var(--primary);
}

.cal-chip.team {
  background: var(--success-soft);
  color: var(--success);
  border-left-color: var(--success);
}

.cal-chip.personal {
  background: var(--purple-soft);
  color: var(--purple);
  border-left-color: var(--purple);
}

.cal-chip.travel {
  background: var(--info-soft);
  color: var(--info);
  border-left-color: var(--info);
}

.cal-chip.finance {
  background: var(--warning-soft);
  color: var(--warning);
  border-left-color: var(--warning);
}

.cal-chip.birthday {
  background: var(--pink-soft);
  color: var(--pink);
  border-left-color: var(--pink);
}

.cal-chip.holiday {
  background: var(--orange-soft);
  color: var(--orange);
  border-left-color: var(--orange);
}

.cal-chip.solid {
  color: #fff;
}

.cal-chip.solid.work {
  background: var(--primary);
  border-left-color: var(--primary-dark);
}

.cal-chip.solid.team {
  background: var(--success);
  border-left-color: var(--success);
}

.cal-chip.solid.personal {
  background: var(--purple);
  border-left-color: var(--purple);
}

.cal-chip-more {
  padding: 3px 7px;
  font-size: 10.5px;
  color: var(--t-muted);
  font-weight: 600;
  cursor: pointer;
  transition: color 160ms;
}

.cal-chip-more:hover {
  color: var(--primary);
}

/* ============ FULLCALENDAR — 2026 OVERRIDES ============ */
/* Map FC's CSS variables to our tokens so all chrome inherits the theme. */
[data-fc] {
  --fc-border-color: var(--border-soft);
  --fc-page-bg-color: var(--bg-card);
  --fc-neutral-bg-color: var(--bg-muted);
  --fc-neutral-text-color: var(--t-muted);
  --fc-today-bg-color: color-mix(in oklab, var(--primary) 10%, transparent);
  --fc-now-indicator-color: var(--danger);
  --fc-event-bg-color: var(--primary);
  --fc-event-border-color: var(--primary);
  --fc-event-text-color: #fff;
  --fc-event-selected-overlay-color: rgb(15 23 42 / 0.06);
  --fc-list-event-hover-bg-color: var(--bg-hover);
  --fc-highlight-color: color-mix(in oklab, var(--primary) 16%, transparent);
  font-family: "Inter",system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans, sans-serif;
  height: 100%;
}

/* Day-grid header row (S M T W T F S) */
.fc .fc-col-header-cell-cushion {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--t-light);
  font-weight: 500;
  padding: 10px 0;
}

.fc-theme-standard .fc-scrollgrid,
.fc-theme-standard td,
.fc-theme-standard th {
  border-color: var(--border-soft);
}

/* Day numbers in month grid */
.fc .fc-daygrid-day-number {
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: 12.5px;
  color: var(--t-base);
  padding: 6px 8px;
}

.fc .fc-day-other .fc-daygrid-day-number {
  color: var(--t-light);
  font-weight: 500;
}

.fc .fc-day-today .fc-daygrid-day-number {
  background: var(--primary);
  color: #fff;
  border-radius: 6px;
  margin: 4px;
  padding: 3px 7px;
  min-width: 22px;
  text-align: center;
}

.fc .fc-day-today {
  background: transparent;
}

.fc .fc-daygrid-day-frame {
  padding: 2px 4px;
}

/* Events — base chip */
.fc .fc-daygrid-event,
.fc .fc-timegrid-event {
  border-radius: 5px;
  border: 0;
  border-left: 2px solid transparent;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 6px;
  margin: 1px 4px;
  line-height: 1.3;
  cursor: pointer;
  transition: transform 140ms ease, filter 160ms ease;
}

.fc .fc-daygrid-event:hover {
  transform: translateX(1px);
}

.fc .fc-daygrid-event-dot {
  display: none;
}

.fc .fc-event-time {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  font-weight: 600;
  margin-right: 4px;
  opacity: 0.85;
}

/* Category colors via classNames — match dashboard cal-chip variants */
.fc .fc-event.fc-cat-work {
  background: var(--primary-soft);
  color: var(--primary);
  border-left-color: var(--primary);
}

.fc .fc-event.fc-cat-team {
  background: var(--success-soft);
  color: var(--success);
  border-left-color: var(--success);
}

.fc .fc-event.fc-cat-personal {
  background: var(--purple-soft);
  color: var(--purple);
  border-left-color: var(--purple);
}

.fc .fc-event.fc-cat-travel {
  background: var(--info-soft);
  color: var(--info);
  border-left-color: var(--info);
}

.fc .fc-event.fc-cat-finance {
  background: var(--warning-soft);
  color: var(--warning);
  border-left-color: var(--warning);
}

.fc .fc-event.fc-cat-birthday {
  background: var(--pink-soft);
  color: var(--pink);
  border-left-color: var(--pink);
}

.fc .fc-event.fc-cat-travel .fc-event-time,
.fc .fc-event.fc-cat-team .fc-event-time,
.fc .fc-event.fc-cat-work .fc-event-time {
  color: inherit;
}

/* "more" link */
.fc .fc-daygrid-more-link {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--t-muted);
  padding: 2px 6px;
}

.fc .fc-daygrid-more-link:hover {
  color: var(--primary);
}

/* Time-grid axis */
.fc .fc-timegrid-axis-cushion,
.fc .fc-timegrid-slot-label-cushion {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
}

.fc .fc-timegrid-now-indicator-line {
  border-color: var(--danger);
  border-width: 1.5px;
}

.fc .fc-timegrid-now-indicator-arrow {
  border-color: var(--danger);
}

/* List view */
.fc .fc-list-day-cushion {
  background: var(--bg-muted);
}

.fc .fc-list-day-text,
.fc .fc-list-day-side-text {
  color: var(--t-base);
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: 13px;
}

.fc .fc-list-event-time,
.fc .fc-list-event-title {
  font-size: 13px;
  color: var(--t-base);
}

.fc .fc-list-event-dot {
  border-color: var(--primary);
}

.fc .fc-list-empty {
  background: var(--bg-card);
  color: var(--t-muted);
}

/* ============ COMMAND PALETTE (⌘K) ============ */
.palette-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
  z-index: 200;
  display: none;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh 16px 16px;
  animation: palette-fade 160ms ease both;
}

body.has-palette-open .palette-backdrop {
  display: flex;
}

@keyframes palette-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.palette-modal {
  width: 100%;
  max-width: 560px;
  max-height: 70vh;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: palette-rise 200ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes palette-rise {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.palette-input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-soft);
}

.palette-icon {
  width: 18px;
  height: 18px;
  color: var(--t-muted);
  flex-shrink: 0;
}

.palette-input {
  flex: 1;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 15px;
  color: var(--t-base);
  font-family: inherit;
  padding: 4px 0;
  min-width: 0;
}

.palette-input::-moz-placeholder {
  color: var(--t-light);
}

.palette-input::placeholder {
  color: var(--t-light);
}

.palette-esc {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  padding: 3px 7px;
  border-radius: 5px;
  background: var(--bg-muted);
  color: var(--t-muted);
  border: 1px solid var(--border);
  flex-shrink: 0;
  text-transform: lowercase;
  letter-spacing: 0.04em;
}

.palette-results {
  flex: 1;
  overflow-y: auto;
  padding: 6px;
}

.palette-results::-webkit-scrollbar {
  width: 4px;
}

.palette-results::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

.palette-result {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 9px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 120ms;
}

.palette-result:hover {
  background: var(--bg-hover);
}

.palette-result.is-selected {
  background: var(--primary-soft);
  color: var(--primary);
}

.palette-result-icon {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: var(--bg-muted);
  color: var(--t-muted);
  flex-shrink: 0;
}

.palette-result.is-selected .palette-result-icon {
  background: color-mix(in oklab, var(--primary) 14%, transparent);
  color: var(--primary);
}

.palette-result-icon svg {
  width: 14px;
  height: 14px;
}

.palette-result-label {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--t-base);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.palette-result.is-selected .palette-result-label {
  color: var(--primary);
  font-weight: 600;
}

.palette-result-section {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--t-light);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  flex-shrink: 0;
}

.palette-result.is-selected .palette-result-section {
  color: var(--primary);
  opacity: 0.8;
}

.palette-empty {
  padding: 32px 16px;
  text-align: center;
  color: var(--t-muted);
  font-size: 13px;
}

.palette-foot {
  display: flex;
  gap: 18px;
  padding: 10px 16px;
  border-top: 1px solid var(--border-soft);
  background: var(--bg-card);
  font-size: 11px;
  color: var(--t-muted);
}

.palette-foot kbd {
  font-family: "JetBrains Mono", monospace;
  font-size: 9.5px;
  padding: 1.5px 5px;
  border-radius: 4px;
  background: var(--bg-muted);
  color: var(--t-muted);
  border: 1px solid var(--border);
  margin-right: 4px;
  letter-spacing: 0.04em;
}

@media (max-width: 600px) {
  .palette-backdrop {
    padding-top: 6vh;
  }
  .palette-foot {
    flex-wrap: wrap;
    gap: 10px;
    font-size: 10px;
  }
}
/* ============ RESPONSIVE ============ */
/* Auth pages: collapse the marketing aside when the split-screen no longer fits.
   (Lives here, not in _auth.scss, so it wins over the later default rules there.) */
@media (max-width: 900px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }
  .auth-aside {
    display: none;
  }
}
@media (max-width: 1200px) {
  /* Dashboard */
  .sv-regions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }
  .sv-radials {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  /* Email */
  .mail-shell {
    grid-template-columns: 200px 1fr;
    height: auto;
    min-height: 0;
  }
  .mail-reader {
    display: none;
  }
  /* Calendar */
  .cal-shell {
    grid-template-columns: 240px 1fr;
  }
  .cal-grid {
    grid-auto-rows: minmax(96px, 1fr);
  }
}
@media (max-width: 1100px) {
  .shell {
    grid-template-columns: 72px 1fr;
  }
  .d-sidebar {
    padding: 20px 10px;
    overflow-y: auto; /* allow scroll on short viewports (e.g. 750×590) */
    overflow-x: hidden;
    z-index: 20;
  }
  .brand-text, .brand-tag, .nav-label, .nav-link > span:not(.nav-badge), .nav-link .nav-badge,
  .workspace-text, .workspace-chev, .nav-link .chev {
    display: none;
  }
  .brand {
    justify-content: center;
    padding: 0 0 18px;
  }
  .nav-link {
    justify-content: center;
    padding: 10px;
  }
  .nav-link.is-active::before {
    left: -10px;
  }
  .workspace {
    justify-content: center;
    padding: 6px;
  }
  .col-6 {
    grid-column: span 12;
  }
  /* Rail-mode flyout submenu: positioned via JS as position:fixed so the
     sidebar can scroll (overflow-y: auto above) without clipping the flyout,
     and so it can be shifted up to fit when opened near the viewport bottom. */
  .nav-submenu {
    position: fixed;
    left: 82px; /* fallback; JS overwrites with trigger's getBoundingClientRect */
    top: 0;
    width: 200px;
    max-height: 0;
    margin-left: 0;
    padding: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    box-shadow: var(--shadow-lg);
    opacity: 0;
    visibility: hidden;
    z-index: 50;
    transition: opacity 180ms ease, visibility 180ms;
  }
  .nav-submenu::before {
    display: none;
  }
  .nav-item-group.is-open .nav-submenu {
    max-height: 400px;
    padding: 6px 0;
    opacity: 1;
    visibility: visible;
  }
  .nav-submenu a {
    padding: 8px 14px;
    font-size: 13px;
    border-radius: 6px;
    margin: 0 6px;
  }
  .nav-submenu a:hover {
    padding-left: 14px;
  }
  /* Chat */
  .chat-shell {
    grid-template-columns: 240px 1fr;
  }
}
@media (max-width: 720px) {
  /* ---- Shell / sidebar drawer ----
     Sidebar becomes position:fixed (off-grid), so collapse the grid to a
     single column — otherwise .main is auto-placed into the empty column-1
     (0px) and disappears. */
  .shell {
    display: block;
  }
  .d-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    z-index: 100; /* above backdrop (90) */
    transform: translateX(-100%);
    transition: transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1);
    box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.4);
    /* Restore full-width nav (override the 1100px collapse) */
    padding: 22px 16px 18px;
    overflow-y: auto; /* override 1100px rail-mode 'visible' so long menus scroll */
    overscroll-behavior: contain;
  }
  .brand-text, .brand-tag, .nav-label, .nav-link > span:not(.nav-badge), .nav-link .nav-badge,
  .workspace-text, .workspace-chev, .nav-submenu, .nav-link .chev {
    display: revert;
  }
  .brand {
    justify-content: flex-start;
    padding: 4px 10px 20px;
  }
  .nav-link {
    justify-content: flex-start;
    padding: 9px 12px;
  }
  .workspace {
    justify-content: flex-start;
    padding: 6px 10px;
  }
  /* Revert rail-mode flyout submenu back to inline-accordion (desktop) behavior.
     Without this, the absolute-positioned flyout from the 1100px block leaks
     into mobile and the submenu pops out as a floating card next to the drawer. */
  .nav-item-group {
    position: static;
  }
  .nav-submenu {
    position: static;
    left: auto;
    top: auto;
    width: auto;
    margin-left: 20px;
    padding: 0 0 0 14px;
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    max-height: 0;
    transition: max-height 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-submenu::before {
    display: block;
  }
  .nav-item-group.is-open .nav-submenu {
    max-height: 400px;
    padding: 4px 0 6px 14px;
    opacity: 1;
    visibility: visible;
  }
  .nav-submenu a {
    margin: 0;
    padding: 7px 10px;
    font-size: 12.5px;
    border-radius: 6px;
  }
  .nav-submenu a:hover {
    padding-left: 13px;
  }
  body.has-drawer-open .d-sidebar {
    transform: translateX(0);
  }
  body.has-drawer-open {
    overflow: hidden;
  } /* lock scroll behind backdrop */
  .hamburger {
    display: inline-flex;
  }
  /* ---- Topbar: aggressive de-clutter ---- */
  .d-topbar {
    padding: 0 12px;
  }
  .topbar-actions {
    gap: 2px;
  }
  /* Crumbs eat horizontal space — hide everything except the active page */
  .crumbs {
    gap: 6px;
    min-width: 0;
    flex: 1;
    overflow: hidden;
  }
  .crumbs > span:not(.current), .crumbs .sep {
    display: none;
  }
  .crumbs .current {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* Search becomes its own icon-button (text + kbd hidden, padding tightened) */
  .cmd {
    min-width: 0;
    padding: 0;
    width: 36px;
    height: 36px;
    justify-content: center;
  }
  .cmd span, .cmd .kbd {
    display: none;
  }
  .cmd svg {
    width: 16px;
    height: 16px;
  }
  /* Trim avatar margin */
  .avatar {
    margin-left: 2px;
  }
  /* ---- Dropdowns: prevent off-screen overflow ---- */
  .dd-menu {
    min-width: 0;
    width: calc(100vw - 16px);
    max-width: 360px;
    right: -8px; /* pin to viewport edge minus topbar padding (12px) */
  }
  .dd-menu.dd-profile {
    width: calc(100vw - 16px);
    max-width: 280px;
  }
  /* ---- Content / hero / footer ---- */
  .content {
    padding: 20px 16px 16px;
  }
  .d-footer {
    padding: 20px 16px;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  .hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .hero-actions {
    flex-wrap: wrap;
  }
  /* ---- Generic grid ---- */
  .grid {
    gap: 16px;
  }
  /* ---- Dashboard ---- */
  .kpi-grid {
    grid-template-columns: 1fr;
  }
  .sv-regions {
    grid-template-columns: 1fr;
    gap: 22px;
  }
  .monthly-footer {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .wx-forecast {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
  .wx-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .wx-date {
    text-align: left;
  }
  .sales-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  /* Card breathing room */
  .card {
    padding: 18px;
  }
  .card-head {
    flex-wrap: wrap;
    gap: 10px;
  }
  /* ---- Charts page ---- */
  .chart-canvas-wrap {
    min-height: 200px;
  }
  /* ---- Tables: ensure horizontal scroll fallback ---- */
  .data-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .data-toolbar-left, .data-toolbar-right {
    min-width: 0;
    flex-wrap: wrap;
  }
  .data-foot {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  /* ---- Email ---- */
  .mail-shell {
    grid-template-columns: 1fr;
  }
  .mail-rail {
    display: none;
  }
  .mail-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  /* ---- Chat ----
     Drop the fixed-viewport layout on mobile — let the whole page scroll
     instead of a nested overflow-y on .chat-thread (touch scrolling inside
     a clipped flex parent is fiddly on iOS Safari). Restore the rail as a
     capped, stacked section above the thread so users can still see who
     they're chatting with. */
  .chat-shell {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 0;
    overflow: visible;
  }
  .chat-rail {
    display: flex;
    border-right: 0;
    border-bottom: 1px solid var(--border-soft);
    max-height: 260px;
  }
  .chat-pane {
    overflow: visible;
  }
  .chat-pane-head {
    padding: 12px 16px;
  }
  .chat-thread {
    flex: 0 0 auto;
    overflow: visible;
    padding: 16px;
  }
  .chat-composer {
    padding: 12px 16px 16px;
  }
  /* ---- Calendar ---- */
  .cal-shell {
    grid-template-columns: 1fr;
  }
  .cal-toolbar {
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
  }
  .cal-toolbar-left {
    width: 100%;
    justify-content: space-between;
  }
  .cal-views {
    order: 3;
  }
  .cal-grid {
    grid-auto-rows: minmax(78px, 1fr);
  }
  .cal-weekdays > div {
    padding: 8px 6px;
    font-size: 9px;
    letter-spacing: 0.1em;
  }
  .cal-cell {
    padding: 5px;
  }
  .cal-chip-time {
    display: none;
  }
  /* ---- Compose page (inline-styled form rows) ---- */
  .compose-row {
    grid-template-columns: 1fr !important;
    gap: 6px !important;
  }
  .compose-row-actions {
    justify-content: flex-start !important;
  }
  /* ---- Auth pages ---- */
  .auth-main {
    padding: 24px 20px;
  }
}
@media (max-width: 480px) {
  .monthly-footer {
    grid-template-columns: 1fr;
  }
  .wx-forecast {
    grid-template-columns: repeat(2, 1fr);
  }
  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .form-actions .btn {
    width: 100%;
    justify-content: center;
  }
  .form-actions .spacer {
    display: none;
  }
  .social-row {
    grid-template-columns: 1fr;
  }
}`, "",{"version":3,"sources":["webpack://./assets/styles/2026/index.scss","webpack://./assets/styles/2026/_base.scss","webpack://./assets/styles/2026/_tokens.scss","webpack://./assets/styles/2026/_animations.scss","webpack://./assets/styles/2026/_shell.scss","webpack://./assets/styles/2026/_dropdowns.scss","webpack://./assets/styles/2026/_components.scss","webpack://./assets/styles/2026/_forms.scss","webpack://./assets/styles/2026/_ui.scss","webpack://./assets/styles/2026/_auth.scss","webpack://./assets/styles/2026/_error.scss","webpack://./assets/styles/2026/_chat.scss","webpack://./assets/styles/2026/_data.scss","webpack://./assets/styles/2026/_charts.scss","webpack://./assets/styles/2026/_dashboard.scss","webpack://./assets/styles/2026/_email.scss","webpack://./assets/styles/2026/_calendar.scss","webpack://./assets/styles/2026/_fullcalendar.scss","webpack://./assets/styles/2026/_palette.scss","webpack://./assets/styles/2026/_responsive.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAAhB;;iDAAA;ACAA,kDAAA;ACAA,mDAAA;AAEA;EACE,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,qBAAA;EACA,mBAAA;EACA,mBAAA;EAEA,SAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,oBAAA;EAEA,YAAA;EACA,iBAAA;EACA,sBAAA;EAEA,iBAAA;EACA,kBAAA;EACA,wBAAA;EACA,uBAAA;EACA,uBAAA;EACA,uCAAA;EAEA,aAAA;EACA,kBAAA;EACA,uBAAA;EACA,kBAAA;EACA,uBAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,oBAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,oBAAA;EACA,eAAA;EACA,oBAAA;EACA,iBAAA;EACA,sBAAA;EACA,6CAAA;EACA,oFAAA;EACA,uFAAA;EACA,oCAAA;AFEF;;AECA;EACE,kBAAA;EACA,kBAAA;EACA,qBAAA;EACA,mBAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,oBAAA;EACA,iBAAA;EACA,sBAAA;EACA,kBAAA;EACA,wBAAA;EACA,uBAAA;EACA,uBAAA;EACA,wCAAA;EACA,kBAAA;EAA2B,uBAAA;EAC3B,kBAAA;EAA2B,uBAAA;EAC3B,iBAAA;EAA2B,sBAAA;EAC3B,eAAA;EAA2B,oBAAA;EAC3B,iBAAA;EAA2B,sBAAA;EAC3B,eAAA;EAA2B,oBAAA;EAC3B,eAAA;EAA2B,oBAAA;EAC3B,iBAAA;EAA2B,sBAAA;EAC3B,yCAAA;EACA,6EAAA;EACA,+EAAA;EACA,iCAAA;AFUF;;ACpFA;EAAyB,sBAAA;ADwFzB;;ACvFA;EAAa,SAAA;EAAW,UAAA;AD4FxB;;AC3FA;EAAI,cAAA;EAAgB,6BAAA;EAAA,qBAAA;ADgGpB;;AC/FA;EAAS,aAAA;EAAe,cAAA;EAAgB,gBAAA;EAAkB,SAAA;EAAW,eAAA;EAAiB,UAAA;ADwGtF;;ACvGA;EAAS,SAAA;EAAW,UAAA;EAAY,gBAAA;AD6GhC;;AC5GA;EAAW,cAAA;EAAgB,eAAA;ADiH3B;;AChHA;EAAkB,aAAA;EAAe,cAAA;ADqHjC;;ACnHA;EACE,iHAAA;EACA,6CAAA;EACA,gBAAA;EACA,0BAAA;EACA,oBAAA;EACA,eAAA;EACA,iBAAA;EACA,wBAAA;EACA,mCAAA;EACA,kCAAA;EACA,yDAAA;ADsHF;;ACpHA;EAAc,0BAAA;EAA4B,WAAA;ADyH1C;;ACzHA;EAAc,0BAAA;EAA4B,WAAA;ADyH1C;;ACvHA;EAAQ,wEAAA;AD2HR;;ACzHA;EACE,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,qBAAA;EACA,gBAAA;AD4HF;;AG/JA,gDAAA;AAEA;EACE;IAAO,UAAA;IAAY,2BAAA;EHmKnB;EGlKA;IAAO,UAAA;IAAY,wBAAA;EHsKnB;AACF;AGpKA;EACE;IAAO,oBAAA;EHuKP;EGtKA;IAAO,oBAAA;EHyKP;AACF;AGvKA;EAAoB;IAAK,oBAAA;EH2KvB;AACF;AG3KA;EAAqB;IAAK,UAAA;EH+KxB;AACF;AI7LA,oCAAA;AACA;EAAS,aAAA;EAAe,gCAAA;EAAkC,iBAAA;AJkM1D;;AIhMA,sCAAA;AACA;EACE,6BAAA;EACA,qCAAA;EACA,uBAAA;EACA,gBAAA;EAAkB,MAAA;EAClB,aAAA;EACA,aAAA;EAAe,sBAAA;EAAwB,SAAA;EACvC,gBAAA;AJsMF;;AIpMA;EAAgC,UAAA;AJwMhC;;AIvMA;EAAsC,yBAAA;EAA2B,kBAAA;AJ4MjE;;AI1MA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,sBAAA;EACA,2CAAA;AJ+MF;;AI7MA;EACE,WAAA;EAAa,YAAA;EACb,0BAAA;EACA,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,gFAAA;AJkNF;;AIhNA;EAAkB,WAAA;EAAa,YAAA;AJqN/B;;AIpNA;EAAc,gBAAA;AJwNd;;AIvNA;EACE,+CAAA;EACA,gBAAA;EACA,iBAAA;EACA,oBAAA;EACA,uBAAA;AJ0NF;;AIxNA;EACE,wCAAA;EACA,gBAAA;EACA,qBAAA;EACA,qBAAA;AJ2NF;;AIxNA;EAAe,aAAA;EAAe,sBAAA;EAAwB,QAAA;AJ8NtD;;AI7NA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,yBAAA;EACA,qBAAA;EACA,mBAAA;AJgOF;;AI7NA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,eAAA;EACA,gBAAA;EACA,gFAAA;EACA,gBAAA;AJkOF;;AIhOA;EACE,WAAA;EAAa,YAAA;EACb,oBAAA;EAAsB,kBAAA;EAAoB,UAAA;EAC1C,cAAA;EACA,cAAA;EACA,qBAAA;EACA,sBAAA;AJsOF;;AIpOA;EAAmC,YAAA;EAAc,OAAA;AJyOjD;;AIxOA;EAAkB,2BAAA;EAA6B,oBAAA;AJ6O/C;;AI5OA;EACE,qBAAA;EACA,+BAAA;EACA,wCAAA;AJ+OF;;AI5OA;EACE,cAAA;EACA,iBAAA;EACA,gCAAA;EACA,cAAA;EACA,gBAAA;EACA,sBAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;AJ+OF;;AI7OA;EAAiB,0BAAA;EAA4B,WAAA;AJkP7C;;AIjPA;EAAiB,8BAAA;EAAgC,oBAAA;AJsPjD;;AIrPA;EAAiB,+BAAA;EAAiC,qBAAA;AJ0PlD;;AIxPA,uBAAA;AACA;EACE,WAAA;EAAa,YAAA;EAAc,iBAAA;EAC3B,gCAAA;AJ6PF;;AI3PA;EAA0C,wBAAA;AJ+P1C;;AI9PA;EACE,gBAAA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,yDAAA;AJiQF;;AI/PA;EACE,WAAA;EACA,kBAAA;EACA,OAAA;EAAS,QAAA;EAAU,WAAA;EACnB,UAAA;EACA,yBAAA;AJoQF;;AIlQA;EAAuC,iBAAA;EAAmB,gBAAA;EAAkB,mBAAA;AJwQ5E;;AIvQA;EACE,aAAA;EAAe,mBAAA;EACf,iBAAA;EACA,iBAAA;EACA,qBAAA;EACA,kBAAA;EACA,kFAAA;AJ2QF;;AIzQA;EACE,oBAAA;EACA,2BAAA;EACA,kBAAA;AJ4QF;;AI1QA;EACE,qBAAA;EACA,gBAAA;EACA,+BAAA;AJ6QF;;AI1QA;EACE,gBAAA;EACA,iBAAA;EACA,wCAAA;AJ6QF;;AI3QA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,iBAAA;EACA,kBAAA;EACA,uCAAA;AJgRF;;AI9QA;EAAmB,2BAAA;AJkRnB;;AIjRA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,kEAAA;EACA,WAAA;EACA,aAAA;EAAe,mBAAA;EACf,gBAAA;EACA,iBAAA;EACA,cAAA;AJsRF;;AIpRA;EAAkB,gBAAA;EAAkB,YAAA;AJyRpC;;AIxRA;EAAkB,eAAA;EAAiB,oBAAA;EAAsB,gBAAA;AJ8RzD;;AI7RA;EAAkB,eAAA;EAAiB,qBAAA;AJkSnC;;AIjSA;EAAkB,iBAAA;EAAmB,qBAAA;AJsSrC;;AIpSA,mCAAA;AACA;EAAQ,aAAA;EAAe,sBAAA;EAAwB,YAAA;AJ0S/C;;AIxSA,6EAAA;AACA;EACE,aAAA,EAAA,sCAAA;EACA,WAAA;EAAa,YAAA;EACb,mBAAA;EAAqB,uBAAA;EACrB,kBAAA;EACA,oBAAA;EACA,iBAAA;EACA,4BAAA;AJ6SF;;AI3SA;EAAmB,2BAAA;AJ+SnB;;AI9SA;EAAiB,WAAA;EAAa,YAAA;AJmT9B;;AIjTA,qDAAA;AACA;EACE,eAAA;EAAiB,QAAA;EACjB,iCAAA;EACA,kCAAA;UAAA,0BAAA;EACA,WAAA;EACA,UAAA;EACA,kBAAA;EACA,gDAAA;AJqTF;;AInTA;EACE,UAAA;EACA,mBAAA;AJsTF;;AInTA,qCAAA;AACA;EACE,YAAA;EACA,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,eAAA;EACA,sCAAA;EACA,gBAAA;EAAkB,MAAA;EAAQ,WAAA;EAC1B,0CAAA;EACA,kDAAA;EACA,0BAAA;AJ0TF;;AIxTA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,qBAAA;EACA,eAAA;EACA,gBAAA;AJ6TF;;AI3TA;EAAe,qBAAA;AJ+Tf;;AI9TA;EAAmB,oBAAA;EAAsB,gBAAA;AJmUzC;;AIlUA;EAAkB,aAAA;EAAe,mBAAA;EAAqB,QAAA;AJwUtD;;AItUA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,SAAA;EAC3C,0BAAA;EACA,+BAAA;EACA,kBAAA;EACA,0BAAA;EACA,qBAAA;EACA,eAAA;EACA,0BAAA;EACA,gBAAA;AJ2UF;;AIzUA;EAAa,4BAAA;EAA8B,qBAAA;EAAuB,yCAAA;AJ+UlE;;AI9UA;EAAW,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AJsV7E;;AIrVA;EAAY,OAAA;EAAS,gBAAA;AJ0VrB;;AIzVA;EACE,wCAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,2BAAA;EACA,qBAAA;EACA,+BAAA;AJ4VF;;AIzVA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,qBAAA;EACA,yCAAA;EACA,kBAAA;AJ8VF;;AI5VA;EAAkB,2BAAA;EAA6B,oBAAA;AJiW/C;;AIhWA;EAAkB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;AJwWtF;;AIvWA;EACE,kBAAA;EACA,QAAA;EAAU,UAAA;EACV,eAAA;EAAiB,YAAA;EACjB,cAAA;EACA,oBAAA;EACA,gBAAA;EACA,gBAAA;EACA,aAAA;EAAe,mBAAA;EACf,gCAAA;EACA,cAAA;AJ6WF;;AI3WA;EAA0B,yBAAA;EAA2B,WAAA;AJgXrD;;AI/WA;EAAwB,uBAAA;EAAyB,WAAA;AJoXjD;;AIlXA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,kEAAA;EACA,WAAA;EACA,aAAA;EAAe,mBAAA;EACf,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,gCAAA;EACA,4BAAA;EACA,eAAA;AJuXF;;AIpXA,qCAAA;AACA;EACE,uBAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,qBAAA;EACA,eAAA;AJuXF;;AIrXA;EAAc,qBAAA;EAAuB,gBAAA;AJ0XrC;;AIzXA;EAAoB,0BAAA;AJ6XpB;;AI5XA;EAAiB,aAAA;EAAe,SAAA;EAAW,wCAAA;EAA0C,iBAAA;EAAmB,qBAAA;EAAuB,sBAAA;AJqY/H;;AKtqBA,wCAAA;AACA;EAAW,kBAAA;AL0qBX;;AKxqBA;EACE,kBAAA;EACA,sBAAA;EACA,QAAA;EACA,gBAAA;EACA,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,4BAAA;EACA,UAAA;EACA,kBAAA;EACA,2BAAA;EACA,sEAAA;EACA,gBAAA;EACA,YAAA;AL2qBF;;AKzqBA;EACE,UAAA;EACA,mBAAA;EACA,wBAAA;AL4qBF;;AKzqBA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,kBAAA;EACA,2CAAA;EACA,iBAAA;EACA,gBAAA;EACA,oBAAA;EACA,sBAAA;AL8qBF;;AK5qBA;EAAe,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;EAAY,qBAAA;ALqrB/F;;AKnrBA;EAAW,iBAAA;EAAmB,gBAAA;ALwrB9B;;AKvrBA;EAA8B,UAAA;AL2rB9B;;AK1rBA;EAAoC,yBAAA;EAA2B,kBAAA;AL+rB/D;;AK7rBA;EACE,aAAA;EAAe,+BAAA;EACf,SAAA;EAAW,mBAAA;EACX,kBAAA;EACA,2CAAA;EACA,iCAAA;ALksBF;;AKhsBA;EAAsB,gBAAA;ALosBtB;;AKnsBA;EAAiB,2BAAA;ALusBjB;;AKrsBA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,eAAA;EAAiB,gBAAA;EACjB,WAAA;EACA,cAAA;AL2sBF;;AKzsBA;EAAgB,kEAAA;AL6sBhB;;AK5sBA;EAAgB,gEAAA;ALgtBhB;;AK/sBA;EAAgB,kEAAA;ALmtBhB;;AKjtBA;EAAW,YAAA;ALqtBX;;AKptBA;EACE,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;ALutBF;;AKrtBA;EAAkB,oBAAA;EAAsB,gBAAA;AL0tBxC;;AKztBA;EAAc,qBAAA;EAAuB,kBAAA;AL8tBrC;;AK7tBA;EACE,iBAAA;EACA,qBAAA;EACA,iBAAA;EACA,gBAAA;EACA,uBAAA;EACA,oBAAA;EACA,qBAAA;EACA,4BAAA;EACA,eAAA;ALguBF;;AK9tBA;EACE,aAAA;EAAe,8BAAA;EAAgC,qBAAA;EAC/C,QAAA;ALmuBF;;AKjuBA;EAAsB,eAAA;EAAiB,oBAAA;EAAsB,gBAAA;ALuuB7D;;AKtuBA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,cAAA;ALyuBF;;AKtuBA;EACE,cAAA;EACA,kBAAA;EACA,kBAAA;EACA,iBAAA;EACA,qBAAA;EACA,gBAAA;EACA,wCAAA;EACA,yCAAA;ALyuBF;;AKvuBA;EAAmB,0BAAA;EAA4B,2BAAA;AL4uB/C;;AK1uBA,yBAAA;AACA;EAAsB,gBAAA;AL8uBtB;;AK7uBA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,kBAAA;EACA,eAAA;EACA,oBAAA;EACA,yCAAA;ALkvBF;;AKhvBA;EAAsB,2BAAA;ALovBtB;;AKnvBA;EAAoB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,kBAAA;EAAoB,UAAA;EAAY,qBAAA;AL4vBrG;;AK3vBA;EAAuB,oBAAA;AL+vBvB;;AK9vBA;EAA2B,oBAAA;ALkwB3B;;AKjwBA;EAA6B,8BAAA;ALqwB7B;;AKpwBA;EAAc,WAAA;EAAa,8BAAA;EAAgC,aAAA;AL0wB3D;;AKzwBA;EACE,kBAAA;EACA,2CAAA;AL4wBF;;AK1wBA;EAAmB,eAAA;EAAiB,gBAAA;EAAkB,oBAAA;ALgxBtD;;AK/wBA;EAAoB,iBAAA;EAAmB,qBAAA;EAAuB,eAAA;EAAiB,wCAAA;EAA0C,sBAAA;ALuxBzH;;AMt5BA,0DAAA;AACA;EAAW,uBAAA;EAAyB,WAAA;AN25BpC;;AMz5BA,SAAA;AACA;EACE,aAAA;EAAe,8BAAA;EAAgC,qBAAA;EAC/C,SAAA;EAAW,mBAAA;EACX,4DAAA;AN+5BF;;AM75BA;EAAsB,cAAA;EAAgB,mBAAA;ANk6BtC;;AMj6BA;EACE,+CAAA;EACA,gBAAA;EACA,mCAAA;EACA,iBAAA;EACA,wBAAA;EACA,oBAAA;EACA,eAAA;ANo6BF;;AMl6BA;EAAsB,qBAAA;ANs6BtB;;AMr6BA;EAAY,eAAA;EAAiB,qBAAA;EAAuB,eAAA;EAAiB,gBAAA;AN46BrE;;AM36BA;EAAmB,qBAAA;EAAuB,gBAAA;ANg7B1C;;AM/6BA;EAAgB,aAAA;EAAe,QAAA;EAAU,cAAA;ANq7BzC;;AMn7BA,YAAA;AACA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;EAC3C,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,0BAAA;EACA,6BAAA;EACA,mBAAA;ANw7BF;;AMt7BA;EAAW,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AN87B7E;;AM77BA;EAAc,oBAAA;EAAsB,2BAAA;EAA6B,0BAAA;ANm8BjE;;AMl8BA;EAAoB,4BAAA;EAA8B,4BAAA;ANu8BlD;;AMt8BA;EAAgB,0BAAA;EAA4B,WAAA;EAAa,yCAAA;AN48BzD;;AM38BA;EAAsB,+BAAA;AN+8BtB;;AM78BA,SAAA;AACA;EACE,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,aAAA;EACA,8BAAA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;ANg9BF;;AM98BA;EACE,aAAA;EAAe,8BAAA;EAAgC,qBAAA;EAC/C,iBAAA;EACA,mBAAA;EACA,2CAAA;EACA,SAAA;ANm9BF;;AMj9BA;EAA2B,cAAA;EAAgB,mBAAA;ANs9B3C;;AMr9BA;EAAmB,YAAA;ANy9BnB;;AMx9BA;EAA4B,cAAA;EAAgB,kBAAA;AN69B5C;;AM59BA;EACE,+CAAA;EACA,gBAAA;EACA,eAAA;EACA,uBAAA;EACA,oBAAA;EACA,SAAA;AN+9BF;;AM79BA;EACE,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;EAC3C,uBAAA;ANk+BF;;AMh+BA;EAAqB,0BAAA;ANo+BrB;;AMn+BA;EAAmB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;AN2+BvF;;AMz+BA,2BAAA;AACA;EACE,aAAA;EACA,iDAAA;EACA,SAAA;EACA,4DAAA;EACA,sBAAA;AN4+BF;;AM1+BA;EAAY,YAAA;AN8+BZ;;AM7+BA;EAAU,mBAAA;ANi/BV;;AMh/BA;EAAU,oBAAA;ANo/BV;;AMl/BA,2EAAA;AACA;EAAgB,WAAA;EAAa,gBAAA;EAAkB,iCAAA;ANw/B/C;;AMv/BA;EAAmC,WAAA;AN2/BnC;;AM1/BA;EAAyC,yBAAA;EAA2B,kBAAA;AN+/BpE;;AM7/BA,kBAAA;AACA;EAAS,WAAA;EAAa,yBAAA;ANkgCtB;;AMjgCA;EACE,gBAAA;EACA,oBAAA;EACA,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,qBAAA;EACA,gBAAA;EACA,sCAAA;ANogCF;;AMlgCA;EACE,eAAA;EACA,eAAA;EACA,2CAAA;ANqgCF;;AMngCA;EAAgC,gBAAA;ANugChC;;AMtgCA;EAAkB,uCAAA;AN0gClB;;AMzgCA;EAA2B,2BAAA;AN6gC3B;;AM5gCA;EAAoB,oBAAA;EAAsB,gBAAA;ANihC1C;;AMhhCA;EAAoB,qBAAA;EAAuB,eAAA;ANqhC3C;;AMphCA;EAAqB,gBAAA;EAAkB,oBAAA;EAAsB,iBAAA;AN0hC7D;;AMzhCA;EAAyB,qBAAA;AN6hCzB;;AM5hCA;EAAyB,oBAAA;ANgiCzB;;AM9hCA,gBAAA;AACA;EACE,iBAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;EACA,sBAAA;EACA,oBAAA;EAAsB,mBAAA;EACtB,cAAA;ANkiCF;;AMhiCA;EAAmB,8BAAA;EAAiC,oBAAA;ANqiCpD;;AMpiCA;EAAmB,8BAAA;EAAiC,oBAAA;ANyiCpD;;AMxiCA;EAAmB,+BAAA;EAAiC,qBAAA;AN6iCpD;;AM5iCA;EAAmB,8BAAA;EAAiC,oBAAA;ANijCpD;;AMhjCA;EAAmB,+BAAA;EAAiC,qBAAA;ANqjCpD;;AMpjCA;EAAmB,4BAAA;EAAiC,kBAAA;ANyjCpD;;AOpsCA,oCAAA;AAEA;EACE,aAAA;EACA,gDAAA;EACA,cAAA;APssCF;;AOpsCA;EAAqB,mBAAA;APwsCrB;;AOvsCA;EACE;IAAa,0BAAA;EP2sCb;EO1sCA;IAAqB,mBAAA;EP6sCrB;AACF;AO3sCA;EACE,aAAA;EAAe,sBAAA;EAAwB,QAAA;EACvC,YAAA;AP+sCF;;AO7sCA;EACE,eAAA;EACA,gBAAA;EACA,oBAAA;EACA,wBAAA;EACA,aAAA;EAAe,mBAAA;EAAqB,QAAA;APktCtC;;AOhtCA;EAAoB,oBAAA;APotCpB;;AOntCA;EACE,iBAAA;EACA,qBAAA;EACA,iBAAA;APstCF;;AOptCA;EACE,iBAAA;EACA,oBAAA;EACA,aAAA;EAAe,mBAAA;EAAqB,QAAA;APytCtC;;AOttCA;;;EAGE,WAAA;EACA,iBAAA;EACA,+BAAA;EACA,kBAAA;EACA,0BAAA;EACA,oBAAA;EACA,eAAA;EACA,oBAAA;EACA,UAAA;EACA,kEAAA;APytCF;;AOvtCA;EACyB,qBAAA;AP2tCzB;;AO5tCA;;EACyB,qBAAA;AP2tCzB;;AO1tCA;;;EAGE,4BAAA;EACA,yCAAA;AP6tCF;;AO3tCA;;;EAGE,2BAAA;EACA,qBAAA;EACA,mBAAA;AP8tCF;;AO5tCA;;;EAGE,2BAAA;AP+tCF;;AO7tCA;;;EAGE,wCAAA;APguCF;;AO9tCA;EACE,gBAAA;EACA,gBAAA;EACA,gBAAA;APiuCF;;AO9tCA;EACE,qBAAA;OAAA,gBAAA;EAAkB,wBAAA;EAClB,yDAAA;EACA,4BAAA;EACA,sCAAA;EACA,mBAAA;APkuCF;;AO/tCA;EACE,kBAAA;APkuCF;;AOhuCA;EACE,kBAAA;EACA,UAAA;EAAY,QAAA;EAAU,2BAAA;EACtB,WAAA;EAAa,YAAA;EACb,qBAAA;EACA,oBAAA;APsuCF;;AOpuCA;EAAuB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AP4uCzF;;AO3uCA;EAAqB,kBAAA;AP+uCrB;;AO7uCA,iCAAA;AACA;EACE,aAAA;EACA,+BAAA;EACA,kBAAA;EACA,0BAAA;EACA,gBAAA;EACA,gDAAA;APgvCF;;AO9uCA;EACE,4BAAA;EACA,yCAAA;APivCF;;AO/uCA;EACE,eAAA;EACA,aAAA;EAAe,mBAAA;EACf,2BAAA;EACA,qBAAA;EACA,eAAA;EACA,wCAAA;EACA,qCAAA;APmvCF;;AOjvCA;EACE,SAAA;EACA,gBAAA;EACA,uBAAA;APovCF;;AOlvCA;EAA4B,gBAAA;APsvC5B;;AOpvCA,qBAAA;AACA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;EAC3C,eAAA;EACA,eAAA;EACA,oBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;APyvCF;;AOvvCA;EAAe,kBAAA;EAAoB,UAAA;EAAY,oBAAA;AP6vC/C;;AO5vCA;EACE,WAAA;EAAa,YAAA;EACb,kCAAA;EACA,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,cAAA;EACA,qBAAA;EACA,0BAAA;APiwCF;;AO/vCA;EACE,0BAAA;EACA,4BAAA;APkwCF;;AOhwCA;EACE,WAAA;EACA,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,6BAAA;EACA,8CAAA;APowCF;;AOlwCA;EAAoB,kBAAA;APswCpB;;AOrwCA;EACE,UAAA;EAAY,WAAA;EACZ,SAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;APywCF;;AOvwCA;EAAoB,4BAAA;AP2wCpB;;AO1wCA;EAA+B,YAAA;EAAc,mBAAA;AP+wC7C;;AO7wCA,kBAAA;AACA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,SAAA;EAC3C,eAAA;EACA,eAAA;EACA,oBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;APkxCF;;AOhxCA;EAAgB,kBAAA;EAAoB,UAAA;EAAY,oBAAA;APsxChD;;AOrxCA;EACE,WAAA;EAAa,YAAA;EACb,2BAAA;EACA,+BAAA;EACA,oBAAA;EACA,kBAAA;EACA,4BAAA;EACA,cAAA;APyxCF;;AOvxCA;EACE,WAAA;EACA,kBAAA;EACA,QAAA;EAAU,SAAA;EACV,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,gBAAA;EACA,wCAAA;EACA,0DAAA;AP4xCF;;AO1xCA;EACE,0BAAA;EACA,4BAAA;AP6xCF;;AO3xCA;EACE,2BAAA;AP8xCF;;AO3xCA,qBAAA;AACA;EACE,aAAA;EAAe,SAAA;EAAW,mBAAA;EAC1B,iBAAA;EACA,gBAAA;EACA,wCAAA;APgyCF;;AO9xCA;EAAwB,OAAA;APkyCxB;;AQx/CA,0CAAA;AAEA,8DAAA;AACA;EACE,2BAAA;EACA,oBAAA;EACA,2BAAA;AR0/CF;;AQx/CA;EAAwB,2BAAA;EAA6B,4BAAA;AR6/CrD;;AQ3/CA;EAAgB,0BAAA;EAA4B,WAAA;ARggD5C;;AQ//CA;EAAsB,0DAAA;ARmgDtB;;AQlgDA;EAAgB,yBAAA;EAA2B,WAAA;ARugD3C;;AQtgDA;EAAqB,yDAAA;AR0gDrB;;AQzgDA;EAAgB,0BAAA;EAA4B,WAAA;AR8gD5C;;AQ7gDA;EAAsB,0DAAA;ARihDtB;;AQhhDA;EAAgB,uBAAA;EAAyB,WAAA;ARqhDzC;;AQphDA;EAAmB,uDAAA;ARwhDnB;;AQthDA;EAAqB,+BAAA;EAAiC,qBAAA;AR2hDtD;;AQ1hDA;EAA2B,2EAAA;AR8hD3B;;AQ7hDA;EAAqB,+BAAA;EAAiC,qBAAA;ARkiDtD;;AQjiDA;EAAqB,8BAAA;EAAiC,oBAAA;ARsiDtD;;AQriDA;EAAqB,+BAAA;EAAiC,qBAAA;AR0iDtD;;AQziDA;EAAqB,4BAAA;EAAiC,kBAAA;AR8iDtD;;AQ5iDA;EAAwB,uBAAA;EAAyB,qBAAA;EAAuB,4BAAA;ARkjDxE;;AQjjDA;EAA8B,+BAAA;ARqjD9B;;AQpjDA;EAAwB,uBAAA;EAAyB,oBAAA;EAAsB,2BAAA;AR0jDvE;;AQzjDA;EAA6B,8BAAA;AR6jD7B;;AQ5jDA;EAAwB,uBAAA;EAAyB,qBAAA;EAAuB,4BAAA;ARkkDxE;;AQjkDA;EAA8B,+BAAA;ARqkD9B;;AQnkDA;EAAW,kBAAA;EAAoB,eAAA;ARwkD/B;;AQvkDA;EAAW,iBAAA;EAAmB,iBAAA;AR4kD9B;;AQ3kDA;EAAa,YAAA;AR+kDb;;AQ9kDA;EAAiB,SAAA;ARklDjB;;AQhlDA;EACE,oBAAA;EACA,kBAAA;EACA,gBAAA;EACA,mCAAA;ARmlDF;;AQjlDA;EACE,gBAAA;EACA,SAAA;EACA,gBAAA;EACA,qCAAA;ARolDF;;AQllDA;EAA6B,eAAA;ARslD7B;;AQrlDA;EACE,+BAAA;EACA,qBAAA;ARwlDF;;AQrlDA,oBAAA;AACA;EACE,aAAA;EACA,oCAAA;EACA,SAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;EACA,2BAAA;EACA,oBAAA;EACA,qCAAA;ARwlDF;;AQtlDA;EAAkB,gBAAA;AR0lDlB;;AQzlDA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,qBAAA;EACA,cAAA;AR8lDF;;AQ5lDA;EAAkB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;ARomDpF;;AQnmDA;EAAe,YAAA;ARumDf;;AQtmDA;EAAgB,gBAAA;EAAkB,oBAAA;EAAsB,kBAAA;AR4mDxD;;AQ3mDA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,qBAAA;EACA,yCAAA;ARgnDF;;AQ9mDA;EAAsB,2BAAA;EAA6B,oBAAA;ARmnDnD;;AQlnDA;EAAoB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AR0nDtF;;AQxnDA;EAAiB,+BAAA;EAAiC,iCAAA;AR6nDlD;;AQ5nDA;EAAsB,gEAAA;EAAkE,qBAAA;ARioDxF;;AQhoDA;EAAiB,8BAAA;EAAiC,gCAAA;ARqoDlD;;AQpoDA;EAAsB,+DAAA;EAAiE,oBAAA;ARyoDvF;;AQxoDA;EAAiB,+BAAA;EAAiC,iCAAA;AR6oDlD;;AQ5oDA;EAAsB,gEAAA;EAAkE,qBAAA;ARipDxF;;AQhpDA;EAAiB,4BAAA;EAAiC,8BAAA;ARqpDlD;;AQppDA;EAAsB,6DAAA;EAA+D,kBAAA;ARypDrF;;AQxpDA;EAAiB,+BAAA;EAAiC,iCAAA;AR6pDlD;;AQ5pDA;EAAsB,gEAAA;EAAkE,qBAAA;ARiqDxF;;AQ/pDA,oBAAA;AACA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;EAC3C,iBAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;EACA,sBAAA;EACA,gBAAA;EACA,2BAAA;EACA,qBAAA;ARoqDF;;AQlqDA;EAAiB,+BAAA;EAAiC,qBAAA;ARuqDlD;;AQtqDA;EAAiB,+BAAA;EAAiC,qBAAA;AR2qDlD;;AQ1qDA;EAAiB,8BAAA;EAAiC,oBAAA;AR+qDlD;;AQ9qDA;EAAiB,+BAAA;EAAiC,qBAAA;ARmrDlD;;AQlrDA;EAAiB,4BAAA;EAAiC,kBAAA;ARurDlD;;AQtrDA;EAAiB,8BAAA;EAAiC,oBAAA;AR2rDlD;;AQ1rDA;EACE,0BAAA;EAA4B,WAAA;AR8rD9B;;AQ5rDA;EACE,WAAA;EACA,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,wBAAA;ARgsDF;;AQ7rDA,uBAAA;AACA;EACE,WAAA;EACA,WAAA;EACA,2BAAA;EACA,oBAAA;EACA,gBAAA;ARgsDF;;AQ9rDA;EAAiB,WAAA;ARksDjB;;AQjsDA;EAAiB,YAAA;ARqsDjB;;AQpsDA;EACE,YAAA;EACA,0BAAA;EACA,oBAAA;EACA,sBAAA;EACA,2DAAA;ARusDF;;AQrsDA;EAAyB,0BAAA;ARysDzB;;AQxsDA;EAAyB,yBAAA;AR4sDzB;;AQ3sDA;EAAyB,0BAAA;AR+sDzB;;AQ9sDA;EAAyB,uBAAA;ARktDzB;;AQjtDA;EAA0B,iEAAA;ARqtD1B;;AQptDA;EACE,qMAAA;EAIA,0BAAA;ARotDF;;AQjtDA,sBAAA;AACA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,mCAAA;EACA,gCAAA;EACA,qCAAA;EACA,qBAAA;ARqtDF;;AQntDA;EAAc,WAAA;EAAa,YAAA;EAAc,iBAAA;ARytDzC;;AQxtDA;EAAc,WAAA;EAAa,YAAA;EAAc,iBAAA;AR8tDzC;;AQ7tDA;EAAkB;IAAK,yBAAA;ERkuDrB;AACF;AQjuDA,mBAAA;AACA;EACE,aAAA;EACA,QAAA;EACA,sCAAA;EACA,mBAAA;ARmuDF;;AQjuDA;EACE,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,oCAAA;EACA,2CAAA;EACA,kBAAA;EACA,QAAA;EACA,eAAA;ARouDF;;AQluDA;EAAa,oBAAA;ARsuDb;;AQruDA;EACE,qBAAA;EACA,mCAAA;EACA,gBAAA;ARwuDF;;AQtuDA;EAAc,gBAAA;AR0uDd;;AQxuDA;EACE,gBAAA;EACA,2BAAA;EACA,kBAAA;EACA,YAAA;EACA,oBAAA;AR2uDF;;AQzuDA;EACE,kBAAA;EACA,gBAAA;EACA,MAAA;EACA,iBAAA;EACA,iBAAA;AR4uDF;;AQ1uDA;EACE,0BAAA;EACA,oBAAA;EACA,4BAAA;AR6uDF;;AQ1uDA;EAAa,aAAA;AR8uDb;;AQ7uDA;EAAuB,cAAA;EAAgB,kCAAA;ARkvDvC;;AQhvDA,wBAAA;AACA;EAAa,aAAA;EAAe,sBAAA;EAAwB,QAAA;ARsvDpD;;AQrvDA;EACE,+BAAA;EACA,mBAAA;EACA,gBAAA;EACA,0BAAA;ARwvDF;;AQtvDA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,WAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;EACA,oBAAA;EACA,gBAAA;EACA,4BAAA;AR2vDF;;AQzvDA;EAA2B,2BAAA;AR6vD3B;;AQ5vDA;EACE,WAAA;EAAa,YAAA;EACb,gCAAA;EACA,qBAAA;ARgwDF;;AQ9vDA;EAA+B,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;ARswDjG;;AQrwDA;EAAmD,yBAAA;ARywDnD;;AQxwDA;EACE,aAAA;EACA,gBAAA;EACA,yDAAA;EACA,eAAA;EACA,qBAAA;EACA,gBAAA;AR2wDF;;AQzwDA;EAAwB,oBAAA;AR6wDxB;;AQ5wDA;EAA0C,iBAAA;ARgxD1C;;AQ9wDA,kCAAA;AACA;EACE,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,4BAAA;EACA,gBAAA;EACA,gBAAA;ARixDF;;AQ/wDA;EACE,aAAA;EAAe,8BAAA;EAAgC,mBAAA;EAC/C,kBAAA;EACA,2CAAA;ARoxDF;;AQlxDA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,wBAAA;ARqxDF;;AQnxDA;EACE,kBAAA;EACA,iBAAA;EACA,qBAAA;EACA,gBAAA;ARsxDF;;AQpxDA;EACE,aAAA;EAAe,yBAAA;EAA2B,QAAA;EAC1C,kBAAA;EACA,wCAAA;EACA,0BAAA;ARyxDF;;AQtxDA,0DAAA;AACA;EACE,kBAAA;EACA,qBAAA;ARyxDF;;AQvxDA;EACE,kBAAA;EACA,yBAAA;EACA,SAAA;EACA,2BAAA;EACA,yBAAA;EACA,qBAAA;EACA,iBAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,4BAAA;AR0xDF;;AQxxDA;EACE,WAAA;EACA,kBAAA;EACA,SAAA;EAAW,SAAA;EACX,2BAAA;EACA,6BAAA;EACA,+BAAA;AR4xDF;;AQzxDA,2BAAA;AACA;EACE,oBAAA;EACA,mBAAA;AR4xDF;;AQ1xDA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,WAAA;EACA,iBAAA;EACA,gBAAA;EACA,gCAAA;EACA,iBAAA;EACA,cAAA;AR+xDF;;AQ7xDA;EAAgC,cAAA;ARiyDhC;;AQhyDA;EACE,2BAAA;EACA,qBAAA;EACA,iBAAA;ARmyDF;;AQhyDA,qCAAA;AACA;EACE,aAAA;EAAe,qBAAA;EAAuB,SAAA;EACtC,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,wBAAA;EACA,gBAAA;ARqyDF;;AQnyDA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,sBAAA;ARsyDF;;AQnyDA;EACE,aAAA;EAAe,eAAA;EAAiB,SAAA;EAAW,mBAAA;ARyyD7C;;ASppEA,yCAAA;AAEA;EACE,aAAA;EACA,8BAAA;EACA,iBAAA;EACA,0BAAA;ATspEF;;ASnpEA;qDAAA;AAGA;EACE,kBAAA;EACA,kEAAA;EACA,WAAA;EACA,kBAAA;EACA,aAAA;EAAe,sBAAA;EACf,gBAAA;ATspEF;;ASppEA;EACE,WAAA;EACA,kBAAA;EACA,0BAAA;EACA,UAAA;EAAY,eAAA;EACZ,+EAAA;EACA,oBAAA;ATwpEF;;AStpEA;EACE,WAAA;EACA,kBAAA;EACA,0BAAA;EACA,UAAA;EAAY,eAAA;EACZ,8EAAA;EACA,oBAAA;AT0pEF;;ASvpEA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,kBAAA;EAAoB,UAAA;AT6pEtB;;AS3pEA;EACE,WAAA;EAAa,YAAA;EACb,qCAAA;EACA,2CAAA;EACA,kCAAA;UAAA,0BAAA;EACA,kBAAA;EACA,aAAA;EAAe,mBAAA;ATgqEjB;;AS9pEA;EAAwB,WAAA;EAAa,YAAA;ATmqErC;;ASlqEA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,wBAAA;ATqqEF;;ASlqEA;EACE,gBAAA;EACA,kBAAA;EAAoB,UAAA;EACpB,gBAAA;ATsqEF;;ASpqEA;EACE,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,+BAAA;EACA,mBAAA;EACA,cAAA;ATuqEF;;ASrqEA;EACE,sCAAA;EACA,gBAAA;EACA,iCAAA;EACA,wBAAA;EACA,iBAAA;EACA,gBAAA;ATwqEF;;AStqEA;EACE,iBAAA;EACA,gCAAA;EACA,gBAAA;EACA,gBAAA;ATyqEF;;AStqEA;EACE,gBAAA;EACA,kBAAA;EACA,2CAAA;EACA,qCAAA;EACA,kCAAA;UAAA,0BAAA;EACA,mBAAA;EACA,eAAA;EACA,+BAAA;EACA,gBAAA;ATyqEF;;ASvqEA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,gBAAA;EACA,eAAA;EACA,gCAAA;AT4qEF;;AS1qEA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,qCAAA;EACA,aAAA;EAAe,mBAAA;EACf,eAAA;EAAiB,gBAAA;ATgrEnB;;AS7qEA;EACE,gBAAA;EACA,iBAAA;EACA,kBAAA;EAAoB,UAAA;EACpB,aAAA;EAAe,SAAA;EACf,wCAAA;EACA,eAAA;EACA,gCAAA;EACA,sBAAA;ATkrEF;;AS/qEA;EACE,aAAA;EAAe,sBAAA;EACf,kBAAA;EACA,iBAAA;ATmrEF;;AShrEA;EACE,aAAA;EAAe,8BAAA;EAAgC,mBAAA;ATqrEjD;;ASnrEA;EACE,iBAAA;EACA,qBAAA;ATsrEF;;ASprEA;EACE,qBAAA;EACA,gBAAA;EACA,gBAAA;ATurEF;;ASprEA;EACE,WAAA;EACA,gBAAA;EACA,YAAA;EACA,cAAA;ATurEF;;ASrrEA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,wBAAA;EACA,oBAAA;EACA,eAAA;ATwrEF;;AStrEA;EACE,iBAAA;EACA,qBAAA;EACA,gBAAA;EACA,iBAAA;ATyrEF;;AStrEA;EAAa,aAAA;EAAe,sBAAA;EAAwB,SAAA;AT4rEpD;;AS3rEA;EACE,aAAA;EAAe,8BAAA;EAAgC,mBAAA;ATgsEjD;;AS9rEA;EACE,qBAAA;EACA,eAAA;EACA,gBAAA;ATisEF;;AS/rEA;EAAe,eAAA;ATmsEf;;ASlsEA;EAAmB,kBAAA;ATssEnB;;ASpsEA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,yBAAA;EACA,cAAA;ATysEF;;ASvsEA;;EAEE,WAAA;EACA,OAAA;EACA,WAAA;EACA,yBAAA;AT0sEF;;ASvsEA;EACE,aAAA;EAAe,qCAAA;EAAuC,SAAA;AT4sExD;;AS1sEA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,uBAAA;EAAyB,QAAA;EACpE,iBAAA;EACA,+BAAA;EACA,kBAAA;EACA,0BAAA;EACA,oBAAA;EACA,iBAAA;EACA,gBAAA;EACA,kEAAA;ATgtEF;;AS9sEA;EAAoB,4BAAA;EAA8B,4BAAA;ATmtElD;;ASltEA;EAAkB,WAAA;EAAa,YAAA;ATutE/B;;ASrtEA;EACE,gBAAA;EACA,iBAAA;EACA,qBAAA;EACA,kBAAA;ATwtEF;;ASttEA;EAAsB,qBAAA;AT0tEtB;;AUh7EA,sDAAA;AAEA;EACE,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,0BAAA;EACA,kBAAA;EACA,gBAAA;AVk7EF;;AUh7EA;EACE,WAAA;EACA,kBAAA;EACA,0BAAA;EACA,aAAA;EAAe,eAAA;EACf,0GAAA;EACA,oBAAA;AVo7EF;;AUl7EA;EACE,WAAA;EACA,kBAAA;EACA,0BAAA;EACA,aAAA;EAAe,eAAA;EACf,wGAAA;EACA,oBAAA;AVs7EF;;AUn7EA;EACE,kBAAA;EACA,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,4BAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;EACA,kBAAA;EACA,4DAAA;AVs7EF;;AUp7EA;EACE;IAAc,kBAAA;EVw7Ed;AACF;AUt7EA;EACE,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,qBAAA;EACA,mBAAA;EACA,cAAA;AVw7EF;;AUt7EA;EACE,sCAAA;EACA,gBAAA;EACA,mCAAA;EACA,iBAAA;EACA,uBAAA;EACA,kEAAA;EACA,6BAAA;EACA,qBAAA;EACA,kBAAA;EACA,kBAAA;AVy7EF;;AUv7EA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,wBAAA;EACA,oBAAA;EACA,gBAAA;AV07EF;;AUx7EA;EACE,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;AV27EF;;AUx7EA;EACE,aAAA;EAAe,SAAA;EAAW,uBAAA;EAAyB,eAAA;AV87ErD;;AU37EA;EACE,gBAAA;EACA,iBAAA;EACA,oCAAA;EACA,wCAAA;EACA,iBAAA;EACA,qBAAA;EACA,sBAAA;EACA,aAAA;EAAe,SAAA;EAAW,uBAAA;EAAyB,eAAA;AVi8ErD;;AU/7EA;EAAqB,qBAAA;EAAuB,gBAAA;AVo8E5C;;AWriFA,wCAAA;AAEA;EACE,aAAA;EACA,2CAAA;EACA,SAAA;EACA,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,8BAAA;EACA,gBAAA;EACA,2BAAA;EACA,iBAAA;EACA,4DAAA;AXuiFF;;AWpiFA;;;iBAAA;AAKA,iCAAA;AACA;EACE,aAAA;EAAe,sBAAA;EACf,0CAAA;EACA,0BAAA;EACA,YAAA;EACA,aAAA,EAAA,2DAAA;EACA,gBAAA,EAAA,0HAAA;AXuiFF;;AWriFA;EACE,kBAAA;EACA,2CAAA;EACA,aAAA;EAAe,sBAAA;EAAwB,SAAA;AX0iFzC;;AWxiFA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;AX6iFtC;;AW3iFA;EACE,sCAAA;EACA,gBAAA;EACA,iBAAA;EACA,oBAAA;EACA,wBAAA;AX8iFF;;AW5iFA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,gBAAA;EACA,sBAAA;AX+iFF;;AW5iFA;EACE,kBAAA;AX+iFF;;AW7iFA;EACE,WAAA;EACA,0BAAA;EACA,+BAAA;EACA,kBAAA;EACA,2BAAA;EACA,iBAAA;EACA,oBAAA;EACA,UAAA;EACA,kEAAA;AXgjFF;;AW9iFA;EAAkC,qBAAA;AXkjFlC;;AWljFA;EAAkC,qBAAA;AXkjFlC;;AWjjFA;EACE,4BAAA;EACA,0BAAA;EACA,yCAAA;AXojFF;;AWljFA;EACE,kBAAA;EACA,UAAA;EAAY,QAAA;EAAU,2BAAA;EACtB,WAAA;EAAa,YAAA;EACb,sBAAA;EAAwB,eAAA;EAAiB,UAAA;EACzC,oBAAA;AX0jFF;;AWvjFA;EAAoB,OAAA;EAAS,gBAAA;EAAkB,cAAA;AX6jF/C;;AW5jFA;EAAuC,UAAA;AXgkFvC;;AW/jFA;EAA6C,yBAAA;EAA2B,kBAAA;AXokFxE;;AWlkFA;EACE,aAAA;EACA,+BAAA;EACA,SAAA;EACA,kBAAA;EACA,2CAAA;EACA,eAAA;EACA,iCAAA;EACA,kBAAA;AXqkFF;;AWnkFA;EAAmB,2BAAA;AXukFnB;;AWtkFA;EACE,+BAAA;EACA,wCAAA;AXykFF;;AWvkFA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,WAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,kBAAA;AX4kFF;;AW1kFA;EACE,kBAAA;EACA,SAAA;EAAW,QAAA;EACX,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,0BAAA;EACA,gCAAA;AX+kFF;;AW7kFA;EAAmC,0BAAA;AXilFnC;;AWhlFA;EAAmC,0BAAA;AXolFnC;;AWllFA;EAAkB,YAAA;EAAc,aAAA;EAAe,sBAAA;EAAwB,QAAA;AXylFvE;;AWxlFA;EACE,aAAA;EAAe,qBAAA;EAAuB,8BAAA;EACtC,QAAA;AX6lFF;;AW3lFA;EACE,eAAA;EACA,oBAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AX8lFF;;AW5lFA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,cAAA;AX+lFF;;AW7lFA;EACE,eAAA;EACA,qBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AXgmFF;;AW9lFA;EAA0C,oBAAA;EAAsB,gBAAA;AXmmFhE;;AWlmFA;EAAuC,qBAAA;AXsmFvC;;AWrmFA;EACE,kBAAA;EACA,WAAA;EAAa,SAAA;EACb,eAAA;EAAiB,YAAA;EACjB,cAAA;EACA,oBAAA;EACA,0BAAA;EACA,WAAA;EACA,eAAA;EACA,gBAAA;EACA,aAAA;EAAe,mBAAA;AX2mFjB;;AWxmFA,gCAAA;AACA;EACE,aAAA;EAAe,sBAAA;EACf,0BAAA;EACA,YAAA;EACA,gBAAA;AX4mFF;;AW1mFA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,kBAAA;EACA,2CAAA;AX+mFF;;AW7mFA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,WAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;AXknFF;;AWhnFA;EACE,kBAAA;EACA,SAAA;EAAW,QAAA;EACX,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,0BAAA;EACA,gCAAA;AXqnFF;;AWnnFA;EAAwB,gBAAA;EAAkB,YAAA;EAAc,OAAA;AXynFxD;;AWxnFA;EAAwB,eAAA;EAAiB,gBAAA;EAAkB,oBAAA;AX8nF3D;;AW7nFA;EACE,iBAAA;EAAmB,qBAAA;EACnB,aAAA;EAAe,mBAAA;EAAqB,QAAA;AXmoFtC;;AWjoFA;EACE,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,0BAAA;AXqoFF;;AWnoFA;EAAwB,aAAA;EAAe,QAAA;AXwoFvC;;AWtoFA;EACE,OAAA;EACA,gBAAA;EACA,kBAAA;EACA,2BAAA;EACA,aAAA;EAAe,sBAAA;EAAwB,SAAA;AX2oFzC;;AWzoFA;EAAkC,UAAA;AX6oFlC;;AW5oFA;EAAwC,yBAAA;EAA2B,kBAAA;AXipFnE;;AW/oFA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,aAAA;EACA,qBAAA;EACA,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;AXopFF;;AWlpFA;;EAEE,WAAA;EACA,OAAA;EACA,WAAA;EACA,yBAAA;AXqpFF;;AWlpFA;EAAY,aAAA;EAAe,SAAA;EAAW,0BAAA;AXwpFtC;;AWvpFA;EAAe,iBAAA;EAAmB,2BAAA;AX4pFlC;;AW3pFA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,WAAA;EACA,gBAAA;EACA,iBAAA;EACA,cAAA;EACA,oBAAA;AXgqFF;;AW9pFA;EAAkB,kEAAA;AXkqFlB;;AWjqFA;EAAkB,aAAA;EAAe,sBAAA;EAAwB,QAAA;EAAU,YAAA;AXwqFnE;;AWvqFA;EAA+B,qBAAA;AX2qF/B;;AW1qFA;EACE,kBAAA;EACA,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,2BAAA;EACA,iBAAA;EACA,oBAAA;EACA,gBAAA;EACA,4BAAA;EACA,qBAAA;AX6qFF;;AW3qFA;EACE,0BAAA;EAA4B,WAAA;EAAa,4BAAA;EACzC,4BAAA;EACA,4BAAA;AXgrFF;;AW9qFA;EACE,aAAA;EAAe,QAAA;EAAU,mBAAA;EACzB,wCAAA;EACA,gBAAA;EACA,qBAAA;EACA,sBAAA;EACA,cAAA;AXmrFF;;AWjrFA;EAAuB,qBAAA;AXqrFvB;;AWnrFA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,iBAAA;EACA,qBAAA;EACA,eAAA;AXwrFF;;AWtrFA;EACE,oBAAA;EAAsB,QAAA;AX0rFxB;;AWxrFA;EACE,UAAA;EAAY,WAAA;EACZ,0BAAA;EACA,kBAAA;EACA,2CAAA;AX4rFF;;AW1rFA;EAAsC,sBAAA;AX8rFtC;;AW7rFA;EAAsC,qBAAA;AXisFtC;;AWhsFA;EACE;IAAgB,YAAA;IAAc,wBAAA;EXqsF9B;EWpsFA;IAAM,UAAA;IAAY,2BAAA;EXwsFlB;AACF;AWtsFA;EACE,uBAAA;EACA,wCAAA;EACA,0BAAA;AXwsFF;;AWtsFA;EACE,aAAA;EAAe,gBAAA;EAAkB,QAAA;EACjC,+BAAA;EACA,mBAAA;EACA,2BAAA;EACA,iBAAA;EACA,gDAAA;AX2sFF;;AWzsFA;EACE,4BAAA;EACA,0BAAA;EACA,yCAAA;AX4sFF;;AW1sFA;EACE,OAAA;EACA,uBAAA;EACA,SAAA;EAAW,UAAA;EACX,YAAA;EACA,gBAAA;EACA,iBAAA;EACA,iBAAA;EACA,oBAAA;EACA,gBAAA;EACA,oBAAA;EACA,gBAAA;AX8sFF;;AW5sFA;EAA6C,qBAAA;AXgtF7C;;AWhtFA;EAA6C,qBAAA;AXgtF7C;;AW/sFA;EACE,aAAA;EAAe,QAAA;EAAU,mBAAA;EACzB,cAAA;AXotFF;;AWltFA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,qBAAA;EACA,yCAAA;AXutFF;;AWrtFA;EAAmC,2BAAA;EAA6B,oBAAA;AX0tFhE;;AWztFA;EAAiC,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;AXiuFrG;;AWhuFA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,0BAAA;EAA4B,WAAA;EAC5B,aAAA;EAAe,mBAAA;EACf,4BAAA;EACA,cAAA;AXsuFF;;AWpuFA;EAA4B,+BAAA;AXwuF5B;;AWvuFA;EAA0B,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AX+uF5F;;AY9kGA,sDAAA;AAEA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,SAAA;EACA,mBAAA;EACA,eAAA;AZklGF;;AYhlGA;EAAqB,aAAA;EAAe,mBAAA;EAAqB,QAAA;EAAU,OAAA;EAAS,gBAAA;AZwlG5E;;AYvlGA;EAAsB,aAAA;EAAe,mBAAA;EAAqB,QAAA;AZ6lG1D;;AY5lGA;EAA4B,OAAA;EAAS,gBAAA;AZimGrC;;AY/lGA;EACE,WAAA;EACA,yBAAA;EACA,iBAAA;AZkmGF;;AYhmGA;EACE,gBAAA;EAAkB,MAAA;EAClB,0BAAA;EACA,gBAAA;EACA,kBAAA;EACA,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,qBAAA;EACA,gBAAA;EACA,sCAAA;EACA,mBAAA;AZomGF;;AYlmGA;EACE,oBAAA;EAAsB,sBAAA;EACtB,gBAAA;EACA,qBAAA;AZsmGF;;AYpmGA;;EAEE,qBAAA;AZumGF;;AYrmGA;EAA4C,yBAAA;AZymG5C;;AYxmGA;EAAiC,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;EAAY,2BAAA;AZinG/G;;AY/mGA;EACE,kBAAA;EACA,eAAA;EACA,oBAAA;EACA,2CAAA;EACA,mBAAA;AZknGF;;AYhnGA;EAAuB,4BAAA;AZonGvB;;AYnnGA;EAAgC,2BAAA;AZunGhC;;AYtnGA;EAAsC,+BAAA;AZ0nGtC;;AYxnGA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,YAAA;AZ6nGF;;AY3nGA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,WAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;AZgoGF;;AY9nGA;EAAuB,gBAAA;EAAkB,YAAA;AZmoGzC;;AYloGA;EAAuB,eAAA;EAAiB,gBAAA;EAAkB,oBAAA;AZwoG1D;;AYvoGA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;AZ0oGF;;AYvoGA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;AZ0oGF;;AYvoGA;EACE,aAAA;EAAe,QAAA;AZ2oGjB;;AYzoGA;EACE,YAAA;EACA,uBAAA;EACA,SAAA;EACA,qBAAA;EACA,kBAAA;EACA,yCAAA;AZ4oGF;;AY1oGA;EAAsC,2BAAA;EAA6B,oBAAA;AZ+oGnE;;AY9oGA;EAAoC,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;AZspGxG;;AYppGA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,iBAAA;EACA,eAAA;EACA,wCAAA;EACA,eAAA;EACA,qBAAA;AZypGF;;AYvpGA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;AZ4pGtC;;AY1pGA;EAA0B,WAAA;EAAa,0BAAA;EAA4B,eAAA;AZgqGnE;;AY9pGA;EACE,aAAA;EAAe,QAAA;EAAU,mBAAA;AZmqG3B;;AYjqGA;EACE,eAAA;EAAiB,YAAA;EACjB,cAAA;EACA,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,yCAAA;AZsqGF;;AYpqGA;EAAkC,2BAAA;EAA6B,oBAAA;AZyqG/D;;AYxqGA;EACE,0BAAA;EACA,WAAA;AZ2qGF;;AYzqGA;EAAsB,YAAA;EAAc,mBAAA;AZ8qGpC;;AY7qGA;EAAiB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AZqrGnF;;AatzGA,0CAAA;AAEA;EAAa,kBAAA;EAAoB,kBAAA;Ab0zGjC;;AazzGA;EACE,kBAAA;EACA,WAAA;EACA,iBAAA;Ab4zGF;;AazzGA;EACE,aAAA;EAAe,eAAA;EAAiB,SAAA;EAChC,gBAAA;EACA,iBAAA;EACA,wCAAA;Ab8zGF;;Aa5zGA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;EAC3C,eAAA;EACA,qBAAA;Abi0GF;;Aa/zGA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,cAAA;Abm0GF;;Aah0GA;EACE,aAAA;EAAe,SAAA;EACf,iBAAA;EACA,yCAAA;EACA,gBAAA;EACA,eAAA;Abo0GF;;Aal0GA;EAAmB,aAAA;EAAe,sBAAA;EAAwB,QAAA;EAAU,eAAA;Aby0GpE;;Aax0GA;EAAoB,iBAAA;EAAmB,qBAAA;EAAuB,yBAAA;EAA2B,qBAAA;EAAuB,wCAAA;Abg1GhH;;Aa/0GA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,uBAAA;EACA,oBAAA;Abk1GF;;Aah1GA;EAAuB,qBAAA;Abo1GvB;;Aan1GA;EAAyB,oBAAA;Abu1GzB;;Acl4GA,iDAAA;AAEA,aAAA;AACA;EACE,aAAA;EAAe,gDAAA;EACf,SAAA;EACA,mBAAA;Adq4GF;;Acn4GA;EACE,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,uBAAA;EACA,8BAAA;EACA,4DAAA;EACA,kBAAA;EACA,gBAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,SAAA;EACA,0GAAA;Ads4GF;;Acl4GA;EACE,WAAA;EACA,kBAAA;EACA,oBAAA;EACA,YAAA;EAAc,aAAA;EACd,+EAAA;EACA,aAAA;EACA,oBAAA;EACA,8BAAA;Ads4GF;;Acp4GA;EACE,2BAAA;EACA,4BAAA;Adu4GF;;Acr4GA;EAA0B,aAAA;Ady4G1B;;Acx4GA;EAAsB,qBAAA;Ad44GtB;;Ac34GA;EAAsB,oBAAA;Ad+4GtB;;Ac94GA;EAAsB,oBAAA;Adk5GtB;;Acj5GA;EAAsB,qBAAA;Adq5GtB;;Acn5GA;EAAyB,qBAAA;Adu5GzB;;Act5GA;EAAyB,sBAAA;Ad05GzB;;Acz5GA;EAAyB,sBAAA;Ad65GzB;;Ac55GA;EAAyB,sBAAA;Adg6GzB;;Ac95GA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,SAAA;EACA,kBAAA;Adm6GF;;Acj6GA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,YAAA;Ads6GF;;Acn6GA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,cAAA;Adw6GF;;Act6GA;EAAgB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;Ad86GpF;;Ac76GA;EAAoB,+BAAA;EAAiC,qBAAA;Adk7GrD;;Acj7GA;EAAoB,+BAAA;EAAiC,qBAAA;Ads7GrD;;Acr7GA;EAAoB,4BAAA;EAAiC,kBAAA;Ad07GrD;;Acz7GA;EAAoB,8BAAA;EAAiC,oBAAA;Ad87GrD;;Ac77GA;EAAoB,8BAAA;EAAiC,oBAAA;Adk8GrD;;Acj8GA;EAAoB,+BAAA;EAAiC,qBAAA;Ads8GrD;;Acp8GA;EACE,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,gBAAA;EACA,uBAAA;EACA,mBAAA;Adu8GF;;Acp8GA;EACE,+CAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,wBAAA;EACA,oBAAA;EACA,kBAAA;Adu8GF;;Acr8GA;EACE,eAAA;EACA,qBAAA;EACA,mBAAA;EACA,gBAAA;EACA,gBAAA;EACA,gBAAA;Adw8GF;;Acr8GA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,iBAAA;EACA,yCAAA;EACA,gBAAA;Ad08GF;;Acx8GA;EACE,oBAAA;EACA,gBAAA;EACA,wCAAA;EACA,iBAAA;EACA,uBAAA;Ad28GF;;Acz8GA;EACE,WAAA;EAAa,YAAA;EACb,oBAAA;EACA,iBAAA;EACA,UAAA;EACA,cAAA;Ad68GF;;Ac38GA;EAAqB,qBAAA;Ad+8GrB;;Ac98GA;EAAqB,oBAAA;Adk9GrB;;Acj9GA;EAAqB,oBAAA;Adq9GrB;;Acp9GA;EAAqB,kBAAA;Adw9GrB;;Acv9GA;EAAoB,qBAAA;EAAuB,aAAA;EAAe,gBAAA;Ad69G1D;;Ac39GA;EACE,wCAAA;EACA,iBAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;EACA,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;EAC3C,sBAAA;EACA,cAAA;Adg+GF;;Ac99GA;EAAiB,+BAAA;EAAiC,qBAAA;Adm+GlD;;Acl+GA;EAAiB,8BAAA;EAAiC,oBAAA;Adu+GlD;;Act+GA;EAAiB,8BAAA;EAAiC,oBAAA;Ad2+GlD;;Ac1+GA;EAAiB,4BAAA;EAAiC,kBAAA;Ad++GlD;;Ac9+GA;EAAgB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;Ads/GpF;;Acp/GA,mCAAA;AACA;EACE,aAAA;EACA,gDAAA;EACA,SAAA;Adu/GF;;Acr/GA;EAAa,aAAA;EAAe,sBAAA;EAAwB,SAAA;EAAW,YAAA;Ad4/G/D;;Ac3/GA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,eAAA;EACA,qBAAA;EACA,gBAAA;AdggHF;;Ac9/GA;EAA0B,UAAA;EAAY,WAAA;EAAa,kBAAA;EAAoB,cAAA;AdqgHvE;;AcpgHA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,uBAAA;EACA,iBAAA;EACA,aAAA;EAAe,qBAAA;EAAuB,QAAA;AdygHxC;;AcvgHA;EACE,wCAAA;EACA,iBAAA;EACA,qBAAA;EACA,gBAAA;EACA,sBAAA;Ad0gHF;;AcxgHA;EACE,WAAA;EACA,2BAAA;EACA,mBAAA;EACA,gBAAA;EACA,eAAA;Ad2gHF;;AczgHA;EACE,YAAA;EACA,mBAAA;EACA,sBAAA;EACA,iEAAA;Ad4gHF;;AczgHA;EACE,WAAA;EACA,8BAAA;EACA,cAAA;Ad4gHF;;AczgHA;EACE,aAAA;EACA,gDAAA;EACA,SAAA;Ad4gHF;;Ac1gHA;EACE,aAAA;EACA,+BAAA;EACA,SAAA;EACA,mBAAA;Ad6gHF;;Ac3gHA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,cAAA;Ad+gHF;;Ac7gHA;EAAuB,WAAA;EAAa,YAAA;EAAc,yBAAA;AdmhHlD;;AclhHA;EAAgB,uBAAA;EAAyB,eAAA;EAAiB,UAAA;AdwhH1D;;AcvhHA;EAAgB,eAAA;EAAiB,UAAA;EAAY,qBAAA;Ad6hH7C;;Ac5hHA;EAAuB,qBAAA;AdgiHvB;;Ac/hHA;EAAuB,mBAAA;AdmiHvB;;AcliHA;EAAuB,sBAAA;AdsiHvB;;AcriHA;EACE,kBAAA;EACA,SAAA;EAAW,QAAA;EACX,gCAAA;EACA,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,wBAAA;AdyiHF;;AcviHA;EAAkB,aAAA;EAAe,sBAAA;EAAwB,QAAA;EAAU,YAAA;Ad8iHnE;;Ac7iHA;EACE,iBAAA;EACA,gBAAA;EACA,oBAAA;EACA,wBAAA;AdgjHF;;Ac9iHA;EACE,iBAAA;EACA,qBAAA;AdijHF;;Ac9iHA,kBAAA;AACA;EAAa,WAAA;EAAa,YAAA;EAAc,cAAA;AdojHxC;;AcnjHA;EAAwB,0BAAA;EAA4B,eAAA;EAAiB,qBAAA;AdyjHrE;;AcxjHA;EAAyB,wCAAA;EAA0C,gBAAA;EAAkB,oBAAA;EAAsB,sBAAA;Ad+jH3G;;Ac9jHA;EAAmB,uBAAA;AdkkHnB;;AcjkHA;EACE,UAAA;EAAY,sBAAA;EAAwB,iBAAA;EACpC,qBAAA;EAAuB,sBAAA;EACvB,sBAAA;EACA,uBAAA;EACA,sEAAA;AdukHF;;AcrkHA;EAAuB,oBAAA;EAAsB,sBAAA;EAAwB,eAAA;EAAiB,UAAA;EAAY,6CAAA;Ad6kHlG;;Ac3kHA;EACE,aAAA;EAAe,qCAAA;EACf,SAAA;EACA,iBAAA;EACA,wCAAA;EACA,gBAAA;Ad+kHF;;Ac7kHA;EACE,aAAA;EAAe,sBAAA;EAAwB,QAAA;AdklHzC;;AchlHA;EAAmB,eAAA;EAAiB,qBAAA;EAAuB,gBAAA;AdslH3D;;AcrlHA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,wBAAA;EACA,oBAAA;EACA,aAAA;EAAe,mBAAA;EAAqB,QAAA;Ad0lHtC;;AcxlHA;EAA6B,WAAA;EAAa,YAAA;EAAc,qBAAA;EAAuB,cAAA;Ad+lH/E;;Ac7lHA,cAAA;AACA;EAAa,aAAA;EAAe,sBAAA;AdkmH5B;;AcjmHA;EACE,aAAA;EAAe,oCAAA;EAAsC,SAAA;EACrD,mBAAA;EACA,eAAA;EACA,2CAAA;AdsmHF;;AcpmHA;EAAwB,gBAAA;AdwmHxB;;AcvmHA;EACE,qBAAA;OAAA,gBAAA;EAAkB,wBAAA;EAClB,WAAA;EAAa,YAAA;EACb,kCAAA;EACA,kBAAA;EACA,eAAA;EACA,kBAAA;EACA,0BAAA;EACA,uBAAA;Ad4mHF;;Ac1mHA;EAAoB,4BAAA;Ad8mHpB;;Ac7mHA;EACE,0BAAA;EACA,4BAAA;AdgnHF;;Ac9mHA;EACE,WAAA;EACA,kBAAA;EACA,SAAA;EAAW,QAAA;EACX,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,6BAAA;EACA,wBAAA;AdmnHF;;AcjnHA;EAAgC,qBAAA;EAAuB,qCAAA;EAAA,6BAAA;EAA+B,gCAAA;AdunHtF;;ActnHA;EAAa,iBAAA;EAAmB,oBAAA;EAAsB,eAAA;Ad4nHtD;;Ac3nHA;EACE,iBAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;EACA,sBAAA;EACA,cAAA;Ad8nHF;;Ac5nHA;EAAuB,2BAAA;EAA6B,qBAAA;AdioHpD;;AchoHA;EAAuB,4BAAA;EAA8B,kBAAA;AdqoHrD;;AcpoHA;EAAuB,8BAAA;EAAgC,oBAAA;AdyoHvD;;AcxoHA;EAAuB,+BAAA;EAAiC,qBAAA;Ad6oHxD;;Ac5oHA;EAAuB,+BAAA;EAAiC,qBAAA;AdipHxD;;Ac/oHA,iBAAA;AACA;EACE,aAAA;EAAe,8BAAA;EAAgC,qBAAA;EAC/C,iBAAA;EACA,kBAAA;AdopHF;;AclpHA;EAAgC,cAAA;EAAgB,kBAAA;AdupHhD;;ActpHA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,SAAA;AdypHF;;AcvpHA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,uBAAA;EACA,oBAAA;EACA,cAAA;Ad0pHF;;AcxpHA;EAA2B,eAAA;EAAiB,qBAAA;EAAuB,mBAAA;EAAqB,gBAAA;EAAkB,iBAAA;EAAmB,cAAA;AdiqH7H;;Ac/pHA;EACE,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,wCAAA;AdkqHF;;AchqHA;EACE,iBAAA;EACA,qBAAA;EACA,gBAAA;EACA,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;EAC3C,uBAAA;AdqqHF;;AcnqHA;EAAqB,0BAAA;AduqHrB;;ActqHA;EAAiB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;Ad8qHrF;;Ac5qHA,YAAA;AACA;EACE,aAAA;EAAe,8BAAA;EAAgC,uBAAA;EAAyB,SAAA;EACxE,cAAA;AdkrHF;;AchrHA;EAAiB,aAAA;EAAe,mBAAA;EAAqB,SAAA;AdsrHrD;;AcrrHA;EACE,WAAA;EAAa,YAAA;EACb,mBAAA;EACA,0EAAA;EACA,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,cAAA;Ad0rHF;;AcxrHA;EAAe,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;AdgsHnF;;Ac/rHA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,wBAAA;EACA,oBAAA;AdksHF;;AchsHA;EAAe,eAAA;EAAiB,qBAAA;EAAuB,mBAAA;EAAqB,gBAAA;EAAkB,gBAAA;AdwsH9F;;AcvsHA;EAAgB,eAAA;EAAiB,qBAAA;EAAuB,eAAA;Ad6sHxD;;Ac5sHA;EAAuB,oBAAA;EAAsB,gBAAA;AditH7C;;AchtHA;EAAW,iBAAA;AdotHX;;AcntHA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,eAAA;EACA,uBAAA;AdstHF;;AcptHA;EACE,wCAAA;EACA,iBAAA;EACA,qBAAA;EACA,sBAAA;EACA,SAAA;AdutHF;;AcptHA;EACE,aAAA;EAAe,qCAAA;EACf,SAAA;EACA,eAAA;EACA,mCAAA;EACA,sCAAA;EACA,mBAAA;AdwtHF;;ActtHA;EAAkB,aAAA;EAAe,sBAAA;EAAwB,QAAA;Ad4tHzD;;Ac3tHA;EAAiB,eAAA;EAAiB,qBAAA;EAAuB,gBAAA;AdiuHzD;;AchuHA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,wBAAA;AdmuHF;;AcjuHA;EAAuB,eAAA;EAAiB,qBAAA;EAAuB,gBAAA;EAAkB,gBAAA;EAAkB,iBAAA;AdyuHnG;;AcvuHA;EAAe,aAAA;EAAe,qCAAA;EAAuC,QAAA;EAAU,kBAAA;Ad8uH/E;;Ac7uHA;EACE,iBAAA;EACA,mBAAA;EACA,eAAA;EACA,iCAAA;AdgvHF;;Ac9uHA;EAAgB,2BAAA;AdkvHhB;;AcjvHA;EACE,0BAAA;EACA,WAAA;AdovHF;;AclvHA;EAAe,iBAAA;EAAmB,gBAAA;EAAkB,qBAAA;EAAuB,sBAAA;EAAwB,kBAAA;Ad0vHnG;;AczvHA;EAAgC,gCAAA;Ad6vHhC;;Ac5vHA;EAAe,WAAA;EAAa,YAAA;EAAc,kBAAA;EAAoB,qBAAA;AdmwH9D;;AclwHA;EAAmB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;Ad0wHvF;;AczwHA;EAAgC,WAAA;Ad6wHhC;;Ac5wHA;EAAe,iBAAA;EAAmB,oBAAA;EAAsB,gBAAA;AdkxHxD;;AcjxHA;EAAgC,WAAA;AdqxHhC;;AcnxHA,eAAA;AACA;EACE,mBAAA;EACA,mBAAA;EACA,2BAAA;EACA,gBAAA;AdsxHF;;AcpxHA;EACE,aAAA;EACA,aAAA;EAAe,sBAAA;EACf,SAAA;EACA,iBAAA;AdwxHF;;ActxHA;EAAY,aAAA;EAAe,SAAA;EAAW,0BAAA;Ad4xHtC;;Ac3xHA;EAAe,iBAAA;EAAmB,2BAAA;AdgyHlC;;Ac/xHA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,0BAAA;EACA,oBAAA;EACA,aAAA;EAAe,mBAAA;EACf,gBAAA;EACA,iBAAA;EACA,cAAA;EACA,+BAAA;AdoyHF;;AclyHA;EAAkB,kEAAA;EAAoE,WAAA;EAAa,SAAA;AdwyHnG;;AcvyHA;EAAc,aAAA;EAAe,sBAAA;EAAwB,QAAA;EAAU,YAAA;Ad8yH/D;;Ac7yHA;EAA2B,qBAAA;AdizH3B;;AchzHA;EACE,iBAAA;EACA,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,2BAAA;EACA,eAAA;EACA,oBAAA;EACA,iBAAA;EACA,4BAAA;AdmzHF;;AcjzHA;EACE,0BAAA;EAA4B,WAAA;EAAa,4BAAA;EACzC,4BAAA;EACA,4BAAA;AdszHF;;AcpzHA;EACE,wCAAA;EACA,gBAAA;EACA,qBAAA;EACA,sBAAA;EACA,cAAA;AduzHF;;AcrzHA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,kBAAA;EACA,0BAAA;EACA,mCAAA;Ad0zHF;;AcxzHA;EACE,OAAA;EAAS,uBAAA;EAAyB,SAAA;EAAW,UAAA;EAC7C,iBAAA;EAAmB,oBAAA;EAAsB,cAAA;Adg0H3C;;Ac9zHA;EAA2B,qBAAA;Adk0H3B;;Acl0HA;EAA2B,qBAAA;Adk0H3B;;Acj0HA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,oBAAA;EACA,0BAAA;EAA4B,WAAA;EAC5B,4BAAA;EACA,cAAA;EACA,+EAAA;Adu0HF;;Acr0HA;EAAmB,+BAAA;Ady0HnB;;Acx0HA;EAAiB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;Adg1HnF;;Aev1IA,oDAAA;AACA;EACE,aAAA;EAAe,8BAAA;EAAgC,qBAAA;EAC/C,SAAA;EAAW,mBAAA;EACX,4DAAA;Af61IF;;Ae31IA;EAAyB,mCAAA;EAAqC,kBAAA;Afg2I9D;;Ae/1IA;EAAuB,iBAAA;Afm2IvB;;Aej2IA;EACE,aAAA;EACA,gEAAA;EACA,SAAA;EACA,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,8BAAA;EACA,gBAAA;EACA,2BAAA;EACA,iBAAA;EACA,4DAAA;EACA,qBAAA;Afo2IF;;Aej2IA,0BAAA;AACA;EACE,aAAA;EAAe,sBAAA;EACf,kBAAA;EACA,0CAAA;EACA,0BAAA;EACA,gBAAA;EACA,SAAA;Afq2IF;;Aen2IA;EAAgC,UAAA;Afu2IhC;;Aet2IA;EAAsC,yBAAA;EAA2B,kBAAA;Af22IjE;;Aez2IA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,uBAAA;EAAyB,QAAA;EACpE,0BAAA;EAA4B,WAAA;EAC5B,kBAAA;EACA,kBAAA;EACA,eAAA;EAAiB,gBAAA;EACjB,8CAAA;EACA,4BAAA;Afi3IF;;Ae/2IA;EAAsB,+BAAA;Afm3ItB;;Ael3IA;EAAoB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;Af03ItF;;Aex3IA;EAAqB,aAAA;EAAe,sBAAA;EAAwB,QAAA;Af83I5D;;Ae73IA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,yBAAA;EACA,qBAAA;EACA,mBAAA;Afg4IF;;Ae73IA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,eAAA;EACA,gBAAA;EACA,mDAAA;EACA,eAAA;Afk4IF;;Aeh4IA;EACE,WAAA;EAAa,YAAA;EACb,oBAAA;EAAsB,kBAAA;EAAoB,UAAA;EAC1C,cAAA;Afs4IF;;Aep4IA;EAAqB,2BAAA;EAA6B,oBAAA;Afy4IlD;;Aex4IA;EACE,+BAAA;EACA,qBAAA;EACA,gBAAA;Af24IF;;Aez4IA;EAAoB,OAAA;EAAS,YAAA;Af84I7B;;Ae74IA;EACE,wCAAA;EACA,iBAAA;EACA,qBAAA;EACA,gBAAA;Afg5IF;;Ae94IA;EAA4C,qBAAA;Afk5I5C;;Aej5IA;EACE,0BAAA;EACA,WAAA;EACA,gBAAA;EACA,oBAAA;EACA,eAAA;Afo5IF;;Ael5IA;EAAsD,0BAAA;EAA4B,WAAA;Afu5IlF;;Aer5IA;EACE,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,cAAA;Afy5IF;;Aet5IA;EACE,gBAAA;EACA,sBAAA;EACA,wCAAA;Afy5IF;;Aev5IA;EACE,aAAA;EAAe,8BAAA;EAAgC,mBAAA;EAC/C,iBAAA;EAAmB,qBAAA;EAAuB,gBAAA;EAC1C,kBAAA;Af85IF;;Ae55IA;EACE,wCAAA;EACA,iBAAA;EACA,qBAAA;EACA,sBAAA;Af+5IF;;Ae75IA;EACE,WAAA;EACA,2BAAA;EACA,mBAAA;EACA,gBAAA;Afg6IF;;Ae95IA;EACE,YAAA;EACA,iEAAA;EACA,mBAAA;EACA,iEAAA;EACA,sBAAA;Afi6IF;;Ae/5IA;EACE,eAAA;EACA,qBAAA;EACA,eAAA;Afk6IF;;Aeh6IA;EAAuB,qBAAA;EAAuB,gBAAA;Afq6I9C;;Aen6IA,2BAAA;AACA;EACE,aAAA;EAAe,sBAAA;EACf,0CAAA;EACA,0BAAA;EACA,YAAA;EACA,gBAAA;Afu6IF;;Aer6IA;EACE,kBAAA;EACA,2CAAA;EACA,aAAA;EAAe,sBAAA;EAAwB,SAAA;Af06IzC;;Aex6IA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,SAAA;Af66IF;;Ae36IA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,wBAAA;Af86IF;;Ae56IA;EACE,wCAAA;EACA,iBAAA;EACA,qBAAA;EACA,gBAAA;EACA,gBAAA;EACA,sBAAA;Af+6IF;;Ae76IA;EAAmB,aAAA;EAAe,QAAA;Afk7IlC;;Aej7IA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,qBAAA;EACA,yCAAA;Afs7IF;;Aep7IA;EAAmB,2BAAA;EAA6B,oBAAA;Afy7IhD;;Aex7IA;EAAiB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;Afg8IrF;;Ae97IA;EACE,kBAAA;Afi8IF;;Ae/7IA;EACE,WAAA;EACA,0BAAA;EACA,+BAAA;EACA,kBAAA;EACA,2BAAA;EACA,iBAAA;EACA,oBAAA;EACA,UAAA;EACA,kEAAA;Afk8IF;;Aeh8IA;EAAkC,qBAAA;Afo8IlC;;Aep8IA;EAAkC,qBAAA;Afo8IlC;;Aen8IA;EACE,4BAAA;EACA,0BAAA;EACA,yCAAA;Afs8IF;;Aep8IA;EACE,kBAAA;EACA,UAAA;EAAY,QAAA;EAAU,2BAAA;EACtB,WAAA;EAAa,YAAA;EACb,sBAAA;EAAwB,eAAA;EAAiB,UAAA;EACzC,oBAAA;Af48IF;;Aez8IA;EACE,aAAA;EACA,QAAA;EACA,eAAA;EACA,2CAAA;EACA,0BAAA;Af48IF;;Ae18IA;EACE,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,oCAAA;EACA,2CAAA;EACA,kBAAA;EACA,QAAA;Af68IF;;Ae38IA;EAAkB,oBAAA;Af+8IlB;;Ae98IA;EACE,qBAAA;EACA,mCAAA;EACA,gBAAA;Afi9IF;;Ae/8IA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,gBAAA;EACA,sBAAA;Afk9IF;;Aeh9IA;EAA2B,qBAAA;Afo9I3B;;Ael9IA;EACE,OAAA;EACA,gBAAA;EACA,cAAA;Afq9IF;;Aen9IA;EAAuC,UAAA;Afu9IvC;;Aet9IA;EAA6C,yBAAA;EAA2B,kBAAA;Af29IxE;;Aez9IA;EACE,aAAA;EACA,+BAAA;EACA,SAAA;EACA,kBAAA;EACA,2CAAA;EACA,eAAA;EACA,iCAAA;EACA,kBAAA;Af49IF;;Ae19IA;EAAkB,2BAAA;Af89IlB;;Ae79IA;EACE,+BAAA;EACA,wCAAA;Afg+IF;;Ae99IA;EACE,WAAA;EACA,kBAAA;EACA,SAAA;EAAW,SAAA;EACX,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,0BAAA;Afm+IF;;Aeh+IA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,WAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;Afq+IF;;Aen+IA;EAAQ,kEAAA;Afu+IR;;Aet+IA;EAAQ,gEAAA;Af0+IR;;Aez+IA;EAAQ,kEAAA;Af6+IR;;Ae5+IA;EAAQ,sEAAA;Afg/IR;;Ae/+IA;EAAQ,+DAAA;Afm/IR;;Ael/IA;EAAQ,+DAAA;Afs/IR;;Aep/IA;EAAiB,YAAA;EAAc,aAAA;EAAe,sBAAA;EAAwB,QAAA;Af2/ItE;;Ae1/IA;EACE,aAAA;EAAe,qBAAA;EAAuB,8BAAA;EACtC,QAAA;Af+/IF;;Ae7/IA;EACE,eAAA;EACA,oBAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,YAAA;AfggJF;;Ae9/IA;EAAqC,gBAAA;AfkgJrC;;AejgJA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,cAAA;AfogJF;;AelgJA;EAAqC,qBAAA;AfsgJrC;;AepgJA;EACE,iBAAA;EACA,oBAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AfugJF;;AergJA;EAAwC,gBAAA;AfygJxC;;AevgJA;EACE,eAAA;EACA,qBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;Af0gJF;;AevgJA;EAAiB,aAAA;EAAe,QAAA;EAAU,eAAA;EAAiB,eAAA;Af8gJ3D;;Ae7gJA;EACE,gBAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;EACA,sBAAA;EACA,yBAAA;EACA,gBAAA;AfghJF;;Ae9gJA;EAAoB,+BAAA;EAAiC,qBAAA;AfmhJrD;;AelhJA;EAAoB,+BAAA;EAAiC,qBAAA;AfuhJrD;;AethJA;EAAoB,8BAAA;EAAiC,oBAAA;Af2hJrD;;Ae1hJA;EAAoB,+BAAA;EAAiC,qBAAA;Af+hJrD;;Ae9hJA;EAAoB,4BAAA;EAAiC,kBAAA;AfmiJrD;;AeliJA;EACE,2BAAA;EACA,qBAAA;EACA,oBAAA;EAAsB,mBAAA;EAAqB,QAAA;AfuiJ7C;;AeriJA;EAAuB,UAAA;EAAY,WAAA;EAAa,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;Af6iJzF;;Ae3iJA;EACE,kBAAA;EACA,WAAA;EAAa,YAAA;EACb,qBAAA;EACA,eAAA;EACA,uBAAA;Af+iJF;;Ae7iJA;EAAiB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,iBAAA;EAAmB,UAAA;AfqjJrF;;AepjJA;EAAmB,qBAAA;AfwjJnB;;AevjJA;EAAmB,qBAAA;Af2jJnB;;Ae1jJA;EAAuB,oBAAA;Af8jJvB;;Ae5jJA,0BAAA;AACA;EACE,aAAA;EAAe,sBAAA;EACf,0BAAA;EACA,YAAA;EACA,gBAAA;AfgkJF;;Ae7jJA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,kBAAA;EACA,2CAAA;EACA,SAAA;AfkkJF;;AehkJA;EAAsB,aAAA;EAAe,QAAA;EAAU,mBAAA;AfskJ/C;;AerkJA;EACE,UAAA;EAAY,YAAA;EAAc,8BAAA;EAC1B,aAAA;Af0kJF;;AevkJA;EACE,OAAA;EACA,gBAAA;EACA,uBAAA;Af0kJF;;AexkJA;EAAoC,UAAA;Af4kJpC;;Ae3kJA;EAA0C,yBAAA;EAA2B,kBAAA;AfglJrE;;Ae9kJA;EAAe,mBAAA;AfklJf;;AejlJA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;EACA,wBAAA;EACA,oBAAA;EACA,gBAAA;AfolJF;;AellJA;EACE,aAAA;EAAe,QAAA;EAAU,mBAAA;EAAqB,eAAA;AfwlJhD;;AetlJA;EAA6B,eAAA;EAAiB,gBAAA;Af2lJ9C;;AezlJA;EACE,oCAAA;EACA,mBAAA;EACA,gBAAA;EACA,mBAAA;Af4lJF;;Ae1lJA;EACE,aAAA;EAAe,uBAAA;EAAyB,SAAA;EACxC,kBAAA;EACA,0BAAA;EACA,2CAAA;Af+lJF;;Ae7lJA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,WAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;AfkmJF;;AehmJA;EAAqB,OAAA;EAAS,YAAA;EAAc,gBAAA;AfsmJ5C;;AermJA;EACE,iBAAA;EACA,oBAAA;EACA,gBAAA;AfwmJF;;AetmJA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;AfymJF;;AevmJA;EACE,iBAAA;EACA,qBAAA;EACA,eAAA;Af0mJF;;AexmJA;EACE,iBAAA;EACA,iBAAA;EACA,qBAAA;EACA,cAAA;Af2mJF;;AezmJA;EACE,wCAAA;EACA,qBAAA;EACA,iBAAA;EACA,sBAAA;EACA,cAAA;EACA,eAAA;Af4mJF;;Ae1mJA;EAAkB,aAAA;EAAe,QAAA;EAAU,gBAAA;AfgnJ3C;;Ae9mJA;EACE,kBAAA;EACA,iBAAA;EACA,oBAAA;EACA,iBAAA;EACA,0BAAA;AfinJF;;Ae/mJA;EAAiB,gBAAA;AfmnJjB;;AelnJA;EAA4B,gBAAA;AfsnJ5B;;AernJA;EAAsB,oBAAA;EAAsB,gBAAA;Af0nJ5C;;AeznJA;EAAiB,qBAAA;EAAuB,gBAAA;Af8nJxC;;Ae7nJA;EACE,gBAAA;EAAkB,kBAAA;EAAoB,gBAAA;AfkoJxC;;AehoJA;EAAkB,aAAA;AfooJlB;;AenoJA;EACE,kBAAA;EACA,kBAAA;EACA,oCAAA;EACA,2BAAA;EACA,0BAAA;EACA,iBAAA;EACA,qBAAA;AfsoJF;;AenoJA;EACE,kBAAA;EACA,wCAAA;EACA,0BAAA;AfsoJF;;AepoJA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,wCAAA;EACA,iBAAA;EACA,qBAAA;EACA,sBAAA;EACA,yBAAA;EACA,mBAAA;AfyoJF;;AevoJA;EAA0B,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;Af+oJ5F;;Ae9oJA;EACE,aAAA;EAAe,4DAAA;EACf,SAAA;AfkpJF;;AehpJA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,aAAA;EACA,oCAAA;EACA,kBAAA;EACA,0BAAA;EACA,iEAAA;EACA,eAAA;AfqpJF;;AenpJA;EACE,4BAAA;EACA,yCAAA;AfspJF;;AeppJA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,aAAA;EAAe,mBAAA;EACf,cAAA;EACA,wCAAA;EACA,gBAAA;EACA,gBAAA;EACA,sBAAA;EACA,WAAA;AfypJF;;AevpJA;EAAkB,yBAAA;Af2pJlB;;Ae1pJA;EAAkB,0BAAA;Af8pJlB;;Ae7pJA;EAAkB,0BAAA;AfiqJlB;;AehqJA;EAAkB,yBAAA;AfoqJlB;;AenqJA;EAAkB,yBAAA;AfuqJlB;;AerqJA;EAAe,gBAAA;EAAkB,YAAA;Af0qJjC;;AezqJA;EACE,iBAAA;EACA,oBAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;Af4qJF;;Ae1qJA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;Af6qJF;;Ae1qJA;EACE,kBAAA;EACA,0BAAA;EACA,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,eAAA;EACA,4BAAA;Af+qJF;;Ae7qJA;EAA0B,2BAAA;AfirJ1B;;AehrJA;EAAmC,WAAA;EAAa,YAAA;EAAc,eAAA;AfsrJ9D;;AerrJA;EAAyB,iBAAA;EAAmB,oBAAA;EAAsB,gBAAA;Af2rJlE;;Ae1rJA;EACE,OAAA;EAAS,YAAA;EACT,eAAA;EAAiB,qBAAA;EACjB,mBAAA;EAAqB,gBAAA;EAAkB,uBAAA;AfisJzC;;Ae/rJA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;AfksJF;;Ae/rJA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,kBAAA;EACA,eAAA;EACA,oCAAA;EACA,mBAAA;EACA,2BAAA;AfosJF;;AelsJA;EACE,OAAA;EAAS,uBAAA;EAAyB,SAAA;EAAW,UAAA;EAC7C,eAAA;EAAiB,oBAAA;EAAsB,gBAAA;Af0sJzC;;AexsJA;EAAsC,qBAAA;Af4sJtC;;Ae5sJA;EAAsC,qBAAA;Af4sJtC;;Ae3sJA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,0BAAA;EAA4B,WAAA;EAC5B,4BAAA;EACA,cAAA;AfitJF;;Ae/sJA;EAAqC,+BAAA;AfmtJrC;;AeltJA;EAAmC,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;Af0tJrG;;AgB/yKA,uCAAA;AACA;EAAY,mBAAA;AhBmzKZ;;AgBlzKA;EAAwB,mCAAA;EAAqC,kBAAA;AhBuzK7D;;AgBtzKA;EAAsB,iBAAA;AhB0zKtB;;AgBxzKA;EACE,aAAA;EACA,2CAAA;EACA,SAAA;EACA,4DAAA;EACA,qBAAA;AhB2zKF;;AgBxzKA,wBAAA;AACA;EAAY,aAAA;EAAe,sBAAA;EAAwB,SAAA;EAAW,YAAA;AhB+zK9D;;AgB7zKA;EACE,oBAAA;EAAsB,mBAAA;EAAqB,uBAAA;EAAyB,QAAA;EACpE,0BAAA;EAA4B,WAAA;EAC5B,kBAAA;EACA,mBAAA;EACA,eAAA;EAAiB,gBAAA;EACjB,8CAAA;EACA,4BAAA;AhBq0KF;;AgBn0KA;EAAsB,+BAAA;AhBu0KtB;;AgBt0KA;EAAoB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AhB80KtF;;AgB50KA;EACE,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,aAAA;EACA,8BAAA;EACA,aAAA;EAAe,sBAAA;EAAwB,SAAA;AhBi1KzC;;AgB/0KA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,QAAA;AhBo1KF;;AgBl1KA;EACE,sCAAA;EACA,gBAAA;EACA,iBAAA;EACA,oBAAA;EACA,uBAAA;AhBq1KF;;AgBn1KA;EAAkB,aAAA;EAAe,QAAA;AhBw1KjC;;AgBt1KA,kBAAA;AACA;EACE,aAAA;EACA,qCAAA;EACA,QAAA;AhBy1KF;;AgBv1KA;EACE,wCAAA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;EACA,kBAAA;EACA,sBAAA;AhB01KF;;AgBx1KA;EACE,eAAA;EACA,aAAA;EAAe,mBAAA;EACf,iBAAA;EACA,oBAAA;EACA,kBAAA;EACA,eAAA;EACA,mDAAA;EACA,kBAAA;AhB41KF;;AgB11KA;EAAsB,2BAAA;AhB81KtB;;AgB71KA;EAAyB,qBAAA;AhBi2KzB;;AgBh2KA;EACE,0BAAA;EAA4B,WAAA;EAAa,gBAAA;AhBq2K3C;;AgBn2KA;EACE,WAAA;EACA,kBAAA;EACA,WAAA;EAAa,SAAA;EACb,2BAAA;EACA,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,0BAAA;AhBw2KF;;AgBt2KA;EAA0C,gBAAA;AhB02K1C;;AgBx2KA,iBAAA;AACA;EAAY,aAAA;EAAe,sBAAA;EAAwB,QAAA;AhB82KnD;;AgB72KA;EACE,aAAA;EAAe,mBAAA;EAAqB,SAAA;EACpC,gBAAA;EACA,kBAAA;EACA,eAAA;EACA,iCAAA;AhBk3KF;;AgBh3KA;EAAuB,2BAAA;AhBo3KvB;;AgBn3KA;EACE,WAAA;EAAa,YAAA;EACb,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,gCAAA;EACA,wBAAA;AhBu3KF;;AgBr3KA;EACE,WAAA;EACA,kBAAA;EACA,SAAA;EAAW,MAAA;EACX,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,6BAAA;EACA,wBAAA;AhB03KF;;AgBx3KA;EAAyB,uBAAA;AhB43KzB;;AgB33KA;EAAgC,aAAA;AhB+3KhC;;AgB93KA;EAAiB,iBAAA;EAAmB,oBAAA;EAAsB,OAAA;EAAS,YAAA;AhBq4KnE;;AgBp4KA;EAAuC,qBAAA;AhBw4KvC;;AgBv4KA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;AhB04KF;;AgBv4KA,kBAAA;AACA;EAAY,aAAA;EAAe,sBAAA;AhB44K3B;;AgB34KA;EACE,aAAA;EACA,+BAAA;EACA,SAAA;EACA,eAAA;EACA,wCAAA;EACA,mBAAA;AhB84KF;;AgB54KA;EAAwB,aAAA;EAAe,gBAAA;AhBi5KvC;;AgBh5KA;EACE,kBAAA;EACA,iBAAA;EACA,cAAA;EACA,kBAAA;EACA,2BAAA;AhBm5KF;;AgBj5KA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,wBAAA;AhBo5KF;;AgBl5KA;EACE,wCAAA;EACA,cAAA;EACA,qBAAA;EACA,sBAAA;EACA,eAAA;EACA,cAAA;EACA,yBAAA;AhBq5KF;;AgBn5KA;EAAqB,+BAAA;AhBu5KrB;;AgBt5KA;EAA0B,qBAAA;AhB05K1B;;AgBz5KA;EAAyB,qBAAA;AhB65KzB;;AgB35KA;EAAY,YAAA;EAAc,iBAAA;AhBg6K1B;;AgB/5KA;EACE,eAAA;EACA,oBAAA;EACA,gBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AhBk6KF;;AgBh6KA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,iBAAA;EACA,qBAAA;EACA,eAAA;AhBq6KF;;AgBn6KA;EACE,UAAA;EAAY,WAAA;EACZ,kBAAA;EACA,cAAA;AhBu6KF;;AgBr6KA;EACE,wCAAA;EACA,iBAAA;EACA,sBAAA;EACA,qBAAA;AhBw6KF;;AgBr6KA,4BAAA;AACA;EACE,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,8BAAA;EACA,aAAA;EAAe,sBAAA;EACf,gBAAA;EACA,YAAA;AhBy6KF;;AgBt6KA;EACE,aAAA;EAAe,mBAAA;EAAqB,8BAAA;EACpC,SAAA;EACA,kBAAA;EACA,2CAAA;AhB26KF;;AgBz6KA;EAAoB,aAAA;EAAe,mBAAA;EAAqB,SAAA;EAAW,YAAA;AhBg7KnE;;AgB/6KA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,wBAAA;EACA,cAAA;EACA,mBAAA;AhBk7KF;;AgBh7KA;EAAiB,qBAAA;EAAuB,gBAAA;EAAkB,gBAAA;AhBs7K1D;;AgBp7KA;EAAW,aAAA;EAAe,mBAAA;EAAqB,QAAA;AhB07K/C;;AgBz7KA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,qBAAA;EACA,yCAAA;EACA,+BAAA;EACA,0BAAA;AhB87KF;;AgB57KA;EAAqB,2BAAA;EAA6B,oBAAA;EAAsB,4BAAA;AhBk8KxE;;AgBj8KA;EAAmB,WAAA;EAAa,YAAA;EAAc,oBAAA;EAAsB,eAAA;EAAiB,UAAA;AhBy8KrF;;AgBx8KA;EACE,eAAA;EAAiB,YAAA;EACjB,eAAA;EAAiB,gBAAA;EACjB,oBAAA;EACA,+BAAA;EACA,kBAAA;EACA,0BAAA;EACA,gDAAA;AhB68KF;;AgB38KA;EAAuB,2BAAA;EAA6B,4BAAA;AhBg9KpD;;AgB98KA;EACE,aAAA;EACA,2BAAA;EACA,kBAAA;EACA,YAAA;EACA,QAAA;AhBi9KF;;AgB/8KA;EACE,iBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;EACA,2DAAA;AhBk9KF;;AgBh9KA;EAAsB,oBAAA;AhBo9KtB;;AgBn9KA;EACE,0BAAA;EACA,oBAAA;EACA,4BAAA;AhBs9KF;;AgBn9KA;EAAqB,aAAA;EAAe,mBAAA;EAAqB,QAAA;AhBy9KzD;;AgBv9KA,uBAAA;AACA;EACE,aAAA;EACA,qCAAA;EACA,0BAAA;EACA,sCAAA;AhB09KF;;AgBx9KA;EACE,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;AhB29KF;;AgBx9KA,eAAA;AACA;EACE,aAAA;EACA,qCAAA;EACA,kCAAA;EACA,OAAA;AhB29KF;;AgBz9KA;EACE,0CAAA;EACA,2CAAA;EACA,oBAAA;EACA,kBAAA;EACA,YAAA;EACA,aAAA;EAAe,sBAAA;EAAwB,QAAA;EACvC,eAAA;EACA,iCAAA;AhB89KF;;AgB59KA;EAAkB,2BAAA;AhBg+KlB;;AgB/9KA;EAA0B,eAAA;AhBm+K1B;;AgBl+KA;EAA6C,gBAAA;AhBs+K7C;;AgBr+KA;EAAqB,2BAAA;AhBy+KrB;;AgBx+KA;EAA2B,2BAAA;AhB4+K3B;;AgB1+KA;EACE,sCAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,cAAA;EACA,sBAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AhB6+KF;;AgB3+KA;EAAkC,qBAAA;EAAuB,gBAAA;AhBg/KzD;;AgB/+KA;EACE,0BAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;AhBk/KF;;AgBh/KA;EAAkE,qBAAA;AhBo/KlE;;AgBl/KA;EAAa,aAAA;EAAe,sBAAA;EAAwB,QAAA;EAAU,YAAA;AhBy/K9D;;AgBx/KA;EACE,aAAA;EAAe,mBAAA;EAAqB,QAAA;EACpC,gBAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,eAAA;EACA,mDAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,YAAA;EACA,kCAAA;AhB6/KF;;AgB3/KA;EAAkB,0BAAA;AhB+/KlB;;AgB9/KA;EACE,wCAAA;EACA,gBAAA;EACA,gBAAA;EACA,sBAAA;EACA,cAAA;AhBigLF;;AgB//KA;EACE,OAAA;EAAS,YAAA;EACT,mBAAA;EAAqB,gBAAA;EAAkB,uBAAA;AhBqgLzC;;AgBngLA;EAAqB,+BAAA;EAAiC,qBAAA;EAAwB,iCAAA;AhBygL9E;;AgBxgLA;EAAqB,+BAAA;EAAiC,qBAAA;EAAwB,iCAAA;AhB8gL9E;;AgB7gLA;EAAqB,8BAAA;EAAiC,oBAAA;EAAwB,gCAAA;AhBmhL9E;;AgBlhLA;EAAqB,4BAAA;EAAiC,kBAAA;EAAwB,8BAAA;AhBwhL9E;;AgBvhLA;EAAqB,+BAAA;EAAiC,qBAAA;EAAwB,iCAAA;AhB6hL9E;;AgB5hLA;EAAqB,4BAAA;EAAiC,kBAAA;EAAwB,8BAAA;AhBkiL9E;;AgBjiLA;EAAqB,8BAAA;EAAiC,oBAAA;EAAwB,gCAAA;AhBuiL9E;;AgBtiLA;EAAqB,WAAA;AhB0iLrB;;AgBziLA;EAA2B,0BAAA;EAA4B,sCAAA;AhB8iLvD;;AgB7iLA;EAA2B,0BAAA;EAA4B,iCAAA;AhBkjLvD;;AgBjjLA;EAA2B,yBAAA;EAA4B,gCAAA;AhBsjLvD;;AgBpjLA;EACE,gBAAA;EACA,iBAAA;EACA,qBAAA;EACA,gBAAA;EACA,eAAA;EACA,uBAAA;AhBujLF;;AgBrjLA;EAAuB,qBAAA;AhByjLvB;;AiBn7LA,4DAAA;AAEA,2EAAA;AAEA;EACE,qCAAA;EACA,kCAAA;EACA,sCAAA;EACA,uCAAA;EACA,yEAAA;EACA,uCAAA;EACA,mCAAA;EACA,uCAAA;EACA,2BAAA;EACA,uDAAA;EACA,+CAAA;EACA,0EAAA;EACA,mGAAA;EACA,YAAA;AjBo7LF;;AiBj7LA,wCAAA;AACA;EACE,wCAAA;EACA,eAAA;EACA,sBAAA;EACA,yBAAA;EACA,qBAAA;EACA,gBAAA;EACA,eAAA;AjBo7LF;;AiBl7LA;;;EAEwB,gCAAA;AjBs7LxB;;AiBp7LA,8BAAA;AACA;EACE,sCAAA;EACA,gBAAA;EACA,iBAAA;EACA,oBAAA;EACA,gBAAA;AjBu7LF;;AiBr7LA;EAA2C,qBAAA;EAAuB,gBAAA;AjB07LlE;;AiBz7LA;EACE,0BAAA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;AjB47LF;;AiBz7LA;EAAoB,uBAAA;AjB67LpB;;AiB57LA;EAA4B,gBAAA;AjBg8L5B;;AiB97LA,uBAAA;AACA;;EAEE,kBAAA;EACA,SAAA;EACA,kCAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,eAAA;EACA,mDAAA;AjBi8LF;;AiB/7LA;EAA8B,0BAAA;AjBm8L9B;;AiBl8LA;EAA4B,aAAA;AjBs8L5B;;AiBr8LA;EACE,wCAAA;EACA,gBAAA;EACA,gBAAA;EACA,iBAAA;EACA,aAAA;AjBw8LF;;AiBr8LA,uEAAA;AACA;EAAgC,+BAAA;EAAiC,qBAAA;EAAwB,iCAAA;AjB28LzF;;AiB18LA;EAAgC,+BAAA;EAAiC,qBAAA;EAAwB,iCAAA;AjBg9LzF;;AiB/8LA;EAAgC,8BAAA;EAAiC,oBAAA;EAAwB,gCAAA;AjBq9LzF;;AiBp9LA;EAAgC,4BAAA;EAAiC,kBAAA;EAAwB,8BAAA;AjB09LzF;;AiBz9LA;EAAgC,+BAAA;EAAiC,qBAAA;EAAwB,iCAAA;AjB+9LzF;;AiB99LA;EAAgC,4BAAA;EAAiC,kBAAA;EAAwB,8BAAA;AjBo+LzF;;AiBl+LA;;;EAE6C,cAAA;AjBs+L7C;;AiBp+LA,gBAAA;AACA;EACE,iBAAA;EACA,gBAAA;EACA,qBAAA;EACA,gBAAA;AjBu+LF;;AiBr+LA;EAAkC,qBAAA;AjBy+LlC;;AiBv+LA,mBAAA;AACA;;EAEE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;AjB0+LF;;AiBx+LA;EAAsC,2BAAA;EAA6B,mBAAA;AjB6+LnE;;AiB5+LA;EAAuC,2BAAA;AjBg/LvC;;AiB9+LA,cAAA;AACA;EACE,2BAAA;AjBi/LF;;AiB/+LA;;EAEE,oBAAA;EACA,sCAAA;EACA,gBAAA;EACA,eAAA;AjBk/LF;;AiBh/LA;;EAEE,eAAA;EACA,oBAAA;AjBm/LF;;AiBj/LA;EAAyB,4BAAA;AjBq/LzB;;AiBp/LA;EACE,0BAAA;EACA,qBAAA;AjBu/LF;;AkB3nMA,mDAAA;AAEA;EACE,eAAA;EAAiB,QAAA;EACjB,kCAAA;EACA,kCAAA;UAAA,0BAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,uBAAA;EACA,uBAAA;EACA,uCAAA;AlB8nMF;;AkB3nMA;EACE,aAAA;AlB8nMF;;AkB3nMA;EACE;IAAO,UAAA;ElB+nMP;EkB9nMA;IAAO,UAAA;ElBioMP;AACF;AkB/nMA;EACE,WAAA;EACA,gBAAA;EACA,gBAAA;EACA,0BAAA;EACA,+BAAA;EACA,mBAAA;EACA,4BAAA;EACA,aAAA;EACA,sBAAA;EACA,gBAAA;EACA,iEAAA;AlBioMF;;AkB9nMA;EACE;IAAO,UAAA;IAAY,uCAAA;ElBmoMnB;EkBloMA;IAAO,UAAA;IAAY,iCAAA;ElBsoMnB;AACF;AkBpoMA;EACE,aAAA;EACA,mBAAA;EACA,SAAA;EACA,kBAAA;EACA,2CAAA;AlBsoMF;;AkBnoMA;EACE,WAAA;EAAa,YAAA;EACb,qBAAA;EACA,cAAA;AlBuoMF;;AkBpoMA;EACE,OAAA;EACA,uBAAA;EACA,SAAA;EACA,UAAA;EACA,eAAA;EACA,oBAAA;EACA,oBAAA;EACA,cAAA;EACA,YAAA;AlBuoMF;;AkBroMA;EAA8B,qBAAA;AlByoM9B;;AkBzoMA;EAA8B,qBAAA;AlByoM9B;;AkBvoMA;EACE,wCAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,2BAAA;EACA,qBAAA;EACA,+BAAA;EACA,cAAA;EACA,yBAAA;EACA,sBAAA;AlB0oMF;;AkBvoMA;EACE,OAAA;EACA,gBAAA;EACA,YAAA;AlB0oMF;;AkBxoMA;EAAsC,UAAA;AlB4oMtC;;AkB3oMA;EAA4C,yBAAA;EAA2B,kBAAA;AlBgpMvE;;AkB9oMA;EACE,aAAA;EACA,oCAAA;EACA,SAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,eAAA;EACA,4BAAA;AlBipMF;;AkB/oMA;EAAwB,2BAAA;AlBmpMxB;;AkBlpMA;EACE,+BAAA;EACA,qBAAA;AlBqpMF;;AkBlpMA;EACE,WAAA;EAAa,YAAA;EACb,aAAA;EAAe,mBAAA;EACf,kBAAA;EACA,2BAAA;EACA,qBAAA;EACA,cAAA;AlBupMF;;AkBrpMA;EACE,gEAAA;EACA,qBAAA;AlBwpMF;;AkBtpMA;EAA2B,WAAA;EAAa,YAAA;AlB2pMxC;;AkBzpMA;EACE,iBAAA;EACA,gBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,YAAA;AlB4pMF;;AkB1pMA;EAAoD,qBAAA;EAAuB,gBAAA;AlB+pM3E;;AkB7pMA;EACE,wCAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,yBAAA;EACA,cAAA;AlBgqMF;;AkB9pMA;EAAsD,qBAAA;EAAuB,YAAA;AlBmqM7E;;AkBjqMA;EACE,kBAAA;EACA,kBAAA;EACA,qBAAA;EACA,eAAA;AlBoqMF;;AkBjqMA;EACE,aAAA;EACA,SAAA;EACA,kBAAA;EACA,wCAAA;EACA,0BAAA;EACA,eAAA;EACA,qBAAA;AlBoqMF;;AkBlqMA;EACE,wCAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,2BAAA;EACA,qBAAA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;AlBqqMF;;AkBlqMA;EACE;IAAoB,gBAAA;ElBsqMpB;EkBrqMA;IAAgB,eAAA;IAAiB,SAAA;IAAW,eAAA;ElB0qM5C;AACF;AmBt1MA,yCAAA;AAEA;oFAAA;AAEA;EACE;IAAc,0BAAA;EnBw1Md;EmBv1MA;IAAc,aAAA;EnB01Md;AACF;AmBx1MA;EACE,cAAA;EACA;IAAc,gDAAA;IAAkD,SAAA;EnB41MhE;EmB31MA;IAAc,0BAAA;IAA4B,SAAA;EnB+1M1C;EmB91MA;IAAY,gDAAA;EnBi2MZ;EmB/1MA,UAAA;EACA;IAAc,gCAAA;IAAkC,YAAA;IAAc,aAAA;EnBo2M9D;EmBn2MA;IAAe,aAAA;EnBs2Mf;EmBp2MA,aAAA;EACA;IAAa,gCAAA;EnBu2Mb;EmBt2MA;IAAY,iCAAA;EnBy2MZ;AACF;AmBv2MA;EACE;IAAS,+BAAA;EnB02MT;EmBz2MA;IACE,kBAAA;IACA,gBAAA,EAAA,mDAAA;IACA,kBAAA;IACA,WAAA;EnB22MF;EmBz2MA;;IACoD,aAAA;EnB42MpD;EmB32MA;IAAS,uBAAA;IAAyB,iBAAA;EnB+2MlC;EmB92MA;IAAY,uBAAA;IAAyB,aAAA;EnBk3MrC;EmBj3MA;IAA8B,WAAA;EnBo3M9B;EmBn3MA;IAAa,uBAAA;IAAyB,YAAA;EnBu3MtC;EmBt3MA;IAAS,oBAAA;EnBy3MT;EmBv3MA;;+EAAA;EAGA;IACE,eAAA;IACA,UAAA,EAAA,iEAAA;IACA,MAAA;IACA,YAAA;IACA,aAAA;IACA,cAAA;IACA,UAAA;IACA,0BAAA;IACA,+BAAA;IACA,mBAAA;IACA,4BAAA;IACA,UAAA;IACA,kBAAA;IACA,WAAA;IACA,gDAAA;EnBy3MF;EmBv3MA;IAAuB,aAAA;EnB03MvB;EmBz3MA;IACE,iBAAA;IACA,cAAA;IACA,UAAA;IACA,mBAAA;EnB23MF;EmBz3MA;IAAiB,iBAAA;IAAmB,eAAA;IAAiB,kBAAA;IAAoB,aAAA;EnB+3MzE;EmB93MA;IAAuB,kBAAA;EnBi4MvB;EmB/3MA,SAAA;EACA;IAAc,gCAAA;EnBk4Md;AACF;AmBh4MA;EACE;;;4BAAA;EAIA;IAAS,cAAA;EnBm4MT;EmBl4MA;IACE,eAAA;IACA,MAAA;IAAQ,OAAA;IACR,YAAA;IACA,aAAA;IACA,YAAA,EAAA,wBAAA;IACA,4BAAA;IACA,0DAAA;IACA,+CAAA;IAEA,0DAAA;IACA,uBAAA;IACA,gBAAA,EAAA,6DAAA;IACA,4BAAA;EnBo4MF;EmBl4MA;;IACkE,eAAA;EnBq4MlE;EmBp4MA;IAAS,2BAAA;IAA6B,sBAAA;EnBw4MtC;EmBv4MA;IAAY,2BAAA;IAA6B,iBAAA;EnB24MzC;EmB14MA;IAAa,2BAAA;IAA6B,iBAAA;EnB84M1C;EmB54MA;;kFAAA;EAGA;IAAkB,gBAAA;EnB+4MlB;EmB94MA;IACE,gBAAA;IACA,UAAA;IAAY,SAAA;IACZ,WAAA;IACA,iBAAA;IACA,mBAAA;IACA,uBAAA;IACA,SAAA;IACA,gBAAA;IACA,gBAAA;IACA,UAAA;IACA,mBAAA;IACA,aAAA;IACA,yDAAA;EnBi5MF;EmB/4MA;IAAuB,cAAA;EnBk5MvB;EmBj5MA;IACE,iBAAA;IACA,uBAAA;IACA,UAAA;IACA,mBAAA;EnBm5MF;EmBj5MA;IAAiB,SAAA;IAAW,iBAAA;IAAmB,iBAAA;IAAmB,kBAAA;EnBu5MlE;EmBt5MA;IAAuB,kBAAA;EnBy5MvB;EmBv5MA;IAAkC,wBAAA;EnB05MlC;EmBz5MA;IAAuB,gBAAA;EnB45MvB,EmB55M6C,gCAAA;EAE7C;IAAa,oBAAA;EnB65Mb;EmB35MA,4CAAA;EACA;IAAY,eAAA;EnB85MZ;EmB75MA;IAAkB,QAAA;EnBg6MlB;EmB95MA,yEAAA;EACA;IAAU,QAAA;IAAU,YAAA;IAAc,OAAA;IAAS,gBAAA;EnBo6M3C;EmBn6MA;IAA6C,aAAA;EnBs6M7C;EmBr6MA;IAAmB,mBAAA;IAAqB,gBAAA;IAAkB,uBAAA;EnB06M1D;EmBx6MA,8EAAA;EACA;IAAO,YAAA;IAAc,UAAA;IAAY,WAAA;IAAa,YAAA;IAAc,uBAAA;EnB+6M5D;EmB96MA;IAAuB,aAAA;EnBi7MvB;EmBh7MA;IAAW,WAAA;IAAa,YAAA;EnBo7MxB;EmBl7MA,uBAAA;EACA;IAAU,gBAAA;EnBq7MV;EmBn7MA,qDAAA;EACA;IACE,YAAA;IACA,yBAAA;IACA,gBAAA;IACA,WAAA,EAAA,qDAAA;EnBq7MF;EmBn7MA;IACE,yBAAA;IACA,gBAAA;EnBq7MF;EmBl7MA,sCAAA;EACA;IAAW,uBAAA;EnBq7MX;EmBp7MA;IAAY,kBAAA;IAAoB,sBAAA;IAAwB,SAAA;IAAW,uBAAA;EnB07MnE;EmBz7MA;IAAQ,sBAAA;IAAwB,uBAAA;IAAyB,SAAA;EnB87MzD;EmB77MA;IAAgB,eAAA;EnBg8MhB;EmB97MA,2BAAA;EACA;IAAQ,SAAA;EnBi8MR;EmB/7MA,wBAAA;EACA;IAAY,0BAAA;EnBk8MZ;EmBj8MA;IAAc,0BAAA;IAA4B,SAAA;EnBq8M1C;EmBp8MA;IAAkB,qCAAA;IAAuC,SAAA;EnBw8MzD;EmBv8MA;IAAe,qCAAA;IAAuC,QAAA;EnB28MtD;EmB18MA;IAAW,sBAAA;IAAwB,uBAAA;IAAyB,SAAA;EnB+8M5D;EmB98MA;IAAW,gBAAA;EnBi9MX;EmBh9MA;IAAiB,sBAAA;IAAwB,uBAAA;IAAyB,SAAA;EnBq9MlE;EmBn9MA,wBAAA;EACA;IAAQ,aAAA;EnBs9MR;EmBr9MA;IAAa,eAAA;IAAiB,SAAA;EnBy9M9B;EmBv9MA,0BAAA;EACA;IAAqB,iBAAA;EnB09MrB;EmBx9MA,wDAAA;EACA;IAAgB,sBAAA;IAAwB,oBAAA;IAAsB,SAAA;EnB69M9D;EmB59MA;IAA0C,YAAA;IAAc,eAAA;EnBg+MxD;EmB/9MA;IAAa,sBAAA;IAAwB,SAAA;IAAW,uBAAA;EnBo+MhD;EmBl+MA,oBAAA;EACA;IAAc,0BAAA;EnBq+Md;EmBp+MA;IAAa,aAAA;EnBu+Mb;EmBt+MA;IAAa,sBAAA;IAAwB,uBAAA;IAAyB,SAAA;EnB2+M9D;EmBz+MA;;;;;6BAAA;EAMA;IACE,0BAAA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;EnB2+MF;EmBz+MA;IACE,aAAA;IACA,eAAA;IACA,2CAAA;IACA,iBAAA;EnB2+MF;EmBz+MA;IAAa,iBAAA;EnB4+Mb;EmB3+MA;IAAkB,kBAAA;EnB8+MlB;EmB7+MA;IACE,cAAA;IACA,iBAAA;IACA,aAAA;EnB++MF;EmB7+MA;IAAiB,uBAAA;EnBg/MjB;EmB9+MA,uBAAA;EACA;IAAa,0BAAA;EnBi/Mb;EmBh/MA;IAAe,eAAA;IAAiB,SAAA;IAAW,aAAA;EnBq/M3C;EmBp/MA;IAAoB,WAAA;IAAa,8BAAA;EnBw/MjC;EmBv/MA;IAAa,QAAA;EnB0/Mb;EmBz/MA;IAAY,iCAAA;EnB4/MZ;EmB3/MA;IAAsB,gBAAA;IAAkB,cAAA;IAAgB,qBAAA;EnBggNxD;EmB//MA;IAAY,YAAA;EnBkgNZ;EmBjgNA;IAAiB,aAAA;EnBogNjB;EmBlgNA,qDAAA;EACA;IAAe,qCAAA;IAAuC,mBAAA;EnBsgNtD;EmBrgNA;IAAuB,sCAAA;EnBwgNvB;EmBtgNA,yBAAA;EACA;IAAa,kBAAA;EnBygNb;AACF;AmBvgNA;EACE;IAAkB,0BAAA;EnB0gNlB;EmBzgNA;IAAe,qCAAA;EnB4gNf;EmB3gNA;IAAgB,sBAAA;IAAwB,oBAAA;EnB+gNxC;EmB9gNA;IAAqB,WAAA;IAAa,uBAAA;EnBkhNlC;EmBjhNA;IAAwB,aAAA;EnBohNxB;EmBnhNA;IAAc,0BAAA;EnBshNd;AACF","sourcesContent":["/* ============================================\n   2026 Design System — Entry\n   ============================================ */\n\n@use 'tokens';\n@use 'base';\n@use 'animations';\n@use 'shell';\n@use 'dropdowns';\n@use 'components';\n@use 'forms';\n@use 'ui';\n@use 'auth';\n@use 'error';\n@use 'chat';\n@use 'data';\n@use 'charts';\n@use 'dashboard';\n@use 'email';\n@use 'calendar';\n@use 'fullcalendar';\n@use 'palette';\n@use 'responsive';\n","/* ============ RESET + BASE — 2026 ============ */\n\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');\n\n*, *::before, *::after { box-sizing: border-box; }\nhtml, body { margin: 0; padding: 0; }\na { color: inherit; text-decoration: none; }\nbutton { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }\nul, ol { margin: 0; padding: 0; list-style: none; }\nimg, svg { display: block; max-width: 100%; }\ninput, textarea { font: inherit; color: inherit; }\n\nbody {\n  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;\n  font-feature-settings: 'cv11', 'ss01', 'ss03';\n  font-weight: 400;\n  background: var(--bg-body);\n  color: var(--t-base);\n  font-size: 14px;\n  line-height: 1.55;\n  letter-spacing: -0.003em;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  transition: background-color 280ms ease, color 280ms ease;\n}\n::selection { background: var(--primary); color: #fff; }\n\n.mono { font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace; }\n\n.eyebrow {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  font-weight: 500;\n}\n","/* ============ DESIGN TOKENS — 2026 ============ */\n\n:root[data-theme=\"light\"] {\n  /* Surfaces */\n  --bg-body:       #F0F4F8;\n  --bg-card:       #FFFFFF;\n  --bg-sidebar:    #FFFFFF;\n  --bg-hover:      #F8FAFC;\n  --bg-muted:      #F1F5F9;\n\n  /* Text */\n  --t-base:        #1E293B;\n  --t-muted:       #64748B;\n  --t-light:       #94A3B8;\n  --t-inverse:     #FFFFFF;\n\n  /* Borders */\n  --border:        #E4E8EF;\n  --border-soft:   #EEF1F5;\n\n  /* Brand — blue */\n  --primary:       #2563EB;\n  --primary-light: #3B82F6;\n  --primary-dark:  #1D4ED8;\n  --primary-soft:  #EFF6FF;\n  --primary-ring:  rgba(37, 99, 235, 0.18);\n\n  /* Semantic */\n  --success:       #10B981;\n  --success-soft:  #ECFDF5;\n  --warning:       #F59E0B;\n  --warning-soft:  #FFFBEB;\n  --danger:        #EF4444;\n  --danger-soft:   #FEF2F2;\n  --info:          #0EA5E9;\n  --info-soft:     #F0F9FF;\n  --purple:        #8B5CF6;\n  --purple-soft:   #F5F3FF;\n  --pink:          #EC4899;\n  --pink-soft:     #FDF2F8;\n  --teal:          #14B8A6;\n  --teal-soft:     #F0FDFA;\n  --orange:        #F97316;\n  --orange-soft:   #FFF7ED;\n  --shadow-sm:   0 1px 2px 0 rgb(15 23 42 / 0.04);\n  --shadow-card: 0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.04);\n  --shadow-lg:   0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.05);\n  --overlay: rgba(240, 244, 248, 0.72);\n}\n\n:root[data-theme=\"dark\"] {\n  --bg-body:       #0B1120;\n  --bg-card:       #141B2D;\n  --bg-sidebar:    #141B2D;\n  --bg-hover:      #1C2438;\n  --bg-muted:      #1A2237;\n  --t-base:        #F1F5F9;\n  --t-muted:       #94A3B8;\n  --t-light:       #64748B;\n  --t-inverse:     #0B1120;\n  --border:        #222C42;\n  --border-soft:   #1A2237;\n  --primary:       #60A5FA;\n  --primary-light: #93C5FD;\n  --primary-dark:  #3B82F6;\n  --primary-soft:  #0F2847;\n  --primary-ring:  rgba(96, 165, 250, 0.24);\n  --success:       #34D399;  --success-soft:  #0F2A20;\n  --warning:       #FBBF24;  --warning-soft:  #2B1F08;\n  --danger:        #F87171;  --danger-soft:   #2B1414;\n  --info:          #38BDF8;  --info-soft:     #0D2232;\n  --purple:        #A78BFA;  --purple-soft:   #1E1A2C;\n  --pink:          #F472B6;  --pink-soft:     #2A1424;\n  --teal:          #2DD4BF;  --teal-soft:     #0E2826;\n  --orange:        #FB923C;  --orange-soft:   #2A1810;\n  --shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.4);\n  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.25);\n  --shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4);\n  --overlay: rgba(11, 17, 32, 0.72);\n}\n","/* ============ ANIMATIONS — 2026 ============ */\n\n@keyframes rise-in {\n  from { opacity: 0; transform: translateY(10px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes bar-in {\n  from { transform: scaleX(0); }\n  to   { transform: scaleX(1); }\n}\n\n@keyframes draw   { to { stroke-dashoffset: 0; } }\n@keyframes fade-in { to { opacity: 1; } }\n","/* ============ SHELL ============ */\n.shell { display: grid; grid-template-columns: 248px 1fr; min-height: 100vh; }\n\n/* ============ SIDEBAR ============ */\n.d-sidebar {\n  background: var(--bg-sidebar);\n  border-right: 1px solid var(--border);\n  padding: 22px 16px 18px;\n  position: sticky; top: 0;\n  height: 100vh;\n  display: flex; flex-direction: column; gap: 22px;\n  overflow-y: auto;\n}\n.d-sidebar::-webkit-scrollbar { width: 4px; }\n.d-sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.brand {\n  display: flex; align-items: center; gap: 10px;\n  padding: 4px 10px 20px;\n  border-bottom: 1px solid var(--border-soft);\n}\n.brand-logo {\n  width: 32px; height: 32px;\n  background: var(--primary);\n  border-radius: 8px;\n  display: grid; place-items: center;\n  box-shadow: 0 4px 10px -2px color-mix(in oklab, var(--primary) 40%, transparent);\n}\n.brand-logo svg { width: 18px; height: 18px; }\n.brand-text { line-height: 1.1; }\n.brand-name {\n  font-family: 'Inter Tight', 'Inter', sans-serif;\n  font-weight: 700;\n  font-size: 15.5px;\n  color: var(--t-base);\n  letter-spacing: -0.02em;\n}\n.brand-tag {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  color: var(--t-light);\n  letter-spacing: 0.1em;\n}\n\n.nav-section { display: flex; flex-direction: column; gap: 2px; }\n.nav-label {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  padding: 0 10px 6px;\n}\n\n.nav-link {\n  display: flex; align-items: center; gap: 12px;\n  padding: 9px 12px;\n  border-radius: 8px;\n  color: var(--t-muted);\n  font-size: 13px;\n  font-weight: 500;\n  transition: background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;\n  line-height: 1.2;\n}\n.nav-link > svg {\n  width: 17px; height: 17px;\n  stroke: currentColor; stroke-width: 1.75; fill: none;\n  flex-shrink: 0;\n  display: block;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.nav-link > span:not(.nav-badge) { min-width: 0; flex: 1; }\n.nav-link:hover { background: var(--bg-hover); color: var(--t-base); }\n.nav-link.is-active {\n  color: var(--primary);\n  background: var(--primary-soft);\n  box-shadow: inset 3px 0 0 var(--primary);\n}\n\n.nav-badge {\n  flex: 0 0 auto;\n  margin-left: auto;\n  font-family: 'Inter', sans-serif;\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  padding: 2px 6px;\n  line-height: 1.4;\n  border-radius: 999px;\n}\n.nav-badge.pro { background: var(--primary); color: #fff; }\n.nav-badge.hot { background: var(--danger-soft); color: var(--danger); }\n.nav-badge.new { background: var(--success-soft); color: var(--success); }\n\n/* Dropdown nav items */\n.nav-item-group .nav-link .chev {\n  width: 11px; height: 11px; margin-left: auto;\n  transition: transform 200ms ease;\n}\n.nav-item-group.is-open .nav-link .chev { transform: rotate(90deg); }\n.nav-submenu {\n  overflow: hidden;\n  max-height: 0;\n  margin-left: 20px;\n  padding-left: 14px;\n  position: relative;\n  transition: max-height 280ms cubic-bezier(.4,0,.2,1);\n}\n.nav-submenu::before {\n  content: '';\n  position: absolute;\n  left: 0; top: 6px; bottom: 6px;\n  width: 1px;\n  background: var(--border);\n}\n.nav-item-group.is-open .nav-submenu { max-height: 400px; padding-top: 4px; padding-bottom: 6px; }\n.nav-submenu a {\n  display: flex; align-items: center;\n  padding: 7px 10px;\n  font-size: 12.5px;\n  color: var(--t-muted);\n  border-radius: 6px;\n  transition: color 160ms ease, background-color 160ms ease, padding-left 160ms ease;\n}\n.nav-submenu a:hover {\n  color: var(--t-base);\n  background: var(--bg-hover);\n  padding-left: 13px;\n}\n.nav-submenu a.is-active {\n  color: var(--primary);\n  font-weight: 600;\n  background: var(--primary-soft);\n}\n\n.sidebar-footer {\n  margin-top: auto;\n  padding-top: 16px;\n  border-top: 1px solid var(--border-soft);\n}\n.workspace {\n  display: flex; align-items: center; gap: 10px;\n  padding: 6px 10px;\n  border-radius: 8px;\n  transition: background-color 180ms ease;\n}\n.workspace:hover { background: var(--bg-hover); }\n.workspace-avatar {\n  width: 32px; height: 32px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--primary), var(--purple));\n  color: #fff;\n  display: grid; place-items: center;\n  font-weight: 600;\n  font-size: 12.5px;\n  flex-shrink: 0;\n}\n.workspace-text { line-height: 1.2; min-width: 0; }\n.workspace-name { font-size: 13px; color: var(--t-base); font-weight: 600; }\n.workspace-role { font-size: 11px; color: var(--t-light); }\n.workspace-chev { margin-left: auto; color: var(--t-light); }\n\n/* ============ MAIN ============ */\n.main { display: flex; flex-direction: column; min-width: 0; }\n\n/* ============ HAMBURGER (mobile only — see _responsive.scss) ============ */\n.hamburger {\n  display: none; /* Shown via media query under 720px */\n  width: 36px; height: 36px;\n  align-items: center; justify-content: center;\n  border-radius: 8px;\n  color: var(--t-base);\n  margin-right: 4px;\n  transition: background 160ms;\n}\n.hamburger:hover { background: var(--bg-hover); }\n.hamburger svg { width: 20px; height: 20px; }\n\n/* ============ MOBILE DRAWER BACKDROP ============ */\n.drawer-backdrop {\n  position: fixed; inset: 0;\n  background: rgb(15 23 42 / 0.5);\n  backdrop-filter: blur(2px);\n  z-index: 90;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 240ms ease, visibility 240ms;\n}\nbody.has-drawer-open .drawer-backdrop {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* ============ TOPBAR ============ */\n.d-topbar {\n  height: 60px;\n  display: flex; align-items: center; justify-content: space-between;\n  padding: 0 32px;\n  border-bottom: 1px solid var(--border);\n  position: sticky; top: 0; z-index: 10;\n  backdrop-filter: saturate(140%) blur(10px);\n  -webkit-backdrop-filter: saturate(140%) blur(10px);\n  background: var(--overlay);\n}\n.crumbs {\n  display: flex; align-items: center; gap: 10px;\n  color: var(--t-muted);\n  font-size: 13px;\n  font-weight: 500;\n}\n.crumbs .sep { color: var(--t-light); }\n.crumbs .current { color: var(--t-base); font-weight: 600; }\n.topbar-actions { display: flex; align-items: center; gap: 6px; }\n\n.cmd {\n  display: inline-flex; align-items: center; gap: 10px;\n  padding: 7px 10px 7px 12px;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--bg-card);\n  color: var(--t-light);\n  font-size: 13px;\n  transition: all 200ms ease;\n  min-width: 220px;\n}\n.cmd:hover { border-color: var(--primary); color: var(--t-muted); box-shadow: 0 0 0 3px var(--primary-soft); }\n.cmd svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }\n.cmd span { flex: 1; text-align: left; }\n.kbd {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  padding: 2px 6px;\n  border-radius: 4px;\n  background: var(--bg-muted);\n  color: var(--t-muted);\n  border: 1px solid var(--border);\n}\n\n.icon-btn {\n  width: 36px; height: 36px;\n  display: grid; place-items: center;\n  border-radius: 8px;\n  color: var(--t-muted);\n  transition: background 180ms, color 180ms;\n  position: relative;\n}\n.icon-btn:hover { background: var(--bg-hover); color: var(--t-base); }\n.icon-btn > svg { width: 17px; height: 17px; stroke: currentColor; stroke-width: 1.8; fill: none; }\n.icon-btn .count {\n  position: absolute;\n  top: 5px; right: 5px;\n  min-width: 16px; height: 16px;\n  padding: 0 4px;\n  border-radius: 999px;\n  font-size: 9.5px;\n  font-weight: 600;\n  display: grid; place-items: center;\n  border: 2px solid var(--bg-body);\n  line-height: 1;\n}\n.icon-btn .count.danger { background: var(--danger); color: #fff; }\n.icon-btn .count.info { background: var(--info); color: #fff; }\n\n.avatar {\n  width: 34px; height: 34px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--primary), var(--purple));\n  color: #fff;\n  display: grid; place-items: center;\n  font-weight: 600;\n  font-size: 13px;\n  margin-left: 6px;\n  border: 2px solid var(--bg-card);\n  box-shadow: var(--shadow-sm);\n  cursor: pointer;\n}\n\n/* ============ FOOTER ============ */\n.d-footer {\n  padding: 24px 32px 28px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: var(--t-muted);\n  font-size: 12px;\n}\n.d-footer a { color: var(--primary); font-weight: 600; }\n.d-footer a:hover { color: var(--primary-dark); }\n.d-footer-meta { display: flex; gap: 20px; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--t-light); letter-spacing: 0.06em; }\n","/* ============ DROPDOWNS ============ */\n.dd-wrap { position: relative; }\n\n.dd-menu {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  min-width: 340px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  box-shadow: var(--shadow-lg);\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-4px);\n  transition: opacity 180ms ease, transform 180ms ease, visibility 180ms;\n  overflow: hidden;\n  z-index: 100;\n}\n.dd-wrap.is-open .dd-menu {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.dd-head {\n  display: flex; align-items: center; gap: 10px;\n  padding: 14px 18px;\n  border-bottom: 1px solid var(--border-soft);\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--t-base);\n  letter-spacing: 0.01em;\n}\n.dd-head svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 1.8; fill: none; color: var(--t-muted); }\n\n.dd-list { max-height: 320px; overflow-y: auto; }\n.dd-list::-webkit-scrollbar { width: 4px; }\n.dd-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.dd-item {\n  display: grid; grid-template-columns: 36px 1fr;\n  gap: 12px; align-items: center;\n  padding: 12px 18px;\n  border-bottom: 1px solid var(--border-soft);\n  transition: background 150ms ease;\n}\n.dd-item:last-child { border-bottom: 0; }\n.dd-item:hover { background: var(--bg-hover); }\n\n.dd-avatar {\n  width: 36px; height: 36px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  font-size: 12px; font-weight: 600;\n  color: #fff;\n  flex-shrink: 0;\n}\n.dd-avatar.a1 { background: linear-gradient(135deg, var(--primary), var(--purple)); }\n.dd-avatar.a2 { background: linear-gradient(135deg, var(--success), var(--teal)); }\n.dd-avatar.a3 { background: linear-gradient(135deg, var(--danger), var(--warning)); }\n\n.dd-body { min-width: 0; }\n.dd-text {\n  font-size: 13px;\n  color: var(--t-muted);\n  line-height: 1.4;\n  margin-bottom: 3px;\n}\n.dd-text strong { color: var(--t-base); font-weight: 600; }\n.dd-text em { color: var(--primary); font-style: normal; }\n.dd-preview {\n  font-size: 12.5px;\n  color: var(--t-muted);\n  line-height: 1.45;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  margin-top: 2px;\n}\n.dd-row-head {\n  display: flex; justify-content: space-between; align-items: baseline;\n  gap: 8px;\n}\n.dd-row-head strong { font-size: 13px; color: var(--t-base); font-weight: 600; }\n.dd-time {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n  flex-shrink: 0;\n}\n\n.dd-footer {\n  display: block;\n  padding: 12px 18px;\n  text-align: center;\n  font-size: 12.5px;\n  color: var(--primary);\n  font-weight: 600;\n  border-top: 1px solid var(--border-soft);\n  transition: color 180ms, background 180ms;\n}\n.dd-footer:hover { color: var(--primary-dark); background: var(--bg-hover); }\n\n/* Profile menu variant */\n.dd-menu.dd-profile { min-width: 220px; }\n.dd-menu-item {\n  display: flex; align-items: center; gap: 12px;\n  padding: 10px 18px;\n  font-size: 13px;\n  color: var(--t-base);\n  transition: background 150ms, color 150ms;\n}\n.dd-menu-item:hover { background: var(--bg-hover); }\n.dd-menu-item svg { width: 15px; height: 15px; stroke: currentColor; stroke-width: 1.75; fill: none; color: var(--t-muted); }\n.dd-menu-item.danger { color: var(--danger); }\n.dd-menu-item.danger svg { color: var(--danger); }\n.dd-menu-item.danger:hover { background: var(--danger-soft); }\n.dd-divider { height: 1px; background: var(--border-soft); margin: 6px 0; }\n.dd-profile-head {\n  padding: 14px 18px;\n  border-bottom: 1px solid var(--border-soft);\n}\n.dd-profile-name { font-size: 13px; font-weight: 600; color: var(--t-base); }\n.dd-profile-email { font-size: 11.5px; color: var(--t-muted); margin-top: 2px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.02em; }\n","/* ============ CONTENT + COMMON COMPONENTS ============ */\n.content { padding: 32px 32px 24px; width: 100%; }\n\n/* Hero */\n.hero {\n  display: flex; justify-content: space-between; align-items: flex-end;\n  gap: 32px; margin-bottom: 28px;\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n}\n.hero-text .eyebrow { display: block; margin-bottom: 10px; }\n.hero-title {\n  font-family: 'Inter Tight', 'Inter', sans-serif;\n  font-weight: 700;\n  font-size: clamp(28px, 3.2vw, 36px);\n  line-height: 1.15;\n  letter-spacing: -0.028em;\n  color: var(--t-base);\n  margin: 0 0 8px;\n}\n.hero-title .accent { color: var(--primary); }\n.hero-sub { font-size: 14px; color: var(--t-muted); max-width: 60ch; line-height: 1.6; }\n.hero-sub strong { color: var(--success); font-weight: 600; }\n.hero-actions { display: flex; gap: 8px; flex-shrink: 0; }\n\n/* Buttons */\n.btn {\n  display: inline-flex; align-items: center; gap: 8px;\n  padding: 9px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  transition: all 180ms ease;\n  border: 1px solid transparent;\n  white-space: nowrap;\n}\n.btn svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }\n.btn--ghost { color: var(--t-base); border-color: var(--border); background: var(--bg-card); }\n.btn--ghost:hover { border-color: var(--t-light); box-shadow: var(--shadow-sm); }\n.btn--primary { background: var(--primary); color: #fff; box-shadow: 0 1px 2px var(--primary-ring); }\n.btn--primary:hover { background: var(--primary-dark); }\n\n/* Card */\n.card {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 22px;\n  box-shadow: var(--shadow-card);\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.card-head {\n  display: flex; justify-content: space-between; align-items: flex-end;\n  padding: 0 0 16px;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--border-soft);\n  gap: 16px;\n}\n.card-head > :last-child { flex-shrink: 0; padding-bottom: 2px; }\n.card-title-wrap { min-width: 0; }\n.card-title-wrap .eyebrow { display: block; margin-bottom: 4px; }\n.card-title {\n  font-family: 'Inter Tight', 'Inter', sans-serif;\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: -0.02em;\n  color: var(--t-base);\n  margin: 0;\n}\n.card-action {\n  font-size: 12px;\n  color: var(--primary);\n  font-weight: 600;\n  display: inline-flex; align-items: center; gap: 5px;\n  transition: color 180ms;\n}\n.card-action:hover { color: var(--primary-dark); }\n.card-action svg { width: 12px; height: 12px; stroke: currentColor; stroke-width: 2.2; fill: none; }\n\n/* Generic 12-column grid */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n  gap: 20px;\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n  animation-delay: 260ms;\n}\n.grid > * { min-width: 0; }\n.col-6  { grid-column: span 6; }\n.col-12 { grid-column: span 12; }\n\n/* Horizontal-scroll wrapper for tables that overflow on narrow viewports */\n.table-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }\n.table-scroll::-webkit-scrollbar { height: 4px; }\n.table-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n/* Generic table */\n.table { width: 100%; border-collapse: collapse; }\n.table thead th {\n  text-align: left;\n  padding: 10px 0 12px;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  font-weight: 500;\n  border-bottom: 1px solid var(--border);\n}\n.table tbody td {\n  padding: 11px 0;\n  font-size: 13px;\n  border-bottom: 1px solid var(--border-soft);\n}\n.table tbody tr:last-child td { border-bottom: 0; }\n.table tbody tr { transition: background-color 160ms ease; }\n.table tbody tr:hover td { background: var(--bg-hover); }\n.table .cell-name { color: var(--t-base); font-weight: 600; }\n.table .cell-date { color: var(--t-muted); font-size: 12px; }\n.table .cell-price { font-weight: 600; color: var(--t-base); text-align: right; }\n.table .cell-price.pos { color: var(--success); }\n.table .cell-price.neg { color: var(--danger); }\n\n/* Generic tag */\n.tag {\n  font-size: 10.5px;\n  font-weight: 600;\n  padding: 3px 9px;\n  border-radius: 999px;\n  letter-spacing: 0.02em;\n  display: inline-flex; align-items: center;\n  line-height: 1;\n}\n.tag.t-new       { background: var(--purple-soft);  color: var(--purple); }\n.tag.t-used      { background: var(--orange-soft);  color: var(--orange); }\n.tag.t-old       { background: var(--warning-soft); color: var(--warning); }\n.tag.t-unavail   { background: var(--danger-soft);  color: var(--danger); }\n.tag.t-active    { background: var(--success-soft); color: var(--success); }\n.tag.t-info      { background: var(--info-soft);    color: var(--info); }\n","/* ============ FORMS ============ */\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 18px 22px;\n}\n.form-grid .span-2 { grid-column: span 2; }\n@media (max-width: 720px) {\n  .form-grid { grid-template-columns: 1fr; }\n  .form-grid .span-2 { grid-column: span 1; }\n}\n\n.field {\n  display: flex; flex-direction: column; gap: 6px;\n  min-width: 0;\n}\n.field-label {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--t-base);\n  letter-spacing: -0.005em;\n  display: flex; align-items: center; gap: 6px;\n}\n.field-label .req { color: var(--danger); }\n.field-help {\n  font-size: 11.5px;\n  color: var(--t-muted);\n  line-height: 1.45;\n}\n.field-error {\n  font-size: 11.5px;\n  color: var(--danger);\n  display: flex; align-items: center; gap: 4px;\n}\n\n.input,\n.select,\n.textarea {\n  width: 100%;\n  padding: 9px 12px;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--bg-card);\n  color: var(--t-base);\n  font-size: 13px;\n  font-family: inherit;\n  outline: 0;\n  transition: border-color 180ms, box-shadow 180ms, background 180ms;\n}\n.input::placeholder,\n.textarea::placeholder { color: var(--t-light); }\n.input:focus,\n.select:focus,\n.textarea:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px var(--primary-soft);\n}\n.input:disabled,\n.select:disabled,\n.textarea:disabled {\n  background: var(--bg-muted);\n  color: var(--t-light);\n  cursor: not-allowed;\n}\n.input.is-invalid,\n.select.is-invalid,\n.textarea.is-invalid {\n  border-color: var(--danger);\n}\n.input.is-invalid:focus,\n.select.is-invalid:focus,\n.textarea.is-invalid:focus {\n  box-shadow: 0 0 0 3px var(--danger-soft);\n}\n.textarea {\n  min-height: 96px;\n  resize: vertical;\n  line-height: 1.5;\n}\n\n.select {\n  appearance: none; -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2'><path d='m6 9 6 6 6-6'/></svg>\");\n  background-repeat: no-repeat;\n  background-position: right 10px center;\n  padding-right: 32px;\n}\n\n.input-icon {\n  position: relative;\n}\n.input-icon .ico {\n  position: absolute;\n  left: 11px; top: 50%; transform: translateY(-50%);\n  width: 14px; height: 14px;\n  color: var(--t-light);\n  pointer-events: none;\n}\n.input-icon .ico svg { width: 100%; height: 100%; stroke: currentColor; stroke-width: 2; fill: none; }\n.input-icon .input { padding-left: 34px; }\n\n/* Inline addon (e.g. https://) */\n.input-group {\n  display: flex;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--bg-card);\n  overflow: hidden;\n  transition: border-color 180ms, box-shadow 180ms;\n}\n.input-group:focus-within {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px var(--primary-soft);\n}\n.input-group .addon {\n  padding: 0 12px;\n  display: grid; place-items: center;\n  background: var(--bg-muted);\n  color: var(--t-muted);\n  font-size: 12px;\n  font-family: 'JetBrains Mono', monospace;\n  border-right: 1px solid var(--border);\n}\n.input-group .input {\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n}\n.input-group .input:focus { box-shadow: none; }\n\n/* Checkbox / radio */\n.check {\n  display: inline-flex; align-items: center; gap: 8px;\n  cursor: pointer;\n  font-size: 13px;\n  color: var(--t-base);\n  user-select: none;\n}\n.check input { position: absolute; opacity: 0; pointer-events: none; }\n.check .box {\n  width: 16px; height: 16px;\n  border: 1.5px solid var(--t-light);\n  border-radius: 5px;\n  display: grid; place-items: center;\n  flex-shrink: 0;\n  transition: all 160ms;\n  background: var(--bg-card);\n}\n.check input:checked + .box {\n  background: var(--primary);\n  border-color: var(--primary);\n}\n.check input:checked + .box::after {\n  content: '';\n  width: 4px; height: 8px;\n  border: solid #fff;\n  border-width: 0 1.8px 1.8px 0;\n  transform: rotate(45deg) translate(-1px, -1px);\n}\n.check.radio .box { border-radius: 50%; }\n.check.radio input:checked + .box::after {\n  width: 7px; height: 7px;\n  border: 0;\n  border-radius: 50%;\n  background: #fff;\n  transform: none;\n}\n.check:hover .box { border-color: var(--primary); }\n.check input:disabled + .box { opacity: 0.5; cursor: not-allowed; }\n\n/* Toggle switch */\n.switch {\n  display: inline-flex; align-items: center; gap: 10px;\n  cursor: pointer;\n  font-size: 13px;\n  color: var(--t-base);\n  user-select: none;\n}\n.switch input { position: absolute; opacity: 0; pointer-events: none; }\n.switch .track {\n  width: 34px; height: 20px;\n  background: var(--bg-muted);\n  border: 1px solid var(--border);\n  border-radius: 999px;\n  position: relative;\n  transition: background 200ms;\n  flex-shrink: 0;\n}\n.switch .track::after {\n  content: '';\n  position: absolute;\n  top: 2px; left: 2px;\n  width: 14px; height: 14px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);\n  transition: transform 200ms cubic-bezier(.2,.7,.2,1);\n}\n.switch input:checked + .track {\n  background: var(--primary);\n  border-color: var(--primary);\n}\n.switch input:checked + .track::after {\n  transform: translateX(14px);\n}\n\n/* Form actions row */\n.form-actions {\n  display: flex; gap: 10px; align-items: center;\n  padding-top: 18px;\n  margin-top: 18px;\n  border-top: 1px solid var(--border-soft);\n}\n.form-actions .spacer { flex: 1; }\n","/* ============ UI ELEMENTS ============ */\n\n/* ---- Button variants (extends .btn from _components) ---- */\n.btn--secondary {\n  background: var(--bg-muted);\n  color: var(--t-base);\n  border-color: var(--border);\n}\n.btn--secondary:hover { background: var(--bg-hover); border-color: var(--t-light); }\n\n.btn--success { background: var(--success); color: #fff; }\n.btn--success:hover { background: color-mix(in oklab, var(--success) 90%, black); }\n.btn--danger  { background: var(--danger); color: #fff; }\n.btn--danger:hover { background: color-mix(in oklab, var(--danger) 90%, black); }\n.btn--warning { background: var(--warning); color: #fff; }\n.btn--warning:hover { background: color-mix(in oklab, var(--warning) 90%, black); }\n.btn--info    { background: var(--info); color: #fff; }\n.btn--info:hover { background: color-mix(in oklab, var(--info) 90%, black); }\n\n.btn--soft-primary { background: var(--primary-soft); color: var(--primary); }\n.btn--soft-primary:hover { background: color-mix(in oklab, var(--primary-soft) 80%, var(--primary) 8%); }\n.btn--soft-success { background: var(--success-soft); color: var(--success); }\n.btn--soft-danger  { background: var(--danger-soft);  color: var(--danger); }\n.btn--soft-warning { background: var(--warning-soft); color: var(--warning); }\n.btn--soft-info    { background: var(--info-soft);    color: var(--info); }\n\n.btn--outline-primary { background: transparent; color: var(--primary); border-color: var(--primary); }\n.btn--outline-primary:hover { background: var(--primary-soft); }\n.btn--outline-danger  { background: transparent; color: var(--danger); border-color: var(--danger); }\n.btn--outline-danger:hover { background: var(--danger-soft); }\n.btn--outline-success { background: transparent; color: var(--success); border-color: var(--success); }\n.btn--outline-success:hover { background: var(--success-soft); }\n\n.btn--lg { padding: 12px 18px; font-size: 14px; }\n.btn--sm { padding: 6px 10px; font-size: 11.5px; }\n.btn--icon { padding: 9px; }\n.btn--icon svg { margin: 0; }\n\n.btn-group {\n  display: inline-flex;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 0 0 1px var(--border);\n}\n.btn-group .btn {\n  border-radius: 0;\n  border: 0;\n  box-shadow: none;\n  border-right: 1px solid var(--border);\n}\n.btn-group .btn:last-child { border-right: 0; }\n.btn-group .btn.is-active {\n  background: var(--primary-soft);\n  color: var(--primary);\n}\n\n/* ---- Alert ---- */\n.alert {\n  display: grid;\n  grid-template-columns: 24px 1fr auto;\n  gap: 12px;\n  align-items: start;\n  padding: 14px 16px;\n  border-radius: 10px;\n  font-size: 13px;\n  line-height: 1.5;\n  background: var(--bg-muted);\n  color: var(--t-base);\n  border-left: 3px solid var(--t-muted);\n}\n.alert + .alert { margin-top: 10px; }\n.alert .ico {\n  width: 20px; height: 20px;\n  display: grid; place-items: center;\n  border-radius: 6px;\n  color: var(--t-muted);\n  flex-shrink: 0;\n}\n.alert .ico svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }\n.alert .body { min-width: 0; }\n.alert .title { font-weight: 600; color: var(--t-base); margin-bottom: 2px; }\n.alert .close {\n  width: 22px; height: 22px;\n  display: grid; place-items: center;\n  border-radius: 5px;\n  color: var(--t-light);\n  transition: background 160ms, color 160ms;\n}\n.alert .close:hover { background: var(--bg-hover); color: var(--t-base); }\n.alert .close svg { width: 12px; height: 12px; stroke: currentColor; stroke-width: 2; fill: none; }\n\n.alert.success { background: var(--success-soft); border-left-color: var(--success); }\n.alert.success .ico { background: color-mix(in oklab, var(--success) 14%, transparent); color: var(--success); }\n.alert.danger  { background: var(--danger-soft);  border-left-color: var(--danger); }\n.alert.danger  .ico { background: color-mix(in oklab, var(--danger) 14%, transparent); color: var(--danger); }\n.alert.warning { background: var(--warning-soft); border-left-color: var(--warning); }\n.alert.warning .ico { background: color-mix(in oklab, var(--warning) 14%, transparent); color: var(--warning); }\n.alert.info    { background: var(--info-soft);    border-left-color: var(--info); }\n.alert.info    .ico { background: color-mix(in oklab, var(--info) 14%, transparent); color: var(--info); }\n.alert.primary { background: var(--primary-soft); border-left-color: var(--primary); }\n.alert.primary .ico { background: color-mix(in oklab, var(--primary) 14%, transparent); color: var(--primary); }\n\n/* ---- Badge ---- */\n.badge {\n  display: inline-flex; align-items: center; gap: 4px;\n  font-size: 10.5px;\n  font-weight: 600;\n  padding: 3px 8px;\n  border-radius: 999px;\n  letter-spacing: 0.02em;\n  line-height: 1.4;\n  background: var(--bg-muted);\n  color: var(--t-muted);\n}\n.badge.primary { background: var(--primary-soft); color: var(--primary); }\n.badge.success { background: var(--success-soft); color: var(--success); }\n.badge.danger  { background: var(--danger-soft);  color: var(--danger); }\n.badge.warning { background: var(--warning-soft); color: var(--warning); }\n.badge.info    { background: var(--info-soft);    color: var(--info); }\n.badge.purple  { background: var(--purple-soft);  color: var(--purple); }\n.badge.solid {\n  background: var(--primary); color: #fff;\n}\n.badge.dot::before {\n  content: '';\n  width: 6px; height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n}\n\n/* ---- Progress ---- */\n.progress {\n  width: 100%;\n  height: 8px;\n  background: var(--bg-muted);\n  border-radius: 999px;\n  overflow: hidden;\n}\n.progress.thin { height: 4px; }\n.progress.tall { height: 14px; }\n.progress-fill {\n  height: 100%;\n  background: var(--primary);\n  border-radius: 999px;\n  transform-origin: left;\n  animation: bar-in 900ms cubic-bezier(.2,.7,.2,1) both;\n}\n.progress-fill.success { background: var(--success); }\n.progress-fill.danger  { background: var(--danger); }\n.progress-fill.warning { background: var(--warning); }\n.progress-fill.info    { background: var(--info); }\n.progress-fill.gradient { background: linear-gradient(90deg, var(--primary), var(--purple)); }\n.progress-fill.striped {\n  background-image: linear-gradient(45deg,\n    rgba(255,255,255,.16) 25%, transparent 25%,\n    transparent 50%, rgba(255,255,255,.16) 50%,\n    rgba(255,255,255,.16) 75%, transparent 75%, transparent);\n  background-size: 12px 12px;\n}\n\n/* ---- Spinner ---- */\n.spinner {\n  width: 22px; height: 22px;\n  border-radius: 50%;\n  border: 2.5px solid var(--bg-muted);\n  border-top-color: var(--primary);\n  animation: spin 700ms linear infinite;\n  display: inline-block;\n}\n.spinner.sm { width: 14px; height: 14px; border-width: 2px; }\n.spinner.lg { width: 36px; height: 36px; border-width: 3px; }\n@keyframes spin { to { transform: rotate(360deg); } }\n\n/* ---- Tabs ---- */\n.tabs {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid var(--border);\n  margin-bottom: 18px;\n}\n.tab {\n  padding: 10px 14px;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--t-muted);\n  border-bottom: 2px solid transparent;\n  transition: color 160ms, border-color 160ms;\n  position: relative;\n  top: 1px;\n  cursor: pointer;\n}\n.tab:hover { color: var(--t-base); }\n.tab.is-active {\n  color: var(--primary);\n  border-bottom-color: var(--primary);\n  font-weight: 600;\n}\n.tab .badge { margin-left: 6px; }\n\n.tabs.pills {\n  border-bottom: 0;\n  background: var(--bg-muted);\n  border-radius: 9px;\n  padding: 3px;\n  display: inline-flex;\n}\n.tabs.pills .tab {\n  border-radius: 7px;\n  border-bottom: 0;\n  top: 0;\n  padding: 7px 12px;\n  font-size: 12.5px;\n}\n.tabs.pills .tab.is-active {\n  background: var(--bg-card);\n  color: var(--t-base);\n  box-shadow: var(--shadow-sm);\n}\n\n.tab-panel { display: none; }\n.tab-panel.is-active { display: block; animation: rise-in 320ms ease both; }\n\n/* ---- Accordion ---- */\n.accordion { display: flex; flex-direction: column; gap: 8px; }\n.accordion-item {\n  border: 1px solid var(--border);\n  border-radius: 10px;\n  overflow: hidden;\n  background: var(--bg-card);\n}\n.accordion-trigger {\n  display: flex; align-items: center; justify-content: space-between;\n  width: 100%;\n  padding: 14px 16px;\n  font-size: 13.5px;\n  font-weight: 600;\n  color: var(--t-base);\n  text-align: left;\n  transition: background 160ms;\n}\n.accordion-trigger:hover { background: var(--bg-hover); }\n.accordion-trigger .chev {\n  width: 13px; height: 13px;\n  transition: transform 240ms ease;\n  color: var(--t-muted);\n}\n.accordion-trigger .chev svg { width: 100%; height: 100%; stroke: currentColor; stroke-width: 2; fill: none; }\n.accordion-item.is-open .accordion-trigger .chev { transform: rotate(180deg); }\n.accordion-body {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 320ms cubic-bezier(.4,0,.2,1);\n  font-size: 13px;\n  color: var(--t-muted);\n  line-height: 1.6;\n}\n.accordion-body-inner { padding: 0 16px 14px; }\n.accordion-item.is-open .accordion-body { max-height: 400px; }\n\n/* ---- Modal (static demo) ---- */\n.modal-demo {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-lg);\n  overflow: hidden;\n  max-width: 480px;\n}\n.modal-head {\n  display: flex; justify-content: space-between; align-items: center;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-soft);\n}\n.modal-title {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 15px;\n  color: var(--t-base);\n  letter-spacing: -0.012em;\n}\n.modal-body {\n  padding: 18px 20px;\n  font-size: 13.5px;\n  color: var(--t-muted);\n  line-height: 1.6;\n}\n.modal-foot {\n  display: flex; justify-content: flex-end; gap: 8px;\n  padding: 14px 20px;\n  border-top: 1px solid var(--border-soft);\n  background: var(--bg-card);\n}\n\n/* ---- Tooltip / Popover (static demo positioning) ---- */\n.popover-demo {\n  position: relative;\n  display: inline-block;\n}\n.popover-demo .pop {\n  position: absolute;\n  bottom: calc(100% + 10px);\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--t-base);\n  color: var(--bg-card);\n  font-size: 11.5px;\n  font-weight: 500;\n  padding: 6px 10px;\n  border-radius: 6px;\n  white-space: nowrap;\n  box-shadow: var(--shadow-lg);\n}\n.popover-demo .pop::after {\n  content: '';\n  position: absolute;\n  top: 100%; left: 50%;\n  transform: translateX(-50%);\n  border: 5px solid transparent;\n  border-top-color: var(--t-base);\n}\n\n/* ---- Avatar group ---- */\n.avatar-group {\n  display: inline-flex;\n  align-items: center;\n}\n.avatar-group .av {\n  width: 32px; height: 32px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  color: #fff;\n  font-size: 11.5px;\n  font-weight: 600;\n  border: 2px solid var(--bg-card);\n  margin-left: -8px;\n  flex-shrink: 0;\n}\n.avatar-group .av:first-child { margin-left: 0; }\n.avatar-group .av.more {\n  background: var(--bg-muted);\n  color: var(--t-muted);\n  font-size: 10.5px;\n}\n\n/* ---- Section heading helper ---- */\n.section-h {\n  display: flex; align-items: baseline; gap: 12px;\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 15px;\n  color: var(--t-base);\n  letter-spacing: -0.012em;\n  margin: 0 0 14px;\n}\n.section-h .num {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 11px;\n  color: var(--t-light);\n  font-weight: 500;\n  letter-spacing: 0.06em;\n}\n\n.demo-row {\n  display: flex; flex-wrap: wrap; gap: 10px; align-items: center;\n}\n","/* ============ AUTH PAGES ============ */\n\n.auth-shell {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n  background: var(--bg-body);\n}\n\n/* Responsive override for .auth-aside lives in _responsive.scss to win over\n   the default rules below — see chat note for why. */\n\n.auth-aside {\n  position: relative;\n  background: linear-gradient(135deg, var(--primary), var(--purple));\n  color: #fff;\n  padding: 40px 48px;\n  display: flex; flex-direction: column;\n  overflow: hidden;\n}\n.auth-aside::before {\n  content: '';\n  position: absolute;\n  inset: -40% -20% auto auto;\n  width: 80%; aspect-ratio: 1;\n  background: radial-gradient(circle, rgba(255,255,255,.18), transparent 60%);\n  pointer-events: none;\n}\n.auth-aside::after {\n  content: '';\n  position: absolute;\n  inset: auto auto -30% -20%;\n  width: 80%; aspect-ratio: 1;\n  background: radial-gradient(circle, rgba(255,255,255,.10), transparent 60%);\n  pointer-events: none;\n}\n\n.auth-brand {\n  display: flex; align-items: center; gap: 10px;\n  position: relative; z-index: 1;\n}\n.auth-brand .logo {\n  width: 36px; height: 36px;\n  background: rgba(255,255,255,0.18);\n  border: 1px solid rgba(255,255,255,0.25);\n  backdrop-filter: blur(6px);\n  border-radius: 9px;\n  display: grid; place-items: center;\n}\n.auth-brand .logo svg { width: 20px; height: 20px; }\n.auth-brand .name {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: -0.018em;\n}\n\n.auth-aside-body {\n  margin-top: auto;\n  position: relative; z-index: 1;\n  max-width: 440px;\n}\n.auth-aside-eyebrow {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,.7);\n  margin-bottom: 14px;\n  display: block;\n}\n.auth-aside h1 {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: clamp(28px, 3vw, 38px);\n  letter-spacing: -0.025em;\n  line-height: 1.15;\n  margin: 0 0 14px;\n}\n.auth-aside p {\n  font-size: 14.5px;\n  color: rgba(255,255,255,.85);\n  line-height: 1.6;\n  margin: 0 0 24px;\n}\n\n.auth-quote {\n  margin-top: 32px;\n  padding: 18px 20px;\n  border: 1px solid rgba(255,255,255,0.18);\n  background: rgba(255,255,255,0.08);\n  backdrop-filter: blur(6px);\n  border-radius: 12px;\n  font-size: 13px;\n  color: rgba(255,255,255,.9);\n  line-height: 1.6;\n}\n.auth-quote-author {\n  display: flex; align-items: center; gap: 10px;\n  margin-top: 14px;\n  font-size: 12px;\n  color: rgba(255,255,255,.75);\n}\n.auth-quote-author .av {\n  width: 28px; height: 28px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.22);\n  display: grid; place-items: center;\n  font-size: 11px; font-weight: 600;\n}\n\n.auth-aside-footer {\n  margin-top: auto;\n  padding-top: 24px;\n  position: relative; z-index: 1;\n  display: flex; gap: 18px;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: rgba(255,255,255,.55);\n  letter-spacing: 0.06em;\n}\n\n.auth-main {\n  display: flex; flex-direction: column;\n  padding: 32px 48px;\n  min-height: 100vh;\n}\n\n.auth-main-top {\n  display: flex; justify-content: space-between; align-items: center;\n}\n.auth-main-top .switch-link {\n  font-size: 12.5px;\n  color: var(--t-muted);\n}\n.auth-main-top .switch-link a {\n  color: var(--primary);\n  font-weight: 600;\n  margin-left: 4px;\n}\n\n.auth-card {\n  width: 100%;\n  max-width: 400px;\n  margin: auto;\n  padding: 8px 0;\n}\n.auth-card h2 {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 26px;\n  letter-spacing: -0.022em;\n  color: var(--t-base);\n  margin: 0 0 6px;\n}\n.auth-card .sub {\n  font-size: 13.5px;\n  color: var(--t-muted);\n  margin: 0 0 24px;\n  line-height: 1.55;\n}\n\n.auth-form { display: flex; flex-direction: column; gap: 14px; }\n.auth-form .field-row {\n  display: flex; justify-content: space-between; align-items: center;\n}\n.auth-form .field-row a {\n  color: var(--primary);\n  font-size: 12px;\n  font-weight: 600;\n}\n.auth-submit { margin-top: 4px; }\n.auth-submit.btn { padding: 11px 14px; }\n\n.auth-divider {\n  display: flex; align-items: center; gap: 12px;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  margin: 18px 0;\n}\n.auth-divider::before,\n.auth-divider::after {\n  content: '';\n  flex: 1;\n  height: 1px;\n  background: var(--border);\n}\n\n.social-row {\n  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;\n}\n.social-btn {\n  display: inline-flex; align-items: center; justify-content: center; gap: 8px;\n  padding: 9px 12px;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--bg-card);\n  color: var(--t-base);\n  font-size: 12.5px;\n  font-weight: 600;\n  transition: border-color 160ms, box-shadow 160ms, background 160ms;\n}\n.social-btn:hover { border-color: var(--t-light); box-shadow: var(--shadow-sm); }\n.social-btn svg { width: 14px; height: 14px; }\n\n.auth-main-bottom {\n  margin-top: 24px;\n  font-size: 11.5px;\n  color: var(--t-light);\n  text-align: center;\n}\n.auth-main-bottom a { color: var(--t-muted); }\n","/* ============ ERROR PAGES (404 / 500) ============ */\n\n.error-shell {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 32px;\n  background: var(--bg-body);\n  position: relative;\n  overflow: hidden;\n}\n.error-shell::before {\n  content: '';\n  position: absolute;\n  inset: -20% -10% auto auto;\n  width: 60vmax; aspect-ratio: 1;\n  background: radial-gradient(circle, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%);\n  pointer-events: none;\n}\n.error-shell::after {\n  content: '';\n  position: absolute;\n  inset: auto auto -20% -10%;\n  width: 60vmax; aspect-ratio: 1;\n  background: radial-gradient(circle, color-mix(in oklab, var(--purple) 8%, transparent), transparent 70%);\n  pointer-events: none;\n}\n\n.error-card {\n  position: relative;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 18px;\n  box-shadow: var(--shadow-lg);\n  padding: 48px 56px;\n  max-width: 540px;\n  width: 100%;\n  text-align: center;\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n}\n@media (max-width: 600px) {\n  .error-card { padding: 32px 24px; }\n}\n\n.error-eyebrow {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 11px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  margin-bottom: 14px;\n  display: block;\n}\n.error-code {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: clamp(96px, 16vw, 160px);\n  line-height: 0.95;\n  letter-spacing: -0.05em;\n  background: linear-gradient(135deg, var(--primary), var(--purple));\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  margin-bottom: 8px;\n}\n.error-title {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 24px;\n  letter-spacing: -0.022em;\n  color: var(--t-base);\n  margin: 0 0 10px;\n}\n.error-sub {\n  font-size: 14px;\n  color: var(--t-muted);\n  line-height: 1.6;\n  margin: 0 0 24px;\n  max-width: 40ch;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.error-actions {\n  display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;\n}\n\n.error-meta {\n  margin-top: 28px;\n  padding-top: 18px;\n  border-top: 1px dashed var(--border);\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  color: var(--t-light);\n  letter-spacing: 0.06em;\n  display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;\n}\n.error-meta strong { color: var(--t-muted); font-weight: 600; }\n","/* ============ CHAT PAGE ============ */\n\n.chat-shell {\n  display: grid;\n  grid-template-columns: 280px minmax(0, 1fr);\n  gap: 20px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n  overflow: hidden;\n  height: calc(100vh - 220px);\n  min-height: 560px;\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n}\n\n/* Responsive overrides for chat live in _responsive.scss so they win over\n   the default rules below (Sass preserves source order, so a @media block\n   placed before the default rules would be defeated by the same-specificity\n   later rule). */\n\n/* ---- Conversations rail ---- */\n.chat-rail {\n  display: flex; flex-direction: column;\n  border-right: 1px solid var(--border-soft);\n  background: var(--bg-card);\n  min-width: 0;\n  min-height: 0;     /* let the rail honour the shell's row height in CSS Grid */\n  overflow: hidden;  /* mirrors .chat-pane — needed so .chat-list-scroll's overflow-y: auto actually engages instead of growing past the rail */\n}\n.chat-rail-head {\n  padding: 14px 16px;\n  border-bottom: 1px solid var(--border-soft);\n  display: flex; flex-direction: column; gap: 12px;\n}\n.chat-rail-title-row {\n  display: flex; align-items: center; justify-content: space-between;\n}\n.chat-rail-title {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 14.5px;\n  color: var(--t-base);\n  letter-spacing: -0.012em;\n}\n.chat-rail-title .meta {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  font-weight: 500;\n  margin-left: 8px;\n  letter-spacing: 0.04em;\n}\n\n.chat-search {\n  position: relative;\n}\n.chat-search input {\n  width: 100%;\n  padding: 8px 10px 8px 32px;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--bg-muted);\n  font-size: 12.5px;\n  color: var(--t-base);\n  outline: 0;\n  transition: border-color 180ms, box-shadow 180ms, background 180ms;\n}\n.chat-search input::placeholder { color: var(--t-light); }\n.chat-search input:focus {\n  border-color: var(--primary);\n  background: var(--bg-card);\n  box-shadow: 0 0 0 3px var(--primary-soft);\n}\n.chat-search svg {\n  position: absolute;\n  left: 10px; top: 50%; transform: translateY(-50%);\n  width: 13px; height: 13px;\n  stroke: var(--t-light); stroke-width: 2; fill: none;\n  pointer-events: none;\n}\n\n.chat-list-scroll { flex: 1; overflow-y: auto; padding: 4px 0; }\n.chat-list-scroll::-webkit-scrollbar { width: 4px; }\n.chat-list-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.chat-conv {\n  display: grid;\n  grid-template-columns: 38px 1fr;\n  gap: 10px;\n  padding: 11px 16px;\n  border-bottom: 1px solid var(--border-soft);\n  cursor: pointer;\n  transition: background 160ms ease;\n  position: relative;\n}\n.chat-conv:hover { background: var(--bg-hover); }\n.chat-conv.is-active {\n  background: var(--primary-soft);\n  box-shadow: inset 3px 0 0 var(--primary);\n}\n.chat-conv-avatar {\n  width: 38px; height: 38px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 12px;\n  flex-shrink: 0;\n  position: relative;\n}\n.chat-conv-avatar .presence {\n  position: absolute;\n  bottom: 0; right: 0;\n  width: 10px; height: 10px;\n  border-radius: 50%;\n  background: var(--success);\n  border: 2px solid var(--bg-card);\n}\n.chat-conv-avatar .presence.away { background: var(--warning); }\n.chat-conv-avatar .presence.off  { background: var(--t-light); }\n\n.chat-conv-body { min-width: 0; display: flex; flex-direction: column; gap: 2px; }\n.chat-conv-top {\n  display: flex; align-items: baseline; justify-content: space-between;\n  gap: 6px;\n}\n.chat-conv-name {\n  font-size: 13px;\n  color: var(--t-base);\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.chat-conv-time {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n  flex-shrink: 0;\n}\n.chat-conv-preview {\n  font-size: 12px;\n  color: var(--t-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.chat-conv.is-unread .chat-conv-preview { color: var(--t-base); font-weight: 500; }\n.chat-conv.is-unread .chat-conv-time { color: var(--primary); }\n.chat-conv-badge {\n  position: absolute;\n  right: 14px; top: 14px;\n  min-width: 18px; height: 18px;\n  padding: 0 6px;\n  border-radius: 999px;\n  background: var(--primary);\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  display: grid; place-items: center;\n}\n\n/* ---- Conversation pane ---- */\n.chat-pane {\n  display: flex; flex-direction: column;\n  background: var(--bg-card);\n  min-width: 0;\n  overflow: hidden;\n}\n.chat-pane-head {\n  display: flex; align-items: center; gap: 12px;\n  padding: 14px 22px;\n  border-bottom: 1px solid var(--border-soft);\n}\n.chat-pane-head .av {\n  width: 38px; height: 38px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 12px;\n  position: relative;\n}\n.chat-pane-head .av .presence {\n  position: absolute;\n  bottom: 0; right: 0;\n  width: 10px; height: 10px;\n  border-radius: 50%;\n  background: var(--success);\n  border: 2px solid var(--bg-card);\n}\n.chat-pane-head .meta { line-height: 1.3; min-width: 0; flex: 1; }\n.chat-pane-head .name { font-size: 14px; font-weight: 600; color: var(--t-base); }\n.chat-pane-head .status {\n  font-size: 11.5px; color: var(--t-muted);\n  display: flex; align-items: center; gap: 4px;\n}\n.chat-pane-head .status .dot {\n  width: 6px; height: 6px;\n  border-radius: 50%;\n  background: var(--success);\n}\n.chat-pane-head-tools { display: flex; gap: 2px; }\n\n.chat-thread {\n  flex: 1;\n  overflow-y: auto;\n  padding: 22px 28px;\n  background: var(--bg-muted);\n  display: flex; flex-direction: column; gap: 16px;\n}\n.chat-thread::-webkit-scrollbar { width: 5px; }\n.chat-thread::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.chat-day-sep {\n  display: flex; align-items: center; gap: 10px;\n  margin: 6px 0;\n  color: var(--t-light);\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n}\n.chat-day-sep::before,\n.chat-day-sep::after {\n  content: '';\n  flex: 1;\n  height: 1px;\n  background: var(--border);\n}\n\n.chat-msg { display: flex; gap: 10px; max-width: min(75%, 600px); }\n.chat-msg.me { margin-left: auto; flex-direction: row-reverse; }\n.chat-msg-av {\n  width: 32px; height: 32px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 11.5px;\n  flex-shrink: 0;\n  align-self: flex-end;\n}\n.chat-msg-av.me { background: linear-gradient(135deg, var(--primary), var(--purple)); }\n.chat-msg-stack { display: flex; flex-direction: column; gap: 4px; min-width: 0; }\n.chat-msg.me .chat-msg-stack { align-items: flex-end; }\n.chat-bub {\n  padding: 10px 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  border-top-left-radius: 4px;\n  font-size: 13.5px;\n  color: var(--t-base);\n  line-height: 1.5;\n  box-shadow: var(--shadow-sm);\n  word-wrap: break-word;\n}\n.chat-msg.me .chat-bub {\n  background: var(--primary); color: #fff; border-color: var(--primary);\n  border-top-left-radius: 14px;\n  border-top-right-radius: 4px;\n}\n.chat-msg-meta {\n  display: flex; gap: 6px; align-items: center;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n  padding: 0 4px;\n}\n.chat-msg-meta .read { color: var(--primary); }\n\n.chat-typing {\n  display: flex; align-items: center; gap: 8px;\n  font-size: 11.5px;\n  color: var(--t-muted);\n  margin-top: 4px;\n}\n.chat-typing-dots {\n  display: inline-flex; gap: 3px;\n}\n.chat-typing-dots span {\n  width: 4px; height: 4px;\n  background: var(--t-light);\n  border-radius: 50%;\n  animation: typing 1.2s infinite ease-in-out;\n}\n.chat-typing-dots span:nth-child(2) { animation-delay: 0.15s; }\n.chat-typing-dots span:nth-child(3) { animation-delay: 0.3s; }\n@keyframes typing {\n  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }\n  30% { opacity: 1; transform: translateY(-3px); }\n}\n\n.chat-composer {\n  padding: 14px 22px 18px;\n  border-top: 1px solid var(--border-soft);\n  background: var(--bg-card);\n}\n.chat-composer-input {\n  display: flex; align-items: end; gap: 8px;\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  background: var(--bg-muted);\n  padding: 8px 10px;\n  transition: border-color 180ms, box-shadow 180ms;\n}\n.chat-composer-input:focus-within {\n  border-color: var(--primary);\n  background: var(--bg-card);\n  box-shadow: 0 0 0 3px var(--primary-soft);\n}\n.chat-composer-input textarea {\n  flex: 1;\n  background: transparent;\n  border: 0; outline: 0;\n  resize: none;\n  min-height: 22px;\n  max-height: 120px;\n  font-size: 13.5px;\n  color: var(--t-base);\n  padding: 4px 4px;\n  font-family: inherit;\n  line-height: 1.5;\n}\n.chat-composer-input textarea::placeholder { color: var(--t-light); }\n.chat-composer-tools {\n  display: flex; gap: 2px; align-items: center;\n  flex-shrink: 0;\n}\n.chat-composer-tools .tool {\n  width: 28px; height: 28px;\n  display: grid; place-items: center;\n  border-radius: 6px;\n  color: var(--t-muted);\n  transition: background 160ms, color 160ms;\n}\n.chat-composer-tools .tool:hover { background: var(--bg-hover); color: var(--t-base); }\n.chat-composer-tools .tool svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 1.8; fill: none; }\n.chat-composer-send {\n  width: 32px; height: 32px;\n  border-radius: 8px;\n  background: var(--primary); color: #fff;\n  display: grid; place-items: center;\n  transition: background 180ms;\n  flex-shrink: 0;\n}\n.chat-composer-send:hover { background: var(--primary-dark); }\n.chat-composer-send svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }\n","/* ============ DATA TABLE / RICH TABLE ============ */\n\n.data-toolbar {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.data-toolbar-left { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 240px; }\n.data-toolbar-right { display: flex; align-items: center; gap: 8px; }\n.data-toolbar .input-icon { flex: 1; max-width: 320px; }\n\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.data-table thead th {\n  position: sticky; top: 0;\n  background: var(--bg-card);\n  text-align: left;\n  padding: 12px 14px;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  font-weight: 500;\n  border-bottom: 1px solid var(--border);\n  white-space: nowrap;\n}\n.data-table thead th .sort {\n  display: inline-flex; vertical-align: middle;\n  margin-left: 4px;\n  color: var(--t-light);\n}\n.data-table thead th.sorted-asc .sort,\n.data-table thead th.sorted-desc .sort {\n  color: var(--primary);\n}\n.data-table thead th.sorted-asc .sort svg { transform: rotate(180deg); }\n.data-table thead th .sort svg { width: 10px; height: 10px; stroke: currentColor; stroke-width: 2; fill: none; transition: transform 160ms; }\n\n.data-table tbody td {\n  padding: 12px 14px;\n  font-size: 13px;\n  color: var(--t-base);\n  border-bottom: 1px solid var(--border-soft);\n  white-space: nowrap;\n}\n.data-table tbody tr { transition: background 140ms; }\n.data-table tbody tr:hover td { background: var(--bg-hover); }\n.data-table tbody tr.is-selected td { background: var(--primary-soft); }\n\n.data-cell-user {\n  display: flex; align-items: center; gap: 10px;\n  min-width: 0;\n}\n.data-cell-user .av {\n  width: 30px; height: 30px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 11px;\n  flex-shrink: 0;\n}\n.data-cell-user-meta { line-height: 1.3; min-width: 0; }\n.data-cell-user-name { font-size: 13px; font-weight: 600; color: var(--t-base); }\n.data-cell-user-email {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 11px;\n  color: var(--t-muted);\n  letter-spacing: 0.02em;\n}\n\n.data-cell-mono {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 12px;\n  color: var(--t-muted);\n  letter-spacing: 0.02em;\n}\n\n.data-cell-actions {\n  display: flex; gap: 2px;\n}\n.data-cell-actions .btn--icon {\n  padding: 6px;\n  background: transparent;\n  border: 0;\n  color: var(--t-muted);\n  border-radius: 6px;\n  transition: background 140ms, color 140ms;\n}\n.data-cell-actions .btn--icon:hover { background: var(--bg-hover); color: var(--t-base); }\n.data-cell-actions .btn--icon svg { width: 13px; height: 13px; stroke: currentColor; stroke-width: 1.8; fill: none; }\n\n.data-foot {\n  display: flex; align-items: center; justify-content: space-between;\n  padding-top: 16px;\n  margin-top: 4px;\n  border-top: 1px solid var(--border-soft);\n  font-size: 12px;\n  color: var(--t-muted);\n}\n.data-foot-info {\n  display: flex; align-items: center; gap: 16px;\n}\n.data-foot-info .select { width: auto; padding: 6px 28px 6px 10px; font-size: 12px; }\n\n.pager {\n  display: flex; gap: 4px; align-items: center;\n}\n.pager-btn {\n  min-width: 30px; height: 30px;\n  padding: 0 8px;\n  display: grid; place-items: center;\n  border-radius: 7px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--t-muted);\n  transition: background 160ms, color 160ms;\n}\n.pager-btn:hover:not(:disabled) { background: var(--bg-hover); color: var(--t-base); }\n.pager-btn.is-active {\n  background: var(--primary);\n  color: #fff;\n}\n.pager-btn:disabled { opacity: 0.4; cursor: not-allowed; }\n.pager-btn svg { width: 12px; height: 12px; stroke: currentColor; stroke-width: 2; fill: none; }\n","/* ============ CHARTS PAGE ============ */\n\n.chart-pad { position: relative; padding: 8px 0 4px; }\n.chart-canvas-wrap {\n  position: relative;\n  width: 100%;\n  min-height: 240px;\n}\n\n.chart-legend {\n  display: flex; flex-wrap: wrap; gap: 14px;\n  margin-top: 14px;\n  padding-top: 14px;\n  border-top: 1px solid var(--border-soft);\n}\n.chart-legend-item {\n  display: inline-flex; align-items: center; gap: 8px;\n  font-size: 12px;\n  color: var(--t-muted);\n}\n.chart-legend-item .swatch {\n  width: 10px; height: 10px;\n  border-radius: 3px;\n  flex-shrink: 0;\n}\n\n.chart-meta-row {\n  display: flex; gap: 18px;\n  padding-top: 14px;\n  border-top: 1px dashed var(--border-soft);\n  margin-top: 14px;\n  flex-wrap: wrap;\n}\n.chart-meta-cell { display: flex; flex-direction: column; gap: 3px; min-width: 90px; }\n.chart-meta-label { font-size: 10.5px; color: var(--t-light); text-transform: uppercase; letter-spacing: 0.1em; font-family: 'JetBrains Mono', monospace; }\n.chart-meta-value {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 17px;\n  letter-spacing: -0.02em;\n  color: var(--t-base);\n}\n.chart-meta-value.up { color: var(--success); }\n.chart-meta-value.down { color: var(--danger); }\n","/* ============ DASHBOARD-SPECIFIC ============ */\n\n/* KPI grid */\n.kpi-grid {\n  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n}\n.kpi-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 22px 22px 20px;\n  box-shadow: var(--shadow-card);\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n  position: relative;\n  overflow: hidden;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  transition: transform 220ms cubic-bezier(.2,.7,.2,1),\n              box-shadow 220ms ease,\n              border-color 220ms ease;\n}\n.kpi-card::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto auto;\n  width: 180px; height: 180px;\n  background: radial-gradient(circle at top right, currentColor, transparent 65%);\n  opacity: 0.08;\n  pointer-events: none;\n  transition: opacity 220ms ease;\n}\n.kpi-card:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-lg);\n}\n.kpi-card:hover::before { opacity: 0.14; }\n.kpi-card.c-success { color: var(--success); }\n.kpi-card.c-danger  { color: var(--danger); }\n.kpi-card.c-purple  { color: var(--purple); }\n.kpi-card.c-primary { color: var(--primary); }\n\n.kpi-card:nth-child(1) { animation-delay: 60ms; }\n.kpi-card:nth-child(2) { animation-delay: 120ms; }\n.kpi-card:nth-child(3) { animation-delay: 180ms; }\n.kpi-card:nth-child(4) { animation-delay: 240ms; }\n\n.kpi-top {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: 12px;\n  position: relative;\n}\n.kpi-identity {\n  display: flex; align-items: center; gap: 10px;\n  min-width: 0;\n}\n\n.kpi-icon {\n  width: 32px; height: 32px;\n  border-radius: 9px;\n  display: grid; place-items: center;\n  flex-shrink: 0;\n}\n.kpi-icon svg { width: 15px; height: 15px; stroke: currentColor; stroke-width: 1.9; fill: none; }\n.kpi-icon.primary { background: var(--primary-soft); color: var(--primary); }\n.kpi-icon.success { background: var(--success-soft); color: var(--success); }\n.kpi-icon.info    { background: var(--info-soft);    color: var(--info); }\n.kpi-icon.purple  { background: var(--purple-soft);  color: var(--purple); }\n.kpi-icon.danger  { background: var(--danger-soft);  color: var(--danger); }\n.kpi-icon.warning { background: var(--warning-soft); color: var(--warning); }\n\n.kpi-label {\n  font-size: 13px;\n  color: var(--t-muted);\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.kpi-value {\n  font-family: 'Inter Tight', 'Inter', sans-serif;\n  font-weight: 700;\n  font-size: 44px;\n  line-height: 1;\n  letter-spacing: -0.035em;\n  color: var(--t-base);\n  position: relative;\n}\n.kpi-value sup {\n  font-size: 17px;\n  color: var(--t-muted);\n  vertical-align: top;\n  font-weight: 500;\n  margin-left: 3px;\n  line-height: 2.1;\n}\n\n.kpi-compare {\n  display: flex; align-items: center; gap: 7px;\n  font-size: 12px;\n  color: var(--t-light);\n  font-weight: 500;\n  padding-top: 12px;\n  border-top: 1px dashed var(--border-soft);\n  margin-top: auto;\n}\n.kpi-compare strong {\n  color: var(--t-base);\n  font-weight: 600;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 11.5px;\n  letter-spacing: -0.01em;\n}\n.kpi-compare svg {\n  width: 11px; height: 11px;\n  stroke: currentColor;\n  stroke-width: 2.2;\n  fill: none;\n  flex-shrink: 0;\n}\n.kpi-compare .up   { color: var(--success); }\n.kpi-compare .down { color: var(--danger); }\n.kpi-compare .flat { color: var(--purple); }\n.kpi-compare .info { color: var(--info); }\n.kpi-compare .sep { color: var(--t-light); opacity: 0.45; font-weight: 400; }\n\n.kpi-pill {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  font-weight: 500;\n  padding: 4px 9px;\n  border-radius: 999px;\n  display: inline-flex; align-items: center; gap: 4px;\n  letter-spacing: 0.02em;\n  flex-shrink: 0;\n}\n.kpi-pill.up   { background: var(--success-soft); color: var(--success); }\n.kpi-pill.down { background: var(--danger-soft);  color: var(--danger); }\n.kpi-pill.flat { background: var(--purple-soft);  color: var(--purple); }\n.kpi-pill.info { background: var(--info-soft);    color: var(--info); }\n.kpi-pill svg { width: 10px; height: 10px; stroke: currentColor; stroke-width: 2.5; fill: none; }\n\n/* Site Visits regional + radials */\n.sv-regions {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 36px;\n}\n.sv-region { display: flex; flex-direction: column; gap: 10px; min-width: 0; }\n.sv-region-head {\n  display: flex; align-items: center; gap: 9px;\n  font-size: 13px;\n  color: var(--t-muted);\n  font-weight: 500;\n}\n.sv-region-head .marker { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }\n.sv-region-value {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 28px;\n  color: var(--t-base);\n  letter-spacing: -0.03em;\n  line-height: 1.05;\n  display: flex; align-items: baseline; gap: 8px;\n}\n.sv-region-value .pct {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 11.5px;\n  color: var(--t-light);\n  font-weight: 500;\n  letter-spacing: 0.02em;\n}\n.sv-region-bar {\n  height: 3px;\n  background: var(--bg-muted);\n  border-radius: 99px;\n  overflow: hidden;\n  margin-top: 2px;\n}\n.sv-region-bar-fill {\n  height: 100%;\n  border-radius: 99px;\n  transform-origin: left;\n  animation: bar-in 900ms cubic-bezier(.2,.7,.2,1) 300ms both;\n}\n\n.sv-divider {\n  height: 1px;\n  background: var(--border-soft);\n  margin: 28px 0;\n}\n\n.sv-radials {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 28px;\n}\n.sv-radial {\n  display: grid;\n  grid-template-columns: 72px 1fr;\n  gap: 16px;\n  align-items: center;\n}\n.sv-radial-chart {\n  width: 72px; height: 72px;\n  position: relative;\n  flex-shrink: 0;\n}\n.sv-radial-chart svg { width: 100%; height: 100%; transform: rotate(-90deg); }\n.radial-track { stroke: var(--bg-muted); stroke-width: 5; fill: none; }\n.radial-fill  { stroke-width: 5; fill: none; stroke-linecap: round; }\n.radial-fill.danger  { stroke: var(--danger); }\n.radial-fill.info    { stroke: var(--info); }\n.radial-fill.warning { stroke: var(--warning); }\n.sv-radial-chart .pct {\n  position: absolute;\n  left: 50%; top: 50%;\n  transform: translate(-50%, -50%);\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 15px;\n  color: var(--t-base);\n  letter-spacing: -0.022em;\n}\n.sv-radial-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }\n.sv-radial-name {\n  font-size: 13.5px;\n  font-weight: 600;\n  color: var(--t-base);\n  letter-spacing: -0.005em;\n}\n.sv-radial-caption {\n  font-size: 11.5px;\n  color: var(--t-muted);\n}\n\n/* Monthly chart */\n.chart-svg { width: 100%; height: auto; display: block; }\n.chart-svg .grid-line { stroke: var(--border-soft); stroke-width: 1; stroke-dasharray: 2 4; }\n.chart-svg .axis-label { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; fill: var(--t-light); letter-spacing: 0.04em; }\n.chart-svg .area { fill: url(\"#chartGrad\"); }\n.chart-svg .line {\n  fill: none; stroke: var(--primary); stroke-width: 2.2;\n  stroke-linecap: round; stroke-linejoin: round;\n  stroke-dasharray: 2400;\n  stroke-dashoffset: 2400;\n  animation: draw 1400ms cubic-bezier(.55,.15,.2,1) 400ms forwards;\n}\n.chart-svg .dot-peak { fill: var(--primary); stroke: var(--bg-card); stroke-width: 3; opacity: 0; animation: fade-in 600ms ease 1400ms forwards; }\n\n.monthly-footer {\n  display: grid; grid-template-columns: repeat(4, 1fr);\n  gap: 18px;\n  padding-top: 18px;\n  border-top: 1px solid var(--border-soft);\n  margin-top: 18px;\n}\n.stat-cell {\n  display: flex; flex-direction: column; gap: 4px;\n}\n.stat-cell-label { font-size: 11px; color: var(--t-muted); font-weight: 500; }\n.stat-cell-value {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  letter-spacing: -0.022em;\n  color: var(--t-base);\n  display: flex; align-items: center; gap: 6px;\n}\n.stat-cell-value .trend-ic { width: 11px; height: 11px; color: var(--success); flex-shrink: 0; }\n\n/* Todo list */\n.todo-list { display: flex; flex-direction: column; }\n.todo-item {\n  display: grid; grid-template-columns: 20px 1fr auto; gap: 12px;\n  align-items: center;\n  padding: 11px 0;\n  border-bottom: 1px solid var(--border-soft);\n}\n.todo-item:last-child { border-bottom: 0; }\n.todo-check {\n  appearance: none; -webkit-appearance: none;\n  width: 18px; height: 18px;\n  border: 1.5px solid var(--t-light);\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  transition: all 160ms ease;\n  background: transparent;\n}\n.todo-check:hover { border-color: var(--primary); }\n.todo-check:checked {\n  background: var(--primary);\n  border-color: var(--primary);\n}\n.todo-check:checked::after {\n  content: '';\n  position: absolute;\n  left: 5px; top: 1px;\n  width: 4px; height: 9px;\n  border: solid #fff;\n  border-width: 0 1.8px 1.8px 0;\n  transform: rotate(45deg);\n}\n.todo-item.is-done .todo-text { color: var(--t-light); text-decoration: line-through; text-decoration-thickness: 1.5px; }\n.todo-text { font-size: 13.5px; color: var(--t-base); cursor: pointer; }\n.todo-badge {\n  font-size: 10.5px;\n  font-weight: 600;\n  padding: 3px 9px;\n  border-radius: 999px;\n  letter-spacing: 0.02em;\n  line-height: 1;\n}\n.todo-badge.low      { background: var(--bg-muted); color: var(--t-muted); }\n.todo-badge.upcoming { background: var(--info-soft); color: var(--info); }\n.todo-badge.urgent   { background: var(--danger-soft); color: var(--danger); }\n.todo-badge.warn     { background: var(--warning-soft); color: var(--warning); }\n.todo-badge.done     { background: var(--success-soft); color: var(--success); }\n\n/* Sales report */\n.sales-summary {\n  display: flex; justify-content: space-between; align-items: flex-end;\n  padding: 0 0 20px;\n  margin-bottom: 4px;\n}\n.sales-summary-label .eyebrow { display: block; margin-bottom: 4px; }\n.sales-summary h4 {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 600;\n  font-size: 15px;\n  color: var(--t-base);\n  margin: 0;\n}\n.sales-summary-total {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 28px;\n  letter-spacing: -0.03em;\n  color: var(--t-base);\n  line-height: 1;\n}\n.sales-summary-total sup { font-size: 15px; color: var(--t-muted); vertical-align: top; font-weight: 500; margin-right: 1px; line-height: 2; }\n\n.sales-all {\n  padding: 18px 0 0;\n  text-align: center;\n  margin-top: 6px;\n  border-top: 1px solid var(--border-soft);\n}\n.sales-all a {\n  font-size: 12.5px;\n  color: var(--primary);\n  font-weight: 600;\n  display: inline-flex; align-items: center; gap: 5px;\n  transition: color 180ms;\n}\n.sales-all a:hover { color: var(--primary-dark); }\n.sales-all svg { width: 12px; height: 12px; stroke: currentColor; stroke-width: 2.2; fill: none; }\n\n/* Weather */\n.wx-hero {\n  display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;\n  padding: 8px 0;\n}\n.wx-temp-block { display: flex; align-items: center; gap: 16px; }\n.wx-icon {\n  width: 60px; height: 60px;\n  border-radius: 16px;\n  background: linear-gradient(135deg, var(--info-soft), var(--primary-soft));\n  color: var(--info);\n  display: grid; place-items: center;\n  flex-shrink: 0;\n}\n.wx-icon svg { width: 34px; height: 34px; stroke: currentColor; stroke-width: 1.3; fill: none; }\n.wx-temp {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 44px;\n  line-height: 1;\n  letter-spacing: -0.035em;\n  color: var(--t-base);\n}\n.wx-temp sup { font-size: 18px; color: var(--t-muted); vertical-align: top; font-weight: 500; line-height: 1.6; }\n.wx-condition { margin-top: 4px; color: var(--t-muted); font-size: 13px; }\n.wx-condition strong { color: var(--t-base); font-weight: 600; }\n.wx-date { text-align: right; }\n.wx-date h5 {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 16px;\n  color: var(--t-base);\n  margin: 0 0 2px;\n  letter-spacing: -0.02em;\n}\n.wx-date p {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  color: var(--t-light);\n  letter-spacing: 0.06em;\n  margin: 0;\n}\n\n.wx-stats {\n  display: grid; grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n  padding: 16px 0;\n  border-top: 1px solid var(--border);\n  border-bottom: 1px solid var(--border);\n  margin: 20px 0 16px;\n}\n.wx-stats > div { display: flex; flex-direction: column; gap: 4px; }\n.wx-stat-label { font-size: 11px; color: var(--t-muted); font-weight: 500; }\n.wx-stat-value {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 16px;\n  color: var(--t-base);\n  letter-spacing: -0.018em;\n}\n.wx-stat-value .unit { font-size: 11px; color: var(--t-light); margin-left: 3px; font-weight: 500; letter-spacing: 0; }\n\n.wx-forecast { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; }\n.wx-day {\n  padding: 10px 4px;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: background 160ms ease;\n}\n.wx-day:hover { background: var(--bg-hover); }\n.wx-day.is-today {\n  background: var(--primary);\n  color: #fff;\n}\n.wx-day-name { font-size: 10.5px; font-weight: 600; color: var(--t-muted); letter-spacing: 0.04em; margin-bottom: 6px; }\n.wx-day.is-today .wx-day-name { color: rgba(255,255,255,0.85); }\n.wx-day-icon { width: 22px; height: 22px; margin: 0 auto 6px; color: var(--t-muted); }\n.wx-day-icon svg { width: 100%; height: 100%; stroke: currentColor; stroke-width: 1.6; fill: none; }\n.wx-day.is-today .wx-day-icon { color: #fff; }\n.wx-day-temp { font-size: 12.5px; color: var(--t-base); font-weight: 600; }\n.wx-day.is-today .wx-day-temp { color: #fff; }\n\n/* Quick chat */\n.chat-frame {\n  margin: -6px -6px 0;\n  border-radius: 12px;\n  background: var(--bg-muted);\n  overflow: hidden;\n}\n.chat-messages {\n  padding: 20px;\n  display: flex; flex-direction: column;\n  gap: 16px;\n  min-height: 200px;\n}\n.chat-row { display: flex; gap: 10px; max-width: min(85%, 560px); }\n.chat-row.me { margin-left: auto; flex-direction: row-reverse; }\n.chat-avatar {\n  width: 30px; height: 30px;\n  border-radius: 50%;\n  background: var(--bg-card);\n  color: var(--t-base);\n  display: grid; place-items: center;\n  font-weight: 600;\n  font-size: 11.5px;\n  flex-shrink: 0;\n  border: 1px solid var(--border);\n}\n.chat-avatar.me { background: linear-gradient(135deg, var(--primary), var(--purple)); color: #fff; border: 0; }\n.chat-stack { display: flex; flex-direction: column; gap: 4px; min-width: 0; }\n.chat-row.me .chat-stack { align-items: flex-end; }\n.chat-bubble {\n  padding: 8px 12px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  border-top-left-radius: 4px;\n  font-size: 13px;\n  color: var(--t-base);\n  line-height: 1.45;\n  box-shadow: var(--shadow-sm);\n}\n.chat-row.me .chat-bubble {\n  background: var(--primary); color: #fff; border-color: var(--primary);\n  border-top-left-radius: 14px;\n  border-top-right-radius: 4px;\n}\n.chat-ts {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n  padding: 0 4px;\n}\n.chat-input-row {\n  display: flex; align-items: center; gap: 8px;\n  padding: 12px 14px;\n  background: var(--bg-card);\n  border-top: 1px solid var(--border);\n}\n.chat-input {\n  flex: 1; background: transparent; border: 0; outline: 0;\n  font-size: 13.5px; color: var(--t-base); padding: 4px 0;\n}\n.chat-input::placeholder { color: var(--t-light); }\n.chat-send {\n  width: 34px; height: 34px;\n  display: grid; place-items: center;\n  border-radius: 999px;\n  background: var(--primary); color: #fff;\n  transition: background 180ms;\n  flex-shrink: 0;\n  box-shadow: 0 2px 6px -1px color-mix(in oklab, var(--primary) 40%, transparent);\n}\n.chat-send:hover { background: var(--primary-dark); }\n.chat-send svg { width: 15px; height: 15px; stroke: currentColor; stroke-width: 2; fill: none; }\n","/* ============ EMAIL — 3-pane layout ============ */\n.mail-hero {\n  display: flex; justify-content: space-between; align-items: flex-end;\n  gap: 24px; margin-bottom: 20px;\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n}\n.mail-hero .hero-title { font-size: clamp(24px, 2.4vw, 28px); margin-bottom: 6px; }\n.mail-hero .hero-sub { font-size: 13.5px; }\n\n.mail-shell {\n  display: grid;\n  grid-template-columns: 220px minmax(320px, 1fr) minmax(0, 1.4fr);\n  gap: 20px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n  overflow: hidden;\n  height: calc(100vh - 240px);\n  min-height: 560px;\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n  animation-delay: 80ms;\n}\n\n/* ---- Folder rail ---- */\n.mail-rail {\n  display: flex; flex-direction: column;\n  padding: 18px 14px;\n  border-right: 1px solid var(--border-soft);\n  background: var(--bg-card);\n  overflow-y: auto;\n  gap: 18px;\n}\n.mail-rail::-webkit-scrollbar { width: 4px; }\n.mail-rail::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.mail-compose {\n  display: inline-flex; align-items: center; justify-content: center; gap: 8px;\n  background: var(--primary); color: #fff;\n  padding: 11px 14px;\n  border-radius: 9px;\n  font-size: 13px; font-weight: 600;\n  box-shadow: 0 2px 6px -1px var(--primary-ring);\n  transition: background 180ms;\n}\n.mail-compose:hover { background: var(--primary-dark); }\n.mail-compose svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }\n\n.mail-rail-section { display: flex; flex-direction: column; gap: 1px; }\n.mail-rail-label {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  padding: 0 10px 8px;\n}\n\n.mail-folder {\n  display: flex; align-items: center; gap: 10px;\n  padding: 8px 10px;\n  border-radius: 8px;\n  color: var(--t-muted);\n  font-size: 13px;\n  font-weight: 500;\n  transition: background 160ms ease, color 160ms ease;\n  cursor: pointer;\n}\n.mail-folder svg {\n  width: 15px; height: 15px;\n  stroke: currentColor; stroke-width: 1.75; fill: none;\n  flex-shrink: 0;\n}\n.mail-folder:hover { background: var(--bg-hover); color: var(--t-base); }\n.mail-folder.is-active {\n  background: var(--primary-soft);\n  color: var(--primary);\n  font-weight: 600;\n}\n.mail-folder-name { flex: 1; min-width: 0; }\n.mail-folder-count {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  color: var(--t-light);\n  font-weight: 500;\n}\n.mail-folder.is-active .mail-folder-count { color: var(--primary); }\n.mail-folder-count.is-strong {\n  background: var(--primary);\n  color: #fff;\n  padding: 2px 7px;\n  border-radius: 999px;\n  font-size: 10px;\n}\n.mail-folder.is-active .mail-folder-count.is-strong { background: var(--primary); color: #fff; }\n\n.mail-label-dot {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.mail-rail-storage {\n  margin-top: auto;\n  padding: 14px 10px 4px;\n  border-top: 1px solid var(--border-soft);\n}\n.mail-storage-head {\n  display: flex; justify-content: space-between; align-items: center;\n  font-size: 11.5px; color: var(--t-muted); font-weight: 500;\n  margin-bottom: 8px;\n}\n.mail-storage-head .num {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n}\n.mail-storage-bar {\n  height: 4px;\n  background: var(--bg-muted);\n  border-radius: 99px;\n  overflow: hidden;\n}\n.mail-storage-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, var(--primary), var(--purple));\n  border-radius: 99px;\n  animation: bar-in 900ms cubic-bezier(.2,.7,.2,1) 300ms both;\n  transform-origin: left;\n}\n.mail-storage-foot {\n  font-size: 11px;\n  color: var(--t-light);\n  margin-top: 6px;\n}\n.mail-storage-foot a { color: var(--primary); font-weight: 600; }\n\n/* ---- Message list ---- */\n.mail-list {\n  display: flex; flex-direction: column;\n  border-right: 1px solid var(--border-soft);\n  background: var(--bg-card);\n  min-width: 0;\n  overflow: hidden;\n}\n.mail-list-head {\n  padding: 14px 16px;\n  border-bottom: 1px solid var(--border-soft);\n  display: flex; flex-direction: column; gap: 12px;\n}\n.mail-list-toptools {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: 10px;\n}\n.mail-list-title {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 15px;\n  color: var(--t-base);\n  letter-spacing: -0.018em;\n}\n.mail-list-title .meta {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  color: var(--t-light);\n  font-weight: 500;\n  margin-left: 8px;\n  letter-spacing: 0.04em;\n}\n.mail-list-tools { display: flex; gap: 2px; }\n.mail-tool {\n  width: 28px; height: 28px;\n  display: grid; place-items: center;\n  border-radius: 7px;\n  color: var(--t-muted);\n  transition: background 160ms, color 160ms;\n}\n.mail-tool:hover { background: var(--bg-hover); color: var(--t-base); }\n.mail-tool svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 1.8; fill: none; }\n\n.mail-search {\n  position: relative;\n}\n.mail-search input {\n  width: 100%;\n  padding: 8px 10px 8px 32px;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--bg-muted);\n  font-size: 12.5px;\n  color: var(--t-base);\n  outline: 0;\n  transition: border-color 180ms, box-shadow 180ms, background 180ms;\n}\n.mail-search input::placeholder { color: var(--t-light); }\n.mail-search input:focus {\n  border-color: var(--primary);\n  background: var(--bg-card);\n  box-shadow: 0 0 0 3px var(--primary-soft);\n}\n.mail-search svg {\n  position: absolute;\n  left: 10px; top: 50%; transform: translateY(-50%);\n  width: 13px; height: 13px;\n  stroke: var(--t-light); stroke-width: 2; fill: none;\n  pointer-events: none;\n}\n\n.mail-tabs {\n  display: flex;\n  gap: 4px;\n  padding: 0 16px;\n  border-bottom: 1px solid var(--border-soft);\n  background: var(--bg-card);\n}\n.mail-tab {\n  padding: 10px 4px;\n  margin-right: 14px;\n  font-size: 12px;\n  color: var(--t-muted);\n  font-weight: 500;\n  border-bottom: 2px solid transparent;\n  transition: color 160ms, border-color 160ms;\n  position: relative;\n  top: 1px;\n}\n.mail-tab:hover { color: var(--t-base); }\n.mail-tab.is-active {\n  color: var(--primary);\n  border-bottom-color: var(--primary);\n  font-weight: 600;\n}\n.mail-tab .num {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  margin-left: 4px;\n  letter-spacing: 0.04em;\n}\n.mail-tab.is-active .num { color: var(--primary); }\n\n.mail-list-scroll {\n  flex: 1;\n  overflow-y: auto;\n  padding: 4px 0;\n}\n.mail-list-scroll::-webkit-scrollbar { width: 4px; }\n.mail-list-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.mail-row {\n  display: grid;\n  grid-template-columns: 36px 1fr;\n  gap: 10px;\n  padding: 12px 16px;\n  border-bottom: 1px solid var(--border-soft);\n  cursor: pointer;\n  transition: background 160ms ease;\n  position: relative;\n}\n.mail-row:hover { background: var(--bg-hover); }\n.mail-row.is-active {\n  background: var(--primary-soft);\n  box-shadow: inset 3px 0 0 var(--primary);\n}\n.mail-row.is-unread::before {\n  content: '';\n  position: absolute;\n  left: 8px; top: 18px;\n  width: 5px; height: 5px;\n  border-radius: 50%;\n  background: var(--primary);\n}\n\n.mail-row-avatar {\n  width: 36px; height: 36px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 12px;\n  flex-shrink: 0;\n}\n.ma-1 { background: linear-gradient(135deg, var(--primary), var(--purple)); }\n.ma-2 { background: linear-gradient(135deg, var(--success), var(--teal)); }\n.ma-3 { background: linear-gradient(135deg, var(--danger), var(--warning)); }\n.ma-4 { background: linear-gradient(135deg, var(--info), var(--primary-light)); }\n.ma-5 { background: linear-gradient(135deg, var(--orange), var(--pink)); }\n.ma-6 { background: linear-gradient(135deg, var(--purple), var(--pink)); }\n\n.mail-row-body { min-width: 0; display: flex; flex-direction: column; gap: 3px; }\n.mail-row-top {\n  display: flex; align-items: baseline; justify-content: space-between;\n  gap: 8px;\n}\n.mail-row-from {\n  font-size: 13px;\n  color: var(--t-base);\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  min-width: 0;\n}\n.mail-row.is-unread .mail-row-from { font-weight: 700; }\n.mail-row-time {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n  flex-shrink: 0;\n}\n.mail-row.is-unread .mail-row-time { color: var(--primary); }\n\n.mail-row-subject {\n  font-size: 12.5px;\n  color: var(--t-base);\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.mail-row.is-unread .mail-row-subject { font-weight: 600; }\n\n.mail-row-preview {\n  font-size: 12px;\n  color: var(--t-muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mail-row-tags { display: flex; gap: 5px; margin-top: 4px; flex-wrap: wrap; }\n.mail-tag {\n  font-size: 9.5px;\n  font-weight: 600;\n  padding: 2px 7px;\n  border-radius: 999px;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  line-height: 1.4;\n}\n.mail-tag.work    { background: var(--primary-soft); color: var(--primary); }\n.mail-tag.team    { background: var(--success-soft); color: var(--success); }\n.mail-tag.finance { background: var(--purple-soft);  color: var(--purple); }\n.mail-tag.invoice { background: var(--warning-soft); color: var(--warning); }\n.mail-tag.travel  { background: var(--info-soft);    color: var(--info); }\n.mail-tag.attach {\n  background: var(--bg-muted);\n  color: var(--t-muted);\n  display: inline-flex; align-items: center; gap: 3px;\n}\n.mail-tag.attach svg { width: 9px; height: 9px; stroke: currentColor; stroke-width: 2.4; fill: none; }\n\n.mail-star {\n  position: absolute;\n  right: 16px; bottom: 12px;\n  color: var(--t-light);\n  cursor: pointer;\n  transition: color 160ms;\n}\n.mail-star svg { width: 13px; height: 13px; stroke: currentColor; stroke-width: 1.8; fill: none; }\n.mail-star:hover { color: var(--warning); }\n.mail-star.is-on { color: var(--warning); }\n.mail-star.is-on svg { fill: var(--warning); }\n\n/* ---- Reader pane ---- */\n.mail-reader {\n  display: flex; flex-direction: column;\n  background: var(--bg-card);\n  min-width: 0;\n  overflow: hidden;\n}\n\n.reader-toolbar {\n  display: flex; align-items: center; justify-content: space-between;\n  padding: 12px 22px;\n  border-bottom: 1px solid var(--border-soft);\n  gap: 10px;\n}\n.reader-tools-group { display: flex; gap: 2px; align-items: center; }\n.reader-tools-group .sep {\n  width: 1px; height: 18px; background: var(--border-soft);\n  margin: 0 6px;\n}\n\n.reader-scroll {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px 28px 28px;\n}\n.reader-scroll::-webkit-scrollbar { width: 5px; }\n.reader-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.reader-head { margin-bottom: 18px; }\n.reader-subject {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 22px;\n  line-height: 1.25;\n  letter-spacing: -0.022em;\n  color: var(--t-base);\n  margin: 0 0 10px;\n}\n.reader-meta-row {\n  display: flex; gap: 8px; align-items: center; flex-wrap: wrap;\n}\n.reader-meta-row .mail-tag { font-size: 10px; padding: 3px 8px; }\n\n.reader-card {\n  border: 1px solid var(--border-soft);\n  border-radius: 12px;\n  overflow: hidden;\n  margin-bottom: 14px;\n}\n.reader-card-head {\n  display: flex; align-items: flex-start; gap: 12px;\n  padding: 14px 16px;\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border-soft);\n}\n.reader-avatar {\n  width: 40px; height: 40px;\n  border-radius: 50%;\n  display: grid; place-items: center;\n  color: #fff;\n  font-weight: 600;\n  font-size: 13px;\n  flex-shrink: 0;\n}\n.reader-from-block { flex: 1; min-width: 0; line-height: 1.3; }\n.reader-from-name {\n  font-size: 13.5px;\n  color: var(--t-base);\n  font-weight: 600;\n}\n.reader-from-email {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 11px;\n  color: var(--t-muted);\n  letter-spacing: 0.02em;\n}\n.reader-from-meta {\n  font-size: 11.5px;\n  color: var(--t-light);\n  margin-top: 4px;\n}\n.reader-time-block {\n  text-align: right;\n  font-size: 11.5px;\n  color: var(--t-muted);\n  flex-shrink: 0;\n}\n.reader-time-block .mono {\n  font-family: 'JetBrains Mono', monospace;\n  color: var(--t-light);\n  font-size: 10.5px;\n  letter-spacing: 0.04em;\n  display: block;\n  margin-top: 2px;\n}\n.reader-actions { display: flex; gap: 4px; margin-left: 4px; }\n\n.reader-body {\n  padding: 18px 16px;\n  font-size: 13.5px;\n  color: var(--t-base);\n  line-height: 1.65;\n  background: var(--bg-card);\n}\n.reader-body p { margin: 0 0 12px; }\n.reader-body p:last-child { margin-bottom: 0; }\n.reader-body strong { color: var(--t-base); font-weight: 600; }\n.reader-body a { color: var(--primary); font-weight: 500; }\n.reader-body ul {\n  margin: 0 0 12px; padding-left: 18px; list-style: disc;\n}\n.reader-body li { margin: 4px 0; }\n.reader-quote {\n  margin: 14px 0 4px;\n  padding: 12px 14px;\n  border-left: 2px solid var(--border);\n  background: var(--bg-muted);\n  border-radius: 0 8px 8px 0;\n  font-size: 12.5px;\n  color: var(--t-muted);\n}\n\n.reader-attach {\n  padding: 14px 16px;\n  border-top: 1px solid var(--border-soft);\n  background: var(--bg-card);\n}\n.reader-attach-head {\n  display: flex; align-items: center; gap: 8px;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  color: var(--t-light);\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  margin-bottom: 12px;\n}\n.reader-attach-head svg { width: 11px; height: 11px; stroke: currentColor; stroke-width: 2; fill: none; }\n.reader-attach-grid {\n  display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));\n  gap: 10px;\n}\n.reader-attach-item {\n  display: flex; align-items: center; gap: 10px;\n  padding: 10px;\n  border: 1px solid var(--border-soft);\n  border-radius: 9px;\n  background: var(--bg-card);\n  transition: border-color 160ms, box-shadow 160ms, transform 160ms;\n  cursor: pointer;\n}\n.reader-attach-item:hover {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px var(--primary-soft);\n}\n.attach-ico {\n  width: 34px; height: 34px;\n  border-radius: 8px;\n  display: grid; place-items: center;\n  flex-shrink: 0;\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  color: #fff;\n}\n.attach-ico.pdf { background: var(--danger); }\n.attach-ico.doc { background: var(--primary); }\n.attach-ico.xls { background: var(--success); }\n.attach-ico.img { background: var(--purple); }\n.attach-ico.zip { background: var(--orange); }\n\n.attach-meta { line-height: 1.3; min-width: 0; }\n.attach-name {\n  font-size: 12.5px;\n  color: var(--t-base);\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.attach-size {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n}\n\n.reader-collapsed {\n  padding: 12px 16px;\n  background: var(--bg-card);\n  display: flex; align-items: center; gap: 12px;\n  cursor: pointer;\n  transition: background 160ms;\n}\n.reader-collapsed:hover { background: var(--bg-hover); }\n.reader-collapsed .reader-avatar { width: 28px; height: 28px; font-size: 11px; }\n.reader-collapsed-from { font-size: 12.5px; color: var(--t-base); font-weight: 600; }\n.reader-collapsed-preview {\n  flex: 1; min-width: 0;\n  font-size: 12px; color: var(--t-muted);\n  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n}\n.reader-collapsed-time {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n}\n\n.reader-replybar {\n  display: flex; align-items: center; gap: 6px;\n  padding: 14px 16px;\n  margin-top: 8px;\n  border: 1px solid var(--border-soft);\n  border-radius: 12px;\n  background: var(--bg-muted);\n}\n.reader-replybar input {\n  flex: 1; background: transparent; border: 0; outline: 0;\n  font-size: 13px; color: var(--t-base); padding: 4px 6px;\n}\n.reader-replybar input::placeholder { color: var(--t-light); }\n.reader-replybar .reply-send {\n  width: 32px; height: 32px;\n  display: grid; place-items: center;\n  border-radius: 8px;\n  background: var(--primary); color: #fff;\n  transition: background 180ms;\n  flex-shrink: 0;\n}\n.reader-replybar .reply-send:hover { background: var(--primary-dark); }\n.reader-replybar .reply-send svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }\n\n","/* ============ CALENDAR ============ */\n.cal-hero { margin-bottom: 20px; }\n.cal-hero .hero-title { font-size: clamp(24px, 2.4vw, 28px); margin-bottom: 6px; }\n.cal-hero .hero-sub { font-size: 13.5px; }\n\n.cal-shell {\n  display: grid;\n  grid-template-columns: 280px minmax(0, 1fr);\n  gap: 20px;\n  animation: rise-in 600ms cubic-bezier(.2,.7,.2,1) both;\n  animation-delay: 80ms;\n}\n\n/* ---- Left rail ---- */\n.cal-rail { display: flex; flex-direction: column; gap: 18px; min-width: 0; }\n\n.cal-quickadd {\n  display: inline-flex; align-items: center; justify-content: center; gap: 8px;\n  background: var(--primary); color: #fff;\n  padding: 11px 14px;\n  border-radius: 10px;\n  font-size: 13px; font-weight: 600;\n  box-shadow: 0 2px 6px -1px var(--primary-ring);\n  transition: background 180ms;\n}\n.cal-quickadd:hover { background: var(--primary-dark); }\n.cal-quickadd svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }\n\n.cal-rail-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 16px;\n  box-shadow: var(--shadow-card);\n  display: flex; flex-direction: column; gap: 12px;\n}\n.cal-rail-head {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: 8px;\n}\n.cal-rail-title {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 13.5px;\n  color: var(--t-base);\n  letter-spacing: -0.01em;\n}\n.cal-rail-tools { display: flex; gap: 2px; }\n\n/* Mini calendar */\n.mini-cal-grid {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 1px;\n}\n.mini-cal-wd {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  color: var(--t-light);\n  text-align: center;\n  padding: 4px 0 6px;\n  letter-spacing: 0.06em;\n}\n.mini-cal-day {\n  aspect-ratio: 1;\n  display: grid; place-items: center;\n  font-size: 11.5px;\n  color: var(--t-base);\n  border-radius: 7px;\n  cursor: pointer;\n  transition: background 140ms ease, color 140ms ease;\n  position: relative;\n}\n.mini-cal-day:hover { background: var(--bg-hover); }\n.mini-cal-day.is-other { color: var(--t-light); }\n.mini-cal-day.is-today {\n  background: var(--primary); color: #fff; font-weight: 700;\n}\n.mini-cal-day.has-event::after {\n  content: '';\n  position: absolute;\n  bottom: 3px; left: 50%;\n  transform: translateX(-50%);\n  width: 3px; height: 3px;\n  border-radius: 50%;\n  background: var(--primary);\n}\n.mini-cal-day.is-today.has-event::after { background: #fff; }\n\n/* My calendars */\n.cal-list { display: flex; flex-direction: column; gap: 2px; }\n.cal-list-item {\n  display: flex; align-items: center; gap: 10px;\n  padding: 7px 8px;\n  border-radius: 7px;\n  cursor: pointer;\n  transition: background 140ms ease;\n}\n.cal-list-item:hover { background: var(--bg-hover); }\n.cal-list-check {\n  width: 14px; height: 14px;\n  border-radius: 4px;\n  flex-shrink: 0;\n  position: relative;\n  border: 1.5px solid currentColor;\n  background: currentColor;\n}\n.cal-list-check::after {\n  content: '';\n  position: absolute;\n  left: 3px; top: 0;\n  width: 3px; height: 7px;\n  border: solid #fff;\n  border-width: 0 1.5px 1.5px 0;\n  transform: rotate(45deg);\n}\n.cal-list-check.is-off { background: transparent; }\n.cal-list-check.is-off::after { display: none; }\n.cal-list-name { font-size: 12.5px; color: var(--t-base); flex: 1; min-width: 0; }\n.cal-list-item.is-off .cal-list-name { color: var(--t-light); }\n.cal-list-count {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n}\n\n/* Upcoming list */\n.upc-list { display: flex; flex-direction: column; }\n.upc-item {\n  display: grid;\n  grid-template-columns: 44px 1fr;\n  gap: 12px;\n  padding: 11px 0;\n  border-top: 1px solid var(--border-soft);\n  align-items: center;\n}\n.upc-item:first-child { border-top: 0; padding-top: 4px; }\n.upc-date {\n  text-align: center;\n  line-height: 1.05;\n  padding: 6px 0;\n  border-radius: 8px;\n  background: var(--bg-muted);\n}\n.upc-date .day {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 17px;\n  color: var(--t-base);\n  letter-spacing: -0.022em;\n}\n.upc-date .mo {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9px;\n  color: var(--t-light);\n  letter-spacing: 0.08em;\n  margin-top: 2px;\n  display: block;\n  text-transform: uppercase;\n}\n.upc-date.is-today { background: var(--primary-soft); }\n.upc-date.is-today .day { color: var(--primary); }\n.upc-date.is-today .mo { color: var(--primary); }\n\n.upc-meta { min-width: 0; line-height: 1.35; }\n.upc-title {\n  font-size: 13px;\n  color: var(--t-base);\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.upc-time {\n  display: flex; align-items: center; gap: 6px;\n  font-size: 11.5px;\n  color: var(--t-muted);\n  margin-top: 3px;\n}\n.upc-time .dot {\n  width: 6px; height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.upc-time .mono {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10.5px;\n  letter-spacing: 0.04em;\n  color: var(--t-light);\n}\n\n/* ---- Main calendar ---- */\n.cal-main {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n  display: flex; flex-direction: column;\n  overflow: hidden;\n  min-width: 0;\n}\n\n.cal-toolbar {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: 16px;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-soft);\n}\n.cal-toolbar-left { display: flex; align-items: center; gap: 14px; min-width: 0; }\n.cal-month {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 700;\n  font-size: 22px;\n  color: var(--t-base);\n  letter-spacing: -0.022em;\n  line-height: 1;\n  white-space: nowrap;\n}\n.cal-month .yr { color: var(--t-light); font-weight: 500; margin-left: 4px; }\n\n.cal-nav { display: flex; align-items: center; gap: 4px; }\n.cal-nav-btn {\n  width: 30px; height: 30px;\n  display: grid; place-items: center;\n  border-radius: 7px;\n  color: var(--t-muted);\n  transition: background 160ms, color 160ms;\n  border: 1px solid var(--border);\n  background: var(--bg-card);\n}\n.cal-nav-btn:hover { background: var(--bg-hover); color: var(--t-base); border-color: var(--t-light); }\n.cal-nav-btn svg { width: 13px; height: 13px; stroke: currentColor; stroke-width: 2; fill: none; }\n.cal-today-btn {\n  padding: 0 12px; height: 30px;\n  font-size: 12px; font-weight: 600;\n  color: var(--t-base);\n  border: 1px solid var(--border);\n  border-radius: 7px;\n  background: var(--bg-card);\n  transition: border-color 160ms, background 160ms;\n}\n.cal-today-btn:hover { background: var(--bg-hover); border-color: var(--t-light); }\n\n.cal-views {\n  display: flex;\n  background: var(--bg-muted);\n  border-radius: 8px;\n  padding: 3px;\n  gap: 2px;\n}\n.cal-view-tab {\n  padding: 6px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--t-muted);\n  border-radius: 6px;\n  transition: background 160ms, color 160ms, box-shadow 160ms;\n}\n.cal-view-tab:hover { color: var(--t-base); }\n.cal-view-tab.is-active {\n  background: var(--bg-card);\n  color: var(--t-base);\n  box-shadow: var(--shadow-sm);\n}\n\n.cal-toolbar-right { display: flex; align-items: center; gap: 8px; }\n\n/* Weekday header row */\n.cal-weekdays {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border);\n}\n.cal-weekdays > div {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  font-weight: 500;\n  padding: 10px 12px;\n  text-align: left;\n}\n\n/* Month grid */\n.cal-grid {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-auto-rows: minmax(110px, 1fr);\n  flex: 1;\n}\n.cal-cell {\n  border-right: 1px solid var(--border-soft);\n  border-bottom: 1px solid var(--border-soft);\n  padding: 8px 8px 6px;\n  position: relative;\n  min-width: 0;\n  display: flex; flex-direction: column; gap: 4px;\n  cursor: pointer;\n  transition: background 160ms ease;\n}\n.cal-cell:hover { background: var(--bg-hover); }\n.cal-cell:nth-child(7n) { border-right: 0; }\n.cal-grid > .cal-cell:nth-last-child(-n+7) { border-bottom: 0; }\n.cal-cell.is-other { background: var(--bg-muted); }\n.cal-cell.is-other:hover { background: var(--bg-hover); }\n\n.cal-day-num {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--t-base);\n  line-height: 1;\n  align-self: flex-start;\n  padding: 2px 4px;\n  border-radius: 6px;\n  margin-bottom: 2px;\n}\n.cal-cell.is-other .cal-day-num { color: var(--t-light); font-weight: 500; }\n.cal-cell.is-today .cal-day-num {\n  background: var(--primary);\n  color: #fff;\n  min-width: 22px;\n  text-align: center;\n  padding: 4px 6px;\n}\n.cal-cell.is-weekend:not(.is-today):not(.is-other) .cal-day-num { color: var(--t-muted); }\n\n.cal-chips { display: flex; flex-direction: column; gap: 2px; min-width: 0; }\n.cal-chip {\n  display: flex; align-items: center; gap: 6px;\n  padding: 3px 7px;\n  border-radius: 5px;\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 1.3;\n  cursor: pointer;\n  transition: filter 160ms ease, transform 140ms ease;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  min-width: 0;\n  border-left: 2px solid transparent;\n}\n.cal-chip:hover { transform: translateX(1px); }\n.cal-chip-time {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  flex-shrink: 0;\n}\n.cal-chip-title {\n  flex: 1; min-width: 0;\n  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n}\n.cal-chip.work     { background: var(--primary-soft); color: var(--primary);  border-left-color: var(--primary); }\n.cal-chip.team     { background: var(--success-soft); color: var(--success);  border-left-color: var(--success); }\n.cal-chip.personal { background: var(--purple-soft);  color: var(--purple);   border-left-color: var(--purple); }\n.cal-chip.travel   { background: var(--info-soft);    color: var(--info);     border-left-color: var(--info); }\n.cal-chip.finance  { background: var(--warning-soft); color: var(--warning);  border-left-color: var(--warning); }\n.cal-chip.birthday { background: var(--pink-soft);    color: var(--pink);     border-left-color: var(--pink); }\n.cal-chip.holiday  { background: var(--orange-soft);  color: var(--orange);   border-left-color: var(--orange); }\n.cal-chip.solid    { color: #fff; }\n.cal-chip.solid.work     { background: var(--primary); border-left-color: var(--primary-dark); }\n.cal-chip.solid.team     { background: var(--success); border-left-color: var(--success); }\n.cal-chip.solid.personal { background: var(--purple);  border-left-color: var(--purple); }\n\n.cal-chip-more {\n  padding: 3px 7px;\n  font-size: 10.5px;\n  color: var(--t-muted);\n  font-weight: 600;\n  cursor: pointer;\n  transition: color 160ms;\n}\n.cal-chip-more:hover { color: var(--primary); }\n\n","/* ============ FULLCALENDAR — 2026 OVERRIDES ============ */\n\n/* Map FC's CSS variables to our tokens so all chrome inherits the theme. */\n\n[data-fc] {\n  --fc-border-color:               var(--border-soft);\n  --fc-page-bg-color:              var(--bg-card);\n  --fc-neutral-bg-color:           var(--bg-muted);\n  --fc-neutral-text-color:         var(--t-muted);\n  --fc-today-bg-color:             color-mix(in oklab, var(--primary) 10%, transparent);\n  --fc-now-indicator-color:        var(--danger);\n  --fc-event-bg-color:             var(--primary);\n  --fc-event-border-color:         var(--primary);\n  --fc-event-text-color:           #fff;\n  --fc-event-selected-overlay-color: rgb(15 23 42 / 0.06);\n  --fc-list-event-hover-bg-color:  var(--bg-hover);\n  --fc-highlight-color:            color-mix(in oklab, var(--primary) 16%, transparent);\n  font-family: 'Inter', system-ui, sans-serif;\n  height: 100%;\n}\n\n/* Day-grid header row (S M T W T F S) */\n.fc .fc-col-header-cell-cushion {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--t-light);\n  font-weight: 500;\n  padding: 10px 0;\n}\n.fc-theme-standard .fc-scrollgrid,\n.fc-theme-standard td,\n.fc-theme-standard th { border-color: var(--border-soft); }\n\n/* Day numbers in month grid */\n.fc .fc-daygrid-day-number {\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 600;\n  font-size: 12.5px;\n  color: var(--t-base);\n  padding: 6px 8px;\n}\n.fc .fc-day-other .fc-daygrid-day-number { color: var(--t-light); font-weight: 500; }\n.fc .fc-day-today .fc-daygrid-day-number {\n  background: var(--primary);\n  color: #fff;\n  border-radius: 6px;\n  margin: 4px;\n  padding: 3px 7px;\n  min-width: 22px;\n  text-align: center;\n}\n\n.fc .fc-day-today { background: transparent; }\n.fc .fc-daygrid-day-frame { padding: 2px 4px; }\n\n/* Events — base chip */\n.fc .fc-daygrid-event,\n.fc .fc-timegrid-event {\n  border-radius: 5px;\n  border: 0;\n  border-left: 2px solid transparent;\n  font-size: 11px;\n  font-weight: 500;\n  padding: 2px 6px;\n  margin: 1px 4px;\n  line-height: 1.3;\n  cursor: pointer;\n  transition: transform 140ms ease, filter 160ms ease;\n}\n.fc .fc-daygrid-event:hover { transform: translateX(1px); }\n.fc .fc-daygrid-event-dot { display: none; }\n.fc .fc-event-time {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  font-weight: 600;\n  margin-right: 4px;\n  opacity: 0.85;\n}\n\n/* Category colors via classNames — match dashboard cal-chip variants */\n.fc .fc-event.fc-cat-work     { background: var(--primary-soft); color: var(--primary);  border-left-color: var(--primary); }\n.fc .fc-event.fc-cat-team     { background: var(--success-soft); color: var(--success);  border-left-color: var(--success); }\n.fc .fc-event.fc-cat-personal { background: var(--purple-soft);  color: var(--purple);   border-left-color: var(--purple); }\n.fc .fc-event.fc-cat-travel   { background: var(--info-soft);    color: var(--info);     border-left-color: var(--info); }\n.fc .fc-event.fc-cat-finance  { background: var(--warning-soft); color: var(--warning);  border-left-color: var(--warning); }\n.fc .fc-event.fc-cat-birthday { background: var(--pink-soft);    color: var(--pink);     border-left-color: var(--pink); }\n\n.fc .fc-event.fc-cat-travel .fc-event-time,\n.fc .fc-event.fc-cat-team   .fc-event-time,\n.fc .fc-event.fc-cat-work   .fc-event-time { color: inherit; }\n\n/* \"more\" link */\n.fc .fc-daygrid-more-link {\n  font-size: 10.5px;\n  font-weight: 600;\n  color: var(--t-muted);\n  padding: 2px 6px;\n}\n.fc .fc-daygrid-more-link:hover { color: var(--primary); }\n\n/* Time-grid axis */\n.fc .fc-timegrid-axis-cushion,\n.fc .fc-timegrid-slot-label-cushion {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n}\n.fc .fc-timegrid-now-indicator-line { border-color: var(--danger); border-width: 1.5px; }\n.fc .fc-timegrid-now-indicator-arrow { border-color: var(--danger); }\n\n/* List view */\n.fc .fc-list-day-cushion {\n  background: var(--bg-muted);\n}\n.fc .fc-list-day-text,\n.fc .fc-list-day-side-text {\n  color: var(--t-base);\n  font-family: 'Inter Tight', sans-serif;\n  font-weight: 600;\n  font-size: 13px;\n}\n.fc .fc-list-event-time,\n.fc .fc-list-event-title {\n  font-size: 13px;\n  color: var(--t-base);\n}\n.fc .fc-list-event-dot { border-color: var(--primary); }\n.fc .fc-list-empty {\n  background: var(--bg-card);\n  color: var(--t-muted);\n}\n","/* ============ COMMAND PALETTE (⌘K) ============ */\n\n.palette-backdrop {\n  position: fixed; inset: 0;\n  background: rgb(15 23 42 / 0.55);\n  backdrop-filter: blur(4px);\n  z-index: 200;\n  display: none;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 12vh 16px 16px;\n  animation: palette-fade 160ms ease both;\n}\n\nbody.has-palette-open .palette-backdrop {\n  display: flex;\n}\n\n@keyframes palette-fade {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n\n.palette-modal {\n  width: 100%;\n  max-width: 560px;\n  max-height: 70vh;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  box-shadow: var(--shadow-lg);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  animation: palette-rise 200ms cubic-bezier(.2,.7,.2,1) both;\n}\n\n@keyframes palette-rise {\n  from { opacity: 0; transform: translateY(-8px) scale(0.98); }\n  to   { opacity: 1; transform: translateY(0) scale(1); }\n}\n\n.palette-input-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  border-bottom: 1px solid var(--border-soft);\n}\n\n.palette-icon {\n  width: 18px; height: 18px;\n  color: var(--t-muted);\n  flex-shrink: 0;\n}\n\n.palette-input {\n  flex: 1;\n  background: transparent;\n  border: 0;\n  outline: 0;\n  font-size: 15px;\n  color: var(--t-base);\n  font-family: inherit;\n  padding: 4px 0;\n  min-width: 0;\n}\n.palette-input::placeholder { color: var(--t-light); }\n\n.palette-esc {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  padding: 3px 7px;\n  border-radius: 5px;\n  background: var(--bg-muted);\n  color: var(--t-muted);\n  border: 1px solid var(--border);\n  flex-shrink: 0;\n  text-transform: lowercase;\n  letter-spacing: 0.04em;\n}\n\n.palette-results {\n  flex: 1;\n  overflow-y: auto;\n  padding: 6px;\n}\n.palette-results::-webkit-scrollbar { width: 4px; }\n.palette-results::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }\n\n.palette-result {\n  display: grid;\n  grid-template-columns: 28px 1fr auto;\n  gap: 12px;\n  align-items: center;\n  padding: 9px 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 120ms;\n}\n.palette-result:hover { background: var(--bg-hover); }\n.palette-result.is-selected {\n  background: var(--primary-soft);\n  color: var(--primary);\n}\n\n.palette-result-icon {\n  width: 28px; height: 28px;\n  display: grid; place-items: center;\n  border-radius: 6px;\n  background: var(--bg-muted);\n  color: var(--t-muted);\n  flex-shrink: 0;\n}\n.palette-result.is-selected .palette-result-icon {\n  background: color-mix(in oklab, var(--primary) 14%, transparent);\n  color: var(--primary);\n}\n.palette-result-icon svg { width: 14px; height: 14px; }\n\n.palette-result-label {\n  font-size: 13.5px;\n  font-weight: 500;\n  color: var(--t-base);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  min-width: 0;\n}\n.palette-result.is-selected .palette-result-label { color: var(--primary); font-weight: 600; }\n\n.palette-result-section {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 10px;\n  color: var(--t-light);\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n}\n.palette-result.is-selected .palette-result-section { color: var(--primary); opacity: 0.8; }\n\n.palette-empty {\n  padding: 32px 16px;\n  text-align: center;\n  color: var(--t-muted);\n  font-size: 13px;\n}\n\n.palette-foot {\n  display: flex;\n  gap: 18px;\n  padding: 10px 16px;\n  border-top: 1px solid var(--border-soft);\n  background: var(--bg-card);\n  font-size: 11px;\n  color: var(--t-muted);\n}\n.palette-foot kbd {\n  font-family: 'JetBrains Mono', monospace;\n  font-size: 9.5px;\n  padding: 1.5px 5px;\n  border-radius: 4px;\n  background: var(--bg-muted);\n  color: var(--t-muted);\n  border: 1px solid var(--border);\n  margin-right: 4px;\n  letter-spacing: 0.04em;\n}\n\n@media (max-width: 600px) {\n  .palette-backdrop { padding-top: 6vh; }\n  .palette-foot { flex-wrap: wrap; gap: 10px; font-size: 10px; }\n}\n","/* ============ RESPONSIVE ============ */\n\n/* Auth pages: collapse the marketing aside when the split-screen no longer fits.\n   (Lives here, not in _auth.scss, so it wins over the later default rules there.) */\n@media (max-width: 900px) {\n  .auth-shell { grid-template-columns: 1fr; }\n  .auth-aside { display: none; }\n}\n\n@media (max-width: 1200px) {\n  /* Dashboard */\n  .sv-regions { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }\n  .sv-radials { grid-template-columns: 1fr; gap: 18px; }\n  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n\n  /* Email */\n  .mail-shell { grid-template-columns: 200px 1fr; height: auto; min-height: 0; }\n  .mail-reader { display: none; }\n\n  /* Calendar */\n  .cal-shell { grid-template-columns: 240px 1fr; }\n  .cal-grid { grid-auto-rows: minmax(96px, 1fr); }\n}\n\n@media (max-width: 1100px) {\n  .shell { grid-template-columns: 72px 1fr; }\n  .d-sidebar {\n    padding: 20px 10px;\n    overflow-y: auto;   /* allow scroll on short viewports (e.g. 750×590) */\n    overflow-x: hidden;\n    z-index: 20;\n  }\n  .brand-text, .brand-tag, .nav-label, .nav-link > span:not(.nav-badge), .nav-link .nav-badge,\n  .workspace-text, .workspace-chev, .nav-link .chev { display: none; }\n  .brand { justify-content: center; padding: 0 0 18px; }\n  .nav-link { justify-content: center; padding: 10px; }\n  .nav-link.is-active::before { left: -10px; }\n  .workspace { justify-content: center; padding: 6px; }\n  .col-6 { grid-column: span 12; }\n\n  /* Rail-mode flyout submenu: positioned via JS as position:fixed so the\n     sidebar can scroll (overflow-y: auto above) without clipping the flyout,\n     and so it can be shifted up to fit when opened near the viewport bottom. */\n  .nav-submenu {\n    position: fixed;\n    left: 82px;          /* fallback; JS overwrites with trigger's getBoundingClientRect */\n    top: 0;\n    width: 200px;\n    max-height: 0;\n    margin-left: 0;\n    padding: 0;\n    background: var(--bg-card);\n    border: 1px solid var(--border);\n    border-radius: 10px;\n    box-shadow: var(--shadow-lg);\n    opacity: 0;\n    visibility: hidden;\n    z-index: 50;\n    transition: opacity 180ms ease, visibility 180ms;\n  }\n  .nav-submenu::before { display: none; }\n  .nav-item-group.is-open .nav-submenu {\n    max-height: 400px;\n    padding: 6px 0;\n    opacity: 1;\n    visibility: visible;\n  }\n  .nav-submenu a { padding: 8px 14px; font-size: 13px; border-radius: 6px; margin: 0 6px; }\n  .nav-submenu a:hover { padding-left: 14px; }\n\n  /* Chat */\n  .chat-shell { grid-template-columns: 240px 1fr; }\n}\n\n@media (max-width: 720px) {\n  /* ---- Shell / sidebar drawer ----\n     Sidebar becomes position:fixed (off-grid), so collapse the grid to a\n     single column — otherwise .main is auto-placed into the empty column-1\n     (0px) and disappears. */\n  .shell { display: block; }\n  .d-sidebar {\n    position: fixed;\n    top: 0; left: 0;\n    width: 280px;\n    height: 100vh;\n    z-index: 100;                 /* above backdrop (90) */\n    transform: translateX(-100%);\n    transition: transform 240ms cubic-bezier(.2,.7,.2,1);\n    box-shadow: 0 12px 40px -8px rgb(0 0 0 / 0.4);\n\n    /* Restore full-width nav (override the 1100px collapse) */\n    padding: 22px 16px 18px;\n    overflow-y: auto;             /* override 1100px rail-mode 'visible' so long menus scroll */\n    overscroll-behavior: contain;\n  }\n  .brand-text, .brand-tag, .nav-label, .nav-link > span:not(.nav-badge), .nav-link .nav-badge,\n  .workspace-text, .workspace-chev, .nav-submenu, .nav-link .chev { display: revert; }\n  .brand { justify-content: flex-start; padding: 4px 10px 20px; }\n  .nav-link { justify-content: flex-start; padding: 9px 12px; }\n  .workspace { justify-content: flex-start; padding: 6px 10px; }\n\n  /* Revert rail-mode flyout submenu back to inline-accordion (desktop) behavior.\n     Without this, the absolute-positioned flyout from the 1100px block leaks\n     into mobile and the submenu pops out as a floating card next to the drawer. */\n  .nav-item-group { position: static; }\n  .nav-submenu {\n    position: static;\n    left: auto; top: auto;\n    width: auto;\n    margin-left: 20px;\n    padding: 0 0 0 14px;\n    background: transparent;\n    border: 0;\n    border-radius: 0;\n    box-shadow: none;\n    opacity: 1;\n    visibility: visible;\n    max-height: 0;\n    transition: max-height 280ms cubic-bezier(.4,0,.2,1);\n  }\n  .nav-submenu::before { display: block; }\n  .nav-item-group.is-open .nav-submenu {\n    max-height: 400px;\n    padding: 4px 0 6px 14px;\n    opacity: 1;\n    visibility: visible;\n  }\n  .nav-submenu a { margin: 0; padding: 7px 10px; font-size: 12.5px; border-radius: 6px; }\n  .nav-submenu a:hover { padding-left: 13px; }\n\n  body.has-drawer-open .d-sidebar { transform: translateX(0); }\n  body.has-drawer-open { overflow: hidden; }   /* lock scroll behind backdrop */\n\n  .hamburger { display: inline-flex; }\n\n  /* ---- Topbar: aggressive de-clutter ---- */\n  .d-topbar { padding: 0 12px; }\n  .topbar-actions { gap: 2px; }\n\n  /* Crumbs eat horizontal space — hide everything except the active page */\n  .crumbs { gap: 6px; min-width: 0; flex: 1; overflow: hidden; }\n  .crumbs > span:not(.current), .crumbs .sep { display: none; }\n  .crumbs .current { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n\n  /* Search becomes its own icon-button (text + kbd hidden, padding tightened) */\n  .cmd { min-width: 0; padding: 0; width: 36px; height: 36px; justify-content: center; }\n  .cmd span, .cmd .kbd { display: none; }\n  .cmd svg { width: 16px; height: 16px; }\n\n  /* Trim avatar margin */\n  .avatar { margin-left: 2px; }\n\n  /* ---- Dropdowns: prevent off-screen overflow ---- */\n  .dd-menu {\n    min-width: 0;\n    width: calc(100vw - 16px);\n    max-width: 360px;\n    right: -8px;            /* pin to viewport edge minus topbar padding (12px) */\n  }\n  .dd-menu.dd-profile {\n    width: calc(100vw - 16px);\n    max-width: 280px;\n  }\n\n  /* ---- Content / hero / footer ---- */\n  .content { padding: 20px 16px 16px; }\n  .d-footer { padding: 20px 16px; flex-direction: column; gap: 10px; align-items: flex-start; }\n  .hero { flex-direction: column; align-items: flex-start; gap: 20px; }\n  .hero-actions { flex-wrap: wrap; }\n\n  /* ---- Generic grid ---- */\n  .grid { gap: 16px; }\n\n  /* ---- Dashboard ---- */\n  .kpi-grid { grid-template-columns: 1fr; }\n  .sv-regions { grid-template-columns: 1fr; gap: 22px; }\n  .monthly-footer { grid-template-columns: repeat(2, 1fr); gap: 16px; }\n  .wx-forecast { grid-template-columns: repeat(4, 1fr); gap: 6px; }\n  .wx-hero { flex-direction: column; align-items: flex-start; gap: 12px; }\n  .wx-date { text-align: left; }\n  .sales-summary { flex-direction: column; align-items: flex-start; gap: 12px; }\n\n  /* Card breathing room */\n  .card { padding: 18px; }\n  .card-head { flex-wrap: wrap; gap: 10px; }\n\n  /* ---- Charts page ---- */\n  .chart-canvas-wrap { min-height: 200px; }\n\n  /* ---- Tables: ensure horizontal scroll fallback ---- */\n  .data-toolbar { flex-direction: column; align-items: stretch; gap: 10px; }\n  .data-toolbar-left, .data-toolbar-right { min-width: 0; flex-wrap: wrap; }\n  .data-foot { flex-direction: column; gap: 12px; align-items: flex-start; }\n\n  /* ---- Email ---- */\n  .mail-shell { grid-template-columns: 1fr; }\n  .mail-rail { display: none; }\n  .mail-hero { flex-direction: column; align-items: flex-start; gap: 16px; }\n\n  /* ---- Chat ----\n     Drop the fixed-viewport layout on mobile — let the whole page scroll\n     instead of a nested overflow-y on .chat-thread (touch scrolling inside\n     a clipped flex parent is fiddly on iOS Safari). Restore the rail as a\n     capped, stacked section above the thread so users can still see who\n     they're chatting with. */\n  .chat-shell {\n    grid-template-columns: 1fr;\n    height: auto;\n    min-height: 0;\n    overflow: visible;\n  }\n  .chat-rail {\n    display: flex;\n    border-right: 0;\n    border-bottom: 1px solid var(--border-soft);\n    max-height: 260px;\n  }\n  .chat-pane { overflow: visible; }\n  .chat-pane-head { padding: 12px 16px; }\n  .chat-thread {\n    flex: 0 0 auto;\n    overflow: visible;\n    padding: 16px;\n  }\n  .chat-composer { padding: 12px 16px 16px; }\n\n  /* ---- Calendar ---- */\n  .cal-shell { grid-template-columns: 1fr; }\n  .cal-toolbar { flex-wrap: wrap; gap: 10px; padding: 14px; }\n  .cal-toolbar-left { width: 100%; justify-content: space-between; }\n  .cal-views { order: 3; }\n  .cal-grid { grid-auto-rows: minmax(78px, 1fr); }\n  .cal-weekdays > div { padding: 8px 6px; font-size: 9px; letter-spacing: 0.1em; }\n  .cal-cell { padding: 5px; }\n  .cal-chip-time { display: none; }\n\n  /* ---- Compose page (inline-styled form rows) ---- */\n  .compose-row { grid-template-columns: 1fr !important; gap: 6px !important; }\n  .compose-row-actions { justify-content: flex-start !important; }\n\n  /* ---- Auth pages ---- */\n  .auth-main { padding: 24px 20px; }\n}\n\n@media (max-width: 480px) {\n  .monthly-footer { grid-template-columns: 1fr; }\n  .wx-forecast { grid-template-columns: repeat(2, 1fr); }\n  .form-actions { flex-direction: column; align-items: stretch; }\n  .form-actions .btn { width: 100%; justify-content: center; }\n  .form-actions .spacer { display: none; }\n  .social-row { grid-template-columns: 1fr; }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./assets/styles/2026/index.scss"
/*!***************************************!*\
  !*** ./assets/styles/2026/index.scss ***!
  \***************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./index.scss */ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./assets/styles/2026/index.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }
  var p;
  for (p in a) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (a[p] !== b[p]) {
      return false;
    }
  }
  for (p in b) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (!a[p]) {
      return false;
    }
  }
  return true;
};
    var isNamedExport = !_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;
    var oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

    module.hot.accept(
      /*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./index.scss */ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./assets/styles/2026/index.scss",
      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./index.scss */ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../node_modules/sass-loader/dist/cjs/index.js??ruleSet[1].rules[3].use[3]!./assets/styles/2026/index.scss");
 return (function () {
        if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals, isNamedExport)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

              update(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}



       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_index_js_ruleSet_1_rules_3_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748B%27 stroke-width=%272%27><path d=%27m6 9 6 6 6-6%27/></svg>"
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748B%27 stroke-width=%272%27><path d=%27m6 9 6 6 6-6%27/></svg> ***!
  \*********************************************************************************************************************************************************************************************************************************/
(module) {

module.exports = "data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748B%27 stroke-width=%272%27><path d=%27m6 9 6 6 6-6%27/></svg>";

/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor-fullcalendar","vendor-chartjs","vendors"], () => (__webpack_exec__("./assets/scripts/2026/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=2026.js.map
---
date: 2026-05-26
type: session-notes
---

# Session 2026-05-26 — Retro Daya Website UI Updates

## Header Change (Gray → Navy)
**Request:** Nav header was gray/beige — Erik said it looked bad, wanted a change.
**Decision:** Option A — Navy + Orange accents, matching brand identity.

### CSS Changes (styles.css, .nav block)
```css
.nav {
  background: var(--navy);      /* was: rgba(247,246,243,0.85) + blur */
  border-bottom: 1px solid rgba(245,158,11,0.15);
}
.nav.scrolled {
  background: var(--navy);      /* was: rgba(247,246,243,0.95) */
  box-shadow: 0 4px 30px rgba(0,0,0,0.25);
}
.nav-links a {
  color: rgba(255,255,255,0.6);   /* was: var(--gray-600) — white text */
}
.nav-links a:hover, .nav-links a.active {
  color: var(--orange);       /* was: var(--navy) — orange on hover */
  background: rgba(245,158,11,0.08); /* was: rgba(26,46,74,0.06) */
}
.nav-toggle span {
  background: var(--white);     /* was: var(--navy) — hamburger white */
}
```

## WhatsApp Floating Button
**Request:** Floating WA button, right-bottom, to number 6281118895660.
**Applied to:** All 6 pages (index, about, services, project, product, contact).

Code injected before `</body>` on each page:
```html
<a href="https://wa.me/6281118895660" target="_blank" class="wa-float" ...>
 <svg ...WhatsApp icon...</svg>
</a>
<style>
.wa-float {
  position: fixed; bottom: 24px; right: 24px; z-index: 9999;
  width: 60px; height: 60px; border-radius: 50%;
  background: #25D366;
  box-shadow: 0 4px 20px rgba(37,211,102,0.45);
  transition: all 0.3s ease;
}
.wa-float:hover {
  background: #20BA5A; transform: scale(1.08);
  box-shadow: 0 6px 25px rgba(37,211,102,0.55);
}
</style>
```

## Next.js Decision
Erik asked if Next.js causes lag for this website.

**Conclusion:** YES for a static company profile. Next.js is overkill:
- RAM: 300-500MB+ always-on (vs ~0 for static HTML)
- Dev mode: hot reload, file watching, CPU grind on each compile
- Static HTML at `/var/www/retrodaya/` is sufficient and lighter

**Rule going forward:** Static HTML only for Retro Daya website. Next.js project at `/root/retrodaya-next/` kept as reference only, NOT running.

## Verified Working
- `python3 -m http.server 8080 --directory /var/www/retrodaya/` — serves all pages
- Site live at: /
- WA button link: https://wa.me/6281118895660

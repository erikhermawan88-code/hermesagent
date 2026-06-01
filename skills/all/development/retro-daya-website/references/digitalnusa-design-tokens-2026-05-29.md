# DigitalNusa.com Design System — Extracted Tokens

Extracted via browser console (2026-05-29) for use when Erik wants "same style as digitalnusa.com."

## Color Palette (CSS Variables)
```css
:root {
  --primary: #009F75;
  --primary-dark: #007a5a;
  --primary-light: rgba(0,159,117,0.1);
  --bg-dark: #F8FAFC;
  --bg-alt: #F0F4F8;
  --card-bg: #FFFFFF;
  --text-primary: #1a1a2e;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --accent: #009F75;
}
```

## Typography
- **Font**: `Inter` (Google Fonts) — weights 400/500/600/700/800/900
- Preconnect: `https://fonts.googleapis.com` + `https://fonts.gstatic.com` (crossorigin)
- **CTA buttons**: `#009F75` with `box-shadow: 0 4px 14px rgba(0,159,117,0.35)`

## Design Language (per Erik's preferences)
- **Light theme** — NOT dark
- **Teal primary** (`#009F75`) — NOT navy+gold (that's Retro Daya)
- **Clean card layout** — image top + content bottom, 3-col grid
- **Border radius**: 12px–16px
- **Font**: Inter (not Outfit — Outfit is Retro Daya's preference)
- **Shadow on hover**: `0 4px 12px rgba(0,0,0,0.1)`
- **Hates generic/template-looking outputs** — must feel premium
- **No Flask/Django backend needed for static sites** — plain HTML/CSS/JS only, served from DirectAdmin public_html

## Navbar
```html
<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <a href="/" class="navbar-logo">
      <div class="logo-icon">🍞</div>
      <div class="logo-text"><span>Part</span><span>Name</span></div>
    </a>
    <nav class="navbar-nav">
      <a href="#section">Menu</a>
      <a href="#tentang">Tentang</a>
      <a href="#lokasi">Lokasi</a>
    </nav>
    <div class="navbar-actions">
      <a href="https://wa.me/..." class="btn btn-primary btn-sm">CTA</a>
    </div>
  </div>
</nav>
```

## Hero Pattern
```html
<section class="hero-bg">
  <div class="hero-slider">...slides...</div>
  <div class="hero-grid"></div>
  <div class="hero-content">
    <div class="hero-badge">Badge text</div>
    <h1 class="hero-title">Headline<br><span class="accent">Accent</span></h1>
    <p class="hero-desc">Description</p>
    <div class="hero-actions">
      <a href="#" class="btn btn-primary">Primary</a>
      <a href="#menu" class="btn btn-outline">Secondary</a>
    </div>
    <div class="hero-stats">...stats...</div>
  </div>
</section>
```

## Menu Card Pattern (image top + content bottom)
```html
<div class="menu-card">
  <div class="menu-img-wrap">
    <img src="..." alt="..." class="menu-img">
    <div class="menu-badge">Badge</div>
  </div>
  <div class="menu-body">
    <h3>Title</h3>
    <p>Description</p>
    <div class="menu-footer">
      <span class="menu-price">Rp 12.000</span>
      <a href="wa.link" class="btn btn-sm btn-primary">Pesan</a>
    </div>
  </div>
</div>
```

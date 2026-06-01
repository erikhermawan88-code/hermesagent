# Brutalist-Editorial Design Reference — NeuralFlow v2

**Date:** 2026-05-30
**URL:** https://digitalnusa.com/neuralflow/public/
**Project:** NeuralFlow AI Automation Agency (redesign v2)

## Design Language

```
Theme:        Brutalist-editorial — bold borders, no rounded corners, no shadows
Background:   Off-white (#F4F3EE) — warm, not clinical
Primary:      Pitch black (#0C0C0C) — pure, not navy
Accent:       Red (#E84040) — used sparingly for emphasis + interactive states
Accent-2:     Blue (#2550E0) — secondary color block
Accent-3:     Green (#00C950) — tertiary color block
Typography:   Bricolage Grotesque (headings, editorial weight) + Manrope (body)
Borders:     2px solid black everywhere — dividers ARE the design
Corners:     0px everywhere — sharp edges only
```

## Color Variables

```css
:root {
    --bg: #F4F3EE;        /* warm off-white */
    --surface: #FFFFFF;
    --primary: #0C0C0C;   /* pitch black */
    --accent: #E84040;    /* red */
    --accent-2: #2550E0;  /* blue */
    --accent-3: #00C950;  /* green */
    --text: #0C0C0C;
    --text-2: #6B6B6B;
    --border: #0C0C0C;
    --border-w: 2px;
    --radius: 0px;
    --shadow: none;
}
```

## Typography Stack

```css
/* Headings — editorial, bold grotesque */
font-family: 'Bricolage Grotesque', 'Manrope', sans-serif;

/* Body — clean, readable */
font-family: 'Manrope', sans-serif;

/* Scale */
--space-1: 8px; --space-2: 16px; --space-3: 24px; --space-4: 32px;
--space-5: 48px; --space-6: 64px; --space-7: 96px; --space-8: 128px;
```

## Key Sections

### Hero — Split Grid
```
┌──────────────────────┬────────────────────────┐
│  LEFT (55%)           │  RIGHT (45%)            │
│  • Badge label        │  • Dark background       │
│  • H1 (Bricolage)     │  • 3 stacked data cards  │
│  • Desc paragraph     │  • Vertical text labels  │
│  • CTAs               │  • floating side labels  │
│  • 2 stat items       │                         │
└──────────────────────┴────────────────────────┘
```

```css
.hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: var(--border-w) solid var(--border);
}
.hero-left {
    padding: 120px 48px 80px 40px;
    border-right: var(--border-w) solid var(--border);
}
.hero-right { background: var(--primary); position: relative; overflow: hidden; }
```

### Marquee Ticker
```css
.marquee-track {
    display: flex;
    animation: marquee 20s linear infinite;
}
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
```
Items: service names separated by `✦` separator, red background, white text.

### Services Grid — Border-Based Cards
```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: var(--border-w) solid var(--border);  /* outer border */
}
.service-card {
    padding: 40px;
    border-right: var(--border-w) solid var(--border);
    border-top: 3px solid transparent;
    transition: background var(--duration-fast);
}
.service-card:hover { background: var(--primary); color: white; }
.service-card:hover .sc-desc { color: rgba(255,255,255,0.6); }
```

### Stats Strip — Dark + Hover Underline
```css
.stats-grid-new {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: var(--primary);
}
.stat-new {
    padding: 48px 40px;
    border-right: var(--border-w) solid rgba(255,255,255,0.15);
}
.stat-new::before {
    content: '';
    position: absolute; bottom: 0; left: 40px; right: 40px;
    height: 4px; background: var(--accent);
    transform: scaleX(0);
    transition: transform var(--duration-normal);
}
.stat-new:hover::before { transform: scaleX(1); }
```

### CTA Section — Oversized Background Text
```css
.cta-section {
    background: var(--accent);
    position: relative; overflow: hidden;
}
.cta-section::before {
    content: 'AI';
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 40vw; font-weight: 800; color: rgba(0,0,0,0.06);
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none; line-height: 1;
}
```

### Footer — Dark Grid
```css
footer { background: var(--primary); }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; }
```

## Reveal Animation (Minimal)

```css
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease, transform 0.4s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

## Navigation — Fixed Top + Bottom Border

```css
nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px;
    border-bottom: var(--border-w) solid var(--border);
    background: var(--bg);
}
.nav-link {
    font-size: 0.875rem; font-weight: 600;
    padding: 12px 20px;
    border: var(--border-w) solid transparent;
    transition: all var(--duration-fast);
}
.nav-link:hover { border-color: var(--border); }
.nav-cta {
    background: var(--primary); color: white;
    padding: 12px 24px; font-size: 0.875rem; font-weight: 700;
    border: var(--border-w) solid var(--primary);
    transition: all var(--duration-fast);
}
.nav-cta:hover { background: var(--accent); border-color: var(--accent); }
```

## Dynamic Content Fetch Pattern

```js
const ICONS = {
    chat: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">...</svg>`,
    check: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`
};

async function loadContent() {
    const res = await fetch('data/content.json');
    const c = await res.json();

    if (c.services) {
        document.getElementById('servicesGrid').innerHTML = c.services.map((s, i) => `
            <div class="service-card reveal">
                <span class="sc-num">0${i+1}</span>
                <div class="sc-icon">${ICONS[s.icon] || ICONS.chat}</div>
                <h3 class="sc-title">${s.title}</h3>
                <p class="sc-desc">${s.description}</p>
                <div class="sc-tags">${s.tags.map(t => `<span class="sc-tag">${t}</span>`).join('')}</div>
            </div>`).join('');
    }

    // Re-observe new reveal elements
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}
loadContent();
```

# Bento Grid Design Reference — NeuralFlow

**Date:** 2026-05-30
**URL:** https://digitalnusa.com/neuralflow/public/
**Project:** NeuralFlow AI Automation Agency

## Layout Structure

```
Bento Grid (12-column CSS grid):
┌─────────────────────┬────────┬────────┐
│  Featured Card       │ Card 2 │ Card 3 │  ← row 1: 4+4+4
│  (span 4, row 2)    │        │        │
│                     │        │        │  ← row 2 (continues bc-1)
├──────────┬──────────┼────────┴────────┤
│  Card 4  │  Card 5  │       Card 6   │  ← row 3: 3+5+4
└──────────┴──────────┴────────────────┘
```

Classes: `bc-1` (span 4, row 2), `bc-2` (span 4), `bc-3` (span 4), `bc-4` (span 3), `bc-5` (span 5), `bc-6` (span 4)

## CSS Pattern

```css
.bento-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto auto;
    gap: 20px;
}

.bc-1 { grid-column: span 4; grid-row: span 2; }
.bc-2 { grid-column: span 4; }
.bc-3 { grid-column: span 4; }
.bc-4 { grid-column: span 3; }
.bc-5 { grid-column: span 5; }
.bc-6 { grid-column: span 4; }

@media (max-width: 1024px) {
    .bento-card { grid-column: span 6 !important; }
    .bc-1 { grid-column: span 12 !important; }
}
@media (max-width: 768px) {
    .bento-card { grid-column: span 12 !important; }
}
```

## Card Hover Effect

```css
.bento-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    border-color: transparent;
}
.bento-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--accent);
    transform: scaleX(0);
    transition: transform 0.3s;
    transform-origin: left;
}
.bento-card:hover::after { transform: scaleX(1); }
```

## Color Variables (Erik's Palette)

```css
:root {
    --bg: #FAFAFA;
    --bg-alt: #F0F0ED;
    --surface: #FFFFFF;
    --primary: #0F172A;      /* navy */
    --accent: #0D9488;        /* teal */
    --accent-2: #F59E0B;      /* gold */
    --text: #1A1A1A;
    --text-2: #6B6B6B;
    --text-3: #9B9B9B;
    --border: #E5E5E0;
}
```

## Typography Stack

```css
/* Body */ font-family: 'DM Sans', sans-serif;
/* Headings */ font-family: 'Space Grotesk', sans-serif;
/* Erik's preferred */ font-family: 'Outfit', sans-serif;
```

## Key Sections in NeuralFlow Design

| Section | Layout | Key Features |
|---|---|---|
| Hero | 2-col split | Left: text + CTAs + stats; Right: floating cards + orb |
| Services | Bento grid 12-col | Asymmetric card sizes, top-accent hover |
| Stats | Full-width strip | Dark navy background, 4-col horizontal |
| Process | 4-col equal | Card with step badge, border, hover lift |
| Results | 3-col equal | Big metric number, accent underline on hover |
| Pricing | 3-col equal | Featured card scaled up + glow border |
| Testimonials | 3-col equal | Quote mark decorative, avatar circle |
| CTA Banner | Full-width | Radial gradient orbs behind text |

## Floating Tags (Hero)

```css
.hero-floating-tag {
    position: absolute;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--primary);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 8px;
}
```

## Reveal Animation

```js
const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

```css
.reveal { opacity: 0; transform: translateY(24px); transition: all 0.5s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

## Dynamic Content Fetch Pattern

```js
async function loadContent() {
    const res = await fetch('data/content.json');
    const c = await res.json();

    // Bento services with cycling classes
    const bentoClasses = ['bc-1', 'bc-2', 'bc-3', 'bc-4', 'bc-5', 'bc-6'];
    document.getElementById('servicesGrid').innerHTML = c.services.map((s, i) => `
        <div class="bento-card ${bentoClasses[i % bentoClasses.length]} reveal">
            <span class="bento-num">0${i+1}</span>
            <div class="bento-icon">${ICONS[s.icon] || ICONS.chat}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <div class="bento-tags">${s.tags.map(t => `<span class="bento-tag">${t}</span>`).join('')}</div>
        </div>
    `).join('');
}
```

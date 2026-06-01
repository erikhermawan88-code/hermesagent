---
name: responsive-audit
description: "Responsive design audit: mobile/tablet/desktop breakpoints, spacing scale, touch targets, horizontal scroll check."
---

# Responsive Design Audit Skill

## Trigger
Ketika user mau check responsiveness website, atau sebelum launch ke production — selalu lakukan responsive audit.

## Breakpoints (Global Standard)

| Name | Width | Target |
|------|-------|--------|
| Mobile XS | 320-374px | Old smartphones |
| Mobile | 375-767px | iPhone, Android phones |
| Tablet | 768-1023px | iPad portrait, small laptops |
| Desktop | 1024-1279px | Standard laptops |
| Desktop L | 1280-1535px | Large screens |
| Desktop XL | 1536px+ | Wide monitors |

## Audit Steps

### 1. Mobile Mockup Check (375px)
- [ ] Text overflow pada headings
- [ ] Horizontal scroll (cek overflow-x)
- [ ] Card/grid collapse jadi 1 kolom
- [ ] Touch target min 44x44px
- [ ] Image aspect ratios tetap correct
- [ ] Navigation collapse / hamburger menu
- [ ] Padding horizontal min 16px (touch-safe)
- [ ] Font size min 14px

### 2. Tablet Check (768px)
- [ ] 2-column grid aktif
- [ ] Side padding adequate
- [ ] Images tidak stretch
- [ ] Navigation space cukup

### 3. Desktop Check (1280px)
- [ ] Max content width tidak stretch penuh
- [ ] Whitespace cukup
- [ ] Typography scale sesuai
- [ ] Hero image/design optimal

### 4. Wide Screen (1920px+)
- [ ] No stretched/zoomed content
- [ ] Background patterns/gradients tidak distort
- [ ] Footer tetap centered & bounded

## Spacing Scale (4px Base)
```
4px   — xxxs (tight)
8px   — xxs (icon gap)
12px  — xs
16px  — sm (mobile padding)
24px  — md (card padding mobile)
32px  — lg (section gap mobile)
48px  — xl (section gap tablet+)
64px  — 2xl (desktop section padding)
80px  — 3xl (desktop hero padding)
96px  — 4xl (desktop section gap)
```

## Common Issues & Fix Quick Ref

### Horizontal Scroll
```css
html { overflow-x: hidden; }
body { overflow-x: hidden; }
```

### Text Overflow di Mobile
```css
h1, h2 { overflow-wrap: break-word; word-break: break-word; }
.headline { font-size: clamp(1.5rem, 4vw, 3rem); }
```

### Touch Targets
```css
button, a, .clickable { min-height: 44px; min-width: 44px; padding: 12px 16px; }
```

### Image Responsive
```css
img { max-width: 100%; height: auto; object-fit: cover; }
```

### Container Width Bounded
```css
.container { max-width: 1280px; margin-left: auto; margin-right: auto; padding-left: 24px; padding-right: 24px; }
```

## Pitfalls
- TEST di real device — iOS Safari punya quirks
- `100vw` causes horizontal scroll kalau ada vertical scrollbar — use `100%`
- Fixed width elements break responsiveness — gunakan `max-width`
- Font dengan `vw` tanpa `clamp()`会造成 text terlalu kecil di mobile

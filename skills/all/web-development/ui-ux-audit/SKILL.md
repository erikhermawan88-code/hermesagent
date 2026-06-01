---
name: ui-ux-audit
description: "Audit UI/UX website: layout, typography, color, responsiveness, accessibility. Checklist-based review sebelum launch."
---

# UI/UX Audit Skill

## Trigger
Lakukan audit UI/UX ketika user meminta review website, ingin memeriksa quality standard, atau sebelum deliverable.

## Audit Checklist

### 1. Layout & Structure
- [ ] Visual hierarchy: heading → subheading → body → tertiary jelas
- [ ] Whitespace: adequate padding/margin antar section (min 64px antar sections)
- [ ] Grid system: konsisten (12-column atau 8-column)
- [ ] No layout shift / CLS < 0.1
- [ ] Section rhythm: hero → value prop → features → social proof → CTA

### 2. Typography
- [ ] Font pairing: heading (display/serif) + body (sans-serif), NO same font for everything
- [ ] Type scale: min 3 distinct sizes (display, heading, body)
- [ ] Line height: body 1.5-1.7, headings 1.1-1.25
- [ ] Letter spacing: headings -0.02em to -0.04em
- [ ] Max line length: 65-75 chars untuk body text
- [ ] Font size: body minimum 16px (mobile 14px)

### 3. Color & Contrast
- [ ] WCAG AA contrast ratio: 4.5:1 untuk body text, 3:1 untuk large text
- [ ] Color palette: max 5-7 colors (primary, secondary, accent, neutrals, semantic)
- [ ] CTA buttons: high contrast against background
- [ ] Hover/active states: visible feedback
- [ ] Dark/light mode consistency (kalau applicable)

### 4. Visual Design
- [ ] Border radius: konsisten (4px, 8px, 12px, 16px, 24px)
- [ ] Shadows: max 3 intensity levels (sm, md, lg)
- [ ] No flat design yang membosankan — subtle depth
- [ ] Icons: consistent style (outline vs filled, stroke weight 1.5-2px)
- [ ] Image treatment: consistent aspect ratios, object-fit cover

### 5. Interaction & Motion
- [ ] Hover states: semua clickable element
- [ ] Focus states: keyboard accessibility ring (outline)
- [ ] Micro-interactions: button press, card hover, form feedback
- [ ] Animation duration: 150-300ms untuk micro, 400-600ms untuk transitions
- [ ] Easing: ease-out untuk enter, ease-in-out untuk transform
- [ ] Reduced motion respect: `prefers-reduced-motion`

### 6. Responsiveness
- [ ] Mobile-first breakpoints: 375px, 768px, 1024px, 1280px
- [ ] Touch targets: min 44x44px
- [ ] Text tidak overflow di mobile
- [ ] Consistent spacing scale: 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96)
- [ ] Horizontal scroll check: `overflow-x: hidden` on body/html

### 7. Content & Copy
- [ ] No lorem ipsum / placeholder content
- [ ] Section labels: uppercase small caps atau eyebrow text
- [ ] Descriptive links: bukan "click here"
- [ ] No orphans words di headlines
- [ ] Bahasa konsisten: Formal/informal sesuai audience

### 8. Accessibility
- [ ] Semantic HTML: nav, main, section, article, footer
- [ ] Alt text: semua images
- [ ] Form labels: explicit labels, bukan placeholder as label
- [ ] Keyboard navigation order: logical tab order
- [ ] Skip to content link
- [ ] ARIA labels kalau perlu

## Audit Steps

1. **Screenshot review** — visual inspection untuk layout, spacing, typography
2. **Code inspection** — scroll audit CSS untuk spacing, font sizes, colors
3. **DevTools check** — Console errors, computed styles, accessibility panel
4. **Mobile test** — resize ke 375px, check overflow & touch targets
5. **Lighthouse audit** — Accessibility score, Performance, Best Practices

## Output Format

```
## UI/UX Audit Report

### ✅ Yang Sudah Bagus
- item

### ⚠️ Yang Perlu Diperbaiki
- Priority HIGH:
  - ...
- Priority MEDIUM:
  - ...
- Priority LOW:
  - ...

### 📋 Lighthouse Scores
- Performance: X%
- Accessibility: X%
- Best Practices: X%
- SEO: X%

### Action Items
1. [HIGH] ...
2. [MEDIUM] ...
```

## Pitfalls
- Jangan terlalu strict di mobile-first project yang memang mobile-only
- WCAG AA sudah cukup, AAAs boleh nihil (terlalu restrictive)
- Color contrast check pakai DevTools color picker, bukan mata
- Focus state JANGAN di-hide dengan `outline: none` tanpa alternatif

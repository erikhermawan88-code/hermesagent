---
name: design-tokens
description: "Create and maintain design token systems: colors, typography, spacing, shadows. Source of truth untuk visual consistency."
---

# Design Token Specification Skill

## Trigger
Ketika user meminta design system, design tokens, atau ingin standardize colors/typography/spacing untuk project. Atau ketika bikin/maintain multiple related websites.

## What Are Design Tokens
Design tokens = single source of truth untuk visual decisions: colors, typography, spacing, shadows, border radius, animation timing.

## Token Structure Template

```json
{
  "color": {
    "primary": {
      "50": "#...",
      "500": "#...",
      "900": "#..."
    },
    "neutral": {
      "0": "#FFFFFF",
      "50": "#F9FAFB",
      "100": "#F3F4F6",
      "500": "#6B7280",
      "900": "#111827"
    }
  },
  "font": {
    "heading": {
      "fontFamily": "Space Grotesk, sans-serif",
      "weights": [400, 500, 600, 700],
      "lineHeight": 1.2
    },
    "body": {
      "fontFamily": "DM Sans, sans-serif",
      "weights": [400, 500, 700],
      "lineHeight": 1.6
    }
  },
  "space": {
    "1": "4px", "2": "8px", "3": "12px", "4": "16px",
    "6": "24px", "8": "32px", "12": "48px", "16": "64px"
  },
  "shadow": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.07)",
    "lg": "0 10px 15px rgba(0,0,0,0.1)"
  },
  "radius": {
    "sm": "4px", "mdd": "8px", "lg": "16px", "full": "9999px"
  }
}
```

## Generate CSS Custom Properties
```css
:root {
  --color-primary-500: #0d9488;
  --color-neutral-900: #111827;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --space-4: 16px;
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --radius-md: 8px;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
}
```

## Popular Font Pairings

| Heading | Body | Vibe |
|---------|------|------|
| Space Grotesk | DM Sans | Modern, Techy |
| Outfit | Inter | Clean, Startup |
| Playfair Display | DM Sans | Editorial, Premium |
| Manrope | Inter | Friendly, SaaS |

## Pitfalls
- Jangan buat 50+ tokens — simplicity wins
- Color tokens butuh MIN 3 shades
- Font weights harus ada di Google Fonts sebelum dipake
- Spacing scale: kelipatan 4px supaya align dengan grid
- Shadow jangan terlalu strong — max 20px blur

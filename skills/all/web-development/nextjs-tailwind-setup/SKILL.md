---
name: nextjs-tailwind-setup
description: Next.js + TailwindCSS project setup, conventions, and best practices for premium web development
tags: [nextjs, tailwindcss, react, typescript, frontend]
version: 1.0.0
created: 2026-05-27
---

# Next.js + TailwindCSS Setup & Best Practices

## Project Structure

```
src/
├── app/                    # App router (Next.js 13+)
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles + Tailwind
│   └── (routes)/
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── sections/          # Page sections (Hero, Features, etc.)
│   └── elements/         # Reusable elements (Button, Card, etc.)
├── lib/
│   ├── utils.ts           # cn() helper, utils
│   └── constants.ts       # Site constants
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript types
```

## Key Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

## TailwindCSS v4 Setup

Tailwind v4 uses CSS-first configuration. In `globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.15 0.2 250);
  --color-secondary: oklch(0.85 0.15 150);
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Cal Sans", "Inter", sans-serif;
}
```

## Essential Packages

```bash
npm install framer-motion gsap three @react-three/fiber @react-three/drei lucide-react clsx tailwind-merge
```

## Shadcn UI Setup

```bash
npx shadcn@latest init
npx shadcn@latest add button card badge input label
```

## Animation Patterns

### Framer Motion - Fade In Up

```tsx
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export function AnimatedSection({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
}
```

### GSAP - ScrollTrigger

```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Stagger animations
gsap.to(".card", {
  y: -20,
  opacity: 1,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".container",
    start: "top 80%",
  }
});
```

## Performance Tips

1. **Use `next/image`** for automatic optimization
2. **Lazy load** below-fold components with `dynamic()`
3. **Preload** critical fonts with `next/font`
4. **Use `will-change`** sparingly for animations

## Deployment

### Vercel (recommended)
```bash
npx vercel --prod
```

### Static Export (for VPS/nginx hosting)
Required `next.config.ts`:
```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
```
Then run `npm run build` → output in `/out` directory → serve with nginx or `npx serve`.

### VPS Nginx Config
For static export, configure nginx to `try_files $uri $uri/ /index.html`.

## Verification

```bash
npm run build  # Must pass without errors
npm run lint   # No warnings
```

## Pitfalls & Troubleshooting

### See Also
- `references/build-troubleshooting.md` — TypeScript errors, VPS port restrictions, serve quirks, static export guide

### Network-Restricted VPS Deployment (Tunneling Fails)
### Network-Restricted VPS Deployment (Tunneling Fails)

When the VPS blocks outgoing SSH (port 22), UDP (Cloudflare QUIC), or TCP (cloudflared port 7844), tunnel-based approaches fail. Pattern:

1. **Static export** the site: `output: 'export'` in `next.config.ts`
2. **Copy static files** to a third-party host (Vercel, Netlify, Cloudflare Pages)
3. **Never try to tunnel** from a network-restricted VPS — it's a dead end
Useful fallbacks when all tunnels fail:
- **Netlify Drop** (https://app.netlify.com/drop) — drag `out/` folder, instant URL
- **Vercel CLI** — `npx vercel --prod` from machine with unblocked internet
- **GitHub Pages** — push to repo, enable Pages in settings
- **Cloudflare Pages** — `wrangler pages deploy out/`

For VPS with port 80 open but HTTPS blocked outbound:
- Try `npx serve out/ -l 80` (may need sudo)
- Or serve on high port (8080, 3000) and use VPS's existing web root at `/var/www/html/`

### YouTube-Driven Full-Stack Build Pattern

When building from a YouTube tutorial (no source code available):

**Step 1: Extract content** — Use `yt-dlp` to download auto-generated subtitles:
```bash
uv tool install yt-dlp
yt-dlp --write-auto-sub --sub-lang id --skip-download \
  --output "/tmp/yt_%(id)s.%(ext)s" \
  "https://www.youtube.com/watch?v=${VIDEO_ID}"
```
Parse the `.vtt` file: strip headers, extract cue content, join sequential cues.

**Step 2: Design from video** — Map features from subtitle text → write SPEC.md → build.

**Step 3: Next.js + Express backend pattern** — Use when self-hosted VPS with no npm publish:
- Next.js Pages Router frontend on port 3000
- Separate Express backend on port 3001 (mock data or real API)
- Proxy `/api/*` → `localhost:3001` via `next.config.js` rewrites
- Start both with `concurrently` in package.json `"dev"` script

**Step 4: Deploy when tunnels are blocked** — See `references/vps-port-access.md` for the exact decision tree.

Full session notes: `references/youtube-fullstack-build.md`

### Dev Server Port Conflicts

Next.js 16 hangs on port 3000 by default. If another instance is running:

```bash
# Find and kill existing Next.js processes
pkill -f "next"
sleep 2

# Start on custom port (Next.js 16 uses PORT env var, NOT --port flag)
PORT=3456 npm run dev

# Verify it's up
curl -s -o /dev/null -w "%{http_code}" http://localhost:3456/
```

**Common error**: `unknown option '--port'` — this means you're using `--port` flag which doesn't exist in Next.js 16. Use `PORT=env var instead.

**Another instance running error**: Next.js will tell you the PID and directory of the existing process:
```
⨛ Another next dev server is already running.
- Local:        http://localhost:3000
- PID:          207098
- Dir:          /home/admin/web-projects/xxx
```
Kill with `kill <PID>` or `pkill -f "next"`.

### Shadcn UI Interactive Init Hangs

`npx shadcn@latest init` can hang waiting for interactive input. Pre-create `components.json`:

```bash
cat > components.json << 'EOF'
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "src/app/globals.css",
    "config": "tailwind.config.ts",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
EOF

npx shadcn@latest add button card badge -y
```

### npm Global Install Location

Global packages install to `/home/admin/.hermes/node/lib/`, not system npm. This is fine for CLI tools but Next.js project dependencies should be local (`npm install` inside project dir).

### Production Build

```bash
npm run build           # Creates .next/ directory
npm run start           # Runs production server (not the same as dev)
# For static export:
npm run build && npx next export
```
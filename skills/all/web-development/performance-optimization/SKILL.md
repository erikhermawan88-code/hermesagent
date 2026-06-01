---
name: performance-optimization
description: "Web performance optimization: Core Web Vitals, image optimization, lazy loading, and CDN strategies"
tags: [performance, web-vitals, optimization, speed, cdn]
version: 1.0.0
created: 2026-05-27
---

# Web Performance Optimization

## Core Web Vitals Targets

| Metric | Target | Good |
|--------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 🟢 |
| FID (First Input Delay) | < 100ms | 🟢 |
| CLS (Cumulative Layout Shift) | < 0.1 | 🟢 |
| INP (Interaction to Next Paint) | < 200ms | 🟢 |

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Product hero"
  width={1200}
  height={600}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Responsive Images

```tsx
<Image
  src={heroImage}
  alt="Hero"
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## Lazy Loading

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false
});

// Lazy load below-fold sections
const Testimonials = dynamic(() => import('@/components/Testimonials'));
```

## Font Optimization

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## Bundle Optimization

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
```

## Critical CSS

```css
/* Inline critical CSS in <head> */
<style>
  .hero { margin: 0; padding: 2rem; }
  .hero h1 { font-size: 3rem; }
</style>
```

## Caching Headers

```typescript
// next.config.ts
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Performance Checklist

- [ ] Add `loading="lazy"` to below-fold images
- [ ] Preload critical fonts
- [ ] Use `priority` on LCP images
- [ ] Enable text compression (gzip/brotli)
- [ ] Set `Cache-Control` headers
- [ ] Remove unused CSS/JS
- [ ] Use WebP/AVIF formats
- [ ] Implement lazy loading for components
- [ ] Monitor with Google PageSpeed Insights
- [ ] Set up real user monitoring (RUM)
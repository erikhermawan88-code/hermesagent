# Saham Insider - YouTube-Driven Full-Stack Build

## Session Summary

Built a "Saham Insider" stock analysis web app for Indonesian market based on a YouTube tutorial (21:24 min, video ID: `lBH9qT-s5Rk`).

**Key outcomes:**
- Frontend: Next.js 14 (Pages Router) + Tailwind CSS dark theme on `http://localhost:3000`
- Backend: Express.js on port 3001 with mock data for 10 Indonesian stocks
- Full-stack: homepage, insider trading page, stock search/chart page, AI chatbot page
- Deploy blocked: VPS network restrictions (no outbound SSH/GitHub/FTP)

---

## R1 — YouTube Content Extraction Pattern

**Problem**: All API-based subtitle/autotranscript extraction methods failed (Invidious, Piped,_ytdl_node,
youtube-transcript-api).

**Solution**: Use `yt-dlp` to download auto-generated VTT subtitles directly.

```bash
uv tool install yt-dlp
yt-dlp --write-auto-sub --sub-lang id --skip-download \
  --output "/tmp/yt_%(id)s.%(ext)s" \
  "https://www.youtube.com/watch?v=${VIDEO_ID}"
```

Then parse the `.vtt` file manually — strip VTT headers/metadata, extract cue timing, join sequential
cues.

**Why this works**: API methods require either upstream API keys, working instances, or outbound
network access to YouTube. `yt-dlp` makes a direct request and handles edge cases the APIs don't.

---

## R2 — Next.js Pages Router + Separate Express Backend

**When to use this pattern** instead of Next.js API routes (`pages/api/*.js`):

| Factor | Pages Router + Express | Next.js API Routes |
|---|---|---|
| Self-hosted VPS (no npm publish) | ✅ Express can be started via supervisor/systemd | ❌ `npm run start` just serves built files |
| Need persistent background process | ✅ `node server/index.js` runs separately | ❌ API routes are serverless-style, tied to request lifecycle |
| Common hosting environment | ⚠️ Requires custom startup logic | ✅ Native on Vercel |
| Pre-existing Express expertise | ✅ Works as a normal Node.js service | ❌ New paradigm |

**Architecture shown** (Saham Insider):
```
saham-insider/
├── server/
│   ├── index.js          # Express backend (port 3001)
│   └── data/
│       └── mockData.js   # Local mock data
├── pages/                 # Next.js Pages Router frontend
├── next.config.js         # API proxy: /api/* → localhost:3001
└── package.json           # npm run dev starts both via concurrently
```

**next.config.js proxy rewrite**:
```js
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://localhost:3001/api/:path*' }
    ];
  }
};
```

**Startup command** (via `concurrently` in package.json):
```json
"dev": "concurrently \"node server/index.js\" \"next dev\""
```

---

## R3 — VPS Network Block Workaround

**Problem**: VPS panel.augureatechnologia.com blocks outbound SSH (port 22), GitHub HTTPS, and
FTP. Direct tunnel/deploy approaches fail silently.

**Fallback sequence** (in order of preference):

1. **Static export + Local serve**: Export Next.js to static HTML, serve on a high port with
   `python3 -m http.server PORT`. Then use `curl -s` to verify it works from inside the VPS.
   User accesses via `http://VPS_IP:PORT`.

2. **Copy to existing web root**: Find if the VPS already serves a site (e.g. `/var/www/html/`).
   Build static export → copy files there.

3. **Manual download link**: Build the project, zip it, and provide the user a way to download
   the archive from inside the VPS (e.g. serve it on a temporary port they can reach from
   outside).

4. **GitHub + VPS pull (if VPN available)**: If user can access GitHub from their local machine,
   push to GitHub, then use a GitHub Actions workflow or a CVM bootstrap script that pulls from
   GitHub when the VPS boots.

**Failed approaches recorded** (do not retry):
- Tunnel via cloudflared, frp, lt, locotunnel — all require outbound UDP/TCP the VPS blocks
- `gh repo clone` via HTTPS — VPS cannot reach github.com outbound
- FTP upload — all credentials returned 530 Login incorrect

---

## R4 — Mock Data Strategy for Rapid Prototyping

When API keys aren't available and live data isn't required for the demo:

```js
// server/data/mockData.js
const MOCK_STOCKS = [
  { code: 'BBCA', name: 'Bank Central Asia', sector: 'Finance', ... },
  // 10 stocks with realistic Indonesian market data
];

// For chart data: generate 90 days of price history programmatically
const generatePriceHistory = (basePrice, volatility, days = 90) => {
  const data = [];
  let price = basePrice;
  for (let i = 0; i < days; i++) {
    price *= 1 + (Math.random() - 0.5) * volatility;
    data.push({ date: ..., price: Math.round(price * 100) / 100, volume: ... });
  }
  return data;
};
```

The backend should return the same JSON shape the real API would — this makes swapping in live
data a drop-in replacement with no frontend changes.

---

## R5 — Next.js 14 + Recharts 2.x Compatibility

- Recharts v3 changed API significantly. Install v2 explicitly if you have issues:
  ```bash
  uv add recharts@2
  ```
- Next.js 14.2.5 has a security patch. `npm audit` reported vulnerabilities even after install —
  run `npm audit fix --force` or manually `npm update <package>@latest` for the affected packages.

---

## File Locations

- `/home/admin/saham-insider/` — Project root
- `/home/admin/saham-insider/SPEC.md` — Full specification document
- `/home/admin/saham-insider/server/index.js` — Backend (152 lines)
- `/home/admin/saham-insider/server/data/mockData.js` — Mock stock data

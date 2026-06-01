# Build & Deployment Troubleshooting

## Next.js Build Failures

### TypeScript Errors
When build fails on TypeScript errors, fix inline:
- `A type named 'xxx' must be defined within the file` → define the type inline or import
- Arrow function used as JSX → wrap in parentheses `(fn)()`
- Unused imports → remove or prefix with `_`

### Build Succeeds But No Output
Check `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',  // Must be present for static export
  images: {
    unoptimized: true,  // Required for static export
  },
};
```
Run `npm run build` — output goes to `/out` directory (not `.next/`).

## Python HTTP Server Quirk

`python3 -m http.server` listens on port 8080 by default. When running:
```bash
python3 -m http.server 8080
# Output: "Serving HTTP on 0.0.0.0:8080"
```

Access from same machine: `http://localhost:8080`
This does NOT expose to internet — only local loopback.

## VPS Network Restrictions Pattern

This VPS (109.123.232.85) blocks:
- Outgoing SSH (port 22) → serveo.net, localhost.run tunnels fail
- UDP outbound → Cloudflare QUIC tunnel fails
- TCP port 7844 → cloudflared HTTP2 fails
- HTTPS outbound from VPS → cannot install packages from internet

**What works**: Static export + third-party host deployment (Vercel, Netlify, etc.)

**What doesn't work**: Any tunnel initiated from this VPS

## Static Export Checklist

1. `next.config.ts` has `output: 'export'` + `images.unoptimized: true`
2. Run `npm run build` — verify `/out` folder exists
3. Copy contents of `/out` to hosting provider
4. For SPA routing on static hosting, configure:
   - Netlify: `_redirects` file with `/* /index.html 200`
   - Vercel: automatic (handles SPA)
   - Nginx: `try_files $uri $uri/ /index.html`

## AgentMail API from Restricted VPS

If VPS blocks HTTPS outbound, AgentMail API calls from this VPS will timeout.
Solution: Make API calls from a machine with unrestricted internet access, or use a cron job that runs on a schedule from a different environment.
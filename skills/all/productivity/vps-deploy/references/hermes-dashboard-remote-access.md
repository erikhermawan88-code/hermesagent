---
name: hermes-dashboard-remote-access
description: Expose hermes dashboard publicly — 0.0.0.0 binding, --insecure flag, provider firewall diagnosis, nginx reverse proxy setup. For Contabo VPS at 109.123.232.85.
version: 1.1.0
author: Hermes Agent
license: MIT
platforms: [linux]
metadata:
  hermes:
    tags: [hermes, dashboard, nginx, proxy, firewall, contabo]
    related_skills: [vps-deploy]
---

# Hermes Dashboard — Remote Access Pattern

## The Problem

`hermes dashboard` by default binds to `127.0.0.1` (loopback only). Inaccessible from outside the server even if the port is open in the firewall.

Binding to `0.0.0.0` without auth providers triggers a hard security gate:
```
Refusing to bind dashboard to 0.0.0.0 — the OAuth auth gate engages on non-loopback binds,
but no auth providers are registered and no bundled plugin reported a reason.
```

## The Solution

```bash
hermes dashboard --port 9119 --host 0.0.0.0 --skip-build --no-open --insecure
```

Flags:
- `--host 0.0.0.0` — bind to all interfaces (not just loopback)
- `--insecure` — bypass auth gate (no auth providers registered)
- `--skip-build` — skip webpack rebuild (use pre-built dist)
- `--no-open` — don't auto-open browser

## Verification

```bash
curl -s -o /dev/null -w "HTTP:%{http_code}" http://109.123.232.85:9119/
# Expected: HTTP:200

ss -tlnp | grep 9119
# Expected: LISTEN 0.0.0.0:9119
```

## Security Note

`--insecure` is **NOT recommended on untrusted/public networks**. The dashboard will have no authentication. Use cases:
- Local development access
- VPN-protected networks
- Internal network exposure only
- Quick verification/demo

For production public exposure, either:
1. Set up a DashboardAuthProvider plugin (OAuth, etc.)
2. Use nginx reverse proxy with basic auth
3. Route through Cloudflare Access / VPN

## Firewall-Blocked Port Diagnosis

Even when dashboard binds correctly to `0.0.0.0:9119` and localhost curl returns 200, external access may time out. This is the **provider-level firewall** (Contabo Cloud Firewall) blocking the port.

**Step-by-step diagnosis:**
```bash
# Step 1: Confirm binding on 0.0.0.0
ss -tlnp | grep 9119
# Must show: LISTEN 0.0.0.0:9119 (not 127.0.0.1)

# Step 2: Confirm localhost works
curl -s -o /dev/null -w "HTTP:%{http_code}" http://127.0.0.1:9119/
# Must return: HTTP:200

# Step 3: Confirm VPS is reachable externally
ping -c1 -W2 109.123.232.85
# Must succeed

# Step 4: Confirm port 80 works (baseline — this port IS open)
curl -s -o /dev/null -w "HTTP:%{http_code}" http://109.123.232.85/
# Must return: HTTP:200

# Step 5: Confirm target port fails externally
curl -s -o /dev/null -w "HTTP:%{http_code}" http://109.123.232.85:9119/
# If firewall-blocked: HTTP:000 or timeout
```

**If the diagnosis shows firewall blocking:**
- **Option A (recommended):** nginx reverse proxy on port 80 → `digitalnusa.com/hermes`
- **Option B:** Open port via Contabo Customer Panel → Products → VPS → Firewall

## Nginx Reverse Proxy Setup

On Contabo VPS with DirectAdmin, nginx is managed by DirectAdmin. To route `/hermes` to dashboard:

**Option 1: Custom include (survives DirectAdmin rebuilds)**
```bash
# Edit /etc/nginx/nginx-includes.conf (empty by default)
sudo nano /etc/nginx/nginx-includes.conf
```
Add:
```nginx
location /hermes/ {
    proxy_pass http://127.0.0.1:9119/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```
Then reload: `sudo nginx -t && sudo systemctl reload nginx`

**Option 2: Direct file edit (may be overwritten)**
Edit `/etc/nginx/nginx-vhosts.conf` directly, add the location block inside the existing server { } block.

## Persistent Background Process

Run dashboard in background with Hermes terminal background mode:
```bash
terminal(background=true, command="cd ~/.hermes/hermes-agent && source venv/bin/activate && hermes dashboard --port 9119 --host 0.0.0.0 --skip-build --no-open --insecure", notify_on_complete=true)
```

Monitor with `process(action='poll', session_id='...')`.
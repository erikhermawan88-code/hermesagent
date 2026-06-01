---
name: deployment-security
description: "Server deployment priority rules: SSH Key > SFTP > rsync > Git. Avoid FTP, brute-force, excessive reconnect, high parallel upload. Respect firewall, use retry protection, minimize server load."
risk: safe
date_added: "2026-05-28"
---

# Deployment Security Rules

## Priority Order (always follow this sequence)
1. **SSH Key Authentication** — preferred
2. **SFTP** — second option
3. **rsync incremental deploy** — third option
4. **Git-based deployment** — last resort / simple sites

## Hard Rules
- **NEVER use insecure FTP** unless explicitly requested by Erik
- Avoid brute-force behavior (multiple concurrent connections, rapid retries)
- Avoid excessive reconnect attempts to same server
- Avoid high parallel upload (max 2 concurrent connections)
- Respect hosting firewall systems (wait between operations)
- Use delay and retry protection (exponential backoff)
- Minimize server load (no heavy scripts during deploy)

## When to Apply
- All file upload/deployment operations
- DirectAdmin API calls
- SFTP/SCP operations
- rsync transfers
## VPS Access Patterns (Erik's Setup)

### DirectAdmin (Primary — web panel)
- URL: `https://digitalnusa.com:2222` (may timeout/firewalled)
- Session cookie: expires after failed logins, causes IP blacklisting
- If blacklisted: re-login via browser first before API calls work again
- File Manager: `/public_html/` is the web root

### VPS SSH Access (Often Blocked)
Two known VPS boxes:
- **Clipper VPS**: `43.134.83.2` — port 22 SSH refused, port 2222 firewalled
- **Contabo/Primary VPS**: `109.123.232.85:2222` — SSH blocked entirely

When SSH/rsync blocked:
1. **Pinggy tunnel** — use `devops/pinggy-tunnel` skill for reverse SSH tunnel over port 443
2. **Local HTTP server** — serve files locally for preview, share via Pinggy tunnel URL
3. **DirectAdmin File Manager** — manual upload if panel accessible

### Erik's Deploy Path Convention
Always include in final output:
```
digitalnusa.com/[folder]/[subfolder]/
```
Example: `digitalnusa.com/neuralflow/public/`

### Python HTTP Server for Local Preview
```bash
# Serve from project directory (port must be free)
cd /path/to/project && python3 -m http.server 8888 --bind 0.0.0.0
# Verify: curl http://localhost:8888/ | head -5
```
Free ports confirmed on this machine: 8787, 8788, 8789 (may have stale listeners). Use `ss -tlnp | grep <port>` before binding.

- Any server-side scripting/migration

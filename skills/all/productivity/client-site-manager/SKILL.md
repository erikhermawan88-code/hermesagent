---
name: client-site-manager
description: Use when managing 12+ client websites via FTP/SFTP — tracks credentials, organizes per-client file structures, handles multipurpose deployments to VPS or direct FTP. Core skill for website management workflow.
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [ftp, sftp, client-websites, site-management, credentials]
    related_skills: [ftp-file-transfer, vps-deploy, website-redesign]
---

# Client Site Manager

Manages credentials and access info for all client websites you handle. Centralized store for FTP/SFTP credentials, domain info, and project status.

## Job Queues / Work Queues

### Client Master List

Store in `~/.hermes/client-sites/`. Each client gets its own `.env` file:

```
CLIENT_NAME=[Client Name]
CLIENT_CODE=[CODE]
WEBSITE_URL=https://www.example.com
FTP_HOST=109.123.232.85
FTP_PORT=22
FTP_USER=admin
FTP_PASS=<encrypted or keyring>
SSH_KEY=~/.ssh/id_rsa_example
Nginx ROOT=/var/www/example.com
DOMAIN_REGISTRAR=[Registrar]
DOMAIN_EXPIRY=YYYY-MM-DD
NOTES=[CMS type, hosting panel, DNS provider]
```

Create encrypted password store with `pass`:
```bash
# Store FTP password securely
pass init "Hermes Agent"
pass insert clients/example.com -m
# Then reference via: $(pass clients/example.com)
```

## Directory Structure

```
~/client-sites/
├── digitalnusa.com/
│   ├── .env                  # Credentials (gitignored!)
│   ├── project-info.md      # Client notes, tech stack
│   ├── backdoors/            # Backup sebelum coding
│   └── deliveries/          # Final output folders
├── client2.com/
├── client3.com/
└── _templates/
    └── premium-redesign/    # Template project structure
```

## Workflow

### 1. Onboard New Client

```bash
# Create structure
CLIENT="digitalnusa.com"
mkdir -p ~/client-sites/$CLIENT/{backups,deliveries,project-info}
cp ~/client-sites/_templates/premium-redesign/COPYME ~/client-sites/$CLIENT/redesign/

# Add to tracker
echo "$CLIENT|pending|WordPress|$(date +%Y-%m-%d)" >> ~/.hermes/client-sites/SITE_TRACKER.csv
```

### 2. Daily Work Check

```bash
# List all active projects
cat ~/.hermes/client-sites/SITE_TRACKER.csv

# Check what's in progress
ls -la ~/client-sites/*/project-info.md
```

## Site Tracker CSV Format

```
domain,status,tech_stack,last_action,last_date
digitalnusa.com,redesign,WordPress,Hero section draft,2026-05-27
client2.com,maintenance,HTML static,Security update,2026-05-20
client3.com,pending,Laravel,Landing page,2026-05-15
```

## Quick Commands

```bash
# List all client sites
ls ~/client-sites/

# Check status of all sites
while read line; do echo "$line"; done < ~/.hermes/client-sites/SITE_TRACKER.csv

# Get FTP credentials for a site
source ~/client-sites/digitalnusa.com/.env && echo "Host: $FTP_HOST"

# Backup a site before working
SKIP_SITE=1 && bash ~/client-sites/_scripts/remote-backup.sh digitalnusa.com
```

## ⚠️ IMPORTANT — This Machine IS the Server

**For digitalnusa.com:** The agent runs ON the server itself. Files in `/home/admin/domains/digitalnusa.com/public_html/<folder>/` are immediately live — no upload step needed.

- ❌ Ports 22, 21, 2222 are firewalled from this machine (this agent's context)
- ✅ nginx web root = `/home/admin/domains/digitalnusa.com/public_html/`
- ✅ Write file → live at `https://digitalnusa.com/<folder>/`

Only use SSH/FTP for OTHER servers. For digitalnusa.com, just write files directly.

When a client's VPS uses DirectAdmin (common on cheap VPSes), FTP may not be pre-configured even if FTP accounts exist in DA.

### DirectAdmin Host Patterns

| Port | Service | Notes |
|------|---------|-------|
| 2222 | DirectAdmin | Web control panel (HTTP/HTTPS) — NOT SSH |
| 21 | FTP | Often closed; check if daemon is actually running |
| 22 | SSH | Standard, but may be blocked by some networks |

### DirectAdmin File Manager Upload

If FTP is closed and you have DA credentials:
1. Login at `https://host.com:2222/evo/login`
2. Navigate to legacy file manager: **`/CMD_FILE_MANAGER`** (not Evolution Vue skin)
3. The legacy skin has visible Upload/Copy/Move buttons; Evolution skin hides them
4. Files go to: `/home/{username}/domains/{domain}/public_html/`

### DA FTP Account Facts

- DA FTP accounts → Linux system users (`/home/{username}/`) with domain subdirectories
- FTP account `mangrof` → system user `mangrof` (uid=1004) with home `/home/mangrof/`
- Even if DA shows the account as "active", FTP daemon (vsftpd/proftpd) may not be installed/running
- DA user home path: `/home/{user}/domains/{domain}/public_html/`

## Common Pitfalls

1. **Passwords in plain text** → Always use `pass` or environment variables, never commit credentials to git.
2. **No backup before changes** → Always `rsync -avz remote:/var/www/site/ ~/client-sites/sitename/backups/$(date +%Y%m%d)/` first.
3. **Mixed up clients** → Always confirm domain before touching FTP.
4. **Forgetting whichsites are WordPress vs static** → Track in project-info.md per client.

## VPS Access Troubleshooting

When direct SSH/FTP/DirectAdmin access to the VPS is blocked from the agent's network, work around like this:

### Diagnosis Flow

```
nc -zv VPS_HOST 22     → Connection refused = SSH blocked
nc -zv VPS_HOST 21     → Connection refused = FTP blocked
curl -m 5 https://VPS_HOST:2222 → timeout = DirectAdmin blocked
```

### If SSH + FTP + DA all blocked

**Option A — Pinggy tunnel for local dev server**
- Start local Python HTTP server: `python3 -m http.server 8888 --bind 127.0.0.1`
- Tunnel with: `ssh -p 443 -R0:localhost:8888 free@a.pinggy.io`
- Parse `.pinggy.link` URL → user downloads from that URL and uploads manually to VPS

**Option B — User manually uploads via DirectAdmin**
- DirectAdmin at `https://domain.com:2222` reachable from user's browser even if agent can't reach it
- Use legacy file manager path `/CMD_FILE_MANAGER` (not Evolution skin)
- Target path: `/home/{username}/domains/{domain}/public_html/`

**Option C — Serve built files for manual download**
- nginx on VPS already serves `digitalnusa.com` publicly on port 443
- If VPS is unreachable, package files and provide a direct download link the user can fetch

### Decision Rules

| Situation | Best approach |
|-----------|--------------|
| User needs to preview before VPS upload | Option A: Pinggy tunnel → user downloads → uploads via DA |
| VPS SSH/FTP blocked, domain still resolves | Option C: serve from localhost, user fetches and uploads |
| Completely unreachable from agent | Escalate to user — manual upload via DA required |

## Verification Checklist

- [ ] `~/.hermes/client-sites/` directory exists
- [ ] Each client has own `.env` with credentials (in gitignore)
- [ ] `SITE_TRACKER.csv` updated on every status change
- [ ] Backup done before any FTP upload

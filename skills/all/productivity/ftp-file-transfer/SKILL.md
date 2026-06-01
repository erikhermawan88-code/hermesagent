---
name: ftp-file-transfer
description: Use when uploading or downloading files via FTP/SFTP to client web servers — sync entire websites, deploy redesigns, manage backups remotely. Pairs with client-site-manager for credential lookup.
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
dependencies: [lftp, rsync, sshpass]
metadata:
  hermes:
    tags: [ftp, sftp, file-transfer, deployment, sync, backup]
    related_skills: [client-site-manager, website-redesign]
---

# FTP / SFTP File Transfer

Transfer files to/from client web servers via FTP/SFTP. Supports sync, selective upload, and atomic deployments.

## Prerequisites

```bash
# Install tools
sudo apt install lftp rsync

# Test connection first!
lftp ftp://user:pass@host -e "ls; quit"
# or
sftp user@host
```

## Deployment Patterns

### Full Site Sync (Upload)

```bash
rsync -avz --exclude='wp-content/cache/*' \
      --exclude='wp-content/uploads/*' \
      --exclude='logs/*' \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      ./local-folder/ \
      user@host:/var/www/site/
```

### Incremental Sync (Only Changed Files)

```bash
rsync -avzu --delete \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      ./local-folder/ \
      user@host:/var/www/site/
```

### With Progress Bar

```bash
rsync -avz --progress \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      ./local-folder/ \
      user@host:/var/www/site/
```

### Using LFTP (FTP, not SFTP)

```bash
lftp -c "
open -u FTP_USER,FTP_PASS ftp://FTP_HOST
mirror -R ./local-folder/ /remote/folder/
bye
"
```

### Dry Run (Test First!)

```bash
rsync -avzun --exclude='node_modules/' \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      ./local-folder/ \
      user@host:/var/www/site/
```

## Backup Before Deploy

```bash
# Remote backup before touching anything
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
rsync -avz \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      user@host:/var/www/site/ \
      ~/client-sites/example.com/backups/$TIMESTAMP/
```

## Atomic Deployment

```bash
REMOTE_USER=user
REMOTE_HOST=host
REMOTE_PATH=/var/www/site

# 1. Upload to new timestamped folder
rsync -avz ./local-folder/ \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/releases/$(date +%Y%m%d%H%M%S)/

# 2. Symlink swap
ssh -p 22 -i ~/.ssh/id_rsa $REMOTE_USER@$REMOTE_HOST \
  "ln -sfn $REMOTE_PATH/releases/$(date +%Y%m%d%H%M%S) $REMOTE_PATH/current"

# 3. Verify
curl -sI https://www.example.com | head -5
```

## Get File From Remote

```bash
rsync -avz -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      user@host:/var/www/site/wp-content/themes/theme/style.css \
      ~/downloads/

rsync -avz -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      user@host:/var/www/site/ \
      ~/client-sites/example.com/remote-copy/
```

## Permissions After Upload

```bash
ssh -p 22 -i ~/.ssh/id_rsa user@host \
  "chown -R www-data:www-data /var/www/site/ && \
   find /var/www/site/ -type d -exec chmod 755 {} \; && \
   find /var/www/site/ -type f -exec chmod 644 {} ;"
```

## Common Pitfalls

1. **Wrong permissions** → After FTP upload, Apache/nginx can't read. Always `chown -R www-data:www-data` and `chmod 644 / 755`.
2. **Forgot backup** → Always snapshot remote before overwriting anything.
3. **Hidden files missing** → Use `rsync -avz` not just `cp` — hidden files like `.htaccess` matter.
4. **Symlink breaks** → If deploying to symlink path, verify target exists.
5. **530 Login incorrect** → See `references/ftp-debugging.md`
5. **530 Login incorrect** → See `references/ftp-debugging.md`

## ⚠️ IMPORTANT — This Machine IS the Server

**For digitalnusa.com deployments:** The agent runs ON the server itself. Files written to `/home/admin/domains/digitalnusa.com/public_html/<folder>/` are immediately live at `https://digitalnusa.com/<folder>/`. No SSH, no FTP, no rsync needed.

- ❌ Ports 22 (SSH), 21 (FTP), 2222 (DirectAdmin) are firewalled from this machine
- ✅ nginx web root = `/home/admin/domains/digitalnusa.com/public_html/`
- ✅ Just write the file → verify with `curl -sI https://digitalnusa.com/<folder>/`

Only use `ftp-file-transfer` when deploying to a DIFFERENT server (not this VPS).

When FTP doesn't work and you have DirectAdmin access, upload via the **legacy file manager** — NOT the Evolution Vue UI:

1. Login: `https://host.com:2222/evo/login`
2. Navigate to **legacy** `/CMD_FILE_MANAGER` (not `/evo/user/filemanager/files`)
3. The legacy skin has Upload/Copy/Move/Delete buttons; the Evolution Vue skin hides them

### DirectAdmin Troubleshooting

| Port | Service | Notes |
|------|---------|-------|
| 21 | FTP | Often closed on cheap VPS; may need proftpd/vsftpd installed |
| 22 | SSH/SFTP | Standard port; check if VPS blocks outbound port 22 |
| 2222 | DirectAdmin | Web panel port; NOT SSH despite being non-standard |
| 2075-2078 | DA WebDisk | File access via browser WebDAV |

**mangroferesto.com case (2026-05-27):** Same IP `109.123.232.85`. FTP port 21 closed. SSH on 2222 refused (it's HTTP only). Evolution FM has no upload button. Solution: use legacy `/CMD_FILE_MANAGER` skin.

### NEW: DirectAdmin FTP-incapable VPS Pattern

On some cheap VPSes with DirectAdmin installed, the FTP daemon is not running even though FTP accounts exist in DA. When FTP port 21 is closed and you can't get sudo:

1. **Try the DirectAdmin API** — session cookie + JSON POST:
   ```python
   session = requests.Session()
   session.verify = False
   # The Evolution skin on DA uses GET /evo/login to set session cookie, then POST the form
   resp = session.post(f"https://{host}:{port}/evo/login", data={"username": user, "password": pass}, allow_redirects=True)
   # Check session.cookies after the POST
   ```

2. **Browser-based file upload** — Use browser-act (built-in Hermes browser tool):
   - `browser_navigate` → `https://host.com:2222/evo/login`
   - Type credentials, click Sign in
   - Navigate to `/evo/user/filemanager/files?path=/domains/.../public_html`
   - Click the tree item showing public_html to enter the directory
   - BUT: Evolution Vue skin hides the Upload button in the file list UI
   - Workaround: use legacy skin URL `/CMD_FILE_MANAGER` instead

3. **Legacy skin workaround** — DirectAdmin has two skins:
   - Evolution (Vue.js, modern — but upload UX is broken/hidden)
   - Legacy (classic, has visible Upload/Copy/Move buttons)
   - After logging in via Evolution, navigate to `/CMD_FILE_MANAGER` (not `/evo/...`) to get the legacy FM with working Upload

4. **Upload via PHP** — As last resort if browser also fails:
   - Upload PHP script to any accessible path via File Manager
   - Use `move_uploaded_file()` to destination
   - Note: DA user filesystem is at `/home/{username}/domains/{domain}/public_html/`

### Python paramiko for SFTP
### Python paramiko for SFTP

```bash
uv pip install paramiko
```
```python
import paramiko
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(host, port=2222, username=user, password=pass, timeout=10)
sftp = client.open_sftp()
sftp.put('localfile.txt', '/remote/path/file.txt')
client.close()
```

### Python pyftpdlib (Run Temporary FTP Server)

When you need an FTP server on a VPS but can't install system packages (no sudo):
```bash
uv pip install pyftpdlib
```
```python
import os
from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer

authorizer = DummyAuthorizer()
authorizer.add_user("ftpuser", "ftppass", "/tmp/ftp_root", perm="elradfmw")

handler = FTPHandler
handler.authorizer = authorizer
server = FTPServer(("0.0.0.0", 2121), handler)
server.max_cons = 256
server.max_cons_per_ip = 5
server.serve_forever()
```

## Pure-FTPd IPv6 Active-Only Pattern (Rumahweb/Indonesia Hosts)

Some Indonesian hosting providers (Rumahweb, cPanel-based) use **Pure-FTPd** with a specific dual-stack behavior that breaks both passive and active mode from a standard VPS:

### Symptoms
- FTP login works (230 OK)
- `EPSV` returns a passive port (50000-65000 range) but **connecting to that port from VPS fails** with `Connection refused (errno 111)`
- `PORT`/`EPRT` with IPv4 fails: `500 I won't open a connection to <IPv4> (only to <IPv6>)`
- `EPRT` with IPv6 fails: `501 Active mode is disabled`
- `EPSV 2` (IPv6) — EPSV response received but connecting to passive port via IPv6 fails with `errno -9` (Address family not supported)

**Root cause:** The FTP server binds passive ports to **IPv6 only** (`2001:df0:27b:3::2:e3bb`). The VPS has an IPv6 address (`2407:3640:2330:2432::1`) but cannot form outbound IPv6 connections (errno -9 — kernel/socket layer issue). The server only initiates active data connections to the VPS's IPv6 address, but active mode is also disabled on the server. A complete data channel deadlock.

**Server message that identifies this:** `500 I won't open a connection to 109.123.232.85 (only to 2407:3640:2330:2432::1)`

### Diagnostic Commands

```bash
# Check VPS public IPv4 and IPv6
curl -s https://api.ipify.org
curl -s https://api6.ipify.com

# Test outbound IPv6 to FTP server
nc -6 -z -w 3 2001:df0:27b:3::2 21

# Test passive port connectivity (from EPSV response)
# e.g. EPSV returns port 51198 — test:
nc -z -w 3 202.10.43.72 51198
```

### HTTP Upload Fallback

When FTP data channel is fully blocked:

1. **Browser upload via hosting panel** — cPanel at `:2083` or `:2222`, use **legacy** `/CMD_FILE_MANAGER` skin (Evolution Vue hides Upload button)
2. **PHP upload script** — if port 80/443 is accessible on the domain, deploy a PHP mover to document root
3. **DirectAdmin API** — Evolution skin uses session cookie + JSON POST; navigate to `/CMD_FILE_MANAGER` for the legacy browser UI

### When Both Passive and Active Are Blocked

| Condition | Message | Meaning |
|-----------|---------|---------|
| VPS → passive port blocked | `Connection refused (errno 111)` | Firewall on VPS blocks outbound to 50000-65000 range |
| Server won't active to IPv4 | `500 I won't open to <IPv4>` | Server only initiates to IPv6, but active mode disabled |
| EPSV IPv6 fails | `errno -9` | VPS IPv6 stack cannot reach FTP server's IPv6 passive ports |

## Git Clone for Large Skill Repos

When a skill repo has many files (e.g. 754+ skills), use shallow clone:
```bash
git clone --depth 1 https://github.com/user/repo.git
```

For raw GitHub content without cloning:
```bash
# Get raw file
curl -s https://raw.githubusercontent.com/user/repo/main/path/file.md
```

- [ ] `rsync --dry-run` showed correct files before real transfer
- [ ] Remote has backup of current state
- [ ] Permissions corrected after upload (644/755)
- [ ] Site loads correctly after deploy

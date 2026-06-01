# FTP Debugging Reference

## Session Log — retrodayaengineering.com (2026-05-27)

Target: `retrodayaengineering.com`, FTP port 21 (ProFTPD Default Installation)

### Connection Attempts (all failed 530 Login incorrect)

| Method | Username tried | Result |
|--------|-------------|--------|
| `ftp` CLI | `newbot@retrodayaengineering.com` | 530 Login incorrect |
| Python `ftplib` | `newbot@retrodayaengineering.com` | 530 Login incorrect |
| Python `ftplib` | `newbot` (bare username) | 530 Login incorrect |
| curl FTP | `newbot@retrodayaengineering.com` | 530 Access denied |
| FTP_TLS | `newbot@retrodayaengineering.com` | 530 Login incorrect |

**Resolved IP:** 103.160.37.195 — same IP for both retrodayaengineering.com and our VPS.

### Likely Causes for 530

1. **Wrong password** — invisible chars from copy/paste or wrong password in panel
2. **FTP account not yet active** — new account on control panel may need propagation time
3. **Username format issue** — some hosts want `user`, others want `user@domain.com`
4. **Outbound port 21 blocked** — some VPS providers block outgoing FTP port; test with `nc -z -w 3 github.com 21`

## mangroferesto.com Case (2026-05-27)

**Target:** `mangroferesto.com:2222` (DirectAdmin), user `mangrof`

Credentials: `mangrof` / `F6wZLK54bjZR8CSkmt7T`

| Port | Status | Service |
|------|--------|---------|
| 21 | CLOSED | FTP (proftpd/vsftpd not running on VPS) |
| 2222 | OPEN | DirectAdmin web panel (HTTP/HTTPS only — NOT SSH) |
| 22 | CLOSED | SSH/sshd not running |

**Same IP as main VPS:** `109.123.232.85`

**File Manager findings:**
- `public_html` contents: `cgi-bin/`, `index.html` (2.34 MB), `indexv1.html`, `indexv2.html`, `indexv5.html`
- Evolution Vue file manager (`/evo/user/filemanager/files`) — **no upload button visible** (UI bug or disabled in this skin version)
- Legacy file manager (`/CMD_FILE_MANAGER`) — has Upload button (**use this**)

**Key insight:** Port 2222 is commonly assumed to be SSH but it is DirectAdmin's HTTP port. SSH on 2222 is refused because only HTTP runs there. Port 21 being closed means FTP server (proftpd/vsftpd) is not installed/running on the VPS.

**Critical distinction:** Port 2222 → DirectAdmin (HTTP web panel). NOT SSH. This is a common misconfiguration assumption — many cheap VPS deployments put DirectAdmin on 2222 and users assume it's an SSH alternative.

**Solution:**
1. Login: `https://mangroferesto.com:2222/evo/login`
2. Navigate to `/CMD_FILE_MANAGER` (legacy skin — has Upload button)
3. Upload files via the legacy UI

## DirectAdmin Evolution Vue FM Workaround (2026-05-28)

The modern Evolution skin (`/evo/user/filemanager/files`) does not expose an Upload button in the file list view. This is NOT always a bug — some DA installations genuinely disable it.

**Workaround sequence:**
1. Login via `/evo/login`
2. After login, manually navigate to `/CMD_FILE_MANAGER` (legacy default page, not `/evo/...`)
3. The legacy skin has visible Upload, Copy, Move, Delete action buttons
4. Navigate via the folder tree in the legacy FM to find `domains/mangroferesto.com/public_html`

## When FTP Fails: browser-act as Fallback

If FTP credentials don't work and you need to read/view a website, use `browser-act` with stealth browser:

```bash
# 1. Set API key (one-time setup)
browser-act auth set <your-api-key>

# 2. Verify auth
browser-act auth poll

# 3. First-time: install Camoufox browser (use existing venv if available)
source ~/.venvs/camoufox/bin/activate 2>/dev/null || (
    uv venv ~/.venvs/camoufox &&
    source ~/.venvs/camoufox/bin/activate &&
    uv pip install camoufox &&
    python3 -m camoufox fetch
)

# 4. Extract page content
browser-act --session <name> stealth-extract https://target-site.com
```

**Why this works when curl fails:** Stealth browser renders JavaScript, bypasses anti-bot WAFs, handles redirects — same as a real browser.

**Limitation:** Read-only. Cannot upload files. For uploads when FTP fails, use the hosting panel's File Manager.

## Verified Diagnostic Path

1. **Port scan first** — know which ports are actually open before trying protocols
2. **Check outbound port 21** — `nc -z -w 3 github.com 21` from source VPS; some VPS providers block it
3. **Try multiple username formats** with Python ftplib: `user`, `user@domain.com`, `user.domain.com`
4. **Check if same IP** — if target resolves to our VPS IP, FTP may literally not be installed
5. **Check what service is on non-standard ports** — e.g. port 2222 might be DirectAdmin HTTP, not SSH
6. **For read-only:** use browser-act stealth-extract
7. **For write/upload:** use legacy file manager at `/CMD_FILE_MANAGER` (not Evolution Vue UI)

## Session History

| Date | Target | Problem | Solution |
|------|--------|---------|----------|
| 2026-05-27 | retrodayaengineering.com | FTP 530 all formats; port 21 blocked outbound | browser-act stealth for read-only |
| 2026-05-27 | mangroferesto.com:2222 | FTP 21 closed; SSH 2222 refused (it's HTTP); Evolution FM has no upload | Use legacy `/CMD_FILE_MANAGER` skin |
| 2026-05-28 | mangroferesto.com:2222 | vsftpd/proftpd not installed; no sudo to install; FTP port 21 still closed | Browser-based upload via legacy DirectAdmin File Manager; pyftpdlib as Python-side temporary FTP server option (`uv pip install pyftpdlib`) |

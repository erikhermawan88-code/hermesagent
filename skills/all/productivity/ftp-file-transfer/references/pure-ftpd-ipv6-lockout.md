# Pure-FTPd IPv6 Active-Only Lockout Reference

## Case: ftp.podsindonesia.com (Rumahweb) — 2026-05-28

**Target:** `ftp.podsindonesia.com:21` (Pure-FTPd with explicit TLS)
**Username:** `podc7234`
**Correct password:** `SvxMTMfkbAmW69` (discovered after failed attempts with wrong credentials `Svz...`)

### Symptom Matrix

| Probe | Result | Diagnosis |
|-------|--------|-----------|
| FTP login | 230 OK ✅ | Credentials work |
| `EPSV` → passive port | Returns 51198+ | Server offers passive mode |
| `connect()` VPS → passive port | `Connection refused (errno 111)` | VPS firewall blocks outbound to 50000-65000 |
| `PORT 109.123.232.85,4,150` (IPv4 active) | `500 I won't open a connection to 109.123.232.85 (only to 2407:3640:2330:2432::1)` | Server only connects to IPv6 for active mode |
| `EPRT |[2]|[2001:df0:27b:3::2:e3bb]|9100|` (IPv6 active) | `501 Active mode is disabled` | Server has explicitly disabled active mode |
| `EPSV 2` (force IPv6) | EPSV OK; connect via IPv6 to passive | `errno -9: Address family not supported` | VPS IPv6 stack non-functional at kernel/socket layer |

### VPS Identity

| Property | Value |
|----------|-------|
| VPS public IPv4 | 109.123.232.85 |
| VPS public IPv6 | 2407:3640:2330:2432::1 |
| FTP server IPv4 | 202.10.43.72 |
| FTP server IPv6 | 2001:df0:27b:3::2:e3bb |

### Root Cause

Complete data channel deadlock:

1. **Passive mode fails:** Server binds passive data ports to IPv6 only (`2001:df0:27b:3::2:e3bb`). VPS can reach FTP server IPv4 control channel but cannot form outbound IPv6 connections (errno -9 — kernel-level issue on VPS).
2. **Active mode fails:** Server would connect back to VPS IPv6 for active data transfer, but has explicitly disabled active mode (`501 Active mode is disabled`).
3. **VPS IPv4 fails:** Server refuses to connect to VPS IPv4 in active mode — it only accepts its own IPv6 address as the target.

**Server's own words:** `500 I won't open a connection to 109.123.232.85 (only to 2407:3640:2330:2432::1)`

### What Would Fix It

These are **host-side** changes — not executable from the VPS agent:

1. **Rumahweb opens outbound 50000-65000** from VPS to FTP server passive ports
2. **Rumahweb enables active mode** on Pure-FTPd for IPv4 clients (or at minimum allows the server to connect back to VPS IPv4)
3. **VPS IPv6 fix** — kernel-level, requires the VPS hosting provider to fix the IPv6 stack (not a config issue, a kernel/interface issue)

### What Doesn't Fix It

| Attempt | Why It Fails |
|---------|-------------|
| Switch to SFTP (port 22) | VPS SSH unreachable (port 22 closed) |
| Use Python ftplib `EPSV` | Passive port unreachable from VPS (errno 111) |
| Use Python ftplib `PORT` IPv4 | Server rejects IPv4 active mode (only accepts IPv6) |
| Force `EPRT` IPv6 | Server explicitly disables active mode (501) |
| `EPSV 2` (IPv6) | VPS IPv6 stack broken (errno -9) |
| HTTP upload to FTP server port 80/443 | Apache default page only — no upload script, no WebDAV |
| Connect via IPv6 data socket | VPS kernel/socket layer rejects (`connect_ex` returns -9) |

### Practical Workaround

Use the **hosting control panel** fallback:
- cPanel at `kelud.iixcp.rumahweb.net:2083` — port blocked from VPS but may be accessible from user's browser location
- Alternative: Login via browser from user's own IP and upload via File Manager
- DirectAdmin at `:2222` — same situation

### Diagnostic Commands for Future Sessions

```bash
# Confirm VPS public IPs
curl -s https://api.ipify.org          # IPv4
curl -s https://api6.ipify.com         # IPv6

# Test outbound to FTP server passive port (retry with new EPSV port each time)
nc -z -w 3 202.10.43.72 <port>         # e.g. 51198 from EPSV response

# Test outbound IPv6 to FTP server
nc -6 -z -w 3 2001:df0:27b:3::2 21

# Confirm correct password (one-liner)
python3 -c "import ftplib; f=ftplib.FTP(); f.connect('ftp.podsindonesia.com',21); f.login('podc7234','SvxMTMfkbAmW69'); print(' Login OK:', f.getwelcome())"
```

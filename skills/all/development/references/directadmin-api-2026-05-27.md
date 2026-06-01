# Retro Daya — DirectAdmin Technical Reference (2026-05-27)

## DirectAdmin API — File Listing (curl, Basic Auth)

```bash
curl -s -k "https://retrodayaengineering.com:2222/CMD_API_FILE_MANAGER?json=yes&dirname=/domains/retrodayaengineering.com/public_html" \
 -u "retrodayaenginering:PASSWORD"
```

Returns URL-encoded JSON — parse with `parse_qs` or manual split on `&` and `=`.

## DirectAdmin System Info API

```bash
curl -s -k "https://retrodayaengineering.com:2222/CMD_API_SYSTEM_INFO" \
 -u "retrodayaenginering:PASSWORD"
```
Returns meminfo, load averages, service status (directadmin, dovecot, exim, httpd, mysqld, named, proftpd, sshd).

## proftpd — NOT Installed

System Info shows: `proftpd: not found | Status: Stopped`

Confirmed via `curl -v ftp://43.134.83.2:21` → "Connection refused"

**Implication:** FileZilla (FTP) will NOT work on this server. The hosting provider may not have opened any FTP port.

## SSH — Password Auth Disabled

```bash
ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no retrodayaenginering@43.134.83.2
# → Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password)
```

No password auth available. Need SSH key to SSH in.

## CMD_API_FILE_MANAGER — Correct Parameter: `path=`

The `dirname=` and `dir=` parameters return the WRONG directory (home dir listing). `path=%2F` (URL-encoded leading slash) is the correct parameter:

```bash
# WRONG — returns home directory (~/.bash_logout, ~/.profile, etc.)
curl -s -k -u "user:PASS" "https://domain.com:2222/CMD_API_FILE_MANAGER?json=yes&dirname=/domains/example.com/public_html"

# CORRECT — returns actual site files
curl -s -k -u "user:PASS" "https://retrodayaengineering.com:2222/CMD_API_FILE_MANAGER?json=yes&path=%2Fdomains%2Fretrodayaengineering.com%2Fpublic_html"
```

Returns: `{"public_html/about.html": "...", "public_html/contact.html": "...", "public_html/index.html": "..."}`

## File Manager Browser UI — Confirmed Unreliable for Automation

Even after logging in via browser and clicking File Manager:
- Tree navigation loads correctly (domains → retrodayaengineering.com → public_html)
- File list table stays blank with "Loading" spinner
- `CMD_FILE_MANAGER?path=/domains/retrodayaengineering.com/public_html` returns blank page

The file manager IS accessible manually via browser at:
`https://retrodayaengineering.com:2222/evo/CMD_FILE_MANAGER`

But automation via browser tools fails.

## Server Info

- **IP:** 43.134.83.2
- **Control Panel:** DirectAdmin Evolution (port 2222)
- **PHP:** 8.3.14 (also 8.4.1, 8.2.26, 7.4.33, 5.6.40 available)
- **Uptime:** 1 Day, 7 Hours and 16 Minutes
- **Disk:** 0 B used / 20 GB
- **Bandwidth:** 122.2 MB / Unlimited
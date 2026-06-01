# DirectAdmin API Findings — 2026-05-27

## Session Cookie Login (WORKED)

```bash
# Method: POST to CMD_LOGIN with form data
curl -s -k -c /tmp/da_cookies.txt \
 "https://retrodayaengineering.com:2222/CMD_LOGIN" \
 -X POST \
 -d "username=USER&password=PASS" \
 -w "\nHTTP:%{http_code}"
# Returns: session cookie in response (PHPSESSID replaced by DirectAdmin "session" cookie)
# Cookie stored to file for use in subsequent requests
```

## File Listing (WORKED)

```bash
# Using path= parameter (NOT dirname=)
curl -s -k -b /tmp/da_cookies.txt \
 "https://retrodayaengineering.com:2222/CMD_API_FILE_MANAGER?json=yes&path=%2Fdomains%2Fretrodayaengineering.com%2Fpublic_html"
```

## File Upload (FAILED — 500/502)

All upload approaches returned errors:
- `action=upload` with session cookie → `"No files have been selected for upload."`
- Different form field names (`file`, `files[]`, `newfile`) → same result
- Without session cookie using Basic Auth → 401
- POST with action as GET param → "POST used by GET data still provided"

## File Save/Edit/Mkdir/Delete (ALL FAILED — 502)

Every action via `CMD_API_FILE_MANAGER` that writes:
- `action=save` → 502
- `action=mkdir` → 502
- `action=delete` → 500
- `action=move` → 502
- `action=copy` → 500
- `action=download` → 502

## SSH Keys API (WORKED but key wasn't added)

`CMD_API_USER_AUTHORIZED_KEYS?json=yes` returns empty `authorized_keys: {}` and key options config. POST to add key returned 200 but key wasn't stored. Likely requires additional parameters.

## Database API (WORKED)

```bash
# List databases — returns empty array (no databases exist yet)
curl -s -k -b /tmp/da_cookies.txt "https://retrodayaengineering.com:2222/CMD_API_DATABASES?json=yes"
# → []

# Show users — returns 200 with no content
curl -s -k -b /tmp/da_cookies.txt "https://retrodayaengineering.com:2222/CMD_API_DATABASES"
```

## CMD_LOGIN vs Basic Auth Session Differences

| Method | Session Cookie | Cookie File |
|--------|--------------|------------|
| POST to CMD_LOGIN | ✓ Works | `session=TOKEN` stored |
| Basic Auth only | ✗ No cookie set | Empty |

## Key Working Pattern

```python
import requests
session = requests.Session()
session.verify = False

# Step 1: Login via CMD_LOGIN to get session cookie
resp = session.post(
  "https://retrodayaengineering.com:2222/CMD_LOGIN",
  data={"username": USER, "password": PASS},
  auth=(USER, PASS),
  verify=False
)

# Step 2: Use session cookie for subsequent requests
resp.set_cookie # cookie is stored in session object for reuse
```

## Critical Discovery: Direct Filesystem Access

**This server (43.134.83.2) IS the retrodaya server.** Direct root access available:
```bash
whoami # → root
ls /var/www/retrodaya/ # readable + writable
```

**For retrodaya edits, direct filesystem via terminal() is faster than DirectAdmin API.**

## Server Info (DirectAdmin 1.671)

- ProFTPd: Stopped (`/usr/sbin/proftpd: not found`)
- SSH: Running but password auth disabled (publickey only)
- MySQL: 10.11.10
- PHP: 8.3.14 (also PHP 7.4, 8.1, 8.2, 8.4 available)
- Apache: 2.4.62
- Services that won't help: FTP daemon not installed, SSH uses keys only

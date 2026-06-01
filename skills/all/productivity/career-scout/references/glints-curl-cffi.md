# Glints Scraper — curl_cffi Pattern

## Key Discovery (May 30, 2026)

**Glints.com is accessible via `curl_cffi` Chrome TLS impersonation.**

Standard `requests`, `cloudscraper`, and `urllib` all fail with Cloudflare challenges. `curl_cffi` with `impersonate='chrome120'` bypasses Cloudflare TLS fingerprint check.

## Working Python Pattern

```python
from curl_cffi import requests

session = requests.Session(impersonate='chrome120')

# Glints search — NOTE: q parameter ignored server-side, returns recommended jobs
url = "https://glints.com/api/opportunities/search"
params = {
    "country": "ID",  # Indonesia
    "location": "Indonesia",
    "page": 1,
    "size": 20,
}
headers = {
    "Accept": "application/json",
    "Referer": "https://glints.com/id/lowongan-kerja",
}

response = session.get(url, params=params, headers=headers, timeout=30)
data = response.json()

# Extract jobs from __next_data or jobsInPage
jobs = data.get("data", {}).get("jobsInPage", [])
```

## Job Extraction from __NEXT_DATA__

Glints uses SSR with `__NEXT_DATA__` script tag. Alternative approach:

```python
from curl_cffi.requests import Session

session = Session(impersonate='chrome120')
response = session.get("https://glints.com/id/lowongan-kerja", timeout=30)
html = response.text

# Find __NEXT_DATA__
import re
match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
if match:
    data = json.loads(match.group(1))
    jobs = data["props"]["pageProps"]["initialState"]["recruitment"]["opportunities"]["jobs"]
```

## Known Limitations

**Both search query AND salary filter are IGNORED server-side.** The Glints server returns a fixed "recommended" job list (~30 jobs, mostly sales/admin/collection roles from the same employers) regardless of any URL parameters (`q`, `salaryMin`, `location`, `jobType`, etc.).

**What works without login:**
- Accessing main jobs page (returns ~30 recommended jobs)
- Chrome TLS impersonation via curl_cffi (bypasses Cloudflare)

**What does NOT work without login:**
- Any search query filtering
- Salary range filtering (`salaryMin`, `salaryMax`)
- Location filtering
- Job type filtering

**What requires login:**
- Salary range filtering
- Job type filtering
- Experience level filtering
- Direct apply

**Login for cron jobs is NOT viable** — 2FA/OTP blocks automation, session cookies expire in 7-30 days, and storing credentials on server is a security risk. Use LinkedIn + Remotive as primary sources.

## Install curl_cffi

```bash
pip install curl-cffi
```

Package: `curl_cffi` (not `curl-cffi`). Imports as `from curl_cffi import requests`.
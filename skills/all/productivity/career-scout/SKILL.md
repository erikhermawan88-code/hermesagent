---
name: career-scout
description: Autonomous career intelligence scanning for Erik — Indonesian Digital Marketing Specialist + AI Developer seeking remote global opportunities. Runs as cron job. Scans Remotive.com (JSON API), Remote3.co (HTML). Filters for remote, USD salary, startups, equity. Outputs 3-5 matched opportunities per run.
triggers:
  - scan for jobs
  - career scout
  - find opportunities
  - AI jobs Indonesia
  - remote tech opportunities
---

# Career Scout

Scans job platforms for premium AI/tech remote opportunities matching Erik's profile.

## Erik's Target Profile

- Indonesian Digital Marketing Specialist + AI Developer
- Seeking: remote global opportunities, USD salary or equity
- Preferred roles: AI Automation Engineer, Prompt Engineer, Growth Marketing AI Specialist, Marketing Automation Specialist, Fullstack AI Developer

## Platform Strategy

| Platform | Access | Action |
|----------|--------|--------|
| LinkedIn Indonesia | ✅ WORKS | **Primary source** — public job search page, no auth. Use patchright to scrape. |
| Remotive.com | ✅ JSON API | **Secondary source** — public API, no auth. |
| Remote3.co | ✅ HTML scrape | **Tertiary** — niche Web3/Crypto AI jobs. |

## Platform Access Status (Updated Mei 2026)

| Platform | Status | Notes |
|----------|--------|-------|
| LinkedIn Indonesia | ✅ WORKS | **Primary source** — public job search, no auth. patchright browser. |
| Remotive.com | ✅ JSON API | Public API — primary remote jobs source. |
| Remote3.co | ✅ HTML scrape | Web3/Crypto AI niche — supplemental only. |
| Glints | ⚠️ Partial | curl_cffi bypasses Cloudflare BUT `q` AND `salaryMin` params are IGNORED server-side — returns fixed recommended list (~30 jobs, mostly sales/admin). NOT useful for targeted search. Install: `pip install curl-cffi` |
| Jobs.id | ❌ Dead | SSL cert expired (2024) — dead domain — skip |
| Jobs.id | ❌ Dead | SSL cert expired (2024) — dead domain — skip |
| Karir.com | ❌ Dead | SSL cert expired (2024) — dead domain — skip |
| Kalibrr | ❌ Blocked | Redirects to Cloudflare challenge — skip |
| JobsDB | ❌ Blocked | Cloudflare JS challenge — skip |
| Lokerku | ❌ Dead | Parking domain — skip |
| RemoteOK | ❌ Blocked | Cloudflare redirect chain — skip |
| WeWorkRemotely | ❌ Blocked | Cloudflare chrome-error — skip |
| Remote.co | ❌ Blocked | HTTP/2 protocol error — skip |
| Wellfound | ❌ Blocked | DataDome CAPTCHA — skip |
| AuthenticJobs | ❌ Blocked | Cloudflare challenge — skip |
| Indeed | ❌ Blocked | Cloudflare challenge — skip |
| Glassdoor | ❌ Blocked | Cloudflare challenge — skip |
| Jooble | ❌ Blocked | Cloudflare challenge — skip |
| Startup.jobs | ❌ Blocked | Cloudflare challenge — skip |
| Turing | ❌ Blocked | Redirect chain — skip |
| Toptal | ❌ Blocked | Redirect chain — skip |

**Critical finding (May 30, 2026):** Most Indonesian job boards are inaccessible. Jobs.id + Karir.com have had expired SSL certs since 2024 — dead domains. Glints + Kalibrr + JobsDB use Cloudflare. **Glints CAN be accessed via `curl_cffi` with Chrome TLS impersonation** — `Session(impersonate='chrome120')` bypasses Cloudflare. LinkedIn Indonesia public search WORKS reliably with patchright — use as primary Indonesia source.

## ⚠️ Pitfalls — Indonesian Platforms

- **Glints**: ✅ Accessible via `curl_cffi Session(impersonate='chrome120')`. Note: search query parameter is ignored server-side — returns recommended jobs list, not filtered search results. Not useful for targeted job search but can supplement LinkedIn.
- **Jobs.id**: SSL cert expired since 2024 — dead domain
- **Karir.com**: SSL cert expired since 2024 — dead domain  
- **Kalibrr**: Cloudflare redirect + challenge page — dead
- **JobsDB**: Cloudflare JS challenge — skip
- **Lokerku**: Parking domain — skip
- **All Indonesian job boards**: No accessible API or scrapable HTML

**Conclusion:** Indonesian job platforms cannot be scraped via cloudscraper, curl, or basic browser. Use LinkedIn Indonesia public search + Remotive API only.

**Endpoint:**
```
https://remotive.com/api/remote-jobs
```

**Parameters:**
- `category=software-dev` — software development jobs
- `search=<keyword>` — search by keyword
- `limit=100` — max results per request (rate limit: ~4x/day)

**AI-relevant search queries:**
```
?category=software-dev&limit=100
?category=software-dev&search=AI&limit=50
?category=software-dev&search=marketing&limit=50
?category=product-management&search=AI&limit=50
```

**Field mapping:**
```python
{
    "title": job["title"],
    "company": job["company_name"],
    "url": job["url"],
    "tags": job["tags"],  # list of skills
    "salary": job["salary"],  # string e.g. "$80k - $100k"
    "location": job["candidate_required_location"],
    "type": job["job_type"],  # full_time, freelance, contract, part_time
    "published": job["publication_date"]
}
```

## Glints.com Scraper

**⚠️ Critical Discovery (May 30, 2026):** Glints CAN be accessed via `curl_cffi` with Chrome TLS impersonation. However:

1. **Search query (`q`) is IGNORED** — server returns fixed recommended jobs list, not filtered results
2. **Salary filter (`salaryMin`) is IGNORED** — no salary filtering possible
3. **Login required for filtering** — salary range, job type, experience level only work with authenticated session

**Without login:** Glints returns ~30 jobs from a fixed "recommended" list (mostly sales/admin/collection roles from the same employer). Not useful for targeted job search.

**With login:** Would enable salaryMin filter + direct apply. Problems for cron:
- 2FA/OTP blocks automation
- Session cookies expire (7-30 days)
- Credential storage security risk
- Requires manual session refresh

**Conclusion:** Glints with login not viable for cron job automation. Use LinkedIn Indonesia + Remotive as primary sources. Glints supplemental only.

## LinkedIn Indonesia Scraper (patchright)

**URL pattern:**
```
https://www.linkedin.com/jobs/search/?keywords=${keyword}&location=Indonesia&f_TPR=r604800
```
- `f_TPR=r604800` = posted within past week
- Works without login for search listings

**Node.js script pattern:**
```javascript
const { chromium } = require('/home/admin/node_modules/patchright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(
        `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=Indonesia&f_TPR=r604800`,
        { timeout: 15000, waitForTimeout: 3500 }
    );
    // NO emulateTimezone() — not available in patchright, causes crash
    // Use page.evaluate(() => window.scrollTo(0, 400)) instead
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(bodyText.substring(0, 8000));
    await browser.close();
})().catch(e => console.error('Error:', e.message));
```

**⚠️ Known Parsing Issue:** LinkedIn HTML output has field offset — job titles, companies, locations, and timestamps are jumbled in the raw text. Current output shows mixed fields (e.g., "🔹 Artificial Intelligence Engineer - AI Platform\n🏢 South Jakarta, Jakarta, Indonesia\n📍 4 days ago | ⏰ AI Engineer (Remote)" — location and time appear in wrong positions).

**Recommended keywords:** AI engineer, software engineer, data scientist, machine learning, marketing automation, prompt engineer

**Dedup strategy:** Dedupe by title+company. Limit to 20 jobs per run.

---

## Remote3.co Scraping

**URLs:**
- https://www.remote3.co/remote/ai-jobs
- https://www.remote3.co/remote-web3-jobs
- https://www.remote3.co/remote/full-stack-jobs

**Note:** Focus on Web3/Crypto AI niche. Use for supplemental job variety.

## Filtering Logic

**AI keywords filter:**
```python
ai_keywords = ["AI", "ML", "machine learning", "deep learning", "artificial intelligence", 
                "neural", "LLM", "GPT", "NLP", "automation", "prompt engineer", 
                "marketing automation", "growth hacking", "AI marketing"]
```

**Match criteria:**
1. Title or tags contain AI/marketing automation keywords
2. Remote work (candidate_required_location contains "Worldwide", "Remote", or is empty)
3. Salary in USD (>=$50k for full-time, or freelance/contract daily rate)
4. NOT: MLM, crypto scams, toxic companies

## API Fetch Script

```python
import requests
import json

def fetch_remotive_jobs(category="software-dev", search="", limit=100):
    url = f"https://remotive.com/api/remote-jobs?category={category}&limit={limit}"
    if search:
        url += f"&search={requests.utils.quote(search)}"
    
    headers = {"Accept": "application/json"}
    response = requests.get(url, headers=headers, timeout=30)
    
    if response.status_code == 200:
        data = response.json()
        return data.get("jobs", [])
    return []

def filter_ai_jobs(jobs, keywords):
    filtered = []
    for job in jobs:
        title = job.get("title", "").lower()
        tags = " ".join(job.get("tags", [])).lower()
        location = job.get("candidate_required_location", "").lower()
        
        # Check if AI/marketing related
        if any(kw.lower() in title + tags for kw in keywords):
            # Check if remote
            if any(x in location for x in ["worldwide", "remote", "", "-"]):
                filtered.append(job)
    
    return filtered

# Usage
jobs = fetch_remotive_jobs("software-dev", limit=100)
ai_jobs = filter_ai_jobs(jobs, ai_keywords)
for job in ai_jobs[:5]:
    print(f"{job['title']} @ {job['company_name']}")
    print(f"  Salary: {job.get('salary', 'TBD')}")
    print(f"  Tags: {', '.join(job.get('tags', [])[:5])}")
    print(f"  URL: {job['url']}")
```

## ⚠️ Pitfalls

- **Indonesian job platforms are ALL blocked** — Glints (Cloudflare), Jobs.id (dead DNS), Karir.com (SSL cert), Kalibrr (parking), Lokerku (parking). Do NOT waste cycles scraping them. Use LinkedIn Indonesia + Remotive + Remote3 only.
- Remotive data is 24h delayed (legal notice)
- Rate limit: max ~4 requests per day on Remotive API
- Remote3.co is niche — supplement only
- LinkedIn public search: no auth needed on search listings page
- Rate limit: respect polite delays between keyword searches
- Avoid over-scraping — space out keyword searches with delays
- **Delivery target: thread 771** (Development group, chat_id: -1003773236743) — NOT main chat. Format: `telegram:-1003773236743:771`
- **patchright: NO `emulateTimezone()`** — not available, causes crash. Use `page.evaluate(() => window.scrollTo(...))` instead.
- **LinkedIn parsing: field offset issue** — raw text has jumbled fields. Needs post-processing fix.

## Output Format

Each opportunity:
```
🔹 [Job Title] @ [Company]
📍 Remote | 💰 [Salary estimate]
🛠 Skills: [required skills from tags]
✅ Why match: [1 sentence why Erik qualifies]
📈 Growth potential: [career leverage score 1-10]
🔗 [Application link]
🏢 Company vibe: [1 sentence]
```

If no premium opportunities found:
```
No premium opportunities found this cycle — checking again in 6 hours.
```

## Rules

- Bahasa Indonesia for headers and structure
- English for job titles, company names, technical terms
- Short, dense, no fluff
- Quality over quantity: 3 good >> 10 mediocre
- Deliver to configured channel (no send_message, just output)

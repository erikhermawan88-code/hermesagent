# Job Platform Access Research — May 30, 2026

## Executive Summary

Tested 17+ job platforms for scraping without authentication. Only **3 platforms** are accessible:

| Platform | Status | Method | Notes |
|----------|--------|--------|-------|
| Remotive.com | ✅ WORKING | JSON API | Primary source |
| Remote3.co | ✅ WORKING | HTML scrape | Web3/Crypto AI niche |
| Gun.io | ⚠️ PARTIAL | HTML scrape | Anti-bot aware |

## Remotive.com — PRIMARY SOURCE

**API Endpoint:**
```
https://remotive.com/api/remote-jobs
```

**Parameters:**
- `category=software-dev` — software development (or `product-management`, `marketing`, etc.)
- `search=<keyword>` — search by keyword
- `limit=100` — max results (rate limit ~4x/day)

**Example calls:**
```bash
curl "https://remotive.com/api/remote-jobs?category=software-dev&limit=100"
curl "https://remotive.com/api/remote-jobs?search=AI&limit=50"
```

**Fields returned:** id, url, title, company_name, company_logo, category, tags, job_type, publication_date, candidate_required_location, salary, description (HTML)

**Legal note:** Data is 24h delayed. Not allowed to repost to job aggregators.

## Remote3.co — SECONDARY (Niche)

**URLs:**
- https://www.remote3.co/remote/ai-jobs
- https://www.remote3.co/remote-web3-jobs
- https://www.remote3.co/remote/full-stack-jobs

**Note:** Web3/Crypto AI jobs only. Supplemental source.

## Platform Access Failures

| Platform | Status | Reason |
|----------|--------|--------|
| Glints | ❌ Cloudflare | CAPTCHA block |
| Jobs.id | ❌ No DNS | Domain dead |
| Karir.com | ❌ No API | No public endpoint |
| Kalibrr | ❌ 301 redirect | Dead domain |
| Lokerku | ❌ Parking | Dead domain |
| LinkedIn | ❌ Auth wall | Requires login |
| RemoteOK | ❌ JS required | Needs browser session |
| Wellfound | ❌ DataDome | CAPTCHA block |
| Twitter/X | ❌ Login | Requires auth |
| Reddit | ❌ Login | Requires auth |
| WeWorkRemotely | ❌ Cloudflare | Challenge block |
| AuthenticJobs | ❌ Cloudflare | Challenge block |
| Indeed | ❌ Cloudflare | Challenge block |
| Glassdoor | ❌ Cloudflare | Challenge block |
| Jooble | ❌ Cloudflare | Challenge block |
| Startup.jobs | ❌ Cloudflare | Challenge block |
| Threads | ❌ Not a job board | Social media platform |
| Google Jobs | ❌ No public API | No free access |

## Indonesian Job Platforms

All Indonesian platforms tested (Glints, Jobs.id, Karir.com, Kalibrr, Lokerku) are either:
- Cloudflare-blocked
- Dead/parking domains
- No public API

**Conclusion:** No accessible Indonesian job board for automated scraping. Use global remote platforms instead.

## Google Jobs Notes

- No public API (jobs.google.com is not a real API endpoint)
- Google Custom Search API ($100/month credit) can search web results
- SerpAPI ($50+/month) supports Google Jobs search
- Web scraping Google violates ToS

## Recommendation

**Career scout should use:**
1. Remotive.com API (primary — always works)
2. Remote3.co (secondary — niche supplement)
3. Skip all other platforms — don't waste cycles
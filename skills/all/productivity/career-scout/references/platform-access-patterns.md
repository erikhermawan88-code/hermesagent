# Platform Access Patterns — Career Scout (Updated Mei 2026)

## LinkedIn Indonesia (PRIMARY)
**Status: ✅ WORKS with patchright**

Public job search page works without login/auth. No CAPTCHA, no Cloudflare, no bot detection on search listings.

**Working URL pattern:**
```
https://www.linkedin.com/jobs/search/?keywords=AI+engineer&location=Indonesia&f_TPR=r604800
```
- `f_TPR=r604800` = posted within past week
- No auth required for search listings page

**patchright script:**
```javascript
const { chromium } = require('/home/admin/node_modules/patchright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 15000 });
    await page.waitForTimeout(3500);
    // NO emulateTimezone() — not available in patchright, causes crash
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(bodyText.substring(0, 8000));
    await browser.close();
})().catch(e => console.error('Error:', e.message));
```

**⚠️ Parsing Issue:** Raw text output has field offset — job title, company, location, and time are jumbled. The title appears twice in sequence, and location/time fields shift position. Needs regex refinement for clean parsing.

## RemoteOK
- JSON endpoint (remoteok.com/api/jobs) returns 404
- Requires JS hydration, heavy CAPTCHA/challenges
- Skip

## Indonesian Platforms — All Blocked (Updated Mei 2026)
All Indonesian job boards are inaccessible for scraping:

| Platform | Issue |
|----------|-------|
| Glints | Cloudflare CAPTCHA — skip |
| Jobs.id | DNS resolution failure — dead domain |
| Karir.com | SSL certificate expired — skip |
| Kalibrr | Redirects to parking domain |
| Lokerku | Parking/lander page, no jobs |

**Conclusion:** No Indonesian job board is scrapable. Use LinkedIn Indonesia + global remote platforms only.

## Global Remote Platforms
- **Remotive.com** ✅ — JSON API works: `https://remotive.com/api/remote-jobs`
- **Remote3.co** ✅ — HTML scrape works for niche Web3/Crypto AI jobs

## Browser Tool Notes
- NO `emulateTimezone()` in patchright — causes crash, remove it
- Use `page.evaluate(() => window.scrollTo(0, 400))` instead
- LinkedIn output needs post-processing regex to fix field offset
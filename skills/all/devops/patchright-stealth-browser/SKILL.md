---
name: patchright-stealth-browser
description: Stealth web scraping dengan patchright — bypass Cloudflare, bot detection, captcha. Drop-in replacement Playwright.
category: devops
tags: [scraping, browser-automation, stealth, patchright]
version: 1.0.0
author: hermes
---

# patchright Stealth Browser Skill

## Trigger
User minta: scrape, browsing, extract data dari website, jobs scraper, stealth browsing, bypass bot detection.

## Setup

```bash
cd /home/admin
npm install patchright
```

## Basic Usage

```javascript
const { chromium } = require('/home/admin/node_modules/patchright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set realistic viewport
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Optional: set timezone & locale
  await page.emulateTimezone('Asia/Jakarta');
  await page.emulateLocale('id-ID');

  await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const title = await page.title();
  const content = await page.content();

  // Extract from page
  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('selector')).map(el => el.innerText);
  });

  await browser.close();
  console.log(JSON.stringify({ title, data }));
})();
```

## Job Scraper Template

Target working: LinkedIn (passes bot detection ✅)
Target blocked: loker.id, karir.com, JobsDB, glints.com (Cloudflare/captcha)

```javascript
const { chromium } = require('/home/admin/node_modules/patchright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const searchTerms = ['AI engineer', 'software engineer', 'data scientist', 'machine learning'];
  const jobs = [];

  for (const term of searchTerms) {
    const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(term)}&location=Indonesia&f_TPR=r604800`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3500);
    await page.evaluate(() => window.scrollTo(0, 400));

    const text = await page.evaluate(() => document.body.innerText);
    const lines = text.split('\n').filter(l => l.trim());

    // Parse job cards from LinkedIn text format
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Title pattern: title case, 2-7 words, followed by duplicate
      if (line.length > 10 && line.length < 80 && line === lines[i+1]) {
        const company = lines[i+3] || '';
        const location = lines[i+4] || '';
        const time = lines[i+5] || '';
        if (!jobs.find(j => j.title === line && j.company === company)) {
          jobs.push({ title: line, company, location, time });
        }
        i += 6;
      }
    }
    if (jobs.length >= 20) break;
  }

  await browser.close();
  console.log(JSON.stringify(jobs.slice(0, 20), null, 2));
})();
```

## Bot Detection Test

Test di: https://bot.sannysoft.com

Expected results dengan patchright:
- WebDriver (New): missing ✅
- WebDriver Advanced: passed ✅
- Chrome: missing ✅
- Permissions: prompt ✅
- WebGL Vendor: Google Inc. ✅

## Pitfalls

1. **Cloudflare blocked** → target lain atau pakai LinkedIn (working)
2. **Captcha required** → skip, target lain
3. **waitForTimeout too short** → scroll dan wait dulu sebelum extract
4. **Page redirected** → check page.url() setelah goto
5. **No content** → evaluate document.body.innerText bukan innerHTML

## Verification

```bash
# Test launch
node -e "const { chromium } = require('/home/admin/node_modules/patchright'); (async () => { const b = await chromium.launch({ headless: true }); const p = await b.newPage(); await p.goto('https://example.com'); console.log('OK:', await p.title()); await b.close(); })();"

# Test bot detection
node -e "const { chromium } = require('/home/admin/node_modules/patchright'); (async () => { const b = await chromium.launch({ headless: true }); const p = await b.newPage(); await p.goto('https://bot.sannysoft.com'); await p.waitForTimeout(2000); console.log(await p.content()); await b.close(); })();"
```

## LinkedIn Specific

- No Cloudflare ✅
- 152+ jobs visible without login
- Wait 3500ms + scroll to 400px before extract
- Parse from body.innerText (not HTML)
- URL params: `f_TPR=r604800` (last 7 days filter works)

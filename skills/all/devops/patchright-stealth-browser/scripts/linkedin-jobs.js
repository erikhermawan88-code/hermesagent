#!/usr/bin/env node
/**
 * LinkedIn Jobs Scraper — patchright stealth browser
 * Usage: node linkedin-jobs.js
 *
 * Output: JSON array of job objects
 * Tested: passes bot.sannysoft.com ✅
 */

const { chromium } = require('/home/admin/node_modules/patchright');

const SEARCH_TERMS = ['AI engineer', 'software engineer', 'data scientist', 'machine learning'];
const LOCATION = 'Indonesia';
const LIMIT = 20;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateTimezone('Asia/Jakarta');
  await page.emulateLocale('id-ID');

  const jobs = [];

  for (const term of SEARCH_TERMS) {
    const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(term)}&location=${encodeURIComponent(LOCATION)}&f_TPR=r604800`;
    console.error(`[*] Scraping: ${term}`);

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3500);
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(1000);

    const text = await page.evaluate(() => document.body.innerText);
    const lines = text.split('\n').filter(l => l.trim());

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.length > 10 && line.length < 80 && line === lines[i + 1]) {
        const company = lines[i + 3] || '';
        const location = lines[i + 4] || '';
        const time = lines[i + 5] || '';
        if (!jobs.find(j => j.title === line && j.company === company)) {
          jobs.push({ title: line, company, location, time });
        }
        i += 6;
      }
    }

    if (jobs.length >= LIMIT) break;
  }

  await browser.close();
  console.log(JSON.stringify(jobs.slice(0, LIMIT), null, 2));
})();

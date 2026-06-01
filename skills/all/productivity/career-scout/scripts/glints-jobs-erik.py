#!/usr/bin/env python3
"""
Glints Jobs Scraper — curl_cffi Edition
Bypasses Cloudflare TLS fingerprinting via Chrome impersonation.
Note: Search query is ignored server-side — returns recommended jobs list.
"""

import json
import sys
from datetime import datetime

try:
    from curl_cffi import requests
except ImportError:
    print("ERROR: curl_cffi not installed. Run: pip install curl-cffi")
    sys.exit(1)


def scrape_glints_jobs():
    session = requests.Session(impersonate='chrome120')

    headers = {
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://glints.com/id/lowongan-kerja",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    }

    # Fetch main page to get __NEXT_DATA__
    try:
        response = session.get(
            "https://glints.com/id/lowongan-kerja",
            headers=headers,
            timeout=30
        )
    except Exception as e:
        print(f"Error fetching Glints: {e}")
        return []

    html = response.text

    # Extract __NEXT_DATA__
    import re
    match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.DOTALL)
    if not match:
        print("Could not find __NEXT_DATA__ in page")
        return []

    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        return []

    # Navigate to jobs
    try:
        jobs_data = data["props"]["pageProps"]["initialState"]["recruitment"]["opportunities"]["jobs"]
    except (KeyError, TypeError):
        print("Unexpected data structure from Glints")
        return []

    jobs = []
    for job in jobs_data[:20]:
        # Parse location hierarchy
        location_parts = []
        for loc in job.get("location", {}).get("hierarchy", []):
            if loc.get("name"):
                location_parts.append(loc["name"])
        location_str = ", ".join(location_parts) if location_parts else "Indonesia"

        # Company name
        company_name = job.get("companyDetail", {}).get("name", "Unknown")

        jobs.append({
            "title": job.get("title", "Unknown"),
            "company": company_name,
            "location": location_str,
            "url": f"https://glints.com/id/lowongan-kerja/{job.get('id', '')}",
        })

    return jobs


def format_telegram(jobs):
    if not jobs:
        return "⚠️ Tidak ada jobs dari Glints."

    lines = ["🔍 *Erik AI Career Scout — Glints Indonesia*", "━" * 20, "📊 Jobs dari Glints.com\n"]

    for job in jobs:
        lines.append(f"🔹 *{job['title']}*")
        lines.append(f"🏢 {job['company']}")
        lines.append(f"📍 {job['location']}")
        lines.append(f"🔗 {job['url']}\n")

    lines.append(f"⚠️ 共 {len(jobs)} jobs | Source: Glints.com")
    return "\n".join(lines)


if __name__ == "__main__":
    jobs = scrape_glints_jobs()
    output = format_telegram(jobs)
    print(output)

    # Save to output file
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    with open(f"/tmp/glints_jobs_{timestamp}.md", "w") as f:
        f.write(f"# Cron Job: Erik Glints Jobs Scout\n\n")
        f.write(f"**Run Time:** {datetime.now().isoformat()}\n\n")
        f.write(output)
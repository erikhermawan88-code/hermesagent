# Hermes Agent Backup

**Backup date:** 2026-08-18
**Machine:** digitalnusa.com

## What's Backed Up

### Core Config
- `config/config.yaml` — Hermes configuration

### User Data
- `data/MEMORY.md` — Erik's context, preferences, project memory
- `data/USER.md` — User profile

### Skills (58 total)
- `skills/components/` — M3 UI Components:
  - m3-hero-slider
  - m3-steps-section
  - m3-benefits-grid
  - m3-products-grid
  - m3-testimonials

### Company Data
- `company/` — Hermes Holdings organizational data
  - agents.json — Agent roster & status
  - org-chart.md — Organizational chart
  - AGENTS.md — Agent rules & workflow

### KasirFlow Project
- `kasirflow/` — Customer acquisition system
  - kasirflow_agent.py — Lead outreach agent
  - run-daily.sh — Daily automation script
  - export_web.py — DataLead export
  - KASIRFLOW_Business_Plan.md

### Domains Backup
- `domains/` — Website files
  - datalead/ — Lead tracking system (v3.0)
  - packaging-batam/ — M3 redesigned landing page

## Not Backed Up
- node_modules, hermes-agent/ (codebase)
- state.db, session logs (too large)
- API keys (stored in .env, not committed)

## To Restore

```bash
# Restore memories
cp data/MEMORY.md ~/.hermes/memories/
cp data/USER.md ~/.hermes/memories/

# Restore skills
cp -r skills/components/* ~/.hermes/skills/components/

# Restore config
cp config/config.yaml ~/.hermes/config.yaml
```

## Cron Jobs (9 Active)

| Job | Schedule | Status |
|-----|----------|--------|
| COO Agent Daily Briefing | 07:30 | OK |
| KasirFlow Daily Outreach | 0 7 * * * | OK |
| KasirFlow Leads Harian | Daily | Error |
| Anime Red Daily | Daily | OK |
| Clipper Daily 2 Clips | Every 6h | OK |

---
*Hermes Holdings Backup — Backup by DataByte AI*

# Hermes Agent Backup

Backup date: 2026-06-01
Machine: digitalnusa.com

## What's backed up

- `data/MEMORY.md` — Erik's context, preferences, project memory
- `data/USER.md` — User profile
- `data/jobs.json` — 9 active cron jobs (credentials redacted)
- `data/skills-list.json` — 46 skills with descriptions
- `skills/all/` — Full content of all 46 skill directories
- `skills/custom/` — 3 custom skills (agent-soul-routing, seo-ai-search-domination, ui-ux-pro-max)
- `config/config.yaml` — Hermes configuration

## Not backed up (too large / no need)
- node_modules, node/, hermes-agent/ (codebase, not user data)
- state snapshots, logs, cache
- Cron output logs

## To restore

1. Copy MEMORY.md → ~/.hermes/memories/MEMORY.md
2. Copy USER.md → ~/.hermes/memories/USER.md  
3. Restore cron: `hermes cron import jobs.json`
4. Copy skills back: cp -r skills/all/* ~/.hermes/skills/

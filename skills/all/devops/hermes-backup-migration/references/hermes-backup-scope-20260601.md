# Hermes Backup Scope — 2026-06-01

## Live Assessment Results

```
~/.hermes/ total (excluding cache/logs/images): ~3.8GB
Target backup size: ~30-50MB (selective)
```

## Directory Breakdown

| Path | Size | Include | Notes |
|------|------|---------|-------|
| `memories/` | 12K | ✅ YES | MEMORY.md + USER.md |
| `skills/` | 15M | ✅ YES | 51 skill dirs (48 local custom) |
| `cron/` | 8.9M | ✅ YES | jobs.json + output logs |
| `agents/` | 248K | ✅ YES | Agent configs |
| `config.yaml` | 16K | ✅ YES | Main config |
| `kanban.db` | 104K | ✅ YES | Kanban state |
| `sessions/` | 24K | ✅ YES | sessions.json |
| `sandboxes/` | 8K | ✅ YES | Sandbox configs |
| `scripts/` | 52K | ✅ YES | Helper scripts |
| `SOUL.md` | - | ✅ YES | Agent persona |
| `state-snapshots/` | 313M | ❌ NO | Checkpoint history (too large) |
| `node/` | 1.1G | ❌ NO | Node.js runtime |
| `hermes-agent/node_modules/` | 34M | ❌ NO | Python venv |
| `cache/` | varies | ❌ NO | Ephemeral cache |
| `logs/` | varies | ❌ NO | Log files |
| `images/` | varies | ❌ NO | Cached images |
| `audio_cache/` | varies | ❌ NO | Audio cache |
| `image_cache/` | varies | ❌ NO | Image cache |

## Cron Jobs Found

```
hermes cron list → 12 active jobs (4 shown in list output):
  9087bc19408e — Erik Daily Hermes News (Burma)
  ae2f2b8262e3 — Veronica 3H Social Behavior Analysis
  c62d87e4783f — Veronica 6H Market Opportunity Analysis
  f6f18273aa75 — Iran-US News Real-Time Monitor
  (plus 8 more — full list in cron/jobs.json)
```

## Git Status

- `~/.hermes/` — NOT a git repo (never initialized)
- Git config: `user.name=Erik, user.email=erik@digitalnusa.com` ✅
- SSH keys: `~/.ssh/hermes_rsa`, `hermes_rsa.pub`, `root_rsa`, `root_rsa.pub`, `newbot_rsa`
- No `gh` CLI installed — use raw `git` commands
- `git` available at `/usr/bin/git`

## GitHub Setup Required

1. Create new repo on GitHub (e.g. `hermes-backup`)
2. Generate dedicated backup SSH key: `ssh-keygen -t ed25519 -C "erik@digitalnusa.com" -f ~/.ssh/github_backup`
3. Add `~/.ssh/github_backup.pub` as Deploy Key in repo Settings
4. Push with: `git remote add origin git@github.com:USERNAME/hermes-backup.git`

## Cron Jobs Output Sizes

```
f6f18273aa75/  6.8M  (Iran-US News)
9087bc19408e/  980K  (Burma News)
ae2f2b8262e3/  448K  (Veronica 3H)
c62d87e4783f/  384K  (Veronica 6H)
```

## Skills Inventory

```
Total skills: 138 (5 hub-installed, 85 builtin, 48 local)
Local skills (custom): 48 — all in ~/.hermes/skills/
Categories: autonomous-ai-agents, clipper, clipper-company, creative,
data-science, development, devops, diagramming, dogfood, domain, email,
finance, gaming, gbrain, github, life-strategy, media, mcp, mlops,
mlops/evaluation, mlops/inference, mlops/models, mlops/research, note-taking,
productivity, qmd, red-teaming, research, smart-home, social-media,
software-development, subagent, telegram, website-workflow, youtube-clipper,
yuanbao, web-development
```

## Restore Verification Checklist

After restore on new server:
- [ ] `hermes skills list | wc -l` → should show ~138 skills
- [ ] `hermes cron list` → should show all active jobs
- [ ] `cat ~/.hermes/memories/MEMORY.md | grep "Erik"` → context restored
- [ ] Telegram bot token re-connected in `~/.hermes/.env`
- [ ] MiniMax provider configured in `config.yaml`
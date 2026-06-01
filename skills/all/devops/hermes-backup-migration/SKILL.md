---
name: hermes-backup-migration
description: "Full Hermes Agent system backup to GitHub, and restore procedure on a new server. Covers scope assessment, git setup, selective file inclusion, GitHub push, and one-click restore."
---

# Hermes Backup & Migration

Backup entire Hermes Agent system to a GitHub repo so a new agent can be spun up on any server by uploading the data and running the restore script.

## When to Use

- User says "backup semua sistem", "pindah server", "setup agent baru", "migrate Hermes"
- Before major server changes (reformat, change provider, etc.)
- Periodic archival of system state

## Scope Assessment (Pre-Backup)

Before starting, assess what's in `~/.hermes/`:

```bash
du -sh ~/.hermes/ --exclude='cache' --exclude='logs' --exclude='images' --exclude='audio_cache' --exclude='image_cache'
```

Key directories and their sizes:

| Directory | Typical Size | Include? | Reason |
|-----------|-------------|----------|--------|
| `memories/` | ~12KB | ✅ YES | MEMORY.md + USER.md (all context/preferences) |
| `skills/` | ~15MB | ✅ YES | All custom local skills (48 local skills) |
| `cron/` | ~9MB | ✅ YES | All cron jobs + output logs |
| `agents/` | ~248KB | ✅ YES | Agent configs (Veron, etc.) |
| `config.yaml` | ~16KB | ✅ YES | Main config |
| `kanban.db` | ~104KB | ✅ YES | Kanban board state |
| `sessions/` | ~24KB | ✅ YES | Session store |
| `sandboxes/` | ~8KB | ✅ YES | Sandbox configs |
| `scripts/` | ~52KB | ✅ YES | Helper scripts |
| `SOUL.md` | - | ✅ YES | Agent soul/persona |
| `node/` | ~1.1GB | ❌ NO | Node.js runtime — too large, reinstall via package manager |
| `state-snapshots/` | ~313MB | ❌ NO | Checkpoint history — too large, regenerates |
| `hermes-agent/node_modules/` | ~34MB | ❌ NO | Python venv + deps — reinstall via `pip install` or venv re-creation |
| `cache/` | varies | ❌ NO | Temporary cache |
| `logs/` | varies | ❌ NO | Log files |
| `images/` | varies | ❌ NO | Cached images |
| `audio_cache/` | varies | ❌ NO | Audio cache |
| `image_cache/` | varies | ❌ NO | Image cache |
| `gateway.lock`, `gateway.pid`, `*.db-shm`, `*.db-wal` | - | ❌ NO | Runtime lock files — not portable |

**Total backup target: ~30-50MB** (skills + memories + cron + config + agents)

## Backup Workflow

### Step 1 — Create Backup Directory
```bash
mkdir -p ~/hermes-backup
```

### Step 2 — Selective Copy (exclude large/runtime files)

```bash
rsync -av \
  --exclude='cache' \
  --exclude='logs' \
  --exclude='images' \
  --exclude='audio_cache' \
  --exclude='image_cache' \
  --exclude='node' \
  --exclude='state-snapshots' \
  --exclude='hermes-agent/node_modules' \
  --exclude='*.db-shm' \
  --exclude='*.db-wal' \
  --exclude='gateway.lock' \
  --exclude='gateway.pid' \
  --exclude='processes.json' \
  ~/.hermes/ ~/hermes-backup/hermes-system/
```

### Step 3 — Create Restore Script

Write `scripts/restore-hermes.sh` to the backup:

```bash
#!/bin/bash
# hermes-backup-migration/scripts/restore-hermes.sh
# Usage: bash restore-hermes.sh <backup-tar.gz>
# Run on NEW server after Hermes Agent is installed

set -e

BACKUP_FILE=$1
HERMES_HOME=~/.hermes

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: bash restore-hermes.sh <backup.tar.gz>"
  exit 1
fi

echo "Extracting backup..."
mkdir -p "$HERMES_HOME"
tar -xzf "$BACKUP_FILE" -C "$HERMES_HOME" --strip-components=1

echo "Restoring Hermes system..."
# Restore memories
# Restore skills
# Restore cron jobs
# Restore config
# Restore agents

echo "Done! Restart Hermes Agent to load restored state."
```

### Step 4 — GitHub Push

**Check prerequisites:**
```bash
git config --global user.name  # must be set
git config --global user.email # must be set
cat ~/.ssh/id_rsa.pub 2>/dev/null || cat ~/.ssh/id_ed25519.pub 2>/dev/null  # for GitHub deploy key
```

**If no GitHub SSH key exists:**
```bash
ssh-keygen -t ed25519 -C "erik@digitalnusa.com" -f ~/.ssh/github_backup
# Add ~/.ssh/github_backup.pub to GitHub → Settings → Deploy Keys
```

**Initialize and push:**
```bash
cd ~/hermes-backup/hermes-system/
git init
git add -A

# Create .gitignore to exclude runtime files
cat > .gitignore << 'EOF'
*.db-shm
*.db-wal
gateway.lock
gateway.pid
processes.json
cache/
logs/
images/
audio_cache/
image_cache/
node/
state-snapshots/
hermes-agent/node_modules/
EOF

git commit -m "Hermes Agent system backup $(date +%Y-%m-%d)"
git remote add origin git@github.com:USERNAME/hermes-backup.git
git push -u origin master
```

### Step 5 — Package for Download

```bash
cd ~
tar -czf hermes-backup-$(date +%Y%m%d).tar.gz hermes-backup/
# Serve at digitalnusa.com for download
cp hermes-backup-$(date +%Y%m%d).tar.gz /home/admin/domains/digitalnusa.com/public_html/
```

## Restore on New Server

### Option A — Full Restore (if migrating)
```bash
# On new server, after Hermes Agent is installed:
tar -xzf hermes-backup-YYYYMMDD.tar.gz
# Restore files to ~/.hermes/
# Restart hermes-agent
```

### Option B — Selective Restore (keep new config)
Only restore specific directories:
```bash
# Restore memories only (keep new config)
cp -r hermes-backup/hermes-system/memories/* ~/.hermes/memories/
cp -r hermes-backup/hermes-system/skills/* ~/.hermes/skills/
hermes cron restore hermes-backup/hermes-system/cron/jobs.json
```

## Key Files to Always Include

```
~/.hermes/memories/MEMORY.md      ← Erik's context, preferences, workflow rules
~/.hermes/memories/USER.md         ← Erik profile
~/.hermes/skills/                   ← All custom skills (48 local)
~/.hermes/cron/jobs.json           ← All cron job definitions
~/.hermes/agents/                  ← Subagent configs (Veron, etc.)
~/.hermes/config.yaml              ← Main configuration
~/.hermes/kanban.db                ← Kanban board state
~/.hermes/sessions/sessions.json   ← Session store
~/.hermes/SOUL.md                  ← Agent persona
```

## Restore Script

`scripts/restore-hermes.sh` — self-contained restore script for new server. Run with:
```bash
bash restore-hermes.sh <backup.tar.gz>
```

## Current System Snapshot

`references/hermes-backup-scope-20260601.md` — pre-computed scope assessment of the live system (sizes, cron job IDs, skills inventory, git status). Update this file before each backup to capture the current state. This is the session-specific detail that makes the restore on a new server accurate.

## Pitfalls

- **Do NOT backup `node/`** — Node.js runtime, reinstall via package manager on new server
- **Do NOT backup `hermes-agent/node_modules/`** — Python venv, recreate with `python -m venv` + `pip install`
- **Do NOT backup `state-snapshots/`** — regenerates automatically
- **Do NOT backup runtime lock files** — `gateway.lock`, `gateway.pid`, `*.db-shm`, `*.db-wal`
- **Git not initialized in `.hermes/`** — must `git init` before first push
- **No SSH key for GitHub** — generate with `ssh-keygen -t ed25519`, add deploy key to repo
- **`gh` CLI not always available** — use raw `git` commands instead
- **Git config not set** — check `git config --global user.name` and `git config --global user.email` before `git init`
- **Total backup should be <100MB** — anything larger means something got included that shouldn't

## Restore Verification

After restore, verify:
```bash
hermes skills list | wc -l   # should show ~138 skills
hermes cron list             # should show all jobs
cat ~/.hermes/memories/MEMORY.md | head -5  # should have Erik's context
```
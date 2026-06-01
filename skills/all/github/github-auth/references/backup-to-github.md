# GitHub as Backup & Disaster Recovery Target

## Overview
Using GitHub repos as off-site backup storage for databases and critical application data. If the VPS/server goes down, data is safe in GitHub and can be restored by cloning/pulling.

## When to Use
- VPS/server crash recovery (data survives independent of the server)
- cPanel/GitHub integration for auto-deploy pipelines  
- Cross-environment data portability (dev → staging → production via GitHub)

## Architecture Pattern
```
[Server/VPS MYSQL] → mysqldump → gzip → git commit → GitHub repo
                                              ↓
[anywhere] ← git clone/pull ← restore from dump
```

## Prerequisites
- GitHub authentication configured (see github-auth skill)
- Target repo is private or seeded with appropriate .gitignore
- Backup user has SELECT + LOCK TABLES privileges

## Backup Script Template

```bash
#!/usr/bin/env bash
# scripts/db-backup-to-github.sh
# Usage: ./db-backup-to-github.sh <db_name> <gh_owner/repo> <commit_message>

set -euo pipefail

DB_NAME="${1:-}"
REPO="${2:-}"
MSG="${3:-auto-backup $(date +%Y-%m-%d_%H-%M)}"
BACKUP_DIR="/tmp/mysql-backups"
mkdir -p "$BACKUP_DIR"

DATE=$(date +%Y-%m-%d_%H%M%S)
DUMP_FILE="${BACKUP_DIR}/${DB_NAME}-${DATE}.sql.gz"

# Dump
mysqldump -u root -p"$MYSQL_ROOT_PASS" --single-transaction --quick "$DB_NAME" \
  | gzip > "$DUMP_FILE"

echo "Dumped: $(ls -lh $DUMP_FILE)"
```

## GitHub API Push Pattern (curl only, without gh)

Because `gh` is often not installed on servers, backup scripts use raw git + curl:

```bash
# 1. Clone repo ( credential helper already configured via github-auth skill)
git clone https://github.com/${GH_OWNER}/${GH_REPO}.git /tmp/backup-repo
cd /tmp/backup-repo

# 2. Copy dump file into repo
cp "${DUMP_FILE}" "backups/${DB_NAME}/"
git add "backups/${DB_NAME}/"

# 3. Commit + push
git config --global user.name "Erik"
git config --global user.email "erik@example.com"   # set from github-auth identity
git commit -m "$MSG"
git push origin main
```

## Cron Backup Schedule
Typical setup: daily backup at 03:00 AM server time.

```bash
# Schedule in crontab -e
0 3 * * * /opt/backup-scripts/mysql-daily.sh >> /var/log/mysql-backup.log 2>&1
```

## Restore Flow
```bash
# Clone to local machine
git clone https://github.com/erikhermawan88-code/db-backups.git
cd db-backups/backups/<db_name>/

# Pick latest dump
gunzip < latest-backup.sql.gz | mysql -u root -p db_name
```

## Notes for Erik's Setup
- VPS is at 43.134.83.2; MySQL is likely on that VPS (not this server)
- Database connection credentials needed: host, port, user, password, db name
- Push destination: `erikhermawan88-code/hermesagent` or create a dedicated `db-backups` repo
- cPanel GitHub Deploy can pull from GitHub → cPanel public_html on push to main

#!/bin/bash
# hermes-backup-migration/scripts/restore-hermes.sh
# Usage: bash restore-hermes.sh <backup.tar.gz>
# Run on NEW server after Hermes Agent is freshly installed

set -e

BACKUP_FILE=$1
HERMES_HOME="$HOME/.hermes"
BACKUP_NAME="hermes-system"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: bash restore-hermes.sh <backup.tar.gz>"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found: $BACKUP_FILE"
  exit 1
fi

echo "Extracting Hermes backup..."
mkdir -p "$HERMES_HOME"
tar -xzf "$BACKUP_FILE" -C "$HERMES_HOME" --strip-components=1

echo "Verifying restored files..."
REQUIRED_FILES=(
  "memories/MEMORY.md"
  "memories/USER.md"
  "skills"
  "cron/jobs.json"
  "agents"
  "config.yaml"
  "SOUL.md"
)

for f in "${REQUIRED_FILES[@]}"; do
  if [ -e "$HERMES_HOME/$f" ]; then
    echo "  ✓ $f"
  else
    echo "  ✗ MISSING: $f"
  fi
done

echo ""
echo "Restoring cron jobs..."
if [ -f "$HERMES_HOME/cron/jobs.json" ]; then
  # Restart hermes to pick up restored cron jobs
  hermes cron pause --all 2>/dev/null || true
  # Jobs will be picked up automatically on next restart
fi

echo ""
echo "=========================================="
echo "Hermes restore complete!"
echo ""
echo "Next steps on new server:"
echo "  1. hermes skills list | wc -l  # verify ~138 skills loaded"
echo "  2. hermes cron list             # verify jobs restored"
echo "  3. hermes restart               # reload everything"
echo ""
echo "If this is a migration, also verify:"
echo "  - Telegram bot token re-connected"
echo "  - API keys in ~/.hermes/.env"
echo "  - Provider config (MiniMax, etc.)"
echo "=========================================="
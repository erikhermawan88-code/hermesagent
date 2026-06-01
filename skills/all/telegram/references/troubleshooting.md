# Telegram Bot Troubleshooting Guide

## Session-Derived Diagnostics

Real-world troubleshooting patterns from live Hermes + Telegram sessions.

---

## HTTP 409 Conflict — Polling Collision

**Symptom:** Bot stops responding to messages. `getUpdates` returns HTTP 409 Conflict.

**Log signature:**
```
Telegram polling conflict — previous session still held open on Telegram's servers.
Error: Conflict: terminated by other getUpdates request; make sure that only one bot instance is running
```

**Root causes (two distinct cases):**
1. **Webhook + Polling collision** — both modes active simultaneously on the same token
2. **Polling competition** — two bot processes using the same token (common in containerized/multi-process deployments)

**Resolution path:**
```
1. Check webhook status:
   curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo
   → If url is set: deleteWebhook is the fix
   → If url is empty: conflict is from multiple polling instances

2. For Hermes gateway polling conflict:
   hermes gateway restart
   (This clears Telegram's stale polling state server-side)

3. To prevent:
   → Only ONE process polls per token
   → One container per bot token
```

**Diagnostic one-liner:**
```bash
python3 -c "
import re, urllib.request, json
with open('/root/.hermes/.env') as f:
    for line in f:
        if 'TELEGRAM_BOT_TOKEN' in line and not line.strip().startswith('#'):
            token = line.strip().split('=',1)[1]
            req = urllib.request.Request('https://api.telegram.org/bot' + token + '/getWebhookInfo')
            try:
                with urllib.request.urlopen(req, timeout=10) as r:
                    print(json.dumps(json.loads(r.read()), indent=2))
            except Exception as e:
                print('Error:', e)
"
```

---

## Bot Online But Not Responding (No 409)

Check in order:
1. `getMe` — confirm token is valid
2. `getUpdates` with offset=-1 — confirm messages are arriving (empty = polling is working)
3. `TELEGRAM_ALLOWED_USERS` env var — confirm user ID is listed
4. User has sent `/start` to bot (required before DM works)
5. In groups: privacy mode may block — try `/setprivacy` via BotFather or add bot as admin

---

## Hermes Gateway Offline — Cron Delivery Failure

**Symptom:** Cron jobs with `deliver: telegram:...` fail silently. Bot token is valid (`getMe` returns ok), `getUpdates` shows messages are queuing, but no deliveries arrive. User says "Telegram tidak ada respon."

**Root cause:** Hermes Gateway is not running. The gateway polls Telegram and delivers cron job outputs. If offline, all Telegram delivery silently fails.

**Diagnostic sequence — run in order:**
```bash
# Step 1: Check gateway status (fastest diagnosis)
hermes gateway status
# → ✗ Gateway is not running  ← root cause

# Step 2: Confirm bot token is functional
source ~/.hermes/.env
curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe"
# → {"ok":true,"result":{...}}  token valid

# Step 3: Confirm updates are queuing on Telegram side
curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=-1"
# → {"ok":true,"result":[...]}  N pending updates waiting for gateway
```

**Resolution — start the gateway:**
```bash
# Use background=true in terminal tool
hermes gateway run

# Install as persistent service (survives reboot)
hermes gateway install        # user-level
sudo hermes gateway install --system  # boot-time
```

**Critical anti-pattern:**
- `hermes gateway restart` assumes gateway is already running — will silently do nothing if it's dead
- When `status` shows "not running", the fix is `run`, NOT `restart`

**Prevention:** Always install gateway as a system service. A freshly-started server with no background gateway will have zero Telegram delivery for all cron jobs.

---

## Hermes + Telegram Integration

## Hermes + Telegram Integration

| Item | Value |
|------|-------|
| Gateway restart | `hermes gateway restart` |
| Token location | `~/.hermes/.env` → `TELEGRAM_BOT_TOKEN` |
| Allowed users | `TELEGRAM_ALLOWED_USERS` (comma-separated user IDs) |
| Home channel | `TELEGRAM_HOME_CHANNEL` (default DM for cron delivery) |
| Logs | `~/.hermes/logs/agent.log` — filter: `grep -i telegram` |
| Bot username | @Mazeric88_bot (May 2026 session) |

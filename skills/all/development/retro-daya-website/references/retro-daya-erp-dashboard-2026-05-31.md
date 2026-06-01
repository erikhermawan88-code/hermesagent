# Retro Daya Engineering — ERP Dashboard Project

**Status:** In progress (2026-05-31)
**URL:** https://digitalnusa.com/retro-daya-erp/

## Scope
Full ERP dashboard for Retro Daya Engineering operations:
- Invoice management
- Purchasing (PO)
- Inventory
- Email (SMTP/IMAP config)
- File System
- Project tracking

Design: slate sidebar (#0f172a), amber accent (#f59e0b), Outfit font, GSAP animations.
Storage: localStorage MVP → future FastAPI + SQLite backend.

## Current State (2026-05-31)

### Problem: JavaScript SyntaxError in `sendInvoiceEmail` function

The `index.html` contains JavaScript code with actual newline characters (0x0a) inside
single-quoted string literals in `openEmailCompose()` calls. This causes:

- `node --check` → `SyntaxError: Invalid or unexpected token` at line ~625
- Browser: `navigate is not defined`, `DB is not defined` — entire script fails to parse

**Root cause:** Multi-line email body template strings in `sendInvoiceEmail` function:
```javascript
// BROKEN — actual newlines in string literal
body: 'Dear ' + inv.client + ', Please find attached invoice ' + inv.id + ' for the amount of ' + fmt(inv.total) + '.
\n\nDue date: ' + fmtDate(inv.due) + '
\n\nFor any questions...
```

The parser sees `'...amount of ' + fmt(inv.total) + '.'` (complete statement), then `\n\nDue` as invalid token.

**Fix options:**
1. Replace actual newlines with `\\n` (escaped backslashes) — fragile, hard to maintain
2. Use template literals (backticks) instead of single-quoted strings — recommended
3. Rebuild as FastAPI + SQLite backend — most robust for production

### localStorage Dual-Mode (FIXED)

DB object now supports localStorage + in-memory fallback:
```javascript
DB._useStorage = false  // detected at runtime
DB._mem = {}             // in-memory fallback
```

`DB.init()` tests localStorage availability with `setItem('__test__', '1')` in try-catch.
If blocked, all data lives in `DB._mem` — no persistence across sessions.

## Sample Data (seeded on first load)
- 5 invoices: PT Paiton Energy, Petrokimia Gresit, Chevron Indonesia, Baker Hughes, Schlumberger
- 4 POs, 8 inventory items, 5 emails, 6 files, 4 projects, 4 vendors

## For Production: FastAPI + SQLite Backend

Single HTML file with 128KB of inline JS is fragile for a stateful 6-module ERP.
Recommended architecture:
- FastAPI backend with SQLite
- Separate HTML/JS frontend (no inline script)
- Proper API endpoints for CRUD operations
- SMTP/IMAP via Python libraries (smtplib, imaplib)
- Session authentication

This eliminates the JavaScript string literal problem entirely and provides
real data persistence across browsers and sessions.
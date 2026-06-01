# Retro Daya CMS Backend — Session Log
**Date:** 2026-05-27
**Task:** Build FastAPI+SQLite CMS backend for inline editing of `/var/www/retrodaya/index.html`

## What Was Built
```
/var/www/retrodaya-admin/
 main.py     # FastAPI backend (auth, CRUD, HTML patching)
 cms.db      # SQLite (created automatically on first run)
 start.sh     # uvicorn launcher
 admin/index.html # Vue3 SPA admin panel
```
Backend: /admin/ | Login: `admin` / `retrodaya2024`

## Architecture Decision
Direct port 8081 access — no nginx reverse proxy needed since the site already serves at port 80. Erik accesses CMS via `/admin/`.

## Core Problem: HTML Marker Sync via String Replace
The backend reads `index.html` and replaces content by finding marker comment strings:
```python
def patch_html(section, items):
  cfg = HTML_PATCHES[section]
  html = Path(cfg["file"]).read_text()
  start = html.find(cfg["marker_start"])
  end = html.find(cfg["marker_end"])
  # ... generate new content ...
  html = html[:start] + cfg["marker_start"] + new_content + cfg["marker_end"] + html[end+len(cfg["marker_end"]):]
  Path(cfg["file"]).write_text(html)
```

**Critical requirement:** The marker comment and the opening/closing tags must be on the exact same string positions as expected by the substring search. Any newline or whitespace mismatch causes `find()` to return -1 → 500 error.

## Root Cause of HTTP 500 on PUT
1. **`get_item()` bug:** Line had `if not r is None:` instead of `if r is None:` — every GET for single item returned 404 (but section-level GET worked, masking the bug).
2. **Marker placement:** My initial attempt to add markers by inserting lines into a split `html.split('\n')` array caused double-insertion on services/projects (marker added twice: once by the insertion logic AND once by the while-loop copying). Result: markers ended up on wrong line numbers relative to the tags they were supposed to wrap.
3. **Solution: depth-counter algorithm** (see SKILL.md) — find `open_pos` via `html.find()`, use proper close-tag finder, compute line numbers from char count.

## Files Changed This Session
- `/var/www/retrodaya/index.html` — re-downloaded from live site to restore clean state, then marker comments added via depth-counter algorithm
- `/var/www/retrodaya-admin/main.py` — FastAPI backend with HTML sync
- `/var/www/retrodaya-admin/admin/index.html` — Vue3 admin SPA
- `/var/www/retrodaya-admin/start.sh` — launcher script
- `/var/www/retrodaya/images/logo-retro-long-white.jpeg` — Erik's original uploaded logo (saved from `/root/.hermes/image_cache/img_f8321c7977b7.jpg`)

## Root Cause of HTTP 500 on PUT — ALL THREE RESOLVED
1. **patch_html() wrong variable:** `text = f.read_text()` → `text = fpath.read_text()` (NameError, caught in uvicorn logs)
2. **Auth Header vs Query param:** `require_auth(token: str = Query(...))` → `require_auth(Authorization: str = Header(None))` with `token = Authorization[7:]` (422 on every API call, caught via log inspection)
3. **Marker placement:** line-splitting caused double-insertion → depth-counter algorithm to find matching close tag

## Verification (2026-05-27 afternoon)
```bash
curl -X PUT "http://localhost:8081/api/content/stats/stat_0" \
 -H "Authorization: Bearer $TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"data":{"value":"30+","label":"Years Experience"}}'
# Returns: {"ok":true,"section":"stats","id":"stat_0"}
# Frontend stats section shows "30+" ✓
```

## Outstanding Issue — RESOLVED ✓

## Erik's Logo Change (Important behavioral note)
Erik said "kok malah dirubah saya mau kayak awal" — the logo was silently changed from the original JPEG to an SVG placeholder I created. He explicitly wanted the original back. **Lesson:** Erik must approve any changes to his assets before implementation. Don't make unilateral assumptions.

## Key FastAPI Auth Gotcha (critical for future CMS work)
Frontend Vue SPA sends `Authorization: Bearer {token}` as **HTTP Header**. Backend `require_auth` MUST use:
```python
from fastapi import Header
def require_auth(Authorization: str = Header(None)):
  if not Authorization or not Authorization.startswith("Bearer "):
    raise HTTPException(401,"Missing/invalid Authorization header")
  token = Authorization[7:] # strip "Bearer "
```
If you use `Query(...)` instead, every API call returns **422 Unprocessable Entity** — because the Vue `fetch()` sends a Header but FastAPI `Query(...)` only reads query string params. This was the root cause of all 422 errors in this session.

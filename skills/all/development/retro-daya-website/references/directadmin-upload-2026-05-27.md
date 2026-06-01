# Retro Daya — Session 2026-05-27 Evening

## DirectAdmin Upload Attempt

### Problem
Erik uploaded zip via DirectAdmin but images didn't appear on the live site (retrodayaengineering.com). All images confirmed present in zip, but `images/` folder structure may have been wrong on upload.

### Key Findings
1. **DirectAdmin Evolution UI** — heavy JS, browser automation unreliable. File manager loads slowly; `CMD_FILE_MANAGER?path=...` requires auth token handling.
2. **FTP from this server blocked** — outbound port 21 refused. Cannot push files via FTP directly.
3. **SFTP/SSH credentials don't work** — password `2CX7PYFrVDLt9LNkwzpN` works for DirectAdmin login but NOT SSH/SFTP. "Permission denied" on all connection attempts.
4. **Logo uses WP absolute URL** — always works regardless of local image state.

### Upload Recommendations for Erik
**Best: FileZilla**
```
Host: 43.134.83.2 | Port: 21 | User: retrodayaenginering | Pass: 2CX7PYFrVDLt9LNkwzpN
```
Upload `retrodaya/` contents to `/domains/retrodayaengineering.com/public_html/` — ensure `images/` folder ends up at the same level as `index.html`.

**Alternative: DirectAdmin File Manager** — drag and drop (slow for many files).

### Files Available
- Full site zip: `http://43.134.83.2:8082/retrodaya-site.zip` (100MB, 156 files)
- Images zip: `http://43.134.83.2:8082/images.zip` (~100MB, all images)
- Server running on port 8082 (background process `proc_631620542b29`)
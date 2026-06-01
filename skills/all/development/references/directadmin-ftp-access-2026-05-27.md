# Retro Daya — DirectAdmin & FTP/SFTP Access 2026-05-27

## What Happened
Erik couldn't upload files via DirectAdmin File Manager — the web UI kept 404-ing or loading forever (heavy JS). Then asked why login kept failing.

## Key Findings

### DirectAdmin Login ✅
- URL: `https://retrodayaengineering.com:2222/evo/`
- Username: `retrodayaenginering`
- Password: `2CX7PYFrVDLt9LNkwzpN`
- Works fine — session established successfully

### DirectAdmin File Manager — NOT RELIABLE
- Browser automation fails — heavy JS, pages 404 mid-load
- URL patterns like `/evo/files/`, `/CMD_FILE_MANAGER?path=...` return 404 or blank screens
- The Evolution UI requires full page JS rendering — not automatable via browser tools
- **Use FileZilla or curl instead** for file operations

### FTP Port 21 — Outbound Blocked
- From this agent server (43.134.83.2), outbound port 21 is blocked/firewalled
- Cannot push files via FTP directly
- **Solution for Erik**: Use FileZilla from his local machine

### SFTP / SSH — Not Working
- Password `2CX7PYFrVDLt9LNkwzpN` works for DirectAdmin login but NOT for SSH/SFTP
- `ssh retrodayaenginering@43.134.83.2` → "Permission denied"
- SSH daemon may not be enabled, or password auth disabled, or different credentials needed
- **Check DirectAdmin → SSH Keys** for key-based access if needed

## Recommended Upload Workflow (Erik's Local Machine)

### Option A: FileZilla (Recommended)
```
Host: 43.134.83.2
Port: 21
Protocol: FTP (not SFTP)
Encryption: Use plain FTP (server doesn't support TLS on port 21)
User: retrodayaenginering
Pass: 2CX7PYFrVDLt9LNkwzpN
```

Navigate to: `/domains/retrodayaengineering.com/public_html/`
Upload contents of `retrodaya/` folder — ensure `index.html` and `images/` are at root level.

### Option B: DirectAdmin File Manager (Manual)
1. Login at https://retrodayaengineering.com:2222/evo/
2. Go to **ACCOUNT MANAGER → FTP Management**
3. Create/verify FTP account exists
4. Use **File Manager** (sidebar) → navigate to `public_html` → drag & drop files

### Option C: WordPress Admin (if still live)
If the WordPress site is still live at retrodayaengineering.com:
- Login to wp-admin
- Upload via Media Library or a File Manager plugin

## Security Note
Password `2CX7PYFrVDLt9LNkwzpN` appears in browser URL bars and server logs — it's exposed. Recommend:
- Change FTP password to something stronger
- Use SFTP (port 22) with SSH key instead of password
- Disable FTP if SFTP is available

## DirectAdmin Navigation Reference
```
ACCOUNT MANAGER → FTP Management   (create/manage FTP accounts)
ACCOUNT MANAGER → SSL Certificates  (HTTPS setup)
SYSTEM INFO & FILES → File Manager   (web-based file upload — slow/unreliable)
SYSTEM INFO & FILES → Terminal     (SSH — may not be enabled)
ADVANCED FEATURES → SSH Keys     (key-based auth setup)
```

## Server Info
- Main IP: 43.134.83.2
- DirectAdmin port: 2222
- Web root: `/domains/retrodayaengineering.com/public_html/`
- Site URL: https://retrodayaengineering.com
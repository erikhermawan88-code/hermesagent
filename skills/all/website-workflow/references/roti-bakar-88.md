# Roti Bakar 88 — Live Reference

Live URL: https://digitalnusa.com/rotibakar88/
Admin Panel: https://digitalnusa.com/rotibakar88/admin/
GitHub: https://github.com/erikhermawan88-code/hermesagent/tree/master/rotibakar88

## Stack
- Frontend: Pure HTML/CSS/JS + Three.js r128 (3D canvas)
- Backend: PHP (shared hosting, no Node.js)
- Data: JSON file (`data/menu.json`) — no database
- Design: Light theme, teal #009F75, Inter font

## Folder Structure
```
rotibakar88/
├── index.html          # Frontend (8.5KB)
├── rotibakar88_mcp.py  # FastMCP server (195 lines)
├── data/
│   ├── menu.json       # 6 menu items (2.7KB)
│   └── backups/        # auto-backup on save
├── api/
│   └── menu.php        # GET endpoint (read JSON)
├── admin/
│   ├── index.php       # Admin panel UI (11KB)
│   └── save.php        # POST endpoint (write JSON)
└── static/
    ├── css/style.css   # Styling (10.8KB)
    └── js/main.js      # Three.js + menu loader (8.2KB)
```

## Admin Panel Features
- Edit nama, harga, deskripsi, gambar URL per menu
- WhatsApp order link per item
- Auto-backup sebelum save: `data/backups/menu_YYYY-MM-DD_HHMMSS.json`
- PHP syntax verified di save.php, index.php, menu.php

## 3D Canvas Fix (Critical)
Canvas CSS `width: 100%` tidak cukup — perlu explicit pixel:
```javascript
const canvas = document.getElementById('roti-canvas');
canvas.width = 480;
canvas.height = 480;
```
Init via setTimeout retry karena JS load sebelum DOM ready.

## MCP Server (FastMCP)
File: `rotibakar88_mcp.py` — AI-driven menu management via Hermes chat.

**Python path:** `/home/admin/.hermes/hermes-agent/venv/bin/python3` (BUKAN `python3` biasa)

**Run:** `cd rotibakar88/ && /home/admin/.hermes/hermes-agent/venv/bin/python3 rotibakar88_mcp.py`

**Tools:** get_menu, get_item, update_item, add_item, delete_item, get_stats.
# Roti Bakar 88 — FastMCP Implementation

Real-world FastMCP server for restaurant menu management.

## File Location
```
/home/admin/domains/digitalnusa.com/public_html/rotibakar88/rotibakar88_mcp.py
```

## Python Environment
**Use venv Python** (system Python lacks fastmcp module):
```bash
/home/admin/.hermes/hermes-agent/venv/bin/python3 rotibakar88_mcp.py
```

## Menu JSON Structure
```json
{
  "menu": [
    {
      "id": 1,
      "name": "Roti Bakar Coklat",
      "desc": "Coklat leleh...",
      "price": "Rp 12,000",
      "price_val": 12000,
      "image": "https://images.unsplash.com/...",
      "badge": "Favorite",
      "wa_link": "https://wa.me/..."
    }
  ]
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `get_menu()` | Return all 6 menu items |
| `get_item(item_id: int)` | Get single item by ID |
| `update_item(item_id, name, price, description, image, badge, wa_link)` | Update fields (all optional) |
| `add_item(name, price, description, image, badge, wa_link)` | Add new menu item |
| `delete_item(item_id: int)` | Remove item by ID |
| `get_stats()` | Summary: total items + list |

## Key Implementation Details

- `get_menu_items()` helper → extracts `data['menu']` array (JSON has wrapper object)
- `save_menu(data)` → auto-backup to `data/backups/menu_YYYY-MM-DD_HHMMSS.json` before writing
- Price stored as both `price` (formatted string "Rp 12,000") and `price_val` (integer for math)
- `init_fastmcp()` factory pattern → allows importing tools directly without running server

## Test Commands
```bash
cd /home/admin/domains/digitalnusa.com/public_html/rotibakar88/
/home/admin/.hermes/hermes-agent/venv/bin/python3 -c "
from rotibakar88_mcp import get_menu, get_stats, update_item
print(get_menu())
print(get_stats())
"
```

## Connecting to Hermes
Currently running as background process. To connect as MCP tool in Hermes, configure in `~/.hermes/config.yaml` under `mcp.servers`. See `native-mcp` skill for setup.
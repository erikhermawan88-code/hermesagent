# Roti Bakar 88 MCP Server — Implementation Reference

## What it does
Exposes Roti Bakar 88 website menu management as MCP tools so Hermes Agent can update menu items via natural language (e.g. "ubah harga Roti Bakar Coklat jadi 15rb").

## File location
`/home/admin/domains/digitalnusa.com/public_html/rotibakar88/rotibakar88_mcp.py`

## JSON data structure
```json
{
  "menu": [
    {
      "id": 1,
      "name": "Roti Bakar Coklat",
      "desc": "Coklat leleh...",
      "price": "Rp 12.000",
      "price_val": 12000,
      "image": "https://images.unsplash.com/...",
      "badge": "Favorite",
      "wa_link": "https://wa.me/..."
    }
  ]
}
```

Key insight: data is `{"menu": [...]}` — a dict containing a list, NOT a flat list. Many beginners incorrectly iterate `for i in data` which fails because `data` is a dict.

## Tools

| Tool | Parameters | Returns |
|------|-----------|---------|
| `get_menu` | none | all 6 menu items |
| `get_item` | `item_id: int` | single item |
| `update_item` | `item_id`, plus optional: `name`, `price`, `description`, `image`, `badge`, `wa_link` | updated item |
| `add_item` | `name`, `price`, `description`, `image`, optional: `badge`, `wa_link` | new item ID |
| `delete_item` | `item_id: int` | remaining count |
| `get_stats` | none | summary |

## Testing workflow

1. **Test via direct Python import** (faster, no network):
```bash
cd /home/admin/domains/digitalnusa.com/public_html/rotibakar88/
python3 -c "
from rotibakar88_mcp import get_menu, get_stats, update_item
print(get_menu())
"
```

2. **Test via FastMCP CLI** (validates MCP protocol):
```bash
fastmcp inspect rotibakar88_mcp.py:mcp
# Expected: Tools: 6, Prompts: 0, Resources: 0
```

## Auto-backup
Every write operation (update/add/delete) creates a timestamped backup:
```
data/backups/menu_2026-05-29_143022.json
```

## Status
✅ Built, tested, running in background (`python3 rotibakar88_mcp.py &`)

## To connect to Hermes (not yet done)
Add to `~/.hermes/config.yaml` under `mcpServers`:
```yaml
mcpServers:
  rotibakar88:
    command: python3
    args:
      - /home/admin/domains/digitalnusa.com/public_html/rotibakar88/rotibakar88_mcp.py
```

Then `hermes restart` or reload config.
# Production Image Paths — retrodayaengineering.com (2026-05-27)

## Verified Working Image Paths

### Logo Images
| File | Size | Status |
|------|------|--------|
| `/images/logo-retro-long-white.jpeg` | 10456 bytes | VALID — use this |
| `/images/logo-retro-long-white.png` | 389 bytes | CORRUPT — do not use |
| `/images/cropped-logo-rde-new.png` | 104 bytes | CORRUPT — favicon broken |
| `/images/logo-retro-long-white.backup.jpg` | 16933 bytes | VALID backup |

### About Page Images
| File | Size | Status |
|------|------|--------|
| `/images/products/new-customers.png` | 190425 bytes | VALID — about section |
| `/images/new-customers-1024x707.png` | 2184 bytes | CORRUPT placeholder |

### Service Images
| File | Size | Status |
|------|------|--------|
| `/images/services/oil-and-gas.png` | 1155170 bytes | VALID |
| `/images/services/power-plant.png` | 1144703 bytes | VALID |
| `/images/services/mining.png` | 858070 bytes | VALID |
| `/images/services/chemical-industries.png` | 953944 bytes | VALID |
| `/images/services/data-center.png` | 1229574 bytes | VALID |
| `/images/services/infrastructure.png` | 1211283 bytes | VALID |

### Other Images
| File | Size | Status |
|------|------|--------|
| `/images/polos-scaled.jpg` | 351018 bytes | VALID — hero slider |
| `/images/project-1.jpg` through `-5.jpg` | various | VALID |

## Common Errors
- HTML references `new-customers-1024x707.png` (2KB) but server has `products/new-customers.png` (190KB)
- HTML references `logo-retro-long_white-scaled.png` (underscore + -scaled) but server has `logo-retro-long-white.jpeg` (hyphen, no -scaled)
- All `wp-content/uploads/2025/06/` paths return 404 — not used anymore

## API to Check Server Files
```bash
# Login
curl -s -c /tmp/da.txt -X POST "https://retrodayaengineering.com:2222/CMD_LOGIN" \
  -d "username=retrodayaenginering&password=2CX7PYFrVDLt9LNkwzpN" -o /dev/null

# List directory
curl -s -b /tmp/da.txt "https://retrodayaengineering.com:2222/api/filemanager/list?path=/domains/retrodayaengineering.com/public_html/images"

# Check single file size
curl -s -o /dev/null -w "%{http_code} %{size_download}" "https://retrodayaengineering.com/images/logo-retro-long-white.jpeg"
```
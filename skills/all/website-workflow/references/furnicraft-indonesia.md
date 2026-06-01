# Furnicraft Indonesia — Workflow Test Run

Test complete workflow: Adminator + PHP/JSON + public frontend sync.

## Project: Furnicraft Indonesia
**Path:** `/home/admin/domains/digitalnusa.com/public_html/furnicraft/`
**Type:** Company profile — custom furniture business

## Links
- Public: https://digitalnusa.com/furnicraft/
- Admin: https://digitalnusa.com/furnicraft/admin/

## Structure
```
/furnicraft/
├── admin/               # 29 files (Adminator built dist)
├── api/content.php      # GET/POST/PUT/DELETE
├── data/
│   ├── content.json     # info, contact, services, why_us, stats, testimonials
│   └── backups/         # auto backup
├── public/
│   ├── index.html       # dynamic render from API
│   └── style.css        # light theme, Inter, teal #009F75
└── index.html           # redirect → public/
```

## JSON Schema Used
```json
{
  "info": { "name", "tagline", "description", "established", "experience" },
  "contact": { "phone", "whatsapp", "email", "address", "hours" },
  "services": [{ "id", "name", "description", "icon" }],
  "why_us": [{ "title", "value" }],
  "stats": [{ "label", "value" }],
  "testimonials": [{ "id", "name", "role", "quote", "avatar" }]
}
```

## API Test
```bash
curl -s https://digitalnusa.com/furnicraft/api/content.php | python3 -m json.tool | head -20
# HTTP 200, data valid ✅
```

## Notes
- Adminator: copied from `adminator_temp/dist/` — no rebuild needed
- Adminator already built at `/home/admin/domains/digitalnusa.com/public_html/adminator_temp/`
- GitHub push: `git push --force` required (first push to existing repo)
- All 3 endpoints tested: API ✅ Public ✅ Admin ✅
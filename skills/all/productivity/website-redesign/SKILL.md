---
name: website-redesign
description: Use when redesigning a client's website — premium/modern design, tech-agnostic. Coordinates with client-site-manager (credentials) and ftp-file-transfer (deployment) for end-to-end redesign workflow.
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [website-redesign, premium-design, client-websites, frontend, modern]
    related_skills: [client-site-manager, ftp-file-transfer]
---

# Website Redesign Workflow

End-to-end workflow for redesigning client websites with premium/modern design. From client intake to live deployment.

## Workflow Overview

```
1. Client Intake → 2. Current Site Analysis → 3. Design Direction → 4. Local Build
→ 5. Client Preview → 6. Revisions → 7. Backup → 8. Deploy → 9. Verify
```

## Step 1: Client Intake

Collect in `~/client-sites/<domain>/project-info.md`:

```
Client: [Client Name]
Domain: [www.example.com]
Business: [What they do]
Current site: [link or describe existing]
Redesign goal: [Premium, modern, trustworthy, etc.]
Primary color: [hex code]
Reference sites: [if any]
Contact: [name, WhatsApp, email]
```

**Important:** Always use generic placeholder names (example.com, clientname) in the skill file. Do NOT embed real client domain names in skill documentation — keep client-specific data in their individual project-info.md files.

## Step 2: Analyze Current Site

```bash
# Mirror current site locally for reference
SKIP_SITE=1 && bash ~/client-sites/_scripts/remote-backup.sh digitalnusa.com
cd ~/client-sites/digitalnusa.com/remote-copy/

# Count pages
find . -type f | wc -l

# List structure
ls -la
```

Check for:
- CMS (WordPress, Joomla, etc.)
- Custom theme or page builder
- Key pages (home, about, services, contact)
- Analytics/ad tracking code

## Step 3: Design Direction

For each page, define:

```markdown
## Homepage
Hero: Full-width image, company tagline, CTA
Sections: Services grid, testimonials, CTA banner
Style: Premium, trustworthy, gold accents
```

**Premium Design Guidelines:**
- **Typography**: Clean sans-serif — Inter, Poppins, Sora
- **Colors**: 1 primary + 1 accent + neutral (dark grays)
- **Spacing**: Generous whitespace, 8px grid
- **Motion**: Subtle only (fade-in, smooth scroll)
- **Images**: High-quality, consistent aspect ratios
- **Mobile**: First responsive design

## Step 4: Local Build

```bash
# Create project
mkdir -p ~/client-sites/digitalnusa.com/redesign/
cd ~/client-sites/digitalnusa.com/redesign/

# For premium static site
npm create vite@latest . -- --template vanilla
# or
npx create-next-app@latest .

# Structure
project/
├── src/
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   ├── scripts/
│   │   └── main.js
│   └── assets/
│       └── images/
├── dist/           # Built output
└── README.md
```

## Step 5: Preview Locally

```bash
cd ~/client-sites/digitalnusa.com/redesign/
npx serve .          # or: python3 -m http.server 3000
# Then browser: http://localhost:3000
```

## Step 6: Client Review

Deliver preview URL or send as zip archive:
```bash
cd ~/client-sites/digitalnusa.com/redesign/
zip -r ../redesign-preview.zip dist/
```

## Step 7: Backup Remote (Before Deploy!)

```bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
rsync -avz \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      user@host:/var/www/site/ \
      ~/client-sites/digitalnusa.com/backups/$TIMESTAMP/
```

## Step 8: Deploy via rsync

```bash
rsync -avz --exclude='node_modules/' \
      --exclude='.git/' \
      -e "ssh -p 22 -i ~/.ssh/id_rsa" \
      ~/client-sites/digitalnusa.com/redesign/dist/ \
      user@host:/var/www/site/

# Fix permissions
ssh -p 22 -i ~/.ssh/id_rsa user@host \
  "chown -R www-data:www-data /var/www/site/ && \
   find /var/www/site/ -type d -exec chmod 755 {} \; && \
   find /var/www/site/ -type f -exec chmod 644 {} ;"
```

## Step 9: Verify

```bash
# Check HTTP status
curl -sI https://www.digitalnusa.com | head -5

# Check key resources loaded
curl -s https://www.digitalnusa.com/ | grep -E '<title>|<link|<script'

# Mobile test
curl -s -A "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" \
  https://www.digitalnusa.com/ | head -20
```

## File Naming Convention

```
client-sites/
└── example.com/
    ├── backups/
    │   └── YYYYMMDD_HHMMSS/      # Timestamp format
    ├── deliverables/
    │   └── redesign-final.zip
    ├── project-info.md
    ├── redesign/
    │   ├── src/
    │   ├── dist/                  # Built output for deploy
    │   └── redesign-spec.md      # Design decisions
    └── remote-copy/               # Mirrored current site
```

## Common Pitfalls

1. **No backup before deploy** → Always backup first, no exceptions.
2. **Missing .htaccess** → If WordPress, preserve original `.htaccess`.
3. **Uploads folder ignored** → In WordPress, never overwrite `wp-content/uploads/`.
4. **Permissions wrong** → `chown www-data:www-data` + `chmod 644/755`.

## Verification Checklist

- [ ] Current site backed up to `backups/<timestamp>/`
- [ ] Redesign builds without errors (`npm run build`)
- [ ] `.htaccess` preserved if WordPress
- [ ] Deploy completed via rsync
- [ ] Permissions fixed (644/755, www-data)
- [ ] Site loads over HTTPS with 200 status
- [ ] Key pages render correctly
- [ ] Client confirmed live site looks right

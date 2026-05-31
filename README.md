# Jelajah — AI Tourism Content Platform

AI-Powered Tourism Content Platform — automatically researches destinations and distributes content to Threads, TikTok, YouTube, and Instagram.

## Quick Links

- **Landing Page:** https://digitalnusa.com/jelajah/
- **Dashboard:** https://digitalnusa.com/jelajah/admin/
- **API:** https://digitalnusa.com/jelajah/api/content.php

## Project Structure

```
jelajah/
├── api/content.php       ← PHP API (GET/POST/PUT/DELETE)
├── data/content.json     ← All platform data
├── public/index.html     ← Landing page (light theme)
├── index.html            ← Redirect to public/
└── Concept-Brief.md      ← Full concept document
```

## Admin Dashboard

The `admin/` folder contains the Adminator template. To set up:
```bash
# Copy Adminator dist to admin/
cp -r /path/to/adminator/dist ./admin/
```

Adminator repo: https://github.com/puikinsh/Adminator-admin-dashboard

## Tech Stack

- **Frontend:** HTML/CSS/JS (Outfit font, teal #009F75 theme)
- **Admin:** Adminator (dark theme)
- **Backend:** PHP API + JSON data store
- **AI Engine:** External LLM API (GPT-4o / Claude)
- **Deploy:** digitalnusa.com/jelajah/

## API Endpoints

```
GET    /api/content.php              → All content
GET    /api/content.php?resource=info
GET    /api/content.php?resource=destinations
POST   /api/content.php?resource=destinations
PUT    /api/content.php?resource=destinations&id=xxx
DELETE /api/content.php?resource=destinations&id=xxx
```

## Jelajah Agent Workflow

```
Hourly → Research Agent (gather from 20+ sources)
Daily  → Content Generator (articles, social posts, video scripts)
Twice daily → Distribution Agent (Threads, TikTok, YouTube, Instagram)
```

## Social Accounts

| Platform | Handle |
|----------|--------|
| Threads | @sosokberbicara |
| TikTok | @sosokbicaraclip |
| YouTube | @sosokberbicara |
| Instagram | @sosokberbicara |

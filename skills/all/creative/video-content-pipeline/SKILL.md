---
name: video-content-pipeline
description: YouTube video → structured HTML guide pipeline. Download subtitles, extract key content (prompts, steps, instructions), build a readable HTML document, deploy to digitalnusa.com/[folder].
version: 1.0.0
author: BadTechBandit
license: MIT
platforms: [linux]
metadata:
  hermes:
    tags: [youtube, content-extraction, html-guide, subtitle, transcript, pipeline]
    related_skills: [claude-design, popular-web-designs]
trigger: "When user asks to convert a YouTube video into a website guide, step-by-step document, or reference page — especially when sharing a video link and wanting the content extracted and formatted as a navigable HTML page."
---

# Video Content Pipeline

Convert a YouTube video into a structured, navigable HTML guide — extracting prompts, steps, instructions, and key content from the video transcript.

## When To Use

- User shares a YouTube video link and asks for a step-by-step guide
- User wants content from a video extracted and made searchable/referenceable
- User wants a "website version" of a video tutorial
- Pattern: "buatkan saya step by step dari video ini", "convert this video to a guide"

## Pipeline Overview

```
YouTube URL
 ↓
[1] Download subtitles (yt-dlp)
    ↓
[2] Parse transcript → extract key content
    ↓
[3] Build structured HTML guide
    ↓
[4] Deploy to digitalnusa.com/[folder]
    ↓
Return link to user
```

## Step-by-Step

### Step 1: Download Subtitles

```bash
# Auto-download English subtitles (fastest, most complete)
yt-dlp --write-auto-subs --sub-langs en --skip-download -o "/tmp/video-sub" "YOUTUBE_URL"

# Alternative: download video too (if video analysis needed)
yt-dlp -o "/tmp/video-work" "YOUTUBE_URL"
```

**Output files:**
- `/tmp/video-sub.en.vtt` — English subtitles (WebVTT format)

### Step 2: Parse Transcript

Read the `.vtt` file and extract clean text:

```python
import re

with open('/tmp/video-sub.en.vtt', 'r') as f:
    content = f.read()

# Remove VTT timestamps and tags
lines = content.split('\n')
clean_lines = []
for line in lines:
    # Skip empty, timestamps, VTT tags
    line = line.strip()
    if not line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:') or re.match(r'^\d{2}:\d{2}', line):
        continue
    clean_lines.append(line)

text = ' '.join(clean_lines)
```

For longer processing, extract unique sentences:

```python
# Split into sentences, deduplicate
sentences = re.split(r'[.!?]+', text)
unique = []
seen = set()
for s in sentences:
    s = s.strip()
    if len(s) > 20 and s not in seen:
        unique.append(s)
        seen.add(s)
```

### Step 3: Build HTML Guide

Design principles (load `popular-web-designs` + `claude-design` for reference):

- **Navy + teal + gold** palette (Erik's preference)
- **Outfit** font from Google Fonts
- **Light theme** (Erik hates dark/generic outputs)
- Use `claude-design` workflow: gather context → define design system → build artifact
- Structure: Hero → Overview → Step cards (numbered) → Prompts reference → Footer
- Include video link attribution
- Use step cards with left border accent color
- Code blocks for terminal commands and prompts
- Note/Warning callout boxes for tips and important warnings

**HTML structure template:**
```html
<!-- Hero section with video link -->
<!-- Overview/features section -->
<!-- Step cards (numbered, left border accent) -->
<!-- Prompts reference (if applicable) -->
<!-- Footer with attribution -->
```

**Erik's design preferences (from memory):**
- Navy: #0f2c4a, Teal: #0d7377, Gold: #d4a843
- Font: Outfit (Google Fonts)
- Light background: #fafbfc
- Border-left accent on step cards
- Rounded corners (12px), subtle shadows
- Agent/system cards: gradient navy-to-teal

### Step 4: Deploy

**Deploy method — local HTTP server (for preview/testing):**
```bash
cd /path/to/folder && python3 -m http.server 8789 --bind 0.0.0.0
# Verify: curl -s -o /dev/null -w "%{http_code}" http://localhost:8789/
```

**Deploy to production (digitalnusa.com/[folder]):**
- VPS SSH port 2222 is firewalled from outside
- rsync to 109.123.232.85:2222 fails (Connection refused)
- Use DirectAdmin SFTP credentials for real deploy
- Or: verify the HTML is complete, then use available upload method

**MUST include in response:**
```
Link: https://digitalnusa.com/[folder]/
```

## Reference: Key Subtitle Timestamps

When parsing, timestamps in VTT format look like:
```
00:00:00.000 --> 00:00:03.000
```
These should be filtered out — only the text lines matter.

## Linked Files

- `references/hermes-multi-agent-template.html` — Starter HTML template with navy/teal/gold design system, step card structure, prompt blocks, and responsive layout. Copy and replace `{{VARIABLES}}` with actual content.

## Example Output

A complete guide page with:
- Hero with video badge and link
- Feature cards (4-column grid)
- Numbered step cards with code blocks
- Prompts reference section
- Pipeline visualization
- Footer with attribution

## Design Tips

- Erik prefers **light theme** — avoid dark backgrounds
- Erik hates "tidak pasaran" (generic/template-looking) — use navy/teal/gold palette, Outfit font, avoid generic SaaS layouts
- Use `popular-web-designs` to avoid generic design references
- When in doubt on design: navy primary, teal accent, gold highlight
- Always include step progress markers like [1/3], [2/3] during execution

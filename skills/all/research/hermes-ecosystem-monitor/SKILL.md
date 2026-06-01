---
name: hermes-ecosystem-monitor
description: "Periodic Hermes ecosystem research skill — scans for new skills, tracks releases, monitors community trends, and identifies must-download skills. Designed for cron-driven execution with silent/no-news suppression."
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [hermes, research, skills, ecosystem, monitoring, cron]
    homepage: https://github.com/NousResearch/hermes-agent
---

# Hermes Ecosystem Monitor

Automated research skill for tracking the Hermes Agent ecosystem — new skills releases, trending skills, core updates, community tools, and MCP integrations.

## Research Workflow

### Step 1: Version & Update Check
Always check the current version and whether updates are available FIRST:

```bash
hermes --version
```

Note the commit count behind main. If significantly behind (50+ commits), trigger update:
```bash
hermes update
```

### Step 2: Skills Hub Browse (All Pages)
The hub has 86+ skills across 5 pages. Browse all pages to get the full picture:

```bash
hermes skills browse                    # page 1
hermes skills browse --page 2
hermes skills browse --page 3
hermes skills browse --page 4
hermes skills browse --page 5
```

### Step 3: Installed Skills Audit
Compare hub skills against installed skills to find gaps:

```bash
hermes skills list
```

Identify:
- New hub skills NOT yet installed
- Local skills with no hub equivalent (custom/extensions)
- Skill category coverage gaps

### Step 4: Recent Core Changes (Git Log)
Track what's changed in the core codebase:

```bash
cd ~/.hermes/hermes-agent && git log --oneline --since="YYYY-MM-DD" | head -30
```

Key signals:
- New features (feat:)
- Bug fixes (fix:)
- Breaking changes
- New platform adapters
- Security patches

### Step 5: Skills Hub Search
Deep search for specific domains:
```bash
hermes skills search "<domain>"   # e.g., "productivity", "automation", "web"
```

## Output Format

For each skill analyzed, collect:
- **Skill Name** and **Category**
- **Release date** (from hub or git log)
- **Developer** (official/community/third-party)
- **Purpose** and **Main features**
- **Real use case**
- **Difficulty level** (beginner/intermediate/advanced)
- **Dependencies** (env vars, external tools, API keys)
- **Community rating** (★ official = trusted)
- **Installation method**

## Scoring Framework

Rate each skill 1-10 on:
- **Utility score**: How broadly useful
- **Speed score**: Performance impact
- **Automation score**: Reduces manual work
- **Popularity score**: Community adoption
- **Future potential score**: Longevity/relevance

**Final Score: XX/50**

Label thresholds:
- 40-50 → 🔥 MUST DOWNLOAD
- 30-39 → ⭐ RECOMMENDED
- 20-29 → ⚡ TRENDING
- 10-19 → 🧪 EXPERIMENTAL
- 0-9 → ❌ SKIP

## Priority Framework

### Priority #1: Skills that SAVE TIME
- Monitoring/watcher skills
- Automation frameworks

### Priority #2: Skills that AUTOMATE REPETITIVE WORK
- Cron/scheduler integrations
- Multi-agent orchestration

### Priority #3: Skills that INCREASE OUTPUT QUALITY
- Structured output (outlines, instructor)
- Professional document generation

### Priority #4: Skills that INCREASE INTELLIGENCE
- MCP extensions
- Vision/language models
- Research tools

### Priority #5: Skills that GENERATE INCOME
- E-commerce integrations
- Financial modeling
- Client deliverables

## Categories to Monitor

| Category | What to Watch |
|----------|---------------|
| autonomous-ai-agents | New agent CLIs, delegation tools |
| creative | Content generation, media tools |
| devops | Monitoring, deployment, tunnels |
| finance | Modeling, trading, crypto |
| mlops | Fine-tuning, inference, vector DBs |
| productivity | Documents, calendars, email |
| research | Academic, news, OSINT |
| web-development | Frameworks, UI, deployment |

## Output Structure

```
# Hermes Latest Skills Report
Date: [today]

## Major Recent Hermes Core Updates
[Version, commits behind, key changes]

## Top 10 Must Download Skills
#1 [Name] | Category | Score | Reason | Installation | Use cases

## Trending Skills This Week
[Skills gaining traction]

## Hidden Gems
[Underrated but powerful]

## Avoid / Low Value Skills
[Dupes, abandoned, niche]

## Recommended Installation Order
1. ...
2. ...
3. ...

## Final Recommendation
Top Productivity:
Top Money-Making:
Top Content:
Top Coding:
Top Automation:
Top Research:
```

## Suppression Rules

If NO meaningful updates found:
- Return exactly: `[SILENT]`
- Do NOT generate a full report for no-news situations
- Meaningful = 3+ new skills, significant core changes, or breaking updates

## Key Paths

```
~/.hermes/hermes-agent/     # Core checkout
~/.hermes/skills/            # Installed skills
~/.hermes/logs/              # Logs for error investigation
~/.hermes/config.yaml        # Config reference
```

## Reference Files

- `references/hub-snapshot.md` — Full 86-skill hub inventory (captured June 2026)
- `references/core-changes.md` — Core git log findings May-June 2026

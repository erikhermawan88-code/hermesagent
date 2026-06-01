---
name: qmd-memory
description: Enhanced persistent memory system using qmd — semantic search, auto-inject, session handoff
trigger: When user asks to remember something, recall past decisions, or search memory
---

# qmd-memory Skill

Persistent memory extension using qmd — full-text + vector search untuk superior recall.

## Setup

```bash
# qmd must be installed
command -v qmd >/dev/null 2>&1 || bun install -g https://github.com/tobi/qmd

# Collection (run once)
qmd collection add ~/.hermes/qmd-memory --name hermes-memory
qmd context add / "Hermes Agent long-term memory: user preferences, workflow conventions, project facts." -c hermes-memory
```

## Entry Format Conventions

```markdown
#tag-name Entry description with details.
#decision [[feature-x]] Made decision to use PostgreSQL over MongoDB.
#preference [[editor]] User prefers Neovim with specific config.
#lesson [[api-design]] URL prefix versioning avoids CDN cache issues.
#fact [[project-name]] Target accounts: YouTube @sosokberbicara, TikTok @sosokbicaraclip
```

Tags (`#tag`) and wiki-links (`[[link]]`) are content conventions — searchable via full-text, no metadata schema needed.

## Tools Available

| Tool | Command | Description |
|------|---------|-------------|
| `memory_write` | Write new entry to MEMORY.md | `target: long_term` or `daily` |
| `memory_read` | Read memory file | List or read specific entries |
| `memory_search` | Search all memory | `keyword`, `semantic`, or `deep` mode |
| `scratchpad` | Checklist items | add/done/undo/clear/list |

## Search Modes

```bash
# keyword (BM25) — ~30ms, best for terms, dates, names, #tags
qmd search "clipper workflow" -c hermes-memory -n 5

# semantic (vector) — ~2s, best for concepts with different wording
qmd vsearch "user interface preferences" -c hermes-memory -n 5

# hybrid with reranking (recommended) — ~3s
qmd query "user design preferences" -c hermes-memory -n 5
```

## Memory Structure

```
~/.hermes/qmd-memory/
├── MEMORY.md           # Curated long-term memory
├── SCRATCHPAD.md       # Active todo/checklist items
└── daily/
    ├── 2026-05-29.md   # Daily append-only log
    └── ...
```

## Auto-Injection Priority (16K char budget)

Before every turn, the following are injected in order:

1. **Open scratchpad items** (up to 2K chars)
2. **Today's daily log** (up to 3K chars, tail)
3. **qmd search results** (up to 2.5K chars — relevant to current prompt)
4. **MEMORY.md** (up to 4K chars, middle-truncated)
5. **Yesterday's daily log** (up to 3K chars, tail — lowest priority)

## Session Handoff (Context Compaction)

When context window compacts, auto-capture to today's daily log:

```markdown
<!-- HANDOFF 2026-05-29 14:30:00 [a1b2c3d4] -->
## Session Handoff
**Open scratchpad items:**
- [ ] Fix auth bug
- [ ] Review PR #42
**Recent daily log context:**
...last 15 lines of today's log...
```

## Usage Examples

**Remember a decision:**
> User: "Use PostgreSQL as the main database"
> → Write to MEMORY.md with `#decision [[database]] PostgreSQL chosen for...`

**Recall past decision:**
> User: "what database did we decide on?"
> → `qmd search "database decision" -c hermes-memory -n 3`

**Update index after writes:**
```bash
qmd update -c hermes-memory
```

## Search Pattern for Skills

When this skill is loaded, use qmd for:
- "remember" / "recall" / "what did we decide" → qmd search
- New facts/preferences → memory_write to MEMORY.md
- Daily context → write to daily/YYYY-MM-DD.md
- Active items → scratchpad tool
# qmd Setup & Performance Notes

## Collections Created (This Session)

| Collection | Path | Files | Status |
|------------|------|-------|--------|
| `clipper-code` | /home/admin/clipper-company | 3 | ✅ keyword search works |
| `ai-automation-code` | /home/admin/ai-automation | 0 | empty |
| `website-code` | /home/admin/domains/digitalnusa.com/public_html | 30 | ✅ keyword search works |

## Search Performance

### ✅ Keyword Search (BM25) — FAST, DEFAULT
```bash
qmd search "face detection" -c clipper-code -n 5
```
Instant results, reliable.

### ⚠️ Semantic Search (Embeddings) — SLOW on CPU
```bash
qmd query "face detection video clipping" -c clipper-code -n 3
```
**Problem:** Downloads ~639MB embedding model on first use. CPU-only environment = timeout at ~88% embedding progress.

**Status:** Stalled/timeout. GPU needed for reliable semantic search.

### ⚠️ vsearch (Vector Search) — Same Issue
```bash
qmd vsearch "query" -c collection -n 5
```
Same model download + CPU bottleneck.

## Setup Commands Used

```bash
# Add collections
qmd collection add /home/admin/clipper-company --name clipper-code
qmd collection add /home/admin/ai-automation --name ai-automation-code
qmd collection add /home/admin/domains/digitalnusa.com/public_html --name website-code

# Embed (slow on CPU)
qmd embed -c clipper-code

# Search (fast)
qmd search "term" -c collection -n 5

# Status check
qmd status -c collection
```

## Limitation Workaround

Until GPU is available:
- Use `qmd search` (keyword) as default
- Semantic search (`qmd query`, `qmd vsearch`) is deferred
- Collections can still be queried with keyword mode even without embeddings

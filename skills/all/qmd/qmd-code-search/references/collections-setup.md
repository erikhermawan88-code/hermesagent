# qmd Collections Setup (Session: 2026-05-31)

## Collections Created

| Collection | Path | Files | Purpose |
|------------|------|-------|---------|
| `clipper-code` | /home/admin/clipper-company | 3 files | Video clipping pipeline, Repliz API, Telegram bot |
| `website-code` | /home/admin/domains/digitalnusa.com/public_html | 30 files | Client websites, NeuralFlow, admin templates |
| `ai-automation-code` | /home/admin/ai-automation | 0 files | AI Meeting Notes project (empty, ready) |
| `hermes-memory` | ~/.hermes/qmd-memory | 1 file | Built-in Hermes memory |

## IMPORTANT: Search Mode Constraints

- **keyword (BM25)** = fast ✅ — USE THIS by default
- **semantic (vector)** = slow — Downloads 639MB reranking model on CPU, very slow
- **hybrid (reranking)** = slowest — Only when keyword results are poor

```bash
# Use keyword search (fast, reliable)
qmd search "face detection" -c clipper-code -n 5

# Avoid semantic on CPU (slow without GPU)
# qmd vsearch "query" -c <collection> -n 5  # DON'T on CPU
```

## Embedding Status

- `clipper-code`: 3 files, 7 chunks embedded ✅
- `website-code`: 30 files, embedding stuck at 88% pending (CPU-only)
- `ai-automation-code`: 0 files (empty)

## Notes

- qmd MCP runs on PID 847527
- Bun crash during website-code embedding (large 30-file collection)
- If embedding hangs, use keyword search instead — vectors not required for basic search
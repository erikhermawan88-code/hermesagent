---
name: qmd-code-search
description: Semantic code search using qmd — find functions by intent, not just literal text
trigger: When user asks to find code, search implementation, or "how does X work"
---

# qmd-code-search Skill

Semantic code search powered by qmd — finds code by meaning, not just text match.

## Use Case

- "Find function that handles video transcoding" → even without exact keywords
- "Where is the auth middleware?" → finds middleware even if named differently
- "How does the clip generation pipeline work?" → semantic understanding across files

## Setup

```bash
# Index your codebase
qmd collection add /path/to/project --name code-search

# Add context for better search
qmd context add / "Production code: TypeScript, Python. Features: video processing, auth, API clients." -c code-search

# Generate embeddings for semantic search
qmd embed -c code-search
```

## Setup & Performance Notes
See `references/setup-notes.md` for collections created this session, search performance benchmarks, and CPU limitations.

## Search Modes (Use keyword — semantic is slow without GPU)

```bash
# ✅ KEYWORD (fast, default) — for exact names, imports, comments
# Best for: known patterns, specific function names, file paths
qmd search "face detection OpenCV" -c <collection> -n 10

# ⚠️ SEMANTIC (slow, CPU-only) — downloads 639MB reranking model
# Best for: exploratory search when keyword fails
qmd vsearch "video thumbnail generation pipeline" -c <collection> -n 5

# ⚠️ HYBRID (slowest) — use only when keyword results are poor
qmd query "authentication middleware flow" -c <collection> -n 5
```

## Collections Available

| Collection | Path | Use For |
|------------|------|---------|
| `clipper-code` | /home/admin/clipper-company | Video clipping, Repliz API, Telegram bot |
| `website-code` | /home/admin/domains/digitalnusa.com/public_html | Client websites, NeuralFlow, design refs |
| `ai-automation-code` | /home/admin/ai-automation | AI Meeting Notes, NeuralFlow CMS |

## Code-Specific Patterns

```markdown
# When searching code, use these patterns:
- Function names: "find_function:auth" → finds auth-related functions
- File paths: "path:clipper" → finds files in clipper directory
- Imports: "import:replicate" → finds files using replicate API
- Comments: "// TODO" or "# FIXME" → finds todo items
```

## AST-Aware Chunking

qmd uses tree-sitter for smart chunking:
- TypeScript/JavaScript: chunks at function/class boundaries
- Python: chunks at function/class definitions
- Go/Rust: chunks at function/type boundaries

This means search results often return complete functions, not random fragments.

## Example Workflows

**Find auth implementation:**
```
User: "Where is the Repliz API authentication?"
→ qmd query "Repliz API authentication" -c code-search -n 5
```

**Find video processing code:**
```
User: "Find the face detection logic"
→ qmd search "face detection OpenCV" -c code-search -n 10
```

**Find related files:**
```
User: "All files related to clip generation"
→ qmd search "clip generation video processing" -c code-search -n 20
```

## Integration with grep

qmd complements, not replaces grep:
- **grep**: exact text, fast, for known patterns
- **qmd**: semantic, slower, for exploratory search

Use both — `qmd` results can be verified with `grep` for precision.

## Index Maintenance

```bash
# Update index after code changes
qmd update -c code-search

# Re-embed after major changes
qmd embed -c code-search

# Check index status
qmd status -c code-search
```

## CPU Constraint

**On CPU-only environments (no GPU):** Always use keyword search. Semantic/vsearch downloads a 639MB reranking model and is too slow on CPU. keyword BM25 is fast (~30ms) and sufficient for most searches.

## Support Files

- `references/collections-setup.md` — Setup notes, embedding status, search constraints
- `references/higgsfield-mcp.md` — Higgsfield AI MCP research (pricing, features, alternatives)
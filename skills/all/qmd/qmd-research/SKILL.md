---
name: qmd-research
description: Academic and knowledge base search using qmd — index papers, notes, articles
trigger: When user asks about research, wants to search papers, or queries knowledge base
---

# qmd-research Skill

Academic and knowledge base search using qmd — semantic search across research corpus.

## Use Case

- "Find papers about LLM agent memory architectures"
- "What do we know about retrieval-augmented generation?"
- "Search my research notes on fine-tuning"
- "Find relevant arXiv papers for this topic"

## Setup

```bash
# Create research collection
mkdir -p ~/research
qmd collection add ~/research --name research-base

# Add context for research domain
qmd context add / "Machine learning research: LLMs, agents, RAG, fine-tuning. Topics: AI, ML, NLP." -c research-base

# Index existing papers/notes
qmd update -c research-base

# Generate embeddings for semantic search
qmd embed -c research-base
```

## Entry Format for Research

```markdown
#paper [[title]] arXiv:XXXX.XXXXX - Brief summary of key contributions.
#finding [[topic]] Key finding from research: ...
#note [[subject]] Observation about: ...
#reference [[author]] Citation: "Title" (Year) — key contribution.
```

## Search Modes

```bash
# keyword (fast) — for author names, paper titles, exact terms
qmd search "transformer attention mechanism" -c research-base -n 10

# semantic (slower but smarter) — for conceptual queries
qmd vsearch "how to improve LLM reasoning" -c research-base -n 5

# hybrid with reranking (recommended) — best results
qmd query "reinforcement learning from human feedback techniques" -c research-base -n 5
```

## Workflow with arXiv

```bash
# Search arXiv for papers
# Download paper abstract/text

# Add to research collection
cp paper.md ~/research/papers/
qmd update -c research-base

# Search across all papers
qmd query "chain-of-thought prompting language models" -c research-base -n 5
```

## Knowledge Base Structure

```
~/research/
├── papers/           # Downloaded arXiv papers as .md
│   ├── 2301.00001.md
│   └── ...
├── notes/            # Personal research notes
│   ├── llm-memory.md
│   └── rag-survey.md
├── summaries/        # Paper summaries (auto-generated)
│   └── ...
└── references.md     # Citation database
```

## Integration with Other Skills

- **arxiv skill**: Download papers → add to qmd research collection
- **blogwatcher skill**: Monitor blogs → index new posts
- **llm-wiki skill**: Build knowledge base → qmd index for semantic search

## Example Queries

**Find papers on topic:**
```
User: "Papers about vector databases for retrieval"
→ qmd query "vector database semantic search retrieval" -c research-base -n 10
```

**Recall specific finding:**
```
User: "What did we learn about agent memory systems?"
→ qmd search "#finding agent memory" -c research-base -n 5
```

**Research for implementation:**
```
User: "Find research on optimizing LLM inference"
→ qmd vsearch "LLM inference optimization quantization" -c research-base -n 5
```

## Index Maintenance

```bash
# Add new paper/notes
cp newpaper.md ~/research/papers/
qmd update -c research-base

# Re-index all
qmd update --pull -c research-base  # with git pull first

# Check status
qmd status -c research-base
```
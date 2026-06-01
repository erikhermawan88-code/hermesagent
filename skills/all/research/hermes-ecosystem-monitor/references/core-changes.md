# Hermes Core Changes — May-June 2026
**Captured:** June 1, 2026  
**Version:** v0.15.1 (2026.5.29)

## Recent Git Log (May 20 – June 1, 2026)

### 🆕 Major Features
| Commit | Feature | PR | Impact |
|--------|---------|-----|--------|
| `51c68d4ab` | Hermes desktop app | #20059 | New desktop GUI app |
| `de4f40ed0` | Quick Setup wizard | #35723 | Faster onboarding via Nous Portal |
| `0cd7d54b0` | Kanban goal_mode workers | #35710 | Workers run in /goal loop |
| `b47cb1bbf` | Kanban file attachments | #35395 | Tasks support file attachments |
| `c9a28dfb0` | Model picker descriptions | — | Better UX for grouped providers |
| `84d82453a` | Model picker descriptions | — | Short descriptions on rows |

### 🐛 Bug Fixes
| Commit | Area | What |
|--------|------|------|
| `77bb64813` | desktop | desktop_contract in lazy session.create |
| `3ef97a61b` | desktop | track main for self-update |
| `6f8975dcd` | tools | spawn_via_env background wrappers compound-rewrite |
| `7a315bd70` | tools | preserve live session cwd in terminal_tool |
| `1044d9f25` | gateway | /stop can interrupt sibling participant |
| `a726e8a81` | tui | auto-recover session on gateway death |
| `64628ea89` | anthropic | demote dead thinking signature |

### 🔒 Security
| Commit | What |
|--------|------|
| `0437137ff` | Pin patched Starlette (>=1.0.1) for CVE-2026-48710 BadHost |

### ⚡ Performance
| Commit | Area | Improvement |
|--------|------|-------------|
| `ea6eaabd8` | read_file | Compact gutter — ~14% fewer tokens |
| `0c6e133c0` | cli | Stop eager MCP discovery blocking startup |

### 📊 Stats
- Commits since last update: 127
- Total test files: ~900
- Total tests: ~17,000+

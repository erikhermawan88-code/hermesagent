# Veronica Cron Job Configuration

## Jobs Created

| Job Name | Schedule | Repeat | Focus | Deliver |
|----------|----------|--------|-------|---------|
| Veronica R&D Hourly Monitor | `0 * * * *` | 168x | Viral trends, AI updates, market shifts | origin |
| Veronica 3H Social Behavior Analysis | `0 */3 * * *` | 168x | Social media, consumer interest, viral | origin |
| Veronica 6H Market Opportunity Analysis | `0 */6 * * *` | 168x | Market gaps, scalable systems, monetization | origin |
| Veronica 12H Competitor Intelligence | `0 */12 * * *` | 168x | Competitor deep-dive, business models | origin |
| Veronica Daily Executive R&D Report | `0 8 * * *` | 28x | Executive briefing, 24h action plan | origin |
| Veronica Weekly Future Trend Forecast | `0 9 * * 1` | 4x | 3-6 month trends, innovation roadmap | origin |
| Veronica Monthly Enterprise Growth Strategy | `0 10 1 * *` | 1x | Billion-dollar, global expansion, long-term | origin |

## Skill Used
`veron-webdev-agent` — loads Veron's identity and research framework

## Cron Prompt Structure

Each cron job prompt contains:
1. **Identity statement** — "Kamu adalah Veronica — Elite AI Strategis R&D"
2. **Focus area** — specific research scope for that schedule
3. **Research tasks** — numbered list of specific things to investigate
4. **Thinking framework** — questions to guide analysis
5. **Report format** — structured output template in Bahasa Indonesia
6. **Quality standards** — what good looks like for that report type
7. **Language instruction** — "Bahasa Indonesia" explicitly stated

## Delivery Pattern

- All reports use `deliver: origin` to send to the conversation where the cron was created
- This ensures reports arrive in the same Telegram thread as the user's chat
- Hourly monitor initially delivered to `telegram:5416939315` (Erik's DM) — revised to `origin`

## Cron-to-Subagent Pattern

```
skill: veron-webdev-agent
├── loads: veron identity + research framework
├── cron jobs: 7 scheduled intelligence reports
└── deliver: origin (conversation thread)
```

For creating similar cron systems: define job with skill, set schedule, set `origin` delivery, write prompt in target language.

## Verified Research Sources (May 2026 Baseline)

These sources are tested and return data reliably:

| Source | URL Pattern | Returns |
|--------|-------------|---------|
| TechCrunch AI | `https://techcrunch.com/category/artificial-intelligence/` | Funding rounds, product launches, competitor moves |
| Google Trends SG | `https://trends.google.com/trending?q=...&geo=SG` | Local SG viral topics, search volume spikes |
| Bing News | `https://www.bing.com/search?q=...` | General AI startup news, fallback when DDG fails |
| Session DB | `session_search()` | Prior synthesized intelligence |

**Blocked sources (avoid wasting time):**
- Product Hunt → Cloudflare block, skip and use TechCrunch instead
- There's An AI For That → timeout issues
- Google News general → inconsistent results

## Key Intelligence Landmarks (May 2026)

This context helps interpret new signals — update quarterly:

- **Anthropic**: $65B raise, approaching $1T valuation, IPO imminent. Major competitor to OpenAI.
- **Asana acquired StackAI**: No-code agent builder acquisition validates enterprise AI agent space
- **Glean**: $300M+ revenue, "AI budget-cutting" positioning. Enterprise AI search going mainstream.
- **Apple**: New Siri app in development. Platform giant entering AI assistant space.
- **Sesame**: Conversational AI iOS app from Oculus founders launched.
- **"Internet rebuilt for machines"**: AI agents becoming first-class web citizens, machine-readable content priority.
- **AI agent platforms**: $2B+ invested in AI agent startups. Cursor, Devin, Replit Agent leading.

## Report Quality Checklist

Before delivering any report, verify:
- [ ] Executive summary: 2-3 sentences, most important finding first
- [ ] At least 1 fresh data point from live search
- [ ] At least 1 reference to prior session context (via session_search)
- [ ] All sections filled (no "TBD" or "data unavailable" without note)
- [ ] Bahasa Indonesia throughout
- [ ] Specific numbers/timelines, not generic observations
- [ ] Actionable recommendations, not just analysis
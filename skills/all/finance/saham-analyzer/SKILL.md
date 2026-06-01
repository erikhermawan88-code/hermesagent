---
name: saham-analyzer
description: Unified stock analyzer for IDX (.JK) + US stocks. yfinance (price/fundamentals) + SEC EDGAR XBRL (US financials). No API key needed.
category: finance
---

# Saham Analyzer — Unified IDX + US Stocks

Unified analyzer yang kerja untuk saham Indonesia (IDX/.JK) dan US stocks dalam 1 script. Data sources:
- **US stocks**: SEC EDGAR XBRL (real 10-K/10-Q filings) + yfinance (price/ratios)
- **IDX stocks**: Yahoo Finance (yfinance)

## Setup

```bash
pip install yfinance requests
cp /tmp/claude-code-stock-analysis-skill/tools/edgar.py scripts/
cp /tmp/claude-code-stock-analysis-skill/tools/market.py scripts/
# Or if already cloned:
git clone --depth=1 https://github.com/xvary-research/claude-code-stock-analysis-skill.git /tmp/claude-code-stock-analysis-skill
```

## Main Script — Unified (IDX + US)

```bash
# US stocks
python3 scripts/stock-analyze.py AAPL MSFT NVDA

# IDX stocks
python3 scripts/stock-analyze.py BBRI.JK BBCA.JK CPIN.JK AKRA.JK

# Mixed — both in one command
python3 scripts/stock-analyze.py AAPL BBRI.JK MSFT AKRA.JK NVDA
```

Output includes:
- Price + 52-week range
- Valuation (PE Trailing/Forward, P/B, Dividend Yield)
- Profitability (Op Margin, Net Margin, ROE, ROA)
- Growth (Revenue + growth %)
- Balance Sheet + Cash Flow (US stocks via SEC EDGAR)
- Recommendation + Verdict flags (CHEAP, DIV, GROWTH, DEEP DISCOUNT, etc.)
- Summary comparison table

## US Stocks — SEC EDGAR (Primary)

`edgar.py` pulls directly from SEC XBRL — same data analysts use:

```bash
# Full financial statements from latest 10-K/10-Q
python3 scripts/edgar.py AAPL
python3 scripts/edgar.py MSFT
python3 scripts/edgar.py NVDA
```

Output fields:
- **Income Statement**: revenue, gross_profit, operating_income, net_income, eps_diluted, eps_basic, r_and_d, sga, interest_expense, income_tax
- **Balance Sheet**: total_assets, current_assets, cash_and_equivalents, total_liabilities, current_liabilities, long_term_debt, stockholders_equity, shares_outstanding
- **Cash Flow**: operating_cash_flow, capex, depreciation_amortization, stock_based_compensation

Each field includes filing form + date as source attribution.

## IDX Stocks — yfinance (Primary)

```bash
# Quick check
python3 scripts/saham-analyze.py CPIN.JK BBCA.JK BBRI.JK AKRA.JK
```

For IDX, yfinance is primary source. Same fundamental fields (PE, PB, Div Yield, ROE, margins, revenue growth) but from Yahoo Finance estimates rather than XBRL.

## Quick One-Liners

```bash
# US stock price + key ratios
python3 -c "import yfinance as yf; t=yf.Ticker('AAPL'); i=t.info; print(f'Price: \${i.get(\"currentPrice\")}, PE: {i.get(\"trailingPE\")}, Div: {i.get(\"dividendYield\",0)*100:.2f}%')"

# IDX stock price + key ratios
python3 -c "import yfinance as yf; t=yf.Ticker('BBRI.JK'); i=t.info; print(f'Price: Rp{i.get(\"currentPrice\")}, PE: {i.get(\"trailingPE\")}, Div: {i.get(\"dividendYield\",0)*100:.2f}%')"
```

## Screening — Top Value+Dividend (IDX)

```python
import yfinance as yf

candidates = ['BBCA.JK','BBRI.JK','CPIN.JK','AKRA.JK','TLKM.JK',
              'UNVR.JK','ICBP.JK','INDF.JK','SMGR.JK','BBNI.JK']

results = []
for tk in candidates:
    try:
        t = yf.Ticker(tk)
        i = t.info
        pe = i.get('trailingPE') or 0
        div = (i.get('dividendYield') or 0) * 100
        roe = (i.get('returnOnEquity') or 0) * 100
        rev_g = (i.get('revenueGrowth') or 0) * 100
        price = i.get('currentPrice') or 0

        if pe > 0:
            results.append({
                'ticker': tk.replace('.JK',''),
                'price': price,
                'pe': pe,
                'div': div,
                'roe': roe,
                'rev_g': rev_g,
                'score': round(div / pe, 3)  # Higher = better value+dividend
            })
    except:
        pass

# Sort by value+dividend score
for r in sorted(results, key=lambda x: x['score'], reverse=True):
    flag = '⭐' if r['score'] > 0.5 else ''
    print(f"{flag}{r['ticker']:6s} PE={r['pe']:.1f} Div={r['div']:.1f}% ROE={r['roe']:.1f}% RevG={r['rev_g']:.0f}% Score={r['score']}")
```

## US Stocks — Quick Compare

```python
import yfinance as yf

us_stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA']

for sym in us_stocks:
    t = yf.Ticker(sym)
    i = t.info
    price = i.get('currentPrice') or 0
    pe = i.get('trailingPE') or 0
    pe_f = i.get('forwardPE') or 0
    rev_g = (i.get('revenueGrowth') or 0) * 100
    roe = (i.get('returnOnEquity') or 0) * 100
    rec = i.get('recommendationKey') or 'N/A'
    print(f"{sym:6s} \${price:7.2f} PE={pe:5.1f} PEf={pe_f:5.1f} RevG={rev_g:5.1f}% ROE={roe:5.1f}% {rec}")
```

## Valuation Thresholds

| Metric | Cheap/Good | Expensive/Bad |
|--------|-----------|---------------|
| PE Trailing | < 12 | > 25 |
| PE Forward | < 15 | > 30 |
| Div Yield (IDX) | > 5% | < 2% |
| ROE | > 15% | < 5% |
| Revenue Growth | > 15% | < 5% |
| Debt/Equity | < 30 | > 50 |
| Op Margin | > 20% | < 10% |

## Score = Div/PE

Best value+dividend combo (higher = better):
- `score > 1.0` → exceptional value (BBRI historically ~1.5-2.0)
- `score > 0.5` → strong
- `score < 0.3` → expensive relative to yield

## Verdict Flags

- `CHEAP` — PE below threshold
- `EXPENSIVE` — PE above threshold
- `DIV X%` — dividend yield above 5%
- `HIGH ROE` — ROE > 15%
- `GROWTH X%` — revenue growth > 15%
- `DEEP DISCOUNT` — price >20% below 52W high
- `DISCOUNT` — price >10% below 52W high


### 🔧 UPGRADED: Financial_AI_Agent
- **Repo**: [malikdeepak09/Financial_AI_Agent](https://github.com/malikdeepak09/Financial_AI_Agent)
- **Description**: A multi-agent system built with Phidata(Agno) Framework that combines web search and YFinance data to provide comprehens
- **Files added**: financial_agent.py, run_tests.py, test_financial_agent.py
- **Installed**: 2026-06-01


### 🔧 UPGRADED: PydanticAI_Stock_Price_Assistant
- **Repo**: [ProactiveAIAgents/PydanticAI_Stock_Price_Assistant](https://github.com/ProactiveAIAgents/PydanticAI_Stock_Price_Assistant)
- **Description**: 📈 PydanticAI Stock Assistant - A Python-based financial analysis tool that leverages the Yahoo Finance API (yfinance) to
- **Files added**: ui.py, test_groq.py, run.py, __init__.py, agents.py
- **Installed**: 2026-06-01


### 🔧 UPGRADED: sec-edgar-toolkit
- **Repo**: [stefanoamorelli/sec-edgar-toolkit](https://github.com/stefanoamorelli/sec-edgar-toolkit)
- **Description**: 🏛️ Open-source toolkit for accessing SEC EDGAR financial data with Python and TypeScript/JavaScript SDKs. Features compr
- **Files added**: .python-version, sec_edgar_toolkit/__init__.py, sec_edgar_toolkit/edgar.py, sec_edgar_toolkit/parsers/ownership_forms.py, sec_edgar_toolkit/parsers/financial_forms.py, sec_edgar_toolkit/parsers/__init__.py, sec_edgar_toolkit/parsers/current_events.py, sec_edgar_toolkit/parsers/item_extractor.py, sec_edgar_toolkit/core/global_functions.py, sec_edgar_toolkit/core/company.py, sec_edgar_toolkit/core/__init__.py, sec_edgar_toolkit/core/xbrl.py, sec_edgar_toolkit/core/filing.py, sec_edgar_toolkit/exceptions/base.py, sec_edgar_toolkit/exceptions/http.py, sec_edgar_toolkit/exceptions/__init__.py, sec_edgar_toolkit/endpoints/company.py, sec_edgar_toolkit/endpoints/__init__.py, sec_edgar_toolkit/endpoints/xbrl.py, sec_edgar_toolkit/endpoints/filings.py, sec_edgar_toolkit/client/sec_edgar_api.py, sec_edgar_toolkit/client/__init__.py, sec_edgar_toolkit/types/proxy_statements.py, sec_edgar_toolkit/types/company.py, sec_edgar_toolkit/types/financial_forms.py, sec_edgar_toolkit/types/__init__.py, sec_edgar_toolkit/types/analytics.py, sec_edgar_toolkit/types/current_events.py, sec_edgar_toolkit/types/filing.py, sec_edgar_toolkit/types/parsing.py, sec_edgar_toolkit/types/institutional_holdings.py, sec_edgar_toolkit/utils/xml_parser.py, sec_edgar_toolkit/utils/filters.py, sec_edgar_toolkit/utils/http.py, sec_edgar_toolkit/utils/__init__.py, basic_usage.py, xbrl_financial_analysis.py, item_extraction_demo.py, edgartools_compatibility.py, api_showcase.py, xml_parsing_example.py, current_events_tracker.py, test_financial_forms.py, conftest.py, test_sec_edgar_api.py, test_ownership_forms.py, test_sec_edgar_api_integration.py, __init__.py, test_recent_filings.py, test_core_functionality.py, company_fixtures.py, __init__.py, filing_fixtures.py
- **Installed**: 2026-06-01

## Tips

- **US stocks**: Plain ticker (AAPL, MSFT, NVDA)
- **IDX stocks**: Append `.JK` (BBRI.JK, CPIN.JK)
- **EDGAR only works for US-listed companies** — not IDX
- **yfinance cache**: ~7 min. For fresh data, use `t.history()` explicitly
- **Dividend yield**: yfinance returns decimal (<1). Normalize: `val * 100 if val < 1 else val`
- **PE Forward < PE Trailing** = market expects earnings improvement
- **Avoid**: N/A PE with negative profit margin, D/E > 50, P/B > 1000 (data error)

## Pitfalls

- `dividendYield > 20%` → usually data error, discard
- `priceToBook extremely high` (e.g., 80937) = N/A PE, loss-making — AVOID
- **MDKA**: profit margin -3.3%, ROE 0.6%, D/E 71.1 — not profitable, AVOID
- **SMGR**: PE Trailing 49.7 due to earnings decline, but PE Forward 5.3 = temporary issue
- **AMMN** (IPO): incomplete financials, high risk
- yfinance data may differ from Bloomberg/Refinitiv
- EDGAR data reflects latest annual filing — may be 6+ months old

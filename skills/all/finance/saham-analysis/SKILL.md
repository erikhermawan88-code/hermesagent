---
name: saham-analysis
description: Indonesian stock market fundamental analysis using yfinance + Yahoo Finance API. Pull price data, financial statements, dividends, valuations (PE, PBV, DivYield), and screen stocks for Erik's investment thesis (Agri infrastructure, AgTech, 10-year build).
triggers:
  - saham
  - stock
  - investasi
  - portofolio
  - beli saham
  - jual saham
  - dividen
  - fundamental
  - laporan keuangan
  - analisa saham
  - cek saham
---

# Saham Analysis — Indonesian Stock Market Fundamental Analysis

## Tool Setup

```bash
pip install yfinance
```

**IMPORTANT**: Run yfinance from `terminal()` tool, NOT from `execute_code()`. The sandbox environment in execute_code does not have yfinance installed. Terminal uses the system Python which has it.

## Data Sources
- Yahoo Finance API: tickers end with `.JK` for Indonesia (e.g., `CPIN.JK`, `BBRI.JK`)
- Real-time price, historical data, financial statements, analyst recommendations

## Workflow

### 0. US Stocks — SEC EDGAR (no API key)
For US tickers (AAPL, MSFT, NVDA, TSLA), use `scripts/edgar.py`:
```bash
python3 scripts/edgar.py AAPL
python3 scripts/edgar.py NVDA
```
Output: revenue, gross_profit, operating_income, net_income, EPS, assets, cash, debt, equity, cash_flow — from 10-K/10-Q SEC filings.

### 1. Screening (Quick Scan)
```python
import yfinance as yf

stocks = {
    'BBRI': 'Bank BRI',
    'BBCA': 'Bank BCA',
    'CPIN': 'Charoen Pokphand',
    'AKRA': 'AKR Corporindo',
    'SMGR': 'Semen Indonesia',
    'MDKA': 'Merdeka Copper',
}

url = "https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?interval=1d&range=2mo"
for ticker, name in stocks.items():
    r = requests.get(url.format(ticker=ticker+'.JK'), headers=headers, timeout=5)
    d = r.json()
    result = d['chart']['result'][0]
    closes = [c for c in result['indicators']['quote'][0]['close'] if c is not None]
    current = closes[-1]
    high = max(closes)
    pct_from_high = ((current - high) / high) * 100
    avg_20 = sum(closes[-20:]) / min(20, len(closes))
    print(f"{ticker}: Price={current:.0f} | Diskon={pct_from_high:+.1f}% | MA20={avg_20:.0f}")
```

### 2. Fundamental Analysis (Deep Dive)
```python
import yfinance as yf

def analyze(ticker_code, name):
    t = yf.Ticker(ticker_code)
    info = t.info
    
    price = info.get('currentPrice') or info.get('regularMarketPrice')
    mc = info.get('marketCap', 0)
    pe_t = info.get('trailingPE')
    pe_f = info.get('forwardPE')
    pb = info.get('priceToBook')
    div_y = info.get('dividendYield')
    rev = info.get('totalRevenue')
    rev_g = info.get('revenueGrowth')
    op_m = info.get('operatingMargins')
    prof_m = info.get('profitMargins')
    roe = info.get('returnOnEquity')
    d_e = info.get('debtToEquity')
    rec = info.get('recommendationKey')
    
    # Fix div_y: yfinance returns as decimal (0.0422 = 4.22%)
    div_pct = div_y * 100 if div_y and div_y < 1 else div_y
    
    print(f'=== {name} ({ticker_code}) ===')
    print(f'Price: {price}')
    print(f'Market Cap: {mc/1e12:.2f}T')
    print(f'PE Trailing: {pe_t:.1f} | PE Forward: {pe_f:.1f}' if pe_t else 'PE: N/A')
    print(f'P/B: {pb:.2f}' if pb else 'P/B: N/A')
    print(f'Div Yield: {div_pct:.2f}%' if div_y else 'Div Yield: N/A')
    print(f'Revenue: {rev/1e12:.2f}T | Rev Growth: {rev_g*100:.1f}%' if rev_g else 'Revenue Growth: N/A')
    print(f'Op Margin: {op_m*100:.1f}% | Profit Margin: {prof_m*100:.1f}%' if op_m else '')
    print(f'ROE: {roe*100:.1f}%' if roe else 'ROE: N/A')
    print(f'Debt/Equity: {d_e:.1f}' if d_e else 'D/E: N/A')
    print(f'Recommendation: {rec}')
```

### 3. Income Statement (Annual/Quarterly)
```python
t = yf.Ticker('CPIN.JK')
is_y = t.income_stmt  # yearly
is_q = t.quarterly_income_stmt  # quarterly
print(is_y.to_string())
```

### 4. Balance Sheet
```python
bs_y = t.balance_sheet  # yearly
print(bs_y.to_string())
```

### 5. Cash Flow
```python
cf_y = t.cashflow  # yearly
print(cf_y.to_string())
```

## Key Metrics to Report (format as table)

| Metric | CPIN | BBCA | BBRI | AKRA | SMGR |
|--------|------|------|------|------|------|
| Price | xxxx | xxxx | xxxx | xxxx | xxxx |
| Market Cap | xT | xT | xT | xT | xT |
| PE Trailing | x.x | x.x | x.x | x.x | x.x |
| PE Forward | x.x | x.x | x.x | x.x | x.x |
| P/B | x.xx | x.xx | x.xx | x.xx | x.xx |
| Div Yield | x.xx% | x.xx% | x.xx% | x.xx% | x.xx% |
| Revenue Growth | x.x% | x.x% | x.x% | x.x% | x.x% |
| Op Margin | x.x% | x.x% | x.x% | x.x% | x.x% |
| ROE | x.x% | x.x% | x.x% | x.x% | x.x% |
| Debt/Eq | x.x | x.x | x.x | x.x | x.x |
| Recommendation | xxx | xxx | xxx | xxx | xxx |

## Pitfalls / Watch-outs

### AVOID (proven wrong in session):
- **MDKA** — N/A PE, profit margin -3.3%, ROE 0.6%, D/E 71.1. Not yet profitable. AVOID until profit positive.
- **SMGR** — PE Trailing 49.7 (earnings temporarily depressed). Falling knife. PE Forward 5.3 suggests recovery — spec buy ONLY with tight stop, not a hold.
- Stocks with `recommendationKey: none` — no analyst coverage, higher risk for retail.

### Critical Data Handling:
- **`dividendYield` in yfinance returns DECIMAL (0.04 = 4%)**, NOT percent. Multiply by 100 or display as `div_y * 100 if div_y < 1 else div_y`.
- **Indonesian tickers**: always append `.JK` — `BBRI.JK`, `CPIN.JK`, etc.
- **edgar.py only works for US-listed companies** (SEC filers). Does NOT work for IDX (.JK) stocks.
- yfinance data comes from Yahoo Finance API — may differ from Bloomberg/Refinitiv for some fields.

### Screening Rules (from actual data):
- PE Forward < 10 = cheap (value)
- Div Yield > 5% = attractive for income (BBRI hit 14.17% in May 2026 — extraordinary, verify sustainability)
- ROE > 15% = quality
- Revenue Growth > 10% = growth
- D/E > 50 = high leverage, risky
- Profit Margin negative = loss-making, avoid
- `priceToBook` extremely high (e.g., MDKA P/B 80937) = N/A PE, likely loss-making — AVOID

## Erik's Preferences
- Bahasa Indonesia — headers, explanations in output
- Short, terse responses — no panjang lebar
- Incremental: show 1 sample → Erik reviews → then proceed with full batch
- Format: table for comparison, not paragraph
- HTTP link for delivery when relevant

## Related Skills
- `career-scout` — career/investment planning
- `sumo-life-strategist` — strategic financial planning
- `kanban-orchestrator` — if task is complex/multi-step
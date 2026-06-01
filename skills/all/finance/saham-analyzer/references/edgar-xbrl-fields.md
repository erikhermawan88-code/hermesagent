# SEC EDGAR XBRL Data — Field Reference

Sourced from `edgar.py` (xvary-research/claude-code-stock-analysis-skill).

## Output Structure

```json
{
  "ticker": "AAPL",
  "cik": "0000320193",
  "entity_name": "Apple Inc.",
  "annual": {
    "period_end": "2025-09-27",
    "statements": {
      "income_statement": {
        "revenue": 265595000000.0,
        "gross_profit": 195201000000.0,
        "operating_income": 133050000000.0,
        "net_income": 112010000000.0,
        "eps_basic": 7.49,
        "eps_diluted": 7.46,
        "income_tax_expense": 20719000000.0,
        "interest_expense": 3933000000.0,
        "r_and_d": 34550000000.0,
        "sga": 27601000000.0
      },
      "balance_sheet": {
        "total_assets": 359241000000.0,
        "current_assets": 147957000000.0,
        "cash_and_equivalents": 35934000000.0,
        "shares_outstanding": 14773260000.0,
        "total_liabilities": 285508000000.0,
        "current_liabilities": 165631000000.0,
        "long_term_debt": 90678000000.0,
        "stockholders_equity": 73733000000.0
      },
      "cash_flow": {
        "operating_cash_flow": 111482000000.0,
        "capex": 12715000000.0,
        "depreciation_amortization": 11698000000.0,
        "stock_based_compensation": 12863000000.0
      }
    },
    "sources": { ... }  // filing metadata per field
  }
}
```

## Key Derived Metrics

| Metric | Formula |
|--------|---------|
| Gross Margin | `gross_profit / revenue` |
| Operating Margin | `operating_income / revenue` |
| Net Margin | `net_income / revenue` |
| Free Cash Flow | `operating_cash_flow - capex` |
| Debt/Equity | `long_term_debt / stockholders_equity` |
| ROE | `net_income / stockholders_equity` |
| ROA | `net_income / total_assets` |
| P/E | `price / eps_diluted` |
| Market Cap | `price × shares_outstanding` |

## Coverage

- Annual: 10-K (US GAAP), 20-F (IFRS for foreign filers)
- Quarterly: 10-Q, 6-K (foreign)
- EDGAR CIK lookup via `https://www.sec.gov/files/company_tickers.json`
- Concept namespace: `us-gaap` for US companies, `ifrs-full` for foreign

## Usage

```bash
# US stocks — full SEC financials (no API key)
python3 scripts/edgar.py AAPL
python3 scripts/edgar.py MSFT
python3 scripts/edgar.py NVDA --mode filings  # shows filing history

# Indonesian stocks (.JK) — use yfinance instead (edgar.py not designed for IDX)
```

## Limitations

- Only works for US-listed companies (SEC filers)
- Period end dates use company fiscal calendar (not calendar year for non-US companies)
- XBRL concept names vary between companies; edgar.py maps common aliases
- Rate limit: SEC allows 10 req/sec, backoff implemented in edgar.py
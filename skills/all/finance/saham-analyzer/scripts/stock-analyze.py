#!/usr/bin/env python3
"""
Stock Analyzer — Unified for IDX (.JK) + US Stocks
Combines: yfinance (price/fundamentals) + SEC EDGAR (US financials)

Usage:
    python3 stock-analyze.py AAPL MSFT NVDA        # US stocks
    python3 stock-analyze.py BBRI.JK BBCA.JK CPIN.JK  # IDX stocks
    python3 stock-analyze.py AAPL BBRI.JK MSFT     # Mixed
"""

import sys
import os
import importlib.util

# Load edgar.py dynamically (relative to this script's dir)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
EDGAR_PATH = os.path.join(SCRIPT_DIR, 'edgar.py')

def load_edgar():
    spec = importlib.util.spec_from_file_location("edgar", EDGAR_PATH)
    edgar = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(edgar)
    return edgar

HAS_EDGAR = os.path.exists(EDGAR_PATH)
edgar = load_edgar() if HAS_EDGAR else None

import yfinance as yf


def is_us_stock(ticker):
    """US stocks don't have .JK suffix"""
    return not ticker.endswith('.JK')


def fmt_currency(n, symbol='$'):
    if n is None: return 'N/A'
    if abs(n) >= 1e12: return f'{symbol}{n/1e12:.2f}T'
    if abs(n) >= 1e9:  return f'{symbol}{n/1e9:.2f}B'
    if abs(n) >= 1e6:  return f'{symbol}{n/1e6:.2f}M'
    return f'{symbol}{n:,.0f}'


def fmt_pct(n):
    if n is None: return 'N/A'
    return f'{n*100:.1f}%' if abs(n) < 1 else f'{n:.1f}%'


def analyze_us(ticker):
    """Analyze US stock using EDGAR (financials) + yfinance (price/ratios)"""
    symbol = ticker.upper().replace('.JK', '')

    # Pull both sources in parallel-ish
    t = yf.Ticker(symbol)

    # yfinance info (price, ratios, recommendation)
    info = t.info
    price = info.get('currentPrice') or info.get('regularMarketPrice')
    mc = info.get('marketCap', 0)
    pe_t = info.get('trailingPE')
    pe_f = info.get('forwardPE')
    pb = info.get('priceToBook')
    div_y_raw = info.get('dividendYield')
    div_rate = info.get('dividendRate')
    beta = info.get('beta')
    rec = info.get('recommendationKey')
    rev = info.get('totalRevenue')
    rev_g = info.get('revenueGrowth')
    op_m = info.get('operatingMargins')
    prof_m = info.get('profitMargins')
    roe = info.get('returnOnEquity')
    roa = info.get('returnOnAssets')
    d_e = info.get('debtToEquity')
    short_pct = info.get('shortPercentOfFloat')
    high_52 = info.get('fiftyTwoWeekHigh')
    low_52 = info.get('fiftyTwoWeekLow')
    avg_peer = info.get('trailingPE')  # we'll use forward PE vs trailing as context

    # Fix dividend — yfinance returns decimal for US stocks (<1), but IDX sometimes in percent (>1)
    # Normalize: if < 1, multiply by 100 to get %. if >= 1, assume it's already percent.
    if div_y_raw is not None:
        if div_y_raw < 1:
            div_pct = div_y_raw * 100
        else:
            div_pct = div_y_raw
        # Sanity cap: yields > 20% are almost always data errors
        if div_pct > 20:
            div_pct = div_pct / 100 if div_pct > 100 else div_pct
            if div_pct > 20:
                div_pct = 0  # discard unreliable value
    else:
        div_pct = 0

    # EDGAR financials
    edgar_data = None
    edgar_source = ''
    if edgar:
        try:
            edgar_data = edgar.get_financials(symbol)
            edgar_source = 'SEC EDGAR'
        except Exception as e:
            edgar_source = f'EDGAR error: {e}'

    # Build output
    print(f'\n{"="*65}')
    print(f'  🇺🇸  {symbol} — US STOCK')
    print(f'{"="*65}')

    if price:
        print(f'  Price: ${price:,.2f}', end='')
        if high_52 and low_52:
            pct_h = ((price - high_52) / high_52) * 100
            pct_l = ((price - low_52) / low_52) * 100
            print(f' | 52W Range: ${low_52:,.0f} – ${high_52:,.0f} ({pct_h:+.1f}% from high)')
        else:
            print()
    else:
        print('  Price: N/A')

    if mc:
        print(f'  Market Cap: ${mc/1e12:.2f}T')

    # Valuation
    print(f'\n  📊 VALUATION')
    if pe_t:
        print(f'  PE Trailing: {pe_t:.1f}  |  PE Forward: {pe_f:.1f}' if pe_f else f'  PE Trailing: {pe_t:.1f}')
    if pb:
        print(f'  P/B: {pb:.2f}')
    if div_pct > 0:
        print(f'  Dividend Yield: {div_pct:.2f}%  (${div_rate:.2f}/share)' if div_rate else f'  Dividend Yield: {div_pct:.2f}%')
    if beta:
        print(f'  Beta: {beta:.2f}')

    # Margins & Growth
    print(f'\n  📈 PROFITABILITY & GROWTH')
    if rev:
        print(f'  Revenue: ${rev/1e12:.2f}T', end='')
        if rev_g: print(f'  | Growth: {rev_g*100:.1f}%')
        else: print()
    elif edgar_data and 'income_statement' in edgar_data:
        is_data = edgar_data['income_statement']
        rev_ed = is_data.get('revenue')
        if rev_ed: print(f'  Revenue: ${rev_ed/1e12:.2f}T (EDGAR)')

    if op_m:
        print(f'  Operating Margin: {op_m*100:.1f}%', end='')
        if prof_m: print(f'  | Net Margin: {prof_m*100:.1f}%')
        print()
    elif edgar_data and 'income_statement' in edgar_data:
        is_d = edgar_data['income_statement']
        rev_v = is_d.get('revenue') or 1
        op_i = is_d.get('operating_income', 0)
        net_i = is_d.get('net_income', 0)
        if rev_v and op_i:
            print(f'  Operating Margin: {op_i/rev_v*100:.1f}%  | Net Margin: {net_i/rev_v*100:.1f}% (EDGAR)')

    if roe:
        print(f'  ROE: {roe*100:.1f}%  |  ROA: {roa*100:.1f}%' if roa else f'  ROE: {roe*100:.1f}%')
    if d_e is not None:
        print(f'  Debt/Equity: {d_e:.1f}')

    # Cash Flow (EDGAR)
    if edgar_data and 'cash_flow' in edgar_data:
        cf = edgar_data['cash_flow']
        print(f'\n  💰 CASH FLOW (SEC EDGAR)')
        op_cf = cf.get('operating_cash_flow')
        capex = cf.get('capex')
        if op_cf: print(f'  Operating CF: ${op_cf/1e9:.1f}B')
        if capex: print(f'  Capex: ${capex/1e9:.1f}B')
        if op_cf and capex:
            fcf = op_cf + capex  # capex is negative in XBRL
            print(f'  Free Cash Flow: ${fcf/1e9:.1f}B')

    # Balance Sheet (EDGAR)
    if edgar_data and 'balance_sheet' in edgar_data:
        bs = edgar_data['balance_sheet']
        print(f'\n  🏦 BALANCE SHEET (SEC EDGAR)')
        assets = bs.get('total_assets')
        equity = bs.get('stockholders_equity')
        debt = bs.get('long_term_debt')
        cash = bs.get('cash_and_equivalents')
        if assets: print(f'  Total Assets: ${assets/1e12:.2f}T')
        if equity: print(f'  Stockholders Equity: ${equity/1e12:.2f}T')
        if debt: print(f'  Long-term Debt: ${debt/1e9:.1f}B')
        if cash: print(f'  Cash: ${cash/1e9:.1f}B')
        if debt and equity:
            leverage = debt / equity if equity else 0
            print(f'  Debt/Equity (book): {leverage:.2f}')

    # Recommendation
    print(f'\n  🎯 Recommendation: {rec or "N/A"}')

    # Verdict
    verdicts = []
    if pe_t:
        if pe_t < 15: verdicts.append('CHEAP')
        elif pe_t > 30: verdicts.append('EXPENSIVE')
    if div_pct > 3: verdicts.append(f'DIV {div_pct:.1f}%')
    if roe and roe > 0.20: verdicts.append('HIGH ROE')
    if rev_g and rev_g > 0.15: verdicts.append(f'GROWTH {rev_g*100:.0f}%')
    if high_52 and low_52 and price:
        pct_h = ((price - high_52) / high_52) * 100
        if pct_h < -25: verdicts.append('DEEP DISCOUNT')

    v_str = ' | '.join(verdicts) if verdicts else 'NEUTRAL'
    print(f'  >>> {v_str}')

    if edgar_source and 'error' not in edgar_source.lower():
        print(f'  📋 Financials: {edgar_source}')
    elif edgar_source:
        print(f'  ⚠️ Financials: {edgar_source}')


def analyze_idx(ticker):
    """Analyze Indonesian stock using yfinance"""
    t = yf.Ticker(ticker)
    info = t.info

    price = info.get('currentPrice') or info.get('regularMarketPrice')
    high_52 = info.get('fiftyTwoWeekHigh')
    low_52 = info.get('fiftyTwoWeekLow')
    mc = info.get('marketCap', 0)
    pe_t = info.get('trailingPE')
    pe_f = info.get('forwardPE')
    pb = info.get('priceToBook')
    div_y_raw = info.get('dividendYield')
    rev = info.get('totalRevenue')
    rev_g = info.get('revenueGrowth')
    op_m = info.get('operatingMargins')
    prof_m = info.get('profitMargins')
    roe = info.get('returnOnEquity')
    roa = info.get('returnOnAssets')
    d_e = info.get('debtToEquity')
    rec = info.get('recommendationKey')

    if div_y_raw is not None:
        div_pct = div_y_raw * 100 if div_y_raw < 1 else div_y_raw
        if div_pct > 20:
            div_pct = div_pct / 100 if div_pct > 100 else div_pct
            if div_pct > 20: div_pct = 0
    else:
        div_pct = 0

    name = ticker.replace('.JK', '')
    currency = 'Rp'
    price_str = f'{price:,.0f}' if price else 'N/A'

    print(f'\n{"="*65}')
    print(f'  🇮🇩  {name} — INDONESIAN IDX')
    print(f'{"="*65}')

    if price:
        print(f'  Price: Rp {price_str}', end='')
        if high_52 and low_52:
            pct_h = ((price - high_52) / high_52) * 100
            pct_l = ((price - low_52) / low_52) * 100
            print(f' | 52W Range: Rp {low_52:,.0f} – Rp {high_52:,.0f} ({pct_h:+.1f}% from high)')
        else:
            print()
    else:
        print('  Price: N/A')

    if mc:
        print(f'  Market Cap: Rp {mc/1e12:.2f}T')

    print(f'\n  📊 VALUATION')
    if pe_t:
        print(f'  PE Trailing: {pe_t:.1f}  |  PE Forward: {pe_f:.1f}' if pe_f else f'  PE Trailing: {pe_t:.1f}')
    if pb:
        print(f'  P/B: {pb:.2f}')
    if div_pct > 0:
        print(f'  Dividend Yield: {div_pct:.2f}%')
    if rev:
        print(f'  Revenue: Rp {rev/1e12:.2f}T', end='')
        if rev_g: print(f'  | Growth: {rev_g*100:.1f}%')
        else: print()

    print(f'\n  📈 PROFITABILITY & GROWTH')
    if op_m:
        print(f'  Operating Margin: {op_m*100:.1f}%', end='')
        if prof_m: print(f'  | Net Margin: {prof_m*100:.1f}%')
        print()
    if roe:
        print(f'  ROE: {roe*100:.1f}%', end='')
        if roa: print(f'  | ROA: {roa*100:.1f}%')
        print()
    if d_e is not None:
        print(f'  Debt/Equity: {d_e:.1f}')

    print(f'\n  🎯 Recommendation: {rec or "N/A"}')

    # Verdict
    verdicts = []
    if pe_t:
        if pe_t < 10: verdicts.append('CHEAP')
        elif pe_t > 25: verdicts.append('EXPENSIVE')
    if div_pct > 5: verdicts.append(f'DIV {div_pct:.1f}%')
    if roe and roe > 0.15: verdicts.append('HIGH ROE')
    if rev_g and rev_g > 0.15: verdicts.append(f'GROWTH {rev_g*100:.0f}%')
    if high_52 and low_52 and price:
        pct_h = ((price - high_52) / high_52) * 100
        if pct_h < -20: verdicts.append('DEEP DISCOUNT')
        elif pct_h < -10: verdicts.append('DISCOUNT')

    v_str = ' | '.join(verdicts) if verdicts else 'NEUTRAL'
    print(f'  >>> {v_str}')

    # Try to get income statement summary
    try:
        is_y = t.income_stmt
        if is_y is not None and not is_y.empty:
            ni_vals = is_y.loc['Net Income'].dropna()
            if len(ni_vals) > 0:
                latest_ni = ni_vals.iloc[0]
                shares = info.get('sharesOutstanding', 1)
                eps = latest_ni / shares if shares else None
                if eps:
                    print(f'  EPS (annual): Rp {eps:,.0f}')
    except:
        pass


def print_summary(results):
    """Print summary table for all analyzed tickers"""
    print(f'\n{"="*65}')
    print('  📊 SUMMARY TABLE')
    print(f'{"="*65}')
    print(f'  {"Ticker":<10} {"Price":>10} {"PE(F)":>7} {"Div%":>7} {"ROE%":>7} {"Verdict"}')
    print(f'  {"-"*65}')

    for r in results:
        ticker = r['ticker'].replace('.JK', '')
        price_str = r.get('price_str', 'N/A')
        pe_str = r.get('pe_str', 'N/A')
        div_str = r.get('div_str', 'N/A')
        roe_str = r.get('roe_str', 'N/A')
        verdict = r.get('verdict', 'NEUTRAL')
        flag = r.get('flag', '')
        print(f'  {ticker:<10} {price_str:>10} {pe_str:>7} {div_str:>7} {roe_str:>7}  {flag}{verdict}')

    print()


if __name__ == '__main__':
    tickers = sys.argv[1:] or ['AAPL', 'BBRI.JK', 'CPIN.JK']

    print(f'\n📊 STOCK ANALYZER — {len(tickers)} stocks (IDX + US)')
    print('='*65)

    results = []

    for ticker in tickers:
        try:
            if is_us_stock(ticker):
                analyze_us(ticker)
            else:
                analyze_idx(ticker)
        except Exception as e:
            print(f'\n  ⚠️ ERROR on {ticker}: {e}')
            import traceback
            traceback.print_exc()

        # Collect for summary
        t = yf.Ticker(ticker)
        info = t.info
        price = info.get('currentPrice') or info.get('regularMarketPrice')
        pe_f = info.get('forwardPE')
        div_y_raw = info.get('dividendYield')
        roe = info.get('returnOnEquity')

        div_pct = (div_y_raw * 100 if (div_y_raw and div_y_raw < 1) else (div_y_raw or 0))
        if div_pct > 20:
            div_pct = div_pct / 100 if div_pct > 100 else div_pct
            if div_pct > 20: div_pct = 0

        verdicts = []
        pe_t = info.get('trailingPE')
        if pe_t:
            if pe_t < 12: verdicts.append('CHEAP')
            elif pe_t > 30: verdicts.append('EXPENSIVE')
        if div_pct > 5: verdicts.append(f'DIV')
        if roe and roe > 0.15: verdicts.append('ROE')

        symbol = ticker.replace('.JK', '')
        results.append({
            'ticker': ticker,
            'price_str': f'${price:,.0f}' if is_us_stock(ticker) else f'Rp{price:,.0f}' if price else 'N/A',
            'pe_str': f'{pe_f:.1f}' if pe_f else 'N/A',
            'div_str': f'{div_pct:.1f}%' if div_pct > 0 else 'N/A',
            'roe_str': f'{roe*100:.0f}%' if roe else 'N/A',
            'verdict': ' | '.join(verdicts) if verdicts else 'NEUTRAL',
            'flag': '🇺🇸 ' if is_us_stock(ticker) else '🇮🇩 '
        })

    print_summary(results)
    print('✅ Done. Financial data from SEC EDGAR (US) + Yahoo Finance (IDX)')

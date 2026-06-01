#!/usr/bin/env python3
"""
Saham Analyzer — Full Fundamental + Technical Screening
Usage: python3 saham-analyze.py CPIN.JK BBCA.JK BBRI.JK AKRA.JK
"""

import sys
import yfinance as yf

def fmt_num(n, suffix=''):
    if n is None: return 'N/A'
    if abs(n) >= 1e12: return f'{n/1e12:.2f}T{suffix}'
    if abs(n) >= 1e9:  return f'{n/1e9:.2f}B{suffix}'
    if abs(n) >= 1e6:  return f'{n/1e6:.2f}M{suffix}'
    return f'{n:.0f}{suffix}'

def analyze(ticker_code):
    t = yf.Ticker(ticker_code)
    info = t.info
    
    price = info.get('currentPrice') or info.get('regularMarketPrice')
    high_52 = info.get('fiftyTwoWeekHigh')
    low_52 = info.get('fiftyTwoWeekLow')
    
    pe_t = info.get('trailingPE')
    pe_f = info.get('forwardPE')
    pb = info.get('priceToBook')
    div_y_raw = info.get('dividendYield')
    mc = info.get('marketCap', 0)
    
    roe = info.get('returnOnEquity')
    roa = info.get('returnOnAssets')
    op_m = info.get('operatingMargins')
    prof_m = info.get('profitMargins')
    rev_g = info.get('revenueGrowth')
    d_e = info.get('debtToEquity')
    rec = info.get('recommendationKey')
    
    # Fix dividend display — yfinance returns decimal (0.04 = 4%)
    div_pct = div_y_raw * 100 if div_y_raw and div_y_raw < 1 else div_y_raw
    
    # 52-week position
    if high_52 and low_52 and price:
        pct_from_high = ((price - high_52) / high_52) * 100
        pct_from_low = ((price - low_52) / low_52) * 100
    else:
        pct_from_high = pct_from_low = None
    
    # Valuation verdicts
    verdicts = []
    if pe_t:
        if pe_t < 10: verdicts.append('CHEAP')
        elif pe_t > 25: verdicts.append('EXPENSIVE')
    if div_pct and div_pct > 0:
        if div_pct > 5: verdicts.append(f'DIV {div_pct:.1f}%')
    if pct_from_high is not None:
        if pct_from_high < -20: verdicts.append('DEEP DISCOUNT')
        elif pct_from_high < -10: verdicts.append('DISCOUNT')
    if rev_g:
        if rev_g > 0.15: verdicts.append(f'GROWTH {rev_g*100:.0f}%')
    if roe and roe > 0.15: verdicts.append('HIGH ROE')
    
    verdict_str = ' | '.join(verdicts) if verdicts else 'NEUTRAL'
    
    print(f'{"="*60}')
    print(f'  {ticker_code}')
    print(f'{"="*60}')
    print(f'  Price: {price:,.0f} | 52W High: {high_52:,.0f} | Low: {low_52:,.0f}')
    if pct_from_high is not None:
        print(f'  From 52W High: {pct_from_high:+.1f}%  |  From 52W Low: {pct_from_low:+.1f}%')
    print(f'  Market Cap: {fmt_num(mc)}')
    if pe_t:
        print(f'  PE Trailing: {pe_t:.1f}  |  PE Forward: {pe_f:.1f}')
    if pb:
        print(f'  P/B: {pb:.2f}')
    if div_pct and div_pct > 0:
        print(f'  Div Yield: {div_pct:.2f}%')
    if rev_g:
        print(f'  Revenue Growth: {rev_g*100:.1f}%')
    if op_m:
        print(f'  Op Margin: {op_m*100:.1f}%  |  Profit Margin: {prof_m*100:.1f}%' if prof_m else f'  Op Margin: {op_m*100:.1f}%')
    if roe:
        print(f'  ROE: {roe*100:.1f}%  |  ROA: {roa*100:.1f}%' if roa else f'  ROE: {roe*100:.1f}%')
    if d_e:
        print(f'  Debt/Equity: {d_e:.1f}')
    print(f'  Recommendation: {rec}')
    print(f'  >>> {verdict_str}')
    print()
    
    return {
        'price': price,
        'pe_t': pe_t,
        'pe_f': pe_f,
        'pb': pb,
        'div_y': div_pct,
        'roe': roe,
        'roa': roa,
        'rev_g': rev_g,
        'd_e': d_e,
        'rec': rec,
        'pct_from_high': pct_from_high,
        'verdict': verdict_str
    }

if __name__ == '__main__':
    tickers = sys.argv[1:] or ['CPIN.JK', 'BBCA.JK', 'BBRI.JK', 'AKRA.JK']
    
    print(f'\n📊 SAHAM ANALYZER — {len(tickers)} stocks\n')
    
    results = {}
    for tk in tickers:
        try:
            results[tk] = analyze(tk)
        except Exception as e:
            print(f'ERROR on {tk}: {e}')
    
    # Summary table
    print(f'{"="*60}')
    print('  SUMMARY')
    print(f'{"="*60}')
    print(f'  {"Ticker":<10} {"Price":>7} {"PE(F)":>6} {"Div%":>7} {"ROE%":>6} {"52W%":>6}  Verdict')
    print(f'  {"-"*60}')
    for tk, r in results.items():
        name = tk.replace('.JK','')
        pe = f"{r['pe_f']:.1f}" if r['pe_f'] else 'N/A'
        div = f"{r['div_y']:.1f}%" if r['div_y'] and r['div_y'] > 0 else 'N/A'
        roe = f"{r['roe']*100:.1f}%" if r['roe'] else 'N/A'
        pct = f"{r['pct_from_high']:.1f}%" if r['pct_from_high'] else 'N/A'
        print(f'  {name:<10} {r["price"]:>7,.0f} {pe:>6} {div:>7} {roe:>6} {pct:>6}  {r["verdict"]}')
    print()

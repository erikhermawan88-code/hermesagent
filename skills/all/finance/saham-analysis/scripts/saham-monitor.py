#!/usr/bin/env python3
"""
Saham Weekly Monitor - Erik's Portfolio Watch
Run: python3 ~/saham-monitor.py

Checks BBRI, BBCA, CPIN, AKRA fundamentals and prints comparison table.
"""
import yfinance as yf

WATCHLIST = ['BBRI', 'BBCA', 'CPIN', 'AKRA', 'SMGR']

def analyze(ticker):
    t = yf.Ticker(f"{ticker}.JK")
    info = t.info
    
    price = info.get('currentPrice') or info.get('regularMarketPrice')
    mc = info.get('marketCap', 0)
    pe_t = info.get('trailingPE')
    pe_f = info.get('forwardPE')
    pb = info.get('priceToBook')
    div_y = info.get('dividendYield')
    rev_g = info.get('revenueGrowth')
    op_m = info.get('operatingMargins')
    prof_m = info.get('profitMargins')
    roe = info.get('returnOnEquity')
    d_e = info.get('debtToEquity')
    rec = info.get('recommendationKey')
    
    div_pct = div_y * 100 if div_y and div_y < 1 else (div_y or 0)
    
    return {
        'price': price,
        'mc': mc / 1e12,
        'pe_t': pe_t,
        'pe_f': pe_f,
        'pb': pb,
        'div': div_pct,
        'rev_g': rev_g * 100 if rev_g else 0,
        'op_m': op_m * 100 if op_m else 0,
        'prof_m': prof_m * 100 if prof_m else 0,
        'roe': roe * 100 if roe else 0,
        'd_e': d_e or 0,
        'rec': rec or 'N/A',
    }

def main():
    print(f"{'Ticker':6s} {'Price':>7s} {'MC':>5s} {'PE(F)':>6s} {'Div%':>6s} {'RevG%':>6s} {'OpM%':>6s} {'ROE%':>6s} {'D/E':>6s} {'Rec'}")
    print("-" * 75)
    
    for ticker in WATCHLIST:
        try:
            d = analyze(ticker)
            print(f"{ticker:6s} {d['price']:>7.0f} {d['mc']:>5.2f}T "
                  f"{d['pe_f']:>6.1f} {d['div']:>6.2f} {d['rev_g']:>6.1f} "
                  f"{d['op_m']:>6.1f} {d['roe']:>6.1f} {d['d_e']:>6.1f} {d['rec']}")
        except Exception as e:
            print(f"{ticker:6s}: ERROR - {e}")

if __name__ == '__main__':
    main()
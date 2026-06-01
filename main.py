     # main.py untuk Hermes Automation di PODS Indonesia
     import os
     from datetime import datetime

     try:
         # Contoh generate brief sederhana
         with open('/opt/hermes/daily_brief.txt', 'w') as f:
             f.write(f"📅 Harian Campaign Brief - {datetime.now().strftime('%Y-%m-%d')}\n")
             f.write("🎯 Campaign Name: Harian PODS\n")
             f.write("🔥 Big Idea: Earphone murah, gaya premium untuk Gen Z!\n")
             f.write("🧠 CORE INSIGHT: Gen Z inginkan status tanpa mahal.\n")
         print('Brief berhasil dibuat!')
     except Exception as e:
         print(f'Error: {e}')
     

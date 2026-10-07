"""Capturas de recorrido con Playwright (QA). Uso: python3 tools/shots.py [url] [ancho] [alto] [prefijo]"""
import sys, os
from playwright.sync_api import sync_playwright
url=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:8811/'
W=int(sys.argv[2]) if len(sys.argv)>2 else 1536; H=int(sys.argv[3]) if len(sys.argv)>3 else 864
pref=sys.argv[4] if len(sys.argv)>4 else 'd'
os.makedirs('_qa/shots',exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={'width':W,'height':H})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: errs.append('console:'+m.text) if m.type=='error' else None)
    pg.goto(url); pg.wait_for_timeout(3500)
    total=pg.evaluate('document.documentElement.scrollHeight')
    y=0;i=0
    while y<total and i<40:
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(1300)
        pg.screenshot(path=f'_qa/shots/{pref}{i:02d}.jpg',quality=60,type='jpeg')
        y+=int(H*0.9); i+=1
        total=pg.evaluate('document.documentElement.scrollHeight')
    print('altura',total,'capturas',i); print('\n'.join(errs[:20]))
    b.close()

"""Captura puntual: python3 tools/shot1.py out.jpg W H selector|y [espera]"""
import sys
from playwright.sync_api import sync_playwright
out,W,H,tgt=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),sys.argv[4]
wait=int(sys.argv[5]) if len(sys.argv)>5 else 1600
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':H})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8811/'); pg.wait_for_timeout(3300)
    if tgt.lstrip('-').replace('.','').isdigit(): pg.evaluate(f'window.scrollTo(0,{tgt})')
    else: pg.evaluate(f"(()=>{{const e=document.querySelector('{tgt}');window.scrollTo(0,e.getBoundingClientRect().top+scrollY)}})()")
    pg.wait_for_timeout(wait); pg.screenshot(path=out,type='jpeg',quality=70); print(errs)
    b.close()

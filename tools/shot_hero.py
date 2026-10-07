import sys
from playwright.sync_api import sync_playwright
W,H=int(sys.argv[1]),int(sys.argv[2]); pref=sys.argv[3]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':H})
    pg.goto('http://localhost:8811/'); pg.wait_for_timeout(3500)
    tot=pg.evaluate("document.querySelector('.hero').offsetHeight-innerHeight")
    for i,f in enumerate([0,.1,.25,.45,.65,.85,1.0]):
        pg.evaluate(f'window.scrollTo(0,{int(tot*f)})'); pg.wait_for_timeout(1400)
        pg.screenshot(path=f'_qa/shots/{pref}{i:02d}.jpg',type='jpeg',quality=60)
    b.close()

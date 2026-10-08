import sys
from playwright.sync_api import sync_playwright
W,H=int(sys.argv[1]),int(sys.argv[2]); pref=sys.argv[3]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':H})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8812/')
    for i,w in enumerate([300,600,500,500,400,400,600,1500]):
        pg.wait_for_timeout(w); pg.screenshot(path=f'_qa/shots/{pref}{i:02d}.jpg',type='jpeg',quality=60)
    print(errs); b.close()

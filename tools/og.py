"""F05 — assets/og.jpg 1200×630 (<300 KB): logotipo sobre el salón (IG-03)."""
import os
from playwright.sync_api import sync_playwright
from PIL import Image
A=os.path.abspath
html=f'''<html><head><style>
@font-face{{font-family:G;src:url({A("assets/fonts/newsreader-latin-opsz-italic.woff2")})}}
body{{margin:0;width:1200px;height:630px;position:relative;overflow:hidden;background:#0d0e10}}
.bg{{position:absolute;inset:0;background:url({A("assets/img/hero-d-1920.webp")}) 47% 40%/cover;filter:saturate(.9)}}
.sh{{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(13,14,16,.55),rgba(13,14,16,.82))}}
.c{{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:26px}}
img{{width:640px}} p{{margin:0;font:italic 300 36px G;color:#f4efe7;letter-spacing:.01em}}
small{{font:16px G;letter-spacing:.32em;color:#f4efe7;opacity:.8;text-transform:uppercase}}
</style></head><body><div class=bg></div><div class=sh></div><div class=c><img src="{A("brand/logo/logotipo-claro.svg")}"><p>Cocina de Mar… y Tierra</p><small>Castro - Chiloé</small></div></body></html>'''
open('/tmp/claude-0/og.html','w').write(html)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1200,'height':630}); pg.goto('file:///tmp/claude-0/og.html'); pg.wait_for_timeout(500); pg.screenshot(path='/tmp/claude-0/og.png'); b.close()
Image.open('/tmp/claude-0/og.png').convert('RGB').save('assets/og.jpg',quality=84,optimize=True,progressive=True)
print(os.path.getsize('assets/og.jpg')//1024,'KB')

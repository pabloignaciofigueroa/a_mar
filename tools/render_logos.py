"""Rasteriza variantes de logo y favicons con Playwright; lámina de control."""
import os
from playwright.sync_api import sync_playwright
from PIL import Image
L='brand/logo/'
def page(svg,w,h,bg):
    return f'<html><body style="margin:0;background:{bg};width:{w}px;height:{h}px;display:grid;place-items:center"><img src="file://{os.path.abspath(svg)}" style="max-width:{w*0.86}px;max-height:{h*0.8}px"></body></html>'
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    def shot(svg,w,h,bg,out,omit=False):
        pg.set_viewport_size({'width':w,'height':h}); open('/tmp/claude-0/l.html','w').write(page(svg,w,h,bg)); pg.goto('file:///tmp/claude-0/l.html'); pg.wait_for_timeout(150); pg.screenshot(path=out,omit_background=omit)
    shot(L+'logotipo-claro.svg',1600,500,'#0d0e10',L+'logotipo-claro.png')
    shot(L+'logotipo-oscuro.svg',1600,500,'#f4efe7',L+'logotipo-oscuro.png')
    shot(L+'vertical-claro.svg',900,900,'#0d0e10',L+'vertical-claro.png')
    # favicons
    pg.set_viewport_size({'width':512,'height':512}); open('/tmp/claude-0/f.html','w').write(f'<html><body style="margin:0"><img src="file://{os.path.abspath(L+"favicon.svg")}" width=512 height=512></body></html>'); pg.goto('file:///tmp/claude-0/f.html'); pg.wait_for_timeout(150); pg.screenshot(path='/tmp/claude-0/fav512.png',omit_background=True)
    b.close()
im=Image.open('/tmp/claude-0/fav512.png').convert('RGBA')
for s in (16,32,48,180,192,512):
    im.resize((s,s),Image.LANCZOS).save(f'brand/logo/favicon-{s}.png')
im.save('brand/logo/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
# lámina de control
sheet=Image.new('RGB',(1600,1400),'#888')
for i,(f,y) in enumerate([('logotipo-claro.png',0),('logotipo-oscuro.png',500)]): sheet.paste(Image.open(L+f).convert('RGB'),(0,y))
v=Image.open(L+'vertical-claro.png').convert('RGB').resize((400,400)); sheet.paste(v,(0,1000))
sheet.paste(im.resize((180,180)),(500,1100),im.resize((180,180)))
sheet.save('_qa/logos.jpg')

"""QA v2. Sirve raíz (8811) y public/ (8812). Uso: python3 tools/qa.py"""
import sys, io
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops
ROOT='http://localhost:8811/'; PUB='http://localhost:8812/'
ok=True
def check(c,msg):
    global ok
    print(('  ok  ' if c else '  FALLA ')+msg); ok&=bool(c)
def walk(pg,H):
    tot=pg.evaluate('document.documentElement.scrollHeight'); y=0
    while y<tot:
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(380); y+=int(H*0.8); tot=pg.evaluate('document.documentElement.scrollHeight')
    pg.wait_for_timeout(800); return tot
CLS="window.__cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput)window.__cls+=e.value}}).observe({type:'layout-shift',buffered:true});"
with sync_playwright() as p:
    b=p.chromium.launch()
    for W,H in ((1440,900),(390,844)):
        res={}
        for name,url in (('raiz',ROOT),('public',PUB)):
            ctx=b.new_context(viewport={'width':W,'height':H}); pg=ctx.new_page(); errs=[]; bad=[]; reqs=set()
            pg.on('pageerror',lambda e:errs.append(str(e)))
            pg.on('response',lambda r:(bad.append(f'{r.status} {r.url}') if r.status>=400 and 'localhost' in r.url else None))
            pg.on('request',lambda r:reqs.add(r.url.split('/',3)[-1]) if 'localhost' in r.url else None)
            pg.add_init_script(CLS); pg.goto(url); pg.wait_for_timeout(6000)
            cl=pg.evaluate('window.__cls'); tot=walk(pg,H); ca=pg.evaluate('window.__cls')
            pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1500)
            pg.add_style_tag(content='.hero__img{transform:none!important}')
            pg.wait_for_timeout(300)
            res[name]=dict(errs=errs,bad=bad,reqs=reqs,h=tot,cl=cl,ca=ca,shot=pg.screenshot()); ctx.close()
        print(f'— {W}×{H}')
        for n in res: check(not res[n]['errs'],f'{n}: sin errores JS {res[n]["errs"][:2]}'); check(not res[n]['bad'],f'{n}: sin 4xx {res[n]["bad"][:3]}')
        check(res['raiz']['reqs']==res['public']['reqs'],f'mismos recursos ({len(res["raiz"]["reqs"])}) dif={res["raiz"]["reqs"]^res["public"]["reqs"]}')
        check(res['raiz']['h']==res['public']['h'],f'mismo alto {res["raiz"]["h"]}/{res["public"]["h"]}')
        a=Image.open(io.BytesIO(res['raiz']['shot'])).convert('RGB'); c=Image.open(io.BytesIO(res['public']['shot'])).convert('RGB')
        d=ImageChops.difference(a,c).convert('L').point(lambda v:255 if v>10 else 0); frac=sum(d.histogram()[255:])/(a.width*a.height)
        check(frac<0.003,f'portada igual raíz vs public ({frac:.4%})')
        for n in res: check(res[n]['ca']<0.01,f'{n}: CLS carga {res[n]["cl"]:.4f} · recorrido {res[n]["ca"]:.4f}')
    for W in (390,1280,1366,1440,1536,1920):
        pg=b.new_page(viewport={'width':W,'height':860}); pg.goto(PUB); pg.wait_for_timeout(5000); walk(pg,860)
        ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth'); check(ov<=0,f'{W}px sin desborde ({ov})'); pg.close()
    pg=b.new_page(viewport={'width':1366,'height':800}); pg.goto(PUB); pg.wait_for_timeout(6000)
    pg.evaluate("document.querySelector('#lang').click()"); pg.wait_for_timeout(500)
    st=pg.evaluate("({lang:document.documentElement.lang,book:document.querySelector('.nav__book').textContent,alt:document.querySelector('.hero__img').alt,meta:document.querySelector('meta[name=description]').content,aria:document.querySelector('#lang').getAttribute('aria-label'),brand:document.querySelector('.hero__tag').textContent,carta:document.querySelector('.carta__h').textContent})")
    check(st['lang']=='en' and st['book']=='Book' and st['alt'].startswith('Griddled') and 'Open Tuesday' in st['meta'] and st['aria'].startswith('ES') and st['carta']=='The menu',f'inglés {st}')
    check(st['brand']=='Cocina de Mar… y Tierra','texto de marca queda en español')
    pg.evaluate("document.querySelector('#lang').click()"); pg.wait_for_timeout(400)
    check(pg.evaluate("document.documentElement.lang+'|'+document.querySelector('.nav__book').textContent")=='es|Reservar','vuelta a español')
    pg.evaluate("document.querySelector('#carta').scrollIntoView()"); pg.wait_for_timeout(2200)
    pg.hover('.carta__item[data-img=\"erizos\"]'); pg.wait_for_timeout(900)
    check(pg.evaluate("document.querySelector('.carta__img.is-on').dataset.k")=='erizos','la carta cambia la foto al pasar el cursor')
    pg.focus('.carta__item[data-img=\"sorrentinos\"]'); pg.wait_for_timeout(300)
    check(pg.evaluate("document.querySelector('.carta__img.is-on').dataset.k")=='sorrentinos','y con el teclado')
    pg.reload(); pg.wait_for_timeout(5000); pg.keyboard.press('Tab'); pg.keyboard.press('Enter'); pg.wait_for_timeout(1500)
    check(pg.evaluate('document.activeElement.id')=='main','saltar al contenido mueve el foco')
    for sec in ('#resenas','#visitanos'):
        pg.set_viewport_size({'width':1024,'height':768}); pg.wait_for_timeout(1200)
        pg.evaluate(f"document.querySelector('{sec}').scrollIntoView()"); pg.wait_for_timeout(1500)
        pg.set_viewport_size({'width':768,'height':1024}); pg.wait_for_timeout(2500)
        t=pg.evaluate(f"(()=>{{const r=document.querySelector('{sec}').getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]}})()")
        check(abs(t[0])<=80,f'iPad girado: {sec} conserva su lugar {t}')
    pg.close()
    for label,route in (('movimiento reducido',None),('sin GSAP','gsap')):
        ctx=b.new_context(viewport={'width':1366,'height':800},reduced_motion='reduce' if route is None else 'no-preference'); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        if route: pg.route('**/vendor/gsap.min.js',lambda r:r.abort())
        pg.goto(PUB); pg.wait_for_timeout(1500)
        r=pg.evaluate("""(()=>{const hid=[...document.querySelectorAll('h1,h2,p,figure,img:not(.carta__img),.line>span,.carta__item')].filter(e=>{const s=getComputedStyle(e);return s.visibility==='hidden'||+s.opacity<0.05||(s.clipPath&&s.clipPath.startsWith('inset(100%'))}).map(e=>e.className||e.tagName);
          return {n:hid.length,hid:hid.slice(0,6),tide:getComputedStyle(document.querySelector('.hero__tide')).display}})()""")
        check(r['n']==0 and r['tide']=='none' and not errs,f'{label}: todo visible {r} {errs[:1]}')
        ctx.close()
    b.close()
print('\nRESULTADO:', 'OK' if ok else 'HAY FALLAS'); sys.exit(0 if ok else 1)

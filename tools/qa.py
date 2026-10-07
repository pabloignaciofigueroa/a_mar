"""F18 — QA automatizado. Sirve raíz (8811) y public/ (8812) aparte. Uso: python3 tools/qa.py"""
import json, sys
from playwright.sync_api import sync_playwright
ROOT='http://localhost:8811/'; PUB='http://localhost:8812/'
ok=True
def check(c,msg):
    global ok
    print(('  ok  ' if c else '  FALLA ')+msg); ok&=bool(c)
def walk(pg,H):
    tot=pg.evaluate('document.documentElement.scrollHeight'); y=0
    while y<tot:
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(450); y+=int(H*0.8); tot=pg.evaluate('document.documentElement.scrollHeight')
    pg.wait_for_timeout(800); return tot
CLS_JS="window.__cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput)window.__cls+=e.value}}).observe({type:'layout-shift',buffered:true});"
with sync_playwright() as p:
    b=p.chromium.launch()
    for W,H in ((1536,864),(390,844)):
        res={}
        for name,url in (('raiz',ROOT),('public',PUB)):
            ctx=b.new_context(viewport={'width':W,'height':H}); pg=ctx.new_page()
            errs=[];bad=[];reqs=set()
            pg.on('pageerror',lambda e:errs.append(str(e)))
            pg.on('response',lambda r:(bad.append(f'{r.status} {r.url}') if r.status>=400 and 'localhost' in r.url else None))
            pg.on('request',lambda r:reqs.add(r.url.split('/',3)[-1]) if 'localhost' in r.url else None)
            pg.add_init_script(CLS_JS)
            pg.goto(url); pg.wait_for_timeout(3600)
            cls_load=pg.evaluate('window.__cls')
            tot=walk(pg,H)
            cls_all=pg.evaluate('window.__cls')
            pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1500)
            shot=pg.screenshot()
            res[name]=dict(errs=errs,bad=bad,reqs=reqs,h=tot,cls_load=cls_load,cls=cls_all,shot=shot)
            ctx.close()
        print(f'— {W}×{H}')
        for n in res: check(not res[n]['errs'],f'{n}: sin errores JS {res[n]["errs"][:2]}'); check(not res[n]['bad'],f'{n}: sin respuestas 4xx {res[n]["bad"][:3]}')
        check(res['raiz']['reqs']==res['public']['reqs'],f'mismos recursos ({len(res["raiz"]["reqs"])}) dif={res["raiz"]["reqs"]^res["public"]["reqs"]}')
        check(res['raiz']['h']==res['public']['h'],f'mismo alto {res["raiz"]["h"]} / {res["public"]["h"]}')
        from PIL import Image, ImageChops; import io
        a=Image.open(io.BytesIO(res['raiz']['shot'])).convert('RGB'); c=Image.open(io.BytesIO(res['public']['shot'])).convert('RGB')
        d=ImageChops.difference(a,c).convert('L').point(lambda v:255 if v>8 else 0); frac=sum(d.histogram()[255:])/(a.width*a.height)
        check(frac<0.002,f'captura de portada igual (píxeles distintos {frac:.4%}, solo animación del indicador)')
        for n in res: check(res[n]['cls']<0.01,f'{n}: CLS carga {res[n]["cls_load"]:.4f} · recorrido {res[n]["cls"]:.4f}')
    # desborde horizontal
    for W in (390,1280,1366,1440,1536,1920):
        pg=b.new_page(viewport={'width':W,'height':860}); pg.goto(PUB); pg.wait_for_timeout(2600); walk(pg,860)
        ov=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
        check(ov<=0,f'{W}px sin desborde horizontal ({ov})'); pg.close()
    # idioma
    pg=b.new_page(viewport={'width':1366,'height':800}); pg.goto(PUB); pg.wait_for_timeout(3600)
    pg.click('#lang'); pg.wait_for_timeout(400)
    st=pg.evaluate("({lang:document.documentElement.lang,title:document.title,book:document.querySelector('.nav__book').textContent,alt:document.querySelector('.casa__img').alt,meta:document.querySelector('meta[name=description]').content.slice(0,20),aria:document.querySelector('#lang').getAttribute('aria-label'),brand:document.querySelector('.hero__tag').textContent})")
    check(st['lang']=='en' and st['book']=='Book' and st['alt'].startswith('A set table') and st['meta'].startswith('Restaurant A MAR, se') and 'Spanish' in st['aria'] and st['aria'].startswith('ES'),f'inglés aplicado {st}')
    check(st['brand']=='Cocina de Mar… y Tierra','texto de marca queda en su idioma')
    pg.evaluate("document.querySelector('#resenas').scrollIntoView()"); pg.wait_for_timeout(2500)
    sw=pg.evaluate("(()=>{const s=document.querySelector('#resenasSlider');return {init:s.classList.contains('swiper-initialized'),role:s.querySelector('.swiper-wrapper')?.getAttribute('aria-live'),lab:s.querySelector('.swiper-slide')?.getAttribute('aria-label'),desc:s.getAttribute('aria-roledescription')}})()")
    check(sw['init'] and sw['lab']=='1 of 10' and sw['desc']=='carousel',f'Swiper en inglés {sw}')
    pg.evaluate("document.querySelector('#lang').click()"); pg.wait_for_timeout(600)
    st=pg.evaluate("({lang:document.documentElement.lang,book:document.querySelector('.nav__book').textContent,lab:document.querySelector('#resenasSlider .swiper-slide').getAttribute('aria-label')})")
    check(st=={'lang':'es','book':'Reservar','lab':'1 de 10'},f'vuelta a español {st}')
    # menú
    pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(800)
    pg.click('#menuBtn'); pg.wait_for_timeout(1200)
    m=pg.evaluate("({open:!document.querySelector('#menu').hidden,inert:document.querySelector('main').inert,focus:document.activeElement.id,exp:document.querySelector('#menuBtn').getAttribute('aria-expanded'),first:document.querySelector('#menu').firstElementChild.id})")
    check(m['open'] and m['inert'] and m['focus']=='menuClose' and m['exp']=='true' and m['first']=='menuClose',f'menú abre como diálogo {m}')
    for _ in range(12): pg.keyboard.press('Tab')
    check(pg.evaluate("document.querySelector('#menu').contains(document.activeElement)"),'el foco queda atrapado en el menú')
    pg.keyboard.press('Escape'); pg.wait_for_timeout(1000)
    m=pg.evaluate("({hidden:document.querySelector('#menu').hidden,inert:document.querySelector('main').inert,focus:document.activeElement.id})")
    check(m=={'hidden':True,'inert':False,'focus':'menuBtn'},f'Escape cierra y devuelve el foco {m}')
    pg.click('#menuBtn'); pg.wait_for_timeout(1100); pg.click('.menu__nav a[href="#horario"]'); pg.wait_for_timeout(2600)
    m=pg.evaluate("({top:Math.round(document.querySelector('#horario').getBoundingClientRect().top),focus:document.activeElement.id})")
    check(abs(m['top'])<40 and m['focus']=='horario-h',f'enlace del menú navega y enfoca {m}')
    # salto al contenido
    pg.reload(); pg.wait_for_timeout(3600); pg.keyboard.press('Tab'); pg.keyboard.press('Enter'); pg.wait_for_timeout(2200)
    check(pg.evaluate('document.activeElement.id')=='main','saltar al contenido mueve el foco')
    # quiebre móvil/escritorio
    pg.evaluate("document.querySelector('#apertura').scrollIntoView()"); pg.wait_for_timeout(1500)
    pg.set_viewport_size({'width':820,'height':1180}); pg.wait_for_timeout(2500)
    r=pg.evaluate("(()=>{const r=document.querySelector('#apertura').getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]})()")
    check(r[0]<=60 and r[1]>0,f'al cruzar 900 px se conserva la sección {r}')
    pg.close()
    # movimiento reducido
    ctx=b.new_context(viewport={'width':1366,'height':800},reduced_motion='reduce'); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(PUB); pg.wait_for_timeout(1500)
    r=pg.evaluate("""(()=>{const hidden=[...document.querySelectorAll('h1,h2,h3,p,figure,img,.line>span')].filter(e=>{const s=getComputedStyle(e);return s.visibility==='hidden'||+s.opacity<0.05||(s.transform!=='none'&&e.matches('.line>span'))}).map(e=>e.className||e.tagName);
      const v=document.querySelector('.frescos__view');return {hidden:hidden.slice(0,8),n:hidden.length,scroll:getComputedStyle(v).overflowX,pre:!!document.querySelector('#pre'),claim:getComputedStyle(document.querySelector('.hero__claim')).visibility}})()""")
    check(r['n']==0 and r['scroll']=='auto' and not r['pre'] and r['claim']=='visible' and not errs,f'movimiento reducido: todo visible, galería nativa {r} {errs}')
    ctx.close(); b.close()
print('\nRESULTADO:', 'OK' if ok else 'HAY FALLAS'); sys.exit(0 if ok else 1)

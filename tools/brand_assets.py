"""F05 — logotipo (Italiana a trazos con fontTools) + variantes, favicons y PNG."""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import os
F=TTFont('brand/logo/_italiana.woff'); gs=F.getGlyphSet(); cmap=F.getBestCmap(); upm=F['head'].unitsPerEm
asc=F['OS/2'].sCapHeight or 700
ISO_H, ISO_D = open('brand/logo/_isotipo.path').read().split('\n',1)
ISO_H=float(ISO_H)
def word(txt,x0,track=40):
    pen=SVGPathPen(gs); x=x0
    for ch in txt:
        g=cmap[ord(ch)]
        tp=TransformPen(pen,(1,0,0,-1,x,asc)); gs[g].draw(tp); x+=gs[g].width+track
    return pen.getCommands(), x-track
def logotipo(fg,iso,stroke=6):
    # A  [iso]  MAR — proporciones medidas en IG-19: iso ≈ 0.62 de la altura de mayúscula, separaciones ≈ 0.55 cap
    a,xa=word('A',0)
    gap=asc*0.30; ih=asc*0.80; iw=ih*100/ISO_H
    ix=xa+gap; iy=(asc-ih)/2
    m,xm=word('MAR',ix+iw+gap)
    W=xm; s=ih/ISO_H
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-stroke} {-stroke} {W+2*stroke:.0f} {asc+2*stroke:.0f}" role="img" aria-label="A MAR">'
            f'<path d="{a}{m}" fill="{fg}" stroke="{fg}" stroke-width="{stroke}" stroke-linejoin="round"/>'
            f'<path transform="translate({ix:.1f} {iy:.1f}) scale({s:.4f})" fill="{iso}" d="{ISO_D}"/></svg>'), W, asc
def vertical(fg,iso,stroke=6):
    m,xm=word('A MAR'.replace(' ',''),0)  # placeholder not used
    a,xa=word('A',0); m2,xm2=word('MAR',xa+asc*0.9)
    W=xm2; ih=asc*1.2; iw=ih*100/ISO_H; ix=(W-iw)/2; s=ih/ISO_H
    H=ih+asc*0.55+asc
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-stroke} {-stroke} {W+2*stroke:.0f} {H+2*stroke:.0f}" role="img" aria-label="A MAR">'
            f'<path transform="translate({ix:.1f} 0) scale({s:.4f})" fill="{iso}" d="{ISO_D}"/>'
            f'<path transform="translate(0 {ih+asc*0.55:.1f})" d="{a}{m2}" fill="{fg}" stroke="{fg}" stroke-width="{stroke}" stroke-linejoin="round"/></svg>')
os.makedirs('brand/logo',exist_ok=True)
for name,fg,iso in [('logotipo-claro','#f4efe7','#42c0ef'),('logotipo-oscuro','#0d0e10','#2f9fd0'),('logotipo-blanco','#ffffff','#ffffff')]:
    open(f'brand/logo/{name}.svg','w').write(logotipo(fg,iso)[0])
for name,fg,iso in [('vertical-claro','#f4efe7','#42c0ef'),('vertical-oscuro','#0d0e10','#2f9fd0')]:
    open(f'brand/logo/{name}.svg','w').write(vertical(fg,iso))
# favicon: isotipo cian sobre noche, cuadrado redondeado
fav=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0d0e10"/>'
     f'<path transform="translate(20 {64-ISO_H*0.88/2:.1f}) scale(0.88)" fill="#42c0ef" d="{ISO_D}"/></svg>')
open('brand/logo/favicon.svg','w').write(fav)
print('ok')

"""F05 — isotipo: máscara del isotipo blanco sobre la franja azul del textil (IG-13), potrace, SVG normalizado."""
import glob, numpy as np, potrace
from PIL import Image, ImageFilter
im=Image.open(glob.glob('assets/raw/ig/amar_ig_13_*.jpg')[0]).convert('RGB').crop((280,480,500,700))
S=8
im=im.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.GaussianBlur(S*0.9))
a=np.asarray(im).astype(int)
mask=(a.sum(2)>450)
from skimage.measure import label
lab=label(mask); keep=np.zeros_like(mask)
H,W=mask.shape
for k in range(1,lab.max()+1):
    m=lab==k; ys,xs=np.nonzero(m)
    if m.sum()<20000: continue
    if ys.min()<5 or xs.min()<5 or ys.max()>H-6 or xs.max()>W-6: continue
    keep|=m
mask=keep
# keep largest blobs inside blue band only (blue band row range approx)
bm=potrace.Bitmap(mask)
path=bm.trace(turdsize=400,alphamax=1.2,opticurve=True,opttolerance=0.4)
xs=[];ys=[];d=[]
for c in path:
    pts=[c.start_point]+[sg.end_point for sg in c.segments]
    if max(p.x for p in pts)-min(p.x for p in pts)>W*0.97 and max(p.y for p in pts)-min(p.y for p in pts)>H*0.97: continue
    s=c.start_point; d.append(f'M{s.x:.1f} {s.y:.1f}')
    for seg in c.segments:
        if seg.is_corner: d.append(f'L{seg.c.x:.1f} {seg.c.y:.1f}L{seg.end_point.x:.1f} {seg.end_point.y:.1f}')
        else: d.append(f'C{seg.c1.x:.1f} {seg.c1.y:.1f} {seg.c2.x:.1f} {seg.c2.y:.1f} {seg.end_point.x:.1f} {seg.end_point.y:.1f}')
        for p in ([seg.c] if seg.is_corner else [seg.c1,seg.c2])+[seg.end_point]: xs.append(p.x);ys.append(p.y)
    d.append('Z')
x0,y0,x1,y1=min(xs),min(ys),max(xs),max(ys)
print(len(path),'curvas bbox',x0,y0,x1,y1)
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0-4:.0f} {y0-4:.0f} {x1-x0+8:.0f} {y1-y0+8:.0f}"><path fill="currentColor" fill-rule="evenodd" d="{"".join(d)}"/></svg>'
open('brand/logo/_isotipo_trace.svg','w').write(svg)

# normalizar a ancho 100
import re as _re
k=100/(x1-x0)
def tr(m):
    nums=[float(v) for v in m.group(0)[1:].split()]
    out=[]
    for i,v in enumerate(nums): out.append(f'{(v-(x0 if i%2==0 else y0))*k:.2f}'.rstrip('0').rstrip('.'))
    return m.group(0)[0]+' '.join(out)
dd=_re.sub(r'[MLC][-\d. ]+',tr,''.join(d))
h=(y1-y0)*k
open('brand/logo/_isotipo.path','w').write(f'{h:.2f}\n{dd}')
iso=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 {h:.2f}"><path fill="#42c0ef" d="{dd}"/></svg>'
open('brand/logo/isotipo.svg','w').write(iso)
open('brand/logo/isotipo-blanco.svg','w').write(iso.replace('#42c0ef','#f4efe7'))
open('brand/logo/isotipo-noche.svg','w').write(iso.replace('#42c0ef','#0d0e10'))
print('isotipo h',h, len(dd))

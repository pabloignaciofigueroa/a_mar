"""F07 v2 — recortes, grade "noche cálida" y WebP (sin agrandar) + LQIP en assets/img/meta.json.

Grade y recortes: _plan/v2/04-imagenes.md (tools/grade.py → amar()). Nada se escala por encima de la fuente,
salvo el héroe de escritorio, que se pre-escala a 1920 con Lanczos + máscara de enfoque suave.
"""
import glob, json, base64, io, pathlib, sys
from PIL import Image, ImageFilter
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from grade import amar  # noqa: E402

R = 'assets/raw/ig/'
OUT = pathlib.Path('assets/img')

# id: (ig, ratio, foco x, foco y, zoom, opciones de grade)
SPECS = {
    'hero-d':       ('08', (16, 9), .47, .40, 1.0, {}),
    'hero-m':       ('08', (9, 16), .50, .50, 1.0, {}),
    'ostras':       ('05', (4, 5), .52, .60, 1.0, {}),
    'ostras-det':   ('05', (3, 4), .66, .62, 2.0, {}),
    'erizos':       ('07', (4, 5), .50, .45, 1.0, {}),
    'erizos-det':   ('07', (1, 1), .50, .40, 2.0, {}),
    'sorrentinos':  ('06', (4, 5), .50, .55, 1.0, {}),
    'pulpo-chapa':  ('08', (4, 5), .60, .64, 1.0, {}),
    'pulpo-gallega':('10', (4, 5), .45, .66, 1.0, {}),
    'murta':        ('14', (16, 9), .62, .48, 1.0, {'warm': 1.0}),
    'murta-m':      ('14', (4, 5), .62, .45, 1.0, {'warm': 1.0}),
    'barra':        ('17', (3, 4), .60, .45, 1.0, {}),
    'salon':        ('03', (16, 9), .50, .50, 1.0, {'warm': 1.04}),
    'cocina':       ('01', (4, 5), .55, .35, 1.0, {}),
    'mesa':         ('11', (4, 5), .45, .60, 1.0, {}),
    'fachada':      ('12', (4, 5), .50, .55, 1.0, {'cyan': 0.0}),
    'calas':        ('00', (4, 5), .40, .40, 1.4, {}),
    'espejo':       ('16', (4, 5), .55, .50, 1.0, {}),
}


def crop(im, ratio, fx, fy, zoom=1.0):
    W, H = im.size
    rw, rh = ratio
    if W / H > rw / rh:
        ch = H / zoom; cw = ch * rw / rh
    else:
        cw = W / zoom; ch = cw * rh / rw
    x0 = min(max(fx * W - cw / 2, 0), W - cw)
    y0 = min(max(fy * H - ch / 2, 0), H - ch)
    return im.crop((round(x0), round(y0), round(x0 + cw), round(y0 + ch)))


def save(im, path, q=80):
    im.save(path, 'WEBP', quality=q, method=6)
    return {'path': path.as_posix(), 'w': im.width, 'h': im.height}


OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob('*.webp'):
    old.unlink()
meta = {}
for k, (ig, ratio, fx, fy, zoom, g) in SPECS.items():
    src = Image.open(glob.glob(R + f'amar_ig_{ig}_*.jpg')[0]).convert('RGB')
    im = amar(crop(src, ratio, fx, fy, zoom), **g)
    W = im.width
    variants = []
    if k == 'hero-d':
        big = im.resize((1920, 1080), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=2))
        variants.append(save(big, OUT / f'{k}-1920.webp', 78))
        variants.append(save(im.resize((960, 540), Image.LANCZOS), OUT / f'{k}-960.webp', 80))
    else:
        native = im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=40, threshold=2))
        variants.append(save(native, OUT / f'{k}-{W}.webp', 82))
        half = round(W / 2)
        if half >= 300:
            sm = im.resize((half, round(im.height * half / W)), Image.LANCZOS)
            variants.append(save(sm, OUT / f'{k}-{half}.webp', 80))
    variants.sort(key=lambda v: v['w'])
    t = im.resize((24, max(1, round(24 * im.height / W))), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
    b = io.BytesIO(); t.save(b, 'WEBP', quality=40)
    meta[k] = {'ig': 'IG-' + ig, 'w': variants[-1]['w'], 'h': variants[-1]['h'], 'src': variants,
               'lqip': 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()}
json.dump(meta, open(OUT / 'meta.json', 'w'), indent=1)
print(len(meta), 'imágenes ·', sum(p.stat().st_size for p in OUT.glob('*.webp')) // 1024, 'KB')

#!/usr/bin/env python3
"""Arma index.html desde src/index.html.

- Reemplaza cada <x-img id="…" …> por un <img> responsivo: srcset 800/1800, width/height reales,
  LQIP (fondo borroso), loading/fetchpriority y data-alt-en (tools/alt-en.json).
- Reemplaza <x-iso class="…"/> por el SVG en línea del isotipo.
- Falla si falta un texto alternativo (es o en) o una imagen.
Uso: python3 tools/build.py
"""
import json, re, pathlib, html, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
META = json.loads((ROOT / 'assets/img/meta.json').read_text())
ALT_EN = json.loads((ROOT / 'tools/alt-en.json').read_text())
SRC = (ROOT / 'src/index.html').read_text()
ISO_H, ISO_D = (ROOT / 'brand/logo/_isotipo.path').read_text().split('\n', 1)
errors = []


def attrs(s):
    kv = {k: (a if a else b) for k, a, b in re.findall(r"([\w-]+)=(?:\"([^\"]*)\"|'([^']*)')", s)}
    bare = re.sub(r"[\w-]+=(?:\"[^\"]*\"|'[^']*')", '', s).split()
    return kv | {k: '' for k in bare}


def img(m):
    a = attrs(m.group(1))
    i = a.get('id')
    if i not in META:
        errors.append(f'imagen desconocida: {i}')
        return ''
    meta = META[i]
    alt = a.get('alt')
    if alt is None:
        errors.append(f'falta alt en español: {i}')
        alt = ''
    alt_en = ALT_EN.get(i) if alt else ''
    if alt and not alt_en:
        errors.append(f'falta alt en inglés: {i}')
    s, l = meta['src']['800'], meta['src']['1800']
    srcset = f'{s["path"]} {s["w"]}w' + (f', {l["path"]} {l["w"]}w' if l['w'] > s['w'] else '')
    eager = 'eager' in a
    out = (f'<img class="{a.get("class", "")}" src="{l["path"] if eager else s["path"]}" srcset="{srcset}" '
           f'sizes="{a.get("sizes", "100vw")}" width="{meta["w"]}" height="{meta["h"]}" alt="{html.escape(alt)}"')
    if alt_en:
        out += f' data-alt-en="{html.escape(alt_en)}"'
    out += ' fetchpriority="high"' if eager else ' loading="lazy"'
    out += f' decoding="async" style="background-image:url({meta["lqip"]})"'
    for k, v in a.items():
        if k.startswith('data-'):
            out += f' {k}="{html.escape(v)}"'
    return out + '>'


def iso(m):
    a = attrs(m.group(1))
    return (f'<svg class="{a.get("class", "")}" viewBox="0 0 100 {float(ISO_H):.2f}" aria-hidden="true" focusable="false">'
            f'<path d="{ISO_D}"/></svg>')


out = re.sub(r'<x-img\s+([^>]*?)\s*/?>', img, SRC)
out = re.sub(r'<x-iso\s*([^>]*?)\s*/?>', iso, out)
out = out.replace('{{ISO_D}}', ISO_D).replace('{{ISO_H}}', f'{float(ISO_H):.2f}')
if re.search(r'<x-(img|iso)', out):
    errors.append('quedaron etiquetas <x-…> sin reemplazar')
if errors:
    print('build.py: ERROR', *errors, sep='\n  ', file=sys.stderr)
    sys.exit(1)
(ROOT / 'index.html').write_text(out)
print('index.html listo', len(out) // 1024, 'KB')

# A MAR — web regalo

Sitio de muestra para **Restaurant A MAR** (Stripcenter Gamboa, local 109, Castro, Chiloé), hecho solo con su material público: Instagram @amar_chiloe, sus destacadas y piezas, y reseñas de Google y Tripadvisor.

**En línea:** https://amarchiloe.pages.dev

## Cómo editar
1. Cambiar la plantilla `src/index.html`, los estilos `css/main.css` o el movimiento `js/main.js`.
2. `python3 tools/build.py` — arma `index.html` (imágenes responsivas, LQIP, textos alternativos en inglés de `tools/alt-en.json`).
3. `python3 tools/publish.py` — regenera `public/`, lo único que se publica. Falla si se cuela algo interno, si falta un archivo o si alguno pesa más de 25 MB.
4. `python3 tools/qa.py` (opcional) — pruebas automáticas sirviendo la raíz en :8811 y `public/` en :8812.
5. Commit y push a `main`. Cloudflare Pages publica `public/` sin build.

## Estructura
- `src/` plantilla · `css/` `js/` `vendor/` `assets/` `brand/` lo que usa el sitio · `public/` lo que se publica.
- `content/` guion y voz de marca (con la fuente de cada texto) · `brand/*.md` tipografía, paleta y dirección de arte · `_plan/` plan y bitácora · `tools/` scripts.
- `assets/raw/` (fuera de git) originales descargados de Instagram.

## Cloudflare Pages
Project name `amarchiloe` · Production branch `main` · Framework preset None · Build command vacío · Build output directory `public`.

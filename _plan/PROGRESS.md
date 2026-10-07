# Progreso

estado: en curso
fase_actual: 17
inicio_ejecucion: 2026-10-07 17:40 (UTC-3)

## Bitácora
- 17:40 — Repo vacío clonado, `main` única. Dominio fijado amarchiloe.pages.dev (libre).
- 17:55 — F01: 20 posts + 3 destacadas descargados desde Instagram (API web del perfil, sesión de Pablo) a assets/raw/ig (fuera de git) y a la carpeta del PC.
- 18:20 — F02 voz y reseñas: Google 5,0 (9; vista de Google Search porque Maps estaba en vista limitada), Tripadvisor 4,5 (4), nota de NiTanRetro FM. content/brand-voice.md.
- 18:35 — F03 Italiana (logotipo) + Gelasio (láminas, equivalente libre de Georgia). F04 paleta k-means con tokens noche/ola/espuma/terrazo/mimbre/azulejo/petróleo/cobre, contraste calculado. F05 isotipo trazado con potrace desde el textil (IG-13), logotipo a trazos con fontTools, favicons, OG 1200×630 (88 KB).
- 18:50 — F06 content/copy.md (cada texto con fuente). F07 18 imágenes WebP 800/1800 + LQIP. F08 brand/art-direction.md (memorable: la ola del logotipo se vuelve ventana al salón).
- 19:40 — F09–F16: src/index.html, css/main.css, js/main.js, tools/build.py, tools/publish.py (copiado de floresta; probado: falla con interno en public/, archivo faltante y archivo de 26 MB). Vendor GSAP 3.15, ScrollTrigger, Lenis 1.3.26, Swiper 11.2.10 (diferido), Leaflet 1.9.4 (diferido).
- 20:10 — F17–F18: tools/qa.py en verde (raíz vs public/ en 1536 y 390: mismos 33 recursos, mismo alto, cero 4xx, cero errores JS, CLS 0,0000 carga y recorrido; sin desborde en 390–1920; idioma ES/EN con Swiper re-armado; menú dialog con foco atrapado, Escape, inert; salto al contenido; quiebre 900 px conserva la sección; movimiento reducido todo visible). Lighthouse local sin compresión: Perf 87 · A11y 100 · BP 100 · SEO 100. grep vercel/github.io vacío.

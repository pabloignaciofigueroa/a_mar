# Progreso

estado: publicado
fase_actual: 20
inicio_ejecucion: 2026-10-07 17:40 (UTC-3)

## Bitácora
- 17:40 — Repo vacío clonado, `main` única. Dominio fijado amarchiloe.pages.dev (libre).
- 17:55 — F01: 20 posts + 3 destacadas descargados desde Instagram (API web del perfil, sesión de Pablo) a assets/raw/ig (fuera de git) y a la carpeta del PC.
- 18:20 — F02 voz y reseñas: Google 5,0 (9; vista de Google Search porque Maps estaba en vista limitada), Tripadvisor 4,5 (4), nota de NiTanRetro FM. content/brand-voice.md.
- 18:35 — F03 Italiana (logotipo) + Gelasio (láminas, equivalente libre de Georgia). F04 paleta k-means con tokens noche/ola/espuma/terrazo/mimbre/azulejo/petróleo/cobre, contraste calculado. F05 isotipo trazado con potrace desde el textil (IG-13), logotipo a trazos con fontTools, favicons, OG 1200×630 (88 KB).
- 18:50 — F06 content/copy.md (cada texto con fuente). F07 18 imágenes WebP 800/1800 + LQIP. F08 brand/art-direction.md (memorable: la ola del logotipo se vuelve ventana al salón).
- 19:40 — F09–F16: src/index.html, css/main.css, js/main.js, tools/build.py, tools/publish.py (copiado de floresta; probado: falla con interno en public/, archivo faltante y archivo de 26 MB). Vendor GSAP 3.15, ScrollTrigger, Lenis 1.3.26, Swiper 11.2.10 (diferido), Leaflet 1.9.4 (diferido).
- 20:10 — F17–F18: tools/qa.py en verde (raíz vs public/ en 1536 y 390: mismos 33 recursos, mismo alto, cero 4xx, cero errores JS, CLS 0,0000 carga y recorrido; sin desborde en 390–1920; idioma ES/EN con Swiper re-armado; menú dialog con foco atrapado, Escape, inert; salto al contenido; quiebre 900 px conserva la sección; movimiento reducido todo visible). Lighthouse local sin compresión: Perf 87 · A11y 100 · BP 100 · SEO 100. grep vercel/github.io vacío.
- 20:45 — F19 auditoría independiente (dos agentes). Voz y datos: fechas de la bitácora corregidas a hora de Chile (28 abr, 29 abr "Salud!" repuesto, 30 abr, 08 may), rótulo de la galería "En Instagram" (sin coletilla inventada), "✨Apertura✨…" con elipsis, notas 5.0/4.5 en inglés, meta description con frases de la bio, alt corregidos (chapaleles, letrero, espejo), A🩵MAR sin cortar, "Reservas" legible, atribución de Leaflet sin prefijo en inglés. Código: sin GSAP la página pasa a modo estático completo; máscara medida sobre el contenedor sin transformar (calza 182/182 px); iPad horizontal→vertical conserva Reseñas/Horario/Visítanos (Lenis resize + force); entrada de portada protegida; foco con Tab en la galería horizontal la desplaza; foco del carrusel no se pierde al final; mapa inert hasta cargar teselas y se retira a los 5 s si no cargan; precarga se oculta sola a los 7 s si falla el JS; movimiento reducido con la marca primero; contraste de pies de reseña (petróleo) y anillo de foco oscuro en secciones claras; estado en vivo solo se reescribe si cambia; cinta pausada fuera de pantalla y con módulo. qa.py ampliado (iPad en 3 secciones, máscara, sin GSAP): todo en verde.
- 21:10 — F20 publicado en Cloudflare Pages por la vía de Pages (Import an existing Git repository): Project name `amarchiloe`, rama `main`, preset None, sin build command, salida `public`. En línea: https://amarchiloe.pages.dev
  - Rutas internas probadas en línea (README.md, _plan/*, content/*, assets/img/meta.json, src/index.html, tools/*.py, tools/alt-en.json, brand/*.md, brand/logo/_isotipo.path, _italiana.woff, assets/raw/ig/*, dossier/, .gitignore, public/index.html): todas devuelven el mismo cuerpo que una ruta inventada (fallback a index.html); ninguna se publica.
  - 52 URLs de imagen (src + srcset) responden image/*; 21 <img> con naturalWidth > 0. og:image y og:url en amarchiloe.pages.dev; /assets/og.jpg responde image/jpeg (88 KB). Caché de _headers activa.
  - GitHub: check "Cloudflare Pages" success en 524ba3c; solo rama `main`, predeterminada. Repo público.
  - Pendiente: Pablo confirma con captura la miniatura al compartir en WhatsApp.

## v2 (07-10-2026, noche)
- Pablo rechazó v1 ("sin glamour"; platos y reseñas deben mandar; fuera la inauguración; "amor" repetido). Cinco agentes (rubro, diseño, carta, imágenes, ghostwriter) → _plan/v2/ y ESTRATEGIA.md. Pablo aprobó: portada con el pulpo; el logo entra y la ola abre la página, el logo se queda (la ola no se repite entre platos); orden aprobado.
- Construido: portada IG-08 con grade y ola SVG; cita Alejandra; 5 pantallas de platos apiladas con sticky; murta a sangre; carta (Entradas/Principales de su carta impresa en IG-00); reseñas con "5,0" que cuenta; casa; reservar; visítanos compacto sin mapa; barra inferior móvil. Tipografía Italiana + Newsreader + Jost. Swiper y Leaflet fuera.
- Auditoría independiente v2 (2 agentes) corregida: recarga a mitad de página (triggers once → toggleActions), móvil bajo y horizontal, nota al cambiar idioma, rotación iPad Pro, contraste sobre fotos, foco oculto, LCP (la intro ya no espera la foto para el logo), sizes, zona segura, aria-pressed en la carta, alts, JSON-LD.
- tools/qa.py v2 en verde.

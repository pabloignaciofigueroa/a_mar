# 04 · Imágenes: selección, recortes, grade y movimiento

Editor de imagen. Revisé las 20 fotos del feed y las 3 portadas de destacadas, al tamaño original y en recortes al 100 %. Las pruebas están en `_plan/v2/fotos/` (el resto en `/tmp/claude-0/fotos/`). El grade se puede reproducir con `_plan/v2/fotos/grade.py` (función `amar()` y `crop()`).

Regla de lectura de este documento: **"Nítido 2x"** es el ancho CSS máximo con el que la foto se ve nítida en pantallas retina (px de la fuente ÷ 2). **"Tope 1x"** es el ancho CSS en que se ve bien en un monitor normal y aceptable (algo blanda) en retina. Pasar del tope solo se permite cuando la mayor parte del cuadro ya está desenfocada (bokeh), porque ahí el escalado se lee como profundidad de campo y no como falta de resolución.

---

## 1. Diagnóstico y ranking

Todas son de celular, cuadradas, JPEG de Instagram (compresión visible al 100 %). Las de 1440 px (IG-14 a 18) **no** tienen más detalle real: IG-14 e IG-15 pasaron por el modo retrato y quedaron muy suavizadas (su resolución útil equivale a unos 900–1000 px).

| # | Foto | Px | Calidad real | Rol | Nota |
|---|---|---|---|---|---|
| 1 | **IG-08** pulpo y chapaleles a la chapa | 1080 | Foco nítido en el pulpo, brillo de salsa, fondo nocturno con bokeh de lámparas y comensales. Defectos: tira de neón cian y muro verde lima a la derecha (se corrigen con el grade). | **HÉROE** | La única foto que resiste pantalla completa en escritorio: el 70 % del cuadro ya está desenfocado. |
| 2 | **IG-05** ostras | 1080 | Nítida, cenital a 45°, abundancia, color rico (lima, morado, individual cobre). Leve ruido en las sombras. | Plato protagonista y banda panorámica | El mejor "producto del mar". Admite 16:9 y 21:9 sin perder nada. |
| 3 | **IG-07** erizos en copa | 1080 | Nítida en el erizo, contraste naranja sobre azulejo oscuro. Fondo poco interesante (plato blanco abajo). | Plato protagonista / detalle cerrado | El zoom 2x (540 px) aguanta como detalle. |
| 4 | **IG-06** sorrentinos de centolla | 1080 | Emplatado elegante, plato texturado. Algo blanda; hay que mostrarla más chica. | Plato (4:5) | Su fuerza es el plato completo; no cerrar demasiado. |
| 5 | **IG-10** pulpo a la gallega | 1080 | Luz de día, aceite de pimentón, salón al fondo. Sobreprocesada (HDR del iPhone) y un poco blanda. | Plato secundario / transición plato→salón | Funciona en 4:3 u horizontal. |
| 6 | **IG-17** barra | 1440 | La foto de interior más nítida y cálida: ratán, terrazo, piso verde, sansevieria. | Ambiente principal | Vertical 4:5 o 3:4. |
| 7 | **IG-03** salón | 1080 | Nítida y bien expuesta, pero es una foto "de inmobiliaria" de día. | Banda "el lugar" | 16:9 o 21:9; nunca de héroe. |
| 8 | **IG-14** murta sour (4 copas) | 1440 | Composición bonita (diagonal, sombras de copas), pero muy suavizada. | Bebida, tamaño medio | No pasar de unos 560 px CSS. |
| 9 | **IG-15** espumante en mano | 1440 | Cálida y todo desenfocado salvo la copa; mano poco fina. | **Fondo de reseñas** (con velo) | Ideal detrás de texto: el bokeh no compite. |
| 10 | **IG-12** fachada nocturna | 1080 | Nítida, letrero iluminado. | Ubicación (secundario) | No aplicarle la reducción de cian (es el isotipo). |
| 11 | **IG-11** mesa / ventanal | 1080 | Ángulo bajo, copas en primer plano, panel con logo. Correcta, sin fuerza. | Relleno de ambiente | |
| 12 | **IG-16** espejo y azulejo | 1440 | Textura bella (azulejo ondulado y aro de madera), algo blanda. | Textura / fondo | |
| 13 | **IG-01** cocina abierta, lámparas de calor | 1080 | Fría, recargada, perspectiva torcida. | "Cocina" en pequeño | Recorte en la franja de lámparas. |
| 14 | **IG-18** individual estampado | 1440 | Logo blanco **sobreimpreso** en el centro. | Solo la franja inferior (textura) | |
| 15 | **IG-13** textil floral | 1179 | Franja con el logo cruzando el centro. | Textura (mitad superior o inferior) | |
| 16 | **IG-00** calas y carta | 1080 | Bonita luz, pero la carta tiene texto y logo. | Detalle de calas (recorte) | Opcional. |
| 17 | IG-09 rosas y cartel "Abierto" | 1080 | Lenguaje de inauguración. | Descarte (o rosas sueltas) | |
| — | IG-02 cartel de horario | 1080 | Es información. | Descarte como foto | El horario se compone en texto. |
| — | IG-04 manos doradas con logo | 1080 | Corazón más logo: es el juego AMOR / A MAR que Pablo rechazó. | **Descarte** | |
| — | IG-19 logo sobre negro | 553 | Está el SVG. | **Descarte** | |
| — | Destacadas hl_0, hl_1 y hl_2 | 640 / 1179×2096 | Stickers, flechas y texto de Instagram encima. | **Descarte** | De hl_1 solo se salvan las rosas (x0–680, y0–640). |

**Serie útil para la web: IG-08, 05, 07, 06, 10, 17, 03, 14, 15** (y 12, 11, 16, 13, 18 de apoyo). Son 6 platos y bebidas, y basta para que la cocina protagonice.

---

## 2. Recortes por foto

Las cajas están en px de la imagen original (x, y, ancho × alto). El foco va en % del cuadrado original y sirve como `object-position` cuando el recorte lo hace CSS.

| Foto | Formato | Foco | Caja | Nítido 2x | Tope 1x | Uso |
|---|---|---|---|---|---|---|
| IG-08 | **16:9** | 47 %, 50 % | x0 y236 1080×607 | 540 | 1080 · **hasta 1920 solo como héroe** (bokeh) | Héroe escritorio |
| IG-08 | 4:5 | 47 %, 50 % | x75 y0 864×1080 | 432 | 864 (alto 1080) | Héroe partido / tablet |
| IG-08 | 9:16 | 50 %, 50 % | x236 y0 607×1080 | — | 100 svh en teléfono | Héroe móvil (entra todo el pulpo y la lámpara) |
| IG-05 | 16:9 | 50 %, 62 % | x0 y365 1080×607 | 540 | 1080 | Banda de platos |
| IG-05 | **21:9** | 50 %, 62 % | x0 y438 1080×462 | 540 | 1080 | Banda panorámica de corte |
| IG-05 | 4:5 | 52 %, 60 % | x129 y0 864×1080 | 432 | 864 | Plato protagonista |
| IG-05 | 3:4 detalle (zoom 2) | 66 %, 62 % | x510 y399 405×540 | 200 | 400 | Detalle junto al grande |
| IG-07 | 4:5 | 50 %, 45 % | x108 y0 864×1080 | 432 | 864 | Plato |
| IG-07 | 3:4 | 50 %, 42 % | x135 y0 810×1080 | 405 | 810 | Mosaico |
| IG-07 | 1:1 detalle (zoom 2) | 50 %, 40 % | x270 y162 540×540 | 270 | 540 | Detalle cerrado de textura |
| IG-06 | 4:5 | 50 %, 55 % | x108 y0 864×1080 | 432 | **720** (es blanda) | Plato |
| IG-06 | 1:1 (zoom 1,8) | 53 %, 53 % | x272 y272 600×600 | 300 | 480 | Detalle |
| IG-10 | 4:3 | 47 %, 68 % | x0 y270 1080×810 | 540 | 900 | Plato con salón al fondo |
| IG-10 | 4:5 | 45 %, 62 % | x54 y0 864×1080 | 432 | 720 | Vertical, con copa y sillas |
| IG-17 | 4:5 | 55 %, 50 % | x216 y0 1152×1440 | 576 | 1152 | Ambiente |
| IG-17 | 3:4 | 60 %, 45 % | x324 y0 1080×1440 | 540 | 1080 | Ambiente (sillas y planta) |
| IG-03 | 16:9 | 50 %, 50 % | x0 y236 1080×607 | 540 | 1080 | Banda "el lugar" |
| IG-03 | 21:9 | 50 %, 45 % | x0 y254 1080×462 | 540 | 1080 | Banda fina |
| IG-14 | 4:5 | 62 %, 45 % | x288 y0 1152×1440 | 450* | **560*** | Bebida (*resolución útil menor) |
| IG-15 | 16:9 | 50 %, 45 % | x0 y243 1440×810 | — | pantalla completa **con velo** | Fondo de reseñas |
| IG-15 | 4:5 | 42 %, 50 % | x28 y0 1152×1440 | 400* | 560* | Brindis |
| IG-12 | 4:5 | 50 %, 60 % | x108 y0 864×1080 | 432 | 640 | Bloque de ubicación |
| IG-11 | 16:9 | 50 %, 55 % | x0 y290 1080×607 | 540 | 900 | Apoyo |
| IG-16 | 4:5 | 55 %, 50 % | x216 y0 1152×1440 | 500 | 900 | Textura entre secciones |
| IG-01 | 16:9 | 55 %, 30 % | x0 y20 1080×607 | 540 | 800 | "Cocina" (lámparas) |
| IG-13 | ≈2,6:1 | superior | x0 y0 1179×455 | — | Banda de textura (fondo) | Sin la franja del logo |
| IG-13 | ≈2,4:1 | inferior | x0 y695 1179×484 | — | Ídem | |
| IG-18 | ≈2,5:1 | inferior | x0 y875 1440×565 | 720 | 1200 | Textura del individual (el logo impreso en el papel es real; el sobreimpreso queda fuera) |
| IG-00 | 4:5 (zoom 1,4) | 40 %, 30 % | x123 y0 617×771 | 300 | 500 | Calas (opcional) |

En **teléfono** (390–430 px CSS, densidad 3) cualquier foto de 1080 px a sangre se ve bien. El problema de resolución es solo de escritorio.

Pruebas revisadas: `/tmp/claude-0/fotos/crop_test_{08,05,06,10}.jpg` (16:9, 4:5 y 9:16 lado a lado), `crops_texturas.jpg`, `detalle_IG07_erizos_zoom2.jpg` y `banda_IG05_21x9.jpg`.

---

## 3. Portada y composiciones

### Portada: IG-08, pulpo y chapaleles a la chapa
- Es comida (lo que Pablo pidió), es de noche, con lámparas de ratán encendidas y comensales desenfocados: muestra **un restaurante vivo**, y eso da el glamour que faltaba. Ninguna otra foto tiene las dos cosas a la vez.
- Es la única que aguanta 100 svh a sangre en escritorio, porque casi todo el cuadro es bokeh. Escalada a 1920 px (×1,78), solo el pulpo se ablanda, y a distancia de lectura se percibe como foco selectivo. Prueba al 100 %: `fotos/04-hero-escalado-1920-al-100.jpg`.
- Cuadro: escritorio en 16:9 (`object-position: 47% 50%`), móvil en 9:16 (`50% 50%`). En los dos entra el pulpo entero más una lámpara. El texto va arriba a la izquierda, sobre la zona oscura del ventanal, con un velo de `--noche` del 0 al 35 % hacia arriba.
- Alternativa si se quiere más "aire" en la portada: héroe partido, con IG-08 en 4:5 de 50 vw × 100 svh a la derecha y el nombre sobre `--noche` a la izquierda (×1,2 de escala: mejor nitidez).
- Descartadas para portada: IG-05 ostras (excelente, pero cenital y sin ambiente; es mejor la segunda foto grande), IG-17 barra (sin comida) e IG-12 fachada (es ubicación).

### Composiciones propuestas (por sección)
1. **Héroe**: IG-08 a sangre. Una sola foto.
2. **Un plato enorme más un detalle, con aire** (`fotos/06-mock-plato-con-aire.jpg`): IG-05 en 4:5 a unos 46 % del ancho (máx. 660 px CSS), detalle 3:4 desplazado hacia abajo (máx. 300 px) y el nombre del plato literal de la carta arriba a la derecha. Fondo `--espuma #f4efe7`. Los márgenes laterales van de 10 a 14 vw: la foto **no** llena el ancho.
3. **Mosaico asimétrico de 3 platos sobre noche** (`fotos/05-mock-mosaico-platos-noche.jpg`): IG-06 en 4:5 grande a la izquierda (600 px), IG-07 en 3:4 arriba a la derecha (390 px) e IG-10 en 4:3 abajo a la derecha (480 px), descalzados en altura (offset de unos 60 px). Fondo `--noche #0d0e10`, separación de 80 px. En móvil se apilan a ancho completo con 48 px entre fotos.
4. **Banda panorámica 21:9** de IG-05 (u IG-03) entre secciones, a sangre pero a un máximo de 1440 px. Sirve de "respiro" de color.
5. **Díptico de bebidas**: IG-14 (4:5) junto a IG-15 (4:5), a 420–480 px cada una, sobre `--terrazo`.
6. **Reseñas sobre IG-15** a pantalla completa con velo `--noche` al 55–65 % y desenfoque extra opcional de 6 px. La foto queda de ambiente y la cita literal manda. Variante: cada reseña junto al plato que nombra (si la reseña menciona ostras, IG-05 pequeña al lado).
7. **El lugar**: IG-17 en 3:4 más IG-03 en 16:9, en díptico desigual (60/40). La fachada IG-12 va solo en el bloque de ubicación, pequeña (máx. 640 px).
8. **Texturas** (IG-13 e IG-18, en franjas): solo como separadores o fondos de 80–160 px de alto, o como fondo del pie. Nunca detrás de texto largo.

Tamaños de "aire": las fotos de plato ocupan un máximo de 55–60 % del ancho del viewport en escritorio. Padding vertical por sección: 14–18 vh. Las fotos van sin bordes redondeados ni sombras (eso las vuelve "tarjetas").

---

## 4. Grade uniforme ("A MAR noche cálida")

Objetivo: que fotos tomadas a distintas horas (IG-03 de día y fría, IG-15 muy anaranjada, IG-08 con neón cian) parezcan una serie. Antes y después: `fotos/02-grade-antes-despues-IG08.jpg`, `fotos/03-...-IG05.jpg` (más IG-01, 03, 06, 07, 12 y 15 en `/tmp/claude-0/fotos/grade_*.jpg`).

Valores (en orden; implementados en `grade.py → amar()`):

| Paso | Valor | Equivalente en Lightroom (aprox.) |
|---|---|---|
| Temperatura | R ×1,02, B ×0,98 | Temp +4, matiz 0 |
| Curva | S suave al 25 % (smoothstep) | Contraste +12, curva media |
| Cian / azul eléctrico (tono 195° ±35°) | saturación −45 % | HSL Aqua −45, Blue −20 |
| Verde lima (85° ±30°) | saturación −35 % | HSL Yellow −15, Green −35 |
| Saturación global | ×0,95 | Saturación −5, Intensidad +5 |
| Split toning | sombras hacia petróleo (+B), luces hacia ámbar (+R), fuerza 3,5 % | Sombras 215°/8, luces 40°/10 |
| Negro y blanco | negro 14, blanco 242 (mate leve) | Curva: punto negro 14, punto blanco 242 |
| Viñeta | −12 % en bordes, desde el radio 0,4 | Viñeta −10, punto medio 40 |

Excepciones:
- **IG-12 (fachada)**: cian ×0 (sin reducción), porque el isotipo debe seguir azul `--ola`.
- **IG-15 e IG-14**: temperatura 1,00 (ya vienen naranjas).
- **IG-03**: temperatura 1,04 (es la más fría).

No hay que hacer más que esto: nada de LUT "teal & orange", nada de HDR ni de claridad. La comida tiene que verse igual de apetitosa: el grade quita los colores ajenos (neón, muro lima) y empareja los negros.

**Exportación**: aplicar el grade en el archivo (no con `filter:` de CSS) y exportar en AVIF (calidad 55) más WebP (calidad 78) en dos anchos: el nativo del recorte y la mitad. **El héroe** se pre-escala a 1920×1080 con Lanczos más una máscara de enfoque de 1,2 px al 40 % (umbral 2), lo que da mejor resultado que el reescalado bilineal del navegador. Ninguna foto se escala con IA ni se "mejora" con IA (regla de solo material real).

**Grano**: se pone con un overlay de CSS sobre las fotos grandes, nunca dentro del archivo (comprime mal). Va a escala de pantalla, con SVG `feTurbulence` (baseFrequency 0,9), opacidad 0,04–0,06 y `mix-blend-mode: overlay`. Oculta el suavizado del JPEG y del escalado (prueba: tercer panel de `fotos/04`).

---

## 5. Movimiento

**Qué hacer:**
- **Revelado de foto al entrar**: `clip-path: inset(12% 8% 12% 8%)` → `inset(0)`, con la imagen interior en `scale(1.10)` → `1.0`. Duración de 1,0–1,2 s, `cubic-bezier(.2,.7,.1,1)`. La foto termina **reduciéndose** a su escala 1:1, es decir, en su punto más nítido.
- **Ken Burns del héroe**: zoom **hacia afuera** de 1,06 a 1,00 en 14 s, una sola vez (sin bucle), con una deriva de 1 % hacia el foco (47 %, 55 %). Nunca hacia adentro ni por encima de 1,08.
- **Parallax**: solo sobre el héroe y las bandas 21:9, con un desplazamiento máximo de ±40 px (la imagen se sobredimensiona apenas 6–8 %). En las fotos con aire no hay parallax de la imagen: se mueve el bloque de texto (de 30 a 60 px más lento), y así la foto se queda quieta y nítida.
- **Transición entre platos**: secciones `position: sticky` de 100 svh. El plato siguiente sube y tapa al anterior, y el anterior baja a opacidad 0,6 y escala 0,97 en vez de crecer. Se puede alternar el fondo (espuma y noche) para marcar el cambio de "capítulo".
- **Mosaico**: entrada escalonada (60–90 ms entre fotos) con un desplazamiento de 24 px y opacidad. Rápido y suave.
- **Reseñas sobre IG-15**: la foto fija (`background-attachment` emulado con sticky) y las citas pasan por encima con un fundido cruzado de 600 ms.
- Respetar `prefers-reduced-motion`: sin Ken Burns ni parallax, solo fundido.

**Qué evitar (porque delata la baja resolución):**
- Zoom de entrada (scale > 1,08), hover que agranda la foto y lightbox a pantalla completa en escritorio. Si hay ampliación, que tenga un máximo de 1080 px CSS sobre fondo noche y con aire.
- Fotos de plato a sangre en escritorio (salvo el héroe IG-08).
- Recortes de detalle (zoom 2) a más de 540 px CSS.
- `filter: blur()` animado al hacer scroll (cuesta rendimiento) y el sharpen de CSS.
- Carruseles automáticos de fotos: el plato tiene que tener su tiempo.
- Bordes, sombras o esquinas redondeadas que vuelvan "tarjeta" la foto.

---

## 6. Fotos a pedir al cliente (fase 2)

Prioridad alta (lo que falta para que la cocina mande):
1. **Platos de la carta sin foto**: ceviche, tártaro, mejillas, pastel de jaiba, merluza austral, osobuco y entraña (todos aparecen en la carta de IG-00). Cada uno en **dos tomas**, una a 45° con fondo de salón y otra cenital.
2. **Héroe nocturno horizontal**: la mesa de la ventana de noche, con un plato más copa de vino, en **modo horizontal** y con el celular apoyado.
3. **Manos en acción**: el emplatado en el pase bajo las lámparas de calor (IG-01), el servicio del vino, alguien abriendo ostras. Da movimiento sin video.
4. **Video corto real** (de 8 a 12 s, en horizontal y en vertical, a 4K/30): el vapor de un plato, el vino servido, el salón lleno. Permite un héroe en video legítimo.
5. **El mar de Castro o los palafitos** cerca del local, si el cliente lo quiere: en la hora azul, en horizontal.

Cómo tomarlas con celular (instrucciones para el cliente):
- Configurar la **resolución máxima** (iPhone: formato "Más compatible", 48 MP o ProRAW si lo tiene; Android: modo 50 MP o "Pro"). **Enviar los originales** por WhatsApp como *documento* o por Drive, nunca reenviados desde Instagram.
- Tomar **horizontal y vertical** de cada plato, sin recortar en el teléfono.
- Usar **lente 1x o 2x** (no la gran angular 0,5x), con el plato a 40–60 cm.
- Luz: de día, junto al ventanal (luz lateral) y con las luces cenitales apagadas si es posible. De noche, las lámparas de ratán encendidas en el fondo y un plato blanco o una servilleta como rebote.
- **No usar el modo retrato** (suaviza y recorta mal los bordes de las copas), ni filtros, flash, texto o stickers.
- Limpiar el lente. Mantener el teléfono quieto 1 s después de disparar, y en la noche apoyarlo en un vaso o la mesa.
- Fondo: la mesa con su individual (es el sello visual: individual cobre y verde, plato de cerámica y copa).
- Dejar **espacio vacío** a un costado del plato (un tercio del cuadro), para que haya lugar para el texto en la web.

---

## Archivos
- `_plan/v2/fotos/01-hero-IG08-16x9-grade.jpg`: portada con el recorte final y el grade.
- `_plan/v2/fotos/02-grade-antes-despues-IG08.jpg` y `03-grade-antes-despues-IG05.jpg`.
- `_plan/v2/fotos/04-hero-escalado-1920-al-100.jpg`: solo escalado, escalado con máscara de enfoque y escalado con grano.
- `_plan/v2/fotos/05-mock-mosaico-platos-noche.jpg` y `06-mock-plato-con-aire.jpg`.
- `_plan/v2/fotos/grade.py`: grade y recorte reproducibles (`amar(img)` y `crop(img, (w,h), fx, fy, zoom)`).

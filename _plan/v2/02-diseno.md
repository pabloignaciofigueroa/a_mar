# 02 · Dirección de diseño v2 — A MAR

Autor: Director de Diseño. Para: equipo v2 (copy, desarrollo, movimiento, QA).
Base: BRIEF.md, críticas de Pablo, v1 (`_qa/recorrido.jpg`, `_qa/shots/d*.jpg`, `css/main.css`, `brand/*.md`), fotos `assets/raw/ig/`.
Regla madre de la v2: **la comida y las reseñas ocupan el espacio; la marca se nota por cómo se compone todo, no porque el logotipo se repita.**

---

## 1. Diagnóstico de la v1: por qué no tiene glamour

Sin rodeos. La v1 tiene mucha técnica, pero la jerarquía está al revés y la tipografía parece de invitación de matrimonio.

### 1.1 La jerarquía está invertida (es el error de fondo)
- **La comida aparece en la 3.ª o 4.ª pantalla.** `.hero{height:calc(100svh + 150vh)}` deja 2,5 pantallas de logotipo, máscara y "Espacio hecho con Amor" antes del primer plato.
- **Al horario y al mapa se les dio más tamaño que a los platos.** "HORARIO" mide 62 px en negrita itálica (`.lamina__h`), y "Erizos Frescos!" mide 38 px (`.dish__h`). El mapa ocupa 1,2 fr, unos 800 px de ancho; la foto de un plato, máx. 430 px (`.dish{width:clamp(250px,27vw,430px)}`).
- **La primera pantalla ya muestra logística.** `.hero__foot` pone dirección, "Castro - Chiloé" y horario bajo el logotipo (d00). Eso es lo que Pablo llama "como si fuera lo principal".
- **La comida va en tarjetas de 4:5 dentro de un carrusel horizontal sticky** con `max-height:56svh`. Siempre hay un plato cortado por el borde (d05): los platos se leen como miniaturas de Instagram.

### 1.2 Tipografía: un solo registro, y es el de Word
- **Gelasio es un clon métrico de Georgia, en itálica de 15–19 px para todo:** navegación, botones, subtítulos, pies, créditos y estado. No hay contraste de voz. Georgia en itálica es justo la estética de "lámina hecha en casa", que sirve para un post y no para una web premium.
- **Italiana se usa a tamaños medios y casi todos iguales:** casa 112, frescos 104, apertura 108, reseñas 108, visítanos 108. Los cinco titulares miden lo mismo, así que no hay jerarquía ni un momento tipográfico grande.
- **Llevan `-webkit-text-stroke:.006em`, que engorda y ensucia los trazos de pelo.** Italiana solo es elegante cuando sus trazos finos están limpios y a gran tamaño. A 40–60 px con trazo falso se ve barata.
- **Los rótulos de IG se usan tal cual como titulares**, con exclamación y Mayúscula Inicial: "Erizos Frescos!", "Siempre frescos", "Casi Listos!". El texto literal está bien, pero no puede ser el titular de 100 px. Va como pie o firma.
- No existe un sistema de rótulos: no hay versalitas espaciadas, ni numeración, ni datos tabulares. Todo es "frase en itálica".

### 1.3 Color: demasiados fondos
- Hay cinco fondos: noche, espuma, petróleo (cinta), terrazo (reseñas) y fotos oscurecidas. El terrazo beige de las reseñas se lee como plantilla. El lujo se logra con dos colores y fotografía.
- El celeste aparece en la barra de progreso, los focos, el "estado", la cinta y los separadores, y se gasta. Debe ser escaso.

### 1.4 Composición y densidad
- **Casi todo va centrado y simétrico:** portada, lámina, reservar, pie. Así se compone una tarjeta de invitación, no una revista.
- **"La casa" mezcla tres fotos sueltas con `box-shadow`**, que es estética de álbum de recortes. La bitácora en zigzag con miniaturas de 400 px parece web de boda (además, va eliminada).
- Los botones redondos de 58 px del carrusel, `border-radius:2px` en todo y el círculo "Arrastrar" son interfaz genérica de plantilla.

### 1.5 Tratamiento de fotos
- **Se escala lo que ya es de baja resolución:** `.dish__img{transform:scale(1.12)}` en reposo, `.bleed__media{inset:-12% 0}` (+24 % de alto) y `.casa__img` con 116 % de alto. Las fotos de 1080 px nunca se ven a su nitidez real.
- `.bleed::after` oscurece hasta 0,62 y el radial del cierre hasta 0,72: las fotos quedan turbias, sin negros ni blancos limpios.
- Hay mezcla de balances de blanco (IG-08 fría con neón azul, IG-05/06 cálidas, IG-07 verdosa) sin un grado común.
- Los recortes no tienen punto focal: en d05 se corta la base de la copa de erizos y el plato del pulpo a la gallega.

### 1.6 Movimiento: muestrario de efectos, ninguno al servicio de la comida
- Botones magnéticos, cinta *marquee* infinita (cliché de agencia de 2019), cursor "Arrastrar", galería horizontal sticky, máscara del isotipo, línea que se dibuja, masas en parallax y precarga de hasta 7 s (`preOut 0s 7s`). Son ocho trucos, y ninguno hace que un plato se vea mejor.
- El momento memorable (logotipo → máscara → salón) termina en "Espacio hecho con Amor", tras "Puro Amor en A🩵MAR". Ese es el doble "amor" en dos segundos que Pablo rechazó.

---

## 2. Referentes y técnicas a tomar

| Referente | Qué tomar | URL |
|---|---|---|
| Septime (París) | Restricción radical: horario y dirección van como **texto plano en líneas cortas**, sin láminas ni mapas. La logística se resuelve con tipografía. | https://www.septime-charonne.fr/ |
| Qissa (Londres) | Estructura que prioriza platos y reseñas: "Signatures" con foto y nombre, **nota grande (4.8) + "Rated by 410 guests" y luego citas completas con nombre y "Google Review"**. Esa es la jerarquía que pide Pablo. | https://www.qissa.co.uk/ |
| Aman | Poco texto, rótulos pequeños de estado ("Now open") sobre fotos grandes y titulares breves. Lujo por omisión. | https://www.aman.com/ |
| The Drake Hotel / Locomotive | "Atmosphere over amenities": se muestra el ambiente antes que las prestaciones, con estructura editorial de revista y movimiento sutil que da ritmo. | https://locomotive.ca/en/work/the-drake-hotel |
| Awwwards · Hotel/Restaurant (Tandjung Sari, Le Saint Georges, Délice, White Desert, Tengile) | Patrón común entre los premiados: **dos colores (Tandjung Sari: #A62A23 + crema #F1ECDE)**, revelados de imagen al hacer scroll, transiciones y GSAP. | https://www.awwwards.com/websites/restaurant-hotel/ · https://www.awwwards.com/sites/tandjung-sari · https://www.awwwards.com/sites/le-saint-georges · https://www.awwwards.com/sites/delice |
| Codrops — SVG Mask Transitions on Scroll (2026) | Máscara SVG en `viewBox 0 0 100 100` + `preserveAspectRatio="xMidYMid slice"` (cover); formas que se solapan +0,01 para evitar costuras; `power3.out`; reconstruir la línea de tiempo en *resize*. **Es la base técnica del momento memorable (§4.3).** | https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/ |
| Emil Kowalski — The magic of clip-path | Revelado `inset(0 0 100% 0)` → `inset(0)`: va acelerado por GPU y no mueve el layout; 1 s con `cubic-bezier(.77,0,.175,1)`. | https://emilkowal.ski/ui/the-magic-of-clip-path |

Técnicas concretas que adoptamos:
1. **Tipografía editorial a escala real:** un único titular por pantalla a 12–16 vw, con el resto pequeño (11–18 px). Lo que da lujo es el contraste de tamaños, no la cantidad.
2. **Foto a sangre o foto con márgenes, nunca a medias.** Al tamaño máximo nítido (§3.6), o a sangre solo con las fotos de 1440 px y las de ambiente.
3. **Dos colores y fotografía.** Noche y crema; el oro solo en filetes y estrellas; el celeste solo en la ola.
4. **Logística como lista tipográfica,** al estilo Septime.
5. **Reseñas como prensa:** cifra enorme y luego citas grandes con nombre, al estilo Qissa pero con escala editorial.
6. **Revelados con `clip-path: inset()`** en vez de opacidad, y la transición con máscara de ola para el único momento memorable.
7. **Cambio de fondo por sección** (noche ↔ crema) interpolado sobre `body`, en lugar de cortes duros entre bloques de color.

---

## 3. Sistema visual

### 3.1 Tipografía: decisión
- **Italiana se mantiene**, porque es el logotipo, pero se restringe a dos usos: el logotipo y los titulares **≥ 64 px** (idealmente ≥ 96 px). Sin `text-stroke` en titulares; el trazo de 6/1000 em queda solo dentro del SVG del logotipo.
- **Gelasio sale.** Su origen Georgia es justo el registro casero. Si se quiere un guiño, la lámina de horario puede citarse en itálica, pero con la nueva serif.
- **Entra Newsreader** (variable, `opsz` 6–72, `wght` 200–800, con itálica; OFL, @fontsource-variable/newsreader) como serif de texto y de citas. A `opsz` 72 en itálica liviana (300) da citas de revista con trazos finos, coherentes con el contraste de Italiana; a `opsz` 16 da un texto legible.
- **Entra Jost** (variable, OFL, @fontsource-variable/jost) **solo para rótulos**: mayúsculas 500, 11–12 px, interletra 0,22 em. Italiana es un palo seco de alto contraste y Jost es su sobria compañera geométrica. Las versalitas espaciadas ya estaban en sus piezas ("restaurant", "Centro Comercial Gamboa").
- Presupuesto: Italiana 10 KB + Newsreader roman/itálica latin (~60–80 KB en total) + Jost latin (~25 KB). Se precargan Italiana y Newsreader itálica.

### 3.2 Escala tipográfica (tokens)

| Token | Fuente | Tamaño | Interlínea / interletra | Uso |
|---|---|---|---|---|
| `--t-mega` | Italiana 400 | `clamp(72px, 13.5vw, 248px)` | .86 / -.01em | 1 por sección máximo: nombre del plato en la Marea, "5,0" |
| `--t-xl` | Italiana 400 | `clamp(56px, 8.2vw, 148px)` | .9 / 0 | Titulares de sección (Reseñas, Cocina Abierta, Los Esperamos en Chiloé!) |
| `--t-l` | Italiana 400 | `clamp(40px, 4.8vw, 84px)` | .95 / 0 | Titulares secundarios, nombre del día en horario |
| `--t-quote` | Newsreader itálica 300, opsz 72 | `clamp(28px, 3.4vw, 58px)` | 1.12 / -.005em | Cita destacada de reseña |
| `--t-quote-s` | Newsreader itálica 350, opsz 36 | `clamp(21px, 1.9vw, 30px)` | 1.3 | Resto de reseñas |
| `--t-lead` | Newsreader 400, opsz 24 | `clamp(19px, 1.5vw, 24px)` | 1.45 | Bajadas, captions literales de IG |
| `--t-body` | Newsreader 400, opsz 16 | 17px (móvil 16px) | 1.55 | Texto corrido (poco) |
| `--t-label` | Jost 500, MAYÚSCULAS | 11px (≥1200 px: 12px) | 1.2 / .22em | Rótulos: "01 / 05", "VÍA GOOGLE", "HORARIO", navegación |
| `--t-data` | Newsreader 400, `tnum lnum` | 17–19px | 1.5 | Horarios, teléfono (números tabulares alineados) |

Reglas:
- Por pantalla hay **un** tamaño Italiana grande y nunca dos titulares Italiana del mismo tamaño en vista.
- Los captions literales de IG ("Siempre en A MAR", "nuestro Hit de Otoño", "uno de nuestros imperdibles") van en `--t-lead` itálica: son la firma, no el titular. El titular es el nombre del plato **sin exclamación** cuando el nombre por sí solo es un dato ("Erizos Frescos" como nombre; el "!" literal queda en el caption si copy lo quiere conservar).
- Los números del texto van en estilo antiguo (`onum`); los horarios y teléfonos, en `lnum tnum`.

### 3.3 Paleta y proporción

| Token | Hex | Rol v2 | Proporción |
|---|---|---|---|
| `--noche` | #0d0e10 | Fondo dominante (portada, marea, casa, pie) | ~60 % de la superficie |
| `--crema` (antes espuma) | #f4efe7 | Fondo de reseñas y visita; texto sobre noche | ~25 % |
| `--tinta` | #1b1c1e | Texto sobre crema | — |
| `--oro` | #b89a68 (mimbre llevado a dorado; medir contra IG-04/manos y jarrón IG-11) | **Solo** filetes de 1 px (40 % de opacidad), estrellas y el índice "01 / 05" | <1 % |
| `--ola` | #42c0ef | **Solo** el isotipo, el filo de la marea (§4.3) y el foco de teclado | <0,5 % |
| `--humo` | rgba(244,239,231,.62) | Texto secundario sobre noche | — |
| `--grafito` | rgba(27,28,30,.6) | Texto secundario sobre crema | — |

**Se eliminan** como fondos el petróleo, el terrazo, el azulejo y el cobre. El azulejo, el mimbre y el textil están **en las fotos**; no hace falta repetirlos en planos de color.
El color restante lo aportan las fotos: la comida (naranjas, coral, verdes) se ve más rica sobre negro.

Ritmo de fondos: noche → noche (marea) → foto (murta) → **crema** (reseñas) → noche (casa) → crema (visita) → foto (cierre) → noche (pie).

### 3.4 Grilla, márgenes, aire
- Escritorio (≥1024): 12 columnas, medianil 24px, margen lateral `--m: clamp(24px, 4.5vw, 80px)`, ancho máximo de contenido 1680px (las fotos a sangre lo ignoran).
- Tableta (640–1023): 8 columnas, medianil 20px, margen 32px.
- Móvil (<640): 4 columnas, medianil 16px, margen 20px.
- Aire vertical entre secciones: `--s-section: clamp(120px, 20vh, 240px)`. Dentro de una sección: `--s-block: clamp(48px, 8vh, 96px)`. Entre rótulo y titular: 20px; entre titular y bajada: 28–36px.
- Medida máxima de texto: 38ch en bajadas y 28ch en citas grandes.

### 3.5 Radios, línea, detalle
- **Radio 0 en todo**: fotos, botones y campos. Las aristas rectas se leen como editorial; el 2px de la v1 se leía como interfaz. La única forma curva es el círculo del cursor sobre los platos.
- Línea de detalle: filete de 1px `--oro` al 40 % sobre noche, o `--tinta` al 14 % sobre crema. Se usa para separar el índice del nombre, las reseñas entre sí y las filas del horario. Nada de sombras.
- Botón primario ("Reservar"): rectángulo de filete de 1px, Jost 500 12px en mayúsculas con .22em, 16×28 de padding. Al pasar el cursor, el relleno sube desde abajo (`inset(100% 0 0 0)` → `inset(0)`) en 450ms.
- El ornamento `~` (virgulilla) de sus láminas se usa **solo** como separador en la fila del horario. Las barras `| |` de la lámina no se usan.
- Grano: una capa SVG de ruido fija sobre las fotos grandes (`opacity .05`, `mix-blend-mode: overlay`). Unifica las fotos y disimula el reescalado.

### 3.6 Fotos: recorte, tamaño máximo y tratamiento

Las fuentes son cuadradas: 1080 (IG-00 a 12), 1179 (IG-13), 1440 (IG-14 a 18) y 553 (IG-19). Hay que asumir pantallas con DPR 2.

**Límite de nitidez (lado mayor mostrado, en px CSS):**

| Fuente | Nítida (≤1×) | Tope aceptable con grano (≈1,4× de reescalado a DPR 2) | Nunca más de |
|---|---|---|---|
| 1080 | 540 | **760** | 860 (solo ambiente, con grano y movimiento) |
| 1440 | 720 | **1020** | a sangre en escritorio (1440×900) solo ambiente/bebida |
| 553 (IG-19) | — | no se usa como foto; el logotipo es SVG | — |

Consecuencias:
- **Platos (todos de 1080) nunca a sangre en escritorio.** Se recortan a 4:5 (864×1080 de la fuente) y se muestran con alto máx. `min(82svh, 860px)` y ancho máx. 690px. Eso da ≈1,25–1,4× a DPR 2: aceptable con grano. En móvil sí van a sangre de ancho (390–430 px CSS: nítidas).
- **A sangre en escritorio:** solo IG-14 murta sour (1440), IG-17 barra (1440) y IG-16 espejo (1440). IG-03 salón y IG-12 fachada (1080) pueden ir a sangre **solo** con grano + una capa negra plana (no degradado) de .25 y un parallax ≤ 4 %.
- **Prohibido escalar en reposo.** Las fotos se ven al 100 % de su caja. El zoom solo existe dentro de las transiciones: entra en 1,06 y termina en 1,00. El parallax usa `translateY` ≤ 4 % con la caja holgada solo un 8 %, no un 24 %.

**Recortes y puntos focales (`object-position`):**

| Foto | Proporción de uso | Foco | Nota |
|---|---|---|---|
| IG-05 ostras | 4:5 | 46% 62% | Que entre la fuente completa con limones; cortar el florero arriba |
| IG-06 sorrentinos | 4:5 | 50% 50% | Plato centrado; el borde del plato puede tocar el marco |
| IG-07 erizos en copa | 4:5 (también 2:3 en portada) | 50% 48% | No cortar la base de la copa: si no cabe, priorizar copa y tallo hasta el pie |
| IG-08 pulpo y chapaleles | 4:5 | 60% 64% | Cortar arriba para sacar a las personas y el neón del fondo |
| IG-10 pulpo a la gallega | 4:5 | 38% 72% | Bajar el encuadre: la copa de vino arriba sobra |
| IG-14 murta sour | 16:9 a sangre (escritorio) / 4:5 (móvil) | 72% 55% | Las copas a la derecha y el texto a la izquierda, sobre el desenfoque |
| IG-17 barra | 16:9 a sangre / 4:5 | 50% 58% | |
| IG-03 salón | 3:2 | 55% 52% | |
| IG-01 cocina abierta | 4:5 | 55% 30% | Lámparas de calor arriba |
| IG-16 espejo | 1:1 o 4:5 | 50% 50% | |
| IG-11 mesa/ventanal | 4:5 | 45% 60% | |
| IG-00 calas + carta | 2:3 | 40% 50% | Detalle vertical |
| IG-12 fachada neón | 4:5 | 50% 40% | Para el cierre |
| IG-13 textil | 21:9, franja | 50% 18% | Solo la parte floral superior, **sin** la franja "A MAR" (no duplicar el logo) |

**Preprocesado (una vez, con sharp o ImageMagick; no es edición generativa):**
1. Igualar el balance de blancos hacia cálido neutro: IG-08 +200 K, IG-07 con un toque menos de verde.
2. Saturación −6 %, contraste suave en S, negros en 4–6 (no lavados) y blancos a 250. Que la comida brille sin verse "filtro de IG".
3. Redimensionar con Lanczos a 540, 760, 1080 (y 1440 donde exista), **sin generar tamaños mayores que la fuente**, y luego `unsharp 0x0.6+0.4+0.02`.
4. AVIF (q≈55) + WebP (q≈78) + JPG de respaldo, con `srcset`/`sizes` exactos según la tabla.
5. **Sin superresolución por IA.** La regla "solo material real" la excluye.

---

## 4. Sistema de movimiento

### 4.1 Curvas y duraciones (tokens)
```
--e-out:    cubic-bezier(.22, 1, .36, 1)    /* quint out — entradas            (GSAP "expo.out" en escenas) */
--e-in:     cubic-bezier(.55, 0, 1, .45)    /* salidas                          (GSAP "power3.in") */
--e-inout:  cubic-bezier(.77, 0, .175, 1)   /* barridos, cortinas, la marea     (GSAP "power4.inOut") */

--d-micro:  200ms   hover de color, subrayado, cursor
--d-s:      450ms   botones, menú, salidas de texto
--d-m:      800ms   revelado de imagen, líneas de titular
--d-l:     1100ms   la marea (transición de plato), entrada de portada
```
- Las salidas duran ≈ 55 % de la entrada y usan `--e-in`: salen rápido para que lo nuevo llegue limpio.
- Escalonado: líneas de titular 70ms; ítems de lista 50ms; nunca escalonar letra por letra salvo en el logotipo de la portada (30ms).
- Desplazamientos de entrada: texto `yPercent 105 → 0` dentro de máscara de línea; imagen `inset(100% 0 0 0) → inset(0)` + `scale 1.06 → 1`. **No hay fundidos de opacidad solos** en elementos grandes.
- Disparo: una sola vez, al 85 % del viewport. Solo van "scrubbed" (ligados al scroll) el parallax de ambiente (≤4 %) y la barra de progreso de la Marea.
- Lenis solo en escritorio y con puntero fino (`lerp: .1`). En táctil, scroll nativo.

### 4.2 Qué se anima y qué no
Se anima:
- La portada (entrada única, ≤1,6 s en total, §4.4).
- Los titulares Italiana (máscara por líneas).
- Las fotos al entrar (cortina `inset` + 1,06 → 1).
- La Marea (§4.3).
- La cifra 5,0 / 4,5: los dígitos suben como un tambor (*odometer*) una vez, en 700ms. Las estrellas se dibujan en oro, una cada 60ms.
- Las citas de reseñas, línea a línea.
- El fondo del `body`, que se interpola entre noche y crema en 600ms cuando una sección cruza el 50 % del viewport.
- La navegación: se esconde al bajar y aparece al subir (450ms).

No se anima:
- El texto corrido, el horario, la dirección, el pie ni los rótulos legales: aparecen con su sección, sin coreografía propia.
- **Se eliminan** la cinta *marquee*, los botones magnéticos, la galería horizontal sticky, las masas en parallax, la línea que se dibuja, el cursor "Arrastrar" y la precarga larga.
- Nada de bucles infinitos, rebotes, rotaciones ni `blur` animado sobre fotos grandes.

### 4.3 El momento memorable: **La Marea** (la carta sube con la ola)

**Idea:** los platos no "se deslizan" en una galería: los trae la marea. Cada cambio de plato es un barrido cuyo borde es la ola del isotipo, una línea ondulada que sube desde abajo y descubre el plato siguiente. En el filo viaja un hilo celeste de 1,5px: el único celeste en movimiento de toda la web. Es sobrio, centra la atención en la comida y cita el logotipo sin escribir "amor" ni repetir el logo.

**Mecánica:**
- La sección `#carta` mide `n × 100svh` (n = 5 platos) y tiene un hijo sticky de 100svh. El paso de plato **no va ligado al scroll** (con scrub se vería lento y a tirones). Al cruzar cada umbral (cada 100svh) se dispara una transición temporizada de 1100ms `--e-inout`. Si el usuario baja rápido varios umbrales, se mata la animación en curso y se salta directo al destino con una sola marea.
- Máscara: SVG en `viewBox 0 0 100 100` con `preserveAspectRatio="none"` sobre el marco de la foto entrante. Es un `path` con el borde superior sinusoidal: 1,5 periodos y amplitud de 3 unidades (≈ la curvatura de la ola del medio del isotipo). El borde viaja de y=108 a y=−8; mientras sube, la fase avanza 0,6 periodos, así que la ola "rueda" en vez de solo subir. Se reconstruye en *resize* (técnica Codrops, §2). Solapamiento +0,01 para no dejar costura.
- Filo: el mismo `path`, solo el borde, en `stroke: var(--ola)` de 1,5px (`vector-effect: non-scaling-stroke`), con opacidad 0 → 1 → 0 durante el recorrido.
- Foto entrante: `scale 1.06 → 1` durante el barrido. Foto saliente: `scale 1 → .97` y una capa noche de 0 → .45 (se va al fondo, no desaparece).
- Texto: las líneas del nombre anterior salen hacia arriba (`yPercent -105`, 450ms `--e-in`). Las nuevas entran desde abajo a +250ms (800ms `--e-out`, escalonadas 70ms). El caption literal y "Ver en Instagram" entran con 120ms de retraso. El índice "02 / 05" rueda como tambor.
- Barra de progreso: filete oro de 1px, ligado al scroll (este sí con scrub). Es la única pista de que hay más platos.
- Cursor (solo con puntero fino): sobre la foto aparece un círculo de 88px crema con "VER EN INSTAGRAM" (Jost 10px) que sigue al puntero con lerp .18, escala .6 → 1 en 300ms y sale en 200ms. El cursor nativo sigue visible (accesibilidad). Clic → el post de IG de ese plato.
- `prefers-reduced-motion` / sin JS: los cinco platos en lista vertical, cada uno foto + nombre + caption, sin sticky ni máscara.

Por qué es "el uno": es la única transición con forma no rectangular, el único uso del celeste en movimiento y lo único que se recuerda al salir. El resto del sitio usa cortinas rectas `inset` para no competir.

### 4.4 Portada (entrada)
1. 0–300ms: fondo noche; el isotipo (SVG) dibuja su contorno en celeste y se rellena (300ms). No hay pantalla de carga separada: esto **es** la portada.
2. 250–1100ms: la foto IG-07 (copa de erizos) se abre desde el centro, `inset(50% 50% 50% 50%) → inset(0)`, con 1,06 → 1 en `--e-inout`.
3. 500–1300ms: "A" y "MAR" suben desde su máscara (30ms entre letras) y quedan **a ambos lados** de la foto.
4. 1100–1600ms: rótulos y la línea de notas (Google 5,0 · Tripadvisor 4,5) entran con `--e-out`.
Repetir visita en la misma sesión (sessionStorage): todo aparece en 400ms, sin coreografía.

### 4.5 Transiciones entre secciones
- Entre secciones de color: el `body` interpola su `background-color` (600ms) al cruzar el 50 %. Las secciones mismas son transparentes. Se evitan franjas de dos colores en pantalla.
- Foto → color: la foto a sangre sale con un parallax del 4 % y nada más.
- Entre la Marea y la murta, la última ola del carrusel deja paso a la foto a sangre de la murta, que entra con la cortina recta normal. **No** se repite la ola.

### 4.6 Hover y microinteracciones
- **Platos (Marea y mosaico de la casa):** la imagen pasa de 1 a 1,03 en 900ms `--e-out` (y vuelve en 450ms). El caption subraya de izquierda a derecha (filete 1px, 450ms). Nada más.
- **Enlaces de texto:** el subrayado sale por la derecha y vuelve por la izquierda (`background-size` 0 → 100 %), 450ms.
- **Reseñas:** el nombre del plato mencionado (si tiene foto) muestra al pasar el cursor una miniatura 4:5 de 160px junto al puntero (`inset` 300ms). Así se une lo que dicen con lo que se ve. En táctil la miniatura va fija junto a la cita.
- **Navegación:** el ítem activo muestra un filete oro de 1px debajo; el cambio entre ítems se desliza en 450ms.
- **Foco de teclado:** contorno de 2px `--ola` con 4px de separación. Siempre visible.

---

## 5. Jerarquía y wireframes

### 5.1 Orden de la página (la v1 tenía 12 bloques; la v2 tiene 8)

| # | Sección | Fondo | Alto | Peso |
|---|---|---|---|---|
| 0 | Navegación | transparente | 72px | — |
| 1 | Portada: A ~ MAR + copa de erizos + notas | noche | 100svh | ★★★ |
| 2 | **La Carta (La Marea)**: 5 platos | noche | 5 × 100svh (sticky) | ★★★★ |
| 3 | Murta Sour a sangre | foto IG-14 | 100svh | ★★ |
| 4 | **Reseñas**: 5,0 / 4,5 + citas | crema | auto (~180vh) | ★★★★ |
| 5 | La Casa: Cocina Abierta + mosaico de ambiente | noche | auto (~170vh) | ★★ |
| 6 | Visítanos: horario, dirección y reservas en una banda | crema | auto (~70vh) | ★ |
| 7 | Cierre: fachada + "Los Esperamos en Chiloé!" | foto IG-12 | 100svh | ★★ |
| 8 | Pie | noche | auto | — |

Se eliminan la bitácora "La apertura", "Puro Amor en A~MAR", la cinta, la lámina de horario a media página y el mapa grande.
"Amor" aparece **como mucho una vez** en toda la página, y nunca en las dos primeras pantallas. Recomendación: no usarlo.

### 5.2 Wireframes (escritorio 1440×900 · móvil 390×844)

Leyenda: `▓` foto · `ITALIANA` titular · `jost` rótulo · `—` filete oro · `~` virgulilla.

#### 0 · Navegación
```
ESCRITORIO
┌──────────────────────────────────────────────────────────────────────────────┐
│ A ~ MAR (24px)              CARTA   RESEÑAS   LA CASA   VISÍTANOS    EN  [RESERVAR] │
└──────────────────────────────────────────────────────────────────────────────┘
MÓVIL
┌──────────────────────────────┐
│ A ~ MAR          [RESERVAR] ≡ │
└──────────────────────────────┘
```
Rótulos en Jost 11px, crema al 80 % sobre noche (o tinta sobre crema; el color cambia según la sección debajo). Sin degradado de fondo: con pantalla de lectura sobre fotos claras, una capa noche de .35 solo mientras está sobre una foto.

#### 1 · Portada
```
ESCRITORIO (100svh, noche)
┌──────────────────────────────────────────────────────────────────────────────┐
│ nav                                                                          │
│                                                                              │
│ RESTAURANT · CASTRO, CHILOÉ (jost)                                           │
│                             ┌──────────────┐                                 │
│                             │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│                                 │
│     A                ~      │▓▓ IG-07 ▓▓▓▓▓│                 MAR             │
│  (Italiana 248px)    (ola)  │▓▓ erizos ▓▓▓▓│          (Italiana 248px)       │
│                             │▓▓ 4:5   ▓▓▓▓▓│                                 │
│                             │▓ h 74svh ▓▓▓▓│                                 │
│                             └──────────────┘                                 │
│ Cocina de Mar… y Tierra                     5,0 GOOGLE · 9   4,5 TRIPADVISOR · 4 │
│ (Newsreader itálica 24)                     (Italiana 40 + jost)             │
└──────────────────────────────────────────────────────────────────────────────┘
```
- La foto va centrada a 4:5, con alto `min(74svh, 700px)` (≈560 px de ancho: nítida). "A" y "MAR" quedan alineados a la línea base del tercio inferior de la foto. **La ola va pequeña (0,5 em) entre la A y el borde izquierdo de la foto**: el logotipo se lee completo, A ~ [plato] MAR, y la comida queda literalmente dentro del nombre.
- Las notas abajo a la derecha llevan a #resenas; son la primera prueba social, visible en el primer segundo.
- **Sin dirección ni horario en la portada.**
```
MÓVIL (100svh)
┌──────────────────────────────┐
│ nav                          │
│ RESTAURANT · CASTRO          │
│  A ~ MAR  (Italiana 22vw)    │
│┌────────────────────────────┐│
││▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓││
││▓▓▓▓ IG-07 a sangre de ancho ││
││▓▓▓▓ 4:5 (390×488)  ▓▓▓▓▓▓▓▓▓││
││▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓││
│└────────────────────────────┘│
│ Cocina de Mar… y Tierra      │
│ 5,0 GOOGLE   4,5 TRIPADVISOR │
└──────────────────────────────┘
```

#### 2 · La Carta — La Marea (sticky, 5 pasos)
```
ESCRITORIO (cada paso 100svh, noche)
┌──────────────────────────────────────────────────────────────────────────────┐
│ LA CARTA (jost)                                                              │
│                                              ┌─────────────────────────────┐ │
│ 02 / 05  ———————————                         │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│                                              │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│ Sorrentinos                                  │▓▓▓ IG-06  4:5 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│ de Centolla                                  │▓▓▓ alto min(82svh,860) ▓▓▓▓▓│ │
│ (Italiana --t-mega, 2 líneas, col 1–6)       │▓▓▓ ancho ≤ 690 ▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│                                              │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│ nuestro Hit de Otoño                         │∿∿∿∿∿∿ filo celeste ∿∿∿∿∿∿∿∿∿│ │ ← la marea sube
│ (Newsreader itálica, --t-lead)               │▓▓▓ (plato siguiente) ▓▓▓▓▓▓▓│ │
│                                              └─────────────────────────────┘ │
│ VER EN INSTAGRAM →                                       col 7–12, alineada a la derecha │
│ ════════════════════════ progreso oro 1px ═════════════════════════════════ │
└──────────────────────────────────────────────────────────────────────────────┘
```
- Orden de platos: 1 Ostras Frescas (IG-05; no se empieza por los erizos porque ya están en la portada), 2 Sorrentinos de Centolla (IG-06), 3 Pulpo y Chapaleles a la Chapa (IG-08), 4 Pulpo a la Gallega (IG-10), 5 Erizos Frescos (IG-07, cierra con el plato de la portada: rima visual).
- Cuando una reseña menciona un plato ("las mejores ostras, erizos y sorrentinos de centolla" — carol, vía Tripadvisor), puede ir **una sola línea de reseña** bajo el caption en Newsreader itálica 17px con su firma en Jost. Copy decide qué platos la llevan. La reseña y el plato juntos son la prueba más fuerte del sitio.
- Nombres largos ("Pulpo y Chapaleles a la Chapa") pasan a `--t-xl` y a 3 líneas; nunca baja de 72px en escritorio.
```
MÓVIL (sticky, 5 pasos)
┌──────────────────────────────┐
│ LA CARTA          02 / 05    │
│┌────────────────────────────┐│
││▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓││
││▓▓ IG-06 a sangre 4:5 ▓▓▓▓▓▓││
││▓▓ (390×488) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓││
││∿∿∿∿∿ filo celeste ∿∿∿∿∿∿∿∿∿││
│└────────────────────────────┘│
│ Sorrentinos                  │
│ de Centolla (Italiana 15vw)  │
│ nuestro Hit de Otoño         │
│ VER EN INSTAGRAM →           │
│ ════ progreso ═══            │
└──────────────────────────────┘
```
Si 100svh en móvil no alcanza (pantallas <700px de alto), la foto baja a 3:4 y el nombre a 13vw.

#### 3 · Murta Sour (puente, a sangre)
```
ESCRITORIO (100svh, IG-14 1440 a sangre 16:9, foco 72% 55%)
┌──────────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓  (desenfoque cálido)                                    ▓ copas murta ▓▓▓▓▓│
│▓                                                         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓  BEBIDAS (jost)                                         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓  El Mejor                                               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓  Murta Sour   (Italiana --t-xl, crema, sobre el desenfoque izquierdo)      │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└──────────────────────────────────────────────────────────────────────────────┘
MÓVIL: IG-14 4:5 a sangre de ancho; el titular va debajo, sobre noche (no encima de la foto).
```
"El Mejor Murta Sour" es literal (IG-14). Copy decide si añade la cita de Mauricio: "dos murta sour (perfectos)".

#### 4 · Reseñas (crema)
```
ESCRITORIO
┌──────────────────────────────────────────────────────────────────────────────┐
│ RESEÑAS (jost)                                                               │
│                                                                              │
│ 5,0                              │ 4,5                                       │
│ (Italiana 300px)                 │ (Italiana 160px)                          │
│ ★★★★★ oro  GOOGLE · 9 RESEÑAS    │ ★★★★½  TRIPADVISOR · 4 OPINIONES          │
│ ———————————————————————————————————————————————————————————————————————————— │
│                                                                              │
│      "El mejor lugar que probé en mi visita.                                 │
│       La comida es alucinante♥️"                                              │
│       (Newsreader itálica 300 --t-quote, col 2–10)                           │
│       ALEJANDRA · VÍA GOOGLE                                                 │
│                                                                              │
│ ┌────────────┐  "Excelente la atención, el lugar es      "Es un lugar lindo, buena │
│ │▓ ostras ▓▓▓│   precioso y la comida insuperable;       atención y la comida es   │
│ │▓ 4:5 240px │   las mejores ostras, erizos y             espectacular, lo mejor   │
│ └────────────┘   sorrentinos de centolla. Un              que probé en Castro.     │
│                  imperdible en Castro."                   Recomiendo los           │
│                  CAROL · VÍA TRIPADVISOR                  sorrentinos…"            │
│                  (col 4–8, --t-quote-s)                   CATALINA · VÍA GOOGLE    │
│                                                           (col 9–12, desfasada 120px abajo) │
│ ———————————————————————————————————————————————————————————————————————————— │
│ "Nos fuimos de restorán a- mar con el corazón contento y la promesa de volver." │
│  MAURICIO · VÍA GOOGLE    (centrada, --t-quote, cierre)                      │
│                                                                              │
│ "…destaca por su propuesta gastronómica centrada en los productos del mar    │
│  y la cocina chilota contemporánea."  NITANRETRO FM · PRENSA (pequeña, 17px) │
│                                                                              │
│ LEER TODAS EN GOOGLE →        LEER EN TRIPADVISOR →                          │
└──────────────────────────────────────────────────────────────────────────────┘
```
- Sin carrusel. Las citas se escalonan a distintos tamaños y columnas: una grande, dos medianas desfasadas y una de cierre. Así hay jerarquía de prensa.
- Una o dos miniaturas de plato (240px de ancho, 4:5, nítidas) junto a la cita que lo nombra.
- Las citas son literales y van recortadas con "…" según las reglas. **La selección exacta la cierra copy.** El wireframe solo fija la forma: 1 destacada + 2–3 medianas + 1 de cierre + prensa en pequeño.
- La cita de Mauricio dice "a- mar" (juego de la marca, dicho por un cliente). Si se usa, es el único "amor" implícito y está lejos de la portada. Copy decide.
```
MÓVIL
┌──────────────────────────────┐
│ RESEÑAS                      │
│ 5,0   (Italiana 34vw)        │
│ ★★★★★ GOOGLE · 9             │
│ 4,5 ★★★★½ TRIPADVISOR · 4    │
│ ———————————————————          │
│ "El mejor lugar que probé…"  │
│  (--t-quote 28px)            │
│ ALEJANDRA · VÍA GOOGLE       │
│ ———————————————————          │
│ ┌──────┐ "Excelente la       │
│ │ostras│  atención…"         │
│ └──────┘ CAROL · TRIPADVISOR │
│ ———————————————————          │
│ … (lista vertical, sin carrusel) │
└──────────────────────────────┘
```

#### 5 · La Casa (noche): ambiente sin sentimentalismo
```
ESCRITORIO
┌──────────────────────────────────────────────────────────────────────────────┐
│ LA CASA (jost)                                                               │
│ Cocina                       ┌──────────────────────────────────────────────┐ │
│ Abierta  (Italiana --t-xl)   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│                              │▓▓▓ IG-17 barra 1440 · 3:2 · col 5–12 ▓▓▓▓▓▓▓▓│ │
│                              │▓▓▓ (≈ 940 px de ancho: nítida) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ │
│                              └──────────────────────────────────────────────┘ │
│                                                                              │
│ ┌────────────┐       ┌──────────────────────┐            ┌────────────┐     │
│ │▓ IG-01 ▓▓▓▓│       │▓▓▓ IG-03 salón 3:2 ▓▓▓│            │▓ IG-16 ▓▓▓▓│     │
│ │▓ cocina ▓▓▓│       │▓▓▓ col 4–9 ▓▓▓▓▓▓▓▓▓▓▓│            │▓ espejo ▓▓▓│     │
│ │▓ 4:5 col1–3│       └──────────────────────┘            │▓ 1:1 col10–12│   │
│ └────────────┘   desfasada +160px                        └────────────┘     │
│                                                                              │
│ ═══ franja textil IG-13 (21:9, solo el floral, 100vw, 28vh, parallax 4%) ═══ │
│                                                                              │
│ ┌──────┐                                                        ┌──────────┐ │
│ │IG-00 │   "…la decoración muy acogedora, iluminación ideal…"   │ IG-11    │ │
│ │calas │    MAURICIO · VÍA GOOGLE (Newsreader itálica 24)       │ mesa 4:5 │ │
│ │ 2:3  │                                                        └──────────┘ │
│ └──────┘                                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```
- El título es "Cocina Abierta" (literal IG-01). Sin "Espacio hecho con Amor" ni "Puro Amor".
- El mosaico es asimétrico, a 12 columnas, con desfases verticales de 80–160px. Sin sombras, radio 0 y cada foto bajo su tope de nitidez.
- La franja textil es la única aparición del estampado floral. Es la "línea de marca" sin poner el logotipo.
```
MÓVIL
┌──────────────────────────────┐
│ LA CASA                      │
│ Cocina Abierta               │
│ ▓▓▓▓ IG-17 a sangre 4:5 ▓▓▓▓ │
│        ┌───────────┐         │
│        │ IG-03 3:2 │ (col 2–4)│
│        └───────────┘         │
│ ┌──────┐   ┌──────┐          │
│ │IG-01 │   │IG-16 │ (2 col)  │
│ └──────┘   └──────┘          │
│ ═ franja textil 21:9 ═       │
│ "…la decoración muy acogedora…" │
│ MAURICIO · VÍA GOOGLE        │
└──────────────────────────────┘
```

#### 6 · Visítanos (crema, secundario y compacto)
```
ESCRITORIO (~70vh)
┌──────────────────────────────────────────────────────────────────────────────┐
│ VISÍTANOS (jost)                                         ● ABIERTO AHORA      │
│ ———————————————————————————————————————————————————————————————————————————— │
│ HORARIO                  │ DÓNDE                     │ RESERVAS              │
│ Martes a Sábado          │ Stripcenter Gamboa,       │ +56 9 3878 0008       │
│ 13:00 – 16:30            │ Local 109                 │ WHATSAPP →            │
│ 18:30 – 22:00            │ Calle Río Gamboa 114      │ @AMAR_CHILOE →        │
│ ~                        │ Castro, Chiloé            │                       │
│ Domingo 13:00 – 17:00    │ CÓMO LLEGAR →             │                       │
│ ~                        │ (Google Maps, sin mapa    │                       │
│ Lunes cerrado            │  incrustado)              │                       │
│ (--t-data, tnum)         │                           │                       │
└──────────────────────────────────────────────────────────────────────────────┘
MÓVIL: las tres columnas se apilan y van separadas por filetes; el estado ABIERTO AHORA queda arriba.
```
- Es tipografía pura, a la manera de Septime. Sin lámina, sin mapa grande y sin foto. Tamaño máximo de texto: 19px; el único rótulo grande es "Visítanos" en Jost.
- Si el equipo quiere un mapa, que sea una miniatura de 320×200 en blanco y negro al pasar el cursor por "Cómo llegar". Opcional; por defecto, no.
- El horario sale de la lámina vigente IG-02 (ver "Por confirmar" en brand-voice.md).
- El "estado en vivo" se conserva, pero como un punto de 6px (oro si está abierto, grafito si está cerrado) y Jost 11px. **Sin pulso animado.**

#### 7 · Cierre
```
ESCRITORIO (100svh)
┌──────────────────────────────────────────────────────────────────────────────┐
│ noche                         ┌──────────────────┐                           │
│                               │▓▓ IG-12 fachada ▓│                           │
│ Los Esperamos                 │▓▓ neón A~MAR ▓▓▓▓│                           │
│ en Chiloé!                    │▓▓ 4:5 h 76svh ▓▓▓│                           │
│ (Italiana --t-xl, col 1–5)    │▓▓ col 7–11 ▓▓▓▓▓▓│                           │
│                               └──────────────────┘                           │
│ [RESERVAR POR WHATSAPP]   +56 9 3878 0008                                    │
└──────────────────────────────────────────────────────────────────────────────┘
MÓVIL: la fachada va a sangre de ancho 4:5 y debajo el titular y los dos botones apilados.
```
- La fachada con el letrero neón es el único logotipo "real" (fotografiado) del sitio y cierra con glamour nocturno. Va a 4:5 y no a sangre en escritorio, porque la fuente es de 1080.

#### 8 · Pie
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ A ~ MAR (logotipo SVG, 18vw, alineado a la izquierda, no centrado)           │
│ Cocina de Mar… y Tierra                                                      │
│ ——————————————————————————————————————————————————————————————————————————— │
│ STRIPCENTER GAMBOA · LOCAL 109 · CASTRO     MA–DO DESDE 13:00     INSTAGRAM  │
│ © 2026 Restaurant A MAR                     Sitio hecho con el material público de @amar_chiloe │
└──────────────────────────────────────────────────────────────────────────────┘
```
El logotipo grande aparece aquí y en la portada; en ningún otro lugar.

---

## 6. Lista de control para desarrollo y QA
- [ ] Hay un plato visible en el primer segundo (portada) y en la pantalla 2 empieza la carta.
- [ ] Ninguna foto de 1080 supera 760px CSS de lado mayor en escritorio (salvo IG-03/IG-12 marcadas como ambiente con grano). Ningún `scale` > 1 en reposo.
- [ ] Ningún titular Italiana por debajo de 40px; ninguno con `text-stroke`. Dos titulares grandes nunca miden lo mismo en la misma vista.
- [ ] Solo dos fondos planos (noche, crema). El celeste solo en el isotipo, el filo de la marea y el foco.
- [ ] Radio 0 y sin sombras.
- [ ] Horario y dirección ≤ 19px, sin mapa grande y fuera de la portada.
- [ ] "Amor" aparece 0 veces (o 1, lejos de la portada, si copy lo justifica).
- [ ] La Marea responde en ≤ 1,1 s por paso, salta pasos si se baja rápido y tiene versión estática.
- [ ] Hay versión `prefers-reduced-motion` completa; la portada se muestra en ≤ 400ms sin coreografía.
- [ ] Imágenes en AVIF/WebP con `srcset` sin tamaños mayores que la fuente, y sin superresolución por IA.

---

## Resumen (decisiones clave)
1. **Diagnóstico:** la v1 invierte la jerarquía (horario de 62px contra platos de 38px, mapa de 800px contra fotos de 430px, comida recién en la 3.ª pantalla). Usa Georgia/Gelasio en itálica para todo, Italiana a tamaños medios iguales con trazo falso, cinco fondos de color, composición centrada de invitación y ocho efectos que no sirven a la comida.
2. **Estructura nueva en 8 bloques:** Portada con plato → **La Carta (5 platos)** → Murta a sangre → **Reseñas** → La Casa → Visítanos compacto → Cierre con la fachada → Pie. Fuera: bitácora, "Puro Amor", cinta, lámina de horario y mapa grande.
3. **Portada:** A ~ MAR a 248px con la copa de erizos (IG-07, 4:5) entre la A y MAR, y las notas 5,0 / 4,5 visibles en el primer segundo. Sin dirección ni horario.
4. **Momento memorable, "La Marea":** cada plato llega con un barrido cuyo borde es la ola del isotipo y lleva un hilo celeste en el filo. Va disparado por umbral (no ligado al scroll), dura 1,1 s `cubic-bezier(.77,0,.175,1)` y salta pasos si se baja rápido. Es el único uso del celeste en movimiento.
5. **Reseñas como prensa:** "5,0" en Italiana de 300px, citas escalonadas a 3 tamaños, miniaturas del plato que nombran y prensa en pequeño. Sin carrusel.
6. **Tipografía:** Italiana se queda solo en el logotipo y los titulares ≥64px, sin `text-stroke`. Gelasio se reemplaza por **Newsreader** (texto y citas en itálica 300, opsz 72) y entra **Jost** 500 en mayúsculas de 11–12px con .22em para rótulos. La escala va de `--t-mega clamp(72px,13.5vw,248px)` a `--t-label 11px`.
7. **Color:** noche ~60 %, crema ~25 % y fotografía. El oro (#b89a68) solo en filetes de 1px y estrellas; el celeste <0,5 %. Se eliminan los fondos petróleo, terrazo y azulejo.
8. **Grilla** de 12/8/4 columnas, margen `clamp(24px,4.5vw,80px)`, aire entre secciones `clamp(120px,20vh,240px)`, radio 0, sin sombras y grano SVG al 5 % sobre las fotos.
9. **Fotos:** las de 1080 nunca superan 760px CSS de lado mayor; los platos van a 4:5 con alto `min(82svh,860px)` y ancho ≤690px. A sangre en escritorio solo las de 1440 (murta, barra, espejo); en móvil, todo a sangre de ancho. Tabla de puntos focales por foto, y preprocesado con grado común, Lanczos y unsharp, sin IA.
10. **Movimiento:** entradas quint-out de 800ms, salidas de 450ms (≈55 %), escalonado de 70ms, revelados con `clip-path: inset` + 1,06→1 y cambio de fondo del body en 600ms. Fuera el marquee, el magnetismo, la galería horizontal, el parallax de masas y la precarga larga.
11. **Hover:** zoom de plato 1→1,03 en 900ms, cursor circular "Ver en Instagram" solo en la carta y miniatura del plato al pasar por una reseña que lo menciona.
12. **"Amor":** 0 veces (o como mucho una, lejos de la portada). La marca se expresa con la ola, la composición y la franja textil.

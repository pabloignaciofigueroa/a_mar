# Estrategia v2 — A MAR (síntesis de los 5 agentes)

Fuentes: 01-rubro.md · 02-diseno.md · 03-carta.md · 04-imagenes.md · 05-guion.md (misma carpeta). Aquí se cierran los desacuerdos entre ellos. **Nada se construye hasta que Pablo apruebe.**

## La idea en una frase
Un restaurante de producto de mar que se presenta como en una carta de fine dining: **la comida a pantalla grande, las palabras de sus clientes como prensa, y todo lo práctico (reservar, horario, dirección) siempre a un toque pero nunca protagonista.**

## Qué cambia respecto de v1
| v1 (rechazada) | v2 |
|---|---|
| Portada negra con el logotipo gigante; comida recién en la 3.ª pantalla | Portada = un plato a sangre (IG-08, pulpo y chapaleles de noche) con el logotipo encima |
| "Espacio hecho con Amor" + "Puro Amor en A🩵MAR" en 2 segundos | **"Amor" cero veces.** Tampoco la reseña "a- mar con el corazón contento" |
| Bitácora de la apertura (8 hitos) | Eliminada, igual que IG-04 manos, IG-09 rosas, IG-13 invitación, IG-15 espumante, IG-19 logo |
| Platos en tarjetas de 430 px dentro de una galería | Cada plato fuerte en su propia pantalla, grande y con aire, más una carta tipográfica |
| Reseñas en carrusel de texto plano | Reseñas como prensa: "5,0" enorme, 1 cita protagonista, 4–5 secundarias, sin carrusel |
| Lámina de horario a media página + mapa de 800 px | Horario y dirección compactos en "Visítanos" y en el pie; "Reservar" fijo arriba; en móvil, barra inferior con Reservar y Cómo llegar |
| Gelasio itálica en todo, 5 colores de fondo, cinta que corre sola | Italiana solo para el logotipo y titulares grandes; texto en Newsreader; negro ~60 %, crema ~25 %, foto; dorado solo en filetes y estrellas; celeste solo en el isotipo |

## Estructura (orden = importancia)
1. **Portada** (100svh). IG-08 a sangre con grade "noche cálida" (recorte 16:9 en escritorio y 9:16 en móvil, foco 47 % 50 %). Logotipo A ~ MAR a ~240 px, "Cocina de Mar… y Tierra" [BIO], "Castro · Chiloé" y una etiqueta discreta "★ 5,0 · Google". Sin horario ni dirección. Zoom lento hacia afuera, una sola vez.
2. **"El mejor lugar que probé en mi visita."** — Alejandra · vía Google. Cita grande sobre negro, con "5,0 · 9 reseñas en Google" y "4,5 · 4 opiniones en Tripadvisor" en una línea chica. Es el gancho: la comida se ve en la portada y aquí alguien la avala.
3. **Los platos: el momento memorable, "La Marea".** Una pantalla por plato. Cada uno entra con un barrido cuyo borde es la ola del logotipo, con un hilo celeste en el filo (1,1 s, se dispara al cruzar, no avanza con el scroll). Los platos van recortados a 4:5, como máximo a 690–760 px de lado, con mucho aire. Cada plato lleva su nombre literal y una sola línea, de la marca o de un cliente:
   - **Ostras Frescas** — "Siempre" [IG-05]
   - **Erizos Frescos** — "Siempre frescos" [IG-07]
   - **Sorrentinos de Centolla** — "…sorrentinos de centolla 10/10…" Viviana · Tripadvisor
   - **Pulpo a la Gallega** — "uno de nuestros imperdibles" [IG-10]
   - **Pulpo y Chapaleles a la Chapa** — ya está en la portada, aquí va como detalle
   
   Tras los tres primeros, cita puente: "…las mejores ostras, erizos y sorrentinos de centolla. Un imperdible en Castro." — carol · vía Tripadvisor.
4. **Murta Sour** a sangre (IG-14, de 1440 px, la única bebida que aguanta) con "…dos murta sour (perfectos)…" de Mauricio · vía Google.
5. **La carta** (resumen tipográfico, como una carta impresa). Lista a la izquierda y foto 4:5 fija a la derecha, que cambia con un fundido al pasar el cursor; en móvil, miniatura junto a cada nombre. Secciones literales de su carta impresa (vista en IG-00): **Entradas** (Ostras Frescas, Erizos Frescos, Pulpo y Chapaleles a la Chapa) · **Principales** (Sorrentinos de Centolla, Pulpo a la Gallega) · **Barra** [UI] (Murta Sour). Va sin precios, con el pie [UI] "Carta completa y sugerencias del día en el local · Consulta por WhatsApp".
6. **Reseñas** (sobre crema). "5,0" en Italiana enorme, y citas a tres tamaños: Catalina ("…la comida es espectacular, lo mejor que probé en Castro…"), Sammy, Andres, Abel y Peter en alemán. Cada cita lleva una miniatura del plato que nombra. La prensa va en una línea: NiTanRetro FM.
7. **La casa** (respiro, casi sin texto). Díptico de la barra (IG-17) con el salón (IG-03), una banda de la cocina abierta (IG-01) o de las calas con la carta (IG-00), y una sola línea: "…la decoración muy acogedora, iluminación ideal…" — Mauricio · vía Google.
8. **Reservar.** La fachada nocturna (IG-12), "Reservas" [DEST], "Los Esperamos en Chiloé!" [IG-11] y el botón "Reservar por WhatsApp". En chico, la nota de escasez "un local pequeño (11 mesas aprox)" de Mauricio.
9. **Visítanos y pie, compactos.** Dirección, horario según la lámina IG-02 hasta confirmar, teléfono, Instagram y el enlace "Cómo llegar", sin mapa grande. El estado "Abierto ahora" sale hasta que se confirme el horario.

Barra fija con logotipo · Platos · Reseñas · Visítanos · **Reservar** · ES|EN.
Texto propio y de interfaz en toda la página: menos de 120 palabras. El resto son nombres de platos y citas.

## Imágenes
- Ranking: IG-08 > IG-05 > IG-07 > IG-06 > IG-10 > IG-17 > IG-03 > IG-14. El resto es de apoyo o se descarta.
- Grade común "noche cálida" aplicado al archivo, no en CSS (valores y script en 04-imagenes.md y fotos/grade.py): calidez leve, curva en S suave, cian −45 %, lima −35 %. Más un grano del 5 % como capa encima de la foto.
- A sangre en escritorio solo van la portada (IG-08 pre-escalada a 1920) y las fotos de 1440 px. Los demás platos se muestran como máximo a ~760 px de lado, nunca estirados.
- Movimiento: el revelado termina con la foto en su tamaño real, que es donde se ve más nítida. Nada de zoom hacia adentro, de agrandar al pasar el cursor ni de visor a pantalla completa.

## Diseño y movimiento (detalle en 02-diseno.md)
- Grilla de 12, 8 y 4 columnas, margen `clamp(24px,4.5vw,80px)`, aire entre secciones `clamp(120px,20vh,240px)`. Esquinas rectas y sin sombras.
- Entradas de 800 ms con expo-out, salidas de 450 ms, escalonado de 70 ms. Cortina recta y un zoom de 1,06 a 1. El fondo pasa de negro a crema en 600 ms entre secciones.
- Un solo momento memorable: La Marea. Todo lo demás, sobrio.

## Desacuerdos entre agentes y cómo se resolvieron
- **Foto de portada.** Rubro proponía ostras; diseño, erizos dentro del logotipo; imagen y guion, el pulpo. Gana **IG-08**: es la única que aguanta pantalla completa en escritorio porque el 70 % del cuadro ya está desenfocado, y es de noche, con gente: un restaurante vivo.
- **"Amor".** El guion permitía una vez a mitad de página. Queda en **cero**, por la crítica directa de Pablo.
- **"Hit de Otoño" y "otro exitazo".** Salen hasta que el cliente confirme. Lo que hoy es primavera no se publica como vigente.
- **Platos que nombran los clientes** (postres, corvina, fetuccini, chupe de guatitas…). No entran en la carta; quedan dentro de sus reseñas, atribuidos.
- **Espumante (IG-15).** Sale: la marca no lo nombró y es material de la apertura.
- **Tipografía.** Sale Gelasio, que era la letra de las láminas pero se veía de oficina; entra Newsreader para el texto. Italiana se queda, pero solo para el logotipo y titulares de 64 px o más, sin trazo falso.

## Pendiente con el cliente (no bloquea)
1. La carta impresa completa: sale en IG-00 cortada, con Entradas, Principales del mar y Principales de vacuno.
2. Qué horario está vigente: la lámina dice horario cortado; Google y Tripadvisor, corrido hasta las 22:30.
3. Si los sorrentinos siguen en la carta y el nombre oficial de "Pulpo con Ch…".
4. Permiso para nombrar a la chef y a Maximiliano.
5. Fotos nuevas: postres, pesca del día, una foto horizontal de noche y los originales en máxima resolución.

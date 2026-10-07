# Dirección de arte (F08)

Idea: la noche del logotipo (negro, crema y la ola celeste) con la calidez del salón (mimbre, azulejo, textil floral). Mucho negro y crema; el celeste aparece solo donde está el isotipo.

## Ritmo de la página
```
[PORTADA]  noche · A ~ MAR enorme · "Cocina de Mar… y Tierra"          100svh
   │  (sticky, +140vh de recorrido)
[MEMORABLE] la ola del logotipo crece y se vuelve ventana al salón      100svh
   │       "Espacio hecho con Amor"
[LA CASA]  espuma · "Puro Amor en A~MAR" · 3 masas a distinta velocidad  auto
[CINTA]    petróleo · nombres de platos que corren según el scroll        ~18vh
[SIEMPRE FRESCOS] noche · galería horizontal sticky (sin pin)          100svh + recorrido
[COCINA ABIERTA]  foto a sangre con parallax por inset                  100svh
[LA APERTURA]     espuma · bitácora 25 abr → 9 may, línea de ola que se dibuja  auto
[RESEÑAS]  terrazo · 5,0 / 4,5 · carrusel con "Arrastrar"              auto
[HORARIO]  noche · su lámina en HTML + estado en vivo + foto "Abierto"   auto
[VISÍTANOS] espuma · mapa oscuro + datos                                  auto
[RESERVAR] foto a sangre (mesa IG-11) · "Los Esperamos en Chiloé!"       100svh
[PIE]      noche · logotipo vertical
```

## Un solo momento memorable
El isotipo de tres olas es la ventana. En la portada el isotipo celeste ocupa su lugar entre la "A" y "MAR". Al desplazarse, la "A" y "MAR" se abren hacia los lados, el celeste se funde en la foto del salón (IG-03) recortada con la forma de la ola, y la máscara crece desde la ola del medio hasta cubrir la pantalla. Aparece "Espacio hecho con Amor". Implementado con `mask-image` (SVG del isotipo), `mask-size` y `mask-position` animados por GSAP sobre un sticky de 100svh. Sin `pin`.

## Sistema de movimiento
- Curvas: `expo.out` y `cubic-bezier(.16,1,.3,1)`; entradas 0,9–1,2 s, salidas 0,5 s.
- Revelado de titulares por líneas con máscara (`.line` con padding para que no se corten tildes de mayúscula).
- Fotos: cortina con `clip-path: inset()` que se abre + escala 1,15 → 1.
- Parallax sutil: el medio dentro de su marco tiene `inset` negativo (−12 %) y se desplaza ±8 %.
- Masas en "La casa": tres fotos a velocidades 0,6 / 1 / 1,3.
- Cinta: velocidad base + empuje según la velocidad del scroll (Lenis) y dirección.
- Galería horizontal: sección de alto `recorrido + 100vh`, hijo sticky; `start: top top`, `end: bottom bottom`; alto recalculado en `refreshInit`.
- Bitácora: la línea de ola (SVG) se dibuja con `stroke-dashoffset` ligada al scroll; cada hito entra con cortina.
- Micro: botones magnéticos, subrayados que crecen, etiqueta "Arrastrar" que sigue al cursor sobre el carrusel (cursor nativo visible), menú a pantalla completa con imagen al pasar el cursor.
- `prefers-reduced-motion`: todo visible y estático, la galería pasa a scroll nativo horizontal, sin Lenis.

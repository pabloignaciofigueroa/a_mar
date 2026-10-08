# Dirección de arte v2

Detalle completo: _plan/v2/02-diseno.md (sistema) y _plan/v2/04-imagenes.md (fotos). Resumen de lo construido:

```
[PORTADA]   logo sobre negro → la ola sube → pulpo a sangre; el logo no se mueve   100svh
[CITA]      "El mejor lugar que probé en mi visita." + notas                        ~90svh
[PLATOS]    ostras · erizos · sorrentinos · cita · pulpo a la gallega               5 × 100svh, sticky, se apilan
[MURTA]     foto a sangre (1440 px) + cita                                          100svh
[CARTA]     crema · lista tipográfica + foto 4:5 que cambia                         auto
[RESEÑAS]   crema · "5,0" gigante + 5 citas a distintos tamaños + prensa            auto
[LA CASA]   noche · salón 16:9 + barra 3:4 + cocina, una cita                       auto
[RESERVAR]  noche · fachada 4:5 + "Los Esperamos en Chiloé!" + WhatsApp             auto
[VISÍTANOS] crema · horario, dirección, contacto en 3 columnas (sin mapa)          compacto
[PIE]       noche · logotipo
```

- Un solo momento memorable: la ola de la portada (borde sinusoidal con filo celeste). No se repite entre platos.
- Paleta: noche ~60 %, crema ~25 %, fotos; oro #b89a68 solo en filetes, rótulos y estrellas; celeste solo en el isotipo, el filo de la ola y el foco.
- Fotos: grade común "noche cálida" (tools/grade.py) aplicado al archivo; platos a 4:5 con máx. ~690 px de ancho; a sangre solo el héroe pre-escalado y fotos de 1440 px. Grano 5 % como capa.
- Movimiento: entradas 0,8–1,1 s expo-out, cortinas rectas, zoom 1,06→1; el plato anterior se hunde (escala .93 + sombra) cuando llega el siguiente; "5,0" cuenta una vez.
- Reducido / sin GSAP: todo visible, sin ola ni apilado.

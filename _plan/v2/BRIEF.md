# Brief v2 — A MAR (para los 5 agentes)

## Contexto
Web regalo (prospección en frío) para **Restaurant A MAR**, Castro, Chiloé (abrió el 8 de mayo de 2026). La v1 está en línea (https://amarchiloe.pages.dev, servida localmente en http://localhost:8812/ con capturas en /home/claude/a_mar/_qa/recorrido.jpg y _qa/shots/d*.jpg) y **Pablo la rechazó**. Sus palabras:

> "No lo has logrado, ni de cerca. Parece un restaurant sin nada de glamour. La idea es que sus platos y sus reseñas debieran ser lo principal, sus imágenes. La inauguración elimínala: para sus posts sirvieron, pero para la página web no tiene sentido. Las imágenes deben ser lo principal; que haya aire. Los horarios son importantes, y obvio la ubicación, pero lo hiciste como si fuera lo principal, siendo que es algo secundario. La cocina y las reseñas es lo mejor que tiene hasta el momento. Repetir 2 veces 'amor' en los primeros 2 segundos de la página, siendo que la marca es A MAR, no tiene sentido."

Errores de v1 a no repetir:
- Portada negra con el logotipo gigante y luego "Espacio hecho con Amor" + "Puro Amor en A🩵MAR": juego AMOR/A MAR repetido, sin comida a la vista.
- Bitácora "La apertura" (Pronto…, Casi Listos!, Afinando Detalles…, Día Soñado!): eliminar.
- Horario como lámina a media página y mapa grande: deben ser secundarios.
- Platos en tarjetas chicas en una galería; la comida no protagoniza.
- Reseñas en un carrusel de texto plano, sin jerarquía ni fuerza.

## Reglas que siguen vigentes (skill web-regalo-cold-call)
- Ghostwriter estricto: todo texto de marca sale literal de lo que A MAR publicó o de dato verificable; reseñas literales con nombre de pila y origen ("vía Google"/"vía Tripadvisor"), "…" si se corta. Sin frases inventadas, superlativos propios ni clichés. Se traducen solo textos de interfaz.
- Solo material real: sus fotos (no stock, no IA). No hay videos reales.
- Mucho aire; secciones de foto a sangre de 100svh; un solo momento memorable; movimiento rápido con suavizado, premium.
- Hosting/stack ya resueltos (no es tema de esta etapa). **Nadie construye ni edita el sitio en esta etapa.** Solo entregar estrategia.

## Material disponible (rutas)
- Fotos originales: /home/claude/a_mar/assets/raw/ig/amar_ig_NN_*.jpg (puedes mirarlas con Read). Inventario y fechas: content/inventario.md. Tamaños: 1080×1080 (IG-00 a 13), 1179 (IG-13), 1440×1440 (IG-14 a 18), 553 (IG-19). Todas cuadradas.
- Platos fotografiados: IG-05 ostras, IG-06 sorrentinos de centolla, IG-07 erizos en copa, IG-08 pulpo y chapaleles a la chapa, IG-10 pulpo a la gallega, IG-14 murta sour (4 copas), IG-15 espumante. Ambiente: IG-03 salón, IG-17 barra, IG-11 mesa/ventanal, IG-01 cocina abierta (lámparas de calor), IG-16 espejo, IG-12 fachada nocturna, IG-00 calas + carta negra, IG-09 rosas + cartel Abierto, IG-13 textil floral con franja A MAR, IG-18 individual estampado, IG-04 manos doradas con logo, IG-19 logo.
- Textos literales de la marca: content/brand-voice.md (corpus de captions, bio, destacadas) y assets/raw/ig/meta_instagram.json.
- Reseñas completas: content/resenas-completas.md (Google 5,0·9; Tripadvisor 4,5·4; prensa NiTanRetro FM).
- Sistema de marca v1 (se puede conservar o replantear): brand/typography.md (Italiana + Gelasio), brand/palette.md, brand/logo/*.svg, brand/art-direction.md.
- Guion v1: content/copy.md. HTML v1: src/index.html.

## Entregable de cada agente
Un archivo Markdown en /home/claude/a_mar/_plan/v2/<tu-archivo>.md, concreto y accionable (no ensayo), en español. Al final de tu respuesta, un resumen de 10–15 líneas con tus decisiones clave.

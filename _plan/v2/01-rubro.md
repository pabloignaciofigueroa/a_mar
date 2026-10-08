# 01 · Rubro: qué mostrar y en qué orden (A MAR v2)

Autor: estratega de rubro (restaurantes de autor / gastronomía premium) · 07-10-2026
Alcance: estrategia de contenido y jerarquía. No toca diseño fino ni código.

---

## 1. Qué hacen los restaurantes de referencia (investigación)

Método: WebFetch sobre las webs oficiales (devuelve el texto y la estructura, no las imágenes). El navegador headless no pudo salir: la política de red del entorno bloquea esos dominios. Por eso, lo que digo sobre el **orden** y la **cantidad de texto** está verificado, y lo que digo sobre lo **visual** viene de la estructura que se pudo leer.

| Referente | Primer pantallazo | Reservas | Prensa / premios | Horario y ubicación | Texto |
|---|---|---|---|---|---|
| **Boragó** (Santiago) — https://borago.cl | Una sola imagen grande, sin titular ni texto | En el menú y repetida en el pie | Un solo logo (50 Best 2025) que enlaza afuera; "Prensa" va en el menú | Sin horario en la portada; la ubicación es solo un enlace "Cómo llegar"; teléfono y WhatsApp en el pie | Casi nada |
| **Central** (Lima) — https://centralrestaurante.com.pe | Video de fondo y una frase: "Un recorrido vertical por el territorio peruano" | RESERVAS en el menú y dos botones dentro del bloque principal | Ninguno en la portada | **Solo en el pie** | Unos 4 párrafos cortos; el resto es video |
| **Maido** (Lima) — https://www.maido.pe | Logo, botón "RESERVA AQUÍ" y "Bienvenido a nuestro mundo" | En 4 lugares: arriba, tras las experiencias, en contacto y en el pie | Ninguno en la portada | La dirección va en un bloque "Ubícanos" al final, con Maps y Waze | Moderado |
| **Elkano** (Getaria, producto de mar a la brasa) — https://restauranteelkano.com | Titular "MAR DE BRASAS" y un párrafo | En el menú y un botón después de los datos | "Prensa" solo en el menú | Dirección, horario y teléfono juntos **al final** | 200–250 palabras |
| **Kol** (Londres) — https://kolrestaurant.com | Casi sin texto; "Book a table" justo bajo el menú | Es el primer llamado a la acción | Ninguno | Sin horario en la portada | Mínimo |
| **Septime** (París) — https://www.septime-charonne.fr | La carta de temporada va primero | "Réserver" en el menú y bloque propio al final | Solo un correo de prensa | Dirección y horario después de la carta | Ligero |
| **La Mar** (Gastón Acurio) — https://www.lamarcebicheria.com | "¡La mar es una fiesta!" y un botón | Solo en el menú y en el pie | Ninguno | Ubicaciones al final; sin horario | 4 bloques de 1–3 frases |

Guías del rubro: https://azurodigital.com/restaurant-web-design-tips/ dice que más del 75 % del tráfico es móvil (informe Bento 2024), que la reserva debe estar siempre a mano y no dentro de un formulario, que conviene usar fotos reales del lugar y no de stock, y que las reseñas de Google y Tripadvisor van en la portada.

### Patrones que se aplican a A MAR
1. **El primer pantallazo es la imagen y casi no lleva texto.** Ningún referente abre con el horario, el mapa o un párrafo. Abren con una imagen, un nombre y a lo más una frase.
2. **La reserva está siempre a un toque, pero discreta.** Un botón fijo arriba a la derecha y repetido al final. Nunca es una sección grande.
3. **El horario y la dirección van al final o en el pie, todos juntos.** Esto es lo que Pablo pidió: secundario pero fácil de encontrar.
4. **Poco texto.** Entre 0 y 250 palabras propias. El prestigio no se explica; se muestra.
5. **La prensa se muestra en una línea o un logo, no en un bloque.** Los grandes no tienen reseñas de clientes porque viven de premios. **A MAR no tiene premios, pero sí reseñas casi perfectas, así que sus reseñas cumplen el papel de los premios.** Hay que tratarlas con la misma sobriedad: cita corta, nombre y fuente. Nada de un carrusel de testimonios genérico.
6. **El producto manda.** Elkano y Septime ponen el producto y la carta antes que la historia. A MAR no tiene carta publicada, así que **la "carta" de la web son sus 5–6 platos fotografiados.**

---

## 2. El material: qué vende y qué sobra

Todas las fotos son cuadradas, de 1080 a 1440 px. **Advertencia práctica:** en escritorio, una foto cuadrada de 1080 px estirada a 100 % de ancho y 100svh se ve blanda o se recorta demasiado. Para que se lean "a sangre" sin perder calidad:
- **Móvil:** recorte vertical a sangre (1080 px de ancho alcanza).
- **Escritorio:** foto cuadrada grande a ~70–90vh de alto, con aire a los lados; o un díptico de dos fotos; o un recorte panorámico solo si la composición lo permite (ostras y salón sí; sorrentinos no).

### Ranking por fuerza de venta
| Lugar | Foto | Por qué | Uso |
|---|---|---|---|
| 1 | **IG-05 Ostras frescas** | Abundancia, textura y producto chilote reconocible; está bien iluminada, sobre el individual estampado, con florero dorado y servilleta verde. Es la foto con más "glamour de mar" | **Portada** |
| 2 | **IG-06 Sorrentinos de centolla** | Es el plato más nombrado en las reseñas (5 de 11 con texto). Emplatado fino, plato texturado, copa de blanco al fondo | Primer plato del recorrido (plato firma) |
| 3 | **IG-10 Pulpo a la gallega** | Color intenso, copa, fondo con barra y azulejo: transmite "restaurante cuidado" | Recorrido de platos |
| 4 | **IG-03 Salón** (109 ♥) | Explica el lugar en una sola imagen: madera, azulejo verde agua, lámparas de mimbre | Apertura del bloque "El lugar" |
| 5 | **IG-12 Fachada nocturna** (159 ♥, la más gustada) | Letrero luminoso y salón encendido: invita a entrar | **Cierre / reserva** |
| 6 | IG-08 Pulpo y chapaleles a la chapa | Producto chilote (chapalele) y un plato generoso; el fondo es algo ruidoso | Recorrido de platos |
| 7 | IG-14 Murta sour (4 copas) | Bebida de identidad local con luz cálida | Recorrido (cierre dulce/bebida) |
| 8 | IG-07 Erizos en copa | Muy chilote; la composición es más simple (copa sobre azulejo) | Recorrido, o par con ostras |
| 9 | IG-17 Barra · IG-11 Mesa y ventanal · IG-00 Calas y carta negra | Ambiente cuidado, aspiracional | "El lugar", tamaño mediano |
| 10 | IG-16 Espejo · IG-01 Cocina abierta | Detalle; IG-01 muestra la cocina pero no la comida | Pequeñas u opcionales |

### Lo que sobra (fuera de la web)
- **IG-13** (textil de la invitación a la apertura), **IG-15** (espumante "Salud! Por los nuevos proyectos"), **IG-16/17/18/19** usados como bitácora: **elimina la apertura completa** (orden del cliente). IG-17 se queda solo como foto de ambiente, sin fecha ni texto.
- **IG-04 manos doradas en corazón**: es el "Puro Amor" en imagen y resta glamour. Fuera.
- **IG-09 rosas del día de la madre con cartel "Abierto"**: es una foto de efeméride y tiene texto incrustado. Fuera.
- **IG-02 lámina de horario**: fuera como imagen; su contenido pasa a texto en el pie.
- **IG-19 logo sobre negro, 553 px**: solo como fuente del logotipo, nunca como imagen.
- **IG-18 individual estampado**: a lo más como textura o detalle, no como foto.

---

## 3. Lo que dicen los clientes (argumentos de venta)

Conteo sobre las 11 reseñas con texto (Google 6 de clientes reales + Tripadvisor 4 + 1 de prensa; se excluyen "Marca Tu Marketing" y la de Christine, que no tiene texto):

| Argumento | Menciones | Cita literal más fuerte (para la web) |
|---|---|---|
| **"Lo mejor de Castro"** (superioridad local) | 4 | "El mejor restaurante de Castro" — Alejandra, vía Google · "lo mejor que probé en Castro" — Catalina, vía Google · "Un imperdible en Castro." — carol, vía Tripadvisor · "Un lugar distinto que vale totalmente la pena conocer en Castro." — Sammy |
| **Atención** | 7 | "Desde la recepción notas detalles que marcan la diferencia…" — Mauricio · "De lux exquisito y super bien atendido" — Abel |
| **Sorrentinos de centolla** | 5 | "sorrentinos de centolla 10/10" — Viviana, vía Tripadvisor (Miami) |
| **Frescura y producto de mar** | 5 | "las mejores ostras, erizos y sorrentinos de centolla" — carol · "la corvina estaba demasiado fresca…" — Alejandra · "rico, fresco" — Andres |
| **El lugar, la decoración y el cuidado** | 5 | "la decoración muy acogedora, iluminación ideal" — Mauricio · "El lugar tiene una decoración muy linda, se nota el cuidado." — Alejandra · "el lugar es precioso" — carol |
| **Ganas de volver** | 4 | "con el corazón contento y la promesa de volver." — Mauricio · "Me quedan dos días acá y no dejaré de venir" — Alejandra |
| **Pequeño e íntimo (11 mesas)** | 2 | "un local pequeño (11 mesas aprox)" — Mauricio. **Hay que reservar** |
| **Calidad sobre precio** | 1 | "Los precios están dentro del promedio… pero la calidad de este los supera con creces." — Alejandra |
| **Turistas extranjeros** | 2 | "Essen war hervorragend… Sehr empfehlenswert" — Peter, vía Google (en alemán) · Viviana, Miami |
| **Pulpo, murta sour** | 2 | "El pulpo demasiado bien preparado." — Alejandra · "dos murta sour (perfectos)" — Mauricio |
| Estacionamiento | 2 | Dato práctico; va en el pie, no se vende arriba |
| Prensa | 1 | "…cocina chilota contemporánea." — NiTanRetro FM |

**Cuáles van arriba, en este orden:**
1. **"El mejor restaurante de Castro"** con la nota **5,0 en Google**. Es el titular natural de la marca y sale de una clienta, no de A MAR, así que respeta la regla de ghostwriter.
2. **Los platos con su reseña.** Cada plato fotografiado se presenta con la frase de un cliente que lo menciona. Es la prueba de que la comida es lo mejor.
3. **Atención y lugar**, que acompañan el bloque del ambiente.
4. **Volver y reservar**: la frase de Mauricio ("11 mesas aprox" o "la promesa de volver") va junto al botón de reserva, para dar escasez y deseo sin escribir nada propio.

Notas:
- Tripadvisor tiene Comida 4,0 y una reseña de 3★. Se muestran solo las notas globales (Google 5,0 con 9 reseñas y Tripadvisor 4,5 con 4) y **nunca se dice "todas 5 estrellas"**.
- "nuestro Hit de Otoño" (IG-06) está fuera de temporada en octubre. Se usa "Sorrentinos de Centolla" con la cita de Viviana; el "Hit" queda sujeto a confirmación.
- No se nombra a Maximiliano ni a la chef hasta que se confirme (ya está en brand-voice).

---

## 4. Jerarquía propuesta de la página

Los pesos son el porcentaje aproximado del scroll total. La suma de comida y reseñas es de alrededor del 70 %.

| # | Bloque | Objetivo | Contenido | Peso |
|---|---|---|---|---|
| 0 | **Barra fija mínima** | Que reservar esté siempre a un toque | Logotipo chico a la izquierda; "Reservar" (WhatsApp) a la derecha; selector ES/EN. Transparente sobre la portada y sólida al hacer scroll | — |
| 1 | **Portada: ostras a sangre** (IG-05) | Que en 1 segundo se vea qué es: mar chilote y cuidado | Foto + "Cocina de Mar… y Tierra" + "Castro · Chiloé" + un chip discreto "★ 5,0 Google". **Sin la palabra "amor" y sin el logotipo gigante** | 12 % |
| 2 | **El veredicto** | Dar autoridad: hace el papel del premio que no tiene | Una cita grande, con mucho aire: "El mejor restaurante de Castro" — Alejandra · vía Google. Debajo, en chico: 5,0 Google (9) · 4,5 Tripadvisor (4) | 8 % |
| 3 | **Los platos (el momento memorable)** | Que la comida protagonice y dé hambre | 5–6 láminas grandes y seguidas. Cada una lleva la foto, el **nombre literal de la marca** y **la reseña que lo menciona**. Orden: ① Sorrentinos de Centolla + "sorrentinos de centolla 10/10" (Viviana) ② Pulpo a la Gallega ("uno de nuestros imperdibles") + "El pulpo demasiado bien preparado." (Alejandra) ③ Erizos Frescos + "las mejores ostras, erizos y sorrentinos de centolla" (carol) ④ Pulpo y Chapaleles a la Chapa ⑤ Murta Sour + "dos murta sour (perfectos)" (Mauricio). Las ostras ya fueron portada, así que pueden reaparecer pareadas con los erizos | 35 % |
| 4 | **Lo que dicen** (reseñas) | Prueba social con jerarquía, no un carrusel plano | 1 cita destacada grande (Mauricio: "Nos fuimos… con el corazón contento y la promesa de volver.") + 4–5 citas medianas en una grilla editorial (Catalina, Sammy, Andres, Abel, Peter en alemán) con estrellas, nombre y fuente. Al cierre, una línea de prensa: "…cocina chilota contemporánea." — NiTanRetro FM. Enlaces "Ver en Google" y "Ver en Tripadvisor" | 15 % |
| 5 | **El lugar** | Glamour del espacio, y que lo íntimo se lea como algo exclusivo | Foto grande del salón (IG-03) + composición asimétrica con barra (IG-17), mesa y ventanal (IG-11) y calas con la carta (IG-00). Una sola cita: "la decoración muy acogedora, iluminación ideal" (Mauricio) o "se nota el cuidado" (Alejandra). Cocina abierta (IG-01) y espejo (IG-16) son opcionales y en tamaño chico | 15 % |
| 6 | **Cierre y reserva** | Convertir | Fachada nocturna a sangre (IG-12) + "Los Esperamos en Chiloé!" (IG-11, literal) + botón "Reservar por WhatsApp" + línea de escasez citada: "un local pequeño (11 mesas aprox)" — Mauricio | 10 % |
| 7 | **Pie informativo** | Datos completos y a mano, sin protagonismo | En 3 columnas de texto chico: **Horario** (ma–sá 13:00–16:30 / 18:30–22:00 · do 13:00–17:00 · lu cerrado, de la lámina IG-02; está por confirmar) · **Dirección** (Calle Río Gamboa 114, local 109, Castro; "Cómo llegar" enlaza a Google Maps; "estacionamiento" como dato) · **Contacto** (+56 9 3878 0008, WhatsApp, @amar_chiloe). **Sin un mapa embebido grande**; a lo más un mapa mini o solo el enlace | 5 % |

**Móvil** (más del 75 % del tráfico): además de la barra superior, una **barra inferior fija** que aparece después de la portada, con dos acciones: **Reservar** (WhatsApp) y **Cómo llegar** (Maps). A la izquierda lleva un estado pequeño calculado con el horario: "Abierto ahora · hasta 16:30" o "Abre a las 18:30". Así el horario y la ubicación quedan siempre accesibles sin ocupar una sección, que es exactamente lo que pidió Pablo.

**Texto total propio y de interfaz:** menos de 120 palabras. Todo lo demás son nombres de platos literales y citas de clientes.

---

## 5. Qué se elimina de v1

- Portada negra con el logotipo gigante (no muestra comida).
- "Espacio hecho con Amor" y "Puro Amor en A🩵MAR": **la palabra "amor" no aparece en ningún texto de la marca en la web.** Si aparece en una reseña ("corazón contento"), puede quedarse.
- La cinta en movimiento (marquee) con nombres de platos: se lee barata.
- La galería "Siempre frescos" de tarjetas chicas y su repetición (en v1 aparece dos veces).
- La bitácora "La apertura" completa (25-abr al 08-may) y las fotos IG-13, IG-15, IG-04, IG-09 y IG-19 como imagen.
- La lámina de horario a media página y el mapa ilustrado grande de "Visítanos".
- El "Los Esperamos" duplicado (en v1 hay dos cierres): queda uno solo.
- El carrusel de reseñas en texto plano: se reemplaza por los bloques 2, 3 y 4.

---

## 6. Puntos a confirmar con el cliente (no bloquean)
- El horario vigente: la lámina IG-02 está cortada y Google y Tripadvisor dicen que es corrido.
- Si los sorrentinos siguen en carta y si se puede seguir usando "Hit".
- Los nombres de la chef y de Maximiliano (aparecen en reseñas y podrían sumar mucho a la atención).
- Fotos nuevas, sobre todo de postres (crème brûlée y marquise, citados por Mauricio) y de la pesca del día. Hoy no existen.

---

## Resumen (decisiones clave)
1. Los referentes (Boragó, Central, Maido, Elkano, Kol, Septime, La Mar) abren con la imagen y casi sin texto, tienen la reserva siempre a un toque y dejan el horario y la dirección juntos al final o en el pie.
2. A MAR no tiene premios: **sus reseñas cumplen el papel del premio** y se tratan con sobriedad editorial.
3. Portada: **ostras (IG-05) a sangre**, con "Cocina de Mar… y Tierra", "Castro · Chiloé" y un chip "★ 5,0 Google". Sin "amor" y sin el logotipo gigante.
4. Segundo bloque: el veredicto "El mejor restaurante de Castro" (Alejandra, vía Google) con las notas 5,0 Google y 4,5 Tripadvisor.
5. El momento memorable es el **recorrido de platos a sangre, cada uno con la reseña que lo menciona**: sorrentinos, pulpo a la gallega, erizos/ostras, pulpo y chapaleles, murta sour.
6. Argumentos de venta por frecuencia: atención (7), sorrentinos de centolla (5), frescura (5), el lugar (5), "lo mejor de Castro" (4) y volver (4).
7. Después vienen las reseñas con jerarquía (una grande y 4–5 medianas, con Peter en alemán para el turista) y una sola línea de prensa (NiTanRetro FM).
8. "El lugar": salón, barra, mesa y calas, con una cita sobre la decoración. La cocina abierta y el espejo son opcionales.
9. Cierre: la fachada nocturna (la foto más gustada) + "Los Esperamos en Chiloé!" + WhatsApp + "11 mesas aprox" (cita) como escasez.
10. Reserva, horario y ubicación: botón fijo arriba, barra inferior fija en móvil (Reservar · Cómo llegar · estado abierto/cerrado) y el detalle completo en el pie. Sin un mapa grande.
11. Se eliminan la apertura completa, IG-04, IG-09, IG-13, IG-15, la cinta en movimiento, las tarjetas chicas, la lámina de horario, el mapa grande y el cierre duplicado.
12. Fotos cuadradas de 1080 px: a sangre real en móvil; en escritorio, grandes con aire o en díptico, para que no pierdan nitidez.
13. Menos de 120 palabras propias. El resto son nombres literales de platos y citas de clientes.
14. A confirmar: el horario vigente, si los sorrentinos siguen como "Hit", los nombres de la chef y de Maximiliano, y fotos de postres y pesca del día.

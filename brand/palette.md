# Paleta (F04)

`tools/palette.py`: k-means (k=7) sobre cuatro grupos de fotos de Instagram — interior (IG-01, 03, 11, 12, 16, 17), platos (IG-05 a 08, 10), piezas (IG-02, 04, 13, 19) y textil (IG-13, 18). El cian del isotipo se midió como mediana de los píxeles celestes de IG-19.

| Token | Hex | Origen |
|---|---|---|
| --noche | #0d0e10 | fondo del logo y de las láminas (piezas #010000, interior #17191c) |
| --tinta | #1b1c1e | texto sobre claro |
| --ola | #42c0ef | isotipo (mediana IG-19 #42c0ef) |
| --espuma | #f4efe7 | mesón de terrazo y muros (platos #d4c8bd, textil #e6d4b9, aclarado) |
| --terrazo | #e4dccd | superficies secundarias claras |
| --mimbre | #b7956c | lámparas de ratán y sillas de madera (interior #b7956c) |
| --azulejo | #4a6a7b | azulejo verde-azulado de la barra (mediana IG-11 #456a7d) |
| --petroleo | #2c3e4a | franja azul del textil (textil #324350) |
| --cobre | #9a5418 | naranja del textil y salsas (platos #aa5e16) |

Contraste (`tools/contrast.py`, WCAG 2.1):
- espuma/noche 16,9 · tinta/espuma 14,9 · ola/noche 9,2 · mimbre/noche 6,9 · espuma/petróleo 9,7 · cobre/espuma 5,0 · ola/petróleo 5,3 → aptos para texto.
- azulejo/espuma 5,0 con #4a6a7b → apto para texto.
- mimbre/petróleo 3,97 → solo decorativo o texto grande.

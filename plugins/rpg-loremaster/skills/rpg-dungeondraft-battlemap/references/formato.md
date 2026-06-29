# Formato `.dungeondraft_map` (Dungeondraft 1.2.0.1, format 3)

Especificação obtida por engenharia reversa do `Dungeondraft.dll` (CIL descompilado:
`Level.Load`, `CaveMesh`, `Wall`, `Portal`, `Lights`, `FloorTileMap`, `Pathway`, `Prop`,
`PatternShape`, `Roof`, `Text`, `Terrain`, `WaterMesh`, `ClipperEx`, `DictionaryEx.Read*`)
e validada empiricamente no Foundry do GM em 2026-06-10.

## Índice

1. [Regras de ouro](#regras-de-ouro)
2. [Coordenadas e grades](#coordenadas-e-grades)
3. [Estrutura do arquivo](#estrutura-do-arquivo)
4. [Caverna](#caverna)
5. [Paredes e portais (portas/janelas)](#paredes-e-portais)
6. [Piso: tiles, patterns e materiais](#piso)
7. [Terreno (splat)](#terreno)
8. [Água (rios e lagos)](#água)
9. [Objetos, luzes, paths, textos, telhados](#nós-restantes)
10. [Multi-andares](#multi-andares)
11. [Helpers de leitura (semântica de erro)](#helpers-de-leitura)

## Regras de ouro

1. **NUNCA monte o arquivo do zero.** O load do DD é um try/catch que aborta EM SILÊNCIO
   (mapa abre vazio, sem erro). Sempre parta de um scaffold salvo pelo próprio DD do
   usuário (`assets/scaffold.dungeondraft_map`) e substitua só o conteúdo dos níveis.
   Causa raiz comprovada: cabeçalho à mão sem o bloco top-level `mod`
   (`{".node_table": {}}`) e sem o `editor_state` completo (`color_palettes`,
   `*_tags_memory`, `*_library_memory`, `sharpen_fonts`) → mapa em branco.
2. **Toda textura referenciada deve existir** no pck (`assets/pck_index.txt`) ou num
   pack ativo (`res://packs/<ID>/...`). Textura quebrada = risco de abort silencioso.
3. **Arrays serializados são strings Godot**: `PoolByteArray( 1, 2 )`,
   `PoolIntArray( -1, 0 )`, `PoolVector2Array( x, y, x, y )`, `Vector2( x, y )` —
   separador `", "`, espaços após `(` e antes de `)`.
4. **node_id**: string hexadecimal, única no mapa inteiro; `world.next_node_id` (hex
   string) deve ser maior que todos. `next_prefab_id` também é string ("0").
5. Recursos novos (água, telhado, portas) que nunca foram abertos no DD do usuário:
   gere um `teste_<recurso>.dungeondraft_map` minúsculo primeiro e peça pro usuário
   abrir — a bisseção é barata e o abort é mudo.

## Coordenadas e grades

- **1 célula do grid = 256 px** em coordenadas de mundo. Célula `(cx, cy)` → centro em
  px: `(cx*256+128, cy*256+128)` (origem no canto NW, y cresce pra baixo).
- **Grade de caverna**: `(4w+3) × (4h+3)` subcélulas de 64 px (w,h = células do mapa).
  Subcélula `s` → px `(s-1)*64`. Derivação: `round(w*256/64)+1+2*MapEdgeBuffer`, buffer=1.
- **Splat de terreno**: `4w × 4h` pontos, 4 bytes RGBA por ponto.
- Rotações em **radianos**. Cores em **"aarrggbb"** (hex minúsculo, alpha primeiro).

## Estrutura do arquivo

JSON com indentação tab. Top-level: `header`, `world`, `mod` (os três obrigatórios).

```
header:   creation_build, creation_date{...}, uses_default_assets,
          asset_manifest[...], editor_state{... 12 chaves — copie do scaffold}
world:    format=3, width, height, next_node_id(hex str), next_prefab_id("0"),
          msi{offset_map_size:512, max_offset_distance:0.2, cell_size:64, seed},
          grid{color, texture}, building_wear, wall_shadow, object_shadow,
          trace_image_visible, embedded{}, levels{"0": {...}, "1": {...}}
mod:      {".node_table": {}}
```

Nível (todas as chaves obrigatórias — `Level.Load` usa `get_Item` direto na maioria):

```
label, environment{baked_lighting, ambient_light}, layers{...8 padrão},
shapes{polygons:[], walls:[]}, tiles{cells, colors, lookup}, patterns[],
walls[], portals[], cave{...}, terrain{...}, water{...}, materials{},
paths[], objects[], lights[], roofs{shade,shade_contrast,sun_direction,roofs:[]},
texts[], texts_vis
```

## Caverna

```json
"cave": {
  "bitmap": "PoolByteArray( ... )",          // (4w+3)*(4h+3) bits, LSB-first, row-major
  "ground_color": "ff7a6c59",
  "wall_color": "ff3d2c18",
  "entrance_bitmap": "PoolByteArray( ... )", // mesmo formato; boca aberta na borda
  "texture": "res://textures/caves/colorable/floor.png"
}
```

- bit 1 = área escavada (chão); o DD desenha a rocha em volta sozinho.
- Tamanho do array: `ceil(bits/8)`; o `entrance_bitmap` é validado como
  `w*h/8 + 1` (divisão inteira) — errado só loga warning, não trava.
- **A caverna NÃO gera paredes vetoriais** (line-of-sight). Para paredes visíveis e
  exportáveis ao Foundry, trace o contorno do bitmap e emita nós `walls` (deixando as
  bocas abertas onde tocam a borda).

## Paredes e portais

Parede (`level.walls[]`):

```json
{
  "points": "PoolVector2Array( x, y, x, y, ... )",  // px de mundo
  "texture": "res://textures/walls/stone.png",
  "color": "ff605f58",
  "loop": false,            // true = polígono fechado (sala)
  "type": 0, "joint": 0,    // enums (0 = padrão)
  "normalize_uv": false,
  "shadow": true,
  "node_id": "a3",
  "portals": []             // OBRIGATÓRIO mesmo vazio (NullRef se ausente)
}
```

Texturas de parede default: `stone, stone_09, stone_12, wood, wood_02..04, cobble,
concrete, battlements, null` (null = parede invisível que bloqueia — útil p/ janelas
de visão). Cores boas: stone `ff605f58`, wood `ff705e4b`, cobble `ff7c7c7c`.

Portal (porta/janela) — **aninhado no array `portals` da parede** a que pertence:

```json
{
  "position": "Vector2( x, y )",       // px absoluto do centro do portal
  "rotation": 1.5708,                  // rad — alinhe com a direção do segmento
  "scale": "Vector2( 1, 1 )",
  "direction": "Vector2( dx, dy )",    // tangente unitária do segmento (Begin/End = pos ∓ dir*radius)
  "texture": "res://textures/portals/door_01.png",
  "radius": 64.0,                      // metade do vão em px (porta 1 célula ≈ 96–128)
  "point_index": 0,                    // índice do PONTO inicial do segmento na parede
  "wall_id": "a3",                     // node_id da parede dona (hex, format 3)
  "wall_distance": 0.5,                // ⚠️ NÃO é px: point_index + fração (0..1) do segmento
  "closed": true,
  "node_id": "a4"
}
```

Portais soltos (arcos sem parede) vão em `level.portals[]` com o mesmo formato
(`wall_id` "0"). Portas: `door_00..13`, `door_16..21`, `portcullis_01/02`,
`threshold_01`. Janelas: `window_01..16`.
O portal NÃO abre buraco geométrico na parede — o DD corta a linha entre
`Begin/End` (derivados de position ∓ direction×radius) e desenha a folha;
mantenha os pontos da parede passando direto pelo vão.

> **Incidente (2026-06-11):** `wall_distance` em px (ex. 1664.0) em vez de
> `índice+fração` (3.5) fez as portas/janelas não renderizarem e **apagou a
> parede inteira** quando ela era `loop` — o RemakeLines ordena os cortes por
> `wall_distance` e o valor gigante corrompe a remontagem. Semântica extraída
> de `Wall.ReanchorPortal` (IL): `wd = point_index + dist_no_segmento/seglen`.

## Piso

**Tiles** (grade de células inteiras — rápido p/ interiores retangulares):

```json
"tiles": {
  "cells": "PoolIntArray( -1, 0, 0, ... )",   // w*h; -1 = vazio; senão índice do lookup
  "colors": ["ffffffff", ...],                 // w*h strings (tinta por célula)
  "lookup": {"0": "res://textures/tilesets/simple/tileset_cave.png"}
}
```

Tilesets default: `simple/tileset_{cave,cobble,cut_stone,worn_cobble,wood_damaged,
plank_45,herringbone,straw,sewers,roman_tiles,...}`, `smart/tileset_wood_vertical`,
`smart_double/tileset_stone`.

**Patterns** (`level.patterns[]`) — polígono livre de piso (tapetes, lajes, formas
não-retangulares):

```json
{
  "position": "Vector2( 0, 0 )",
  "shape_rotation": 0,
  "scale": "Vector2( 1, 1 )",
  "points": "PoolVector2Array( ... )",   // px absolutos do polígono
  "layer": 200,
  "color": "ffffffff",
  "outline": true,
  "texture": "res://textures/patterns/<...>.png",  // ver assets.md
  "rotation": 0,                          // rotação da TEXTURA dentro do shape
  "node_id": "b1"
}
```

**Materiais** (`level.materials{}`): pintura de chão externa (relva, pedras) — formato
`{"<material>": [meshes...]}`; complexo e raramente necessário: prefira terreno+patterns.
Deixe `{}`.

## Terreno

```json
"terrain": {
  "enabled": true,
  "expand_slots": false,            // true → 8 texturas e splat2
  "smooth_blending": false,
  "texture_1": "res://textures/terrain/terrain_dirt.png",   // canal R
  "texture_2": "res://textures/terrain/terrain_grass.png",  // canal G
  "texture_3": "res://textures/terrain/terrain_sand.png",   // canal B
  "texture_4": "res://textures/terrain/terrain_snow.png",   // canal A
  "splat": "PoolByteArray( 255, 0, 0, 0, ... )"             // 4w*4h pontos RGBA
}
```

Pinte por região somando canais (normalize ~255 por ponto p/ blend limpo). Com
`expand_slots: true` adicione `texture_5..8` e `splat2` (mesmo tamanho).
Terrenos default: cracked_earth, dirt, dry_grass, grass, gravel, limestone, moss,
rocky, sand, sandstone, snow, swamp, void.

## Água

```json
"water": {
  "disable_border": false,
  "tree": {                               // polytree (ClipperEx) — raiz
    "ref": 0,
    "polygon": "PoolVector2Array(  )",    // raiz: vazio
    "join": 0, "end": 0,
    "is_open": false,
    "deep_color": "ff19384e",
    "shallow_color": "ff317c8c",
    "blend_distance": 96.0,
    "children": [ { ...mesmo formato; polygon = contorno do corpo d'água;
                     children = ilhas (buracos) ... } ]
  }
}
```

- Lago/rio largo: child com polígono fechado (`is_open: false`).
- `is_open: true` + `end`/`join` (enums do Clipper: join 0..2, end 0..4) = traçado
  aberto engrossado (rio por linha central). **Recurso experimental** — sem `tree`
  o mapa carrega normal (chave opcional); valide com `teste_agua` na primeira vez.

## Nós restantes

**Objeto** (`objects[]`): `position, rotation, scale, mirror, texture, layer(100),
shadow, block_light, node_id` (+`custom_color` opcional — só em assets "colorable").

**Luz** (`lights[]`): `position, rotation, range, intensity, color, texture
("res://textures/lights/soft.png" | point | fragments), shadows, node_id`.
`range` ≈ células (TextureScale = range*512/larguraTextura). Lanterna: range 3,
intensity 0.8, "ffffc170". `environment.ambient_light` mais escuro (ex. "ff888888")
faz as luzes aparecerem.

**Path** (`paths[]`): `position, rotation(0), scale, edit_points (PoolVector2Array
RELATIVO à position), smoothness(0|1), texture(res://textures/paths/...), width(px),
layer, fade_in, fade_out, grow, shrink, loop, node_id`. Usos: estradas (cobble/stone),
trilhas, **escadas** (stairs_stone/wood), penhasco (cliff), cercas, trilho de sangue,
sombra/arraste (shadow_(flat)), corda.

**Texto** (`texts[]`): `text, position (px, canto sup-esq), font_name ("" = default),
font_size, font_color, box_shape(0), box_border_width, box_background_color,
box_border_color, node_id`. Bom para rótulos GM-only (lembre: aparece na exportação!).

**Telhado** (`roofs.roofs[]`): `position, rotation, scale, points (PoolVector2Array),
texture (res://textures/roofs/<estilo>/tiles.png), width, type (int: 0 hip/1 gable...),
node_id`. **Experimental** — valide com teste na primeira vez.

## Multi-andares

`world.levels` é dict `{"0": {...}, "1": {...}}` — chaves são índices sequenciais em
string, na ordem da UI (térreo = "0"). Cada nível é um level dict completo e
independente (paredes, piso, objetos, luzes próprios). `label` livre ("Térreo",
"1º andar", "Porão"). `header.editor_state.current_level` = índice do nível ativo.
Andares de cima: deixe `cave` zerado, pinte só onde há laje (tiles/patterns), e
alinhe escadas (paths stairs) verticalmente entre níveis.

## Helpers de leitura

Semântica dos leitores do DD (decide o que é opcional):

| Helper | Ausente → | Observação |
|---|---|---|
| `Read<T>` genérico | default | faz `Str2Var(ToString(v))` — strings Godot OK |
| `ReadBool/Float/Int` | default | unbox direto; JSON number vira Single |
| `ReadColor` | branco | `new Color("aarrggbb")` |
| `ReadTexture` | null | path `res://` completo; `embedded://` p/ embutidas |
| `ReadHex` | 0 | `Int32.Parse(ToString(v), HexNumber)` |
| `ReadEnum` | **EXCEÇÃO** | `type`/`joint` da parede: sempre inclua! |
| `Dictionary::get_Item` | **EXCEÇÃO** | maioria das seções do Level: inclua todas |

---
name: rpg-dungeondraft-battlemap
description: >-
  Generates an editable Dungeondraft battlemap file (`.dungeondraft_map`) from
  the description of a place — any kind: houses, taverns, crypts, caves,
  forests, rivers with bridges, villages, dungeons, multi-floor buildings. It
  designs the functional layout (rooms, circulation, doors, windows, water,
  terrain, light) and assembles the file via a Python toolkit validated by
  reverse-engineering the format. This is the **executable counterpart** to
  `rpg-map-architect` (which emits an image-generation prompt): use this skill
  when the user wants an actual map FILE they open in Dungeondraft, edit, and
  export to a VTT. Trigger on "a Dungeondraft map", "an editable battlemap
  file", "a vector battlemap", "gera o mapa no Dungeondraft", "mapa de batalha
  editável", or "gera o .dungeondraft_map de <lugar>". Requires Python 3 and the
  user's own Dungeondraft license.
---

# Dungeondraft battlemaps (executable, `.dungeondraft_map`)

Takes the description of a place and delivers a `.dungeondraft_map` that opens in the user's Dungeondraft — a layout thought through as a real place, not a rectangle with objects tossed in. The user tweaks it in DD and exports to their VTT.

## Relationship to `rpg-map-architect`

Two siblings, two artifacts:
- **`rpg-map-architect`** emits a **top-down image prompt** (for nano-banana / a strong instruction-following image model) → a painted PNG the GM imports as a scene background.
- **`rpg-dungeondraft-battlemap`** (this skill) builds an **editable vector map file** → opened in Dungeondraft, hand-tuned, then **Export → Universal VTT (`.dd2vtt`)**, which carries vision walls + lights into Foundry (via the Universal Battlemap Importer). The richer path when the GM wants walls and dynamic lighting, not a flat image.

Pick this skill when the user says "Dungeondraft", wants an **editable** map, or wants walls/lighting to come across into the VTT. Like `rpg-map-architect`, this skill produces the map **artifact** and hands off — it does not create the Foundry scene or call MCP tools. The GM imports the map; then `rpg-scene-forge` (foundry-forge) lights and populates the scene by name.

## Dependencies

- **Python 3** (standard library only — the toolkit imports `json`, `math`, `os`, `struct`, `copy`; no `pip install`).
- **The user's own Dungeondraft license** — they open and export the file in their DD.
- A **third-party asset pack** (e.g. Forgotten Adventures) is **optional**: the skill works with Dungeondraft's default assets, validated against `assets/pck_index.txt`. If the user has a pack and wants its objects, index it (see "Asset packs" below) and prefer its `res://packs/<ID>/...` objects.

## Non-negotiable rules (learned the hard way)

1. **Never assemble the file from scratch.** Use `scripts/ddmap.py`, which starts from the scaffold in `assets/scaffold.dungeondraft_map` (saved by a real Dungeondraft). DD's load aborts **silently** if the header isn't byte-identical to what it writes itself — the map opens blank, with no error.
2. **Every texture validated.** `save()` validates against the pck index and refuses to write with a non-existent texture. Don't guess names: check `references/assets.md` or grep `assets/pck_index.txt`.
3. **Experimental feature → test it first.** Water, roofs, and free portals are marked experimental in `references/formato.md`. The first time, generate a tiny `teste_<feature>.dungeondraft_map`, ask the user to open it, and only then use it in the real map. When confirmed, update the status in `formato.md`.
4. **If "nothing appeared": bisect.** Emit variants of the map with one feature per file (the builder makes this cheap) and ask the user to open each. That's how the format was decoded; it's the shortest path.

## Flow

### 1. Understand the place (before any code)

Extract from the description (and from the vault, if the location exists there — honor the canon): kind of place, size, floors, time of day, tone. Ask the user only what changes the map (grid size, interior/exterior, floors) and can't be inferred.

Reference sizes (1 cell = 5 ft): house 20×14 · tavern 25×18 · small crypt/dungeon 22×16 · crossing/exterior 28×16 · village 35×25.

### 2. Design the functional program

Think about how the place works in the real world and write (as a comment in the script) the list of zones with rectangles/centers in cells BEFORE composing:

- **Zones and purpose.** A tavern needs a common room with a bar (kegs behind it), a kitchen with stove/hearth, a pantry, stairs to the rooms above. A smithy needs a forge, an anvil nearby, a quench trough (water), coal.
- **Circulation.** Every zone needs access: doors between rooms, the main entrance facing the road, a service back door. Trace the path of a resident and of an intruder — both have to work.
- **Physical logic.** Water flows and crosses the map (a river enters and exits at the edge); bridges cross at the narrow point; hearths on outside walls; windows on outside walls, never internal; a second-floor staircase aligned vertically between levels.
- **Sensory layer.** Diegetic light (hearth, candles, windows), wear (rubble, cobwebs in little-used corners), life (food on the table, tools hung up).
- **Decoration density.** A sparse map looks unfinished (real GM feedback). Aim for ~1 object per 2–3 usable cells: every room with a large anchor (table, bed, forge) + satellites (chairs, chests) + small clutter in corners and on furniture (crockery, papers, tools). Floors always contrasting between rooms (wood × stone × dyed rug).
- **Furniture × floor contrast** (real feedback: a light wooden table vanished on the light floorboards). Three levers: (1) `shadow=True` on ALL large furniture (tables, chairs, bars, beds, barrels — small clutter without); (2) if furniture and floor share a material, darken the floor with the pattern's tint (`color='ffb89c72'` ≈ 30% darker works well on wood); (3) prefer contrasting material pairs (wood on flagstone, stone on plank).
- **Legible ambient light.** Don't go below `ff8a8a8a` by default — the GM darkens it in Foundry; an almost-black map in DD just hides the work. Night = moderate ambient + strong diegetic lights.
- **Playability.** Broken lines of sight (pillars, large furniture), more than one route between key areas, cover. A good battlemap has tactics.
- **The user's pack assets first.** If there's an active indexed pack (see "Asset packs"), prefer its objects (`res://packs/<ID>/...`) — GMs find them prettier than the defaults. Without a pack index, use defaults and say it can be reskinned later.

### 3. Compose with the toolkit

```python
import sys; sys.path.insert(0, '${CLAUDE_PLUGIN_ROOT}/skills/rpg-dungeondraft-battlemap/scripts')
from ddmap import DDMap
m = DDMap(width=25, height=18)               # cells
# order: terrain → water → cave → buildings → paths → objects → lights → roof → text
m.paint_terrain(2, (0, 0, 25, 18))           # channel 2 = grass (default)
m.add_water([(20, -1), (21, 8), (20, 19)], is_open=True)   # river (experimental)
hall = m.add_room(3, 3, 10, 8, texture='wood', floor='simple/tileset_wood_interlaced')
m.add_door(hall, seg=2, t=0.5)               # seg = segment index; t ∈ (0,1)
m.add_window(hall, seg=0, t=0.25)
m.add_object('furniture/beds/bed_01', 4.5, 4.2, rot=1.57)
m.add_light(6, 5, range_cells=2.5, intensity=0.7)          # hearth/candle
m.add_stairs([(12.5, 9), (12.5, 11)], material='wood')
m.add_level('1', '1st floor'); m.use_level('1')            # floors
m.paint_tiles(3, 3, 10, 8, 'simple/tileset_plank_45')
m.use_level('0')
print(m.ascii_preview())                     # ALWAYS inspect before saving
m.save('~/Documents/<Place Name>.dungeondraft_map')
```

Full API in `scripts/ddmap.py` (docstrings); caves: `cave_room`/`cave_corridor`/`cave_entrance_at_edge` + `walls_from_cave()` (a cave does NOT generate a vision wall on its own) + `tiles_from_cave()`.

Keep the generator script next to the map (e.g. a `dungeondraft/` working folder) — it's the editable source of the map; regenerating is cheaper than hand-editing JSON.

(If `${CLAUDE_PLUGIN_ROOT}` isn't set in your environment, use the absolute path to this skill's `scripts/` directory instead.)

### 4. Inspect, save, deliver

- `ascii_preview()` BEFORE saving: topology right? doors on the right walls? nothing bleeding outside the map?
- `save()` validates and writes. Save to `~/Documents` (DD's maps folder).
- Tell the user: open it in DD, check it, adjust freely. For the VTT: Export → Universal VTT (`.dd2vtt`) → Universal Battlemap Importer (carries vision walls and lights along).

### 5. Iterate

The user will ask for changes ("the kitchen came out small", "drop the river"). Edit the generator script and regenerate — never the JSON by hand. If something doesn't render, rule 4. If you discover new format (a field, semantics, an asset), record it in `references/formato.md` — the next generation inherits it.

## Asset packs (optional)

The skill ships the **default** Dungeondraft pack index (`assets/pck_index.txt`) — enough to build with built-in assets. If the user has a third-party pack and wants its objects, index it once (a flat list of the pack's `res://packs/<ID>/...` paths in a sidecar text file, same shape as `pck_index.txt`) and point the builder at it; then prefer those objects. Without a pack, use defaults and note that the map can be reskinned in DD afterward. Do **not** assume a pack is present.

## References

| File | When to read |
|---|---|
| `references/formato.md` | A format question, a new field, a load-failure debug |
| `references/assets.md` | Choosing textures/objects (families cataloged) |
| `scripts/ddmap.py` | The toolkit API (docstrings on every method) |
| `assets/scaffold.dungeondraft_map` | Base scaffold — do NOT edit; replace only with another sample saved by the user's own Dungeondraft |

Scaffold from another machine/DD version: ask the user for any map saved by their DD and point `DDMap(scaffold=...)` at it. The scaffold must come from a real Dungeondraft save (rule 1) — never hand-author it.

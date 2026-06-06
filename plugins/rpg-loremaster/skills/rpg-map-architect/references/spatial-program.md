# Spatial Program — the engine

The toolkit for laying out a location as a *space that works*. Load for every map. It answers two questions in order: **what zones does this place need to function**, and **where does each zone go so the layout makes sense**. Grounded in architectural programming (function → required spaces → adjacencies) and the kit's location design (`rpg-location-creator`'s archetypes + Xandering principles), adapted from multi-room dungeons to a single tactical tile.

## Contents
1. The method — function → zones → objects → arrangement
2. Archetype programs (the seed table)
3. The placement grammar (where zones go)
4. Coherence tests

---

## 1. The method — derive the program from the function

Don't list furniture. Ask what the place *does*, and the zones fall out. Four moves:

- **Function** — what happens here, and who does it? (A tavern *serves drink and food and beds travellers*; a smithy *heats, shapes, and quenches metal*; a jail *holds people and controls who reaches them*.)
- **Required zones** — the functional areas that function demands. Each is a *cluster*, not one object. (Serving + storage + prep + circulation + threshold.) A zone is missing if its job can't be done.
- **Typical objects** — what populates each zone so it reads as that zone. (Serving → bar counter, stools, taps; storage → casks, crates, shelves.) Objects are *evidence of use*.
- **Arrangement** — where each zone sits relative to the others and the walls, so the place could actually be *run* (see §3). Adjacency is functional: prep next to serving, store next to prep, threshold controlling access.

The method is general — it works for a location not in the table below (a tannery, a printing house, a dragon's hoard-cave). Reason from function. The table is a starting seed, not a closed list.

**Always fold in the specific.** The location's own dossier (`rpg-location-creator`) fixes features the generic program doesn't: *this* tavern has a bricked-up well the cult meets around; *this* den is in a beached ship's hull. Honour those — they anchor the map's identity. The dossier's **fantastic feature** may be an *image or premise* (a whispering library) rather than a placeable object — translate it into the **physical fixed feature** on the map that expresses it (the toppled shelves, the iron-bound forbidden case).

**Compound locations.** When the fixed feature is itself a place-type with its own row (a den **inside** a beached ship, a shrine **inside** a cave), take the **program** (required zones) from the *activity* (den, shrine) and the **footprint + structural placement** from the *container* (ship, cave), then re-anchor each zone to the container's geometry — *bow/stern/port/starboard/amidships* for a hull, *the mouth / the back / a recess* for a cave — instead of cardinal walls. The beached-ship den keeps the den's zones (watched breach, fire, bunks, contraband, stash, bolt-hole) but lays them along the hull fore-to-aft.

---

## 2. Archetype programs (the seed table)

Each row: the **required zones** (the place won't function without them) and **signature objects** (what makes the zone read), plus the one **placement** note that most often goes wrong. Maps to `rpg-location-creator`'s nine narrative archetypes where relevant.

| Archetype | Required zones | Signature objects | Placement that matters |
|---|---|---|---|
| **Tavern / inn** | serving bar · common room · kitchen · cellar *(access)* · lodging stair *(access)* · privy · hearth · entry | bar counter + stools, casks/kegs behind the bar, dining tables + benches, cooking hearth + prep table, cellar trapdoor, staircase up, fireplace, rugs | bar along one wall, casks **behind** it; kitchen **adjacent to** the bar; hearth on an **exterior** wall; tables with **clear aisles**; privy off the common room on an outside wall; cellar & rooms are separate levels — show only the **trapdoor** and the **stair up** |
| **Bandit den / thieves' hideout** | watched entrance · common/fire area · sleeping bunks · contraband store · loot stash · bolt-hole (2nd exit) | barricade/lookout, central firepit or brazier, bedrolls/bunks, crates & barrels of smuggled goods, a strongbox/chest, a concealed tunnel | entrance **chokeable and watched**; stash **deep/hidden**, away from the entrance; a **second** way out; bunks against walls |
| **Shop / storefront** | customer counter · display floor · back stockroom · (workshop if a craftsman) | counter, shelves of wares, display tables, a strongbox, stacked stock in back, a curtain/door to the back | counter **between** customer space and stock; stockroom **behind** the counter; door faces the street |
| **Temple / shrine hall** | threshold/narthex · nave/assembly · altar/sanctum · side chapels/offerings · vestry/sacristy | doors, pews or a clear assembly floor, raised altar, idol/relic, braziers, offering bowls, side niches, a robing room | altar on the **far axis**, often raised; **processional aisle** down the centre; **vestry behind/beside the sanctum with a private door** so the celebrant enters from behind, not up the public aisle; symmetry reads as sacred |
| **Smithy / forge** | forge & anvil · quench + water · fuel store · tool wall · finished-goods/counter | brick forge with fire, anvil, quench trough, **water barrel** feeding it, coal/charcoal pile, hung tongs & hammers, rack of blades | the smith works a tight **forge → anvil → quench** triangle, a water barrel feeding the quench; fuel pile at the forge; tools on the wall behind the anvil |
| **Jail / guardpost** | guard station + duty nook · cell block · key board · arms store · holding/interrogation · entry control | guard desk, a stove + cot, barred cells with cots, a **key board** (guard-side), a lockable weapon rack, manacles, a heavy door | cells **off a corridor the guard controls**; keys on the **guard's board**; arms store **locked, away from cell reach**; duty nook by the entry control; **one** controlled entrance (correct — no second exit) |
| **Warehouse / storehouse** | loading threshold · stacked storage rows · ledger/foreman nook · (cellar/cold store) | wide doors, crate & barrel rows on a grid, sacks, a desk with ledgers, a hoist/pulley, a lantern | wide **cartable aisles** between rows; big doors for loading; office overlooking the floor |
| **Wizard's study / lab** | reading/desk · library · workbench/apparatus · specimen/component store · (summoning circle) | desk + books, shelves & scroll-racks, alchemy bench with glassware, jars & reagents, a chalked circle, an orrery | the **circle** clear and centred (it needs floor); bench by the components; books wall the room |
| **Throne / audience hall** | grand entrance · petitioner floor · raised dais/throne · guard flanks · (side doors) | great doors, a long runner/carpet, raised throne, banners, flanking guards' posts, braziers | throne on the **far axis**, raised; a **central runner** from door to dais; guards flanking |
| **Cottage / home** | hearth/kitchen · living/eating · sleeping · store/pantry | fireplace + cookpot, table + chairs, a bed, a chest, shelves, a rug | hearth on an exterior wall; bed in a corner; one main room, lived-in, not staged |
| **Cave chamber / beast lair** | mouth/entry · main den · nest/feeding · bones/midden · water · (deeper passage) | uneven rock walls, a nest of bedding/bones, gnawed remains, a pool, stalagmites, a dark passage out | **organic**, no straight walls; nest **deep** from the mouth; bones near the feeding spot; ≥1 onward passage |
| **Crypt / tomb** | descent/threshold · burial chambers · central sarcophagus/shrine · grave-goods niches · (sealed inner vault) | stairs, wall niches/loculi with remains, a raised sarcophagus, urns, offering shelves, a sealed door | sarcophagus **central or on the far axis**; niches line the walls; a **sealed** secret inner room |
| **Sewer / cistern junction** | channel/water · walkways/ledges · junction confluence · grates/outflows · (hidden alcove) | flowing channel, narrow ledges, a multi-way junction, barred grates, dripping pipes, debris | water through the **centre**; ledges along the channel; a junction is where **2+ channels meet** — render the number the fiction gives (a 3+ way confluence is the signature); a grate as a gate |
| **Ship deck** | main deck · helm/quarterdeck · masts/rigging · cargo hatch · companionway *(access below)* · fore/aft (bow & stern) | planking, ship's wheel on a raised quarterdeck, masts with coiled rigging, a deck hatch, a companionway/scuttle down, a capstan/windlass, barrels & crates lashed down, rails | hull shape is the footprint; helm **aft and raised**; masts on the centreline; hatch amidships; **companionway** just forward of the quarterdeck; capstan near the bow; the hold/quarters are a separate level |
| **Barracks / bunkhouse** | bunk rows · arms store · mess/table · washing · entry | rows of bunks, footlockers, a weapon rack, a long table, a wash basin, pegs | bunks in **ordered rows** along walls; arms by the door; communal table central |

If the location isn't here, **reason from §1**: name the function, derive the zones, populate, arrange.

---

## 3. The placement grammar (where zones go)

Right objects in nonsense places is the most common failure. The rules that keep a layout legible:

- **Fixed features anchor to walls.** Bars, hearths, counters, altars, forges, beds, thrones sit **against a wall or in a corner**, never marooned mid-floor. State which wall (north/south/east/west) — nano banana honours it.
- **Circulation runs through the centre.** Keep the middle **walkable**: aisles between tables, a corridor past cells, a processional/cargo aisle. Tabletop play needs token space — *clean, readable, uncluttered* is a design goal, not a style note. **Exception:** a **central ritual feature** (summoning circle, throne dais, central sarcophagus) *is* the focus — route a walkable **ring/ambulatory around** it, not through it.
- **Cluster by function into legible zones.** Group a zone's objects together so the eye reads "this is the kitchen." Scattering one barrel here, one there, dissolves the zones — the thing that made today's maps feel random.
- **Functional adjacency.** Put zones next to the zones they serve: kitchen by the bar, store by the kitchen, quench by the anvil, keys on the guard side, stash far from the entrance. Adjacency *is* the logic.
- **Entrances sized to the place's nature** (not a flat "≥2"). *Always:* at least one clear threshold, nothing blocking a doorway. *Then by type:* **dens, lairs, dungeons, smuggling sites — anything that needs an escape route** get a **second exit / bolt-hole** (Xandering's "≥2 entrances"); **controlled-access places** (jail, vault, throne hall, shop, cottage) deliberately have **one** entrance — and that's correct, never force a second door into a cell block. A civilian shop or home may add an *optional* back/service door (to a yard, quay, cellar) when the fiction warrants it.
- **Verticality at the edges.** Stairs, ladders, trapdoors, shafts go **against walls or in corners**, not blocking the floor — they connect without eating circulation.
- **One floor per tile.** A top-down map shows **one level**. Zones on other levels (cellar, upper rooms, a ship's hold, a sealed inner vault) appear only as their **access** on this floor — a trapdoor, a stair, a hatch, a sealed door — never as a cutaway room.
- **Density with breathing room.** Furnish enough to read as lived-in, but leave open floor. Empty corners are fine; a packed grid is unreadable and invites the model to invent clutter (the round-pit failure). When in doubt, fewer objects, clearly placed.
- **Symmetry signals formality.** Temples, throne rooms, and tombs read *ordered/sacred* with axial symmetry; taverns, dens, and caves read *lived-in/wild* with asymmetry. Match the layout's order to the place's nature.

Render the arrangement as a short **zone-placement list** before prompting — e.g. *"bar: N wall, casks behind; kitchen: NE behind bar; cellar trapdoor: by the bar; tables: centre with aisles; hearth: W wall; stair: SE corner; entry: S."* That list is what becomes the spatial spine of the prompt (`prompt-craft.md`).

---

## 4. Coherence tests

Before rendering, run both:

- **Function test** — could someone *run* this place? Every required zone present, every object able to do its job (barkeep reaches kegs + cellar; smith reaches anvil + quench + fuel; guard controls the cells and holds the keys), **and can each object physically coexist with its neighbours** — fire on a non-combustible base (not bare planking), water away from fuel, perishable/fragile stock away from heat and damp. Missing zone, unusable object, or an object that can't survive its spot → back to §1.
- **Spatial-sense test** — does every object sit in a sensible zone, is the centre walkable, are the **entrances right for this archetype** (≥2 where escape/exploration matters, exactly one where control matters), is nothing blocking a doorway or aisle? Hearth mid-floor, kitchen far from the bar, a choked aisle, or a prison with a back door → re-arrange (§3).

Pass both, and the *function* and *consistency* the GM is after are baked into the prompt before a single pixel is generated.

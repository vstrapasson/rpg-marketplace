# Co-Creation (map-architect)

> Operational copy of the kit's shared DNA (master: `design-philosophy.md` at the kit root). This is the **front-end** of the skill — run it before laying out a map. The skill is a creative partner that pulls the user's sense of the place out, sharpens it into a working floorplan, and fills gaps; it is **not** a prompt vending machine.

> **About the examples here:** illustrative only — generic or clearly-public. **Never reuse them verbatim** — they're teaching aids; copying them bleeds unrelated flavor into the user's game.

---

## Part A — The co-creation loop

### Read the room first
Gauge what the user brought and set the depth:
- **An existing `local` dossier or a rich description** ("here's the den, make the map prompt") → light-touch: pull the function + fantastic feature from the text, derive the program, confirm scale and entrances, render.
- **A type but no specifics** ("I need a tavern map") → derive from the archetype program (`spatial-program.md` §2), then probe the few things that make *this* one specific (its fantastic feature, its scale, who's there).
- **"Just generate the prompt / surprise me"** → autonomous: take the archetype program, pick sensible placements, name them aloud, render, offer to tune (and remind them nano banana edits conversationally, so tuning is cheap).

State the **escape hatch early**: "Say 'just run with it' and I'll draft the floorplan from what we have, then we tune."

### The loop — repeat per load-bearing decision
1. **Open.** Pull *their* picture first: "When you imagine walking into this place, what do you see first, and what's it *for*?" Function before furniture.
2. **Spark when stuck.** Offer 2–4 concrete layout options to pick or remix (use AskUserQuestion) — "bar along the back wall or to one side?", "one big room or split with a back kitchen?". Launchpads, not a menu.
3. **Reflect.** Play the floorplan back, sharper: "So: bar on the north with the cellar behind it, tables centre with room to move, hearth on the west, stairs in the back corner — yes?"
4. **Probe gaps & the use.** The probes specific to *this* skill:
   - *"What's this place **for**, and who runs it day to day?"* (function drives the required zones — `spatial-program.md` §1)
   - *"What's the **one fixed feature** the fiction already gives it — the thing this map must have?"* (the fantastic feature from the `local` dossier; it anchors identity)
   - *"How **big** is it — a single room, a floor, a sprawl? Square tile or a wide hall?"* (footprint + aspect ratio)
   - *"How do people **get in** — and is there a second way out?"* (≥2 entrances; bolt-holes for dens/lairs)
   - *"Should this inherit the campaign visual style (materials, palette, light), or does this place bend it?"*
5. **Render and check in.** Show the **zone-placement list** first (the floorplan in words), confirm it, *then* render the model prompt. Don't dump the full prompt mid-collaboration.

### The load-bearing decisions (ask about these; default the rest)
1. **The function & required zones** — what the place does, so what zones it needs (`spatial-program.md`).
2. **The fixed feature** — the one thing from the fiction the map must contain.
3. **Scale & footprint** — room / floor / sprawl; square vs wide; sets aspect ratio.
4. **Entrances & circulation** — how many ways in; what stays walkable.

**Default freely:** exact object counts, the precise negative list (start from the `prompt-craft.md` default), minor décor, the model target beyond nano banana (offer Midjourney/Flux on request) — unless the user signals they care.

### The test for "am I interrogating?"
Open questions + sparks + reflection, one thread at a time, always moving the floorplan forward. **If you've asked two questions without giving something back** (a reflection, an option, a drafted zone), you've slipped into interrogation. *Give before you ask again.*

---

## Part B — Working from an existing dossier or handoff

Most maps start from a `local` the kit already wrote — that's the ideal input. When the user points at a location (or pastes a "Ready for `rpg-map-architect`" handoff):

- **Treat the dossier as canon to honor.** Pull the **function and ecology** (who lives here, how they use the space — `rpg-location-creator`'s "normal day" test *is* the functional program), the **fantastic feature** (the one striking thing the map must show), the **scale**, and the campaign's **tone and proper names**. Build the layout *consistent with* them.
- **Fill only the gaps the text leaves**, and name what you added so the user can correct it. A dossier rich in mood but silent on layout needs zones and placement, not a reinvented location.
- **Inherit the visual style bible silently** — honor its materials, palette, and light — unless the place is a recorded deviation.
- **Flag missing nodes.** If the map needs a location that was never built (the user asks for "the cult's shrine" but no `local` exists), offer a handoff to `rpg-location-creator` rather than inventing the fiction here.

The goal: the user points at a place and gets back a floorplan-prompt that someone could actually *run*, in *their* campaign's look — not a generic fantasy room.

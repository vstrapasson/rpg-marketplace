# Compile units

A **compile unit** is what the user asks to build in one go. Three are supported; the resolver (`scripts/lib/resolve.mjs`) groups each into Foundry concerns.

## `encontro` (one combat — fast)
`resolveEncontro(index, name)`. Pulls the encounter's **location** (→ scene), its **creatures** (`inimigo[]` → actors placed on that scene, hostile), its **treasure** (`item[]` → world items), and its **act**. The smallest playable combat unit; ideal for prepping a single fight. Uses `party_level`/`threat` to weight creature matching (see `rpg-encounter-forge`).

## `desafio` (one non-combat challenge — prep + live)
`resolveDesafio(index, name)`. Pulls the challenge's **location** (→ scene **only if it has a `local`**; most social/research challenges don't), its **npcs** (→ journals/actors), its **faction**, its **items**, and its **act**. Realized as a **challenge journal** (folder `Challenges`) with a DC table, degrees/fail-forward, read-aloud, and a **VP progress-clock page** (segments = `vp_target`). The live layer fires the skill checks via `request-player-rolls` (see `rpg-embate-forge`). A `scale: single-check` desafio is one journal + one (or a few) rolls, no clock.

## `sessao` (one game night — the primary unit)
`resolveSessao(index, name)`. Pulls **players_present** (→ ownership), **quests** (→ quest journals; their givers/npcs/locations/items/factions), **events**, the **act**, and — via a reverse edge — every **encontro AND `desafio` whose `session` points to it** (→ scenes/creatures/treasure for fights; challenge journals + VP clocks for challenges). NPCs reached become journals (and actors if they have a `statblock`); factions/lore/fronts become journals; acts feed the dashboard.

## Bounded traversal
The resolver deliberately does NOT follow fan-out/back edges (`faccao.key_members`, `faccao.rivals`, `evento.session`, `encontro.session`/`desafio.session` forward, `desafio.clock`) so a unit pulls only what it needs to run. Concern buckets: `scenes` (local), `actors` (inimigo + npc-with-statblock + jogador), `journals` (quest/faccao/lore/frente/npc/evento/ato/**desafio**), `ownership` (jogador), `encounters` (encontro), `items` (item).

## Future (not in v0.1)
`ato` (a whole chapter + dashboard) and `campanha` (full export) — the resolver/dashboard scaffolding exists but is not exposed. If asked, tell the user these are planned, and offer to compile the act's sessions/encounters one at a time instead.

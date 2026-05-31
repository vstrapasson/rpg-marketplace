---
description: How to use rpg-gamemaster — a session prep and run layer that turns a built Pathfinder 2e campaign into runnable sessions, advancing the world between games through four chained skills and the vault as shared memory.
---

Present this guide to the user conversationally — walk them through what the kit is for and the workflows below — then offer to start the workflow that best fits where they are (setting up a front before prep, running prep, building an encounter, or sitting down to run).

# What it is for

You have a world — regions, factions, a clue map, a campaign bible built with the loremaster kit — and now you need to turn that content into something you can actually run at the table. This kit is the **session prep and run layer**: it reads what the world has built, advances the living threats between sessions, assembles a one-page session plan, balances the encounter math, and produces the GM overlay you glance at during play. Four skills, a clear flow, and one vault as shared memory. No worldbuilding happens here; if a needed node doesn't exist yet, the skill points you back to the loremaster kit to build it first.

# Quick start

1. Install the plugin: `/plugin marketplace add ~/projects/rpg-marketplace` (or the GitHub URL), then `/plugin install rpg-gamemaster@rpg-marketplace`, then `/reload-plugins`.
2. Confirm the four `rpg-*` skills appear with `/skills`.
3. For persistence, `rpg-vault-guardian` must also be installed — the gamemaster skills write all vault entities through the `rpg-preserve` write gate, which the guardian provides. Without it, the skills can still produce output; they just won't persist to disk.
4. The typical flow: **front-tracker → session-prep → encounter-builder → run-sheet**. Run them in that order for a full session cycle, or invoke any skill alone when you have a specific need.

# What you can do

| How to invoke | What it does | Reach for it when |
| --- | --- | --- |
| `"Advance the front"` / `"what did the villains do since last session?"` / `"tick the clock"` / `"set up a front"` (skill `rpg-front-tracker`) | The living-world engine. Bootstraps a front from a faction's plan-in-motion (its grim portents and impending doom) and advances those clocks based on what happened last session — then emits the "what the world did since last session" beat that feeds the session-prep strong start. Persists `frente` and `relogio` vault entities via `rpg-preserve`. | Between sessions, before you prep. When you want the world to feel like it moves without the players. When a faction's authored plan needs to become a trackable, advancing threat. |
| `"Prep the next session"` / `"what should happen next session?"` / `"montar a sessão"` / `"qual o gancho"` (skill `rpg-session-prep`) | The session launchpad. Reads the campaign bible, the clue map, the active fronts and clocks, and the vault entities in play, then assembles a one-page session plan using the Lazy DM eight steps — weighted on secrets and clues as the spine. Derives the strong start from what the world did since last session; carries forward unrevealed secrets from the clue map rather than starting fresh. Persists a `sessao` vault entity via `rpg-preserve`. | When you are preparing an upcoming session and want a structured, improvisation-ready one-pager built from what already exists in the vault. |
| `"Build an encounter"` / `"balance this fight"` / `"montar um combate"` / `"quantos inimigos"` (skill `rpg-encounter-builder`) | The mechanical layer. Given party level, party size, and a scene or threat brief, it picks a threat tier, selects creatures from the Archives of Nethys, shows the XP-budget arithmetic, adds hazards and treasure by level, and wraps the whole thing as a situation — an objective, a terrain feature, the reason the fight exists, and how it escalates or ends. Always shows the math. Persists an `encontro` vault entity via `rpg-preserve`. | When session-prep has flagged a threat that needs balancing, or when you want to build a specific encounter from scratch. |
| `"Make a run sheet"` / `"folha de mesa"` / `"o que acompanhar durante o jogo"` / `"rodar a sessao"` (skill `rpg-gm-run-sheet`) | The table overlay. Reads the session-prep one-pager, the clue map's revelation IDs, and the active fronts and clocks, then compresses them into one printable page — strong start, scene beats checklist, secrets-and-clues checklist keyed to R-IDs, NPC quick-refs with a voice line and a want, the active clocks, and the "if they stall" backstops. Writes nothing to the vault; the run sheet is an ephemeral printable artifact. | Sitting down to run. Gives you the GM overlay that a VTT does not — narrative and discovery state only, no initiative or dice. |

# Workflows

## The full session cycle — from a living world to the table

1. Confirm the four `rpg-*` skills are installed with `/skills`.
2. Before prep, advance the world: tell `rpg-front-tracker` to tick the relevant clocks based on what happened last session ("advance the front — the Syndicate kept moving while the party was traveling"). It asks which front, reads the faction's grim portents and the last session note, and advances the clocks. Its "what the world did since last session" beat is the seed for the strong start.
3. Run `rpg-session-prep` ("prep the next session"). It reads the campaign bible, the clue map (carrying forward unrevealed revelation IDs), the active fronts' "next move" beat, and the vault entities in play. It assembles a one-page session plan: a strong start derived from the world's state, three to five likely scenes, the secrets and clues live this session, the NPCs and threats in play by vault name, rewards, and backstops. If a scene needs an encounter balanced, it emits a handoff to `rpg-encounter-builder`.
4. When `rpg-session-prep` flags a fight that needs math, run `rpg-encounter-builder`. Give it the party level, party size, and the threat brief from the session plan. It picks a tier, selects creatures (AoN category refs, XP arithmetic shown), wraps it as a situation, and persists an `encontro` entity.
5. Sitting down to run, ask `rpg-gm-run-sheet` to assemble the run sheet from the session plan and the vault. You get one printable page with everything you need at the table. Save it to the working folder and run.
6. After the session, advance the clocks again with `rpg-front-tracker` to reflect what the players did (or didn't do). The updated `relogio` entities become the input for next session's front-tracker run.

## Set up a front for a new faction threat — turn a loremaster-authored faction plan into a trackable, advancing danger

1. Make sure the faction's `faccao` note exists in the vault (built with the loremaster kit's `rpg-faction-creator`) and that it includes the plan-in-motion, grim portents, and impending doom.
2. Trigger `rpg-front-tracker` ("set up a front for this faction"). It reads the `faccao` note and the campaign bible, builds the front's impulse and grim portents as clock segments, sizes the clock (4 segments for a contained danger, 6 for a campaign-level threat, 8 for an existential arc), and persists the `frente` + `relogio` entities via `rpg-preserve`.
3. If the faction's plan has no portents yet, `rpg-front-tracker` will emit a handoff to `rpg-faction-creator` (loremaster) to author the plan first — then come back.
4. The front sheet ends with the "what the world did since last session" beat that feeds into `rpg-session-prep`'s strong start.

## Build an encounter from a session-prep handoff — turn a flagged threat into balanced PF2e numbers, wrapped as a situation

1. When `rpg-session-prep` emits "→ rpg-encounter-builder" for a scene, copy that handoff line and trigger `rpg-encounter-builder` with it.
2. Confirm party level and party size — the skill will ask if they're not in the handoff. Without them, the XP budget is meaningless.
3. The skill picks a threat tier (or you name one), selects creatures by AoN category page (never a `?ID=` link), shows the running XP arithmetic against the budget, adds hazards and treasure by level, and wraps everything as a situation — the objective, a terrain feature, the reason the fight exists, and how it escalates or ends. The math is always shown.
4. The completed encounter is persisted as an `encontro` entity via `rpg-preserve` and handed back to the session plan as a scene.

# Good to know

- **The only slash command this plugin ships is `/rpg-gamemaster-help` (this guide).** All four skills are invoked by natural language. Confirm them with `/skills`; the other slash interactions you'll use are the install commands (`/plugin`, `/reload-plugins`) and `/skills`.
- **`rpg-vault-guardian` is the persistence prerequisite.** The gamemaster skills write vault entities exclusively through the `rpg-preserve` write gate — a skill the guardian provides. Install `rpg-vault-guardian` for persistence; without it, the skills still produce output but won't write to disk.
- **The vault is the shared memory between plugins.** The gamemaster kit communicates with the loremaster kit by reading vault entities and loose files (campaign bible, clue map) — never by importing code from the other plugin. If a vault node is missing, the skill emits a loremaster handoff and waits; it does not invent content.
- **Three new vault entity types.** `rpg-front-tracker` writes `frente` (a front — impulse, doom, status) and `relogio` (a progress clock — segments and filled count). `rpg-encounter-builder` writes `encontro` (an encounter — threat tier, party level/size, creature refs). These types are defined in `rpg-vault-guardian`'s schema and live in `frentes/`, `relogios/`, and `encontros/` folders.
- **`rpg-gm-run-sheet` writes nothing.** It is the exception — an ephemeral printable artifact saved as `run-sheet-<slug>.md` in the working folder, not routed through `rpg-preserve` and not a canonical vault entity. When the session ends, `rpg-session-prep` (the `sessao` note) and `rpg-front-tracker` (the updated `relogio` notes) are the canonical record.
- **Secrets and clues is the spine of session prep.** Of the Lazy DM eight steps, secrets and clues is the one to keep if you keep only one. `rpg-session-prep` wires to the clue map's revelation IDs (R1, R2…) and carries forward unrevealed secrets from session to session — never starting fresh, never dropping a revelation just because the players missed it.
- **The encounter math is always shown.** `rpg-encounter-builder` states the assumed party level and size on every output and shows every XP line in the arithmetic. Creature references are Archives of Nethys category pages (e.g. `/Monsters.aspx`) — never `?ID=` deep links.
- **Default tone is dark-leaning (level 3 of 5)** — heroic fantasy with a shadowy edge; not grimdark, not noblebright. All four skills inherit the tone from the campaign bible; they do not reset it. An explicit tone override in the bible is honored; the run sheet follows the campaign's register.
- **Language matching.** Skills generate in the language you write in (PT-BR in → PT-BR out) while keeping PF2e canon names and AoN URLs in English as canon anchors. Vault folder names and entity type values are Portuguese by convention (`frente`, `relogio`, `encontro`, `sessao`, `frentes/`, `relogios/`, `encontros/`).

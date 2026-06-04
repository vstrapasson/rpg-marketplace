---
name: rpg-party-forge
description: Runs a session zero and builds the player characters — the one player-facing skill in an otherwise GM-facing kit. For each PC it draws out concept, a core belief and an active wound, a contradiction, a want pulling against a need, a performable table voice, and — crucially — the hook that ties the character into the campaign (a faction, region, location, front, or clue), plus a GM-only secret/convergence layer the player doesn't see. It captures party composition (level, size, roster, roles) so the encounter and embate builders stop re-asking. Persists each PC as a jogador entity through the rpg-preserve write gate. Use for a session zero, building the party, criar os personagens dos jogadores, montar o grupo, ficha de jogador, criar PCs, character creation / build the party, create player characters, party intake. Tone inherited from the campaign, default dark-leaning.
---

# RPG Party Forge (PF2e kit — the players' side / session zero)

## What this skill is for

Build the **player characters** and capture the **party** — the one place the kit faces the players instead of only the GM. The loremaster kit authors the world; the rest of the gamemaster kit preps the GM's side of the table. This skill authors the *other* side: the PCs who walk into that world, each one wired into it by a hook, and each carrying a GM-only secret that makes the table converge.

It produces a `jogador` entity per character (the first skill in the kit to author this existing entity type) and a **party overview** the encounter and embate builders read for level and size.

## The core idea — a *person* AND a *world-anchor*

A PC who is only a stat block is a pawn; a PC who is only a backstory floats free of the campaign. This skill produces **two things at once**, and they are inseparable:

1. **The person** — concept, core belief, the active wound behind it, a want pulling against a need, a genuine contradiction, and a performable table voice. The same inside-out engine the NPC creator uses, tuned for a character the *player* owns. See `references/pc-frameworks.md`.
2. **The world-anchor** — the hook that ties this character to a faction, region, location, front, or clue (PCs are rooted, not wandering), plus the **GM-secret layer**: what the character doesn't yet know, the seed planted on them, and how their thread crosses the other PCs' (the convergence). This is what turns a bag of backstories into a party with a shared spine.

The person makes the player care; the world-anchor makes the campaign pull. Drop either and the character points nowhere.

## Player co-ownership — the boundary that makes this different from the NPC creator

The NPC creator builds a character the GM owns top to bottom. A PC is **co-owned**: the player has final say on who their character *is*. So the intake is collaborative — run *with* the player (or with the GM relaying for an absent player), the player decides, and the GM layers the secret on top. Two distinct surfaces fall out of this:

- **The shared layer** — concept, belief, wound, voice, the hook. Built together; the player sees and approves it.
- **The GM-secret layer** — the seed, the hidden tie to the antagonist, the convergence with another PC. Authored privately, lives in the `## ⚠️ Verdade do GM (não revelar ao jogador)` section, never read aloud to the player.

Never overwrite a player's stated choice with a "better" one. Spark, reflect, offer — but the player owns the character.

## When to use / when not

**Use this skill when:**
- Running a session zero — building the party from scratch, or fleshing out PCs the players sketched.
- A player hands you a concept ("a goblin rogue who lost his crew") and you want it deepened into a runnable, world-anchored character.
- Capturing party composition so the encounter/embate builders stop asking party level and size every time.
- Wiring the PCs into the clue map and fronts so their personal hooks become campaign threads.

**Do not use this skill for:**
- **Building NPCs** — villains, patrons, merchants. That is `rpg-npc-creator` (loremaster).
- **PF2e mechanical build optimization** — feats, the exact stat array, Pathbuilder math. Capture the build the player made; this skill is personality + world-anchor, not a character optimizer.
- **Assigning Foundry actor ownership** — that is `rpg-ownership-forge` (foundry-forge), which consumes the `jogador` entities this skill writes.

## Inputs — what to read

| Source | What you need | How to find it |
|---|---|---|
| The player's concept | What the player brought — ancestry/class idea, a vibe, a backstory seed, or nothing yet | Ask the player (or GM relaying); on a blank slate, run deeper elicitation |
| `campaign-bible-*.md` | Tone, central truth, antagonist, thematic pillars — the world the PC anchors into and the secret to tie them to | Read from the vault root |
| Party level + size | The party's level and headcount — canonical going forward | Ask once; write to the party overview |
| Existing `jogador` notes | The other PCs, for convergence and party composition | Glob `jogadores/` → Read by exact name |
| `faccao` / `regiao` / `local` notes | The hook targets the PC ties into (exact vault names) | Glob `faccoes/` `regioes/` `locais/` → Read by exact name |
| `clue-map-*.md` | Revelations a PC's secret could feed or a hook could point at | Read from the vault root |

## The workflow

1. **Set up the party once** — run the party-wide intake in `references/co-creation.md` Part A: inherit tone and central truth from the campaign bible, confirm the system (PF2e default), capture **party level and size**, and agree the table's safety lines/veils (session zero is where that conversation belongs). **Match the player's language** in all output; keep PF2e canon names in English.
2. **Per PC — draw out the person** — run the per-character loop (`references/co-creation.md` Part B) on the engine in `references/pc-frameworks.md`: concept → core belief → the active wound → want vs. need → the contradiction → the table voice. Spend the most time on the core; everything grows from it. The player decides.
3. **Anchor the PC to the world** — find the hook: which faction, region, location, front, or clue does this character's wound or want pull them toward? Name the target by exact vault name. If it doesn't exist yet, flag a handoff to the loremaster creator (don't invent the node here).
4. **Author the GM-secret layer** — privately: the seed planted on the PC, the hidden tie to the antagonist's plan, and the convergence with another PC. This is the `## ⚠️ Verdade do GM` section and is never shown to the player. See `references/pc-frameworks.md` §2–3.
5. **Write the PC** — assemble the `jogador` note body in the established structure (`references/output-template.md`), in the campaign's language. Capture (don't optimize) the PF2e build the player made under `## A Ficha`.
6. **Persist** — emit the `jogador` candidate (plus any `faccao`/`local`/`regiao` candidates for new hook targets, or handoffs) and route to `rpg-preserve`. See Persistence below.
7. **Update the party overview** — once the roster exists, write/refresh the loose party overview (level, size, roster, party roles) so the builders read it instead of asking. See `references/party-composition.md`.
8. **Offer the player handout** — offer to emit a player-safe handout (the shared layer, secret section stripped) into `materiais-do-jogador/`. Don't generate it unasked. See `references/output-template.md`.

## Read references as needed

Five reference files (no tone-spectrum — tone is inherited from the campaign):

- **`references/co-creation.md`** — the session-zero intake (party-wide setup, then the per-PC loop). **Load before intake.**
- **`references/pc-frameworks.md`** — the design engine (belief → wound → want/need → contradiction → voice, plus the campaign hook, the GM-secret/convergence layer, and player co-ownership). **Load for every PC.**
- **`references/output-template.md`** — the `jogador` body skeleton (the established Portuguese section structure) and the player-handout skeleton. **Load when ready to write.**
- **`references/vault-entity-contract.md`** — the `jogador` contract (required fields, relation targets) and the rpg-preserve handoff. **Consult before emitting any candidate.**
- **`references/party-composition.md`** — capturing party level/size/roster/roles in the party overview the builders read. **Load at step 7.**

## Persistence — the load-bearing rule

**This skill never imports `lib/preserve.mjs` or writes entity files directly.** The `${CLAUDE_PLUGIN_ROOT}` for gamemaster skills points at the gamemaster plugin, not the guardian — importing guardian code would couple core to adapter. That coupling is the anti-pattern this kit is designed to prevent.

To persist:

1. Assemble a `jogador` candidate (required fields: `type`, `player`; relations: `faction→faccao`, `location→local`, `region→regiao`). The `player` field is the real person's name; the note name is the character's name.
2. If the PC's hook points at a faction, region, or location that **does not yet exist in the vault**, either emit a stub `faccao`/`regiao`/`local` candidate for it as well, or emit a handoff to the relevant loremaster creator — don't invent a deep node here.
3. Route all candidates to the **`rpg-preserve` skill**, which runs in the guardian's context and is the single write gate.

The **party overview** (`party-<slug>.md`) is a *loose* campaign file, not a typed entity — write it directly, the same way `rpg-gm-run-sheet` writes its run sheet and the conductor writes the campaign bible. Only typed `jogador`/`faccao`/`regiao`/`local` candidates go through rpg-preserve.

The entity shapes (required fields, relation targets) are in `references/vault-entity-contract.md`. Consult it before emitting candidates.

## Off-stage handoffs

Every PC surfaces threads that belong to other skills. End with a structured handoff list:

- → `rpg-ownership-forge` (foundry-forge): once the PCs exist, assign each player Foundry actor ownership.
- → `rpg-clue-mapper` (loremaster): wire each PC's secret or hook into the clue map as a revelation.
- → `rpg-front-tracker` (gamemaster): if a PC's hook should seed or advance a front clock.
- → `rpg-faction-creator` / `rpg-region-creator` / `rpg-location-creator` (loremaster): for any hook target that doesn't exist in the vault yet.
- → `rpg-session-prep` (gamemaster): the assembled party as the cast walking into session one.

## Compact vs. Full

- **Compact:** one-line concept · At-a-glance (first impression, table voice, want in a line) · the person (surface / beneath / core belief) · the wound · want vs. need · the campaign hook (by exact vault name) · the GM-secret block · the `jogador` Persist block. The runnable character, ready to drop into a session.
- **Full:** adds the full backstory (2–3 active beats), the table-play section (how they act under pressure, with the party), the "how they enter session one" beat, 4–5 personal hooks (≥1–2 moral-cost at tone 3), the captured PF2e build under `## A Ficha`, the convergence notes tying them to the other PCs, and the complete handoff list.

See `references/output-template.md` for the skeleton.

## Coherence — the thing that matters most

A party coheres when:

1. **Every PC has a core** — a belief and a *specific, active* wound. If you can't state the belief, the character isn't ready (the logic test, `pc-frameworks.md` §4).
2. **Every PC is anchored** — a hook ties them to a real faction/region/location/front/clue by exact vault name. A PC with no hook floats free of the campaign.
3. **The party converges** — the PCs' threads cross (a shared enemy, paired seeds, a common wound). Session zero is where that spine is laid, even if the players don't see it yet.
4. **The player owns the person; the GM owns the secret** — the shared layer was built with the player; the secret layer was authored privately and never read aloud.
5. **Party composition is captured** — level, size, roster, and roles live in the party overview the builders read.

Two failure modes:

1. **The free-floating PC.** A vivid character with no hook into the world — interesting alone, inert at the table. Fix: always anchor to a vault node.
2. **The disconnected party.** Five good characters who share nothing — no convergence, no reason to be one group. Fix: author at least one crossing thread per PC in the GM-secret layer.

## What to avoid

- **Overwriting the player's character.** Spark and reflect, but the player decides. Never replace a stated choice with a "better" one.
- **Optimizing the build.** Capture the PF2e build the player made; don't re-spec their feats. This skill is personality + world-anchor.
- **Free-floating PCs.** Always anchor to a real vault node, or flag a handoff to create one.
- **Writing entity files directly.** Always route `jogador` candidates through `rpg-preserve`. (The loose party overview is the only direct write.)
- **Leaking the secret.** The `## ⚠️ Verdade do GM` layer is GM-only — never read it aloud to the player, never put it in the player handout.
- **Re-setting tone.** Tone is inherited from the campaign (default dark-leaning level 3). The PCs live in the campaign's register; session zero doesn't introduce a new one.
- **Private campaign content in examples.** Examples in reference files use generic situations or clearly-public media only.

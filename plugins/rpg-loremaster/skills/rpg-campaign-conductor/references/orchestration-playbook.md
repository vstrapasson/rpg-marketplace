# Orchestration Playbook

The conductor's operating manual: the kit map, the sequence logic, the per-skill handoff protocol, the consistency rules, and stop conditions. Load before conducting.

## Contents
1. The kit map (skills & layers)
2. The dependency / sequence logic
3. Per-skill handoff protocol (what each consumes & emits)
4. Consistency rules (preventing drift)
5. The spiral: deciding the next move
6. Stop conditions & the review checkpoint

---

## 1. The kit map (skills & layers)

| Skill | Makes | Bedrock | Position |
|---|---|---|---|
| `rpg-campaign-foundation` | the campaign spine (truth, antagonist, pillars, acts, signs, roadmap) | central truth + antagonist's plan | **top** — run first |
| `rpg-region-creator` | a region (or a nation/kingdom at scale) | geography | world layer |
| `rpg-city-creator` | a city/settlement | central dramatic question + faction web | world layer |
| `rpg-faction-creator` | an organization (as a dynamic agent) | drive + plan in motion | world layer |
| `rpg-location-creator` | a bounded site (dungeon, lair, ruin) | premise + ecology ("why not cleared?") | world layer (bottom) |
| `rpg-npc-creator` | a single character | personality, backstory, hooks | cross-cutting (bundled) |
| `rpg-artifact-creator` | a single legendary object (artifact/relic) | narrative node + price | cross-cutting (system-agnostic) |
| `rpg-clue-mapper` | the clue map / revelation list | information flow (Three Clue Rule) | **investigation layer** — consumes the rest |

The conductor invokes these; it never reproduces their work.

## 2. The dependency / sequence logic

Hard rules (always):
- **Foundation precedes world.** No region/city/faction/location until a central truth exists. (A world with no campaign behind it is drift.)
- **Clue-mapper is last (or late).** It needs revelations (from the foundation) *and* nodes (regions/cities/locations/NPCs/factions) to hang clues in. Run it once enough nodes exist.

Soft order (the default spiral, adapt to need):
`foundation → starting region → starting settlement → antagonist + agent (NPCs) → antagonist's faction → first key location → clue map → (expand outward as play demands)`

Nodes can be built in any order the campaign needs; the only firm constraints are *foundation first* and *clue-mapper after its inputs exist*.

**Cross-cutting skills (`rpg-npc-creator`, `rpg-artifact-creator`)** are not fixed steps — build them when their owner/site/truth exists. A named character or object is deepened once something in the world points at it. The exception: if the campaign's **central truth turns on an object** (a McGuffin), the artifact can be built right after the foundation, since it *is* part of the spine.

## 3. Per-skill handoff protocol (what each consumes & emits)

Each creator skill ends with **off-stage notes** grouped by downstream skill. The conductor's job is to route them. The wiring:

- **`rpg-campaign-foundation`** emits → the **planning roadmap** (locked-vs-open) + handoffs to region/city/faction/location/npc, "ready for rpg-artifact-creator" if the central truth turns on an object (the McGuffin), and the **"GM knows, players discover" truths** (these are the clue-mapper's primary input). Consumes → the user's seed.
- **`rpg-region-creator`** emits → "ready for rpg-city-creator" (settlements), "rpg-faction-creator" (regional powers), "rpg-npc-creator" (named figures), "a location-creator" (sites). Consumes → the foundation's setting/region need + tone + central truth.
- **`rpg-city-creator`** emits → "ready for rpg-npc-creator" (the cast), "rpg-faction-creator" (urban factions), "a location-creator" (the seat of power, key buildings). Consumes → a region handoff (the settlement named) + the campaign question.
- **`rpg-faction-creator`** emits → "rpg-npc-creator" (leader, lieutenants), "a location-creator" (the seat of power), "rpg-artifact-creator" (a holy relic or object the faction is built around), settlements if it implies them. Consumes → a faction named by region/city/foundation + the central truth.
- **`rpg-location-creator`** emits → "rpg-npc-creator" (a named inhabitant), "rpg-faction-creator" (if it reveals an org), "rpg-artifact-creator" (the prize at its heart). Consumes → a "seat of power"/site handoff from faction/city/region + party level.
- **`rpg-npc-creator`** emits → relationships/sites that may need building. Consumes → a named character from any handoff + the campaign's truth and tone.
- **`rpg-artifact-creator`** emits → "rpg-npc-creator" (its maker, guardian, or hunter), "rpg-faction-creator" (who hunts or guards it), "a location-creator" (where it's kept or was made), "rpg-clue-mapper" (clues that lead to it). Consumes → a relic/object named by faction/location/foundation + the central truth and tone.
- **`rpg-clue-mapper`** emits → handoffs back up for any node it needs that doesn't exist yet. Consumes → the foundation's "GM knows, players discover" truths (revelations) + the existing nodes (everything above).

**Routing rule:** when an off-stage note names a downstream skill, add it to the bible's handoff queue. When the user (or the spiral) picks it up, feed that exact note — plus the campaign identity — into the named skill.

## 4. Consistency rules (preventing drift)

The conductor is the guardian of coherence. Before and after each run, enforce:

- **One central truth.** Every artifact must be compatible with the foundation's truth. A city's "central question" or a location's "premise" should *connect to* the campaign truth, not contradict it.
- **One tone level.** The foundation sets it (default 3). Every creator skill inherits it. If the user dials a section's tone, record the deviation in the bible so the next skill doesn't "correct" it.
- **One names registry.** Proper names (NPCs, places, factions, deities used, planes referenced) are recorded once in the bible and reused verbatim. Never let two skills name the same role differently, or rename an established figure.
- **One PF2e stance.** The deities/planes/creature-families the foundation chose are the campaign's palette. Downstream skills draw from that palette unless there's a deliberate, recorded reason to add to it.
- **AoN links stay category-level** across all artifacts (`/Deities.aspx`, never `?ID=`).

When a new artifact violates any of these, **flag and reconcile** (regenerate the offending part, or record a justified exception) before integrating it.

## 5. The spiral: deciding the next move

Following Sly Flourish (build out from the next point of play). To pick the next move, ask:
1. **What does the next session need?** Build that, not the whole world.
2. **What did the last artifact's off-stage notes surface as most load-bearing?** (The antagonist's faction usually matters before a random shop.)
3. **What's the cheapest thing that unblocks play?** A starting city + the antagonist's agent NPC often unblocks session one; the full faction can wait.

Recommend **one or two moves**, generate, re-evaluate. Resist the urge to build everything — the kit is Just-in-Time. Always name the recommendation and let the user redirect.

## 6. Stop conditions & the review checkpoint

**Stop** when the user has enough for the next session or two. Say so explicitly — over-building is the failure mode of eager planning.

**Review checkpoint:** at natural milestones (the starting area is built; before a big session), offer to spawn the **reviewer subagent** (`agents/rpg-campaign-reviewer.md`): point it at the campaign folder + the bible; it audits cross-artifact consistency (truth, tone, names, dangling handoffs, single-points-of-failure in the clue map) and returns a report. It's non-interactive — it audits, it doesn't interview. Relay findings, offer fixes, update the bible.

# RPG Artifact Creator — Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking. This is an **authoring** plan (pure prompt-engineering, no code) — "the content an engineer needs" is the exact frontmatter, the section list, which files to copy the pattern from, the exact insertion points in the files to edit, and concrete validation commands — not 400 lines of generated prose, which is the implementation itself.

**Goal:** Add `rpg-artifact-creator` to `plugins/rpg-loremaster` — a system-agnostic creator skill (sister to `rpg-npc-creator`) that deepens **one legendary object as a narrative node** (provenance · will · desire-lines · what-it-unlocks · gift · staged price + tell · entrance/exit · hooks · handoffs), then wire it into the conductor, reviewer, README, and help.

**Architecture:** Pure prompt-engineering. No code, no tests run — the deliverable is `SKILL.md` + four `references/*.md`, plus edits to four existing files (conductor SKILL + playbook + bible template, reviewer agent) and two docs (README, help command). It is the kit's **second system-agnostic skill**, so it mirrors `rpg-npc-creator`'s reference set and carries **no `canon-quickref` and no Archives of Nethys links**.

**Tech stack:** Markdown only. No build, no linter, no manifest change.

**Spec:** `docs/specs/2026-05-31-rpg-artifact-creator-design.md` (approved). This plan is the HOW; the spec is the WHAT/WHY — consult it for rationale, the researched design principles, and the locked decisions.

---

## Background the engineer must know

Read these before starting; they are the conventions this plan assumes.

1. **The closest pattern to copy is `rpg-npc-creator`.** It is the other system-agnostic skill: same reference set (`co-creation.md`, `tone-spectrum.md`, `output-template.md`, plus its engine `npc-frameworks.md`), **no `canon-quickref`**, no AoN links. Copy its `SKILL.md` shape section-for-section and re-point it from "an NPC is a person" to "an artifact is a narrative node". Its file: `plugins/rpg-loremaster/skills/rpg-npc-creator/SKILL.md`.
2. **The spine and the dark-tone layer (from the spec):** an artifact must answer four questions — *where did it come from, what does it want now, who wants it and why, what changes when it enters play.* The price/corruption is a **layer in service of the node**, with **stages** and a sensory **tell** (so the bearer chooses each step deeper), escalating toward what the item wants. A gift with no price is a stat block; a price with no temptation/agency is just a debuff.
3. **The kit's shared DNA:** every skill bundles a co-creation front-end (interview, not a form; escape hatch *"just run with it"*), weaves short **read-aloud** beats (blockquote labelled **Read-aloud** / **Para ler à mesa**, ~40–70 words, sensory, never narrate what the PCs feel/do), inherits/honors tone (default dark-leaning level 3; never silently change level), matches the user's language, ends with structured off-stage handoffs, and offers a **Compact / Completo (Full)** density choice.
4. **Reference files are duplicated per skill by design** — there is no shared copy. `co-creation.md` and `tone-spectrum.md` are near-generic; copy them from `rpg-npc-creator` and adapt only the worked examples and the read-aloud beat list to artifacts. `output-template.md` and the engine file are skill-specific — author them new.
5. **`SKILL.md` rules:** `name` lowercase-hyphen, matches the folder name, never starts with `claude-`, unique system-wide. The YAML `description` must be ≤ 1024 chars and **contain no `": "` (colon-space)** — it breaks the frontmatter parser (use `—`, `(`, or rephrase). Study how the npc/faction descriptions pack triggers without a colon-space.
6. **No manifest change.** Skills are auto-discovered from `skills/`. This is a skill *inside* an existing plugin, so — unlike a new plugin — **do not edit `.claude-plugin/plugin.json` or `.claude-plugin/marketplace.json`.**
7. **Safety:** the shipped skill must contain **zero** private campaign tokens. Worked examples must be generic/invented. Carry the kit's "examples are illustrative — never reuse verbatim" spirit.
8. **Domain vocabulary is Portuguese; code/docs are English.** Skill prose generates in the user's language at runtime; structural headings in the reference files stay English. There are no PT-BR on-disk `type` values to add here (this skill writes a loose `artifact-<slug>.md`, not a vault entity).

---

## File structure

**Created:**
```
plugins/rpg-loremaster/skills/rpg-artifact-creator/
├─ SKILL.md
└─ references/
   ├─ co-creation.md          # copied from rpg-npc-creator, examples adapted to artifacts
   ├─ tone-spectrum.md        # copied from rpg-npc-creator, applied to an object
   ├─ output-template.md      # NEW — the dossier skeleton (Compact + Full)
   └─ artifact-frameworks.md  # NEW — the design engine (the heart of the skill)
```

**Modified:**
- `plugins/rpg-loremaster/skills/rpg-campaign-conductor/SKILL.md` — add the skill to the frontmatter list + the "Required: the creator skills" line
- `plugins/rpg-loremaster/skills/rpg-campaign-conductor/references/orchestration-playbook.md` — kit map row, sequence note, handoff protocol entry + upstream emit lines
- `plugins/rpg-loremaster/skills/rpg-campaign-conductor/references/campaign-bible-template.md` — a layer-status row + (optional) names-registry note
- `plugins/rpg-loremaster/agents/rpg-campaign-reviewer.md` — artifact in the file glob + a new audit check + report mention
- `plugins/rpg-loremaster/README.md` — table row + "eight" → "nine" count
- `plugins/rpg-loremaster/commands/rpg-loremaster-help.md` — table row + "eight" → "nine" (two spots) + a "good to know" bullet + an à-la-carte workflow mention

---

## Task 1: Author the engine — `references/artifact-frameworks.md`

This is the heart of the skill (the analogue of `npc-frameworks.md`). Author it **first** so the SKILL.md and output-template can reference its sections.

- [ ] **Step 1: Create the file** `plugins/rpg-loremaster/skills/rpg-artifact-creator/references/artifact-frameworks.md` with these numbered sections (so SKILL.md can cite `§N`):

  1. **The narrative-node model** — the four questions (provenance / will / desire-lines / what-it-unlocks) and the test that separates a node from "a +2 with a pretty name". Ground it in the Alexandrian principle (the item's life is *ahead* of it; treasure commands attention — don't spend it on numbers).
  2. **The "what does it want?" probe** — maker + original purpose + current unfulfilled goal → the *pull* on the bearer. This is the will, and it drives the price.
  3. **The function / story / cost triad** — every artifact answers what it *does*, what it *means*, what it *costs*. Pure-function = stat block; +story = memorable; +cost = the engine of a dark campaign.
  4. **Designing the price (corruption stages + tell)** — the dark-leaning core: the gift must be genuinely good (the bait); the price comes in **stages** with a sensory **tell** at each (Dungeon World); the bearer *chooses* each step deeper; the escalation moves the item toward its will. Include the two dark-tone anti-patterns: the curse that's just a debuff, and punishment without agency.
  5. **Tier note — why artifacts/relics differ** — at this tier the **exit** (destruction / how it leaves play) matters as much as the entrance; it can be a quest. Contrast with mundane/minor items (explicitly out of scope).
  6. **Failure modes** — the magic-Walmart, the +X treadmill, the item that's just a number, the artifact with no cost or no exit, the static treasure (no one wants it / it pulls at no one). Each with a one-line fix.
  7. **Coherence tests** — the *node test* (does this element connect the object to the campaign?) and the *price test* (does this deepen what the bearer pays?). An element that does neither is decoration — cut or connect it.
  8. **(Optional) PF2e bridge — one line only.** Per the spec's locked decision #5: a single sentence noting that groups who play PF2e can map the gift to a relic/artifact (relic seed → aspects → gifts; artifacts carry a destruction clause). **No `?ID=` links, no full rules** — this is a pointer, not a layer.

- [ ] **Step 2: Self-check** — confirm no `": "` issues are irrelevant here (only frontmatter is parsed), no private tokens, examples invented, English headings.

- [ ] **Step 3: Commit** — `git add` the file; `git commit -m "feat(loremaster): artifact-frameworks reference for rpg-artifact-creator"`

## Task 2: Author `references/output-template.md`

The dossier skeleton, Compact + Full, mirroring `rpg-npc-creator/references/output-template.md`'s structure (open it as the format template).

- [ ] **Step 1: Create the file** with the 11-section skeleton from the spec, in order: **Provenance · The will / what it wants · Desire-lines · What it unlocks · The gift · The price (staged + tell) · Look & tell · Entrance (read-aloud) · Exit / destruction · Hooks (4–6) · Off-stage notes.** For each section give one line of guidance + a short *invented* illustrative snippet.

- [ ] **Step 2: Render the Compact vs Completo split** explicitly (per spec):
  - **Compact (1–2 pp):** price, desire-lines, and destruction as narrative prose.
  - **Completo / Full (3–4 pp):** adds a **corruption clock** (stages as a 4–6 segment clock with per-stage tells), a **desire-lines table** (who wants it → what they'd do, 3–5 actors), and an explicit **destruction quest** — all framed as optional GM tools.

- [ ] **Step 3: Mark the three read-aloud beats** — the **entrance**, the **tell** when it stirs, one **signature moment** of the price taking hold — with the blockquote label and the ~40–70-word rule.

- [ ] **Step 4: Commit** — `git commit -m "feat(loremaster): output-template reference for rpg-artifact-creator"`

## Task 3: Copy and adapt `co-creation.md` and `tone-spectrum.md`

- [ ] **Step 1: Copy verbatim** `rpg-npc-creator/references/co-creation.md` → `rpg-artifact-creator/references/co-creation.md`, and `rpg-npc-creator/references/tone-spectrum.md` → `rpg-artifact-creator/references/tone-spectrum.md`.

- [ ] **Step 2: Adapt `co-creation.md`** — change the worked elicitation examples from person-language (belief/wound) to artifact-language (provenance/will/price); change the **read-aloud beat list** (Part B) to the artifact's three beats (entrance / tell / signature moment of the price). Keep the interview method, the escape hatch, and the read-aloud *rules* intact.

- [ ] **Step 3: Adapt `tone-spectrum.md`** — re-frame the 1–5 examples to apply to an *object* (e.g., what a tone-2 vs tone-3 vs tone-4 cursed artifact's price feels like). Keep the scale and the "dark-leaning, not grimdark" guardrail.

- [ ] **Step 4: Commit** — `git commit -m "feat(loremaster): co-creation + tone-spectrum references for rpg-artifact-creator"`

## Task 4: Write `SKILL.md`

Copy `rpg-npc-creator/SKILL.md` as the structural template and re-point it. Keep the exact section order: *What this skill is for · The core idea · When to use · Workflow at a glance · Step 1 co-create · Step 2 read references · Step 3 generate (node → gift → price) · Step 4 present · Compact vs Completo · Coherence · What to avoid · File output.*

- [ ] **Step 1: Frontmatter** — `name: rpg-artifact-creator`. Author a trigger-rich `description` (no `": "`): cover "create/design/build/flesh out an artifact, relic, cursed item, legendary weapon, McGuffin"; PT-BR triggers ("criar um artefato", "preciso de uma relíquia", "fazer um item amaldiçoado"); the "Ready for rpg-artifact-creator" handoff line; state it is **system-agnostic** and default tone **dark-leaning (level 3 of 5)**. Validate length ≤ 1024 and the absence of `": "`.

- [ ] **Step 2: The core idea** — "an artifact is a narrative node" (cite `references/artifact-frameworks.md` §1). State the contrast with the rest of the kit (region=geography, faction=drive, NPC=contradiction; artifact=node + price) and the failure test ("if it reads like a powerful object nobody is moving for, you wrote treasure, not a node").

- [ ] **Step 3: When to use / when not** — trigger on artifact/relic/cursed-item requests and the handoff line. **Do not** trigger for: mundane/minor gear or shop loot (out of scope — say so), a person (→ `rpg-npc-creator`), an organization (→ `rpg-faction-creator`), or the vault/site that holds it (→ a location-creator). Note it *receives* handoffs from faction/location/foundation and *emits* to npc/faction/location/clue-mapper.

- [ ] **Step 4: Step 3 (generate)** — order: **the node first** (provenance → will → desire-lines → what-it-unlocks), **then the gift**, **then the price** (staged + tell, escalating toward the will), then the table layer (look & tell, entrance, exit), then hooks, then off-stage. Weave the three read-aloud beats. Point each subsection at the matching `output-template.md` / `artifact-frameworks.md` section.

- [ ] **Step 5: Off-stage handoffs** — list the downstream routes: → `rpg-npc-creator` (forger/guardian/hunter), → `rpg-faction-creator` (who hunts/guards it), → a location-creator (where it is kept/made), → `rpg-clue-mapper` (clues leading to it), → context-honored + tone/deviation notes.

- [ ] **Step 6: Coherence + What to avoid** — port the node/price coherence tests (frameworks §7) and the failure modes (frameworks §6 + the dark-tone two). Include "inflating tone past 3 without permission" and "writing stat blocks / item levels — this skill is system-agnostic".

- [ ] **Step 7: File output** — save as `artifact-<slug>.md` in the working folder; for Full, summarize + link.

- [ ] **Step 8: Validate** — re-read for `": "` in the description, dangling references to sections that don't exist in the reference files, and any accidental AoN `?ID=` link (there should be none). Commit — `git commit -m "feat(loremaster): rpg-artifact-creator SKILL.md"`

## Task 5: Wire the conductor

- [ ] **Step 1:** In `rpg-campaign-conductor/SKILL.md`, add `rpg-artifact-creator` to the skill list in **the frontmatter `description`** (the parenthetical list of creator skills) and to **the "Required: the creator skills" line** (line ~32: `... rpg-npc-creator, rpg-clue-mapper`). Keep the no-`": "` rule in the frontmatter.

- [ ] **Step 2:** In `orchestration-playbook.md`:
  - **§1 kit map table** — add a row: `| rpg-artifact-creator | a single legendary object (artifact/relic) | narrative node + price | cross-cutting (system-agnostic) |`.
  - **§2 sequence logic** — add a soft-order note: an artifact is built when its **owner/site/truth exists** (like the NPC, it is cross-cutting, not a fixed step); the campaign's central McGuffin can be built right after the foundation if the truth turns on an object.
  - **§3 handoff protocol** — add an `rpg-artifact-creator` bullet (consumes: a relic/object named by faction/location/foundation + the central truth + tone; emits: npc/faction/location/clue-mapper handoffs). **Also append "ready for rpg-artifact-creator"** to the emit lines of `rpg-faction-creator` (its holy relic), `rpg-location-creator` (the prize), and `rpg-campaign-foundation` (the McGuffin embodying the truth).

- [ ] **Step 3:** In `campaign-bible-template.md` **§3 Layer Status table**, add a row: `| Central artifact/relic | rpg-artifact-creator | pending | — |`. (Optionally note in §2 that an artifact's name goes in the registry like any proper name.)

- [ ] **Step 4: Commit** — `git commit -m "feat(loremaster): wire rpg-artifact-creator into the conductor"`

## Task 6: Extend the reviewer

In `agents/rpg-campaign-reviewer.md`:

- [ ] **Step 1:** Add `artifact-*.md` to the file glob list (the "Inputs you'll be given" bullet, line ~13).
- [ ] **Step 2:** Add a new audit check (e.g. **H. Artifact integrity**): for each `artifact-*.md` — does it have a **will** with at least one **desire-line** (someone in the world acting on it)? Does the **gift** have a corresponding **price**, and does the price have **stages and a tell**? Is the artifact's name consistent with the registry / not relocated or renamed across artifacts? Flag a gift with no price (🟡), a will no one pursues (🟡), a renamed/relocated artifact (🔴), a price with no tell or no stages (⚪).
- [ ] **Step 3:** Mention artifacts in the report's scope where the artifact list is enumerated. Keep "it audits and reports; it never edits".
- [ ] **Step 4: Commit** — `git commit -m "feat(loremaster): reviewer audits artifact dossiers"`

## Task 7: Update README and help

- [ ] **Step 1:** In `README.md` **"What's inside" table**, add a row after `rpg-npc-creator`: `| **rpg-artifact-creator** | a single legendary object as a narrative node — provenance, will, who wants it, gift + price (corruption stages) | an artifact/relic/cursed item the plot turns on |`. Update any prose count of skills (the "seven creator skills" / "eight rpg-*" phrasing) to reflect the new creator. Consider one line in the philosophy/NPC area noting it is the **second system-agnostic** skill.

- [ ] **Step 2:** In `commands/rpg-loremaster-help.md`:
  - Add a table row in **"What you can do"** mirroring the README description (skill `rpg-artifact-creator`).
  - Update **"the eight `rpg-*` skills"** → **"the nine `rpg-*` skills"** in both spots (the Quick-start line ~14 and the workflow step ~35).
  - Add a **"Good to know"** bullet: `rpg-artifact-creator` is the kit's **second system-agnostic** skill (like the NPC creator) — it builds the object the plot turns on, with a cost, and works in any system.
  - In an à-la-carte workflow, add one line: when an output names a key object/relic, hand it to `rpg-artifact-creator`.

- [ ] **Step 3: Commit** — `git commit -m "docs(loremaster): add rpg-artifact-creator to README and help"`

## Task 8: Validation & final review

- [ ] **Step 1: No `?ID=` links** — `grep -rn "?ID=" plugins/rpg-loremaster/skills/rpg-artifact-creator/` returns nothing (system-agnostic skill, no AoN deep links).
- [ ] **Step 2: Frontmatter sanity** — confirm `SKILL.md` `name: rpg-artifact-creator` matches the folder, the `description` has no `": "` and is ≤ 1024 chars: `grep -n "description:" plugins/rpg-loremaster/skills/rpg-artifact-creator/SKILL.md`.
- [ ] **Step 3: Reference completeness** — every `references/*.md` the SKILL cites exists; every `§N` cited in SKILL.md exists in `artifact-frameworks.md`.
- [ ] **Step 4: Cross-wiring** — grep the kit for `rpg-artifact-creator` and confirm it appears in: the new skill, conductor SKILL + playbook + bible template, reviewer, README, help. `grep -rln "rpg-artifact-creator" plugins/rpg-loremaster/`.
- [ ] **Step 5: Install smoke test (optional, manual)** — `/plugin marketplace add ~/projects/rpg-marketplace`, reinstall/`/reload-plugins`, `/skills` shows nine `rpg-*` skills including `rpg-artifact-creator`.
- [ ] **Step 6: Optional self-review** — run `/code-review` over the branch diff for prose consistency (tone, no leaked tokens, handoff wiring symmetry). Address findings.
- [ ] **Step 7:** Open a PR from `feat/rpg-artifact-creator` to `main` (the repo's merge pattern), summarizing the new skill and the wiring.

---

## Out of scope (per spec — do not build)

- Mundane / minor magic items, shop inventories, treasure hoards / reward packages.
- Any PF2e mechanical layer beyond the single optional pointer line in `artifact-frameworks.md`.
- A new reviewer *agent* — the existing one is extended.
- Editing shared reference originals — references are duplicated per skill by design.
- Any `plugin.json` / `marketplace.json` change — skills are auto-discovered.

# Co-Creation (embate-builder)

> Operational copy of the kit's shared DNA (master: `design-philosophy.md` at the kit root). This is the **front-end** of the skill — run it before building any challenge. The skill is a thinking partner that draws the GM's scene out, sharpens the numbers, and wraps it as a situation; it is **not** a DC-vending machine.

> **About the examples here:** illustrative only — generic, or from public media (e.g. Critical Role's *Vox Machina*). **Never reuse them verbatim** — they are teaching aids; copying them would bleed unrelated flavor into the user's game.

---

## Part A — The co-creation loop

This skill needs **four things** it should *draw out*, not assume:

1. **Party level and size** — REQUIRED for honest DCs. **Check the party overview first** — Glob the vault root for `party-*.md` (or the campaign bible's Party section, written by `rpg-party-forge`); if present, read `Nível`/`Tamanho` and *confirm* rather than asking cold. Otherwise never assume *silently* — confirm, or (on "just run with it") state your assumption aloud and flag the math as approximate.
2. **The shape: single check or VP challenge** — one dramatic beat, or a scene resolved over many rolls? If the GM isn't sure, read it from the stakes and offer your read.
3. **The subsystem** — Influence / Chase / Research / Infiltration / generic. This picks the preset structure.
4. **The challenge's purpose** — what is this *for* in the campaign? What changes if the players ace it, scrape through, or fail?

These four decisions drive everything else. Default the rest (exact DCs before you've stated party level, the precise read-aloud wording, which specific skills the players will reach for). **Match the user's language** in all output, including headings; keep PF2e canon names and AoN category URLs in English.

### Read the room first

- **User pastes a session-prep handoff or a scene brief** → use it directly; confirm party level/size; ask whether it's one check or a scene, and which subsystem fits.
- **User says "set the DC for this Acrobatics leap"** → a single check. Verify party level; set the Level-Based or Simple DC with an adjustment; name the four degrees and a fail-forward consequence.
- **User says "build me a social/chase/research/heist scene"** → a VP challenge. Pull the relevant `npc` / `faccao` brief from the vault (or ask for a sketch); confirm party level/size; pick the preset and size it.
- **"Just run with it"** → name your assumptions aloud ("party level 4, 4 characters, an Influence challenge at `long` scale, target 7"), draft the full challenge, and offer to tune.

State the **escape hatch early**: "Say 'just run with it' and I'll draft a complete challenge from what we have, then we tune."

### The loop — repeat per load-bearing decision

1. **Open.** Pull *their* picture first. "What is this scene about — what are the players walking into, and what are they trying to make happen? And what level is the party, how many characters?"
2. **Spark when stuck.** Offer 2–4 concrete options to react to (use AskUserQuestion). For the shape: "This sounds like a single tense Intimidation beat — one DC, win or fail forward. Or do you want a back-and-forth where the warden's resolve erodes over several rolls? That'd be an Influence challenge, `long` scale, target 7."
3. **Reflect.** Play the scene back as a situation. "So: a `long` Influence challenge at level 4, the harbor-master's cooperation as the track, target 7 with a threshold at 4 where he starts bending — in his counting-house, while the tide clock runs. Yes?"
4. **Probe gaps.** The key probes for *this* skill:
   - *"What does the VP track actually measure in the fiction — the council's favor, the pursuer's distance, the guards' awareness?"*
   - *"What does failure cost — what new path or price opens? (It should never just stop the scene.)"*
   - *"Which different skills can contribute, so it isn't just the one PC with the best modifier rolling until it's done?"*
   - *"Does this challenge expose a clue-map revelation, or should its track be a front clock the world advances?"*
5. **Build by section, check in.** Show the VP sizing and DCs first, confirm them, then add the situation block. Don't dump the full challenge mid-collaboration.

### The load-bearing decisions (ask about these; default the rest)

1. **Party level and party size** — never assume *silently*; every DC is relative to these.
2. **Single check vs. VP challenge, and the subsystem** — shapes the whole structure.
3. **The challenge's purpose and what failure costs** — why it exists, and the fail-forward price.

**Default freely:** which exact skills the players reach for (describe the situation and let them choose — see `challenge-as-situation.md`), the precise per-roll wording, the specific threshold flavor, the read-aloud phrasing.

### The test for "am I interrogating?"

Open questions + reflection + a drafted beat, one thread at a time. **If you've asked two questions without giving something back** (a reflection, a VP sizing, a drafted DC), you've slipped into interrogation. *Give before you ask again.*

### Worked micro-example (building a VP challenge — generic)

*(Do not reuse verbatim.)*

> **You:** "What's the scene about — what are they trying to make happen? And what level is the party, how many characters?"
> **User:** "Level 4, four players. They need to convince a smugglers' council to grant them passage before the council votes to close the harbor. I want it tense, with room to fail."
> **You (reflect + size):** "That's an Influence challenge — accumulating, `long` scale: **target 7 VP, threshold at 4**. The track is the council's favor. Per roll: crit +2, success +1, crit-fail −1, so 4–7 influence checks across the debate. Base DC at level 4 is **18**; if they spend a discovery check to find a councillor's grudge, influence checks playing on it drop to **16** (Easy −2). At threshold 4 the hostile speaker stands down; at 7 they get passage. Failure doesn't end it — a crit-fail hardens one councillor (next check on them is Hard +2) and burns a beat; running out of beats closes the harbor *for now* but leaves the door they opened at threshold 4. Want me to write the situation and the read-aloud?"

### Worked micro-example (a single dramatic check — generic)

*(Do not reuse verbatim.)*

> **User:** "They have to leap across a collapsing bridge while being chased. One roll. Level 3 party."
> **You:** "Single Acrobatics check. Level-Based DC for level 3 is **18**. I'd call the wet, tilting planks **Hard +2 → DC 20**. Degrees: **crit (30+)** they cross *and* kick the span loose behind them, blocking the pursuit; **success** they make it; **failure** they make it but drop something or arrive prone and winded as the pursuers close; **crit-fail** they go into the gorge — but the river carries them somewhere new, not to death (fail forward). Want this as a `desafio` with `scale: single-check`?"

---

## Part B — Read-aloud (the opening image)

Challenges have one natural read-aloud beat: the **opening image** — the sensory description of the scene's starting position before the PCs act.

- **~40–70 words.** Long enough to land the place and the stakes; short enough to hold attention.
- **Sensory and concrete.** What the players perceive *right now* — the council chamber's held breath, the wet rope underfoot, the archivist's wary glance.
- **Never narrate the PCs.** Don't state what the characters feel, decide, or are about to do.
- **End open.** Trail off on something the players will immediately want to act on — the hostile councillor, the closing gap, the locked ledger.
- **Mark it:** a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**).

Write one read-aloud block per challenge. For Full output, add a second optional block for the escalation trigger (the moment the clock fires or awareness spikes).

### Example (an opening image, ~55 words — generic)

> **Read-aloud / Para ler à mesa:**
> *The counting-house smells of tallow and brine. Seven of the council sit behind a long table; the eighth chair is empty, its occupant already on his feet, arms folded, watching you the way a gull watches a dropped coin. Outside, the tide-bell tolls the half-hour. Someone clears their throat and waits.*

*(Do not reuse verbatim. Adapt to the challenge's specific place, stakes, and tone.)*

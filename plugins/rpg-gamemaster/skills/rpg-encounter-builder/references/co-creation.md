# Co-Creation (encounter-builder)

> Operational copy of the kit's shared DNA (master: `design-philosophy.md` at the kit root). This is the **front-end** of the skill — run it before building any encounter. The skill is a thinking partner that draws the GM's fight out, sharpens the numbers, and wraps it as a situation; it is **not** a budget-calculator vending machine.

> **About the examples here:** illustrative only — generic, or from public media (e.g. Critical Role's *Vox Machina*). **Never reuse them verbatim** — they are teaching aids; copying them would bleed unrelated flavor into the user's game.

---

## Part A — The co-creation loop

This skill needs **three things** it should *draw out*, not assume:

1. **Party level and size** — REQUIRED. The math is meaningless without both. Never assume *silently* — confirm, or (on "just run with it") state your assumption aloud and flag the math as approximate.
2. **The threat tier** — how hard should this fight be? (trivial / low / moderate / severe / extreme). If the GM isn't sure, offer the options and the stakes for each.
3. **The fight's purpose** — what is this encounter *for* in the campaign? What happens if the players skip it, win it, or lose it differently than expected?

These three decisions drive everything else. Default the rest (exact creature flavor, specific item names, precise read-aloud wording). **Match the user's language** in all output, including headings; keep PF2e canon names and AoN category URLs in English.

### Read the room first

- **User pastes a session-prep handoff or a scene brief** → use it directly; confirm party level/size if not stated; ask the desired threat tier.
- **User says "balance this fight"** with a creature in mind → verify party level/size; compute the budget; show whether it hits the stated tier.
- **User says "build me an encounter against [faction or threat]"** → pull the relevant `faccao` or `frente` brief from the vault (or ask for a sketch); confirm party level/size; draft a build.
- **"Just run with it"** → name your assumptions aloud ("I'm assuming party level 5, 4 characters, Moderate threat"), draft the full encounter, and offer to tune.

State the **escape hatch early**: "Say 'just run with it' and I'll draft a complete encounter from what we have, then we tune."

### The loop — repeat per load-bearing decision

1. **Open.** Pull *their* picture first. "What is this fight about — what situation are the players walking into? And what level is the party, and how many characters?" (Two questions on the most critical inputs; acceptable here because neither can be defaulted.)
2. **Spark when stuck.** Offer 2–4 concrete options to react to (use AskUserQuestion). For threat tier: "For a Moderate encounter at level 5 (party of 4), the budget is 80 XP. That's one PL+1 boss (60 XP) plus two PL−2 lackeys (20 each) = 100 XP — slightly over Moderate, close to Severe. Do you want to stay at 80 (drop one lackey) or push to Severe (120 XP, add one more lackey)?"
3. **Reflect.** Play the fight back as a situation. "So: a Moderate encounter at level 5, a corrupted city guard captain flanked by two dock thugs, in a burning warehouse — the players need to reach the hostage before the fire spreads. Yes?"
4. **Probe gaps.** The key probes for *this* skill:
   - *"Do any of the creatures you're naming already exist as vault `inimigo` notes — or are these new statblocks?"*
   - *"What happens if the players run? Is there a way to fail this fight that isn't a TPK?"*
   - *"Does this encounter expose a clue-map revelation, or advance a front clock?"*
5. **Build by section, check in.** Show the budget arithmetic first, confirm it, then add the situation block. Don't dump the full encounter mid-collaboration.

### The load-bearing decisions (ask about these; default the rest)

1. **Party level and party size** — never assume *silently*; confirm, or state the assumption aloud and flag the math as approximate. The entire encounter is relative to these.
2. **Desired threat tier** — shapes the budget and the tension. If the GM doesn't know, offer the options.
3. **The fight's purpose** — why does this encounter exist in the campaign? What changes after it, win or lose?

**Default freely:** exact creature names (derive from AoN category and level), specific item names (derive from the treasure table), the read-aloud wording (derive from the terrain and tone), tactical positioning unless the GM has a specific layout in mind.

### The test for "am I interrogating?"

Open questions + reflection + a drafted encounter beat, one thread at a time. **If you've asked two questions without giving something back** (a reflection, a budget calculation, a drafted creature roster), you've slipped into interrogation. *Give before you ask again.*

### Worked micro-example (building from scratch — generic)

*(Do not reuse verbatim.)*

> **You:** "What's the fight about — and what level is the party, and how many characters?"
> **User:** "Level 4, five players. They're confronting a crime lord's enforcer who's been shaking down the market district. I want it to feel dangerous but winnable."
> **You (reflect + budget):** "Dangerous but winnable sounds like Severe for five players at level 4: base 120 XP + 30 (5th PC) = **150 XP budget**. For a 'dangerous enforcer with backup' structure, one option: a Level 5 boss (PL+1 = 60 XP) plus three Level 3 thugs (PL−1 = 30 XP each = 90 XP total) → 60 + 90 = **150 XP exactly, on budget.** The situation: the enforcer holds a market stall owner hostage; the thugs block the exits; the players can fight, negotiate, or cause enough chaos to scatter the crowd and isolate the enforcer. Does that shape work, or do you want to adjust the creature mix?"

### Worked micro-example (checking an existing fight — generic)

*(Do not reuse verbatim.)*

> **User:** "I have three ogres planned for a level-4 party of 4. Is that okay?"
> **You:** "Let me check. What level are the ogres — are these standard PF2e ogres (level 3, so PL−1 = 30 XP each)? Three at 30 = 90 XP. For a party of 4 at level 4: Moderate budget is 80 XP, Severe is 120 XP. 90 XP sits between them — high Moderate, low Severe. Playable, but leans easier than a full Severe threat. If you want it to feel dangerous, bump one ogre to a leader (Level 5, PL+1 = 60 XP) and keep two standard (30 each) → 60 + 60 = **120 XP — solid Severe.** Want me to build out the situation with that roster?"

---

## Part B — Read-aloud (the opening image)

Encounters have one natural read-aloud beat: the **opening image** — the sensory description of the fight's starting position before the PCs act.

- **~40–70 words.** Long enough to land the location and the threat; short enough to hold attention.
- **Sensory and concrete.** What the players perceive *right now* — the smell of the warehouse smoke, the sound of a sword being drawn, the one detail that tells them this is going to be a fight.
- **Never narrate the PCs.** Don't state what the characters feel, decide, or are about to do.
- **End open.** Trail off on something the players will immediately want to act on — the terrain feature, the hostage, the enemy's position.
- **Mark it:** a blockquote labelled **Read-aloud** (PT-BR: **Para ler à mesa**).

Write one read-aloud block per encounter. For Full output, add a second optional block for the escalation trigger (the moment reinforcements arrive or the clock fires).

### Example (an opening image, ~55 words — generic)

> **Read-aloud / Para ler à mesa:**
> *The warehouse stinks of tallow and old fish. Three figures block the far exit — two holding clubs, one standing with her back to you, her hand on the shoulder of a man on his knees. The building's upper beams are already smoking. Somewhere above you, something cracks.*

*(Do not reuse verbatim. Adapt to the encounter's specific location, threat, and tone.)*

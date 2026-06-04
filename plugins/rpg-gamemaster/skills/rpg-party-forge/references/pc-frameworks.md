# PC Frameworks — the design engine

The toolkit for building a **player character** as a person rooted in the campaign — not a stat block, and not a free-floating backstory. It shares its core with `rpg-npc-creator`'s engine (belief → wound → want vs. need → contradiction → voice) but adds the two things a PC needs that an NPC doesn't: **a hook that anchors them to the world**, and **a GM-secret layer** that makes the party converge. **System-agnostic** for the personality; the PF2e build is captured, not designed here.

## Contents
1. The core — the engine (shared with NPCs)
2. The campaign hook — anchoring the PC to the world (PC-specific)
3. The GM-secret & convergence layer (PC-specific)
4. Player co-ownership — the boundary
5. Coherence, the logic test, and the quick checklist

---

## 1. The core — the engine

The difference between a forgettable PC and one the table builds a campaign around is **specificity and contradiction**. Build from the inside out — surface from root:

- **Core belief** — what this character believes about the world that drives their actions ("loyalty is the only thing worth anything"; "no one is coming to save you, so take what you need"; "everyone deserves a second chance"). Understandable, but possibly wrong or incomplete — the thing play will test.
- **Wound / formative experience** — what happened that created the belief. **Be specific and active.** Not "a hard past" but "his entire crew was massacred while he was out on a job, and he lived by pure luck." The wound still shapes behavior now — it's the engine, not a résumé line. For a PC, the wound is also the seed the campaign grows from: it points at the hook (§2) and is where the GM's secret latches on (§3).
- **Want vs. need** — the **want** is the conscious goal the character is chasing (find who killed the crew); the **need** is the thing they actually need but won't admit (to belong to something again without losing it). The gap is the character's arc — and unlike an NPC, the *player* gets to travel it across the campaign.
- **The contradiction** — where behavior doesn't match stated values (the loyalist who trusts no one; the healer who has started rationing mercy; the thief with a code they keep breaking). This gap is what makes the character interesting to *play*, not just to read.
- **The table voice** — something performable instantly: a speech pattern, a verbal tic, a habit under pressure, an attitude that colours everything. This is the player's handle on their own character; offer it, don't impose it.

**The one-line concept** (put it at the top of the sheet): *"[Name] — [the character in a phrase] who [core contradiction]."*

## 2. The campaign hook — anchoring the PC to the world

This is the load-bearing addition over the NPC engine. **A PC must be tied into the campaign**, or they float free of it — interesting alone, inert at the table. The hook is the thread that runs from the character's wound or want into a node the world already has.

- **Anchor to a real node.** The hook points at a `faccao`, `regiao`, `local`, `frente`, or clue that exists (or that you flag for a loremaster creator to build). Name it by **exact vault name**. "He wants revenge" is not a hook; "he's hunting whoever wiped out his crew, and that trail runs through **[[A Mão Funda]]**" is.
- **Grow it from the wound.** The strongest hooks are the wound pointed outward: the grief becomes a hunt, the betrayal becomes a debt to collect, the exile becomes a homeland to reclaim. Don't bolt a hook on — find the one already implied by the core.
- **Make it a question, not a quest.** A hook is an open situation the campaign can pull on ("does belonging again mean rejoining the network that got his crew killed?"), not a checklist task. Leave it unresolved.
- **One is enough to start; 4–5 personal hooks for Full.** A Compact sheet needs one strong anchor. A Full sheet lists 4–5 personal hooks, each a way the campaign can pull this character in — at tone 3+, mark ≥1–2 as **moral-cost** (helping costs someone; the revenge has a price).

## 3. The GM-secret & convergence layer

The other thing a PC has that an NPC doesn't: a layer the *player doesn't see*. This lives in `## ⚠️ Verdade do GM (não revelar ao jogador)` and is authored privately by the GM. Three parts:

- **The seed** — something planted on or around the character that they don't understand yet, revealed slowly through play (an heirloom that's secretly a relic; a name in a registry; a benefactor who isn't what they seem). Seeds turn a backstory into a *future* — the slow-burn payoff.
- **The hidden tie to the antagonist's plan** — how this character's wound connects, unknown to them, to the campaign's central truth. The villain who wiped out the crew is the same hand behind the main plot; the character is already inside the story before they know it.
- **The convergence** — how this PC's thread crosses *another* PC's. Paired seeds that respond to each other, a shared enemy hitting two characters from different angles, a common wound neither knows the other carries. **At least one crossing thread per PC** is what makes five backstories into one party. This is the spine session zero lays down — the players feel it as coincidence; the GM built it on purpose.

Keep the secret layer **discoverable**: it must be revealable through evidence in play, not a twist that only ever lives in the GM's notes. A secret that can never surface is set dressing.

## 4. Player co-ownership — the boundary

A PC is co-owned, and the line is clean:

- **The shared layer** (§1–2: belief, wound, want/need, contradiction, voice, the hook) is built **with** the player. The player has final say. Spark, reflect, and offer options — but never overwrite a stated choice with a "better" one.
- **The GM-secret layer** (§3) is authored **privately**. The player consents to *having* secrets (agreed in session zero), not to their content. Never read the secret layer aloud; never put it in the player handout.

When the GM is relaying for an absent player, build the shared layer as a *proposal* the player can veto later — flag it as provisional rather than locking the player's character without them.

## 5. Coherence, the logic test, and the quick checklist

Two checks before finalizing. A PC coheres when **every trait serves the core, the hook, or the convergence.**

- **The logic test:** could someone explain *why* this character does what they do, even if they disagree? "Brooding loner" fails; "won't rely on anyone because the one time he did, his crew died for it" passes. If a trait doesn't trace to the belief, the wound, or the hook, it's decoration — cut it or connect it.
- **The sympathizer test:** write one sentence making the character's case as *they* would. If the only case is "they're cool" or "they're edgy," add a true grievance, a real love, or a blind spot.

### Quick build checklist
1. One-line concept stated (name + character + core contradiction)?
2. Core belief named, and a **specific, active** wound behind it?
3. Want and need both named, and in tension?
4. At least one genuine contradiction (surface vs. beneath)?
5. A performable table voice (2-second grab)?
6. **A campaign hook anchored to a real vault node by exact name** (the PC-specific must)?
7. The GM-secret layer authored: seed + hidden tie + **≥1 convergence with another PC**?
8. Logic test passed (someone could explain *why* they act)?
9. Sympathizer test passed (you can argue *for* them)?
10. The PF2e build captured (not optimized) under `## A Ficha`?
11. The shared layer built **with** the player; the secret layer kept private?
12. Off-stage handoffs named (hook target → its creator; secret → clue-mapper)?

# Co-Creation (session-recap)

> Operational copy of the kit's shared DNA (master: `design-philosophy.md` at the kit root). This is the **front-end** of the skill — run it before extracting a single beat. The skill is a reconciliation partner that draws the GM's account out and checks it against the vault; it is **not** a stenographer that transcribes and writes without checking.

> **About the examples here:** illustrative only — generic, or from public media. **Never reuse them verbatim** — they are teaching aids, and copying them would bleed unrelated flavor into the user's game.

## Part A — The co-creation loop

This skill needs **three things** it should *draw out*, not assume:

1. **The account** — what actually happened. Pasted notes, a dictated summary, bullet points, or "just read the transcript."
2. **Which session this recaps** — usually obvious (the most recent `sessao`), but confirm if more than one unplayed session exists.
3. **How much to trust the transcript vs. the account**, when both exist — the account is always the spine; the transcript is enrichment and verification, not a replacement source.

### Read the room first

- **User pastes or dictates a full account** → use it directly as the spine; confirm which session it recaps; check for a linked transcript to cross-verify specific beats.
- **User says "just read the transcript"** → if `sessao.transcript` is set, read the `transcricao` note and extract beats from it directly, but still confirm the headline outcomes back to the GM before treating them as settled — a transcript records everything that was said, not everything that *mattered*.
- **User gives a short bullet list** ("resgatamos a Elara, o Conselho descobriu, matamos o capitão") → treat each bullet as a beat seed; ask only what's needed to resolve entities and outcomes, not to pad the account.
- **"Just run with it"** → take what's available, name your assumptions (e.g. "I'm treating 'descobriu' as the Council now suspects, not confirms — flag me if that's wrong"), draft the change set, and offer to tune.

State the **escape hatch early**: "Say 'just run with it' and I'll draft the recap and change set from what we have, then we tune before anything gets written."

### The loop — repeat per decision

1. **Open.** Pull *their* picture first. "What happened this session? Paste your notes, tell me the highlights, or point me at the transcript if you recorded it."
2. **Spark when stuck.** Offer 2–4 concrete options to react to (use AskUserQuestion). For an ambiguous outcome: "Did the party actually finish 'O Resgate', or just get close? I'd read 'we got her out but the guards are still alive' as *completed* — the objective was extraction, not the fight. Agree, or is there more to it?"
3. **Reflect.** Play the beats back as a clean list before drafting the change set. "So: the party extracted Elara (quest complete), the Consortium now knows the safehouse is blown (a fact worth an `evento`), and Captain Voss's fate is unclear — dead, or did they let him live? That last one changes an NPC status, so I want to check before I flip it."
4. **Probe gaps.** The key probes for *this* skill: *"does anything here contradict what the vault currently shows?"* and *"are there any names here that might not match the vault exactly?"*
5. **Build section by section, check in.** Don't dump a complete change set mid-collaboration. Extract the beats first, show them, confirm, then match entities and draft mutations.

### The load-bearing decisions (ask about these; default the rest)

1. **What actually happened** — the account itself; never assume or invent a beat that wasn't given.
2. **Ambiguous outcomes** — whether a quest completed, failed, or merely advanced; whether an NPC's fate is settled or still open. Never default these to the more dramatic reading.
3. **Every genuine conflict** (per `reconciliation-model.md`'s taxonomy) — always the GM's call, never resolved silently.

**Default freely:** which beats warrant their own `evento` entity vs. folding into the `sessao` outcomes note, exact phrasing of the recap prose, whether to write the "Previously on…" read-aloud (offer it, don't insist) — unless the user signals they care.

### The test for "am I interrogating?"

Open questions + reflection + a drafted beat or matched entity, one thread at a time. **If you've asked two questions without giving something back** (a reflected beat, a resolved match, a draft change-set row), you've slipped into interrogation. *Give before you ask again.*

### Worked micro-example (clean account, generic)

*(Do not reuse verbatim.)*

> **You:** "What happened this session? Paste your notes or give me the highlights — I'll match everything to the vault and draft the updates."
> **User:** "The party tracked the smuggler's ledger back to the harbormaster, confronted her, she confessed and named her contact in the Consortium. They didn't arrest her — let her go in exchange for the name."
> **You (reflect):** "So: quest '[[Follow the Ledger]]' resolves — I'd call that *completed*, since the objective was identifying the contact, not arresting the harbormaster. New fact worth an `evento`: the harbormaster is now a compromised source, not an enemy. And a revelation lands — is the Consortium contact's name one of the clue map's open R-IDs?"
> **User:** "Yes, R3."
> **You (draft):** "Then R3 ticks as revealed. Here's the clean batch: quest→completed, one new `evento` for the confrontation, R3→revealed. No conflicts so far — want me to check the harbormaster's NPC status too, since letting her go might change how the vault currently has her flagged?"

### Worked micro-example (a conflict, generic)

*(Do not reuse verbatim.)*

> **You:** "One thing before I draft this: the vault currently has Captain Voss as `status: active` and allied with the party. Your account has the party killing him this session. That's a direct contradiction — which way do we go?"
> **User:** "Yeah, he betrayed them mid-fight, they killed him. The vault's just out of date."
> **You (adjudicate):** "Got it — that's a real state change, not an error. I'll flip Voss to `status: archived` with a body note on the betrayal and death. Since the campaign bible lists him as a `Locked` recurring contact for Act II, should I also flag this as a Deliberate Exception for the bible, so `rpg-campaign-reviewer` doesn't flag it as drift later?"
> **User:** "Good catch, yes."

## Part B — Read-aloud (light in this skill)

Almost all of a recap is GM-facing reconciliation. The one table-facing beat worth writing: the optional **"Previously on…" / "Nos episódios anteriores…"** block for opening the *next* session.

- **~40–70 words** — a montage, not a full recap.
- **Sensory and concrete** — the images that matter for what's coming, not a bulleted log.
- **Never narrate the PCs' feelings or intentions** — state what happened; the players own how they felt about it.
- **End on a forward note** — it exists to launch the next session, not to close this one.

Only write it when the recap is Full or the GM asks — it's a gift to `rpg-session-prep`'s strong start, not mandatory output.

### Example (~50 words, generic)

> **Read-aloud / Para ler à mesa:**
> *Last session: you followed a smuggler's ledger to the harbormaster's office, and she gave up her Consortium contact rather than face what you knew. Captain Voss did not go so quietly — his blade turned on you mid-fight, and it was the last mistake he made. The name you won is Rendara Mosswick's. You haven't used it yet.*

# Output Template

The markdown skeleton for a session recap. Both versions share the structure; **Compact** is the beats + the change set + Persist, **Full** adds the entity-matching notes, the conflict log, the "Previously on…" read-aloud, and the front-tracker cross-reference.

Filename convention: save the recap as `session-recap-<slug>.md` (e.g., `session-recap-the-harbormaster-gambit.md`) in the user's working folder. Tell the user the path. The vault mutations (`sessao` update, new `evento`s, `quest` flips, NPC/faction notes) are persisted separately via `rpg-preserve` — the recap document is the GM-facing human record; the vault entities are the machine-readable state.

---

## Skeleton (both versions)

```markdown
# Session Recap — [Session Title or "Session N"]
*Return edge — Pathfinder 2e kit · Tone inherited: [level N] · Act: [act] · Session date: [YYYY-MM-DD]*

> **Recapping:** [[Sessão Vault Name]]
> **Source:** [GM account only / GM account + transcript]

---

## What Happened

[3–6 sentences, prose. The beats in order, in plain language — not a change-set preview. This is what the GM reads back to confirm you understood the session before anything gets drafted as a vault change.]

---

## Change Set

Proposed vault mutations. **Clean** = no contradiction found, batched for one approval. **Resolved** = was a conflict, now decided (see Conflict Log in Full). Nothing in this table is written until reviewed.

| # | Entity | Change | Status | Note |
|---|---|---|---|---|
| 1 | [[Sessão Name]] | update — add outcomes | Clean | [one line] |
| 2 | [[Quest Name]] | status: available → completed | Clean | [one line] |
| 3 | [[New Event Name]] | create `evento` | Clean | [one line] |
| 4 | R[n] | mark revealed (clue map) | Clean | [one line] |
| 5 | [[NPC Name]] | status: active → archived | Resolved (was: state contradiction) | [one line — see Conflict Log] |

*If any row is still unresolved when this document is finalized, it does not belong in this table — see "Open Items" below instead.*

---

## Open Items (if any)

Conflicts not yet adjudicated, or missing nodes not yet resolved. These block the corresponding Change Set row until the GM decides.

- **[Entity/name]** — [state contradiction / canon mismatch / bible drift / ambiguous outcome / missing node] — [the question that needs an answer]

---

## Revealed This Session

Cross-referenced against the clue map. Only R-IDs the account confirms landed — do not tick a probable reveal.

| R-ID | Revelation | Confirmed by |
|---|---|---|
| R[n] | [one line] | [account / transcript] |

---

[FULL ONLY from here ↓]

## Entity Matching Notes

How names in the account resolved to vault entities — useful when a match wasn't a trivial exact hit.

| Name in account | Resolved to | How |
|---|---|---|
| "a harbormaster" | [[Rendara Mosswick]] | role match, only harbormaster in the vault |
| "Capitão Voss" | [[Captain Voss]] | title variant, exact NPC match |

## Conflict Log

For every item that went through adjudication: what was asked, what the GM decided, and why. This is the record that lets a future recap (or `rpg-campaign-reviewer`) understand *why* the vault says what it says.

### [Conflict subject]
- **Category:** [state contradiction / canon mismatch / bible drift / ambiguous outcome / missing node]
- **Vault/bible said:** [...]
- **Account said:** [...]
- **Asked:** [the options offered]
- **GM decided:** [the decision]
- **Bible exception recorded?** [yes → one line for Deliberate Exceptions / no]

## Previously On… (opt-in read-aloud)

> **Read-aloud / Para ler à mesa:**
> *[~40–70 words. A montage of what happened, for opening next session. Sensory, concrete, never narrates the PCs' feelings. Ends forward, not closed.]*

## Front-Tracker Cross-Reference

Which active `frente`/`relogio` this session's beats likely feed — for the GM to bring into the next `rpg-front-tracker` run. Not a clock advance itself; this skill reads fronts for context only.

| Front | Beats that might feed it | Note |
|---|---|---|
| [[Front Name]] | [which change-set rows relate] | [why] |

---

## Handoffs

- → `rpg-npc-creator` (loremaster): [any new NPC the session introduced with no vault note]
- → `rpg-location-creator` (loremaster): [any new location reached with no vault note]
- → `rpg-faction-creator` (loremaster): [any faction plan the account implies but doesn't exist yet]
- → `rpg-clue-mapper` (loremaster): [any revelation the session produced that isn't on the clue map]
- → `rpg-front-tracker` (gamemaster): advance the clocks — this recap's outcomes are the input
- → `rpg-session-prep` (gamemaster): plan the next session once fronts are advanced
```

---

## Persist

This section is **not** part of the recap document above — it is a separate instruction to route each candidate to `rpg-preserve` after the GM has reviewed the Change Set.

Hand each of these to **rpg-preserve** (never write files directly):

### `sessao` update — [[Sessão Name]]

```
type: sessao
name: "Sessão 3"
patch:
  quests:
    - "[[O Resgate]]"
  events:
    - "[[A Confissao da Harbormaster]]"
append: |
  ## Outcomes
  [1-3 sentences — what happened, for the vault record.]
```

### `evento` create — [[New Event Name]]

```
type: evento
act: "[[Ato 1]]"
location: "[[Vault Name]]"
participants:
  - "[[Name]]"
session: "[[Sessão 3]]"
```

### `quest` status flip — [[Quest Name]]

```
type: quest
name: "O Resgate"
patch:
  status: completed
```

### `npc`/`faccao` state note — [[Name]]

```
type: npc
name: "Captain Voss"
patch:
  status: archived
append: |
  Session 3: betrayed the party mid-fight; killed in the harbor confrontation.
```

*`patch` = body-preserving field update (existing entity); a candidate with no `patch`/`append` keys is a from-scratch create (new entity, e.g. `evento`). See `references/vault-entity-contract.md`.*

### Clue-map ticks (loose file, not a vault entity)

For each row in "Revealed This Session": with the GM's approval, tick the corresponding R-ID in `clue-map-<slug>.md` directly (not through `rpg-preserve` — it's not a schema-governed entity).

---

## Section-by-section guidance

### What Happened (both versions)
Prose, not a table — this is the GM's confirmation checkpoint. Get this right before drafting the Change Set; if the GM corrects something here, it's cheaper than unwinding a drafted mutation.

### Change Set (both versions)
The heart of the document. **Clean rows** need no further discussion — batch-approve them together. **Resolved rows** were conflicts; point to the Conflict Log (Full) or just note the resolution inline (Compact). Never include a row that's still genuinely undecided — that belongs in Open Items.

### Open Items (both versions, omit if empty)
What's blocking a full Change Set. This is where the skill stops mid-recap and asks — see `reconciliation-model.md` §5 for the adjudication protocol.

### Revealed This Session (both versions)
Conservative by design — only confirmed reveals. A probable or partial reveal stays off the clue map's revealed list; the clue map's carry-forward mechanism (in `rpg-session-prep`) exists precisely so a missed or ambiguous reveal isn't lost.

### Conflict Log (Full)
The audit trail. Write enough that a GM reading this in three months understands why an NPC's status changed or why a "Locked" bible decision now has an exception attached.

### Front-Tracker Cross-Reference (Full)
Not a substitute for running `rpg-front-tracker` — a pointer to make that run faster and better-informed. This skill reads fronts for context; it does not decide which portents fired.

### Persist (both versions)
Always include this block. Without it, the recap exists only as a document in the working folder and none of its conclusions reach the vault.

---

## Length targets

| Section | Compact | Full |
|---|---|---|
| What Happened | 3–6 sentences | + more detail if the session was eventful |
| Change Set | included | included |
| Open Items | included (if any) | included (if any) |
| Revealed This Session | included | included |
| Entity Matching Notes | — | included when matches weren't trivial |
| Conflict Log | — | one entry per adjudicated conflict |
| Previously On… | — | opt-in |
| Front-Tracker Cross-Reference | — | included |
| Handoffs | included | included |
| Persist | included | included |

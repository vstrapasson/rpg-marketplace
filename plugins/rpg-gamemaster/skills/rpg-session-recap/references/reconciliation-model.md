# Reconciliation Model

The engine of `rpg-session-recap`. Where `rpg-front-tracker`'s bedrock is *fronts-and-clocks.md* (tracking momentum) and `rpg-session-prep`'s is *lazy-dm-eight-steps.md* (arranging a launchpad), this skill's bedrock is **reconciliation**: turning a free-text account of a session into vault state without silently overwriting or silently dropping anything the vault or the campaign bible already believes.

## 1. Source-of-truth ordering

Three sources, three different kinds of truth, and a fixed precedence when they disagree:

1. **The campaign bible** is truth for **identity and canon** — who's who, what the central truth is, what's locked for the act structure. This mirrors `agents/rpg-campaign-reviewer.md`'s rule: "if anything in another artifact contradicts the bible, the bible wins (unless the bible's Deliberate Exceptions section records the contradiction on purpose)."
2. **Vault entities** are truth for **prior state** — what the world believed was true *before* this session (a quest's last known status, an NPC's last known allegiance, a clock's last known fill).
3. **The GM's account** is truth for **what happened this session** — the only source that can *change* prior state. What happened at the table beats what the vault last recorded, because the vault is a record of the past, not a constraint on the present.

**The ordering resolves most cases mechanically:** the account changes vault state, vault state doesn't override the account, and neither overrides the bible without an explicit decision. The interesting cases are exactly where this ordering runs into ambiguity — that's the conflict taxonomy below.

## 2. Beat extraction

A **beat** is one discrete thing that happened and matters for continuity: a resolution, a revelation, a death, a deal, a discovery, a shift in a relationship or allegiance, a new fact about the world. Not every sentence in an account is a beat — "they argued about which way to go for ten minutes" is table color, not state.

**Extract, don't summarize.** Pull beats as close to the account's own words as possible before translating them into vault language. A beat like "she gave up the contact's name rather than face what we knew" becomes, in vault terms: *revelation delivered (candidate for an R-ID tick)* + *NPC cooperated under pressure (candidate for a status note)*. Keep both the plain-language beat and its vault translation — the plain version is what goes in the recap prose; the translation is what drives the change set.

**A transcript enriches, it doesn't replace.** If `sessao.transcript` exists, use it to verify a beat the account already raised (confirm a name, a quantity, an exact quote for a read-aloud) or to fill a gap the account was vague about ("the harbormaster" → the transcript gives her full name). Do not comb the transcript for beats the GM's account never mentioned — the account is the GM's judgment about what *mattered*; the transcript is a record of everything that was *said*. Mining it for extra beats second-guesses that judgment.

## 3. Entity matching

Every named thing in a beat — an NPC, a faction, a location, a quest, an item — must resolve to a vault entity by **exact canonical name** before it can drive a change. This is the same discipline `rpg-session-prep` and `rpg-front-tracker` already apply to reads; here it applies to a write-adjacent process, so it matters more.

**Matching procedure:**
1. Check the campaign bible's Names Registry first, if one exists — it's the authoritative "reuse verbatim, never rename" list.
2. Glob the relevant vault folder (`npcs/`, `faccoes/`, `locais/`, `quests/`) and match by exact filename.
3. If no exact match: check for a *near* match (a nickname, a title used instead of a name, a minor spelling variant). A near match is a **canon/name mismatch** conflict (below) — resolve it as an alias, not a silent substitution.
4. If no match at all: this is a **missing node** — not a conflict, a handoff.

**Never guess past a mismatch.** Autocorrecting "Capitão Voss" to `[[Captain Voss]]` without confirming is exactly the kind of silent decision this skill exists to avoid — a wrong guess here becomes a broken link when `rpg-preserve` validates, or worse, a *successful* write to the wrong entity.

## 4. The conflict taxonomy

Five categories. Each one **stops the batch write** for that item and routes to the adjudication protocol (§5). Everything that doesn't fall into one of these five joins the clean batch.

### 1. State contradiction
The account contradicts the vault's recorded prior state. Examples: an NPC the vault has `status: active` and allied, but the account has the party killing them; a `quest` the vault has `available` that the account treats as already resolved from an earlier, unrecorded session; a `relogio` the GM says "held steady" but whose portents, per the front's own logic, clearly fired.

*Default assumption if the GM confirms:* the account wins — the world moved. But confirm first; a state contradiction is exactly as likely to be the vault being stale (an earlier session's recap was skipped) as it is to be a genuine new development.

### 2. Canon/name mismatch
A name in the account matches no vault entity exactly. Ask: is this **(a)** an existing entity under a different name/title (add as an alias, then proceed), **(b)** a genuinely new node (route as a handoff), or **(c)** a name the GM misspoke and actually means an existing entity (correct and proceed)?

### 3. Bible drift
The outcome diverges from something the campaign bible treats as fixed — the central truth, an act-structure gate, a "Locked" decision, an NPC the antagonist arc needs alive. Ask: **(a)** retcon the account (rare — only if the GM agrees it was a table mistake), **(b)** accept the drift and adapt the bible (record it in the bible's Deliberate Exceptions so `rpg-campaign-reviewer` and later skills don't flag or "correct" it), or **(c)** leave it unresolved for the GM to reconcile narratively before the next session.

### 4. Ambiguous outcome
The account doesn't make the new state unambiguous — "they're getting close" is not "completed"; "she seemed convinced" is not "revealed." Ask the GM to disambiguate. **Never default an ambiguous outcome to the more dramatic or more complete reading** — under-stating is safer than a false completion, but guessing either way is the failure mode. Hold the change out of the batch until it's resolved.

### 5. Missing node
The account implies an entity the vault has no note for — a new NPC met, a new location reached, a faction plan that needs to exist before the beat makes sense. Not a conflict in the disagreement sense — a **handoff**. Offer the GM the choice: stub it now (a minimal entity, `status: stub`, enough to link) or defer and hand off to the relevant loremaster skill, continuing the recap with a placeholder note.

## 5. The adjudication protocol

For every item in the conflict taxonomy:

1. **Present the conflict concretely** — what the account says, what the vault/bible currently holds, and *why* they don't reconcile automatically. Never a bare "this doesn't match."
2. **Offer 2–4 candidate paths**, framed as real options (use AskUserQuestion where it fits the shape of the decision). The category above suggests the default option set (e.g. bible drift → retcon / adapt+record / leave open).
3. **Take the GM's decision.** Don't re-litigate it — once decided, it's settled for this recap.
4. **Fold the decision into the change set** as a normal candidate, now unblocked.
5. **If the decision affects campaign canon** (a retcon, an accepted deviation, a locked-decision override), draft a line for the campaign bible's **Deliberate Exceptions** section and offer to add it — this is what stops the same "contradiction" from being re-flagged by `rpg-campaign-reviewer` or re-litigated by a future recap.

**What counts as done adjudicating:** every conflict has an explicit GM decision attached before the change set is finalized for persistence. A recap with unresolved conflicts is incomplete — hold those items out of the Persist block and list them under Handoffs/open items instead of writing a guess.

## 6. Worked example — a mixed batch

*(Generic, illustrative only — do not reuse verbatim.)*

Account: "We finished the ledger quest, met a new contact named Toma at the docks, and I think Voss might have died — hard to remember, it was chaotic."

- **`[[Follow the Ledger]]` → completed.** Vault shows `available`; account is unambiguous ("we finished"). Clean — no prior contradiction beyond expected progress, joins the batch.
- **Toma** — no vault match. **Missing node.** Ask: stub now or hand off to `rpg-npc-creator` first?
- **Voss's fate** — "might have died... hard to remember" is not a confirmed state change. **Ambiguous outcome.** Ask the GM to check before touching Voss's `status` at all; do not flip it on a hedge.

Only the first item enters the clean batch. The other two are adjudicated before the Persist block is assembled.

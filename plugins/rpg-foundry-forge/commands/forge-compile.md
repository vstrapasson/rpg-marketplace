---
description: Compile a vault sessao/encontro into a playable Foundry session (preflight → plan → approve → build → verify → review).
---

# /forge-compile <note name>

Compile the named `sessao` or `encontro` into Foundry. This hands off to the **`rpg-forge-conductor`** skill — invoke it for `<note name>` and follow its playbook:

0. **Preflight** (`/forge-preflight` checks) — stop on any critical fail.
1. **Resolve** the unit → entity graph (block on broken vault links).
2. **Plan (dry-run)** — show the ordered build plan grouped by concern; **get the user's approval before any write**.
3. **Build** per concern (scenes+lighting → actors+tokens → journals → encounters → ownership), serializing scene writes, updating the build manifest after each step.
4. **Verify** against live Foundry.
5. **Review** — spawn `rpg-foundry-reviewer` and relay findings.

Always confirm before: generating a map (ComfyUI job) and assigning player ownership. Re-running is safe (idempotent via the manifest).

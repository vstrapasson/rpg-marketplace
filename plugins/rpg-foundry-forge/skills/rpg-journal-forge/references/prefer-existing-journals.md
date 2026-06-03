# Prefer existing journals (idempotency)

Before creating any journal, reconcile against what's already in Foundry AND the manifest:

1. **Manifest first.** If the entity's row has a `journalId`/`dashboardId`, it's built → `update-quest-journal` (or skip) instead of creating.
2. **Foundry second.** If the manifest has no row, `search-journals(searchQuery: <title>, searchType: "title")` / `list-journals(filterQuests: true)`. If a journal with that title exists (e.g. created manually or by a prior run that didn't record), adopt its id into the manifest and update — do NOT create a duplicate. This is the crash-safety reconcile: a journal created but not recorded is caught by name here.
3. **Create only when neither has it.**

`update-quest-journal(journalId, newContent, updateType: progress|completion|failure|modification, pageId?, newPageName?)` — use `modification` to refresh content, or add a page with `newPageName`. Updating a `quest`'s status (available→active→completed) maps cleanly to `progress`/`completion`/`failure`.

Always record the resulting id in the manifest via the conductor so the next run is idempotent.

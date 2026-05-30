import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { loadVault } from '../lib/vault.mjs';
import { checkLinks, checkOrphans } from '../lib/checks.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('broken link is detected', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Link Quebrado');
  const codes = checkLinks(note, index).map((i) => i.code);
  assert.ok(codes.includes('broken-link'));
});

test('valid link generates no error', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Malareph');
  assert.deepEqual(checkLinks(note, index), []);
});

test('orphan detection (entity that no one references)', async () => {
  const { notes, index } = await loadVault(VAULT);
  const orphans = checkOrphans(notes, index).map((i) => i.file);
  assert.ok(orphans.some((f) => f.endsWith('O Resgate.md')));
  // Malareph is referenced by O Resgate → not an orphan
  assert.ok(!orphans.some((f) => f.endsWith('Malareph.md')));
});

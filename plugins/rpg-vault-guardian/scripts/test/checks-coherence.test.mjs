import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { loadVault } from '../lib/vault.mjs';
import { checkCoherence } from '../lib/checks.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('wrong target type is detected (faction pointing to a Region)', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Alvo Errado');
  const codes = checkCoherence(note, index).map((i) => i.code);
  assert.ok(codes.includes('wrong-target-type'));
});

test('correct-type relations generate no error', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Malareph');
  assert.deepEqual(checkCoherence(note, index), []);
});

test('broken link does not become a coherence error (checkLinks responsibility)', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Link Quebrado');
  assert.deepEqual(checkCoherence(note, index), []);
});

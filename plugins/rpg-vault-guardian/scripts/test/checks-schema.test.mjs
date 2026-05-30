import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { loadVault } from '../lib/vault.mjs';
import { checkSchema } from '../lib/checks.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

function codesFor(notes, name) {
  const note = notes.find((n) => n.name === name);
  return checkSchema(note).map((i) => i.code);
}

test('valid note generates no schema error', async () => {
  const { notes } = await loadVault(VAULT);
  assert.deepEqual(codesFor(notes, 'Malareph'), []);
});

test('missing required field', async () => {
  const { notes } = await loadVault(VAULT);
  assert.ok(codesFor(notes, 'Sem Papel').includes('missing-required'));
  assert.ok(codesFor(notes, 'Sem Regiao').includes('missing-required'));
});

test('invalid enum value', async () => {
  const { notes } = await loadVault(VAULT);
  assert.ok(codesFor(notes, 'Papel Errado').includes('bad-enum'));
});

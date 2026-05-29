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

test('nota válida não gera erro de schema', async () => {
  const { notes } = await loadVault(VAULT);
  assert.deepEqual(codesFor(notes, 'Malareph'), []);
});

test('campo obrigatório ausente', async () => {
  const { notes } = await loadVault(VAULT);
  assert.ok(codesFor(notes, 'Sem Papel').includes('missing-required'));
  assert.ok(codesFor(notes, 'Sem Regiao').includes('missing-required'));
});

test('valor de enum inválido', async () => {
  const { notes } = await loadVault(VAULT);
  assert.ok(codesFor(notes, 'Papel Errado').includes('bad-enum'));
});

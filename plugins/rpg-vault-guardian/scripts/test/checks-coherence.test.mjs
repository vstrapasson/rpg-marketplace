import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { loadVault } from '../lib/vault.mjs';
import { checkCoherence } from '../lib/checks.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('alvo de tipo errado é detectado (faction apontando p/ uma Região)', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Alvo Errado');
  const codes = checkCoherence(note, index).map((i) => i.code);
  assert.ok(codes.includes('wrong-target-type'));
});

test('relações de tipo certo não geram erro', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Malareph');
  assert.deepEqual(checkCoherence(note, index), []);
});

test('link quebrado não vira erro de coerência (é responsabilidade de checkLinks)', async () => {
  const { notes, index } = await loadVault(VAULT);
  const note = notes.find((n) => n.name === 'Link Quebrado');
  assert.deepEqual(checkCoherence(note, index), []);
});

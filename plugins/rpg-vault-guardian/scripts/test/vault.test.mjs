import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { loadVault, classify } from '../lib/vault.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('classifies entity, non-entity, and ignored', () => {
  assert.equal(classify(VAULT, join(VAULT, 'npcs', 'Malareph.md')).kind, 'entity');
  assert.equal(classify(VAULT, join(VAULT, 'npcs', 'Malareph.md')).type, 'npc');
  assert.equal(classify(VAULT, join(VAULT, 'sessoes', 'transcricoes', 'Sessao 0 - Transcricao.md')).kind, 'non-entity');
  assert.equal(classify(VAULT, join(VAULT, 'Welcome.md')).kind, 'ignore');
});

test('loadVault indexes by name and reads frontmatter', async () => {
  const { notes, index } = await loadVault(VAULT);
  assert.ok(notes.length >= 13);
  const malareph = index.get('Malareph');
  assert.equal(malareph.type, 'npc');
  assert.equal(malareph.frontmatter.role, 'antagonist');
  assert.equal(index.get('Culto do Inverno').kind, 'entity');
});

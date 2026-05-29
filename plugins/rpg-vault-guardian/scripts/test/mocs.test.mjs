import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { readFile, rm } from 'node:fs/promises';
import { loadVault } from '../lib/vault.mjs';
import { generateMocs } from '../lib/mocs.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');
const INDICES = join(VAULT, '_indices');

async function cleanup() {
  await rm(INDICES, { recursive: true, force: true });
}

test('generateMocs cria pasta _indices/ com MOC de NPCs por Facção', async () => {
  await cleanup();
  const { notes } = await loadVault(VAULT);
  await generateMocs(VAULT, notes);
  const content = await readFile(join(INDICES, 'NPCs por Facção.md'), 'utf8');
  assert.match(content, /ARQUIVO GERADO/);
  assert.match(content, /Malareph/);
  await cleanup();
});

test('MOC de Quests por Ato lista O Resgate no Ato 1', async () => {
  const { notes } = await loadVault(VAULT);
  await generateMocs(VAULT, notes);
  const content = await readFile(join(INDICES, 'Quests por Ato.md'), 'utf8');
  assert.match(content, /O Resgate/);
  assert.match(content, /Ato 1/);
  await cleanup();
});

test('MOC de Locais por Região lista Cidade de Pedra em Norte Gelado', async () => {
  const { notes } = await loadVault(VAULT);
  await generateMocs(VAULT, notes);
  const content = await readFile(join(INDICES, 'Locais por Região.md'), 'utf8');
  assert.match(content, /Cidade de Pedra/);
  assert.match(content, /Norte Gelado/);
  await cleanup();
});

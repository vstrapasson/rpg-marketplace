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

test('generateMocs creates _indices/ folder with NPCs by Faction MOC', async () => {
  await cleanup();
  const { notes } = await loadVault(VAULT);
  await generateMocs(VAULT, notes);
  const content = await readFile(join(INDICES, 'NPCs by Faction.md'), 'utf8');
  assert.match(content, /GENERATED FILE/);
  assert.match(content, /Malareph/);
  await cleanup();
});

test('Quests by Act MOC lists O Resgate in Ato 1', async () => {
  const { notes } = await loadVault(VAULT);
  await generateMocs(VAULT, notes);
  const content = await readFile(join(INDICES, 'Quests by Act.md'), 'utf8');
  assert.match(content, /O Resgate/);
  assert.match(content, /Ato 1/);
  await cleanup();
});

test('Locations by Region MOC lists Cidade de Pedra in Norte Gelado', async () => {
  const { notes } = await loadVault(VAULT);
  await generateMocs(VAULT, notes);
  const content = await readFile(join(INDICES, 'Locations by Region.md'), 'utf8');
  assert.match(content, /Cidade de Pedra/);
  assert.match(content, /Norte Gelado/);
  await cleanup();
});

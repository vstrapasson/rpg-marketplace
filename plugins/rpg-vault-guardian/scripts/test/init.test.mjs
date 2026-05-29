import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ENTITIES, NON_ENTITY } from '../schema.mjs';
import { foldersFromSchema, initVault } from '../init.mjs';

test('foldersFromSchema cobre todos os tipos do schema', () => {
  const folders = foldersFromSchema();

  for (const def of Object.values(ENTITIES)) {
    assert.ok(folders.includes(def.folder), `falta pasta de entidade: ${def.folder}`);
  }
  for (const def of Object.values(NON_ENTITY)) {
    assert.ok(folders.includes(def.folder), `falta pasta NON_ENTITY: ${def.folder}`);
  }
  assert.ok(folders.includes('_indices'), 'falta _indices');
  assert.strictEqual(folders.length, 14, `esperado 14 pastas, encontrado ${folders.length}`);
});

test('initVault cria as 14 pastas com .gitkeep', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    const results = await initVault(dir);
    assert.ok(results.every(r => r.created), 'todas devem ser criadas no dir vazio');
    for (const { folder } of results) {
      const entries = await readdir(join(dir, folder));
      assert.ok(entries.includes('.gitkeep'), `falta .gitkeep em ${folder}`);
    }
  } finally {
    await rm(dir, { recursive: true });
  }
});

test('initVault é idempotente', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    await initVault(dir);
    const results2 = await initVault(dir);
    assert.ok(results2.every(r => !r.created), 'segunda execução não deve criar nada');
  } finally {
    await rm(dir, { recursive: true });
  }
});

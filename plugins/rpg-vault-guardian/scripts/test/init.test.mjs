import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ENTITIES, NON_ENTITY } from '../schema.mjs';
import { foldersFromSchema, initVault } from '../init.mjs';

test('foldersFromSchema covers all schema types', () => {
  const folders = foldersFromSchema();

  for (const def of Object.values(ENTITIES)) {
    assert.ok(folders.includes(def.folder), `missing entity folder: ${def.folder}`);
  }
  for (const def of Object.values(NON_ENTITY)) {
    assert.ok(folders.includes(def.folder), `missing NON_ENTITY folder: ${def.folder}`);
  }
  assert.ok(folders.includes('_indices'), 'missing _indices');
  assert.strictEqual(folders.length, 17, `expected 17 folders, found ${folders.length}`);
});

test('initVault creates the 17 folders with .gitkeep', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    const results = await initVault(dir);
    assert.ok(results.every(r => r.created), 'all should be created in empty dir');
    for (const { folder } of results) {
      const entries = await readdir(join(dir, folder));
      assert.ok(entries.includes('.gitkeep'), `missing .gitkeep in ${folder}`);
    }
  } finally {
    await rm(dir, { recursive: true });
  }
});

test('initVault is idempotent', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'rpg-init-'));
  try {
    await initVault(dir);
    const results2 = await initVault(dir);
    assert.ok(results2.every(r => !r.created), 'second run must not create anything');
  } finally {
    await rm(dir, { recursive: true });
  }
});

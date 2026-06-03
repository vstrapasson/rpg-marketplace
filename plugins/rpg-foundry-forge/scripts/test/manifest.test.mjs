import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadManifest, recordBuilt, getBuilt, writeManifest, recordMapJob, pendingMapJobs, slugify } from '../lib/manifest.mjs';

test('manifest round-trips entities + map jobs and merges rows', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'forge-'));
  try {
    const m = await loadManifest(dir, 'Teste World');
    assert.deepEqual(m.entities, {});

    recordBuilt(m, 'local', 'Cripta dos Ossos', { sceneId: 'Scene.abc', source: 'generated' });
    recordBuilt(m, 'inimigo', 'Esqueleto Guardião', { actorId: 'Actor.def', tokenIds: ['T1', 'T2'] });
    recordMapJob(m, 'Cripta dos Ossos', 'job_1', 'pending');
    await writeManifest(dir, 'Teste World', m, '2026-06-02');

    const m2 = await loadManifest(dir, 'Teste World');
    assert.equal(getBuilt(m2, 'local', 'Cripta dos Ossos').sceneId, 'Scene.abc');
    assert.deepEqual(getBuilt(m2, 'inimigo', 'Esqueleto Guardião').tokenIds, ['T1', 'T2']);
    assert.equal(pendingMapJobs(m2).length, 1);

    // merge into existing row, don't clobber
    recordBuilt(m2, 'local', 'Cripta dos Ossos', { lit: true });
    assert.equal(getBuilt(m2, 'local', 'Cripta dos Ossos').sceneId, 'Scene.abc');
    assert.equal(getBuilt(m2, 'local', 'Cripta dos Ossos').lit, true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('slugify makes a safe per-world filename stem', () => {
  assert.equal(slugify('Teste Marketplace'), 'teste-marketplace');
  assert.equal(slugify('  Weird__Name!! '), 'weird-name');
  assert.equal(slugify(''), 'world');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { rm, readFile } from 'node:fs/promises';
import {
  buildFrontmatter, buildNoteContent, validateCandidate, writeEntityFile,
} from '../lib/preserve.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('valid relogio candidate passes the write gate', async () => {
  const fm = buildFrontmatter('relogio', { segments: 6, filled: 2, status: 'ticking' });
  const content = buildNoteContent(fm, 'Ritual do Inverno');
  const report = await validateCandidate('Ritual do Inverno', content, 'relogio', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('relogio without segments is rejected (required field)', async () => {
  const fm = buildFrontmatter('relogio', { status: 'ticking' });
  const content = buildNoteContent(fm, 'Sem Segmentos');
  const report = await validateCandidate('Sem Segmentos', content, 'relogio', VAULT);
  assert.ok(report.issues.some((i) => i.code === 'missing-required' && i.field === 'segments'));
});

test('frente with a faccao relation to an existing faction is coherent', async () => {
  // "Culto do Inverno" is an existing faccao fixture
  const fm = buildFrontmatter('frente', { status: 'active', faction: '[[Culto do Inverno]]' });
  const content = buildNoteContent(fm, 'Maquinacao do Culto');
  const report = await validateCandidate('Maquinacao do Culto', content, 'frente', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('frente pointing its faction relation at a non-faccao is incoherent', async () => {
  // "Lich" is an inimigo, not a faccao -> wrong-target coherence error
  const fm = buildFrontmatter('frente', { status: 'active', faction: '[[Lich]]' });
  const content = buildNoteContent(fm, 'Frente Errada');
  const report = await validateCandidate('Frente Errada', content, 'frente', VAULT);
  assert.ok(report.issues.some((i) => i.code === 'wrong-target-type'));
});

test('encontro with a bad threat enum is rejected', async () => {
  const fm = buildFrontmatter('encontro', { threat: 'apocalyptic', party_level: 3 });
  const content = buildNoteContent(fm, 'Ameaca Invalida');
  const report = await validateCandidate('Ameaca Invalida', content, 'encontro', VAULT);
  assert.ok(report.issues.some((i) => i.code === 'bad-enum'));
});

test('advancing a clock overwrites the relogio note (edit path)', async () => {
  const tmpVault = join(tmpdir(), 'rpg-gm-clock-' + Date.now());
  try {
    const c1 = buildNoteContent(buildFrontmatter('relogio', { segments: 6, filled: 2 }), 'Doom');
    const p = await writeEntityFile('relogio', 'Doom', c1, tmpVault);
    const c2 = buildNoteContent(buildFrontmatter('relogio', { segments: 6, filled: 3 }), 'Doom');
    await writeEntityFile('relogio', 'Doom', c2, tmpVault);
    const written = await readFile(p, 'utf8');
    assert.match(written, /filled: 3/);
  } finally {
    await rm(tmpVault, { recursive: true });
  }
});

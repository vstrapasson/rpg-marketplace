import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { rm, readFile } from 'node:fs/promises';
import {
  buildFrontmatter, serializeFrontmatter, buildNoteContent,
  targetPath, validateCandidate, writeEntityFile,
} from '../lib/preserve.mjs';
import { parseFlatYaml } from '../lib/yaml.mjs';

const VAULT = join(import.meta.dirname, 'fixtures', 'vault');

test('buildFrontmatter includes type, provided field, and updated', () => {
  const fm = buildFrontmatter('npc', { role: 'ally', status: 'stub' });
  assert.equal(fm.type, 'npc');
  assert.equal(fm.role, 'ally');
  assert.ok(fm.updated); // stamped with today's date
});

test('serializeFrontmatter round-trips via parseFlatYaml', () => {
  const fm = { type: 'npc', role: 'ally', faction: '[[Culto do Inverno]]', number: 3 };
  const yaml = serializeFrontmatter(fm);
  // extract the block between ---
  const inner = yaml.replace(/^---\n/, '').replace(/\n---\n$/, '');
  const parsed = parseFlatYaml(inner);
  assert.equal(parsed.type, 'npc');
  assert.equal(parsed.role, 'ally');
  assert.equal(parsed.faction, '[[Culto do Inverno]]');
  assert.equal(parsed.number, 3);
});

test('targetPath builds the correct path for each type', () => {
  assert.ok(targetPath('npc', 'Gandalf', '/vault').endsWith('npcs/Gandalf.md'));
  assert.ok(targetPath('regiao', 'Norte', '/vault').endsWith('regioes/Norte.md'));
  assert.ok(targetPath('faccao', 'Culto', '/vault').endsWith('faccoes/Culto.md'));
});

test('validateCandidate approves valid entity (regiao with no required relations)', async () => {
  const fm = buildFrontmatter('regiao', { status: 'stub' });
  const content = buildNoteContent(fm, 'New Region');
  const report = await validateCandidate('New Region', content, 'regiao', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('validateCandidate rejects npc without role (required field)', async () => {
  const fm = buildFrontmatter('npc', { status: 'stub' }); // no role
  const content = buildNoteContent(fm, 'Sem Role');
  const report = await validateCandidate('Sem Role', content, 'npc', VAULT);
  assert.ok(report.summary.errors > 0);
  assert.ok(report.issues.some((i) => i.code === 'missing-required' && i.field === 'role'));
});

test('validateCandidate approves a valid desafio (VP challenge)', async () => {
  const fm = buildFrontmatter('desafio', {
    subsystem: 'influence', vp_format: 'accumulating', scale: 'long',
    vp_target: 7, party_level: 3, faction: '[[Culto do Inverno]]', status: 'draft',
  });
  const content = buildNoteContent(fm, 'Audiência no Conselho');
  const report = await validateCandidate('Audiência no Conselho', content, 'desafio', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('validateCandidate rejects a desafio with a bad subsystem enum', async () => {
  const fm = buildFrontmatter('desafio', { subsystem: 'persuasion', scale: 'long', status: 'draft' });
  const content = buildNoteContent(fm, 'Enum Errado');
  const report = await validateCandidate('Enum Errado', content, 'desafio', VAULT);
  assert.ok(report.summary.errors > 0);
  assert.ok(report.issues.some((i) => i.code === 'bad-enum' && i.field === 'subsystem'));
});

test('validateCandidate flags a desafio whose faction points at the wrong type', async () => {
  // Lich is an inimigo, not a faccao
  const fm = buildFrontmatter('desafio', { subsystem: 'influence', faction: '[[Lich]]', status: 'draft' });
  const content = buildNoteContent(fm, 'Alvo Errado Desafio');
  const report = await validateCandidate('Alvo Errado Desafio', content, 'desafio', VAULT);
  assert.ok(report.issues.some((i) => i.code === 'wrong-target-type' && i.field === 'faction'));
});

test('validateCandidate approves a valid jogador (PC with faction, location, region)', async () => {
  const fm = buildFrontmatter('jogador', {
    player: 'Ana', faction: '[[Culto do Inverno]]',
    location: '[[Cidade de Pedra]]', region: '[[Norte Gelado]]', status: 'active',
  });
  const content = buildNoteContent(fm, 'Thessaly');
  const report = await validateCandidate('Thessaly', content, 'jogador', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('validateCandidate rejects a jogador missing the required player field', async () => {
  const fm = buildFrontmatter('jogador', { location: '[[Cidade de Pedra]]', status: 'stub' });
  const content = buildNoteContent(fm, 'Sem Player');
  const report = await validateCandidate('Sem Player', content, 'jogador', VAULT);
  assert.ok(report.summary.errors > 0);
  assert.ok(report.issues.some((i) => i.code === 'missing-required' && i.field === 'player'));
});

test('validateCandidate flags a jogador whose region points at the wrong type', async () => {
  // Lich is an inimigo, not a regiao — only catchable now that region is a declared relation
  const fm = buildFrontmatter('jogador', { player: 'Bea', region: '[[Lich]]', status: 'draft' });
  const content = buildNoteContent(fm, 'Regiao Errada');
  const report = await validateCandidate('Regiao Errada', content, 'jogador', VAULT);
  assert.ok(report.issues.some((i) => i.code === 'wrong-target-type' && i.field === 'region'));
});

test('writeEntityFile creates file at the correct path', async () => {
  const tmpVault = join(tmpdir(), 'rpg-preserve-test-' + Date.now());
  const fm = buildFrontmatter('regiao', { status: 'stub' });
  const content = buildNoteContent(fm, 'Temp');
  const filePath = await writeEntityFile('regiao', 'Temp', content, tmpVault);
  const written = await readFile(filePath, 'utf8');
  assert.equal(written, content);
  await rm(tmpVault, { recursive: true });
});

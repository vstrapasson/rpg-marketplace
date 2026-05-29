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

test('buildFrontmatter inclui type, campo fornecido e updated', () => {
  const fm = buildFrontmatter('npc', { role: 'ally', status: 'stub' });
  assert.equal(fm.type, 'npc');
  assert.equal(fm.role, 'ally');
  assert.ok(fm.updated); // carimbado com data de hoje
});

test('serializeFrontmatter round-trips via parseFlatYaml', () => {
  const fm = { type: 'npc', role: 'ally', faction: '[[Culto do Inverno]]', number: 3 };
  const yaml = serializeFrontmatter(fm);
  // extrai o bloco entre os ---
  const inner = yaml.replace(/^---\n/, '').replace(/\n---\n$/, '');
  const parsed = parseFlatYaml(inner);
  assert.equal(parsed.type, 'npc');
  assert.equal(parsed.role, 'ally');
  assert.equal(parsed.faction, '[[Culto do Inverno]]');
  assert.equal(parsed.number, 3);
});

test('targetPath monta caminho correto para cada tipo', () => {
  assert.ok(targetPath('npc', 'Gandalf', '/vault').endsWith('npcs/Gandalf.md'));
  assert.ok(targetPath('regiao', 'Norte', '/vault').endsWith('regioes/Norte.md'));
  assert.ok(targetPath('faccao', 'Culto', '/vault').endsWith('faccoes/Culto.md'));
});

test('validateCandidate aprova entidade válida (regiao sem relações obrigatórias)', async () => {
  const fm = buildFrontmatter('regiao', { status: 'stub' });
  const content = buildNoteContent(fm, 'Nova Região');
  const report = await validateCandidate('Nova Região', content, 'regiao', VAULT);
  assert.equal(report.summary.errors, 0);
});

test('validateCandidate rejeita npc sem role (campo obrigatório)', async () => {
  const fm = buildFrontmatter('npc', { status: 'stub' }); // sem role
  const content = buildNoteContent(fm, 'Sem Role');
  const report = await validateCandidate('Sem Role', content, 'npc', VAULT);
  assert.ok(report.summary.errors > 0);
  assert.ok(report.issues.some((i) => i.code === 'missing-required' && i.field === 'role'));
});

test('writeEntityFile cria arquivo no caminho correto', async () => {
  const tmpVault = join(tmpdir(), 'rpg-preserve-test-' + Date.now());
  const fm = buildFrontmatter('regiao', { status: 'stub' });
  const content = buildNoteContent(fm, 'Temp');
  const filePath = await writeEntityFile('regiao', 'Temp', content, tmpVault);
  const written = await readFile(filePath, 'utf8');
  assert.equal(written, content);
  await rm(tmpVault, { recursive: true });
});

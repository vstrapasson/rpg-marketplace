import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFlatYaml } from '../lib/yaml.mjs';

test('escalares: string, número, booleano', () => {
  const r = parseFlatYaml('type: npc\nnumber: 3\ndone: true');
  assert.equal(r.type, 'npc');
  assert.equal(r.number, 3);
  assert.equal(r.done, true);
});

test('string entre aspas com wikilink é preservada', () => {
  const r = parseFlatYaml('faction: "[[Culto do Inverno]]"');
  assert.equal(r.faction, '[[Culto do Inverno]]');
});

test('data fica como string', () => {
  const r = parseFlatYaml('date: 2026-05-28');
  assert.equal(r.date, '2026-05-28');
});

test('lista em bloco', () => {
  const r = parseFlatYaml('aliases:\n  - Necromante\n  - Malareph');
  assert.deepEqual(r.aliases, ['Necromante', 'Malareph']);
});

test('lista inline', () => {
  const r = parseFlatYaml('tags: [vilao, ato-1]');
  assert.deepEqual(r.tags, ['vilao', 'ato-1']);
});

test('comentário e linha em branco são ignorados', () => {
  const r = parseFlatYaml('type: npc  # um comentário\n\nrole: ally');
  assert.equal(r.type, 'npc');
  assert.equal(r.role, 'ally');
});

test('chave sem valor com lista vazia vira array vazio', () => {
  const r = parseFlatYaml('tags:\nrole: ally');
  assert.deepEqual(r.tags, []);
  assert.equal(r.role, 'ally');
});

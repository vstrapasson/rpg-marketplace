import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFlatYaml } from '../lib/yaml.mjs';

test('scalars: string, number, boolean', () => {
  const r = parseFlatYaml('type: npc\nnumber: 3\ndone: true');
  assert.equal(r.type, 'npc');
  assert.equal(r.number, 3);
  assert.equal(r.done, true);
});

test('quoted string with wikilink is preserved', () => {
  const r = parseFlatYaml('faction: "[[Culto do Inverno]]"');
  assert.equal(r.faction, '[[Culto do Inverno]]');
});

test('date stays as string', () => {
  const r = parseFlatYaml('date: 2026-05-28');
  assert.equal(r.date, '2026-05-28');
});

test('block list', () => {
  const r = parseFlatYaml('aliases:\n  - Necromante\n  - Malareph');
  assert.deepEqual(r.aliases, ['Necromante', 'Malareph']);
});

test('inline list', () => {
  const r = parseFlatYaml('tags: [vilao, ato-1]');
  assert.deepEqual(r.tags, ['vilao', 'ato-1']);
});

test('comment and blank line are ignored', () => {
  const r = parseFlatYaml('type: npc  # a comment\n\nrole: ally');
  assert.equal(r.type, 'npc');
  assert.equal(r.role, 'ally');
});

test('key with no value and empty list becomes empty array', () => {
  const r = parseFlatYaml('tags:\nrole: ally');
  assert.deepEqual(r.tags, []);
  assert.equal(r.role, 'ally');
});

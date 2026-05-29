import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractFrontmatter, extractWikilinks, normalizeLinkTarget } from '../lib/frontmatter.mjs';

test('extrai frontmatter e corpo', () => {
  const { frontmatter, body, hasFrontmatter } = extractFrontmatter('---\ntype: npc\n---\n# Título\ntexto');
  assert.equal(hasFrontmatter, true);
  assert.equal(frontmatter.type, 'npc');
  assert.equal(body.trim(), '# Título\ntexto');
});

test('nota sem frontmatter', () => {
  const { frontmatter, hasFrontmatter } = extractFrontmatter('# Só corpo');
  assert.equal(hasFrontmatter, false);
  assert.deepEqual(frontmatter, {});
});

test('normaliza alvo: alias, heading e caminho', () => {
  assert.equal(normalizeLinkTarget('Nota|apelido'), 'Nota');
  assert.equal(normalizeLinkTarget('Nota#secao'), 'Nota');
  assert.equal(normalizeLinkTarget('pasta/Nota'), 'Nota');
});

test('extrai wikilinks de string e de lista', () => {
  assert.deepEqual(extractWikilinks('"[[Culto do Inverno]]"'), ['Culto do Inverno']);
  assert.deepEqual(extractWikilinks(['[[A]]', '[[B|b]]']), ['A', 'B']);
  assert.deepEqual(extractWikilinks(undefined), []);
});

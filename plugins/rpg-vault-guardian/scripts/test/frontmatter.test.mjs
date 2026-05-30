import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractFrontmatter, extractWikilinks, normalizeLinkTarget } from '../lib/frontmatter.mjs';

test('extracts frontmatter and body', () => {
  const { frontmatter, body, hasFrontmatter } = extractFrontmatter('---\ntype: npc\n---\n# Title\nbody');
  assert.equal(hasFrontmatter, true);
  assert.equal(frontmatter.type, 'npc');
  assert.equal(body.trim(), '# Title\nbody');
});

test('note without frontmatter', () => {
  const { frontmatter, hasFrontmatter } = extractFrontmatter('# Just body');
  assert.equal(hasFrontmatter, false);
  assert.deepEqual(frontmatter, {});
});

test('normalizes target: alias, heading, and path', () => {
  assert.equal(normalizeLinkTarget('Nota|apelido'), 'Nota');
  assert.equal(normalizeLinkTarget('Nota#secao'), 'Nota');
  assert.equal(normalizeLinkTarget('pasta/Nota'), 'Nota');
});

test('extracts wikilinks from string and list', () => {
  assert.deepEqual(extractWikilinks('"[[Culto do Inverno]]"'), ['Culto do Inverno']);
  assert.deepEqual(extractWikilinks(['[[A]]', '[[B|b]]']), ['A', 'B']);
  assert.deepEqual(extractWikilinks(undefined), []);
});

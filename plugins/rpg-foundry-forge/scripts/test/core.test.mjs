import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadVault } from '../lib/vault-read.mjs';
import { resolveSessao, resolveEncontro, resolveUnit } from '../lib/resolve.mjs';
import { planBuild } from '../lib/build-plan.mjs';
import { dispositionFor, wallEnumDefaults, placementGrid, lightingForMood, suggestMood, journalFolder } from '../lib/foundry-args.mjs';

const VAULT = fileURLToPath(new URL('./fixtures/vault', import.meta.url));

test('loadVault indexes notes and keeps body', async () => {
  const { index } = await loadVault(VAULT);
  assert.equal(index.size, 13);
  const cripta = index.get('Cripta dos Ossos');
  assert.equal(cripta.type, 'local');
  assert.match(cripta.body, /cripta inundada/i);
  assert.equal(index.get('Esqueleto Guardião').type, 'inimigo');
});

test('resolveEncontro buckets scene/actor/item, no missing', async () => {
  const { index } = await loadVault(VAULT);
  const g = resolveEncontro(index, 'Emboscada na Cripta');
  assert.deepEqual(g.missing, []);
  assert.deepEqual(g.concerns.scenes.map((n) => n.name), ['Cripta dos Ossos']);
  assert.ok(g.concerns.actors.some((n) => n.name === 'Esqueleto Guardião'));
  assert.ok(g.concerns.items.some((n) => n.name === 'Amuleto Sussurrante'));
});

test('resolveSessao pulls quest, players, encounter creatures + scene', async () => {
  const { index } = await loadVault(VAULT);
  const g = resolveSessao(index, 'Sessão 1');
  assert.deepEqual(g.missing, []);
  assert.ok(g.byType.quest.some((n) => n.name === 'O Porto Sussurrante'));
  assert.ok(g.concerns.ownership.some((n) => n.name === 'Kael'));
  // encounter pulled via reverse session edge → its creature + location surface
  assert.ok(g.concerns.actors.some((n) => n.name === 'Esqueleto Guardião'));
  assert.ok(g.concerns.scenes.some((n) => n.name === 'Cripta dos Ossos'));
  // npc with statblock is also an actor; ally without statblock is journal-only
  assert.ok(g.concerns.actors.some((n) => n.name === 'Malareph'));
  assert.ok(g.concerns.journals.some((n) => n.name === 'Rendara'));
  assert.ok(!g.concerns.actors.some((n) => n.name === 'Rendara'));
  // tactical (encounter location) vs narrative (story-only) locals
  assert.ok(g.tacticalLocals.some((n) => n.name === 'Cripta dos Ossos'));
  assert.ok(g.narrativeLocals.some((n) => n.name === 'Capela Submersa'));
  assert.ok(!g.tacticalLocals.some((n) => n.name === 'Capela Submersa'));
});

test('planBuild routes tactical→scene, narrative→journal handout, folders by convention', async () => {
  const { index } = await loadVault(VAULT);
  const g = resolveSessao(index, 'Sessão 1');
  const plan = planBuild(g, { entities: {} });
  assert.ok(plan.steps.some((s) => s.id === 'scene:Cripta dos Ossos'), 'tactical local → scene');
  const handout = plan.steps.find((s) => s.id === 'journal:local:Capela Submersa');
  assert.ok(handout && handout.concern === 'journal', 'narrative local → journal handout');
  assert.equal(handout.args.folderName, 'Locations');
  assert.ok(!plan.steps.some((s) => s.id === 'scene:Capela Submersa'), 'narrative local is not a generated scene');
  // hybrid folder convention: quest by act, faction by type
  assert.equal(plan.steps.find((s) => s.id === 'journal:quest:O Porto Sussurrante').args.folderName, 'Ato I');
  assert.equal(plan.steps.find((s) => s.id === 'journal:faccao:Tidewardens').args.folderName, 'Factions');
});

test('resolveUnit dispatches and flags missing for unknown', async () => {
  const { index } = await loadVault(VAULT);
  assert.equal(resolveUnit(index, 'Sessão 1').unit.type, 'sessao');
  assert.equal(resolveUnit(index, 'Emboscada na Cripta').unit.type, 'encontro');
  assert.ok(resolveUnit(index, 'No Such Note').missing.length >= 1);
});

test('planBuild orders steps, sets disposition + serializeGroup, is idempotent', async () => {
  const { index } = await loadVault(VAULT);
  const g = resolveEncontro(index, 'Emboscada na Cripta');
  const plan = planBuild(g, { entities: {} });
  const scene = plan.steps.find((s) => s.concern === 'scene');
  const actor = plan.steps.find((s) => s.entity.name === 'Esqueleto Guardião');
  assert.ok(scene && scene.entity.name === 'Cripta dos Ossos');
  assert.equal(actor.args.disposition.value, -1);
  assert.equal(actor.serializeGroup, 'scene:Cripta dos Ossos');
  assert.ok(plan.steps.indexOf(scene) < plan.steps.indexOf(actor), 'scene before its actor');

  // idempotency: a built scene is skipped, not re-created
  const m = { entities: { local: { 'Cripta dos Ossos': { sceneId: 'Scene.x' } } } };
  const plan2 = planBuild(g, m);
  assert.ok(!plan2.steps.some((s) => s.id === 'scene:Cripta dos Ossos'));
  assert.ok(plan2.skipped.some((s) => s.id === 'scene:Cripta dos Ossos'));
});

test('foundry-args: disposition, enums, placement offset, lighting', () => {
  assert.equal(dispositionFor({ type: 'inimigo' }).value, -1);
  assert.equal(dispositionFor({ type: 'npc', frontmatter: { role: 'antagonist' } }).value, -1);
  assert.equal(dispositionFor({ type: 'npc', frontmatter: { role: 'ally' } }).value, 1);
  assert.equal(dispositionFor({ type: 'jogador' }).value, 1);
  assert.equal(wallEnumDefaults().move, 20);
  assert.equal(wallEnumDefaults().sight, 20);
  const p = placementGrid({ sceneX: 420, sceneY: 420, sceneWidth: 1536, sceneHeight: 1536, size: 70 }, 3);
  assert.equal(p.coordinates.length, 3);
  assert.ok(p.coordinates[0].x > 420, 'placement includes the scene padding offset');
  assert.equal(lightingForMood('dark').globalLight, false);
  assert.equal(lightingForMood('bright').globalLight, true);
  assert.equal(suggestMood(5, 'cripta'), 'pitch');
  // journal folder convention (hybrid: quest by act, rest by type)
  assert.equal(journalFolder({ type: 'faccao' }), 'Factions');
  assert.equal(journalFolder({ type: 'quest', frontmatter: { act: '[[Ato II]]' } }), 'Ato II');
  assert.equal(journalFolder({ type: 'local' }), 'Locations');
  assert.equal(journalFolder({ type: 'ato' }), undefined);
});

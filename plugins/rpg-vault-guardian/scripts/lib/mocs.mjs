import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { extractWikilinks } from './frontmatter.mjs';

const HEADER = '> ⚠️ **ARQUIVO GERADO — NÃO EDITE.** Regenerado automaticamente pelo rpg-audit.\n\n';

function groupBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }
  return map;
}

function formatGroups(groups) {
  const sorted = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, 'pt-BR'));
  const lines = [];
  for (const [heading, items] of sorted) {
    lines.push(`## ${heading}`);
    for (const item of items.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))) {
      lines.push(`- [[${item.name}]]`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

async function writeMoc(dir, filename, title, body) {
  await writeFile(join(dir, filename), `${HEADER}# ${title}\n\n${body}`, 'utf8');
}

export async function generateMocs(vaultDir, notes) {
  const indicesDir = join(vaultDir, '_indices');
  await mkdir(indicesDir, { recursive: true });
  const entities = notes.filter((n) => n.kind === 'entity');

  // NPCs por Facção
  const npcs = entities.filter((n) => n.type === 'npc');
  const npcByFaction = groupBy(npcs, (n) => {
    const links = extractWikilinks(n.frontmatter.faction);
    return links.length > 0 ? links[0] : 'Sem facção';
  });
  await writeMoc(indicesDir, 'NPCs por Facção.md', 'NPCs por Facção', formatGroups(npcByFaction));

  // Quests por Ato
  const quests = entities.filter((n) => n.type === 'quest');
  const questByAct = groupBy(quests, (n) => {
    const links = extractWikilinks(n.frontmatter.act);
    return links.length > 0 ? links[0] : 'Sem ato';
  });
  await writeMoc(indicesDir, 'Quests por Ato.md', 'Quests por Ato', formatGroups(questByAct));

  // Locais por Região
  const locais = entities.filter((n) => n.type === 'local');
  const localByRegiao = groupBy(locais, (n) => {
    const links = extractWikilinks(n.frontmatter.region);
    return links.length > 0 ? links[0] : 'Sem região';
  });
  await writeMoc(indicesDir, 'Locais por Região.md', 'Locais por Região', formatGroups(localByRegiao));
}

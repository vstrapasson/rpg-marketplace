import { parseFlatYaml } from './yaml.mjs';

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;
const WIKILINK_RE = /\[\[([^\]]+)\]\]/g;

export function extractFrontmatter(content) {
  const m = content.match(FM_RE);
  if (!m) return { frontmatter: {}, body: content, hasFrontmatter: false };
  return { frontmatter: parseFlatYaml(m[1]), body: content.slice(m[0].length), hasFrontmatter: true };
}

export function normalizeLinkTarget(raw) {
  let t = raw.split('|')[0].split('#')[0].trim();
  const slash = t.lastIndexOf('/');
  if (slash !== -1) t = t.slice(slash + 1);
  return t;
}

export function extractWikilinks(value) {
  const links = [];
  const scan = (s) => {
    if (typeof s !== 'string') return;
    WIKILINK_RE.lastIndex = 0;
    let m;
    while ((m = WIKILINK_RE.exec(s)) !== null) links.push(normalizeLinkTarget(m[1]));
  };
  if (Array.isArray(value)) value.forEach(scan);
  else scan(value);
  return links;
}

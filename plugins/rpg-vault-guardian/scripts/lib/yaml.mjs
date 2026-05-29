export function parseFlatYaml(text) {
  const out = {};
  const lines = text.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = stripComment(lines[i]);
    i++;
    if (line.trim() === '') continue;
    if (/^\s/.test(line) || line.startsWith('-')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const rest = line.slice(idx + 1).trim();
    if (rest === '') {
      const items = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(parseScalar(stripComment(lines[i]).trim().replace(/^-\s+/, '')));
        i++;
      }
      out[key] = items;
    } else if (rest.startsWith('[') && rest.endsWith(']')) {
      out[key] = rest.slice(1, -1).split(',').map((s) => parseScalar(s.trim())).filter((s) => s !== '');
    } else {
      out[key] = parseScalar(rest);
    }
  }
  return out;
}

function stripComment(line) {
  let inSingle = false, inDouble = false;
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === '#' && !inSingle && !inDouble && (j === 0 || /\s/.test(line[j - 1]))) {
      return line.slice(0, j);
    }
  }
  return line;
}

function parseScalar(s) {
  if (s === '') return '';
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null' || s === '~') return null;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
  return s;
}

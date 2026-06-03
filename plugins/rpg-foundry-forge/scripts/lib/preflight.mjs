// Dependency preflight — the script-checkable half of the matrix. The MCP-side
// checks (Foundry module connected, compendium packs present, imagePath/geometry
// tools present) are done by the CONDUCTOR calling MCP tools; see
// references/preflight-checks.md. This script checks: the vault loads, the chosen
// compile unit resolves with no missing links (CRITICAL), and whether ComfyUI is
// reachable (OPTIONAL — needed only for map/token-art generation).

import http from 'node:http';
import { access } from 'node:fs/promises';
import { loadVault } from './vault-read.mjs';
import { resolveUnit } from './resolve.mjs';

function probe(port, path, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const req = http.get({ host: '127.0.0.1', port, path, timeout: timeoutMs }, (res) => {
      res.resume();
      resolve({ ok: res.statusCode >= 200 && res.statusCode < 500, status: res.statusCode });
    });
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'timeout' }); });
    req.on('error', (e) => resolve({ ok: false, error: e.code || e.message }));
  });
}

export async function checkComfyUI(port = 8000) {
  const r = await probe(port, '/system_stats');
  return {
    check: 'comfyui',
    status: r.ok ? 'ok' : 'warn',
    critical: false,
    detail: r.ok ? `reachable on :${port}` : `not reachable on :${port} (${r.error || r.status}) — map/token-art generation disabled`,
  };
}

export async function checkVault(vaultDir, unitName) {
  const out = [];
  let index;
  try {
    ({ index } = await loadVault(vaultDir));
    out.push({ check: 'vault', status: 'ok', critical: true, detail: `${index.size} notes indexed at ${vaultDir}` });
  } catch (e) {
    out.push({ check: 'vault', status: 'fail', critical: true, detail: `cannot read vault at ${vaultDir}: ${e.message}` });
    return { checks: out, graph: null };
  }
  if (!unitName) {
    out.push({ check: 'unit', status: 'warn', critical: false, detail: 'no compile unit given (pass a sessao/encontro note name)' });
    return { checks: out, graph: null };
  }
  const graph = resolveUnit(index, unitName);
  if (!graph.root) {
    out.push({ check: 'unit', status: 'fail', critical: true, detail: `unit "${unitName}" not found in vault` });
  } else if (graph.unsupported) {
    out.push({ check: 'unit', status: 'fail', critical: true, detail: `unit "${unitName}" is type "${graph.unit.type}" — only sessao/encontro are supported in v0.1` });
  } else if ((graph.missing || []).length) {
    const list = graph.missing.map((m) => `${m.from}.${m.field} → [[${m.name}]]`).join('; ');
    out.push({ check: 'unit-links', status: 'fail', critical: true, detail: `${graph.missing.length} broken link(s) — fix in the vault first: ${list}` });
  } else {
    const c = graph.concerns;
    out.push({ check: 'unit-resolves', status: 'ok', critical: true, detail: `${graph.unit.type} "${unitName}" → scenes:${c.scenes.length} actors:${c.actors.length} journals:${c.journals.length} items:${c.items.length} ownership:${c.ownership.length}` });
  }
  return { checks: out, graph };
}

export async function pathExists(p) {
  try { await access(p); return true; } catch { return false; }
}

// Run the script-side preflight and aggregate a go/no-go on CRITICAL checks.
export async function runLocalPreflight(vaultDir, unitName, opts = {}) {
  const { checks: vaultChecks } = await checkVault(vaultDir, unitName);
  const comfy = await checkComfyUI(opts.comfyPort || 8000);
  const checks = [...vaultChecks, comfy];
  const criticalFails = checks.filter((c) => c.critical && c.status === 'fail');
  return { checks, ok: criticalFails.length === 0, criticalFails };
}

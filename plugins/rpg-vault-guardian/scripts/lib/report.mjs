export function buildReport(issues) {
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const byFamily = {};
  for (const i of issues) (byFamily[i.family] ??= []).push(i);
  return {
    summary: { total: issues.length, errors: errors.length, warnings: warnings.length },
    byFamily,
    issues,
  };
}

export function formatHuman(report) {
  const { errors, warnings, total } = report.summary;
  const lines = [`Integridade do vault: ${errors} erro(s), ${warnings} aviso(s), ${total} no total.`];
  for (const i of report.issues) {
    const tag = i.severity === 'error' ? 'ERRO ' : 'AVISO';
    lines.push(`  [${tag}] ${i.file} — (${i.family}) ${i.message}`);
  }
  return lines.join('\n');
}

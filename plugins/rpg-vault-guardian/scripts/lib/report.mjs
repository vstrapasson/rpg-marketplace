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
  const lines = [`Vault integrity: ${errors} error(s), ${warnings} warning(s), ${total} total.`];
  for (const i of report.issues) {
    const tag = i.severity === 'error' ? 'ERROR' : 'WARNING';
    lines.push(`  [${tag}] ${i.file} — (${i.family}) ${i.message}`);
  }
  return lines.join('\n');
}

import { ENTITIES, COMMON_FIELDS, NON_ENTITY } from '../schema.mjs';

export function folderForType(type) {
  return ENTITIES[type]?.folder ?? NON_ENTITY[type]?.folder ?? null;
}

export function typeForFolder(folder) {
  for (const [type, def] of Object.entries(ENTITIES)) if (def.folder === folder) return type;
  return null;
}

export function fieldDef(type, field) {
  return ENTITIES[type]?.fields?.[field] ?? COMMON_FIELDS[field] ?? null;
}

export function requiredFields(type) {
  return ENTITIES[type]?.required ?? [];
}

export function relationsFor(type) {
  return ENTITIES[type]?.relations ?? {};
}

export function isEntityType(type) {
  return Boolean(ENTITIES[type]);
}

export function checkSchemaIntegrity() {
  const issues = [];
  const known = new Set([...Object.keys(ENTITIES), ...Object.keys(NON_ENTITY), '*']);
  for (const [type, def] of Object.entries(ENTITIES)) {
    for (const [field, rel] of Object.entries(def.relations ?? {})) {
      const targets = Array.isArray(rel.target) ? rel.target : [rel.target];
      for (const t of targets) {
        if (!known.has(t)) issues.push(`Type '${type}', relation '${field}': unknown target '${t}'`);
      }
    }
    for (const [field, fd] of Object.entries(def.fields ?? {})) {
      if (fd.type === 'enum' && !Array.isArray(fd.values)) {
        issues.push(`Type '${type}', field '${field}': enum missing 'values'`);
      }
    }
  }
  return issues;
}

// One searchable catalog, built from the existing complete per-pack catalogs.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { writeFile, rename } from 'node:fs/promises';
import { join, resolve } from 'node:path';

export async function buildCatalog(assetRoot) {
  const root=resolve(assetRoot);
  const assets=[];
  for (const entry of readdirSync(root,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const catalog=join(root,entry.name,'catalog.json');
    if (!existsSync(catalog)) continue;
    const pack=JSON.parse(readFileSync(catalog,'utf8'));
    if (![1,2].includes(pack.version) || !Array.isArray(pack.assets)) throw new Error(`Invalid pack catalog: ${catalog}`);
    for (const asset of pack.assets) {
      for (const key of ['model','thumbnail','descriptor']) {
        if (!safePath(asset[key]) || !existsSync(join(root,entry.name,asset[key]))) throw new Error(`Incomplete catalog entry: ${entry.name}/${asset.id} ${key}`);
      }
      assets.push({
        id:`${entry.name}/${asset.id}`,pack:entry.name,label:asset.label,description:asset.description,
        license:asset.license,model:`${entry.name}/${asset.model}`,thumbnail:`${entry.name}/${asset.thumbnail}`,
        descriptor:`${entry.name}/${asset.descriptor}`,source:asset.source,
        ...Object.fromEntries(Object.entries(asset).filter(([key])=>["category","tags","colors","colorNames","format","geometry","bounds","compatibility","validation"].includes(key))),
      });
    }
  }
  const ids=new Set(assets.map(asset=>asset.id));
  if (ids.size!==assets.length) throw new Error('Duplicate asset identity in catalogs');
  const catalog={version:2,generatedAt:new Date().toISOString(),assets};
  const target=join(root,'catalog.json');
  await writeFile(`${target}.tmp`,JSON.stringify(catalog,null,2)+'\n');
  await rename(`${target}.tmp`,target);
  return catalog;
}
export function safePath(value) {
  return typeof value==='string' && value.length>0 && !value.includes('\\') && !value.includes(':') && value.split('/').every(part=>part!=='' && part!=='.' && part!=='..');
}

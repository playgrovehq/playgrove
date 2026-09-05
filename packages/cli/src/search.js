// Text search over the local or published asset catalog. No model downloads.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { safePath } from './catalog.js';

const localCatalog=fileURLToPath(new URL('../../../asset/catalog.json',import.meta.url));
export const publicCatalog='https://raw.githubusercontent.com/playgrovehq/playgrove/main/asset/catalog.json';
const defaultCatalog=existsSync(localCatalog)?localCatalog:publicCatalog;
const creators=['kenney','quaternius','poly-haven','playgrove'];
const types=['model','texture','hdri'];
const words=value=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

export async function searchAssets(query,{catalog=defaultCatalog,pack,source,type,limit=10,offset=0}={}) {
  if (!Number.isInteger(limit) || limit<1 || limit>100) throw new Error('--limit must be an integer from 1 to 100');
  if (!Number.isInteger(offset) || offset<0) throw new Error('--offset must be a nonnegative integer');
  if (source && !creators.includes(source)) throw new Error('--source must be kenney, quaternius, poly-haven or playgrove');
  if (type && !types.includes(type)) throw new Error('--type must be model, texture or hdri');
  const remote=/^https:\/\//.test(catalog);
  let data;
  if (remote) {
    const response=await fetch(catalog,{signal:AbortSignal.timeout(30000)});
    if (!response.ok) throw new Error(`Catalog request failed: HTTP ${response.status}`);
    data=await response.json();
  } else data=JSON.parse(await readFile(catalog,'utf8'));
  if (![1,2].includes(data.version) || !Array.isArray(data.assets)) throw new Error('Catalog must have version 1 or 2 and an assets array');
  const terms=words(query);
  const hits=[];
  for (const asset of data.assets) {
    if (typeof asset.id!=='string' || typeof asset.pack!=='string' || typeof asset.label!=='string' || typeof asset.description!=='string' || !['model','thumbnail','descriptor'].every(key=>safePath(asset[key]))) throw new Error('Malformed asset in catalog');
    if (pack && asset.pack!==pack) continue;
    const creator=asset.creator??creators.find(name=>asset.pack.startsWith(name+'-'))??null;
    const assetType=asset.type??'model';
    if (source && creator!==source) continue;
    if (type && assetType!==type) continue;
    const identity=words(asset.id), label=words(asset.label), text=words(`${asset.label} ${asset.id} ${asset.description} ${(asset.tags??[]).join(" ")} ${(asset.colorNames??[]).join(" ")} ${asset.category??""}`);
    if (!terms.every(term=>text.some(word=>word.startsWith(term)))) continue;
    const score=terms.reduce((score,term)=>score+(label.includes(term)?4:identity.includes(term)?2:1),0);
    hits.push({asset:{...asset,creator,type:assetType},score});
  }
  hits.sort((a,b)=>b.score-a.score || a.asset.id.localeCompare(b.asset.id));
  const results=hits.slice(offset,offset+limit).map(({asset})=>({
    ...asset,
    ...Object.fromEntries(['model','thumbnail','descriptor'].map(key=>[key,remote ? new URL(asset[key],catalog).href : resolve(dirname(catalog),asset[key])])),
  }));
  return {query,pack:pack??null,source:source??null,type:type??null,catalog,total:hits.length,offset,count:results.length,results};
}
export async function searchCommand(args) {
  const options={}; const query=[];
  try {
    for(let i=0;i<args.length;i++) {
      const argument=args[i];
      if (['--pack','--source','--type','--limit','--offset','--catalog'].includes(argument)) {
        const value=args[++i];
        if (value===undefined || value.startsWith('--')) throw new Error(`${argument} needs a value`);
        options[argument.slice(2)]=['--limit','--offset'].includes(argument)?Number(value):value;
      } else if (argument.startsWith('--')) throw new Error(`Unknown search option: ${argument}`);
      else query.push(argument);
    }
    const result=await searchAssets(query.join(' '),options);
    process.stdout.write(JSON.stringify(result,null,2)+'\n');
    return 0;
  } catch(error) {
    process.stderr.write(`asset search: ${error.message}\n`);
    return 1;
  }
}

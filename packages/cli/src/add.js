// Install one catalog package as inert files. No imported TypeScript is executed.
import {readFile,writeFile,mkdir,mkdtemp,rename,rm,realpath,lstat} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname,resolve,join,relative,sep,basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {safePath} from './catalog.js';
import {publicCatalog} from './search.js';
const localCatalog=fileURLToPath(new URL('../../../asset/catalog.json',import.meta.url));
const defaultCatalog=existsSync(localCatalog)?localCatalog:publicCatalog;
const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
const json=bytes=>JSON.parse(bytes.toString('utf8'));
const fail=message=>{throw new Error(message);};
async function get(url){
 const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(60000),headers:{'User-Agent':'PlayGrove-CLI'}});
 if(!response.ok)fail(`Download failed: HTTP ${response.status} ${url}`);
 return Buffer.from(await response.arrayBuffer());
}
async function openCatalog(location){
 if(/^https?:\/\//.test(location)){
  const url=new URL(location),match=url.pathname.match(/^\/playgrovehq\/playgrove\/(main|[a-f0-9]{40})\/asset\/catalog\.json$/);
  if(url.protocol!=='https:'||url.hostname!=='raw.githubusercontent.com'||url.port||url.username||url.password||url.search||url.hash||!match)fail('Remote install requires the official PlayGrove raw GitHub asset/catalog.json URL');
  const commit=match[1]==='main'?json(await get('https://api.github.com/repos/playgrovehq/playgrove/commits/main')).sha:match[1];
  if(!/^[a-f0-9]{40}$/.test(commit))fail('GitHub did not return a full commit hash');
  const catalog=`https://raw.githubusercontent.com/playgrovehq/playgrove/${commit}/asset/catalog.json`;
  return {catalog,commit,bytes:await get(catalog),read:path=>get(new URL(path,catalog).href)};
 }
 const catalog=await realpath(resolve(location)),root=dirname(catalog);
 return {catalog,commit:null,bytes:await readFile(catalog),read:async path=>{
  const file=await realpath(join(root,path));if(!file.startsWith(root+sep))fail('Local package path escapes its catalog directory');
  return readFile(file);
 }};
}
export async function addAsset(id,{catalog=defaultCatalog,into}={}){
 if(!into)fail('--into is required');
 if(!safePath(id)||id.split('/').length!==2)fail('Asset ID must be the exact pack/asset ID returned by search');
 const source=await openCatalog(catalog),listing=json(source.bytes);
 if(![1,2].includes(listing.version)||!Array.isArray(listing.assets))fail('Invalid asset catalog');
 const matches=listing.assets.filter(asset=>asset.id===id);if(matches.length!==1)fail(matches.length?'Duplicate exact asset ID in catalog':'Asset ID not found in the ready catalog');
 const asset=matches[0],[pack,assetId]=id.split('/');
 if((asset.availability??'ready')!=='ready'||!asset.model||!asset.descriptor)fail('Source listings cannot be installed as native assets');
 if(asset.pack!==pack||asset.license!=='CC0-1.0')fail('Package identity or admitted CC0 license is missing');
 for(const key of ['model','descriptor','thumbnail'])if(!safePath(asset[key])||dirname(asset[key])!==id)fail('Catalog package paths do not match the exact asset ID');
 if(!asset.model.endsWith('.ts')||basename(asset.descriptor)!=='metadata.json'||basename(asset.thumbnail)!=='thumbnail.png')fail('Unsupported package file layout');
 const requested=[asset.model,asset.descriptor,asset.thumbnail,id+'/source.json',pack+'/License.txt'];
 const files=await Promise.all(requested.map(async path=>({path,name:basename(path),bytes:await source.read(path)})));
 if(new Set(files.map(file=>file.name)).size!==files.length||files.some(file=>!file.bytes.length))fail('Package files are empty or collide');
 const metadata=json(files[1].bytes),provenance=json(files[3].bytes),license=files[4].bytes.toString('utf8');
 if(metadata.id!==assetId||provenance.id!==assetId||provenance.pack!==pack||metadata.license!=='CC0-1.0'||provenance.license!=='CC0-1.0'||!/CC0|Creative Commons Zero/i.test(license))fail('Package metadata, provenance or license does not match the catalog');
 if(provenance.model!==files[0].name||provenance.descriptor!==files[1].name||provenance.thumbnail!==files[2].name)fail('Provenance filenames do not match the catalog');
 if(files[2].bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')fail('Thumbnail is not PNG');
 const format=metadata.format;if(!['playgrove-native-v1','playgrove-native-v2'].includes(format)||asset.format!==format||provenance.format!==format)fail('Package format disagrees with the catalog');
 const minimumGameVersion=format==='playgrove-native-v2'?2:1;
 if(minimumGameVersion===2&&metadata.compatibility?.minimumGameVersion!==2)fail('Material package lacks minimum game version 2');
 const root=resolve(into),target=join(root,pack,assetId);
 // Refuse replacement: a failed or repeated install leaves authored files intact.
 try{await lstat(target);fail('Destination already exists: '+target);}catch(error){if(error.code!=='ENOENT')throw error;}
 await mkdir(root,{recursive:true});const realRoot=await realpath(root);
 await mkdir(join(root,pack),{recursive:true});const parent=await realpath(join(root,pack));
 if(parent!==join(realRoot,pack))fail('Destination pack directory must not be a symlink');
 const stage=await mkdtemp(join(parent,'.grove-add-'));
 try{
  const receipt={version:1,id,catalog:source.catalog,commit:source.commit,catalogSha256:sha256(source.bytes),installedAt:new Date().toISOString(),format,minimumGameVersion,license:asset.license,files:files.map(({path,name,bytes})=>({name,source:source.commit?new URL(path,source.catalog).href:resolve(dirname(source.catalog),path),bytes:bytes.length,sha256:sha256(bytes)}))};
  for(const file of files)await writeFile(join(stage,file.name),file.bytes,{flag:'wx'});
  await writeFile(join(stage,'installation.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
  // Every byte is staged before the destination becomes visible.
  if(existsSync(target))fail('Destination appeared during installation: '+target);
  await rename(stage,target);
  const model=join(target,files[0].name),from=relative(process.cwd(),model).split(sep).join('/');
  return {id,directory:target,model,thumbnail:join(target,'thumbnail.png'),metadata:join(target,'metadata.json'),receipt:join(target,'installation.json'),commit:source.commit,minimumGameVersion,import:`import { asset } from ${JSON.stringify(from.startsWith('.')?from:'./'+from)};`,note:'Files installed without executing TypeScript. Import paths are relative to the current working directory; adjust for your game file.'};
 }finally{await rm(stage,{recursive:true,force:true});}
}
export async function addCommand(args){
 try{
  const[id,...rest]=args,options={};if(!id||id.startsWith('--'))fail('Usage: grove assets add <exact-pack/asset-id> --into <project-asset-directory> [--catalog <path-or-official-GitHub-url>]');
  for(let i=0;i<rest.length;i++){const key=rest[i],value=rest[++i];if(!['--catalog','--into'].includes(key)||!value||value.startsWith('--')||options[key.slice(2)]!==undefined)fail('Expected one --catalog or --into value');options[key.slice(2)]=value;}
  console.log(JSON.stringify(await addAsset(id,options),null,2));return 0;
 }catch(error){console.error('asset add: '+error.message);return 1;}
}

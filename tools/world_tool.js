// ビルド用: ワールド本体とシーンを Node で読み込み、一覧(manifest)とサムネイルを作り、データを検査する。
// 使い方: node tools/world_tool.js <world.js> <scenes_dir> <out_dir>  → 標準出力に manifest の JSON
const vm=require('vm'),fs=require('fs'),path=require('path');
const [bundle,scDir,outDir]=process.argv.slice(2);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ctx={console,esc,WORLD:{scenes:{}},VIEWS:{},S:{set:{}},Math,JSON,Object,Array,String,Number,setTimeout,Promise};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(bundle,'utf8'),ctx,{filename:'world.js'});
const order=JSON.parse(fs.readFileSync(path.join(scDir,'_order.json'),'utf8'));
for(const id of order)vm.runInContext(fs.readFileSync(path.join(scDir,id+'.js'),'utf8'),ctx,{filename:id+'.js'});
const defs=vm.runInContext('WSC.defs',ctx);
const errs=[];
for(const id of order)if(!defs[id])errs.push('scene not registered: '+id);
fs.mkdirSync(path.join(outDir,'thumbs'),{recursive:true});
const man=[];
for(const id of order){const d=defs[id];if(!d)continue;
 const svg=vm.runInContext(`wThumb(WSC.defs[${JSON.stringify(id)}])`,ctx);
 fs.writeFileSync(path.join(outDir,'thumbs',id+'.svg'),svg);
 man.push({id,t:d.t,en:d.en,cat:d.cat||'daily',n:(d.missions||[]).length,s:(d.stories||[]).length})}
// データの検査(英文テンプレート・会話の判定など)。world.js に wCheck があれば使う
if(vm.runInContext('typeof wCheckAll',ctx)==='function'){const r=vm.runInContext(`wCheckAll(${JSON.stringify(order)})`,ctx);errs.push(...r.errors);if(r.report)fs.writeFileSync(path.join(outDir,'..','tools','world_check_report.txt'),r.report)}
if(errs.length){console.error('WORLD CHECK FAILED:\n'+errs.join('\n'));process.exit(1)}
process.stdout.write(JSON.stringify(man));

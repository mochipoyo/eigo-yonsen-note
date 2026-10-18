// ===== うごかす英語ワールド: 読み込み係 =====
// ワールド本体(world/world.js)とシーン(world/scenes/<id>.js)は、ワールドを開いたときだけ読み込む。
// WORLD_V(版の番号)と WMAN(シーン一覧に出す情報)は build.py が作って、このファイルの前に入れる。
const WORLD={v:WORLD_V,scenes:{},sc:{},ready:null};
function wLoadScript(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src+'?v='+WORLD.v;s.async=true;
 s.onload=()=>res();s.onerror=()=>{s.remove();rej(new Error('load '+src))};document.head.appendChild(s)})}
function loadWorld(){return WORLD.ready||(WORLD.ready=wLoadScript('world/world.js').catch(e=>{WORLD.ready=null;throw e}))}
function loadScene(id){if(WORLD.scenes[id])return Promise.resolve();
 return WORLD.sc[id]||(WORLD.sc[id]=loadWorld().then(()=>wLoadScript('world/scenes/'+id+'.js')).catch(e=>{delete WORLD.sc[id];throw e}))}
const wMeta=id=>WMAN.find(s=>s.id===id);
// 本体を読み込むまでの仮の画面(読み込み後は world.js が本物に置きかえる)
for(const n of ['world','wscene','wbook','wstory','wexpr']){const stub=function(app){
  app.innerHTML='<p class="muted" style="padding:24px 0">うごかす英語ワールドを読み込んでいます…</p>';
  loadWorld().then(()=>{if(V.name===n&&VIEWS[n]!==stub)render()},()=>{if(V.name!==n)return;
   app.innerHTML=`<section class="sheet panel"><p>うごかす英語ワールドを読み込めませんでした。通信状態を確認してください。</p><button class="btn hl" id="w-retry">もう一度読み込む</button> <button class="btn ghost" data-go='{"name":"home"}'>ホームへ</button></section>`;
   app.querySelector('#w-retry').onclick=()=>render();wireGo(app)})};
 VIEWS[n]=stub}

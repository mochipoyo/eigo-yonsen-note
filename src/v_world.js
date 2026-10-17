// ===== うごかす英語ワールド: 画面 =====
const WMODES=[{n:1,k:'自由に動かす',d:'動かすと英文が出る'},{n:2,k:'聞いて動かす',d:'英語の指示どおりに'},{n:3,k:'日本語で動かす',d:'動かして英語で言う'},{n:4,k:'英語だけ',d:'日本語なし'}];
function wRec(id){S.world=S.world||{};return S.world[id]=S.world[id]||{found:{},clear:{},n:0,miss:0,ok:0}}
function wStat(){S.wstat=S.wstat||{v:{},p:{}};return S.wstat}
function wThumb(def){// シーン一覧用の小さな絵
 const W=W_new(def);const list=W.order.map(id=>W.ents[id]).sort((a,b)=>layout(W,a).d-layout(W,b).d);
 return `<svg viewBox="0 0 1000 600" class="wthumb" aria-hidden="true">${bgSvg(def.bg)}${list.map(e=>{const l=layout(W,e);if(l.hidden)return '';const fl=(e.k==='person'||e.k==='animal')&&e.flip?' scale(-1 1)':'';return `<g transform="translate(${l.x} ${l.y})${fl}">${artFor(W,e)}</g>`}).join('')}</svg>`}
const WT={};// サムネイルのキャッシュ
VIEWS.world=function(app){
 const done=id=>{const r=(S.world||{})[id];return r?Object.keys(r.clear||{}).length:0};
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}<span class="sp"></span><button class="btn ghost sm" data-go='{"name":"wbook"}'>マイフレーズ帳(${(S.wfav||[]).length})</button></div>
 <div class="uhead"><span class="eyebrow">INTERACTIVE ENGLISH WORLD</span><h1>うごかす英語ワールド</h1><p>人や物をタップ・ドラッグして動かすと、その動きを表す英文が表示され、読み上げられます。動きと英語を直接むすびつけて覚えましょう。</p></div>
 <div class="wgrid">${SCENES.map((s,i)=>`<button class="wcardsel" data-go='${JSON.stringify({name:'wscene',id:s.id})}'><div class="wth">${WT[s.id]||(WT[s.id]=wThumb(s))}</div><div class="wcap"><span class="no">${String(i+1).padStart(2,'0')}</span><b>${esc(s.t)}</b><small class="en">${esc(s.en)}</small><span class="sp"></span><span class="stars">${[2,3,4].map(m=>`<span class="${(S.world||{})[s.id]&&S.world[s.id].clear[m]?'on':''}">★</span>`).join('')}</span></div><small class="muted">見つけた英文 ${Object.keys(((S.world||{})[s.id]||{}).found||{}).length} ・ ミッション ${s.missions.length}</small></button>`).join('')}</div>
 <p class="foot">★は「聞いて動かす」「日本語で動かす」「英語だけ」の各モードでミッションをすべてクリアすると付きます。</p>`;
 wireGo(app);
};
VIEWS.wscene=function(app){
 const def=sceneById(V.id);if(!def)return go({name:'world'},true);
 const R=wRec(def.id);const mode=V.mode||1;
 S.set.wEn=S.set.wEn??true;S.set.wJa=S.set.wJa??true;
 const W=RT.w&&RT.w.def===def&&RT.w.alive?RT.w:W_new(def);W.alive=true;RT.w=W;W.mode=mode;
 if(mode===1)W.mission=null;
 if(!W.mq||W.mqMode!==mode){W.mq=shuffle(def.missions.map((_,i)=>i));W.mi=0;W.mqMode=mode;W.mdone=0}
 app.innerHTML=`<div class="wtop"><button class="back" id="w-back">← シーン一覧</button><b>${esc(def.t)} <small class="en muted">${esc(def.en)}</small></b><span class="sp"></span>
  <label class="tg"><input type="checkbox" id="w-en" ${S.set.wEn?'checked':''}> 英文</label><label class="tg"><input type="checkbox" id="w-ja" ${S.set.wJa?'checked':''}> 和訳</label><button class="btn ghost sm" id="w-reset">${IC.redo}最初の状態</button></div>
 <div class="tabs wmodes">${WMODES.map(m=>`<button class="tab" data-m="${m.n}" aria-selected="${m.n===mode}">${m.n>1&&R.clear[m.n]?'★ ':''}${m.k}<small>${m.d}</small></button>`).join('')}</div>
 ${mode>1?'<div class="wmis" id="w-mis"></div>':`<p class="whint">人物をタップ → 動作を選ぶ / 人物を選んでから物をタップ → 組み合わせの動作 / ドラッグで移動。家具の電源やドアは直接タップでも操作できます。</p>`}
 <div class="wstage" id="w-stage"></div>
 <div class="wmenu" id="w-menu"></div>
 <div class="wsent" id="w-card"><p class="muted" style="margin:0">ここに英文が表示されます。</p></div>
 <div class="row" style="margin-top:4px"><small class="muted">このシーンで見つけた英文:<b id="w-found">${Object.keys(R.found).length}</b></small></div>`;
 const $=s=>app.querySelector(s);
 $('#w-back').onclick=()=>{W.alive=false;go({name:'world'})};
 $('#w-en').onchange=e=>{S.set.wEn=e.target.checked;save();showCard(W.lastD)};
 $('#w-ja').onchange=e=>{S.set.wJa=e.target.checked;save();showCard(W.lastD)};
 $('#w-reset').onclick=()=>{W.alive=false;RT.w=null;render()};
 app.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{go({name:'wscene',id:def.id,mode:+b.dataset.m},true)});
 const menu=$('#w-menu'),card=$('#w-card');
 const api={
  tap(e){if(W.busy)return;
   const sel=W.sel&&W.ents[W.sel];
   if(sel&&sel!==e&&(sel.k==='person'||sel.k==='animal')){const m=comboMenu(W,sel,e);
    if(m.length){if(e.k==='person'||e.k==='animal')m.unshift(wA(`Choose ${e.en}`,`${e.ja}を選びなおす`,async()=>{W.sel=e.id;W.draw();setTimeout(()=>{showMenu(cap(e.en),e.ja,selfMenu(W,e),e)},0);return null},{noAnim:true}));
     showMenu(`${cap(sel.en)} → ${e.en}`,`${sel.ja} と ${e.ja}`,m,sel);W.tgt=e.id;W.draw();return}}
   if(e.k==='person'||e.k==='animal'){W.sel=e.id;W.tgt=null;W.draw();showMenu(cap(e.en),`${e.ja}(ほかの人・物をタップすると組み合わせの動作)`,selfMenu(W,e),e);sayWord(e);return}
   W.sel=null;W.tgt=null;W.draw();
   const dm=directMenu(W,e);showMenu(cap(e.en),e.ja+(dm.length?'':'(人物を選んでからタップすると、動作を選べます)'),dm,null);sayWord(e)},
  tapGround(pt){if(W.busy)return;const sel=W.sel&&W.ents[W.sel];if(sel&&(sel.k==='person'||sel.k==='animal')&&pt.y>def.floor[0]-30){doAct(()=>dropAct(W,sel,pt))}else{W.sel=null;W.draw();menu.innerHTML=''}},
  drop(e,pt){doAct(()=>dropAct(W,e,pt))},
  onDragStart(){menu.innerHTML=''}};
 W_mount($('#w-stage'),W,api);
 function sayWord(e){if(e.en){speak(e.en.replace(/^the /,''))}}
 function showMenu(title,sub,list,actor){
  menu.innerHTML=`<div class="wmhead"><b class="en">${esc(title)}</b><small class="muted">${esc(sub)}</small><span class="sp"></span><button class="btn ghost sm" id="wm-x">とじる</button></div>
  ${list.length?`<div class="wacts">${list.map((a,i)=>`<button class="wact" data-i="${i}"><span class="en">${esc(a.en)}</span><small>${esc(a.ja)}</small></button>`).join('')}</div>`:'<p class="muted" style="margin:6px 0">いまできる動作はありません。</p>'}`;
  menu.querySelector('#wm-x').onclick=()=>{menu.innerHTML='';W.sel=null;W.tgt=null;W.draw()};
  menu.querySelectorAll('.wact').forEach(b=>b.onclick=()=>{const a=list[+b.dataset.i];menu.innerHTML='';if(a.noAnim){a.run();return}doAct(a.run)})}
 async function doAct(fn){if(W.busy)return;W.busy=true;let evs;try{evs=await fn()}catch(err){console.error(err);evs=null}W.busy=false;W.tgt=null;W.draw();
  if(!W.alive)return;evs=(Array.isArray(evs)?evs:[evs]).filter(Boolean);
  for(const ev of evs)onEvent(ev);
  if(W.sel&&W.ents[W.sel]&&!W.ents[W.sel].hidden){const e=W.ents[W.sel];showMenu(cap(e.en),e.ja,selfMenu(W,e),e)}}
 function onEvent(ev){const d=describe(ev);if(!d)return;W.lastD={d,ev,mode:'noun'};(W.evlog=W.evlog||[]).push({ev,en:d.main.en,state:d.state&&d.state.en,past:d.past&&d.past.en});
  const key=d.main.en;const isNew=!R.found[key];R.found[key]=(R.found[key]||0)+1;R.n++;
  if(d.state&&d.state.en!==key)R.found[d.state.en]=(R.found[d.state.en]||0)+1;
  const st=wStat();if(!W.mission){st.v[d.tag]=st.v[d.tag]||[0,0];st.v[d.tag][0]++;st.v[d.tag][1]++;if(d.p){st.p[d.p]=st.p[d.p]||[0,0];st.p[d.p][0]++;st.p[d.p][1]++}}
  logEv({m:'world',ok:true,r:def.id+':'+key.slice(0,40)});
  if(isNew)addXP(2);else save();
  const f=$('#w-found');if(f)f.textContent=Object.keys(R.found).length;
  showCard(W.lastD);if(S.set.wAuto!==false)speak(d.main.en,{g:ev.a&&ev.a.pron==='he'?'m':'f'});
  if(mode>1)checkMission(ev,d)}
 function showCard(L){if(!L){return}const {d,ev}=L;const md=L.mode;const dd=describe(ev,md)||d;
  const animate=ev.a&&!ev.a.user&&(ev.a.k==='person'||ev.a.k==='animal');
  const main=dd.main,extra=[];
  if(dd.state&&dd.state.en!==main.en)extra.push(['状態',dd.state]);
  if(dd.prog&&dd.prog.en!==main.en)extra.push(['動作中',dd.prog]);
  if(dd.past)extra.push(['過去',dd.past]);
  const enShow=S.set.wEn,jaShow=S.set.wJa&&W.mode!==4;
  const fav=(S.wfav||[]).some(x=>x.en===main.en);
  card.innerHTML=`<div class="wsmain en ${enShow?'':'wblur'}" id="ws-en">${esc(main.en)}</div>
  ${jaShow?`<div class="j">${esc(main.ja)}</div>`:''}
  <div class="row" style="margin-top:8px">${sayBtn(main.en,ev.a&&ev.a.pron==='he'?'m':'f')}<button class="say" data-say="${esc(main.en)}" data-slow="1" aria-label="ゆっくり再生">${IC.slow}</button>
   <button class="btn ghost sm" id="ws-fav">${fav?'★ 保存ずみ':'☆ フレーズ帳に保存'}</button><button class="btn ghost sm" id="ws-say">${IC.mic}言ってみる</button>
   ${animate?`<span class="sp"></span><span class="wsubj">${[['noun',cap(ev.a.en)],['pron',ev.a.k==='person'?cap(ev.a.pron):'It'],['I','I'],['you','You']].map(([k,n])=>`<button class="tab" data-sj="${k}" aria-selected="${md===k}" style="min-width:0;padding:2px 8px">${esc(n)}</button>`).join('')}</span>`:''}</div>
  ${extra.length?`<div class="wsx">${extra.map(([k,s])=>`<div class="ex">${sayBtn(s.en)}<div><small class="gtag">${k}</small> <span class="en ${enShow?'':'wblur'}">${esc(s.en)}</span>${jaShow?`<div class="j">${esc(s.ja)}</div>`:''}</div></div>`).join('')}</div>`:''}
  ${dd.p?`<small class="muted">前置詞:<b class="en">${esc(dd.p)}</b>(${esc(PJ[dd.p]||'')})</small>`:''}<div id="ws-mic"></div>`;
  wireSay(card);
  card.querySelectorAll('.wblur').forEach(x=>x.onclick=()=>x.classList.remove('wblur'));
  card.querySelectorAll('[data-sj]').forEach(b=>b.onclick=()=>{L.mode=b.dataset.sj;showCard(L);const n=describe(ev,L.mode);if(n)speak(n.main.en)});
  card.querySelector('#ws-fav').onclick=()=>{S.wfav=S.wfav||[];if(!S.wfav.some(x=>x.en===main.en)){S.wfav.push({en:main.en,ja:main.ja,sc:def.id,at:today()});if(!S.shSaved.some(x=>x.en===main.en))S.shSaved.push({en:main.en,ja:main.ja,at:today()});save();toast('マイフレーズ帳に保存しました')}showCard(L)};
  card.querySelector('#ws-say').onclick=()=>micPanel(card.querySelector('#ws-mic'),main.en,()=>{card.querySelector('#ws-mic').innerHTML=''},{skipLabel:'とじる',doneLabel:'とじる'})}
 // ---- ミッション ----
 function missionEv(m){const g=k=>m.ex[k]?(typeof m.ex[k]==='object'&&!Array.isArray(m.ex[k])?m.ex[k]:Array.isArray(m.ex[k])?W.ents[m.ex[k][0]]:W.ents[m.ex[k]]):null;
  return {...m.ex,a:m.ex.a?g('a'):USER,o:g('o'),r:m.ex.r?g('r'):null}}
 function missionText(m){const ev=missionEv(m);const imp=(m.ex.v==='place'||m.ex.v==='light'||((m.ex.v==='open'||m.ex.v==='close'||m.ex.v==='turnon'||m.ex.v==='turnoff')&&!m.a))?imperative(ev):null;
  const d=describe(ev);return imp&&!imp.target?{en:imp.en,ja:imp.ja,how:'command'}:{en:d.main.en,ja:d.main.ja,how:'target'}}
 function renderMission(){const box=$('#w-mis');if(!box)return;
  if(W.mi>=W.mq.length){box.innerHTML=`<div class="wclear"><b>ステージクリア!</b> <span>「${esc(WMODES[mode-1].k)}」のミッションをすべてクリアしました。</span><div class="row" style="margin-top:6px"><button class="btn sm" id="wm-again">もう一度</button>${mode<4?`<button class="btn hl sm" id="wm-next">次のモードへ</button>`:''}</div></div>`;
   box.querySelector('#wm-again').onclick=()=>{W.mq=shuffle(def.missions.map((_,i)=>i));W.mi=0;renderMission()};
   const nx=box.querySelector('#wm-next');if(nx)nx.onclick=()=>go({name:'wscene',id:def.id,mode:mode+1},true);return}
  const m=def.missions[W.mq[W.mi]];const tx=missionText(m);W.mission=m;W.mText=tx;
  const head=`<span class="gtag">ミッション ${W.mi+1} / ${W.mq.length}</span>`;
  if(mode===2)box.innerHTML=`${head}<div class="row" style="margin-top:6px"><button class="playbig sm" id="wm-play" aria-label="指示を聞く">${IC.play}</button><div><b>英語の指示を聞いて、そのとおりに動かしましょう</b><div id="wm-tx" class="en muted" style="margin-top:2px"><button class="linkbtn" id="wm-show">英文を見る(ヒント)</button></div></div></div>`;
  if(mode===3)box.innerHTML=`${head}<div class="one" style="margin-top:6px">${esc(tx.ja)}</div><small class="muted">この場面になるように動かしてから、英語で言ってみましょう。</small>`;
  if(mode===4)box.innerHTML=`${head}<div class="row" style="margin-top:6px"><button class="playbig sm" id="wm-play" aria-label="英語を聞く">${IC.play}</button><div class="one en">${esc(tx.en)}</div></div>`;
  const pl=box.querySelector('#wm-play');if(pl){pl.onclick=()=>speak(tx.en);setTimeout(()=>speak(tx.en),300)}
  const sh=box.querySelector('#wm-show');if(sh)sh.onclick=()=>{W.mHint=true;box.querySelector('#wm-tx').textContent=tx.en}}
 function checkMission(ev,d){const m=W.mission;if(!m)return;const st=wStat();const tag=VERB_TAG[m.ex.v]||m.ex.v,pp=m.ex.p;
  if(wMatch(m,ev)){st.v[tag]=st.v[tag]||[0,0];st.v[tag][0]++;st.v[tag][1]++;if(pp){st.p[pp]=st.p[pp]||[0,0];st.p[pp][0]++;st.p[pp][1]++}
   R.ok++;const gain=[0,0,10,12,15][mode]-(W.mHint?4:0);addXP(gain);W.mHint=false;
   const box=$('#w-mis');const tx=W.mText;
   box.innerHTML=`<div class="wok">${hana}<div><b class="good">ミッション成功! +${gain} XP</b><div class="en">${esc(tx.en)}</div>${mode===3?'<div id="wm-mic"></div>':''}<div class="row" style="margin-top:6px"><button class="btn hl sm" id="wm-next">つぎのミッション →</button></div></div></div>`;
   if(mode===3)micPanel(box.querySelector('#wm-mic'),tx.how==='command'?d.main.en:tx.en,()=>{const m2=box.querySelector('#wm-mic');if(m2)m2.innerHTML=''},{skipLabel:'言わずに進む',doneLabel:'OK'});
   box.querySelector('#wm-next').onclick=()=>{W.mi++;if(W.mi>=W.mq.length){R.clear[mode]=today();addXP(30);confetti();checkBadges();save()}renderMission()};
  }else{st.v[tag]=st.v[tag]||[0,0];st.v[tag][1]++;if(pp){st.p[pp]=st.p[pp]||[0,0];st.p[pp][1]++}R.miss++;save();
   const box=$('#w-mis');let n=box.querySelector('.wng');if(!n){n=document.createElement('div');n.className='wng';box.appendChild(n)}
   n.textContent='いまの動きはミッションとちがうようです。もう一度聞いて(読んで)みましょう。'}}
 if(mode>1)renderMission();
};
VIEWS.wbook=function(app){const L=S.wfav||[];
 app.innerHTML=`<div class="row">${backBtn('うごかす英語ワールド',{name:'world'})}</div>
 <div class="uhead"><span class="eyebrow">MY PHRASES</span><h1>マイフレーズ帳</h1><p>ワールドで保存した英文です。シャドーイングの「保存した英文」からも練習できます。</p></div>
 ${L.length?`<section class="sheet panel"><div class="row" style="margin-bottom:10px"><button class="btn hl" id="wb-sh">シャドーイングで練習</button><button class="btn ghost" id="wb-all">${IC.play}全部聞く</button></div>
 <div class="exs">${L.map((x,i)=>`<div class="ex">${sayBtn(x.en)}<div><div class="e en">${esc(x.en)}</div><div class="j">${esc(x.ja)}</div><div class="row" style="margin-top:4px"><small class="muted">${esc((sceneById(x.sc)||{}).t||'')} ・ ${esc(x.at)}</small><button class="btn ghost sm" data-del="${i}">削除</button></div></div></div>`).join('')}</div></section>`:'<section class="sheet panel"><p>まだ保存した英文はありません。ワールドで英文カードの「☆ フレーズ帳に保存」を押すと、ここに入ります。</p></section>'}
 ${wWeakHtml()}`;
 wireGo(app);wireSay(app);
 const sh=app.querySelector('#wb-sh');if(sh)sh.onclick=()=>startShadow({items:L.slice(-8).map(x=>({en:x.en,ja:x.ja}))});
 const al=app.querySelector('#wb-all');if(al)al.onclick=()=>speakSeq(L.map(x=>({text:x.en,g:'f',gap:600})));
 app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{L.splice(+b.dataset.del,1);save();render()});
};
function wWeakHtml(){const st=wStat();const rows=(o,lab)=>Object.entries(o).filter(([k,v])=>v[1]>=2).map(([k,v])=>({k,r:v[0]/v[1],n:v[1]})).sort((a,b)=>a.r-b.r).slice(0,5);
 const vv=rows(st.v),pp=rows(st.p);if(!vv.length&&!pp.length)return '';
 return `<section class="sheet panel"><h3 class="eyebrow">ミッションの成績(苦手な動詞・前置詞)</h3><div class="row" style="align-items:flex-start;gap:24px">
  <div><b>動詞</b>${vv.map(x=>`<div class="en">${esc(x.k)} <small class="muted">${Math.round(x.r*100)}%(${x.n}回)</small></div>`).join('')||'<div class="muted">—</div>'}</div>
  <div><b>前置詞</b>${pp.map(x=>`<div class="en">${esc(x.k)} <small class="muted">${Math.round(x.r*100)}%(${x.n}回)</small></div>`).join('')||'<div class="muted">—</div>'}</div></div></section>`}
function wMatch(m,ev){const id=x=>x&&x.id;const inL=(v,x)=>Array.isArray(v)?v.includes(x):v===x;
 if(!m.v.includes(ev.v))return false;if(m.a&&id(ev.a)!==m.a)return false;if(m.o&&!inL(m.o,id(ev.o)))return false;
 if(m.r&&!inL(m.r,id(ev.r)))return false;if(m.p&&ev.p!==m.p)return false;return true}

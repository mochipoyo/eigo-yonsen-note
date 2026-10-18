// ===== ワールド: 画面(シーン一覧・シーン・フレーズ帳) =====
const WMODES=[{n:1,k:'自由に動かす',d:'動かすと英文が出る'},{n:2,k:'聞いて動かす',d:'英語の指示どおりに'},{n:3,k:'日本語で動かす',d:'動かして英語で言う'},{n:4,k:'英語だけ',d:'日本語なし'},
 {n:5,k:'実践ミッション',d:'聞いて判断・会話',story:1},{n:6,k:'英語で生活',d:'選択肢なしで会話',story:1}];
VIEWS.world=function(app){
 const done=id=>{const r=(S.world||{})[id];return r?Object.keys(r.clear||{}).length:0};
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}<span class="sp"></span><button class="btn ghost sm" data-go='{"name":"wbook"}'>マイフレーズ帳(${(S.wfav||[]).length})</button></div>
 <div class="uhead"><span class="eyebrow">INTERACTIVE ENGLISH WORLD</span><h1>うごかす英語ワールド</h1><p>人や物をタップ・ドラッグして動かすと、その動きを表す英文が表示され、読み上げられます。動きと英語を直接むすびつけて覚えましょう。</p></div>
 <div class="wgrid">${WMAN.map((s,i)=>`<button class="wcardsel" data-go='${JSON.stringify({name:'wscene',id:s.id})}'><div class="wth"><img src="world/thumbs/${s.id}.svg?v=${WORLD.v}" alt="" loading="lazy" width="1000" height="600"></div><div class="wcap"><span class="no">${String(i+1).padStart(2,'0')}</span><b>${esc(s.t)}</b><small class="en">${esc(s.en)}</small><span class="sp"></span><span class="stars">${[2,3,4].map(m=>`<span class="${(S.world||{})[s.id]&&S.world[s.id].clear[m]?'on':''}">★</span>`).join('')}</span></div><small class="muted">見つけた英文 ${Object.keys(((S.world||{})[s.id]||{}).found||{}).length} ・ ミッション ${s.n}</small></button>`).join('')}</div>
 ${WMAN.some(s=>(s.st||[]).length)?`<h2 class="wh2">会話ミッション <small class="muted">登場人物と英語で話して目的を達成する</small></h2>
 <div class="row" style="margin-bottom:8px"><button class="btn ghost sm" data-go='{"name":"wexpr"}'>重点フレーズ10</button><button class="btn ghost sm" data-go='{"name":"wbook"}'>会話の記録・苦手</button></div>
 <div class="wslist">${WMAN.filter(s=>(s.st||[]).length).flatMap(s=>s.st.map(st=>{const r=(S.wstory||{})[st.id];return `<button class="wscard wsmini" data-go='${JSON.stringify({name:'wscene',id:s.id,mode:5,story:st.id})}'><small class="muted">${esc(s.t)} ・ あなたの役:${esc(st.me)}</small><b>${esc(st.t)}</b><span class="row" style="gap:4px;flex-wrap:wrap">${st.focus.map(f=>`<span class="gtag en">${esc((EXPR.find(x=>x.id===f)||{}).en||f)}</span>`).join('')}${r&&r.clear?`<span class="chip good">${r.perfect?'★':'✓'}</span>`:''}</span></button>`})).join('')}</div>`:''}
 <p class="foot">★は「聞いて動かす」「日本語で動かす」「英語だけ」の各モードでミッションをすべてクリアすると付きます。会話ミッションはシーンの「実践ミッション」「英語で生活」タブからも始められます。</p>`;
 wireGo(app);
};
VIEWS.wscene=function(app){
 if(RT.st){stStop(RT.st);RT.st=null}
 if(!wMeta(V.id))return go({name:'world'},true);
 const def=sceneById(V.id);
 if(!def){app.innerHTML='<p class="muted">シーンを読み込んでいます…</p>';loadScene(V.id).then(()=>{if(V.name==='wscene')render()},()=>{app.innerHTML='<p>シーンを読み込めませんでした。通信状態を確認して、もう一度開いてください。</p>'});return}
 const R=wRec(def.id);const stories=def.stories||[];let mode=V.mode||1;if(mode>=5&&!stories.length)mode=1;
 const story=mode>=5&&V.story?stories.find(s=>s.id===V.story):null;
 S.set.wEn=S.set.wEn??true;S.set.wJa=S.set.wJa??true;
 // 自由・ミッションモードは前の状態を引き継ぐ。会話ミッションは毎回、最初の状態から始める
 const W=!story&&RT.w&&RT.w.def===def&&RT.w.alive&&!RT.w.story?RT.w:W_new(def);W.alive=true;RT.w=W;W.mode=mode;
 if(mode===1||mode>=5)W.mission=null;
 if(mode>1&&mode<5&&(!W.mq||W.mqMode!==mode)){W.mq=shuffle(def.missions.map((_,i)=>i));W.mi=0;W.mqMode=mode;W.mdone=0}
 const tabs=WMODES.filter(m=>!m.story||stories.length);
 const listOnly=mode>=5&&!story;
 app.innerHTML=`<div class="wtop"><button class="back" id="w-back">← ${story?'ミッション一覧':'シーン一覧'}</button><b>${esc(def.t)} <small class="en muted">${esc(def.en)}</small></b><span class="sp"></span>
  ${listOnly?'':`<label class="tg"><input type="checkbox" id="w-en" ${S.set.wEn?'checked':''}> 英文</label><label class="tg"><input type="checkbox" id="w-ja" ${S.set.wJa?'checked':''}> 和訳</label><button class="btn ghost sm" id="w-reset">${IC.redo}${story?'最初から':'最初の状態'}</button>`}</div>
 <div class="tabs wmodes">${tabs.map(m=>`<button class="tab${m.story?' tstory':''}" data-m="${m.n}" aria-selected="${m.n===mode}">${m.n>1&&m.n<5&&R.clear[m.n]?'★ ':''}${m.k}<small>${m.d}</small></button>`).join('')}</div>
 ${listOnly?'<div id="w-slist"></div>':`
 ${mode===1?`<p class="whint">人物をタップ → 動作を選ぶ / 人物を選んでから物をタップ → 組み合わせの動作 / ドラッグで移動。家具の電源やドアは直接タップでも操作できます。</p>`:''}
 ${mode>1&&mode<5?'<div class="wmis" id="w-mis"></div>':''}
 ${story?'<div class="wsgoal" id="w-sgoal"></div>':''}
 <div class="wstage" id="w-stage"></div>
 ${story?'<div class="wtalk" id="w-talk"><div class="wlog" id="w-log" aria-live="polite"></div><div class="wnow" id="w-now"></div></div>':''}
 <div class="wmenu" id="w-menu"></div>
 <div class="wsent" id="w-card"><p class="muted" style="margin:0">${story?'動かすと、その動きの英文がここに出ます。':'ここに英文が表示されます。'}</p></div>
 ${story?'':`<div class="row" style="margin-top:4px"><small class="muted">このシーンで見つけた英文:<b id="w-found">${Object.keys(R.found).length}</b></small></div>`}`}`;
 const $=s=>app.querySelector(s);
 RT.wLeave=()=>{W.alive=false;if(RT.st){stStop(RT.st);RT.st=null}};
 $('#w-back').onclick=()=>{W.alive=false;if(story)go({name:'wscene',id:def.id,mode},true);else go({name:'world'})};
 app.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{go({name:'wscene',id:def.id,mode:+b.dataset.m},true)});
 if(listOnly){wStoryList($('#w-slist'),def,mode);return}
 $('#w-en').onchange=e=>{S.set.wEn=e.target.checked;save();showCard(W.lastD)};
 $('#w-ja').onchange=e=>{S.set.wJa=e.target.checked;save();showCard(W.lastD)};
 $('#w-reset').onclick=()=>{W.alive=false;RT.w=null;render()};
 const menu=$('#w-menu'),card=$('#w-card');
 // モードごとの進行役
 const ctl=story?wStoryCtl({W,def,story,mode,app,$,showMenu,doAct}):mode>1?wMissionCtl({W,def,mode,R,box:()=>$('#w-mis'),fresh}):null;
 const role=ctl&&ctl.role?W.ents[ctl.role]:null;
 const api={
  tap(e){if(W.busy)return;
   if(role){// 会話ミッション: 自分の役の人物で操作する
    if(e===role){W.sel=role.id;W.tgt=null;W.draw();showMenu(cap(role.en)+'(あなた)',role.ja,selfMenu(W,role).concat(ctl.extra(role,null)),role);return}
    W.sel=role.id;const m=comboMenu(W,role,e).concat(ctl.extra(role,e));W.tgt=e.id;W.draw();
    showMenu(`${cap(role.en)} → ${e.en}`,`${role.ja}(あなた) と ${e.ja}`,m,role);if(e.k!=='person')sayWord(e);return}
   const sel=W.sel&&W.ents[W.sel];
   if(sel&&sel!==e&&(sel.k==='person'||sel.k==='animal')){const m=comboMenu(W,sel,e);
    if(m.length){if(e.k==='person'||e.k==='animal')m.unshift(wA(`Choose ${e.en}`,`${e.ja}を選びなおす`,async()=>{W.sel=e.id;W.draw();setTimeout(()=>{showMenu(cap(e.en),e.ja,selfMenu(W,e),e)},0);return null},{noAnim:true}));
     showMenu(`${cap(sel.en)} → ${e.en}`,`${sel.ja} と ${e.ja}`,m,sel);W.tgt=e.id;W.draw();return}}
   if(e.k==='person'||e.k==='animal'){W.sel=e.id;W.tgt=null;W.draw();showMenu(cap(e.en),`${e.ja}(ほかの人・物をタップすると組み合わせの動作)`,selfMenu(W,e),e);sayWord(e);return}
   W.sel=null;W.tgt=null;W.draw();
   const dm=directMenu(W,e);showMenu(cap(e.en),e.ja+(dm.length?'':'(人物を選んでからタップすると、動作を選べます)'),dm,null);sayWord(e)},
  tapGround(pt){if(W.busy)return;const sel=role||(W.sel&&W.ents[W.sel]);if(sel&&(sel.k==='person'||sel.k==='animal')&&pt.y>def.floor[0]-30){doAct(()=>dropAct(W,sel,pt))}else{W.sel=null;W.draw();menu.innerHTML=''}},
  drop(e,pt){if(role&&e!==role){W.draw();toast(`会話ミッションでは、あなたの役(${role.ja})を動かして操作します。`);return}doAct(()=>dropAct(W,e,pt))},
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
  let sp=null;for(const ev of evs)sp=onEvent(ev)||sp;
  if(ctl&&ctl.onEvents&&evs.length){if(sp)await sp;await ctl.onEvents(evs)}
  if(W.sel&&W.ents[W.sel]&&!W.ents[W.sel].hidden&&!W.busy&&!role){const e=W.ents[W.sel];showMenu(cap(e.en),e.ja,selfMenu(W,e),e)}}
 function onEvent(ev){const d=describe(ev);if(!d)return null;W.lastD={d,ev,mode:'noun'};(W.evlog=W.evlog||[]).push({ev,en:d.main.en,state:d.state&&d.state.en,past:d.past&&d.past.en});
  const key=d.main.en;const isNew=!R.found[key];R.found[key]=(R.found[key]||0)+1;R.n++;
  if(d.state&&d.state.en!==key)R.found[d.state.en]=(R.found[d.state.en]||0)+1;
  const st=wStat();if(!W.mission&&!story){st.v[d.tag]=st.v[d.tag]||[0,0];st.v[d.tag][0]++;st.v[d.tag][1]++;if(d.p){st.p[d.p]=st.p[d.p]||[0,0];st.p[d.p][0]++;st.p[d.p][1]++}}
  logEv({m:'world',ok:true,r:def.id+':'+key.slice(0,40)});
  if(isNew)addXP(2);else save();
  const f=$('#w-found');if(f)f.textContent=Object.keys(R.found).length;
  showCard(W.lastD);const sp=S.set.wAuto!==false?speak(d.main.en,{g:ev.a&&ev.a.pron==='he'?'m':'f'}):null;
  if(ctl&&ctl.check)ctl.check(ev,d);
  return sp}
 function showCard(L){if(!L){return}const {d,ev}=L;const md=L.mode;const dd=describe(ev,md)||d;
  const animate=ev.a&&!ev.a.user&&(ev.a.k==='person'||ev.a.k==='animal');
  const main=dd.main,extra=[];
  if(dd.state&&dd.state.en!==main.en)extra.push(['状態',dd.state]);
  if(dd.prog&&dd.prog.en!==main.en)extra.push(['動作中',dd.prog]);
  if(dd.past)extra.push(['過去',dd.past]);
  const enShow=S.set.wEn,jaShow=S.set.wJa&&W.mode!==4&&W.mode!==6;
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
 // ミッションごとにシーンを最初の状態にもどす(モード2〜4)
 function fresh(mq,mi){W.alive=false;const N=W_new(def);Object.assign(N,{mq,mi,mqMode:mode,alive:true});RT.w=N;render()}
 if(ctl&&ctl.render)ctl.render();
 if(ctl&&ctl.start)ctl.start();
};
VIEWS.wbook=function(app){const L=S.wfav||[];
 app.innerHTML=`<div class="row">${backBtn('うごかす英語ワールド',{name:'world'})}</div>
 <div class="uhead"><span class="eyebrow">MY PHRASES</span><h1>マイフレーズ帳</h1><p>ワールドで保存した英文です。シャドーイングの「保存した英文」からも練習できます。</p></div>
 ${L.length?`<section class="sheet panel"><div class="row" style="margin-bottom:10px"><button class="btn hl" id="wb-sh">シャドーイングで練習</button><button class="btn ghost" id="wb-all">${IC.play}全部聞く</button></div>
 <div class="exs">${L.map((x,i)=>`<div class="ex">${sayBtn(x.en)}<div><div class="e en">${esc(x.en)}</div><div class="j">${esc(x.ja)}</div><div class="row" style="margin-top:4px"><small class="muted">${esc((wMeta(x.sc)||{}).t||'')} ・ ${esc(x.at)}</small><button class="btn ghost sm" data-del="${i}">削除</button></div></div></div>`).join('')}</div></section>`:'<section class="sheet panel"><p>まだ保存した英文はありません。ワールドで英文カードの「☆ フレーズ帳に保存」を押すと、ここに入ります。</p></section>'}
 ${wWeakHtml()}${wTalkHtml()}`;
 wireGo(app);wireSay(app);
 const sh=app.querySelector('#wb-sh');if(sh)sh.onclick=()=>startShadow({items:L.slice(-8).map(x=>({en:x.en,ja:x.ja}))});
 const al=app.querySelector('#wb-all');if(al)al.onclick=()=>speakSeq(L.map(x=>({text:x.en,g:'f',gap:600})));
 app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{L.splice(+b.dataset.del,1);save();render()});
};

// ===== ストーリー型 会話クエストと学習マップ =====
const qById=id=>QUESTS.find(q=>q.id===id);
const STAGES=[
 {n:1,t:'はじめての旅',d:'旅行と注文の基本',items:['q01','q02','q03','q04','t01','t02','t03','t04']},
 {n:2,t:'まちの暮らし',d:'予定・食事・病院・買い物',items:['q05','q06','q07','q08','t05','t06','t07','t08']},
 {n:3,t:'仕事と趣味',d:'職場・楽器・トレード・AI',items:['q09','q10','q11','q12','t09','t10','t11','t12']},
 {n:4,t:'英語で渡りあう',d:'交渉・質疑応答・面接・宇宙の話',items:['q13','q14','t13','t14','t15','t16']}];
const NEED=3;// 次のステージに進むのに必要なクリア数
const isCleared=id=>id[0]==='q'?!!(S.qst[id]&&S.qst[id].clear):(S.tStars[id]||0)>=1;
const stageCleared=st=>st.items.filter(isCleared).length;
const stageOpen=n=>n===1||stageCleared(STAGES[n-2])>=NEED;
const itemTitle=id=>id[0]==='q'?(qById(id)||{}).t:(tById(id)||{}).t;
const itemLv=id=>id[0]==='q'?(qById(id)||{}).lv:(tById(id)||{}).lv;
function questMode(){return S.qMode==='auto'?(talkLevel()>=3?'free':'choice'):S.qMode}
VIEWS.map=function(app){
 app.innerHTML=`<div class="row">${backBtn('話す練習',{name:'speak'})}</div>
 <div class="uhead"><span class="eyebrow">QUEST MAP</span><h1>会話クエスト</h1><p>返事によって話の流れが変わる会話ゲームです。<b>最後は自分の言葉で話して会話を成立させるとクリア</b>。各ステージで${NEED}つクリアすると次のステージが開きます。</p></div>
 <section class="sheet panel"><div class="row"><span class="eyebrow">返事のしかた</span>${[['auto','自動'],['choice','選択肢あり'],['free','自分の言葉だけ']].map(([k,n])=>`<button class="tab" data-qm="${k}" aria-selected="${S.qMode===k}" style="min-width:0">${n}</button>`).join('')}</div>
 <small class="muted">${S.qMode==='auto'?`いまの話す力から「${questMode()==='free'?'自分の言葉だけ':'選択肢あり'}」で始めます。`:''}選択肢ありでも、各ルートに必ず1回以上「自分の言葉で話す」場面があります。</small></section>
 <div class="map">${STAGES.map(st=>{const open=stageOpen(st.n),c=stageCleared(st);return `<section class="sheet stage ${open?'':'locked'}">
  <div class="row"><span class="stno">${st.n}</span><div><b>${esc(st.t)}</b><small style="display:block">${esc(st.d)} ・ ${c}/${st.items.length} クリア</small></div><span class="sp"></span>${open?'':'<span class="gtag">🔒 前のステージで'+NEED+'つクリア</span>'}</div>
  <div class="units">${st.items.map(id=>{const q=id[0]==='q';return `<button class="unit ${isCleared(id)?'done':''}" ${open?`data-go='${JSON.stringify(q?{name:'quest',id}:{name:'talk',id})}'`:'disabled'}><span class="no">${q?'Q':'S'}</span><span><span class="tt">${esc(itemTitle(id))}</span> ${q?'<span class="gtag">分岐クエスト</span>':'<span class="gtag">会話シーン</span>'}<span class="tg">${q?esc(qById(id).goal):esc(tById(id).goal)}</span></span>${isCleared(id)?'<span class="good">CLEAR</span>':''}</button>`}).join('')}</div></section>`}).join('')}</div>`;
 wireGo(app);
 app.querySelectorAll('[data-qm]').forEach(b=>b.onclick=()=>{S.qMode=b.dataset.qm;save();render()});
};
VIEWS.quest=function(app){
 const q=qById(V.id);if(!q)return go({name:'map'},true);
 const best=S.qst[q.id];
 app.innerHTML=`<div class="row">${RT.lc?'<button class="back" id="dr-back">← レッスン</button>':backBtn('クエストマップ',{name:'map'})}</div>
 <div class="uhead"><div class="row"><span class="gtag l${q.lv}">${ILV[q.lv-1].k}</span><span class="gtag">${esc(thName(q.theme))}</span>${best&&best.clear?'<span class="gtag l1">CLEAR</span>':''}</div><h1>${esc(q.t)}</h1><p>${esc(q.intro)}</p><p><b>クリア条件:</b>${esc(q.goal)}(自分の言葉で話す場面をすべて通る)</p></div>
 <section class="sheet panel" id="qp"></section>`;
 wireBack(app);
 runQuest(app.querySelector('#qp'),q);
};
function runQuest(P,q){
 const R={mode:questMode(),freeOk:0,freeNg:0,turns:0,path:[],xp0:S.xp};
 P.innerHTML=`<div class="row" style="margin-bottom:10px"><small>相手:<b class="en">${esc(q.partner)}</b> ・ 返事:<b>${R.mode==='free'?'自分の言葉だけ':'選択肢あり'}</b></small><span class="sp"></span><button class="btn ghost sm" id="qr">${IC.redo}最初から</button></div>
  <div class="chat" id="chat"></div><div id="turn" style="margin-top:14px"></div>`;
 P.querySelector('#qr').onclick=()=>go({name:'quest',id:q.id},true);
 const chat=P.querySelector('#chat'),turn=P.querySelector('#turn');
 const bubble=(who,en,ja)=>{const d=document.createElement('div');d.className='bub '+(who==='me'?'me':'p');const hide=who!=='me'&&S.set.hideEn;
  d.innerHTML=`<div class="who">${who==='me'?'You':esc(q.partner)} ${sayBtn(en,who==='me'?'f':q.pv)}</div><div class="e en ${hide?'jh':''}">${esc(en)}</div>${ja?jaD(esc(ja)):''}`;
  chat.appendChild(d);wireSay(d);wireJa(d);d.scrollIntoView({block:'nearest',behavior:'smooth'})};
 const partner=async(text,ja)=>{bubble('p',text,ja);turn.innerHTML=`<p class="row"><small>相手が話しています…</small><button class="btn ghost sm" id="skv">先へ</button></p>`;
  let skipped=false;const sk=turn.querySelector('#skv');const pr=speak(text,{g:q.pv});await Promise.race([pr,new Promise(r=>sk.onclick=()=>{skipped=true;stopSpeak();r()})]);await wait(200)};
 const step=async id=>{const n=q.nodes[id];if(!n)return finish();R.path.push(id);RT.qcur=n;
  await partner(n.p,n.ja);
  if(n.end)return finish(n);
  if(n.ch)return choiceTurn(n);
  if(n.free)return freeTurn(n);
  return step(n.go)};
 // 選択肢のある場面(自由回答モードではキーワードで分岐先を決める)
 const choiceTurn=(n,forceChoice)=>{R.turns++;
  if(R.mode==='free'&&!forceChoice){let fails=0;
   const ask=()=>{turn.innerHTML=`<div class="turn"><div class="want">自分の言葉で返事をしましょう</div><div id="qa"></div></div>`;
    answerBox(turn.querySelector('#qa'),{hintHtml:'言えそうな返事:<br>'+n.ch.map(c=>`<span class="en">${esc(c.en)}</span>`).join('<br>')}).then(res=>{
     if(res.text&&!res.typed){S.said++;dayRec().said++}
     const c=res.gaveUp?null:n.ch.find(c=>(res.alts||[res.text]).some(t=>keysOk(t,c.keys).ok));
     logEv({m:'qst',ok:!!c,h:res.hint,ms:res.ms,r:q.id,f:!res.gaveUp});
     if(c){addXP(res.hint?4:8);bubble('me',res.text);if(c.bad)toastFb(c.fb);return step(c.go)}
     fails++;if(res.gaveUp||fails>=2){return choiceTurn(n,true)}
     bubble('p',"Sorry, could you say that again?");speak("Sorry, could you say that again?",{g:q.pv}).then(ask)})};
   return ask()}
  const ord=shuffle(n.ch.map((_,i)=>i));
  turn.innerHTML=`<div class="turn"><div class="want">返事を選んでください</div><div class="opts one-col">${ord.map((i,k)=>`<button class="opt en" data-i="${i}"><span class="k">${k+1}</span><span>${esc(n.ch[i].en)}</span></button>`).join('')}</div><div id="tf"></div></div>`;
  turn.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const c=n.ch[+b.dataset.i];turn.querySelectorAll('.opt').forEach(x=>x.disabled=true);b.classList.add(c.bad?'ng':'ok');
   const tf=turn.querySelector('#tf');
   tf.innerHTML=`${c.bad?`<p class="hint" style="margin:10px 0 0"><b>ちょっと失礼かも:</b>${esc(c.fb||'')}</p>`:''}<div id="mp" style="margin-top:10px"></div>`;
   micPanel(tf.querySelector('#mp'),c.en,sc=>{logEv({m:'qst',ok:!c.bad,r:q.id,f:false});addXP(c.bad?1:4);bubble('me',c.en);step(c.go)},{skipLabel:'言わずに進む'});
  });
 };
 // 自分の言葉で話す場面(クリア条件)
 const freeTurn=n=>{R.turns++;let tries=0;const f=n.free;
  const ask=()=>{turn.innerHTML=`<div class="turn"><div class="want">${esc(f.ja)}</div><small class="muted">選択肢はありません。自分の言葉で言ってみましょう。</small><div id="qa"></div><div id="qf"></div></div>`;
   turn.scrollIntoView({block:'nearest',behavior:'smooth'});
   answerBox(turn.querySelector('#qa'),{hintHtml:f.hint?`<span class="en">${esc(f.hint)}</span>`:null}).then(res=>{
    if(res.text&&!res.typed){S.said++;dayRec().said++}
    const ev=evalAnswer(res,{model:f.model,alts:f.alts,keys:f.keys});const ok=ev.meaning==='ok';tries++;
    logEv({m:'qst',ok,h:ev.hint,ms:ev.ms,r:q.id+':'+R.path[R.path.length-1],f:!res.gaveUp});
    if(ok){R.freeOk++;addXP(ev.hint?6:14);bubble('me',ev.heard);if(!ev.hint)weakOk(f.model);return step(n.go)}
    const qf=turn.querySelector('#qf');turn.querySelector('#qa').innerHTML='';
    if(tries<3&&!res.gaveUp){qf.innerHTML=`<div class="fb ng"><span class="verdict" style="font-size:28px">△</span><div><div class="verdict">伝わりきっていないようです</div>${evalChips(ev,{note:false})}</div></div><div class="next"><button class="btn hl" id="qretry">もう一度言う(あと${3-tries}回)</button></div>`;
     qf.querySelector('#qretry').onclick=ask;return}
    R.freeNg++;addWeak(f.model,f.ja,'会話クエスト');
    qf.innerHTML=`<div class="fb ng"><span class="verdict" style="font-size:28px">△</span><div><div class="verdict">こう言えばOKでした</div></div></div>${modelBlock(f.model,f.alts,[])}<div id="mp2"></div>`;
    wireSay(qf);micPanel(qf.querySelector('#mp2'),f.model,()=>{bubble('me',f.model);step(n.go)},{skipLabel:'進む'});
   })};
  ask()};
 const finish=(n)=>{
  const clear=R.freeOk>0&&R.freeNg===0;
  const prev=S.qst[q.id]||{};S.qst[q.id]={clear:prev.clear||clear,n:(prev.n||0)+1,routes:[...new Set([...(prev.routes||[]),R.path.join('>')])].slice(-20)};
  const before=STAGES.map(s=>stageOpen(s.n));
  if(clear){addXP(25);confetti()}else addXP(5);
  dayRec().qst++;checkBadges();checkQuests();save();
  const opened=STAGES.find((s,i)=>!before[i]&&stageOpen(s.n));
  const routes=S.qst[q.id].routes.length;
  turn.innerHTML=`<div class="sheet result" style="border:2px solid var(--ink)">
   <div class="eyebrow">${clear?'QUEST CLEAR':'QUEST END'}</div><div class="big" style="font-size:40px;margin:8px 0">${clear?'クリア!':'あと少し'}</div>
   <div class="gain"><span>自分の言葉で話せた <b>${R.freeOk}</b> 回</span><span>獲得 <b>${S.xp-R.xp0}</b> XP</span><span>見つけたルート <b>${routes}</b></span></div>
   ${n&&n.wrap?`<p style="text-align:left">${esc(n.wrap)}</p>`:''}
   ${opened?`<p><b>新しいステージ「${esc(opened.t)}」が開きました!</b></p>`:''}
   ${clear?'':'<p style="text-align:left"><small>クリア条件:自分の言葉で話す場面を、模範解答を見ずに通ること。</small></p>'}
   <p style="text-align:left"><small>ほかの返事を選ぶと、別の展開になります。</small></p>
   <div class="row" style="justify-content:center"><button class="btn ghost" id="qa2">${IC.redo}別のルートで</button><button class="btn hl" id="qmap">${RT.lc?'レッスンにもどる':'マップへ'}</button></div></div>`;
  turn.querySelector('#qa2').onclick=()=>go({name:'quest',id:q.id},true);
  turn.querySelector('#qmap').onclick=()=>{if(RT.lc)RT.lc.done({ok:clear?1:0,n:1});else go({name:'map'})};
  turn.scrollIntoView({block:'nearest',behavior:'smooth'});
 };
 turn.innerHTML=`<div class="mic" style="align-items:center;text-align:center"><p style="margin:0">音声が流れます。準備ができたらスタート!</p><button class="btn hl" id="qst-go">${IC.play}スタート</button></div>`;
 turn.querySelector('#qst-go').onclick=()=>{turn.innerHTML='';step(q.start)};
}
function toastFb(fb){if(fb)toast('ちょっと失礼かも:'+esc(fb))}

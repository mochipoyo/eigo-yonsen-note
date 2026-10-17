// ===== 会話フレーズの間隔反復 =====
const phById=id=>PHRASES.find(p=>p.id===id);
const phDue=()=>PHRASES.filter(p=>{const s=S.ph[p.id];return s&&(s.due||'')<=today()});
const phNew=()=>PHRASES.filter(p=>!S.ph[p.id]&&inThemes(p)).sort((a,b)=>a.lv-b.lv);
function startPhrases(opt={}){const due=phDue().sort((a,b)=>(S.ph[a.id].due||'').localeCompare(S.ph[b.id].due||''));
 const nNew=opt.nNew??(due.length>=8?0:3);const items=[...due.slice(0,opt.n||10).map(p=>({p,isNew:false})),...phNew().slice(0,nNew).map(p=>({p,isNew:true}))];
 if(!items.length){toast('いま復習するフレーズはありません');return false}
 RT.drill={kind:'ph',items,i:0,res:[],xp0:S.xp,stage:items[0].isNew?'learn':'recall'};go({name:'drill'});return true}
VIEWS.phrases=function(app){
 const due=phDue().length,learned=Object.keys(S.ph).length,mast=Object.values(S.ph).filter(s=>s.b>=4).length;
 const byTh=THEMES.map(t=>({t,list:PHRASES.filter(p=>p.theme===t.k)}));
 app.innerHTML=`<div class="row">${backBtn('話す練習',{name:'speak'})}</div>
 <div class="uhead"><span class="eyebrow">PHRASES</span><h1>フレーズ復習</h1><p>覚えたフレーズを、毎回ちがう場面で使って思い出します。自力で言えたときだけ次の復習までの間隔が大きくのびます(ヒントや答えを見たときは短め)。</p></div>
 <section class="sheet panel"><div class="stats" style="margin:0 0 12px"><span><b>${due}</b>きょう復習</span><span><b>${learned}</b>学習ずみ</span><span><b>${mast}</b>定着</span><span><b>${PHRASES.length}</b>全フレーズ</span></div>
  <div class="row"><button class="btn hl" id="ph-go">${due?'復習をはじめる':'新しいフレーズを覚える'}</button>${due?'<button class="btn ghost" id="ph-new">新しいフレーズだけ</button>':''}</div>
  <small class="muted" style="display:block;margin-top:8px">復習の目安:翌日 → 3日後 → 7日後 → 16日後 → 35日後(すばやく言えたら少し長く、時間がかかったら短く調整)</small></section>
 ${byTh.map(({t,list})=>`<section class="sheet panel"><h3 class="eyebrow">${esc(t.n)}</h3><div class="wl" style="margin-top:6px">${list.map(p=>{const s=S.ph[p.id];const b=s?s.b:0;return `<div class="wi">${sayBtn(p.sits[0].model)}<div><span class="w">${esc(p.en)}</span><span class="m">${esc(p.ja)}</span></div><span class="dots" title="箱${b}">${[1,2,3,4,5].map(i=>`<i class="${i<=b?'on':''}"></i>`).join('')}</span></div>`}).join('')}</div></section>`).join('')}`;
 wireGo(app);wireSay(app);
 app.querySelector('#ph-go').onclick=()=>startPhrases();
 const nb=app.querySelector('#ph-new');if(nb)nb.onclick=()=>{const items=phNew().slice(0,3).map(p=>({p,isNew:true}));if(!items.length)return toast('新しいフレーズはもうありません');RT.drill={kind:'ph',items,i:0,res:[],xp0:S.xp,stage:'learn'};go({name:'drill'})};
};
function phView(app,D){
 if(D.i>=D.items.length)return phEnd(app,D);
 const {p,isNew}=D.items[D.i];const st=S.ph[p.id];const N=D.items.length;
 if(D.stage==='learn'){
  const s0=p.sits[0];
  app.innerHTML=`${drillHead('フレーズ ・ 新しく覚える',D.i,N,D.res)}
  <section class="sheet panel"><div class="row"><span class="gtag">${esc(thName(p.theme))}</span><span class="gtag l4">NEW</span></div>
   <div class="ex" style="margin-top:10px">${sayBtn(s0.model)}<div><div class="e en" style="font-size:22px"><span class="mk">${esc(p.en)}</span></div><div class="j">${esc(p.ja)}</div></div></div>
   <p class="trap">${esc(p.tip)}</p>
   <div class="blk"><h3>使う場面の例(${esc(s0.place)})</h3>
    <div class="chat"><div class="bub p"><div class="who">相手 ${sayBtn(s0.p,'m')}</div><div class="e en">${esc(s0.p)}</div></div>
    <div class="bub me"><div class="who">You ${sayBtn(s0.model)}</div><div class="e en">${esc(s0.model)}</div><div class="j">${esc(s0.ja)}</div></div></div></div>
   <div class="next"><button class="btn hl" id="ph-try">別の場面で言ってみる →</button></div></section>`;
  wireBack(app);wireSay(app);setTimeout(()=>speak(s0.model),300);
  app.querySelector('#ph-try').onclick=()=>{D.stage='recall';D.sit=1;render()};return}
 // 思い出して話す(前回と別の場面を使う)
 const si=D.sit!=null?D.sit:((st&&st.lastSit!=null?st.lastSit+1:Math.floor(Math.random()*3))%3);D.sit=si;
 const sit=p.sits[si];let pEnd=null;
 app.innerHTML=`${drillHead('フレーズ ・ 思い出して話す',D.i,N,D.res)}
 <section class="sheet panel">
  <div class="row"><span class="gtag">${esc(sit.place)}</span><span class="gtag">${esc(thName(p.theme))}</span>${isNew?'':`<small class="muted">前回の復習から思い出しましょう</small>`}</div>
  <div class="one" style="margin-top:8px">${esc(sit.ja)}</div>
  <div class="qplay"><button class="playbig" id="ph-play" aria-label="相手のセリフを聞く">${IC.play}</button><div><b>相手のセリフを聞いて、英語で返しましょう</b><small style="display:block"><button class="linkbtn" id="ph-showp">相手のセリフを表示</button></small></div></div>
  <div id="ph-p" class="qtext en" hidden>${esc(sit.p)}</div>
  <div id="ph-ans"></div><div id="ph-res"></div>
 </section>`;
 wireBack(app);
 const $=s=>app.querySelector(s);
 const play=async()=>{pEnd=null;await speak(sit.p,{g:'m'});pEnd=Date.now()};
 $('#ph-play').onclick=play;$('#ph-showp').onclick=()=>{$('#ph-p').hidden=false};setTimeout(play,250);
 answerBox($('#ph-ans'),{hintHtml:`<span class="en">${esc(p.en)}</span> <small>${esc(p.ja)}</small>`,startAt:()=>pEnd}).then(res=>{
  const ev=evalAnswer(res,{model:sit.model,keys:[...p.core,...sit.keys]});
  const coreOk=res.text&&keysOk(ev.heard,p.core).ok;
  const ok=ev.meaning==='ok';
  const recall=ok||(coreOk&&ev.meaning==='part');
  const ns=S.ph[p.id]=srsUpdate(S.ph[p.id],{recall,hint:ev.hint||!ok,ms:ev.ms});ns.lastSit=si;
  if(!isNew)dayRec().rv++;
  logEv({m:'ph',ok,ms:ev.ms,h:ev.hint,r:p.id,f:!res.gaveUp});
  if(res.text&&!res.typed){S.said++;dayRec().said++}
  if(!recall)addWeak(sit.model,sit.ja,'フレーズ');else if(ok&&!ev.hint)weakOk(sit.model);
  const gain=ok&&!ev.hint?12:recall?5:1;addXP(gain);D.res.push(ok&&!ev.hint);
  const days=Math.max(0,Math.round((new Date(ns.due)-new Date(today()))/864e5));
  $('#ph-ans').innerHTML='';
  $('#ph-res').innerHTML=`<div class="fb ${ok?'ok':'ng'}">${ok?hana:'<span class="verdict" style="font-size:30px">△</span>'}<div>
   <div class="verdict">${ok&&!ev.hint?'自力で言えました!':ok?'言えました(ヒントあり)':coreOk?'フレーズは使えています':'もう一度覚え直しましょう'} <small>+${gain} XP</small></div>
   ${evalChips(ev)}<div class="tr">次の復習:<b>${days<=0?'きょう':days===1?'あした':days+'日後'}</b>(記憶の箱 ${ns.b})</div></div></div>
  <div class="tr"><span class="en">${esc(sit.p)}</span></div>
  ${modelBlock(sit.model,[],[])}
  <p class="trap"><span class="en">${esc(p.en)}</span> … ${esc(p.tip)}</p>
  <div class="next"><button class="btn hl" id="ph-next">${D.i+1<N?'つぎへ →':'結果を見る'}</button></div>`;
  wireSay($('#ph-res'));
  $('#ph-next').onclick=()=>{D.i++;D.sit=null;D.stage=D.items[D.i]&&D.items[D.i].isNew?'learn':'recall';render();window.scrollTo({top:0})};
 });
}
function phEnd(app,D){const n=D.res.length,ok=D.res.filter(Boolean).length;
 if(!D.ended){D.ended=true;save();if(RT.lc)return RT.lc.done({ok,n})}
 app.innerHTML=`<div class="row">${backBtn('フレーズ復習',{name:'phrases'})}</div>
 <section class="sheet result"><div class="eyebrow">フレーズ復習</div><div class="big" style="margin-top:10px">${ok}<small style="font-size:22px"> / ${n}</small></div><p>ヒントなしで言えた数です。</p>
 <div class="gain"><span>獲得 <b>${S.xp-D.xp0}</b> XP</span><span>残りの復習 <b>${phDue().length}</b></span></div>
 <div class="row" style="justify-content:center">${phDue().length?'<button class="btn hl" id="again">続けて復習</button>':''}<button class="btn ghost" data-go='{"name":"phrases"}'>一覧へ</button></div></section>`;
 wireGo(app);const a=app.querySelector('#again');if(a)a.onclick=()=>startPhrases({nNew:0});
}

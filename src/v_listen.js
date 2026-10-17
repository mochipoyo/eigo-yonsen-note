// ===== 耳から英語(リスニング)・聞き流し =====
const lisById=id=>LISTEN.find(x=>x.id===id);
const LVC={W:'f',M:'m',W2:'f',M2:'m'};
const LRATE=[0.92,1,1.08,1.1];// 難易度ごとの読み上げ速度(上級以上は自然な速さに近づける)
function pickListen(lv,n){const pool=LISTEN.filter(l=>l.lv===lv&&inThemes(l));const base=pool.length?pool:LISTEN.filter(l=>l.lv===lv);
 const rev=base.filter(l=>S.lrev.includes(l.id));
 const rest=base.filter(l=>!S.lrev.includes(l.id)).map(l=>({l,p:Math.random()+((S.lis[l.id]||{}).ok?1.5:0)+((S.lis[l.id]||{}).n?0.5:0)})).sort((a,b)=>a.p-b.p).map(o=>o.l);
 return [...rev,...rest].slice(0,n)}
function startListen(opt={}){const lv=opt.lv||S.lisLv||1;const items=opt.items||pickListen(lv,opt.n||5);if(!items.length)return toast('問題がありません');
 RT.drill={kind:'lis',lv,items,i:0,res:[],xp0:S.xp};go({name:'drill'})}
VIEWS.listen=function(app){
 const lv=S.lisLv||1;const st=ILV.map(l=>{const ids=LISTEN.filter(x=>x.lv===l.n).map(x=>x.id);const d=ids.filter(i=>S.lis[i]);return {...l,all:ids.length,done:d.length,ok:d.filter(i=>S.lis[i].ok).length}});
 app.innerHTML=`<div class="row">${backBtn('話す練習',{name:'speak'})}</div>
 <div class="uhead"><span class="eyebrow">LISTENING</span><h1>耳から英語</h1><p>はじめは英文も訳も見ずに、音だけで理解します。質問も英語です。答えたあとに英文 → 日本語訳 → もう一度聞く、の順で確認します。</p></div>
 <section class="sheet panel">
  <div class="tabs">${st.map(l=>`<button class="tab" data-lv="${l.n}" aria-selected="${lv===l.n}">${l.k}<small>${['短い1文','2〜3文の会話','自然な速さ','長めの会話'][l.n-1]}</small></button>`).join('')}</div>
  <p class="muted" style="margin:8px 0">${st[lv-1].done} / ${st[lv-1].all} 問に挑戦ずみ ・ 聞き取り復習 ${S.lrev.length} 問</p>
  <div class="row"><button class="btn hl" id="ls-go">${IC.play}5問はじめる</button>${S.lrev.length?'<button class="btn ghost" id="ls-rev">聞き取れなかった問題を復習</button>':''}</div>
 </section>
 <section class="sheet panel"><h3 class="eyebrow">聞き流し</h3><p style="margin:4px 0 10px">英語を流しっぱなしにするモードです。正解・不正解は記録せず、学習時間は「聞き流し」として別に数えます(これまで ${Math.round((S.passive||0)/60)} 分)。</p>
  <button class="btn" data-go='{"name":"passive"}'>聞き流しをはじめる</button></section>`;
 wireGo(app);
 app.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{S.lisLv=+b.dataset.lv;save();render()});
 app.querySelector('#ls-go').onclick=()=>startListen();
 const rv=app.querySelector('#ls-rev');if(rv)rv.onclick=()=>startListen({items:S.lrev.map(lisById).filter(Boolean).slice(0,8)});
};
function lisAudio(it,slow){return it.lines.map(l=>({text:l.en,g:LVC[l.s]||'f'}))}
async function playLines(it,slow){stopAllAudio();const my=speakId;const r=slow?0.75:LRATE[it.lv-1];
 for(const l of it.lines){if(my!==speakId)return;await speakRate(l.en,r);if(my!==speakId)return;await wait(380)}}
// 声を話者ごとに変えるため speakRate を拡張
function lisView(app,D){
 if(D.i>=D.items.length)return lisEnd(app,D);
 const it=D.items[D.i];const N=D.items.length;const ord=shuffle(it.o.map((_,i)=>i));
 let answered=false;
 app.innerHTML=`${drillHead('耳から英語 ・ '+ILV[it.lv-1].k,D.i,N,D.res)}
 <section class="sheet panel">
  <div class="row" style="justify-content:space-between"><span class="gtag">${esc(thName(it.theme))}</span><small>${D.i+1} / ${N}</small></div>
  <div class="qplay"><button class="playbig" id="l-play" aria-label="音声を聞く">${IC.play}</button><div><b>まずは音だけで聞きましょう</b><small style="display:block">何度聞いてもOK。${it.lines.length>1?`${new Set(it.lines.map(l=>l.s)).size}人の会話です。`:''}</small></div></div>
  <div class="q en" style="margin-top:10px">${esc(it.q)}</div>
  <div class="opts one-col">${ord.map((oi,k)=>`<button class="opt en" data-i="${oi}"><span class="k">${'ABCD'[k]}</span><span>${esc(it.o[oi])}</span></button>`).join('')}</div>
  <div id="l-res"></div>
 </section>`;
 wireBack(app);
 const $=s=>app.querySelector(s);
 const play=()=>playLinesV(it,false);
 $('#l-play').onclick=play;setTimeout(play,250);
 const t0=Date.now();
 app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(answered)return;answered=true;const oi=+b.dataset.i;const ok=oi===it.a;
  app.querySelectorAll('.opt').forEach(o=>{o.disabled=true;if(+o.dataset.i===it.a)o.classList.add('ok')});if(!ok)b.classList.add('ng');
  const st=S.lis[it.id]=S.lis[it.id]||{n:0};st.n++;st.ok=ok;st.last=today();
  if(ok)S.lrev=S.lrev.filter(x=>x!==it.id);else if(!S.lrev.includes(it.id))S.lrev.push(it.id);
  if(!ok)it.lines.forEach(l=>{if(it.key&&l.en.toLowerCase().includes(it.key.toLowerCase()))addWeak(l.en,'','リスニング')});
  logEv({m:'lis',ok,ms:Date.now()-t0,r:it.id});addXP(ok?8:1);D.res.push(ok);
  const keyRe=it.key?new RegExp('('+it.key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','i'):null;
  $('#l-res').innerHTML=`<div class="fb ${ok?'ok':'ng'}">${ok?hana:'<span class="verdict" style="font-size:30px">✕</span>'}<div><div class="verdict">${ok?'聞き取れました!':'おしい!'}</div><div>${esc(it.why)}</div>${ok?'':'<div class="tr">この問題は「聞き取り復習」に入りました。</div>'}</div></div>
   <div class="blk"><div class="row"><h3 style="margin:0">英文を確認</h3><span class="sp"></span><button class="btn ghost sm" id="l-again">${IC.play}もう一度聞く</button><button class="btn ghost sm" id="l-slow">${IC.slow}ゆっくり</button></div>
   <div class="chat" style="margin-top:8px">${it.lines.map(l=>`<div class="bub ${l.s.startsWith('W')?'p':'me'}" style="align-self:${l.s.startsWith('W')?'flex-start':'flex-end'}"><div class="who">${esc(l.s.replace(/2$/,'′'))} ${sayBtn(l.en,LVC[l.s])}</div><div class="e en">${keyRe?esc(l.en).replace(keyRe,'<span class="mk">$1</span>'):esc(l.en)}</div></div>`).join('')}</div></div>
   <details class="more" style="margin-top:10px"><summary>日本語訳を見る</summary><div class="trn">${esc(it.ja)}</div></details>
   <div class="row" style="margin-top:8px"><button class="btn ghost sm" id="l-weak">この英文を苦手に保存</button></div>
   <div class="next"><button class="btn hl" id="l-next">${D.i+1<N?'つぎへ →':'結果を見る'}</button></div>`;
  wireSay($('#l-res'));
  $('#l-again').onclick=()=>playLinesV(it,false);$('#l-slow').onclick=()=>playLinesV(it,true);
  $('#l-weak').onclick=()=>{it.lines.forEach(l=>addWeak(l.en,it.lines.length===1?it.ja:'','リスニング'));$('#l-weak').disabled=true;$('#l-weak').textContent='保存しました'};
  $('#l-next').onclick=()=>{D.i++;render();window.scrollTo({top:0})};
 });
}
async function playLinesV(it,slow){stopAllAudio();const my=speakId;const r=(slow?0.75:LRATE[it.lv-1]);
 for(const l of it.lines){if(my!==speakId)return;const keep=S.set.rate;S.set.rate=keep*r;const p=speak(l.en,{g:LVC[l.s]||'f'});S.set.rate=keep;await p;if(my!==speakId)return;await wait(380)}}
function lisEnd(app,D){const n=D.res.length,ok=D.res.filter(Boolean).length;
 if(!D.ended){D.ended=true;
  if(n>=4&&ok/n>=0.8&&(S.lisLv||1)<4&&D.lv===(S.lisLv||1)){S.lisLv=(S.lisLv||1)+1;D.msg='よく聞き取れています。次は「'+ILV[S.lisLv-1].k+'」に挑戦しましょう。'}
  save();if(RT.lc)return RT.lc.done({ok,n})}
 app.innerHTML=`<div class="row">${backBtn('耳から英語',{name:'listen'})}</div>
 <section class="sheet result"><div class="eyebrow">耳から英語</div><div class="big" style="margin-top:10px">${ok}<small style="font-size:22px"> / ${n}</small></div>${D.msg?`<p><b>${esc(D.msg)}</b></p>`:''}
 <div class="row" style="justify-content:center"><button class="btn hl" id="again">${IC.redo}もう5問</button><button class="btn ghost" data-go='{"name":"listen"}'>もどる</button></div></section>`;
 wireGo(app);app.querySelector('#again').onclick=()=>startListen();
}
// ---- 聞き流し(連続再生)。能動的な練習とは別に、時間だけ記録する ----
VIEWS.passive=function(app){
 let on=false,stopFlag=false,startT=0;
 const lv=S.lisLv||1;
 app.innerHTML=`<div class="row">${backBtn('耳から英語',{name:'listen'})}</div>
 <div class="uhead"><span class="eyebrow">PASSIVE LISTENING</span><h1>聞き流し</h1><p>選んだテーマの英文を順番に流し続けます。画面を開いている間だけ再生されます。</p></div>
 <section class="sheet panel">
  <div class="row"><label class="tg">レベル <select id="pv-lv">${ILV.map(l=>`<option value="${l.n}" ${lv===l.n?'selected':''}>${l.k}</option>`).join('')}</select></label>
   <label class="tg"><input type="checkbox" id="pv-ja" ${S.set.pvJa?'checked':''}> 訳も表示</label></div>
  <div class="row" style="margin-top:12px"><button class="btn hl" id="pv-go">${IC.play}再生</button><button class="btn ghost" id="pv-stop" disabled>停止</button><small id="pv-t" class="muted"></small></div>
  <div id="pv-now" class="shline" style="margin-top:14px"></div>
 </section>`;
 wireGo(app);const $=s=>app.querySelector(s);
 $('#pv-lv').onchange=e=>{S.lisLv=+e.target.value;save()};
 $('#pv-ja').onchange=e=>{S.set.pvJa=e.target.checked;save()};
 const finish=()=>{if(!on)return;on=false;stopFlag=true;stopSpeak();S.passive=(S.passive||0)+Math.round((Date.now()-startT)/1000);save();if($('#pv-go')){$('#pv-go').disabled=false;$('#pv-stop').disabled=true}};
 RT.passiveStop=finish;
 $('#pv-stop').onclick=finish;
 $('#pv-go').onclick=async()=>{if(on)return;on=true;stopFlag=false;startT=Date.now();$('#pv-go').disabled=true;$('#pv-stop').disabled=false;
  let wl=null;try{wl=await navigator.wakeLock?.request('screen')}catch(e){}
  const items=shuffle(LISTEN.filter(l=>l.lv===(S.lisLv||1)&&inThemes(l)).concat(LISTEN.filter(l=>l.lv===(S.lisLv||1)&&!inThemes(l)))).slice(0,30);
  for(const it of items){if(stopFlag)break;const nw=$('#pv-now');if(!nw)break;
   nw.innerHTML=`<div class="en shen">${it.lines.map(l=>esc(l.en)).join('<br>')}</div>${S.set.pvJa?`<div class="j">${esc(it.ja)}</div>`:''}`;
   const t=$('#pv-t');if(t)t.textContent='再生中 '+Math.round((Date.now()-startT)/60000)+'分';
   await playLinesV(it,false);if(stopFlag)break;await wait(1200)}
  try{wl&&wl.release()}catch(e){}
  finish()};
};

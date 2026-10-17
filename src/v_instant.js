// ===== 瞬間英会話 =====
const insById=id=>INSTANT.find(x=>x.id===id);
function prio(st,lvGap){// 出題の優先度(高いほど先に出す)
 let p=Math.random()*0.8;
 if(!st)p+=1;else{if(st.bad)p+=3;if(st.slow)p+=1.5;if(st.hint)p+=1;if((st.due||'')<=today())p+=2;if((st.streak||0)>=3&&(st.due||'')>today())p-=4}
 return p-(lvGap>1?2.5:lvGap)*0.8}
function pickInstant(n,lv){const pool=INSTANT.filter(inThemes);const base=pool.length?pool:INSTANT;
 return [...base].map(it=>({it,p:prio(S.ins[it.id],Math.abs(it.lv-lv))})).sort((a,b)=>b.p-a.p).slice(0,n).map(x=>x.it)}
function startInstant(opt={}){const lv=opt.lv||S.insLv||1;const n=opt.n||8;
 RT.drill={kind:'ins',lv,items:opt.items||pickInstant(n,lv),i:0,res:[],xp0:S.xp};go({name:'drill'})}
function drillHead(title,i,n,res){return `<div class="row">${RT.lc?`<button class="back" id="dr-back">← レッスン</button>`:backBtn('もどる',{name:'speak'})}<span class="sp"></span><span class="eyebrow">${esc(title)}</span></div>
 <div class="pips">${[...Array(n)].map((_,k)=>`<i class="${k<i?(res[k]?'ok':'ng'):k===i?'cur':''}"></i>`).join('')}</div>`}
function wireBack(app){wireGo(app);const b=app.querySelector('#dr-back');if(b)b.onclick=()=>{RT.lc&&RT.lc.leave()}}
VIEWS.drill=function(app){const D=RT.drill;if(!D)return go({name:'home'},true);
 ({ins:insView,ph:phView,lis:lisView,sh:shView})[D.kind](app,D)};

function insView(app,D){
 if(D.i>=D.items.length)return insEnd(app,D);
 const it=D.items[D.i];const lv=D.lv;const N=D.items.length;
 let audioEnd=null,peek=false,showJa=false;
 const limit=lv===4?(it.lv<=2?8:12):0;
 app.innerHTML=`${drillHead('瞬間英会話 ・ '+ILV[lv-1].k,D.i,N,D.res)}
 <section class="sheet panel">
  <div class="row" style="justify-content:space-between"><span><span class="gtag">${esc(thName(it.theme))}</span> <span class="gtag l${it.lv}">${ILV[it.lv-1].k}</span></span><small>${D.i+1} / ${N}</small></div>
  <div class="qplay"><button class="playbig" id="i-play" aria-label="質問をもう一度聞く">${IC.play}</button>
   <div><b>英語の質問を聞いて、英語で答えましょう</b><small style="display:block">${lv===4?'音声だけ。制限時間内に答えましょう。':'もう一度聞くときはボタンを押します'}</small></div></div>
  <div class="row">${lv<4?`<button class="btn ghost sm" id="i-peek">英文を見る</button>`:''}${lv<4?`<button class="btn ghost sm" id="i-ja">日本語訳</button>`:''}<button class="btn ghost sm" id="i-slow">${IC.slow}ゆっくり</button></div>
  <div id="i-q" class="qtext" hidden><span class="en">${esc(it.q)}</span></div>
  <div id="i-qja" class="qja" hidden>${esc(it.qja)}</div>
  ${lv===2?`<div class="hintbox"><small>言うこと</small> ${esc(it.hint)}</div>`:''}
  <div id="i-opts"></div>
  <div id="i-ans" style="margin-top:12px"></div>
  <div id="i-res"></div>
 </section>`;
 wireBack(app);wireSay(app);
 const $=s=>app.querySelector(s);
 const play=async slow=>{audioEnd=null;const ok=await speak(it.q,{g:D.i%2?'m':'f',slow});audioEnd=Date.now()};
 $('#i-play').onclick=()=>play(false);$('#i-slow').onclick=()=>play(true);
 if($('#i-peek'))$('#i-peek').onclick=()=>{peek=true;$('#i-q').hidden=false;$('#i-peek').disabled=true};
 if($('#i-ja'))$('#i-ja').onclick=()=>{showJa=true;$('#i-qja').hidden=false;$('#i-ja').disabled=true};
 setTimeout(()=>play(false),250);
 const spec={model:it.model,alts:it.alts,keys:it.keys,loose:it.loose,free:lv>=3};
 const answerNow=async()=>{
  const res=await answerBox($('#i-ans'),{hintHtml:lv>=3?`<small>言うこと</small> ${esc(it.hint)}`:null,startAt:()=>audioEnd,timeLimit:limit});
  // 上級以上で英文・訳を見た場合もヒント扱い
  if(lv>=3&&(peek||showJa))res.hint=true;if(lv===2)res.hint=true;
  let ev=evalAnswer(res,{...spec,free:spec.free&&!res.hint});
  if(spec.free&&!res.hint&&ev.meaning!=='ok'&&res.text){$('#i-res').innerHTML='<p class="muted">判定中…</p>';const a=await aiEvaluate(it.q,ev.heard,it.model);if(a){ev.meaning=a.ok?'ok':'ng';ev.ai=true;ev.aiBetter=a.better}}
  showResult(ev,res);
 };
 if(lv===1){// 初級: 3択で選んでから声に出す
  const ord=shuffle([0,1,2]);
  $('#i-opts').innerHTML=`<div class="opts one-col">${ord.map((oi,k)=>`<button class="opt en" data-i="${oi}"><span class="k">${k+1}</span><span>${esc(it.opts.o[oi])}</span></button>`).join('')}</div>`;
  let miss=0;
  $('#i-opts').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const oi=+b.dataset.i;
   if(oi!==it.opts.a){miss++;b.classList.add('ng');b.disabled=true;return}
   b.classList.add('ok');$('#i-opts').querySelectorAll('.opt').forEach(x=>x.disabled=true);
   $('#i-ans').innerHTML='';const box=document.createElement('div');$('#i-ans').appendChild(box);
   box.innerHTML=`<p style="margin:0 0 8px"><b class="good">正解!</b> 選んだ英文を、声に出して言ってみましょう。</p><div></div>`;
   answerBox(box.lastElementChild,{startAt:()=>Date.now()-0}).then(res=>{res.hint=true;const ev=evalAnswer(res,spec);ev.choiceMiss=miss;showResult(ev,res,true)});
  });
 }else answerNow();
 function showResult(ev,res,choice){
  const ok=ev.meaning==='ok'||ev.meaning==='free';
  const slow=ev.ms>8000||(limit&&ev.ms>limit*1000);
  const st=S.ins[it.id]=srsUpdate(S.ins[it.id],{recall:ok&&!choice,hint:ev.hint||choice,ms:ev.ms});
  st.bad=!ok;st.slow=slow;st.hint=ev.hint;
  logEv({m:'ins',ok,ms:ev.ms,h:ev.hint||choice,r:it.id,f:!choice&&!res.gaveUp});
  if(res.text&&!res.typed){S.said++;dayRec().said++}
  if(!ok||slow||(ev.hint&&D.lv>=3))addWeak(it.model,it.qja,'瞬間英会話');else if(!ev.hint)weakOk(it.model);
  const gain=ok?(ev.hint?4:10)+(ev.ms&&ev.ms<3000?3:0):1;addXP(gain);D.res.push(ok&&!ev.hint);
  $('#i-ans').innerHTML='';
  $('#i-res').innerHTML=`<div class="fb ${ok?'ok':'ng'}">${ok?hana:'<span class="verdict" style="font-size:30px">△</span>'}<div>
   <div class="verdict">${ok?(ev.meaning==='free'?'自分の言葉で答えられました':'伝わります!'):res.gaveUp?'模範解答を確認しましょう':'もう少し!'}<small> +${gain} XP</small></div>
   ${evalChips(ev)}${ev.meaning==='free'?'<small class="muted">ヒントなしの自由回答です。内容は自動では細かく判定できないため、下の模範解答と比べてみてください。</small>':''}
   ${ev.aiBetter?`<div class="tr">AIの提案:<span class="en">${esc(ev.aiBetter)}</span></div>`:''}
  </div></div>
  <div class="tr"><span class="en">Q: ${esc(it.q)}</span><br>${esc(it.qja)}</div>
  ${modelBlock(it.model,it.alts,it.para)}
  ${it.tip?`<p class="trap">${esc(it.tip)}</p>`:''}
  <div class="next">${!ok&&res.text?'<button class="btn ghost" id="i-self">合っていたと思う</button>':''}<button class="btn hl" id="i-next">${D.i+1<N?'つぎへ →':'結果を見る'}</button></div>`;
  wireSay($('#i-res'));
  const sb=$('#i-self');if(sb)sb.onclick=()=>{// 音声認識の聞き違いなどを自己申告(ヒント扱いで記録)
   st.bad=false;S.ins[it.id]=srsUpdate(st,{recall:true,hint:true,ms:ev.ms});D.res[D.res.length-1]=false;save();sb.disabled=true;sb.textContent='記録しました(ヒントあり扱い)'};
  $('#i-next').onclick=()=>{D.i++;render();window.scrollTo({top:0})};
  $('#i-next').scrollIntoView({block:'nearest',behavior:'smooth'});
 }
}
function insEnd(app,D){
 const n=D.res.length,ok=D.res.filter(Boolean).length;
 if(!D.ended){D.ended=true;
  // 習熟度に応じて難易度を自動で上げ下げ
  if(S.insAuto&&n>=5){const msArr=D.items.map(it=>S.ins[it.id]).filter(Boolean);const r=ok/n;
   if(r>=0.8&&S.insLv<4){S.insLv++;D.lvMsg=`よくできています。次回から「${ILV[S.insLv-1].k}」に上がります。`}
   else if(r<=0.3&&S.insLv>1){S.insLv--;D.lvMsg=`次回は「${ILV[S.insLv-1].k}」で練習しましょう。`}}
  save();if(RT.lc)return RT.lc.done({ok,n})}
 app.innerHTML=`<div class="row">${backBtn('話す練習',{name:'speak'})}</div>
 <section class="sheet result"><div class="eyebrow">瞬間英会話</div><div class="big" style="margin-top:10px">${ok}<small style="font-size:22px"> / ${n}</small></div>
 <p>ヒントなしで伝わった数です。${D.lvMsg?'<br><b>'+esc(D.lvMsg)+'</b>':''}</p>
 <div class="gain"><span>獲得 <b>${S.xp-D.xp0}</b> XP</span><span>苦手リスト <b>${S.weak.length}</b></span></div>
 <div class="row" style="justify-content:center"><button class="btn hl" id="again">${IC.redo}もう1セット</button><button class="btn ghost" data-go='{"name":"speak"}'>話す練習へ</button></div></section>`;
 wireGo(app);app.querySelector('#again').onclick=()=>startInstant();
}

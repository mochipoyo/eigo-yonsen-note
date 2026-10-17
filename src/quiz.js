// ===== quiz: 4択(3択)問題の共通エンジン =====
// startQuiz({title, back, items:[{s,c,a,why,ja,ctx,audio,hideOpts,ref,label}], xp, onEnd(res), retry()})
function startQuiz(cfg){RT.quiz={cfg,i:0,res:[],combo:0,xp:0,answered:false};go({name:'quiz'})}
const missKey=r=>JSON.stringify(r);
function noteMiss(ref,ok){if(!ref)return;const k=missKey(ref);const i=S.miss.findIndex(m=>missKey(m)===k);
 if(!ok&&i<0){S.miss.push(ref);if(S.miss.length>300)S.miss.shift()}
 if(ok&&i>=0)S.miss.splice(i,1)}
VIEWS.quiz=function(app){
 const Q=RT.quiz;if(!Q)return go({name:'home'},true);
 const {cfg}=Q;const N=cfg.items.length;
 if(Q.i>=N)return quizResult(app);
 const it=cfg.items[Q.i];
 const order=it.keep?it.c.map((_,i)=>i):shuffle(it.c.map((_,i)=>i));Q.order=order;
 const keys=it.hideOpts?['A','B','C','D']:['1','2','3','4'];
 app.innerHTML=`
 <div class="row">${backBtn(cfg.backLabel||'もどる',cfg.back||{name:'home'})}<span class="sp"></span><span class="eyebrow">${esc(cfg.title)}</span></div>
 <section class="sheet panel">
  <div class="pips">${cfg.items.map((_,k)=>`<i class="${k<Q.i?(Q.res[k]?'ok':'ng'):k===Q.i?'cur':''}"></i>`).join('')}</div>
  <div class="qhead"><span>${it.label?esc(it.label)+' ・ ':''}${Q.i+1} / ${N}</span><span class="combo">${Q.combo>=2?Q.combo+' 連続!':''}</span></div>
  ${it.ctx?`<div style="margin-bottom:14px">${it.ctx}</div>`:''}
  ${it.audio?`<div class="lis" style="margin-bottom:10px"><button class="btn hl" id="qplay">${IC.play}聞く</button><button class="btn ghost sm" id="qslow">${IC.slow}ゆっくり</button><small>${it.audioNote||''}</small></div>`:''}
  <div class="q ${it.jaQ?'':'en'}">${it.s}</div>
  <div class="opts ${it.oneCol||it.c.some(x=>x.length>28)?'one-col':''}">${order.map((oi,k)=>`<button class="opt ${it.jaOpt?'':'en'}" data-i="${oi}"><span class="k">${keys[k]}</span><span class="ot">${it.hideOpts?'<small>(音声で流れます)</small>':esc(it.c[oi])}</span></button>`).join('')}</div>
  <div id="fbx"></div>
 </section>`;
 wireGo(app);wireSay(app);
 const play=slow=>{if(!it.audio)return;const seq=it.audio.map(a=>({...a}));if(slow){stopSpeak();(async()=>{const my=speakId;for(const a of seq){if(my!==speakId)return;await speak(a.text,{g:a.g,slow:true});await wait(350)}})()}else speakSeq(seq)};
 if(it.audio){app.querySelector('#qplay').onclick=()=>play(false);app.querySelector('#qslow').onclick=()=>play(true);if(it.autoplay!==false&&S.set.autoplay!==false)setTimeout(()=>play(false),250)}
 app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>answer(+b.dataset.i,b));
 function answer(ci,btn){if(Q.answered)return;Q.answered=true;const ok=ci===it.a;
  app.querySelectorAll('.opt').forEach(o=>{o.disabled=true;const oi=+o.dataset.i;if(it.hideOpts)o.querySelector('.ot').textContent=it.c[oi];if(oi===it.a)o.classList.add('ok')});
  if(!ok)btn.classList.add('ng');
  S.answered++;if(ok){S.correct++;Q.combo++;S.maxCombo=Math.max(S.maxCombo,Q.combo)}else Q.combo=0;
  noteMiss(it.ref,ok);logEv({m:cfg.mode||'gram',ok,r:it.ref?JSON.stringify(it.ref):(cfg.title+Q.i)});
  const gain=ok?(cfg.xp||10)+Math.min(Math.max(Q.combo-1,0),5)*2:0;Q.xp+=gain;Q.res.push(ok);
  if(gain)addXP(gain);else save();
  const fbx=app.querySelector('#fbx');
  fbx.innerHTML=`<div class="fb ${ok?'ok':'ng'}">${ok?hana:'<span class="verdict" style="font-size:34px">✕</span>'}<div><div class="verdict">${ok?'正解!':'おしい!'}${gain?` <small>+${gain} XP</small>`:''}</div><div>${it.why||''}</div>${it.ja?`<div class="tr">${it.ja}</div>`:''}</div></div>
  ${it.after?`<div style="margin-top:12px">${it.after}</div>`:''}
  <div class="next"><button class="btn hl" id="qnext">${Q.i+1<N?'つぎへ →':'結果を見る'}</button></div>`;
  wireSay(fbx);
  const nx=fbx.querySelector('#qnext');nx.onclick=()=>{stopSpeak();Q.i++;Q.answered=false;render();window.scrollTo({top:0})};
  nx.scrollIntoView({block:'nearest',behavior:'smooth'});
 }
};
function quizResult(app){
 const Q=RT.quiz,{cfg}=Q;const n=Q.res.length,ok=Q.res.filter(Boolean).length;const r=n?ok/n:0;
 const st=r>=1?3:r>=.8?2:r>=.6?1:0;
 if(!Q.ended){Q.ended=true;Q.stars=st;cfg.onEnd&&cfg.onEnd({ok,n,stars:st,res:Q.res});const D=dailyNow();D.q++;checkBadges();save();if(st===3)confetti()}
 const wrong=cfg.items.map((it,k)=>({it,k})).filter(x=>!Q.res[x.k]);
 app.innerHTML=`
 <div class="row">${backBtn(cfg.backLabel||'もどる',cfg.back||{name:'home'})}</div>
 <section class="sheet result">
  <div class="eyebrow">${esc(cfg.title)}</div>
  <div class="big" style="margin-top:10px">${ok}<small style="font-size:22px"> / ${n}</small></div>
  <div class="rst">${[0,1,2].map(i=>`<span class="${i<st?'on':''}" style="animation-delay:${.15+i*.18}s">★</span>`).join('')}</div>
  <div class="gain"><span>獲得 <b>${Q.xp}</b> XP</span><span>連続正解の最高 <b>${S.maxCombo}</b></span></div>
  <p>${st===3?'満点です。この調子!':st>=1?'クリア! まちがえた問題を見直すと定着します。':'まずは解説を読んでから、もう一度挑戦してみましょう。'}</p>
  <div class="row" style="justify-content:center">${cfg.retry?`<button class="btn" id="again">${IC.redo}もう一度</button>`:''}<button class="btn ghost" data-go='${JSON.stringify(cfg.back||{name:'home'})}'>${esc(cfg.backLabel||'もどる')}</button></div>
 </section>
 ${wrong.length?`<section class="sheet panel"><h3 class="eyebrow">まちがえた問題の見直し</h3>${wrong.map(({it})=>`<div class="ex" style="grid-template-columns:1fr"><div class="e en">${it.review||it.s}</div><div><b class="good en">${esc(it.c[it.a])}</b></div><div class="j">${it.why||''}</div></div>`).join('')}</section>`:''}`;
 wireGo(app);wireSay(app);
 const a=app.querySelector('#again');if(a)a.onclick=()=>cfg.retry();
}

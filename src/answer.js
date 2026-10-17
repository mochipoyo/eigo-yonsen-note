// ===== answer: 声(またはキーボード)で答える共通パネルと、答えの評価 =====
// answerBox(el,{hintHtml, timeLimit, startAt:()=>ms, placeholder}) → Promise<{text,alts,ms,hint,gaveUp,typed,conf}>
function answerBox(el,opt={}){
 return new Promise(resolve=>{
  let hint=false,done=false,t0=null,firstKey=null,timer=null;
  const typeFirst=!canListen||S.set.typeFirst;
  el.innerHTML=`<div class="abox">
   ${canListen?`<div class="abig"><button class="micbig" id="ab-mic" aria-label="マイクで答える">${IC.mic}</button><div><b id="ab-st">マイクを押して英語で答える</b><small id="ab-sub">話し終えると自動で止まります</small></div></div>`:''}
   <div class="atype" id="ab-tw" ${typeFirst?'':'hidden'}><input id="ab-in" class="search en" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(opt.placeholder||'英語で入力して Enter')}" aria-label="英語で答えを入力"><button class="btn" id="ab-send">送信</button></div>
   ${typeFirst&&!canListen?'<small class="muted">このブラウザでは音声認識が使えないため、キーボードで答えます。</small>':''}
   <div class="row abtns">${canListen?`<button class="btn ghost sm" id="ab-kb">${typeFirst?'マイクで答える':'キーボードで答える'}</button>`:''}${opt.hintHtml?'<button class="btn ghost sm" id="ab-hint">ヒント</button>':''}<button class="btn ghost sm" id="ab-give">わからない</button><span class="sp"></span><span class="timer" id="ab-timer"></span></div>
   <div id="ab-h"></div>
  </div>`;
  const $=s=>el.querySelector(s);
  const start=()=>opt.startAt?opt.startAt():Date.now();
  const fin=r=>{if(done)return;done=true;clearInterval(timer);stopListen();resolve({hint,...r})};
  if(opt.timeLimit){const T=opt.timeLimit;const tick=()=>{const s0=opt.startAt?opt.startAt():null;if(!s0){$('#ab-timer').textContent='';return}
    const left=Math.max(0,T-(Date.now()-s0)/1000);$('#ab-timer').textContent='残り '+left.toFixed(0)+' 秒';$('#ab-timer').classList.toggle('late',left<=0);if(left<=0)$('#ab-timer').textContent='時間切れ(答えてOK)'};timer=setInterval(tick,250)}
  const h=$('#ab-hint');if(h)h.onclick=()=>{hint=true;$('#ab-h').innerHTML=`<div class="hintbox">${opt.hintHtml}</div>`;h.disabled=true;opt.onHint&&opt.onHint()};
  $('#ab-give').onclick=()=>fin({text:'',alts:[],gaveUp:true,ms:0});
  const kb=$('#ab-kb');if(kb)kb.onclick=()=>{const tw=$('#ab-tw');tw.hidden=!tw.hidden;kb.textContent=tw.hidden?'キーボードで答える':'マイクで答える';if(!tw.hidden)$('#ab-in').focus()};
  const inp=$('#ab-in');
  inp.addEventListener('keydown',e=>{if(!firstKey)firstKey=Date.now();if(e.key==='Enter'&&!e.isComposing){e.preventDefault();send()}});
  const send=()=>{const t=inp.value.trim();if(!t)return;const s0=start();fin({text:t,alts:[t],typed:true,ms:s0&&firstKey?Math.max(0,firstKey-s0):0})};
  $('#ab-send').onclick=send;
  const mb=$('#ab-mic');
  if(mb)mb.onclick=async()=>{
   if(mb.classList.contains('on')){stopListen();return}
   mb.classList.add('on');$('#ab-st').textContent='聞いています…';$('#ab-sub').textContent='もう一度押すと止まります';
   let spokeAt=null;
   try{const alts=await listen(t=>{spokeAt=t});mb.classList.remove('on');
    const s0=start();fin({text:alts[0],alts:[...alts],conf:alts.conf,ms:s0&&spokeAt?Math.max(0,spokeAt-s0):0});
   }catch(err){mb.classList.remove('on');$('#ab-st').textContent='マイクを押して英語で答える';
    const m={'not-allowed':'マイクが許可されていません。ブラウザの設定で許可するか、キーボードで答えてください。','service-not-allowed':'このページでは音声認識が使えません。キーボードで答えてください。','no-speech':'声が聞き取れませんでした。もう一度どうぞ。','audio-capture':'マイクが見つかりません。キーボードで答えてください。','network':'音声認識にはネット接続が必要です。','busy':'音声認識が動作中です。少し待ってからもう一度。','aborted':'止めました。'}[err]||'うまく聞き取れませんでした。もう一度どうぞ。';
    $('#ab-sub').textContent=m;
    if(['not-allowed','service-not-allowed','audio-capture'].includes(err)){$('#ab-tw').hidden=false;if(kb)kb.textContent='マイクで答える'}}
  };
  if(typeFirst)setTimeout(()=>inp.focus({preventScroll:true}),50);
 });
}
// 答えの評価。spec: {model, alts, keys, loose, free(=ヒントなしの自由回答か)}
// meaning: ok(通じる) / part(一部) / ng(通じにくい) / free(質問には答えていそう) / none(無回答)
function evalAnswer(res,spec){
 if(res.gaveUp||!res.text)return {meaning:'none',match:0,ms:0,hint:res.hint,heard:''};
 const cands=[spec.model,...(spec.alts||[])].filter(Boolean);
 let best={ok:false,ratio:0};for(const t of (res.alts||[res.text])){const k=keysOk(t,spec.keys||[]);if(k.ok||k.ratio>best.ratio){best=k;best.text=t;if(k.ok)break}}
 const heard=best.text||res.text;
 const match=simScore(heard,cands);
 let meaning=best.ok?'ok':best.ratio>=0.5?'part':'ng';
 if(meaning!=='ok'&&spec.free&&spec.loose){const w=normWords(heard);const lw=w.filter(x=>spec.loose.some(a=>wordHit(x,a))).length;if(w.length>=3&&lw>=1)meaning='free'}
 if(match>=85&&meaning!=='ok')meaning='ok';
 return {meaning,match,ms:res.ms||0,hint:!!res.hint,heard,typed:!!res.typed,conf:res.conf}
}
const MEAN={ok:['通じる','good'],free:['答えになっていそう','good'],part:['一部通じる',''],ng:['通じにくい','bad'],none:['回答なし','bad']};
// 4つの評価を分けて表示(発音の評価ではないことを明記)
function evalChips(ev,opt={}){
 const sec=ev.ms?(ev.ms/1000).toFixed(1)+'秒':'—';
 const fast=ev.ms&&ev.ms<3000?'good':ev.ms>8000?'bad':'';
 return `<div class="chips">
  <span class="chip ${MEAN[ev.meaning][1]}"><small>意味</small>${MEAN[ev.meaning][0]}${ev.ai?' <small>(AI判定)</small>':''}</span>
  <span class="chip"><small>模範解答との一致</small>${ev.meaning==='none'?'—':ev.match+'%'}</span>
  <span class="chip ${fast}"><small>反応</small>${sec}</span>
  <span class="chip ${ev.hint?'':'good'}"><small>ヒント</small>${ev.hint?'使った':'なし'}</span>
 </div>
 ${ev.heard?`<div class="heardline"><small>${ev.typed?'入力した英語':'聞き取られた英語'}:</small> <span class="en">${esc(ev.heard)}</span></div>`:''}
 ${opt.note!==false&&!ev.typed&&ev.heard?'<small class="muted">一致度は音声認識の文字起こしと模範解答の比較で、発音の良し悪しの採点ではありません。</small>':''}`}
// 模範解答・言い換えの表示
function modelBlock(model,alts,para){return `<div class="modelbox">
 <div class="row"><span class="eyebrow">模範解答</span></div>
 <div class="ex">${sayBtn(model)}<div class="e en"><b>${esc(model)}</b></div></div>
 ${(alts||[]).length?`<div class="eyebrow" style="margin-top:6px">これも正解</div>${alts.map(a=>`<div class="ex">${sayBtn(a,'m')}<div class="e en">${esc(a)}</div></div>`).join('')}`:''}
 ${(para||[]).length?`<div class="eyebrow" style="margin-top:6px">自然な言い換え</div>${para.map(a=>`<div class="ex">${sayBtn(a,'m')}<div class="e en">${esc(a)}</div></div>`).join('')}`:''}
</div>`}
// AIによる意味判定(バックエンドが設定されているときだけ)。失敗したら null(キーワード判定のまま)
async function aiEvaluate(question,answer,model){if(!aiReady()||!answer)return null;
 try{const r=await aiCall('evaluate',{question,answer,model});if(r&&typeof r.ok==='boolean')return r}catch(e){}return null}

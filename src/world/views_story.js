// ===== ワールド: 会話ミッションの画面(モード5「実践ミッション」・モード6「英語で生活」) =====
// モード5: 相手の英語を聞き取り、行動や返事を選んで進める(日本語のヒントは少なめ)。自分の声で言うこともできる。
// モード6: 英文の選択肢は出さない。自分の言葉で(声・できなければ入力で)答える。
// どちらも、字幕・和訳・ヒントは押したときだけ出る(使った回数は記録する)。

function wStoryList(el,def,mode){const stories=def.stories||[];
 el.innerHTML=`<div class="wsintro"><b>${mode===5?'実践ミッション':'英語で生活'}</b>
  <p>${mode===5?'登場人物の英語を聞いて、状況を判断して行動・返事をしましょう。返事は英文の選択肢から選ぶか、自分の声で言えます。日本語のヒントは少なめです。':'英文の選択肢は出ません。登場人物からの質問や依頼に、自分の言葉で答えましょう(マイクが使えないときは入力で答えられます)。'}
  途中でトラブルが起きることもあります。</p><button class="linkbtn" data-go='{"name":"wexpr"}'>重点フレーズ10の使い方を見る</button></div>
 <div class="wslist">${stories.map(s=>{const r=(S.wstory||{})[s.id];const me=def.ents.find(e=>e.id===s.me);
  return `<div class="wscard"><div class="row"><b>${esc(s.t)}</b><small class="en muted">${esc(s.en)}</small><span class="sp"></span>${r&&r.clear?`<span class="chip good">${r.perfect?'★ ノーヒント':'✓ クリア'} ${r.clear}回</span>`:''}</div>
   <div class="muted" style="margin:4px 0">あなたの役:<b>${esc(me?me.ja:'')}</b> ・ ${esc(s.desc||'')}</div>
   <div class="row" style="flex-wrap:wrap;gap:4px">${(s.focus||[]).map(f=>`<span class="gtag en">${esc((exprById(f)||{}).en||f)}</span>`).join('')}${(s.variants||[]).length>1?`<span class="gtag">展開 ${s.variants.length}通り</span>`:''}</div>
   <button class="btn hl sm" style="margin-top:8px" data-st="${esc(s.id)}">はじめる</button></div>`}).join('')}</div>`;
 wireGo(el);
 el.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>go({name:'wscene',id:def.id,mode,story:b.dataset.st}))}

function wStoryCtl(c){const {W,def,story,mode,$}=c;story.scene=def.id;W.story=story.id;
 const me=W.ents[story.me];let ST=null;const log=$('#w-log'),now=$('#w-now'),goal=$('#w-sgoal');
 const canTTS='speechSynthesis' in window;
 const gOf=e=>e&&e.pron==='he'?'m':'f';
 // ---- 画面の部品 ----
 function renderGoal(){const steps=story.steps.filter(s=>s.act||s.talk).length;const done=ST?ST.log.acts.filter(a=>a.ok!==false).length+new Set(ST.log.talks.filter(t=>t.kind!=='repeat'&&(t.ok||t.kind==='skip'||t.confirmed)).map(t=>t.step)).size:0;
  goal.innerHTML=`<div class="row"><span class="gtag">${mode===5?'実践ミッション':'英語で生活'}</span><b>${esc(story.t)}</b><small class="en muted">${esc(story.en)}</small><span class="sp"></span><label class="tg"><input type="checkbox" id="w-sub" ${S.set.wSub?'checked':''}> 字幕を常に表示</label></div>
  <div class="muted" style="margin-top:4px">あなたの役:<b>${esc(me.ja)}</b> ・ 目的:${esc(story.goalJa||story.desc||'')}</div>
  <div class="wprog" aria-label="進み具合">${Array.from({length:steps},(_,i)=>`<i class="${i<done?'on':''}"></i>`).join('')}</div>`;
  goal.querySelector('#w-sub').onchange=e=>{S.set.wSub=e.target.checked;save();log.querySelectorAll('.wl').forEach(x=>{if(S.set.wSub)reveal(x,'en')})}}
 function lineHtml(h,name){return `<div class="wl ${h.who==='pa'?'pa':''}" data-h="${ST.log.heard.indexOf(h)}"><div class="wlw">${esc(name)}</div>
  <div class="wlb"><div class="wle en ${h.shownNow?'':'hid'}">${h.shownNow?esc(h.en):'<span class="muted">(英文はかくしています)</span>'}</div><div class="wlj" ${h.jaShown?'':'hidden'}>${esc(h.ja||'')}</div>
  <div class="wlbtn"><button class="say" data-rp="1" aria-label="もう一度聞く">${IC.play}</button><button class="say" data-rp="slow" aria-label="ゆっくり聞く">${IC.slow}</button>
  <button class="linkbtn" data-rv="en">英文</button><button class="linkbtn" data-rv="ja">和訳</button></div></div></div>`}
 function reveal(el,k){const h=ST.log.heard[+el.dataset.h];if(!h)return;
  if(k==='en'&&!h.shownNow){h.shownNow=true;if(!h.noTTS){h.shown=true;if(!S.set.wSub)stHint(ST,'sub')}el.querySelector('.wle').classList.remove('hid');el.querySelector('.wle').textContent=h.en}
  if(k==='ja'&&!h.jaShown){h.jaShown=true;stHint(ST,'ja');el.querySelector('.wlj').hidden=false}}
 function wireLine(el){el.querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>{const h=ST.log.heard[+el.dataset.h];h.replays++;const w=h.who==='pa'?null:W.ents[h.who];speakLine(w,h.tts||h.en,b.dataset.rp==='slow')});
  el.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>reveal(el,b.dataset.rv))}
 async function speakLine(who,en,slow,fast){if(who){setTalking(W,who.id,true)}const off=who&&!who.hidden?talkDots(W,who):()=>{};
  try{await speak(en,{g:gOf(who),slow,fast:fast&&!slow})}finally{off();if(who)setTalking(W,who.id,false)}}
 function myLine(rec){const lab={voice:'声',typed:'入力',choice:'選択'}[rec.how]||'';
  const res=rec.kind==='repeat'?['聞き返しました','good']:rec.kind==='skip'?['言えなかったので、模範の返事で進みます(話した記録には入りません)','bad']:rec.kind==='clarify'?['一部だけ伝わりました。相手が確認しています','']:rec.kind==='unknown'?['伝わらなかったようです','bad']:rec.tone?['伝わりましたが、より自然な言い方があります','']:['伝わりました','good'];
  const d=document.createElement('div');d.className='wl me';
  d.innerHTML=`<div class="wlw">${esc(me.ja)}(あなた)<small class="muted"> ${lab}</small></div><div class="wlb"><div class="en">${rec.text?esc(rec.text):'<span class="muted">—</span>'}</div>
   <div class="wres ${res[1]}">${res[0]}</div>
   ${rec.kind==='intent'||rec.kind==='clarify'||rec.kind==='unknown'?`<div class="chips sm">${rec.how!=='choice'?`<span class="chip"><small>意味</small>${rec.kind==='intent'?(rec.ai?'通じる(AI判定)':'通じる'):rec.kind==='clarify'?'一部':'通じにくい'}</span><span class="chip"><small>英文の一致度</small>${rec.match??'—'}%</span>${rec.conf!=null?`<span class="chip"><small>認識の確信度</small>${Math.round(rec.conf*100)}%</span>`:''}`:''}</div>`:''}
   ${rec.tone&&rec.better?`<div class="wbetter"><small>より自然:</small> <span class="en">${esc(rec.better)}</span> ${sayBtn(rec.better)}</div>`:''}
   ${rec.kind==='skip'?`<div class="wbetter"><small>例:</small> <span class="en">${esc(rec.model)}</span> ${sayBtn(rec.model)}</div>`:''}</div>`;
  log.appendChild(d);wireSay(d);d.scrollIntoView({block:'nearest'})}
 // ---- 進行役(story.js)から呼ばれる画面操作 ----
 const ui={
  async say(who,en,ja,h,o){if(!ST||!ST.alive)return;h.noTTS=!canTTS;h.shownNow=h.shownNow||!canTTS||!!S.set.wSub;if(S.set.wSub&&!h.noTTS)h.shown=true;
   if(o.again){const el=log.querySelector(`.wl[data-h="${ST.log.heard.indexOf(h)}"]`);if(el)el.classList.add('again')}
   else{const tmp=document.createElement('div');tmp.innerHTML=lineHtml(h,o.think?'💭 '+(who===me?'(心の声)':cap(who.en.replace(/^the /,''))):who?cap(who.en.replace(/^the /,'')):'📢 Announcement');const el=tmp.firstElementChild;log.appendChild(el);wireLine(el);el.scrollIntoView({block:'nearest'})}
   now.innerHTML=`<div class="muted wwait">${who?esc(cap(who.en))+' が話しています…':'アナウンス中…'}</div>`;
   await speakLine(who,h.tts||en,o.slow,h.fast&&!o.again);if(!o.pa)await wait(250)},
  task(s,o={}){if(!ST.alive)return;renderGoal();const label=stTx(ST,s.act.ja),hint=stTx(ST,s.act.hint||'');
   now.innerHTML=`${o.again?'<div class="wng">うまくいかなかったようです。相手の言ったことを確かめて、もう一度。</div>':''}
   <div class="wtask"><b>あなたの番(行動)</b> ${mode===5?`<span>${esc(label)}</span>`:`<span id="w-tl" class="muted">状況に合わせて、${esc(me.ja)}を動かしましょう。</span>`}</div>
   <small class="muted">${esc(me.ja)}(あなた)や、相手・物をタップすると動作を選べます。</small>
   <div class="row" style="margin-top:6px">${mode===6?'<button class="btn ghost sm" id="w-tk">やることを見る</button>':''}${hint?'<button class="btn ghost sm" id="w-th">ヒント</button>':''}</div><div id="w-thx"></div>`;
   const tk=now.querySelector('#w-tk');if(tk)tk.onclick=()=>{stHint(ST,'task');now.querySelector('#w-tl').textContent=label;tk.remove()};
   const th=now.querySelector('#w-th');if(th)th.onclick=()=>{stHint(ST,'task');now.querySelector('#w-thx').innerHTML=`<div class="hintbox">${esc(hint)}</div>`;th.remove()}},
  talk(s0,o={}){if(!ST.alive)return;const s=stResolve(ST,s0);renderGoal();const ja=stTx(ST,s.talk.ja||''),hint=stTx(ST,s.talk.hint||'');const to=s.to?W.ents[s.to]:null;
   now.innerHTML=`${o.again?'<div class="wng" style="margin-bottom:4px">もう一度どうぞ。</div>':''}
   <div class="wtask"><b>あなたの番(話す)</b> ${mode===5?`<span>${esc(ja)}</span>`:`<span class="muted">${to?esc(to.ja)+'に':''}英語で話しましょう。</span>`}</div>
   ${mode===5&&s.choices.length?`<div class="wchoice">${shuffle(s.choices.map((x,i)=>i)).map(i=>`<button class="wact" data-ch="${i}"><span class="en">${esc(s.choices[i].en)}</span></button>`).join('')}</div>
    <div class="row"><button class="btn ghost sm" id="w-own">${IC.mic}自分の声で言う</button>${hint?'<button class="btn ghost sm" id="w-hn">ヒント</button>':''}<button class="btn ghost sm" id="w-sk">わからない</button></div><div id="w-hx"></div><div id="w-ab"></div>`
    :`<div id="w-ab"></div>`}`;
   const send=res=>{if(ST&&ST.alive){W.busy=true;stOnAnswer(ST,res).finally(()=>{W.busy=false})}};
   now.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{const ch=s.choices[+b.dataset.ch];send({choice:ch.i,text:ch.en,hint:false})});
   const sk=now.querySelector('#w-sk');if(sk)sk.onclick=()=>send({gaveUp:true,text:''});
   const hn=now.querySelector('#w-hn');if(hn)hn.onclick=()=>{stHint(ST,'talk');now.querySelector('#w-hx').innerHTML=`<div class="hintbox">${esc(hint)}</div>`;hn.remove()};
   const box=()=>answerBox(now.querySelector('#w-ab'),{hintHtml:mode===6?esc(ja)+(hint?'<br>'+esc(hint):''):'',onHint:()=>stHint(ST,'talk'),placeholder:'英語で入力して Enter'}).then(r=>{if(r.hint&&ST.waiting)ST.waiting.hinted=true;send(r)});
   const own=now.querySelector('#w-own');if(own)own.onclick=()=>{own.remove();box()};
   if(mode===6||!s.choices.length)box();
   if(o.offerHint){const h=now.querySelector('#ab-hint')||hn;if(h)h.classList.add('hl')}},
  result(rec){myLine(rec)},
  confirm(m){return new Promise(res=>{now.innerHTML=`<div class="wtask"><b>相手が確認しています</b> <span class="en">"${esc(m)}"</span> で合っていますか?</div>
   <div class="wchoice"><button class="wact" data-y="1"><span class="en">Yes, that's right.</span><small>はい、そうです</small></button><button class="wact" data-y="0"><span class="en">No, that's not what I meant.</span><small>いいえ、ちがいます</small></button></div>`;
   now.querySelectorAll('[data-y]').forEach(b=>b.onclick=()=>{const y=b.dataset.y==='1';const d=document.createElement('div');d.className='wl me';d.innerHTML=`<div class="wlw">${esc(me.ja)}(あなた)</div><div class="wlb en">${y?'Yes, that\'s right.':'No, that\'s not what I meant.'}</div>`;log.appendChild(d);res(y)})})},
  finish(fb){renderGoal();$('#w-menu').innerHTML='';now.innerHTML=wFeedbackHtml(fb,mode);wireSay(now);
   const nx=(def.stories||[]).findIndex(x=>x.id===story.id)+1;
   now.querySelector('#fb-again').onclick=()=>{RT.stOpt=null;render()};
   now.querySelector('#fb-list').onclick=()=>go({name:'wscene',id:def.id,mode},true);
   const n=now.querySelector('#fb-next');if(n){if(nx<def.stories.length)n.onclick=()=>go({name:'wscene',id:def.id,mode,story:def.stories[nx].id},true);else n.remove()}
   if(fb.goal)confetti();now.scrollIntoView({block:'start',behavior:'smooth'})}};
 return {role:story.me,
  extra(a,t){if(!ST||!ST.waiting)return [];const list=[...(story.acts||[]),...((ST.waiting.s&&ST.waiting.s.acts)||[])];
   return list.filter(x=>(x.on||null)===(t?t.id:null)&&(!x.if||stCond(ST,x.if))).map(x=>wA(stTx(ST,x.en),stTx(ST,x.ja),async()=>{if(x.near&&t)await goNear(W,a,t);await stOps(ST,x.do||[]);
    return {v:'custom',act:x.id,a,o:t||null,tx:{prog:(x.tx.prog||[]).map(s=>stTx(ST,s)),past:(x.tx.past||[]).map(s=>stTx(ST,s)),state:x.tx.state?(x.tx.state).map(s=>stTx(ST,s)):null}}}))},
  onEvents(evs){return ST&&stOnEvents(ST,evs)},
  async start(){const opt=RT.stOpt||{};ST=stNew(W,story,mode,ui,opt);RT.st=ST;
   if(story.init)await stOps(ST,story.init);W.draw();renderGoal();
   const intro=stTx(ST,story.intro||'');log.innerHTML=intro?`<div class="wintro">${esc(intro)}</div>`:'';
   await wait(300);if(ST.alive){W.busy=true;try{await stRun(ST)}finally{W.busy=false}}}}}

// ---- 会話後の学習フィードバック ----
function wFeedbackHtml(fb,mode){const m=fb.metrics;const pct=v=>v==null?'—':v+'%';
 const heard=fb.heard.filter(h=>h.who!=='me');
 return `<div class="wfb">
 <div class="wfbh ${fb.goal?'ok':''}">${fb.goal?(fb.perfect?'★ ノーヒントでミッション達成!':'ミッション達成!'):'ミッションは未達成です'}<small>${fb.sec}秒</small></div>
 <div class="chips">
  <span class="chip"><small>意味の正確性</small>${pct(m.meaning)}</span>
  <span class="chip"><small>英文の一致度</small>${pct(m.match)}</span>
  <span class="chip"><small>発音の目安(音声認識の確信度)</small>${m.pron==null?'声の回答なし':m.pron+'%'}</span>
  <span class="chip ${fb.hints?'':'good'}"><small>ヒント</small>${fb.hints}回</span></div>
 <small class="muted">意味=相手に一度で伝わった割合 / 一致度=模範の英文との文字の一致 / 確信度=ブラウザの音声認識がどれだけ確かに聞き取れたか(発音の正式な採点ではありません)。それぞれ別の指標です。</small>
 <h4>聞き取れた内容</h4><div class="wfbl">${heard.map(h=>`<div class="ex">${sayBtn(h.en)}<div><div class="en">${esc(h.en)}</div><div class="j">${esc(h.ja||'')}</div><small class="${h.help?'':'good'}">${h.help?[h.shown?'字幕':'',h.jaShown?'和訳':'',h.asked?'聞き返し':''].filter(Boolean).join('・')+'を使って理解':'音声だけで理解'}${h.replays?` ・ 再生${h.replays}回`:''}</small></div></div>`).join('')||'<p class="muted">—</p>'}</div>
 <h4>正しく実行できた行動</h4><ul class="wfbu">${fb.acts.filter(a=>a.ok!==false).map(a=>`<li>${esc(a.label)}${a.hint?' <small class="muted">(ヒントあり)</small>':''}</li>`).join('')||'<li class="muted">—</li>'}</ul>
 ${fb.acts.some(a=>a.ok===false)?`<div class="muted">まちがえた行動:${fb.acts.filter(a=>a.ok===false).map(a=>esc(a.label)).join('、')}</div>`:''}
 <h4>自分で話せた英文</h4>${fb.spoken.length?`<ul class="wfbu en">${fb.spoken.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:`<p class="muted">${mode===5?'声で答えた英文はありません(選択肢で答えた分は「話せた」に入りません)。':'声で答えた英文はありません。'}</p>`}
 ${fb.typed.length?`<div class="muted">入力で答えた英文:${fb.typed.map(esc).join(' / ')}</div>`:''}
 ${fb.chose.length?`<div class="muted">選んで答えた英文:${fb.chose.map(esc).join(' / ')}</div>`:''}
 ${fb.mistakes.filter(x=>x.kind==='talk').length?`<h4>会話で間違えた・伝わりにくかった表現</h4>${fb.mistakes.filter(x=>x.kind==='talk').map(x=>`<div class="ex">${sayBtn(x.model)}<div>${x.said?`<div><s class="muted">${esc(x.said)}</s></div>`:'<div class="muted">(言えなかった)</div>'}<div class="en"><b>${esc(x.model)}</b></div>${x.why?`<small class="muted">${esc(x.why)}</small>`:''}</div></div>`).join('')}`:''}
 <h4>より自然な言い方・言い換え</h4>${fb.para.map(p=>`<div class="ex">${sayBtn(p.model)}<div><div class="en"><b>${esc(p.model)}</b>${p.focus?` <span class="gtag">${esc((exprById(p.focus)||{}).ja||'')}</span>`:''}</div><div class="j">${esc(p.ja||'')}</div>${p.alts.length?`<small class="en muted">ほかにも:${p.alts.map(esc).join(' / ')}</small>`:''}${p.better?`<div class="en"><small class="muted">AIの言い換え:</small> ${esc(p.better)}</div>`:''}</div></div>`).join('')||'<p class="muted">—</p>'}
 <h4>次回復習するフレーズ</h4>${fb.review.length?`<div class="wfbl">${fb.review.map(r=>`<div class="ex">${sayBtn(r.en)}<div><div class="en">${esc(r.en)}</div><div class="j">${esc(r.ja)}</div><small class="muted">${esc(r.why)}</small></div></div>`).join('')}</div><small class="muted">「苦手リスト」(復習)に追加しました。</small>`:'<p class="muted">今回はありません。</p>'}
 <div class="row" style="margin-top:12px"><button class="btn hl" id="fb-again">もう一度(展開が変わることがあります)</button><button class="btn ghost" id="fb-list">ミッション一覧</button>${'<button class="btn ghost" id="fb-next">次のミッション →</button>'}</div></div>`}

// ---- 重点フレーズ10 ----
VIEWS.wexpr=function(app){const t=wTalkStat();const where={};for(const s of WMAN)for(const st of s.st||[])for(const f of st.focus||[])(where[f]=where[f]||[]).push({sc:s,st});
 app.innerHTML=`<div class="row">${backBtn('うごかす英語ワールド',{name:'world'})}</div>
 <div class="uhead"><span class="eyebrow">KEY PHRASES</span><h1>重点フレーズ10</h1><p>会話ミッションで重点的に練習する表現です。使う場面・自然な音声・返答例を確認してから、ミッションで使ってみましょう。</p></div>
 ${EXPR.map(x=>{const f=t.f[x.id];return `<section class="sheet panel wexp"><div class="row"><span class="gtag">${esc(x.ja)}</span><b class="en" style="font-size:20px">${esc(x.en)}</b><span class="sp"></span><small class="muted">${f?`ヒントなしで成功 ${f[0]}/${f[1]}回`:'まだ使っていません'}</small></div>
  <p>${esc(x.use)}</p>
  <div class="exs">${x.ex.map(([e,j])=>`<div class="ex">${sayBtn(e)}<div><div class="e en">${esc(e)}</div><div class="j">${esc(j)}</div></div></div>`).join('')}</div>
  <div class="eyebrow" style="margin-top:6px">返答の例</div><div class="exs">${x.resp.map(([e,j])=>`<div class="ex">${sayBtn(e,'m')}<div><div class="e en">${esc(e)}</div><div class="j">${esc(j)}</div></div></div>`).join('')}</div>
  ${(where[x.id]||[]).length?`<div class="row" style="flex-wrap:wrap;gap:6px;margin-top:8px"><small class="muted">練習できるミッション:</small>${where[x.id].map(w=>`<button class="btn ghost sm" data-go='${JSON.stringify({name:'wscene',id:w.sc.id,mode:5,story:w.st.id})}'>${esc(w.sc.t)}「${esc(w.st.t)}」</button>`).join('')}</div>`:''}
 </section>`}).join('')}`;
 wireGo(app);wireSay(app)};

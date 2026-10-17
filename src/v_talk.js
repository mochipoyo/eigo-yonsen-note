// ===== talk: 会話ロールプレイ =====
VIEWS.talks=function(app){
 const tab=S.tTab||0;const tabs=[{k:'すべて',f:()=>true},...LV.map(l=>({k:l.k,s:['旅行の基本','日常・雑談','仕事の基本','会議・交渉'][l.n-1],f:t=>t.lv===l.n}))];
 const T=tabs[Math.min(tab,tabs.length-1)];
 app.innerHTML=`
 <div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">CONVERSATION</span><h1>会話ロールプレイ</h1><p>相手のセリフを聞いて、言いたいことに合う返事を選び、最後は自分の声で言ってみます。まずはキーフレーズを練習してから本番へ。</p></div>
 ${canListen?'':'<p class="note">このブラウザは音声認識に対応していないため、発話チェックは「言えた」ボタンでの自己判定になります(Chrome・Edge・Safari では音声認識が使えます)。</p>'}
 <div class="tabs" role="tablist">${tabs.map((t,i)=>`<button class="tab" role="tab" data-t="${i}" aria-selected="${i===tab}">${t.k}<small>${t.s||TALK.length+'シーン'}</small></button>`).join('')}</div>
 <section class="sheet"><div class="units">${TALK.filter(T.f).map(t=>`<button class="unit ${S.tStars[t.id]>=1?'done':''}" data-go='${JSON.stringify({name:'talk',id:t.id})}'><span class="no">${t.id.slice(1)}</span><span><span class="tt">${esc(t.t)}</span> ${lvTag(t.lv)}<span class="tg">${esc(t.goal)}</span></span>${starStr(S.tStars[t.id]||0)}</button>`).join('')}</div></section>`;
 wireGo(app);
 app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{S.tTab=+b.dataset.t;save();render()});
};
// 声に出して練習するパネル。onDone(score|null) を呼ぶ
function micPanel(el,text,onDone,opt={}){
 el.innerHTML=`<div class="mic">
  <div class="row" style="width:100%"><b>声に出して言ってみよう</b><span class="sp"></span>${sayBtn(text,'f')}<button class="say" data-say="${esc(text)}" data-slow="1" aria-label="ゆっくり読み上げ">${IC.slow}</button></div>
  <div class="heard en" id="tgt" style="font-size:17px">${esc(text)}</div>
  <div class="row">${canListen?`<button class="micbtn" id="mb" aria-label="話す">${IC.mic}</button><small id="ms">マイクを押して話してください</small>`:`<button class="btn" id="selfok">言えた!</button><small>声に出して言ってから押してください</small>`}</div>
  <div id="mr"></div>
  <div class="row"><button class="btn ghost sm" id="skip">${opt.skipLabel||'スキップ'}</button></div>
 </div>`;
 wireSay(el);
 let best=null;
 const fin=sc=>{onDone(sc)};
 el.querySelector('#skip').onclick=()=>fin(best);
 const so=el.querySelector('#selfok');if(so)so.onclick=()=>{S.said++;addXP(3);fin(null)};
 const mb=el.querySelector('#mb');if(!mb)return;
 mb.onclick=async()=>{
  if(mb.classList.contains('on')){stopListen();return}
  mb.classList.add('on');el.querySelector('#ms').textContent='聞いています… 話し終えたら自動で止まります';
  try{const alts=await listen();mb.classList.remove('on');
   const r=scoreSpeech(text,alts);S.said++;if(r.score>=80)S.saidGood++;
   const gain=r.score>=80?10:r.score>=60?6:3;addXP(gain);
   best=Math.max(best||0,r.score);
   el.querySelector('#tgt').innerHTML=r.marks;
   el.querySelector('#ms').textContent='もう一度話すこともできます';
   el.querySelector('#mr').innerHTML=`<div class="meter"><span style="width:${r.score}%"></span></div>
    <p style="margin:6px 0"><b class="${r.score>=80?'good':r.score>=60?'':'bad'}">${r.score>=90?'バッチリ伝わります!':r.score>=80?'よく言えています!':r.score>=60?'だいたい伝わります。赤い単語をもう一度。':'聞き取れなかった単語があります。お手本を聞いてもう一度。'}</b> <small>一致度 ${r.score}% ・ +${gain} XP</small></p>
    <small>聞き取られた英語:<span class="en">${esc(r.heard)}</span></small>`;
   el.querySelector('#skip').textContent=opt.doneLabel||'つぎへ →';el.querySelector('#skip').classList.remove('ghost');el.querySelector('#skip').classList.add('hl');
  }catch(err){mb.classList.remove('on');
   const m={'not-allowed':'マイクの使用が許可されていません。ブラウザの設定でマイクを許可してください。','service-not-allowed':'このページでは音声認識が使えません。','no-speech':'声が聞き取れませんでした。もう一度どうぞ。','audio-capture':'マイクが見つかりません。','network':'音声認識にネット接続が必要です。','unsupported':'このブラウザは音声認識に未対応です。'}[err]||'うまく聞き取れませんでした。もう一度どうぞ。';
   el.querySelector('#ms').textContent=m;
   if(err==='not-allowed'||err==='service-not-allowed'||err==='audio-capture'){el.querySelector('#mr').innerHTML='<button class="btn sm" id="selfok2">声に出して言えた(自己判定)</button>';el.querySelector('#selfok2').onclick=()=>{S.said++;addXP(3);fin(null)}}
  }
 };
}
VIEWS.talk=function(app){
 const t=tById(V.id);if(!t)return go({name:'talks'},true);
 const step=V.step||0;
 app.innerHTML=`
 <div class="row">${backBtn('シーンの一覧',{name:'talks'})}</div>
 <div class="uhead"><div class="row">${lvTag(t.lv)}<span class="gtag en">${esc(t.place)}</span></div><h1>${esc(t.t)}</h1><p>${esc(t.goal)}</p></div>
 <div class="steps" style="grid-template-columns:1fr 1fr" role="tablist">${['キーフレーズ','ロールプレイ'].map((s,i)=>`<button class="step" role="tab" data-s="${i}" aria-selected="${i===step}"><small>STEP ${i+1}</small>${s}${i===1&&S.tStars[t.id]>=1?'<span class="ck">✓</span>':''}</button>`).join('')}</div>
 <section class="sheet panel" id="tp"></section>`;
 wireGo(app);
 app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>go({name:'talk',id:t.id,step:+b.dataset.s},true));
 const P=app.querySelector('#tp');
 if(step===0){
  P.innerHTML=`<p>このシーンで使うフレーズです。聞いて、まねして言ってみましょう(マイクで練習もできます)。</p>
   <div class="exs">${t.phrases.map((p,i)=>`<div class="ex">${sayBtn(p.en)}<div><div class="e en"><span class="mk">${esc(p.en)}</span></div>${jaD(esc(p.ja))}${p.tip?`<div class="n">${esc(p.tip)}</div>`:''}<div class="row" style="margin-top:4px"><button class="btn ghost sm" data-prac="${i}">${IC.mic}練習</button></div><div class="pm"></div></div></div>`).join('')}</div>
   <div class="next"><button class="btn hl" id="nx">ロールプレイへ →</button></div>`;
  wireSay(P);wireJa(P);
  P.querySelectorAll('[data-prac]').forEach(b=>b.onclick=()=>{const box=b.parentElement.nextElementSibling;b.parentElement.hidden=true;micPanel(box,t.phrases[+b.dataset.prac].en,()=>{box.innerHTML='';b.parentElement.hidden=false},{skipLabel:'とじる',doneLabel:'とじる'})});
  P.querySelector('#nx').onclick=()=>go({name:'talk',id:t.id,step:1},true);
 }else rolePlay(P,t);
};
function rolePlay(P,t){
 const R={i:0,first:0,turns:0,scores:[],xp0:S.xp};
 P.innerHTML=`<div class="row" style="margin-bottom:12px"><small>相手:<b class="en">${esc(t.partner)}</b> ・ あなた:<b>You</b></small><span class="sp"></span><button class="btn ghost sm" id="rp-re">${IC.redo}最初から</button></div>
  <div class="chat" id="chat"></div><div id="turn" style="margin-top:14px"></div>`;
 P.querySelector('#rp-re').onclick=()=>go({name:'talk',id:t.id,step:1},true);
 const chat=P.querySelector('#chat'),turn=P.querySelector('#turn');
 const bubble=(who,en,ja)=>{const d=document.createElement('div');d.className='bub '+(who==='me'?'me':'p');const hide=who!=='me'&&S.set.hideEn;
  d.innerHTML=`<div class="who">${who==='me'?'You':esc(t.partner)} ${sayBtn(en,who==='me'?'f':t.pv)}</div><div class="e en ${hide?'jh':''}">${esc(en)}</div>${ja?jaD(esc(ja)):''}`;
  chat.appendChild(d);wireSay(d);wireJa(d);d.scrollIntoView({block:'nearest',behavior:'smooth'});return d};
 const step=async()=>{
  if(R.i>=t.lines.length)return finish();
  const L=t.lines[R.i];
  if(L.who==='p'){bubble('p',L.en,L.ja);turn.innerHTML=`<p class="row"><small>相手が話しています…</small><button class="btn ghost sm" id="skipv">先へ</button></p>`;
   let skipped=false;turn.querySelector('#skipv').onclick=()=>{skipped=true;stopSpeak();R.i++;step()};
   await speak(L.en,{g:t.pv});if(skipped)return;await wait(250);if(skipped)return;R.i++;return step()}
  // あなたの番
  R.turns++;let miss=0;const ord=shuffle([0,1,2]);
  turn.innerHTML=`<div class="turn"><div class="want">${esc(L.ja)}</div>
   <div class="opts one-col">${ord.map((oi,k)=>`<button class="opt en" data-i="${oi}"><span class="k">${k+1}</span><span>${esc(L.opts[oi].en)}</span></button>`).join('')}</div><div id="tf"></div></div>`;
  turn.scrollIntoView({block:'nearest',behavior:'smooth'});
  turn.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
   const o=L.opts[+b.dataset.i];const tf=turn.querySelector('#tf');
   if(!o.ok){miss++;b.classList.add('ng');b.disabled=true;S.answered++;save();tf.innerHTML=`<p class="hint" style="margin:10px 0 0;padding:8px 12px;border-radius:10px;background:color-mix(in srgb,var(--blue) 10%,transparent)"><b>おしい:</b>${esc(o.fb)}</p>`;return}
   b.classList.add('ok');turn.querySelectorAll('.opt').forEach(x=>x.disabled=true);S.answered++;S.correct++;if(!miss){R.first++;addXP(10)}else addXP(4);
   tf.innerHTML=`<p style="margin:10px 0"><b class="good">いいですね!</b> ${esc(o.fb)}</p><div id="mp"></div>`;
   micPanel(tf.querySelector('#mp'),o.en,sc=>{if(sc!=null)R.scores.push(sc);bubble('me',o.en);turn.innerHTML='';R.i++;step()},{skipLabel:'言わずに進む'});
   tf.scrollIntoView({block:'nearest',behavior:'smooth'});
  });
 };
 const finish=()=>{
  const choice=R.turns?R.first/R.turns:1;const said=R.scores.length?R.scores.reduce((a,b)=>a+b,0)/R.scores.length:null;
  const st=choice>=1&&(said==null||said>=80)?3:choice>=.75?2:1;
  const fst=!S.tStars[t.id];S.tStars[t.id]=Math.max(S.tStars[t.id]||0,st);dailyNow().t++;addXP(20);if(st===3)confetti();
  const idx=TALK.indexOf(t),nt=TALK[idx+1];
  turn.innerHTML=`<div class="sheet result" style="border:2px solid var(--ink)">
   <div class="eyebrow">SCENE CLEAR</div><div class="rst">${[0,1,2].map(i=>`<span class="${i<st?'on':''}" style="animation-delay:${.15+i*.18}s">★</span>`).join('')}</div>
   <div class="gain"><span>1回で正しい返事 <b>${R.first}/${R.turns}</b></span>${said!=null?`<span>発話の一致度 平均 <b>${Math.round(said)}%</b></span>`:''}<span>獲得 <b>${S.xp-R.xp0}</b> XP</span></div>
   <p style="text-align:left">${esc(t.wrap)}</p>
   <p style="text-align:left"><small>${st<3?'星3つの条件:すべて1回で正しい返事を選び、発話の一致度の平均が80%以上(発話した場合)。':''}${fst?' 字幕を隠す設定(設定 → 会話の英文)にすると、リスニングの練習になります。':''}</small></p>
   <div class="row" style="justify-content:center"><button class="btn ghost" id="again">${IC.redo}もう一度</button>${nt?`<button class="btn hl" data-go='${JSON.stringify({name:'talk',id:nt.id})}'>次のシーン:${esc(nt.t)}</button>`:''}</div></div>`;
  wireGo(turn);turn.querySelector('#again').onclick=()=>go({name:'talk',id:t.id,step:1},true);
  turn.scrollIntoView({block:'nearest',behavior:'smooth'});
 };
 turn.innerHTML=`<div class="mic" style="align-items:center;text-align:center"><p style="margin:0">音声が流れます。準備ができたらスタート!</p><button class="btn hl" id="st">${IC.play}スタート</button></div>`;
 turn.querySelector('#st').onclick=()=>{turn.innerHTML='';step()};
}

// ===== AI自由英会話(バックエンドが設定されているときだけ使える) =====
const AI_CHARS=[
 {k:'teacher',n:'優しい英語教師',d:'ゆっくり・はげましながら'},{k:'friend',n:'フレンドリーな友人',d:'くだけた日常会話'},
 {k:'barista',n:'カフェの店員',d:'注文や雑談'},{k:'hotel',n:'ホテルスタッフ',d:'チェックインや相談'},
 {k:'partner',n:'ビジネスパートナー',d:'打ち合わせ・交渉'},{k:'coach',n:'厳しめの英語コーチ',d:'まちがいをはっきり指摘'},
 {k:'hobby',n:'趣味について話せる友人',d:'好きなことを深掘り'}];
const AI_TOPICS=['旅行','日常','ビジネス','投資','金融','AI','科学','宇宙','音楽','ギター'];
function aiLevel(){const t=talkLevel();return t<=1?1:t<=2?2:t<=4?3:4}
VIEWS.ai=function(app){
 if(!aiReady()){
  app.innerHTML=`<div class="row">${backBtn('話す練習',{name:'speak'})}</div>
  <div class="uhead"><span class="eyebrow">AI CONVERSATION</span><h1>AI自由英会話</h1></div>
  <section class="sheet panel"><p><b>AI会話は未設定のため、いまは利用できません。</b>ほかの学習機能はすべてAIなしで使えます。</p>
  <p>AIと話すには、APIキーを安全に保管する「自分専用のバックエンド」が必要です。APIキーをこのページ(GitHub Pages)に直接書くと誰でも見られてしまうため、この方法にしています。</p>
  <ol class="gsteps"><li>リポジトリの <code>backend/</code> フォルダにある手順書(README)にそって、Cloudflare Workers にバックエンドを置く</li><li>そのURLと、自分で決めた合言葉(アクセストークン)を、このアプリの「設定 → AI会話」に入力する</li></ol>
  <p class="note">外部のAIサービスは有料です。バックエンド側で1日の利用回数の上限と、1回あたりの最大文字数を設定できます。会話の文字(音声ではなく文字起こし)だけがバックエンドとAIサービスに送られます。</p>
  <button class="btn" data-go='{"name":"settings"}'>設定を開く</button></section>`;
  return wireGo(app)}
 const A=RT.ai=RT.ai&&RT.ai.live?RT.ai:{char:S.set.aiChar||'teacher',topic:S.set.aiTopic||'日常',msgs:[],live:false,level:aiLevel(),hintJa:aiLevel()<=2};
 if(!A.live){
  app.innerHTML=`<div class="row">${backBtn('話す練習',{name:'speak'})}</div>
  <div class="uhead"><span class="eyebrow">AI CONVERSATION</span><h1>AI自由英会話</h1><p>相手を選んで、英語で自由に話しましょう。終わると、言い換えの提案と復習リストが表示されます。</p></div>
  <section class="sheet panel">
   <h3 class="eyebrow">相手</h3><div class="modes" style="margin-top:6px">${AI_CHARS.map(c=>`<button class="mode ${A.char===c.k?'sel':''}" data-c="${c.k}" style="grid-template-columns:1fr"><span><span class="tt">${esc(c.n)}</span><span class="tg">${esc(c.d)}</span></span></button>`).join('')}</div>
   <h3 class="eyebrow" style="margin-top:16px">話題</h3><div class="row" style="margin-top:6px">${AI_TOPICS.map(t=>`<button class="tab" data-t="${esc(t)}" aria-selected="${A.topic===t}" style="min-width:0">${esc(t)}</button>`).join('')}</div>
   <div class="set" style="margin-top:16px"><label for="ai-lv">難しさ</label><select id="ai-lv">${ILV.map(l=>`<option value="${l.n}" ${A.level===l.n?'selected':''}>${l.k}${l.n===aiLevel()?'(いまの実力の目安)':''}</option>`).join('')}</select>
   <label for="ai-hj">日本語ヒント</label><select id="ai-hj"><option value="1" ${A.hintJa?'selected':''}>つける</option><option value="0" ${A.hintJa?'':'selected'}>つけない</option></select>
   <label for="ai-rate">AIの話す速さ</label><input type="range" id="ai-rate" min="0.6" max="1.2" step="0.05" value="${S.set.aiRate||0.95}"></div>
   <div class="next"><button class="btn hl" id="ai-go">${IC.talk}会話をはじめる</button></div>
  </section>`;
  wireGo(app);
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{A.char=b.dataset.c;S.set.aiChar=A.char;save();render()});
  app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{A.topic=b.dataset.t;S.set.aiTopic=A.topic;save();render()});
  app.querySelector('#ai-lv').onchange=e=>A.level=+e.target.value;
  app.querySelector('#ai-hj').onchange=e=>A.hintJa=e.target.value==='1';
  app.querySelector('#ai-rate').oninput=e=>{S.set.aiRate=+e.target.value;save()};
  app.querySelector('#ai-go').onclick=()=>{A.live=true;A.msgs=[];A.t0=Date.now();render();aiTurn(null)};
  return}
 const ch=AI_CHARS.find(c=>c.k===A.char);
 app.innerHTML=`<div class="row"><button class="back" id="ai-quit">← やめる</button><span class="sp"></span><span class="eyebrow">${esc(ch.n)} ・ ${esc(A.topic)}</span></div>
 <section class="sheet panel"><div class="chat" id="ai-chat"></div><div id="ai-turn" style="margin-top:14px"></div>
  <div class="next"><button class="btn ghost" id="ai-end">会話を終えてフィードバック</button></div></section>`;
 const $=s=>app.querySelector(s);
 $('#ai-quit').onclick=()=>{A.live=false;stopAllAudio();go({name:'ai'},true)};
 $('#ai-end').onclick=()=>aiFeedback();
 A.msgs.forEach(m=>aiBubble(m));
};
function aiBubble(m){const chat=document.getElementById('ai-chat');if(!chat)return;const d=document.createElement('div');d.className='bub '+(m.role==='user'?'me':'p');
 d.innerHTML=`<div class="who">${m.role==='user'?'You':'AI'} ${sayBtn(m.content,m.role==='user'?'f':'m')}</div><div class="e en">${esc(m.content)}</div>${m.hint?jaD(esc(m.hint)):''}${m.fix?`<div class="n">より自然に:<span class="en">${esc(m.fix)}</span></div>`:''}`;
 chat.appendChild(d);wireSay(d);wireJa(d);d.scrollIntoView({block:'nearest',behavior:'smooth'})}
async function aiTurn(userText){const A=RT.ai;const turn=document.getElementById('ai-turn');if(!turn)return;
 turn.innerHTML='<p class="muted">AIが考えています…</p>';
 try{
  const r=await aiCall('chat',{character:A.char,topic:A.topic,level:A.level,hint_ja:A.hintJa,messages:A.msgs.slice(-16).map(m=>({role:m.role,content:m.content}))});
  const reply=String(r.reply||'').slice(0,600);if(!reply)throw new Error('AIから返事がありませんでした。');
  if(userText&&r.fix&&A.msgs.length){const last=A.msgs[A.msgs.length-1];if(last.role==='user'){last.fix=String(r.fix).slice(0,300)}}
  const m={role:'assistant',content:reply,hint:r.hint_ja?String(r.hint_ja).slice(0,300):''};A.msgs.push(m);
  document.getElementById('ai-chat').innerHTML='';A.msgs.forEach(aiBubble);
  const keep=S.set.rate;S.set.rate=keep*(S.set.aiRate||0.95);const p=speak(reply,{g:'m'});S.set.rate=keep;
  aiAnswer();await p;
 }catch(e){turn.innerHTML=`<div class="fb ng"><span class="verdict" style="font-size:26px">!</span><div><b>AIにつながりませんでした</b><div>${esc(e.message||e)}</div></div></div><div class="next"><button class="btn" id="ai-retry">もう一度送る</button></div>`;
  turn.querySelector('#ai-retry').onclick=()=>aiTurn(userText)}
}
function aiAnswer(){const turn=document.getElementById('ai-turn');if(!turn)return;const A=RT.ai;
 answerBox(turn,{hintHtml:A.hintJa?'言いたいことがまとまらないときは、短く Yes / No と理由をひとこと言ってみましょう。':null}).then(res=>{
  if(res.gaveUp){A.msgs.push({role:'user',content:"Sorry, I'm not sure how to say it. Could you help me?"})}
  else{A.msgs.push({role:'user',content:res.text.slice(0,400)});if(!res.typed){S.said++;dayRec().said++}logEv({m:'ai',ok:true,ms:res.ms,h:res.hint,f:true,r:'ai'+A.t0+'-'+A.msgs.length})}
  addXP(4);aiTurn(res.text)})}
async function aiFeedback(){const A=RT.ai;stopAllAudio();const turn=document.getElementById('ai-turn');
 const mine=A.msgs.filter(m=>m.role==='user');if(!mine.length){A.live=false;return go({name:'ai'},true)}
 turn.innerHTML='<p class="muted">フィードバックを作っています…</p>';
 let fb=null;try{fb=await aiCall('feedback',{level:A.level,messages:A.msgs.slice(-30).map(m=>({role:m.role,content:m.content}))},40000)}catch(e){turn.innerHTML=`<p class="bad">${esc(e.message)}</p>`}
 const items=(fb&&Array.isArray(fb.items)?fb.items:[]).slice(0,10);
 items.forEach(it=>{if(it.better)addWeak(String(it.better).slice(0,200),String(it.why||'').slice(0,200),'AI会話')});
 A.live=false;save();
 turn.innerHTML=`<div class="sheet panel" style="border:2px solid var(--ink)"><div class="eyebrow">FEEDBACK</div>
  ${fb&&fb.summary?`<p>${esc(String(fb.summary).slice(0,600))}</p>`:''}
  ${items.length?items.map(it=>`<div class="ex" style="grid-template-columns:1fr"><div class="j">あなた:<span class="en">${esc(it.you||'')}</span></div><div class="e en"><b>${esc(it.better||'')}</b> ${it.better?sayBtn(String(it.better)):''}</div><div class="n">${esc(it.why||'')}</div></div>`).join('')+'<p class="muted">提案された言い方は苦手リストに入り、シャドーイングや復習で出てきます。</p>':'<p class="muted">言い換えの提案はありませんでした。</p>'}
  <div class="next"><button class="btn hl" id="ai-new">もう一度話す</button></div></div>`;
 wireSay(turn);turn.querySelector('#ai-new').onclick=()=>go({name:'ai'},true);
}

// ===== home / settings / review =====
function nextGram(){return GRAM.filter(g=>g.lv<=S.goal).find(g=>!(S.gStars[g.id]>=1))||GRAM.find(g=>!(S.gStars[g.id]>=3))||GRAM[0]}
function nextTalk(){return TALK.filter(t=>t.lv<=S.goal).find(t=>!(S.tStars[t.id]>=1))||TALK.find(t=>!(S.tStars[t.id]>=3))||TALK[0]}
VIEWS.home=function(app){
 const L=lvOf(S.xp),D=dailyNow();const ng=nextGram(),nt=nextTalk();
 const gDone=GRAM.filter(g=>S.gStars[g.id]>=1).length,tDone=TALK.filter(t=>S.tStars[t.id]>=1).length;
 const due=vDue().length;
 const tcN=Object.values(S.tc).reduce((s,x)=>s+x[1],0),tcC=Object.values(S.tc).reduce((s,x)=>s+x[0],0);
 app.innerHTML=`
 <section class="sheet hero">
  <div class="lvbig">${ring(D.xp/DAILY)}<div><div class="s">LEVEL</div><div class="n">${L}</div><div class="s">${D.xp>=DAILY?'目標達成':'きょう '+D.xp+'/'+DAILY}</div></div></div>
  <div style="min-width:0">
   <div class="eyebrow">きょうのノート</div>
   <h1>${title(L)}</h1>
   <div class="stats"><span><b>${S.streak}</b>日連続</span><span><b>${vMastered()}</b>語 定着</span><span><b>${S.said}</b>回 発話</span><span><b>${S.correct}</b>問 正解</span></div>
   <div class="row"><span class="eyebrow">目標レベル</span>${LV.map(l=>`<button class="tab" data-goal="${l.n}" aria-selected="${S.goal===l.n}" style="min-width:0;padding:3px 10px 5px">${l.k}<small>${l.s}</small></button>`).join('')}</div>
  </div>
 </section>

 <section class="sec">
  <h2>きょうのメニュー</h2>
  <div class="sheet pad today">
   <div class="todo ${D.v>=10?'done':''}"><span class="ck">✓</span><div class="tx"><b>単語を10語</b><small style="display:block">${due?`復習の時期が来た単語 ${due} 語 + 新しい単語`:'新しい単語を覚える'}</small></div><button class="btn sm hl" id="m-v">はじめる</button></div>
   <div class="todo ${D.t>=1?'done':''}"><span class="ck">✓</span><div class="tx"><b>会話シーンを1つ</b><small style="display:block">次のおすすめ:${esc(nt.t)}</small></div><button class="btn sm hl" data-go='${JSON.stringify({name:'talk',id:nt.id})}'>話す</button></div>
   <div class="todo ${D.q>=1?'done':''}"><span class="ck">✓</span><div class="tx"><b>文法かTOEIC形式を1セット</b><small style="display:block">次のおすすめ:${esc(ng.t)}</small></div><button class="btn sm hl" data-go='${JSON.stringify({name:'gram',id:ng.id})}'>学ぶ</button></div>
  </div>
 </section>

 <section class="sec">
  <h2>学ぶ</h2>
  <div class="modes">
   <button class="mode" data-go='{"name":"talks"}'><span class="ic">${IC.talk}</span><span><span class="tt">会話ロールプレイ</span><span class="tg">相手のセリフを聞いて、返事を選んで、声に出す</span><span class="pg">${tDone} / ${TALK.length} シーン</span></span></button>
   <button class="mode" data-go='{"name":"grams"}'><span class="ic">${IC.book}</span><span><span class="tt">文法</span><span class="tg">たとえでイメージ → 並べかえ → チャレンジ</span><span class="pg">${gDone} / ${GRAM.length} 単元</span></span></button>
   <button class="mode" data-go='{"name":"vocab"}'><span class="ic">${IC.card}</span><span><span class="tt">単語・フレーズ</span><span class="tg">忘れかけた頃に出てくる復習つき(${VOC.length}語)</span><span class="pg">${vMastered()} 語 定着 ・ ${vSeen()} 語 学習ずみ</span></span></button>
   <button class="mode" data-go='{"name":"toeic"}'><span class="ic">${IC.test}</span><span><span class="tt">TOEIC形式 演習</span><span class="tg">Part 2・3・5・6・7 のオリジナル問題</span><span class="pg">${tcN?`正答率 ${Math.round(tcC/tcN*100)}%(${tcN}問)`:'まだ挑戦していません'}</span></span></button>
  </div>
  ${S.miss.length?`<div class="row" style="margin-top:12px"><button class="btn ghost" data-go='{"name":"review"}'>まちがいノート(${S.miss.length}問)を復習する</button></div>`:''}
 </section>

 <section class="sec">
  <h2>スタンプ帳</h2>
  <div class="sheet pad"><div class="stamps">${BADGES.map(b=>`<div class="stamp ${S.badges[b.id]?'got':''}"><div class="seal">${b.s}</div>${esc(b.n)}</div>`).join('')}</div></div>
 </section>

 <footer class="foot">
  学習記録はこの端末のブラウザ(localStorage)にだけ保存され、サーバーには送信しません。音声認識はブラウザの機能を使うため、ブラウザによっては音声が提供元(Chromeの場合はGoogleなど)のサーバーで処理されることがあります。<br>
  レベル区分(〜600 / 600〜730 / 730〜860 / 860〜990)は教材の難しさの目安で、このアプリの成績から実際のTOEICスコアを予測するものではありません。<br>
  TOEIC is a registered trademark of ETS. This app is not endorsed or approved by ETS. 問題はすべてオリジナルです。
 </footer>`;
 wireGo(app);
 app.querySelectorAll('[data-goal]').forEach(b=>b.onclick=()=>{S.goal=+b.dataset.goal;S.vlv=S.goal;save();render()});
 app.querySelector('#m-v').onclick=()=>startVocab('mix');
};

VIEWS.settings=function(app){
 const vs=TTS.voices;
 app.innerHTML=`
 <div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><h1>設定</h1></div>
 <section class="sheet panel">
  <div class="set">
   <label for="s-acc">英語の発音</label><select id="s-acc">${[['en-US','アメリカ英語'],['en-GB','イギリス英語'],['en-AU','オーストラリア英語'],['en-CA','カナダ英語'],['mix','ミックス(TOEICのように毎回ちがう発音)']].map(([v,n])=>`<option value="${v}" ${S.set.accent===v?'selected':''}>${n}</option>`).join('')}</select>
   <label for="s-rate">読み上げの速さ</label><div class="row"><input type="range" id="s-rate" min="0.6" max="1.3" step="0.05" value="${S.set.rate}"><output id="o-rate" class="en">${S.set.rate}x</output></div>
   <label for="s-voice">優先する声</label><select id="s-voice"><option value="">自動で選ぶ</option>${vs.map(v=>`<option value="${esc(v.name)}" ${S.set.voice===v.name?'selected':''}>${esc(v.name)} (${v.lang})</option>`).join('')}</select>
   <label for="s-ja">日本語訳</label><select id="s-ja"><option value="1" ${S.set.showJa?'selected':''}>表示する</option><option value="0" ${!S.set.showJa?'selected':''}>隠す(タップで表示)</option></select>
   <label for="s-hide">会話の英文</label><select id="s-hide"><option value="0" ${!S.set.hideEn?'selected':''}>はじめから表示</option><option value="1" ${S.set.hideEn?'selected':''}>聞いてから表示(リスニング強化)</option></select>
   <label for="s-th">画面の色</label><select id="s-th">${[['auto','端末に合わせる'],['light','ノート(明るい)'],['dark','夜の机(暗い)']].map(([v,n])=>`<option value="${v}" ${S.set.theme===v?'selected':''}>${n}</option>`).join('')}</select>
  </div>
  <div class="row" style="margin-top:16px"><button class="btn hl" id="s-test">${IC.play}試しに聞く</button><span class="sp"></span></div>
  <p class="note" style="margin-top:16px">使える声の種類は端末とブラウザによって違います(${vs.length}種類の英語の声が見つかりました)。声が機械的に聞こえる場合は、端末の設定で英語の高品質な音声を追加すると改善することがあります。音声認識(マイク)は、Chrome・Edge・Safari などの対応ブラウザで使えます。</p>
 </section>
 <section class="sheet panel">
  <h3 class="eyebrow">学習記録</h3>
  <p>学習記録はこの端末のブラウザに保存されています。消すと元に戻せません。</p>
  <div class="row" id="rst"><button class="btn ghost" id="s-reset">学習記録をリセット</button></div>
 </section>`;
 wireGo(app);
 const $=s=>app.querySelector(s);
 $('#s-acc').onchange=e=>{S.set.accent=e.target.value;save()};
 $('#s-rate').oninput=e=>{S.set.rate=+e.target.value;$('#o-rate').textContent=S.set.rate+'x';save()};
 $('#s-voice').onchange=e=>{S.set.voice=e.target.value;save()};
 $('#s-ja').onchange=e=>{S.set.showJa=e.target.value==='1';save()};
 $('#s-hide').onchange=e=>{S.set.hideEn=e.target.value==='1';save()};
 $('#s-th').onchange=e=>{S.set.theme=e.target.value;applyTheme();save()};
 $('#s-test').onclick=()=>speakSeq([{text:"Hi, nice to meet you. How's your day going?",g:'f'},{text:"Pretty good, thanks. Let's practice English together.",g:'m'}]);
 $('#s-reset').onclick=()=>{$('#rst').innerHTML=`<span>本当にリセットしますか?</span><button class="btn" id="s-yes">リセットする</button><button class="btn ghost" id="s-no">やめる</button>`;
  $('#s-yes').onclick=()=>{const set=S.set;S=structuredClone(DEF);S.set=set;save();toast('リセットしました');go({name:'home'})};$('#s-no').onclick=()=>render()};
};

VIEWS.review=function(app){
 const items=S.miss.map(missToItem).filter(Boolean);
 if(!items.length){app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div><section class="sheet panel"><p>まちがいノートは空です。</p></section>`;return wireGo(app)}
 startQuiz({title:'まちがいノートの復習',back:{name:'home'},backLabel:'ホーム',items:pick(items,10),xp:8,retry:()=>go({name:'review'})});
};
function missToItem(r){
 if(r.t==='g'){const u=gById(r.u);const q=u&&u.q[r.i];if(!q)return null;return gramItem(u,q,r.i)}
 if(r.t==='p5'){const q=P5[r.i];if(!q)return null;return p5Item(q,r.i)}
 if(r.t==='p2'){const q=P2[r.i];if(!q)return null;return p2Item(q,r.i)}
 return null;
}

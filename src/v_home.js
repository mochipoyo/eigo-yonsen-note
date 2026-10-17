// ===== home / コース / 記録 / 設定 / まちがいノート =====
function nextGram(){return GRAM.filter(g=>g.lv<=S.goal).find(g=>!(S.gStars[g.id]>=1))||GRAM.find(g=>!(S.gStars[g.id]>=3))||GRAM[0]}
function nextTalk(){return TALK.filter(t=>t.lv<=S.goal).find(t=>!(S.tStars[t.id]>=1))||TALK.find(t=>!(S.tStars[t.id]>=3))||TALK[0]}
const pct=v=>v==null?'—':Math.round(v*100)+'%';
VIEWS.home=function(app){
 ensureQuests();const gap=welcomeBack();const r=dayRec();if(r.rd<0){r.rd=phDue().length+vDue().length}save();
 const L=S.lesson,lp=lessonProgress();const lessonToday=L&&L.d===today();
 const tl=talkLevel();const y=S.days[dayPlus(-1)]||{};
 const dq=S.dq.ids.map(id=>DQ_POOL.find(q=>q.id===id)).filter(Boolean);
 const due=phDue().length+vDue().length+weakDue().length;
 app.innerHTML=`
 ${LOAD_NOTE?`<p class="note">${esc(LOAD_NOTE)}</p>`:''}
 ${gap?`<p class="note">おかえりなさい。${gap}日ぶりです。お休みしても記録はそのまま。今日の15分から気軽に再開しましょう。</p>`:''}
 <section class="sheet hero2">
  <div class="eyebrow">きょうのノート ・ ${today().slice(5).replace('-','/')}</div>
  <button class="startbtn" id="h-start"><span class="sb-main">${lessonToday&&L.done?'今日のレッスン完了!もう一度':lessonToday&&lp>0?'今日のレッスンを続ける':L&&!L.done&&L.d!==today()?'前回の続きから始める':'今日のレッスンを始める'}</span>
   <span class="sb-sub">${(L&&!L.done?L.len:S.set.lessonLen||15)}分 ・ 復習 → リスニング → 瞬間英会話 → シャドーイング → クエスト</span>
   <span class="sb-bar"><span style="width:${lessonToday?lp*100:0}%"></span></span></button>
  <div class="row" style="margin-top:10px"><small class="muted">時間:</small>${[5,15,30].map(m=>`<button class="tab" data-len="${m}" aria-selected="${(S.set.lessonLen||15)===m}" style="min-width:0;padding:2px 10px">${m}分</button>`).join('')}<span class="sp"></span><small class="muted">復習待ち ${due}</small></div>
 </section>

 <section class="sheet pad today2">
  <div class="row"><b>きょうのクエスト</b><span class="sp"></span><small class="muted">連続 ${S.streak}日 ・ 英会話レベル「${tl?TALK_TITLES[tl].n:'これから'}」</small></div>
  ${dq.map(q=>{const v=Math.min(q.goal,dqVal(q));const d=S.dq.done[q.id];return `<div class="todo ${d?'done':''}"><span class="ck">✓</span><div class="tx">${esc(q.n)}</div><small class="en">${v}/${q.goal}</small></div>`}).join('')}
  <div class="grow"><small class="muted">きのうとの比較:</small> 話した回数 <b>${r.said||0}</b>${y.said!=null?`<small>(きのう ${y.said})</small>`:''} ・ 学習 <b>${Math.round((r.sec||0)/60)}</b>分${y.sec!=null?`<small>(きのう ${Math.round(y.sec/60)}分)</small>`:''}</div>
 </section>

 <section class="sec">
  <h2>コース</h2>
  <div class="modes">
   <button class="mode" data-go='{"name":"speak"}'><span class="ic">${IC.talk}</span><span><span class="tt">英会話コース</span><span class="tg">瞬間英会話・フレーズ復習・耳から英語・シャドーイング・会話クエスト・AI会話</span></span></button>
   <button class="mode" data-go='{"name":"toeicc"}'><span class="ic">${IC.test}</span><span><span class="tt">TOEIC対策コース</span><span class="tg">文法・単語・TOEIC形式(Part 2・3・5・6・7)</span></span></button>
   <button class="mode wmode" data-go='{"name":"world"}' style="grid-column:1/-1"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="6" r="3"/><path d="M9 9v6l-3 6M9 15l3 6M5 12h8"/><path d="M15 8l5-3M18 14h4"/></svg></span><span><span class="tt">うごかす英語ワールド</span><span class="tg">人物や物を動かしながら、英語を感覚的に覚えよう！</span><span class="pg">12シーン ・ 見つけた英文 ${Object.values(S.world||{}).reduce((a,r)=>a+Object.keys(r.found||{}).length,0)}</span></span></button>
   <button class="mode" data-go='{"name":"school"}' style="grid-column:1/-1"><span class="ic" style="font-size:13px">中高</span><span><span class="tt">中1〜高3 英語の総復習</span><span class="tg">学年ごとの要点と確認テスト・まとめテスト・診断テスト</span><span class="pg">${SCHOOL.filter(u=>(S.sch||{})[u.id]>=1).length} / ${SCHOOL.length} 単元</span></span></button>
  </div>
  <div class="row" style="margin-top:12px"><button class="btn ghost" data-go='{"name":"stats"}'>進み具合と苦手分析</button><button class="btn ghost" data-go='{"name":"map"}'>学習マップ</button>${S.weak.length?`<button class="btn ghost" data-go='{"name":"weak"}'>苦手リスト(${S.weak.length})</button>`:''}</div>
 </section>

 <footer class="foot">
  学習記録はこの端末のブラウザにだけ保存されます(設定から書き出し・読み込みできます)。音声認識はブラウザの機能を使うため、ブラウザによっては音声が提供元(Chromeの場合はGoogleなど)のサーバーで処理されることがあります。録音機能の音声は端末の外へ送信しません。<br>
  「一致度」は文字起こしと模範解答の比較で、発音の採点ではありません。レベル区分はTOEICスコアを予測・保証するものではありません。<br>
  TOEIC is a registered trademark of ETS. This app is not endorsed or approved by ETS. 問題はすべてオリジナルです。
 </footer>`;
 wireGo(app);
 app.querySelector('#h-start').onclick=startTodayLesson;
 app.querySelectorAll('[data-len]').forEach(b=>b.onclick=()=>{S.set.lessonLen=+b.dataset.len;if(S.lesson&&!S.lesson.done&&S.lesson.i===0)S.lesson=null;save();render()});
};
VIEWS.speak=function(app){
 const m=metrics();
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">SPEAKING COURSE</span><h1>英会話コース</h1><p>日本語に訳さずに聞き、選択肢を見ずに自分の英語で話す練習です。</p></div>
 ${themeBar()}
 <div class="modes">
  <button class="mode" data-go='{"name":"instant"}'><span class="ic">${IC.mic}</span><span><span class="tt">瞬間英会話</span><span class="tg">英語の質問を聞いて、すぐ英語で答える</span><span class="pg">いまの難易度:${ILV[(S.insLv||1)-1].k}${S.insAuto?'(自動)':''}</span></span></button>
  <button class="mode" data-go='{"name":"phrases"}'><span class="ic">${IC.redo}</span><span><span class="tt">フレーズ復習</span><span class="tg">同じ表現を、毎回ちがう場面で思い出す</span><span class="pg">きょうの復習 ${phDue().length} ・ 定着 ${Object.values(S.ph).filter(s=>s.b>=4).length}/${PHRASES.length}</span></span></button>
  <button class="mode" data-go='{"name":"listen"}'><span class="ic">${IC.play}</span><span><span class="tt">耳から英語</span><span class="tg">音だけで理解 → 英文 → 訳 → もう一度</span><span class="pg">理解度 ${pct(m.listen)} ・ 聞き取り復習 ${S.lrev.length}</span></span></button>
  <button class="mode" data-go='{"name":"shadow"}'><span class="ic">${IC.slow}</span><span><span class="tt">シャドーイング</span><span class="tg">リピート・シャドーイング・録音比較</span><span class="pg">練習 ${Object.values(S.sh).reduce((s,x)=>s+(x.n||0),0)} 回</span></span></button>
  <button class="mode" data-go='{"name":"map"}'><span class="ic">Q</span><span><span class="tt">会話クエスト</span><span class="tg">返事で展開が変わる。最後は自分の言葉で</span><span class="pg">クリア ${QUESTS.filter(q=>isCleared(q.id)).length}/${QUESTS.length} ・ 会話シーン ${TALK.filter(t=>S.tStars[t.id]>=1).length}/${TALK.length}</span></span></button>
  <button class="mode" data-go='{"name":"ai"}'><span class="ic">AI</span><span><span class="tt">AI自由英会話</span><span class="tg">キャラクターを選んで自由に話す</span><span class="pg">${aiReady()?'利用できます':'未設定(設定が必要です)'}</span></span></button>
  <button class="mode" data-go='{"name":"talks"}' style="grid-column:1/-1"><span class="ic">${IC.talk}</span><span><span class="tt">会話ロールプレイ(16シーン)</span><span class="tg">キーフレーズ練習つきの基本シーン</span></span></button>
 </div>`;
 wireGo(app);wireThemeBar(app);
};
VIEWS.instant=function(app){
 const lv=S.insLv||1;
 app.innerHTML=`<div class="row">${backBtn('英会話コース',{name:'speak'})}</div>
 <div class="uhead"><span class="eyebrow">QUICK RESPONSE</span><h1>瞬間英会話</h1><p>英語の質問が流れます。英文と訳は最初は隠れています。マイクで英語で答えると、意味が通じるか・模範解答との一致・反応時間・ヒントの有無を分けて表示します。</p></div>
 ${themeBar()}
 <section class="sheet panel">
  <div class="tabs">${ILV.map(l=>`<button class="tab" data-lv="${l.n}" aria-selected="${lv===l.n}">${l.k}<small>${['3択から選んで言う','日本語ヒントで自由回答','ヒントなし','音声だけ・時間制限'][l.n-1]}</small></button>`).join('')}</div>
  <label class="tg" style="margin-top:8px"><input type="checkbox" id="in-auto" ${S.insAuto?'checked':''}> 成績に合わせて難易度を自動で上げ下げする</label>
  <div class="next"><button class="btn hl" id="in-go">${IC.mic}8問はじめる</button></div>
  <small class="muted">まちがえた問題・時間がかかった問題・ヒントを使った問題・復習の時期が来た問題を優先して出題します。十分に言えるようになった問題は出る回数が減ります。</small>
 </section>`;
 wireGo(app);wireThemeBar(app);
 app.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{S.insLv=+b.dataset.lv;save();render()});
 app.querySelector('#in-auto').onchange=e=>{S.insAuto=e.target.checked;save()};
 app.querySelector('#in-go').onclick=()=>startInstant();
};
function themeBar(){return `<div class="themebar"><span class="eyebrow">テーマ</span><button class="tab" data-th="" aria-selected="${!S.themes.length}" style="min-width:0">すべて</button>${THEMES.map(t=>`<button class="tab" data-th="${t.k}" aria-selected="${S.themes.includes(t.k)}" style="min-width:0">${esc(t.n)}</button>`).join('')}</div>`}
function wireThemeBar(app){app.querySelectorAll('[data-th]').forEach(b=>b.onclick=()=>{const k=b.dataset.th;if(!k)S.themes=[];else S.themes=S.themes.includes(k)?S.themes.filter(x=>x!==k):[...S.themes,k];save();render()})}
VIEWS.toeicc=function(app){
 const gDone=GRAM.filter(g=>S.gStars[g.id]>=1).length;const tcN=Object.values(S.tc).reduce((s,x)=>s+x[1],0),tcC=Object.values(S.tc).reduce((s,x)=>s+x[0],0);
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">TOEIC COURSE</span><h1>TOEIC対策コース</h1><p>目標レベルに合わせて、文法・単語・TOEIC形式の問題を練習します。</p>
 <div class="row"><span class="eyebrow">目標レベル</span>${LV.map(l=>`<button class="tab" data-goal="${l.n}" aria-selected="${S.goal===l.n}" style="min-width:0;padding:3px 10px 5px">${l.k}<small>${l.s}</small></button>`).join('')}</div></div>
 <div class="modes">
  <button class="mode" data-go='{"name":"grams"}'><span class="ic">${IC.book}</span><span><span class="tt">文法</span><span class="tg">たとえでイメージ → 並べかえ → チャレンジ</span><span class="pg">${gDone} / ${GRAM.length} 単元 ・ 次:${esc(nextGram().t)}</span></span></button>
  <button class="mode" data-go='{"name":"vocab"}'><span class="ic">${IC.card}</span><span><span class="tt">単語・フレーズ</span><span class="tg">忘れかけた頃に出てくる復習つき(${VOC.length}語)</span><span class="pg">${vMastered()} 語 定着 ・ 復習 ${vDue().length}</span></span></button>
  <button class="mode" data-go='{"name":"toeic"}'><span class="ic">${IC.test}</span><span><span class="tt">TOEIC形式 演習</span><span class="tg">Part 2・3・5・6・7 のオリジナル問題</span><span class="pg">${tcN?`正答率 ${Math.round(tcC/tcN*100)}%(${tcN}問)`:'まだ挑戦していません'}</span></span></button>
 </div>
 ${S.miss.length?`<div class="row" style="margin-top:12px"><button class="btn ghost" data-go='{"name":"review"}'>まちがいノート(${S.miss.length}問)を復習する</button></div>`:''}`;
 wireGo(app);
 app.querySelectorAll('[data-goal]').forEach(b=>b.onclick=()=>{S.goal=+b.dataset.goal;S.vlv=S.goal;save();render()});
};
VIEWS.weak=function(app){
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">WEAK POINTS</span><h1>苦手リスト</h1><p>言えなかった・時間がかかった・ヒントを使った英文が自動で入ります。シャドーイングやレッスンで練習し、ヒントなしで3回言えると「克服」としてリストから外れます。</p></div>
 <section class="sheet panel">${S.weak.length?`<div class="row" style="margin-bottom:10px"><button class="btn hl" id="wk-sh">シャドーイングで練習</button></div>
 <div class="exs">${[...S.weak].reverse().map((w,i)=>`<div class="ex">${sayBtn(w.en)}<div><div class="e en">${esc(w.en)}</div>${w.ja?`<div class="j">${esc(w.ja)}</div>`:''}<small class="muted">${esc(w.src)} ・ ${esc(w.at)} ・ 克服まで ${3-(w.b||0)}</small></div></div>`).join('')}</div>`:'<p>苦手リストは空です。</p>'}</section>`;
 wireGo(app);wireSay(app);
 const b=app.querySelector('#wk-sh');if(b)b.onclick=()=>startShadow({items:S.weak.slice(-8).map(w=>({en:w.en,ja:w.ja}))});
};
VIEWS.stats=function(app){
 const m=metrics(),m7=metrics(dayPlus(-6));
 const cal=[...Array(30)].map((_,i)=>dayPlus(i-29));
 const mx=Math.max(60,...cal.map(d=>(S.days[d]||{}).sec||0));
 const studied=cal.filter(d=>(S.days[d]||{}).n>0).length;
 const tl=talkLevel();
 const rows=[['リスニング理解度',m.listen,'耳から英語・Part 2・3 の正答率'],['英文を自力で作る力',m.produce,'ヒントなしで、自分で話して通じた割合'],
  ['ヒントなしで答えた割合',m.nohint,'話す練習のうち、ヒントを使わなかった割合'],['フレーズ定着率',m.retain,'学習したフレーズのうち記憶の箱4以上'],
  ['文法理解度',m.grammar,'文法チャレンジ・Part 5・6 の正答率'],['復習の達成率(7日)',m.review,'復習の時期が来たうち、その日に復習できた割合']];
 // 苦手分析: よくまちがえるテーマ
 const thStat=THEMES.map(t=>{const ids=new Set([...INSTANT,...PHRASES,...LISTEN].filter(x=>x.theme===t.k).map(x=>x.id));const ev=S.log.filter(e=>ids.has(e.r)).slice(-60);return {t,n:ev.length,r:rate(ev)}}).filter(x=>x.n>=3).sort((a,b)=>a.r-b.r);
 ensureQuests();
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">PROGRESS</span><h1>進み具合と苦手分析</h1><p>経験値ではなく、聞く・話す実績から計算しています(記録が少ないうちは「—」)。</p></div>
 <section class="sheet panel"><div class="row"><div><div class="eyebrow">英会話レベル</div><div class="one">${tl?esc(TALK_TITLES[tl].n):'これから'}</div><small class="muted">${tl?esc(TALK_TITLES[tl].d):'話す練習を10回以上すると判定します'}</small></div><span class="sp"></span><div style="text-align:right"><div class="eyebrow">経験値レベル</div><div class="one">Lv.${lvOf(S.xp)}</div><small class="muted">${esc(title(lvOf(S.xp)))}</small></div></div></section>
 <section class="sheet panel"><h3 class="eyebrow">力の内訳(全期間 / 直近7日)</h3>
  <div class="mets">${rows.map(([n,v,d],i)=>{const w=[m7.listen,m7.produce,m7.nohint,m7.retain,m7.grammar,m7.review][i];return `<div class="met"><div class="row"><b>${n}</b><span class="sp"></span><span class="en">${pct(v)}</span><small class="muted">/ ${pct(w)}</small></div><div class="meter" style="max-width:none"><span style="width:${(v||0)*100}%"></span></div><small class="muted">${d}</small></div>`}).join('')}
  <div class="met"><div class="row"><b>会話の反応速度</b><span class="sp"></span><span class="en">${m.speed?(m.speed/1000).toFixed(1)+'秒':'—'}</span><small class="muted">/ ${m7.speed?(m7.speed/1000).toFixed(1)+'秒':'—'}</small></div><small class="muted">質問を聞き終えてから話し始めるまで(中央値)</small></div></div></section>
 <section class="sheet panel"><h3 class="eyebrow">苦手なテーマ</h3>${thStat.length?thStat.slice(0,4).map(x=>`<div class="row"><b>${esc(x.t.n)}</b><span class="sp"></span><span>${pct(x.r)}</span><small class="muted">(${x.n}回)</small></div>`).join(''):'<p class="muted">記録がたまると表示します。</p>'}
  <p style="margin:8px 0 0"><small class="muted">出題は「まちがえた・時間がかかった・ヒントを使った・復習の時期が来た」ものを優先します。</small></p></section>
 <section class="sheet panel"><div class="row"><h3 class="eyebrow">30日間の学習カレンダー</h3><span class="sp"></span><small class="muted">${studied}日学習 ・ 連続 ${S.streak}日</small></div>
  <div class="cal">${cal.map(d=>{const r=S.days[d]||{};const v=(r.sec||0)/mx;return `<div class="cd" title="${d}:約${Math.round((r.sec||0)/60)}分" style="--v:${r.n?Math.max(.18,v):0}"><span>${+d.slice(8)}</span></div>`}).join('')}</div>
  <small class="muted">休んでもペナルティはありません。色の濃さは学習時間の目安です。</small></section>
 <section class="sheet panel"><h3 class="eyebrow">週間チャレンジ</h3>${WK.map(w=>{const v=Math.min(w.goal,w.val());return `<div class="todo ${S.wk.done[w.id]?'done':''}"><span class="ck">✓</span><div class="tx">${esc(w.n)}</div><small class="en">${v}/${w.goal}</small></div>`}).join('')}</section>
 <section class="sheet panel"><h3 class="eyebrow">スタンプ帳</h3><div class="stamps">${BADGES.map(b=>`<div class="stamp ${S.badges[b.id]?'got':''}"><div class="seal">${b.s}</div>${esc(b.n)}</div>`).join('')}</div></section>`;
 wireGo(app);
};

VIEWS.settings=function(app){
 const vs=TTS.voices;
 app.innerHTML=`
 <div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><h1>設定</h1></div>
 <section class="sheet panel">
  <h3 class="eyebrow">音声</h3>
  <div class="set">
   <label for="s-acc">英語の発音</label><select id="s-acc">${[['en-US','アメリカ英語'],['en-GB','イギリス英語'],['en-AU','オーストラリア英語'],['en-CA','カナダ英語'],['mix','ミックス(TOEICのように毎回ちがう発音)']].map(([v,n])=>`<option value="${v}" ${S.set.accent===v?'selected':''}>${n}</option>`).join('')}</select>
   <label for="s-rate">読み上げの速さ</label><div class="row"><input type="range" id="s-rate" min="0.6" max="1.3" step="0.05" value="${S.set.rate}"><output id="o-rate" class="en">${S.set.rate}x</output></div>
   <label for="s-voice">優先する声</label><select id="s-voice"><option value="">自動で選ぶ</option>${vs.map(v=>`<option value="${esc(v.name)}" ${S.set.voice===v.name?'selected':''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select>
   <label for="s-type">答え方</label><select id="s-type"><option value="0" ${S.set.typeFirst?'':'selected'}>マイクで答える</option><option value="1" ${S.set.typeFirst?'selected':''}>キーボードで答える(声を出せない場所向け)</option></select>
  </div>
  <div class="row" style="margin-top:12px"><button class="btn hl" id="s-test">${IC.play}試しに聞く</button></div>
  <p class="note" style="margin-top:12px">英語の声:${vs.length}種類 ・ 音声認識:${canListen?'使えます':'このブラウザでは使えません(キーボードで答えられます)'} ・ 録音:${canRecord?'使えます':'使えません'}</p>
 </section>
 <section class="sheet panel"><h3 class="eyebrow">表示</h3><div class="set">
   <label for="s-ja">日本語訳</label><select id="s-ja"><option value="1" ${S.set.showJa?'selected':''}>表示する</option><option value="0" ${!S.set.showJa?'selected':''}>隠す(タップで表示)</option></select>
   <label for="s-hide">会話の英文</label><select id="s-hide"><option value="0" ${!S.set.hideEn?'selected':''}>はじめから表示</option><option value="1" ${S.set.hideEn?'selected':''}>聞いてから表示(リスニング強化)</option></select>
   <label for="s-th">画面の色</label><select id="s-th">${[['auto','端末に合わせる'],['light','ノート(明るい)'],['dark','夜の机(暗い)']].map(([v,n])=>`<option value="${v}" ${S.set.theme===v?'selected':''}>${n}</option>`).join('')}</select>
 </div></section>
 <section class="sheet panel"><h3 class="eyebrow">学ぶテーマ</h3><p style="margin:4px 0 8px">選んだテーマの英文・質問・会話が優先して出ます(何も選ばなければすべて)。</p>${themeBar()}</section>
 <section class="sheet panel"><h3 class="eyebrow">AI会話</h3>
  <p style="margin:4px 0 8px">自分で用意したバックエンドのURLを入れると、AI自由英会話とAIによる意味判定が使えます。<b>APIキーそのものはここに入れないでください</b>(バックエンド側に保存します)。</p>
  <div class="set"><label for="s-aiu">バックエンドURL</label><input id="s-aiu" class="search en" placeholder="https://xxxx.workers.dev" value="${esc(S.ai.url||'')}">
  <label for="s-ait">アクセストークン</label><input id="s-ait" class="search en" type="password" autocomplete="off" placeholder="バックエンドで決めた合言葉" value="${esc(S.ai.token||'')}"></div>
  <div class="row" style="margin-top:10px"><button class="btn" id="s-aisave">保存</button><button class="btn ghost" id="s-aitest" ${aiReady()?'':'disabled'}>接続テスト</button><small id="s-aimsg" class="muted"></small></div>
 </section>
 <section class="sheet panel">
  <h3 class="eyebrow">学習記録のバックアップ</h3>
  <p>学習記録はこの端末のブラウザに保存されています。JSONファイルに書き出して、別の端末やブラウザで読み込めます。</p>
  <div class="row"><button class="btn" id="s-exp">JSONに書き出す</button><label class="btn ghost" for="s-imp" style="cursor:pointer">JSONを読み込む</label><input type="file" id="s-imp" accept="application/json,.json" hidden></div>
  <div id="s-impmsg" style="margin-top:10px"></div>
  <div class="row" id="rst" style="margin-top:14px"><button class="btn ghost" id="s-reset">学習記録をリセット</button></div>
 </section>`;
 wireGo(app);wireThemeBar(app);
 const $=s=>app.querySelector(s);
 $('#s-acc').onchange=e=>{S.set.accent=e.target.value;save()};
 $('#s-rate').oninput=e=>{S.set.rate=+e.target.value;$('#o-rate').textContent=S.set.rate+'x';save()};
 $('#s-voice').onchange=e=>{S.set.voice=e.target.value;save()};
 $('#s-type').onchange=e=>{S.set.typeFirst=e.target.value==='1';save()};
 $('#s-ja').onchange=e=>{S.set.showJa=e.target.value==='1';save()};
 $('#s-hide').onchange=e=>{S.set.hideEn=e.target.value==='1';save()};
 $('#s-th').onchange=e=>{S.set.theme=e.target.value;applyTheme();save()};
 $('#s-test').onclick=()=>speakSeq([{text:"Hi, nice to meet you. How's your day going?",g:'f'},{text:"Pretty good, thanks. Let's practice English together.",g:'m'}]);
 $('#s-aisave').onclick=()=>{const u=$('#s-aiu').value.trim();if(u&&!/^https:\/\/[^\s]+$/i.test(u)){$('#s-aimsg').textContent='https:// で始まるURLを入れてください。';return}
  S.ai.url=u;S.ai.token=$('#s-ait').value.trim();save();$('#s-aimsg').textContent=u?'保存しました。':'AI会話をオフにしました。';$('#s-aitest').disabled=!aiReady()};
 $('#s-aitest').onclick=async()=>{$('#s-aimsg').textContent='テスト中…';try{const r=await aiCall('chat',{character:'teacher',topic:'日常',level:1,hint_ja:false,messages:[{role:'user',content:'Hello! This is a connection test.'}]});$('#s-aimsg').textContent='接続できました:'+String(r.reply||'').slice(0,60)}catch(e){$('#s-aimsg').textContent=e.message}};
 $('#s-exp').onclick=()=>{try{exportData();toast('書き出しました')}catch(e){toast('書き出せませんでした')}};
 $('#s-imp').onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>5e6){$('#s-impmsg').innerHTML='<p class="bad">ファイルが大きすぎます。</p>';return}
  const rd=new FileReader();rd.onload=()=>{let ns;try{ns=parseImport(String(rd.result))}catch(err){$('#s-impmsg').innerHTML=`<p class="bad">${esc(err.message)}</p>`;return}
   $('#s-impmsg').innerHTML=`<div class="note">読み込むと、いまの学習記録は置きかわります(いまの記録は端末内に1つだけ控えを残します)。<br>読み込む記録:${ns.xp} XP・単語${Object.keys(ns.voc||{}).length}語・最終学習 ${esc(ns.last||'—')}</div><div class="row" style="margin-top:8px"><button class="btn hl" id="s-impok">読み込む</button><button class="btn ghost" id="s-impno">やめる</button></div>`;
   $('#s-impok').onclick=()=>{applyImport(ns);toast('読み込みました');go({name:'home'})};$('#s-impno').onclick=()=>{$('#s-impmsg').innerHTML='';e.target.value=''}};
  rd.readAsText(f)};
 $('#s-reset').onclick=()=>{$('#rst').innerHTML=`<span>本当にリセットしますか?(先に書き出しておくと安心です)</span><button class="btn" id="s-yes">リセットする</button><button class="btn ghost" id="s-no">やめる</button>`;
  $('#s-yes').onclick=()=>{try{localStorage.setItem(KEY+'-before-reset',JSON.stringify(S))}catch(e){}const set=S.set,ai=S.ai;S=structuredClone(DEF);S.set=set;S.ai=ai;save();toast('リセットしました');go({name:'home'})};$('#s-no').onclick=()=>render()};
};

VIEWS.review=function(app){
 const items=S.miss.map(missToItem).filter(Boolean);
 if(!items.length){app.innerHTML=`<div class="row">${backBtn('TOEIC対策コース',{name:'toeicc'})}</div><section class="sheet panel"><p>まちがいノートは空です。</p></section>`;return wireGo(app)}
 startQuiz({title:'まちがいノートの復習',back:{name:'toeicc'},backLabel:'TOEIC対策コース',items:pick(items,10),xp:8,mode:'gram',retry:()=>go({name:'review'})});
};
function missToItem(r){
 if(r.t==='g'){const u=gById(r.u);const q=u&&u.q[r.i];if(!q)return null;return gramItem(u,q,r.i)}
 if(r.t==='p5'){const q=P5[r.i];if(!q)return null;return p5Item(q,r.i)}
 if(r.t==='p2'){const q=P2[r.i];if(!q)return null;return p2Item(q,r.i)}
 if(r.t==='s'){const u=sById(r.u);const q=u&&u.q[r.i];if(!q||(q.k!=='fill'&&q.k!=='meaning'))return null;
  return q.k==='fill'?{s:blankify(q.s),c:q.c,a:q.a,why:q.why,ref:r,label:u.g+' '+u.t,review:blankify(q.s)}:{s:esc(q.en),c:q.c,a:q.a,why:q.why,ref:r,label:u.g+' '+u.t,jaOpt:true,oneCol:true,review:esc(q.en)}}
 return null;
}

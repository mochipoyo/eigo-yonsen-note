// ===== 今日のおまかせレッスン(5・15・30分) =====
const SEG={
 review:{n:'復習',d:'思い出して話す(フレーズ・苦手)',ic:'redo'},
 lis:{n:'リスニング',d:'耳から英語',ic:'play'},
 ins:{n:'瞬間英会話',d:'質問に英語で即答',ic:'mic'},
 sh:{n:'シャドーイング',d:'お手本をまねして言う',ic:'slow'},
 qst:{n:'会話クエスト',d:'自分の言葉で会話を成立させる',ic:'talk'}};
const PLANS={
 5:[{k:'review',min:1,n:3},{k:'ins',min:2,n:3},{k:'sh',min:2,n:2}],
 15:[{k:'review',min:3,n:5},{k:'lis',min:3,n:4},{k:'ins',min:4,n:5},{k:'sh',min:3,n:3},{k:'qst',min:2,n:1}],
 30:[{k:'review',min:6,n:10},{k:'lis',min:6,n:7},{k:'ins',min:8,n:10},{k:'sh',min:5,n:5},{k:'qst',min:5,n:1}]};
function newLesson(len){S.lesson={d:today(),len,segs:PLANS[len].map(s=>({...s,done:false,ok:0,cnt:0})),i:0,sec0:dayRec().sec,done:false};save()}
function lessonState(){const L=S.lesson;if(!L)return null;return L}
function lessonProgress(){const L=S.lesson;if(!L)return 0;return L.segs.filter(s=>s.done).length/L.segs.length}
function nextQuestId(){for(const st of STAGES){if(!stageOpen(st.n))break;const q=st.items.find(id=>id[0]==='q'&&!isCleared(id));if(q)return q}
 const open=STAGES.filter(s=>stageOpen(s.n)).flatMap(s=>s.items.filter(id=>id[0]==='q'));return open[Math.floor(Math.random()*open.length)]||'q01'}
function runSeg(){const L=S.lesson;const s=L.segs[L.i];if(!s)return go({name:'lesson'},true);
 RT.lc={done:r=>{s.done=true;s.ok=r.ok;s.cnt=r.n;L.i++;if(L.i>=L.segs.length&&!L.done){L.done=true;L.doneAt=today();addXP(30);confetti();checkBadges()}save();RT.lc=null;go({name:'lesson'},true)},
  leave:()=>{RT.lc=null;go({name:'lesson'},true)}};
 const ins=Math.max(1,S.insLv||1);
 if(s.k==='review'){if(!startPhrases({n:s.n,nNew:phDue().length?0:2}))RT.lc.done({ok:0,n:0})}
 else if(s.k==='lis')startListen({n:s.n});
 else if(s.k==='ins')startInstant({n:s.n,lv:ins});
 else if(s.k==='sh'){const items=[...S.weak.slice(-s.n).map(w=>({en:w.en,ja:w.ja}))];startShadow({items:items.length>=s.n?items:[...items,...shPick('theme',s.n-items.length)]})}
 else if(s.k==='qst')go({name:'quest',id:nextQuestId()});
}
VIEWS.lesson=function(app){
 const L=S.lesson;
 if(!L||(L.d!==today()&&L.done)){return lessonPick(app)}
 const el=Math.max(0,Math.round((dayRec().sec-(L.d===today()?L.sec0:0))/60));
 const fromYesterday=L.d!==today();
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">TODAY'S LESSON</span><h1>今日の${L.len}分レッスン</h1>
 <p>${fromYesterday?'前回の続きから再開できます。':''}復習の時期が来たもの・苦手なもの・まちがえたものから優先して出します。時間が過ぎても途中で打ち切りません。</p></div>
 <section class="sheet panel">
  <div class="lprog"><span style="width:${lessonProgress()*100}%"></span></div>
  <div class="row" style="margin:6px 0 10px"><small class="muted">きょうの学習時間 約${el}分 / 目安${L.len}分</small><span class="sp"></span><small class="muted">${L.segs.filter(s=>s.done).length} / ${L.segs.length}</small></div>
  <div class="segs">${L.segs.map((s,i)=>`<div class="seg ${s.done?'done':i===L.i?'cur':''}"><span class="ck">${s.done?'✓':i+1}</span><div><b>${SEG[s.k].n}</b> <small>約${s.min}分</small><small style="display:block" class="muted">${SEG[s.k].d}${s.done&&s.cnt?` ・ ${s.ok}/${s.cnt}`:''}</small></div></div>`).join('')}</div>
  ${L.done?`<div class="result"><div class="big" style="font-size:36px">レッスン完了!</div><p>おつかれさまでした。また明日も、アプリを開いてボタンを押すだけで始められます。</p></div>`
   :`<div class="next"><button class="btn ghost" id="ls-new">時間を変えて作り直す</button><button class="btn hl" id="ls-go">${L.i?'続きから':'はじめる'} →</button></div>`}
  ${L.done?'<div class="next"><button class="btn ghost" id="ls-new">もう1回(時間を選ぶ)</button><button class="btn hl" data-go=\'{"name":"home"}\'>ホームへ</button></div>':''}
 </section>`;
 wireGo(app);
 const g=app.querySelector('#ls-go');if(g)g.onclick=()=>{if(L.d!==today()){L.d=today();L.sec0=dayRec().sec;save()}runSeg()};
 const nb=app.querySelector('#ls-new');if(nb)nb.onclick=()=>{S.lesson=null;save();render()};
};
function lessonPick(app){
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">TODAY'S LESSON</span><h1>今日のレッスン</h1><p>学習時間を選ぶと、復習 → リスニング → 瞬間英会話 → シャドーイング → 会話クエスト の順に自動で組み立てます。</p></div>
 <section class="sheet panel"><div class="modes">${[5,15,30].map(m=>`<button class="mode" data-len="${m}"><span class="ic" style="font-size:17px">${m}<small style="font-size:10px">分</small></span><span><span class="tt">${m}分コース</span><span class="tg">${PLANS[m].map(s=>SEG[s.k].n).join(' → ')}</span></span></button>`).join('')}</div></section>`;
 wireGo(app);
 app.querySelectorAll('[data-len]').forEach(b=>b.onclick=()=>{S.set.lessonLen=+b.dataset.len;newLesson(+b.dataset.len);render()});
}
function startTodayLesson(){const L=S.lesson;
 if(L&&!L.done){go({name:'lesson'});return}
 if(L&&L.done&&L.d===today()){go({name:'lesson'});return}
 newLesson(S.set.lessonLen||15);go({name:'lesson'})}

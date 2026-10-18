// ===== ワールド: 学習履歴と復習(シーンごとの記録・動詞/前置詞の成績・ミッション判定) =====
function wRec(id){S.world=S.world||{};return S.world[id]=S.world[id]||{found:{},clear:{},n:0,miss:0,ok:0}}
function wStat(){S.wstat=S.wstat||{v:{},p:{}};return S.wstat}
function wWeakHtml(){const st=wStat();const rows=(o,lab)=>Object.entries(o).filter(([k,v])=>v[1]>=2).map(([k,v])=>({k,r:v[0]/v[1],n:v[1]})).sort((a,b)=>a.r-b.r).slice(0,5);
 const vv=rows(st.v),pp=rows(st.p);if(!vv.length&&!pp.length)return '';
 return `<section class="sheet panel"><h3 class="eyebrow">ミッションの成績(苦手な動詞・前置詞)</h3><div class="row" style="align-items:flex-start;gap:24px">
  <div><b>動詞</b>${vv.map(x=>`<div class="en">${esc(x.k)} <small class="muted">${Math.round(x.r*100)}%(${x.n}回)</small></div>`).join('')||'<div class="muted">—</div>'}</div>
  <div><b>前置詞</b>${pp.map(x=>`<div class="en">${esc(x.k)} <small class="muted">${Math.round(x.r*100)}%(${x.n}回)</small></div>`).join('')||'<div class="muted">—</div>'}</div></div></section>`}
function wMatch(m,ev){const id=x=>x&&x.id;const inL=(v,x)=>Array.isArray(v)?v.includes(x):v===x;
 if(!m.v.includes(ev.v))return false;if(m.a&&id(ev.a)!==m.a)return false;if(m.o&&!inL(m.o,id(ev.o)))return false;
 if(m.r&&!inL(m.r,id(ev.r)))return false;if(m.p&&ev.p!==m.p)return false;if(m.act&&ev.act!==m.act)return false;return true}
// ---- 連続型ミッション(会話)の記録 ----
// 途中でやめても、それまでの発話・行動の記録は残る(1回答えるたびに保存する)。
function wsRec(id){S.wstory=S.wstory||{};return S.wstory[id]=S.wstory[id]||{runs:0,clear:0,perfect:0,last:null,var:{},mode:{},best:null}}
function wTalkStat(){S.wtalk=S.wtalk||{f:{},spoken:0,typed:0,chose:0,skip:0,hist:[]};return S.wtalk}
function stSave(ST){const r=wsRec(ST.story.id);if(!ST.counted){ST.counted=true;r.runs++;r.var[ST.variant]=(r.var[ST.variant]||0)+1}r.last=today();save()}
function stSaveTalk(ST){const t=wTalkStat();ST.savedT=ST.savedT||0;ST.savedA=ST.savedA||0;
 for(const rec of ST.log.talks.slice(ST.savedT)){
  if(rec.kind==='repeat'){const f=t.f.sayagain=t.f.sayagain||[0,0];f[0]++;f[1]++;continue}// 聞き返せたことは「聞き返す」の成功
  if(rec.focus){const f=t.f[rec.focus]=t.f[rec.focus]||[0,0];f[1]++;if(rec.ok===true&&!rec.hint)f[0]++}
  if(rec.kind==='skip')t.skip++;else if(rec.ok===true){if(rec.how==='voice')t.spoken++;else if(rec.how==='typed')t.typed++;else t.chose++}
  logEv({m:'wtalk',ok:rec.ok===true,h:rec.hint,f:rec.how==='voice'&&rec.ok===true&&!rec.hint,r:ST.story.id+':'+rec.step})}
 ST.savedT=ST.log.talks.length;ST.savedA=ST.log.acts.length;save()}
function stRecord(ST,fb){const r=wsRec(ST.story.id),t=wTalkStat();
 if(fb.goal){r.clear++;r.mode[ST.mode]=today()}if(fb.perfect)r.perfect++;
 const sc={hints:fb.hints,meaning:fb.metrics.meaning,spoken:fb.spoken.length};if(fb.goal&&(!r.best||sc.hints<r.best.hints||(sc.hints===r.best.hints&&sc.spoken>r.best.spoken)))r.best=sc;
 t.hist.unshift({id:ST.story.id,t:ST.story.t,sc:ST.story.scene,d:today(),mode:ST.mode,goal:fb.goal,perfect:fb.perfect,hints:fb.hints,spoken:fb.spoken.length,meaning:fb.metrics.meaning,match:fb.metrics.match,pron:fb.metrics.pron,v:fb.variant});
 if(t.hist.length>40)t.hist.length=40;
 // 次に復習するフレーズは、既存の「苦手リスト」(復習)に入れる
 for(const x of fb.review)addWeak(x.en,x.ja,'ワールド:'+ST.story.t);
 addXP(fb.goal?(fb.perfect?40:25):5);checkBadges();save()}
function wTalkHtml(){const t=wTalkStat();const rows=EXPR.map(x=>{const f=t.f[x.id];return {x,ok:f?f[0]:0,n:f?f[1]:0}});
 if(!t.hist.length&&!rows.some(r=>r.n))return '';
 return `<section class="sheet panel"><h3 class="eyebrow">会話ミッションの記録</h3>
  <div class="chips"><span class="chip good"><small>自分の声で話せた</small>${t.spoken}文</span><span class="chip"><small>入力で答えた</small>${t.typed}文</span><span class="chip"><small>選んで答えた</small>${t.chose}文</span><span class="chip ${t.skip?'bad':''}"><small>言えなかった</small>${t.skip}回</span></div>
  <div class="wexrows">${rows.map(r=>`<div class="wexr"><span class="en">${esc(r.x.en)}</span><small class="muted">${esc(r.x.ja)}</small><span class="sp"></span><small>${r.n?`${r.ok}/${r.n}回 ヒントなしで成功`:'まだ'}</small></div>`).join('')}</div>
  ${t.hist.length?`<h4 style="margin:12px 0 4px">最近のミッション</h4>${t.hist.slice(0,8).map(h=>`<div class="wexr"><span>${h.goal?(h.perfect?'★':'✓'):'—'} ${esc(h.t)}</span><small class="muted">${esc(h.d)} ・ モード${h.mode}</small><span class="sp"></span><small>意味 ${h.meaning??'—'}% ・ 声で話せた ${h.spoken}文 ・ ヒント ${h.hints}</small></div>`).join('')}`:''}
 </section>`}

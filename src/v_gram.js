// ===== grammar =====
const jaD=(t,cls='j')=>`<div class="${cls} ${S.set.showJa?'':'jh'}">${t}</div>`;
function wireJa(root){root.querySelectorAll('.jh').forEach(e=>e.onclick=()=>e.classList.remove('jh'))}
VIEWS.grams=function(app){
 const cats=[...new Set(GRAM.map(g=>g.cat))];
 const tab=S.gTab||0;// 0 = レベル順, 1.. = カテゴリ
 const tabs=[{k:'すべて',f:()=>true},...LV.map(l=>({k:l.k,s:l.s,f:g=>g.lv===l.n}))];
 const T=tabs[Math.min(tab,tabs.length-1)];
 const list=GRAM.filter(T.f);
 app.innerHTML=`
 <div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">GRAMMAR</span><h1>文法</h1><p>どの単元も「イメージ → 並べかえ → チャレンジ」の3ステップ。チャレンジはTOEIC Part 5 と同じ形の4択です。</p></div>
 <div class="tabs" role="tablist">${tabs.map((t,i)=>`<button class="tab" role="tab" data-t="${i}" aria-selected="${i===tab}">${t.k}${t.s?`<small>${t.s}</small>`:`<small>${GRAM.length}単元</small>`}</button>`).join('')}</div>
 <section class="sheet"><div class="units">${list.map(g=>`<button class="unit ${S.gStars[g.id]>=1?'done':''}" data-go='${JSON.stringify({name:'gram',id:g.id})}'><span class="no">${g.id.slice(1)}</span><span><span class="tt">${esc(g.t)}</span> ${lvTag(g.lv)}<span class="tg">${esc(g.sub)} ・ ${esc(g.cat)}</span></span>${starStr(S.gStars[g.id]||0)}</button>`).join('')}</div></section>`;
 wireGo(app);
 app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{S.gTab=+b.dataset.t;save();render()});
};
function gramItem(u,q,i){return {s:blankify(q.s),c:q.c,a:q.a,why:q.why,ref:{t:'g',u:u.id,i},label:u.t,review:blankify(q.s)}}
VIEWS.gram=function(app){
 const u=gById(V.id);if(!u)return go({name:'grams'},true);
 const step=V.step||0;
 const steps=['イメージ','並べかえ','チャレンジ'];
 const done=[!!S.gRead[u.id],!!S.gBuild[u.id],S.gStars[u.id]>=1];
 app.innerHTML=`
 <div class="row">${backBtn('文法の一覧',{name:'grams'})}</div>
 <div class="uhead"><div class="row">${lvTag(u.lv)}<span class="gtag">${esc(u.cat)}</span></div><h1>${esc(u.t)}</h1></div>
 <div class="steps" role="tablist">${steps.map((s,i)=>`<button class="step" role="tab" data-s="${i}" aria-selected="${i===step}"><small>STEP ${i+1}</small>${s}${done[i]?'<span class="ck">✓</span>':''}</button>`).join('')}</div>
 <section class="sheet panel" id="gp"></section>`;
 wireGo(app);
 app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>go({name:'gram',id:u.id,step:+b.dataset.s},true));
 const P=app.querySelector('#gp');
 if(step===0){
  P.innerHTML=`
   <div class="one">${esc(u.sub)}</div>
   <div class="blk"><h3>たとえで言うと</h3><div>${u.img}</div></div>
   <div class="blk"><h3>ここだけ押さえる</h3><div class="keybox"><ul>${u.rule.map(r=>`<li>${r}</li>`).join('')}</ul></div></div>
   <div class="blk"><h3>例文(タップで発音)</h3><div class="exs">${u.ex.map(e=>`<div class="ex">${sayBtn(e.en)}<div><div class="e en">${esc(e.en)}</div>${jaD(esc(e.ja))}${e.note?`<div class="n">${e.note}</div>`:''}</div></div>`).join('')}</div></div>
   <div class="blk"><h3>つまずきポイント</h3><p class="trap">${u.trap}</p></div>
   ${u.talk?`<div class="blk"><h3>会話でそのまま使える</h3><div class="ex">${sayBtn(u.talk.en,'m')}<div><div class="e en"><span class="mk">${esc(u.talk.en)}</span></div>${jaD(esc(u.talk.ja))}</div></div></div>`:''}
   <div class="next"><button class="btn hl" id="nx">並べかえに進む →</button></div>`;
  wireSay(P);wireJa(P);
  if(!S.gRead[u.id]){S.gRead[u.id]=today();addXP(5)}
  P.querySelector('#nx').onclick=()=>go({name:'gram',id:u.id,step:1},true);
 }else if(step===1){buildView(P,u)}
 else{
  P.innerHTML=`<div class="one">チャレンジ:5問</div><p>TOEIC Part 5 と同じ「空所に入る語句を選ぶ」形式です。空所の前後にヒントが隠れています。満点で星3つ。</p><div class="next"><button class="btn hl" id="go">はじめる</button></div>`;
  P.querySelector('#go').onclick=()=>gramQuiz(u);
 }
};
function gramQuiz(u){
 const qs=pick(u.q.map((q,i)=>({q,i})),5);
 startQuiz({title:u.t+' のチャレンジ',back:{name:'gram',id:u.id,step:2},backLabel:'単元にもどる',items:qs.map(({q,i})=>gramItem(u,q,i)),
  onEnd:r=>{S.gStars[u.id]=Math.max(S.gStars[u.id]||0,r.stars)},retry:()=>gramQuiz(u)});
}
function buildView(P,u){
 let k=0,tries=0;
 const draw=()=>{
  const b=u.build[k];const words=b.en.split(/\s+/);const pool=shuffle(words.map((w,i)=>({w,i})));
  // 同じ並びのままにならないように
  if(pool.every((p,i)=>p.i===i)&&pool.length>1)pool.reverse();
  let picked=[];
  P.innerHTML=`<div class="qhead"><span>並べかえ ${k+1} / ${u.build.length}</span><span>${sayBtn(b.en,'f')}</span></div>
   <div class="bq">${esc(b.ja)}</div>
   <div class="slot" id="slot" aria-label="ここに並べる"></div>
   <div class="pool" id="pool">${pool.map((p,j)=>`<button class="tile" data-j="${j}">${esc(p.w)}</button>`).join('')}</div>
   <div id="bfb"></div>
   <div class="next"><button class="btn ghost" id="clr">やり直す</button><button class="btn hl" id="chk" disabled>答え合わせ</button></div>
   <p class="note" style="margin-top:14px">タイルをタップして英文を組み立てましょう。並べた単語をタップすると戻せます。スピーカーのボタンで正解の音声も聞けます(答えを見る代わりにどうぞ)。</p>`;
  wireSay(P);
  const slot=P.querySelector('#slot'),poolEl=P.querySelector('#pool'),chk=P.querySelector('#chk');
  const upd=()=>{slot.innerHTML=picked.map((j,x)=>`<button class="tile" data-x="${x}">${esc(pool[j].w)}</button>`).join('');
   poolEl.querySelectorAll('.tile').forEach(t=>t.classList.toggle('used',picked.includes(+t.dataset.j)));
   slot.querySelectorAll('.tile').forEach(t=>t.onclick=()=>{picked.splice(+t.dataset.x,1);slot.className='slot';upd()});
   chk.disabled=picked.length!==words.length};
  poolEl.querySelectorAll('.tile').forEach(t=>t.onclick=()=>{const j=+t.dataset.j;if(picked.includes(j))return;picked.push(j);upd()});
  P.querySelector('#clr').onclick=()=>{picked=[];slot.className='slot';upd()};
  chk.onclick=()=>{const s=picked.map(j=>pool[j].w).join(' ');const ok=s===b.en;
   if(!ok){tries++;slot.className='slot ng';
    P.querySelector('#bfb').innerHTML=`<p class="bad" style="margin-top:10px">${tries>=2?`正解は <span class="en good">${esc(b.en)}</span>`:'語順がちがうようです。もう一度!'}</p>`;
    if(tries>=2){chk.textContent='つぎへ';chk.disabled=false;chk.onclick=next}return}
   slot.className='slot ok';S.answered++;S.correct++;addXP(tries?5:10);
   P.querySelector('#bfb').innerHTML=`<div class="fb ok" style="margin-top:12px">${hana}<div><div class="verdict">正解!</div><div class="en">${esc(b.en)}</div></div></div>`;
   speak(b.en);chk.textContent=k+1<u.build.length?'つぎへ →':'チャレンジへ →';chk.onclick=next;
  };
  upd();
 };
 const next=()=>{k++;tries=0;if(k<u.build.length)draw();else{S.gBuild[u.id]=today();save();go({name:'gram',id:u.id,step:2},true)}};
 draw();
}

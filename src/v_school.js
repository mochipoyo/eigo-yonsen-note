// ===== 中1〜高3 英語総復習 =====
const SCHOOL=[...SCHOOL_A,...SCHOOL_B,...SCHOOL_C];
const SG=[{k:'中1',n:'中学1年'},{k:'中2',n:'中学2年'},{k:'中3',n:'中学3年'},{k:'高1',n:'高校1年'},{k:'高2',n:'高校2年'},{k:'高3',n:'高校3年'}];
const sById=id=>SCHOOL.find(u=>u.id===id);
const sInG=g=>SCHOOL.filter(u=>u.g===g);
const sStars=id=>(S.sch||{})[id]||0;
const sDone=g=>sInG(g).filter(u=>sStars(u.id)>=1).length;
VIEWS.school=function(app){
 S.sch=S.sch||{};S.schG=S.schG||{};
 const g=V.g||S.schTab||'中1';const units=sInG(g);const best=S.schG[g];
 const diag=S.schDiag;
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">REVIEW 中1〜高3</span><h1>英語の総復習</h1><p>中学1年から高校3年までの文法と基本表現を、学年ごとに復習します。各単元は「要点 → 確認テスト10問(穴うめ・並べかえ・英作文・意味)」。英作文は話しても、キーボードで入力しても答えられます。</p></div>
 <section class="sheet panel"><div class="row"><div><b>どこから始めればいい?</b><small style="display:block" class="muted">${diag?`前回の診断(${esc(diag.d)}):<b>${esc(diag.rec)}</b> からがおすすめ`:'各学年から2問ずつ、12問で目安を出します'}</small></div><span class="sp"></span><button class="btn ${diag?'ghost':'hl'}" id="sc-diag">診断テスト</button></div></section>
 <div class="tabs" role="tablist">${SG.map(x=>`<button class="tab" role="tab" data-g="${x.k}" aria-selected="${x.k===g}">${x.k}<small>${sDone(x.k)}/${sInG(x.k).length}</small></button>`).join('')}</div>
 <section class="sheet panel"><div class="row"><div><b>${esc(SG.find(x=>x.k===g).n)}のまとめテスト</b><small style="display:block" class="muted">この学年の単元から20問 ・ ${best!=null?'最高 '+best+'%':'まだ挑戦していません'}</small></div><span class="sp"></span><button class="btn" id="sc-gt">挑戦する</button></div></section>
 <section class="sheet"><div class="units">${units.map((u,i)=>`<button class="unit ${sStars(u.id)>=1?'done':''}" data-go='${JSON.stringify({name:'sunit',id:u.id})}'><span class="no">${i+1}</span><span><span class="tt">${esc(u.t)}</span><span class="tg">${esc(u.sub)}</span></span>${starStr(sStars(u.id))}</button>`).join('')}</div></section>
 <p class="foot">学年の振り分けは現行の学習指導要領と一般的な教科書の順番にもとづく目安です。教科書によって学ぶ順番がちがうことがあります(特に高校は差が大きい)。</p>`;
 wireGo(app);
 app.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{S.schTab=b.dataset.g;save();go({name:'school',g:b.dataset.g},true)});
 app.querySelector('#sc-gt').onclick=()=>{const pool=units.flatMap(u=>u.q.map((q,i)=>({u,q,i})));startSchool({title:g+' まとめテスト',items:pick(pool,20),grade:g})};
 app.querySelector('#sc-diag').onclick=()=>{const items=SG.flatMap(x=>pick(sInG(x.k).flatMap(u=>u.q.map((q,i)=>({u,q,i})).filter(o=>o.q.k==='fill'||o.q.k==='meaning')),2));startSchool({title:'診断テスト',items,diag:true})};
};
VIEWS.sunit=function(app){
 const u=sById(V.id);if(!u)return go({name:'school'},true);
 const step=V.step||0;const gu=u.link&&gById(u.link);
 app.innerHTML=`<div class="row">${backBtn(u.g+'の単元',{name:'school',g:u.g})}</div>
 <div class="uhead"><div class="row"><span class="gtag">${esc(u.g)}</span>${starStr(sStars(u.id))}</div><h1>${esc(u.t)}</h1></div>
 <div class="steps" style="grid-template-columns:1fr 1fr">${['要点','確認テスト'].map((s,i)=>`<button class="step" data-s="${i}" aria-selected="${i===step}"><small>STEP ${i+1}</small>${s}${i===1&&sStars(u.id)>=1?'<span class="ck">✓</span>':''}</button>`).join('')}</div>
 <section class="sheet panel" id="sp"></section>`;
 wireGo(app);
 app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>go({name:'sunit',id:u.id,step:+b.dataset.s},true));
 const P=app.querySelector('#sp');
 if(step===0){P.innerHTML=`<div class="one">${esc(u.sub)}</div>
  <div class="blk"><h3>ここだけ押さえる</h3><div class="keybox"><ul>${u.pts.map(p=>`<li>${p}</li>`).join('')}</ul></div></div>
  <div class="blk"><h3>例文(タップで発音)</h3><div class="exs">${u.ex.map(e=>`<div class="ex">${sayBtn(e.en)}<div><div class="e en">${esc(e.en)}</div>${jaD(esc(e.ja))}</div></div>`).join('')}</div></div>
  ${gu?`<div class="blk"><button class="btn ghost sm" data-go='${JSON.stringify({name:'gram',id:gu.id})}'>くわしい解説:${esc(gu.t)} →</button></div>`:''}
  <div class="next"><button class="btn hl" id="nx">確認テストへ →</button></div>`;
  wireGo(P);wireSay(P);wireJa(P);P.querySelector('#nx').onclick=()=>go({name:'sunit',id:u.id,step:1},true);
 }else{P.innerHTML=`<div class="one">確認テスト 10問</div><p>穴うめ5問・並べかえ2問・英作文2問・意味1問。満点で星3つ、8問で星2つ、6問で星1つ。</p><div class="next"><button class="btn hl" id="go">はじめる</button></div>`;
  P.querySelector('#go').onclick=()=>startSchool({title:u.t,items:u.q.map((q,i)=>({u,q,i})),unit:u.id})}
};
function startSchool(cfg){RT.drill={kind:'sch',...cfg,i:0,res:[],xp0:S.xp};go({name:'drill'})}
function schView(app,D){
 if(D.i>=D.items.length)return schEnd(app,D);
 const {u,q,i:qi}=D.items[D.i];const N=D.items.length;
 const ref={t:'s',u:u.id,i:qi};
 app.innerHTML=`<div class="row">${backBtn(D.unit?'単元にもどる':'総復習',D.unit?{name:'sunit',id:D.unit,step:1}:{name:'school',g:u.g})}<span class="sp"></span><span class="eyebrow">${esc(D.title)}</span></div>
 <div class="pips">${D.items.map((_,k)=>`<i class="${k<D.i?(D.res[k]?'ok':'ng'):k===D.i?'cur':''}"></i>`).join('')}</div>
 <section class="sheet panel"><div class="qhead"><span>${esc(u.g)} ・ ${esc(u.t)} ・ ${({fill:'穴うめ',order:'並べかえ',write:'英作文',meaning:'意味'})[q.k]}</span><span>${D.i+1} / ${N}</span></div><div id="sq"></div><div id="sr"></div></section>`;
 wireGo(app);
 const $=s=>app.querySelector(s);
 const done=(ok,html,weakEn,weakJa)=>{
  D.res.push(ok);S.answered++;if(ok)S.correct++;
  logEv({m:'sch',ok,r:u.id+':'+qi,f:q.k==='write'});
  if(q.k==='fill'||q.k==='meaning')noteMiss(ref,ok);
  if(!ok&&weakEn)addWeak(weakEn,weakJa,'総復習');
  addXP(ok?(q.k==='write'?10:q.k==='order'?8:6):1);
  $('#sr').innerHTML=`<div class="fb ${ok?'ok':'ng'}">${ok?hana:'<span class="verdict" style="font-size:30px">✕</span>'}<div><div class="verdict">${ok?'正解!':'おしい!'}</div>${html}</div></div>
   <div class="next"><button class="btn hl" id="sn">${D.i+1<N?'つぎへ →':'結果を見る'}</button></div>`;
  wireSay($('#sr'));$('#sn').onclick=()=>{D.i++;render();window.scrollTo({top:0})};$('#sn').scrollIntoView({block:'nearest',behavior:'smooth'})};
 if(q.k==='fill'||q.k==='meaning'){
  const ord=shuffle(q.c.map((_,k)=>k));
  $('#sq').innerHTML=`<div class="q ${q.k==='fill'?'en':'en'}">${q.k==='fill'?blankify(q.s):esc(q.en)} ${q.k==='meaning'?sayBtn(q.en):''}</div>${q.k==='meaning'?'<p class="muted" style="margin-top:-8px">この英文の意味は?</p>':''}
   <div class="opts ${q.k==='meaning'?'one-col':''}">${ord.map((k,j)=>`<button class="opt ${q.k==='fill'?'en':''}" data-i="${k}"><span class="k">${j+1}</span><span>${esc(q.c[k])}</span></button>`).join('')}</div>`;
  wireSay($('#sq'));
  $('#sq').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const ok=+b.dataset.i===q.a;$('#sq').querySelectorAll('.opt').forEach(o=>{o.disabled=true;if(+o.dataset.i===q.a)o.classList.add('ok')});if(!ok)b.classList.add('ng');
   const full=q.k==='fill'?q.s.replace(/_{3,}/,q.c[q.a]):q.en;
   done(ok,`<div>${esc(q.why||'')}</div><div class="tr en">${esc(full)} ${sayBtn(full)}</div>`)});
 }else if(q.k==='order'){
  const words=q.en.split(/\s+/);let pool=shuffle(words.map((w,k)=>({w,k})));if(pool.every((p,k)=>p.k===k)&&pool.length>1)pool.reverse();let picked=[],tries=0;
  $('#sq').innerHTML=`<div class="bq">${esc(q.ja)}</div><div class="slot" id="slot"></div><div class="pool" id="pool">${pool.map((p,j)=>`<button class="tile" data-j="${j}">${esc(p.w)}</button>`).join('')}</div><div id="ofb"></div><div class="next"><button class="btn ghost" id="clr">やり直す</button><button class="btn hl" id="chk" disabled>答え合わせ</button></div>`;
  const slot=$('#slot'),pe=$('#pool'),chk=$('#chk');
  const upd=()=>{slot.innerHTML=picked.map((j,x)=>`<button class="tile" data-x="${x}">${esc(pool[j].w)}</button>`).join('');pe.querySelectorAll('.tile').forEach(t=>t.classList.toggle('used',picked.includes(+t.dataset.j)));
   slot.querySelectorAll('.tile').forEach(t=>t.onclick=()=>{picked.splice(+t.dataset.x,1);slot.className='slot';upd()});chk.disabled=picked.length!==words.length};
  pe.querySelectorAll('.tile').forEach(t=>t.onclick=()=>{const j=+t.dataset.j;if(!picked.includes(j)){picked.push(j);upd()}});
  $('#clr').onclick=()=>{picked=[];slot.className='slot';upd()};
  chk.onclick=()=>{const s=picked.map(j=>pool[j].w).join(' ');const ok=s===q.en;
   if(!ok&&tries<1){tries++;slot.className='slot ng';$('#ofb').innerHTML='<p class="bad">語順がちがうようです。もう一度!</p>';return}
   slot.className='slot '+(ok?'ok':'ng');chk.disabled=true;$('#clr').disabled=true;pe.querySelectorAll('.tile').forEach(t=>t.disabled=true);$('#ofb').innerHTML='';
   if(ok)speak(q.en);done(ok&&tries===0||ok,`<div class="en">${esc(q.en)} ${sayBtn(q.en)}</div>${tries&&ok?'<small class="muted">2回目で正解</small>':''}`,ok?null:q.en,q.ja)};
  upd();
 }else{// write: 話すか入力して英作文
  $('#sq').innerHTML=`<div class="bq">${esc(q.ja)}</div><small class="muted">英語で言うか、入力してください。</small><div id="sa" style="margin-top:10px"></div>`;
  answerBox($('#sa'),{hintHtml:`最初の言葉:<span class="en">${esc(q.model.split(' ').slice(0,2).join(' '))} …</span>`}).then(res=>{
   if(res.text&&!res.typed){S.said++;dayRec().said++}
   const ev=evalAnswer(res,{model:q.model,alts:q.alts,keys:q.keys});const ok=ev.meaning==='ok';$('#sa').innerHTML='';
   done(ok,`${evalChips(ev,{note:false})}${modelBlock(q.model,q.alts,[])}${q.why?`<p class="trap">${esc(q.why)}</p>`:''}${!ok&&res.text?'<button class="btn ghost sm" id="sself">合っていたと思う</button>':''}`,q.model,q.ja);
   const sb=$('#sself');if(sb)sb.onclick=()=>{D.res[D.res.length-1]=true;S.correct++;sb.disabled=true;sb.textContent='正解として記録しました';save()};
  });
 }
}
function schEnd(app,D){const n=D.res.length,ok=D.res.filter(Boolean).length;const r=n?ok/n:0;
 let msg='';
 if(!D.ended){D.ended=true;S.sch=S.sch||{};S.schG=S.schG||{};
  if(D.unit){const st=r>=1?3:r>=.8?2:r>=.6?1:0;S.sch[D.unit]=Math.max(S.sch[D.unit]||0,st);if(st===3)confetti()}
  if(D.grade){S.schG[D.grade]=Math.max(S.schG[D.grade]||0,Math.round(r*100))}
  if(D.diag){// 学年ごとの正答から、最初につまずいた学年をすすめる
   const by=SG.map(g=>{const idx=D.items.map((x,k)=>x.u.g===g.k?k:-1).filter(k=>k>=0);return {g:g.k,ok:idx.filter(k=>D.res[k]).length,n:idx.length}});
   const weak=by.find(x=>x.ok<x.n);D.by=by;S.schDiag={d:today(),rec:weak?weak.g:'高3',by};}
  checkBadges();save()}
 if(D.diag)msg=`<p>おすすめのスタート:<b>${esc(S.schDiag.rec)}</b></p><div class="row" style="justify-content:center">${D.by.map(x=>`<span class="chip ${x.ok===x.n?'good':''}"><small>${x.g}</small>${x.ok}/${x.n}</span>`).join('')}</div>`;
 const st=r>=1?3:r>=.8?2:r>=.6?1:0;
 app.innerHTML=`<div class="row">${backBtn('総復習',{name:'school',g:D.diag?S.schDiag.rec:(D.grade||(D.items[0]&&D.items[0].u.g))})}</div>
 <section class="sheet result"><div class="eyebrow">${esc(D.title)}</div><div class="big" style="margin-top:10px">${ok}<small style="font-size:22px"> / ${n}</small></div>
 ${D.unit?`<div class="rst">${[0,1,2].map(i=>`<span class="${i<st?'on':''}" style="animation-delay:${.15+i*.18}s">★</span>`).join('')}</div>`:''}${msg}
 <div class="gain"><span>獲得 <b>${S.xp-D.xp0}</b> XP</span></div>
 <div class="row" style="justify-content:center">${D.unit?`<button class="btn" id="again">${IC.redo}もう一度</button>`:''}<button class="btn hl" data-go='${JSON.stringify({name:'school',g:D.diag?S.schDiag.rec:(D.grade||D.items[0].u.g)})}'>単元一覧へ</button></div></section>
 ${D.items.some((x,k)=>!D.res[k])?`<section class="sheet panel"><h3 class="eyebrow">まちがえた問題</h3>${D.items.map((x,k)=>D.res[k]?'':`<div class="ex" style="grid-template-columns:1fr"><div class="e en">${esc(x.q.k==='fill'?x.q.s.replace(/_{3,}/,'['+x.q.c[x.q.a]+']'):x.q.k==='meaning'?x.q.en+' → '+x.q.c[x.q.a]:x.q.k==='order'?x.q.en:x.q.model)}</div><div class="j">${esc(x.q.why||x.q.ja||'')}</div></div>`).join('')}</section>`:''}`;
 wireGo(app);const a=app.querySelector('#again');if(a)a.onclick=()=>{const u=sById(D.unit);startSchool({title:u.t,items:u.q.map((q,i)=>({u,q,i})),unit:u.id})};
}

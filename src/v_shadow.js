// ===== シャドーイング・音声トレーニング =====
function shSources(){
 const th=x=>inThemes(x);
 return [
  {k:'theme',n:'テーマ別の英文',get:()=>[...LISTEN.filter(l=>l.lv<=2&&th(l)).flatMap(l=>l.lines.length===1?[{en:l.lines[0].en,ja:l.ja}]:l.lines.map(x=>({en:x.en,ja:''}))),...INSTANT.filter(th).map(i=>({en:i.model,ja:'(言うこと)'+i.hint}))]},
  {k:'talk',n:'会話シーンのフレーズ',get:()=>TALK.flatMap(t=>t.phrases.map(p=>({en:p.en,ja:p.ja})))},
  {k:'gram',n:'文法の例文',get:()=>GRAM.flatMap(g=>g.ex.map(e=>({en:e.en,ja:e.ja})))},
  {k:'saved',n:'保存した英文',get:()=>S.shSaved.map(x=>({en:x.en,ja:x.ja||''}))},
  {k:'weak',n:'苦手リスト',get:()=>S.weak.map(x=>({en:x.en,ja:x.ja||''}))}];
}
const shKey=en=>en.trim().toLowerCase().slice(0,120);
function shPick(src,n){const list=(shSources().find(s=>s.k===src)||shSources()[0]).get();
 const seen=new Set();const uniq=list.filter(x=>{const k=shKey(x.en);if(seen.has(k))return false;seen.add(k);return true});
 // 練習回数の少ない英文を優先
 return uniq.map(x=>({x,p:Math.random()+((S.sh[shKey(x.en)]||{}).n||0)*0.7})).sort((a,b)=>a.p-b.p).slice(0,n).map(o=>o.x)}
VIEWS.shadow=function(app){
 const srcs=shSources();const total=Object.values(S.sh).reduce((s,x)=>s+(x.n||0),0);
 app.innerHTML=`<div class="row">${backBtn('話す練習',{name:'speak'})}</div>
 <div class="uhead"><span class="eyebrow">SHADOWING</span><h1>シャドーイング</h1><p>お手本の英語をまねして言う練習です。3つのやり方を切りかえられます。マイクを使うときはイヤホンがおすすめです(スピーカーの音を拾わないように)。</p></div>
 <section class="sheet panel">
  <div class="keybox" style="font-size:14.5px;line-height:1.8"><b>A リピート</b>:お手本を聞いてから、同じ英文を言う<br><b>B シャドーイング</b>:流れる英語を少し遅れて追いかけるように言う<br><b>C 録音比較</b>:自分の声を録音して、お手本と交互に聞きくらべる(録音は端末の中だけで再生し、送信しません)</div>
  <div class="row" style="margin-top:14px">${srcs.map(s=>{const n=s.get().length;return `<button class="btn ${n?'':'ghost'} sm" data-src="${s.k}" ${n?'':'disabled'}>${esc(s.n)}(${n})</button>`}).join('')}</div>
  <small class="muted" style="display:block;margin-top:8px">これまでの練習回数:${total}回</small>
 </section>`;
 wireGo(app);
 app.querySelectorAll('[data-src]').forEach(b=>b.onclick=()=>startShadow({src:b.dataset.src}));
};
function startShadow(opt={}){const items=opt.items||shPick(opt.src||'theme',opt.n||6);if(!items.length)return toast('英文がありません');
 RT.drill={kind:'sh',items,i:0,res:[],xp0:S.xp,mode:S.set.shMode||'A'};go({name:'drill'})}
function shView(app,D){
 if(D.i>=D.items.length)return shEnd(app,D);
 const it=D.items[D.i];const N=D.items.length;const k=shKey(it.en);
 const sv=S.set;sv.shRate=sv.shRate||1;if(sv.shEn==null)sv.shEn=true;if(sv.shJa==null)sv.shJa=false;
 let myUrl=D.myUrl||null;
 app.innerHTML=`${drillHead('シャドーイング',D.i,N,D.res)}
 <section class="sheet panel">
  <div class="tabs" role="tablist">${[['A','リピート'],['B','シャドーイング'],['C','録音比較']].map(([m,n])=>`<button class="tab" data-m="${m}" aria-selected="${D.mode===m}">${m}<small>${n}</small></button>`).join('')}</div>
  <div class="shline">
   <div class="en shen" ${sv.shEn?'':'hidden'} id="sh-en">${esc(it.en)}</div>
   <div class="j" id="sh-ja" ${sv.shJa&&it.ja?'':'hidden'}>${esc(it.ja)}</div>
   ${sv.shEn?'':'<div class="muted" id="sh-hid">(英文は非表示。音だけでまねしてみましょう)</div>'}
  </div>
  <div class="row"><label class="tg"><input type="checkbox" id="sh-cen" ${sv.shEn?'checked':''}> 英文</label><label class="tg"><input type="checkbox" id="sh-cja" ${sv.shJa?'checked':''}> 日本語訳</label>
   <span class="sp"></span><label class="tg">速さ <input type="range" id="sh-rate" min="0.6" max="1.2" step="0.05" value="${sv.shRate}"> <output id="sh-ro" class="en">${sv.shRate}x</output></label></div>
  <div class="row"><button class="btn hl" id="sh-model">${IC.play}お手本</button>
   <label class="tg">くり返し <select id="sh-rep">${[1,2,3,5].map(n=>`<option ${(sv.shRep||1)===n?'selected':''}>${n}</option>`).join('')}</select> 回</label></div>
  <div id="sh-act" style="margin-top:12px"></div>
  <div id="sh-out"></div>
  <div class="row" style="margin-top:14px"><small class="muted">この英文の練習回数:<b id="sh-cnt">${(S.sh[k]||{}).n||0}</b></small><span class="sp"></span>
   <button class="btn ghost sm" id="sh-save">${S.shSaved.some(x=>shKey(x.en)===k)?'保存ずみ':'苦手として保存'}</button></div>
  <div class="next"><button class="btn ghost" id="sh-prev" ${D.i?'':'disabled'}>← 前へ</button><button class="btn hl" id="sh-next">${D.i+1<N?'つぎへ →':'おわる'}</button></div>
 </section>`;
 wireBack(app);
 const $=s=>app.querySelector(s);
 const rate=()=>sv.shRate;
 const playModel=async(times)=>{stopAllAudio();const my=speakId;for(let t=0;t<times;t++){if(t)await wait(500);if(my!==speakId)return;await speakRate(it.en,rate());if(my!==speakId)return}};
 $('#sh-model').onclick=()=>playModel(sv.shRep||1);
 $('#sh-rep').onchange=e=>{sv.shRep=+e.target.value;save()};
 $('#sh-rate').oninput=e=>{sv.shRate=+e.target.value;$('#sh-ro').textContent=sv.shRate+'x';save()};
 $('#sh-cen').onchange=e=>{sv.shEn=e.target.checked;save();render()};
 $('#sh-cja').onchange=e=>{sv.shJa=e.target.checked;save();render()};
 app.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{D.mode=b.dataset.m;sv.shMode=D.mode;save();render()});
 $('#sh-save').onclick=()=>{if(!S.shSaved.some(x=>shKey(x.en)===k)){S.shSaved.push({en:it.en,ja:it.ja,at:today()});addWeak(it.en,it.ja,'シャドーイング');save()}$('#sh-save').textContent='保存ずみ'};
 $('#sh-prev').onclick=()=>{revoke();D.i--;render()};
 $('#sh-next').onclick=()=>{revoke();D.i++;render();window.scrollTo({top:0})};
 function revoke(){if(D.myUrl){URL.revokeObjectURL(D.myUrl);D.myUrl=null}}
 const count=(score)=>{const s=S.sh[k]=S.sh[k]||{n:0};s.n++;s.last=today();if(score!=null)s.best=Math.max(s.best||0,score);
  dayRec().sh++;dayRec().said++;S.said++;$('#sh-cnt').textContent=s.n;D.res[D.i]=true;
  logEv({m:'sh',ok:score==null||score>=60,r:k.slice(0,40)});addXP(score!=null&&score>=80?6:3)};
 const act=$('#sh-act'),out=$('#sh-out');
 const showScore=(r)=>{out.innerHTML=`<div class="meter"><span style="width:${r.score}%"></span></div><p style="margin:6px 0"><b>英文の一致度 ${r.score}%</b> <small class="muted">(文字起こしとの一致。発音の採点ではありません)</small></p><div class="heard en">${r.marks}</div><small>聞き取られた英語:<span class="en">${esc(r.heard)}</span></small>`};
 if(D.mode==='A'){
  act.innerHTML=canListen?`<div class="abig"><button class="micbig" id="sh-mic" aria-label="話す">${IC.mic}</button><div><b>お手本を聞いたら、マイクを押して同じ英文を言う</b></div></div>`:`<p class="muted">このブラウザは音声認識に未対応です。声に出して言ったら「言えた」を押してください。</p><button class="btn" id="sh-self">言えた</button>`;
  const mb=$('#sh-mic');if(mb)mb.onclick=async()=>{if(mb.classList.contains('on')){stopListen();return}mb.classList.add('on');
   try{const alts=await listen();mb.classList.remove('on');const r=scoreSpeech(it.en,alts);showScore(r);count(r.score)}catch(e){mb.classList.remove('on');out.innerHTML=`<p class="muted">${e==='not-allowed'?'マイクが許可されていません。':'うまく聞き取れませんでした。もう一度どうぞ。'}</p>`}};
  const sf=$('#sh-self');if(sf)sf.onclick=()=>{count(null);sf.disabled=true;sf.textContent='記録しました'};
 }else if(D.mode==='B'){
  act.innerHTML=`<p style="margin:0 0 8px">スタートを押すと英語が流れます。<b>少し遅れて</b>追いかけるように言いましょう。${canListen?'言った内容は文字起こしして一致度を表示します。':''}</p><button class="btn hl" id="sh-go">${IC.mic}シャドーイング開始</button>`;
  $('#sh-go').onclick=async()=>{const b=$('#sh-go');b.disabled=true;out.innerHTML='<p class="muted">再生中… 追いかけて言いましょう</p>';
   if(canListen){const lp=listen().catch(e=>null);await wait(600);await speakRateNoCancel(it.en,rate());const alts=await lp;b.disabled=false;
    if(alts){const r=scoreSpeech(it.en,alts);showScore(r);count(r.score)}else{out.innerHTML='<p class="muted">声が聞き取れませんでした(イヤホンを使うと認識しやすくなります)。</p>'}}
   else{await speakRate(it.en,rate());b.disabled=false;out.innerHTML='<button class="btn" id="sh-self2">追いかけて言えた</button>';$('#sh-self2').onclick=()=>{count(null);out.innerHTML='<p>記録しました。</p>'}}};
 }else{
  if(!canRecord){act.innerHTML='<p class="muted">このブラウザでは録音機能が使えません。A(リピート)で練習してください。</p>';return}
  act.innerHTML=`<div class="row"><button class="btn hl" id="sh-rec">● 録音</button><button class="btn" id="sh-me" ${myUrl?'':'disabled'}>${IC.play}自分</button><button class="btn" id="sh-alt" ${myUrl?'':'disabled'}>⇄ 交互に再生</button></div><small class="muted">録音した声は端末の中だけで再生し、保存・送信しません(次の英文へ進むと消えます)。</small>`;
  const rb=$('#sh-rec');
  rb.onclick=async()=>{if(rb.dataset.on){recStop();return}
   try{rb.dataset.on='1';rb.textContent='■ 停止';const pr=recStart();const blob=await pr;delete rb.dataset.on;rb.textContent='● 録音しなおす';
    revoke();D.myUrl=myUrl=URL.createObjectURL(blob);$('#sh-me').disabled=false;$('#sh-alt').disabled=false;count(null)}
   catch(e){delete rb.dataset.on;rb.textContent='● 録音';out.innerHTML=`<p class="muted">${String(e&&e.name)==='NotAllowedError'?'マイクが許可されていません。':'録音を開始できませんでした。'}</p>`}};
  $('#sh-me').onclick=()=>myUrl&&playBlob(myUrl);
  $('#sh-alt').onclick=async()=>{if(!myUrl)return;for(let t=0;t<2;t++){await speakRate(it.en,rate());await wait(300);await playBlob(myUrl);await wait(300)}};
 }
}
// 速さを指定して読み上げ(設定の速さと掛け合わせる)
function speakRate(text,r){const keep=S.set.rate;S.set.rate=keep*r;const p=speak(text,{g:'f'});S.set.rate=keep;return p}
function speakRateNoCancel(text,r){return speakRate(text,r)}
function shEnd(app,D){const n=D.res.filter(Boolean).length;
 if(!D.ended){D.ended=true;save();if(RT.lc)return RT.lc.done({ok:n,n:D.items.length})}
 app.innerHTML=`<div class="row">${backBtn('シャドーイング',{name:'shadow'})}</div>
 <section class="sheet result"><div class="eyebrow">シャドーイング</div><div class="big" style="margin-top:10px">${n}<small style="font-size:22px"> 文</small></div><p>練習した英文の数です。</p>
 <div class="row" style="justify-content:center"><button class="btn ghost" data-go='{"name":"shadow"}'>もどる</button></div></section>`;wireGo(app)}

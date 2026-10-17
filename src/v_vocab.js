// ===== vocab: 間隔反復(箱0〜5)で単語を定着させる =====
// 箱の番号ごとの次回までの日数。正解で1つ上の箱へ、まちがえると箱1に戻る。
const GAP=[0,1,3,7,16,35];
const vState=w=>S.voc[w.w];
function vDue(){const d=today();return VOC.filter(w=>{const s=vState(w);return s&&s.b<5&&s.due<=d}).concat(VOC.filter(w=>{const s=vState(w);return s&&s.b>=5&&s.due<=d}))}
// kind: 'recall'(日→英で思い出せた) / 'recog'(英→日・リスニングで選べた) / 'seen'(カードを見ただけ)
// 見ただけでは箱1まで、選べただけでは箱3まで。箱4(定着)以上は「思い出して書けた」ときだけ上がる。
function vMark(w,ok,kind='recog'){const s=S.voc[w.w]||{b:0,due:today(),n:0};s.n++;
 if(!ok){s.b=1;s.due=dayPlus(1)}
 else if(kind==='seen'){if(s.b<1){s.b=1;s.due=dayPlus(1)}}
 else{const cap=kind==='recall'?5:3;s.b=Math.min(cap,Math.max(s.b,s.b+1));if(kind!=='recall'&&s.b>3)s.b=3;s.due=dayPlus(GAP[s.b])}
 S.voc[w.w]=s;logEv({m:'voc',ok,r:'v:'+w.w,h:kind==='seen'})}
const PN={'名':'名詞','動':'動詞','形':'形容詞','副':'副詞','前':'前置詞','接':'接続詞','句':'フレーズ'};
const TAGN={daily:'日常',travel:'旅行',office:'オフィス',meeting:'会議',hr:'人事・採用',sales:'営業',finance:'お金・経理',shopping:'買い物',phone:'電話',talk:'会話表現',legal:'契約・規則',logistics:'物流・発注',marketing:'マーケティング'};
VIEWS.vocab=function(app){
 const due=vDue().length;
 const box=[0,1,2,3,4,5].map(b=>Object.values(S.voc).filter(x=>x.b===b).length);const mx=Math.max(1,...box);
 const lvc=LV.map(l=>({...l,all:VOC.filter(w=>w.lv===l.n).length,m:VOC.filter(w=>w.lv===l.n&&(vState(w)||{}).b>=4).length}));
 app.innerHTML=`
 <div class="row">${backBtn('TOEIC対策コース',{name:'toeicc'})}</div>
 <div class="uhead"><span class="eyebrow">VOCABULARY</span><h1>単語・フレーズ</h1><p>覚えた単語は「忘れかけた頃」にもう一度出てきます(1日後 → 3日後 → 1週間後 …)。カードを見ただけでは箱1まで、意味を選べただけでは箱3まで。<b>日本語から英語を思い出せたときだけ</b>定着(箱4以上)に進みます。</p></div>
 <section class="sheet panel">
  <div class="row"><span class="eyebrow">レベル</span>${lvc.map(l=>`<button class="tab" data-lv="${l.n}" aria-selected="${S.vlv===l.n}">${l.k}<small>${l.m}/${l.all}</small></button>`).join('')}</div>
  <div class="row" style="margin-top:16px">
   <button class="btn hl" id="v-mix">${IC.card}10語トレーニング</button>
   <button class="btn" id="v-card">カードでながめる</button>
   <button class="btn ghost" id="v-list">単語リスト</button>
  </div>
  <p style="margin:12px 0 0"><small>${due?`いま復習の時期が来ている単語:<b>${due}</b> 語(トレーニングで優先して出ます)`:'いま復習の時期が来ている単語はありません。新しい単語に進みましょう。'}</small></p>
 </section>
 <section class="sheet panel">
  <h3 class="eyebrow">記憶の箱</h3>
  <div class="boxes" style="margin-top:22px">${box.map(n=>`<div style="height:${n/mx*100}%"><span>${n}</span></div>`).join('')}</div>
  <div class="boxl"><span>箱0</span><span>箱1<br>1日後</span><span>箱2<br>3日後</span><span>箱3<br>1週間後</span><span>箱4<br>定着</span><span>箱5<br>完ぺき</span></div>
 </section>`;
 wireGo(app);
 app.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{S.vlv=+b.dataset.lv;save();render()});
 app.querySelector('#v-mix').onclick=()=>startVocab('mix');
 app.querySelector('#v-card').onclick=()=>startVocab('card');
 app.querySelector('#v-list').onclick=()=>go({name:'vlist'});
};
function vocabSet(n){
 const due=vDue().filter(w=>w.lv<=Math.max(S.vlv,1)+1).slice(0,n);
 const fresh=shuffle(VOC.filter(w=>w.lv===S.vlv&&!vState(w))).slice(0,n-due.length);
 let set=[...due,...fresh];
 if(set.length<n)set=set.concat(shuffle(VOC.filter(w=>w.lv===S.vlv&&!set.includes(w))).slice(0,n-set.length));
 return shuffle(set);
}
function startVocab(mode){RT.v={mode,set:vocabSet(10),i:0,ok:0,xp0:S.xp,again:[],combo:0};go({name:'vsess'})}
function distract(w,n,key){// 同じ品詞・近いレベルから紛らわしい選択肢を選ぶ
 const pool=VOC.filter(x=>x!==w&&x.p===w.p&&Math.abs(x.lv-w.lv)<=1&&x[key]!==w[key]);
 const alt=VOC.filter(x=>x!==w&&x[key]!==w[key]);
 const out=[];for(const x of shuffle(pool.length>=n?pool:alt)){if(!out.some(o=>o[key]===x[key]))out.push(x);if(out.length>=n)break}return out}
const firstM=m=>m.split(/[;;]/)[0];
VIEWS.vsess=function(app){
 const R=RT.v;if(!R)return go({name:'vocab'},true);
 const queue=R.set.concat(R.again);
 if(R.i>=queue.length)return vEnd(app);
 const w=queue[R.i];const st=vState(w);const isNew=!st;
 const head=`<div class="row">${backBtn('単語メニュー',{name:'vocab'})}<span class="sp"></span><span class="eyebrow">${R.mode==='card'?'カード':'トレーニング'} ${R.i+1} / ${queue.length}</span></div>
  <div class="pips">${queue.map((_,k)=>`<i class="${k<R.i?'ok':k===R.i?'cur':''}"></i>`).join('')}</div>`;
 if(R.mode==='card'||isNew&&R.mode==='mix'&&!R.shown?.[w.w]){
  // カード: 表=英語、裏=意味と例文
  app.innerHTML=`${head}
  <section class="sheet panel">
   <div class="row" style="margin-bottom:10px">${lvTag(w.lv)}<span class="gtag">${PN[w.p]||w.p}</span><span class="gtag">${TAGN[w.tag]||w.tag}</span>${isNew?'<span class="gtag l4">NEW</span>':''}</div>
   <button class="card" id="cd" aria-label="カードをめくる"><div class="in">
    <div class="f"><div class="w">${esc(w.w)}</div><small>タップで意味を見る</small></div>
    <div class="b"><div class="w" style="font-size:22px">${esc(w.w)}</div><div class="m">${esc(w.m)}</div><div class="ee">${esc(w.e)}</div><div class="jj">${esc(w.j)}</div></div>
   </div></button>
   <div class="row" style="justify-content:center;margin-top:14px">${sayBtn(w.w)}${sayBtn(w.e,'m')}<small>単語 / 例文を聞く</small></div>
   <div class="next" id="cn" style="justify-content:center">${R.mode==='card'?`<button class="btn ghost" id="ng">まだ自信なし</button><button class="btn hl" id="ok">わかった</button>`:`<button class="btn hl" id="ok">覚えた、問題へ →</button>`}</div>
  </section>`;
  wireGo(app);wireSay(app);
  const cd=app.querySelector('#cd');cd.onclick=()=>{cd.classList.toggle('flip');if(cd.classList.contains('flip'))speak(w.e,{g:'m'})};
  setTimeout(()=>speak(w.w),200);
  if(R.mode==='card'){
   app.querySelector('#ok').onclick=()=>{vMark(w,true,'seen');R.ok++;addXP(1);dailyNow().v++;R.i++;render()};
   app.querySelector('#ng').onclick=()=>{vMark(w,false);save();R.i++;render()};
  }else app.querySelector('#ok').onclick=()=>{R.shown=R.shown||{};R.shown[w.w]=1;render()};
  return;
 }
 // クイズ: 3種類からランダム(英→日 / 音→日 / 日→英)
 const type=R.type?.[R.i]??(R.type=R.type||{},R.type[R.i]=(st&&st.b>=3)?2:Math.floor(Math.random()*3));// 箱3以上は「意味→英語」で思い出せるか確認
 const key=type===2?'w':'m';const ds=distract(w,3,key);const opts=shuffle([w,...ds]);
 const prompt=type===0?`<div class="w en" style="font-size:32px;font-weight:600">${esc(w.w)}</div><small>意味は?</small>`
  :type===1?`<button class="btn hl" id="lp">${IC.play}もう一度聞く</button><div><small>聞こえた単語の意味は?</small></div>`
  :`<div class="one">${esc(w.m)}</div><small>この意味の英語は?(${PN[w.p]||w.p})</small>`;
 app.innerHTML=`${head}
  <section class="sheet panel">
   <div class="qhead"><span>${['英語 → 意味','リスニング','意味 → 英語'][type]}</span><span class="combo">${R.combo>=2?R.combo+' 連続!':''}</span></div>
   <div style="text-align:center;margin:10px 0 18px;display:flex;flex-direction:column;align-items:center;gap:6px">${prompt}</div>
   <div class="opts">${opts.map((o,k)=>`<button class="opt ${type===2?'en':''}" data-w="${esc(o.w)}"><span class="k">${k+1}</span><span>${esc(type===2?o.w:firstM(o.m))}</span></button>`).join('')}</div>
   <div id="vf"></div>
  </section>`;
 wireGo(app);
 if(type!==2)setTimeout(()=>speak(w.w),200);
 const lp=app.querySelector('#lp');if(lp)lp.onclick=()=>speak(w.w);
 let done=false;
 app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(done)return;done=true;const ok=b.dataset.w===w.w;
  app.querySelectorAll('.opt').forEach(o=>{o.disabled=true;if(o.dataset.w===w.w)o.classList.add('ok')});if(!ok)b.classList.add('ng');
  S.answered++;dailyNow().v++;
  if(ok){S.correct++;R.ok++;R.combo++;S.maxCombo=Math.max(S.maxCombo,R.combo);if(!R.missed?.[w.w])vMark(w,true,type===2?'recall':'recog');addXP(5+Math.min(Math.max(R.combo-1,0),5))}
  else{R.combo=0;R.missed=R.missed||{};if(!R.missed[w.w]){R.missed[w.w]=1;vMark(w,false);R.again.push(w)}save()}
  const vf=app.querySelector('#vf');
  vf.innerHTML=`<div class="fb ${ok?'ok':'ng'}">${ok?hana:'<span class="verdict" style="font-size:34px">✕</span>'}<div><div class="verdict"><span class="en">${esc(w.w)}</span></div><div><b>${esc(w.m)}</b></div><div class="en" style="margin-top:4px">${esc(w.e)} ${sayBtn(w.e,'m')}</div><div class="tr">${esc(w.j)}</div>${ok?'':'<div class="tr">このあと、もう一度出てきます。</div>'}</div></div>
   <div class="next"><button class="btn hl" id="vn">つぎへ →</button></div>`;
  wireSay(vf);if(!ok)speak(w.w);
  vf.querySelector('#vn').onclick=()=>{R.i++;render()};vf.querySelector('#vn').scrollIntoView({block:'nearest',behavior:'smooth'});
 });
};
function vEnd(app){const R=RT.v;if(!R.ended){R.ended=true;checkBadges();save()}
 const n=R.set.length+R.again.length;
 app.innerHTML=`<div class="row">${backBtn('単語メニュー',{name:'vocab'})}</div>
 <section class="sheet result"><div class="eyebrow">VOCABULARY</div><div class="big" style="margin-top:10px">${R.ok}<small style="font-size:22px"> / ${n}</small></div>
  <div class="gain"><span>獲得 <b>${S.xp-R.xp0}</b> XP</span><span>定着した単語 <b>${vMastered()}</b> 語</span><span>次に復習する単語 <b>${vDue().length}</b> 語</span></div>
  <div class="row" style="justify-content:center"><button class="btn hl" id="again">${IC.redo}もう10語</button><button class="btn ghost" data-go='{"name":"vocab"}'>単語メニュー</button></div></section>
 <section class="sheet panel"><h3 class="eyebrow">今回の単語</h3><div class="wl" style="margin-top:8px">${R.set.map(w=>`<div class="wi">${sayBtn(w.w)}<div><span class="w">${esc(w.w)}</span><span class="m">${esc(w.m)}</span></div>${dots(w)}</div>`).join('')}</div></section>`;
 wireGo(app);wireSay(app);app.querySelector('#again').onclick=()=>startVocab(R.mode);
}
const dots=w=>{const b=(vState(w)||{b:0}).b;return `<span class="dots" title="箱${b}">${[1,2,3,4,5].map(i=>`<i class="${i<=b?'on':''}"></i>`).join('')}</span>`};
VIEWS.vlist=function(app){
 const q=(V.q||'').toLowerCase();const lv=V.lv||S.vlv;
 const list=VOC.filter(w=>(q?(w.w.toLowerCase().includes(q)||w.m.includes(q)):w.lv===lv));
 app.innerHTML=`<div class="row">${backBtn('単語メニュー',{name:'vocab'})}</div>
 <div class="uhead"><h1>単語リスト</h1></div>
 <input class="search" id="sq" placeholder="英語か日本語で検索" value="${esc(V.q||'')}" aria-label="単語を検索">
 <div class="tabs">${LV.map(l=>`<button class="tab" data-lv="${l.n}" aria-selected="${!q&&lv===l.n}">${l.k}<small>${l.s}</small></button>`).join('')}</div>
 <section class="sheet panel"><small>${list.length} 件</small><div class="wl" style="margin-top:8px">${list.map(w=>`<div class="wi">${sayBtn(w.w)}<div><span class="w">${esc(w.w)}</span> <small>${PN[w.p]||''}</small><span class="m">${esc(w.m)}</span><span class="m en">${esc(w.e)}</span></div>${dots(w)}</div>`).join('')||'<p>見つかりませんでした。</p>'}</div></section>`;
 wireGo(app);wireSay(app);
 const sq=app.querySelector('#sq');let tm;sq.oninput=()=>{clearTimeout(tm);tm=setTimeout(()=>{V={...V,q:sq.value};history.replaceState(V,'');render();const n=document.getElementById('sq');n.focus();n.setSelectionRange(n.value.length,n.value.length)},300)};
 app.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>go({name:'vlist',lv:+b.dataset.lv},true));
};

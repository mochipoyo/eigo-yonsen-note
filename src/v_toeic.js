// ===== TOEIC形式の演習 =====
const VC={W:'f',M:'m',W2:'f',M2:'m'};
function p2Item(q,i){return {s:'<span style="font-family:var(--f-body);font-size:15px">音声を聞いて、問いかけに対する最も適切な応答を (A)(B)(C) から選んでください。</span>',jaQ:true,
 c:q.o,a:q.a,keep:true,hideOpts:true,label:'Part 2 ・ '+q.type,ref:{t:'p2',i},
 audio:[{text:q.q,g:i%2?'m':'f',gap:700},...q.o.map((o,k)=>({text:'('+'ABC'[k]+') '+o,g:i%2?'f':'m',gap:500}))],
 why:q.why,ja:`<span class="en">Q: ${esc(q.q)}</span>`,review:`<span class="en">${esc(q.q)}</span>`}}
function p5Item(q,i){return {s:blankify(q.s),c:q.c,a:q.a,why:q.why,label:'Part 5 ・ '+q.k,ref:{t:'p5',i},review:blankify(q.s)}}
function rec(part,r){S.tc[part][0]+=r.ok;S.tc[part][1]+=r.n}
const PARTS=[
 {id:'p2',n:'Part 2',t:'応答問題',d:'問いかけを聞いて、自然な返事を3つから選ぶ。会話の瞬発力がつく',cnt:()=>P2.length+'問',run:()=>{const qs=pick(P2.map((q,i)=>({q,i})),10);startQuiz({title:'Part 2 応答問題',back:{name:'toeic'},backLabel:'TOEIC形式',items:qs.map(({q,i})=>p2Item(q,i)),onEnd:r=>rec('p2',r),retry:PARTS[0].run})}},
 {id:'p3',n:'Part 3',t:'会話問題',d:'2〜3人の会話を聞いて、設問に答える',cnt:()=>P3.length+'会話',run:()=>{const cs=pick(P3,2);const items=[];
  cs.forEach(c=>{const audio=c.lines.map(l=>({text:l.en,g:VC[l.s]||'f'}));const script=`<details class="more"><summary>スクリプトと訳を見る</summary><div class="passage" style="margin-top:8px;max-height:none">${c.lines.map(l=>`<b>${l.s.replace(/2$/,'')}:</b> ${esc(l.en)}`).join('\n')}</div><div class="trn">${esc(c.ja)}</div></details>`;
   c.qs.forEach((q,k)=>items.push({s:esc(q.q),c:q.o,a:q.a,why:q.why,label:'Part 3 ・ '+c.title,audio:k===0?audio:audio,autoplay:k===0,audioNote:k===0?'会話は1回だけ流れます(練習なので何度でも聞き直せます)':'',after:script,oneCol:true}))});
  startQuiz({title:'Part 3 会話問題',back:{name:'toeic'},backLabel:'TOEIC形式',items,onEnd:r=>rec('p3',r),retry:PARTS[1].run})}},
 {id:'p5',n:'Part 5',t:'短文穴埋め',d:'文法と語彙の4択。空所の前後だけで解ける問題を素早く',cnt:()=>P5.length+'問',run:lv=>{const pool=P5.map((q,i)=>({q,i})).filter(x=>!lv||x.q.lv===lv);const qs=pick(pool,10);startQuiz({title:'Part 5 短文穴埋め'+(lv?`(${LV[lv-1].k})`:''),back:{name:'toeic'},backLabel:'TOEIC形式',items:qs.map(({q,i})=>p5Item(q,i)),onEnd:r=>rec('p5',r),retry:()=>PARTS[2].run(lv)})}},
 {id:'p6',n:'Part 6',t:'長文穴埋め',d:'メールや告知の空所を埋める。文を選ぶ問題は前後の流れがカギ',cnt:()=>P6.length+'文書',run:()=>{const d=pick(P6,1)[0];
  const ctx=`<div class="eyebrow">${esc(d.kind)}</div><div class="passage">${esc(d.title)}\n\n${esc(d.text).replace(/\[(\d)\]/g,'<span class="gap">[$1]</span>')}</div>`;
  startQuiz({title:'Part 6 長文穴埋め',back:{name:'toeic'},backLabel:'TOEIC形式',items:d.qs.map(q=>({s:`空所 <b>[${q.n}]</b> に入る最も適切なものは?`,jaQ:true,c:q.o,a:q.a,why:q.why,ctx,label:'Part 6',oneCol:true,after:`<details class="more"><summary>日本語訳を見る</summary><div class="trn">${esc(d.ja)}</div></details>`})),onEnd:r=>rec('p6',r),retry:PARTS[3].run})}},
 {id:'p7',n:'Part 7',t:'読解',d:'メール・広告・チャットなどを読んで答える。言いかえを見抜く力',cnt:()=>P7.length+'文書',run:()=>{const ds=pick(P7,2);const items=[];
  ds.forEach(d=>{const ctx=`<div class="eyebrow">${esc(d.kind)}</div><div class="passage">${d.title?esc(d.title)+'\n\n':''}${esc(d.text)}</div>`;
   d.qs.forEach(q=>items.push({s:esc(q.q),c:q.o,a:q.a,why:q.why,ctx,label:'Part 7 ・ '+d.kind,oneCol:true,after:`<details class="more"><summary>日本語訳を見る</summary><div class="trn">${esc(d.ja)}</div></details>`}))});
  startQuiz({title:'Part 7 読解',back:{name:'toeic'},backLabel:'TOEIC形式',items,onEnd:r=>rec('p7',r),retry:PARTS[4].run})}}];
VIEWS.toeic=function(app){
 app.innerHTML=`
 <div class="row">${backBtn('ホーム',{name:'home'})}</div>
 <div class="uhead"><span class="eyebrow">TOEIC L&amp;R STYLE</span><h1>TOEIC形式 演習</h1><p>本番と同じ形式のオリジナル問題です。音声はブラウザの読み上げなので、本番の録音とは聞こえ方が違う点に注意してください。</p></div>
 <section class="sheet"><div class="units">${PARTS.map((p,k)=>{const c=S.tc[p.id];return `<button class="unit" data-p="${k}"><span class="no" style="font-size:11px">${p.n.slice(5)}</span><span><span class="tt">${p.n} ${p.t}</span><span class="tg">${p.d} ・ ${p.cnt()}</span></span><small class="en">${c[1]?Math.round(c[0]/c[1]*100)+'%':'—'}</small></button>`}).join('')}</div></section>
 <section class="sheet panel"><h3 class="eyebrow">Part 5 をレベル別に</h3><div class="row" style="margin-top:8px">${LV.map(l=>`<button class="btn ghost sm" data-l="${l.n}">${l.k} ${l.s}</button>`).join('')}</div></section>
 <section class="sheet panel">
  <h2 style="font-family:var(--f-disp);font-weight:400;font-size:20px">TOEIC L&amp;R の形式と、900点への道すじ</h2>
  <div class="blk"><h3>本番の形式(公開テスト)</h3>
  <div style="overflow-x:auto"><table class="fmt"><tr><th>パート</th><th>内容</th><th>問題数</th></tr>
   <tr><td colspan="3"><b>リスニング</b> 約45分・100問</td></tr>
   <tr><td>Part 1</td><td>写真描写</td><td>6</td></tr><tr><td>Part 2</td><td>応答問題</td><td>25</td></tr><tr><td>Part 3</td><td>会話問題(1会話3問)</td><td>39</td></tr><tr><td>Part 4</td><td>説明文問題(1トーク3問)</td><td>30</td></tr>
   <tr><td colspan="3"><b>リーディング</b> 75分・100問</td></tr>
   <tr><td>Part 5</td><td>短文穴埋め</td><td>30</td></tr><tr><td>Part 6</td><td>長文穴埋め(1文書4問)</td><td>16</td></tr><tr><td>Part 7</td><td>読解(1つの文書29問・複数の文書25問)</td><td>54</td></tr></table></div>
  <p><small>合計 約2時間・200問、スコアは10〜990点(5点刻み)。出典:IIBC公式サイト「TOEIC Listening &amp; Reading Test」の出題形式ページ(2026年10月確認)。形式は変わることがあるので、受験前に公式サイトで確認してください。このアプリには、写真が必要な Part 1 と、Part 4 はまだありません。</small></p></div>
  <div class="blk"><h3>900点を目指すときの考え方(一般的な学習法)</h3>
  <ul style="margin:0;padding-left:1.2em">
   <li><b>語彙と文法は「速く」解けるまで</b>:リーディングは時間が足りなくなりやすい試験です。Part 5 は1問あたり短い時間で解く練習を。</li>
   <li><b>言いかえ(パラフレーズ)に慣れる</b>:Part 3・7 の正解は本文と同じ言葉ではなく、別の表現で書かれていることが多いです。</li>
   <li><b>声に出す練習はリスニングにも効く</b>:自分で言える表現は聞き取りやすくなります。会話ロールプレイの発話練習も活用してください。</li>
   <li><b>本番形式の模試で時間配分を確認</b>:このアプリは練習用です。仕上げは公式問題集など本番と同じ分量の問題で、時間を計って解きましょう。</li>
  </ul>
  <p class="note" style="margin-top:12px">必要な学習時間やスコアの伸びは、今の実力・学習時間・やり方によって大きく変わります。このアプリだけで特定のスコアを保証するものではありません。</p></div>
 </section>`;
 wireGo(app);
 app.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>PARTS[+b.dataset.p].run());
 app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>PARTS[2].run(+b.dataset.l));
};

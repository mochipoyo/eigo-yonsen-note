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
 if(m.r&&!inL(m.r,id(ev.r)))return false;if(m.p&&ev.p!==m.p)return false;return true}

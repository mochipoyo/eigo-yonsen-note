// ===== ワールド: アニメーション(移動・向き・立ち位置)。動きは CSS の transition とポーズの切り替えで表現する =====
async function moveTo(W,e,x,y,gait='walk'){
 if(e.k==='person'&&(e.seat||e.lie)){const sy=e.y+10;unseat(W,e);e.y=sy;W.draw();await wait(220)}
 if(e.k==='animal'&&e.on){e.on=null}
 e.act=null;const d=Math.hypot(x-e.x,y-e.y);if(d<4){return}
 e.flip=x<e.x;e.moving=gait;W.draw();e.x=x;e.y=y;
 const dur=Math.max(260,d/SPEED[gait]*1000);W.draw(dur);await wait(dur);e.moving=null;W.draw()}
function faceTo(e,t){e.flip=t.x<e.x}
function spotNear(W,a,t){// 相手の横に立つ位置
 if(t.k==='fix'&&t.near)return {x:t.near.x,y:t.near.y};
 const side=a.x<t.x?-1:1;let y=t.k==='prop'&&t.at&&t.at.ref&&W.ents[t.at.ref]?W.ents[t.at.ref].y+14:t.y+2;
 if(t.k==='prop'&&t.inC){const c=W.ents[t.inC];y=c.at&&W.ents[c.at.ref]?W.ents[c.at.ref].y+14:c.y+2}
 if(t.k==='fix'&&!t.near)y=t.y+14;
 const off=t.k==='fix'?(FIXSZ[t.art]||[100])[0]/2+26:t.k==='prop'?36:58;
 return clampFloor(W,{x:t.x+side*off,y})}
async function goNear(W,a,t){const s=spotNear(W,a,t);await moveTo(W,a,s.x,s.y,'walk');faceTo(a,t);W.draw();await wait(120)}
// 会話: 話している人の口を動かす・相手のほうを向く・「…」の吹き出し
function setTalking(W,id,on){const n=W.nodes&&W.nodes[id];if(n)n.classList.toggle('talking',!!on)}
function faceEachOther(W,a,b){if(!a||!b||a===b)return;if(a.k==='person'&&!a.lie)faceTo(a,b);if(b.k==='person'&&!b.lie&&!b.seat)faceTo(b,a);W.draw()}
function talkDots(W,e){if(!W.FX)return ()=>{};const L=layout(W,e);const k=(e.look&&e.look.k)||1;const g=document.createElementNS('http://www.w3.org/2000/svg','g');
 g.innerHTML=`<g transform="translate(${L.x+(e.flip?-34:34)} ${L.y-185*k})"><rect x="-26" y="-18" width="52" height="28" rx="14" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M${e.flip?8:-8} 10l${e.flip?6:-6} 10l${e.flip?-2:2}-10z" fill="#fff" stroke="${OL}" stroke-width="2"/><g class="tdots" fill="${OL}"><circle cx="-11" cy="-4" r="3.6"/><circle cx="0" cy="-4" r="3.6"/><circle cx="11" cy="-4" r="3.6"/></g></g>`;
 W.FX.appendChild(g);return ()=>g.remove()}

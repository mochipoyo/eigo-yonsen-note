// ===== うごかす英語ワールド: 動き・操作・判定(描画と英文生成から独立) =====
const USER={user:true,en:'I',ja:'私',k:'user'};
// 家具の大きさ(当たり判定用) [幅, 高さ]
const FIXSZ={towel:[124,24],sea:[1000,160],whiteboard:[290,156],sofa:[250,110],chair:[56,104],table:[160,70],desk:[120,64],tv:[150,150],door:[96,186],window:[172,130],fridge:[90,192],sink:[210,100],bed:[280,112],lamp:[60,160],clock:[56,56],tree:[220,290],bench:[176,90],pond:[264,70],flowers:[124,44],bicycle:[110,70],counter:[250,104],register:[64,56],blackboard:[316,164],shelf:[204,184],gate:[124,110],train:[524,206],computer:[70,60],deskphone:[44,30],parasol:[224,200],car:[210,110],trafficlight:[50,214],crosswalk:[260,72],shop:[284,244],building:[184,320]};
const SPEED={walk:150,run:330};
function W_new(def){// シーン定義から実行用の状態を作る
 const W={def,ents:{},order:[],busy:false,sel:null,ground:{en:def.ground?.en||'the floor',ja:def.ground?.ja||'床',k:'ground',id:'ground'}};
 for(const d of def.ents){const e=JSON.parse(JSON.stringify(d));e.st=e.st||{};e.x0=e.x;e.y0=e.y;
  if(e.k==='person'){e.pose='stand';e.hold=null;e.flip=!!e.flip;e.act=null}
  if(e.k==='animal'){e.pose=e.pose||'stand';e.flip=!!e.flip}
  if(e.k==='fix'&&e.seats)e.seats.forEach(s=>s.occ=null);
  W.ents[e.id]=e;W.order.push(e.id)}
 // 最初から物が家具の上・中にある場合
 for(const e of Object.values(W.ents)){if(e.k==='prop'&&e.at){const r=W.ents[e.at.ref];if(!e.home)e.home=e.at.ref;if(r)placeProp(W,e,r,e.at.p,e.x,true)}}
 // 最初から座っている人
 for(const e of Object.values(W.ents)){if(e.k==='person'&&e.holdInit){const pr=W.ents[e.holdInit];if(pr)placeProp(W,pr,e)}}
 for(const e of Object.values(W.ents)){if(e.k==='person'&&e.sitOn){const f=W.ents[e.sitOn];const s=f&&f.seats.find(s=>!s.occ);if(s){seatPerson(e,f,s)}}}
 return W}
const ents=W=>Object.values(W.ents);
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function fixHit(f){if(f.hit)return f.hit;const sz=FIXSZ[f.art]||[100,100];return {x0:f.x-sz[0]/2,x1:f.x+sz[0]/2,y0:f.y-sz[1],y1:f.y+8}}
const inRect=(p,r)=>p.x>=r.x0&&p.x<=r.x1&&p.y>=r.y0&&p.y<=r.y1;
function seatPerson(e,f,s){e.seat={f:f.id,s:f.seats.indexOf(s)};s.occ=e.id;e.x=s.x;e.y=s.y;e.flip=s.face===-1;e.sh=s.h??40;e.pose='sit'}
function unseat(W,e){if(e.seat){const f=W.ents[e.seat.f];if(f)f.seats[e.seat.s].occ=null;e.seat=null}e.lie=null;e.pose='stand';e.act=null;if(e.k==='person'&&e.standAt){e.x=e.standAt.x;e.y=e.standAt.y;e.standAt=null}}
// 物を置く: 位置と「どこにあるか」を記録
function placeProp(W,p,r,prep,xHint,init){
 p.heldBy=null;p.inC=null;p.hidden=false;
 if(r.k==='prop'){// 入れ物(かご・皿・袋)
  const n=ents(W).filter(o=>o.inC===r.id).length;const sl=(r.cap&&r.cap.slots)||[[0,-12]];const s=sl[n%sl.length];
  p.inC=r.id;p.cdx=s[0];p.cdy=s[1];p.at={p:prep,ref:r.id};return}
 if(r.k==='fix'&&prep==='on'&&r.surf){const S=r.surf;let x=Math.max(S.x0+14,Math.min(S.x1-14,xHint??(S.x0+S.x1)/2));
  for(let t=0;t<8;t++){const clash=ents(W).find(o=>o!==p&&o.k==='prop'&&o.at&&o.at.ref===r.id&&o.at.p==='on'&&!o.inC&&Math.abs(o.x-x)<28);if(!clash)break;x=x+30>S.x1-14?S.x0+14+t*9:x+30}
  p.x=x;p.y=S.y;p.depth=S.front??r.y+2;p.at={p:'on',ref:r.id};return}
 if(r.k==='fix'&&prep==='under'&&r.under){const U=r.under;p.x=Math.max(U.x0,Math.min(U.x1,xHint??(U.x0+U.x1)/2));p.y=U.y;p.depth=U.y-3;p.at={p:'under',ref:r.id};return}
 if(r.k==='fix'&&prep==='in'&&r.inside){const I=r.inside;const n=ents(W).filter(o=>o!==p&&o.at&&o.at.ref===r.id&&o.at.p==='in').length;
  p.x=I.x0+18+((n*34)%Math.max(30,I.x1-I.x0-36));p.y=I.y;p.depth=I.depth??r.y+2;p.at={p:'in',ref:r.id};return}
 if(r.k==='person'){p.heldBy=r.id;r.hold=p.id;p.at=null;return}
 p.at=r.k==='ground'?{p:'on',ref:'ground'}:{p:prep,ref:r.id};p.depth=null}
function layout(W,e){// 描画位置と奥行き
 if(e.k==='prop'){
  if(e.heldBy){const h=W.ents[e.heldBy];const L=layout(W,h);const pose=personPose(W,h);const k=(h.look&&h.look.k)||1;const hp=handPos(pose,h.sh);
   return {x:L.x+(h.flip?-1:1)*hp[0]*k,y:L.y+hp[1]*k+12*k,d:L.d+0.5,hidden:L.hidden||h.hidden}}
  if(e.inC){const c=W.ents[e.inC];const L=layout(W,c);return {x:L.x+(e.cdx||0),y:L.y+(e.cdy||0),d:L.d+0.3,hidden:L.hidden}}
  const hid=e.hidden||(e.at&&e.at.p==='in'&&W.ents[e.at.ref]&&W.ents[e.at.ref].inside&&W.ents[e.at.ref].inside.needOpen&&!W.ents[e.at.ref].st.open);
  return {x:e.x,y:e.y,d:e.depth??e.y,hidden:hid}}
 return {x:e.x,y:e.y,d:e.z??(e.k==='fix'&&e.wall?-1000+e.y:e.y+(e.lie?2:0)),hidden:e.hidden}}
function personPose(W,e){
 if(e.moving)return e.moving==='run'?'run':'walk';
 if(e.swim)return 'swim';if(e.ride)return 'ride';if(e.lie)return 'lie';
 const a=e.act;
 if(e.seat){return a==='read'?'sitread':a==='drink'?'sitdrink':a==='eat'?'siteat':a==='type'?'sittype':a==='raise'?'sitraise':a==='phone'?'sitphone':a==='write'?'sitwrite':e.hold?'sithold':'sit'}
 if(a&&POSE[a])return a;
 return e.hold?'hold':'stand'}
function artFor(W,e){
 if(e.nodraw)return '';
 if(e.k==='person'){const pose=personPose(W,e);const s=personSvg(e.look,pose,e.expr||(e.lie?'sleep':'normal'),{h:e.sh});return pose==='lie'?`<g transform="translate(${(e.look.k||1)*70} ${-(e.lie.h||56)})">${s}</g>`:s}
 if(e.k==='animal'){const pose=e.moving==='run'?'run':e.moving?'walk':e.pose;return e.art==='cat'?catSvg(pose==='run'?'walk':pose,e.c):dogSvg(pose==='sleep'?'lie':pose,e.c)}
 if(e.k==='prop')return propSvg(e.art,e.st);
 if(e.k==='fix')return fixSvg(e.art,e.st,e.o||{});
 return ''}

// ---------------- 実行時(DOM) ----------------
function W_mount(host,W,api){
 host.innerHTML=`<svg class="wsvg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(W.def.t)}"><g class="wbg">${bgSvg(W.def.bg,W.bgst)}</g><g class="wents"></g><g class="wfx"></g></svg>`;
 const svg=host.querySelector('svg'),G=svg.querySelector('.wents'),FX=svg.querySelector('.wfx');
 const nodes={};
 for(const id of W.order){const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','went k-'+W.ents[id].k);g.dataset.id=id;nodes[id]=g;G.appendChild(g)}
 W.svg=svg;W.nodes=nodes;W.FX=FX;
 const drawAll=(dur=0)=>{
  const list=W.order.map(id=>W.ents[id]);
  const L={};list.forEach(e=>L[e.id]=layout(W,e));
  list.forEach(e=>{const g=nodes[e.id],l=L[e.id];const art=artFor(W,e);if(g._art!==art){g.innerHTML=art;g._art=art}
   const fl=(e.k==='person'||e.k==='animal')&&e.flip?' scale(-1 1)':'';
   g.style.transition=dur?`transform ${dur}ms linear, opacity .3s`:'opacity .3s';
   g.style.transform=`translate(${l.x}px,${l.y}px)${fl.replace(' scale(-1 1)',' scaleX(-1)')}`;
   g.style.opacity=l.hidden?0:1;g.style.pointerEvents=l.hidden?'none':'';
   g.classList.toggle('sel',W.sel===e.id);g.classList.toggle('tgt',W.tgt===e.id)});
  // 奥行き順に並べ替え
  [...list].sort((a,b)=>L[a.id].d-L[b.id].d).forEach(e=>G.appendChild(nodes[e.id]));
  if(W.bgDirty){svg.querySelector('.wbg').innerHTML=bgSvg(W.def.bg,W.bgst);W.bgDirty=false}
  let ov=FX.querySelector('.dark');const dk=!!(W.bgst&&W.bgst.dark);if(dk&&!ov){ov=document.createElementNS('http://www.w3.org/2000/svg','rect');ov.setAttribute('class','dark');ov.setAttribute('width','1000');ov.setAttribute('height','600');ov.setAttribute('fill','#0b1030');ov.setAttribute('opacity','.38');ov.style.pointerEvents='none';FX.prepend(ov)}else if(!dk&&ov)ov.remove()};
 W.draw=drawAll;drawAll();
 // ---- 入力(タップ・ドラッグ) ----
 const toSvg=ev=>{const pt=svg.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;const m=svg.getScreenCTM();return m?pt.matrixTransform(m.inverse()):{x:0,y:0}};
 let drag=null;
 svg.addEventListener('pointerdown',ev=>{if(W.busy)return;const g=ev.target.closest('.went');const p=toSvg(ev);
  const e=g?W.ents[g.dataset.id]:null;
  drag={e,p0:p,moved:false,id:ev.pointerId,off:e?Math.max(0,layout(W,e).y-p.y):0};
  if(e&&e.k!=='fix'&&!(e.k==='prop'&&e.heldBy&&W.ents[e.heldBy]&&W.ents[e.heldBy].ride))svg.setPointerCapture(ev.pointerId)});
 svg.addEventListener('pointermove',ev=>{if(!drag||!drag.e||drag.e.k==='fix'||W.busy)return;const p=toSvg(ev);
  if(!drag.moved&&Math.hypot(p.x-drag.p0.x,p.y-drag.p0.y)<8)return;
  if(!drag.moved){drag.moved=true;api.onDragStart&&api.onDragStart(drag.e)}
  ev.preventDefault();const g=nodes[drag.e.id];g.style.transition='none';
  g.style.transform=`translate(${p.x}px,${p.y+drag.off}px)`;g.classList.add('dragging');
  const z=dropZone(W,drag.e,{x:p.x,y:p.y+drag.off});W.tgt=z&&z.r&&z.r.id;Object.entries(nodes).forEach(([id,n])=>n.classList.toggle('tgt',id===W.tgt))});
 const end=ev=>{if(!drag)return;const d=drag;drag=null;try{svg.releasePointerCapture(ev.pointerId)}catch(_){}
  Object.values(nodes).forEach(n=>n.classList.remove('dragging','tgt'));W.tgt=null;
  if(W.busy)return;const p=toSvg(ev);
  if(d.moved&&d.e){api.drop(d.e,{x:p.x,y:p.y+d.off})}
  else if(d.e)api.tap(d.e);else api.tapGround({x:p.x,y:p.y})};
 svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',ev=>{drag=null;drawAll()});
 return {destroy(){host.innerHTML=''}}}
// ドロップ先の判定。{kind, r(相手), p(前置詞)} を返す
function dropZone(W,e,pt){
 const fx=ents(W).filter(f=>f.k==='fix'&&!f.hidden);
 if(e.k==='prop'){
  const cont=ents(W).find(c=>c!==e&&c.k==='prop'&&c.cap&&!c.heldBy&&!c.inC&&!(e.cap)&&Math.hypot(c.x-pt.x,(c.y-14)-pt.y)<44);
  if(cont)return {kind:'prop',r:cont,p:cont.cap.p};
  const per=ents(W).find(o=>o.k==='person'&&!o.hidden&&!o.hold&&!o.swim&&!o.ride&&pt.x>o.x-30&&pt.x<o.x+30&&pt.y>o.y-150*(o.look.k||1)&&pt.y<o.y-30);
  if(per)return {kind:'give',r:per};
  for(const f of fx){if(f.surf&&pt.x>=f.surf.x0-8&&pt.x<=f.surf.x1+8&&pt.y>=f.surf.y-70&&pt.y<=f.surf.y+26)return {kind:'on',r:f,p:'on'}}
  for(const f of fx){if(f.inside&&(!f.inside.needOpen||f.st.open)&&!f.inside.person&&pt.x>=f.inside.x0&&pt.x<=f.inside.x1&&pt.y>=f.inside.y-80&&pt.y<=f.inside.y+20)return {kind:'in',r:f,p:'in'}}
  for(const f of fx){if(f.under&&!e.big&&pt.x>=f.under.x0&&pt.x<=f.under.x1&&pt.y>=f.under.y-34&&pt.y<=f.under.y+26)return {kind:'under',r:f,p:'under'}}
  return {kind:'floor',r:W.ground,p:'on'}}
 if(e.k==='person'){
  for(const f of fx){if(f.seats&&f.seats.some(s=>!s.occ||s.occ===e.id)&&inRect(pt,fixHit(f)))return {kind:f.lieOn?'lie':'sit',r:f}}
  for(const f of fx){if(f.inside&&f.inside.person&&inRect(pt,f.inside.hit||{x0:f.inside.x0,x1:f.inside.x1,y0:f.inside.y-60,y1:f.inside.y+40})&&(!f.inside.needOpen||f.st.open))return {kind:f.inside.person,r:f}}
  const bike=ents(W).find(b=>b.k==='fix'&&b.art==='bicycle'&&!b.hidden&&Math.hypot(b.x-pt.x,b.y-pt.y)<50);if(bike&&!e.look.k)return {kind:'ride',r:bike};
  for(const f of fx){if(f.behind&&Math.hypot(f.behind.x-pt.x,f.behind.y-pt.y)<50)return {kind:'behind',r:f,p:'behind'}}
  const nf=nearestNear(W,pt,100);if(nf)return {kind:'near',r:nf,p:nf.near.p||'next to'};
  return {kind:'walk'}}
 if(e.k==='animal'){
  for(const f of fx){if(f.under&&pt.x>=f.under.x0&&pt.x<=f.under.x1&&pt.y>=f.under.y-40&&pt.y<=f.under.y+30)return {kind:'under',r:f,p:'under'}}
  for(const f of fx){if(f.behind&&Math.hypot(f.behind.x-pt.x,f.behind.y-pt.y)<55)return {kind:'behind',r:f,p:'behind'}}
  for(const f of fx){if((f.seats||f.lieOn)&&f.animalOn&&inRect(pt,fixHit(f)))return {kind:'onto',r:f,p:'on'}}
  const nf=nearestNear(W,pt,100);if(nf)return {kind:'near',r:nf,p:nf.near.p||'next to'};
  return {kind:'walk'}}
 return null}
function nearestNear(W,pt,lim){let best=null,bd=lim;for(const f of ents(W)){if(f.k==='fix'&&f.near&&!f.hidden){const d=Math.hypot(f.near.x-pt.x,f.near.y-pt.y);if(d<bd){bd=d;best=f}}}return best}
function bandOf(W,y){const B=W.def.floors||[W.def.floor];let bi=0,bd=1e9;B.forEach((b,i)=>{const d=y<b[0]?b[0]-y:y>b[1]?y-b[1]:0;if(d<bd){bd=d;bi=i}});return bi}
function clampFloor(W,pt,band){const B=W.def.floors||[W.def.floor];const b=B[band??bandOf(W,pt.y)];return {x:Math.max(40,Math.min(960,pt.x)),y:Math.max(b[0],Math.min(b[1],pt.y))}}

function bubble(W,e,text){const L=layout(W,e);const g=document.createElementNS('http://www.w3.org/2000/svg','g');
 const w=text.length*11+24;g.innerHTML=`<g class="bub-in" transform="translate(${L.x+(e.flip?-30:30)} ${L.y-(e.k==='person'?170:70)})"><rect x="${-w/2}" y="-30" width="${w}" height="30" rx="14" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M-6 0l-4 10l12-10z" fill="#fff" stroke="${OL}" stroke-width="2"/><text y="-10" text-anchor="middle" font-size="16" font-weight="700" font-family="'Lexend',sans-serif" fill="${OL}">${esc(text)}</text></g>`;
 W.FX.appendChild(g);setTimeout(()=>g.remove(),1400)}
// ドロップしたときの動作(実際に起きたことだけを英文にする)
async function dropAct(W,e,pt){const z=dropZone(W,e,pt);const P=clampFloor(W,pt);
 if(e.k==='prop'){
  if(e.heldBy){const h=W.ents[e.heldBy];h.hold=null;h.act=null;e.heldBy=null}
  if(e.inC){e.inC=null}
  if(z.kind==='give'){placeProp(W,e,z.r);z.r.act=null;W.draw();return {v:'give',a:USER,o:e,r:z.r}}
  if(z.kind==='prop'){placeProp(W,e,z.r,z.p);W.draw();return {v:'place',a:USER,o:e,r:z.r,p:z.p,stateFirst:true}}
  if(z.kind==='on'||z.kind==='in'||z.kind==='under'){placeProp(W,e,z.r,z.p,pt.x);W.draw();return {v:'place',a:USER,o:e,r:z.r,p:z.p,stateFirst:true}}
  e.x=P.x;e.y=P.y;e.at={p:'on',ref:'ground'};e.depth=null;W.draw();
  const nf=nearestNear(W,P,90);
  return nf?{v:'place',a:USER,o:e,r:nf,p:nf.near.p||'next to',stateFirst:true}:{v:'place',a:USER,o:e,r:W.ground,p:'on',stateFirst:true}}
 if(e.k==='person'){
  if(e.inside||e.swim)return null;
  if(W.def.floors&&bandOf(W,pt.y)!==bandOf(W,e.y)&&!ents(W).some(f=>f.k==='fix'&&f.art==='crosswalk'&&inRect(pt,fixHit(f)))){const cw=ents(W).find(f=>f.art==='crosswalk');if(cw&&crossOk(W)){const act=comboMenu(W,e,cw).find(a=>a.en==='Cross the street');if(act)return act.run()}bubble(W,e,'Red light!');return null}
  if(z.kind==='sit'){await sitOn(W,e,z.r);return {v:z.r.floorSit?'sitfloor':'sit',a:e,r:z.r,p:'on'}}
  if(z.kind==='lie'){await lieOn(W,e,z.r);return {v:'lie',a:e,r:z.r,p:'on'}}
  if(z.kind==='ride'){await moveTo(W,e,z.r.x,z.r.y,'walk');e.ride=z.r.id;z.r.hidden=true;W.draw();return {v:'getonbike',a:e,o:z.r}}
  if(e.ride){const b=W.ents[e.ride];await moveTo(W,e,P.x,P.y,'walk');const nf=nearestNear(W,P,110);return {v:'ride',a:e,o:b,r:nf||null}}
  // 電車・お店・改札・横断歩道・海 などは、その場所の動作を行う
  const f=ents(W).find(f=>f.k==='fix'&&!f.hidden&&['train','shop','gate','crosswalk'].includes(f.art)&&inRect(pt,fixHit(f)))||ents(W).find(f=>f.k==='fix'&&f.inside&&f.inside.person==='swim'&&pt.y<f.inside.shore&&pt.x>f.inside.x0&&pt.x<f.inside.x1);
  if(f){const act=comboMenu(W,e,f).find(a=>!/^Walk to/.test(a.en));if(act)return act.run()}
  const pr=ents(W).find(p=>p.k==='prop'&&free(W,p)&&!p.cap&&!p.hidden&&Math.hypot(p.x-pt.x,p.y-pt.y)<30);
  if(pr){const act=comboMenu(W,e,pr)[0];if(act)return act.run()}
  if(z.kind==='behind'){await moveTo(W,e,z.r.behind.x,z.r.behind.y,'walk');return {v:'go',a:e,r:z.r,p:'behind',stateFirst:true}}
  if(z.kind==='near'){await moveTo(W,e,z.r.near.x,z.r.near.y,'walk');faceTo(e,z.r);W.draw();return {v:'walk',a:e,r:z.r,state:{v:'go',p:z.p,r:z.r}}}
  const P2=clampFloor(W,pt,bandOf(W,e.y));await moveTo(W,e,P2.x,P2.y,'walk');return {v:'walk',a:e}}
 if(e.k==='animal'){
  const far=Math.hypot(P.x-e.x,P.y-e.y)>260;e.z=null;e.pose='stand';
  if(z.kind==='under'){await moveTo(W,e,Math.max(z.r.under.x0,Math.min(z.r.under.x1,pt.x)),z.r.under.y,far?'run':'walk');return {v:'go',a:e,r:z.r,p:'under',stateFirst:true}}
  if(z.kind==='behind'){await moveTo(W,e,z.r.behind.x,z.r.behind.y,far?'run':'walk');return {v:'go',a:e,r:z.r,p:'behind',stateFirst:true}}
  if(z.kind==='onto'){const s=z.r.animalOn;await moveTo(W,e,s.x-40,s.y+30,'walk');e.x=s.x;e.y=s.y;e.on=z.r.id;e.z=s.depth;W.draw(350);await wait(380);return {v:'jumpon',a:e,r:z.r}}
  if(z.kind==='near'){await moveTo(W,e,z.r.near.x+(e.x<z.r.near.x?-24:24),z.r.near.y+8,far?'run':'walk');return {v:far?'run':'walk',a:e,r:z.r,state:{v:'go',p:z.p,r:z.r}}}
  await moveTo(W,e,P.x,P.y,far?'run':'walk');return {v:far?'run':'walk',a:e}}
 return null}

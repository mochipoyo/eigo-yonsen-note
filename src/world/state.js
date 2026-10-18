// ===== ワールド: オブジェクト状態管理(配置・持つ・座る・位置と奥行き)。描画やDOMには依存しない =====
const USER={user:true,en:'I',ja:'私',k:'user'};
// 家具の大きさ(当たり判定用) [幅, 高さ]
const FIXSZ={wallswitch:[44,60],shoerack:[140,56],coathook:[160,90],bathtub:[240,80],basin:[100,110],mirror:[100,120],towelrack:[120,60],curtain:[128,200],tallshelf:[180,230],mailbox:[52,130],xray:[260,150],detector:[116,212],planeseat:[290,120],bin:[300,60],cart:[80,110],ac:[160,44],mapboard:[220,150],ticketmachine:[72,150],linemap:[260,110],atm:[88,170],rack:[180,170],salonchair:[70,120],poster:[110,160],theaterseats:[290,96],screen:[300,170],treadmill:[160,128],dumbrack:[140,60],balloons:[80,212],podium:[88,140],logowall:[240,90],elevator:[124,196],fboard:[340,134],gatesign:[92,206],scale:[120,42],plant:[60,120],signpost:[80,184],menuboard:[240,130],towel:[124,24],sea:[1000,160],whiteboard:[290,156],sofa:[250,110],chair:[56,104],table:[160,70],desk:[120,64],tv:[150,150],door:[96,186],window:[172,130],fridge:[90,192],sink:[210,100],bed:[280,112],lamp:[60,160],clock:[56,56],tree:[220,290],bench:[176,90],pond:[264,70],flowers:[124,44],bicycle:[110,70],counter:[250,104],register:[64,56],blackboard:[316,164],shelf:[204,184],gate:[124,110],train:[524,206],computer:[70,60],deskphone:[44,30],parasol:[224,200],car:[210,110],trafficlight:[50,214],crosswalk:[260,72],shop:[284,244],building:[184,320]};
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

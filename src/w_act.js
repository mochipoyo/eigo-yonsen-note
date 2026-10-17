// ===== うごかす英語ワールド: アクション(できる動作の一覧・アニメーション・出来事の記録) =====
// 自然に成り立たない動作は一覧に出さない。各 run() は出来事 ev(または配列)を返す。
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
async function wPick(W,a,p){// 持ち上げる(まだ持っていなければ)
 if(a.hold===p.id)return;if(a.hold)await dropHeld(W,a);await goNear(W,a,p);
 if(p.heldBy&&p.heldBy!==a.id){const o=W.ents[p.heldBy];o.hold=null}
 const from=p.at;p.inC=null;placeProp(W,p,a);a.act=null;W.draw();await wait(300);return from}
async function dropHeld(W,a){const p=W.ents[a.hold];if(!p)return;a.hold=null;p.heldBy=null;p.x=a.x+(a.flip?-30:30);p.y=a.y+4;p.at={p:'on',ref:'ground'};p.depth=null;W.draw()}
const holding=a=>a.hold&&a.k==='person';
const free=(W,p)=>!p.heldBy&&!p.hidden&&!(p.at&&p.at.p==='in'&&W.ents[p.at.ref]&&W.ents[p.at.ref].inside&&W.ents[p.at.ref].inside.needOpen&&!W.ents[p.at.ref].st.open);
const wA=(en,ja,run,o={})=>({en,ja,run,...o});
// ---- 一人(一匹)でできる動作 ----
function selfMenu(W,a){const m=[];const ex=a.extra||[];
 if(a.k==='animal'){
  m.push(wA('Walk','歩く',async()=>{const t=randSpot(W,a);await moveTo(W,a,t.x,t.y,'walk');return {v:'walk',a}}));
  m.push(wA('Run','走る',async()=>{const t=randSpot(W,a,260);await moveTo(W,a,t.x,t.y,'run');return {v:'run',a}}));
  if(a.pose!=='sit')m.push(wA('Sit','おすわり',async()=>{a.pose='sit';W.draw();return {v:'sitA',a}}));
  if(a.pose!=='lie'&&a.art==='dog')m.push(wA('Lie down','ふせる',async()=>{a.pose='lie';W.draw();return {v:'liedown',a}}));
  if(a.art==='cat'&&a.pose!=='sleep')m.push(wA('Sleep','寝る',async()=>{a.pose='sleep';W.draw();return {v:'sleep',a,r:a.on?W.ents[a.on]:null,p:'on'}}));
  if(a.art==='dog')m.push(wA('Bark','ほえる',async()=>{bubble(W,a,'Woof!');a.pose='stand';W.draw();await wait(500);return {v:'bark',a}}));
  if(a.pose!=='stand')m.push(wA('Stand up','立つ',async()=>{a.pose='stand';W.draw();return {v:'stand',a}}));
  return m}
 if(a.inside){const f=W.ents[a.inside];
  if(f.art==='train')m.push(wA('Get off the train','電車から降りる',async()=>{a.hidden=false;a.inside=null;a.x=f.x+(f.doorX||-120);a.y=f.boardY||f.y+80;W.draw();await moveTo(W,a,a.x,a.y+40);return {v:'getoff',a,r:f}}));
  if(f.art==='shop')m.push(wA('Come out of the shop','お店から出る',async()=>{a.hidden=false;a.inside=null;a.x=f.x;a.y=f.y+16;W.draw();await moveTo(W,a,f.x+40,f.y+50);return {v:'exit',a,r:f}}));
  return m}
 if(a.swim){const f=W.ents[a.swim];m.push(wA('Come out of the sea','海から上がる',async()=>{a.swim=null;await moveTo(W,a,a.x,f.inside.shore,'walk');return {v:'exit',a,r:f}}));return m}
 if(a.ride){const b=W.ents[a.ride];m.push(wA('Get off the bicycle','自転車から降りる',async()=>{a.ride=null;b.hidden=false;b.x=a.x+(a.flip?-40:40);b.y=a.y;W.draw();await wait(250);return {v:'getoffbike',a,o:b}}));
  m.push(wA('Ride','自転車で進む',async()=>{const t=randSpot(W,a,260);await moveTo(W,a,t.x,t.y,'walk');return {v:'ride',a,o:b}}));return m}
 if(a.seat||a.lie)m.push(wA('Stand up','立ち上がる',async()=>{const sy=a.y+10;unseat(W,a);a.y=sy;W.draw();await wait(250);return {v:'stand',a}}));
 else{
  m.push(wA('Walk','歩く',async()=>{const t=randSpot(W,a);await moveTo(W,a,t.x,t.y,'walk');return {v:'walk',a}}));
  if(ex.includes('run'))m.push(wA('Run','走る',async()=>{const t=randSpot(W,a,280);await moveTo(W,a,t.x,t.y,'run');return {v:'run',a}}));
  if(ex.includes('jump'))m.push(wA('Jump','ジャンプする',async()=>{a.act='jump';W.draw();await wait(900);a.act=null;W.draw();return {v:'jump',a}}));
  m.push(wA('Wave','手をふる',async()=>{a.act='wave';W.draw();await wait(1100);a.act=null;W.draw();return {v:'wave',a}}));}
 if(ex.includes('meeting')&&!a.seat)m.push(wA('Start the meeting','会議を始める',async()=>{bubble(W,a,"Let's begin!");a.act='wave';W.draw();await wait(900);a.act=null;W.draw();return {v:'meeting',a}}));
 if(ex.includes('raise'))m.push(wA('Raise your hand','手を挙げる',async()=>{a.act='raise';W.draw();await wait(500);return {v:'raise',a}}));
 if(a.lie&&!a.sleeping)m.push(wA('Sleep','眠る',async()=>{a.sleeping=true;a.expr='sleep';W.draw();return {v:'sleep',a,r:W.ents[a.lie.f],p:'on'}}));
 const h=a.hold&&W.ents[a.hold];
 if(h){
  if(h.read)m.push(wA(h.lookAt?'Look at the menu':'Read','読む',async()=>{h.st.open=true;a.act='read';W.draw();return {v:'read',a,o:h}}));
  if(h.liq&&h.st.full)m.push(wA('Drink','飲む',async()=>{a.act='drink';W.draw();await wait(900);return {v:'drink',a,o:h}}));
  if(h.food&&!h.st.eaten)m.push(wA('Eat','食べる',async()=>eatIt(W,a,h)));
  if(h.wear)m.push(wA('Put on','身につける',async()=>{a.look=Object.assign({},a.look,{[h.wear]:true});h.hidden=true;h.heldBy=null;a.hold=null;a.worn=h.id;W.draw();return {v:'wear',a,o:h}}));
  if(h.throw)m.push(wA('Throw','投げる',async()=>throwIt(W,a,h,null)));
  if(h.write)m.push(wA('Write in the notebook','ノートに書く',async()=>{h.st.open=true;a.act=a.seat?'write':'read';W.draw();await wait(400);return {v:'write_nb',a,o:h}}));
  if(!a.seat&&!a.lie)m.push(wA('Put it down',`${h.ja}を床に置く`,async()=>{await dropHeld(W,a);return {v:'putdown',a,o:h,ground:W.ground.en.replace(/^the /,''),groundja:W.ground.ja}}));
 }
 if(a.worn){const w=W.ents[a.worn];m.push(wA('Take off','外す',async()=>{a.look=Object.assign({},a.look,{[w.wear]:false});w.hidden=false;a.worn=null;placeProp(W,w,a);W.draw();return {v:'takeoff',a,o:w}}))}
 if(a.seat){const f=W.ents[a.seat.f];const tv=ents(W).find(t=>t.art==='tv'&&t.st.on);if(tv&&f.art==='sofa')m.push(wA('Watch TV','テレビを見る',async()=>{a.act=null;faceTo(a,tv);W.draw();return {v:'watch',a}}))}
 return m}
function randSpot(W,a,min=150){const [y0,y1]=W.def.floor;for(let i=0;i<20;i++){const x=80+Math.random()*840,y=y0+Math.random()*(y1-y0);if(Math.abs(x-a.x)>min*0.7&&!ents(W).some(f=>f.k==='fix'&&!f.wall&&!f.ground&&inRect({x,y:y-20},fixHit(f))))return {x,y}}return {x:a.x>500?a.x-min:a.x+min,y:a.y}}
async function eatIt(W,a,h){a.act='eat';W.draw();await wait(1000);h.st.eaten=true;if(h.vanish){h.hidden=true;h.heldBy=null;a.hold=null}a.act=null;W.draw();return {v:'eat',a,o:h}}
async function throwIt(W,a,h,to){a.act='throw';W.draw();await wait(300);a.hold=null;h.heldBy=null;
 const tx=to?to.x:Math.max(60,Math.min(940,a.x+(a.flip?-260:260))),ty=to?to.y:a.y;
 h.x=tx;h.y=ty;h.at={p:'on',ref:'ground'};h.depth=null;const g=W.nodes[h.id];g.classList.add('flying');W.draw(700);a.act=null;await wait(720);g.classList.remove('flying');W.draw();
 const ev={v:'throw',a,o:h,r:to||null};
 if(to&&to.k==='person'&&!to.hold){placeProp(W,h,to);W.draw();return [ev,{v:'catch',a:to,o:h}]}
 if(to&&to.k==='animal'){await moveTo(W,to,tx+20,ty,'run');await wait(150);const back=spotNear(W,to,a);await moveTo(W,to,back.x,back.y,'run');placeProp(W,h,a);W.draw();return [ev,{v:'fetch',a:to,o:h}]}
 return ev}
// ---- 人物 → 相手 の組み合わせ ----
function comboMenu(W,a,t){const m=[];if(!t||t===a)return m;
 if(a.k==='animal')return animalCombo(W,a,t);
 if(a.inside||a.swim)return m;
 const h=a.hold&&W.ents[a.hold];
 if(a.ride){if(t.k==='fix'&&t.near)m.push(wA(`Ride to ${t.en}`,`自転車で${t.ja}へ`,async()=>{await moveTo(W,a,t.near.x,t.near.y,'walk');return {v:'ride',a,o:W.ents[a.ride],r:t}}));return m}
 if(t.k==='fix'){
  if(t.seats&&(!t.lieOn||t.sitToo)&&t.seats.some(s=>!s.occ)&&!(a.seat&&a.seat.f===t.id))m.push(wA(`Sit on ${t.en}`,`${t.ja}に座る`,async()=>{await sitOn(W,a,t);return {v:t.floorSit?'sitfloor':'sit',a,r:t,p:'on'}}));
  if(t.lieOn&&t.seats.some(s=>!s.occ))m.push(wA(`Lie on ${t.en}`,`${t.ja}に横になる`,async()=>{await lieOn(W,a,t);return {v:'lie',a,r:t,p:'on'}}));
  if(t.toggle==='open')m.push(t.st.open?wA(`Close ${t.en}`,`${t.ja}を閉める`,async()=>{await goNear(W,a,t);t.st.open=false;W.draw();return {v:'close',a,o:t}}):wA(`Open ${t.en}`,`${t.ja}を開ける`,async()=>{await goNear(W,a,t);a.act='give';W.draw();await wait(250);t.st.open=true;a.act=null;W.draw();return {v:'open',a,o:t}}));
  if(t.toggle==='on')m.push(t.st.on?wA(`Turn off ${t.en}`,`${t.ja}を消す`,async()=>{await goNearOrRemote(W,a,t);t.st.on=false;onToggle(W,t);W.draw();return {v:'turnoff',a,o:t}}):wA(`Turn on ${t.en}`,`${t.ja}をつける`,async()=>{await goNearOrRemote(W,a,t);t.st.on=true;onToggle(W,t);W.draw();return {v:'turnon',a,o:t}}));
  if(t.art==='tv'&&t.st.on)m.push(wA('Watch TV','テレビを見る',async()=>{const sofa=ents(W).find(f=>f.art==='sofa'&&f.seats.some(s=>!s.occ||s.occ===a.id));if(sofa&&!a.seat)await sitOn(W,a,sofa);else if(!a.seat)await goNear(W,a,t);faceTo(a,t);W.draw();return {v:'watch',a}}));
  if(h&&t.surf&&!h.big2)m.push(wA(`Put ${h.en} on ${t.en}`,`${h.ja}を${t.ja}に置く`,async()=>putOn(W,a,h,t,'on')));
  if(h&&t.inside&&!t.inside.person&&(!t.inside.needOpen||t.st.open))m.push(wA(`Put ${h.en} in ${t.en}`,`${h.ja}を${t.ja}に入れる`,async()=>putOn(W,a,h,t,'in')));
  if(h&&t.under&&h.small)m.push(wA(`Put ${h.en} under ${t.en}`,`${h.ja}を${t.ja}の下に置く`,async()=>putOn(W,a,h,t,'under')));
  if(t.near&&!t.seats&&!t.inside&&dist(a,t.near)>40)m.push(wA(`Walk to ${t.en}`,`${t.ja}のところへ歩く`,async()=>{await moveTo(W,a,t.near.x,t.near.y,'walk');faceTo(a,t);W.draw();return {v:'walk',a,r:t,state:{v:'go',p:t.near.p||'next to',r:t}}}));
  if(t.behind)m.push(wA(`Go behind ${t.en}`,`${t.ja}の後ろへ行く`,async()=>{await moveTo(W,a,t.behind.x,t.behind.y,'walk');return {v:'go',a,r:t,p:'behind',stateFirst:true}}));
  if(t.under&&t.underPerson&&!a.seat)m.push(wA(`Go under ${t.en}`,`${t.ja}の下へ行く`,async()=>{await moveTo(W,a,(t.under.x0+t.under.x1)/2+(Math.random()*30-15),t.under.y,'walk');return {v:'go',a,r:t,p:'under',stateFirst:true}}));
  if(t.art==='computer')m.push(wA(`Use ${t.en}`,`${t.ja}を使う`,async()=>{const ch=t.useSeat&&W.ents[t.useSeat];if(ch&&ch.seats.some(s=>!s.occ||s.occ===a.id)){if(!(a.seat&&a.seat.f===ch.id))await sitOn(W,a,ch)}else await goNear(W,a,t);t.st.on=true;a.act='type';W.draw();return {v:'use',a,o:t}}));
  if(t.art==='deskphone')m.push(wA('Answer the phone','電話に出る',async()=>{if(!a.seat)await goNear(W,a,t);t.st.ring=false;t.st.up=true;a.act='phone';W.draw();return {v:'answer',a}}));
  if(t.art==='blackboard')m.push(wA(`Write on ${t.en}`,`${t.ja}に書く`,async()=>{await moveTo(W,a,t.near.x,t.near.y,'walk');a.flip=false;a.act='write';W.draw();await wait(500);t.st.text=t.text||'Hello!';W.bgDirty=true;W.draw();return {v:'write',a,r:t,p:'on'}}));
  if(t.art==='register')m.push(wA(`Pay at ${t.en}`,`${t.ja}でお金を払う`,async()=>{await goNear(W,a,t);a.act='give';W.draw();await wait(500);t.st.paid=true;a.act=null;W.draw();return {v:'pay',a,r:t}}));
  if(t.art==='train'&&t.st.open&&!t.st.leaving)m.push(wA('Get on the train','電車に乗る',async()=>{await moveTo(W,a,t.x+(t.doorX||-120),t.boardY||t.y+80,'walk');a.inside=t.id;a.hidden=true;if(a.hold){}W.draw();return {v:'board',a,r:t}}));
  if(t.art==='gate')m.push(wA(`Go through ${t.en}`,`${t.ja}を通る`,async()=>{const side=a.x>t.x?-1:1;await moveTo(W,a,t.x-side*90,t.y+14,'walk');t.st.open=true;W.draw();await moveTo(W,a,t.x+side*120,t.y+14,'walk');t.st.passed=true;t.st.open=false;W.draw();return {v:'gothrough',a,r:t}}));
  if(t.art==='shop'&&bandOf(W,a.y)===bandOf(W,t.y+12))m.push(wA(`Go into ${t.en}`,`${t.ja}に入る`,async()=>{await moveTo(W,a,t.x,t.y+12,'walk');t.st.open=true;W.draw();await wait(300);a.inside=t.id;a.hidden=true;t.st.open=false;W.draw();return {v:'enter',a,r:t}}));
  if(t.inside&&t.inside.person==='swim')m.push(wA(`Swim in ${t.en}`,`${t.ja}で泳ぐ`,async()=>{await moveTo(W,a,Math.max(t.inside.x0+40,Math.min(t.inside.x1-40,a.x)),t.inside.shore,'walk');a.swim=t.id;if(a.hold)await dropHeld(W,a);await moveTo(W,a,a.x+(a.flip?-60:60),t.inside.y,'walk');a.swim=t.id;W.draw();return {v:'swim',a,r:t}}));
  if(t.art==='crosswalk'&&crossOk(W))m.push(wA('Cross the street','道路をわたる',async()=>{const toTop=a.y>t.y;await moveTo(W,a,t.x,a.y,'walk');await moveTo(W,a,t.x+(Math.random()*60-30),toTop?t.top:t.bottom,'walk');return {v:'cross',a}}));
  if(t.art==='bicycle'&&!t.hidden&&!a.look.k&&!a.hold)m.push(wA(`Get on ${t.en}`,`${t.ja}に乗る`,async()=>{await moveTo(W,a,t.x,t.y,'walk');a.ride=t.id;t.hidden=true;W.draw();return {v:'getonbike',a,o:t}}));
 }
 if(t.k==='prop'){
  const can=free(W,t)&&!t.fixed;
  if(can&&a.hold!==t.id&&!t.cap){const fromC=t.at&&t.at.p==='in'?(W.ents[t.at.ref]||null):null;
   m.push(wA(fromC?`Take ${t.en} out of ${fromC.en}`:`Pick up ${t.en}`,fromC?`${fromC.ja}から${t.ja}を取り出す`:`${t.ja}を手に取る`,async()=>{const from=t.inC?W.ents[t.inC]:fromC;await wPick(W,a,t);return from?{v:'takeout',a,o:t,r:from}:{v:'pickup',a,o:t,stateFirst:false}}))}
  if(t.cap&&can&&a.hold!==t.id&&!t.heavy)m.push(wA(`Pick up ${t.en}`,`${t.ja}を持つ`,async()=>{await wPick(W,a,t);return {v:'pickup',a,o:t}}));
  if((can||a.hold===t.id)&&t.read)m.push(wA(t.lookAt?`Look at ${t.en}`:`Read ${t.en}`,t.lookAt?`${t.ja}を見る`:`${t.ja}を読む`,async()=>{await wPick(W,a,t);t.st.open=true;a.act='read';W.draw();return {v:'read',a,o:t}}));
  if((can||a.hold===t.id)&&t.liq&&t.st.full)m.push(wA(`Drink ${t.liq}`,`${t.liqja}を飲む`,async()=>{if(!(t.onTable&&a.seat))await wPick(W,a,t);else{await wPick(W,a,t)}a.act='drink';W.draw();await wait(900);return {v:'drink',a,o:t}}));
  if((can||a.hold===t.id)&&t.food&&!t.st.eaten)m.push(wA(`Eat ${t.ind||t.en}`,`${t.ja}を食べる`,async()=>{if(t.vanish)await wPick(W,a,t);else if(!a.seat)await goNear(W,a,t);return eatIt(W,a,t)}));
  if((can||a.hold===t.id)&&t.wear&&!a.worn)m.push(wA(`Put on ${t.en}`,`${t.ja}を${(t.wearja||'身につける').replace('ています','る')}`,async()=>{await wPick(W,a,t);a.look=Object.assign({},a.look,{[t.wear]:true});t.hidden=true;t.heldBy=null;a.hold=null;a.worn=t.id;W.draw();return {v:'wear',a,o:t}}));
  if(h&&t.cap&&h!==t&&!h.cap)m.push(wA(`Put ${h.en} ${t.cap.p==='in'?'in':'on'} ${t.en}`,`${h.ja}を${t.ja}${t.cap.p==='in'?'に入れる':'にのせる'}`,async()=>putOn(W,a,h,t,t.cap.p)));
  if(h&&h.pour&&t.liq&&!t.st.full)m.push(wA(`Pour water into ${t.en}`,`${t.ja}に水を注ぐ`,async()=>{await goNear(W,a,t);a.act='hold';W.draw();await wait(600);t.st.full=true;W.draw();return {v:'pour',a,r:t}}));
  if((can||a.hold===t.id)&&t.write)m.push(wA(`Write in ${t.en}`,`${t.ja}に書く`,async()=>{if(a.seat){t.st.open=true;a.act='write'}else{await wPick(W,a,t);t.st.open=true;a.act='read'}W.draw();await wait(400);return {v:'write_nb',a,o:t}}));
  if((can||a.hold===t.id)&&t.openable)m.push(t.st.open?wA(`Close ${t.en}`,`${t.ja}を閉じる`,async()=>{await wPick(W,a,t);t.st.open=false;W.draw();return {v:'close',a,o:t}}):wA(`Open ${t.en}`,`${t.ja}を開く`,async()=>{await wPick(W,a,t);t.st.open=true;W.draw();return {v:'open',a,o:t}}));
 }
 if(t.k==='person'&&!t.hidden&&!t.swim){
  if(h&&!t.hold&&!h.cap)m.push(wA(`Give ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を渡す`,async()=>{await goNear(W,a,t);faceTo(t,a);a.act='give';W.draw();await wait(450);a.act=null;a.hold=null;placeProp(W,h,t);W.draw();return {v:'give',a,o:h,r:t}}));
  if(h&&h.show&&t.staff)m.push(wA(`Show ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を見せる`,async()=>{await goNear(W,a,t);a.act='give';W.draw();await wait(700);return {v:'show',a,o:h,r:t}}));
  if(h&&h.throw)m.push(wA(`Throw ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を投げる`,async()=>{faceTo(a,t);return throwIt(W,a,h,t)}));
  if(t.staff==='order'&&W.def.order&&!a.staff)for(const oid of W.def.order){const it=W.ents[oid];if(it&&it.hidden&&!it.ordered)m.push(wA(`Order ${it.ind}`,`${it.ja}を注文する`,async()=>{await goNear(W,a,t);faceTo(t,a);W.draw();await wait(500);it.ordered=true;it.hidden=false;placeProp(W,it,W.ents[it.serveAt],'on');W.draw();return {v:'order',a,o:it}}))}
  if(t.staff==='order'&&W.def.payStaff&&!a.staff&&W.def.order&&W.def.order.some(id=>W.ents[id].ordered)&&!a.paid)m.push(wA('Pay','お金を払う',async()=>{await goNear(W,a,t);a.act='give';W.draw();await wait(500);a.act=null;a.paid=true;W.draw();return {v:'pay',a}}));
 }
 if(t.k==='animal'&&h&&h.throw)m.push(wA(`Throw ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を投げる`,async()=>{faceTo(a,t);return throwIt(W,a,h,t)}));
 return m}
function animalCombo(W,a,t){const m=[];
 if(t.k!=='fix')return m;
 if(t.under)m.push(wA(`Go under ${t.en}`,`${t.ja}の下へ行く`,async()=>{await moveTo(W,a,(t.under.x0+t.under.x1)/2,t.under.y,'walk');a.under=t.id;return {v:'go',a,r:t,p:'under',stateFirst:true}}));
 if(t.behind)m.push(wA(`Go behind ${t.en}`,`${t.ja}の後ろへ行く`,async()=>{await moveTo(W,a,t.behind.x,t.behind.y,'run');return {v:'go',a,r:t,p:'behind',stateFirst:true}}));
 if(t.animalOn)m.push(wA(`Jump onto ${t.en}`,`${t.ja}に飛び乗る`,async()=>{const s=t.animalOn;await moveTo(W,a,s.x-40,s.y+30,'walk');a.x=s.x;a.y=s.y;a.on=t.id;a.z=s.depth;W.draw(350);await wait(380);return {v:'jumpon',a,r:t}}));
 if(t.near)m.push(wA(`Run to ${t.en}`,`${t.ja}へ走る`,async()=>{a.z=null;await moveTo(W,a,t.near.x+(a.x<t.near.x?-20:20),t.near.y+6,'run');return {v:'run',a,r:t,state:{v:'go',p:t.near.p||'next to',r:t}}}));
 return m}
async function sitOn(W,a,f){const s=f.seats.find(s=>!s.occ)||f.seats[0];
 await moveTo(W,a,s.x+(s.face===-1?18:-18),s.y+16,'walk');seatPerson(a,f,s);W.draw();await wait(250)}
async function lieOn(W,a,f){const s=f.seats.find(s=>!s.occ)||f.seats[0];await moveTo(W,a,s.x,s.y+20,'walk');seatPerson(a,f,s);a.seat=null;a.lie={f:f.id,h:f.lieH||56,s};s.occ=a.id;a.x=f.lieAt.x;a.y=f.lieAt.y;a.standAt={x:f.lieAt.x+60,y:f.lieAt.y+30};if(a.hold)await dropHeld(W,a);W.draw();await wait(250)}
async function putOn(W,a,h,t,p){
 if(t.k==='fix'){const tx=p==='on'&&t.surf?Math.max(t.surf.x0+20,Math.min(t.surf.x1-20,a.x)):t.x;
  const sp=t.near&&p!=='on'?t.near:clampFloor(W,{x:tx+(a.x<tx?-34:34),y:(t.surf?t.surf.front??t.y:t.y)+14});
  if(!(a.seat&&t.surf&&Math.abs(a.x-t.x)<(FIXSZ[t.art]||[160])[0]/2+40))await moveTo(W,a,sp.x,sp.y,'walk');faceTo(a,t);
  a.act='give';W.draw();await wait(300);a.hold=null;a.act=null;placeProp(W,h,t,p,a.x+(a.flip?-26:26));W.draw()}
 else{await goNear(W,a,t);a.act='give';W.draw();await wait(300);a.hold=null;a.act=null;placeProp(W,h,t,p);W.draw()}
 const back=h.home&&h.home===t.id;const bring=(a.staff==='serve'||a.staff==='order')&&p==='on'&&t.k==='fix'&&t.art==='table';
 return bring?{v:'bring',a,o:h,r:t}:{v:'put',a,o:h,r:t,p,back}}
async function goNearOrRemote(W,a,t){const rm=a.hold&&W.ents[a.hold].art==='remote';if(rm){faceTo(a,t);a.act=a.seat?null:'hold';W.draw();await wait(300)}else{await goNear(W,a,t);a.act='give';W.draw();await wait(250);a.act=null}}
function onToggle(W,t){if(t.art==='lamp'&&W.def.darkOnLampOff){W.bgst={dark:!t.st.on};W.bgDirty=true}}
const crossOk=W=>{const tl=ents(W).find(f=>f.art==='trafficlight');return !tl||tl.st.green};
// ---- ユーザーが直接さわる(家具・設備) ----
function directMenu(W,t){const m=[];if(t.k!=='fix')return m;
 if(t.toggle==='open')m.push(t.st.open?wA(`Close ${t.en}`,`${t.ja}を閉める`,async()=>{t.st.open=false;W.draw();return {v:'close',a:USER,o:t}}):wA(`Open ${t.en}`,`${t.ja}を開ける`,async()=>{t.st.open=true;W.draw();return {v:'open',a:USER,o:t}}));
 if(t.toggle==='on')m.push(t.st.on?wA(`Turn off ${t.en}`,`${t.ja}を消す`,async()=>{t.st.on=false;onToggle(W,t);W.draw();return {v:'turnoff',a:USER,o:t}}):wA(`Turn on ${t.en}`,`${t.ja}をつける`,async()=>{t.st.on=true;onToggle(W,t);W.draw();return {v:'turnon',a:USER,o:t}}));
 if(t.art==='trafficlight')m.push(wA(`Change the light to ${t.st.green?'red':'green'}`,`信号を${t.st.green?'赤':'青'}にする`,async()=>{t.st.green=!t.st.green;W.draw();const ev={v:'light',a:USER,o:{green:t.st.green}};const car=ents(W).find(c=>c.art==='car');if(car&&car.st.moving&&t.st.green){car.st.moving=false;car.x=car.stopX||car.x;W.draw(500);await wait(520);return [ev,{v:'stopcar',a:USER,o:car}]}return ev}));
 if(t.art==='car'){const tl=ents(W).find(f=>f.art==='trafficlight');const drv=W.ents[t.driver];
  if(!t.st.moving&&!(tl&&tl.st.green))m.push(wA('Drive the car','車を走らせる',async()=>{t.st.moving=true;W.draw();const x1=t.x>500?120:880;t.x=x1;W.draw(1600);await wait(1650);t.st.moving=false;W.draw();return {v:'drive',a:drv||USER,o:t}}))}
 if(t.art==='train')m.push(t.st.leaving||!t.st.here?wA('Make the train arrive','電車を到着させる',async()=>{t.hidden=false;t.st.leaving=false;t.st.here=true;t.x=t.x0;W.draw();t.st.open=true;W.draw();return {v:'arrive',a:USER,o:t}})
  :wA('Make the train leave','電車を出発させる',async()=>{t.st.open=false;W.draw();await wait(300);t.st.leaving=true;W.draw();t.x=t.x0+1200;W.draw(1600);await wait(1600);t.st.here=false;
   ents(W).filter(p=>p.inside===t.id).forEach(p=>{p.inside=null;p.gone=true});return {v:'depart',a:USER,o:t}}));
 if(t.art==='deskphone'&&!t.st.ring&&!t.st.up)m.push(wA('Make the phone ring','電話を鳴らす',async()=>{t.st.ring=true;W.draw();return null}));
 return m}

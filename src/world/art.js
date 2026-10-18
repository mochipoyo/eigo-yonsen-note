// ===== ワールド: キャラクター描画(人物・動物・小物のSVG) =====
// すべてオリジナルのベクター画。原点 (0,0) は足元(床に接する点)、+x が向いている方向。
const OL='#3b2b2a';// 線の色
const ow=`stroke="${OL}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
function shade(hex,amt){// 色を明るく/暗く(アニメ塗りの影用)
 const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;
 const f=v=>Math.max(0,Math.min(255,Math.round(amt<0?v*(1+amt):v+(255-v)*amt)));
 return '#'+((1<<24)+(f(r)<<16)+(f(g)<<8)+f(b)).toString(16).slice(1)}

// ---------------- 人物 ----------------
// look: {skin, hair, hs(髪型), top, bottom, kind('tee'|'suit'|'apron'|'uniform'|'dress'|'school'|'hoodie'), skirt, k(大きさ), cap, glasses, eye}
// ARM: 肩からの (肘, 手) の相対座標。+x が前。
const ARM={down:[[3,22],[4,42]],hold:[[10,20],[24,18]],read:[[8,22],[20,12]],drink:[[14,10],[-10,-20]],raise:[[4,-22],[6,-46]],
 write:[[14,-10],[30,-26]],type:[[8,24],[24,24]],phone:[[12,10],[2,-34]],back:[[-10,-18],[-20,-40]],give:[[14,8],[34,0]],wave:[[14,-16],[20,-40]],
 swim:[[18,-10],[38,-14]],ride:[[14,8],[18,28]],eat:[[14,10],[-8,-18]],cheer:[[-6,-22],[-8,-46]]};
const POSE={// 体の各部の指定: legs, armF(前の腕), armB(後ろの腕), h(腰の高さ)
 stand:{legs:'stand',armF:'down',armB:'down'},walk:{legs:'walk',armF:'down',armB:'down',walk:1},run:{legs:'walk',armF:'hold',armB:'down',walk:2},
 hold:{legs:'stand',armF:'hold',armB:'down'},read:{legs:'stand',armF:'read',armB:'read'},drink:{legs:'stand',armF:'drink',armB:'down'},
 eat:{legs:'stand',armF:'eat',armB:'down'},raise:{legs:'stand',armF:'raise',armB:'down'},wave:{legs:'stand',armF:'wave',armB:'down',wave:1},
 write:{legs:'stand',armF:'write',armB:'down'},phone:{legs:'stand',armF:'phone',armB:'down'},give:{legs:'stand',armF:'give',armB:'down'},
 throw:{legs:'stand',armF:'back',armB:'down'},cheer:{legs:'stand',armF:'cheer',armB:'cheer'},jump:{legs:'stand',armF:'cheer',armB:'cheer',jump:1},
 sit:{legs:'sit',armF:'down',armB:'down'},sitread:{legs:'sit',armF:'read',armB:'read'},sitdrink:{legs:'sit',armF:'drink',armB:'down'},sithold:{legs:'sit',armF:'hold',armB:'down'},
 siteat:{legs:'sit',armF:'eat',armB:'down'},sittype:{legs:'sit',armF:'type',armB:'type'},sitraise:{legs:'sit',armF:'raise',armB:'down'},sitwrite:{legs:'sit',armF:'type',armB:'down'},
 sitphone:{legs:'sit',armF:'phone',armB:'down'},ride:{legs:'ride',armF:'ride',armB:'ride'},swim:{legs:'none',armF:'swim',armB:'down',swim:1},lie:{legs:'stand',armF:'down',armB:'down',lie:1}};
const SH=17,HIP=48;// 肩の横位置・腰の高さ(立ち)
function handPos(pose,h){// 前の手の位置(足元基準・右向き)
 const P=POSE[pose]||POSE.stand;const dy=P.legs==='sit'?HIP-(h??40):P.legs==='ride'?-6:P.swim?40:0;const a=ARM[P.armF][1];return [SH+a[0],-96+dy+a[1]]}
function armSvg(x0,y0,spec,col,skin,sleeve){const [e,h]=ARM[spec];
 const ex=x0+e[0],ey=y0+e[1],hx=x0+h[0],hy=y0+h[1];
 return `<path d="M${x0} ${y0}L${ex} ${ey}L${hx} ${hy}" fill="none" stroke="${OL}" stroke-width="12.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M${x0} ${y0}L${ex} ${ey}" fill="none" stroke="${col}" stroke-width="8.5" stroke-linecap="round"/>
 <path d="M${ex} ${ey}L${hx} ${hy}" fill="none" stroke="${sleeve?col:skin}" stroke-width="8.5" stroke-linecap="round"/>
 <circle cx="${hx}" cy="${hy}" r="5.4" fill="${skin}" ${ow}/>`}
function face(look,expr,dy){const cy=-138+dy,x=3;// 少し右(前)を向いた顔
 const ir=look.eye||'#4a3326';
 const eyes=expr==='happy'?`<path d="M${x-15} ${cy+2}q5 -7 10 0M${x+5} ${cy+2}q5 -7 10 0" fill="none" stroke="${OL}" stroke-width="2.6" stroke-linecap="round"/>`
  :expr==='sleep'?`<path d="M${x-15} ${cy+1}q5 5 10 0M${x+5} ${cy+1}q5 5 10 0" fill="none" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/>`
  :[-10,10].map(o=>`<ellipse cx="${x+o}" cy="${cy}" rx="5.6" ry="7.4" fill="#fff" stroke="${OL}" stroke-width="1.6"/><ellipse cx="${x+o+1}" cy="${cy+1}" rx="${expr==='surprised'?2.6:4}" ry="${expr==='surprised'?3.2:5.6}" fill="${ir}"/><ellipse cx="${x+o+1}" cy="${cy+2.5}" rx="2.2" ry="2.6" fill="${shade(ir,-.4)}"/><circle cx="${x+o+2.4}" cy="${cy-2.2}" r="1.7" fill="#fff"/>`).join('');
 const bc=shade(look.hair,-.3);
 const brow=expr==='sorry'?`<path d="M${x-15} ${cy-9}q5 -1 9 -5M${x+6} ${cy-14}q5 4 9 5" fill="none" stroke="${bc}" stroke-width="2" stroke-linecap="round"/>`
  :expr==='angry'?`<path d="M${x-15} ${cy-14}q5 1 9 4M${x+6} ${cy-10}q5 -3 9 -4" fill="none" stroke="${bc}" stroke-width="2.3" stroke-linecap="round"/>`
  :expr==='confused'?`<path d="M${x-15} ${cy-11}q5 -3 9 -1M${x+6} ${cy-16}q5 -3 9 1" fill="none" stroke="${bc}" stroke-width="2" stroke-linecap="round"/>`
  :`<path d="M${x-15} ${cy-11}q5 -3 9 -1M${x+6} ${cy-12}q5 -2 9 1" fill="none" stroke="${bc}" stroke-width="2" stroke-linecap="round"/>`;
 const mouth=expr==='happy'?`<path d="M${x-5} ${cy+14}q5 7 10 0z" fill="#c4544f" stroke="${OL}" stroke-width="1.6"/>`
  :expr==='surprised'?`<ellipse cx="${x}" cy="${cy+16}" rx="3.2" ry="4" fill="#c4544f" stroke="${OL}" stroke-width="1.5"/>`
  :expr==='sleep'?`<path d="M${x-3} ${cy+15}q3 2 6 0" fill="none" stroke="${OL}" stroke-width="1.8"/>`
  :expr==='sorry'||expr==='angry'?`<path d="M${x-4} ${cy+16}q4 -4 8 0" fill="none" stroke="${OL}" stroke-width="1.8" stroke-linecap="round"/>`
  :expr==='confused'?`<path d="M${x-5} ${cy+15}q2.5 -3 5 0t5 0" fill="none" stroke="${OL}" stroke-width="1.8" stroke-linecap="round"/>`
  :`<path d="M${x-4} ${cy+14}q4 4 8 0" fill="none" stroke="${OL}" stroke-width="1.8" stroke-linecap="round"/>`;
 // 話している間は口が開いたり閉じたりする(.talking のときだけ CSS で切りかえる)
 const mouthO=expr==='sleep'?'':`<g class="m-o" opacity="0"><path d="M${x-5} ${cy+13}q5 -2 10 0q-1 8-5 8q-4 0-5-8z" fill="#b8473f" stroke="${OL}" stroke-width="1.5"/></g>`;
 const glasses=look.glasses?`<g fill="none" stroke="#2c2c2c" stroke-width="1.8"><circle cx="${x-10}" cy="${cy}" r="8"/><circle cx="${x+10}" cy="${cy}" r="8"/><path d="M${x-2} ${cy}h4"/></g>`:'';
 const shades=look.shades?`<g><path d="M${x-20} ${cy-6}h40v4l-4 8q-6 3-12 0l-4-6-4 6q-6 3-12 0l-4-8z" fill="#1f2330" stroke="${OL}" stroke-width="1.5"/><path d="M${x-14} ${cy-3}l5 0" stroke="#6b7bb0" stroke-width="2"/></g>`:'';
 return `${look.shades?'':eyes}${look.shades?'':brow}<ellipse cx="${x-17}" cy="${cy+9}" rx="5" ry="3" fill="#f39a9a" opacity=".55"/><ellipse cx="${x+17}" cy="${cy+9}" rx="5" ry="3" fill="#f39a9a" opacity=".55"/><g class="m-c">${mouth}</g>${mouthO}${glasses}${shades}`}
function hairBack(look,dy){const c=look.hair,cy=-138+dy;
 switch(look.hs){
  case 'long':return `<path d="M-34 ${cy-6}q-4 50 6 66h56q10-16 6-66z" fill="${shade(c,-.15)}" ${ow}/>`;
  case 'bob':return `<path d="M-37 ${cy-4}q-3 34 8 42h58q11-8 8-42z" fill="${shade(c,-.15)}" ${ow}/>`;
  case 'pony':return `<path d="M-30 ${cy-16}q-26 10-18 46q8-10 14-28z" fill="${shade(c,-.1)}" ${ow}/>`;
  case 'twin':return `<path d="M-32 ${cy-8}q-22 18-10 46q6-14 12-30zM32 ${cy-8}q22 18 10 46q-6-14-12-30z" fill="${shade(c,-.1)}" ${ow}/>`;
  case 'bun':return `<circle cx="-6" cy="${cy-38}" r="13" fill="${c}" ${ow}/>`;
  default:return ''}}
function hairFront(look,dy){const c=look.hair,cy=-138+dy,hl=shade(c,.25);
 if(look.cap)return `<path d="M-34 ${cy-6}q0-34 34-34q34 0 34 34z" fill="${look.cap}" ${ow}/><path d="M-6 ${cy-8}h46q6 0 0 6h-46z" fill="${shade(look.cap,-.3)}" ${ow}/><circle cx="0" cy="${cy-30}" r="4" fill="#f5c542" ${ow}/><path d="M-34 ${cy-4}q-2 10 2 18M32 ${cy-4}q2 10-2 18" stroke="${c}" stroke-width="6" fill="none"/>`;
 const top=look.hs==='spiky'
  ?`<path d="M-36 ${cy+2}l-2-22l10 6l2-20l12 12l8-18l8 16l12-12l2 20l10-6l-2 24q-6-14-30-16q-24 2-30 16z" fill="${c}" ${ow}/>`
  :look.hs==='bald'?`<path d="M-35 ${cy-2}q4-34 35-34q31 0 35 34q-8-6-10-14q-25-8-50 0q-2 8-10 14z" fill="${c}" ${ow}/>`
  :`<path d="M-36 ${cy+4}q-2-42 36-42q38 0 36 42q-6-4-8-14q-6 8-16 9q4-6 3-12q-10 10-26 11q5-5 5-11q-10 10-22 10q0 4-8 7z" fill="${c}" ${ow}/>`;
 return `${top}<path d="M-18 ${cy-28}q12-8 26-4" fill="none" stroke="${hl}" stroke-width="3" stroke-linecap="round" opacity=".8"/>`}
function torso(look,dy){const y0=-102+dy,y1=-48+dy,c=look.top,b=look.bottom,sk=look.skin;
 let s=`<path d="M-19 ${y0+6}q0-8 8-8h22q8 0 8 8v${y1-y0-6}h-38z" fill="${c}" ${ow}/><path d="M7 ${y0+2}q8 0 8 8v${y1-y0-12}" fill="none" stroke="${shade(c,-.18)}" stroke-width="5" opacity=".6"/>`;
 s+=`<path d="M-6 ${y0-2}l6 7l6-7" fill="${sk}" ${ow}/>`;// 首もと
 if(look.kind==='suit')s+=`<path d="M-6 ${y0-1}l6 9l6-9" fill="#fff" ${ow}/><path d="M0 ${y0+6}l-3 5l3 22l3-22z" fill="${look.tie||'#c0392b'}" ${ow}/><path d="M-19 ${y0+4}l14 18M19 ${y0+4}l-14 18" stroke="${shade(c,-.3)}" stroke-width="2.2" fill="none"/>`;
 if(look.kind==='apron')s+=`<path d="M-12 ${y0+8}h24v${y1-y0+4}h-24z" fill="#fdfdf7" ${ow}/><path d="M-12 ${y0+22}h24" stroke="${look.apron||'#8a5a3c'}" stroke-width="3"/>`;
 if(look.kind==='school')s+=`<path d="M-8 ${y0}l8 12l8-12" fill="#fff" ${ow}/><path d="M-6 ${y0+8}l6 8l6-8" fill="${look.tie||'#2b4c8c'}" ${ow}/>`;
 if(look.kind==='uniform')s+=`<path d="M-19 ${y0+20}h38" stroke="${shade(c,-.35)}" stroke-width="2"/><circle cx="0" cy="${y0+12}" r="2" fill="#f5c542"/><circle cx="0" cy="${y0+30}" r="2" fill="#f5c542"/>`;
 if(look.kind==='hoodie')s+=`<path d="M-14 ${y0+2}q14 12 28 0" fill="none" stroke="${shade(c,-.3)}" stroke-width="2.2"/><path d="M-4 ${y0+8}v10M4 ${y0+8}v10" stroke="#fff" stroke-width="1.8"/>`;
 if(look.skirt||look.kind==='dress')s+=`<path d="M-21 ${y1-6}h42l8 26h-58z" fill="${look.kind==='dress'?c:b}" ${ow}/>`;
 return s}
function legsSvg(look,mode,h){const b=look.skirt||look.kind==='dress'?look.skin:look.bottom,sh=look.shoe||'#5a3d2b';
 const leg=(x,cls)=>`<g class="${cls}"><rect x="${x-5.5}" y="-50" width="11" height="45" rx="5" fill="${b}" ${ow}/><path d="M${x-7} -3q0-8 9-8q9 0 9 6v5h-18z" fill="${sh}" ${ow}/></g>`;
 if(mode==='stand'||mode==='walk')return leg(-6,'lgB')+leg(6,'lgF');
 if(mode==='sit'){const y=-(h??40);const sy=Math.min(-4,y+4);
  if((h??40)<14)return `<path d="M-4 ${y-2}h40v12h-40z" fill="${b}" ${ow}/><path d="M34 ${y-8}q10 0 10 9v6h-10z" fill="${sh}" ${ow}/>`;
  return `<path d="M-8 ${y-6}h36v12h-36z" fill="${look.skirt?look.bottom:b}" ${ow}/><rect x="20" y="${y}" width="11" height="${-y-4}" rx="5" fill="${b}" ${ow}/><path d="M18 -3q0-8 9-8q10 0 10 6v5h-19z" fill="${sh}" ${ow}/>`}
 if(mode==='ride')return `<path d="M-6 -58l18 8l-6 28" fill="none" stroke="${OL}" stroke-width="12.5" stroke-linecap="round"/><path d="M-6 -58l18 8l-6 28" fill="none" stroke="${b}" stroke-width="8.5" stroke-linecap="round"/><path d="M0 -24q0-6 8-6q8 0 8 4v4h-16z" fill="${sh}" ${ow}/>`;
 return ''}
function personSvg(look,pose='stand',expr='normal',o={}){
 const P=POSE[pose]||POSE.stand;const h=o.h??40;
 const dy=P.legs==='sit'?HIP-h:P.legs==='ride'?-6:P.swim?40:0;
 const sleeve=['suit','uniform','school','hoodie'].includes(look.kind)&&!look.shortSleeve;
 const shoulderY=-96+dy;
 let s='';
 if(P.legs==='ride')s+=bikeSvg(look.bike||'#e05a47');
 s+=hairBack(look,dy);
 s+=`<g class="armB">${armSvg(-SH,shoulderY,P.armB,shade(look.top,-.12),look.skin,sleeve)}</g>`;
 if(!P.swim)s+=legsSvg(look,P.legs,h);
 s+=torso(look,dy);
 s+=`<g class="armF${P.wave?' waving':''}" style="transform-origin:${SH}px ${shoulderY}px">${armSvg(SH,shoulderY,P.armF,look.top,look.skin,sleeve)}</g>`;
 // 頭
 const cy=-138+dy;
 s+=`<ellipse cx="2" cy="${cy}" rx="33" ry="32" fill="${look.skin}" ${ow}/><path d="M30 ${cy+2}q4 2 3 7q-2 4-5 2" fill="${look.skin}" ${ow}/>`;
 s+=face(look,expr,dy)+hairFront(look,dy);
 if(P.swim)s+=`<path d="M-50 ${-8}q12-10 25 0t25 0t25 0t25 0v14h-100z" fill="#5fb8e6" opacity=".9" stroke="#2b7fb6" stroke-width="2"/>`;
 let cls='fig'+(P.walk===1?' walking':P.walk===2?' running':'')+(P.jump?' jumping':'')+(P.swim?' swimming':'');
 const k=look.k||1;
 const inner=P.lie?`<g transform="rotate(-90) translate(0 0)">${s}</g>`:s;
 return `<g class="${cls}" transform="scale(${k})" style="--k:${k}">${P.lie||P.swim?'':`<ellipse cx="0" cy="0" rx="${P.legs==='ride'?54:22}" ry="5" fill="#000" opacity=".12"/>`}${inner}</g>`}
function bikeSvg(c){return `<g class="bike"><g class="wheel" style="transform-origin:-34px -20px"><circle cx="-34" cy="-20" r="19" fill="none" stroke="${OL}" stroke-width="4"/><path d="M-34 -39v38M-53 -20h38" stroke="#888" stroke-width="1.2"/></g><g class="wheel" style="transform-origin:34px -20px"><circle cx="34" cy="-20" r="19" fill="none" stroke="${OL}" stroke-width="4"/><path d="M34 -39v38M15 -20h38" stroke="#888" stroke-width="1.2"/></g><path d="M-34 -20l18-30h34l16 30M-16 -50l12 30l22-30M-4 -20l-12-30M26 -66l-8 16" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M-22 -56h16" stroke="${OL}" stroke-width="5" stroke-linecap="round"/><path d="M22 -68h10" stroke="${OL}" stroke-width="4" stroke-linecap="round"/></g>`}

// ---------------- 動物 ----------------
function dogSvg(pose='stand',c='#d9a066'){const d=shade(c,-.25),ear=shade(c,-.35);
 const body=pose==='sit'
  ?`<path d="M-18 -4q-6-34 12-40q22-4 24 20l2 20z" fill="${c}" ${ow}/><path d="M6 -4v-14M14 -4v-12" stroke="${OL}" stroke-width="2"/>`
  :pose==='lie'?`<path d="M-34 -2q-2-22 26-22h26q16 0 16 14v8z" fill="${c}" ${ow}/>`
  :`<path d="M-30 -30q0-14 18-14h28q16 0 16 14v6q0 8-10 8h-42q-10 0-10-14z" fill="${c}" ${ow}/>
   <g class="dl1"><rect x="-26" y="-22" width="9" height="22" rx="4" fill="${d}" ${ow}/></g><g class="dl2"><rect x="-12" y="-22" width="9" height="22" rx="4" fill="${c}" ${ow}/></g>
   <g class="dl1"><rect x="10" y="-22" width="9" height="22" rx="4" fill="${d}" ${ow}/></g><g class="dl2"><rect x="22" y="-22" width="9" height="22" rx="4" fill="${c}" ${ow}/></g>`;
 const hx=pose==='sit'?16:pose==='lie'?20:28,hy=pose==='sit'?-50:pose==='lie'?-28:-48;
 const tail=pose==='lie'?'':`<path class="tail" d="M-28 ${pose==='sit'?-14:-36}q-16-8-12-22" fill="none" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path class="tail" d="M-28 ${pose==='sit'?-14:-36}q-16-8-12-22" fill="none" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/>`;
 const eye=pose==='lie'?`<path d="M${hx+2} ${hy-2}q4 3 8 0" stroke="${OL}" stroke-width="2" fill="none"/>`:`<circle cx="${hx+6}" cy="${hy-3}" r="3.4" fill="${OL}"/><circle cx="${hx+7}" cy="${hy-4.4}" r="1.1" fill="#fff"/>`;
 return `<g class="fig dog ${pose==='run'?'running':pose==='walk'?'walking':''}"><ellipse cx="0" cy="0" rx="34" ry="5" fill="#000" opacity=".12"/>${tail}${body}
  <ellipse cx="${hx}" cy="${hy}" rx="18" ry="16" fill="${c}" ${ow}/><ellipse cx="${hx+15}" cy="${hy+5}" rx="9" ry="7" fill="#f4e4d2" ${ow}/><circle cx="${hx+22}" cy="${hy+2}" r="3.4" fill="${OL}"/>
  ${eye}<path d="M${hx-10} ${hy-12}q-12 2-10 22q8-2 14-12z" fill="${ear}" ${ow}/>${pose==='bark'?'':''}</g>`}
function catSvg(pose='stand',c='#9aa1ab'){const d=shade(c,-.25);
 if(pose==='sleep')return `<g class="fig cat"><ellipse cx="0" cy="0" rx="26" ry="4" fill="#000" opacity=".12"/><path d="M-24 -2q0-24 24-24q24 0 24 18q0 6-6 6z" fill="${c}" ${ow}/><circle cx="16" cy="-14" r="11" fill="${c}" ${ow}/><path d="M9 -22l2-10l7 7M19 -24l6-8l1 10" fill="${c}" ${ow}/><path d="M12 -13q3 2 6 0" stroke="${OL}" stroke-width="1.8" fill="none"/><path d="M-22 -4q-6 6 6 6" fill="none" stroke="${OL}" stroke-width="5" stroke-linecap="round"/></g>`;
 const sit=pose==='sit';
 return `<g class="fig cat ${pose==='walk'?'walking':''}"><ellipse cx="0" cy="0" rx="24" ry="4" fill="#000" opacity=".12"/>
  <path class="tail" d="M-20 ${sit?-8:-24}q-16-6-12-26" fill="none" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M-20 ${sit?-8:-24}q-16-6-12-26" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
  ${sit?`<path d="M-14 -2q-6-26 10-30q16-2 16 18v12z" fill="${c}" ${ow}/>`:`<path d="M-22 -22q0-10 12-10h22q10 0 10 10v4q0 6-8 6h-28q-8 0-8-10z" fill="${c}" ${ow}/><g class="dl1"><rect x="-18" y="-16" width="7" height="16" rx="3" fill="${d}" ${ow}/></g><g class="dl2"><rect x="-8" y="-16" width="7" height="16" rx="3" fill="${c}" ${ow}/></g><g class="dl1"><rect x="8" y="-16" width="7" height="16" rx="3" fill="${d}" ${ow}/></g><g class="dl2"><rect x="16" y="-16" width="7" height="16" rx="3" fill="${c}" ${ow}/></g>`}
  <g transform="translate(${sit?8:22} ${sit?-36:-36})"><circle r="13" fill="${c}" ${ow}/><path d="M-10 -6l-2-13l9 7M4 -9l9-8l-1 13" fill="${c}" ${ow}/><circle cx="-4" cy="-1" r="2.6" fill="#3d6b3a"/><circle cx="6" cy="-1" r="2.6" fill="#3d6b3a"/><path d="M0 4q-2 3-4 1M0 4q2 3 4 1" stroke="${OL}" stroke-width="1.4" fill="none"/></g></g>`}

// ---------------- 小物 ----------------
// それぞれ原点が底の中央。st は状態(open/full など)
const PROP={
 book:(st)=>st.open?`<path d="M-16 -2l16 2l16-2v-18l-16 2l-16-2z" fill="#fffaf0" ${ow}/><path d="M0 0v-18" stroke="${OL}" stroke-width="1.6"/><path d="M-12 -14l9 1M-12 -10l9 1M3 -13l9-1M3 -9l9-1" stroke="#9aa" stroke-width="1.2"/><path d="M-17 -1l17 3l17-3" fill="none" stroke="#c0392b" stroke-width="3"/>`
  :`<rect x="-15" y="-9" width="30" height="9" rx="1.5" fill="#c0392b" ${ow}/><rect x="-13" y="-7" width="26" height="3" fill="#fff6e8"/>`,
 notebook:(st)=>st.open?`<path d="M-16 -2l16 2l16-2v-18l-16 2l-16-2z" fill="#fff" ${ow}/><path d="M0 0v-18" stroke="${OL}" stroke-width="1.6"/><path d="M-12 -13l9 1M3 -12l9-1" stroke="#7aa6d8" stroke-width="1.2"/>`:`<rect x="-14" y="-6" width="28" height="6" rx="1" fill="#4a8ad4" ${ow}/>`,
 menu:(st)=>st.open?`<path d="M-18 -2l18 2l18-2v-24l-18 2l-18-2z" fill="#fff7e6" ${ow}/><path d="M0 0v-24" stroke="${OL}" stroke-width="1.6"/><path d="M-14 -18h10M-14 -13h12M4 -18h10M4 -13h8" stroke="#a0784a" stroke-width="1.6"/>`:`<rect x="-14" y="-5" width="28" height="5" rx="1" fill="#7a3b2e" ${ow}/><text x="0" y="-1" font-size="4" text-anchor="middle" fill="#f5d38a" font-family="sans-serif">MENU</text>`,
 glass:(st)=>`<path d="M-8 -26h16l-2 26h-12z" fill="#e8f6ff" opacity=".9" ${ow}/>${st.full?'<path d="M-7 -17h14l-1.3 16h-11.4z" fill="#7fc7f0" opacity=".85"/>':''}<path d="M-5 -22v14" stroke="#fff" stroke-width="2" opacity=".9"/>`,
 cup:(st)=>`<path d="M-11 -20h22l-3 20h-16z" fill="#fff" ${ow}/><path d="M11 -16q9 0 8 7q-1 5-9 5" fill="none" stroke="${OL}" stroke-width="2.2"/>${st.full?'<ellipse cx="0" cy="-20" rx="10" ry="2.6" fill="#7a4a2a"/>':''}${st.full?'<path class="steam" d="M-3 -26q-4-6 0-12M4 -27q-4-6 0-12" stroke="#bbb" stroke-width="1.6" fill="none"/>':''}`,
 coffee:(st)=>PROP.cup(st),
 bottle:()=>`<path d="M-7 0v-26q0-6 4-8v-6h6v6q4 2 4 8v26z" fill="#bfe6ff" opacity=".9" ${ow}/><rect x="-4" y="-46" width="8" height="5" fill="#2b7fb6" ${ow}/><path d="M-7 -18h14" stroke="#2b7fb6" stroke-width="2"/>`,
 remote:()=>`<rect x="-5" y="-22" width="10" height="22" rx="3" fill="#3a3f4b" ${ow}/><circle cy="-17" r="2" fill="#e74c3c"/><path d="M-2 -11h4M-2 -7h4" stroke="#aab" stroke-width="1.6"/>`,
 apple:()=>`<path d="M0 -18q-12-6-14 6q0 12 14 12q14 0 14-12q-2-12-14-6z" fill="#e0453a" ${ow}/><path d="M0 -18q0-6 3-8" stroke="${OL}" stroke-width="2" fill="none"/><path d="M2 -22q6-6 10-2q-5 4-10 2z" fill="#5aa83a" stroke="${OL}" stroke-width="1.4"/><ellipse cx="-6" cy="-10" rx="2.5" ry="4" fill="#fff" opacity=".45"/>`,
 banana:()=>`<path d="M-16 -14q4 16 30 10q4-2 2-4q-22 4-28-10z" fill="#f6d33c" ${ow}/><path d="M-16 -14l-2-3" stroke="${OL}" stroke-width="2.4"/>`,
 carrot:()=>`<path d="M-4 -4l18-14q4-2 2 2l-14 16z" fill="#f08a2c" ${ow}/><path d="M14 -18l6-6M15 -16l8-2" stroke="#4e9a3a" stroke-width="2.4"/>`,
 tomato:()=>`<circle cy="-11" r="11" fill="#e8463b" ${ow}/><path d="M-5 -21l5 3l5-3l-5-2z" fill="#4e9a3a" stroke="${OL}" stroke-width="1.2"/>`,
 plate:(st)=>`<ellipse cx="0" cy="-4" rx="22" ry="6" fill="#fff" ${ow}/><ellipse cx="0" cy="-5" rx="14" ry="3.4" fill="none" stroke="#c9d6e0" stroke-width="1.4"/>`,
 food:(st)=>`<ellipse cx="0" cy="-4" rx="24" ry="6" fill="#fff" ${ow}/>${st.eaten?'':`<path d="M-14 -7q0-14 14-14q14 0 14 14z" fill="#f2c14e" ${ow}/><path d="M-10 -9q4-4 8 0M2 -12q4-4 8 0" stroke="#c0392b" stroke-width="2.4" fill="none"/><circle cx="-4" cy="-15" r="2.4" fill="#4e9a3a"/>`}`,
 cake:(st)=>`<ellipse cx="0" cy="-3" rx="18" ry="5" fill="#fff" ${ow}/>${st.eaten?'':`<path d="M-11 -6v-14l22-6v14z" fill="#fbe3c0" ${ow}/><path d="M-11 -20l22-6l-6-6l-16 6z" fill="#fff" ${ow}/><circle cx="-2" cy="-28" r="4" fill="#e0453a" ${ow}/>`}`,
 ball:()=>`<circle cy="-11" r="11" fill="#f2f2f2" ${ow}/><path d="M-6 -18l6 4l6-4M-10 -6l6-2l2 6M10 -6l-6-2l-2 6" fill="#3b3b3b" stroke="#3b3b3b" stroke-width="1.6"/>`,
 beachball:()=>`<circle cy="-13" r="13" fill="#fff" ${ow}/><path d="M0 -26q-8 13 0 26z" fill="#e74c3c"/><path d="M0 -26q8 13 0 26z" fill="#3498db"/><path d="M-13 -13q13 4 26 0" stroke="#f1c40f" stroke-width="5" fill="none"/><circle cy="-13" r="13" fill="none" ${ow}/>`,
 pillow:()=>`<path d="M-24 -4q-4-16 2-18q22-4 44 0q6 2 2 18q-24 6-48 0z" fill="#fff" ${ow}/><path d="M-14 -12q14 4 28 0" stroke="#d6dde6" stroke-width="2" fill="none"/>`,
 towel:()=>`<path d="M-50 0l10-12h90l10 12z" fill="#f28b7f" ${ow}/><path d="M-40 -6h82M-44 -2h88" stroke="#fff" stroke-width="2.4"/>`,
 sunglasses:()=>`<path d="M-14 -6h28v3l-3 6q-4 2-7 0l-2-4l-2 4q-4 2-7 0l-3-6z" fill="#1f2330" ${ow}/><path d="M-14 -5l-6-3M14 -5l6-3" stroke="${OL}" stroke-width="2"/>`,
 pen:()=>`<path d="M-12 -2l22-8l3 3l-22 8z" fill="#2b4c8c" ${ow}/><path d="M10 -10l5-2l-2 5z" fill="#ddd"/>`,
 bag:()=>`<path d="M-18 0l2-24h32l2 24z" fill="#8a5a3c" ${ow}/><path d="M-8 -24q0-12 8-12q8 0 8 12" fill="none" stroke="${OL}" stroke-width="3"/><rect x="-6" y="-16" width="12" height="5" rx="1" fill="#e4b35a"/>`,
 schoolbag:()=>`<path d="M-16 0v-28q0-8 8-8h16q8 0 8 8v28z" fill="#2f3e6b" ${ow}/><path d="M-16 -18h32" stroke="#1e2a4a" stroke-width="2"/><rect x="-5" y="-22" width="10" height="6" rx="1" fill="#f5c542"/>`,
 shopbag:(st)=>`<path d="M-16 0l2-28h28l2 28z" fill="#f4f1e8" ${ow}/><path d="M-7 -28q0-9 7-9q7 0 7 9" fill="none" stroke="${OL}" stroke-width="2"/><path d="M-10 -10h20" stroke="#5aa83a" stroke-width="3"/>`,
 basket:()=>`<path d="M-24 -26h48l-5 26h-38z" fill="#e8b04a" ${ow}/><path d="M-20 -18h40M-20 -10h40M-12 -26v26M0 -26v26M12 -26v26" stroke="#b07a22" stroke-width="1.6"/><path d="M-18 -26q18-22 36 0" fill="none" stroke="${OL}" stroke-width="3.5"/>`,
 ticket:()=>`<rect x="-12" y="-8" width="24" height="8" rx="1.5" fill="#fff3c4" ${ow}/><path d="M-6 -4h12" stroke="#c0392b" stroke-width="1.6"/>`,
 docs:()=>`<rect x="-14" y="-6" width="26" height="6" fill="#fff" ${ow}/><rect x="-12" y="-9" width="26" height="4" fill="#f4f6fb" ${ow}/><path d="M-8 -3h14" stroke="#9aa" stroke-width="1.2"/>`,
 phone:()=>`<rect x="-6" y="-20" width="12" height="20" rx="3" fill="#2d3340" ${ow}/><rect x="-4" y="-17" width="8" height="13" fill="#7fc7f0"/>`,
 flowerpot:()=>`<path d="M-10 0l-3-14h26l-3 14z" fill="#c8693f" ${ow}/><circle cx="-6" cy="-22" r="5" fill="#f28bb0" ${ow}/><circle cx="6" cy="-24" r="5" fill="#f5c542" ${ow}/><path d="M-6 -17v4M6 -19v6" stroke="#4e9a3a" stroke-width="2"/>`,
 latte:(st)=>`<path d="M-9 -34h18l-2.5 34h-13z" fill="#fff" opacity=".95" ${ow}/><path d="M-8.2 -22h16.4l-1.6 21h-13.2z" fill="#a8703f"/><path d="M-8.6 -28h17.2l-.4 6h-16.4z" fill="#f2e2c6"/><path d="M-6 -31q6-4 12 0" stroke="#fff" stroke-width="2" fill="none"/>${st.cold?'':'<path class="steam" d="M-2 -38q-3-5 0-9M4 -38q-3-5 0-9" stroke="#c9d3e6" stroke-width="1.8" fill="none"/>'}`,
 cappu:(st)=>`<ellipse cx="0" cy="-1" rx="17" ry="3.5" fill="#fff" ${ow}/><path d="M-12 -20h24l-3 18h-18z" fill="#fff" ${ow}/><path d="M12 -16q8 0 7 6q-1 4-8 4" fill="none" stroke="${OL}" stroke-width="2"/><path d="M-12 -20q12-11 24 0z" fill="#fbf1e2" ${ow}/><circle cx="-3" cy="-24" r="1.4" fill="#8a5a3c"/><circle cx="3" cy="-25" r="1.4" fill="#8a5a3c"/><circle cx="0" cy="-22" r="1.2" fill="#8a5a3c"/>`,
 tea:(st)=>`<path d="M-11 -18h22l-3 18h-16z" fill="#fff" ${ow}/><path d="M11 -14q8 0 7 6q-1 4-8 4" fill="none" stroke="${OL}" stroke-width="2"/><ellipse cx="0" cy="-18" rx="10" ry="2.4" fill="#c46a2c"/><path d="M4 -18q2 10 10 14" stroke="#ddd" stroke-width="1.2" fill="none"/><rect x="11" y="-6" width="7" height="8" rx="1" fill="#6ab04c" ${ow}/>${st.cold?'':'<path class="steam" d="M-3 -22q-3-5 0-9" stroke="#c9d3e6" stroke-width="1.8" fill="none"/>'}`,
 card:()=>`<rect x="-14" y="-10" width="28" height="18" rx="3" fill="#3d6fd0" ${ow}/><rect x="-14" y="-6" width="28" height="4" fill="#24356b"/><rect x="-10" y="1" width="8" height="4" rx="1" fill="#f5c542"/>`,
 cash:()=>`<rect x="-14" y="-8" width="28" height="12" rx="1.5" fill="#9bd18c" ${ow}/><circle cx="0" cy="-2" r="3.5" fill="none" stroke="#4e8a3e" stroke-width="1.5"/>`,
 money:()=>`<rect x="-12" y="-6" width="24" height="6" rx="1" fill="#9bd18c" ${ow}/>`,
};
function propSvg(type,st={}){const f=PROP[type];return `<g class="pr">${f?f(st):''}</g>`}

// ===== ワールド: シーンの登録。シーンのデータは world/scenes/<id>.js に1つずつあり、開いたときだけ読み込む =====
// 一覧に必要な情報(名前・ミッション数など)はビルド時に作る WMAN(index.html 側)にある。
const WSC={defs:{},add(def){this.defs[def.id]=def;if(typeof WORLD!=='undefined')WORLD.scenes[def.id]=true}};
const sceneById=id=>WSC.defs[id]||null;

// ===== ワールド: 登場人物の見た目と、シーン定義で使う共通の書き方 =====
// 座標は 1000x600。人物の y は足元。家具の y は床に接する位置。surf=天板 / under=下 / inside=中 / near=横に立つ位置 / behind=後ろ
// missions[].t は動作確認用の手順(誰が・何を・どの動作)。['drag',物,行き先] / ['direct',設備,動作] / [人,相手|'self',動作]
const LK={// 登場人物の見た目
 man:{skin:'#ffe0c7',hair:'#3a2a24',hs:'short',top:'#4a7fc1',bottom:'#3d4a5c',kind:'tee'},
 woman:{skin:'#ffe3cf',hair:'#8a4b2a',hs:'long',top:'#e7768f',bottom:'#5b6b8a',kind:'tee',skirt:true},
 boy:{skin:'#ffe0c7',hair:'#2b2b33',hs:'spiky',top:'#f2b33d',bottom:'#3f6fb0',kind:'tee',k:.78},
 girl:{skin:'#fde2cf',hair:'#5a3a2a',hs:'twin',top:'#8fd1a8',bottom:'#e98a9a',kind:'dress',k:.78},
 mother:{skin:'#ffe3cf',hair:'#3a2a24',hs:'bun',top:'#c97b6b',bottom:'#5a4a3a',kind:'apron',apron:'#c97b6b'},
 father:{skin:'#f6d3b8',hair:'#4a3a30',hs:'short',top:'#6a8f5a',bottom:'#4a4f5c',kind:'tee',glasses:true},
 barista:{skin:'#ffe0c7',hair:'#6b3f2a',hs:'pony',top:'#3d3a44',bottom:'#2b2f38',kind:'apron',apron:'#6b4a32'},
 teacher:{skin:'#ffe3cf',hair:'#3a2a24',hs:'bob',top:'#5a6b8c',bottom:'#3b4256',kind:'suit',glasses:true,tie:'#e7768f'},
 ken:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#2f3e6b',bottom:'#2f3e6b',kind:'school',k:.85},
 mia:{skin:'#fde2cf',hair:'#5a3a2a',hs:'pony',top:'#2f3e6b',bottom:'#3f5a8c',kind:'school',skirt:true,tie:'#c0392b',k:.85},
 sora:{skin:'#f6d3b8',hair:'#4a3020',hs:'spiky',top:'#2f3e6b',bottom:'#2f3e6b',kind:'school',k:.85},
 clerk:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#5aa83a',bottom:'#3d4a5c',kind:'apron',apron:'#5aa83a'},
 staff:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#2b4c8c',bottom:'#2b3550',kind:'uniform',cap:'#2b4c8c'},
 boss:{skin:'#f6d3b8',hair:'#666',hs:'short',top:'#3b4256',bottom:'#3b4256',kind:'suit',glasses:true},
 emma:{skin:'#ffe3cf',hair:'#c9853a',hs:'bob',top:'#5a6b8c',bottom:'#3b4256',kind:'suit',skirt:true,tie:'#f5c542'},
 ryo:{skin:'#ffe0c7',hair:'#2b2b33',hs:'spiky',top:'#e9eef5',bottom:'#4a4f5c',kind:'suit',tie:'#2a63c4'},
 waiter:{skin:'#ffe0c7',hair:'#3a2a24',hs:'short',top:'#f6f6f2',bottom:'#2b2b33',kind:'suit',tie:'#2b2b33'},
 swimman:{skin:'#f6d3b8',hair:'#3a2a24',hs:'short',top:'#f28b7f',bottom:'#3a8fd0',kind:'tee',shortSleeve:true},
 swimwoman:{skin:'#ffe3cf',hair:'#8a4b2a',hs:'pony',top:'#f5c542',bottom:'#f5c542',kind:'dress'},
 guest:{skin:'#f3cfb3',hair:'#2f2f3a',hs:'bob',top:'#3aa0db',bottom:'#4a4f5c',kind:'hoodie'},
 recep:{skin:'#ffe3cf',hair:'#2b2b33',hs:'bun',top:'#7a2638',bottom:'#2b2b33',kind:'suit',skirt:true,tie:'#f5c542'},
 traveler:{skin:'#ffe0c7',hair:'#4a3020',hs:'short',top:'#e98a4a',bottom:'#3d4a5c',kind:'hoodie'},
 traveler2:{skin:'#fde2cf',hair:'#2b2b33',hs:'long',top:'#5aa8a0',bottom:'#3d4a5c',kind:'tee',skirt:true},
 agent:{skin:'#f6d3b8',hair:'#3a2a24',hs:'bob',top:'#2a63c4',bottom:'#2b3550',kind:'uniform',skirt:true},
 gstaff:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#2a63c4',bottom:'#2b3550',kind:'uniform'},
 doctor:{skin:'#f6d3b8',hair:'#3a2a24',hs:'short',top:'#fbfcff',top2:'#7fa6d8',bottom:'#4a4f5c',kind:'coat',glasses:true},
 nurse:{skin:'#ffe3cf',hair:'#5a3a2a',hs:'bun',top:'#f2a7b8',bottom:'#f2a7b8',kind:'uniform'},
 pharm:{skin:'#ffe0c7',hair:'#2b2b33',hs:'bob',top:'#fbfcff',top2:'#8fd1a8',bottom:'#3d4a5c',kind:'coat',skirt:true},
 librarian:{skin:'#fde2cf',hair:'#8a6a4a',hs:'bun',top:'#6a8f5a',bottom:'#4a3a30',kind:'tee',skirt:true,glasses:true},
 clerk2:{skin:'#f6d3b8',hair:'#3a2a24',hs:'short',top:'#d9473b',bottom:'#2b3550',kind:'uniform'},
 officer:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#3d4a5c',bottom:'#2b3550',kind:'uniform',cap:'#2b3550'},
 fa:{skin:'#ffe3cf',hair:'#2b2b33',hs:'bun',top:'#2a63c4',bottom:'#2a63c4',kind:'suit',skirt:true,tie:'#f5c542'},
 guide:{skin:'#ffe0c7',hair:'#c9853a',hs:'pony',top:'#f2b33d',bottom:'#3d4a5c',kind:'tee'},
 banker:{skin:'#f6d3b8',hair:'#2b2b33',hs:'short',top:'#3b4256',bottom:'#3b4256',kind:'suit',tie:'#7a2638'},
 stylist:{skin:'#ffe3cf',hair:'#8e44ad',hs:'bob',top:'#2b2b33',bottom:'#2b2b33',kind:'apron',apron:'#2b2b33'},
 trainer:{skin:'#e8b894',hair:'#2b2b33',hs:'spiky',top:'#2ecc71',bottom:'#2b2f38',kind:'tee',shortSleeve:true},
 host:{skin:'#ffe3cf',hair:'#a0673b',hs:'long',top:'#8fd1a8',bottom:'#5a4a3a',kind:'tee',skirt:true},
 friend:{skin:'#e8b894',hair:'#2b2b33',hs:'short',top:'#e7768f',bottom:'#3d4a5c',kind:'hoodie'},
 student:{skin:'#ffe0c7',hair:'#c9853a',hs:'short',top:'#3aa0db',bottom:'#3d4a5c',kind:'tee'},
 client:{skin:'#f3cfb3',hair:'#666',hs:'bald',top:'#4a4f5c',bottom:'#4a4f5c',kind:'suit',tie:'#2a63c4'},
 colleague:{skin:'#fde2cf',hair:'#3a2a24',hs:'long',top:'#c97b6b',bottom:'#3b4256',kind:'suit',skirt:true,tie:'#fff'},
 cyclist:{skin:'#ffe0c7',hair:'#3a2a24',hs:'short',top:'#3aa0db',bottom:'#2b2f38',kind:'hoodie',bike:'#3a8a5a'},
};
const P=(id,en,ja,pron,look,x,y,o={})=>({id,k:'person',en,ja,pron,look,x,y,...o});
// ---- 会話ミッションを書くための部品 ----
const I=(id,units,model,o={})=>({id,units,model,...o});// 意図: 意味のかたまり・模範の言い方
const SAY=(npc,say,ja,o={})=>({npc,say,ja,...o});
const DO=(...ops)=>({do:ops});
// よく使う「意味のかたまり」(言い方の候補)。照合のときに短縮形はそろえる(don't → do not)
const U={
 req:['please','could i','can i','may i','i would like','i will have','could you','can you','would you','could we','can we','i will get','let me get','i will take'],
 could:['could you','can you','would you','will you','could i','can i','may i'],
 sorry:['afraid','sorry','unfortunately','apolog*'],
 outof:['out of','sold out','run out','ran out','no more','do not have any','do not have','dont have','not available','none left','finished'],
 propose:['how about','what about','would you like','can i suggest','could i suggest','why not','maybe','instead','i recommend','we have','we do have','try'],
 yes:['yes','yeah','yep','sure','of course','certainly','no problem','ok','okay','absolutely','go ahead','right','fine'],
 no:['no','nope','not really'],
 notatall:['not at all','no problem','of course not','go ahead','i do not mind','dont mind','no not at all','sure','no','no worries','that is fine','thats fine','fine','okay'],
 thanks:['thank you','thanks','appreciate','cheers'],
 bye:['have a nice day','have a good day','have a great day','enjoy','see you','take care','come again','bye','goodbye','have a good one','have a nice','have a good'],
 hello:['hello','hi','good morning','good afternoon','good evening','hey','welcome'],
 problem:['problem with','problem','something wrong','wrong with','issue','does not work','is not working','not working','broken','doesnt work','isnt working'],
 mean:['what i mean','i mean','i meant','i said','what i said','i ordered','i wanted','i asked for','actually'],
 doyoumean:['do you mean','you mean','did you say','you said','so you mean','is that'],
 reason:['the reason','because','since','that is why','thats why','due to'],
 think:['i think','i believe','in my opinion','i feel','maybe we should','we should','i suggest','how about'],
};

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
 if(look.kind==='coat')s+=`<path d="M-21 ${y0+4}q0-8 8-8h26q8 0 8 8v${y1-y0+6}h-42z" fill="#fbfcff" ${ow}/><path d="M-6 ${y0-1}l6 12l6-12" fill="${look.top2||'#7fa6d8'}" ${ow}/><path d="M-4 ${y0+2}l-6 18M4 ${y0+2}l6 18" stroke="#c3ccd8" stroke-width="2" fill="none"/><rect x="6" y="${y0+18}" width="9" height="6" fill="#e9eef5" stroke="#c3ccd8" stroke-width="1.2"/>`;
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
 const sleeve=['suit','uniform','school','hoodie','coat'].includes(look.kind)&&!look.shortSleeve;
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
 pizza:(st)=>`<ellipse cx="0" cy="-4" rx="24" ry="6" fill="#fff" ${ow}/>${st.eaten?'':`<path d="M-17 -7l17-11l17 11q-17 5-34 0z" fill="#f2c14e" ${ow}/><circle cx="-6" cy="-9" r="2.6" fill="#c0392b"/><circle cx="5" cy="-11" r="2.6" fill="#c0392b"/><circle cx="2" cy="-7" r="2.2" fill="#5aa83a"/>`}`,
 salad:(st)=>`<ellipse cx="0" cy="-4" rx="22" ry="6" fill="#fff" ${ow}/>${st.eaten?'':`<path d="M-15 -6q0-12 15-12q15 0 15 12z" fill="#7cc35a" ${ow}/><circle cx="-5" cy="-11" r="3" fill="#e8463b"/><circle cx="6" cy="-10" r="3" fill="#f5c542"/><path d="M-10 -8q4-4 8 0" stroke="#4e9a3a" stroke-width="2" fill="none"/>`}`,
 eggs:(st)=>`<path d="M-22 -2l2-12h40l2 12z" fill="#d9c7a3" ${ow}/>${[-14,-4,6,16].map((x,i)=>`<ellipse cx="${x}" cy="-15" rx="5" ry="6" fill="${st.broken&&i===1?'#fff7e0':'#fbf3e3'}" stroke="${OL}" stroke-width="1.4"/>${st.broken&&i===1?`<path d="M${x-5} -15l3-3l2 3l3-3l2 3" stroke="${OL}" stroke-width="1.4" fill="none"/><ellipse cx="${x}" cy="-9" rx="5" ry="2" fill="#f5c542"/>`:''}`).join('')}`,
 receipt:()=>`<path d="M-8 -22h16v22l-3-2l-2.5 2l-2.5-2l-2.5 2l-2.5-2l-3 2z" fill="#fff" ${ow}/><path d="M-5 -17h10M-5 -12h8M-5 -7h10" stroke="#9aa" stroke-width="1.3"/>`,
 keycard:()=>`<rect x="-12" y="-9" width="24" height="16" rx="2.5" fill="#f5c542" ${ow}/><rect x="-8" y="-5" width="10" height="3" fill="#8a6a1a"/><circle cx="7" cy="2" r="2.4" fill="#fff"/>`,
 passport:()=>`<rect x="-10" y="-15" width="20" height="15" rx="2" fill="#7a2638" ${ow}/><circle cx="0" cy="-8" r="3.8" fill="none" stroke="#f5c542" stroke-width="1.4"/><path d="M-5 -3h10" stroke="#f5c542" stroke-width="1.2"/>`,
 bpass:()=>`<rect x="-16" y="-10" width="32" height="13" rx="2" fill="#fff" ${ow}/><rect x="-16" y="-10" width="32" height="4" fill="#2a63c4"/><path d="M6 -6v9" stroke="${OL}" stroke-width="1" stroke-dasharray="2 1.5"/><path d="M-12 -2h14M-12 1h10" stroke="#9aa" stroke-width="1.2"/>`,
 suitcase:(st)=>`<rect x="-20" y="-50" width="40" height="46" rx="6" fill="#2e8f8a" ${ow}/><path d="M-20 -36h40M-20 -20h40" stroke="#22706c" stroke-width="2"/><path d="M-7 -50v-10h14v10" fill="none" stroke="${OL}" stroke-width="3"/><circle cx="-12" cy="-2" r="3.5" fill="${OL}"/><circle cx="12" cy="-2" r="3.5" fill="${OL}"/>${st.light?'':'<rect x="-10" y="-30" width="20" height="5" rx="1" fill="#f5c542" opacity=".8"/>'}`,
 memo:(st)=>`<rect x="-12" y="-16" width="24" height="16" rx="1.5" fill="#fff6a8" ${ow}/>${st.text?`<path d="M-8 -11h16M-8 -6h12" stroke="#2a63c4" stroke-width="1.6"/>`:'<path d="M-8 -11h16M-8 -6h16" stroke="#e8dc8a" stroke-width="1.2"/>'}`,
 bell:()=>`<path d="M-10 0h20" stroke="${OL}" stroke-width="3"/><path d="M-8 -2q0-12 8-12q8 0 8 12z" fill="#f2c14e" ${ow}/><circle cy="-16" r="2.4" fill="#f2c14e" ${ow}/>`,
 fan:()=>`<rect x="-3" y="-20" width="6" height="18" fill="#cfd6e2" ${ow}/><ellipse cx="0" cy="0" rx="12" ry="3" fill="#cfd6e2" ${ow}/><circle cy="-30" r="13" fill="#fff" ${ow}/><path d="M0 -30l-8-6M0 -30l8-6M0 -30l0 9" stroke="#7fa6d8" stroke-width="3"/>`,
 jacket:()=>`<path d="M-14 0v-22l6-6h16l6 6v22z" fill="#c0392b" ${ow}/><path d="M0 -28v28" stroke="${OL}" stroke-width="1.5"/>`,
 shoes:(st)=>`<path d="M-22 0q0-10 8-12l12-2q4 6 14 6q8 0 8 8z" fill="${st.c||'#5a3d2b'}" ${ow}/><path d="M-2 0q0-10 8-12l12-2q4 6 14 6q8 0 8 8z" fill="${st.c||'#5a3d2b'}" opacity=".85" ${ow}/>`,
 slippers:(st)=>`<ellipse cx="-10" cy="-4" rx="12" ry="5" fill="#8fd1a8" ${ow}/><ellipse cx="12" cy="-4" rx="12" ry="5" fill="#8fd1a8" ${ow}/><path d="M-14 -6q4-6 10 0M8 -6q4-6 10 0" stroke="#fff" stroke-width="3" fill="none"/>`,
 gift:(st)=>`<rect x="-16" y="-26" width="32" height="26" fill="#e74c3c" ${ow}/><path d="M0 -26v26M-16 -14h32" stroke="#f5c542" stroke-width="4"/><path d="M0 -26q-12-12-12-2q4 4 12 2q12 2 12-2q0-10-12 2" fill="#f5c542" ${ow}/>`,
 umbrella:(st)=>st.open?`<path d="M-30 -40q30-30 60 0z" fill="#2a63c4" ${ow}/><path d="M0 -40v40q0 4-6 4" stroke="${OL}" stroke-width="2.5" fill="none"/>`:`<path d="M-3 -44l6 0l3 38q0 6-6 6z" fill="#2a63c4" ${ow}/><path d="M0 -6q0 6-6 6" stroke="${OL}" stroke-width="2.5" fill="none"/>`,
 toothbrush:(st)=>`<rect x="-14" y="-6" width="28" height="5" rx="2" fill="#3498db" ${ow}/><rect x="8" y="-11" width="8" height="5" fill="#fff" ${ow}/>`,
 medicine:(st)=>`<rect x="-14" y="-22" width="28" height="22" rx="2" fill="#fff" ${ow}/><rect x="-14" y="-22" width="28" height="7" fill="${st.c||'#1f8455'}"/><path d="M-4 -9h8M0 -13v8" stroke="#e74c3c" stroke-width="2.4"/>`,
 paper:(st)=>`<rect x="-11" y="-26" width="22" height="26" fill="#fff" ${ow}/><path d="M-7 -20h14M-7 -15h14M-7 -10h10" stroke="#9aa" stroke-width="1.3"/>${st.signed?'<path d="M-6 -4q4-4 8 0t6 0" stroke="#2a63c4" stroke-width="1.6" fill="none"/>':''}`,
 box:(st)=>`<rect x="-${st.big?26:18}" y="-${st.big?40:26}" width="${st.big?52:36}" height="${st.big?40:26}" fill="#c9965a" ${ow}/><path d="M0 -${st.big?40:26}v${st.big?40:26}" stroke="#a0754e" stroke-width="3"/>${st.label?`<rect x="-10" y="-${st.big?30:20}" width="20" height="10" fill="#fff"/>`:''}`,
 letter:(st)=>`<rect x="-16" y="-14" width="32" height="14" fill="#fffaf0" ${ow}/><path d="M-16 -14l16 9l16-9" stroke="${OL}" stroke-width="1.6" fill="none"/>${st.stamp?'<rect x="8" y="-12" width="6" height="7" fill="#e74c3c"/>':''}`,
 tray:(st)=>`<path d="M-28 -2h56l-4 -6h-48z" fill="#9aa3b5" ${ow}/>`,
 laptop:(st)=>`<path d="M-20 0h40l4 -4h-48z" fill="#9aa3b5" ${ow}/><rect x="-17" y="-26" width="34" height="22" rx="2" fill="#3c4250" ${ow}/><rect x="-14" y="-23" width="28" height="16" fill="${st.on?'#cfe9ff':'#2b2f38'}"/>`,
 blanket:(st)=>`<path d="M-20 0v-16q0-6 6-6h28q6 0 6 6v16z" fill="#5a8fc9" ${ow}/><path d="M-20 -10h40" stroke="#fff" stroke-width="2" opacity=".7"/>`,
 meal:(st)=>`<rect x="-24" y="-8" width="48" height="8" rx="2" fill="#9aa3b5" ${ow}/>${st.eaten?'':`<ellipse cx="-8" cy="-12" rx="10" ry="5" fill="${st.c||'#f2c14e'}" ${ow}/><rect x="6" y="-16" width="12" height="8" rx="2" fill="#7cc35a" ${ow}/>`}`,
 map:(st)=>`<path d="M-16 -2l10-4l10 4l12-4v-18l-12 4l-10-4l-10 4z" fill="#fffaf0" ${ow}/><path d="M-6 -24v18M4 -20v18" stroke="#c9d3e6" stroke-width="1.4"/><circle cx="8" cy="-12" r="2.4" fill="#e74c3c"/>`,
 carkey:(st)=>`<rect x="-12" y="-10" width="14" height="10" rx="4" fill="#2b2f38" ${ow}/><path d="M2 -5h12l3 3l-3 2" stroke="#c9ced8" stroke-width="3" fill="none"/>`,
 shirt:(st)=>`<path d="M-16 0v-22l-8 4l-4-10l14-6h28l14 6l-4 10l-8-4v22z" fill="${st.c||'#2a63c4'}" ${ow}/>`,
 popcorn:(st)=>`<path d="M-12 0l-4-24h32l-4 24z" fill="#fff" ${ow}/><path d="M-8 -24v24M0 -24v24M8 -24v24" stroke="#e74c3c" stroke-width="3"/>${[-10,-3,4,11].map((x,i)=>`<circle cx="${x}" cy="${-28-(i%2)*4}" r="5" fill="#fbe8a6" ${ow}/>`).join('')}`,
 dumbbell:(st)=>`<rect x="-14" y="-8" width="28" height="4" fill="#5a6b8c"/><rect x="-20" y="-14" width="8" height="16" rx="2" fill="#2b2f38" ${ow}/><rect x="12" y="-14" width="8" height="16" rx="2" fill="#2b2f38" ${ow}/>`,
 badge:(st)=>`<rect x="-12" y="-16" width="24" height="16" rx="2" fill="#fff" ${ow}/><rect x="-12" y="-16" width="24" height="5" fill="#1f8455"/><path d="M-8 -6h16" stroke="#9aa" stroke-width="1.4"/>`,
 headset:(st)=>`<path d="M-14 -6q0-20 14-20q14 0 14 20" stroke="${OL}" stroke-width="3" fill="none"/><rect x="-18" y="-10" width="8" height="12" rx="3" fill="#3c4250" ${ow}/><rect x="10" y="-10" width="8" height="12" rx="3" fill="#3c4250" ${ow}/>`,
 money:()=>`<rect x="-12" y="-6" width="24" height="6" rx="1" fill="#9bd18c" ${ow}/>`,
};
function propSvg(type,st={}){const f=PROP[type];return `<g class="pr">${f?f(st):''}</g>`}

// ===== うごかす英語ワールド: 家具・設備・背景 =====
// 原点は底の中央(床に接する点)。コメントの「座面」「天板」は原点からの高さ(px)。シーン側の座標はこの数値に合わせる。
const FIX={
 // 座面 40 / 幅 220
 sofa:(st,o)=>{const c=o.c||'#7a9cc6',d=shade(c,-.2);return `<path d="M-110 -40v-58q0-12 14-12h192q14 0 14 12v58z" fill="${d}" ${ow}/><rect x="-104" y="-58" width="208" height="22" rx="10" fill="${c}" ${ow}/><rect x="-122" y="-70" width="28" height="56" rx="12" fill="${c}" ${ow}/><rect x="94" y="-70" width="28" height="56" rx="12" fill="${c}" ${ow}/><rect x="-110" y="-40" width="220" height="28" rx="6" fill="${shade(c,.12)}" ${ow}/><path d="M-100 -12v12M100 -12v12" stroke="${OL}" stroke-width="5"/><path d="M0 -100v42" stroke="${d}" stroke-width="2"/>`},
 // 座面 40
 chair:(st,o)=>{const c=o.c||'#b9824e',f=o.face||1;return `<g transform="scale(${f} 1)"><path d="M-20 -40v40M18 -40v40" stroke="${OL}" stroke-width="5"/><path d="M-20 -40v40M18 -40v40" stroke="${shade(c,-.2)}" stroke-width="2.6"/><rect x="-26" y="-46" width="50" height="9" rx="3" fill="${c}" ${ow}/><path d="M-24 -46v-50" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M-24 -46v-50" stroke="${c}" stroke-width="3.6"/><rect x="-28" y="-104" width="10" height="34" rx="4" fill="${c}" ${ow}/></g>`},
 // 天板 62 / 幅 o.w(既定160)
 table:(st,o)=>{const w=o.w||160,h=o.h||62,c=o.c||'#c58a52';return `<path d="M${-w/2+12} -${h-6}v${h-6}M${w/2-12} -${h-6}v${h-6}" stroke="${OL}" stroke-width="7"/><path d="M${-w/2+12} -${h-6}v${h-6}M${w/2-12} -${h-6}v${h-6}" stroke="${shade(c,-.25)}" stroke-width="4"/><rect x="${-w/2}" y="-${h+4}" width="${w}" height="12" rx="4" fill="${c}" ${ow}/><path d="M${-w/2+6} -${h+1}h${w-12}" stroke="${shade(c,.25)}" stroke-width="2"/>${o.cloth?`<path d="M${-w/2+4} -${h-4}h${w-8}l-6 18h${-(w-20)}z" fill="${o.cloth}" ${ow}/>`:''}`},
 desk:(st,o)=>FIX.table(st,{w:o.w||120,h:60,c:o.c||'#d6b07a'}),
 // 画面: 下端 -70 / 幅 140
 tv:(st,o)=>`<rect x="-60" y="-40" width="120" height="40" rx="4" fill="#8a6a4a" ${ow}/><rect x="-74" y="-150" width="148" height="88" rx="6" fill="#2b2f38" ${ow}/><rect x="-66" y="-142" width="132" height="72" rx="3" fill="${st.on?'#7fd0ff':'#3b4252'}"/>${st.on?`<path d="M-66 -96q30-20 60 0t72-6v32h-132z" fill="#5fbf6a"/><circle cx="34" cy="-122" r="10" fill="#ffe27a"/><path d="M-50 -128q8-6 16 0" stroke="#fff" stroke-width="3" fill="none"/>`:`<path d="M-60 -138l30 40" stroke="#4c5466" stroke-width="5"/>`}<path d="M-10 -62v22h20v-22" fill="#2b2f38" ${ow}/><circle cx="58" cy="-68" r="2.4" fill="${st.on?'#4cd964':'#e74c3c'}"/>`,
 // 幅 90 / 高さ 180
 door:(st,o)=>{const c=o.c||'#a7744a';return `<rect x="-45" y="-182" width="90" height="182" fill="${st.open?'#3d3a44':'#f3ead9'}" ${ow}/>${st.open?`<path d="M-45 -182l-30 14v176l30-8z" fill="${c}" ${ow}/><circle cx="-66" cy="-90" r="3.4" fill="#f5c542" ${ow}/><path d="M-45 0l40-20h50" fill="none" stroke="#f6d78a" stroke-width="2" opacity=".6"/>`:`<rect x="-40" y="-178" width="80" height="178" fill="${c}" ${ow}/><rect x="-30" y="-166" width="60" height="64" rx="3" fill="${shade(c,.12)}" ${ow}/><rect x="-30" y="-92" width="60" height="70" rx="3" fill="${shade(c,.12)}" ${ow}/><circle cx="28" cy="-92" r="4" fill="#f5c542" ${ow}/>`}`},
 // 窓: 原点は窓の下枠 / 幅 150 高さ 120
 window:(st,o)=>`<rect x="-80" y="-128" width="160" height="128" rx="4" fill="#fff" ${ow}/><rect x="-72" y="-120" width="144" height="112" fill="${o.night?'#26305a':'#bfe6ff'}"/>${o.night?'<circle cx="40" cy="-96" r="10" fill="#fff7c2"/>':'<path d="M-72 -40q30-18 60-4t84-8v44h-144z" fill="#9bd18c"/><circle cx="-40" cy="-94" r="9" fill="#fff" opacity=".9"/><circle cx="-28" cy="-96" r="11" fill="#fff" opacity=".9"/>'}${st.open?`<rect x="-72" y="-120" width="40" height="112" fill="#fff" opacity=".35" ${ow}/><rect x="32" y="-120" width="40" height="112" fill="#fff" opacity=".35" ${ow}/>`:`<path d="M0 -120v112M-72 -64h144" stroke="#fff" stroke-width="6"/><path d="M0 -120v112M-72 -64h144" stroke="${OL}" stroke-width="1.5"/>`}<rect x="-86" y="-4" width="172" height="10" rx="3" fill="#fff" ${ow}/>`,
 // 冷蔵庫 幅 86 / 高さ 190。中の棚: 高さ 120
 fridge:(st,o)=>`<rect x="-43" y="-190" width="86" height="190" rx="8" fill="#eef3f6" ${ow}/>${st.open?`<rect x="-37" y="-184" width="74" height="178" rx="4" fill="#dff1fb" ${ow}/><path d="M-37 -120h74M-37 -62h74" stroke="#9cc6dd" stroke-width="3"/><path d="M43 -190l36 12v168l-36 10z" fill="#e3eaef" ${ow}/><path d="M68 -150v40" stroke="#9aa6b2" stroke-width="5" stroke-linecap="round"/>`:`<path d="M-43 -128h86" stroke="${OL}" stroke-width="2"/><path d="M-30 -170v26M-30 -112v40" stroke="#9aa6b2" stroke-width="5" stroke-linecap="round"/><rect x="10" y="-180" width="22" height="14" rx="2" fill="#f7d36b" ${ow}/>`}`,
 // 流し台 天板 86 / 幅 200
 sink:(st,o)=>`<rect x="-100" y="-86" width="200" height="86" fill="#d9c3a3" ${ow}/><rect x="-90" y="-74" width="84" height="66" rx="4" fill="#c9ab84" ${ow}/><rect x="6" y="-74" width="84" height="66" rx="4" fill="#c9ab84" ${ow}/><rect x="-104" y="-96" width="208" height="12" rx="3" fill="#eef2f4" ${ow}/><path d="M-60 -92q0-6 8-6h56q8 0 8 6" fill="#b9c8d2" ${ow}/><path d="M30 -96v-34q0-10 12-10h10v8" fill="none" stroke="#9aa6b2" stroke-width="6" stroke-linecap="round"/>${st.water?'<path d="M52 -128v30" stroke="#7fc7f0" stroke-width="5"/>':''}`,
 // ベッド 上面 56 / 幅 260 (枕側が左)
 bed:(st,o)=>{const c=o.c||'#f4a7a7';return `<rect x="-130" y="-56" width="260" height="40" rx="8" fill="#fff" ${ow}/><path d="M-138 -112v112M138 -64v64" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-138 -112v112M138 -64v64" stroke="#a0754e" stroke-width="7" stroke-linecap="round"/><path d="M-130 -100h12v84h-12z" fill="#b8865a" ${ow}/><path d="M-50 -58h176q6 0 6 8v30h-182z" fill="${c}" ${ow}/><path d="M-30 -48h150" stroke="#fff" stroke-width="2" opacity=".6"/>`},
 // 照明(スタンド) 高さ 150
 lamp:(st,o)=>`${st.on?'<circle cx="0" cy="-138" r="60" fill="#ffe9a8" opacity=".35"/>':''}<path d="M0 -120v118" stroke="${OL}" stroke-width="5"/><ellipse cx="0" cy="-2" rx="20" ry="5" fill="#666" ${ow}/><path d="M-24 -116l8-40h32l8 40z" fill="${st.on?'#ffe27a':'#e9e2cf'}" ${ow}/>`,
 // 壁の時計 原点は時計の中心
 clock:(st,o)=>`<circle r="26" fill="#fff" ${ow}/><circle r="20" fill="none" stroke="#ddd" stroke-width="1.5"/><path d="M0 0v-14M0 0l10 5" stroke="${OL}" stroke-width="3" stroke-linecap="round"/><circle r="2.5" fill="${OL}"/>`,
 // 木 高さ 280
 tree:(st,o)=>`<path d="M-16 0q6-60 4-150h24q-2 90 4 150z" fill="#9a6b45" ${ow}/><circle cx="-50" cy="-170" r="52" fill="#5bae5a" ${ow}/><circle cx="46" cy="-176" r="54" fill="#5bae5a" ${ow}/><circle cx="0" cy="-228" r="60" fill="#6cc06a" ${ow}/><circle cx="-20" cy="-236" r="16" fill="#8fd68a" opacity=".7"/><circle cx="30" cy="-180" r="12" fill="#8fd68a" opacity=".7"/>`,
 // ベンチ 座面 40 / 幅 170
 bench:(st,o)=>{const c=o.c||'#b77b46';return `<path d="M-70 -36v36M70 -36v36" stroke="${OL}" stroke-width="6"/><rect x="-85" y="-46" width="170" height="10" rx="3" fill="${c}" ${ow}/><rect x="-85" y="-84" width="170" height="10" rx="3" fill="${c}" ${ow}/><rect x="-85" y="-66" width="170" height="10" rx="3" fill="${c}" ${ow}/><path d="M-76 -84v40M76 -84v40" stroke="${OL}" stroke-width="5"/>`},
 // 池 楕円 幅 260
 pond:(st,o)=>`<ellipse cx="0" cy="-16" rx="130" ry="34" fill="#7fc7f0" ${ow}/><ellipse cx="-20" cy="-22" rx="60" ry="8" fill="#fff" opacity=".35"/><ellipse cx="60" cy="-10" rx="14" ry="5" fill="#5bae5a" ${ow}/>`,
 flowers:(st,o)=>`<path d="M-60 0q60-30 120 0z" fill="#5bae5a" ${ow}/>${[-40,-14,12,38].map((x,i)=>`<path d="M${x} -8v-20" stroke="#4e9a3a" stroke-width="3"/><circle cx="${x}" cy="-32" r="8" fill="${['#f28bb0','#f5c542','#e8463b','#b48be0'][i]}" ${ow}/><circle cx="${x}" cy="-32" r="2.6" fill="#fff6"/>`).join('')}`,
 bicycle:(st,o)=>bikeSvg(o.c||'#e05a47'),
 // カウンター 天板 96 / 幅 o.w
 counter:(st,o)=>{const w=o.w||240,c=o.c||'#8a5a3c';return `<rect x="${-w/2}" y="-92" width="${w}" height="92" fill="${c}" ${ow}/><rect x="${-w/2-6}" y="-100" width="${w+12}" height="12" rx="3" fill="${shade(c,.35)}" ${ow}/><path d="M${-w/2+14} -70h${w-28}" stroke="${shade(c,.15)}" stroke-width="3"/>`},
 register:(st,o)=>`<rect x="-30" y="-36" width="60" height="36" rx="4" fill="#3c4250" ${ow}/><rect x="-24" y="-54" width="34" height="20" rx="2" fill="#2b2f38" ${ow}/><rect x="-21" y="-51" width="28" height="14" fill="${st.err?'#f08a7e':st.paid?'#7fe08a':'#7fc7f0'}"/>${st.err?'<text x="-7" y="-40" text-anchor="middle" font-size="8" font-weight="700" fill="#7a1f17" font-family="sans-serif">ERROR</text>':''}<path d="M-22 -26h44M-22 -18h44" stroke="#8892a6" stroke-width="2"/>`,
 // 黒板(壁) 原点は下端中央 / 幅 300
 blackboard:(st,o)=>`<rect x="-156" y="-160" width="312" height="160" rx="6" fill="#a0754e" ${ow}/><rect x="-146" y="-150" width="292" height="140" fill="#2f5d4a"/>${st.text?`<text x="-120" y="-96" font-family="'Lexend',sans-serif" font-size="30" fill="#f4f4ec">${esc(st.text)}</text><path d="M-120 -80h170" stroke="#f4f4ec" stroke-width="2" opacity=".6"/>`:''}<rect x="-140" y="-8" width="280" height="8" fill="#8a6a4a" ${ow}/><rect x="60" y="-14" width="22" height="6" fill="#fff" ${ow}/>`,
 // 商品棚 幅 200 / 段の高さ 50, 100, 150
 shelf:(st,o)=>`<rect x="-100" y="-180" width="200" height="180" fill="#e9dcc6" ${ow}/><path d="M-100 -50h200M-100 -100h200M-100 -150h200" stroke="#a0754e" stroke-width="6"/><path d="M-100 -50h200M-100 -100h200M-100 -150h200" stroke="${OL}" stroke-width="1.5"/>${o.books?[-150,-100,-50].map((y,r)=>Array.from({length:10},(_,i)=>`<rect x="${-92+i*18}" y="${y+6-((i+r)%3)*4}" width="14" height="${38+((i+r)%3)*4}" fill="${['#c0392b','#2a63c4','#1f8455','#f5c542','#8e44ad'][(i+r*2)%5]}" ${ow}/>`).join('')).join(''):o.plain?'':`${[-70,-40,-10].map(x=>`<circle cx="${x}" cy="-163" r="10" fill="#f2b33d" ${ow}/>`).join('')}${[30,60].map(x=>`<rect x="${x-10}" y="-128" width="20" height="26" rx="3" fill="#7fb7e0" ${ow}/>`).join('')}${[-60,-30].map(x=>`<path d="M${x} -104l14-10q4-2 2 2l-12 10z" fill="#f08a2c" ${ow}/>`).join('')}`}`,
 // 改札 幅 120
 gate:(st,o)=>`<rect x="-60" y="-96" width="36" height="96" rx="6" fill="#d9dde6" ${ow}/><rect x="24" y="-96" width="36" height="96" rx="6" fill="#d9dde6" ${ow}/><rect x="-56" y="-104" width="28" height="10" rx="2" fill="#4c5466" ${ow}/><rect x="-50" y="-88" width="16" height="8" fill="${st.passed?'#7fe08a':'#7fc7f0'}"/><path d="M-24 -50h${st.open?8:22}M24 -50h-${st.open?8:22}" stroke="#e74c3c" stroke-width="8" stroke-linecap="round"/>`,
 // 電車 幅 520 / ドア中心 x=-120, 120
 train:(st,o)=>`<g class="train ${st.leaving?'leaving':''}"><rect x="-260" y="-200" width="520" height="190" rx="28" fill="#f4f6f8" ${ow}/><rect x="-260" y="-80" width="520" height="16" fill="#3a8a5a"/><rect x="-260" y="-56" width="520" height="8" fill="#e8b04a"/>${[-210,-30,30,210].map(x=>`<rect x="${x-36}" y="-176" width="72" height="56" rx="8" fill="#9fd3f2" ${ow}/>`).join('')}${[-120,120].map(x=>st.open?`<rect x="${x-34}" y="-170" width="68" height="160" fill="#4a4f5c" ${ow}/><rect x="${x-50}" y="-170" width="16" height="160" fill="#dfe4ea" ${ow}/><rect x="${x+34}" y="-170" width="16" height="160" fill="#dfe4ea" ${ow}/>`:`<rect x="${x-34}" y="-170" width="68" height="160" fill="#dfe4ea" ${ow}/><path d="M${x} -170v160" stroke="${OL}" stroke-width="2"/><rect x="${x-26}" y="-160" width="20" height="40" rx="3" fill="#9fd3f2" ${ow}/><rect x="${x+6}" y="-160" width="20" height="40" rx="3" fill="#9fd3f2" ${ow}/>`).join('')}<circle cx="-200" cy="-6" r="12" fill="#555" ${ow}/><circle cx="200" cy="-6" r="12" fill="#555" ${ow}/></g>`,
 // パソコン(机の上) 原点は底
 computer:(st,o)=>`<rect x="-34" y="-58" width="68" height="46" rx="4" fill="#2b2f38" ${ow}/><rect x="-29" y="-53" width="58" height="36" fill="${st.on?'#cfe9ff':'#3b4252'}"/>${st.on?'<path d="M-24 -46h30M-24 -40h40M-24 -34h24" stroke="#5a7fb0" stroke-width="2.4"/>':''}<path d="M-6 -12h12l4 10h-20z" fill="#9aa6b2" ${ow}/><rect x="-26" y="-4" width="52" height="4" rx="1.5" fill="#c9d0da" ${ow}/>`,
 deskphone:(st,o)=>`<path d="M-18 0l4-16h28l4 16z" fill="#e9e9e9" ${ow}/>${st.up?'':`<path d="M-20 -18q20-10 40 0v6h-10v-4h-20v4h-10z" fill="#3c4250" ${ow}/>`}${st.ring?'<path class="ring" d="M-26 -26l-6-6M26 -26l6-6M0 -32v-8" stroke="#e74c3c" stroke-width="2.6" stroke-linecap="round"/>':''}`,
 // パラソル 高さ 200 / 影の範囲 幅 200
 parasol:(st,o)=>`<ellipse cx="0" cy="-2" rx="100" ry="14" fill="#000" opacity=".1"/><path d="M0 0v-196" stroke="${OL}" stroke-width="5"/><path d="M-110 -170q110-70 220 0z" fill="#f28b7f" ${ow}/><path d="M-36 -194q36 12 0 24M36 -194q-36 12 0 24" fill="#fff6e8" ${ow}/>`,
 // 車 幅 200。運転手つき
 car:(st,o)=>`<g class="car ${st.moving?'moving':''}"><path d="M-100 -24v-36q0-10 12-12l26-28q6-6 16-6h66q10 0 16 8l20 26q34 4 34 16v32z" fill="${o.c||'#3f7fd6'}" ${ow}/><path d="M-50 -66l22-26h50v26z M30 -66v-26h18l18 26z" fill="#bfe6ff" ${ow}/><circle cx="0" cy="-80" r="10" fill="#ffe0c7" ${ow}/><path d="M-10 -86q10-12 20 0" fill="#3a2a24"/><g class="wheel" style="transform-origin:-60px -18px"><circle cx="-60" cy="-18" r="18" fill="#2b2f38" ${ow}/><circle cx="-60" cy="-18" r="7" fill="#bbb"/></g><g class="wheel" style="transform-origin:60px -18px"><circle cx="60" cy="-18" r="18" fill="#2b2f38" ${ow}/><circle cx="60" cy="-18" r="7" fill="#bbb"/></g><rect x="88" y="-52" width="12" height="8" rx="2" fill="#ffe27a" ${ow}/></g>`,
 // 歩行者用信号 高さ 210
 trafficlight:(st,o)=>`<path d="M0 0v-150" stroke="${OL}" stroke-width="8"/><path d="M0 0v-150" stroke="#8892a6" stroke-width="5"/><rect x="-22" y="-210" width="44" height="76" rx="6" fill="#2b2f38" ${ow}/><circle cx="0" cy="-190" r="13" fill="${st.green?'#5a2420':'#ff4d3d'}"/><circle cx="0" cy="-156" r="13" fill="${st.green?'#3ee07a':'#1f4a30'}"/>${st.green?'<path d="M-4 -164v12M-4 -158l6 6" stroke="#fff" stroke-width="2"/>':'<path d="M-4 -198v12" stroke="#fff" stroke-width="2"/>'}`,
 // 横断歩道 道路の上 幅 o.w
 crosswalk:(st,o)=>`${[...Array(7)].map((_,i)=>`<rect x="${-120+i*36}" y="-${o.h||70}" width="22" height="${o.h||70}" fill="#fff" opacity=".95"/>`).join('')}`,
 // お店 幅 260 / ドア中心 x=0
 shop:(st,o)=>`<rect x="-130" y="-240" width="260" height="240" fill="${o.c||'#f6e3c5'}" ${ow}/><path d="M-140 -240h280l-12 40h-256z" fill="${o.awn||'#e05a47'}" ${ow}/>${[-104,-78,-52,-26,0,26,52,78,104].map(x=>`<path d="M${x} -240l-6 40" stroke="#fff" stroke-width="7" opacity=".7"/>`).join('')}<text x="0" y="-210" text-anchor="middle" font-family="'Dela Gothic One',sans-serif" font-size="20" fill="#fff">${esc(o.label||'SHOP')}</text><rect x="-110" y="-180" width="70" height="90" fill="#bfe6ff" ${ow}/><rect x="40" y="-180" width="70" height="90" fill="#bfe6ff" ${ow}/><rect x="-32" y="-150" width="64" height="150" fill="${st.open?'#3d3a44':'#a7744a'}" ${ow}/>${st.open?'':'<circle cx="20" cy="-76" r="3.4" fill="#f5c542"/>'}`,
 building:(st,o)=>`<rect x="-90" y="-${o.h||320}" width="180" height="${o.h||320}" fill="${o.c||'#c9d3e0'}" ${ow}/>${[...Array(Math.floor((o.h||320)/60))].map((_,r)=>[-50,0,50].map(x=>`<rect x="${x-16}" y="${-(o.h||320)+20+r*60}" width="32" height="36" fill="#eaf4ff" ${ow}/>`).join('')).join('')}`,
 towel:(st,o)=>PROP.towel(),
 sea:(st,o)=>`<rect x="-500" y="-160" width="1000" height="160" fill="rgba(0,0,0,0)"/>`,
 menuboard:(st,o)=>{const it=o.items||[];return `<rect x="-120" y="-130" width="240" height="130" rx="6" fill="#2f2a26" ${ow}/><text x="0" y="-104" text-anchor="middle" fill="#f5c542" font-size="17" font-weight="700" font-family="'Lexend',sans-serif">MENU</text>
  ${it.map((m,i)=>{const y=-76+i*28,out=st.out===m.id;return `<text x="-100" y="${y}" fill="${out?'#8a8079':'#f5e6c8'}" font-size="16" font-family="'Lexend',sans-serif">${esc(m.label)}</text><text x="100" y="${y}" text-anchor="end" fill="${out?'#8a8079':'#f5e6c8'}" font-size="16" font-family="'Lexend',sans-serif">${esc(m.price)}</text>${out?`<path d="M-104 ${y-5}h208" stroke="#f0eae0" stroke-width="2"/><g transform="translate(40 ${y-6}) rotate(-8)"><rect x="-44" y="-12" width="88" height="22" rx="4" fill="#d9473b" stroke="#fff" stroke-width="1.5"/><text y="4" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="'Lexend',sans-serif">SOLD OUT</text></g>`:''}`}).join('')}`},
 elevator:(st,o)=>`<rect x="-62" y="-196" width="124" height="196" fill="#c9ced8" ${ow}/><rect x="-54" y="-186" width="108" height="186" fill="#3d4352"/>
  ${st.open?'<rect x="-50" y="-182" width="100" height="182" fill="#e9e2c9"/>':''}<rect x="${st.open?-54:-54}" y="-186" width="${st.open?10:54}" height="186" fill="#aeb6c4" ${ow}/><rect x="${st.open?44:0}" y="-186" width="${st.open?10:54}" height="186" fill="#aeb6c4" ${ow}/>
  <rect x="-22" y="-222" width="44" height="18" rx="3" fill="#2b2f38"/><text y="-208" text-anchor="middle" fill="#7fe08a" font-size="13" font-family="'Lexend',sans-serif">${esc(st.floor||'1')}</text><circle cx="78" cy="-96" r="7" fill="#e9eef5" ${ow}/><path d="M74 -97l4-4l4 4" stroke="${OL}" stroke-width="1.6" fill="none"/>`,
 fboard:(st,o)=>{const n=o.n||3;return `<rect x="-170" y="-${44+n*30}" width="340" height="${44+n*30}" rx="6" fill="#1d2433" ${ow}/><text x="-152" y="-${20+n*30}" fill="#f5c542" font-size="15" font-weight="700" font-family="'Lexend',sans-serif">${esc(o.title||'DEPARTURES')}</text>
  ${Array.from({length:n},(_,i)=>{const k=i+1,y=-(n-i)*30+12,stt=String(st['s'+k]||'');const col=/DELAY|CANCEL|CHANGE/.test(stt)?'#ff8d7e':/BOARD/.test(stt)?'#7fe08a':'#cfe3ff';
   return `<text x="-152" y="${y-12}" fill="#e6ecf6" font-size="14" font-family="'Lexend',sans-serif">${esc(st['t'+k]||'')}</text><text x="-100" y="${y-12}" fill="#e6ecf6" font-size="14" font-family="'Lexend',sans-serif">${esc(st['d'+k]||'')}</text><text x="40" y="${y-12}" fill="#e6ecf6" font-size="14" font-family="'Lexend',sans-serif">${esc(st['g'+k]?(o.gl||'Gate')+' '+st['g'+k]:'')}</text><text x="158" y="${y-12}" text-anchor="end" fill="${col}" font-size="12" font-family="'Lexend',sans-serif">${esc(stt)}</text>`}).join('')}`},
 gatesign:(st,o)=>`<rect x="-4" y="-170" width="8" height="170" fill="#8892a6" ${ow}/><rect x="-46" y="-206" width="92" height="44" rx="6" fill="${o.c||'#2a63c4'}" ${ow}/><text y="-178" text-anchor="middle" fill="#fff" font-size="20" font-weight="700" font-family="'Lexend',sans-serif">${esc(o.label||'')}</text>`,
 scale:(st,o)=>`<rect x="-60" y="-34" width="120" height="34" rx="3" fill="#9aa3b5" ${ow}/><rect x="-56" y="-42" width="112" height="10" rx="3" fill="#3c4250" ${ow}/><rect x="40" y="-90" width="34" height="24" rx="3" fill="#2b2f38" ${ow}/><text x="57" y="-73" text-anchor="middle" fill="${st.over?'#ff8d7e':'#7fe08a'}" font-size="11" font-family="'Lexend',sans-serif">${esc(st.kg||'0.0')}</text><path d="M57 -66v24" stroke="${OL}" stroke-width="3"/>`,
 plant:(st,o)=>`<path d="M-20 0l-5-34h50l-5 34z" fill="#b5653a" ${ow}/><path d="M0 -34q-30-40-10-80q6 30 10 40q4-40 26-70q6 50-14 80q24-20 30-10q-14 30-42 40z" fill="#4e9a3a" ${ow}/>`,
 signpost:(st,o)=>`<rect x="-3" y="-150" width="6" height="150" fill="#6c7385" ${ow}/><rect x="-40" y="-184" width="80" height="36" rx="5" fill="${o.c||'#1f8455'}" ${ow}/><text y="-160" text-anchor="middle" fill="#fff" font-size="16" font-weight="700" font-family="'Lexend',sans-serif">${esc(o.label||'')}</text>`,
 shoerack:(st,o)=>`<rect x="-70" y="-56" width="140" height="56" rx="3" fill="#b9874f" ${ow}/><path d="M-70 -28h140" stroke="#8a5a32" stroke-width="3"/><path d="M-56 -6h30l4-8h-30zM-14 -6h30l4-8h-30zM28 -6h30l4-8h-30z" fill="#3b4256" ${ow}/>`,
 coathook:(st,o)=>`<rect x="-80" y="-12" width="160" height="12" rx="3" fill="#8a5a32" ${ow}/>${[-50,0,50].map(x=>`<path d="M${x} -2v12q0 6 6 6" stroke="${OL}" stroke-width="3" fill="none"/>`).join('')}<path d="M-56 10l-14 70h44l-14-70z" fill="#5a6b8c" ${ow}/><path d="M44 10l-10 56h32l-10-56z" fill="#c97b6b" ${ow}/>`,
 bathtub:(st,o)=>`<path d="M-120 -70h240v20q0 50-50 50h-140q-50 0-50-50z" fill="#fdfdfd" ${ow}/>${st.full?'<path d="M-112 -62h224v6q-112 14-224 0z" fill="#9fd3f0" opacity=".9"/>':''}<path d="M96 -70v-30h18" fill="none" stroke="#9aa3b5" stroke-width="5"/><path d="M-90 0v10M90 0v10" stroke="${OL}" stroke-width="5"/>${st.full?'<path class="steam" d="M-30 -80q-6-10 0-18M10 -80q-6-10 0-18" stroke="#dfe7f0" stroke-width="3" fill="none"/>':''}`,
 basin:(st,o)=>`<rect x="-12" y="-80" width="24" height="80" fill="#eef1f5" ${ow}/><path d="M-50 -96h100q0 20-50 22q-50-2-50-22z" fill="#fff" ${ow}/><path d="M0 -96v-14h10" stroke="#9aa3b5" stroke-width="4" fill="none"/>${st.on?'<path d="M10 -104v10" stroke="#7fc7f0" stroke-width="3"/>':''}`,
 mirror:(st,o)=>`<ellipse cx="0" cy="-60" rx="${o.w||50}" ry="60" fill="#dff1fb" stroke="#b8963e" stroke-width="6"/><path d="M-20 -90l30-20M-26 -70l40-26" stroke="#fff" stroke-width="4" opacity=".8"/>`,
 towelrack:(st,o)=>`<path d="M-60 -60h120" stroke="#9aa3b5" stroke-width="5"/><path d="M-50 -60v50h44v-50z" fill="${st.empty?'none':'#8fd1a8'}" ${st.empty?'':ow}/><path d="M6 -60v40h44v-40z" fill="#f2b33d" ${ow}/>`,
 curtain:(st,o)=>`<rect x="-64" y="-200" width="128" height="8" fill="#8892a6" ${ow}/>${st.open?`<path d="M-62 -192q8 90 0 190h20q-6-100 0-190z" fill="${o.c||'#c97b6b'}" ${ow}/><path d="M62 -192q-8 90 0 190h-20q6-100 0-190z" fill="${o.c||'#c97b6b'}" ${ow}/>`:`<path d="M-62 -192h124v190h-124z" fill="${o.c||'#c97b6b'}" ${ow}/><path d="M-30 -190q-6 90 0 186M0 -190q6 90 0 186M30 -190q-6 90 0 186" stroke="${shade(o.c||'#c97b6b',-.25)}" stroke-width="2.5" fill="none"/>`}${o.label?`<rect x="-34" y="-232" width="68" height="24" rx="4" fill="#fff" ${ow}/><text y="-215" text-anchor="middle" font-size="13" font-weight="700" fill="${OL}" font-family="'Lexend',sans-serif">${esc(o.label)}</text>`:''}`,
 tallshelf:(st,o)=>{const cols=o.cols||['#c0392b','#2a63c4','#1f8455','#f5c542','#8e44ad','#e67e22'];return `<rect x="-90" y="-230" width="180" height="230" fill="#b9874f" ${ow}/>${[0,1,2,3].map(r=>`<rect x="-82" y="${-222+r*56}" width="164" height="48" fill="#e9dcc6"/>${Array.from({length:o.box?5:9},(_,i)=>o.box?`<rect x="${-78+i*32}" y="${-206+r*56}" width="26" height="30" rx="2" fill="${cols[(i+r)%cols.length]}" ${ow}/><rect x="${-74+i*32}" y="${-196+r*56}" width="18" height="6" fill="#fff"/>`:`<rect x="${-80+i*18}" y="${-214+r*56}" width="14" height="${36+((i*7+r*3)%8)}" fill="${cols[(i*2+r)%cols.length]}" ${ow}/>`).join('')}`).join('')}`},
 mailbox:(st,o)=>`<rect x="-26" y="-130" width="52" height="110" rx="20" fill="#d9473b" ${ow}/><rect x="-18" y="-100" width="36" height="6" rx="3" fill="${OL}"/><rect x="-8" y="-20" width="16" height="20" fill="#7a2638" ${ow}/><text y="-60" text-anchor="middle" fill="#fff" font-size="12" font-weight="700" font-family="'Lexend',sans-serif">POST</text>`,
 xray:(st,o)=>`<rect x="-130" y="-60" width="260" height="20" fill="#3c4250" ${ow}/><rect x="-60" y="-140" width="120" height="100" rx="8" fill="#9aa3b5" ${ow}/><rect x="-46" y="-90" width="92" height="50" fill="#2b2f38"/><path d="M-46 -90v50M-34 -90v50M-22 -90v50" stroke="#555" stroke-width="2"/><rect x="-130" y="-40" width="10" height="40" fill="${OL}"/><rect x="120" y="-40" width="10" height="40" fill="${OL}"/><rect x="70" y="-150" width="50" height="34" rx="3" fill="#1d2433" ${ow}/><rect x="74" y="-146" width="42" height="26" fill="${st.alert?'#f08a7e':'#2d6a8a'}"/>`,
 detector:(st,o)=>`<path d="M-50 0v-200h100v200" fill="none" stroke="#9aa3b5" stroke-width="16"/><path d="M-50 0v-200h100v200" fill="none" stroke="${OL}" stroke-width="2.2"/><circle cx="0" cy="-212" r="8" fill="${st.beep?'#e74c3c':'#7fe08a'}" ${ow}/>`,
 planeseat:(st,o)=>{const n=o.n||3;return Array.from({length:n},(_,i)=>{const x=(i-(n-1)/2)*96;return `<path d="M${x-18} -120q-6 0-6 8v80h14v-80z" fill="${o.c||'#2a63c4'}" ${ow}/><rect x="${x-24}" y="-46" width="52" height="16" rx="4" fill="${o.c||'#2a63c4'}" ${ow}/><path d="M${x-10} -30v30M${x+20} -30v30" stroke="${OL}" stroke-width="4"/>`}).join('')},
 bin:(st,o)=>`<path d="M-150 -40h300v-36q0-14-14-14h-272q-14 0-14 14z" fill="#e9eef5" ${ow}/>${st.open?`<path d="M-140 -76l-10-34h300l-10 34z" fill="#d6dce6" ${ow}/>`:''}<path d="M-120 -56h240" stroke="#c3ccd8" stroke-width="3"/>`,
 cart:(st,o)=>`<rect x="-40" y="-110" width="80" height="100" rx="6" fill="#d6dce6" ${ow}/><path d="M-40 -76h80M-40 -44h80" stroke="#9aa3b5" stroke-width="3"/><circle cx="-26" cy="-4" r="6" fill="${OL}"/><circle cx="26" cy="-4" r="6" fill="${OL}"/>`,
 ac:(st,o)=>`<rect x="-80" y="-44" width="160" height="44" rx="8" fill="#f4f6fb" ${ow}/><path d="M-66 -12h132" stroke="#c3ccd8" stroke-width="3"/><circle cx="62" cy="-30" r="4" fill="${st.on&&!st.broken?'#7fe08a':st.broken?'#e74c3c':'#c3ccd8'}"/>${st.on&&!st.broken?'<path class="steam" d="M-50 6q4 10 0 18M0 6q4 10 0 18M50 6q4 10 0 18" stroke="#bfe6ff" stroke-width="3" fill="none"/>':''}`,
 mapboard:(st,o)=>`<rect x="-110" y="-150" width="220" height="150" rx="6" fill="#fffaf0" ${ow}/><path d="M-100 -120q60 20 100-10t100 20" stroke="#7fc7f0" stroke-width="10" fill="none"/><path d="M-60 -150v150M30 -150v150M-110 -60h220" stroke="#e2d2b6" stroke-width="5"/>${(o.pins||[]).map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="${p[2]||'#e74c3c'}" ${ow}/><text x="${p[0]+10}" y="${p[1]+4}" font-size="11" font-family="'Lexend',sans-serif" fill="${OL}">${esc(p[3]||'')}</text>`).join('')}<text x="0" y="-158" text-anchor="middle" font-size="14" font-weight="700" fill="${OL}" font-family="'Lexend',sans-serif">${esc(o.title||'CITY MAP')}</text>`,
 ticketmachine:(st,o)=>`<rect x="-36" y="-150" width="72" height="150" rx="6" fill="#5a6b8c" ${ow}/><rect x="-26" y="-136" width="52" height="40" rx="3" fill="${st.err?'#f08a7e':'#cfe9ff'}" ${ow}/>${st.err?'<text y="-112" text-anchor="middle" font-size="10" font-weight="700" fill="#7a1f17" font-family="sans-serif">OUT OF ORDER</text>':''}<rect x="-20" y="-80" width="40" height="8" rx="2" fill="${OL}"/><rect x="-14" y="-50" width="28" height="12" rx="2" fill="#2b2f38"/>`,
 linemap:(st,o)=>`<rect x="-130" y="-110" width="260" height="110" rx="6" fill="#fff" ${ow}/><path d="M-110 -80h220" stroke="#1f8455" stroke-width="8"/><path d="M-110 -30h220" stroke="#d9473b" stroke-width="8"/><path d="M-20 -100v90" stroke="#2a63c4" stroke-width="8"/>${[-90,-40,40,90].map(x=>`<circle cx="${x}" cy="-80" r="6" fill="#fff" ${ow}/><circle cx="${x}" cy="-30" r="6" fill="#fff" ${ow}/>`).join('')}<circle cx="-20" cy="-80" r="9" fill="#fff" ${ow}/><circle cx="-20" cy="-30" r="9" fill="#fff" ${ow}/>${(o.labels||[]).map(l=>`<text x="${l[0]}" y="${l[1]}" font-size="11" font-weight="700" fill="${l[3]||OL}" font-family="'Lexend',sans-serif">${esc(l[2])}</text>`).join('')}`,
 atm:(st,o)=>`<rect x="-44" y="-170" width="88" height="170" rx="6" fill="#2a63c4" ${ow}/><rect x="-34" y="-150" width="68" height="48" rx="3" fill="${st.err?'#f08a7e':'#cfe9ff'}" ${ow}/>${st.err?'<text y="-122" text-anchor="middle" font-size="10" font-weight="700" fill="#7a1f17" font-family="sans-serif">CARD ERROR</text>':'<text y="-122" text-anchor="middle" font-size="12" font-weight="700" fill="#2a63c4" font-family="sans-serif">ATM</text>'}<rect x="-30" y="-92" width="60" height="30" rx="2" fill="#e9eef5"/><rect x="-24" y="-52" width="48" height="6" fill="${OL}"/>`,
 rack:(st,o)=>{const cs=o.cols||['#c0392b','#2a63c4','#f5c542','#1f8455'];return `<path d="M-80 -170h160M-74 -170v170M74 -170v170" stroke="#8892a6" stroke-width="6" fill="none"/>${cs.map((c,i)=>`<path d="M${-56+i*36} -170v8l-14 12v80h28v-80l-14-12" fill="${c}" ${ow}/>`).join('')}<path d="M-90 0h30M60 0h30" stroke="#8892a6" stroke-width="6"/>`},
 salonchair:(st,o)=>`<path d="M-26 -110q0-10 10-10h28q10 0 10 10v60h-48z" fill="#2b2f38" ${ow}/><rect x="-34" y="-56" width="64" height="16" rx="5" fill="#2b2f38" ${ow}/><path d="M-4 -40v34" stroke="#9aa3b5" stroke-width="8"/><ellipse cx="-4" cy="-4" rx="26" ry="6" fill="#9aa3b5" ${ow}/>`,
 poster:(st,o)=>`<rect x="-55" y="-170" width="110" height="160" rx="4" fill="${o.c||'#2f2a4a'}" ${ow}/><circle cx="0" cy="-110" r="30" fill="${o.c2||'#f5c542'}" opacity=".9"/><text y="-40" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" font-family="'Lexend',sans-serif">${esc(o.title||'')}</text><text y="-22" text-anchor="middle" font-size="10" fill="#fff" font-family="'Lexend',sans-serif">${esc(o.sub||'')}</text>`,
 theaterseats:(st,o)=>{const n=o.n||4;return Array.from({length:n},(_,i)=>{const x=(i-(n-1)/2)*70;return `<path d="M${x-28} -86q0-10 10-10h36q10 0 10 10v50h-56z" fill="${o.c||'#b03a3a'}" ${ow}/><rect x="${x-32}" y="-40" width="64" height="14" rx="4" fill="${shade(o.c||'#b03a3a',-.15)}" ${ow}/><path d="M${x-20} -26v26M${x+20} -26v26" stroke="${OL}" stroke-width="4"/>`}).join('')},
 screen:(st,o)=>{const w=o.w||300,h=o.h||170;const t=st.text||o.text||'';return `<rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="6" fill="#1d2433" ${ow}/><rect x="${-w/2+8}" y="${-h+8}" width="${w-16}" height="${h-16}" fill="${st.on===false?'#2b2f38':o.bg||'#f4f6fb'}"/>
  ${st.on===false?'':st.call?[0,1,2,3].map(i=>{const x=-w/2+12+(i%2)*(w/2-10),y=-h+12+Math.floor(i/2)*(h/2-10);const cc=['#c97b6b','#5a8fc9','#6a8f5a','#e98a4a'][i];return `<rect x="${x}" y="${y}" width="${w/2-22}" height="${h/2-22}" fill="#3b4252"/><circle cx="${x+(w/2-22)/2}" cy="${y+(h/2-22)/2-4}" r="12" fill="#ffe0c7"/><path d="M${x+(w/2-22)/2-18} ${y+h/2-22}q18-22 36 0z" fill="${cc}"/>${st.mute===i?`<text x="${x+6}" y="${y+14}" font-size="10" fill="#ff8d7e" font-family="sans-serif">MUTED</text>`:''}${st.lag===i?`<text x="${x+6}" y="${y+14}" font-size="10" fill="#f5c542" font-family="sans-serif">POOR CONNECTION</text>`:''}`}).join('')
   :`<text x="0" y="${-h/2-6}" text-anchor="middle" font-size="${o.fs||22}" font-weight="700" fill="${o.fg||'#2a63c4'}" font-family="'Lexend',sans-serif">${esc(t)}</text>${o.chart?`<path d="M${-w/2+40} ${-30}h${w-80}M${-w/2+40} -30v-60" stroke="#9aa3b5" stroke-width="2"/>${[0,1,2,3].map(i=>`<rect x="${-w/2+56+i*44}" y="${-30-(20+i*14+(st.up?i*6:0))}" width="26" height="${20+i*14+(st.up?i*6:0)}" fill="#2a63c4"/>`).join('')}`:''}`}`},
 treadmill:(st,o)=>`<path d="M-80 0l10-24h150l-6 24z" fill="#3c4250" ${ow}/><path d="M60 -24l14-90" stroke="#8892a6" stroke-width="8"/><rect x="58" y="-128" width="40" height="22" rx="4" fill="#2b2f38" ${ow}/><rect x="62" y="-124" width="32" height="14" fill="${st.on?'#7fe08a':'#3b4252'}"/>`,
 dumbrack:(st,o)=>`<rect x="-70" y="-60" width="140" height="10" fill="#8892a6" ${ow}/><path d="M-60 -50v50M60 -50v50" stroke="#8892a6" stroke-width="8"/><rect x="-70" y="-24" width="140" height="8" fill="#8892a6" ${ow}/>`,
 balloons:(st,o)=>`${[[-30,-170,'#e74c3c'],[0,-190,'#f5c542'],[30,-166,'#3498db']].map(b=>`<path d="M${b[0]} ${b[1]+24}q4 40 0 ${-b[1]-24}" stroke="#9aa3b5" stroke-width="1.5" fill="none"/><ellipse cx="${b[0]}" cy="${b[1]}" rx="18" ry="22" fill="${b[2]}" ${ow}/>`).join('')}<rect x="-10" y="-12" width="20" height="12" fill="#8892a6" ${ow}/>`,
 podium:(st,o)=>`<path d="M-36 0l6-100h60l6 100z" fill="#7a5a3a" ${ow}/><path d="M-44 -100h88l-6-16h-76z" fill="#9a7450" ${ow}/><rect x="-14" y="-70" width="28" height="20" rx="3" fill="#f5c542" ${ow}/><path d="M10 -116l14-24" stroke="${OL}" stroke-width="3"/><circle cx="26" cy="-142" r="5" fill="${OL}"/>`,
 logowall:(st,o)=>`<rect x="-120" y="-90" width="240" height="90" rx="6" fill="${o.c||'#1f8455'}" ${ow}/><text y="-36" text-anchor="middle" font-size="26" font-weight="700" fill="#fff" letter-spacing="4" font-family="'Lexend',sans-serif">${esc(o.label||'')}</text>`,
 wallswitch:(st,o)=>`<rect x="-22" y="-60" width="44" height="60" rx="5" fill="#f4f6fb" ${ow}/><circle cx="0" cy="-38" r="8" fill="${st.on?'#e74c3c':'#c3ccd8'}" ${ow}/><text y="-10" text-anchor="middle" font-size="9" fill="${OL}" font-family="sans-serif">${esc(o.label||'')}</text>`,
 trashcan:(st,o)=>`<path d="M-20 0l-4-50h48l-4 50z" fill="#8892a6" ${ow}/><rect x="-26" y="-58" width="52" height="9" rx="3" fill="#6c7385" ${ow}/><path d="M-8 -40v32M0 -40v32M8 -40v32" stroke="#6c7385" stroke-width="2"/>`,
 whiteboard:(st,o)=>`<rect x="-140" y="-150" width="280" height="150" rx="6" fill="#d9dde6" ${ow}/><rect x="-132" y="-142" width="264" height="134" fill="#fbfcff"/>${st.text?`<text x="-110" y="-90" font-family="'Lexend',sans-serif" font-size="26" fill="#2a63c4">${esc(st.text)}</text>`:'<path d="M-110 -110h120M-110 -84h170M-110 -58h90" stroke="#c9d3e6" stroke-width="5"/>'}<rect x="-120" y="-8" width="240" height="6" fill="#a3acbd" ${ow}/>`,
 cushion:(st,o)=>``,
};
function fixSvg(type,st={},o={}){const f=FIX[type];return f?f(st,o):''}

// ---------------- 背景 ----------------
// 1000 x 600。床(地面)は y=330 付近から。
function wallFloor(wall,floor,o={}){return `<rect width="1000" height="340" fill="${wall}"/>${o.pattern||''}<rect y="330" width="1000" height="270" fill="${floor}"/><path d="M0 330h1000" stroke="${shade(floor,-.3)}" stroke-width="4"/>${[...Array(9)].map((_,i)=>`<path d="M${i*125-60} 600L${300+i*50} 330" stroke="${shade(floor,-.08)}" stroke-width="2" opacity=".7"/>`).join('')}<rect y="318" width="1000" height="14" fill="${shade(wall,-.15)}"/>`}
const BG={
 living:()=>wallFloor('#f6e7d0','#d8b48a',{pattern:`<path d="M0 60h1000" stroke="#ead6b6" stroke-width="3"/><rect x="420" y="96" width="120" height="84" fill="#fff" stroke="${OL}" stroke-width="2.2"/><path d="M430 170l30-36l24 22l16-14l30 28z" fill="#9bd18c"/><ellipse cx="560" cy="560" rx="200" ry="34" fill="#c46a5a" opacity=".55"/>`}),
 kitchen:()=>wallFloor('#eef4ee','#cfd8dc',{pattern:`${[...Array(26)].map((_,i)=>`<path d="M${i*40} 120v200" stroke="#dbe6db" stroke-width="2"/>`).join('')}${[...Array(6)].map((_,i)=>`<path d="M0 ${130+i*40}h1000" stroke="#dbe6db" stroke-width="2"/>`).join('')}<rect x="540" y="60" width="300" height="70" rx="4" fill="#d9c3a3" stroke="${OL}" stroke-width="2.2"/><path d="M690 60v70" stroke="${OL}" stroke-width="2"/>`}),
 bedroom:(st)=>wallFloor('#e6e1f2','#c9b49a',{pattern:`<path d="M0 0h1000v40h-1000z" fill="#d7d0ea" opacity=".6"/>`}),
 park:()=>`<defs><linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd6ff"/><stop offset="1" stop-color="#dff3ff"/></linearGradient></defs><rect width="1000" height="600" fill="url(#sky1)"/><circle cx="880" cy="80" r="40" fill="#fff3b0"/><g fill="#fff" opacity=".95"><ellipse cx="180" cy="90" rx="60" ry="20"/><ellipse cx="220" cy="76" rx="40" ry="22"/><ellipse cx="620" cy="60" rx="50" ry="16"/></g><path d="M0 280q250-60 500 0t500-10v330h-1000z" fill="#a6d98e"/><rect y="320" width="1000" height="280" fill="#8fcf74"/><path d="M0 470q300-40 520 10t480-20v60q-240 30-480 0t-520 0z" fill="#e8d3a8" opacity=".9"/>`,
 hotel:()=>wallFloor('#efe3cf','#c9b08a',{pattern:`<rect x="0" y="0" width="1000" height="26" fill="#7a5a3a"/>${[...Array(9)].map((_,i)=>`<rect x="${20+i*110}" y="40" width="10" height="320" fill="#e2d2b6"/>`).join('')}<g transform="translate(560 70)"><path d="M0 0v24" stroke="#b8963e" stroke-width="3"/><path d="M-60 40q60-30 120 0" fill="none" stroke="#b8963e" stroke-width="3"/>${[-48,-24,0,24,48].map(x=>`<path d="M${x} 32v14" stroke="#b8963e" stroke-width="2"/><circle cx="${x}" cy="52" r="7" fill="#fff3b0" stroke="#b8963e" stroke-width="2"/>`).join('')}</g><rect x="700" y="110" width="150" height="100" fill="#9cc3d9" stroke="#b8963e" stroke-width="6"/><path d="M700 180q40-30 80-10q40 20 70-10v50h-150z" fill="#5a8fc9"/><text x="250" y="130" text-anchor="middle" fill="#7a5a3a" font-size="26" font-weight="700" letter-spacing="6" font-family="'Lexend',sans-serif">HARBOR HOTEL</text>`}),
 airport:()=>wallFloor('#dfe7f1','#c3ccd8',{pattern:`<rect x="0" y="40" width="1000" height="230" fill="#bcd8f1"/>${[...Array(6)].map((_,i)=>`<rect x="${i*170}" y="40" width="8" height="230" fill="#8892a6"/>`).join('')}<rect x="0" y="40" width="1000" height="8" fill="#8892a6"/><rect x="0" y="262" width="1000" height="10" fill="#8892a6"/><path d="M590 200h260q20 0 30 10l-30 6h-260z" fill="#fff" stroke="#8892a6" stroke-width="2"/><path d="M700 200l-50-50h30l60 50zM700 216l-40 40h28l50-40z" fill="#e9eef5" stroke="#8892a6" stroke-width="2"/><path d="M600 200l-20-26h16l20 26z" fill="#2a63c4"/><path d="M0 250h1000" stroke="#9aa3b5" stroke-width="2"/>`}),
 entrance:()=>wallFloor('#f3ead8','#b9874f',{pattern:`<rect x="0" y="300" width="1000" height="40" fill="#d8c4a0"/><rect x="380" y="70" width="110" height="80" fill="#fff" stroke="${OL}" stroke-width="2.2"/><path d="M390 140q20-40 40-10q16-26 50 10z" fill="#f28bb0"/><path d="M0 330h1000" stroke="#9a7450" stroke-width="6"/>`}),
 bathroom:()=>wallFloor('#e3f1f7','#d6dde6',{pattern:`${[...Array(26)].map((_,i)=>`<path d="M${i*40} 0v330" stroke="#cfe3ee" stroke-width="2"/>`).join('')}${[...Array(8)].map((_,i)=>`<path d="M0 ${i*42}h1000" stroke="#cfe3ee" stroke-width="2"/>`).join('')}`}),
 hospital:()=>wallFloor('#eef4f2','#cfd8dc',{pattern:`<rect x="0" y="230" width="1000" height="16" fill="#8fd1a8"/><rect x="60" y="60" width="140" height="70" rx="6" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M130 72v46M107 95h46" stroke="#e74c3c" stroke-width="12"/><text x="420" y="80" font-size="22" font-weight="700" fill="#1f8455" letter-spacing="3" font-family="'Lexend',sans-serif">GREEN CLINIC</text>`}),
 pharmacy:()=>wallFloor('#f2f6ee','#d8dfd0',{pattern:`<rect x="0" y="0" width="1000" height="40" fill="#1f8455"/><text x="500" y="28" text-anchor="middle" font-size="20" font-weight="700" fill="#fff" letter-spacing="6" font-family="'Lexend',sans-serif">PHARMACY</text><path d="M60 100h60M90 70v60" stroke="#1f8455" stroke-width="16"/>`}),
 library:()=>wallFloor('#efe6d6','#a8794f',{pattern:`<rect x="0" y="0" width="1000" height="30" fill="#7a5a3a"/><rect x="430" y="60" width="140" height="190" rx="70" fill="#cfe9ff" stroke="#7a5a3a" stroke-width="6"/><path d="M500 60v190M430 160h140" stroke="#7a5a3a" stroke-width="4"/><text x="790" y="90" font-size="16" fill="#7a5a3a" font-family="'Lexend',sans-serif">QUIET, PLEASE</text>`}),
 postoffice:()=>wallFloor('#f6efe2','#c9b08a',{pattern:`<rect x="0" y="0" width="1000" height="36" fill="#d9473b"/><text x="500" y="26" text-anchor="middle" font-size="20" font-weight="700" fill="#fff" letter-spacing="6" font-family="'Lexend',sans-serif">POST OFFICE</text><rect x="720" y="80" width="200" height="120" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M740 110h160M740 140h120M740 170h140" stroke="#c9d3e6" stroke-width="5"/>`}),
 security:()=>wallFloor('#e6ebf2','#c3ccd8',{pattern:`<rect x="0" y="40" width="1000" height="40" fill="#2a63c4"/><text x="500" y="68" text-anchor="middle" font-size="20" font-weight="700" fill="#fff" letter-spacing="4" font-family="'Lexend',sans-serif">SECURITY CHECK</text><rect x="760" y="110" width="180" height="110" rx="6" fill="#fff" stroke="${OL}" stroke-width="2"/><text x="850" y="140" text-anchor="middle" font-size="13" font-weight="700" fill="#d9473b" font-family="'Lexend',sans-serif">NO LIQUIDS</text><text x="850" y="160" text-anchor="middle" font-size="12" fill="${OL}" font-family="'Lexend',sans-serif">OVER 100 ML</text><path d="M820 190h60" stroke="#d9473b" stroke-width="4"/>`}),
 plane:()=>`<rect width="1000" height="600" fill="#eef1f5"/><path d="M0 0h1000v120q-500 40-1000 0z" fill="#dfe5ee"/>${[...Array(6)].map((_,i)=>`<rect x="${90+i*160}" y="150" width="56" height="78" rx="26" fill="#bfe6ff" stroke="#9aa3b5" stroke-width="5"/><path d="M${100+i*160} 210q18-14 36 0" stroke="#fff" stroke-width="5" fill="none"/>`).join('')}<rect y="330" width="1000" height="270" fill="#8892a6"/><path d="M0 330h1000" stroke="#5a6b8c" stroke-width="5"/><rect y="440" width="1000" height="160" fill="#7a8396"/>`,
 hotelroom:()=>wallFloor('#f3e9dc','#a9886a',{pattern:`<rect x="60" y="80" width="180" height="140" fill="#26305a" stroke="#b8963e" stroke-width="6"/>${[...Array(12)].map((_,i)=>`<circle cx="${80+(i*37)%160}" cy="${100+(i*29)%100}" r="2" fill="#fff3b0"/>`).join('')}<path d="M150 80v140" stroke="#b8963e" stroke-width="4"/><rect x="420" y="90" width="120" height="90" fill="#e6c79a" stroke="#b8963e" stroke-width="5"/>`}),
 touristinfo:()=>wallFloor('#eaf3fb','#c9d3e0',{pattern:`<rect x="0" y="0" width="1000" height="40" fill="#f2b33d"/><text x="500" y="28" text-anchor="middle" font-size="20" font-weight="700" fill="${OL}" letter-spacing="4" font-family="'Lexend',sans-serif">i TOURIST INFORMATION</text><rect x="740" y="80" width="200" height="140" fill="#9cc3d9" stroke="${OL}" stroke-width="2"/><path d="M740 190l50-60l40 40l30-30l80 70z" fill="#6a8f5a"/>`}),
 subway:()=>`<rect width="1000" height="600" fill="#d6dce6"/><rect width="1000" height="60" fill="#3c4250"/><rect y="60" width="1000" height="270" fill="#e9eef5"/>${[...Array(25)].map((_,i)=>`<rect x="${i*40}" y="60" width="38" height="270" fill="${i%2?'#e9eef5':'#e1e8f0'}"/>`).join('')}<rect y="330" width="1000" height="270" fill="#b9c3cf"/><path d="M0 330h1000" stroke="#7a8396" stroke-width="5"/><text x="840" y="42" font-size="20" font-weight="700" fill="#fff" font-family="'Lexend',sans-serif">M  CITY HALL</text>`,
 rentacar:()=>wallFloor('#eef1f5','#9aa3b5',{pattern:`<rect x="0" y="0" width="1000" height="40" fill="#e98a4a"/><text x="500" y="28" text-anchor="middle" font-size="20" font-weight="700" fill="#fff" letter-spacing="4" font-family="'Lexend',sans-serif">RENT-A-CAR</text><rect x="520" y="70" width="440" height="200" fill="#bcd8f1" stroke="#8892a6" stroke-width="6"/><path d="M740 70v200" stroke="#8892a6" stroke-width="5"/>`}),
 bank:()=>wallFloor('#f1ede4','#cfc6b4',{pattern:`${[...Array(5)].map((_,i)=>`<rect x="${60+i*200}" y="40" width="30" height="290" fill="#e2dccd" stroke="#c9bfa8" stroke-width="2"/>`).join('')}<text x="500" y="70" text-anchor="middle" font-size="24" font-weight="700" fill="#7a5a3a" letter-spacing="6" font-family="'Lexend',sans-serif">CITY BANK</text>`}),
 clothes:()=>wallFloor('#f7eef0','#d8c4b4',{pattern:`<rect x="0" y="0" width="1000" height="36" fill="#2f2a26"/><text x="500" y="26" text-anchor="middle" font-size="18" font-weight="700" fill="#f5e6c8" letter-spacing="6" font-family="'Lexend',sans-serif">STYLE & CO.</text><text x="160" y="120" font-size="40" font-weight="700" fill="#e7768f" font-family="'Lexend',sans-serif">SALE</text>`}),
 salon:()=>wallFloor('#f0f4f7','#e3d8cc',{pattern:`${[...Array(10)].map((_,i)=>`<rect x="${i*100+40}" y="40" width="20" height="290" fill="#e6edf2"/>`).join('')}<text x="500" y="70" text-anchor="middle" font-size="22" font-weight="700" fill="#8e44ad" letter-spacing="4" font-family="'Lexend',sans-serif">HAIR STUDIO</text>`}),
 cinema:()=>`<rect width="1000" height="600" fill="#2f2a4a"/><rect y="0" width="1000" height="330" fill="#3c3460"/>${[...Array(14)].map((_,i)=>`<circle cx="${30+i*72}" cy="20" r="6" fill="#f5c542"/>`).join('')}<rect y="330" width="1000" height="270" fill="#5a2a3a"/><path d="M0 330h1000" stroke="#2f1a24" stroke-width="5"/>${[...Array(12)].map((_,i)=>`<path d="M${i*90} 600L${300+i*40} 330" stroke="#4a2030" stroke-width="2"/>`).join('')}`,
 gym:()=>wallFloor('#e9eef5','#5a6b8c',{pattern:`<rect x="0" y="0" width="1000" height="40" fill="#1d2433"/><text x="500" y="28" text-anchor="middle" font-size="20" font-weight="700" fill="#7fe08a" letter-spacing="6" font-family="'Lexend',sans-serif">FIT GYM</text><rect x="60" y="80" width="880" height="160" fill="#cfe3f5" stroke="#8892a6" stroke-width="4"/><path d="M280 80v160M500 80v160M720 80v160" stroke="#8892a6" stroke-width="4"/>`}),
 party:()=>wallFloor('#fdf3e1','#c99b6b',{pattern:`${[...Array(20)].map((_,i)=>`<path d="M${i*52} 40l26 30l26-30" fill="${['#e74c3c','#f5c542','#3498db','#2ecc71'][i%4]}" stroke="${OL}" stroke-width="1.5"/>`).join('')}<path d="M0 40h1000" stroke="${OL}" stroke-width="2"/><text x="500" y="140" text-anchor="middle" font-size="30" font-weight="700" fill="#e98a4a" font-family="'Lexend',sans-serif">WELCOME PARTY</text>`}),
 meetingroom:()=>wallFloor('#eef1f5','#b9c3cf',{pattern:`<rect x="780" y="70" width="180" height="170" fill="#d6ecff" stroke="${OL}" stroke-width="2.2"/><path d="M870 70v170" stroke="#fff" stroke-width="4"/><rect x="40" y="90" width="12" height="160" fill="#d6dce6"/>`}),
 reception:()=>wallFloor('#f2f0eb','#cbc3b5',{pattern:`<rect x="0" y="0" width="1000" height="20" fill="#1f8455"/>${[...Array(8)].map((_,i)=>`<rect x="${i*125}" y="20" width="4" height="310" fill="#e2ddd2"/>`).join('')}`}),
 onlinemtg:()=>wallFloor('#eef1f5','#b9a58a',{pattern:`<rect x="60" y="80" width="160" height="120" fill="#d6ecff" stroke="${OL}" stroke-width="2.2"/><path d="M140 80v120" stroke="#fff" stroke-width="4"/><rect x="820" y="100" width="100" height="140" rx="4" fill="#e9dcc6" stroke="${OL}" stroke-width="2"/><path d="M840 130h60M840 160h60M840 190h60" stroke="#a0754e" stroke-width="5"/>`}),
 negotiation:()=>wallFloor('#ece8e2','#8a6a52',{pattern:`<rect x="60" y="60" width="220" height="160" fill="#bcd8f1" stroke="#7a5a3a" stroke-width="6"/><path d="M60 180l60-50l50 30l40-30l70 50v40h-220z" fill="#8892a6"/><rect x="760" y="80" width="160" height="110" fill="#fff" stroke="#7a5a3a" stroke-width="5"/><path d="M780 170l30-30l20 14l30-40l40 56" stroke="#1f8455" stroke-width="4" fill="none"/>`}),
 presentation:()=>wallFloor('#eef0f4','#8892a6',{pattern:`<rect x="0" y="0" width="1000" height="30" fill="#3c4250"/>${[...Array(5)].map((_,i)=>`<circle cx="${100+i*200}" cy="16" r="6" fill="#fff3b0"/>`).join('')}`}),
 phonedesk:()=>wallFloor('#eef3f8','#b9c3cf',{pattern:`<rect x="80" y="70" width="170" height="130" fill="#d6ecff" stroke="${OL}" stroke-width="2.2"/><path d="M165 70v130" stroke="#fff" stroke-width="4"/><rect x="700" y="60" width="220" height="140" fill="#fff" stroke="${OL}" stroke-width="2"/><text x="810" y="90" text-anchor="middle" font-size="14" font-weight="700" fill="#2a63c4" font-family="'Lexend',sans-serif">CUSTOMER SUPPORT</text><path d="M720 110h180M720 140h140M720 170h160" stroke="#c9d3e6" stroke-width="5"/>`}),
 cafe:()=>wallFloor('#f2e1c8','#a8794f',{pattern:`<rect x="0" y="0" width="1000" height="30" fill="#6b4a32"/>${[...Array(5)].map((_,i)=>`<path d="M${120+i*190} 30v40" stroke="${OL}" stroke-width="2"/><path d="M${100+i*190} 70h40l-8 18h-24z" fill="#f5c542" stroke="${OL}" stroke-width="2"/><circle cx="${120+i*190}" cy="96" r="6" fill="#fff3b0"/>`).join('')}<rect x="60" y="120" width="140" height="90" rx="6" fill="#2f2a26" stroke="${OL}" stroke-width="2.2"/><text x="130" y="152" text-anchor="middle" fill="#f5e6c8" font-size="16" font-family="'Lexend',sans-serif">TODAY</text><text x="130" y="178" text-anchor="middle" fill="#f5c542" font-size="14" font-family="'Lexend',sans-serif">Latte  Cake</text>`}),
 school:()=>wallFloor('#f1ead8','#c99a63',{pattern:`<rect x="840" y="90" width="110" height="150" fill="#bfe6ff" stroke="${OL}" stroke-width="2.2"/><path d="M895 90v150M840 165h110" stroke="#fff" stroke-width="4"/>`}),
 market:()=>wallFloor('#f4f4ee','#d9dee4',{pattern:`<rect x="0" y="20" width="1000" height="34" fill="#5aa83a"/><text x="500" y="44" text-anchor="middle" fill="#fff" font-size="20" font-family="'Lexend',sans-serif" letter-spacing="6">FRESH MARKET</text>${[...Array(12)].map((_,i)=>`<rect x="${i*84}" y="330" width="42" height="270" fill="#e9edf1" opacity=".6"/>`).join('')}`}),
 station:()=>`<rect width="1000" height="600" fill="#dfe8f0"/><rect width="1000" height="40" fill="#5a6b80"/><rect x="0" y="40" width="1000" height="16" fill="#8a9bb0"/><rect y="300" width="1000" height="36" fill="#7b8794"/><rect y="336" width="1000" height="264" fill="#c8ccd2"/><path d="M0 352h1000" stroke="#f5c542" stroke-width="10" stroke-dasharray="26 10"/><rect x="760" y="90" width="180" height="56" rx="6" fill="#2b2f38" stroke="${OL}" stroke-width="2.2"/><text x="850" y="126" text-anchor="middle" fill="#f5c542" font-size="18" font-family="'Lexend',sans-serif">For: Central</text>`,
 office:()=>wallFloor('#e9eef5','#b9c3cf',{pattern:`${[...Array(4)].map((_,i)=>`<rect x="${80+i*230}" y="70" width="170" height="130" fill="#d6ecff" stroke="${OL}" stroke-width="2.2"/><path d="M${165+i*230} 70v130" stroke="#fff" stroke-width="4"/>`).join('')}`}),
 restaurant:()=>wallFloor('#5a3a3a','#8a5a3c',{pattern:`<path d="M0 0h1000v250h-1000z" fill="#6e4040"/>${[...Array(6)].map((_,i)=>`<path d="M${80+i*170} 250v-160q0-20 30-20t30 20v160" fill="#f6d78a" opacity=".22"/>`).join('')}${[...Array(5)].map((_,i)=>`<path d="M${170+i*170} 0v60" stroke="#c9a27a" stroke-width="2"/><circle cx="${170+i*170}" cy="70" r="12" fill="#ffe08a" opacity=".9"/>`).join('')}`}),
 beach:()=>`<defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc6ff"/><stop offset="1" stop-color="#d6f0ff"/></linearGradient></defs><rect width="1000" height="600" fill="url(#sky2)"/><circle cx="160" cy="80" r="44" fill="#fff3b0"/><rect y="200" width="1000" height="160" fill="#3aa0db"/><path d="M0 200h1000" stroke="#2b7fb6" stroke-width="3"/>${[...Array(8)].map((_,i)=>`<path class="wave" d="M${i*130-20} ${250+(i%3)*30}q20-10 40 0t40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`).join('')}<path d="M0 360q200-26 500 0t500-6v246h-1000z" fill="#f3dca6"/><path d="M0 360q200-26 500 0t500-6" stroke="#fff" stroke-width="6" fill="none" opacity=".8"/>`,
 street:()=>`<rect width="1000" height="600" fill="#cfe8ff"/><rect y="330" width="1000" height="60" fill="#d9d2c4"/><rect y="390" width="1000" height="130" fill="#5b616d"/><path d="M0 455h1000" stroke="#f5c542" stroke-width="5" stroke-dasharray="40 30"/><rect y="520" width="1000" height="80" fill="#d9d2c4"/><path d="M0 390h1000M0 520h1000" stroke="${OL}" stroke-width="2.2"/>`,
};
function bgSvg(k,st){return (BG[k]||BG.living)(st)}

// ===== うごかす英語ワールド: 英文エンジン =====
// 単語を機械的につなぐのではなく、動作ごとに用意した文型に「主語・目的語・場所」を入れて作る。
// 主語の切り替え: noun(The man) / pron(He) / I / you
const PJ={on:'の上',in:'の中',into:'の中',under:'の下','next to':'の横',near:'の近く','in front of':'の前',behind:'の後ろ',between:'の間',at:''};
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function subj(e,mode){
 if(!e||e.user||mode==='I')return {en:'I',be:'am',ja:'私',poss:'my',self:true};
 if(mode==='you')return {en:'you',be:'are',ja:'あなた',poss:'your'};
 if(mode==='pron'&&e.k==='person')return {en:e.pron,be:'is',ja:e.pron==='he'?'彼':'彼女',poss:e.pron==='he'?'his':'her'};
 if(mode==='pron')return {en:'it',be:'is',ja:e.ja,poss:'its'};
 return {en:e.en,be:'is',ja:e.ja,poss:e.k==='person'?(e.pron==='he'?'his':'her'):'its'}}
const isAre=o=>o&&o.plural?'are':'is';
const T=(s)=>cap(s.replace(/\s+/g,' ').trim());
const isAnimate=e=>e&&(e.k==='person'||e.k==='animal');
// 動作の文型: prog(進行形) / past(過去形) / state(終わったあとの状態)。それぞれ en と ja を返す
const VB={
 sit:{prog:(S,e)=>[`${S.en} ${S.be} sitting ${e.p||'on'} ${e.r.en}.`,`${S.ja}は${e.r.ja}に座っています。`],past:(S,e)=>[`${S.en} sat ${e.p||'on'} ${e.r.en}.`,`${S.ja}は${e.r.ja}に座りました。`]},
 sitfloor:{prog:(S,e)=>[`${S.en} ${S.be} sitting on ${e.r.en}.`,`${S.ja}は${e.r.ja}の上に座っています。`],past:(S,e)=>[`${S.en} sat on ${e.r.en}.`,`${S.ja}は${e.r.ja}の上に座りました。`]},
 lie:{prog:(S,e)=>[`${S.en} ${S.be} lying ${e.p||'on'} ${e.r.en}.`,`${S.ja}は${e.r.ja}に横になっています。`],past:(S,e)=>[`${S.en} lay down ${e.p||'on'} ${e.r.en}.`,`${S.ja}は${e.r.ja}に横になりました。`]},
 sleep:{prog:(S,e)=>[`${S.en} ${S.be} sleeping${e.r?` ${e.p||'on'} ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+(PJ[e.p||'on']||'')+'で':''}寝ています。`],past:(S,e)=>[`${S.en} slept${e.r?` ${e.p||'on'} ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+(PJ[e.p||'on']||'')+'で':''}寝ました。`]},
 stand:{prog:(S)=>[`${S.en} ${S.be} standing up.`,`${S.ja}は立ち上がるところです。`],past:(S)=>[`${S.en} stood up.`,`${S.ja}は立ち上がりました。`],state:(S)=>[`${S.en} ${S.be} standing.`,`${S.ja}は立っています。`]},
 walk:{prog:(S,e)=>[`${S.en} ${S.be} walking${e.r?` to ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'のほうへ':''}歩いています。`],past:(S,e)=>[`${S.en} walked${e.r?` to ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'まで':''}歩きました。`]},
 run:{prog:(S,e)=>[`${S.en} ${S.be} running${e.r?` to ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'のほうへ':''}走っています。`],past:(S,e)=>[`${S.en} ran${e.r?` to ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'まで':''}走りました。`]},
 go:{// 場所へ移動(人・動物)。state は「〜にいる」
  prog:(S,e)=>[`${S.en} ${S.be} going ${e.p} ${e.r.en}.`,`${S.ja}は${e.r.ja}${PJ[e.p]}へ移動しています。`],
  past:(S,e)=>[`${S.en} went ${e.p} ${e.r.en}.`,`${S.ja}は${e.r.ja}${PJ[e.p]}へ移動しました。`],
  state:(S,e)=>[`${S.en} ${S.be} ${e.p} ${e.r.en}.`,`${S.ja}は${e.r.ja}${PJ[e.p]}にいます。`]},
 jumpon:{prog:(S,e)=>[`${S.en} ${S.be} jumping onto ${e.r.en}.`,`${S.ja}は${e.r.ja}に飛び乗るところです。`],past:(S,e)=>[`${S.en} jumped onto ${e.r.en}.`,`${S.ja}は${e.r.ja}に飛び乗りました。`],state:(S,e)=>[`${S.en} ${S.be} on ${e.r.en}.`,`${S.ja}は${e.r.ja}の上にいます。`]},
 sitA:{prog:(S)=>[`${S.en} ${S.be} sitting.`,`${S.ja}はおすわりしています。`],past:(S)=>[`${S.en} sat down.`,`${S.ja}はおすわりしました。`]},
 liedown:{prog:(S)=>[`${S.en} ${S.be} lying down.`,`${S.ja}はふせています。`],past:(S)=>[`${S.en} lay down.`,`${S.ja}はふせました。`]},
 putdown:{prog:(S,e)=>[`${S.en} ${S.be} putting ${e.o.en} on the ${e.ground||'floor'}.`,`${S.ja}は${e.o.ja}を${e.groundja||'床'}に置いています。`],past:(S,e)=>[`${S.en} put ${e.o.en} on the ${e.ground||'floor'}.`,`${S.ja}は${e.o.ja}を${e.groundja||'床'}に置きました。`],state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} on the ${e.ground||'floor'}.`,`${e.o.ja}は${e.groundja||'床'}の上にあります。`]},
 meeting:{prog:(S)=>[`${S.en} ${S.be} starting the meeting.`,`${S.ja}は会議を始めています。`],past:(S)=>[`${S.en} started the meeting.`,`${S.ja}は会議を始めました。`]},
 jump:{prog:(S)=>[`${S.en} ${S.be} jumping.`,`${S.ja}はジャンプしています。`],past:(S)=>[`${S.en} jumped.`,`${S.ja}はジャンプしました。`]},
 wave:{prog:(S)=>[`${S.en} ${S.be} waving.`,`${S.ja}は手をふっています。`],past:(S)=>[`${S.en} waved.`,`${S.ja}は手をふりました。`]},
 raise:{prog:(S)=>[`${S.en} ${S.be} raising ${S.poss} hand.`,`${S.ja}は手を挙げています。`],past:(S)=>[`${S.en} raised ${S.poss} hand.`,`${S.ja}は手を挙げました。`]},
 bark:{prog:(S)=>[`${S.en} ${S.be} barking.`,`${S.ja}はほえています。`],past:(S)=>[`${S.en} barked.`,`${S.ja}はほえました。`]},
 swim:{prog:(S,e)=>[`${S.en} ${S.be} swimming in ${e.r.en}.`,`${S.ja}は${e.r.ja}で泳いでいます。`],past:(S,e)=>[`${S.en} swam in ${e.r.en}.`,`${S.ja}は${e.r.ja}で泳ぎました。`]},
 pickup:{prog:(S,e)=>[`${S.en} ${S.be} picking up ${e.o.en}.`,`${S.ja}は${e.o.ja}を手に取っています。`],past:(S,e)=>[`${S.en} picked up ${e.o.en}.`,`${S.ja}は${e.o.ja}を手に取りました。`],
  state:(S,e)=>[`${S.en} ${S.be} holding ${e.o.en}.`,`${S.ja}は${e.o.ja}を持っています。`]},
 takeout:{prog:(S,e)=>[`${S.en} ${S.be} taking ${e.o.ind||e.o.en} out of ${e.r.en}.`,`${S.ja}は${e.r.ja}から${e.o.ja}を取り出しています。`],past:(S,e)=>[`${S.en} took ${e.o.ind||e.o.en} out of ${e.r.en}.`,`${S.ja}は${e.r.ja}から${e.o.ja}を取り出しました。`],
  state:(S,e)=>[`${S.en} ${S.be} holding ${e.o.en}.`,`${S.ja}は${e.o.ja}を持っています。`]},
 put:{prog:(S,e)=>[`${S.en} ${S.be} putting ${e.o.en}${e.back?' back':''} ${e.p==='in'?'into':e.p} ${e.r.en}.`,e.back?`${S.ja}は${e.o.ja}を${e.r.ja}にもどしています。`:`${S.ja}は${e.o.ja}を${e.r.ja}${PJ[e.p]}に${e.p==='in'?'入れています':'置いています'}。`],
  past:(S,e)=>[`${S.en} put ${e.o.en}${e.back?' back':''} ${e.p==='in'?'into':e.p} ${e.r.en}.`,e.back?`${S.ja}は${e.o.ja}を${e.r.ja}にもどしました。`:`${S.ja}は${e.o.ja}を${e.r.ja}${PJ[e.p]}に${e.p==='in'?'入れました':'置きました'}。`],
  state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} ${e.p} ${e.r.en}.`,`${e.o.ja}は${e.r.ja}${PJ[e.p]}にあります。`]},
 place:{// ユーザー自身が物を動かした(人物が運んだことにはしない)
  prog:(S,e)=>[`${S.en} ${S.be} putting ${e.o.en} ${e.p==='in'?'into':e.p} ${e.r.en}.`,`${S.ja}は${e.o.ja}を${e.r.ja}${PJ[e.p]}に${e.p==='in'?'入れています':'置いています'}。`],
  past:(S,e)=>[`${S.en} put ${e.o.en} ${e.p==='in'?'into':e.p} ${e.r.en}.`,`${S.ja}は${e.o.ja}を${e.r.ja}${PJ[e.p]}に${e.p==='in'?'入れました':'置きました'}。`],
  state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} ${e.p} ${e.r.en}.`,`${e.o.ja}は${e.r.ja}${PJ[e.p]}にあります。`]},
 give:{prog:(S,e)=>[`${S.en} ${S.be} giving ${e.o.en} to ${e.r.en}.`,`${S.ja}は${e.r.ja}に${e.o.ja}を渡しています。`],past:(S,e)=>[`${S.en} gave ${e.o.en} to ${e.r.en}.`,`${S.ja}は${e.r.ja}に${e.o.ja}を渡しました。`],
  state:(S,e)=>[`${cap(e.r.en)} has ${e.o.en}.`,`${e.r.ja}が${e.o.ja}を持っています。`]},
 talkto:{prog:(S,e)=>[`${S.en} ${S.be} going over to talk to ${e.r.en}.`,`${S.ja}は${e.r.ja}に話しかけに行くところです。`],past:(S,e)=>[`${S.en} went over to talk to ${e.r.en}.`,`${S.ja}は${e.r.ja}に話しかけに行きました。`]},
 ring:{prog:(S,e)=>[`${S.en} ${S.be} ringing ${e.o.en}.`,`${S.ja}は${e.o.ja}を鳴らしています。`],past:(S,e)=>[`${S.en} rang ${e.o.en}.`,`${S.ja}は${e.o.ja}を鳴らしました。`]},
 hangup:{prog:(S,e)=>[`${S.en} ${S.be} hanging up the phone.`,`${S.ja}は電話を切っています。`],past:(S,e)=>[`${S.en} hung up the phone.`,`${S.ja}は電話を切りました。`]},
 show:{prog:(S,e)=>[`${S.en} ${S.be} showing ${e.o.en} to ${e.r.en}.`,`${S.ja}は${e.r.ja}に${e.o.ja}を見せています。`],past:(S,e)=>[`${S.en} showed ${e.o.en} to ${e.r.en}.`,`${S.ja}は${e.r.ja}に${e.o.ja}を見せました。`]},
 read:{prog:(S,e)=>e.o.lookAt?[`${S.en} ${S.be} looking at ${e.o.en}.`,`${S.ja}は${e.o.ja}を見ています。`]:[`${S.en} ${S.be} reading ${e.o.en}.`,`${S.ja}は${e.o.ja}を読んでいます。`],
  past:(S,e)=>e.o.lookAt?[`${S.en} looked at ${e.o.en}.`,`${S.ja}は${e.o.ja}を見ました。`]:[`${S.en} read ${e.o.en}.`,`${S.ja}は${e.o.ja}を読みました。`]},
 open:{prog:(S,e)=>[`${S.en} ${S.be} opening ${e.o.en}.`,`${S.ja}は${e.o.ja}を${e.o.k==='prop'?'開いて':'開けて'}います。`],past:(S,e)=>[`${S.en} opened ${e.o.en}.`,`${S.ja}は${e.o.ja}を${e.o.k==='prop'?'開き':'開け'}ました。`],state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} open.`,`${e.o.ja}は開いています。`]},
 close:{prog:(S,e)=>[`${S.en} ${S.be} closing ${e.o.en}.`,`${S.ja}は${e.o.ja}を${e.o.k==='prop'?'閉じて':'閉めて'}います。`],past:(S,e)=>[`${S.en} closed ${e.o.en}.`,`${S.ja}は${e.o.ja}を${e.o.k==='prop'?'閉じ':'閉め'}ました。`],state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} closed.`,`${e.o.ja}は${e.o.k==='prop'?'閉じて':'閉まって'}います。`]},
 turnon:{prog:(S,e)=>[`${S.en} ${S.be} turning on ${e.o.en}.`,`${S.ja}は${e.o.ja}をつけています。`],past:(S,e)=>[`${S.en} turned on ${e.o.en}.`,`${S.ja}は${e.o.ja}をつけました。`],state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} on.`,`${e.o.ja}がついています。`]},
 turnoff:{prog:(S,e)=>[`${S.en} ${S.be} turning off ${e.o.en}.`,`${S.ja}は${e.o.ja}を消しています。`],past:(S,e)=>[`${S.en} turned off ${e.o.en}.`,`${S.ja}は${e.o.ja}を消しました。`],state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} off.`,`${e.o.ja}は消えています。`]},
 watch:{prog:(S,e)=>[`${S.en} ${S.be} watching TV.`,`${S.ja}はテレビを見ています。`],past:(S,e)=>[`${S.en} watched TV.`,`${S.ja}はテレビを見ました。`]},
 drink:{prog:(S,e)=>[`${S.en} ${S.be} drinking ${e.o.liq}.`,`${S.ja}は${e.o.liqja}を飲んでいます。`],past:(S,e)=>[`${S.en} drank ${e.o.liq}.`,`${S.ja}は${e.o.liqja}を飲みました。`]},
 eat:{prog:(S,e)=>[`${S.en} ${S.be} eating ${e.o.ind||e.o.en}.`,`${S.ja}は${e.o.ja}を食べています。`],past:(S,e)=>[`${S.en} ate ${e.o.ind||e.o.en}.`,`${S.ja}は${e.o.ja}を食べました。`]},
 pour:{prog:(S,e)=>[`${S.en} ${S.be} pouring water into ${e.r.en}.`,`${S.ja}は${e.r.ja}に水を注いでいます。`],past:(S,e)=>[`${S.en} poured water into ${e.r.en}.`,`${S.ja}は${e.r.ja}に水を注ぎました。`],state:(S,e)=>[`${cap(e.r.en)} is full.`,`${e.r.ja}は水でいっぱいです。`]},
 throw:{prog:(S,e)=>[`${S.en} ${S.be} throwing ${e.o.en}${e.r?` to ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'に':''}${e.o.ja}を投げています。`],past:(S,e)=>[`${S.en} threw ${e.o.en}${e.r?` to ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'に':''}${e.o.ja}を投げました。`]},
 catch:{prog:(S,e)=>[`${S.en} ${S.be} catching ${e.o.en}.`,`${S.ja}は${e.o.ja}をキャッチしています。`],past:(S,e)=>[`${S.en} caught ${e.o.en}.`,`${S.ja}は${e.o.ja}をキャッチしました。`]},
 write:{prog:(S,e)=>[`${S.en} ${S.be} writing ${e.p||'on'} ${e.r.en}.`,`${S.ja}は${e.r.ja}に字を書いています。`],past:(S,e)=>[`${S.en} wrote ${e.p||'on'} ${e.r.en}.`,`${S.ja}は${e.r.ja}に字を書きました。`]},
 use:{prog:(S,e)=>[`${S.en} ${S.be} using ${e.o.en}.`,`${S.ja}は${e.o.ja}を使っています。`],past:(S,e)=>[`${S.en} used ${e.o.en}.`,`${S.ja}は${e.o.ja}を使いました。`]},
 answer:{prog:(S,e)=>[`${S.en} ${S.be} answering the phone.`,`${S.ja}は電話に出ています。`],past:(S,e)=>[`${S.en} answered the phone.`,`${S.ja}は電話に出ました。`]},
 order:{prog:(S,e)=>[`${S.en} ${S.be} ordering ${e.o.ind}.`,`${S.ja}は${e.o.ja}を注文しています。`],past:(S,e)=>[`${S.en} ordered ${e.o.ind}.`,`${S.ja}は${e.o.ja}を注文しました。`]},
 pay:{prog:(S,e)=>[`${S.en} ${S.be} paying${e.r?` at ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'で':''}お金を払っています。`],past:(S,e)=>[`${S.en} paid${e.r?` at ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'で':''}お金を払いました。`]},
 bring:{prog:(S,e)=>[`${S.en} ${S.be} bringing ${e.o.en} to ${e.r.en}.`,`${S.ja}は${e.o.ja}を${e.r.ja}へ運んでいます。`],past:(S,e)=>[`${S.en} brought ${e.o.en} to ${e.r.en}.`,`${S.ja}は${e.o.ja}を${e.r.ja}へ運びました。`],
  state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} on ${e.r.en}.`,`${e.o.ja}は${e.r.ja}の上にあります。`]},
 board:{prog:(S,e)=>[`${S.en} ${S.be} getting on ${e.r.en}.`,`${S.ja}は${e.r.ja}に乗るところです。`],past:(S,e)=>[`${S.en} got on ${e.r.en}.`,`${S.ja}は${e.r.ja}に乗りました。`],state:(S,e)=>[`${S.en} ${S.be} on ${e.r.en}.`,`${S.ja}は${e.r.ja}に乗っています。`]},
 getoff:{prog:(S,e)=>[`${S.en} ${S.be} getting off ${e.r.en}.`,`${S.ja}は${e.r.ja}から降りるところです。`],past:(S,e)=>[`${S.en} got off ${e.r.en}.`,`${S.ja}は${e.r.ja}から降りました。`]},
 gothrough:{prog:(S,e)=>[`${S.en} ${S.be} going through ${e.r.en}.`,`${S.ja}は${e.r.ja}を通っています。`],past:(S,e)=>[`${S.en} went through ${e.r.en}.`,`${S.ja}は${e.r.ja}を通りました。`]},
 enter:{prog:(S,e)=>[`${S.en} ${S.be} going into ${e.r.en}.`,`${S.ja}は${e.r.ja}に入るところです。`],past:(S,e)=>[`${S.en} went into ${e.r.en}.`,`${S.ja}は${e.r.ja}に入りました。`],state:(S,e)=>[`${S.en} ${S.be} in ${e.r.en}.`,`${S.ja}は${e.r.ja}の中にいます。`]},
 exit:{prog:(S,e)=>[`${S.en} ${S.be} coming out of ${e.r.en}.`,`${S.ja}は${e.r.ja}から${e.r.art==='sea'?'上がる':'出てくる'}ところです。`],past:(S,e)=>[`${S.en} came out of ${e.r.en}.`,`${S.ja}は${e.r.ja}から${e.r.art==='sea'?'上がりました':'出てきました'}。`]},
 cross:{prog:(S,e)=>[`${S.en} ${S.be} crossing the street.`,`${S.ja}は道路をわたっています。`],past:(S,e)=>[`${S.en} crossed the street.`,`${S.ja}は道路をわたりました。`]},
 ride:{prog:(S,e)=>[`${S.en} ${S.be} riding ${e.o.en}${e.r?` to ${e.r.en}`:''}.`,`${S.ja}は${e.r?e.r.ja+'のほうへ':''}${e.o.ja}に乗って進んでいます。`],past:(S,e)=>[`${S.en} rode ${e.o.en}${e.r?` to ${e.r.en}`:''}.`,(e.r?`${S.ja}は${e.o.ja}で${e.r.ja}まで行きました。`:`${S.ja}は${e.o.ja}に乗りました。`)]},
 getonbike:{prog:(S,e)=>[`${S.en} ${S.be} getting on ${e.o.en}.`,`${S.ja}は${e.o.ja}に乗るところです。`],past:(S,e)=>[`${S.en} got on ${e.o.en}.`,`${S.ja}は${e.o.ja}に乗りました。`],state:(S,e)=>[`${S.en} ${S.be} on ${e.o.en}.`,`${S.ja}は${e.o.ja}に乗っています。`]},
 getoffbike:{prog:(S,e)=>[`${S.en} ${S.be} getting off ${e.o.en}.`,`${S.ja}は${e.o.ja}から降りるところです。`],past:(S,e)=>[`${S.en} got off ${e.o.en}.`,`${S.ja}は${e.o.ja}から降りました。`]},
 wear:{prog:(S,e)=>[`${S.en} ${S.be} putting on ${e.o.en}.`,`${S.ja}は${e.o.ja}を${(e.o.wearja||'身につけています').replace('ています','ているところです')}。`],past:(S,e)=>[`${S.en} put on ${e.o.en}.`,`${S.ja}は${e.o.ja}を${(e.o.wearja||'身につけています').replace('ています','ました')}。`],
  state:(S,e)=>[`${S.en} ${S.be} wearing ${e.o.en}.`,`${S.ja}は${e.o.ja}を${e.o.wearja||'身につけています'}。`]},
 takeoff:{prog:(S,e)=>[`${S.en} ${S.be} taking off ${e.o.en}.`,`${S.ja}は${e.o.ja}を外しているところです。`],past:(S,e)=>[`${S.en} took off ${e.o.en}.`,`${S.ja}は${e.o.ja}を外しました。`]},
 drive:{prog:(S,e)=>[`${S.en} ${S.be} driving ${e.o.en}.`,`${S.ja}は${e.o.ja}を運転しています。`],past:(S,e)=>[`${S.en} drove ${e.o.en}.`,`${S.ja}は${e.o.ja}を運転しました。`]},
 stopcar:{prog:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} stopping at the crosswalk.`,`${e.o.ja}が横断歩道の前で止まっています。`],past:(S,e)=>[`${cap(e.o.en)} stopped at the crosswalk.`,`${e.o.ja}は横断歩道の前で止まりました。`]},
 light:{prog:(S,e)=>[`The light is turning ${e.o.green?'green':'red'}.`,`信号が${e.o.green?'青':'赤'}に変わるところです。`],past:(S,e)=>[`The light turned ${e.o.green?'green':'red'}.`,`信号が${e.o.green?'青':'赤'}に変わりました。`],state:(S,e)=>[`The light is ${e.o.green?'green':'red'}.`,`信号は${e.o.green?'青':'赤'}です。`]},
 write_nb:{prog:(S,e)=>[`${S.en} ${S.be} writing in ${e.o.en}.`,`${S.ja}は${e.o.ja}に書いています。`],past:(S,e)=>[`${S.en} wrote in ${e.o.en}.`,`${S.ja}は${e.o.ja}に書きました。`]},
 fetch:{prog:(S,e)=>[`${S.en} ${S.be} bringing ${e.o.en} back.`,`${S.ja}は${e.o.ja}を持ってもどってきています。`],past:(S,e)=>[`${S.en} brought ${e.o.en} back.`,`${S.ja}は${e.o.ja}を持ってもどってきました。`]},
 arrive:{prog:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} arriving.`,`${e.o.ja}がまもなく到着します。`],past:(S,e)=>[`${cap(e.o.en)} arrived.`,`${e.o.ja}が到着しました。`],state:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} at the platform.`,`${e.o.ja}がホームに止まっています。`]},
 depart:{prog:(S,e)=>[`${cap(e.o.en)} ${isAre(e.o)} leaving.`,`${e.o.ja}が出発するところです。`],past:(S,e)=>[`${cap(e.o.en)} left.`,`${e.o.ja}が出発しました。`]},
};
// 文型の「何を学べるか」ラベル(苦手分析用)
// ストーリーの特別な動作: 文型をシーン側で持つ({S}=主語 {be}=be動詞 {Sja}=主語の日本語 {poss}=所有格)
const txFill=(t,S)=>String(t||'').replace(/\{S\}/g,S.en).replace(/\{be\}/g,S.be).replace(/\{Sja\}/g,S.ja).replace(/\{poss\}/g,S.poss);
VB.custom={prog:(S,e)=>[txFill(e.tx.prog[0],S),txFill(e.tx.prog[1],S)],past:(S,e)=>e.tx.past&&e.tx.past.length?[txFill(e.tx.past[0],S),txFill(e.tx.past[1],S)]:null,
 state:(S,e)=>e.tx.state?[txFill(e.tx.state[0],S),txFill(e.tx.state[1],S)]:null};
const VERB_TAG={meeting:'start',sitA:'sit',liedown:'lie down',putdown:'put',jumpon:'jump onto',sit:'sit',sitfloor:'sit',lie:'lie',sleep:'sleep',stand:'stand up',walk:'walk',run:'run',go:'go',jump:'jump',wave:'wave',raise:'raise',bark:'bark',swim:'swim',pickup:'pick up',takeout:'take out',put:'put',place:'put',give:'give',show:'show',read:'read',open:'open',close:'close',turnon:'turn on',turnoff:'turn off',watch:'watch',drink:'drink',eat:'eat',pour:'pour',throw:'throw',catch:'catch',write:'write',use:'use',answer:'answer',order:'order',pay:'pay',bring:'bring',board:'get on',getoff:'get off',gothrough:'go through',enter:'go into',exit:'come out of',cross:'cross',ride:'ride',getonbike:'get on',getoffbike:'get off',wear:'put on',takeoff:'take off',drive:'drive',stopcar:'stop',light:'change',write_nb:'write',fetch:'bring back',arrive:'arrive',depart:'leave'};
// 一つの出来事から、学習カード用の文をまとめて作る
function describe(ev,mode='noun'){
 const vb=VB[ev.v];if(!vb)return null;
 const S=subj(ev.a,ev.a&&ev.a.user?'I':mode);
 const own=x=>x&&x.owner&&ev.a&&x.owner===ev.a.id?{...x,en:S.poss+' '+x.base,ja:'自分の'+x.baseja}:x;
 if(ev.r&&ev.r.owner||ev.o&&ev.o.owner)ev={...ev,r:own(ev.r),o:own(ev.o),state:ev.state?{...ev.state,r:own(ev.state.r),o:own(ev.state.o)}:ev.state};
 const mk=f=>{if(!f)return null;const r=f(S,ev);if(!r)return null;const [en,ja]=r;return {en:T(en),ja}};
 const out={prog:mk(vb.prog),past:mk(vb.past),state:mk(vb.state),v:ev.v,p:ev.p||(ev.state&&ev.state.p)||null,tag:VERB_TAG[ev.v]||ev.v};
 if(ev.state&&VB[ev.state.v]&&VB[ev.state.v].state){const e2={...ev.state,a:ev.a};const [en,ja]=VB[ev.state.v].state(S,e2);out.state={en:T(en),ja}}
 out.main=ev.stateFirst&&out.state?out.state:out.prog;
 return out}
// ミッション用の命令文(Put the apple on the table. / Make the man sit on the sofa.)
function imperative(g){const v=g.v,A=g.a,O=g.o,R=g.r,p=g.p;
 const mk=(en,ja)=>({en:T(en),ja});
 switch(v){
  case 'place':case 'put':return mk(`Put ${O.en} ${p==='in'?'in':p} ${R.en}.`,`${O.ja}を${R.ja}${PJ[p]}に${p==='in'?'入れて':'置いて'}ください。`);
  case 'turnon':return mk(`Turn on ${O.en}.`,`${O.ja}をつけてください。`);
  case 'turnoff':return mk(`Turn off ${O.en}.`,`${O.ja}を消してください。`);
  case 'open':return mk(`Open ${O.en}.`,`${O.ja}を${O.k==='prop'?'開いて':'開けて'}ください。`);
  case 'close':return mk(`Close ${O.en}.`,`${O.ja}を${O.k==='prop'?'閉じて':'閉めて'}ください。`);
  case 'light':return mk(`Change the light to ${O.green?'green':'red'}.`,`信号を${O.green?'青':'赤'}にしてください。`);
  default:{const d=describe({...g,a:A},'noun');if(!d)return null;
   // 「〜させる」: Make + 人 + 動詞の原形 … は文型ごとに作るのが難しいため、目標の状態(進行形)をそのまま示す
   return {en:d.main.en,ja:d.main.ja,target:true}}}}

// ===== ワールド: 英文の検証(ビルド時に tools/world_tool.js から呼ぶ) =====
// 1) 文の形の検査: 文頭の大文字・文末記号・a/an・同じ語の重複・置きかえ忘れの {..}
// 2) 会話ミッションの検査: 模範の英文・ほかの言い方・選択肢が、それぞれ自分の意図として受け取られるか(正しい言い方を不正解にしないため)
// 3) 参照の検査: 登場人物・物・変数が存在するか
const A_OK=/^(a|an) (one|once|uni|use[drs]?|usual|euro|user|united|university|hour|honest|honor|heir|suv|sos|mba|fbi|x)/i;
function wLint(t,where){const e=[];if(!t)return e;const s=String(t).trim();
 if(/\{[\w.]+\}/.test(s))e.push(`${where}: 置きかえ忘れ ${s}`);
 if(/  /.test(s))e.push(`${where}: 空白が2つ "${s}"`);
 if(/^[a-z]/.test(s)&&!/^(iPhone|e\.g\.)/.test(s))e.push(`${where}: 文頭が小文字 "${s}"`);
 if(!/[.?!"')…]$/.test(s))e.push(`${where}: 文末記号なし "${s}"`);
 if(/[^.]\b\w{2,}[.?!] [a-z]/.test(s.replace(/\b(a\.m|p\.m|e\.g|Mr|Ms|Mrs|Dr)\./g,'')))e.push(`${where}: 文の途中で小文字始まり "${s}"`);
 const w=s.toLowerCase().replace(/[^a-z0-9' ]/g,' ').split(/\s+/).filter(Boolean);
 for(let i=0;i+1<w.length;i++){if(w[i]===w[i+1]&&!['that','had','very','bye'].includes(w[i]))e.push(`${where}: 同じ語の重複 "${w[i]} ${w[i+1]}" in "${s}"`);
  if(w[i]==='a'&&/^[aeio]/.test(w[i+1])&&!A_OK.test('a '+w[i+1]))e.push(`${where}: a + 母音 "${s}"`);
  if(w[i]==='an'&&/^[bcdfgjklmnpqrstvwxyz]/.test(w[i+1])&&!A_OK.test('an '+w[i+1]))e.push(`${where}: an + 子音 "${s}"`)}
 return e}
// 変数の組み合わせ(多すぎるときは代表だけ)
// 判定の「質」が同じなら、別の意図に当たってもよい(どちらも正しい応答で、流れが同じ)
const wQual=it=>(it.tone||'ok')+(it.retry?'-retry':'');
function wVarCombos(story){const keys=Object.keys(story.vars||{});let out=[{}];
 for(const k of keys){const n=[];for(const o of out)for(const v of story.vars[k])n.push({...o,[k]:v.id});out=n;if(out.length>60){out=out.filter((_,i)=>i%Math.ceil(out.length/60)===0)}}return out}
function wCheckAll(order){const errors=[],rep=[];let nIntent=0,nChoice=0,nLine=0,nStep=0,nStory=0,nMission=0,nSent=0;
 const modes=['noun','pron','I','you'];
 for(const id of order){const def=WSC.defs[id];if(!def){errors.push('scene missing '+id);continue}
  const W=W_new(def);
  // ---- ミッション(モード2〜4) ----
  for(const [mi,m] of (def.missions||[]).entries()){nMission++;
   for(const k of ['a','o','r']){const v=m.ex[k];if(typeof v==='string'&&!W.ents[v])errors.push(`${id} mission${mi}: ${k}=${v} がない`)}
   const g=k=>m.ex[k]?(typeof m.ex[k]==='object'&&!Array.isArray(m.ex[k])?m.ex[k]:W.ents[m.ex[k]]):null;
   const ev={...m.ex,a:m.ex.a?g('a'):USER,o:g('o'),r:m.ex.r?g('r'):null};
   for(const md of modes){const d=describe(ev,md);if(!d){errors.push(`${id} mission${mi}: 英文が作れない`);continue}
    for(const x of [d.prog,d.past,d.state].filter(Boolean)){nSent++;errors.push(...wLint(x.en,`${id} mission${mi}/${md}`));if(!x.ja)errors.push(`${id} mission${mi}: 和訳なし`)}}}
  // ---- 会話ミッション ----
  for(const st of def.stories||[]){nStory++;const where=`${id}/${st.id}`;
   if(!W.ents[st.me])errors.push(`${where}: me=${st.me} がない`);
   const ids=new Set();
   const chkRef=(x,label)=>{if(typeof x!=='string')return;if(x[0]==='@'){if(!(st.vars||{})[x.slice(1)])errors.push(`${where}: ${label} 変数 ${x} がない`)}else if(x!=='ground'&&!W.ents[x])errors.push(`${where}: ${label} ${x} がない`)};
   const chkOps=(ops,label)=>{for(const o of ops||[]){for(const k of ['who','what','to'])chkRef(o[k],label+'.'+o.op);if(o.id)[].concat(o.id).forEach(x=>chkRef(x,label+'.'+o.op))}};
   chkOps(st.init,'init');
   const combos=wVarCombos(st);
   for(const combo of combos){
    const vars={};for(const [k,v] of Object.entries(combo))vars[k]=st.vars[k].find(x=>x.id===v);
    const ST={W,story:st,vars,flags:{},said:{},variant:'normal',log:{heard:[]}};
    // ゲームと同じ順で変数を決める(other: ちがう品を選ぶ)。検査では候補の最初のものを使う
    const setv=o=>{if(o.op!=='setvar')return;if(o.other){const cur=vars[o.other];const list=Object.values(st.vars||{}).find(l=>l.includes(cur))||[];vars[o.k]=list.find(x=>x!==cur&&x!==vars.serve)||list.find(x=>x!==cur)||cur}else if(typeof o.v==='string'&&o.v[0]==='@')vars[o.k]=vars[o.v.slice(1)]};
    (st.init||[]).forEach(setv);
    for(const [si,s] of st.steps.entries()){const sw=`${where} step${si}${s.id?'('+s.id+')':''}`;
     if(combo===combos[0]){nStep++;if(s.id){if(ids.has(s.id))errors.push(`${sw}: id の重複`);ids.add(s.id)}
      if(s.npc)chkRef(s.npc,sw+' npc');if(s.to)chkRef(s.to,sw+' to');chkOps(s.do,sw);
      if(s.act&&!s.t)errors.push(`${sw}: 自動テスト用の手順 t がない`);
      for(const a of s.acts||[]){if(a.on)chkRef(a.on,sw+' acts.on');chkOps(a.do,sw+' acts')}
      for(const r of s.wrong||[]){if(r.npc)chkRef(r.npc,sw+' wrong');chkOps(r.do,sw+' wrong')}}
     (s.do||[]).forEach(setv);
     if(s.npc){nLine++;errors.push(...wLint(stTx(ST,s.say),sw));if(!s.ja)errors.push(`${sw}: 和訳なし`)}
     if(s.talk){const r=stResolve(ST,s);if(!r.intents.length){errors.push(`${sw}: 意図がない`);continue}
      const main=dMain(r);if(!main.ja)errors.push(`${sw}: 模範の和訳なし`);
      for(const it of r.intents){nIntent++;
       for(const t of [it.model,...(it.alts||[])]){if(!t)continue;errors.push(...wLint(t,sw+' '+it.id));
        const m=dIntent([t],r.intents);if(!m.best)errors.push(`${sw}: 「${t}」が意図 ${it.id} として受け取られない(どの意図にも当たらない)`);
        else if(m.best.it.id!==it.id&&wQual(m.best.it)!==wQual(it))errors.push(`${sw}: 「${t}」が ${it.id} ではなく ${m.best.it.id} と判定される`)}
       for(const rl of it.reply||[]){nLine++;errors.push(...wLint(stTx(ST,rl.say),sw+' reply'));if(!rl.ja)errors.push(`${sw}: 返事の和訳なし`)}
       chkOps(it.do,sw+' '+it.id)}
      for(const c of r.choices){nChoice++;if(!r.intents.find(i=>i.id===c.i)){errors.push(`${sw}: 選択肢の意図 ${c.i} がない`);continue}
       errors.push(...wLint(c.en,sw+' choice'));const m=dIntent([c.en],r.intents);
       const ci=r.intents.find(i=>i.id===c.i);if(!m.best||(m.best.it.id!==c.i&&wQual(m.best.it)!==wQual(ci)))errors.push(`${sw}: 選択肢「${c.en}」を声で言うと ${m.best?m.best.it.id:'不明'} と判定される(${c.i} のはず)`)}
      if(r.choices.length&&!r.choices.some(c=>c.i===main.id||r.intents.find(i=>i.id===c.i&&!i.tone&&!i.retry)))errors.push(`${sw}: 正解の選択肢がない`)}
    }}}}
 rep.push(`シーン ${order.length} / ミッション ${nMission}(英文 ${nSent}) / 会話ミッション ${nStory}(手順 ${nStep}、相手の発言 ${nLine}、意図 ${nIntent}、選択肢 ${nChoice})`);
 return {errors:[...new Set(errors)],report:rep.join('\n')+'\n'+(errors.length?'エラー:\n'+[...new Set(errors)].join('\n'):'エラーなし')+'\n'}}

// ===== ワールド: オブジェクト状態管理(配置・持つ・座る・位置と奥行き)。描画やDOMには依存しない =====
const USER={user:true,en:'I',ja:'私',k:'user'};
// 家具の大きさ(当たり判定用) [幅, 高さ]
const FIXSZ={trashcan:[52,58],wallswitch:[44,60],shoerack:[140,56],coathook:[160,90],bathtub:[240,80],basin:[100,110],mirror:[100,120],towelrack:[120,60],curtain:[128,200],tallshelf:[180,230],mailbox:[52,130],xray:[260,150],detector:[116,212],planeseat:[290,120],bin:[300,60],cart:[80,110],ac:[160,44],mapboard:[220,150],ticketmachine:[72,150],linemap:[260,110],atm:[88,170],rack:[180,170],salonchair:[70,120],poster:[110,160],theaterseats:[290,96],screen:[300,170],treadmill:[160,128],dumbrack:[140,60],balloons:[80,212],podium:[88,140],logowall:[240,90],elevator:[124,196],fboard:[340,134],gatesign:[92,206],scale:[120,42],plant:[60,120],signpost:[80,184],menuboard:[240,130],towel:[124,24],sea:[1000,160],whiteboard:[290,156],sofa:[250,110],chair:[56,104],table:[160,70],desk:[120,64],tv:[150,150],door:[96,186],window:[172,130],fridge:[90,192],sink:[210,100],bed:[280,112],lamp:[60,160],clock:[56,56],tree:[220,290],bench:[176,90],pond:[264,70],flowers:[124,44],bicycle:[110,70],counter:[250,104],register:[64,56],blackboard:[316,164],shelf:[204,184],gate:[124,110],train:[524,206],computer:[70,60],deskphone:[44,30],parasol:[224,200],car:[210,110],trafficlight:[50,214],crosswalk:[260,72],shop:[284,244],building:[184,320]};
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

// ===== ワールド: アニメーション(移動・向き・立ち位置)。動きは CSS の transition とポーズの切り替えで表現する =====
async function moveTo(W,e,x,y,gait='walk'){
 if(e.k==='person'&&(e.seat||e.lie)){const sy=e.y+10;unseat(W,e);e.y=sy;W.draw();await wait(220)}
 if(e.k==='animal'&&e.on){e.on=null}
 e.act=null;const d=Math.hypot(x-e.x,y-e.y);if(d<4){return}
 e.flip=x<e.x;e.moving=gait;W.draw();e.x=x;e.y=y;
 const dur=Math.max(260,d/SPEED[gait]*1000);W.draw(dur);await wait(dur);e.moving=null;W.draw()}
function faceTo(e,t){e.flip=t.x<e.x}
function spotNear(W,a,t){// 相手の横に立つ位置
 // カウンターの中にいる店員(stay)は中を移動し、客はカウンターの前から話す
 if(a.stay&&W.ents[a.stay]){const f=W.ents[a.stay];const hw=(f.o&&f.o.w||240)/2-20;return {x:Math.max(f.x-hw,Math.min(f.x+hw,t.x+(t.k==='person'?(a.x<=t.x?-46:46):0))),y:f.staffY}}
 if(t.k==='person'&&t.stay&&W.ents[t.stay]){const f=W.ents[t.stay];return clampFloor(W,{x:t.x+(a.x<t.x?-52:52),y:(f.near?f.near.y:f.y)+14})}
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

// ===== ワールド: 描画エンジン(SVGへの描画・タップ/ドラッグ入力・ドロップ先の判定) =====
function artFor(W,e){
 if(e.nodraw)return '';
 if(e.k==='person'){const pose=personPose(W,e);const s=personSvg(e.look,pose,e.expr||(e.lie?'sleep':'normal'),{h:e.sh});return pose==='lie'?`<g transform="translate(${(e.look.k||1)*70} ${-(e.lie.h||56)})">${s}</g>`:s}
 if(e.k==='animal'){const pose=e.moving==='run'?'run':e.moving?'walk':e.pose;return e.art==='cat'?catSvg(pose==='run'?'walk':pose,e.c):dogSvg(pose==='sleep'?'lie':pose,e.c)}
 if(e.k==='prop')return propSvg(e.art,e.st);
 if(e.k==='fix')return fixSvg(e.art,e.st,e.o||{});
 return ''}
function wThumb(def){// シーン一覧用の小さな絵(ビルド時に world/thumbs/*.svg として書き出す)
 const W=W_new(def);const list=W.order.map(id=>W.ents[id]).sort((a,b)=>layout(W,a).d-layout(W,b).d);
 return `<svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">${bgSvg(def.bg)}${list.map(e=>{const l=layout(W,e);if(l.hidden)return '';const fl=(e.k==='person'||e.k==='animal')&&e.flip?' scale(-1 1)':'';return `<g transform="translate(${l.x} ${l.y})${fl}">${artFor(W,e)}</g>`}).join('')}</svg>`}
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
  list.forEach(e=>{const g=nodes[e.id],l=L[e.id];let art=artFor(W,e);
   // 小さな物はタップしやすいように透明の当たり判定を広げる(スマホ向け)
   if(e.k==='prop'&&!e.heldBy&&!e.inC&&art)art+=`<rect class="hitpad" x="-30" y="-58" width="60" height="66"/>`;if(g._art!==art){g.innerHTML=art;g._art=art}
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
  let e=g?W.ents[g.dataset.id]:null;
  if(!e)e=nearTap(W,p);// 指がわずかにずれても、近くの人・物を選ぶ
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
function nearTap(W,p){let best=null,bd=34;for(const e of ents(W)){if(e.k==='fix'||e.hidden||e.nodraw)continue;const l=layout(W,e);if(l.hidden)continue;
 const k=(e.look&&e.look.k)||1;const cy=e.k==='person'?l.y-80*k:e.k==='animal'?l.y-24:l.y-16;const r=e.k==='person'?30*k:0;
 const d=Math.max(0,Math.hypot(p.x-l.x,(p.y-cy)*(e.k==='person'?.45:1))-r);if(d<bd){bd=d;best=e}}return best}
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
  if(e.stay&&W.ents[e.stay]){const f=W.ents[e.stay];const hw=(f.o&&f.o.w||240)/2-20;await moveTo(W,e,Math.max(f.x-hw,Math.min(f.x+hw,pt.x)),f.staffY,'walk');return {v:'walk',a:e}}
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

// ===== ワールド: アクション判定(いまできる動作だけを一覧にし、実行して出来事を返す) =====
// 自然に成り立たない動作は一覧に出さない。各 run() は出来事 ev(または配列)を返す。
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
  if(f.room)m.push(wA(`Come out of ${f.en}`,`${f.ja}から出る`,async()=>{f.st.open=true;W.draw();await wait(250);a.hidden=false;a.inside=null;a.x=f.x;a.y=(f.near?f.near.y:f.y)+6;W.draw();await moveTo(W,a,f.x+50,a.y+20);f.st.open=false;W.draw();return {v:'exit',a,r:f}}));
  if(f.art==='elevator')m.push(wA('Get out of the elevator','エレベーターから降りる',async()=>{f.st.open=true;W.draw();await wait(300);a.hidden=false;a.inside=null;a.x=f.x;a.y=f.near.y-20;W.draw();await moveTo(W,a,f.x+40,f.near.y+30);f.st.open=false;W.draw();return {v:'exit',a,r:f}}));
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
 if(h&&h.use)m.push(...useMenu(W,a,h,true));
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
  if(t.room&&!a.inside&&!(t.room.need&&!t.room.need.every(k=>t.st[k])))m.push(wA(`Go into ${t.en}`,`${t.ja}に入る`,async()=>{await moveTo(W,a,t.x,(t.near?t.near.y:t.y+20),'walk');t.st.open=true;W.draw();await wait(300);a.inside=t.id;a.hidden=true;if(a.hold&&t.room.drop)await dropHeld(W,a);t.st.open=false;W.draw();return {v:'enter',a,r:t}}));
  if(t.art==='elevator'&&!a.inside)m.push(wA(`Take ${t.en}`,`${t.ja}に乗る`,async()=>{await moveTo(W,a,t.x,t.near.y,'walk');t.st.open=true;W.draw();await wait(450);await moveTo(W,a,t.x,t.near.y-24,'walk');a.inside=t.id;a.hidden=true;W.draw();await wait(250);t.st.open=false;W.draw();return {v:'enter',a,r:t}}));
  if(t.art==='deskphone'&&a.act==='phone'&&t.st.up)m.push(wA('Hang up the phone','電話を切る',async()=>{t.st.up=false;a.act=null;W.draw();return {v:'hangup',a}}));
  if(t.art==='deskphone'&&!t.st.up)m.push(wA('Answer the phone','電話に出る',async()=>{if(!a.seat)await goNear(W,a,t);t.st.ring=false;t.st.up=true;a.act='phone';W.draw();return {v:'answer',a}}));
  if(t.art==='blackboard')m.push(wA(`Write on ${t.en}`,`${t.ja}に書く`,async()=>{await moveTo(W,a,t.near.x,t.near.y,'walk');a.flip=false;a.act='write';W.draw();await wait(500);t.st.text=t.text||'Hello!';W.bgDirty=true;W.draw();return {v:'write',a,r:t,p:'on'}}));
  if(t.art==='register'&&!a.staff)m.push(wA(`Pay at ${t.en}`,`${t.ja}でお金を払う`,async()=>{await goNear(W,a,t);a.act='give';W.draw();await wait(500);t.st.paid=true;a.act=null;W.draw();return {v:'pay',a,r:t}}));
  if(t.art==='train'&&t.st.open&&!t.st.leaving)m.push(wA('Get on the train','電車に乗る',async()=>{await moveTo(W,a,t.x+(t.doorX||-120),t.boardY||t.y+80,'walk');a.inside=t.id;a.hidden=true;if(a.hold){}W.draw();return {v:'board',a,r:t}}));
  if(t.art==='detector')m.push(wA(`Walk through ${t.en}`,`${t.ja}を通る`,async()=>{const side=a.x>t.x?-1:1;await moveTo(W,a,t.x-side*80,t.y+10,'walk');await moveTo(W,a,t.x,t.y+10,'walk');
   if(t.st.metal){t.st.beep=true;bubble(W,t,'Beep! Beep!');W.draw();await wait(500);await moveTo(W,a,t.x-side*80,t.y+10,'walk');return {v:'custom',act:'beep',a,o:t,tx:{prog:['The metal detector is beeping.','金属探知機が鳴っています。'],past:['The metal detector beeped.','金属探知機が鳴りました。']}}}
   t.st.beep=false;await moveTo(W,a,t.x+side*90,t.y+10,'walk');t.st.passed=true;W.draw();return {v:'gothrough',a,r:t}}));
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
  if(t.bell&&free(W,t))m.push(wA(`Ring ${t.en}`,`${t.ja}を鳴らす`,async()=>{await goNear(W,a,t);a.act='give';W.draw();bubble(W,t,'Ding!');await wait(450);a.act=null;W.draw();return {v:'ring',a,o:t}}));
  if((can||a.hold===t.id)&&t.openable)m.push(t.st.open?wA(`Close ${t.en}`,`${t.ja}を閉じる`,async()=>{await wPick(W,a,t);t.st.open=false;W.draw();return {v:'close',a,o:t}}):wA(`Open ${t.en}`,`${t.ja}を開く`,async()=>{await wPick(W,a,t);t.st.open=true;W.draw();return {v:'open',a,o:t}}));
 }
 if(t.k==='person'&&!t.hidden&&!t.swim){
  if(h&&!t.hold&&!h.cap)m.push(wA(`Give ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を渡す`,async()=>{await goNear(W,a,t);faceTo(t,a);a.act='give';W.draw();await wait(380);a.act=null;a.hold=null;placeProp(W,h,t);t.act=null;W.draw(320);await wait(340);return {v:'give',a,o:h,r:t}}));
  if(dist(a,t)>110&&!a.seat&&!t.inside)m.push(wA(`Talk to ${t.en}`,`${t.ja}に話しかける`,async()=>{await goNear(W,a,t);faceTo(t,a);W.draw();return {v:'talkto',a,r:t}}));
  if(h&&h.show&&t.staff)m.push(wA(`Show ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を見せる`,async()=>{await goNear(W,a,t);a.act='give';W.draw();await wait(700);return {v:'show',a,o:h,r:t}}));
  if(h&&h.throw)m.push(wA(`Throw ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を投げる`,async()=>{faceTo(a,t);return throwIt(W,a,h,t)}));
  if(t.staff==='order'&&W.def.order&&!a.staff)for(const oid of W.def.order){const it=W.ents[oid];if(it&&it.hidden&&!it.ordered)m.push(wA(`Order ${it.ind}`,`${it.ja}を注文する`,async()=>{await goNear(W,a,t);faceTo(t,a);W.draw();await wait(500);it.ordered=true;it.hidden=false;placeProp(W,it,W.ents[it.serveAt],'on');W.draw();return {v:'order',a,o:it}}))}
  if(t.staff==='order'&&W.def.payStaff&&!a.staff&&W.def.order&&W.def.order.some(id=>W.ents[id].ordered)&&!a.paid)m.push(wA('Pay','お金を払う',async()=>{await goNear(W,a,t);a.act='give';W.draw();await wait(500);a.act=null;a.paid=true;W.draw();return {v:'pay',a}}));
 }
 if(t.k==='fix'||t.k==='prop')m.push(...useMenu(W,a,t,false));
 if(t.k==='animal'&&h&&h.throw)m.push(wA(`Throw ${h.en} to ${t.en}`,`${t.ja}に${h.ja}を投げる`,async()=>{faceTo(a,t);return throwIt(W,a,h,t)}));
 return m}
function animalCombo(W,a,t){const m=[];
 if(t.k!=='fix')return m;
 if(t.under)m.push(wA(`Go under ${t.en}`,`${t.ja}の下へ行く`,async()=>{await moveTo(W,a,(t.under.x0+t.under.x1)/2,t.under.y,'walk');a.under=t.id;return {v:'go',a,r:t,p:'under',stateFirst:true}}));
 if(t.behind)m.push(wA(`Go behind ${t.en}`,`${t.ja}の後ろへ行く`,async()=>{await moveTo(W,a,t.behind.x,t.behind.y,'run');return {v:'go',a,r:t,p:'behind',stateFirst:true}}));
 if(t.animalOn)m.push(wA(`Jump onto ${t.en}`,`${t.ja}に飛び乗る`,async()=>{const s=t.animalOn;await moveTo(W,a,s.x-40,s.y+30,'walk');a.x=s.x;a.y=s.y;a.on=t.id;a.z=s.depth;W.draw(350);await wait(380);return {v:'jumpon',a,r:t}}));
 if(t.near)m.push(wA(`Run to ${t.en}`,`${t.ja}へ走る`,async()=>{a.z=null;await moveTo(W,a,t.near.x+(a.x<t.near.x?-20:20),t.near.y+6,'run');return {v:'run',a,r:t,state:{v:'go',p:t.near.p||'next to',r:t}}}));
 return m}
// ---- 家具・物ごとの専用の動作(シーンのデータの use で定義する) ----
// use:[{id, en, ja, how:'near'|'sit'|'pick'|'none', held:手に持っているときだけ, need:{状態}, pose, ms, keep, set:{状態の変化}, bub:'吹き出し', tx:{prog:[英,日],past:[英,日],state:[英,日]}}]
// 英文は tx の文型で作る({S}=主語 {be}=be動詞 {Sja}=主語の日本語 {poss}=所有格)
function useMenu(W,a,t,held){if(a.k!=='person')return [];
 return (t.use||[]).filter(u=>!!u.held===held&&(!u.need||Object.entries(u.need).every(([k,v])=>(t.st[k]??false)===v))&&(!u.staff||!!a.staff)&&(!u.guest||!a.staff)&&(!u.hold||a.hold===u.hold))
  .map(u=>wA(u.en,u.ja,async()=>{
   if(!held){if(u.how==='sit'&&t.seats){if(!(a.seat&&a.seat.f===t.id))await sitOn(W,a,t)}else if(u.how==='pick'&&t.k==='prop')await wPick(W,a,t);else if(u.how!=='none'&&!(a.seat&&u.how==='seat'))await goNear(W,a,t)}
   if(u.pose){a.act=u.pose;W.draw();await wait(u.ms||700);if(!u.keep){a.act=null}}
   if(u.set){Object.assign(t.st,u.set);if(t.k==='fix')W.bgDirty=true}
   if(u.bub)bubble(W,t,u.bub);W.draw();
   return {v:'custom',act:u.id,a,o:t,tx:u.tx}}))}
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
 if(m.r&&!inL(m.r,id(ev.r)))return false;if(m.p&&ev.p!==m.p)return false;if(m.act&&ev.act!==m.act)return false;return true}
// ---- 連続型ミッション(会話)の記録 ----
// 途中でやめても、それまでの発話・行動の記録は残る(1回答えるたびに保存する)。
function wsRec(id){S.wstory=S.wstory||{};return S.wstory[id]=S.wstory[id]||{runs:0,clear:0,perfect:0,last:null,var:{},mode:{},best:null}}
function wTalkStat(){S.wtalk=S.wtalk||{f:{},spoken:0,typed:0,chose:0,skip:0,hist:[]};return S.wtalk}
function stSave(ST){const r=wsRec(ST.story.id);if(!ST.counted){ST.counted=true;r.runs++;r.var[ST.variant]=(r.var[ST.variant]||0)+1}r.last=today();save()}
function stSaveTalk(ST){const t=wTalkStat();ST.savedT=ST.savedT||0;ST.savedA=ST.savedA||0;
 for(const rec of ST.log.talks.slice(ST.savedT)){
  if(rec.kind==='repeat'){const f=t.f.sayagain=t.f.sayagain||[0,0];f[0]++;f[1]++;continue}// 聞き返せたことは「聞き返す」の成功
  if(rec.focus){const f=t.f[rec.focus]=t.f[rec.focus]||[0,0];f[1]++;if(rec.ok===true&&!rec.hint)f[0]++}
  if(rec.kind==='skip')t.skip++;else if(rec.ok===true){if(rec.how==='voice')t.spoken++;else if(rec.how==='typed')t.typed++;else t.chose++}
  logEv({m:'wtalk',ok:rec.ok===true,h:rec.hint,f:rec.how==='voice'&&rec.ok===true&&!rec.hint,r:ST.story.id+':'+rec.step})}
 ST.savedT=ST.log.talks.length;ST.savedA=ST.log.acts.length;save()}
function stRecord(ST,fb){const r=wsRec(ST.story.id),t=wTalkStat();
 if(fb.goal){r.clear++;r.mode[ST.mode]=today()}if(fb.perfect)r.perfect++;
 const sc={hints:fb.hints,meaning:fb.metrics.meaning,spoken:fb.spoken.length};if(fb.goal&&(!r.best||sc.hints<r.best.hints||(sc.hints===r.best.hints&&sc.spoken>r.best.spoken)))r.best=sc;
 t.hist.unshift({id:ST.story.id,t:ST.story.t,sc:ST.story.scene,d:today(),mode:ST.mode,goal:fb.goal,perfect:fb.perfect,hints:fb.hints,spoken:fb.spoken.length,meaning:fb.metrics.meaning,match:fb.metrics.match,pron:fb.metrics.pron,v:fb.variant});
 if(t.hist.length>40)t.hist.length=40;
 // 次に復習するフレーズは、既存の「苦手リスト」(復習)に入れる
 for(const x of fb.review)addWeak(x.en,x.ja,'ワールド:'+ST.story.t);
 addXP(fb.goal?(fb.perfect?40:25):5);checkBadges();save()}
function wTalkHtml(){const t=wTalkStat();const rows=EXPR.map(x=>{const f=t.f[x.id];return {x,ok:f?f[0]:0,n:f?f[1]:0}});
 if(!t.hist.length&&!rows.some(r=>r.n))return '';
 return `<section class="sheet panel"><h3 class="eyebrow">会話ミッションの記録</h3>
  <div class="chips"><span class="chip good"><small>自分の声で話せた</small>${t.spoken}文</span><span class="chip"><small>入力で答えた</small>${t.typed}文</span><span class="chip"><small>選んで答えた</small>${t.chose}文</span><span class="chip ${t.skip?'bad':''}"><small>言えなかった</small>${t.skip}回</span></div>
  <div class="wexrows">${rows.map(r=>`<div class="wexr"><span class="en">${esc(r.x.en)}</span><small class="muted">${esc(r.x.ja)}</small><span class="sp"></span><small>${r.n?`${r.ok}/${r.n}回 ヒントなしで成功`:'まだ'}</small></div>`).join('')}</div>
  ${t.hist.length?`<h4 style="margin:12px 0 4px">最近のミッション</h4>${t.hist.slice(0,8).map(h=>`<div class="wexr"><span>${h.goal?(h.perfect?'★':'✓'):'—'} ${esc(h.t)}</span><small class="muted">${esc(h.d)} ・ モード${h.mode}</small><span class="sp"></span><small>意味 ${h.meaning??'—'}% ・ 声で話せた ${h.spoken}文 ・ ヒント ${h.hints}</small></div>`).join('')}`:''}
 </section>`}

// ===== ワールド: 会話・分岐の判定 =====
// 単語の一致率だけで「通じた」と決めない。相手の発言ごとに、受け取れる意図(intent)を用意し、
// 意図ごとに「意味のかたまり」(units)を決めておく。すべてのかたまりが言えていれば、その意図として受け取る。
//  - かたまりの中は言い方の候補を並べる(どれか1つでよい)。語順どおりなら間に2語まで別の語が入ってもよい(please など)
//  - not: このかたまりがあれば、この意図ではない(否定・別の意味)
//  - 一部だけ合っているときは、相手が "Do you mean ...?" と確認してくれる(ゲーム内で自然に聞き返す)
//  - AI のバックエンドが設定されていれば、ルールで判定できなかった答えだけ AI に意味を判定してもらう

// ---- 重点表現(10種類)。場面・自然な音声(読み上げ)・返答例つき ----
const EXPR=[
 {id:'could',en:'Could you ...?',ja:'依頼する',use:'相手に何かをしてもらいたいとき。Can you ...? よりていねいで、店員・同僚・初対面の人にも使える。',
  ex:[['Could you tell me where the elevator is?','エレベーターがどこか教えていただけますか。'],['Could you send me the file by five?','5時までにファイルを送っていただけますか。']],
  resp:[['Sure. It\'s over there.','いいですよ。あちらです。'],['Of course.','もちろんです。'],['I\'m sorry, I can\'t right now.','すみません、今はできません。']]},
 {id:'wouldmind',en:'Would you mind ...ing?',ja:'ていねいにお願いする',use:'「〜していただいてもかまいませんか」。さらにていねい。引き受けるときの答えは No / Not at all(「気にしない」=いいですよ)。Yes と答えると「いやです」の意味になるので注意。',
  ex:[['Would you mind waiting a few minutes?','数分お待ちいただいてもよろしいですか。'],['Would you mind closing the window?','窓を閉めていただけませんか。']],
  resp:[['Not at all.','かまいませんよ。'],['No problem.','いいですよ。'],['Actually, I\'m in a bit of a hurry.','実は少し急いでいるんです。']]},
 {id:'doyoumean',en:'Do you mean ...?',ja:'確認する',use:'相手の言ったことが合っているか確かめるとき。聞きまちがいによるトラブルを防げる。',
  ex:[['Do you mean the meeting on Friday?','金曜日の会議のことですか。'],['Do you mean Gate 12?','12番ゲートということですか。']],
  resp:[['Yes, that\'s right.','はい、そうです。'],['No, I mean Thursday.','いいえ、木曜日のことです。']]},
 {id:'sayagain',en:'Could you say that again?',ja:'聞き返す',use:'聞き取れなかったとき。Sorry? / Pardon? / Could you repeat that? / Could you speak more slowly? も使える。わからないまま進めるより、聞き返すほうが自然。',
  ex:[['Sorry, could you say that again?','すみません、もう一度言っていただけますか。'],['Could you speak a little more slowly?','もう少しゆっくり話していただけますか。']],
  resp:[['Sure. I said ...','いいですよ。…と言いました。'],['Of course.','もちろん。']]},
 {id:'howabout',en:'How about ...?',ja:'提案する',use:'代わりの案や選択肢を出すとき。How about a cappuccino instead? のように instead をつけると「代わりに」が伝わる。',
  ex:[['How about a cappuccino instead?','代わりにカプチーノはいかがですか。'],['How about meeting at three?','3時に会うのはどうですか。']],
  resp:[['That sounds good.','いいですね。'],['Sure, why not?','いいですよ。'],['Hmm, I\'d rather not.','うーん、それはやめておきます。']]},
 {id:'afraid',en:'I\'m afraid I can\'t ...',ja:'断る・言いにくいことを伝える',use:'I\'m afraid ... をつけると、断るときや悪い知らせをやわらかく伝えられる。I\'m afraid we\'re out of ...(あいにく〜を切らしています)も店員の定番。',
  ex:[['I\'m afraid I can\'t come to the meeting.','あいにく会議に出られません。'],['I\'m afraid we\'re out of lattes.','あいにくラテを切らしております。']],
  resp:[['That\'s OK.','大丈夫ですよ。'],['Oh, that\'s too bad.','それは残念。']]},
 {id:'reason',en:'The reason is ...',ja:'理由を説明する',use:'なぜかを説明するとき。because ... だけでもよいが、The reason is (that) ... と言うと説明だとはっきり伝わる。',
  ex:[['The reason is that the client is running late.','理由は、お客様の到着が遅れているからです。']],
  resp:[['I see.','なるほど。'],['That makes sense.','それなら納得です。']]},
 {id:'problem',en:'There\'s a problem with ...',ja:'問題を伝える',use:'物・予約・注文などに問題があると伝えるとき。何が問題かを続けて言うと解決が早い。',
  ex:[['There\'s a problem with my reservation.','予約に問題があります。'],['There\'s a problem with this jacket. The zipper is broken.','このジャケットに問題があります。ファスナーが壊れています。']],
  resp:[['I\'m sorry. Let me check.','申し訳ありません。確認します。'],['What seems to be the problem?','どうなさいましたか。']]},
 {id:'whatimean',en:'What I mean is ...',ja:'言い換える',use:'うまく伝わらなかったとき、言い方を変えて説明し直す。I mean ... でもよい。',
  ex:[['No, what I mean is, I booked three nights, not two.','いえ、つまり、2泊ではなく3泊で予約したということです。']],
  resp:[['Oh, I see.','ああ、わかりました。'],['Got it. Thanks.','了解です。']]},
 {id:'ithink',en:'I think ... because ...',ja:'意見を述べる',use:'自分の考えと理由をセットで言う。会議や相談で、理由まで言うと説得力が出る。',
  ex:[['I think we should move the meeting because the client is late.','お客様が遅れているので、会議を移したほうがいいと思います。']],
  resp:[['Good point.','いい指摘ですね。'],['I agree.','賛成です。'],['I see what you mean, but ...','言いたいことはわかりますが…']]},
];
const exprById=id=>EXPR.find(x=>x.id===id);

// ---- 照合 ----
function dTok(alt){return /\*/.test(alt)?String(alt).toLowerCase().split(/\s+/).filter(Boolean):normWords(alt)}
// 語順どおりに現れるか。先頭の = は「間に別の語が入らない」指定
function dSeq(words,alt){let strict=false;if(alt[0]==='='){strict=true;alt=alt.slice(1)}const t=dTok(alt);if(!t.length)return false;const gap=strict?0:2;
 for(let i=0;i<words.length;i++){if(!wordHit(words[i],t[0]))continue;let j=i,ok=true;
  for(let k=1;k<t.length;k++){let f=-1;for(let q=j+1;q<=Math.min(words.length-1,j+1+gap);q++)if(wordHit(words[q],t[k])){f=q;break}if(f<0){ok=false;break}j=f}
  if(ok)return true}
 return false}
function dWords(t){const a=[normWords(t)];const t2=String(t).replace(SUBJ_S,'$1 is');if(t2!==t)a.push(normWords(t2));return a}
const dHit=(wl,group)=>group.some(alt=>wl.some(w=>dSeq(w,alt)));
// 意図の判定。best=すべてのかたまりが言えた意図 / part=半分以上言えた意図
function dIntent(texts,intents){let best=null,part=null;
 for(const t of texts){if(!t)continue;const wl=dWords(t);
  for(const it of intents){if(it.not&&it.not.some(g=>dHit(wl,g)))continue;
   const hits=it.units.map(g=>dHit(wl,g));const n=hits.filter(Boolean).length,r=hits.length?n/hits.length:0;
   if(r===1){const c={it,t,spec:it.units.reduce((s,g)=>s+1,0)};if(!best||c.spec>best.spec)best=c}
   else if(r>=0.5&&n>=1&&(!part||r>part.r))part={it,t,r}}
  if(best)break}
 return {best,part}}
// どの場面でも使える「聞き返し」。短い Sorry? / Pardon? も受け取る
const D_REPEAT=[['say that again','say it again','repeat that','repeat it','repeat please','please repeat','one more time','come again','did not catch','didnt catch','pardon','more slowly','slow down','slowly please','say again']];
function dRepeat(texts){for(const t of texts){if(!t)continue;const w=normWords(t);if(w.length<=2&&(['sorry','pardon','what','huh'].includes(w[0])||w.join(' ')==='excuse me'))return true;if(dHit([w],D_REPEAT[0].map(x=>x)))return true}return false}
const dMain=step=>step.intents.find(i=>i.main)||step.intents.find(i=>!i.tone)||step.intents[0];

// 答えを判定する。res: answerBox の結果 {text, alts, typed, conf, gaveUp, hint} か、選択肢 {choice:intentId, text}
async function dJudge(step,res,ctx={}){
 const how=res.gaveUp?'none':res.choice?'choice':res.typed?'typed':'voice';
 const base={how,text:res.text||'',hint:!!res.hint,conf:how==='voice'&&res.conf>0?res.conf:null};
 if(res.gaveUp||!res.text&&!res.choice)return {...base,kind:'skip'};
 if(res.choice){const it=step.intents.find(i=>i.id===res.choice);return {...base,kind:'intent',it,match:100}}
 const texts=(res.alts&&res.alts.length?res.alts:[res.text]);
 const r=dIntent(texts,step.intents);
 const mk=(it,t)=>simScore(t||res.text,[it.model,...(it.alts||[])]);
 if(r.best)return {...base,text:r.best.t,kind:'intent',it:r.best.it,match:mk(r.best.it,r.best.t)};
 if(step.noRepeat!==true&&dRepeat(texts))return {...base,kind:'repeat'};
 const main=dMain(step);
 if(!r.part&&typeof aiReady==='function'&&aiReady()){
  const ai=await aiEvaluate((ctx.heard?`The other person said: "${ctx.heard}". `:'')+(step.aiQ||'Reply appropriately in this situation.'),res.text,main.model);
  if(ai&&ai.ok)return {...base,kind:'intent',it:main,ai:true,better:ai.better||'',match:mk(main)}}
 if(r.part)return {...base,kind:'clarify',it:r.part.it,match:mk(r.part.it,r.part.t)};
 return {...base,kind:'unknown',match:mk(main)}}
// Do you mean ...? への返事(はい/いいえ)
const D_YES=[{id:'yes',units:[['yes','yeah','yep','right','correct','exactly','that is right','thats right','sure','uh huh']],not:[['no','not right','wrong']],model:'Yes, that\'s right.'},
 {id:'no',units:[['no','nope','not quite','not exactly','wrong']],model:'No, that\'s not what I meant.'}];
function dYesNo(texts){const r=dIntent(texts,D_YES);return r.best?r.best.it.id:null}

// ===== ワールド: 連続型ミッション(ストーリー)の進行 =====
// 1つのミッションは複数の手順(steps)でできている。手順ごとに世界を初期化せず、人物や物の状態を次へ引き継ぐ。
// クリア判定は「必要な行動(出来事)」と「実際のオブジェクトの状態」の両方で行う(ボタンを押しただけでは進まない)。
// 手順の種類:
//  {id, npc:'人', say:'英文', ja:'和訳', expr:'表情', to:'相手'}         登場人物が話す(音声・口の動き・字幕)
//  {id, act:{ja,hint}, ev:出来事の条件, done:状態の条件, wrong:[{when,npc,say,ja,label}], acts:[追加の動作]}  自分で動かす
//  {id, talk:{ja,hint}, to:'相手', intents:[...], other:{npc,say,ja}, focus:'表現id'}  自分で英語を話す(または入力・選択)
//  {id, do:[台本の動き]}                                              登場人物が動く・物の状態が変わる
//  どの手順にも if:条件 をつけると、その条件のときだけ行う(分岐・トラブル)
// 条件: {held:[物,人]} {on:[物,場所]} {near:[人,場所]} {st:[id,キー,値]} {flag:名前|[名前,値]} {variant:'id'}
//       {said:[手順id,意図id]} {var:[名前,値]} {ev:{v,a,o,r}} {all:[]} {any:[]} {not:{}}
// '@名前' は変数(ミッションごとに選ばれる注文の品など)の id。文の中の {名前} / {名前.en} / {名前.ja} は言葉に置きかわる。

function stPick(list,rnd){const tot=list.reduce((s,x)=>s+(x.w??1),0);let r=rnd()*tot;for(const x of list){r-=(x.w??1);if(r<=0)return x}return list[list.length-1]}
function stNew(W,story,mode,ui,opt={}){const rnd=opt.rand||Math.random;
 const vars={};for(const [k,list] of Object.entries(story.vars||{})){const fixed=opt.vars&&opt.vars[k];vars[k]=(fixed&&list.find(x=>x.id===fixed))||list[Math.floor(rnd()*list.length)]}
 const variant=(opt.variant&&(story.variants||[]).find(v=>v.id===opt.variant))||(story.variants&&story.variants.length?stPick(story.variants,rnd):{id:'normal'});
 return {W,story,mode,ui,vars,variant:variant.id,flags:{},said:{},i:0,waiting:null,alive:true,ended:false,t0:Date.now(),
  log:{heard:[],acts:[],talks:[],mistakes:[],hints:0,taskHints:0}}}
// 文の中の {名前} を置きかえる
function stTx(ST,s){if(!s)return s;return String(s).replace(/\{(\w+)(?:\.(\w+))?\}/g,(m,k,f)=>{const v=ST.vars[k];if(!v)return m;return v[f||'en']??m})}
// 変数の入った手順を、いまの変数で解決した写しにする(判定する言い方にも {drink.w} などが使える)
function stResolve(ST,s){const tx=v=>typeof v==='string'?stTx(ST,v):v;
 // {serve.p} のように変数の中身が配列なら、言い方の候補として全部ならべる
 const ex=a=>{const m=typeof a==='string'&&a.match(/^\{(\w+)\.(\w+)\}$/);const v=m&&ST.vars[m[1]]&&ST.vars[m[1]][m[2]];return Array.isArray(v)?v:[tx(a)]};
 const g=a=>a.map(x=>x.flatMap(ex));
 return {...s,intents:(s.intents||[]).filter(it=>!it.if||stCond(ST,it.if)).map(it=>({...it,units:g(it.units),not:it.not?g(it.not):null,model:tx(it.model),alts:(it.alts||[]).map(tx),better:tx(it.better),ja:tx(it.ja)})),
  choices:(s.choices||[]).filter(c=>!c.if||stCond(ST,c.if)).map(c=>({...c,en:tx(c.en),i:tx(c.i)}))}}
function stSetVar(ST,k,v,other){if(other){const cur=ST.vars[other];const list=Object.values(ST.story.vars||{}).find(l=>cur&&l.includes(cur))||[];const c=list.filter(x=>x!==cur&&!(ST.vars.serve===x&&k!=='serve'));ST.vars[k]=c[Math.floor(Math.random()*c.length)]||cur;return}
 if(typeof v==='string'&&v[0]==='@'){ST.vars[k]=ST.vars[v.slice(1)];return}
 for(const list of Object.values(ST.story.vars||{})){const f=list.find(x=>x.id===v);if(f){ST.vars[k]=f;return}}}
function stId(ST,x){if(typeof x==='string'&&x[0]==='@'){const v=ST.vars[x.slice(1)];return v?v.id:x}return x}
function stEnt(ST,x){return ST.W.ents[stId(ST,x)]}
// 出来事の条件 {v, a, o, r}: 値は id / '@変数' / [候補] / {not:値}
function stEvMatch(ST,m,ev){if(!ev)return false;
 const val=(want,got)=>{if(want==null)return true;const g=got&&(got.id||(got.user?'user':null));
  if(want&&typeof want==='object'&&!Array.isArray(want)&&'not' in want)return !val(want.not,got);
  const list=(Array.isArray(want)?want:[want]).map(x=>stId(ST,x));return list.includes(g)};
 if(m.v&&!(Array.isArray(m.v)?m.v:[m.v]).includes(ev.v))return false;
 if(m.act&&ev.act!==stTx(ST,m.act))return false;
 return val(m.a,ev.a)&&val(m.o,ev.o)&&val(m.r,ev.r)}
function stCond(ST,c,ev){if(!c)return true;const W=ST.W;
 if(c.all)return c.all.every(x=>stCond(ST,x,ev));
 if(c.any)return c.any.some(x=>stCond(ST,x,ev));
 if(c.not)return !stCond(ST,c.not,ev);
 if(c.variant)return (Array.isArray(c.variant)?c.variant:[c.variant]).includes(ST.variant);
 if(c.flag){const [k,v]=Array.isArray(c.flag)?c.flag:[c.flag,true];return (ST.flags[k]??false)===v}
 if(c.var){const [k,v]=c.var;return ST.vars[k]&&(Array.isArray(v)?v.includes(ST.vars[k].id):ST.vars[k].id===v)}
 if(c.said){const [s,i]=c.said;return (Array.isArray(i)?i:[i]).includes(ST.said[s])}
 if(c.ev)return stEvMatch(ST,c.ev,ev);
 if(c.held){const p=stEnt(ST,c.held[0]),h=stId(ST,c.held[1]);return !!p&&p.heldBy===h}
 if(c.on){const p=stEnt(ST,c.on[0]),r=stId(ST,c.on[1]);return !!p&&!p.heldBy&&((p.at&&p.at.ref===r)||p.inC===r)}
 if(c.near){const a=stEnt(ST,c.near[0]),f=stEnt(ST,c.near[1]);if(!a||!f||a.hidden)return false;const pt=f.near||f;return Math.hypot(a.x-pt.x,a.y-pt.y)<(c.r||80)}
 if(c.st){const e=stEnt(ST,c.st[0]);const want=typeof c.st[2]==='string'?stTx(ST,stId(ST,c.st[2])):c.st[2];return !!e&&(e.st[c.st[1]]??null)===want}
 if(c.seated){const a=stEnt(ST,c.seated);return !!a&&!!a.seat}
 if(c.inside){const a=stEnt(ST,c.inside[0]);return !!a&&a.inside===stId(ST,c.inside[1])}
 return true}

// ---- 台本の動き(登場人物が自分で動く) ----
async function stOps(ST,ops){const W=ST.W;
 for(const o of ops){if(!ST.alive)return;if(o.if&&!stCond(ST,o.if))continue;
  const who=o.who&&stEnt(ST,o.who),what=o.what&&stEnt(ST,o.what),to=o.to&&stEnt(ST,o.to);
  switch(o.op){
   case 'pos':if(who.k==='prop'){if(who.heldBy){const h=W.ents[who.heldBy];if(h&&h.hold===who.id)h.hold=null;who.heldBy=null}who.inC=null;who.at={p:'on',ref:'ground'};who.depth=null}who.x=o.x;who.y=o.y??who.y;if(o.flip!=null)who.flip=o.flip;W.draw();break;
   case 'seat':{const f=to;const s=f.seats.find(s=>!s.occ);if(s)seatPerson(who,f,s);W.draw();break}
   case 'walk':if(o.x!=null){await moveTo(W,who,o.x,o.y??who.y,o.gait||'walk')}else if(to){if(to.k==='fix'&&to.near){await moveTo(W,who,to.near.x+(o.dx||0),to.near.y+(o.dy||0),o.gait||'walk');faceTo(who,to)}else await goNear(W,who,to)}W.draw();break;
   case 'enter':who.hidden=false;who.x=o.fromX??(who.x0>500?1040:-40);who.y=o.y??who.y0;W.draw();await wait(30);await moveTo(W,who,o.x??who.x0,o.y??who.y0,'walk');break;
   case 'leave':await moveTo(W,who,o.toX??(who.x>500?1040:-40),who.y,'walk');who.hidden=true;W.draw();break;
   case 'pick':await wPick(W,who,what);break;
   case 'give':{if(what.heldBy!==who.id)await wPick(W,who,what);await goNear(W,who,to);faceTo(to,who);who.act='give';W.draw();await wait(380);who.act=null;who.hold=null;if(to.hold)await dropHeld(W,to);placeProp(W,what,to);W.draw(320);await wait(340);break}
   case 'put':{if(what.heldBy!==who.id)await wPick(W,who,what);await putOn(W,who,what,to,o.p||'on');break}
   case 'place':{if(what.heldBy){const h=W.ents[what.heldBy];h.hold=null}placeProp(W,what,to,o.p||'on',o.xh);what.hidden=false;W.draw(o.dur||0);break}
   case 'show':for(const id of [].concat(o.id))stEnt(ST,id).hidden=false;W.draw();break;
   case 'hide':for(const id of [].concat(o.id)){const e=stEnt(ST,id);e.hidden=true;if(e.heldBy){W.ents[e.heldBy].hold=null;e.heldBy=null}}W.draw();break;
   case 'set':{const e=stEnt(ST,o.id);Object.assign(e.st,JSON.parse(stTx(ST,JSON.stringify(o.st))));if(e.k==='fix')W.bgDirty=true;W.draw();break}
   case 'expr':who.expr=o.e==='normal'?null:o.e;W.draw();break;
   case 'face':faceTo(who,to);W.draw();break;
   case 'sit':await sitOn(W,who,to);break;
   case 'stand':if(who.seat||who.lie){const sy=who.y+10;unseat(W,who);who.y=sy;W.draw();await wait(200)}break;
   case 'act':who.act=o.a;W.draw();await wait(o.ms||600);if(!o.keep){who.act=null;W.draw()}break;
   case 'flag':Object.assign(ST.flags,o.set);break;
   case 'setp':Object.assign(stEnt(ST,o.id),JSON.parse(stTx(ST,JSON.stringify(o.set))));W.draw();break;
   case 'setvar':stSetVar(ST,o.k,o.v,o.other);break;
   case 'return':{const h=who.hold&&W.ents[who.hold];if(h&&to){await goNear(W,who,to);who.act='give';W.draw();await wait(350);who.act=null;who.hold=null;if(to.hold)await dropHeld(W,to);placeProp(W,h,to);W.draw(300);await wait(320)}break}
   case 'think':bubble(W,who,stTx(ST,o.say));await ST.ui.say(who,stTx(ST,o.say),stTx(ST,o.ja),stHeard(ST,who,o),{think:true});break;
   case 'wait':await wait(o.ms||500);break;
   case 'announce':await ST.ui.say(null,stTx(ST,o.say),stTx(ST,o.ja),stHeard(ST,null,o),{pa:true});break;
  }}}
function stHeard(ST,who,s){const h={who:who?who.id:'pa',name:who?who.en:'Announcement',fast:!!s.fast,en:stTx(ST,s.say),tts:s.tts?stTx(ST,s.tts):null,ja:stTx(ST,s.ja),step:ST.i,shown:false,jaShown:false,replays:0,asked:0,key:!!s.key};ST.log.heard.push(h);ST.lastHeard=h;return h}
async function stSay(ST,s){const W=ST.W;const who=stEnt(ST,s.npc);const to=s.to?stEnt(ST,s.to):stEnt(ST,ST.story.me);
 if(who&&to&&!s.noFace)faceEachOther(W,who,to);if(who&&s.expr){who.expr=s.expr==='normal'?null:s.expr;W.draw()}
 const h=stHeard(ST,who,s);await ST.ui.say(who,h.en,h.ja,h,{slow:!!s.slow});
 if(who&&s.exprAfter){who.expr=s.exprAfter==='normal'?null:s.exprAfter;W.draw()}}

// ---- 進行 ----
async function stRun(ST){
 while(ST.alive&&ST.i<ST.story.steps.length){const s=ST.story.steps[ST.i];
  if(s.if&&!stCond(ST,s.if)){ST.i++;continue}
  if(s.npc){await stSay(ST,s);ST.i++;continue}
  if(s.do){await stOps(ST,s.do);ST.i++;continue}
  if(s.act){if(!s.ev&&s.done&&stCond(ST,s.done)){ST.i++;continue}// すでにその状態なら次へ
   ST.waiting={type:'act',s,tries:0,t0:Date.now(),hinted:false};ST.ui.task(s);stSave(ST);return}
  if(s.talk){ST.waiting={type:'talk',s,tries:0,t0:Date.now(),hinted:false};ST.ui.talk(s);stSave(ST);return}
  ST.i++}
 if(ST.alive&&!ST.ended)stFinish(ST)}
// 自分の操作(出来事)が起きたとき
async function stOnEvents(ST,evs){const w=ST.waiting;if(!ST.alive||!w||w.type!=='act')return;const s=w.s;
 for(const ev of evs){for(const r of s.wrong||[]){if(stCond(ST,r.when,ev)){
   w.tries++;ST.log.mistakes.push({kind:'act',label:stTx(ST,r.label||s.act.ja),step:ST.i});ST.log.acts.push({step:ST.i,ok:false,label:stTx(ST,r.label||s.act.ja)});stSaveTalk(ST);
   if(r.do)await stOps(ST,r.do);if(r.say)await stSay(ST,{npc:r.npc,say:r.say,ja:r.ja,expr:r.expr||'confused',exprAfter:'normal'});ST.ui.task(s,{again:true});return}}}
 const okEv=!s.ev||evs.some(ev=>stEvMatch(ST,s.ev,ev));
 if(okEv&&stCond(ST,s.done,evs[evs.length-1])){ST.log.acts.push({step:ST.i,ok:w.tries===0,label:stTx(ST,s.act.ja),hint:w.hinted});ST.waiting=null;ST.i++;stSaveTalk(ST);await stRun(ST)}}
// 自分の発話(声・入力・選択)が届いたとき
async function stOnAnswer(ST,res){const w=ST.waiting;if(!ST.alive||!w||w.type!=='talk'||w.busy)return;const s=stResolve(ST,w.s);w.busy=true;
 try{
 const j=await dJudge(s,res,{heard:ST.lastHeard&&ST.lastHeard.en});const main=dMain(s);
 const rec={step:ST.i,focus:s.focus||null,how:j.how,text:j.text,kind:j.kind,intent:j.it&&j.it.id,tone:j.it&&j.it.tone||null,match:j.match??null,conf:j.conf,hint:!!(res.hint||w.hinted),ai:!!j.ai,
  model:stTx(ST,(j.it&&!j.it.tone?j.it:main).model),better:j.better||null,ja:stTx(ST,(j.it&&!j.it.tone?j.it:main).ja||'')};
 ST.log.talks.push(rec);
 if(j.kind==='repeat'){rec.ok=null;ST.ui.result(rec);const h=ST.lastHeard;if(h){h.asked++;const who=h.who==='pa'?null:ST.W.ents[h.who];await ST.ui.say(who,h.en,h.ja,h,{slow:true,again:true})}stSaveTalk(ST);ST.ui.talk(s,{again:true});return}
 if(j.kind==='skip'){rec.ok=false;w.tries++;ST.log.mistakes.push({kind:'talk',said:'',model:rec.model,step:ST.i,skip:true});ST.ui.result(rec);stSaveTalk(ST);await stAccept(ST,s,main,{skipped:true});return}
 if(j.kind==='clarify'){rec.ok=false;w.tries++;ST.ui.result(rec);const it=j.it;const m=stTx(ST,it.model);
  await stSay(ST,{npc:s.to||stNpcOf(ST),say:`Sorry, do you mean, "${m}"?`,ja:`「${m}」ということですか。`,expr:'confused',exprAfter:'normal'});
  const yes=await ST.ui.confirm(m);if(!ST.alive)return;
  if(yes){rec.confirmed=true;ST.log.mistakes.push({kind:'talk',said:rec.text,model:m,step:ST.i,part:true});stSaveTalk(ST);await stAccept(ST,s,it,{clarified:true});return}
  await stSay(ST,{npc:s.to||stNpcOf(ST),say:'Sorry, could you say that again?',ja:'すみません、もう一度言っていただけますか。'});stSaveTalk(ST);ST.ui.talk(s,{again:true});return}
 if(j.kind==='unknown'){rec.ok=false;w.tries++;ST.ui.result(rec);stSaveTalk(ST);const o=s.other||{say:'Sorry, I don\'t quite understand.',ja:'すみません、よくわかりません。'};
  await stSay(ST,{npc:o.npc||s.to||stNpcOf(ST),say:o.say,ja:o.ja,expr:'confused',exprAfter:'normal'});ST.ui.talk(s,{again:true,offerHint:w.tries>=2});return}
 // 意図として受け取れた
 const it=j.it;rec.ok=!it.tone||it.tone==='ok';
 if(it.tone){rec.better=stTx(ST,it.better||main.model);ST.log.mistakes.push({kind:'talk',said:rec.text,model:rec.better,why:it.why||'',step:ST.i,tone:it.tone})}
 ST.ui.result(rec);stSaveTalk(ST);await stAccept(ST,s,it,{})
 }finally{if(ST.waiting===w)w.busy=false}}
function stNpcOf(ST){const h=[...ST.log.heard].reverse().find(x=>x.who&&x.who!=='pa');return h?h.who:null}
// 意図を受け取ったあとの反応(相手の返事・状態の変化・分岐)
async function stAccept(ST,s,it,o){const w=ST.waiting;
 if(it.set)Object.assign(ST.flags,it.set);
 if(it.setVar)for(const [k,v] of Object.entries(it.setVar))stSetVar(ST,k,v);
 ST.said[s.id||('s'+ST.i)]=it.id;
 for(const r of it.reply||[])await stSay(ST,{npc:r.npc||s.to||stNpcOf(ST),...r});
 if(it.do)await stOps(ST,it.do);
 if(it.retry&&!o.skipped){if(w)w.busy=false;ST.ui.talk(s,{again:true});return}// 内容がちがう答え(相手が訂正して聞き直す)
 ST.waiting=null;ST.i++;await stRun(ST)}
function stHint(ST,kind){const w=ST.waiting;if(w){w.hinted=true}ST.log.hints++;if(kind==='task')ST.log.taskHints++}
function stFinish(ST){ST.ended=true;const goal=stCond(ST,ST.story.goal);const fb=stFeedback(ST,goal);stRecord(ST,fb);ST.ui.finish(fb)}
function stStop(ST){if(ST){ST.alive=false}}

// ---- 会話後のフィードバック ----
function stFeedback(ST,goal){const L=ST.log,st=ST.story;
 const answered=L.talks.filter(t=>t.kind!=='repeat');
 const steps=st.steps.map((s,i)=>({s,i})).filter(x=>x.s.talk);
 const perStep=new Map();for(const t of answered){if(!perStep.has(t.step))perStep.set(t.step,[]);perStep.get(t.step).push(t)}
 const talkSteps=[...perStep.entries()].map(([i,ts])=>{const s=stResolve(ST,st.steps[i]);const fin=ts[ts.length-1];const first=ts[0];
  return {i,s,ts,fin,firstOk:first.ok===true&&!first.hint,ok:fin.ok===true||fin.confirmed,skipped:fin.kind==='skip',main:dMain(s)}});
 const voiceOk=answered.filter(t=>t.how==='voice'&&t.ok===true);
 const spoken=voiceOk.map(t=>t.text);
 const typed=answered.filter(t=>t.how==='typed'&&t.ok===true).map(t=>t.text);
 const chose=answered.filter(t=>t.how==='choice'&&t.ok===true).map(t=>t.text);
 const confs=answered.filter(t=>t.how==='voice'&&t.conf).map(t=>t.conf);
 const matches=answered.filter(t=>t.kind!=='skip'&&t.how!=='choice'&&t.match!=null).map(t=>t.match);
 const meaningOk=talkSteps.filter(x=>x.firstOk).length;
 const heard=L.heard.map(h=>({...h,help:h.shown||h.jaShown||h.asked>0}));
 const hints=L.hints+answered.filter(t=>t.hint).length;
 const review=[];const addR=(en,ja,why)=>{if(en&&!review.some(r=>r.en===en))review.push({en,ja:ja||'',why})};
 for(const x of talkSteps){if(!x.firstOk)addR(stTx(ST,x.main.model),stTx(ST,x.main.ja),x.skipped?'言えなかった':x.fin.tone?'より自然な言い方':'一度で伝わらなかった')}
 for(const h of heard)if(h.help&&h.key)addR(h.en,h.ja,'聞き取りにくかった');
 const para=talkSteps.map(x=>({model:stTx(ST,x.main.model),ja:stTx(ST,x.main.ja||''),alts:(x.main.alts||[]).slice(0,2).map(a=>stTx(ST,a)),focus:x.s.focus,better:x.fin.better}));
 return {goal,story:st,variant:ST.variant,heard,acts:L.acts,talks:answered,talkSteps,spoken,typed,chose,hints,mistakes:L.mistakes,para,review,
  metrics:{pron:confs.length?Math.round(100*confs.reduce((a,b)=>a+b,0)/confs.length):null,match:matches.length?Math.round(matches.reduce((a,b)=>a+b,0)/matches.length):null,
   meaning:talkSteps.length?Math.round(100*meaningOk/talkSteps.length):null,nTalk:talkSteps.length},
  perfect:goal&&hints===0&&L.mistakes.length===0&&talkSteps.every(x=>x.firstOk),sec:Math.round((Date.now()-ST.t0)/1000)}}

// ===== ワールド: ミッション管理(モード2〜4: 1つの動作で完結するミッション) =====
// c: {W, def, mode, R, box()=>ミッション欄, fresh(mq,mi)=>シーンを最初の状態にして次へ}
function wMissionCtl(c){const {W,def,mode,R}=c;
 function missionEv(m){const g=k=>m.ex[k]?(typeof m.ex[k]==='object'&&!Array.isArray(m.ex[k])?m.ex[k]:Array.isArray(m.ex[k])?W.ents[m.ex[k][0]]:W.ents[m.ex[k]]):null;
  return {...m.ex,a:m.ex.a?g('a'):USER,o:g('o'),r:m.ex.r?g('r'):null}}
 function missionText(m){const ev=missionEv(m);const imp=(m.ex.v==='place'||m.ex.v==='light'||((m.ex.v==='open'||m.ex.v==='close'||m.ex.v==='turnon'||m.ex.v==='turnoff')&&!m.a))?imperative(ev):null;
  const d=describe(ev);return imp&&!imp.target?{en:imp.en,ja:imp.ja,how:'command'}:{en:d.main.en,ja:d.main.ja,how:'target'}}
 function render(){const box=c.box();if(!box)return;
  if(W.mi>=W.mq.length){box.innerHTML=`<div class="wclear"><b>ステージクリア!</b> <span>「${esc(WMODES[mode-1].k)}」のミッションをすべてクリアしました。</span><div class="row" style="margin-top:6px"><button class="btn sm" id="wm-again">もう一度</button>${mode<4?`<button class="btn hl sm" id="wm-next">次のモードへ</button>`:''}</div></div>`;
   box.querySelector('#wm-again').onclick=()=>c.fresh(shuffle(def.missions.map((_,i)=>i)),0);
   const nx=box.querySelector('#wm-next');if(nx)nx.onclick=()=>go({name:'wscene',id:def.id,mode:mode+1},true);return}
  const m=def.missions[W.mq[W.mi]];const tx=missionText(m);W.mission=m;W.mText=tx;
  const head=`<span class="gtag">ミッション ${W.mi+1} / ${W.mq.length}</span>`;
  if(mode===2)box.innerHTML=`${head}<div class="row" style="margin-top:6px"><button class="playbig sm" id="wm-play" aria-label="指示を聞く">${IC.play}</button><div><b>英語の指示を聞いて、そのとおりに動かしましょう</b><div id="wm-tx" class="en muted" style="margin-top:2px"><button class="linkbtn" id="wm-show">英文を見る(ヒント)</button></div></div></div>`;
  if(mode===3)box.innerHTML=`${head}<div class="one" style="margin-top:6px">${esc(tx.ja)}</div><small class="muted">この場面になるように動かしてから、英語で言ってみましょう。</small>`;
  if(mode===4)box.innerHTML=`${head}<div class="row" style="margin-top:6px"><button class="playbig sm" id="wm-play" aria-label="英語を聞く">${IC.play}</button><div class="one en">${esc(tx.en)}</div></div>`;
  const pl=box.querySelector('#wm-play');if(pl){pl.onclick=()=>speak(tx.en);setTimeout(()=>speak(tx.en),300)}
  const sh=box.querySelector('#wm-show');if(sh)sh.onclick=()=>{W.mHint=true;box.querySelector('#wm-tx').textContent=tx.en}}
 function check(ev,d){const m=W.mission;if(!m)return;const st=wStat();const tag=VERB_TAG[m.ex.v]||m.ex.v,pp=m.ex.p;
  if(wMatch(m,ev)){st.v[tag]=st.v[tag]||[0,0];st.v[tag][0]++;st.v[tag][1]++;if(pp){st.p[pp]=st.p[pp]||[0,0];st.p[pp][0]++;st.p[pp][1]++}
   R.ok++;const gain=[0,0,10,12,15][mode]-(W.mHint?4:0);addXP(gain);W.mHint=false;W.mission=null;
   const box=c.box();const tx=W.mText;
   box.innerHTML=`<div class="wok">${hana}<div><b class="good">ミッション成功! +${gain} XP</b><div class="en">${esc(tx.en)}</div>${mode===3?'<div id="wm-mic"></div>':''}<div class="row" style="margin-top:6px"><button class="btn hl sm" id="wm-next">つぎのミッション →</button></div></div></div>`;
   if(mode===3)micPanel(box.querySelector('#wm-mic'),tx.how==='command'?d.main.en:tx.en,()=>{const m2=box.querySelector('#wm-mic');if(m2)m2.innerHTML=''},{skipLabel:'言わずに進む',doneLabel:'OK'});
   box.querySelector('#wm-next').onclick=()=>{const ni=W.mi+1;if(ni>=W.mq.length){R.clear[mode]=today();addXP(30);confetti();checkBadges();save()}c.fresh(W.mq,ni)};
  }else{const wrong=m.v.includes(ev.v);
   if(wrong){st.v[tag]=st.v[tag]||[0,0];st.v[tag][1]++;if(pp){st.p[pp]=st.p[pp]||[0,0];st.p[pp][1]++}R.miss++;save()}
   const box=c.box();let n=box.querySelector('.wng');if(!n){n=document.createElement('div');n.className='wng';box.appendChild(n)}
   n.textContent=wrong?'動作は合っていますが、人・物・場所がミッションとちがうようです。もう一度聞いて(読んで)みましょう。':'まだミッションの場面になっていません(準備の動作ならそのまま続けてOK)。'}}
 return {render,check}}

// ===== ワールド: 画面(シーン一覧・シーン・フレーズ帳) =====
const WMODES=[{n:1,k:'自由に動かす',d:'動かすと英文が出る'},{n:2,k:'聞いて動かす',d:'英語の指示どおりに'},{n:3,k:'日本語で動かす',d:'動かして英語で言う'},{n:4,k:'英語だけ',d:'日本語なし'},
 {n:5,k:'実践ミッション',d:'聞いて判断・会話',story:1},{n:6,k:'英語で生活',d:'選択肢なしで会話',story:1}];
VIEWS.world=function(app){
 const done=id=>{const r=(S.world||{})[id];return r?Object.keys(r.clear||{}).length:0};
 app.innerHTML=`<div class="row">${backBtn('ホーム',{name:'home'})}<span class="sp"></span><button class="btn ghost sm" data-go='{"name":"wbook"}'>マイフレーズ帳(${(S.wfav||[]).length})</button></div>
 <div class="uhead"><span class="eyebrow">INTERACTIVE ENGLISH WORLD</span><h1>うごかす英語ワールド</h1><p>人や物をタップ・ドラッグして動かすと、その動きを表す英文が表示され、読み上げられます。動きと英語を直接むすびつけて覚えましょう。</p></div>
 <div class="wgrid">${WMAN.map((s,i)=>`<button class="wcardsel" data-go='${JSON.stringify({name:'wscene',id:s.id})}'><div class="wth"><img src="world/thumbs/${s.id}.svg?v=${WORLD.v}" alt="" loading="lazy" width="1000" height="600"></div><div class="wcap"><span class="no">${String(i+1).padStart(2,'0')}</span><b>${esc(s.t)}</b><small class="en">${esc(s.en)}</small><span class="sp"></span><span class="stars">${[2,3,4].map(m=>`<span class="${(S.world||{})[s.id]&&S.world[s.id].clear[m]?'on':''}">★</span>`).join('')}</span></div><small class="muted">見つけた英文 ${Object.keys(((S.world||{})[s.id]||{}).found||{}).length} ・ ミッション ${s.n}</small></button>`).join('')}</div>
 ${WMAN.some(s=>(s.st||[]).length)?`<h2 class="wh2">会話ミッション <small class="muted">登場人物と英語で話して目的を達成する</small></h2>
 <div class="row" style="margin-bottom:8px"><button class="btn ghost sm" data-go='{"name":"wexpr"}'>重点フレーズ10</button><button class="btn ghost sm" data-go='{"name":"wbook"}'>会話の記録・苦手</button></div>
 <div class="wslist">${WMAN.filter(s=>(s.st||[]).length).flatMap(s=>s.st.map(st=>{const r=(S.wstory||{})[st.id];return `<button class="wscard wsmini" data-go='${JSON.stringify({name:'wscene',id:s.id,mode:5,story:st.id})}'><small class="muted">${esc(s.t)} ・ あなたの役:${esc(st.me)}</small><b>${esc(st.t)}</b><span class="row" style="gap:4px;flex-wrap:wrap">${st.focus.map(f=>`<span class="gtag en">${esc((EXPR.find(x=>x.id===f)||{}).en||f)}</span>`).join('')}${r&&r.clear?`<span class="chip good">${r.perfect?'★':'✓'}</span>`:''}</span></button>`})).join('')}</div>`:''}
 <p class="foot">★は「聞いて動かす」「日本語で動かす」「英語だけ」の各モードでミッションをすべてクリアすると付きます。会話ミッションはシーンの「実践ミッション」「英語で生活」タブからも始められます。</p>`;
 wireGo(app);
};
VIEWS.wscene=function(app){
 if(RT.st){stStop(RT.st);RT.st=null}
 if(!wMeta(V.id))return go({name:'world'},true);
 const def=sceneById(V.id);
 if(!def){app.innerHTML='<p class="muted">シーンを読み込んでいます…</p>';loadScene(V.id).then(()=>{if(V.name==='wscene')render()},()=>{app.innerHTML='<p>シーンを読み込めませんでした。通信状態を確認して、もう一度開いてください。</p>'});return}
 const R=wRec(def.id);const stories=def.stories||[];let mode=V.mode||1;if(mode>=5&&!stories.length)mode=1;
 const story=mode>=5&&V.story?stories.find(s=>s.id===V.story):null;
 S.set.wEn=S.set.wEn??true;S.set.wJa=S.set.wJa??true;
 // 自由・ミッションモードは前の状態を引き継ぐ。会話ミッションは毎回、最初の状態から始める
 const W=!story&&RT.w&&RT.w.def===def&&RT.w.alive&&!RT.w.story?RT.w:W_new(def);W.alive=true;RT.w=W;W.mode=mode;
 if(mode===1||mode>=5)W.mission=null;
 if(mode>1&&mode<5&&(!W.mq||W.mqMode!==mode)){W.mq=shuffle(def.missions.map((_,i)=>i));W.mi=0;W.mqMode=mode;W.mdone=0}
 const tabs=WMODES.filter(m=>!m.story||stories.length);
 const listOnly=mode>=5&&!story;
 app.innerHTML=`<div class="wtop"><button class="back" id="w-back">← ${story?'ミッション一覧':'シーン一覧'}</button><b>${esc(def.t)} <small class="en muted">${esc(def.en)}</small></b><span class="sp"></span>
  ${listOnly?'':`<label class="tg"><input type="checkbox" id="w-en" ${S.set.wEn?'checked':''}> 英文</label><label class="tg"><input type="checkbox" id="w-ja" ${S.set.wJa?'checked':''}> 和訳</label><button class="btn ghost sm" id="w-reset">${IC.redo}${story?'最初から':'最初の状態'}</button>`}</div>
 <div class="tabs wmodes">${tabs.map(m=>`<button class="tab${m.story?' tstory':''}" data-m="${m.n}" aria-selected="${m.n===mode}">${m.n>1&&m.n<5&&R.clear[m.n]?'★ ':''}${m.k}<small>${m.d}</small></button>`).join('')}</div>
 ${listOnly?'<div id="w-slist"></div>':`
 ${mode===1?`<p class="whint">人物をタップ → 動作を選ぶ / 人物を選んでから物をタップ → 組み合わせの動作 / ドラッグで移動。家具の電源やドアは直接タップでも操作できます。</p>`:''}
 ${mode>1&&mode<5?'<div class="wmis" id="w-mis"></div>':''}
 ${story?'<div class="wsgoal" id="w-sgoal"></div>':''}
 <div class="wzoom"><button class="linkbtn" id="w-fit"></button></div>
 <div class="wstage" id="w-stage"></div>
 ${story?'<div class="wtalk" id="w-talk"><div class="wlog" id="w-log" aria-live="polite"></div><div class="wnow" id="w-now"></div></div>':''}
 <div class="wmenu" id="w-menu"></div>
 <div class="wsent" id="w-card"><p class="muted" style="margin:0">${story?'動かすと、その動きの英文がここに出ます。':'ここに英文が表示されます。'}</p></div>
 ${story?'':`<div class="row" style="margin-top:4px"><small class="muted">このシーンで見つけた英文:<b id="w-found">${Object.keys(R.found).length}</b></small></div>`}`}`;
 const $=s=>app.querySelector(s);
 RT.wLeave=()=>{W.alive=false;if(RT.st){stStop(RT.st);RT.st=null}};
 $('#w-back').onclick=()=>{W.alive=false;if(story)go({name:'wscene',id:def.id,mode},true);else go({name:'world'})};
 app.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{go({name:'wscene',id:def.id,mode:+b.dataset.m},true)});
 if(listOnly){wStoryList($('#w-slist'),def,mode);return}
 $('#w-en').onchange=e=>{S.set.wEn=e.target.checked;save();showCard(W.lastD)};
 $('#w-ja').onchange=e=>{S.set.wJa=e.target.checked;save();showCard(W.lastD)};
 $('#w-reset').onclick=()=>{W.alive=false;RT.w=null;render()};
 const menu=$('#w-menu'),card=$('#w-card');
 // モードごとの進行役
 const ctl=story?wStoryCtl({W,def,story,mode,app,$,showMenu,doAct}):mode>1?wMissionCtl({W,def,mode,R,box:()=>$('#w-mis'),fresh}):null;
 const role=ctl&&ctl.role?W.ents[ctl.role]:null;
 const api={
  tap(e){if(W.busy)return;
   if(role){// 会話ミッション: 自分の役の人物で操作する
    if(e===role){W.sel=role.id;W.tgt=null;W.draw();showMenu(cap(role.en)+'(あなた)',role.ja,selfMenu(W,role).concat(ctl.extra(role,null)),role);return}
    W.sel=role.id;const m=comboMenu(W,role,e).concat(ctl.extra(role,e));W.tgt=e.id;W.draw();
    showMenu(`${cap(role.en)} → ${e.en}`,`${role.ja}(あなた) と ${e.ja}`,m,role);if(e.k!=='person')sayWord(e);return}
   const sel=W.sel&&W.ents[W.sel];
   if(sel&&sel!==e&&(sel.k==='person'||sel.k==='animal')){const m=comboMenu(W,sel,e);
    if(m.length){if(e.k==='person'||e.k==='animal')m.unshift(wA(`Choose ${e.en}`,`${e.ja}を選びなおす`,async()=>{W.sel=e.id;W.draw();setTimeout(()=>{showMenu(cap(e.en),e.ja,selfMenu(W,e),e)},0);return null},{noAnim:true}));
     showMenu(`${cap(sel.en)} → ${e.en}`,`${sel.ja} と ${e.ja}`,m,sel);W.tgt=e.id;W.draw();return}}
   if(e.k==='person'||e.k==='animal'){W.sel=e.id;W.tgt=null;W.draw();showMenu(cap(e.en),`${e.ja}(ほかの人・物をタップすると組み合わせの動作)`,selfMenu(W,e),e);sayWord(e);return}
   W.sel=null;W.tgt=null;W.draw();
   const dm=directMenu(W,e);showMenu(cap(e.en),e.ja+(dm.length?'':'(人物を選んでからタップすると、動作を選べます)'),dm,null);sayWord(e)},
  tapGround(pt){if(W.busy)return;const sel=role||(W.sel&&W.ents[W.sel]);if(sel&&(sel.k==='person'||sel.k==='animal')&&pt.y>def.floor[0]-30){doAct(()=>dropAct(W,sel,pt))}else{W.sel=null;W.draw();menu.innerHTML=''}},
  drop(e,pt){if(role&&e!==role){W.draw();toast(`会話ミッションでは、あなたの役(${role.ja})を動かして操作します。`);return}doAct(()=>dropAct(W,e,pt))},
  onDragStart(){menu.innerHTML=''}};
 W_mount($('#w-stage'),W,api);
 // 画面がせまいとき: 全体を表示(会話ミッションの初期値)/拡大して横にスクロール を切りかえる
 const fitBtn=$('#w-fit'),stageEl=$('#w-stage');const narrow=()=>window.innerWidth<700;
 const applyFit=()=>{const fit=S.set.wFit??(mode>=5);stageEl.classList.toggle('fit',fit);fitBtn.textContent=fit?'🔍 拡大して見る':'⤢ シーン全体を表示';fitBtn.parentElement.hidden=!narrow()};
 fitBtn.onclick=()=>{S.set.wFit=!(S.set.wFit??(mode>=5));save();applyFit()};applyFit();
 const selTab=app.querySelector('.wmodes [aria-selected="true"]');if(selTab&&selTab.scrollIntoView)selTab.scrollIntoView({block:'nearest',inline:'center'});
 function sayWord(e){if(e.en){speak(e.en.replace(/^the /,''))}}
 function showMenu(title,sub,list,actor){
  menu.innerHTML=`<div class="wmhead"><b class="en">${esc(title)}</b><small class="muted">${esc(sub)}</small><span class="sp"></span><button class="btn ghost sm" id="wm-x">とじる</button></div>
  ${list.length?`<div class="wacts">${list.map((a,i)=>`<button class="wact" data-i="${i}"><span class="en">${esc(a.en)}</span><small>${esc(a.ja)}</small></button>`).join('')}</div>`:'<p class="muted" style="margin:6px 0">いまできる動作はありません。</p>'}`;
  menu.querySelector('#wm-x').onclick=()=>{menu.innerHTML='';W.sel=null;W.tgt=null;W.draw()};
  menu.querySelectorAll('.wact').forEach(b=>b.onclick=()=>{const a=list[+b.dataset.i];menu.innerHTML='';if(a.noAnim){a.run();return}doAct(a.run)})}
 async function doAct(fn){if(W.busy)return;W.busy=true;let evs;try{evs=await fn()}catch(err){console.error(err);evs=null}W.busy=false;W.tgt=null;W.draw();
  if(!W.alive)return;evs=(Array.isArray(evs)?evs:[evs]).filter(Boolean);
  let sp=null;for(const ev of evs)sp=onEvent(ev)||sp;
  // 会話ミッション: 相手が反応し終わるまで(話す・動く)は操作を受けつけない
  if(ctl&&ctl.onEvents&&evs.length){W.busy=true;try{if(sp)await sp;await ctl.onEvents(evs)}finally{W.busy=false}}
  if(W.sel&&W.ents[W.sel]&&!W.ents[W.sel].hidden&&!W.busy&&!role){const e=W.ents[W.sel];showMenu(cap(e.en),e.ja,selfMenu(W,e),e)}}
 function onEvent(ev){const d=describe(ev);if(!d)return null;W.lastD={d,ev,mode:'noun'};(W.evlog=W.evlog||[]).push({ev,en:d.main.en,state:d.state&&d.state.en,past:d.past&&d.past.en});
  const key=d.main.en;const isNew=!R.found[key];R.found[key]=(R.found[key]||0)+1;R.n++;
  if(d.state&&d.state.en!==key)R.found[d.state.en]=(R.found[d.state.en]||0)+1;
  const st=wStat();if(!W.mission&&!story){st.v[d.tag]=st.v[d.tag]||[0,0];st.v[d.tag][0]++;st.v[d.tag][1]++;if(d.p){st.p[d.p]=st.p[d.p]||[0,0];st.p[d.p][0]++;st.p[d.p][1]++}}
  logEv({m:'world',ok:true,r:def.id+':'+key.slice(0,40)});
  if(isNew)addXP(2);else save();
  const f=$('#w-found');if(f)f.textContent=Object.keys(R.found).length;
  showCard(W.lastD);const sp=S.set.wAuto!==false?speak(d.main.en,{g:ev.a&&ev.a.pron==='he'?'m':'f'}):null;
  if(ctl&&ctl.check)ctl.check(ev,d);
  return sp}
 function showCard(L){if(!L){return}const {d,ev}=L;const md=L.mode;const dd=describe(ev,md)||d;
  const animate=ev.a&&!ev.a.user&&(ev.a.k==='person'||ev.a.k==='animal');
  const main=dd.main,extra=[];
  if(dd.state&&dd.state.en!==main.en)extra.push(['状態',dd.state]);
  if(dd.prog&&dd.prog.en!==main.en)extra.push(['動作中',dd.prog]);
  if(dd.past)extra.push(['過去',dd.past]);
  const enShow=S.set.wEn,jaShow=S.set.wJa&&W.mode!==4&&W.mode!==6;
  const fav=(S.wfav||[]).some(x=>x.en===main.en);
  card.innerHTML=`<div class="wsmain en ${enShow?'':'wblur'}" id="ws-en">${esc(main.en)}</div>
  ${jaShow?`<div class="j">${esc(main.ja)}</div>`:''}
  <div class="row" style="margin-top:8px">${sayBtn(main.en,ev.a&&ev.a.pron==='he'?'m':'f')}<button class="say" data-say="${esc(main.en)}" data-slow="1" aria-label="ゆっくり再生">${IC.slow}</button>
   <button class="btn ghost sm" id="ws-fav">${fav?'★ 保存ずみ':'☆ フレーズ帳に保存'}</button><button class="btn ghost sm" id="ws-say">${IC.mic}言ってみる</button>
   ${animate?`<span class="sp"></span><span class="wsubj">${[['noun',cap(ev.a.en)],['pron',ev.a.k==='person'?cap(ev.a.pron):'It'],['I','I'],['you','You']].map(([k,n])=>`<button class="tab" data-sj="${k}" aria-selected="${md===k}" style="min-width:0;padding:2px 8px">${esc(n)}</button>`).join('')}</span>`:''}</div>
  ${extra.length?`<div class="wsx">${extra.map(([k,s])=>`<div class="ex">${sayBtn(s.en)}<div><small class="gtag">${k}</small> <span class="en ${enShow?'':'wblur'}">${esc(s.en)}</span>${jaShow?`<div class="j">${esc(s.ja)}</div>`:''}</div></div>`).join('')}</div>`:''}
  ${dd.p?`<small class="muted">前置詞:<b class="en">${esc(dd.p)}</b>(${esc(PJ[dd.p]||'')})</small>`:''}<div id="ws-mic"></div>`;
  wireSay(card);
  card.querySelectorAll('.wblur').forEach(x=>x.onclick=()=>x.classList.remove('wblur'));
  card.querySelectorAll('[data-sj]').forEach(b=>b.onclick=()=>{L.mode=b.dataset.sj;showCard(L);const n=describe(ev,L.mode);if(n)speak(n.main.en)});
  card.querySelector('#ws-fav').onclick=()=>{S.wfav=S.wfav||[];if(!S.wfav.some(x=>x.en===main.en)){S.wfav.push({en:main.en,ja:main.ja,sc:def.id,at:today()});if(!S.shSaved.some(x=>x.en===main.en))S.shSaved.push({en:main.en,ja:main.ja,at:today()});save();toast('マイフレーズ帳に保存しました')}showCard(L)};
  card.querySelector('#ws-say').onclick=()=>micPanel(card.querySelector('#ws-mic'),main.en,()=>{card.querySelector('#ws-mic').innerHTML=''},{skipLabel:'とじる',doneLabel:'とじる'})}
 // ミッションごとにシーンを最初の状態にもどす(モード2〜4)
 function fresh(mq,mi){W.alive=false;const N=W_new(def);Object.assign(N,{mq,mi,mqMode:mode,alive:true});RT.w=N;render()}
 if(ctl&&ctl.render)ctl.render();
 if(ctl&&ctl.start)ctl.start();
};
VIEWS.wbook=function(app){const L=S.wfav||[];
 app.innerHTML=`<div class="row">${backBtn('うごかす英語ワールド',{name:'world'})}</div>
 <div class="uhead"><span class="eyebrow">MY PHRASES</span><h1>マイフレーズ帳</h1><p>ワールドで保存した英文です。シャドーイングの「保存した英文」からも練習できます。</p></div>
 ${L.length?`<section class="sheet panel"><div class="row" style="margin-bottom:10px"><button class="btn hl" id="wb-sh">シャドーイングで練習</button><button class="btn ghost" id="wb-all">${IC.play}全部聞く</button></div>
 <div class="exs">${L.map((x,i)=>`<div class="ex">${sayBtn(x.en)}<div><div class="e en">${esc(x.en)}</div><div class="j">${esc(x.ja)}</div><div class="row" style="margin-top:4px"><small class="muted">${esc((wMeta(x.sc)||{}).t||'')} ・ ${esc(x.at)}</small><button class="btn ghost sm" data-del="${i}">削除</button></div></div></div>`).join('')}</div></section>`:'<section class="sheet panel"><p>まだ保存した英文はありません。ワールドで英文カードの「☆ フレーズ帳に保存」を押すと、ここに入ります。</p></section>'}
 ${wWeakHtml()}${wTalkHtml()}`;
 wireGo(app);wireSay(app);
 const sh=app.querySelector('#wb-sh');if(sh)sh.onclick=()=>startShadow({items:L.slice(-8).map(x=>({en:x.en,ja:x.ja}))});
 const al=app.querySelector('#wb-all');if(al)al.onclick=()=>speakSeq(L.map(x=>({text:x.en,g:'f',gap:600})));
 app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{L.splice(+b.dataset.del,1);save();render()});
};

// ===== ワールド: 会話ミッションの画面(モード5「実践ミッション」・モード6「英語で生活」) =====
// モード5: 相手の英語を聞き取り、行動や返事を選んで進める(日本語のヒントは少なめ)。自分の声で言うこともできる。
// モード6: 英文の選択肢は出さない。自分の言葉で(声・できなければ入力で)答える。
// どちらも、字幕・和訳・ヒントは押したときだけ出る(使った回数は記録する)。

function wStoryList(el,def,mode){const stories=def.stories||[];
 el.innerHTML=`<div class="wsintro"><b>${mode===5?'実践ミッション':'英語で生活'}</b>
  <p>${mode===5?'登場人物の英語を聞いて、状況を判断して行動・返事をしましょう。返事は英文の選択肢から選ぶか、自分の声で言えます。日本語のヒントは少なめです。':'英文の選択肢は出ません。登場人物からの質問や依頼に、自分の言葉で答えましょう(マイクが使えないときは入力で答えられます)。'}
  途中でトラブルが起きることもあります。</p><button class="linkbtn" data-go='{"name":"wexpr"}'>重点フレーズ10の使い方を見る</button></div>
 <div class="wslist">${stories.map(s=>{const r=(S.wstory||{})[s.id];const me=def.ents.find(e=>e.id===s.me);
  return `<div class="wscard"><div class="row"><b>${esc(s.t)}</b><small class="en muted">${esc(s.en)}</small><span class="sp"></span>${r&&r.clear?`<span class="chip good">${r.perfect?'★ ノーヒント':'✓ クリア'} ${r.clear}回</span>`:''}</div>
   <div class="muted" style="margin:4px 0">あなたの役:<b>${esc(me?me.ja:'')}</b> ・ ${esc(s.desc||'')}</div>
   <div class="row" style="flex-wrap:wrap;gap:4px">${(s.focus||[]).map(f=>`<span class="gtag en">${esc((exprById(f)||{}).en||f)}</span>`).join('')}${(s.variants||[]).length>1?`<span class="gtag">展開 ${s.variants.length}通り</span>`:''}</div>
   <button class="btn hl sm" style="margin-top:8px" data-st="${esc(s.id)}">はじめる</button></div>`}).join('')}</div>`;
 wireGo(el);
 el.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>go({name:'wscene',id:def.id,mode,story:b.dataset.st}))}

function wStoryCtl(c){const {W,def,story,mode,$}=c;story.scene=def.id;W.story=story.id;
 const me=W.ents[story.me];let ST=null;const log=$('#w-log'),now=$('#w-now'),goal=$('#w-sgoal');
 const canTTS='speechSynthesis' in window;
 const gOf=e=>e&&e.pron==='he'?'m':'f';
 // ---- 画面の部品 ----
 function renderGoal(){const steps=story.steps.filter(s=>s.act||s.talk).length;const done=ST?ST.log.acts.filter(a=>a.ok!==false).length+new Set(ST.log.talks.filter(t=>t.kind!=='repeat'&&(t.ok||t.kind==='skip'||t.confirmed)).map(t=>t.step)).size:0;
  goal.innerHTML=`<div class="row"><span class="gtag">${mode===5?'実践ミッション':'英語で生活'}</span><b>${esc(story.t)}</b><small class="en muted">${esc(story.en)}</small><span class="sp"></span><label class="tg"><input type="checkbox" id="w-sub" ${S.set.wSub?'checked':''}> 字幕を常に表示</label></div>
  <div class="muted" style="margin-top:4px">あなたの役:<b>${esc(me.ja)}</b> ・ 目的:${esc(story.goalJa||story.desc||'')}</div>
  <div class="wprog" aria-label="進み具合">${Array.from({length:steps},(_,i)=>`<i class="${i<done?'on':''}"></i>`).join('')}</div>`;
  goal.querySelector('#w-sub').onchange=e=>{S.set.wSub=e.target.checked;save();log.querySelectorAll('.wl').forEach(x=>{if(S.set.wSub)reveal(x,'en')})}}
 function lineHtml(h,name){return `<div class="wl ${h.who==='pa'?'pa':''}" data-h="${ST.log.heard.indexOf(h)}"><div class="wlw">${esc(name)}</div>
  <div class="wlb"><div class="wle en ${h.shownNow?'':'hid'}">${h.shownNow?esc(h.en):'<span class="muted">(英文はかくしています)</span>'}</div><div class="wlj" ${h.jaShown?'':'hidden'}>${esc(h.ja||'')}</div>
  <div class="wlbtn"><button class="say" data-rp="1" aria-label="もう一度聞く">${IC.play}</button><button class="say" data-rp="slow" aria-label="ゆっくり聞く">${IC.slow}</button>
  <button class="linkbtn" data-rv="en">英文</button><button class="linkbtn" data-rv="ja">和訳</button></div></div></div>`}
 function reveal(el,k){const h=ST.log.heard[+el.dataset.h];if(!h)return;
  if(k==='en'&&!h.shownNow){h.shownNow=true;if(!h.noTTS){h.shown=true;if(!S.set.wSub)stHint(ST,'sub')}el.querySelector('.wle').classList.remove('hid');el.querySelector('.wle').textContent=h.en}
  if(k==='ja'&&!h.jaShown){h.jaShown=true;stHint(ST,'ja');el.querySelector('.wlj').hidden=false}}
 function wireLine(el){el.querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>{const h=ST.log.heard[+el.dataset.h];h.replays++;const w=h.who==='pa'?null:W.ents[h.who];speakLine(w,h.tts||h.en,b.dataset.rp==='slow')});
  el.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>reveal(el,b.dataset.rv))}
 async function speakLine(who,en,slow,fast){if(who){setTalking(W,who.id,true)}const off=who&&!who.hidden?talkDots(W,who):()=>{};
  try{await speak(en,{g:gOf(who),slow,fast:fast&&!slow})}finally{off();if(who)setTalking(W,who.id,false)}}
 function myLine(rec){const lab={voice:'声',typed:'入力',choice:'選択'}[rec.how]||'';
  const res=rec.kind==='repeat'?['聞き返しました','good']:rec.kind==='skip'?['言えなかったので、模範の返事で進みます(話した記録には入りません)','bad']:rec.kind==='clarify'?['一部だけ伝わりました。相手が確認しています','']:rec.kind==='unknown'?['伝わらなかったようです','bad']:rec.tone?['伝わりましたが、より自然な言い方があります','']:['伝わりました','good'];
  const d=document.createElement('div');d.className='wl me';
  d.innerHTML=`<div class="wlw">${esc(me.ja)}(あなた)<small class="muted"> ${lab}</small></div><div class="wlb"><div class="en">${rec.text?esc(rec.text):'<span class="muted">—</span>'}</div>
   <div class="wres ${res[1]}">${res[0]}</div>
   ${rec.kind==='intent'||rec.kind==='clarify'||rec.kind==='unknown'?`<div class="chips sm">${rec.how!=='choice'?`<span class="chip"><small>意味</small>${rec.kind==='intent'?(rec.ai?'通じる(AI判定)':'通じる'):rec.kind==='clarify'?'一部':'通じにくい'}</span><span class="chip"><small>英文の一致度</small>${rec.match??'—'}%</span>${rec.conf!=null?`<span class="chip"><small>認識の確信度</small>${Math.round(rec.conf*100)}%</span>`:''}`:''}</div>`:''}
   ${rec.tone&&rec.better?`<div class="wbetter"><small>より自然:</small> <span class="en">${esc(rec.better)}</span> ${sayBtn(rec.better)}</div>`:''}
   ${rec.kind==='skip'?`<div class="wbetter"><small>例:</small> <span class="en">${esc(rec.model)}</span> ${sayBtn(rec.model)}</div>`:''}</div>`;
  log.appendChild(d);wireSay(d);d.scrollIntoView({block:'nearest'})}
 // ---- 進行役(story.js)から呼ばれる画面操作 ----
 const ui={
  async say(who,en,ja,h,o){if(!ST||!ST.alive)return;h.noTTS=!canTTS;h.shownNow=h.shownNow||!canTTS||!!S.set.wSub;if(S.set.wSub&&!h.noTTS)h.shown=true;
   if(o.again){const el=log.querySelector(`.wl[data-h="${ST.log.heard.indexOf(h)}"]`);if(el)el.classList.add('again')}
   else{const tmp=document.createElement('div');tmp.innerHTML=lineHtml(h,o.think?'💭 '+(who===me?'(心の声)':cap(who.en.replace(/^the /,''))):who?cap(who.en.replace(/^the /,'')):'📢 Announcement');const el=tmp.firstElementChild;log.appendChild(el);wireLine(el);el.scrollIntoView({block:'nearest'})}
   now.innerHTML=`<div class="muted wwait">${who?esc(cap(who.en))+' が話しています…':'アナウンス中…'}</div>`;
   await speakLine(who,h.tts||en,o.slow,h.fast&&!o.again);if(!o.pa)await wait(250)},
  task(s,o={}){if(!ST.alive)return;renderGoal();const label=stTx(ST,s.act.ja),hint=stTx(ST,s.act.hint||'');
   now.innerHTML=`${o.again?'<div class="wng">うまくいかなかったようです。相手の言ったことを確かめて、もう一度。</div>':''}
   <div class="wtask"><b>あなたの番(行動)</b> ${mode===5?`<span>${esc(label)}</span>`:`<span id="w-tl" class="muted">状況に合わせて、${esc(me.ja)}を動かしましょう。</span>`}</div>
   <small class="muted">${esc(me.ja)}(あなた)や、相手・物をタップすると動作を選べます。</small>
   <div class="row" style="margin-top:6px">${mode===6?'<button class="btn ghost sm" id="w-tk">やることを見る</button>':''}${hint?'<button class="btn ghost sm" id="w-th">ヒント</button>':''}</div><div id="w-thx"></div>`;
   const tk=now.querySelector('#w-tk');if(tk)tk.onclick=()=>{stHint(ST,'task');now.querySelector('#w-tl').textContent=label;tk.remove()};
   const th=now.querySelector('#w-th');if(th)th.onclick=()=>{stHint(ST,'task');now.querySelector('#w-thx').innerHTML=`<div class="hintbox">${esc(hint)}</div>`;th.remove()}},
  talk(s0,o={}){if(!ST.alive)return;const s=stResolve(ST,s0);renderGoal();const ja=stTx(ST,s.talk.ja||''),hint=stTx(ST,s.talk.hint||'');const to=s.to?W.ents[s.to]:null;
   now.innerHTML=`${o.again?'<div class="wng" style="margin-bottom:4px">もう一度どうぞ。</div>':''}
   <div class="wtask"><b>あなたの番(話す)</b> ${mode===5?`<span>${esc(ja)}</span>`:`<span class="muted">${to?esc(to.ja)+'に':''}英語で話しましょう。</span>`}</div>
   ${mode===5&&s.choices.length?`<div class="wchoice">${shuffle(s.choices.map((x,i)=>i)).map(i=>`<button class="wact" data-ch="${i}"><span class="en">${esc(s.choices[i].en)}</span></button>`).join('')}</div>
    <div class="row"><button class="btn ghost sm" id="w-own">${IC.mic}自分の声で言う</button>${hint?'<button class="btn ghost sm" id="w-hn">ヒント</button>':''}<button class="btn ghost sm" id="w-sk">わからない</button></div><div id="w-hx"></div><div id="w-ab"></div>`
    :`<div id="w-ab"></div>`}`;
   const send=res=>{if(ST&&ST.alive){W.busy=true;stOnAnswer(ST,res).finally(()=>{W.busy=false})}};
   now.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{const ch=s.choices[+b.dataset.ch];send({choice:ch.i,text:ch.en,hint:false})});
   const sk=now.querySelector('#w-sk');if(sk)sk.onclick=()=>send({gaveUp:true,text:''});
   const hn=now.querySelector('#w-hn');if(hn)hn.onclick=()=>{stHint(ST,'talk');now.querySelector('#w-hx').innerHTML=`<div class="hintbox">${esc(hint)}</div>`;hn.remove()};
   const box=()=>answerBox(now.querySelector('#w-ab'),{hintHtml:mode===6?esc(ja)+(hint?'<br>'+esc(hint):''):'',onHint:()=>stHint(ST,'talk'),placeholder:'英語で入力して Enter'}).then(r=>{if(r.hint&&ST.waiting)ST.waiting.hinted=true;send(r)});
   const own=now.querySelector('#w-own');if(own)own.onclick=()=>{own.remove();box()};
   if(mode===6||!s.choices.length)box();
   if(o.offerHint){const h=now.querySelector('#ab-hint')||hn;if(h)h.classList.add('hl')}},
  result(rec){myLine(rec)},
  confirm(m){return new Promise(res=>{now.innerHTML=`<div class="wtask"><b>相手が確認しています</b> <span class="en">"${esc(m)}"</span> で合っていますか?</div>
   <div class="wchoice"><button class="wact" data-y="1"><span class="en">Yes, that's right.</span><small>はい、そうです</small></button><button class="wact" data-y="0"><span class="en">No, that's not what I meant.</span><small>いいえ、ちがいます</small></button></div>`;
   now.querySelectorAll('[data-y]').forEach(b=>b.onclick=()=>{const y=b.dataset.y==='1';const d=document.createElement('div');d.className='wl me';d.innerHTML=`<div class="wlw">${esc(me.ja)}(あなた)</div><div class="wlb en">${y?'Yes, that\'s right.':'No, that\'s not what I meant.'}</div>`;log.appendChild(d);res(y)})})},
  finish(fb){renderGoal();$('#w-menu').innerHTML='';now.innerHTML=wFeedbackHtml(fb,mode);wireSay(now);
   const nx=(def.stories||[]).findIndex(x=>x.id===story.id)+1;
   now.querySelector('#fb-again').onclick=()=>{RT.stOpt=null;render()};
   now.querySelector('#fb-list').onclick=()=>go({name:'wscene',id:def.id,mode},true);
   const n=now.querySelector('#fb-next');if(n){if(nx<def.stories.length)n.onclick=()=>go({name:'wscene',id:def.id,mode,story:def.stories[nx].id},true);else n.remove()}
   if(fb.goal)confetti();now.scrollIntoView({block:'start',behavior:'smooth'})}};
 return {role:story.me,
  extra(a,t){if(!ST||!ST.waiting)return [];const list=[...(story.acts||[]),...((ST.waiting.s&&ST.waiting.s.acts)||[])];
   return list.filter(x=>(x.on||null)===(t?t.id:null)&&(!x.if||stCond(ST,x.if))).map(x=>wA(stTx(ST,x.en),stTx(ST,x.ja),async()=>{if(x.near&&t)await goNear(W,a,t);await stOps(ST,x.do||[]);
    return {v:'custom',act:x.id,a,o:t||null,tx:{prog:(x.tx.prog||[]).map(s=>stTx(ST,s)),past:(x.tx.past||[]).map(s=>stTx(ST,s)),state:x.tx.state?(x.tx.state).map(s=>stTx(ST,s)):null}}}))},
  onEvents(evs){return ST&&stOnEvents(ST,evs)},
  async start(){const opt=RT.stOpt||{};ST=stNew(W,story,mode,ui,opt);RT.st=ST;
   if(story.init)await stOps(ST,story.init);W.draw();renderGoal();
   const intro=stTx(ST,story.intro||'');log.innerHTML=intro?`<div class="wintro">${esc(intro)}</div>`:'';
   await wait(300);if(ST.alive){W.busy=true;try{await stRun(ST)}finally{W.busy=false}}}}}

// ---- 会話後の学習フィードバック ----
function wFeedbackHtml(fb,mode){const m=fb.metrics;const pct=v=>v==null?'—':v+'%';
 const heard=fb.heard.filter(h=>h.who!=='me');
 return `<div class="wfb">
 <div class="wfbh ${fb.goal?'ok':''}">${fb.goal?(fb.perfect?'★ ノーヒントでミッション達成!':'ミッション達成!'):'ミッションは未達成です'}<small>${fb.sec}秒</small></div>
 <div class="chips">
  <span class="chip"><small>意味の正確性</small>${pct(m.meaning)}</span>
  <span class="chip"><small>英文の一致度</small>${pct(m.match)}</span>
  <span class="chip"><small>発音の目安(音声認識の確信度)</small>${m.pron==null?'声の回答なし':m.pron+'%'}</span>
  <span class="chip ${fb.hints?'':'good'}"><small>ヒント</small>${fb.hints}回</span></div>
 <small class="muted">意味=相手に一度で伝わった割合 / 一致度=模範の英文との文字の一致 / 確信度=ブラウザの音声認識がどれだけ確かに聞き取れたか(発音の正式な採点ではありません)。それぞれ別の指標です。</small>
 <h4>聞き取れた内容</h4><div class="wfbl">${heard.map(h=>`<div class="ex">${sayBtn(h.en)}<div><div class="en">${esc(h.en)}</div><div class="j">${esc(h.ja||'')}</div><small class="${h.help?'':'good'}">${h.help?[h.shown?'字幕':'',h.jaShown?'和訳':'',h.asked?'聞き返し':''].filter(Boolean).join('・')+'を使って理解':'音声だけで理解'}${h.replays?` ・ 再生${h.replays}回`:''}</small></div></div>`).join('')||'<p class="muted">—</p>'}</div>
 <h4>正しく実行できた行動</h4><ul class="wfbu">${fb.acts.filter(a=>a.ok!==false).map(a=>`<li>${esc(a.label)}${a.hint?' <small class="muted">(ヒントあり)</small>':''}</li>`).join('')||'<li class="muted">—</li>'}</ul>
 ${fb.acts.some(a=>a.ok===false)?`<div class="muted">まちがえた行動:${fb.acts.filter(a=>a.ok===false).map(a=>esc(a.label)).join('、')}</div>`:''}
 <h4>自分で話せた英文</h4>${fb.spoken.length?`<ul class="wfbu en">${fb.spoken.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:`<p class="muted">${mode===5?'声で答えた英文はありません(選択肢で答えた分は「話せた」に入りません)。':'声で答えた英文はありません。'}</p>`}
 ${fb.typed.length?`<div class="muted">入力で答えた英文:${fb.typed.map(esc).join(' / ')}</div>`:''}
 ${fb.chose.length?`<div class="muted">選んで答えた英文:${fb.chose.map(esc).join(' / ')}</div>`:''}
 ${fb.mistakes.filter(x=>x.kind==='talk').length?`<h4>会話で間違えた・伝わりにくかった表現</h4>${fb.mistakes.filter(x=>x.kind==='talk').map(x=>`<div class="ex">${sayBtn(x.model)}<div>${x.said?`<div><s class="muted">${esc(x.said)}</s></div>`:'<div class="muted">(言えなかった)</div>'}<div class="en"><b>${esc(x.model)}</b></div>${x.why?`<small class="muted">${esc(x.why)}</small>`:''}</div></div>`).join('')}`:''}
 <h4>より自然な言い方・言い換え</h4>${fb.para.map(p=>`<div class="ex">${sayBtn(p.model)}<div><div class="en"><b>${esc(p.model)}</b>${p.focus?` <span class="gtag">${esc((exprById(p.focus)||{}).ja||'')}</span>`:''}</div><div class="j">${esc(p.ja||'')}</div>${p.alts.length?`<small class="en muted">ほかにも:${p.alts.map(esc).join(' / ')}</small>`:''}${p.better?`<div class="en"><small class="muted">AIの言い換え:</small> ${esc(p.better)}</div>`:''}</div></div>`).join('')||'<p class="muted">—</p>'}
 <h4>次回復習するフレーズ</h4>${fb.review.length?`<div class="wfbl">${fb.review.map(r=>`<div class="ex">${sayBtn(r.en)}<div><div class="en">${esc(r.en)}</div><div class="j">${esc(r.ja)}</div><small class="muted">${esc(r.why)}</small></div></div>`).join('')}</div><small class="muted">「苦手リスト」(復習)に追加しました。</small>`:'<p class="muted">今回はありません。</p>'}
 <div class="row" style="margin-top:12px"><button class="btn hl" id="fb-again">もう一度(展開が変わることがあります)</button><button class="btn ghost" id="fb-list">ミッション一覧</button>${'<button class="btn ghost" id="fb-next">次のミッション →</button>'}</div></div>`}

// ---- 重点フレーズ10 ----
VIEWS.wexpr=function(app){const t=wTalkStat();const where={};for(const s of WMAN)for(const st of s.st||[])for(const f of st.focus||[])(where[f]=where[f]||[]).push({sc:s,st});
 app.innerHTML=`<div class="row">${backBtn('うごかす英語ワールド',{name:'world'})}</div>
 <div class="uhead"><span class="eyebrow">KEY PHRASES</span><h1>重点フレーズ10</h1><p>会話ミッションで重点的に練習する表現です。使う場面・自然な音声・返答例を確認してから、ミッションで使ってみましょう。</p></div>
 ${EXPR.map(x=>{const f=t.f[x.id];return `<section class="sheet panel wexp"><div class="row"><span class="gtag">${esc(x.ja)}</span><b class="en" style="font-size:20px">${esc(x.en)}</b><span class="sp"></span><small class="muted">${f?`ヒントなしで成功 ${f[0]}/${f[1]}回`:'まだ使っていません'}</small></div>
  <p>${esc(x.use)}</p>
  <div class="exs">${x.ex.map(([e,j])=>`<div class="ex">${sayBtn(e)}<div><div class="e en">${esc(e)}</div><div class="j">${esc(j)}</div></div></div>`).join('')}</div>
  <div class="eyebrow" style="margin-top:6px">返答の例</div><div class="exs">${x.resp.map(([e,j])=>`<div class="ex">${sayBtn(e,'m')}<div><div class="e en">${esc(e)}</div><div class="j">${esc(j)}</div></div></div>`).join('')}</div>
  ${(where[x.id]||[]).length?`<div class="row" style="flex-wrap:wrap;gap:6px;margin-top:8px"><small class="muted">練習できるミッション:</small>${where[x.id].map(w=>`<button class="btn ghost sm" data-go='${JSON.stringify({name:'wscene',id:w.sc.id,mode:5,story:w.st.id})}'>${esc(w.sc.t)}「${esc(w.st.t)}」</button>`).join('')}</div>`:''}
 </section>`}).join('')}`;
 wireGo(app);wireSay(app)};

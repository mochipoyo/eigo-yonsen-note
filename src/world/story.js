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
   case 'pos':who.x=o.x;who.y=o.y??who.y;if(o.flip!=null)who.flip=o.flip;W.draw();break;
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

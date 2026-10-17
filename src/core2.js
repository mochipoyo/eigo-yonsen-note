// ===== core2: 学習ログ・日別記録・苦手リスト・テーマ・分析・バックアップ =====
const THEMES=[
 {k:'daily',n:'日常英会話'},{k:'travel',n:'海外旅行'},{k:'business',n:'ビジネス英語'},{k:'fx',n:'投資・FX'},{k:'stocks',n:'株式市場'},
 {k:'tech',n:'AI・テクノロジー'},{k:'space',n:'天文学・宇宙'},{k:'science',n:'科学'},{k:'music',n:'音楽・エレキギター'}];
const thName=k=>(THEMES.find(t=>t.k===k)||{n:k}).n;
const inThemes=it=>!S.themes.length||S.themes.includes(it.theme);
const ILV=[{n:1,k:'初級'},{n:2,k:'中級'},{n:3,k:'上級'},{n:4,k:'達人'}];
const SPEAK_MODES=['ins','ph','qst','ai'];// 自分で英語を作って話すモード

// ---- 日別の記録(カレンダー・成長比較・日替わりクエスト用) ----
function dayRec(d=today()){let r=S.days[d];if(!r){r=S.days[d]={xp:0,sec:0,said:0,free:0,ok:0,n:0,ins:0,ph:0,lis:0,sh:0,qst:0,rv:0,rd:-1}}
 return r}
let lastAct=0;
function activity(){// 操作と操作の間隔(最大60秒)を学習時間として数える
 const now=Date.now();if(lastAct&&now-lastAct<60000)dayRec().sec+=Math.round((now-lastAct)/1000);lastAct=now}
// ---- 学習イベントの記録(苦手分析のもと) ----
// m: モード, ok: 正解/通じた, ms: 反応時間, h: ヒント使用, r: 参照ID, f: 自力で作った発話か
function logEv(e){activity();const d=today();const rec=dayRec(d);
 const ev={d,m:e.m,ok:e.ok?1:0,ms:e.ms||0,h:e.h?1:0,r:e.r||'',f:e.f?1:0};
 // 同じ問題の二重記録を防ぐ(同じ参照IDの記録が直前1.5秒以内なら捨てる)
 const L=S.log[S.log.length-1];if(L&&L.r&&L.r===ev.r&&L.m===ev.m&&Date.now()-(S._lastLogAt||0)<1500)return;
 S._lastLogAt=Date.now();S.log.push(ev);if(S.log.length>3000)S.log.splice(0,S.log.length-3000);
 rec.n++;if(ev.ok)rec.ok++;if(ev.f){rec.free++}
 if(rec[e.m]!=null)rec[e.m]++;
 checkQuests();save()}
// ---- 苦手フレーズ ----
function addWeak(en,ja,src){if(!en)return;const k=en.trim().toLowerCase();let w=S.weak.find(x=>x.en.toLowerCase()===k);
 if(w){w.n++;w.at=today()}else{S.weak.push({en:en.trim(),ja:ja||'',src:src||'',at:today(),n:1,b:0,due:today()});if(S.weak.length>400)S.weak.shift()}save()}
function weakOk(en){const k=(en||'').trim().toLowerCase();const i=S.weak.findIndex(x=>x.en.toLowerCase()===k);if(i<0)return;
 const w=S.weak[i];w.b=(w.b||0)+1;w.due=dayPlus([1,3,7][Math.min(w.b,3)-1]||7);
 if(w.b>=3){S.weak.splice(i,1);toast('苦手を克服しました:<span class="en">'+esc(w.en)+'</span>','lvup');confetti();S.overcome=(S.overcome||0)+1;checkBadges()}save()}
const weakDue=()=>S.weak.filter(w=>(w.due||'')<=today());

// ---- 間隔反復(フレーズ・単語共通の考え方) ----
// 箱 0〜5。思い出して言えた → 1つ上へ。ヒントあり → 箱は上げず短い間隔。答えを見た/言えない → 箱1から。
const SRS_GAP=[0,1,3,7,16,35];
function srsUpdate(st,res){// res: {recall:bool, hint:bool, ms:number}
 st=st||{b:0,due:today(),n:0};st.n=(st.n||0)+1;st.last=today();
 if(res.recall&&!res.hint){st.b=Math.min(5,(st.b||0)+1);let g=SRS_GAP[st.b];
  if(res.ms&&res.ms<3000)g=Math.round(g*1.25);else if(res.ms>8000)g=Math.max(1,Math.round(g*0.7));
  st.due=dayPlus(Math.max(1,g));st.streak=(st.streak||0)+1}
 else if(res.recall&&res.hint){st.b=Math.max(1,Math.min(st.b||0,2));st.due=dayPlus(Math.max(1,Math.round(SRS_GAP[st.b]*0.6)));st.streak=0}
 else{st.b=1;st.due=dayPlus(1);st.streak=0}
 return st}

// ---- 分析 ----
function rate(evs){return evs.length?evs.filter(e=>e.ok).length/evs.length:null}
const median=a=>{if(!a.length)return null;const b=[...a].sort((x,y)=>x-y);return b[Math.floor(b.length/2)]};
function metrics(since){
 const L=since?S.log.filter(e=>e.d>=since):S.log;
 const last=(ms,n)=>L.filter(e=>ms.includes(e.m)).slice(-n);
 const sp=last(SPEAK_MODES,80);
 const phs=Object.values(S.ph);
 const days7=[...Array(7)].map((_,i)=>dayPlus(-i));
 let rvDone=0,rvDue=0;days7.forEach(d=>{const r=S.days[d];if(r&&r.rd>0){rvDue+=r.rd;rvDone+=Math.min(r.rv,r.rd)}});
 return {
  listen:rate(last(['lis','p2','p3'],80)),
  produce:sp.length?sp.filter(e=>e.ok&&e.f&&!e.h).length/sp.length:null,
  speed:median(sp.filter(e=>e.ms>0).map(e=>e.ms)),
  retain:phs.length?phs.filter(p=>p.b>=4).length/phs.length:null,
  grammar:rate(last(['gram','p5','p6','sch'],80)),
  review:rvDue?rvDone/rvDue:null,
  nohint:sp.length?sp.filter(e=>!e.h).length/sp.length:null,
  nSpeak:sp.length};
}
// 英会話レベル(経験値ではなく、話す・聞く力の実績から決める)
const TALK_TITLES=[{n:'あいさつ',d:'まずは英語を口に出すところから'},{n:'ひとこと',d:'短い返事が言える'},{n:'やりとり',d:'簡単な質問に答えられる'},{n:'日常会話',d:'身近な話題で会話を続けられる'},{n:'意見が言える',d:'理由をつけて考えを話せる'},{n:'議論ができる',d:'ヒントなしで素早く話せる'}];
function talkLevel(){const m=metrics();const n=m.nSpeak;
 if(n<10)return 0;
 let s=0;const p=m.produce||0,l=m.listen??0.5,sp=m.speed||9000,nh=m.nohint||0;
 s+=p*3+l*1.2+nh*1.2+(sp<3000?1.2:sp<5000?0.8:sp<8000?0.4:0)+Math.min(1,n/200);
 return Math.max(1,Math.min(5,Math.floor(s)))}

// ---- 日替わりクエスト・週間チャレンジ ----
const DQ_POOL=[
 {id:'ins5',n:'瞬間英会話を5問',k:'ins',goal:5},{id:'ph',n:'フレーズ復習を3つ',k:'ph',goal:3},{id:'lis5',n:'耳から英語を5問',k:'lis',goal:5},
 {id:'sh5',n:'シャドーイングで5文',k:'sh',goal:5},{id:'qst1',n:'会話クエストに1回挑戦',k:'qst',goal:1},{id:'free5',n:'自分の言葉で5回話す',k:'free',goal:5},
 {id:'said10',n:'声に出して10回',k:'said',goal:10}];
function ensureQuests(){const d=today();
 if(!S.dq||S.dq.d!==d){// 日付から決まる3つ(毎日入れ替わり)
  const seed=+d.replace(/-/g,'');const pool=[...DQ_POOL];const pickd=[];let x=seed;
  while(pickd.length<3){x=(x*9301+49297)%233280;const i=x%pool.length;pickd.push(pool.splice(i,1)[0].id)}
  S.dq={d,ids:pickd,done:{}}}
 const wk=weekKey();if(!S.wk||S.wk.w!==wk)S.wk={w:wk,done:{}}}
function weekKey(){const d=new Date();const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return ymd(d)}
function weekDays(){const w=weekKey();return [...Array(7)].map((_,i)=>{const d=new Date(w);d.setDate(d.getDate()+i);return ymd(d)})}
const WK=[{id:'days4',n:'今週4日以上学習する',goal:4,val:()=>weekDays().filter(d=>S.days[d]&&S.days[d].n>0).length},
 {id:'free30',n:'今週、自分の言葉で30回話す',goal:30,val:()=>weekDays().reduce((s,d)=>s+((S.days[d]||{}).free||0),0)}];
function dqVal(q){const r=dayRec();return q.k==='said'?(r.said||0):(r[q.k]||0)}
function checkQuests(){if(!S.dq)return;ensureQuests();
 S.dq.ids.forEach(id=>{const q=DQ_POOL.find(x=>x.id===id);if(q&&!S.dq.done[id]&&dqVal(q)>=q.goal){S.dq.done[id]=1;S.xp+=15;dayRec().xp+=15;setTimeout(()=>toast('きょうのクエスト達成:'+q.n+' +15 XP','lvup'),300);
  if(S.dq.ids.every(i=>S.dq.done[i]))setTimeout(confetti,500)}});
 WK.forEach(w=>{if(!S.wk.done[w.id]&&w.val()>=w.goal){S.wk.done[w.id]=1;S.xp+=60;setTimeout(()=>toast('週間チャレンジ達成:'+w.n+' +60 XP','lvup'),600)}})}

// ---- バックアップ(JSON書き出し・読み込み) ----
function exportData(){
 const blob=new Blob([JSON.stringify({app:'eigo-yonsen-note',schema:SCHEMA,exported:new Date().toISOString(),data:S},null,1)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='eigo-yonsen-note-backup-'+today()+'.json';document.body.appendChild(a);a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000)}
function parseImport(text){let j;try{j=JSON.parse(text)}catch(e){throw new Error('JSONとして読み込めませんでした。')}
 const d=j&&j.app==='eigo-yonsen-note'&&j.data?j.data:(j&&typeof j==='object'&&'xp'in j?j:null);
 if(!d||typeof d!=='object')throw new Error('えいご4線ノートの学習記録ではないようです。');
 if(typeof d.xp!=='number')throw new Error('学習記録の形式が正しくありません。');
 return migrate(d)}
function applyImport(newS){try{localStorage.setItem(KEY+'-before-import',JSON.stringify(S))}catch(e){}
 const set=S.set;S=newS;if(!S.set)S.set=set;save();applyTheme()}

// 「おかえりなさい」(休んでもペナルティなし。再開しやすく)
function welcomeBack(){const prev=S.lastSeen;const d=today();S.lastSeen=d;
 if(prev&&prev<dayPlus(-2)){const gap=Math.round((new Date(d)-new Date(prev))/864e5);return gap}return 0}

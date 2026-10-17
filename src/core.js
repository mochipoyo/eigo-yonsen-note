// ===== core: データ統合・保存・XP・スタンプ・共通部品 =====
const VOC=(()=>{const seen=new Set();return [...VOC1,...VOC2].filter(v=>{const k=v.w.toLowerCase();if(seen.has(k))return false;seen.add(k);return true})})();
const GRAM=[...GRAM1,...GRAM2].sort((a,b)=>a.id.localeCompare(b.id));
const gById=id=>GRAM.find(u=>u.id===id);
const tById=id=>TALK.find(t=>t.id===id);
const LV=[{n:1,k:'基礎',s:'〜600'},{n:2,k:'標準',s:'600〜730'},{n:3,k:'応用',s:'730〜860'},{n:4,k:'上級',s:'860〜990'}];
const lvTag=n=>`<span class="gtag l${n}">${LV[n-1].k}</span>`;

const KEY='eigo-yonsen-v1';
const DEF={xp:0,correct:0,answered:0,maxCombo:0,streak:0,last:'',daily:{d:'',xp:0,v:0,t:0,q:0},badges:{},
 gStars:{},gRead:{},gBuild:{},tStars:{},said:0,saidGood:0,voc:{},vlv:1,goal:2,gTab:0,tTab:0,
 tc:{p2:[0,0],p3:[0,0],p5:[0,0],p6:[0,0],p7:[0,0]},miss:[],
 set:{accent:'en-US',rate:1,theme:'auto',showJa:true,hideEn:false,voice:''}};
let S=(()=>{try{const s=JSON.parse(localStorage.getItem(KEY));if(!s)return structuredClone(DEF);const o={...structuredClone(DEF),...s};o.set={...DEF.set,...(s.set||{})};o.tc={...DEF.tc,...(s.tc||{})};o.daily={...DEF.daily,...(s.daily||{})};return o}catch(e){return structuredClone(DEF)}})();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>ymd(new Date());
const dayPlus=n=>{const d=new Date();d.setDate(d.getDate()+n);return ymd(d)};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,n)=>shuffle(a).slice(0,n);
const DAILY=60;
const TITLES=['はじめの一言','あいさつ上手','旅する英語','雑談デビュー','会議に参加','電話もこわくない','意見が言える人','交渉人','英語で働く人','ことばの達人'];
const lvOf=xp=>{let L=1;while(30*(L+1)*L<=xp)L++;return L};
const lvBase=L=>30*L*(L-1);
const title=L=>TITLES[Math.min(L-1,TITLES.length-1)];
function dailyNow(){const d=today();if(S.daily.d!==d)S.daily={d,xp:0,v:0,t:0,q:0};return S.daily}

function applyTheme(){const r=document.documentElement;if(S.set.theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',S.set.theme)}
function toast(msg,cls){const t=document.getElementById('toast');const d=document.createElement('div');d.innerHTML=msg;if(cls)d.className=cls;t.appendChild(d);setTimeout(()=>d.remove(),2600)}
function addXP(n){const before=lvOf(S.xp);S.xp+=n;const d=today();
 if(S.last!==d){S.streak=S.last===dayPlus(-1)?S.streak+1:1;S.last=d}
 const D=dailyNow();const wasDone=D.xp>=DAILY;D.xp+=n;
 const after=lvOf(S.xp);if(after>before){toast(`レベルアップ! Lv.${after}「${title(after)}」`,'lvup');confetti()}
 if(!wasDone&&D.xp>=DAILY)toast('きょうの目標 達成!','lvup');
 checkBadges();save();renderChip()}

const vMastered=()=>Object.values(S.voc).filter(x=>x.b>=4).length;
const vSeen=()=>Object.keys(S.voc).length;
const BADGES=[
 {id:'first',n:'はじめての正解',s:'初正解',ok:()=>S.correct>=1},
 {id:'c100',n:'正解 100 問',s:'100問',ok:()=>S.correct>=100},
 {id:'c500',n:'正解 500 問',s:'500問',ok:()=>S.correct>=500},
 {id:'cb10',n:'10 問連続正解',s:'10連続',ok:()=>S.maxCombo>=10},
 {id:'say1',n:'はじめて声に出した',s:'第一声',ok:()=>S.said>=1},
 {id:'say50',n:'50 回 発話練習',s:'50回',ok:()=>S.said>=50},
 {id:'good30',n:'発音 80% 以上を 30 回',s:'いい声',ok:()=>S.saidGood>=30},
 {id:'v50',n:'単語 50 語 定着',s:'50語',ok:()=>vMastered()>=50},
 {id:'v200',n:'単語 200 語 定着',s:'200語',ok:()=>vMastered()>=200},
 {id:'v500',n:'単語 500 語 定着',s:'500語',ok:()=>vMastered()>=500},
 {id:'t1',n:'はじめての会話シーン',s:'会話',ok:()=>Object.keys(S.tStars).length>=1},
 {id:'tall',n:'全会話シーン クリア',s:'会話<br>全制覇',ok:()=>TALK.every(t=>S.tStars[t.id]>=1)},
 {id:'gall',n:'全文法単元 クリア',s:'文法<br>全制覇',ok:()=>GRAM.every(g=>S.gStars[g.id]>=1)},
 {id:'g3',n:'文法 全単元で星3つ',s:'文法<br>満点',ok:()=>GRAM.every(g=>S.gStars[g.id]>=3)},
 {id:'toeic',n:'TOEIC形式 全Partに挑戦',s:'全Part',ok:()=>Object.values(S.tc).every(x=>x[1]>0)},
 {id:'st3',n:'3 日連続で学習',s:'3日',ok:()=>S.streak>=3},
 {id:'st7',n:'7 日連続で学習',s:'7日',ok:()=>S.streak>=7},
 {id:'st30',n:'30 日連続で学習',s:'30日',ok:()=>S.streak>=30}];
function checkBadges(){BADGES.forEach(b=>{if(!S.badges[b.id]&&b.ok()){S.badges[b.id]=today();setTimeout(()=>toast(`スタンプ獲得:${b.n}`),400)}})}
function renderChip(){const L=lvOf(S.xp),b=lvBase(L),nx=lvBase(L+1);document.getElementById('chip').innerHTML=`<span class="lv">Lv.${L}</span><span class="xpbar" title="次のレベルまで ${nx-S.xp} XP"><span style="width:${(S.xp-b)/(nx-b)*100}%"></span></span><span class="lv xpt">${S.xp} XP</span>`}

// ---- icons ----
const IC={
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a4.5 4.5 0 010 7M18.5 6a8 8 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
 mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>',
 slow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 17h13a4 4 0 000-8c-2 0-3 1-4 3-1-2-3-4-6-3"/><circle cx="19" cy="7" r="1.5"/></svg>',
 talk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h11v8H9l-4 3v-3H4z"/><path d="M15 9h5v8h-1v3l-4-3h-4v-2"/></svg>',
 book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h6a2 2 0 012 2v12a2 2 0 00-2-2H4zM20 5h-6a2 2 0 00-2 2v12a2 2 0 012-2h6z"/></svg>',
 card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3h12a2 2 0 012 2v10"/></svg>',
 test:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.5 1.5L12 7M8 14l1.5 1.5L12 13M14 8h3M14 14h3"/></svg>',
 redo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v4h4"/></svg>'};
const sayBtn=(text,g,extra='')=>`<button class="say" data-say="${esc(text)}" data-g="${g||'f'}" ${extra} aria-label="読み上げ">${IC.play}</button>`;
// 画面内の [data-say] ボタンをまとめて有効化
function wireSay(root){root.querySelectorAll('[data-say]').forEach(b=>b.onclick=async e=>{e.stopPropagation();root.querySelectorAll('.say.on').forEach(x=>x.classList.remove('on'));b.classList.add('on');await speak(b.dataset.say,{g:b.dataset.g,slow:b.dataset.slow==='1'});b.classList.remove('on')})}
const blankify=s=>esc(s).replace(/_{3,}/g,'<span class="blank"></span>');

function ring(p){const r=54,c=2*Math.PI*r;return `<svg viewBox="0 0 118 118" aria-hidden="true"><circle cx="59" cy="59" r="${r}" fill="none" stroke="var(--grid2)" stroke-width="7"/><circle cx="59" cy="59" r="${r}" fill="none" stroke="var(--red)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-Math.min(1,p))}" transform="rotate(-90 59 59)"/></svg>`}
const starStr=n=>`<span class="stars">${[0,1,2].map(i=>`<span class="${i<n?'on':''}">★</span>`).join('')}</span>`;
const hana=`<svg class="hana" viewBox="0 0 64 64"><path d="M32 8c8 0 10 9 4 13 9-3 14 6 8 11 8 2 7 13-2 13 3 8-6 13-11 7-4 7-14 4-12-4-9 1-11-10-4-13-7-5-2-14 6-11-3-8 5-14 11-16z"/></svg>`;

// ---- confetti ----
function confetti(){const cv=document.getElementById('fx');if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=cv.getContext('2d');cv.width=innerWidth;cv.height=innerHeight;
 const cols=['#d9473b','#2a63c4','#1f8455','#ffe04a'];const P=Array.from({length:90},()=>({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*12,vy:Math.random()*-12-3,r:Math.random()*6+3,c:cols[Math.floor(Math.random()*4)],a:Math.random()*6}));
 let f=0;(function tick(){c.clearRect(0,0,cv.width,cv.height);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=.2;c.save();c.translate(p.x,p.y);c.rotate(p.a);c.fillStyle=p.c;c.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);c.restore()});if(++f<110)requestAnimationFrame(tick);else c.clearRect(0,0,cv.width,cv.height)})()}

// ---- router ----
let V={name:'home'};let RT={};// RT = 実行中の画面の一時データ(クイズの進行など)
const VIEWS={};
function go(v,replace){stopSpeak();stopListen();V=v;try{replace?history.replaceState(v,''):history.pushState(v,'')}catch(e){}render();window.scrollTo({top:0,behavior:'instant'in window?'instant':'auto'})}
window.addEventListener('popstate',e=>{stopSpeak();stopListen();V=e.state||{name:'home'};if(V.name==='quiz'||V.name==='vsess')V={name:'home'};render()});
function render(){renderChip();const app=document.getElementById('app');(VIEWS[V.name]||VIEWS.home)(app)}
const backBtn=(label,v)=>`<button class="back" data-go='${JSON.stringify(v)}'>← ${label}</button>`;
function wireGo(root){root.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(JSON.parse(b.dataset.go)))}

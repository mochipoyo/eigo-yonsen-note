// ===== speech: 読み上げ(speechSynthesis)と音声認識(SpeechRecognition) =====
const TTS={voices:[],ready:false};
function loadVoices(){if(!('speechSynthesis'in window))return;TTS.voices=speechSynthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang));TTS.ready=TTS.voices.length>0}
if('speechSynthesis'in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices}
const FEM=/female|samantha|victoria|karen|moira|tessa|fiona|serena|zira|susan|allison|ava|joanna|kendra|kimberly|salli|libby|sonia|natasha|jenny|aria|michelle|catherine|hazel|emma|olivia|amy|nicky|kate|martha|google us english$/i;
const MAL=/\bmale|daniel|alex\b|fred|david|mark|george|guy|ryan|william|james|thomas|oliver|arthur|aaron|gordon|rishi|brian|matthew|joey|justin|lee|tom\b|evan|reed|eddy|rocko/i;
const ACC={'en-US':'アメリカ','en-GB':'イギリス','en-AU':'オーストラリア','en-CA':'カナダ'};
function voicesFor(lang){const L=lang.toLowerCase().replace('_','-');let v=TTS.voices.filter(x=>x.lang.toLowerCase().replace('_','-').startsWith(L));return v}
let mixPick={};
function pickVoice(g,lang){
 if(!TTS.ready)loadVoices();
 if(lang==='mix'){const ls=Object.keys(ACC).filter(l=>voicesFor(l).length);lang=ls.length?ls[Math.floor(Math.random()*ls.length)]:'en-US'}
 let list=voicesFor(lang);if(!list.length)list=voicesFor('en-US');if(!list.length)list=TTS.voices;
 if(!list.length)return {voice:null,pitch:g==='m'?.85:1.05,lang};
 const pref=S.set.voice&&list.find(v=>v.name===S.set.voice);
 const isF=v=>FEM.test(v.name),isM=v=>!isF(v)&&MAL.test(v.name);
 // 品質の高い音声(Google, Natural, Enhanced, Premium)を優先
 const good=v=>/google|natural|enhanced|premium|neural/i.test(v.name)?1:0;
 const sorted=[...list].sort((a,b)=>good(b)-good(a));
 let v=g==='m'?sorted.find(isM):sorted.find(isF);
 if(!v&&pref)v=pref;
 if(!v)v=sorted[0];
 const pitch=(g==='m'&&!isM(v))?.8:(g==='f'&&isM(v))?1.2:1;
 return {voice:v,pitch,lang:v.lang||lang};
}
let speakId=0;
function speak(text,opt={}){
 return new Promise(res=>{
  if(!('speechSynthesis'in window)){toast('このブラウザは読み上げに未対応です');return res(false)}
  const id=++speakId;const u=new SpeechSynthesisUtterance(text.replace(/____/g,'blank'));
  const p=pickVoice(opt.g||'f',opt.lang||S.set.accent);
  if(p.voice)u.voice=p.voice;u.lang=p.lang;u.pitch=p.pitch;u.rate=(opt.slow?0.72:1)*S.set.rate;
  let done=false;const fin=()=>{if(done)return;done=true;clearTimeout(t);res(id===speakId)};
  u.onend=fin;u.onerror=fin;
  const t=setTimeout(fin,1500+text.length*120/u.rate);
  speechSynthesis.speak(u);
 });
}
function stopSpeak(){speakId++;if('speechSynthesis'in window)speechSynthesis.cancel()}
async function speakSeq(arr){// arr: [{text,g}]  — 途中で別の再生が始まったら止まる
 stopSpeak();const my=speakId;
 for(const a of arr){if(my!==speakId)return false;await speak(a.text,{g:a.g,lang:a.lang});if(my!==speakId)return false;await wait(a.gap||350)}
 return true;
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));

// ---- 音声認識 ----
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const canListen=!!SR;
let recNow=null;
function listen(){
 return new Promise((res,rej)=>{
  if(!SR)return rej('unsupported');
  stopSpeak();
  const r=new SR();recNow=r;r.lang=S.set.accent==='en-GB'?'en-GB':'en-US';r.interimResults=false;r.maxAlternatives=5;r.continuous=false;
  let got=null;
  r.onresult=e=>{const alts=[];for(let i=0;i<e.results[0].length;i++)alts.push(e.results[0][i].transcript);got=alts};
  r.onerror=e=>{recNow=null;rej(e.error||'error')};
  r.onend=()=>{recNow=null;got?res(got):rej('no-speech')};
  try{r.start()}catch(e){rej('busy')}
 });
}
function stopListen(){if(recNow){try{recNow.stop()}catch(e){}}}
const NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
function normWords(s){
 s=s.toLowerCase().replace(/[’‘]/g,"'")
  .replace(/\bwon't\b/g,'will not').replace(/\bcan't\b/g,'can not').replace(/\bcannot\b/g,'can not').replace(/\bshan't\b/g,'shall not')
  .replace(/n't\b/g,' not').replace(/'re\b/g,' are').replace(/'m\b/g,' am').replace(/'ll\b/g,' will').replace(/'ve\b/g,' have').replace(/'d\b/g,' would')
  .replace(/\b(\d+)\b/g,(m,d)=>NUMW[+d]||d).replace(/%/g,' percent').replace(/&/g,' and ')
  .replace(/[^a-z0-9' ]+/g,' ').replace(/'s\b/g,'s').replace(/'/g,'');
 return s.split(/\s+/).filter(Boolean);
}
function lcsMatch(a,b){// a=expected words, b=heard words -> [lcsLen, hit flags for a]
 const n=a.length,m=b.length,dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
 for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
 const hit=new Array(n).fill(false);let i=0,j=0;
 while(i<n&&j<m){if(a[i]===b[j]){hit[i]=true;i++;j++}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++}
 return [dp[0][0],hit];
}
function scoreSpeech(expected,alts){
 const ew=normWords(expected);let best={score:0,heard:alts[0]||'',hit:ew.map(()=>false)};
 for(const h of alts){const hw=normWords(h);const [l,hit]=lcsMatch(ew,hw);const sc=Math.round(200*l/(ew.length+hw.length||1));if(sc>best.score)best={score:sc,heard:h,hit}}
 // 表示用: 元の単語ごとに当否(短縮形の展開で語数がずれる場合は全体スコアのみ)
 const ow=expected.split(/\s+/);let k=0;
 best.marks=ow.map(w=>{const n=normWords(w).length;const ok=n===0||best.hit.slice(k,k+n).every(Boolean);k+=n;return `<span class="${ok?'hit':'miss'}">${esc(w)}</span>`}).join(' ');
 return best;
}

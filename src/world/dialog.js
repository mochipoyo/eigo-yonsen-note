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

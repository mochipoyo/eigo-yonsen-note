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

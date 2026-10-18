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

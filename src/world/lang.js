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

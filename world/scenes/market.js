// ===== シーン 07 スーパーマーケット =====
WSC.add({id:'market',t:'スーパー',en:'Supermarket',bg:'market',floor:[440,580],ground:{en:'the floor',ja:'床'},
 ents:[
  {id:'shelf',k:'fix',art:'shelf',en:'the shelf',ja:'商品棚',x:220,y:430,surf:{x0:140,x1:300,y:330,front:431},near:{x:220,y:470,p:'in front of'}},
  {id:'checkout',k:'fix',art:'counter',o:{w:240,c:'#c9d0da'},en:'the checkout counter',ja:'会計台',x:720,y:440,surf:{x0:610,x1:760,y:340,front:442},near:{x:640,y:482,p:'in front of'}},
  {id:'register',k:'fix',art:'register',en:'the register',ja:'レジ',x:800,y:340,z:443,near:{x:800,y:482,p:'next to'},hit:{x0:766,x1:834,y0:280,y1:344}},
  {id:'apple',k:'prop',art:'apple',en:'the apple',ind:'an apple',ja:'リンゴ',at:{p:'on',ref:'shelf'},x:160,small:true},
  {id:'tomato',k:'prop',art:'tomato',en:'the tomato',ind:'a tomato',ja:'トマト',at:{p:'on',ref:'shelf'},x:220,small:true},
  {id:'carrot',k:'prop',art:'carrot',en:'the carrot',ind:'a carrot',ja:'ニンジン',at:{p:'on',ref:'shelf'},x:280,small:true},
  {id:'basket',k:'prop',art:'basket',en:'the basket',ind:'a basket',ja:'買い物かご',cap:{p:'in',slots:[[-10,-16],[8,-18],[0,-22]]},x:430,y:560},
  {id:'shopbag',k:'prop',art:'shopbag',en:'the bag',ind:'a bag',ja:'袋',cap:{p:'in',slots:[[0,-16],[-6,-20],[6,-20]]},at:{p:'on',ref:'checkout'},x:700},
  P('clerk','the clerk','店員','he',LK.clerk,690,420,{staff:'pay'}),
  P('woman','the woman','女性','she',LK.woman,500,540),
 ],
 missions:[
  {t:[['drag','apple','basket']],v:['put','place'],o:'apple',r:'basket',p:'in',ex:{v:'place',o:'apple',r:'basket',p:'in'}},
  {t:[['woman','basket','Pick up']],v:['pickup'],o:'basket',ex:{v:'pickup',a:'woman',o:'basket'}},
  {t:[['woman','register','Walk to']],v:['walk'],r:'register',ex:{v:'walk',a:'woman',r:'register'}},
  {t:[['woman','tomato','Pick up'],['woman','checkout','Put the tomato on']],v:['put','place'],o:'tomato',r:'checkout',p:'on',ex:{v:'put',a:'woman',o:'tomato',r:'checkout',p:'on'}},
  {t:[['woman','carrot','Pick up'],['woman','shopbag','Put the carrot']],v:['put','place'],o:'carrot',r:'shopbag',p:'in',ex:{v:'put',a:'woman',o:'carrot',r:'shopbag',p:'in'}},
  {t:[['woman','carrot','Pick up'],['woman','shelf','Put the carrot on']],v:['put'],o:'carrot',r:'shelf',ex:{v:'put',a:'woman',o:'carrot',r:'shelf',p:'on',back:true}},
  {t:[['woman','register','Pay at']],v:['pay'],a:'woman',ex:{v:'pay',a:'woman',r:'register'}},
 ]});

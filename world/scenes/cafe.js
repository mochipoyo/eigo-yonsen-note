// ===== シーン 05 カフェ =====
WSC.add({id:'cafe',t:'カフェ',en:'Café',bg:'cafe',floor:[440,580],ground:{en:'the floor',ja:'床'},order:['coffee','cake'],payStaff:true,
 ents:[
  {id:'counter',k:'fix',art:'counter',o:{w:280,c:'#6b4a32'},en:'the counter',ja:'カウンター',x:300,y:440,surf:{x0:170,x1:390,y:340,front:442},near:{x:300,y:478,p:'in front of'}},
  {id:'register',k:'fix',art:'register',en:'the register',ja:'レジ',x:410,y:340,z:443,near:{x:440,y:482,p:'next to'},hit:{x0:376,x1:444,y0:280,y1:344}},
  {id:'table',k:'fix',art:'table',o:{w:150,h:62,c:'#b07a48'},en:'the table',ja:'テーブル',x:720,y:525,surf:{x0:655,x1:785,y:459,front:526},under:{x0:670,x1:770,y:515}},
  {id:'chair1',k:'fix',art:'chair',o:{face:1},en:'the chair',ja:'いす',x:610,y:532,seats:[{x:613,y:534,h:40,face:1}]},
  {id:'chair2',k:'fix',art:'chair',o:{face:-1},en:'the other chair',ja:'もう一つのいす',x:830,y:532,seats:[{x:827,y:534,h:40,face:-1}]},
  {id:'menu',k:'prop',art:'menu',en:'the menu',ind:'a menu',ja:'メニュー',read:true,lookAt:true,openable:true,at:{p:'on',ref:'table'},x:700,small:true},
  {id:'coffee',k:'prop',art:'cup',en:'the coffee',ind:'a coffee',ja:'コーヒー',liq:'coffee',liqja:'コーヒー',st:{full:true},hidden:true,serveAt:'counter',x:250,small:true},
  {id:'cake',k:'prop',art:'cake',en:'the cake',ind:'a piece of cake',ja:'ケーキ',food:true,hidden:true,serveAt:'counter',x:300,small:true},
  P('barista','the barista','店員','she',LK.barista,260,420,{staff:'order'}),
  P('woman','the woman','女性','she',LK.woman,480,540),
  P('man','the man','男性','he',LK.father,920,500),
 ],
 missions:[
  {t:[['woman','chair1','Sit on']],v:['sit'],a:'woman',r:['chair1','chair2'],ex:{v:'sit',a:'woman',r:'chair1',p:'on'}},
  {t:[['woman','barista','Order a coffee']],v:['order'],o:'coffee',ex:{v:'order',a:'woman',o:'coffee'}},
  {t:[['woman','barista','Order a coffee'],['barista','coffee','Pick up'],['barista','woman','Give']],v:['give'],a:'barista',o:'coffee',ex:{v:'give',a:'barista',o:'coffee',r:'woman'}},
  {t:[['man','barista','Order a piece'],['drag','cake','table']],v:['put','place'],o:'cake',r:'table',p:'on',ex:{v:'place',o:'cake',r:'table',p:'on'}},
  {t:[['man','barista','Order a coffee'],['man','coffee','Drink']],v:['drink'],o:'coffee',ex:{v:'drink',a:'man',o:'coffee'}},
  {t:[['woman','register','Pay at']],v:['pay'],ex:{v:'pay',a:'woman',r:'register'}},
  {t:[['man','menu','Look at']],v:['read'],o:'menu',ex:{v:'read',a:'man',o:'menu'}},
 ]});

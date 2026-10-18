// ===== シーン 10 レストラン =====
WSC.add({id:'restaurant',t:'レストラン',en:'Restaurant',bg:'restaurant',floor:[430,580],ground:{en:'the floor',ja:'床'},order:['pasta'],payStaff:true,
 ents:[
  {id:'counter',k:'fix',art:'counter',o:{w:220,c:'#5a3a3a'},en:'the counter',ja:'カウンター',x:170,y:440,surf:{x0:80,x1:260,y:340,front:442},near:{x:200,y:480,p:'in front of'}},
  {id:'table',k:'fix',art:'table',o:{w:200,h:62,c:'#8a5a3c',cloth:'#fff'},en:'the table',ja:'テーブル',x:600,y:525,surf:{x0:515,x1:685,y:459,front:526},under:{x0:530,x1:670,y:515}},
  {id:'chair1',k:'fix',art:'chair',o:{face:1,c:'#8a5a3c'},en:'the chair',ja:'いす',x:465,y:532,seats:[{x:468,y:534,h:40,face:1}]},
  {id:'chair2',k:'fix',art:'chair',o:{face:-1,c:'#8a5a3c'},en:'the other chair',ja:'もう一つのいす',x:735,y:532,seats:[{x:732,y:534,h:40,face:-1}]},
  {id:'menu',k:'prop',art:'menu',en:'the menu',ind:'a menu',ja:'メニュー',read:true,lookAt:true,openable:true,at:{p:'on',ref:'table'},x:560,small:true},
  {id:'glass',k:'prop',art:'glass',en:'the glass',ind:'a glass',ja:'グラス',liq:'water',liqja:'水',st:{full:true},at:{p:'on',ref:'table'},x:650,small:true},
  {id:'pasta',k:'prop',art:'food',en:'the pasta',ind:'pasta',ja:'パスタ',food:true,hidden:true,serveAt:'counter',x:170,small:true},
  P('waiter','the waiter','ウェイター','he',LK.waiter,300,470,{staff:'order'}),
  P('woman','the woman','女性','she',LK.woman,870,520),
  P('man','the man','男性','he',LK.man,380,560),
 ],
 missions:[
  {t:[['woman','menu','Open']],v:['open'],o:'menu',ex:{v:'open',a:'woman',o:'menu'}},
  {t:[['woman','waiter','Order']],v:['order'],o:'pasta',ex:{v:'order',a:'woman',o:'pasta'}},
  {t:[['woman','waiter','Order'],['waiter','pasta','Pick up'],['waiter','table','Put']],v:['bring','put'],a:'waiter',o:'pasta',ex:{v:'bring',a:'waiter',o:'pasta',r:'table'}},
  {t:[['man','waiter','Order'],['man','pasta','Eat']],v:['eat'],o:'pasta',ex:{v:'eat',a:'man',o:'pasta'}},
  {t:[['woman','glass','Drink']],v:['drink'],o:'glass',ex:{v:'drink',a:'woman',o:'glass'}},
  {t:[['man','waiter','Order'],['man','waiter','Pay']],v:['pay'],ex:{v:'pay',a:'man'}},
  {t:[['man','chair1','Sit on']],v:['sit'],a:'man',ex:{v:'sit',a:'man',r:'chair1',p:'on'}},
 ]});

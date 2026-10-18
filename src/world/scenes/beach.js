// ===== シーン 11 ビーチ =====
WSC.add({id:'beach',t:'ビーチ',en:'Beach',bg:'beach',floor:[390,580],ground:{en:'the sand',ja:'砂浜'},
 ents:[
  {id:'sea',k:'fix',art:'sea',en:'the sea',ja:'海',x:500,y:360,z:-500,inside:{person:'swim',x0:40,x1:960,y:320,shore:392,hit:{x0:0,x1:1000,y0:200,y1:372}}},
  {id:'parasol',k:'fix',art:'parasol',en:'the beach umbrella',ja:'パラソル',x:720,y:470,under:{x0:660,x1:790,y:478},underPerson:true,hit:{x0:610,x1:830,y0:270,y1:475}},
  {id:'towel',k:'fix',art:'towel',en:'the towel',ja:'タオル',x:330,y:520,seats:[{x:320,y:522,h:6,face:1}],floorSit:true,lieOn:true,sitToo:true,lieH:4,lieAt:{x:300,y:524},hit:{x0:270,x1:390,y0:490,y1:528}},
  {id:'ball',k:'prop',art:'beachball',en:'the beach ball',ind:'a beach ball',ja:'ビーチボール',throw:true,x:520,y:500},
  {id:'shades',k:'prop',art:'sunglasses',en:'the sunglasses',ind:'sunglasses',ja:'サングラス',wear:'shades',wearja:'かけています',x:420,y:560,small:true,plural:true},
  P('man','the man','男性','he',LK.swimman,200,560),
  P('woman','the woman','女性','she',LK.swimwoman,880,540),
  P('boy','the boy','男の子','he',LK.boy,600,560,{extra:['run','jump']}),
  {id:'dog',k:'animal',art:'dog',c:'#f2f2f2',en:'the dog',ja:'犬',x:120,y:470},
 ],
 missions:[
  {t:[['man','sea','Swim']],v:['swim'],ex:{v:'swim',a:'man',r:'sea'}},
  {t:[['boy','ball','Pick up'],['boy','self','Throw']],v:['throw'],o:'ball',ex:{v:'throw',a:'boy',o:'ball'}},
  {t:[['woman','towel','Sit on']],v:['sitfloor','sit'],r:'towel',ex:{v:'sitfloor',a:'woman',r:'towel'}},
  {t:[['woman','parasol','Go under']],v:['go'],r:'parasol',p:'under',ex:{v:'go',a:'woman',r:'parasol',p:'under',stateFirst:true}},
  {t:[['man','shades','Put on']],v:['wear'],o:'shades',ex:{v:'wear',a:'man',o:'shades'}},
  {t:[['dog','self','Run']],v:['run'],a:'dog',ex:{v:'run',a:'dog'}},
  {t:[['man','sea','Swim'],['man','self','Come out']],v:['exit'],ex:{v:'exit',a:'man',r:'sea'}},
 ]});

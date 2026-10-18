// ===== シーン 04 公園 =====
WSC.add({id:'park',t:'公園',en:'Park',bg:'park',floor:[400,580],ground:{en:'the grass',ja:'芝生'},
 ents:[
  {id:'tree',k:'fix',art:'tree',en:'the tree',ja:'木',x:170,y:420,behind:{x:190,y:404},near:{x:290,y:440,p:'next to'},hit:{x0:80,x1:260,y0:150,y1:425}},
  {id:'bench',k:'fix',art:'bench',en:'the bench',ja:'ベンチ',x:520,y:440,seats:[{x:478,y:442,h:40,face:1},{x:562,y:442,h:40,face:-1}],animalOn:{x:520,y:400,depth:443}},
  {id:'pond',k:'fix',art:'pond',en:'the pond',ja:'池',x:830,y:470,near:{x:690,y:490,p:'near'},hit:{x0:700,x1:960,y0:420,y1:480}},
  {id:'flowers',k:'fix',art:'flowers',en:'the flowers',ja:'花',x:350,y:575,near:{x:440,y:560,p:'near'}},
  {id:'bike',k:'fix',art:'bicycle',o:{c:'#e05a47'},en:'the bicycle',ja:'自転車',x:680,y:565},
  {id:'ball',k:'prop',art:'ball',en:'the ball',ind:'a ball',ja:'ボール',throw:true,x:420,y:520,small:true},
  P('boy','the boy','男の子','he',LK.boy,320,520,{extra:['run','jump']}),
  P('man','the man','男性','he',LK.man,880,560),
  P('woman','the woman','女性','she',LK.woman,600,520),
  {id:'dog',k:'animal',art:'dog',en:'the dog',ja:'犬',x:560,y:580},
 ],
 missions:[
  {t:[['boy','self','Run']],v:['run'],a:'boy',ex:{v:'run',a:'boy'}},
  {t:[['dog','self','Run']],v:['run'],a:'dog',ex:{v:'run',a:'dog'}},
  {t:[['boy','ball','Pick up'],['boy','dog','Throw']],v:['throw'],a:'boy',o:'ball',ex:{v:'throw',a:'boy',o:'ball'}},
  {t:[['man','bench','Sit on']],v:['sit'],r:'bench',ex:{v:'sit',a:'man',r:'bench',p:'on'}},
  {t:[['woman','bike','Get on']],v:['getonbike','ride'],o:'bike',ex:{v:'getonbike',a:'woman',o:'bike'}},
  {t:[['dog','tree','Go behind']],v:['go'],a:'dog',r:'tree',p:'behind',ex:{v:'go',a:'dog',r:'tree',p:'behind',stateFirst:true}},
  {t:[['man','pond','Walk to']],v:['walk'],r:'pond',ex:{v:'walk',a:'man',r:'pond'}},
 ]});

// ===== シーン 09 オフィス =====
WSC.add({id:'office',t:'オフィス',en:'Office',bg:'office',floor:[410,580],ground:{en:'the floor',ja:'床'},
 ents:[
  {id:'wboard',k:'fix',art:'whiteboard',en:'the whiteboard',ja:'ホワイトボード',x:520,y:300,wall:true,text:'Meeting 10:00',near:{x:520,y:440,p:'in front of'}},
  {id:'desk1',k:'fix',art:'desk',o:{w:160},en:'the desk',ja:'机',x:300,y:510,surf:{x0:260,x1:370,y:446,front:511},under:{x0:240,x1:360,y:500}},
  {id:'pc',k:'fix',art:'computer',en:'the computer',ja:'パソコン',x:248,y:446,z:512,st:{on:false},useSeat:'chair1',hit:{x0:210,x1:286,y0:384,y1:450}},
  {id:'chair1',k:'fix',art:'chair',o:{face:1},en:'the chair',ja:'いす',x:200,y:516,seats:[{x:197,y:518,h:40,face:1}]},
  {id:'desk2',k:'fix',art:'desk',o:{w:160},en:'the other desk',ja:'もう一つの机',x:740,y:510,surf:{x0:670,x1:780,y:446,front:511}},
  {id:'phone',k:'fix',art:'deskphone',en:'the phone',ja:'電話',x:800,y:446,z:512,st:{ring:true},hit:{x0:776,x1:824,y0:414,y1:450}},
  {id:'chair2',k:'fix',art:'chair',o:{face:-1},en:'the other chair',ja:'もう一つのいす',x:860,y:516,seats:[{x:863,y:518,h:40,face:-1}]},
  {id:'docs',k:'prop',art:'docs',en:'the documents',ind:'some documents',ja:'書類',at:{p:'on',ref:'desk2'},x:700,small:true,plural:true},
  {id:'coffee',k:'prop',art:'cup',en:'the coffee',ind:'a coffee',ja:'コーヒー',liq:'coffee',liqja:'コーヒー',st:{full:true},at:{p:'on',ref:'desk1'},x:345,small:true},
  P('boss','the manager','部長','he',LK.boss,560,470,{extra:['meeting']}),
  P('emma','Emma','エマ','she',LK.emma,420,560),
  P('ryo','Ryo','リョウ','he',LK.ryo,640,560),
 ],
 missions:[
  {t:[['emma','pc','Use']],v:['use'],o:'pc',ex:{v:'use',a:'emma',o:'pc'}},
  {t:[['ryo','phone','Answer']],v:['answer'],ex:{v:'answer',a:'ryo'}},
  {t:[['emma','docs','Pick up'],['emma','boss','Give']],v:['give'],o:'docs',r:'boss',ex:{v:'give',a:'emma',o:'docs',r:'boss'}},
  {t:[['ryo','chair2','Sit on']],v:['sit'],ex:{v:'sit',a:'ryo',r:'chair2',p:'on'}},
  {t:[['boss','self','Start the meeting']],v:['meeting'],ex:{v:'meeting',a:'boss'}},
  {t:[['emma','coffee','Drink']],v:['drink'],o:'coffee',ex:{v:'drink',a:'emma',o:'coffee'}},
 ]});

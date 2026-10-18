// ===== シーン 08 駅 =====
WSC.add({id:'station',t:'駅',en:'Station',bg:'station',floor:[380,580],ground:{en:'the platform',ja:'ホーム'},
 ents:[
  {id:'train',k:'fix',art:'train',en:'the train',ja:'電車',x:600,y:300,z:290,st:{open:true,here:true},doorX:-120,boardY:384,hit:{x0:340,x1:860,y0:96,y1:320}},
  {id:'clock',k:'fix',art:'clock',en:'the clock',ja:'時計',x:180,y:120,wall:true},
  {id:'gate',k:'fix',art:'gate',en:'the ticket gate',ja:'改札',x:150,y:500,st:{open:false},near:{x:250,y:514,p:'next to'}},
  {id:'bench',k:'fix',art:'bench',o:{c:'#5a8fc9'},en:'the bench',ja:'ベンチ',x:820,y:470,seats:[{x:778,y:472,h:40,face:1},{x:862,y:472,h:40,face:-1}]},
  {id:'ticket',k:'prop',art:'ticket',en:'the ticket',ind:'a ticket',ja:'切符',show:true,small:true,x:0,y:0},
  {id:'bag',k:'prop',art:'bag',en:'the bag',ind:'a bag',ja:'かばん',x:700,y:560,small:true},
  P('staff','the station attendant','駅員','he',LK.staff,330,480,{staff:'check'}),
  P('man','the man','男性','he',LK.man,500,560,{holdInit:'ticket'}),
  P('woman','the woman','女性','she',LK.woman,900,560),
 ],
 missions:[
  {t:[['man','train','Get on']],v:['board'],ex:{v:'board',a:'man',r:'train'}},
  {t:[['woman','train','Get on'],['woman','self','Get off']],v:['getoff'],ex:{v:'getoff',a:'woman',r:'train'}},
  {t:[['man','staff','Show']],v:['show'],o:'ticket',ex:{v:'show',a:'man',o:'ticket',r:'staff'}},
  {t:[['woman','bench','Sit on']],v:['sit'],r:'bench',ex:{v:'sit',a:'woman',r:'bench',p:'on'}},
  {t:[['woman','bag','Pick up']],v:['pickup'],o:'bag',ex:{v:'pickup',a:'woman',o:'bag'}},
  {t:[['man','gate','Go through']],v:['gothrough'],ex:{v:'gothrough',a:'man',r:'gate'}},
  {t:[['direct','train','Make the train leave']],v:['depart'],ex:{v:'depart',o:'train'}},
 ]});

// ===== シーン 12 街・交差点 =====
WSC.add({id:'street',t:'街の交差点',en:'Street',bg:'street',floor:[525,590],floors:[[340,385],[525,590]],ground:{en:'the sidewalk',ja:'歩道'},
 ents:[
  {id:'bld1',k:'fix',art:'building',o:{h:300,c:'#d9c3a3'},en:'the building',ja:'ビル',x:100,y:332,wall:true},
  {id:'bld2',k:'fix',art:'building',o:{h:280,c:'#c9d3e0'},en:'the tall building',ja:'高いビル',x:300,y:332,wall:true},
  {id:'shop',k:'fix',art:'shop',o:{label:'BAKERY',awn:'#e05a47'},en:'the bakery',ja:'パン屋',x:780,y:340,z:330,st:{open:false},hit:{x0:640,x1:920,y0:100,y1:345}},
  {id:'cross',k:'fix',art:'crosswalk',o:{h:130},en:'the crosswalk',ja:'横断歩道',x:500,y:520,z:-200,top:372,bottom:560,hit:{x0:380,x1:620,y0:390,y1:522}},
  {id:'light',k:'fix',art:'trafficlight',en:'the traffic light',ja:'信号',x:640,y:548,st:{green:false},hit:{x0:612,x1:668,y0:330,y1:552}},
  {id:'car',k:'fix',art:'car',o:{c:'#e05a47'},en:'the car',ja:'車',x:200,y:470,z:470,stopX:260,driver:'driver',st:{moving:false},hit:{x0:96,x1:304,y0:360,y1:474}},
  {id:'bench',k:'fix',art:'bench',o:{c:'#7a8a5a'},en:'the bench',ja:'ベンチ',x:200,y:588,seats:[{x:158,y:590,h:40,face:1},{x:242,y:590,h:40,face:-1}]},
  {id:'bike',k:'fix',art:'bicycle',o:{c:'#3a8a5a'},en:'the bicycle',ja:'自転車',x:860,y:575},
  P('driver','the driver','運転手','he',LK.man,0,0,{hidden:true,nodraw:true}),
  P('woman','the woman','女性','she',LK.woman,420,560),
  P('man','the man','男性','he',LK.cyclist,760,560),
 ],
 missions:[
  {t:[['direct','light','Change']],v:['light'],ex:{v:'light',o:{green:true}}},
  {t:[['direct','light','Change'],['woman','cross','Cross']],v:['cross'],ex:{v:'cross',a:'woman'}},
  {t:[['direct','car','Drive']],v:['drive'],ex:{v:'drive',a:'driver',o:'car'}},
  {t:[['direct','light','Change'],['woman','cross','Cross'],['woman','shop','Go into']],v:['enter'],r:'shop',ex:{v:'enter',a:'woman',r:'shop'}},
  {t:[['woman','bench','Sit on']],v:['sit'],r:'bench',ex:{v:'sit',a:'woman',r:'bench',p:'on'}},
  {t:[['man','bike','Get on'],['man','self','Ride']],v:['ride','getonbike'],a:'man',ex:{v:'getonbike',a:'man',o:'bike'}},
 ]});

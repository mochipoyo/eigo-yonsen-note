// ===== main =====
applyTheme();
document.getElementById('home').onclick=()=>go({name:'home'});
document.getElementById('gear').onclick=()=>go({name:'settings'});
try{history.replaceState(V,'')}catch(e){}
render();

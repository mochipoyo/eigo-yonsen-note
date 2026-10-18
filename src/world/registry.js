// ===== ワールド: シーンの登録。シーンのデータは world/scenes/<id>.js に1つずつあり、開いたときだけ読み込む =====
// 一覧に必要な情報(名前・ミッション数など)はビルド時に作る WMAN(index.html 側)にある。
const WSC={defs:{},add(def){this.defs[def.id]=def;if(typeof WORLD!=='undefined')WORLD.scenes[def.id]=true}};
const sceneById=id=>WSC.defs[id]||null;

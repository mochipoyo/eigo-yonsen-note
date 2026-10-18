#!/usr/bin/env python3
"""src/ からページを作る。生成物(index.html と world/)は直接編集せず、src/ を編集してから実行する。
- index.html : アプリ本体(単語・文法・会話など)と、ワールドの読み込み係
- world/world.js : うごかす英語ワールドの本体(ワールドを開いたときだけ読み込む)
- world/scenes/<id>.js : シーンごとのデータ(そのシーンを開いたときだけ読み込む)
- world/thumbs/<id>.svg : シーン一覧の絵
ワールドの一覧作成とデータ検査に Node.js を使う。"""
import hashlib, json, shutil, subprocess, sys
from pathlib import Path
root = Path(__file__).parent
src = root / "src"
shell = (src / "shell.html").read_text(encoding="utf-8")
body = (src / "body.html").read_text(encoding="utf-8")
CORE = ["vocab1.js", "vocab2.js", "grammar1.js", "grammar2.js", "talk.js", "toeic_l.js", "toeic_r.js",
        "d_instant.js", "d_phrases.js", "d_listen.js", "d_quests.js", "d_school_a.js", "d_school_b.js", "d_school_c.js",
        "speech.js", "core.js", "core2.js", "ai.js", "answer.js", "quiz.js",
        "v_home.js", "v_gram.js", "v_talk.js", "v_vocab.js", "v_toeic.js",
        "v_instant.js", "v_phrase.js", "v_shadow.js", "v_listen.js", "v_quest.js", "v_lesson.js", "v_ai.js", "v_school.js",
        "world_stub.js", "main.js"]
# ワールド本体: 役割ごとのファイルをこの順につなぐ
WORLD = ["registry.js", "cast.js", "art.js", "fixtures.js", "lang.js", "grammar.js", "state.js", "anim.js", "engine.js", "act.js",
         "record.js", "dialog.js", "story.js", "missions.js", "views.js", "views_story.js"]
wsrc = src / "world"
out = root / "world"
world_js = "\n".join((wsrc / f).read_text(encoding="utf-8") for f in WORLD if (wsrc / f).exists())
order = json.loads((wsrc / "scenes" / "_order.json").read_text(encoding="utf-8"))
if out.exists():
    shutil.rmtree(out)
(out / "scenes").mkdir(parents=True)
(out / "world.js").write_text(world_js, encoding="utf-8")
h = hashlib.sha1(world_js.encode())
for sid in order:
    t = (wsrc / "scenes" / f"{sid}.js").read_text(encoding="utf-8")
    (out / "scenes" / f"{sid}.js").write_text(t, encoding="utf-8")
    h.update(t.encode())
try:
    r = subprocess.run(["node", str(root / "tools" / "world_tool.js"), str(out / "world.js"), str(wsrc / "scenes"), str(out)],
                       capture_output=True, text=True)
except FileNotFoundError:
    sys.exit("Node.js が見つかりません。ワールドの一覧作成とデータ検査に Node.js が必要です。")
if r.returncode != 0:
    sys.exit(r.stderr or "world_tool.js でエラーが起きました")
man = r.stdout
ver = h.hexdigest()[:10]
manifest_js = f"const WORLD_V={json.dumps(ver)};\nconst WMAN={man};\n"
js = "\n".join((src / f).read_text(encoding="utf-8") for f in CORE)
js = js.replace("// ===== うごかす英語ワールド: 読み込み係 =====", manifest_js + "// ===== うごかす英語ワールド: 読み込み係 =====", 1)
head_part, _, markup = body.partition("</style>")
html = shell.replace("<!--BODY-->", head_part + "</style>").replace("</head>", "</head>\n<body>\n" + markup.strip() + "\n<script>\n" + js + "\n</script>\n</body>\n</html>\n", 1)
(root / "index.html").write_text(html, encoding="utf-8")
print(f"index.html {len(html.encode('utf-8'))//1024} KB / world/world.js {len(world_js.encode('utf-8'))//1024} KB / シーン {len(order)} 件 (版 {ver})")

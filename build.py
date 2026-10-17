#!/usr/bin/env python3
"""src/ のファイルを1つの index.html にまとめる。index.html は直接編集せず、src/ を編集してから実行する。"""
from pathlib import Path
root = Path(__file__).parent
src = root / "src"
shell = (src / "shell.html").read_text(encoding="utf-8")
body = (src / "body.html").read_text(encoding="utf-8")
FILES = ["vocab1.js", "vocab2.js", "grammar1.js", "grammar2.js", "talk.js", "toeic_l.js", "toeic_r.js",
         "speech.js", "core.js", "quiz.js", "v_home.js", "v_gram.js", "v_talk.js", "v_vocab.js", "v_toeic.js", "main.js"]
js = "\n".join((src / f).read_text(encoding="utf-8") for f in FILES)
head_part, _, markup = body.partition("</style>")
html = shell.replace("<!--BODY-->", head_part + "</style>").replace("</head>", "</head>\n<body>\n" + markup.strip() + "\n<script>\n" + js + "\n</script>\n</body>\n</html>\n", 1)
(root / "index.html").write_text(html, encoding="utf-8")
print(f"index.html を生成しました({len(html.encode('utf-8'))//1024} KB)")

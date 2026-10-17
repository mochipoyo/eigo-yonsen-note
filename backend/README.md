# AI会話用バックエンド(任意)

えいご4線ノートの「AI自由英会話」と「AIによる意味判定」を使うときだけ必要です。設定しなくても、ほかの機能はすべて動きます。

APIキーを GitHub Pages のページに書くと誰でも見られてしまうため、キーはこのバックエンド(Cloudflare Workers)の中にだけ保存します。

## 置き方(Cloudflare Workers の例)

1. Cloudflare のアカウントを作り、`npm install -g wrangler` → `wrangler login`
2. このフォルダで `wrangler.toml` を作る

```toml
name = "eigo-ai"
main = "worker.js"
compatibility_date = "2026-10-01"

[vars]
ALLOWED_ORIGIN = "https://mochipoyo.github.io"
MODEL = "claude-haiku-5-5"
DAILY_LIMIT = "200"
PER_MINUTE = "10"

# 回数制限を正確に数えたい場合(任意)
# [[kv_namespaces]]
# binding = "RATE"
# id = "<wrangler kv namespace create RATE で表示されたID>"
```

3. 秘密の値を登録する(画面に表示されないように入力)

```bash
wrangler secret put ANTHROPIC_API_KEY   # Anthropic の APIキー
wrangler secret put ACCESS_TOKEN        # 自分で決めた長い合言葉
```

4. `wrangler deploy` → 表示された `https://eigo-ai.xxxx.workers.dev` をアプリの「設定 → AI会話」に入力し、同じ合言葉をアクセストークン欄に入れる

## 料金と安全のための仕組み

- **アクセストークン**:合言葉が一致しないリクエストは拒否します
- **CORS**:`ALLOWED_ORIGIN` 以外のサイトからの呼び出しを拒否します
- **回数制限**:IPごとに1分あたり `PER_MINUTE` 回、全体で1日 `DAILY_LIMIT` 回まで(KVなしの場合はWorkerのメモリで数えるため概算です)
- **長さ制限**:1回のリクエストは20,000文字まで、AIの返事は最大300〜700トークン
- **送るデータ**:会話の文字(音声認識の文字起こし)だけ。録音した音声は送りません

## 確認が必要な点

- モデル名(`MODEL`)、料金、APIの仕様は変わることがあります。Anthropic の公式ドキュメントで確認してから設定してください。
- 1日の上限を超えると、その日はAI会話が使えなくなります(アプリにはその旨が表示されます)。

// えいご4線ノート AI会話用バックエンド(Cloudflare Workers 用の例)
// ------------------------------------------------------------
// ・APIキーはこのWorkerの「シークレット」に保存し、ブラウザには一切渡しません。
// ・アプリから届くのは会話の文字だけです(音声・録音は届きません)。
// ・アクセストークン、許可するサイト(CORS)、1分あたり/1日あたりの回数上限、最大トークン数で利用料金を抑えます。
//
// 必要な設定(wrangler.toml の [vars] とシークレット):
//   ANTHROPIC_API_KEY (secret)  … Anthropic の APIキー
//   ACCESS_TOKEN      (secret)  … アプリの設定画面に入れる合言葉(長いランダム文字列)
//   ALLOWED_ORIGIN    (var)     … 例 https://mochipoyo.github.io
//   MODEL             (var)     … 例 claude-haiku-5-5(使えるモデル名は公式ドキュメントで確認)
//   DAILY_LIMIT       (var)     … 1日の最大リクエスト数(全体)。例 200
//   PER_MINUTE        (var)     … 1分あたりの最大リクエスト数(IPごと)。例 10
//   RATE (KV namespace, 任意)   … 回数制限を正確に数えるためのKV。未設定ならWorkerのメモリで概算
// ------------------------------------------------------------
const mem = new Map();
const CHARS = {
  teacher: 'a kind, encouraging English teacher who speaks clearly and gently',
  friend: 'a friendly, casual friend who chats naturally',
  barista: 'a cafe barista taking an order and making small talk',
  hotel: 'a polite hotel front-desk staff member',
  partner: 'a business partner in a meeting or negotiation',
  coach: 'a strict but fair English coach who points out mistakes directly',
  hobby: 'a friend who loves talking about hobbies in depth',
};
const LEVEL = {
  1: 'Use very simple words and short sentences (A1-A2). Speak slowly and kindly.',
  2: 'Use simple everyday English (A2-B1).',
  3: 'Use natural conversational English (B1-B2).',
  4: 'Use fully natural English with idioms at native speed (B2-C1).',
};
const cors = (env, origin) => ({
  'access-control-allow-origin': origin && origin === env.ALLOWED_ORIGIN ? origin : env.ALLOWED_ORIGIN || 'null',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type, authorization',
  'access-control-max-age': '86400',
  vary: 'origin',
});
const json = (obj, status, h) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...h } });

async function bump(env, key, ttl) {
  if (env.RATE) {
    const n = parseInt((await env.RATE.get(key)) || '0', 10) + 1;
    await env.RATE.put(key, String(n), { expirationTtl: ttl });
    return n;
  }
  const n = (mem.get(key) || 0) + 1;
  mem.set(key, n);
  return n;
}

function cleanMessages(msgs) {
  if (!Array.isArray(msgs)) return [];
  const out = [];
  for (const m of msgs.slice(-20)) {
    const role = m && m.role === 'assistant' ? 'assistant' : 'user';
    const content = String((m && m.content) || '').slice(0, 600);
    if (!content) continue;
    if (out.length && out[out.length - 1].role === role) out[out.length - 1].content += '\n' + content;
    else out.push({ role, content });
  }
  if (out.length && out[0].role !== 'user') out.unshift({ role: 'user', content: '(The learner is ready. Please start the conversation.)' });
  return out;
}

async function claude(env, system, messages, maxTokens) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: env.MODEL || 'claude-haiku-5-5', max_tokens: maxTokens, system, messages }),
  });
  if (!r.ok) throw new Error('upstream ' + r.status);
  const j = await r.json();
  const block = (j.content || []).find((b) => b.type === 'text');
  return block ? block.text : '';
}
function parseJSON(text) {
  const m = String(text).match(/\{[\s\S]*\}/);
  if (!m) return null;
  try { return JSON.parse(m[0]); } catch (e) { return null; }
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('origin');
    const h = cors(env, origin);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
    if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405, h);
    if (env.ALLOWED_ORIGIN && origin !== env.ALLOWED_ORIGIN) return json({ error: 'origin not allowed' }, 403, h);
    if (!env.ACCESS_TOKEN || req.headers.get('authorization') !== 'Bearer ' + env.ACCESS_TOKEN) return json({ error: 'unauthorized' }, 401, h);

    const ip = req.headers.get('cf-connecting-ip') || 'x';
    const minute = Math.floor(Date.now() / 60000);
    const day = new Date().toISOString().slice(0, 10);
    if ((await bump(env, `m:${ip}:${minute}`, 120)) > parseInt(env.PER_MINUTE || '10', 10)) return json({ error: 'rate limit' }, 429, h);
    if ((await bump(env, `d:${day}`, 172800)) > parseInt(env.DAILY_LIMIT || '200', 10)) return json({ error: 'daily limit' }, 429, h);

    let body;
    try { body = await req.json(); } catch (e) { return json({ error: 'bad json' }, 400, h); }
    if (JSON.stringify(body).length > 20000) return json({ error: 'too large' }, 413, h);
    const path = new URL(req.url).pathname.replace(/\/+$/, '');

    try {
      if (path.endsWith('/chat')) {
        const who = CHARS[body.character] || CHARS.teacher;
        const lv = LEVEL[body.level] || LEVEL[2];
        const topic = String(body.topic || 'daily life').slice(0, 40);
        const system = `You are ${who}. You are having a spoken English conversation with a Japanese learner about "${topic}". ${lv}
Keep each reply to 1-3 short sentences and end with a question or prompt so the conversation keeps going. Never give financial or investment advice; if asked, talk about general experiences and say you can't give advice.
If the learner's last message has a clear mistake, gently model the correct form in your reply.
Return ONLY JSON: {"reply":"<your English reply>","fix":"<a more natural version of the learner's last message, or empty>","hint_ja":"${body.hint_ja ? '<one short Japanese hint about how the learner could answer>' : ''}"}`;
        const text = await claude(env, system, cleanMessages(body.messages), 300);
        const j = parseJSON(text) || { reply: text.slice(0, 500) };
        return json({ reply: String(j.reply || '').slice(0, 600), fix: String(j.fix || '').slice(0, 300), hint_ja: String(j.hint_ja || '').slice(0, 300) }, 200, h);
      }
      if (path.endsWith('/feedback')) {
        const system = `You are an English coach for Japanese learners. Review ONLY the learner's (user) messages in this conversation.
Return ONLY JSON: {"summary":"<2-3 sentences in Japanese: what went well and what to practice>","items":[{"you":"<learner sentence>","better":"<more natural English>","why":"<short Japanese explanation>"}]}. Max 6 items, only where a real improvement exists.`;
        const convo = cleanMessages(body.messages).map((m) => `${m.role === 'user' ? 'Learner' : 'Partner'}: ${m.content}`).join('\n');
        const text = await claude(env, system, [{ role: 'user', content: convo.slice(0, 8000) }], 700);
        const j = parseJSON(text) || { summary: '', items: [] };
        return json({ summary: String(j.summary || '').slice(0, 800), items: (Array.isArray(j.items) ? j.items : []).slice(0, 6) }, 200, h);
      }
      if (path.endsWith('/evaluate')) {
        const q = String(body.question || '').slice(0, 300), a = String(body.answer || '').slice(0, 300), m = String(body.model || '').slice(0, 300);
        const system = 'You judge whether a Japanese learner\'s spoken English answer is a meaningful, appropriate reply to the question (grammar mistakes are OK if the meaning is clear). Return ONLY JSON: {"ok":true|false,"better":"<a natural version of the learner\'s answer>"}';
        const text = await claude(env, system, [{ role: 'user', content: `Question: ${q}\nLearner answer: ${a}\nExample answer: ${m}` }], 150);
        const j = parseJSON(text) || {};
        return json({ ok: !!j.ok, better: String(j.better || '').slice(0, 300) }, 200, h);
      }
      return json({ error: 'not found' }, 404, h);
    } catch (e) {
      return json({ error: 'AI service error' }, 502, h);
    }
  },
};

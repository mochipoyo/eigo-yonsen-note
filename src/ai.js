// ===== ai: 自分で用意したバックエンド経由でAIを使う(未設定ならAI機能だけ使えない) =====
// APIの秘密鍵はこのページには置かない。ここに入れるのは、利用者が自分で立てたバックエンドのURLと、
// そのバックエンド専用の合言葉(アクセストークン)だけ。backend/ フォルダに Cloudflare Workers 用の例がある。
const aiReady=()=>!!(S.ai&&/^https:\/\/[^\s]+$/i.test(S.ai.url||''));
let aiBusy=false;
async function aiCall(path,body,timeoutMs=25000){
 if(!aiReady())throw new Error('AIのバックエンドが設定されていません。');
 if(aiBusy)throw new Error('前の返事を待っています。');
 aiBusy=true;const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),timeoutMs);
 try{
  const url=S.ai.url.replace(/\/+$/,'')+'/'+path;
  const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json',...(S.ai.token?{'authorization':'Bearer '+S.ai.token}:{})},body:JSON.stringify(body),signal:ctl.signal});
  if(r.status===401||r.status===403)throw new Error('アクセストークンが正しくありません(設定を確認してください)。');
  if(r.status===429)throw new Error('利用回数の上限に達しました。しばらくしてから試してください。');
  if(!r.ok)throw new Error('AIサーバーでエラーが起きました(HTTP '+r.status+')。');
  const j=await r.json();if(j&&j.error)throw new Error(String(j.error).slice(0,200));return j;
 }catch(e){if(e.name==='AbortError')throw new Error('AIの返事が時間内に届きませんでした。');throw e}
 finally{clearTimeout(t);aiBusy=false}
}

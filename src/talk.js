const TALK = [
{"id":"t01","lv":1,"t":"カフェで注文","place":"Cafe","partner":"Barista","pv":"f",
 "goal":"カフェで飲み物とフードを注文して、カードで支払いましょう。",
 "phrases":[
  {"en":"Can I get a medium latte?","ja":"Mサイズのラテをください。","tip":"<b>Can I get ~?</b> はお店で一番使える頼み方です。"},
  {"en":"For here or to go?","ja":"店内でお召し上がりですか、お持ち帰りですか?","tip":"店員さんの定番の質問です。答えは For here. か To go. だけでOKです。"},
  {"en":"Could I get it with oat milk?","ja":"オーツミルクにしてもらえますか?","tip":"<b>with ~</b> で「~入りで・~にして」とカスタムできます。"},
  {"en":"That's all, thanks.","ja":"以上です、ありがとう。","tip":"Anything else?(ほかにご注文は?)と聞かれたときの決まり文句です。"},
  {"en":"Can I pay by card?","ja":"カードで払えますか?","tip":"<b>by card</b>(カードで)と <b>in cash</b>(現金で)をセットで覚えましょう。"}],
 "lines":[
  {"who":"p","en":"Hi there! What can I get for you today?","ja":"いらっしゃいませ。今日は何にしますか?"},
  {"who":"me","ja":"Mサイズのホットラテを頼みたい","opts":[
   {"en":"I want latte medium hot.","ok":false,"fb":"通じますが語順が不自然で、I want だけだと少しぶっきらぼうに聞こえます。"},
   {"en":"Can I get a medium hot latte, please?","ok":true,"fb":"Can I get ~, please? は自然で丁寧な注文です。I'd like a medium hot latte. も使えます。"},
   {"en":"Do you have a latte?","ok":false,"fb":"「ラテはありますか?」と聞いているだけで、注文になっていません。"}]},
  {"who":"p","en":"Sure! Would you like regular milk or oat milk?","ja":"かしこまりました。普通の牛乳とオーツミルク、どちらにしますか?"},
  {"who":"me","ja":"オーツミルクでお願いしたい","opts":[
   {"en":"Oat milk would be great, thanks.","ok":true,"fb":"~ would be great は「~だとうれしいです」というやわらかい答え方です。Oat milk, please. でもOKです。"},
   {"en":"I'm oat milk.","ok":false,"fb":"I'm ~ だと「私はオーツミルクです」になってしまいます。日本語の「私は~です」の直訳に注意しましょう。"},
   {"en":"Milk is oat, please.","ok":false,"fb":"「牛乳はオーツです」という意味の通らない文です。Oat milk をひとかたまりで言いましょう。"}]},
  {"who":"p","en":"Great choice. For here or to go?","ja":"いいですね。店内ですか、お持ち帰りですか?"},
  {"who":"me","ja":"持ち帰りにしたい(ちょっと急いでいる)","opts":[
   {"en":"For here, please.","ok":false,"fb":"For here は「店内で」です。持ち帰りとは逆の意味になってしまいます。"},
   {"en":"I go out.","ok":false,"fb":"「私は外出します」という意味で、店員さんは困ってしまいます。"},
   {"en":"To go, please. I'm in a bit of a hurry.","ok":true,"fb":"持ち帰りは To go です。I'm in a hurry.(急いでいます)も便利な一言です。"}]},
  {"who":"p","en":"No problem. Anything else? Our blueberry muffins just came out of the oven.","ja":"かしこまりました。ほかにご注文は?ブルーベリーマフィンが焼きたてですよ。"},
  {"who":"me","ja":"誘惑に負けて、マフィンも1つ頼みたい","opts":[
   {"en":"Muffin one, give me.","ok":false,"fb":"単語を並べただけで語順もバラバラです。give me は命令的で失礼に聞こえます。"},
   {"en":"Okay, you got me. I'll take one, too.","ok":true,"fb":"You got me. は「やられた、負けました」というユーモアのある一言。I'll take one. は「1つください」です。"},
   {"en":"I'll take all of them.","ok":false,"fb":"「全部ください」になってしまいます。お店のマフィンが全部なくなります。"}]},
  {"who":"p","en":"Ha ha, good call. That'll be eight fifty.","ja":"ふふ、いい選択です。8ドル50セントです。"},
  {"who":"me","ja":"カードで払えるか聞きたい","opts":[
   {"en":"Can I pay in card?","ok":false,"fb":"前置詞がちがいます。カードは <b>by card</b>、現金は in cash です。"},
   {"en":"Card, okay?","ok":false,"fb":"意味は伝わりますが、単語だけなのでぶっきらぼうに聞こえます。"},
   {"en":"Can I pay by card?","ok":true,"fb":"支払い方法を聞く一番自然な言い方です。Do you take cards? も使えます。"}]},
  {"who":"p","en":"Of course. Just tap it here. Your drinks will be ready at the end of the counter.","ja":"もちろんです。ここにタッチしてください。お飲み物はカウンターの端でお渡しします。"}],
 "wrap":"Can I get ~, please? と To go, please. があれば、どのカフェでも困りません。I'll take one, too.(私もそれを1つ)は追加注文に便利です。"},

{"id":"t02","lv":1,"t":"空港のチェックイン","place":"Airport","partner":"Check-in agent","pv":"m",
 "goal":"荷物を預けて、窓側の席を取り、フライトの情報を確認しましょう。",
 "phrases":[
  {"en":"I'd like to check in, please.","ja":"チェックインをお願いします。","tip":"<b>I'd like to ~</b> は「~したいです」の丁寧な言い方です。"},
  {"en":"Can I have a window seat?","ja":"窓側の席にできますか?","tip":"通路側は <b>an aisle seat</b>(アイル・シート)。aisle の s は読みません。"},
  {"en":"I have one bag to check.","ja":"預ける荷物が1つあります。","tip":"check は「(荷物を)預ける」。機内持ち込みの荷物は carry-on です。"},
  {"en":"What time does boarding start?","ja":"搭乗は何時に始まりますか?","tip":"boarding = 搭乗。gate(搭乗口)とセットで覚えましょう。"},
  {"en":"Is the flight on time?","ja":"フライトは定刻通りですか?","tip":"<b>on time</b> = 時間通り。遅れているときは delayed と言われます。"}],
 "lines":[
  {"who":"p","en":"Good morning. How can I help you?","ja":"おはようございます。ご用件をどうぞ。"},
  {"who":"me","ja":"チェックインしたいと伝えて、パスポートを渡したい","opts":[
   {"en":"Hi, I'd like to check in. Here's my passport.","ok":true,"fb":"I'd like to check in. で用件が一発で伝わります。Here's ~ は物を渡すときの定番です。"},
   {"en":"I check in want.","ok":false,"fb":"語順が日本語のままです。英語では「主語+動詞」の順に I'd like to check in. と言います。"},
   {"en":"I'd like to check out, please.","ok":false,"fb":"check out はホテルを出るときの言葉です。空港では check in を使います。"}]},
  {"who":"p","en":"Thank you. Do you have any bags to check today?","ja":"ありがとうございます。本日お預けになる荷物はありますか?"},
  {"who":"me","ja":"スーツケースを1つ預けたい","opts":[
   {"en":"No, I don't have any.","ok":false,"fb":"「ありません」と逆の意味になっています。"},
   {"en":"Yes, I check one suitcase.","ok":false,"fb":"I check(いつも預けます)は習慣の言い方で、今の場面には合いません。"},
   {"en":"Yes, just one suitcase to check.","ok":true,"fb":"just one で「1つだけ」。短くて伝わりやすい答えです。"}]},
  {"who":"p","en":"Okay, please put it on the scale. Hmm, twenty-four kilos. That's just under the limit!","ja":"では、はかりに載せてください。うーん、24キロ。制限ぎりぎりセーフです!"},
  {"who":"me","ja":"ほっとした!お土産を詰めすぎたと言いたい","opts":[
   {"en":"I was safe! I bought many souvenirs.","ok":false,"fb":"「セーフ」は和製英語的な使い方で、I was safe は「私は無事だった」に聞こえます。"},
   {"en":"Phew! I packed too many souvenirs.","ok":true,"fb":"Phew! は「ふう、よかった」という声。packed too many で「詰めすぎた」です。"},
   {"en":"I'm sorry, I'm too heavy.","ok":false,"fb":"「私が重すぎてすみません」という意味になってしまいます。"}]},
  {"who":"p","en":"Ha ha, it happens all the time. Would you like a window seat or an aisle seat?","ja":"あはは、よくあることですよ。窓側と通路側、どちらがよろしいですか?"},
  {"who":"me","ja":"窓側の席がいい","opts":[
   {"en":"Window, I want.","ok":false,"fb":"語順が不自然で、I want もぶっきらぼうに聞こえます。"},
   {"en":"I'd like an aisle seat, please.","ok":false,"fb":"aisle seat は通路側の席です。窓側は window seat です。"},
   {"en":"Can I have a window seat, please?","ok":true,"fb":"Can I have ~? は「~をもらえますか」の基本形。A window seat, please. だけでもOKです。"}]},
  {"who":"p","en":"Sure. You're in twenty-three A, by the window. Boarding starts at ten fifteen at Gate thirty-two.","ja":"かしこまりました。23Aの窓側です。搭乗は10時15分、32番ゲートからです。"},
  {"who":"me","ja":"フライトが定刻通りか確認したい","opts":[
   {"en":"Great. Is the flight on time?","ok":true,"fb":"on time は「時間通りに」。出発前に確認しておくと安心です。"},
   {"en":"Is the flight in time?","ok":false,"fb":"in time は「間に合って」という意味で、ここでは on time を使います。"},
   {"en":"The airplane is late?","ok":false,"fb":"「飛行機、遅れてるの?」と決めつけて聞くように聞こえます。Is ~? の形で聞きましょう。"}]},
  {"who":"p","en":"Yes, it's right on time. Have a great flight!","ja":"はい、定刻通りです。よい空の旅を!"}],
 "wrap":"空港では I'd like to check in. と Can I have a window seat? が二大フレーズです。on time と in time の違いも覚えておきましょう。"},

{"id":"t03","lv":1,"t":"ホテルのチェックイン","place":"Hotel","partner":"Front desk clerk","pv":"f",
 "goal":"ホテルにチェックインして、朝食やチェックアウトの時間を確認しましょう。",
 "phrases":[
  {"en":"I have a reservation for two nights.","ja":"2泊で予約しています。","tip":"reservation = 予約。I have a reservation. だけでも用件が伝わります。"},
  {"en":"Is breakfast included?","ja":"朝食は付いていますか?","tip":"<b>included</b> = 含まれている。料金の確認に便利な言葉です。"},
  {"en":"What time is checkout?","ja":"チェックアウトは何時ですか?","tip":"What time is ~? で「~は何時?」と何でも聞けます。"},
  {"en":"Could I get a room on a higher floor?","ja":"上の階の部屋にできますか?","tip":"Could I ~? は Can I ~? より少し丁寧です。"},
  {"en":"What's the Wi-Fi password?","ja":"Wi-Fiのパスワードは何ですか?","tip":"Wi-Fi は英語でも「ワイファイ」と発音します。"}],
 "lines":[
  {"who":"p","en":"Good evening, and welcome to the Harbor View Hotel. Checking in?","ja":"こんばんは、ハーバービューホテルへようこそ。チェックインですか?"},
  {"who":"me","ja":"はい、2泊で予約していると伝えたい","opts":[
   {"en":"Yes, I reserved you.","ok":false,"fb":"「あなたを予約しました」という意味になってしまいます。"},
   {"en":"Yes, I'm booking now.","ok":false,"fb":"「今予約しているところです」に聞こえます。予約はもう済んでいますね。"},
   {"en":"Yes, I have a reservation for two nights.","ok":true,"fb":"I have a reservation で「予約しています」。for two nights で泊数も伝えられます。"}]},
  {"who":"p","en":"Wonderful. May I see your passport, please?","ja":"ありがとうございます。パスポートを拝見できますか?"},
  {"who":"me","ja":"パスポートを渡して「はい、どうぞ」と言いたい","opts":[
   {"en":"Sure, here you are.","ok":true,"fb":"物を渡すときの定番です。Here you go. も同じ意味でよく使います。"},
   {"en":"Yes, I am passport.","ok":false,"fb":"「私はパスポートです」になってしまいます。"},
   {"en":"Sure, you can have it.","ok":false,"fb":"you can have it は「それ、あげますよ」という意味。パスポートはあげてはいけません。"}]},
  {"who":"p","en":"Thank you. You're in room twelve oh eight, on the twelfth floor. Here's your key card.","ja":"ありがとうございます。12階の1208号室です。こちらがカードキーです。"},
  {"who":"me","ja":"朝食は料金に含まれているか聞きたい","opts":[
   {"en":"Is breakfast free service?","ok":false,"fb":"「サービス(無料)」は和製英語です。英語の service は「接客・業務」の意味です。"},
   {"en":"Is breakfast included with my room?","ok":true,"fb":"included で「含まれている」。料金の確認にぴったりです。"},
   {"en":"Do you eat breakfast?","ok":false,"fb":"「あなたは朝ごはんを食べますか?」という質問になっています。"}]},
  {"who":"p","en":"Yes, it is. It's served from seven to ten in the lobby restaurant.","ja":"はい、含まれています。7時から10時まで、ロビーのレストランでご用意しています。"},
  {"who":"me","ja":"チェックアウトの時間を聞きたい","opts":[
   {"en":"Great. What time is checkout?","ok":true,"fb":"What time is ~? はシンプルで伝わりやすい聞き方です。"},
   {"en":"When can I check you out?","ok":false,"fb":"check someone out は「人をじろじろ見る」という意味にもなります。気まずい空気に!"},
   {"en":"What time is the check?","ok":false,"fb":"check だけだとレストランの「お会計」の意味になります。checkout まで言いましょう。"}]},
  {"who":"p","en":"Checkout is at eleven. Is there anything else I can help you with?","ja":"チェックアウトは11時です。ほかに何かございますか?"},
  {"who":"me","ja":"Wi-Fiのパスワードを教えてほしい","opts":[
   {"en":"Teach me the Wi-Fi password.","ok":false,"fb":"teach は「(勉強などを)教える」。情報を教えてもらうときは tell を使います。"},
   {"en":"Wi-Fi password, what?","ok":false,"fb":"単語を並べただけで、少し乱暴に聞こえます。"},
   {"en":"Yes, what's the Wi-Fi password?","ok":true,"fb":"What's ~? で「~は何ですか」。Could you tell me the Wi-Fi password? はさらに丁寧です。"}]},
  {"who":"p","en":"It's on the back of your key card. Enjoy your stay!","ja":"カードキーの裏に書いてあります。ごゆっくりおくつろぎください!"}],
 "wrap":"I have a reservation. と Is ~ included? はホテル以外の予約や料金確認でも使えます。「教えて」は teach ではなく tell が基本です。"},

{"id":"t04","lv":1,"t":"道をたずねる","place":"Street","partner":"Local","pv":"m",
 "goal":"親切な地元の人に駅への行き方を聞いて、聞き返しや確認もしてみましょう。",
 "phrases":[
  {"en":"Excuse me, could you help me?","ja":"すみません、ちょっといいですか?","tip":"いきなり質問せず、まずこの一言で声をかけましょう。"},
  {"en":"How do I get to the station?","ja":"駅へはどう行けばいいですか?","tip":"<b>How do I get to ~?</b> は道案内の基本形です。"},
  {"en":"Is it within walking distance?","ja":"歩いて行ける距離ですか?","tip":"within walking distance = 歩ける範囲内。"},
  {"en":"Could you say that again, please?","ja":"もう一度言ってもらえますか?","tip":"聞き取れなかったら遠慮なく。Sorry? だけでも通じます。"},
  {"en":"Thanks, you've been very helpful.","ja":"ありがとう、とても助かりました。","tip":"Thank you. だけより気持ちがしっかり伝わります。"}],
 "lines":[
  {"who":"p","en":"Hey, you look a little lost. Need some help?","ja":"あの、ちょっと迷っているみたいですね。手伝いましょうか?"},
  {"who":"me","ja":"はい!駅への行き方を聞きたい","opts":[
   {"en":"Yes! Where is station?","ok":false,"fb":"station の前に the が必要です。Where's the station? なら通じます。"},
   {"en":"Yes, please! How do I get to the station?","ok":true,"fb":"How do I get to ~? は行き方を聞く一番自然な形です。"},
   {"en":"Yes, I'm lost my way.","ok":false,"fb":"I'm と lost my way が混ざっています。I'm lost. か I lost my way. と言います。"}]},
  {"who":"p","en":"The train station? Sure. Go straight down this street and turn left at the second light.","ja":"駅ですか?いいですよ。この通りをまっすぐ行って、2つ目の信号を左です。"},
  {"who":"me","ja":"早くて聞き取れなかった。もう一度言ってほしい","opts":[
   {"en":"What? Say again.","ok":false,"fb":"What? は強く聞こえることがあり、Say again. も命令っぽくなります。"},
   {"en":"Speak slowly!","ok":false,"fb":"命令文なので、親切な相手に失礼に聞こえます。"},
   {"en":"Sorry, could you say that again, please?","ok":true,"fb":"Sorry を付けると感じよく聞き返せます。Could you speak a little more slowly? も便利です。"}]},
  {"who":"p","en":"No problem. Straight ahead, second light, turn left. Then you'll see it on your right.","ja":"いいですよ。まっすぐ、2つ目の信号、左。そうすると右手に見えます。"},
  {"who":"me","ja":"歩いて行ける距離か聞きたい","opts":[
   {"en":"Got it. Is it within walking distance?","ok":true,"fb":"Got it. は「わかりました」。within walking distance で「歩いて行ける距離」です。"},
   {"en":"Can I go by walking?","ok":false,"fb":"by walking は不自然です。Can I walk there? と言いましょう。"},
   {"en":"Is it walk distance?","ok":false,"fb":"walk distance という言い方はしません。walking distance です。"}]},
  {"who":"p","en":"Yeah, it's about ten minutes on foot. You can't miss it. It's the big building with a clock.","ja":"ええ、歩いて10分くらいです。すぐわかりますよ。時計のついた大きな建物です。"},
  {"who":"me","ja":"「2つ目の信号を左ですよね?」と確認したい","opts":[
   {"en":"So I turn right at the first light?","ok":false,"fb":"右・1つ目になっていて、内容がまちがっています。"},
   {"en":"I turn left the second light?","ok":false,"fb":"at が抜けています。「~で曲がる」は turn left <b>at</b> ~ です。"},
   {"en":"So, left at the second light, right?","ok":true,"fb":"文末の , right? は「~ですよね?」という確認。ここでは「右」ではありません。"}]},
  {"who":"p","en":"Exactly. You've got it!","ja":"その通り。ばっちりです!"},
  {"who":"me","ja":"お礼を言いたい","opts":[
   {"en":"Thank you for your teaching.","ok":false,"fb":"teaching は授業のような「教え」です。道案内には合いません。"},
   {"en":"Thanks, you've been very helpful.","ok":true,"fb":"「とても助かりました」と気持ちが伝わる一言です。Thanks a lot! もOKです。"},
   {"en":"You're welcome!","ok":false,"fb":"You're welcome. は「どういたしまして」。お礼を言われた側の言葉です。"}]},
  {"who":"p","en":"Anytime. Have a good one!","ja":"どういたしまして。よい一日を!"}],
 "wrap":"How do I get to ~? で行き方を聞き、Could you say that again? で聞き返し、~, right? で確認。この3つで道案内はほぼ完ぺきです。"},

{"id":"t05","lv":2,"t":"はじめましての雑談(自己紹介)","place":"Party","partner":"Emma","pv":"f",
 "goal":"パーティーで出会った人と自己紹介をして、趣味の話で盛り上がりましょう。",
 "phrases":[
  {"en":"Nice to meet you, too.","ja":"こちらこそ、はじめまして。","tip":"Nice to meet you. と言われたら、最後に too を付けて返します。"},
  {"en":"What do you do?","ja":"お仕事は何をしていますか?","tip":"職業を聞く定番。What's your job? よりやわらかい聞き方です。"},
  {"en":"I work in sales.","ja":"営業の仕事をしています。","tip":"<b>I work in + 分野</b> で職業を簡単に言えます。"},
  {"en":"What do you do for fun?","ja":"休みの日は何をして楽しんでいますか?","tip":"What's your hobby? より自然で、会話が広がりやすい聞き方です。"},
  {"en":"That sounds like fun!","ja":"楽しそうですね!","tip":"相づちの定番。That sounds great! もよく使います。"}],
 "lines":[
  {"who":"p","en":"Hi! I don't think we've met. I'm Emma. Nice to meet you!","ja":"こんにちは!はじめましてですよね。エマです。よろしくね!"},
  {"who":"me","ja":"「こちらこそ、はじめまして」と返したい","opts":[
   {"en":"Me too, I'm happy.","ok":false,"fb":"何が Me too なのかわからず、自己紹介の返事として不自然です。"},
   {"en":"First meeting!","ok":false,"fb":"「はじめまして」の直訳で、英語では使いません。"},
   {"en":"Hi! Nice to meet you, too.","ok":true,"fb":"相手が名乗ったら Nice to meet you, too. と返し、自分の名前を続けましょう。"}]},
  {"who":"p","en":"So, what do you do?","ja":"それで、お仕事は何をしているんですか?"},
  {"who":"me","ja":"IT企業でソフトウェアエンジニアをしていると伝えたい","opts":[
   {"en":"I'm a software engineer at a tech company.","ok":true,"fb":"I'm a 職業 at 会社の種類. の形で簡単に言えます。I work in IT. でもOKです。"},
   {"en":"I'm doing now engineer.","ok":false,"fb":"文法がくずれています。I'm an engineer. で十分です。"},
   {"en":"I do my best every day.","ok":false,"fb":"「毎日がんばってます」という答えで、仕事の内容が伝わりません。"}]},
  {"who":"p","en":"Oh, cool! That must keep you busy.","ja":"へえ、すごい!忙しいでしょうね。"},
  {"who":"me","ja":"忙しいけど楽しい、と言って、相手の趣味を聞きたい","opts":[
   {"en":"Yes. What is your hobby?","ok":false,"fb":"文法は正しいですが、面接のような堅い聞き方です。雑談なら What do you do for fun? が自然です。"},
   {"en":"It does, but I love it. What do you do for fun?","ok":true,"fb":"It does は That must keep you busy への返事。質問を返すと会話が続きます。"},
   {"en":"Yes, I'm very busy. Goodbye.","ok":false,"fb":"会話をいきなり終わらせてしまいます。相手がびっくりします。"}]},
  {"who":"p","en":"I'm really into rock climbing. I just started last month.","ja":"最近ロッククライミングにはまってるんです。先月始めたばかりで。"},
  {"who":"me","ja":"楽しそう!ずっとやってみたかった","opts":[
   {"en":"It sounds funny!","ok":false,"fb":"funny は「おかしい・笑える」です。「楽しい」は fun を使います。"},
   {"en":"I want to try it always.","ok":false,"fb":"「いつも試したい」と意味がずれています。「ずっと~したかった」は I've always wanted to ~ です。"},
   {"en":"That sounds like fun! I've always wanted to try it.","ok":true,"fb":"I've always wanted to ~ で「ずっと~してみたかった」。相手もうれしくなる返事です。"}]},
  {"who":"p","en":"Really? You should come with us next Saturday! Beginners are welcome.","ja":"本当?今度の土曜日、一緒に来なよ!初心者大歓迎だよ。"},
  {"who":"me","ja":"ぜひ行きたい!(落ちても笑わないでね)","opts":[
   {"en":"I'd love to! Just don't laugh if I fall.","ok":true,"fb":"I'd love to! は「ぜひ!」という前向きな返事。ちょっとした冗談で距離も縮まります。"},
   {"en":"I'll think about it maybe.","ok":false,"fb":"「考えておきます」は遠回しな断りに聞こえます。行きたい気持ちが伝わりません。"},
   {"en":"Yes, I go!","ok":false,"fb":"未来の予定なので I go は不自然です。I'll go! か I'd love to! と言います。"}]},
  {"who":"p","en":"Ha ha, deal! Let's swap numbers.","ja":"あはは、約束ね!連絡先を交換しよう。"}],
 "wrap":"What do you do? と What do you do for fun? は雑談の二本柱です。答えたあとに質問を返すと、会話が自然に続きます。"},

{"id":"t06","lv":2,"t":"レストランで注文とトラブル","place":"Restaurant","partner":"Server","pv":"m",
 "goal":"おすすめを聞いて注文し、料理がまちがっていたらやんわり伝えましょう。",
 "phrases":[
  {"en":"What do you recommend?","ja":"おすすめは何ですか?","tip":"迷ったらこれ。お店の人も喜んで答えてくれます。"},
  {"en":"I'll have the salmon.","ja":"サーモンにします。","tip":"<b>I'll have ~</b> は注文の定番です。"},
  {"en":"Excuse me, I think there's a mistake.","ja":"すみません、間違いがあるようです。","tip":"<b>I think</b> を付けると、角が立たずにやわらかく伝わります。"},
  {"en":"No worries at all.","ja":"全然気にしないでください。","tip":"謝られたときの、やさしい返事です。"},
  {"en":"Could I get the check, please?","ja":"お会計をお願いします。","tip":"アメリカでは check、イギリスでは bill と言います。"}],
 "lines":[
  {"who":"p","en":"Good evening! Are you ready to order, or do you need a few more minutes?","ja":"こんばんは!ご注文はお決まりですか、それとももう少しお時間が必要ですか?"},
  {"who":"me","ja":"だいたい決まったけど、おすすめを聞きたい","opts":[
   {"en":"I'm almost ready. What do you recommend?","ok":true,"fb":"What do you recommend? は自然で感じのいい聞き方です。"},
   {"en":"Which is delicious?","ok":false,"fb":"「どれがおいしいの?」は、ほかがまずいと言っているようで失礼に聞こえることがあります。"},
   {"en":"Please recommend me.","ok":false,"fb":"「私を推薦して」という意味になってしまいます。"}]},
  {"who":"p","en":"The grilled chicken is really popular, and the mushroom pasta is my personal favorite.","ja":"グリルチキンがとても人気で、マッシュルームのパスタは僕の一番のお気に入りです。"},
  {"who":"me","ja":"じゃあ、マッシュルームのパスタにする","opts":[
   {"en":"I'm the pasta.","ok":false,"fb":"「私はパスタです」になってしまいます。日本語の「私はパスタ」の直訳に注意です。"},
   {"en":"I'll have the chicken.","ok":false,"fb":"注文したいのはパスタなので、内容がちがいます。"},
   {"en":"Then I'll have the mushroom pasta, please.","ok":true,"fb":"I'll have ~ は注文の基本形。I'd like the mushroom pasta. も丁寧です。"}]},
  {"who":"p","en":"Great choice! Coming right up. Here you go, one grilled chicken. Enjoy!","ja":"いい選択です!すぐお持ちします。お待たせしました、グリルチキンです。どうぞ!"},
  {"who":"me","ja":"頼んだのはパスタなので、やんわり伝えたい","opts":[
   {"en":"This is wrong! Change it.","ok":false,"fb":"命令文で強く、怒っているように聞こえます。"},
   {"en":"Excuse me, I think I ordered the mushroom pasta.","ok":true,"fb":"I think を入れると、やわらかく間違いを伝えられます。"},
   {"en":"I can't eat this chicken.","ok":false,"fb":"アレルギーや好き嫌いの話に聞こえて、注文ミスだと伝わりません。"}]},
  {"who":"p","en":"Oh no, I'm so sorry! I'll fix that right away. Here's your pasta, and dessert is on us tonight.","ja":"大変申し訳ありません!すぐにお取り替えします。こちらパスタです。今夜のデザートはお店からのサービスです。"},
  {"who":"me","ja":"気にしないで、デザートうれしい!と伝えたい","opts":[
   {"en":"Dessert is service? Lucky!","ok":false,"fb":"「サービス(無料)」は和製英語です。英語では free や on the house と言います。"},
   {"en":"It's not a problem for me, okay.","ok":false,"fb":"最後の okay が不自然で、気持ちがうまく伝わりません。"},
   {"en":"No worries at all. Free dessert sounds great!","ok":true,"fb":"No worries. は「気にしないで」。ポジティブな一言で場がなごみます。"}]},
  {"who":"p","en":"Ha ha, glad to hear it. Just let me know when you're ready for the check.","ja":"あはは、よかったです。お会計の準備ができたら声をかけてください。"},
  {"who":"me","ja":"(食べ終わって)お会計をお願いしたい","opts":[
   {"en":"Could I get the check, please?","ok":true,"fb":"アメリカでは check が一般的です。Check, please. だけでも通じます。"},
   {"en":"Can I pay the money?","ok":false,"fb":"文法は合っていますが、「お金を払えますか?」と不自然な聞き方です。"},
   {"en":"Bill, quickly.","ok":false,"fb":"「早く会計して」と急かしていて、失礼に聞こえます。"}]},
  {"who":"p","en":"Of course. I'll bring it right over.","ja":"かしこまりました。すぐお持ちします。"}],
 "wrap":"トラブルのときは Excuse me, I think ~ で始めると、やわらかく伝えられます。謝られたら No worries. で笑顔で返しましょう。"},

{"id":"t07","lv":2,"t":"買い物で返品・交換","place":"Clothing store","partner":"Store clerk","pv":"f",
 "goal":"サイズの合わなかったセーターを、レシートを見せて交換してもらいましょう。",
 "phrases":[
  {"en":"I'd like to exchange this.","ja":"これを交換したいです。","tip":"exchange = 交換。返品なら return を使います。"},
  {"en":"It doesn't fit.","ja":"サイズが合いません。","tip":"<b>fit</b> は「サイズが合う」。似合うは look good on me です。"},
  {"en":"Here's my receipt.","ja":"レシートはこちらです。","tip":"receipt の p は読みません。「リシート」と発音します。"},
  {"en":"Could I try on a medium?","ja":"Mサイズを試着してもいいですか?","tip":"<b>try on</b> = 試着する。試着室は fitting room です。"},
  {"en":"Can I get a refund?","ja":"返金してもらえますか?","tip":"refund = 返金。交換ではなくお金を返してほしいときに使います。"}],
 "lines":[
  {"who":"p","en":"Hi, how can I help you?","ja":"こんにちは、どうされましたか?"},
  {"who":"me","ja":"このセーターを交換したいと伝えたい","opts":[
   {"en":"I bought this sweater. It's bad.","ok":false,"fb":"「悪い」だけでは何が問題か伝わらず、少し失礼に聞こえます。"},
   {"en":"I'd like to buy this sweater.","ok":false,"fb":"「このセーターを買いたい」になってしまいます。もう買ってありますね。"},
   {"en":"Hi, I'd like to exchange this sweater.","ok":true,"fb":"exchange で「交換」とはっきり伝わります。返品なら return です。"}]},
  {"who":"p","en":"Sure. Is there something wrong with it?","ja":"かしこまりました。何か問題がありましたか?"},
  {"who":"me","ja":"サイズが少し大きすぎて合わない","opts":[
   {"en":"It doesn't fit. It's a little too big.","ok":true,"fb":"It doesn't fit. で「サイズが合わない」。理由まで言うと話が早いです。"},
   {"en":"It's not fitting my size.","ok":false,"fb":"英語では不自然な言い方です。It doesn't fit me. と言います。"},
   {"en":"It's too small for me.","ok":false,"fb":"「小さすぎる」と逆の意味になっています。"}]},
  {"who":"p","en":"I see. Do you have the receipt?","ja":"わかりました。レシートはお持ちですか?"},
  {"who":"me","ja":"はい、どうぞ。先週買ったと伝えたい","opts":[
   {"en":"Yes, receipt is this. I buy last week.","ok":false,"fb":"last week なので過去形 bought が必要です。レシートは Here it is. で渡せます。"},
   {"en":"Yes, here it is. I bought it last week.","ok":true,"fb":"Here it is. は物を渡すときの定番。過去形 bought も正しく使えています。"},
   {"en":"No, I threw it away.","ok":false,"fb":"「捨てちゃいました」になってしまいます。交換が難しくなるかも!"}]},
  {"who":"p","en":"Thanks. What size would you like instead? We have small and medium.","ja":"ありがとうございます。代わりに何サイズにしますか?SとMがあります。"},
  {"who":"me","ja":"まずMサイズを試着してもいいか聞きたい","opts":[
   {"en":"Could I try on a medium first?","ok":true,"fb":"try on で「試着する」。first を付けると「まず」の気持ちが出ます。"},
   {"en":"Can I challenge the medium?","ok":false,"fb":"challenge は「挑戦する・異議を唱える」。日本語の「チャレンジ」とはちがいます。"},
   {"en":"Can I try in medium?","ok":false,"fb":"「試着する」は try on です。前置詞に注意しましょう。"}]},
  {"who":"p","en":"Of course! The fitting room is right over there.","ja":"もちろんです!試着室はあちらです。"},
  {"who":"me","ja":"(試着後)ぴったり!これにする","opts":[
   {"en":"It's just fit!","ok":false,"fb":"「サイズが合う」の fit は動詞なので It's fit とは言いません。It fits perfectly! が正しい形です。"},
   {"en":"It's too perfect, so no.","ok":false,"fb":"「完璧すぎるからいらない」という謎の答えになっています。"},
   {"en":"This one fits perfectly. I'll take it.","ok":true,"fb":"fits perfectly で「ぴったり」。I'll take it. は「これにします」の決まり文句です。"}]},
  {"who":"p","en":"Wonderful. I'll swap it for you. There's no extra charge!","ja":"よかったです。お取り替えしますね。追加料金はかかりません!"}],
 "wrap":"exchange(交換)、return(返品)、refund(返金)を使い分けましょう。I'll take it. は買い物を決めるときの最強フレーズです。"},

{"id":"t08","lv":2,"t":"週末の予定を話す","place":"Office break room","partner":"Jake","pv":"m",
 "goal":"友だちと週末の予定を話して、ハイキングの誘いに乗りましょう。",
 "phrases":[
  {"en":"Do you have any plans this weekend?","ja":"今週末、何か予定ある?","tip":"金曜日の定番の話題です。Any plans for the weekend? と短くも言えます。"},
  {"en":"I'm going to relax at home.","ja":"家でゆっくりするつもり。","tip":"<b>be going to ~</b> で「~するつもり」と予定を言えます。"},
  {"en":"Do you want to come?","ja":"一緒に来る?","tip":"気軽な誘い方です。Do you want to join us? もよく使います。"},
  {"en":"What time are we meeting?","ja":"何時に集合?","tip":"決まっている予定は現在進行形で言えます。"},
  {"en":"I'm looking forward to it.","ja":"楽しみにしています。","tip":"<b>look forward to</b> のあとは名詞か ~ing。to see ではなく to seeing です。"}],
 "lines":[
  {"who":"p","en":"Hey, any plans for the weekend?","ja":"ねえ、週末なにか予定ある?"},
  {"who":"me","ja":"特にないかな。家でゆっくりするつもり","opts":[
   {"en":"No plan. I'm relax at home.","ok":false,"fb":"I'm relax は文法がまちがいです。I'm going to relax か I'll relax と言います。"},
   {"en":"Not really. I'm just going to relax at home.","ok":true,"fb":"Not really. は「特には」というやわらかい答え。be going to で予定を言えています。"},
   {"en":"Yes, I'm very busy all weekend.","ok":false,"fb":"「週末ずっと忙しい」と逆の意味になっています。"}]},
  {"who":"p","en":"Nice. Actually, a few of us are going hiking on Sunday. Do you want to come?","ja":"いいね。実は日曜日に何人かでハイキングに行くんだ。来る?"},
  {"who":"me","ja":"いいね!何時に集合か聞きたい","opts":[
   {"en":"I want! When meeting?","ok":false,"fb":"I want だけでは文が終わっていません。単語の並べ方も不自然です。"},
   {"en":"Sorry, I can't make it.","ok":false,"fb":"「ごめん、行けない」と断っています。行きたい気持ちと逆です。"},
   {"en":"Sounds great! What time are we meeting?","ok":true,"fb":"Sounds great! で乗り気が伝わります。決まった予定は are we meeting の形で聞けます。"}]},
  {"who":"p","en":"We're meeting at the station at seven in the morning.","ja":"朝7時に駅集合だよ。"},
  {"who":"me","ja":"7時!?日曜日にしては早いね、と冗談まじりに","opts":[
   {"en":"Seven? Wow, that's early for a Sunday!","ok":true,"fb":"early は「(時刻が)早い」。for a Sunday で「日曜日にしては」です。"},
   {"en":"Seven is very fast!","ok":false,"fb":"fast は「(スピードが)速い」です。時刻が早いのは early です。"},
   {"en":"I'm early person, no.","ok":false,"fb":"文法がくずれていて意味が通りません。朝型の人は a morning person と言います。"}]},
  {"who":"p","en":"Ha ha, I know. But the view from the top is totally worth it.","ja":"あはは、だよね。でも頂上からの景色は本当にその価値があるよ。"},
  {"who":"me","ja":"わかった、行く!何を持っていけばいい?","opts":[
   {"en":"What should I bring my?","ok":false,"fb":"最後の my が余分で、文が成り立っていません。"},
   {"en":"What do I bring you?","ok":false,"fb":"「あなたに何を持っていけばいい?」とおみやげの話に聞こえます。"},
   {"en":"Okay, I'm in. What should I bring?","ok":true,"fb":"I'm in. は「乗った、参加する」という気軽な一言。What should I bring? は準備の質問の定番です。"}]},
  {"who":"p","en":"Just water, snacks, and good shoes. Oh, and maybe a jacket. It gets cold up there.","ja":"水とおやつと歩きやすい靴だけでいいよ。あ、上着もあるといいかも。上は寒くなるから。"},
  {"who":"me","ja":"了解!日曜日、楽しみにしてる","opts":[
   {"en":"I'm looking forward to see you.","ok":false,"fb":"look forward to のあとは ~ing です。to seeing you が正しい形です。"},
   {"en":"Got it. I'm looking forward to Sunday!","ok":true,"fb":"look forward to + 名詞 で「~を楽しみにする」。Can't wait! もカジュアルで使えます。"},
   {"en":"I'm waiting Sunday.","ok":false,"fb":"wait には for が必要で、「楽しみ」という気持ちも伝わりません。"}]},
  {"who":"p","en":"Me too. See you there!","ja":"僕も。じゃあ現地で!"}],
 "wrap":"予定は be going to、誘いへの返事は Sounds great! や I'm in.。早い時刻は early、速いスピードは fast と使い分けましょう。"},

{"id":"t09","lv":3,"t":"職場で同僚に頼みごと","place":"Office","partner":"Lisa (coworker)","pv":"f",
 "goal":"同僚に、プレゼン資料のチェックを感じよくお願いしましょう。",
 "phrases":[
  {"en":"Do you have a minute?","ja":"ちょっと時間ありますか?","tip":"頼みごとの前の声かけ。Do you have <b>the</b> time? だと「今何時?」になるので注意。"},
  {"en":"Would you mind taking a look at this?","ja":"これを見てもらえませんか?","tip":"<b>Would you mind ~ing?</b> は丁寧なお願い。OKのときの返事は Not at all.(全然かまわない)です。"},
  {"en":"I'm a little nervous.","ja":"ちょっと緊張しています。","tip":"nervous = 緊張している。気持ちを言うと相手も協力しやすくなります。"},
  {"en":"I really appreciate it.","ja":"本当に感謝します。","tip":"Thank you. よりも感謝の気持ちが強く伝わります。"},
  {"en":"Coffee's on me.","ja":"コーヒーおごるよ。","tip":"<b>~ is on me</b> で「~は私のおごり」。"}],
 "lines":[
  {"who":"p","en":"Hey, what's up? You look a little stressed.","ja":"どうしたの?ちょっとストレスたまってそうだね。"},
  {"who":"me","ja":"ちょっと時間ある?と聞きたい","opts":[
   {"en":"Do you have a minute?","ok":true,"fb":"a minute は「少しの時間」。頼みごとの前の自然な声かけです。"},
   {"en":"Do you have the time?","ok":false,"fb":"the time を付けると「今何時ですか?」という意味になります。"},
   {"en":"Please give me your time.","ok":false,"fb":"直訳で大げさに聞こえ、かなり重いお願いのようになります。"}]},
  {"who":"p","en":"Sure. What do you need?","ja":"いいよ。どうしたの?"},
  {"who":"me","ja":"プレゼンのスライドを見てもらえないか頼みたい","opts":[
   {"en":"Look at this slides.","ok":false,"fb":"slides は複数なので these slides です。命令文なので頼み方としても強めです。"},
   {"en":"You must check my slides.","ok":false,"fb":"must は「~しなければならない」。同僚に命令しているように聞こえます。"},
   {"en":"Would you mind taking a look at my slides?","ok":true,"fb":"Would you mind ~ing? は丁寧なお願い。Could you take a look at my slides? もOKです。"}]},
  {"who":"p","en":"Not at all. When's your presentation?","ja":"全然いいよ。プレゼンはいつ?"},
  {"who":"me","ja":"明日の朝。ちょっと緊張してる","opts":[
   {"en":"It's in tomorrow morning.","ok":false,"fb":"tomorrow morning の前に in は付けません。"},
   {"en":"It's tomorrow morning. I'm a little nervous.","ok":true,"fb":"気持ちを一言そえると、相手も応援したくなります。"},
   {"en":"It was yesterday.","ok":false,"fb":"「昨日だった」では、もう終わっています!"}]},
  {"who":"p","en":"Okay, I'll look at them after lunch. I'll send you my comments by three.","ja":"わかった、お昼のあとに見るね。3時までにコメント送るよ。"},
  {"who":"me","ja":"本当に助かる、と感謝したい","opts":[
   {"en":"Thank you so much. I really appreciate it.","ok":true,"fb":"I really appreciate it. は感謝がしっかり伝わる大人の言い方です。"},
   {"en":"Thank you for your hard work.","ok":false,"fb":"「お疲れさまです」の直訳で、まだ何もしてもらっていない場面では不自然です。"},
   {"en":"You're so kind person.","ok":false,"fb":"a が抜けています。You're so kind. か You're such a kind person. と言います。"}]},
  {"who":"p","en":"No problem. You'd do the same for me.","ja":"いいって。あなたも同じことしてくれるでしょ。"},
  {"who":"me","ja":"もちろん。お礼に今週はコーヒーをおごるね","opts":[
   {"en":"I'll treat coffee for you.","ok":false,"fb":"treat の使い方がちがいます。I'll treat you to coffee. が正しい形です。"},
   {"en":"I'll pay you money.","ok":false,"fb":"お金を払うと言うと、親切な相手に失礼に聞こえます。"},
   {"en":"Of course. Coffee's on me this week!","ok":true,"fb":"~ is on me は「~はおごり」。気軽にお礼の気持ちを伝えられます。"}]},
  {"who":"p","en":"Deal! I'll hold you to that.","ja":"決まり!忘れないでね。"}],
 "wrap":"頼みごとは Do you have a minute? で声をかけ、Would you mind ~ing? でお願いし、I really appreciate it. で感謝。職場で何度も使える流れです。"},

{"id":"t10","lv":3,"t":"電話で予約の変更","place":"Phone call","partner":"Restaurant staff","pv":"f",
 "goal":"レストランに電話して、今夜の予約の時間を変更しましょう。",
 "phrases":[
  {"en":"I'd like to change my reservation.","ja":"予約を変更したいです。","tip":"取り消しなら cancel my reservation です。"},
  {"en":"It's for two people tonight at seven.","ja":"今夜7時、2名の予約です。","tip":"予約の内容は <b>for + 人数 + 日時</b> の順で言うとスムーズです。"},
  {"en":"Could we move it to eight?","ja":"8時に変更できますか?","tip":"<b>move it to ~</b> で「~にずらす」。"},
  {"en":"Eight thirty works for us.","ja":"8時半で大丈夫です。","tip":"<b>work</b> には「都合がいい」という意味があります。"},
  {"en":"Sorry, could you speak a little more slowly?","ja":"すみません、もう少しゆっくり話してもらえますか?","tip":"電話は聞き取りにくいもの。遠慮なく使いましょう。"}],
 "lines":[
  {"who":"p","en":"Thank you for calling Sunny Table. How can I help you?","ja":"お電話ありがとうございます、サニーテーブルです。ご用件をどうぞ。"},
  {"who":"me","ja":"予約を変更したいと伝えたい","opts":[
   {"en":"I want to cancel my reservation.","ok":false,"fb":"cancel は「取り消し」です。変更したいなら change を使います。"},
   {"en":"I changed my reservation.","ok":false,"fb":"過去形なので「もう変更しました」になってしまいます。"},
   {"en":"Hi, I'd like to change my reservation, please.","ok":true,"fb":"I'd like to ~ で丁寧に用件を伝えられます。電話の第一声にぴったりです。"}]},
  {"who":"p","en":"Sure. Can you tell me the date and time of your reservation?","ja":"かしこまりました。ご予約の日にちと時間を教えていただけますか?"},
  {"who":"me","ja":"今夜7時、2名で予約している","opts":[
   {"en":"It's for two people tonight at seven.","ok":true,"fb":"for + 人数 + 日時 の順で、必要な情報がすっきり伝わります。"},
   {"en":"It's two person, seven tonight.","ok":false,"fb":"two のあとは複数形 people です。語順も不自然です。"},
   {"en":"I'm reserved for seven.","ok":false,"fb":"I'm reserved は「私はひかえめな性格です」という意味にもなります。"}]},
  {"who":"p","en":"Got it. What time would you like to change it to?","ja":"承知しました。何時に変更されますか?"},
  {"who":"me","ja":"8時に変えられるか聞きたい","opts":[
   {"en":"Eight o'clock, change.","ok":false,"fb":"単語を並べただけで、お願いの形になっていません。"},
   {"en":"Could we move it to eight o'clock?","ok":true,"fb":"move it to ~ で「~にずらす」。Could we ~? で丁寧にお願いできます。"},
   {"en":"Could we move it to eight days?","ok":false,"fb":"eight days は「8日間」。8日後にずらすことになってしまいます!"}]},
  {"who":"p","en":"Let me check. I'm sorry, eight is fully booked. We do have a table at eight thirty, though.","ja":"確認します。申し訳ありません、8時は満席です。8時半ならお席がありますが。"},
  {"who":"me","ja":"8時半で大丈夫です","opts":[
   {"en":"Eight thirty is no problem for you.","ok":false,"fb":"for you だと「あなたにとって問題ない」になり、意味がずれます。"},
   {"en":"Eight thirty? I can't wait that long.","ok":false,"fb":"「そんなに待てない」と断っているように聞こえます。"},
   {"en":"Eight thirty works for us. Thank you.","ok":true,"fb":"work は「都合がいい」。That works for us. はビジネスでもよく使います。"}]},
  {"who":"p","en":"Perfect. So that's a table for two, tonight at eight thirty.","ja":"かしこまりました。では今夜8時半、2名様ですね。"},
  {"who":"me","ja":"そうです、ありがとう、と電話を終えたい","opts":[
   {"en":"No, that's right.","ok":false,"fb":"No と that's right が矛盾していて、相手が混乱します。"},
   {"en":"Yes, that's right. Thanks for your help!","ok":true,"fb":"確認に Yes, that's right. と答え、お礼で気持ちよく電話を終えられます。"},
   {"en":"Yes, it was correct.","ok":false,"fb":"過去形 was が不自然です。今の確認なので that's right と言います。"}]},
  {"who":"p","en":"You're welcome. We'll see you tonight!","ja":"どういたしまして。今夜お待ちしております!"}],
 "wrap":"電話の予約変更は「用件→今の予約内容→希望→確認」の順で進みます。~ works for us.(~で大丈夫です)は日程調整の万能フレーズです。"},

{"id":"t11","lv":3,"t":"オンライン会議の始まり","place":"Online meeting","partner":"Team leader","pv":"m",
 "goal":"オンライン会議の音声や画面のトラブルを英語で伝えて、会議を始めましょう。",
 "phrases":[
  {"en":"I can hear you fine.","ja":"よく聞こえています。","tip":"fine を付けると「問題なく」の意味になります。"},
  {"en":"You're on mute.","ja":"ミュートになっていますよ。","tip":"オンライン会議で一番よく聞く一言かもしれません。"},
  {"en":"Can everyone see my screen?","ja":"皆さん、画面が見えていますか?","tip":"画面共有のときの決まり文句です。"},
  {"en":"Sorry, you're breaking up.","ja":"すみません、音声が途切れています。","tip":"<b>break up</b> は「(音声が)途切れる」。恋人と別れる意味もあります。"},
  {"en":"Shall we get started?","ja":"始めましょうか?","tip":"Shall we ~? は「~しましょうか?」というやわらかい提案です。"}],
 "lines":[
  {"who":"p","en":"Hi, everyone. Can you hear me okay?","ja":"皆さん、こんにちは。声は聞こえていますか?"},
  {"who":"me","ja":"はい、よく聞こえます","opts":[
   {"en":"Yes, I'm listening your voice.","ok":false,"fb":"listen には to が必要です。また「聞こえる」は hear を使います。"},
   {"en":"Yes, I can hear you fine.","ok":true,"fb":"hear は「(自然に)聞こえる」。Loud and clear! もよく使います。"},
   {"en":"No, I can't hear you.","ok":false,"fb":"聞こえていないなら答えられないはず。ちょっとしたジョークになってしまいます。"}]},
  {"who":"p","en":"Great. Before we start, I'll share my screen. Can everyone see it?","ja":"よかった。始める前に画面を共有しますね。皆さん見えていますか?"},
  {"who":"me","ja":"まだ黒い画面しか見えない","opts":[
   {"en":"Not yet. I can only see a black screen.","ok":true,"fb":"Not yet. は「まだです」。何が見えているかも伝えると親切です。"},
   {"en":"No, I don't look.","ok":false,"fb":"「私は見ません」という意味になってしまいます。見えるかどうかは see を使います。"},
   {"en":"Yes, it looks great!","ok":false,"fb":"見えていないのに「いいですね!」と言うと、話が進まなくなります。"}]},
  {"who":"p","en":"Oh, sorry about that. How about now?","ja":"あ、すみません。これでどうですか?"},
  {"who":"me","ja":"今は見える、と伝えたい","opts":[
   {"en":"Now I saw it.","ok":false,"fb":"now と過去形 saw が合いません。今のことは can see で言います。"},
   {"en":"I see what you mean.","ok":false,"fb":"「おっしゃることはわかります」という意味で、画面の話になりません。"},
   {"en":"Yes, now I can see it.","ok":true,"fb":"can see で「見える」。Yes, it's showing now. とも言えます。"}]},
  {"who":"p","en":"Perfect. So today... talk about... the new... schedule...","ja":"よかった。それで今日は……話す……新しい……スケジュール……(音声が途切れています)"},
  {"who":"me","ja":"音声が途切れていると伝えたい","opts":[
   {"en":"Your voice is broken.","ok":false,"fb":"「あなたの声は壊れている」と聞こえて、ちょっと失礼です。"},
   {"en":"Sorry, you're breaking up a little.","ok":true,"fb":"break up は音声が途切れること。Sorry を付けるとやわらかく伝わります。"},
   {"en":"Your internet is bad, fix it.","ok":false,"fb":"命令文で、上司に対してかなり失礼に聞こえます。"}]},
  {"who":"p","en":"Oh, is this better? I just switched to my other headset.","ja":"あ、これでどうですか?別のヘッドセットに替えました。"},
  {"who":"me","ja":"ずっとよくなった。始めましょうか","opts":[
   {"en":"Much better, thanks. Shall we get started?","ok":true,"fb":"Much better. は「ずっとよくなった」。Shall we ~? で自然に会議を進められます。"},
   {"en":"Clear! Let's beginning.","ok":false,"fb":"Let's のあとは動詞の原形です。Let's begin. と言います。"},
   {"en":"It's clean now.","ok":false,"fb":"clean は「きれいな・清潔な」。音がはっきりは clear です。"}]},
  {"who":"p","en":"Yes, let's. Thanks for your patience, everyone.","ja":"そうしましょう。皆さん、お待たせしました。"}],
 "wrap":"「聞こえる」は hear、「見える」は see。音声が途切れたら You're breaking up. と伝えましょう。Shall we get started? で会議を前に進められます。"},

{"id":"t12","lv":3,"t":"体調不良で病院・薬局","place":"Pharmacy","partner":"Pharmacist","pv":"m",
 "goal":"薬局で症状を説明して、自分に合う風邪薬と飲み方を確認しましょう。",
 "phrases":[
  {"en":"Do you have anything for a cold?","ja":"風邪に効く薬はありますか?","tip":"<b>anything for ~</b> で「~に効くもの」。頭痛なら for a headache です。"},
  {"en":"I have a sore throat.","ja":"のどが痛いです。","tip":"sore = ひりひり痛い。鼻水は a runny nose です。"},
  {"en":"I've had a fever since last night.","ja":"昨夜から熱があります。","tip":"<b>have had ~ since</b> で「~からずっと」。"},
  {"en":"Will it make me sleepy?","ja":"眠くなりますか?","tip":"make me ~ で「私を~にする」。仕事や運転の前に大事な確認です。"},
  {"en":"How many times a day should I take it?","ja":"1日何回飲めばいいですか?","tip":"薬を「飲む」は drink ではなく <b>take</b> です。"}],
 "lines":[
  {"who":"p","en":"Hi there. What can I do for you today?","ja":"こんにちは。今日はどうされましたか?"},
  {"who":"me","ja":"風邪に効く薬がほしい","opts":[
   {"en":"Give me cold medicine now.","ok":false,"fb":"命令文に now まで付いていて、かなり失礼に聞こえます。"},
   {"en":"I want medicine of cold.","ok":false,"fb":"medicine of cold という言い方はしません。medicine for a cold です。"},
   {"en":"Hi, do you have anything for a cold?","ok":true,"fb":"anything for ~ で「~に効くもの」。薬局でとても便利な形です。"}]},
  {"who":"p","en":"Sure. What symptoms do you have?","ja":"わかりました。どんな症状がありますか?"},
  {"who":"me","ja":"のどが痛くて、鼻水が出る","opts":[
   {"en":"My throat is painful and nose is running water.","ok":false,"fb":"直訳で不自然です。a sore throat と a runny nose をセットで覚えましょう。"},
   {"en":"I have a sore throat and a runny nose.","ok":true,"fb":"症状は I have ~ で言えます。風邪の二大症状のセットです。"},
   {"en":"I have a sore stomach.","ok":false,"fb":"stomach は「おなか」です。痛いのはのどですね。"}]},
  {"who":"p","en":"I see. Do you have a fever?","ja":"なるほど。熱はありますか?"},
  {"who":"me","ja":"昨夜から少し熱がある","opts":[
   {"en":"Yes, I've had a slight fever since last night.","ok":true,"fb":"have had ~ since で「~からずっと」。slight は「少しの」です。"},
   {"en":"Yes, I have fever from last night.","ok":false,"fb":"a fever と a が必要です。「~からずっと」は from ではなく since を使います。"},
   {"en":"Yes, I'm hot.","ok":false,"fb":"I'm hot. は「暑い」という意味で、熱があることは伝わりません。熱は have a fever で言います。"}]},
  {"who":"p","en":"Okay. This one should help. It works for a sore throat and a stuffy nose.","ja":"わかりました。これが効くと思います。のどの痛みと鼻づまりに効きますよ。"},
  {"who":"me","ja":"眠くなるか聞きたい(明日仕事がある)","opts":[
   {"en":"Will I sleep forever?","ok":false,"fb":"「永遠に眠るの?」とこわい質問になってしまいます。"},
   {"en":"Is it sleepy?","ok":false,"fb":"「その薬は眠いですか?」と、薬が眠がっていることになります。"},
   {"en":"Will it make me sleepy? I have work tomorrow.","ok":true,"fb":"make me sleepy で「眠くさせる」。理由も言うと、合う薬を選んでもらえます。"}]},
  {"who":"p","en":"It might, a little. Try taking it after dinner, and get some rest.","ja":"少し眠くなるかもしれません。夕食後に飲んで、ゆっくり休んでください。"},
  {"who":"me","ja":"1日何回飲めばいいか聞きたい","opts":[
   {"en":"How many times I drink?","ok":false,"fb":"薬を飲むは take です。疑問文の語順にもなっていません。"},
   {"en":"How many times a day should I take it?","ok":true,"fb":"a day で「1日に」。薬は take で「飲む」です。"},
   {"en":"How long should I take a rest?","ok":false,"fb":"「どのくらい休めばいい?」と、薬の回数とは別の質問です。"}]},
  {"who":"p","en":"Twice a day, after breakfast and dinner. If you don't feel better in three days, please see a doctor.","ja":"1日2回、朝食後と夕食後です。3日たってもよくならなければ、医師に診てもらってください。"}],
 "wrap":"症状は I have a ~ で言えます。薬を「飲む」は take。Do you have anything for ~? は頭痛や腹痛など、どんな症状にも使えます。"},

{"id":"t13","lv":4,"t":"会議で意見を言う・反対する","place":"Meeting room","partner":"Ms. Patel (manager)","pv":"f",
 "goal":"会議で上司の案にていねいに反対し、代わりの案を出して合意しましょう。",
 "phrases":[
  {"en":"Could I add something here?","ja":"ここで少し付け加えてもいいですか?","tip":"発言の前に許可を取ると、会議でスムーズに話し始められます。"},
  {"en":"I see your point, but...","ja":"おっしゃることはわかりますが…","tip":"反対する前に、まず相手の意見を受け止めるのがコツです。"},
  {"en":"That might be a bit early.","ja":"それは少し早いかもしれません。","tip":"<b>might</b> や <b>a bit</b> で言い方をやわらげます(ヘッジ)。"},
  {"en":"What if we tried a different approach?","ja":"別の方法を試してみてはどうでしょう?","tip":"<b>What if we ~?</b> は押しつけない提案の形です。"},
  {"en":"I'll put together a plan.","ja":"計画をまとめます。","tip":"put together = まとめる・作成する。"}],
 "lines":[
  {"who":"p","en":"So, I'm thinking we should launch the new app next month. Any thoughts?","ja":"新しいアプリは来月リリースしようと考えています。何か意見はありますか?"},
  {"who":"me","ja":"少し付け加えてもいいか聞きたい","opts":[
   {"en":"Could I add something here?","ok":true,"fb":"発言の許可を取る丁寧な言い方です。If I may, ~ という切り出し方もあります。"},
   {"en":"I have opinion. Listen.","ok":false,"fb":"an opinion と a が必要です。Listen. は命令で、上司に失礼です。"},
   {"en":"Can I plus one thing?","ok":false,"fb":"plus は動詞として使いません。add を使います。"}]},
  {"who":"p","en":"Of course. Go ahead.","ja":"もちろん。どうぞ。"},
  {"who":"me","ja":"おっしゃることはわかりますが、来月は少し早いかもしれません","opts":[
   {"en":"You're wrong. Next month is too early.","ok":false,"fb":"You're wrong. は直接的すぎて、会議の空気が悪くなります。"},
   {"en":"I agree, next month is perfect.","ok":false,"fb":"賛成していて、言いたいことと逆です。"},
   {"en":"I see your point, but next month might be a bit early.","ok":true,"fb":"受け止める→might と a bit でやわらげる、というていねいな反対の形です。"}]},
  {"who":"p","en":"Hmm. Why do you think so?","ja":"うーん。どうしてそう思いますか?"},
  {"who":"me","ja":"まだユーザーテストが終わっていないから","opts":[
   {"en":"Because user test is not finish.","ok":false,"fb":"is not finish は文法がまちがいです。finished にする必要があります。"},
   {"en":"We haven't finished user testing yet.","ok":true,"fb":"haven't ~ yet で「まだ~していない」。理由をはっきり言えています。"},
   {"en":"Because I don't like testing.","ok":false,"fb":"個人の好き嫌いになっていて、ビジネスの理由になりません。"}]},
  {"who":"p","en":"That's true. But our competitors are moving fast.","ja":"確かに。でも競合はどんどん動いていますよ。"},
  {"who":"me","ja":"テストを2週間だけ延ばすのはどうか提案したい","opts":[
   {"en":"What if we extended testing by just two weeks?","ok":true,"fb":"What if we ~? は押しつけない提案です。by just two weeks で「たった2週間」と小ささを強調しています。"},
   {"en":"We must test two weeks more, okay?","ok":false,"fb":"must と okay? で、上司に命令して押しつけているように聞こえます。"},
   {"en":"How about we test for two weeks ago?","ok":false,"fb":"ago は過去を表します。未来の提案には使えません。"}]},
  {"who":"p","en":"Two weeks... That could work. It's better than fixing bugs after launch.","ja":"2週間……それならいけるかも。リリース後にバグを直すよりいいですね。"},
  {"who":"me","ja":"ありがとうございます。今日中にテスト計画をまとめて送ります","opts":[
   {"en":"I'll send you the plan maybe someday.","ok":false,"fb":"maybe someday は「いつか、たぶん」。ビジネスでは頼りなく聞こえます。"},
   {"en":"Please make the test plan for me.","ok":false,"fb":"上司に計画を作らせることになり、話が逆です。"},
   {"en":"Thanks. I'll put together a testing plan and send it today.","ok":true,"fb":"put together は「まとめる」。期限まで言うと信頼されます。"}]},
  {"who":"p","en":"Great. Let's discuss it again on Friday.","ja":"いいですね。金曜日にもう一度話し合いましょう。"}],
 "wrap":"反対は「受け止める(I see your point)→やわらげる(might, a bit)→提案する(What if we ~?)」の3ステップ。はっきり言っても角が立ちません。"},

{"id":"t14","lv":4,"t":"取引先との値段交渉","place":"Business meeting","partner":"Supplier sales rep","pv":"m",
 "goal":"仕入れ先と単価を交渉して、お互いに納得できる条件で合意しましょう。",
 "phrases":[
  {"en":"That's a bit higher than we expected.","ja":"予想より少し高いです。","tip":"「高すぎる」と言わず、<b>a bit higher than expected</b> でやわらかく伝えます。"},
  {"en":"We were hoping for something closer to ten dollars.","ja":"10ドルに近い金額を希望していました。","tip":"過去進行形 <b>were hoping</b> にすると、さらに控えめな言い方になります。"},
  {"en":"Is there any flexibility on the price?","ja":"価格に融通はききますか?","tip":"flexibility = 柔軟性。値下げを直接頼まずに交渉を始められます。"},
  {"en":"That could work if shipping is included.","ja":"送料込みならそれで進められそうです。","tip":"<b>could work if ~</b> で条件つきの「OK」を出せます。"},
  {"en":"I'll get back to you tomorrow.","ja":"明日までにご連絡します。","tip":"get back to ~ = 折り返し連絡する。"}],
 "lines":[
  {"who":"p","en":"So, for an order of five hundred units, the price would be twelve dollars per unit.","ja":"500個のご注文ですと、1個あたり12ドルになります。"},
  {"who":"me","ja":"予想より少し高いと伝えたい","opts":[
   {"en":"It's too expensive! No way.","ok":false,"fb":"No way. は「ありえない」。交渉の最初から相手を突き放してしまいます。"},
   {"en":"That's a bit higher than we expected.","ok":true,"fb":"a bit と than we expected で、失礼にならずに「高い」と伝えられます。"},
   {"en":"That's a bit cheaper than we expected.","ok":false,"fb":"「思ったより安い」と言っています。それでは値下げしてもらえません。"}]},
  {"who":"p","en":"I understand. What price did you have in mind?","ja":"わかります。どのくらいの価格をお考えでしたか?"},
  {"who":"me","ja":"10ドルくらいを希望していた","opts":[
   {"en":"We are thinking ten dollars, final.","ok":false,"fb":"final(これで最終)と言い切ると、交渉の余地がなくなります。"},
   {"en":"Ten dollars is your price.","ok":false,"fb":"「あなたの価格は10ドルです」と決めつけていて、失礼に聞こえます。"},
   {"en":"We were hoping for something closer to ten dollars.","ok":true,"fb":"were hoping で控えめに希望を伝え、closer to で幅を持たせています。"}]},
  {"who":"p","en":"Ten is difficult for us. Our material costs have gone up this year.","ja":"10ドルは厳しいですね。今年は材料費が上がっていまして。"},
  {"who":"me","ja":"注文数を倍にしたら、割引できるか聞きたい","opts":[
   {"en":"If we doubled our order, could you offer a discount?","ok":true,"fb":"If we ~, could you ~? は条件を出して交渉する基本の形です。"},
   {"en":"If we order more, you discount?","ok":false,"fb":"文が不完全で、ぶっきらぼうに聞こえます。could you offer a discount? と言いましょう。"},
   {"en":"Can you discount our order to double?","ok":false,"fb":"「注文を倍に値引きする」という意味の通らない文です。"}]},
  {"who":"p","en":"If you double the order to one thousand units, we could do eleven dollars.","ja":"1,000個に倍増していただけるなら、11ドルにできます。"},
  {"who":"me","ja":"送料込みなら11ドルでいけそう、と伝えたい","opts":[
   {"en":"Shipping is service, right?","ok":false,"fb":"「サービス(無料)」は和製英語です。英語の service は無料という意味になりません。"},
   {"en":"Eleven could work if shipping is included.","ok":true,"fb":"could work if ~ で「~なら成立しそう」。条件つきで前向きに返せます。"},
   {"en":"Eleven, and you pay shipping. Decide now.","ok":false,"fb":"Decide now. は命令で、相手に圧力をかけています。関係が悪くなります。"}]},
  {"who":"p","en":"Hmm... Okay. Eleven dollars, including shipping. I think we have a deal.","ja":"うーん……わかりました。送料込みで11ドル。合意ですね。"},
  {"who":"me","ja":"ありがとう。チームに確認して明日連絡します","opts":[
   {"en":"Thanks. I'll answer you sometime.","ok":false,"fb":"sometime は「いつか」。期限があいまいで、ビジネスでは不安を与えます。"},
   {"en":"Thank you. I'll ask my boss about my salary.","ok":false,"fb":"自分の給料の話になっています。今は関係ありません!"},
   {"en":"Great. I'll confirm with my team and get back to you tomorrow.","ok":true,"fb":"confirm with ~ で「~に確認する」、get back to you で「折り返し連絡する」です。"}]},
  {"who":"p","en":"Sounds good. I'll send over a revised quote this afternoon.","ja":"承知しました。午後に修正した見積もりをお送りします。"}],
 "wrap":"交渉は「やわらかく高いと伝える→控えめに希望を言う→条件を出す(If we ~, could you ~?)」の流れ。could や were hoping が大人の交渉を作ります。"},

{"id":"t15","lv":4,"t":"プレゼン後の質疑応答","place":"Conference room","partner":"Audience member","pv":"m",
 "goal":"プレゼン後の質問に落ち着いて答え、わからないことは後で対応すると伝えましょう。",
 "phrases":[
  {"en":"That's a great question.","ja":"いい質問ですね。","tip":"答える前のひと呼吸に使えます。考える時間もかせげます。"},
  {"en":"Just to clarify, do you mean ~?","ja":"確認ですが、~という意味でしょうか?","tip":"<b>clarify</b> = はっきりさせる。質問がわかりにくいときに使います。"},
  {"en":"I don't have the exact number with me.","ja":"今、正確な数字は手元にありません。","tip":"知らないことを無理に答えず、正直に言うのがプロです。"},
  {"en":"I'll follow up with you by email.","ja":"後ほどメールでご連絡します。","tip":"follow up = あとで追加の対応をする。"},
  {"en":"Does that answer your question?","ja":"これでご質問の答えになっていますか?","tip":"答えのあとに確認すると、ていねいな印象になります。"}],
 "lines":[
  {"who":"p","en":"Thanks for the presentation. I have a question about the budget.","ja":"プレゼンありがとうございました。予算について質問があります。"},
  {"who":"me","ja":"どうぞ、と促したい","opts":[
   {"en":"Question? Okay, say it.","ok":false,"fb":"say it は「言ってみろ」のように聞こえ、失礼です。"},
   {"en":"No questions, please.","ok":false,"fb":"「質問はお断り」と言っています。質疑応答の時間なのに!"},
   {"en":"Of course. Please go ahead.","ok":true,"fb":"go ahead は「どうぞ(話してください)」。Sure, go ahead. もOKです。"}]},
  {"who":"p","en":"You said the project will cost less next year. Why is that?","ja":"来年はプロジェクトの費用が下がるとおっしゃいましたね。それはなぜですか?"},
  {"who":"me","ja":"いい質問です。主にソフトウェアの費用が下がるからです","opts":[
   {"en":"Great question. It's mainly because software costs will go down.","ok":true,"fb":"mainly because で「主な理由は」。答えの前に Great question. を入れると落ち着いて話せます。"},
   {"en":"Good question. Software costs will go up.","ok":false,"fb":"go up は「上がる」で、説明と逆です。"},
   {"en":"Your question is difficult, so pass.","ok":false,"fb":"「難しいのでパス」は、プレゼンターとして信頼を失います。"}]},
  {"who":"p","en":"I see. And do you know exactly how much we'll save?","ja":"なるほど。正確にいくら節約できるかわかりますか?"},
  {"who":"me","ja":"今は正確な数字が手元にないので、後でメールします","opts":[
   {"en":"I don't know. Ask someone else.","ok":false,"fb":"突き放す答えで、相手を困らせてしまいます。"},
   {"en":"I don't have the exact number with me, but I'll email it to you.","ok":true,"fb":"知らないことは正直に言い、次の行動を約束するのがプロの答え方です。"},
   {"en":"We will save all the money.","ok":false,"fb":"「お金を全部節約します」と、ありえない約束をしています。"}]},
  {"who":"p","en":"That would be great. One more thing. What happens if the launch is delayed?","ja":"助かります。もう一つ。もし立ち上げが遅れたらどうなりますか?"},
  {"who":"me","ja":"確認ですが、予算への影響のことですか?","opts":[
   {"en":"You mean, what is delay?","ok":false,"fb":"「遅れとは何か?」という別の質問になってしまいます。"},
   {"en":"Please ask an easier question.","ok":false,"fb":"「もっと簡単な質問をして」は失礼です。"},
   {"en":"Just to clarify, do you mean the impact on the budget?","ok":true,"fb":"Just to clarify で質問の意味を確認できます。ずれた答えを防げます。"}]},
  {"who":"p","en":"Yes, exactly.","ja":"はい、その通りです。"},
  {"who":"me","ja":"予備の予算があるので大丈夫。答えになっているか確認したい","opts":[
   {"en":"We have a backup budget for that. Does that answer your question?","ok":true,"fb":"Does that answer your question? で、相手が納得したかをていねいに確認できます。"},
   {"en":"No problem, maybe. I hope.","ok":false,"fb":"maybe と I hope で、とても頼りなく聞こえます。"},
   {"en":"We have a backup budget. Do you understand?","ok":false,"fb":"Do you understand? は「わかりましたか?」と上から目線に聞こえます。"}]},
  {"who":"p","en":"Yes, it does. Thank you.","ja":"はい、よくわかりました。ありがとうございます。"}],
 "wrap":"質疑応答では、わからない質問は Just to clarify で確認、答えられないことは I'll follow up で後回しにしてOK。正直さが信頼につながります。"},

{"id":"t16","lv":4,"t":"採用面接(英語)","place":"Job interview","partner":"Ms. Rivera (interviewer)","pv":"f",
 "goal":"英語の面接で、経験・強み・志望動機を伝えて、最後に質問もしましょう。",
 "phrases":[
  {"en":"Thank you for having me.","ja":"本日はお時間をいただきありがとうございます。","tip":"面接や番組に呼ばれたときの定番のあいさつです。"},
  {"en":"I have five years of experience in marketing.","ja":"マーケティングの経験が5年あります。","tip":"<b>~ years of experience in 分野</b> の形をそのまま覚えましょう。"},
  {"en":"I'm good at using data to solve problems.","ja":"データを使って問題を解決するのが得意です。","tip":"be good at ~ing で「~するのが得意」。"},
  {"en":"I'm looking for a chance to grow.","ja":"成長できる機会を探しています。","tip":"志望動機で使える、前向きな表現です。"},
  {"en":"What does a typical day look like in this role?","ja":"この職種の典型的な1日はどんな感じですか?","tip":"逆質問の定番。仕事への関心が伝わります。"}],
 "lines":[
  {"who":"p","en":"Hi, thanks for coming in today. How are you?","ja":"こんにちは、本日はお越しいただきありがとうございます。お元気ですか?"},
  {"who":"me","ja":"元気です。お時間をいただきありがとうございます","opts":[
   {"en":"I'm nervous, so bad.","ok":false,"fb":"「緊張していて最悪です」と聞こえ、第一印象がよくありません。"},
   {"en":"I'm doing well. Thank you for having me.","ok":true,"fb":"I'm doing well. は大人の「元気です」。Thank you for having me. で好印象です。"},
   {"en":"Thank you for inviting yourself.","ok":false,"fb":"invite yourself は「押しかける」という意味。面接官に失礼です!"}]},
  {"who":"p","en":"Great. So, tell me a little about yourself.","ja":"では、簡単に自己紹介をお願いします。"},
  {"who":"me","ja":"マーケティングの経験が5年ある","opts":[
   {"en":"I am marketing for five years.","ok":false,"fb":"「私はマーケティングです」という文になっています。I have worked in marketing for five years. なら正しいです。"},
   {"en":"I have five years experience of marketing.","ok":false,"fb":"five years <b>of</b> experience <b>in</b> marketing が正しい形です。"},
   {"en":"I have five years of experience in marketing.","ok":true,"fb":"経験年数を言う基本の形です。面接で必ず使えます。"}]},
  {"who":"p","en":"Nice. What would you say is your biggest strength?","ja":"いいですね。あなたの一番の強みは何だと思いますか?"},
  {"who":"me","ja":"データを使って問題を解決するのが得意","opts":[
   {"en":"I'm good at using data to solve problems.","ok":true,"fb":"be good at ~ing で強みをはっきり言えます。具体例を続けるとさらに説得力が増します。"},
   {"en":"My strength is my strong body.","ok":false,"fb":"体の強さの話になってしまい、仕事の強みが伝わりません。"},
   {"en":"I can everything with data.","ok":false,"fb":"can のあとに動詞がありません。また「何でもできる」は言いすぎです。"}]},
  {"who":"p","en":"Interesting. And why do you want to work here?","ja":"興味深いですね。では、なぜ当社で働きたいのですか?"},
  {"who":"me","ja":"成長の機会を探していて、御社の製品が大好きだから","opts":[
   {"en":"Because the salary is high.","ok":false,"fb":"正直すぎます!志望動機としては印象がよくありません。"},
   {"en":"Because I want to work here.","ok":false,"fb":"質問をくり返しているだけで、理由になっていません。"},
   {"en":"I'm looking for a chance to grow, and I love your products.","ok":true,"fb":"成長意欲と会社への興味の両方が伝わる、前向きな答えです。"}]},
  {"who":"p","en":"Thank you. Do you have any questions for us?","ja":"ありがとうございます。何か質問はありますか?"},
  {"who":"me","ja":"この職種の典型的な1日について聞きたい","opts":[
   {"en":"No, nothing. Bye.","ok":false,"fb":"質問がないうえに Bye. で終わると、やる気がないように見えます。"},
   {"en":"What does a typical day look like in this role?","ok":true,"fb":"仕事への関心が伝わる逆質問です。What are the biggest challenges in this role? もおすすめです。"},
   {"en":"How many vacation days can I take?","ok":false,"fb":"英語は正しいですが、最初の質問が休暇の話だと仕事への意欲を疑われます。"}]},
  {"who":"p","en":"Great question. Most days start with a short team meeting at nine.","ja":"いい質問ですね。たいていの日は9時の短いチームミーティングから始まります。"}],
 "wrap":"面接は「経験(years of experience in)→強み(I'm good at)→志望動機(a chance to grow)→逆質問」の順で準備しておくと安心です。"}
];

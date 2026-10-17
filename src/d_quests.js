const QUESTS = [
{"id":"q01","lv":1,"theme":"daily","t":"カフェで注文","partner":"Barista","pv":"f",
 "intro":"朝のカフェ。初めてのお店で、飲み物を注文しましょう。",
 "goal":"自分の言葉で注文を完了する",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Hi! What can I get for you?","ja":"いらっしゃいませ。何にしますか?",
   "ch":[
    {"en":"I'd like a latte, please.","go":"size","keys":[["latte","coffee","cappuccino","tea","americano","mocha"]]},
    {"en":"What do you recommend?","go":"rec","keys":[["recommend*","suggest*","popular","best","favorite","special*"]]},
    {"en":"Can I see the menu?","go":"menu","keys":[["menu","options","what do you have"]]}
   ]},
  "rec":{"p":"Our honey oat latte is really popular. It's sweet, but not too sweet.","ja":"ハニーオーツラテがとても人気です。甘いですが、甘すぎませんよ。",
   "ch":[
    {"en":"Sounds great. I'll have that.","go":"size","keys":[["sounds","i will have","i will take","that one","i will try","sure","okay","ok"]]},
    {"en":"Do you have anything without milk?","go":"nomilk","keys":[["without milk","no milk","dairy","black","lactose"]]}
   ]},
  "nomilk":{"p":"Sure. Our cold brew is black, and it's really smooth. Would you like to try it?","ja":"ありますよ。コールドブリューはブラックで、とてもまろやかです。試してみますか?",
   "free":{"ja":"コールドブリューをお願いすると伝える","model":"Yes, I'll try the cold brew.","alts":["Sure, one cold brew, please.","Yes, that sounds good."],"keys":[["yes","sure","okay","ok","sounds good","please","i will"]],"hint":"Yes, I'll try ~."},
   "go":"size"},
  "menu":{"p":"Here you go. We have coffee, tea, and smoothies.","ja":"どうぞ。コーヒー、紅茶、スムージーがあります。",
   "ch":[
    {"en":"I'll have a mango smoothie.","go":"smoothie","keys":[["smoothie","mango"]]},
    {"en":"Just a hot tea, please.","go":"tea","keys":[["tea"]]},
    {"en":"Hurry up. I'm busy.","go":"rude","bad":true,"fb":"急かす言い方は失礼に聞こえます。急いでいるときは Sorry, I'm in a bit of a hurry. のように伝えましょう。","keys":[["hurry","busy","quick*","fast"]]}
   ]},
  "smoothie":{"p":"Good choice. Would you like any extra toppings?","ja":"いいですね。トッピングを追加しますか?",
   "free":{"ja":"トッピングはいらないと伝える","model":"No, thank you. Just the smoothie.","alts":["I'm good, thanks.","No, that's all."],"keys":[["no","nothing","just","that is all","that is it","i am good","i am fine"]],"hint":"No, thank you. Just ~."},
   "go":"size"},
  "tea":{"p":"We have green tea and black tea. Which one would you like?","ja":"緑茶と紅茶があります。どちらにしますか?",
   "free":{"ja":"緑茶か紅茶か、どちらかを選んで伝える","model":"Green tea, please.","alts":["I'll have the black tea.","Black tea, please."],"keys":[["green","black"]],"hint":"~ tea, please."},
   "go":"size"},
  "rude":{"p":"Oh... okay. I'll be quick. What would you like?","ja":"あ…はい。急ぎますね。何にしますか?",
   "free":{"ja":"急かしたことを謝って、ラテを注文する","model":"Sorry about that. A latte, please.","alts":["Sorry, I'm just in a hurry. Can I get a latte?"],"keys":[["sorry","apologize*","my bad","excuse me"],["latte","coffee","tea","smoothie","cappuccino"]],"hint":"Sorry about that. A ~, please."},
   "go":"size"},
  "size":{"p":"Sure. What size would you like? And is that for here or to go?","ja":"かしこまりました。サイズはどうしますか?店内でお飲みですか、お持ち帰りですか?",
   "free":{"ja":"サイズと、店内か持ち帰りかを伝える","model":"A medium, please. For here.","alts":["Medium, and I'll drink it here.","A small one to go, please."],"keys":[["medium","small","large","regular"],["here","stay","to go","take out","takeout","inside","in"]],"hint":"A medium ~ / For here"},
   "go":"pay"},
  "pay":{"p":"Great. That'll be four fifty. It'll be ready in a minute.","ja":"ありがとうございます。4ドル50セントです。すぐにご用意します。","end":true,
   "wrap":"Can I get ~? / I'd like ~. どちらも注文で使えます。For here / To go もセットで覚えましょう。"}
 }},

{"id":"q02","lv":1,"theme":"travel","t":"空港:乗り継ぎに遅れそう","partner":"Gate agent","pv":"m",
 "intro":"到着便が遅れ、乗り継ぎ便の出発まであとわずか。乗り継ぎカウンターで相談しましょう。",
 "goal":"乗り継ぎ便に間に合う方法を自分の言葉で確認する",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Hi there. How can I help you?","ja":"こんにちは。どうされましたか?",
   "ch":[
    {"en":"My connecting flight leaves in thirty minutes.","go":"conn","keys":[["connect*","connection","flight","transfer"]]},
    {"en":"I think I'm lost. Where is Gate twenty?","go":"gate","keys":[["gate","lost","where"]]},
    {"en":"You need to hold my plane.","go":"calm","bad":true,"fb":"命令口調に聞こえます。Is there any way I can still make it?(まだ間に合う方法はありますか?)と丁寧に聞きましょう。","keys":[["hold","wait for me","delay"]]}
   ]},
  "gate":{"p":"Gate twenty is in Terminal B. But let me check your flight first.","ja":"20番ゲートはターミナルBです。でも、先に便を確認しますね。","go":"conn"},
  "calm":{"p":"I'm sorry, I can't hold the plane. But let me see what I can do.","ja":"申し訳ありませんが、飛行機を待たせることはできません。でも、できることを確認してみます。","go":"conn"},
  "conn":{"p":"Okay. What's your flight number?","ja":"わかりました。便名を教えてください。",
   "free":{"ja":"便名が18便だと伝える","model":"It's flight eighteen.","alts":["Flight 18, to Boston.","My flight number is 18."],"keys":[["eighteen","one eight"]],"hint":"It's flight ~."},
   "go":"fast"},
  "fast":{"p":"Flight eighteen leaves from Terminal B. You can take the shuttle train, or I can call a cart for you.","ja":"18便はターミナルBから出発です。シャトルトレインに乗るか、カートを呼ぶこともできます。",
   "ch":[
    {"en":"I'll take the train. Where is it?","go":"train","keys":[["train","shuttle"]]},
    {"en":"Could you call a cart, please?","go":"cart","keys":[["cart","call"]]},
    {"en":"What if I miss it?","go":"miss","keys":[["miss*","what if","next one","too late"]]}
   ]},
  "train":{"p":"It's down the escalator on your left. It comes every three minutes.","ja":"エスカレーターを降りて左側です。3分ごとに来ます。",
   "free":{"ja":"お礼を言って、エスカレーターを降りて左だと確認する","model":"Thank you. Down the escalator and to the left, right?","alts":["Thanks! So it's on the left?"],"keys":[["thank*"],["left","escalator"]],"hint":"Thank you. Down the ~ and to the ~, right?"},
   "go":"endok"},
  "cart":{"p":"Sure. The driver will be here in two minutes. Please wait by this sign.","ja":"かしこまりました。2分で運転手が来ます。この看板のそばでお待ちください。",
   "free":{"ja":"お礼を言って、ここで待つと伝える","model":"Thank you so much. I'll wait here.","alts":["Thanks. I'll stay right here."],"keys":[["thank*"],["wait","stay","here"]],"hint":"Thank you. I'll wait ~."},
   "go":"endok"},
  "miss":{"p":"Don't worry. If you miss it, we'll put you on the next flight at no extra cost.","ja":"ご心配なく。乗り遅れても、追加料金なしで次の便にお乗せします。",
   "free":{"ja":"安心したと伝えて、次の便は何時か聞く","model":"That's a relief. What time is the next flight?","alts":["Okay, good. When is the next one?"],"keys":[["what time","when"],["next"]],"hint":"What time is the ~ flight?"},
   "go":"next"},
  "next":{"p":"It leaves at seven tonight. But I think you can still make this one if you hurry!","ja":"今夜7時発です。でも、急げばこの便にまだ間に合うと思いますよ!","go":"endok"},
  "endok":{"p":"Good luck, and have a safe flight!","ja":"お気をつけて。よい空の旅を!","end":true,
   "wrap":"My connecting flight leaves in ~. は乗り継ぎで困ったときの基本フレーズ。What if ~?(もし~したら?)も便利です。"}
 }},

{"id":"q03","lv":1,"theme":"travel","t":"ホテル:部屋のトラブル","partner":"Front desk","pv":"f",
 "intro":"ホテルの部屋でトラブル発生。フロントに電話して、困っていることを伝えましょう。",
 "goal":"トラブルを伝えて、解決まで自分の言葉でやりとりする",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Front desk. How can I help you?","ja":"フロントです。どうされましたか?",
   "ch":[
    {"en":"The air conditioner in my room isn't working.","go":"ac","keys":[["air conditioner","air conditioning","ac","aircon","too hot","heater"]]},
    {"en":"It's really noisy next door.","go":"noise","keys":[["noisy","noise","loud"]]},
    {"en":"I locked my key card in my room.","go":"key","keys":[["key","card","locked"]]}
   ]},
  "ac":{"p":"I'm sorry about that. Have you tried the remote on the desk?","ja":"申し訳ございません。机の上のリモコンはお試しになりましたか?",
   "ch":[
    {"en":"Yes, but nothing happens.","go":"acsend","keys":[["yes","nothing","tried","does not work"]]},
    {"en":"Oh, I didn't see it. Let me check.","go":"acoops","keys":[["did not see","let me","check","oh"]]}
   ]},
  "acsend":{"p":"Okay. I'll send someone up right away. What's your room number?","ja":"承知しました。すぐに係の者を向かわせます。お部屋番号は?",
   "free":{"ja":"部屋番号が512号室だと伝える","model":"It's room 512.","alts":["Room five twelve.","I'm in room five one two."],"keys":[["512","five twelve","five one two"]],"hint":"It's room ~."},
   "go":"endfix"},
  "acoops":{"p":"No problem. The power button is at the top of the remote.","ja":"大丈夫ですよ。電源ボタンはリモコンの上の方にあります。",
   "free":{"ja":"動いたと伝えて、お礼を言う","model":"It's working now. Thanks for your help.","alts":["Oh, it's on now. Thank you!"],"keys":[["work*","on","fine","okay","ok","good"],["thank*"]],"hint":"It's working now. Thanks ~."},
   "go":"endok"},
  "noise":{"p":"I'm so sorry. Would you like me to call them, or would you prefer a different room?","ja":"大変申し訳ございません。お隣にお電話しましょうか、それとも別のお部屋がよろしいですか?",
   "ch":[
    {"en":"Could you call them, please?","go":"call","keys":[["call","talk to","tell them","ask them"]]},
    {"en":"I'd like to change rooms.","go":"change","keys":[["change","different","another","move","new room"]]}
   ]},
  "call":{"p":"Of course. I'll call them now. Is there anything else?","ja":"かしこまりました。今お電話します。ほかに何かございますか?",
   "free":{"ja":"それだけだと伝えて、お礼を言う","model":"No, that's all. Thank you.","alts":["Nothing else. Thanks a lot."],"keys":[["no","that is all","that is it","nothing"],["thank*"]],"hint":"No, that's ~. Thank you."},
   "go":"endok"},
  "change":{"p":"Sure. We have a quiet room on the tenth floor. I'll bring you a new key.","ja":"かしこまりました。10階に静かなお部屋がございます。新しい鍵をお持ちします。",
   "free":{"ja":"それで大丈夫だと伝えて、お礼を言う","model":"That's perfect. Thank you so much.","alts":["Sounds good. Thanks."],"keys":[["perfect","great","good","fine","okay","ok","sounds","sure","yes"],["thank*"]],"hint":"That's ~. Thank you."},
   "go":"endok"},
  "key":{"p":"No problem. Could you come down to the front desk with your ID?","ja":"大丈夫ですよ。身分証明書をお持ちになって、フロントまでお越しいただけますか?",
   "free":{"ja":"(フロントで)パスポートを見せる","model":"Sure. Here's my passport.","alts":["Here you go. This is my ID."],"keys":[["here","passport","id"]],"hint":"Here's my ~."},
   "go":"keynew"},
  "keynew":{"p":"Thank you. Here's a new key card. Your old one won't work anymore.","ja":"ありがとうございます。新しいカードキーです。古いものはもう使えません。","go":"endok"},
  "endfix":{"p":"Thank you. Someone will be there in about five minutes.","ja":"ありがとうございます。5分ほどで係の者が伺います。","end":true,
   "wrap":"~ isn't working.(~が動きません)はトラブルを伝える定番フレーズです。"},
  "endok":{"p":"You're welcome. Enjoy your stay!","ja":"どういたしまして。ごゆっくりお過ごしください!","end":true,
   "wrap":"~ isn't working. / It's really noisy. / I locked my key in my room. ホテルの3大トラブル表現です。"}
 }},

{"id":"q04","lv":1,"theme":"travel","t":"道に迷った:駅までの行き方","partner":"Local","pv":"m",
 "intro":"知らない街で道に迷ってしまいました。親切そうな人が声をかけてくれます。",
 "goal":"駅までの行き方を聞いて、自分の言葉で確認する",
 "start":"n1",
 "nodes":{
  "n1":{"p":"You look a little lost. Can I help?","ja":"少し迷っているみたいですね。お手伝いしましょうか?",
   "ch":[
    {"en":"Yes, please. How do I get to the station?","go":"dir","keys":[["station","get to","how do i"]]},
    {"en":"Yes. Is there a bus stop near here?","go":"bus","keys":[["bus"]]},
    {"en":"No. Leave me alone.","go":"rude","bad":true,"fb":"親切な申し出への返事としては冷たすぎます。断るなら No, thanks. I'm okay. と柔らかく言いましょう。","keys":[["leave me","go away","alone"]]}
   ]},
  "rude":{"p":"Oh, sorry. I just thought you looked lost.","ja":"あ、すみません。迷っているように見えたので。",
   "free":{"ja":"失礼な言い方を謝って、駅への行き方を聞く","model":"Sorry, I didn't mean that. Actually, how do I get to the station?","alts":["I'm sorry. Could you tell me the way to the station?"],"keys":[["sorry","apologize*"],["station"]],"hint":"Sorry. How do I get to the ~?"},
   "go":"dir"},
  "dir":{"p":"Go straight down this street and turn right at the second traffic light.","ja":"この通りをまっすぐ進んで、2つ目の信号を右に曲がってください。",
   "ch":[
    {"en":"Is it far from here?","go":"far","keys":[["far","how long","walk"]]},
    {"en":"Sorry, could you say that again?","go":"again","keys":[["again","repeat","sorry","pardon","slowly"]]}
   ]},
  "far":{"p":"Not really. It's about a ten-minute walk.","ja":"そんなに遠くないですよ。歩いて10分くらいです。",
   "free":{"ja":"歩いて行くと伝えて、お礼を言う","model":"Great, I'll walk then. Thank you!","alts":["Thanks a lot!","Okay, thank you so much."],"keys":[["thank*"]],"hint":"Great, I'll ~. Thank you!"},
   "go":"end"},
  "again":{"p":"Sure. Go straight, then turn right at the second light.","ja":"いいですよ。まっすぐ行って、2つ目の信号を右です。",
   "free":{"ja":"「2つ目の信号を右」と言い直して確認する","model":"Second light, then right. Got it.","alts":["So I turn right at the second traffic light?"],"keys":[["second"],["right"]],"hint":"So I turn ~ at the ~ light?"},
   "go":"conf"},
  "conf":{"p":"That's right. You can't miss it. It's a big white building.","ja":"そのとおりです。すぐわかりますよ。大きな白い建物です。","go":"end"},
  "bus":{"p":"Yes, there's one just around the corner. Where are you going?","ja":"ええ、角を曲がったところにありますよ。どちらへ行くんですか?",
   "free":{"ja":"駅に行きたいと伝える","model":"I'm going to the train station.","alts":["I want to go to the station."],"keys":[["station"]],"hint":"I'm going to the ~."},
   "go":"busline"},
  "busline":{"p":"Then take the number five. It comes every ten minutes.","ja":"それなら5番のバスです。10分おきに来ますよ。",
   "free":{"ja":"運賃がいくらか聞く","model":"How much is the fare?","alts":["How much does it cost?"],"keys":[["how much","fare","cost","price"]],"hint":"How much is ~?"},
   "go":"fare"},
  "fare":{"p":"It's two dollars. You can pay with a card, too.","ja":"2ドルです。カードでも払えますよ。","go":"end"},
  "end":{"p":"Good luck, and have a nice day!","ja":"気をつけて。よい一日を!","end":true,
   "wrap":"How do I get to ~? / Is it far from here? / Could you say that again? 道をたずねる3点セットです。"}
 }},

{"id":"q05","lv":2,"theme":"daily","t":"友だちと週末の予定を決める","partner":"Friend","pv":"f",
 "intro":"友だちから電話。週末に会えるか聞かれています。予定を決めましょう。",
 "goal":"会う日時を自分の言葉で決める",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Hey! Are you free this weekend?","ja":"ねえ!今週末ひま?",
   "ch":[
    {"en":"Yeah, I'm free on Saturday. What's up?","go":"sat","keys":[["yes","yeah","sure","free"]]},
    {"en":"I'm busy on Saturday, but Sunday works.","go":"sun","keys":[["sunday"]]},
    {"en":"Not really. I just want to stay home.","go":"home","keys":[["stay home","not really","tired","relax*","rest"]]}
   ]},
  "sat":{"p":"Nice! There's a food festival downtown. Do you want to go?","ja":"いいね!街の中心でフードフェスがあるんだ。行かない?",
   "ch":[
    {"en":"Sounds fun! What time should we meet?","go":"time","keys":[["what time","when","meet"]]},
    {"en":"Hmm, I'm not into crowds. How about a movie instead?","go":"movie","keys":[["movie","film","instead","how about"]]}
   ]},
  "sun":{"p":"Sunday's fine. How about a hike in the morning?","ja":"日曜でいいよ。朝にハイキングはどう?",
   "free":{"ja":"いいねと言って、何時に会うか聞く","model":"Sounds great. What time should we meet?","alts":["I'd love to. When do you want to meet?"],"keys":[["what time","when"]],"hint":"Sounds great. What time ~?"},
   "go":"time"},
  "home":{"p":"Come on, it'll be fun! How about just a quick lunch?","ja":"えー、楽しいよ!軽くランチだけでもどう?",
   "ch":[
    {"en":"Okay, a quick lunch sounds nice.","go":"lunch","keys":[["okay","ok","sure","fine","sounds","alright","all right"]]},
    {"en":"Sorry, maybe next time.","go":"next","keys":[["next time","maybe","another time","sorry"]]}
   ]},
  "lunch":{"p":"Great! Let's meet at the station at noon.","ja":"やった!お昼に駅で会おう。",
   "free":{"ja":"了解して、楽しみにしていると伝える","model":"Perfect. I'm looking forward to it.","alts":["Okay! I can't wait.","See you at noon, then!"],"keys":[["look* forward","can not wait","excited","see you"]],"hint":"I'm looking ~ to it."},
   "go":"end"},
  "next":{"p":"No worries. Let me know if you change your mind.","ja":"大丈夫。気が変わったら教えてね。",
   "free":{"ja":"ありがとうと言って、来週末はどうか提案する","model":"Thanks. How about next weekend?","alts":["Thanks for asking. Maybe next Saturday?"],"keys":[["next week*","next saturday","next sunday","another day","some other time"]],"hint":"How about next ~?"},
   "go":"endnext"},
  "endnext":{"p":"Sure, next weekend works! I'll text you.","ja":"いいよ、来週末にしよう!またメッセージするね。","end":true,
   "wrap":"Maybe next time. / How about ~? 断るときも次の提案をすると感じよく聞こえます。"},
  "time":{"p":"How about ten at the station?","ja":"10時に駅はどう?",
   "free":{"ja":"10時は少し早いので、11時にできないか聞く","model":"Ten is a little early for me. Can we make it eleven?","alts":["How about eleven instead?","Could we meet at 11?"],"keys":[["eleven"],["can we","could we","how about","is it okay","is that okay","instead","make it","maybe","meet"]],"hint":"Can we make it ~?"},
   "go":"end"},
  "movie":{"p":"Good idea. There's a new comedy at seven. Want to get dinner first?","ja":"いいね。7時から新しいコメディがあるよ。先に夕ごはん食べる?",
   "free":{"ja":"いいねと言って、6時に会おうと提案する","model":"Sure! Let's meet at six, then.","alts":["Sounds good. How about six?"],"keys":[["six"],["meet","see you","how about","let us","lets"]],"hint":"Let's meet at ~, then."},
   "go":"end"},
  "end":{"p":"Great, it's a plan! See you then.","ja":"よし、決まりね!じゃあそのときに。","end":true,
   "wrap":"Can we make it ~?(~にできる?)は時間や日にちを調整するときの便利な表現です。"}
 }},

{"id":"q06","lv":2,"theme":"travel","t":"レストラン:アレルギーと注文ミス","partner":"Server","pv":"m",
 "intro":"旅先のレストラン。ナッツアレルギーがあることも伝えつつ、注文しましょう。料理が来たら確認も忘れずに。",
 "goal":"注文し、間違った料理が来たら自分の言葉で伝える",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Hi, are you ready to order?","ja":"いらっしゃいませ。ご注文はお決まりですか?",
   "ch":[
    {"en":"Yes. I'll have the chicken salad, please.","go":"salad","keys":[["salad","chicken"]]},
    {"en":"Before I order, I have a nut allergy.","go":"allergy","keys":[["allerg*","nut","nuts","peanut*"]]},
    {"en":"Not yet. Could I have a few more minutes?","go":"wait","keys":[["not yet","more time","minute*","few more"]]}
   ]},
  "salad":{"p":"Great choice. Anything to drink?","ja":"いいですね。お飲み物はいかがですか?",
   "free":{"ja":"水だけでいいと伝える","model":"Just water, please.","alts":["Water is fine, thanks."],"keys":[["water"]],"hint":"Just ~, please."},
   "go":"mistake"},
  "allergy":{"p":"Thanks for letting me know. The salad has walnuts, but the pasta is nut-free.","ja":"教えていただきありがとうございます。サラダにはクルミが入っていますが、パスタにはナッツは入っていません。",
   "ch":[
    {"en":"Then I'll have the pasta.","go":"pasta","keys":[["pasta"]]},
    {"en":"Can you make the salad without walnuts?","go":"nowal","keys":[["without","no walnut*","remove","take out","leave out"]]}
   ]},
  "pasta":{"p":"Perfect. I'll let the kitchen know about your allergy.","ja":"かしこまりました。キッチンにアレルギーのことを伝えておきます。","go":"mistake"},
  "nowal":{"p":"Sure, we can do that. Anything to drink?","ja":"はい、できますよ。お飲み物はいかがですか?",
   "free":{"ja":"アイスティーを頼む","model":"An iced tea, please.","alts":["I'll have an iced tea."],"keys":[["tea"]],"hint":"An iced ~, please."},
   "go":"mistake"},
  "wait":{"p":"Of course. Take your time.","ja":"もちろんです。ごゆっくりどうぞ。","go":"wait2"},
  "wait2":{"p":"Okay, what can I get for you?","ja":"(数分後)では、ご注文をどうぞ。",
   "free":{"ja":"チキンサラダを注文する","model":"I'll have the chicken salad, please.","alts":["Can I get the chicken salad?"],"keys":[["salad"]],"hint":"I'll have the ~, please."},
   "go":"mistake"},
  "mistake":{"p":"Here you go. One fish taco plate. Enjoy!","ja":"お待たせしました。フィッシュタコスのプレートです。どうぞ!",
   "free":{"ja":"注文したものと違うと丁寧に伝える","model":"Excuse me, I don't think this is what I ordered.","alts":["Sorry, I ordered something else.","I think there's a mistake. This isn't my order."],"keys":[["order*","mine","my"],["not","else","mistake","wrong","different"]],"hint":"Excuse me, I don't think this is ~."},
   "go":"sorry"},
  "sorry":{"p":"Oh, I'm so sorry! That's for another table. I'll bring yours right away.","ja":"大変失礼しました!別のテーブルのものでした。すぐにお持ちします。","end":true,
   "wrap":"I have a ~ allergy. / I don't think this is what I ordered. 安全と快適な食事のために覚えておきたい表現です。"}
 }},

{"id":"q07","lv":2,"theme":"daily","t":"病院の受付で症状を伝える","partner":"Receptionist","pv":"f",
 "intro":"旅先で体調をくずしてクリニックへ。受付で状況と症状を伝えましょう。",
 "goal":"症状を自分の言葉で伝えて受付を済ませる",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Good morning. Do you have an appointment?","ja":"おはようございます。ご予約はありますか?",
   "ch":[
    {"en":"No, I don't. Can I still see a doctor today?","go":"walkin","keys":[["no","do not","see a doctor","today"]]},
    {"en":"Yes, at ten thirty.","go":"appt","keys":[["yes","appointment","ten thirty","booked"]]},
    {"en":"I feel terrible. Just get me a doctor now!","go":"urgent","bad":true,"fb":"つらい気持ちはわかりますが、命令口調です。I'm not feeling well. Could I see a doctor soon? と言いましょう。","keys":[["now","get me","hurry"]]}
   ]},
  "walkin":{"p":"We can fit you in, but you may have to wait a little.","ja":"診察はできますが、少しお待ちいただくかもしれません。","go":"sym"},
  "appt":{"p":"Thank you. I see your name here. Is this your first visit with us?","ja":"ありがとうございます。お名前を確認しました。当院は初めてですか?",
   "free":{"ja":"初めてだと伝える","model":"Yes, it's my first time.","alts":["Yes, this is my first visit."],"keys":[["yes","first"]],"hint":"Yes, it's my ~ time."},
   "go":"form"},
  "form":{"p":"Then please fill out this form first.","ja":"では、まずこの用紙にご記入ください。","go":"sym"},
  "urgent":{"p":"I understand you're not feeling well. I'll get you in as soon as I can.","ja":"お具合が悪いのですね。できるだけ早くご案内します。","go":"sym"},
  "sym":{"p":"So, what brings you in today?","ja":"今日はどうされましたか?",
   "ch":[
    {"en":"I have a bad headache and a fever.","go":"fever","keys":[["fever","headache","temperature"]]},
    {"en":"I hurt my ankle while running.","go":"ankle","keys":[["ankle","hurt","foot","leg","twist*"]]}
   ]},
  "fever":{"p":"I see. When did it start?","ja":"そうですか。いつからですか?",
   "free":{"ja":"昨日の夜からだと伝える","model":"It started last night.","alts":["Since yesterday evening."],"keys":[["last night","yesterday","since"]],"hint":"It started ~."},
   "go":"endw"},
  "ankle":{"p":"Oh no. Can you walk on it?","ja":"それは大変。歩けますか?",
   "free":{"ja":"少しは歩けるけれど、とても痛いと伝える","model":"A little, but it really hurts.","alts":["Yes, but it's very painful."],"keys":[["little","a bit","kind of","sort of","yes","yeah","barely"],["hurt*","pain*","sore"]],"hint":"A little, but it ~."},
   "go":"endw"},
  "endw":{"p":"Okay. Please have a seat, and the nurse will call your name soon.","ja":"わかりました。おかけになってお待ちください。看護師がまもなくお名前をお呼びします。","end":true,
   "wrap":"I have a headache. / I hurt my ankle. / It started last night. 症状・場所・いつから、の3つを伝えましょう。"}
 }},

{"id":"q08","lv":2,"theme":"daily","t":"買い物:プレゼント選びと返品条件","partner":"Clerk","pv":"f",
 "intro":"雑貨店で店員さんに声をかけられました。プレゼント探し、ひやかし、返品のどれかで話を進めましょう。",
 "goal":"買い物の目的を果たし、条件を自分の言葉で確認する",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Hi there! Are you looking for anything in particular?","ja":"いらっしゃいませ!何かお探しですか?",
   "ch":[
    {"en":"I'm looking for a gift for my mom.","go":"gift","keys":[["gift","present","mom","mother"]]},
    {"en":"I'm just looking, thanks.","go":"look","keys":[["just looking","just browsing","looking around","browsing"]]},
    {"en":"I'd like to return this sweater.","go":"ret","keys":[["return","refund","exchange"]]}
   ]},
  "gift":{"p":"How nice! What does she like?","ja":"すてきですね!お母さまは何がお好きですか?",
   "ch":[
    {"en":"She loves gardening.","go":"garden","keys":[["garden*","plant*","flower*"]]},
    {"en":"I'm not sure. What's popular right now?","go":"pop","keys":[["popular","not sure","recommend*","suggest*","best seller*","no idea"]]}
   ]},
  "garden":{"p":"Then how about this set of garden gloves and seeds? It's thirty dollars.","ja":"それなら、ガーデニング手袋と種のセットはいかがですか?30ドルです。",
   "free":{"ja":"気に入ったと言い、気に入らなかったら返品できるか聞く","model":"I love it. Can I return it if she doesn't like it?","alts":["Nice. Can I exchange it later if needed?"],"keys":[["return*","exchange*","refund*"]],"hint":"Can I return it if ~?"},
   "go":"policy"},
  "pop":{"p":"These scented candles are really popular. They come in lavender, vanilla, and citrus.","ja":"この香りつきキャンドルがとても人気です。ラベンダー、バニラ、シトラスがあります。",
   "free":{"ja":"ラベンダーの香りを選ぶ","model":"I'll take the lavender one.","alts":["The vanilla one, please."],"keys":[["lavender","vanilla","citrus"]],"hint":"I'll take the ~ one."},
   "go":"wrap"},
  "wrap":{"p":"Good choice. Would you like it gift-wrapped?","ja":"いいですね。プレゼント用に包みましょうか?",
   "free":{"ja":"包装をお願いして、返品できるか聞く","model":"Yes, please. And can I return it if she doesn't like it?","alts":["Yes, thanks. Is it possible to exchange it later?"],"keys":[["return*","exchange*","refund*"]],"hint":"And can I return it if ~?"},
   "go":"policy"},
  "policy":{"p":"Yes, you can return it within thirty days. Just keep the receipt.","ja":"はい、30日以内なら返品できます。レシートは保管しておいてくださいね。","go":"endg"},
  "endg":{"p":"Here you go. I hope your mom loves it!","ja":"どうぞ。お母さまに気に入っていただけるといいですね!","end":true,
   "wrap":"Can I return it if ~? / within thirty days(30日以内に)。返品条件は買う前に確認しましょう。"},
  "look":{"p":"Sure, take your time. Let me know if you need anything.","ja":"どうぞごゆっくり。何かあれば声をかけてください。","go":"look2"},
  "look2":{"p":"Did you find anything you like?","ja":"(数分後)気に入ったものはありましたか?",
   "free":{"ja":"このマフラーの別の色(青)があるか聞く","model":"Yes. Do you have this scarf in blue?","alts":["Is there a blue one?","Does this come in other colors?"],"keys":[["do you have","is there","come in","any other"],["color*","blue","red","black","gray","green","white"]],"hint":"Do you have this in ~?"},
   "go":"color"},
  "color":{"p":"Let me check... Yes, here's a blue one.","ja":"確認しますね…はい、青がありました。",
   "free":{"ja":"それを買うと伝える","model":"Great, I'll take it.","alts":["Perfect. I'll buy it."],"keys":[["i will take","i will buy","i will get","take it","buy it","get it","i will have"]],"hint":"Great, I'll ~ it."},
   "go":"endb"},
  "endb":{"p":"Great. I can ring you up over here.","ja":"ありがとうございます。こちらのレジでお会計します。","end":true,
   "wrap":"I'm just looking. / Do you have this in ~? / I'll take it. 買い物の基本の流れです。"},
  "ret":{"p":"Sure. Do you have the receipt?","ja":"かしこまりました。レシートはお持ちですか?",
   "ch":[
    {"en":"Yes, here it is.","go":"retok","keys":[["yes","here"]]},
    {"en":"No, I lost it.","go":"nor","keys":[["no","lost","do not","can not find"]]}
   ]},
  "retok":{"p":"Thank you. Was there a problem with it?","ja":"ありがとうございます。何か問題がありましたか?",
   "free":{"ja":"自分には小さすぎたと伝える","model":"It's too small for me.","alts":["It doesn't fit. It's a bit tight."],"keys":[["small","tight","big","large","size","fit"]],"hint":"It's too ~ for me."},
   "go":"refund"},
  "refund":{"p":"No problem. I'll give you a full refund.","ja":"承知しました。全額返金いたします。","end":true,
   "wrap":"I'd like to return this. / It's too small. / a full refund(全額返金)。返品の基本フレーズです。"},
  "nor":{"p":"Without a receipt, we can only offer store credit.","ja":"レシートがない場合は、店舗クレジットでのご対応になります。",
   "free":{"ja":"それで大丈夫だと伝える","model":"That's fine. Store credit is okay.","alts":["No problem. That works for me."],"keys":[["fine","okay","ok","sure","all right","alright","no problem","good","works"]],"hint":"That's ~."},
   "go":"credit"},
  "credit":{"p":"Okay. Here's a gift card for the full amount.","ja":"かしこまりました。全額分のギフトカードです。","end":true,
   "wrap":"store credit(店舗で使えるクレジット)、receipt(レシート)。返品の場面でよく出る言葉です。"}
 }},

{"id":"q09","lv":3,"theme":"business","t":"職場:締め切りの延長をお願いする","partner":"Manager","pv":"m",
 "intro":"レポートの締め切りが近いのに、作業が遅れています。上司に声をかけられました。",
 "goal":"理由を説明し、締め切りの延長を自分の言葉で丁寧にお願いする",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Hi, do you have a minute? How's the report coming along?","ja":"ちょっといいかな?レポートの進み具合はどう?",
   "ch":[
    {"en":"Actually, I wanted to talk to you about that. I'm running a bit behind.","go":"behind","keys":[["behind","talk to you","running late","delay*"]]},
    {"en":"It's going well. I should have it done by Friday.","go":"add","keys":[["going well","on track","by friday","good"]]},
    {"en":"It's not my fault. The data team is always late.","go":"blame","bad":true,"fb":"人のせいにすると印象が悪くなります。事実を伝えつつ、自分がどう対応するかを話しましょう。","keys":[["fault","blame","not my","always late"]]}
   ]},
  "blame":{"p":"Hmm, I'd rather focus on solutions. What do you need to get it done?","ja":"うーん、それより解決策を考えよう。仕上げるには何が必要?",
   "free":{"ja":"言い方を謝り、データが遅れたので数日ほしいと説明する","model":"You're right, sorry. I'd need a few more days because the data came in late.","alts":["Sorry about that. Since the data was delayed, could I have a little more time?"],"keys":[["more days","more time","few days","extension","extra time","a little longer"],["because","since","data","delay*"]],"hint":"I'd need a few more days because ~."},
   "go":"when"},
  "when":{"p":"Okay. Can you give me a specific date?","ja":"わかった。具体的な日付を言えるかな?",
   "free":{"ja":"来週の水曜日までに仕上げると伝える","model":"I can have it ready by next Wednesday.","alts":["Would next Wednesday work for you?"],"keys":[["monday","tuesday","wednesday","thursday","friday"]],"hint":"I can have it ready by ~."},
   "go":"okend"},
  "behind":{"p":"I see. What's the issue?","ja":"そうか。何が問題なの?",
   "free":{"ja":"売上データが予定より遅れて届き、分析に時間がかかっていると説明する","model":"The sales data arrived later than expected, so the analysis is taking longer.","alts":["We got the data late, so I need more time for the analysis."],"keys":[["data"],["late*","delay*","took longer","taking longer","more time"]],"hint":"The data arrived later than ~, so ~."},
   "go":"ask"},
  "ask":{"p":"That makes sense. So what are you proposing?","ja":"なるほど。それで、どうしたいと考えている?",
   "ch":[
    {"en":"Would it be possible to extend the deadline to next Wednesday?","go":"wed","keys":[["extend*","extension","next wednesday","push back","postpone"]]},
    {"en":"Could I submit a draft on Friday and the final version next week?","go":"draft","keys":[["draft","first version","final version","in two parts"]]}
   ]},
  "wed":{"p":"Wednesday's a little tight because of the client meeting, but I can make it work. Could you send me what you have so far?","ja":"顧客との打ち合わせがあるから水曜は少しきついけど、なんとかしよう。今あるところまで送ってくれる?",
   "free":{"ja":"もちろんと言い、今日中に途中経過を送ると伝える","model":"Of course. I'll send you what I have by the end of today.","alts":["Sure, I'll email it to you this afternoon."],"keys":[["send","share","email"],["today","tonight","this afternoon","end of the day","soon","right away"]],"hint":"I'll send you what I have by ~."},
   "go":"okend"},
  "draft":{"p":"That works for me. Just make sure the draft covers the main numbers.","ja":"それでいいよ。ただ、ドラフトには主要な数字を入れておいてね。","go":"okend"},
  "add":{"p":"Great. Actually, could you also add a section on customer feedback?","ja":"いいね。実は、顧客の声のセクションも追加してもらえるかな?",
   "free":{"ja":"引き受けつつ、それなら月曜まで延ばせないか丁寧に聞く","model":"Sure. In that case, would it be possible to have until Monday?","alts":["Of course. Could I have until Monday, then?"],"keys":[["monday"],["possible","could i","could we","can i","would it","would you mind","is it okay","is that okay","until","extend*"]],"hint":"In that case, would it be possible to ~?"},
   "go":"addok"},
  "addok":{"p":"Monday works. Thanks for being flexible.","ja":"月曜でいいよ。柔軟に対応してくれてありがとう。","end":true,
   "wrap":"In that case, would it be possible to ~? 条件が変わったときに、丁寧に調整をお願いする表現です。"},
  "okend":{"p":"Thanks for letting me know early. I appreciate it.","ja":"早めに知らせてくれてありがとう。助かるよ。","end":true,
   "wrap":"Would it be possible to ~? / I'm running a bit behind. 理由+具体的な代案で、お願いは通りやすくなります。"}
 }},

{"id":"q10","lv":3,"theme":"music","t":"楽器店でギターを試奏・購入相談","partner":"Shop staff","pv":"m",
 "intro":"楽器店のエレキギター売り場。店員さんに相談しながら、試奏や購入の話を進めましょう。",
 "goal":"希望を伝え、試奏や購入について自分の言葉で相談する",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Hey, welcome in! Can I help you find something?","ja":"いらっしゃいませ!何かお探しですか?",
   "ch":[
    {"en":"I'm looking for my first electric guitar.","go":"first","keys":[["first","beginner","start*"]]},
    {"en":"Could I try out that guitar on the wall?","go":"try","keys":[["try","play","test"]]},
    {"en":"I'm thinking of upgrading from my old guitar.","go":"up","keys":[["upgrad*","old","better","replace"]]}
   ]},
  "first":{"p":"Awesome! What kind of music do you want to play?","ja":"いいですね!どんな音楽を弾きたいですか?",
   "free":{"ja":"主にロックと、少しブルースを弾きたいと伝える","model":"Mostly rock, and some blues.","alts":["I'd like to play pop and a little jazz."],"keys":[["rock","blues","jazz","metal","pop","funk","punk","country"]],"hint":"Mostly ~, and some ~."},
   "go":"rec"},
  "rec":{"p":"Then I'd recommend this one. It's light, easy to play, and it comes with a small amp.","ja":"それならこれがおすすめです。軽くて弾きやすく、小さなアンプも付いています。",
   "ch":[
    {"en":"Could I try it before I decide?","go":"tryit","keys":[["try","play","test"]]},
    {"en":"Is there any chance you could include a cable and a strap?","go":"incl","keys":[["include*","cable","strap","throw in"]]}
   ]},
  "incl":{"p":"I can include a cable, and the strap would be half price. How does that sound?","ja":"ケーブルはお付けできますし、ストラップは半額にします。いかがですか?",
   "free":{"ja":"それで十分だと言い、購入を決める","model":"That sounds fair. I'll take it.","alts":["Deal. I'll buy it."],"keys":[["i will take","i will buy","i will get","deal","take it","sounds fair","sounds good","sounds great"]],"hint":"That sounds fair. I'll ~."},
   "go":"endbuy"},
  "try":{"p":"Sure. That's a solid guitar with a warm sound. Let me get it down for you.","ja":"どうぞ。しっかりした作りで、温かい音のギターですよ。お取りしますね。","go":"tryit"},
  "tryit":{"p":"Here you go. It's plugged in. How does it feel?","ja":"どうぞ。アンプにつないであります。弾き心地はどうですか?",
   "free":{"ja":"ネックが握りやすく、音も気に入ったと伝える","model":"The neck feels really comfortable, and I love the tone.","alts":["It's easy to play, and I like the sound a lot."],"keys":[["neck","feel*","comfortable","easy to play","plays"],["tone","sound*","love","like"]],"hint":"The neck feels ~, and I love the ~."},
   "go":"endtry"},
  "endtry":{"p":"Glad you like it! Take your time, and let me know if you want to try a few others, too.","ja":"気に入ってもらえてよかったです!ごゆっくりどうぞ。ほかのも試したければ声をかけてください。","end":true,
   "wrap":"Could I try it before I decide? / How does it feel? 試奏で使う定番のやりとりです。"},
  "endbuy":{"p":"Deal. I'll get everything ready at the counter.","ja":"では決まりですね。レジで全部ご用意します。","end":true,
   "wrap":"Is there any chance you could ~? は、ていねいに少しおまけをお願いするときの表現です。"},
  "up":{"p":"Nice. What are you playing now, and what don't you like about it?","ja":"いいですね。今は何を弾いていて、どこが不満ですか?",
   "free":{"ja":"今のギターはチューニングがすぐずれるので、安定したものが欲しいと伝える","model":"My current guitar goes out of tune easily, so I'd like something more stable.","alts":["The tuning keeps slipping, so I want something more reliable."],"keys":[["tune","tuning"],["stable","stay* in tune","better","reliable","holds","solid"]],"hint":"My guitar goes out of tune easily, so I'd like ~."},
   "go":"upr"},
  "upr":{"p":"Then you might like this one. It has locking tuners, so it stays in tune really well.","ja":"それならこちらはいかがでしょう。ロック式のペグなので、チューニングがとても安定しますよ。",
   "ch":[
    {"en":"That sounds promising. Could I try it?","go":"tryit","keys":[["try","play","test"]]},
    {"en":"It's a bit over my budget. Do you have anything cheaper?","go":"cheap","keys":[["budget","cheap*","expensive","less","lower","affordable"]]}
   ]},
  "cheap":{"p":"This model has similar tuners, and it's about a hundred dollars less.","ja":"こちらは同じようなペグで、100ドルほど安いですよ。",
   "free":{"ja":"試してもいいか丁寧に聞く","model":"Would you mind if I tried it?","alts":["Could I play it for a minute?"],"keys":[["try","tried","play","test"]],"hint":"Would you mind if I ~?"},
   "go":"endcheap"},
  "endcheap":{"p":"Not at all. Here's the amp. Take your time.","ja":"もちろんです。アンプはこちらです。ごゆっくりどうぞ。","end":true,
   "wrap":"It's a bit over my budget. / Would you mind if I tried it? 予算の相談と丁寧な依頼の表現です。"}
 }},

{"id":"q11","lv":3,"theme":"fx","t":"トレード仲間とリスク管理について話す","partner":"Trading friend","pv":"m",
 "intro":"トレード仲間とカフェで雑談。リスク管理について、経験や考え方を交換しましょう(投資助言ではありません)。",
 "goal":"自分の経験や考え方を自分の言葉で話す",
 "start":"n1",
 "nodes":{
  "n1":{"p":"So, how's your trading been lately?","ja":"で、最近トレードの調子はどう?",
   "ch":[
    {"en":"Honestly, I had a rough week. I didn't stick to my stop loss.","go":"rough","keys":[["rough","bad week","stop loss","mistake"]]},
    {"en":"Pretty steady. I've been focusing on risk management.","go":"steady","keys":[["steady","risk","focus*","consistent"]]},
    {"en":"Amazing! I'm sure I'll double my money this month.","go":"worry","bad":true,"fb":"「必ず増える」ような言い方は危うく、聞き手も心配します。結果の予想より、ルールや過程について話しましょう。","keys":[["double","i am sure","amazing","guarantee*"]]}
   ]},
  "worry":{"p":"Whoa, careful. Nobody can know that for sure. What's your plan if the market moves against you?","ja":"おいおい、気をつけて。そんなの誰にもわからないよ。相場が逆に動いたらどうするつもり?",
   "free":{"ja":"その通りだと認め、エントリー前に損切りを決めていると話す","model":"Fair point. I always set a stop loss before I enter.","alts":["You're right. I decide where to exit before I get in."],"keys":[["fair","right","true","good point","point"],["stop*","exit","cut* loss*","limit"]],"hint":"Fair point. I always set ~ before I enter."},
   "go":"share"},
  "rough":{"p":"Ah, that happens to everyone. What made you move it?","ja":"ああ、誰にでもあるよ。どうして動かしちゃったの?",
   "free":{"ja":"負けを取り返したくて、損切りを動かしてしまったと話す","model":"I wanted to win back my losses, so I moved it.","alts":["I was hoping the price would come back.","I just panicked, to be honest."],"keys":[["win back","make back","recover","get back","emotion*","hope*","hoping","panic*","fear"]],"hint":"I wanted to win back ~, so I ~."},
   "go":"tip"},
  "tip":{"p":"I've been there. What helps me is keeping a trading journal. Have you tried that?","ja":"自分も経験あるよ。僕の場合はトレード日記をつけるのが役に立ってる。やってみたことある?",
   "ch":[
    {"en":"Not really. What do you write in it?","go":"journal","keys":[["what do you","write","what kind","how do you"]]},
    {"en":"I have, but I always forget to update it.","go":"forget","keys":[["forget","forgot","update","lazy"]]}
   ]},
  "journal":{"p":"Just the entry, the exit, and how I felt. It helps me see my habits.","ja":"エントリーと決済、それとそのときの気持ちだけ。自分のクセが見えてくるんだ。",
   "free":{"ja":"役に立ちそうだと言い、今週から試してみると伝える","model":"That sounds useful. I'll try it this week.","alts":["Good idea. I'll start one tomorrow."],"keys":[["try","start*","give it a shot","do that","begin"]],"hint":"That sounds useful. I'll ~ this week."},
   "go":"end"},
  "forget":{"p":"Same here at first. Now I set a reminder right after the market closes.","ja":"最初は僕もそうだった。今は相場が閉まった直後にリマインダーをセットしてるよ。",
   "free":{"ja":"いいアイデアだと言って、自分もやってみると伝える","model":"That's a good idea. I'll do the same.","alts":["Smart. I'll try that too."],"keys":[["good idea","great idea","smart","nice idea","makes sense","clever"],["try","do the same","me too","i will","start*"]],"hint":"That's a good idea. I'll do ~."},
   "go":"end"},
  "end":{"p":"Sounds good. Let's compare notes next month.","ja":"いいね。来月またお互いの記録を見せ合おう。","end":true,
   "wrap":"I didn't stick to ~.(~を守れなかった)/ What helps me is ~. 経験を共有するときに使える表現です。"},
  "steady":{"p":"Nice. How do you usually decide how much to risk on each trade?","ja":"いいね。1回のトレードでどれくらいリスクを取るか、普段どうやって決めてる?",
   "free":{"ja":"自分の場合は口座の1%程度に抑えるようにしていると話す","model":"Personally, I try to keep it to around one percent of my account.","alts":["I keep it small, about 1% of my balance."],"keys":[["percent","small","little"]],"hint":"Personally, I try to keep it to ~."},
   "go":"share"},
  "share":{"p":"That's similar to what I do. Do you ever take a break after a few losses in a row?","ja":"僕のやり方と似てるね。何回か続けて負けたら、休むことってある?",
   "ch":[
    {"en":"Yes, I stop for the day after two losses.","go":"rule","keys":[["yes","stop for","take a break","step away","for the day"]]},
    {"en":"No, but maybe I should.","go":"should","keys":[["maybe","should","no","never"]]}
   ]},
  "rule":{"p":"That's smart. It's easy to make emotional decisions when you're frustrated.","ja":"賢いね。イライラしているときは、感情的な判断をしやすいから。","end":true,
   "wrap":"I try to keep it to ~. / I stop for the day after ~. 自分のルールを説明する表現です。"},
  "should":{"p":"It really helped me. Everyone's different, though, so find what works for you.","ja":"僕にはすごく効いたよ。でも人それぞれだから、自分に合うやり方を見つけてね。","end":true,
   "wrap":"Maybe I should. / find what works for you(自分に合うものを見つける)。押しつけずに意見を伝える言い方です。"}
 }},

{"id":"q12","lv":3,"theme":"tech","t":"同僚とAIツールの導入について話す","partner":"Coworker","pv":"f",
 "intro":"休憩中、同僚がAIの文章作成ツール導入の話を持ちかけてきました。意見を交換しましょう。",
 "goal":"賛成・懸念などの意見を、理由とともに自分の言葉で伝える",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Have you heard that management wants us to try an AI writing assistant?","ja":"経営陣がAIの文章作成アシスタントを試してほしいって話、聞いた?",
   "ch":[
    {"en":"Yes, and I think it could save us a lot of time.","go":"pos","keys":[["save*","efficien*","faster","helpful","useful"]]},
    {"en":"I have, but I'm a little worried about data privacy.","go":"priv","keys":[["privacy","worried","concern*","security","confidential"]]},
    {"en":"No, what's it for?","go":"what","keys":[["whats it","what is it","what for","no","never heard"]]}
   ]},
  "what":{"p":"It drafts emails and summarizes long documents. Some teams are already using it.","ja":"メールの下書きを作ったり、長い資料を要約したりするの。もう使っているチームもあるよ。",
   "free":{"ja":"便利そうだと言いつつ、正確さについて質問する","model":"That sounds handy. But how accurate is it?","alts":["Interesting. Can we really trust what it writes?"],"keys":[["accura*","mistake*","reliable","trust","correct","errors"]],"hint":"That sounds handy. But how ~ is it?"},
   "go":"acc"},
  "acc":{"p":"It's not perfect. You still need to check everything, but it gives you a good first draft.","ja":"完ぺきではないよ。全部確認は必要だけど、たたき台としてはいいものを出してくれる。","go":"conc"},
  "pos":{"p":"Same here. Which tasks would you use it for first?","ja":"私もそう思う。最初はどんな作業に使いたい?",
   "free":{"ja":"まずは会議メモの要約に使いたいと伝える","model":"I'd probably start with summarizing meeting notes.","alts":["Maybe for drafting routine emails."],"keys":[["summar*","meeting*","notes","email*","report*","draft*"]],"hint":"I'd probably start with ~."},
   "go":"conc"},
  "conc":{"p":"So, are you in favor of trying it out?","ja":"じゃあ、試してみることには賛成?",
   "ch":[
    {"en":"I think so, as long as we start with a small pilot.","go":"pilot","keys":[["pilot","small","trial","test","start with"]]},
    {"en":"Honestly, I'd rather wait and see how other teams do.","go":"waitsee","keys":[["wait","other teams","see how","rather not"]]}
   ]},
  "pilot":{"p":"Good idea. I'll bring that up at the meeting tomorrow.","ja":"いい考えだね。明日の会議で提案してみる。","end":true,
   "wrap":"as long as ~(~という条件なら)は、条件つきで賛成するときの便利な表現です。"},
  "waitsee":{"p":"That's reasonable. Let's ask them for feedback first.","ja":"それも妥当だね。まずは他のチームに感想を聞いてみよう。","end":true,
   "wrap":"I'd rather ~.(どちらかといえば~したい)で、角を立てずに慎重な意見を言えます。"},
  "priv":{"p":"That's a fair point. What exactly worries you?","ja":"それはもっともだね。具体的に何が心配?",
   "free":{"ja":"誰かが顧客情報を入力してしまうのが心配だと伝える","model":"I'm worried someone might paste client information into it.","alts":["I'm concerned about sensitive customer data."],"keys":[["client*","customer*","personal","sensitive","confidential"]],"hint":"I'm worried someone might ~."},
   "go":"rules"},
  "rules":{"p":"Good point. Maybe we should suggest some clear rules before we start.","ja":"たしかに。始める前に、はっきりしたルールを提案した方がいいかもね。",
   "ch":[
    {"en":"Agreed. Should we draft a short guideline together?","go":"guide","keys":[["guideline*","together","draft","write up"]]},
    {"en":"I'm not sure management will listen, though.","go":"listen","keys":[["not sure","listen","doubt","management"]]}
   ]},
  "listen":{"p":"I think they will if we bring a concrete proposal.","ja":"具体的な案を持っていけば、聞いてくれると思うよ。",
   "free":{"ja":"それなら一緒に案を作ろうと提案する","model":"Then let's work on a proposal together.","alts":["Okay, why don't we write a plan together?"],"keys":[["proposal","plan","together","draft","work on"]],"hint":"Then let's work on ~ together."},
   "go":"guide"},
  "guide":{"p":"Sure. Let's put together a one-page draft this week.","ja":"いいね。今週中に1ページのたたき台をまとめよう。","end":true,
   "wrap":"I'm a little worried about ~. / Should we ~ together? 懸念を伝えて、前向きな提案につなげる流れです。"}
 }},

{"id":"q13","lv":4,"theme":"business","t":"取引先との値引き交渉","partner":"Supplier","pv":"m",
 "intro":"取引先の営業担当と、見積もりについての打ち合わせ。関係を保ちながら条件を交渉しましょう。",
 "goal":"根拠を示しつつ、条件を自分の言葉で交渉してまとめる",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Thanks for taking the time to meet. Have you had a chance to review our quote?","ja":"お時間をいただきありがとうございます。お見積もりはご覧いただけましたか?",
   "ch":[
    {"en":"Yes, and overall we're impressed, but the price is higher than we expected.","go":"high","keys":[["higher","expensive","price","cost"]]},
    {"en":"We have. Before anything else, could we go over the delivery schedule?","go":"deliv","keys":[["deliver*","lead time","shipping","schedule"]]},
    {"en":"This is ridiculous. Cut it in half or we walk away.","go":"tense","bad":true,"fb":"強すぎる要求は関係を壊します。予算などの根拠を示しながら、具体的な条件を丁寧に提案しましょう。","keys":[["ridiculous","half","walk away","cut it"]]}
   ]},
  "tense":{"p":"Well... that's not something we can do. Realistically, what did you have in mind?","ja":"それは…お受けできません。現実的には、どのくらいをお考えですか?",
   "free":{"ja":"言いすぎたことを謝り、現実的には10%程度の値引きが必要だと伝える","model":"I apologize, that came out wrong. Realistically, we'd need about a ten percent discount.","alts":["Sorry, that was too strong. Could you lower it by around 10%?"],"keys":[["apologi*","sorry","came out wrong","too strong"],["percent","discount","lower","reduc*"]],"hint":"I apologize, that came out wrong. Realistically, we'd need ~."},
   "go":"counter"},
  "high":{"p":"I understand. Where would you need the price to be?","ja":"なるほど。価格はどのくらいであればよろしいですか?",
   "free":{"ja":"予算を理由に、10%の値引きが可能か聞く","model":"Given our budget, would a ten percent discount be possible?","alts":["Is there any way you could lower it by 10%?"],"keys":[["percent","discount","lower","reduc*"]],"hint":"Given our budget, would ~ be possible?"},
   "go":"counter"},
  "deliv":{"p":"Sure. Standard delivery takes three weeks, but we can do two for a small fee.","ja":"もちろんです。通常の納期は3週間ですが、少額の手数料で2週間にできます。",
   "free":{"ja":"2週間で必要だと伝え、手数料をなくせないか聞く","model":"We'd need it in two weeks. Is there any way you could waive the fee?","alts":["Two weeks would be ideal. Could you do it without the extra fee?"],"keys":[["waive","free","no charge","without the","drop the","no extra"]],"hint":"Is there any way you could waive ~?"},
   "go":"waive"},
  "waive":{"p":"If you order over a thousand units, we can waive it. Now, on price, here's what we can offer.","ja":"1000個以上ご注文いただけるなら、手数料はなしにできます。では価格について、こちらからのご提案です。","go":"counter"},
  "counter":{"p":"Ten percent is difficult. We could do five percent, or ten percent if you commit to a one-year contract.","ja":"10%は厳しいです。5%なら可能です。1年契約をお約束いただけるなら10%にできます。",
   "ch":[
    {"en":"If we sign for a year, could you also include free shipping?","go":"ship","keys":[["shipping","include","sign for"]]},
    {"en":"Five percent works for us if we can keep the contract flexible.","go":"five","keys":[["five percent","flexible","flexibility"]]},
    {"en":"Let me check with my team and get back to you.","go":"team","keys":[["check with","get back","team","think about","discuss"]]}
   ]},
  "ship":{"p":"That's a bit of a stretch, but I think we can meet you halfway on shipping.","ja":"少し厳しいですが、送料は半分負担することで歩み寄れると思います。",
   "free":{"ja":"それで合意し、条件を書面で送ってほしいと頼む","model":"That sounds fair. Could you send us the terms in writing?","alts":["Great. Please email me the updated terms."],"keys":[["in writing","email","send","written","document*"]],"hint":"That sounds fair. Could you send us ~?"},
   "go":"deal"},
  "five":{"p":"That's reasonable. We can do a six-month term with an option to renew.","ja":"妥当ですね。更新オプションつきの6か月契約にできます。",
   "free":{"ja":"合意して、修正した見積もりを送ってほしいと伝える","model":"Great, we have a deal. Please send over the revised quote.","alts":["Sounds good. Could you email me an updated quote?"],"keys":[["send","email","in writing","revised","updated","quote"]],"hint":"We have a deal. Please send over ~."},
   "go":"deal"},
  "team":{"p":"Of course. When can I expect to hear from you?","ja":"もちろんです。いつごろお返事をいただけますか?",
   "free":{"ja":"遅くとも金曜日までに連絡すると伝える","model":"I'll get back to you by Friday at the latest.","alts":["You'll hear from us early next week."],"keys":[["friday","monday","tomorrow","next week","end of the week"]],"hint":"I'll get back to you by ~ at the latest."},
   "go":"endteam"},
  "deal":{"p":"Great. I'll send the revised terms by the end of the day. It's a pleasure working with you.","ja":"ありがとうございます。今日中に修正した条件をお送りします。お取引できて光栄です。","end":true,
   "wrap":"Given our budget, would ~ be possible? / meet you halfway(歩み寄る)。根拠+提案が交渉の基本です。"},
  "endteam":{"p":"Sounds good. I look forward to hearing from you.","ja":"承知しました。ご連絡をお待ちしております。","end":true,
   "wrap":"Let me check with my team and get back to you. は、その場で決めずに持ち帰るときの定番表現です。"}
 }},

{"id":"q14","lv":4,"theme":"space","t":"プラネタリウムのガイドと宇宙の話","partner":"Planetarium guide","pv":"f",
 "intro":"プラネタリウムの上映が終わりました。ガイドさんが質問を受けつけています。気になることを聞いてみましょう。",
 "goal":"質問や感想を自分の言葉で伝えて、会話を楽しむ",
 "start":"n1",
 "nodes":{
  "n1":{"p":"Welcome! That was our evening sky show. Do you have any questions about what you saw?","ja":"ようこそ!今のが夜空の上映でした。ご覧になって、何か質問はありますか?",
   "ch":[
    {"en":"Yes. How far away is the Andromeda Galaxy?","go":"andro","keys":[["andromeda","galaxy","how far"]]},
    {"en":"Why do the stars look like they move across the sky?","go":"move","keys":[["move*","moving","across","rotat*","spin*"]]},
    {"en":"Honestly, I fell asleep halfway through.","go":"sleep","keys":[["asleep","sleep*","fell","dozed"]]}
   ]},
  "andro":{"p":"It's about two and a half million light-years away. So the light we see tonight left it long before modern humans existed.","ja":"約250万光年です。つまり今夜見える光は、現生人類が現れるずっと前にそこを出たものなんです。",
   "free":{"ja":"驚きを伝え、肉眼で見えるのか聞く","model":"That's mind-blowing. Can you see it with the naked eye?","alts":["Wow. Is it visible without a telescope?"],"keys":[["naked eye","without a telescope","see it","visible","binoculars"]],"hint":"Can you see it with the ~ eye?"},
   "go":"eye"},
  "eye":{"p":"You can, actually, from a dark place far from city lights. It looks like a faint, fuzzy patch.","ja":"実は見えますよ。街明かりから離れた暗い場所なら。ぼんやりとした淡い光のしみのように見えます。","go":"more"},
  "move":{"p":"Great question. The stars aren't really moving that way. It's the Earth rotating that makes them seem to move.","ja":"いい質問ですね。星そのものがそう動いているわけではありません。地球が自転しているから、動いて見えるんです。",
   "free":{"ja":"地球が回っているからだと、言い換えて確認する","model":"Oh, so it's because the Earth is spinning?","alts":["So the Earth turns, and the stars only seem to move?"],"keys":[["earth"],["spin*","rotat*","turn*"]],"hint":"So it's because the Earth is ~?"},
   "go":"polaris"},
  "polaris":{"p":"Exactly. And Polaris, the North Star, hardly seems to move at all, because it sits almost in line with Earth's axis.","ja":"そのとおりです。そして北極星はほとんど動いて見えません。地球の自転軸のほぼ延長線上にあるからです。","go":"more"},
  "sleep":{"p":"Ha, that happens more often than you'd think. The seats are very comfortable. Is there anything you're curious about?","ja":"ふふ、意外とよくあることですよ。座席がとても快適なので。何か気になることはありますか?",
   "free":{"ja":"星によって色が違うのはなぜか聞く","model":"Actually, I've always wondered why stars have different colors.","alts":["Why are some stars red and others blue?"],"keys":[["color*","colour*","red","blue"]],"hint":"I've always wondered why ~."},
   "go":"color"},
  "color":{"p":"It mostly depends on their surface temperature. Hotter stars look bluish, and cooler ones look reddish.","ja":"主に表面温度で決まります。熱い星は青っぽく、温度の低い星は赤っぽく見えるんです。","go":"more"},
  "more":{"p":"Is there anything else you'd like to know?","ja":"ほかに知りたいことはありますか?",
   "ch":[
    {"en":"Could you recommend a good place for stargazing around here?","go":"spot","keys":[["stargaz*","place","where","spot"]]},
    {"en":"Do you think there's life somewhere else in the universe?","go":"life","keys":[["life","alien*","living things","anyone out there"]]},
    {"en":"No, that's all. Thanks, this was fascinating.","go":"thanks","keys":[["that is all","thank*","nothing else","fascinating"]]}
   ]},
  "spot":{"p":"The hills north of town are pretty dark. Just avoid nights around the full moon.","ja":"町の北の丘はかなり暗いですよ。満月のころの夜だけは避けてくださいね。","end":true,
   "wrap":"I've always wondered ~.(ずっと~が気になっていた)/ Could you recommend ~? 質問を自然に切り出す表現です。"},
  "life":{"p":"Nobody knows yet, but scientists are searching. With so many stars and planets, many people find it hard to believe we're alone.","ja":"まだ誰にもわかりませんが、科学者たちが探しています。これほど多くの星や惑星があるので、私たちだけとは信じがたいと考える人は多いですね。",
   "free":{"ja":"自分も同じように感じると伝え、理由を一言そえる","model":"I feel the same way. The universe is just too big.","alts":["I agree. There are just so many planets out there."],"keys":[["same","agree","me too","i think so","feel","believe"]],"hint":"I feel the same way. The universe is ~."},
   "go":"thanks"},
  "thanks":{"p":"My pleasure. Thanks for coming, and enjoy the night sky!","ja":"どういたしまして。ご来場ありがとうございました。夜空を楽しんでくださいね!","end":true,
   "wrap":"That's mind-blowing. / I feel the same way. 感想や共感を伝えると、雑談がぐっと続きます。"}
 }}
];

const PHRASES = [
// ===== daily =====
{"id":"ph-daily-01","lv":1,"theme":"daily","en":"Do you want to ~?","ja":"〜しませんか?","tip":"Do you want to ~? は友だちを気軽に誘う形。丁寧にするなら Would you like to ~? を使います。","core":[["do you want to","would you like to","do you wanna"]],"sits":[
 {"place":"職場の休憩室","ja":"お腹がすいたと言う同僚を、一緒にお昼ごはんに誘う","p":"Ugh, I'm starving.","model":"Do you want to get lunch together?","keys":[["lunch","eat*","food"]]},
 {"place":"友だちの家","ja":"退屈している友だちを、一緒に映画を見ようと誘う","p":"I'm so bored tonight.","model":"Do you want to watch a movie with me?","keys":[["movie*","film*"]]},
 {"place":"カフェ","ja":"メニューに迷う友だちに、ケーキを半分ずつにしようと持ちかける","p":"Everything on this menu looks so good.","model":"Do you want to share a piece of cake?","keys":[["share","split"],["cake","dessert"]]}]},
{"id":"ph-daily-02","lv":1,"theme":"daily","en":"I'm going to ~.","ja":"〜するつもりです","tip":"be going to は前から決めていた予定に使います。会話では I'm gonna と聞こえることもあります。","core":[["i am going to","i am gonna","i will"]],"sits":[
 {"place":"金曜日の職場","ja":"週末の予定を聞かれ、実家の両親に会いに行くと答える","p":"Any plans for the weekend?","model":"I'm going to visit my parents.","keys":[["parent*","family","mom","dad","home"]]},
 {"place":"自宅","ja":"また夜ふかしするのかと家族に聞かれ、今夜は早く寝ると答える","p":"Are you staying up late again?","model":"No, I'm going to go to bed early tonight.","keys":[["bed","sleep"]]},
 {"place":"駅前","ja":"偶然会った友だちに行き先を聞かれ、これからジムに行くと答える","p":"Hey! Where are you headed?","model":"I'm going to the gym.","keys":[["gym","work out","exercise"]]}]},
{"id":"ph-daily-03","lv":1,"theme":"daily","en":"How about ~?","ja":"〜はどうですか?","tip":"How about + 名詞 / ~ing で提案します。What about ~? もほぼ同じ意味です。","core":[["how about","what about"]],"sits":[
 {"place":"友だちとの電話","ja":"明日の待ち合わせ時間を聞かれ、午前10時を提案する","p":"What time works for you tomorrow?","model":"How about 10 o'clock?","keys":[["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","oclock","noon","morning","afternoon","evening"]]},
 {"place":"自宅のキッチン","ja":"夕飯の献立に悩む家族に、簡単なカレーを提案する","p":"I have no idea what to make for dinner.","model":"How about curry? It's easy to make.","keys":[["curry","pasta","pizza","noodle*","rice","stew","salad","soup","sushi","tacos"]]},
 {"place":"ショッピングモール","ja":"妹への誕生日プレゼントに迷う友だちに、すてきなマフラーを提案する","p":"What should I get my sister for her birthday?","model":"How about a nice scarf?","keys":[["scarf","bag","flower*","book","necklace","mug","candle*","gift card","perfume","watch"]]}]},
{"id":"ph-daily-04","lv":2,"theme":"daily","en":"I'm thinking about ~ing.","ja":"〜しようかと考えています","tip":"まだ決めていない予定をやわらかく伝える形。about の後は ~ing。thinking of ~ing も同じ意味です。","core":[["thinking about","thinking of"]],"sits":[
 {"place":"美容院","ja":"今日はどうするか聞かれ、髪を短く切ろうかと考えていると伝える","p":"So, what would you like today?","model":"I'm thinking about cutting my hair short.","keys":[["cut*","short","trim"]]},
 {"place":"友だちとのお茶","ja":"近況を聞かれ、もっと広い部屋に引っ越そうか考えていると話す","p":"So, what's new with you?","model":"I'm thinking about moving to a bigger apartment.","keys":[["mov*"],["apartment","place","house","home"]]},
 {"place":"ペットショップ","ja":"店員さんに声をかけられ、犬を飼おうか考えていると伝える","p":"Are you looking for anything special today?","model":"I'm thinking about getting a dog.","keys":[["dog*","pupp*","pet*"]]}]},
{"id":"ph-daily-05","lv":2,"theme":"daily","en":"Do you mind if I ~?","ja":"〜してもかまいませんか?","tip":"直訳は「〜したら気にしますか?」。OKなら No, not at all. と答えるのが基本です。","core":[["do you mind if","would you mind if","is it okay if","is it ok if","is it all right if"]],"sits":[
 {"place":"電車","ja":"暑いねと話しかけてきた隣の人に、窓を開けてもいいか聞く","p":"It's pretty warm in here, isn't it?","model":"Yeah. Do you mind if I open the window?","keys":[["open*"],["window"]]},
 {"place":"混んだカフェ","ja":"混雑をわびる店員さんの前で、相席の人にここに座ってもいいか聞く","p":"Sorry, it's really crowded today.","model":"Do you mind if I sit here?","keys":[["sit","seat","join"]]},
 {"place":"友だちの家","ja":"くつろいでと言われ、スマホを充電してもいいか聞く","p":"Make yourself at home.","model":"Thanks. Do you mind if I charge my phone?","keys":[["charg*","plug"]]}]},
{"id":"ph-daily-06","lv":2,"theme":"daily","en":"I'm not used to ~.","ja":"〜に慣れていません","tip":"be used to の to は前置詞なので、後ろは名詞か ~ing。used to + 動詞(以前は〜した)と区別しましょう。","core":[["not used to","not really used to"]],"sits":[
 {"place":"新しい職場","ja":"疲れているねと言われ、こんなに早起きするのに慣れていないと答える","p":"You look tired. Are you okay?","model":"I'm just not used to getting up so early.","keys":[["get* up","wak* up","early"]]},
 {"place":"引っ越し先の町","ja":"ここの冬はどうかと聞かれ、きれいだけれど寒さに慣れていないと答える","p":"How do you like winter here?","model":"It's beautiful, but I'm not used to the cold.","keys":[["cold","snow","winter"]]},
 {"place":"ホームパーティー","ja":"料理が辛すぎないか聞かれ、辛い食べ物に慣れていないと伝える","p":"Is the food too spicy for you?","model":"A little. I'm not used to spicy food.","keys":[["spicy","hot"]]}]},
{"id":"ph-daily-07","lv":3,"theme":"daily","en":"I was wondering if ~.","ja":"〜していただけないかと思いまして","tip":"過去進行形にすると、お願いや誘いがぐっと控えめで丁寧になります。if の後は you could / I could などが続きます。","core":[["i was wondering if","i was wondering whether","i am wondering if"]],"sits":[
 {"place":"マンションの廊下","ja":"来週の旅行中、植物に水をやってもらえないか隣人に頼む","p":"Oh, hi! Going somewhere?","model":"Yes, next week. I was wondering if you could water my plants while I'm away.","keys":[["water*"],["plant*","flower*"]]},
 {"place":"久しぶりの再会","ja":"昔の友だちを、今週の金曜日に夕食に誘う","p":"Hey, long time no see!","model":"I know! I was wondering if you'd like to have dinner this Friday.","keys":[["dinner","eat","lunch","drink*"]]},
 {"place":"図書館","ja":"借りている本をもう1週間延長できないか司書に聞く","p":"Hi, how can I help you?","model":"I was wondering if I could keep this book for another week.","keys":[["book"],["keep","extend*","renew*","longer","another week"]]}]},
{"id":"ph-daily-08","lv":4,"theme":"daily","en":"I wish I had ~.","ja":"〜があればいいのに/〜しておけばよかった","tip":"I wish I had + 名詞 で「今〜があればいいのに」、I wish I had + 過去分詞 で「あの時〜すればよかった」。","core":[["i wish i had","i wish i would"]],"sits":[
 {"place":"駅の出口","ja":"土砂降りの雨を見て、傘を持ってくればよかったと言う","p":"Wow, it's pouring out there!","model":"I know. I wish I had brought an umbrella.","keys":[["umbrella"]]},
 {"place":"職場","ja":"最近忙しそうだと言われ、もっと自由な時間があればいいのにと答える","p":"You seem really busy these days.","model":"Yeah, I wish I had more free time.","keys":[["time"]]},
 {"place":"友だちとのカフェ","ja":"海への旅行写真を見せてもらい、一緒に行けばよかったと言う","p":"Look at these photos from my trip to the beach!","model":"They're beautiful. I wish I had gone with you.","keys":[["gone","come","went","been there","joined"]]}]},
// ===== travel =====
{"id":"ph-travel-01","lv":1,"theme":"travel","en":"Could you help me with ~?","ja":"〜を手伝っていただけますか?","tip":"Could you ~? は Can you ~? より丁寧。help me with + 物 の形でよく使います。","core":[["could you","can you","would you"],["help*"]],"sits":[
 {"place":"ホテル","ja":"フロントで、重いスーツケースを部屋まで運ぶのを手伝ってほしい","p":"Good evening. Is everything all right?","model":"Could you help me with my suitcase? It's really heavy.","keys":[["suitcase*","luggage","bag*"]]},
 {"place":"駅","ja":"券売機の使い方がわからないので駅員さんに頼む","p":"Hi there, do you need something?","model":"Could you help me with this ticket machine?","keys":[["ticket*","machine"]]},
 {"place":"お店","ja":"店員さんにサイズ選びを手伝ってほしい","p":"Let me know if you need anything.","model":"Could you help me find the right size?","keys":[["size"]]}]},
{"id":"ph-travel-02","lv":1,"theme":"travel","en":"Where can I ~?","ja":"どこで〜できますか?","tip":"場所をたずねる万能フレーズ。Where can I buy / find / get ~? の形でよく使います。","core":[["where can i","where could i","where do i"]],"sits":[
 {"place":"空港","ja":"到着後、預けた荷物をどこで受け取れるか係員に聞く","p":"Welcome. Can I help you?","model":"Where can I pick up my luggage?","keys":[["luggage","bag*","baggage","suitcase*"]]},
 {"place":"観光案内所","ja":"バスの乗車券をどこで買えるか聞く","p":"Hello! What can I do for you?","model":"Where can I buy a bus ticket?","keys":[["bus"],["ticket*","pass"]]},
 {"place":"ホテルのロビー","ja":"朝食をどこで食べられるかスタッフに聞く","p":"Good morning. How can I help?","model":"Where can I have breakfast?","keys":[["breakfast"]]}]},
{"id":"ph-travel-03","lv":1,"theme":"travel","en":"I'd like to ~.","ja":"〜したいのですが","tip":"I want to より丁寧な言い方。お店・ホテル・レストランで希望を伝える基本形です。","core":[["i would like","i would love","i want to"]],"sits":[
 {"place":"ホテルのフロント","ja":"到着したので、チェックインしたいと伝える","p":"Good afternoon. How can I help you?","model":"Hi, I'd like to check in, please.","keys":[["check in","checking in"]]},
 {"place":"レストランへの電話","ja":"今夜2人で予約を取りたいと伝える","p":"Thank you for calling. How may I help you?","model":"I'd like to make a reservation for two tonight.","keys":[["reserv*","book*","table"]]},
 {"place":"両替所","ja":"日本円をドルに両替したいと伝える","p":"Next, please.","model":"I'd like to exchange some yen for dollars.","keys":[["exchang*","change"],["yen","dollar*","money","cash"]]}]},
{"id":"ph-travel-04","lv":2,"theme":"travel","en":"Is there a ~ near here?","ja":"この近くに〜はありますか?","tip":"Is there ~? で「〜がありますか」。near here / around here / nearby を付けると場所をたずねられます。","core":[["is there","are there"],["near*","around here","close"]],"sits":[
 {"place":"街角","ja":"道に迷っていると声をかけられ、近くに薬局があるか聞く","p":"You look lost. Can I help?","model":"Thanks. Is there a pharmacy near here?","keys":[["pharmac*","drugstore","drug store"]]},
 {"place":"ホテルのフロント","ja":"ほかに必要なことを聞かれ、近くにおいしいレストランがあるか聞く","p":"Is there anything else you need?","model":"Yes. Is there a good restaurant near here?","keys":[["restaurant*","place to eat"]]},
 {"place":"駅","ja":"駅員さんに、近くにお金をおろせる機械があるか聞く","p":"Do you need some help?","model":"Is there an ATM near here?","keys":[["atm","cash machine","bank"]]}]},
{"id":"ph-travel-05","lv":2,"theme":"travel","en":"How long does it take to ~?","ja":"〜するのにどのくらいかかりますか?","tip":"所要時間をたずねる定番。How long does it take to get to ~? の形で覚えると便利です。","core":[["how long"]],"sits":[
 {"place":"タクシー","ja":"行き先を空港と伝え、着くまでどのくらいかかるか聞く","p":"Where to?","model":"To the airport. How long does it take to get there?","keys":[["airport"]]},
 {"place":"観光案内所","ja":"お城に行くつもりだと答え、歩いてどのくらいかかるか聞く","p":"Are you planning to visit the castle?","model":"Yes. How long does it take to walk there?","keys":[["walk*","on foot"]]},
 {"place":"クリーニング店","ja":"服を預けるときに、仕上がりまでどのくらいかかるか聞く","p":"Hi, are you dropping these off?","model":"Yes. How long does it take to clean them?","keys":[["clean*","wash*","ready"]]}]},
{"id":"ph-travel-06","lv":2,"theme":"travel","en":"Is it possible to ~?","ja":"〜することは可能ですか?","tip":"できるかどうかを丁寧にたずねる形。Would it be possible to ~? にするとさらに丁寧です。","core":[["is it possible","would it be possible"]],"sits":[
 {"place":"ホテル","ja":"明日のチェックアウトを遅くできるか聞く","p":"Is there anything else I can help you with?","model":"Is it possible to check out late tomorrow?","keys":[["check out","checkout","late"]]},
 {"place":"空港のカウンター","ja":"搭乗券を受け取りながら、窓側の席にできるか聞く","p":"Here's your boarding pass.","model":"Thank you. Is it possible to get a window seat?","keys":[["window","aisle","seat"]]},
 {"place":"美術館","ja":"館内で写真を撮ってもよいか聞く","p":"Welcome to the museum.","model":"Is it possible to take photos inside?","keys":[["photo*","picture*"]]}]},
{"id":"ph-travel-07","lv":3,"theme":"travel","en":"I was supposed to ~, but ~.","ja":"〜するはずだったのですが…","tip":"予定通りにいかなかったことを説明する形。旅先でトラブルを伝えるときに役立ちます。","core":[["supposed to"]],"sits":[
 {"place":"乗り継ぎカウンター","ja":"6時の便に乗るはずだったのに乗り遅れたと説明する","p":"How can I help you?","model":"I was supposed to take the six o'clock flight, but I missed it.","keys":[["flight","plane","connection"]]},
 {"place":"ホテルのフロント","ja":"名前が見つからないと言われ、今夜の予約があるはずだと伝える","p":"I'm sorry, I can't find your name.","model":"I was supposed to have a reservation for tonight, but maybe there's a mistake.","keys":[["reserv*","booking","booked","room"]]},
 {"place":"ツアーの集合場所","ja":"ここでガイドと会うはずだったのに見つからないと伝える","p":"Excuse me, are you with our group?","model":"Yes. I was supposed to meet the tour guide here, but I can't find him.","keys":[["tour","guide","group"]]}]},
{"id":"ph-travel-08","lv":4,"theme":"travel","en":"Would it be too much trouble to ~?","ja":"〜していただくのはご迷惑でしょうか?","tip":"相手の手間を気づかう、かなり丁寧なお願い。Would it be too much trouble if I ~? の形も使えます。","core":[["too much trouble"]],"sits":[
 {"place":"ホテル","ja":"部屋の準備がまだと言われ、それまで荷物を預かってもらえないか頼む","p":"Your room isn't ready yet, I'm afraid.","model":"That's okay. Would it be too much trouble to leave my bags here until then?","keys":[["bag*","luggage","suitcase*"],["leave","keep","store","hold"]]},
 {"place":"レストラン","ja":"注文するときに、この料理を玉ねぎ抜きで作ってもらえないか頼む","p":"Are you ready to order?","model":"Yes, but would it be too much trouble to make this without onions?","keys":[["without","no","hold"],["onion*"]]},
 {"place":"小さな宿","ja":"明朝のためにタクシーを呼んでもらえないか頼む","p":"Is there anything else you need before tomorrow?","model":"Would it be too much trouble to call a taxi for me in the morning?","keys":[["taxi","cab","ride"]]}]},
// ===== business =====
{"id":"ph-business-01","lv":1,"theme":"business","en":"Let me check ~.","ja":"〜を確認させてください","tip":"Let me ~. は「私に〜させて」。すぐに答えられないときの自然なつなぎ言葉です。","core":[["let me check","let me see","let me look","i will check"]],"sits":[
 {"place":"オフィス","ja":"木曜の午後は空いているか聞かれ、予定表を確認すると答える","p":"Are you free on Thursday afternoon?","model":"Let me check my schedule.","keys":[["schedule","calendar"]]},
 {"place":"取引先との電話","ja":"青い型の在庫を聞かれ、倉庫に確認すると答える","p":"Do you still have the blue model in stock?","model":"Let me check with our warehouse.","keys":[["warehouse","stock","inventory","team"]]},
 {"place":"上司の席","ja":"お客様からのメールが届いたか聞かれ、受信箱を確認すると答える","p":"Did you get the email from the client?","model":"Let me check my inbox.","keys":[["inbox","email*","mail"]]}]},
{"id":"ph-business-02","lv":1,"theme":"business","en":"Thank you for ~.","ja":"〜してくれてありがとうございます","tip":"for の後は名詞か ~ing。Thanks for ~. はよりカジュアルな言い方です。","core":[["thank you for","thanks for","thank you so much for"]],"sits":[
 {"place":"面接","ja":"面接の終わりに、時間をとってくれたお礼を言う","p":"Well, that's all from us today.","model":"Thank you for your time today.","keys":[["time","meeting","opportunity"]]},
 {"place":"オフィス","ja":"スライド作りを手伝ってくれた同僚にお礼を言う","p":"I finished the slides you asked about.","model":"Thank you for helping me with the slides.","keys":[["help*","slide*"]]},
 {"place":"会社の受付","ja":"会議に来てくれたお客様に来社のお礼を言い、席をすすめる","p":"Hello, I'm here for the two o'clock meeting.","model":"Thank you for coming. Please have a seat.","keys":[["coming","visit*","being here"]]}]},
{"id":"ph-business-03","lv":1,"theme":"business","en":"Can we ~?","ja":"〜できますか?/〜しませんか?","tip":"Can we ~? はチームで何かしようと提案するときの基本形。Could we ~? だと丁寧になります。","core":[["can we","could we","shall we"]],"sits":[
 {"place":"社内チャット","ja":"今日の会議に出られないと言う同僚に、代わりに明日会えないか聞く","p":"Something came up, and I can't make the meeting today.","model":"No problem. Can we meet tomorrow instead?","keys":[["tomorrow","another day","later","reschedul*"]]},
 {"place":"長い会議","ja":"2時間続いた会議で、少し休憩しないかと提案する","p":"We've been at this for two hours.","model":"Can we take a short break?","keys":[["break","rest"]]},
 {"place":"打ち合わせ","ja":"予算の話が終わったので、次の議題に進もうと提案する","p":"I think we've covered the budget.","model":"Great. Can we move on to the next topic?","keys":[["move on","next","go to"]]}]},
{"id":"ph-business-04","lv":2,"theme":"business","en":"Let me get back to you on ~.","ja":"〜については改めてご連絡します","tip":"その場で答えられないときの定番表現。get back to 人 で「後で連絡する」という意味です。","core":[["get back to you","get back with you"]],"sits":[
 {"place":"商談","ja":"値引きを求められ、価格については後で連絡すると答える","p":"Can you offer us a better price?","model":"Let me get back to you on the price.","keys":[["price*","pricing","discount"]]},
 {"place":"上司との面談","ja":"月曜までに報告書を仕上げられるか聞かれ、チームと話してから締め切りの件を連絡すると答える","p":"Can you finish the report by Monday?","model":"Let me get back to you on the deadline after I talk to my team.","keys":[["deadline","monday","schedule","timing"]]},
 {"place":"顧客との電話","ja":"古いソフトと連携できるか聞かれ、技術者に確認してから連絡すると答える","p":"Does the system work with our old software?","model":"Good question. Let me get back to you on that after I check with our engineers.","keys":[["engineer*","technical team","check"]]}]},
{"id":"ph-business-05","lv":2,"theme":"business","en":"I'd appreciate it if you could ~.","ja":"〜していただけると助かります","tip":"かなり丁寧な依頼の形。メールでも口頭でも使えるビジネスの定番です。","core":[["appreciate it if","would appreciate"]],"sits":[
 {"place":"オフィス","ja":"何か必要かと聞く同僚に、今日中にファイルを送ってほしいと頼む","p":"Is there anything you need from me?","model":"I'd appreciate it if you could send me the file today.","keys":[["send*","email*","share"],["file*","document*","data","report"]]},
 {"place":"取引先との電話","ja":"提案を検討中と言われ、金曜までに返事がほしいと伝える","p":"We're still discussing your proposal.","model":"I understand. I'd appreciate it if you could let me know by Friday.","keys":[["let me know","reply","answer","respond","get back","decision"],["friday","end of the week","soon"]]},
 {"place":"会議の準備","ja":"会議前に何をすればいいか聞く部下に、議題を印刷してほしいと頼む","p":"What should I do before the meeting?","model":"I'd appreciate it if you could print the agenda.","keys":[["print*","copy","copies"],["agenda","handout*","document*"]]}]},
{"id":"ph-business-06","lv":2,"theme":"business","en":"Just to make sure, ~?","ja":"念のため確認ですが、〜ですか?","tip":"相手を疑うのではなく、誤解を防ぐための確認です。Just to confirm, ~? も同じように使えます。","core":[["just to make sure","just to confirm","just to be sure","just to clarify"]],"sits":[
 {"place":"会議の終わり","ja":"解散の前に、次の会議が火曜日でよいか確認する","p":"So, see you all next week.","model":"Just to make sure, the meeting is on Tuesday, right?","keys":[["tuesday","meeting"]]},
 {"place":"電話での注文","ja":"注文内容を読み上げられ、色が黒で灰色ではないことを確認する","p":"So that's fifty units of the black model.","model":"Just to make sure, that's the black one, not the gray one?","keys":[["black"]]},
 {"place":"新人研修","ja":"始める前に、報告書は上司ではなく相手に送ればよいか確認する","p":"Any questions before you start?","model":"Just to make sure, I should send the report to you, not to my manager?","keys":[["report","send"]]}]},
{"id":"ph-business-07","lv":3,"theme":"business","en":"The thing is, ~.","ja":"実は(問題は)〜なんです","tip":"言いにくい事情や本当の理由を切り出す前置き。The problem is, ~. よりやわらかく聞こえます。","core":[["the thing is"]],"sits":[
 {"place":"上司の席","ja":"もう1件仕事を頼まれ、手伝いたいが今週すでに締め切りが3つあると説明する","p":"Could you take on one more project this month?","model":"I'd like to help. The thing is, I already have three deadlines this week.","keys":[["deadline*","busy","project*","workload"]]},
 {"place":"取引先との電話","ja":"出荷が遅れている理由を聞かれ、仕入れ先の部品に問題があったと説明する","p":"Why is the shipment late?","model":"I'm sorry. The thing is, our supplier had a problem with the parts.","keys":[["supplier*","part*","factory","material*"]]},
 {"place":"オフィスの廊下","ja":"チームの食事会に来るか聞かれ、行きたいが子どもを迎えに行かなければならないと伝える","p":"Are you coming to the team dinner tonight?","model":"I really want to, but the thing is, I have to pick up my kid.","keys":[["pick up","kid*","child*","son","daughter"]]}]},
{"id":"ph-business-08","lv":4,"theme":"business","en":"I see your point, but ~.","ja":"おっしゃることはわかりますが、〜","tip":"相手の意見を一度受け止めてから反対する大人の言い方。いきなり No, ~. と言うより角が立ちません。","core":[["i see your point","i see what you mean","i get your point","fair point","i understand your point"],["but","however"]],"sits":[
 {"place":"会議","ja":"宣伝費を減らそうという意見に、新しいお客様を失うかもしれないと反論する","p":"I think we should cut the marketing budget.","model":"I see your point, but we might lose new customers.","keys":[["customer*","client*","sales"]]},
 {"place":"開発チームの打ち合わせ","ja":"来月発売しようという意見に、テストの時間がもっと必要だと返す","p":"Let's launch the product next month.","model":"I see your point, but we need more time for testing.","keys":[["test*","time"]]},
 {"place":"顧客との交渉","ja":"1年契約がいいと言われ、2年契約なら月々の費用が下がると説明する","p":"We'd prefer a one-year contract.","model":"I see your point, but a two-year contract would lower your monthly cost.","keys":[["contract","cost*","price","monthly"]]}]},
// ===== fx =====
{"id":"ph-fx-01","lv":1,"theme":"fx","en":"What do you think about ~?","ja":"〜についてどう思いますか?","tip":"相手の意見を聞く基本形。What do you think of ~? もほぼ同じ意味です。","core":[["what do you think","whats your take","what is your take","how do you feel"]],"sits":[
 {"place":"トレード仲間とのカフェ","ja":"チャートを見せられ、この形についてどう思うか聞き返す","p":"Look at this chart. Interesting, right?","model":"Yeah. What do you think about this pattern?","keys":[["pattern","chart","shape","wave*"]]},
 {"place":"トレード勉強会","ja":"ルールの話題で、朝の時間だけ取引することについて意見を聞く","p":"Today we're talking about trading rules.","model":"What do you think about trading only in the morning?","keys":[["morning","time*","hour*"]]},
 {"place":"友だちの部屋","ja":"トレードの心理学の本を読み終えた友だちに、感想と読む価値があるかを聞く","p":"I just finished this book on trading psychology.","model":"What do you think about it? Is it worth reading?","keys":[["worth","good","recommend*"]]}]},
{"id":"ph-fx-02","lv":1,"theme":"fx","en":"I usually ~.","ja":"私はたいてい〜します","tip":"習慣を伝える形。usually は一般動詞の前、be動詞の後に置きます。","core":[["usually","normally","always","often"]],"sits":[
 {"place":"トレード仲間との雑談","ja":"いつ取引するのか聞かれ、仕事のあとの夕方が多いと答える","p":"When do you usually trade?","model":"I usually trade in the evening after work.","keys":[["evening","night","after work"]]},
 {"place":"オンライン交流会","ja":"チャートの見方を聞かれ、まず日足から見ると答える","p":"How do you look at the charts?","model":"I usually start with the daily chart.","keys":[["daily","day chart"]]},
 {"place":"自宅のリビング","ja":"夜いつもパソコンに向かっていると家族に言われ、寝る前に相場を確認していると答える","p":"You're always on your laptop at night.","model":"I usually check the markets before bed.","keys":[["check*","look*"],["market*","chart*"]]}]},
{"id":"ph-fx-03","lv":1,"theme":"fx","en":"I'm trying to ~.","ja":"〜しようと心がけています","tip":"努力中のことを伝える形。I'm trying not to ~. で「〜しないようにしている」になります。","core":[["trying to","trying not to"]],"sits":[
 {"place":"メンターとの面談","ja":"最近の調子を聞かれ、自分のルールをもっと厳しく守るようにしていると答える","p":"How's your trading going lately?","model":"I'm trying to follow my rules more strictly.","keys":[["rule*"]]},
 {"place":"友だちとのランチ","ja":"最近疲れていないねと言われ、夜遅くの取引をやめるようにしていると答える","p":"You look less tired these days.","model":"Thanks. I'm trying to stop trading late at night.","keys":[["late","night","sleep"]]},
 {"place":"トレード勉強会","ja":"今月取り組んでいることを聞かれ、値動きの波をもっと理解しようとしていると答える","p":"What are you working on this month?","model":"I'm trying to understand price waves better.","keys":[["wave*","pattern*","price"]]}]},
{"id":"ph-fx-04","lv":2,"theme":"fx","en":"I've been ~ing for ~.","ja":"(期間)ずっと〜しています","tip":"現在完了進行形で、過去から今まで続いていることを表します。for + 期間、since + 起点。","core":[["i have been"],["for","since"]],"sits":[
 {"place":"トレード仲間との飲み会","ja":"トレード歴を聞かれ、5年ほど続けていると答える","p":"How long have you been trading?","model":"I've been trading for about five years.","keys":[["year*","month*"]]},
 {"place":"勉強会の自己紹介","ja":"自己紹介を求められ、1年間チャートの形を勉強していると話す","p":"Tell us a little about yourself.","model":"I've been studying chart patterns for a year.","keys":[["stud*","learn*"]]},
 {"place":"職場","ja":"いつも読んでいるノートについて聞かれ、3年間つけているトレード日記だと答える","p":"You're always reading a notebook. What is it?","model":"It's my trading journal. I've been keeping it for three years.","keys":[["journal","notebook","notes","keep*"]]}]},
{"id":"ph-fx-05","lv":2,"theme":"fx","en":"It depends on ~.","ja":"〜によります","tip":"答えが一つに決まらないときの便利な表現。depends on の後に条件をつなげます。","core":[["depends on","it depends"]],"sits":[
 {"place":"初心者の友だちと","ja":"ポジションをどのくらい持つのか聞かれ、相場の状況によると答える","p":"How long do you usually hold a trade?","model":"It depends on the market conditions.","keys":[["market*","condition*","situation"]]},
 {"place":"トレード仲間との雑談","ja":"毎日取引するのか聞かれ、予定によると答え、忙しい日もあると付け加える","p":"Do you trade every day?","model":"It depends on my schedule. Some days I'm too busy.","keys":[["schedule","time","busy"]]},
 {"place":"自宅","ja":"もうすぐ終わるか家族に聞かれ、この1時間の値動きによると答える","p":"Will you be done with your charts soon?","model":"It depends on how the price moves in the next hour.","keys":[["price","move*","chart"]]}]},
{"id":"ph-fx-06","lv":2,"theme":"fx","en":"The key is to ~.","ja":"大事なのは〜することです","tip":"ポイントを一言でまとめる形。The key is ~ing. の形も使えます。","core":[["the key is","the most important thing is","what matters is"]],"sits":[
 {"place":"初心者向けの交流会","ja":"負けたときに冷静でいる方法を聞かれ、一回ごとの損失を小さくすることだと答える","p":"How do you stay calm when you lose?","model":"The key is to keep each loss small.","keys":[["loss*","small","risk"]]},
 {"place":"トレード勉強会","ja":"チャートを読むコツを聞かれ、まず全体像を見ることだと答える","p":"What's the secret to reading charts?","model":"The key is to look at the bigger picture first.","keys":[["big*","picture","long*","higher"]]},
 {"place":"トレード仲間とのカフェ","ja":"毎日日記を続けるコツを聞かれ、取引の直後に短く書くことだと答える","p":"How do you keep up with your journal every day?","model":"The key is to write something short right after each trade.","keys":[["write","short","after"]]}]},
{"id":"ph-fx-07","lv":3,"theme":"fx","en":"If I were you, I'd ~.","ja":"私があなたなら〜します","tip":"仮定法過去でやわらかくアドバイスする形。正式には I were を使います。","core":[["if i were you","if i was you"]],"sits":[
 {"place":"トレード仲間とのチャット","ja":"3回続けて負けてもまだ続けたいという友だちに、今日はもう休むと思うと伝える","p":"I lost three trades in a row, but I want to keep going.","model":"If I were you, I'd take a break for the rest of the day.","keys":[["break","rest","stop"]]},
 {"place":"勉強会のあと","ja":"毎週ルールを変えてしまうという仲間に、しばらく一つのルールを続けると思うと伝える","p":"I keep changing my rules every week.","model":"If I were you, I'd stick to one set of rules for a while.","keys":[["stick*","keep","same","one"],["rule*"]]},
 {"place":"友だちとの食事","ja":"トレードを始めたいけれど不安だという友だちに、まず練習用の口座で試すと思うと伝える","p":"I want to start trading, but I'm nervous.","model":"If I were you, I'd practice with a demo account first.","keys":[["practic*","demo","test"]]}]},
{"id":"ph-fx-08","lv":4,"theme":"fx","en":"Looking back, I should have ~.","ja":"振り返ると、〜すべきでした","tip":"should have + 過去分詞 で過去の後悔や反省を表します。Looking back を付けると振り返りのニュアンスが出ます。","core":[["should have","should not have"]],"sits":[
 {"place":"メンターとの振り返り","ja":"先週学んだことを聞かれ、もっとはっきりした合図を待つべきだったと答える","p":"So, what did you learn from last week?","model":"Looking back, I should have waited for a clearer signal.","keys":[["wait*","patient"]]},
 {"place":"トレード仲間との雑談","ja":"なぜ早く決済したのか聞かれ、緊張したが自分の計画を信じるべきだったと答える","p":"Why did you close that trade so early?","model":"I got nervous. Looking back, I should have trusted my plan.","keys":[["trust*","follow*","plan","rule*"]]},
 {"place":"自宅の朝","ja":"また3時まで起きていたと家族に言われ、あんなに夜ふかしするべきではなかったと認める","p":"You were up until three again.","model":"I know. Looking back, I shouldn't have stayed up so late.","keys":[["stay* up","late","sleep"]]}]},
// ===== stocks =====
{"id":"ph-stocks-01","lv":1,"theme":"stocks","en":"Have you ever ~?","ja":"〜したことがありますか?","tip":"経験をたずねる現在完了。Have you ever + 過去分詞? 答えは Yes, I have. / No, never. です。","core":[["have you ever"]],"sits":[
 {"place":"職場の雑談","ja":"最近株式市場について読んでいるという同僚に、株を買ったことがあるか聞く","p":"I've been reading about the stock market lately.","model":"Oh, have you ever bought stocks?","keys":[["bought","buy*","invest*","stock*"]]},
 {"place":"友だちとのカフェ","ja":"先週株主総会に行ったという友だちに、以前にも行ったことがあるか聞く","p":"I went to a shareholders' meeting last week.","model":"Really? Have you ever been to one before?","keys":[["been","gone","attend*"]]},
 {"place":"株の勉強会","ja":"会社の報告書を見るという講師の話を受けて、隣の人に年次報告書を読んだことがあるか聞く","p":"Today we'll look at company reports.","model":"Have you ever read an annual report?","keys":[["report*","annual"]]}]},
{"id":"ph-stocks-02","lv":1,"theme":"stocks","en":"I like ~ because ~.","ja":"〜が好きです。〜だからです","tip":"好きなものと理由をセットで言うと会話が続きます。because の後は 主語+動詞 です。","core":[["i like","i love","i enjoy","i prefer"],["because","since"]],"sits":[
 {"place":"友だちとの朝食","ja":"毎朝経済ニュースを読む理由を聞かれ、新しい会社について知れるから好きだと答える","p":"Why do you read the business news every morning?","model":"I like it because I learn about new companies.","keys":[["learn*","compan*","new"]]},
 {"place":"株の勉強会","ja":"どんな会社に興味があるか聞かれ、誰でも食べる必要があるので食品の会社が好きだと答える","p":"What kind of companies do you find interesting?","model":"I like food companies because everyone needs to eat.","keys":[["food","eat"]]},
 {"place":"職場の休憩室","ja":"毎日株価を見るか聞かれ、ストレスが少ないので長期の投資が好きだと答える","p":"Do you check stock prices every day?","model":"Not really. I like long-term investing because it's less stressful.","keys":[["long term","stress*","calm"]]}]},
{"id":"ph-stocks-03","lv":1,"theme":"stocks","en":"What does ~ mean?","ja":"〜はどういう意味ですか?","tip":"知らない言葉はそのまま聞くのが一番。What does ~ mean? の ~ に単語を入れます。","core":[["what does"],["mean"]],"sits":[
 {"place":"株の勉強会","ja":"講師が使った「配当」という言葉の意味を聞く","p":"The company announced a dividend this quarter.","model":"Sorry, what does dividend mean?","keys":[["dividend*"]]},
 {"place":"友だちとニュースを見ながら","ja":"友だちが使った「強気」を表す言葉の意味を聞く","p":"The market is bullish today.","model":"What does bullish mean?","keys":[["bullish","bull"]]},
 {"place":"職場","ja":"同僚が口にした「株価収益率」という言葉の意味を聞く","p":"That stock has a high P/E ratio.","model":"What does P/E ratio mean?","keys":[["p e","pe","ratio"]]}]},
{"id":"ph-stocks-04","lv":2,"theme":"stocks","en":"I'm not sure, but I think ~.","ja":"よくわかりませんが、〜だと思います","tip":"自信がないときに断定を避ける言い方。会話がやわらかくなります。","core":[["not sure","not certain"],["i think","i guess","i believe","maybe","probably"]],"sits":[
 {"place":"友だちとの雑談","ja":"投資信託の一種について聞かれ、自信はないがたくさんの株のまとまりに連動するものだと思うと答える","p":"Do you know what an index fund is?","model":"I'm not sure, but I think it follows a large group of stocks.","keys":[["group","many","index","basket"],["stock*","compan*"]]},
 {"place":"株の勉強会","ja":"会社が利益をどう使うか聞かれ、自信はないが配当を払う会社もあると思うと答える","p":"What does a company do with its profits?","model":"I'm not sure, but I think some companies pay dividends.","keys":[["dividend*","pay*","shareholder*"]]},
 {"place":"職場","ja":"ある会社の株が今日上がった理由を聞かれ、自信はないが良いニュースがあったと思うと答える","p":"Why did that company's stock go up today?","model":"I'm not sure, but I think it had some good news.","keys":[["news","announce*","report*","earnings"]]}]},
{"id":"ph-stocks-05","lv":2,"theme":"stocks","en":"That makes sense. So ~?","ja":"なるほど。ということは〜ですか?","tip":"That makes sense. は「納得した」の定番。続けて So ~? で理解を確認すると会話が深まります。","core":[["makes sense"]],"sits":[
 {"place":"株の勉強会","ja":"いろいろな株を持つとリスクが下がると聞き、納得して一つの会社に全部入れないほうがいいのか確認する","p":"Owning many different stocks can lower your risk.","model":"That makes sense. So I shouldn't put all my money in one company?","keys":[["one company","one stock","all my money","all in one"]]},
 {"place":"友だちとのカフェ","ja":"株価は毎日上下するので週1回しか見ないという友だちに、納得して小さな変化でストレスを感じないのか確認する","p":"Stock prices go up and down every day, so I only check once a week.","model":"That makes sense. So you don't get stressed by small changes?","keys":[["stress*","worr*","nervous","upset"]]},
 {"place":"職場","ja":"大企業は成長はゆっくりだが安定していると聞き、納得して小さい会社のほうがリスクが高いのか確認する","p":"Big companies often grow slowly, but they're usually more stable.","model":"That makes sense. So smaller companies are riskier?","keys":[["small*"],["risk*"]]}]},
{"id":"ph-stocks-06","lv":2,"theme":"stocks","en":"What's the difference between ~ and ~?","ja":"〜と〜の違いは何ですか?","tip":"似たものを比べてたずねる形。between A and B の形にします。","core":[["difference between","different from"]],"sits":[
 {"place":"株の勉強会","ja":"質問はあるかと聞かれ、株と債券の違いをたずねる","p":"Any questions so far?","model":"Yes. What's the difference between stocks and bonds?","keys":[["stock*"],["bond*"]]},
 {"place":"友だちとの雑談","ja":"口座を開いたばかりの友だちに、すぐ買う注文と値段を決める注文の違いをたずねる","p":"I just opened an account to buy stocks.","model":"Nice. What's the difference between a market order and a limit order?","keys":[["market order"],["limit order"]]},
 {"place":"職場","ja":"会社の報告書を読んだという同僚に、売上と利益の違いをたずねる","p":"I read the company's report last night.","model":"What's the difference between sales and profit?","keys":[["sales","revenue"],["profit*","income"]]}]},
{"id":"ph-stocks-07","lv":3,"theme":"stocks","en":"As far as I know, ~.","ja":"私の知る限りでは〜です","tip":"情報に限りがあることを示しつつ答える形。もし間違っていても角が立ちにくい表現です。","core":[["as far as i know","as far as i understand","from what i know","from what i understand"]],"sits":[
 {"place":"職場","ja":"株式市場は週末も開いているか聞かれ、知る限り週末は閉まっていると答える","p":"Is the stock market open on weekends?","model":"As far as I know, it's closed on weekends.","keys":[["closed","not open"]]},
 {"place":"友だちとの食事","ja":"投資を始めるには大金が必要か聞かれ、知る限り少額から始められると答える","p":"Do you need a lot of money to start investing?","model":"As far as I know, you can start with a small amount.","keys":[["small","little","not much"]]},
 {"place":"株の勉強会","ja":"株価は誰が決めるのか聞かれ、知る限り市場の買い手と売り手で決まると答える","p":"Who decides a company's stock price?","model":"As far as I know, it's decided by buyers and sellers in the market.","keys":[["buyer*","seller*","supply","demand","market"]]}]},
{"id":"ph-stocks-08","lv":4,"theme":"stocks","en":"The more ~, the more ~.","ja":"〜すればするほど、ますます〜","tip":"the + 比較級, the + 比較級 で「〜するほど〜」。more 以外の比較級(the easier など)も使えます。","core":[["the more","the less"]],"sits":[
 {"place":"勉強会のあと","ja":"勉強会はどうかと聞かれ、学べば学ぶほど面白くなると答える","p":"How do you like the stock study group?","model":"The more I learn, the more interesting it gets.","keys":[["learn*","stud*"],["interest*","fun"]]},
 {"place":"友だちとの雑談","ja":"株価を見すぎると不安になるという友だちに、自分も見れば見るほど心配になると共感する","p":"I get nervous when I check prices too often.","model":"Same here. The more I check, the more I worry.","keys":[["check*","look*"],["worr*","nervous","stress*"]]},
 {"place":"職場","ja":"決算書は読みにくいという同僚に、読めば読むほど簡単になると答える","p":"Company reports are so hard to read.","model":"True, but the more you read them, the easier they get.","keys":[["read*"],["easier","easy"]]}]},
// ===== tech =====
{"id":"ph-tech-01","lv":1,"theme":"tech","en":"How do I ~?","ja":"どうやって〜すればいいですか?","tip":"やり方をたずねる一番シンプルな形。How can I ~? もよく使います。","core":[["how do i","how can i","how should i"]],"sits":[
 {"place":"オフィス","ja":"新しいアプリについて同僚に、チームとファイルを共有する方法を聞く","p":"Let me know if you have any trouble with the new app.","model":"Thanks. How do I share a file with the team?","keys":[["share","send"],["file*","document*"]]},
 {"place":"家電店","ja":"新しいスマートスピーカーをスマホにつなぐ方法を店員さんに聞く","p":"This is our newest smart speaker.","model":"How do I connect it to my phone?","keys":[["connect*","pair*","link*"]]},
 {"place":"AIの勉強会","ja":"チャットボットを試していいと言われ、要約を書かせる方法を聞く","p":"Feel free to try the chatbot.","model":"How do I ask it to write a summary?","keys":[["summar*"]]}]},
{"id":"ph-tech-02","lv":1,"theme":"tech","en":"I need to ~.","ja":"〜しなければなりません","tip":"必要なことを伝える基本形。have to より「自分にとって必要」というニュアンスが強めです。","core":[["i need to","i have to","i must","i have got to"]],"sits":[
 {"place":"オフィス","ja":"ランチに誘われ、先にパソコンを更新しなければならないと断る","p":"Are you coming to lunch?","model":"Sorry, I need to update my computer first.","keys":[["updat*","restart*","install*"]]},
 {"place":"携帯ショップ","ja":"用件を聞かれ、パスワードを忘れたので変更したいと伝える","p":"Hi, what can I do for you today?","model":"I need to change my password, but I forgot it.","keys":[["password"]]},
 {"place":"友だちとのカフェ","ja":"スマホが遅いと言われ、古い写真を消さなければと答える","p":"Your phone is so slow!","model":"I know. I need to delete some old photos.","keys":[["delet*","remov*","clear"],["photo*","picture*","video*","file*","app*"]]}]},
{"id":"ph-tech-03","lv":1,"theme":"tech","en":"~ isn't working.","ja":"〜が動きません","tip":"不具合を伝える基本形。進行形の isn't working で「今、動かない」ことを表します。doesn't work も使えます。","core":[["not working","does not work","stopped working","will not work"]],"sits":[
 {"place":"社内のサポート窓口","ja":"電話で、キーボードが動かないと伝える","p":"IT support, how can I help?","model":"Hi, my keyboard isn't working.","keys":[["keyboard"]]},
 {"place":"ホテルの部屋からの電話","ja":"フロントに、部屋のネット接続が使えないと伝える","p":"Front desk. How can I help you?","model":"The Wi-Fi in my room isn't working.","keys":[["wi fi","wifi","internet"]]},
 {"place":"友だちとの電話","ja":"メッセージを見たか聞かれ、スマホのアプリが動かないと説明する","p":"Did you get my message?","model":"No, sorry. The app isn't working on my phone.","keys":[["app","phone","message*"]]}]},
{"id":"ph-tech-04","lv":2,"theme":"tech","en":"Have you tried ~ing?","ja":"〜してみましたか?","tip":"解決策をやんわり提案する形。Have you tried + ~ing? で「〜してみた?」という意味です。","core":[["have you tried","did you try"]],"sits":[
 {"place":"オフィス","ja":"パソコンが何度も固まるという同僚に、再起動してみたか聞く","p":"My computer keeps freezing.","model":"Have you tried restarting it?","keys":[["restart*","reboot*","turning it off"]]},
 {"place":"友だちとの雑談","ja":"人工知能が変な答えを返すという友だちに、もっと具体的に質問してみたか聞く","p":"The AI gives me strange answers.","model":"Have you tried asking more specific questions?","keys":[["specific","clear*","detail*"]]},
 {"place":"自宅","ja":"プリンターが何も印刷しないという家族に、用紙を確認してみたか聞く","p":"The printer won't print anything.","model":"Have you tried checking the paper?","keys":[["paper","ink","cable"]]}]},
{"id":"ph-tech-05","lv":2,"theme":"tech","en":"It's worth ~ing.","ja":"〜する価値があります","tip":"worth の後は ~ing か名詞。It's worth trying. は「やってみる価値あり」の定番です。","core":[["worth"]],"sits":[
 {"place":"オフィス","ja":"新しいデザインツールはいいかと聞かれ、時間の節約になるので覚える価値があると答える","p":"Is the new design tool any good?","model":"Yes, it's worth learning. It saves a lot of time.","keys":[["learn*","try*","using"]]},
 {"place":"友だちとのランチ","ja":"壊れた古いノートパソコンを買い替えるべきか聞かれ、まず修理してみる価値はありそうだと答える","p":"My old laptop is broken. Should I just buy a new one?","model":"It might be worth fixing first.","keys":[["fix*","repair*"]]},
 {"place":"テクノロジー勉強会","ja":"無料のプログラミング講座を知っているか聞かれ、時間があれば受ける価値があると答える","p":"Have you heard about the free coding course?","model":"Yes, it's worth taking if you have time.","keys":[["tak*","join*","sign* up","try*"]]}]},
{"id":"ph-tech-06","lv":2,"theme":"tech","en":"What should I do if ~?","ja":"〜したらどうすればいいですか?","tip":"トラブルを想定して前もってたずねる形。if の後は現在形にします。","core":[["what should i do if","what do i do if","what should i do when","what can i do if"]],"sits":[
 {"place":"社内のセキュリティ研修","ja":"研修の最後に、怪しいメールが届いたらどうすればいいか聞く","p":"That's all for the security training.","model":"What should I do if I get a strange email?","keys":[["email*","mail","message*","link*"]]},
 {"place":"携帯ショップ","ja":"新しいスマホを受け取り、画面が固まったらどうすればいいか聞く","p":"Here's your new phone. Any questions?","model":"What should I do if the screen freezes?","keys":[["screen","freez*"]]},
 {"place":"会議室","ja":"発表の直前に、映写機が動かなかったらどうすればいいか同僚に聞く","p":"Your presentation starts in ten minutes.","model":"What should I do if the projector doesn't work?","keys":[["projector","screen","laptop"]]}]},
{"id":"ph-tech-07","lv":3,"theme":"tech","en":"It turns out (that) ~.","ja":"結局〜だとわかりました","tip":"調べたり試したりした結果を伝える形。過去のことなら It turned out that ~. を使います。","core":[["turns out","turned out"]],"sits":[
 {"place":"オフィス","ja":"サーバーの問題は直ったか聞かれ、結局ケーブルがゆるんでいたとわかったと答える","p":"Did you fix the problem with the server?","model":"Yes. It turns out the cable was loose.","keys":[["cable","wire","plug"]]},
 {"place":"友だちとの雑談","ja":"人工知能のアプリが本当に報告書を書いたのか聞かれ、結局すべての事実を自分で確認する必要があったと答える","p":"Did that AI app really write your report?","model":"Kind of. It turned out I still had to check every fact.","keys":[["check*","fact*","edit*"]]},
 {"place":"自宅","ja":"電池の減りが早い理由を家族に聞かれ、アプリが裏で動いていたとわかったと答える","p":"Why does your battery die so fast?","model":"It turns out an app was running in the background.","keys":[["app*","background"]]}]},
{"id":"ph-tech-08","lv":4,"theme":"tech","en":"It's not so much ~ as ~.","ja":"〜というより、むしろ〜です","tip":"not so much A as B で「AというよりむしろB」。本当のポイントを言い直すときの上級表現です。","core":[["not so much"],["as"]],"sits":[
 {"place":"社内の勉強会","ja":"人工知能が仕事を奪うと思うか聞かれ、奪うというより仕事を変えるのだと答える","p":"So you think AI will replace our jobs?","model":"It's not so much replacing jobs as changing them.","keys":[["chang*","shift*","different"]]},
 {"place":"友だちとのカフェ","ja":"新しいスマホが気に入らないのは高いからかと聞かれ、値段というより電池の持ちが問題だと答える","p":"Why don't you like your new phone? Is it too expensive?","model":"It's not so much the price as the battery life.","keys":[["battery"]]},
 {"place":"プログラミング教室","ja":"プログラミングが難しいのは数学のせいかと聞かれ、数学というより考え方の問題だと答える","p":"Is coding hard because of the math?","model":"It's not so much the math as the way of thinking.","keys":[["think*","logic*"]]}]},
// ===== space =====
{"id":"ph-space-01","lv":1,"theme":"space","en":"Is it true that ~?","ja":"〜というのは本当ですか?","tip":"聞いた話を確かめる形。Is it true that + 文? で使います。","core":[["is it true","is that true","is it really true"]],"sits":[
 {"place":"プラネタリウム","ja":"解説員に、今見えている星の中にはもう存在しないものもあるというのは本当か聞く","p":"Welcome! Do you have any questions about the stars?","model":"Is it true that some stars we see are already gone?","keys":[["star*"],["gone","dead","died","exist*","not there"]]},
 {"place":"科学館","ja":"月の模型の前で、地球からはいつも月の同じ面が見えるというのは本当か聞く","p":"This is a model of the Moon.","model":"Is it true that we always see the same side of the Moon?","keys":[["same side","one side","same face"]]},
 {"place":"友だちとの天体観測","ja":"金星を教えてもらい、金星は水星より熱いというのは本当か聞く","p":"Look, that bright one is Venus.","model":"Is it true that Venus is hotter than Mercury?","keys":[["hot*"],["mercury"]]}]},
{"id":"ph-space-02","lv":1,"theme":"space","en":"How far is ~?","ja":"〜はどのくらい遠いですか?","tip":"距離をたずねる形。How far away is ~? や How far is it to ~? とも言えます。","core":[["how far"]],"sits":[
 {"place":"プラネタリウム","ja":"アンドロメダ銀河を紹介され、地球からどのくらい離れているか聞く","p":"That's the Andromeda Galaxy.","model":"Wow. How far is it from Earth?","keys":[["earth","us","here"]]},
 {"place":"夜の散歩","ja":"月が大きく見えると言う友だちに、月は私たちからどのくらい遠いのか聞く","p":"The Moon looks so big tonight.","model":"How far is the Moon from us?","keys":[["moon"]]},
 {"place":"天文台","ja":"望遠鏡で火星が見えると言うガイドに、火星は太陽からどのくらい遠いか聞く","p":"Tonight you can see Mars through the telescope.","model":"How far is Mars from the Sun?","keys":[["mars"]]}]},
{"id":"ph-space-03","lv":1,"theme":"space","en":"I'm interested in ~.","ja":"〜に興味があります","tip":"interested in の後は名詞か ~ing。興味を伝えると話題が広がります。","core":[["interested in","i am into","fascinated by","curious about"]],"sits":[
 {"place":"天文クラブの見学","ja":"入会のきっかけを聞かれ、惑星を観察することに興味があると答える","p":"So, what brings you to our astronomy club?","model":"I'm interested in looking at planets.","keys":[["planet*"]]},
 {"place":"書店","ja":"本を探しているか聞かれ、ブラックホールに興味があると伝える","p":"Can I help you find a book?","model":"Yes, I'm interested in black holes.","keys":[["black hole*"]]},
 {"place":"職場","ja":"机の宇宙写真について同僚に聞かれ、宇宙探査に興味があると答える","p":"I saw a space photo on your desk.","model":"Yes, I'm interested in space exploration.","keys":[["space","rocket*","exploration"]]}]},
{"id":"ph-space-04","lv":2,"theme":"space","en":"I've always wondered ~.","ja":"ずっと〜が不思議でした","tip":"wondered の後に why / how / what などで始まる文を続けます。長年の疑問を切り出す形です。","core":[["always wondered","i have wondered","i wonder"]],"sits":[
 {"place":"プラネタリウム","ja":"質問の時間に、なぜ星がまたたくのかずっと不思議だったと話す","p":"Does anyone have a question?","model":"I've always wondered why stars twinkle.","keys":[["twinkl*","shine","flicker*"]]},
 {"place":"夕方の海辺","ja":"夕焼けがきれいと言う友だちに、なぜ夕方は空が赤くなるのかずっと不思議だったと話す","p":"What a beautiful sunset.","model":"I've always wondered why the sky turns red in the evening.","keys":[["red","orange"]]},
 {"place":"天文学の講座","ja":"今日のテーマが月だと聞き、月がどうやってできたのかずっと不思議だったと話す","p":"Today's topic is the Moon.","model":"I've always wondered how the Moon was formed.","keys":[["form*","made","born","created","began"]]}]},
{"id":"ph-space-05","lv":2,"theme":"space","en":"It's hard to imagine ~.","ja":"〜は想像しにくいです","tip":"スケールの大きさに驚くときに便利。It's hard to imagine how big ~. のようにも使います。","core":[["hard to imagine","difficult to imagine","can not imagine"]],"sits":[
 {"place":"プラネタリウム","ja":"太陽の幅が地球の約100倍と聞き、そんなに大きいものは想像しにくいと言う","p":"The Sun is about one hundred times wider than Earth.","model":"Wow. It's hard to imagine something that big.","keys":[["big","huge","large","size"]]},
 {"place":"講演会の帰り道","ja":"宇宙飛行士は寝袋で眠ると話す友だちに、重力なしで眠るのは想像しにくいと言う","p":"Astronauts sleep in bags on the space station.","model":"It's hard to imagine sleeping without gravity.","keys":[["gravity","float*","weight*"]]},
 {"place":"天文クラブ","ja":"何十億年もかけて届いた光の話を聞き、それほど長い時間は想像しにくいと言う","p":"Light from some galaxies traveled for billions of years to reach us.","model":"It's hard to imagine that much time.","keys":[["time","long","billion*"]]}]},
{"id":"ph-space-06","lv":2,"theme":"space","en":"Does that mean ~?","ja":"ということは〜という意味ですか?","tip":"相手の話から結論を確かめる形。So does that mean ~? とすると自然です。","core":[["does that mean","so that means","that means"]],"sits":[
 {"place":"プラネタリウム","ja":"太陽の光が地球に届くのに約8分かかると聞き、8分前の太陽を見ているということか確かめる","p":"Light from the Sun takes about eight minutes to reach Earth.","model":"Does that mean we see the Sun as it was eight minutes ago?","keys":[["eight minutes","ago","past"]]},
 {"place":"友だちとの雑談","ja":"月には空気がないと聞き、それは月では音がしないということか確かめる","p":"There's no air on the Moon.","model":"Does that mean there's no sound there?","keys":[["sound","hear","noise"]]},
 {"place":"天文学の講座","ja":"木星はほとんどガスでできていると聞き、その上には立てないということか確かめる","p":"Jupiter is mostly made of gas.","model":"Does that mean you can't stand on it?","keys":[["stand","land","walk"]]}]},
{"id":"ph-space-07","lv":3,"theme":"space","en":"What would happen if ~?","ja":"もし〜したらどうなるでしょうか?","tip":"現実ではない状況を想像する質問。What would happen if + 過去形? の形にします。","core":[["what would happen if","what would happen","what if"]],"sits":[
 {"place":"天文台","ja":"月についての質問を求められ、もし月が消えたらどうなるか聞く","p":"Any other questions about the Moon?","model":"What would happen if the Moon disappeared?","keys":[["moon"],["disappear*","gone","vanish*"]]},
 {"place":"映画館の帰り道","ja":"宇宙の映画を見た友だちと、もしブラックホールに落ちたらどうなるか話す","p":"That movie was so cool.","model":"What would happen if you fell into a black hole?","keys":[["black hole*"]]},
 {"place":"科学館","ja":"地球の自転の展示を見て、もし地球が回るのをやめたらどうなるか係員に聞く","p":"This shows how fast Earth spins.","model":"What would happen if Earth stopped spinning?","keys":[["stop*"],["spin*","rotat*","turn*"]]}]},
{"id":"ph-space-08","lv":4,"theme":"space","en":"It's amazing to think that ~.","ja":"〜だと思うとすごいことです","tip":"to think that ~ で「〜と考えると」。壮大な事実への感動を込めて言う上級表現です。","core":[["to think that","to think"]],"sits":[
 {"place":"天体観測会","ja":"かすかな光が遠い銀河だと聞き、その光が何百万年も前に出発したと思うとすごいと言う","p":"That faint light is a galaxy far, far away.","model":"It's amazing to think that the light left it millions of years ago.","keys":[["light"],["million*","billion*","year*","ago"]]},
 {"place":"友だちとの雑談","ja":"何十年も飛び続けている探査機の話を聞き、人がそんなに遠くまで行けるものを作ったと思うとすごいと言う","p":"That space probe has been flying for decades.","model":"It's amazing to think that people built something that can go so far.","keys":[["built","made","far"]]},
 {"place":"天文学の講座","ja":"体の原子は昔の星の中で作られたと聞き、私たちが星のかけらでできていると思うとすごいと言う","p":"The atoms in your body were made inside ancient stars.","model":"It's amazing to think that we're made of star stuff.","keys":[["star*"]]}]},
// ===== science =====
{"id":"ph-science-01","lv":1,"theme":"science","en":"Why does ~?","ja":"なぜ〜するのですか?","tip":"理由をたずねる基本形。主語が複数なら Why do ~?、形容詞の文なら Why is ~? になります。","core":[["why does","why do","why is","why are"]],"sits":[
 {"place":"科学館","ja":"何でも聞いてと言う係員に、なぜ氷は水に浮くのか聞く","p":"Feel free to ask me anything.","model":"Why does ice float on water?","keys":[["ice"],["float*"]]},
 {"place":"料理教室","ja":"玉ねぎを切るよう言われ、なぜ玉ねぎで涙が出るのか先生に聞く","p":"Okay, now chop the onions.","model":"Why do onions make me cry?","keys":[["onion*"],["cry","tears"]]},
 {"place":"理科の授業","ja":"空についての授業で、なぜ空は青いのか先生に聞く","p":"Today we're learning about the sky.","model":"Why is the sky blue?","keys":[["sky"],["blue"]]}]},
{"id":"ph-science-02","lv":1,"theme":"science","en":"Can you explain ~?","ja":"〜を説明してもらえますか?","tip":"explain は explain 人 ~ の形にはしません。Can you explain it to me? が正しい形です。","core":[["explain*"]],"sits":[
 {"place":"授業のあと","ja":"今日の授業がよくわからなかったので、光合成をもう一度説明してほしいと先生に頼む","p":"Did you understand today's lesson?","model":"Not really. Can you explain photosynthesis again?","keys":[["photosynthesis"]]},
 {"place":"研究室の見学","ja":"初めて見る機械を紹介され、どうやって動くのか説明してほしいと頼む","p":"This machine is called a centrifuge.","model":"Can you explain how it works?","keys":[["work*"]]},
 {"place":"理系の友だちとのカフェ","ja":"化学反応の話が難しかったので、簡単な言葉で説明してほしいと頼む","p":"Basically, it's all about chemical reactions.","model":"Can you explain that in simple words?","keys":[["simple","easy","easier","plain"]]}]},
{"id":"ph-science-03","lv":1,"theme":"science","en":"I learned that ~.","ja":"〜ということを知りました","tip":"新しく知ったことを話す形。I learned that + 文. は会話のきっかけになります。","core":[["i learned","i read","i heard"]],"sits":[
 {"place":"友だちとのランチ","ja":"面白い番組を見たか聞かれ、タコには心臓が3つあると知ったと話す","p":"Did you watch anything interesting this week?","model":"Yes, a science show. I learned that octopuses have three hearts.","keys":[["octop*"],["heart*"]]},
 {"place":"職場","ja":"科学博物館はどうだったか聞かれ、雷は太陽の表面より熱いと知ったと話す","p":"How was the science museum?","model":"Great. I learned that lightning is hotter than the surface of the Sun.","keys":[["lightning"]]},
 {"place":"自宅","ja":"今日何を読んだか家族に聞かれ、バナナはわずかに放射線を出していると知ったと話す","p":"What did you read about today?","model":"I learned that bananas are slightly radioactive.","keys":[["banana*"]]}]},
{"id":"ph-science-04","lv":2,"theme":"science","en":"What happens when ~?","ja":"〜するとどうなりますか?","tip":"実際に起きることをたずねる形。when の後は現在形。現実にない仮定なら What would happen if ~? を使います。","core":[["what happens when","what happens if"]],"sits":[
 {"place":"化学の実験教室","ja":"酢と重曹を混ぜると聞き、混ぜるとどうなるのか聞く","p":"Today we'll mix vinegar and baking soda.","model":"What happens when you mix them?","keys":[["mix*","combin*","put"]]},
 {"place":"科学館","ja":"真空の装置を紹介され、中に風船を入れるとどうなるのか聞く","p":"This is a vacuum chamber.","model":"What happens when you put a balloon inside?","keys":[["balloon"]]},
 {"place":"友だちの家のキッチン","ja":"パスタをゆでる前にお湯に塩を入れると聞き、水に塩を入れるとどうなるのか聞く","p":"I always add salt to the water before boiling pasta.","model":"What happens when you add salt to water?","keys":[["salt"]]}]},
{"id":"ph-science-05","lv":2,"theme":"science","en":"So you mean ~?","ja":"つまり〜ということですか?","tip":"相手の説明を自分の言葉で言い直して確認する形。理解が深まる質問です。","core":[["you mean","so you are saying","are you saying"]],"sits":[
 {"place":"理科の授業","ja":"音は空気より水の中のほうが速く伝わると聞き、クジラは遠くからでもお互いの声が聞こえるということか確認する","p":"Sound travels faster in water than in air.","model":"So you mean whales can hear each other from far away?","keys":[["whale*","far","hear"]]},
 {"place":"市民向けの科学講座","ja":"体の細胞は時間とともに入れ替わると聞き、肌はいつも新しくなっているということか確認する","p":"Your body replaces many of its cells over time.","model":"So you mean my skin is always renewing itself?","keys":[["skin"],["new","renew*","replac*","chang*"]]},
 {"place":"公園の散歩","ja":"植物は二酸化炭素を取り込んで酸素を出すと聞き、木が空気をきれいにしているということか確認する","p":"Plants take in carbon dioxide and give off oxygen.","model":"So you mean trees help clean the air?","keys":[["tree*","plant*"],["air","oxygen"]]}]},
{"id":"ph-science-06","lv":2,"theme":"science","en":"It's similar to ~.","ja":"それは〜に似ています","tip":"新しいことを、知っているものにたとえる表現。similar to + 名詞 の形です。","core":[["similar to","kind of like","just like"]],"sits":[
 {"place":"理科の授業","ja":"原子核のまわりを電子が回ると聞き、太陽のまわりを回る惑星に似ているのか確かめる","p":"An atom has a nucleus with electrons around it.","model":"So it's similar to the planets going around the Sun?","keys":[["planet*","sun","solar system"]]},
 {"place":"友だちとの雑談","ja":"脳は神経を通して信号を送ると聞き、電線を流れる電気に似ていると言う","p":"Our brain sends signals through nerves.","model":"It's similar to electricity in wires, right?","keys":[["electric*","wire*","cable*"]]},
 {"place":"博物館","ja":"大昔の海の生き物の化石を見て、今のカニに似ていると言う","p":"This fossil is an ancient sea creature.","model":"It looks similar to a modern crab.","keys":[["crab","shrimp","lobster"]]}]},
{"id":"ph-science-07","lv":3,"theme":"science","en":"The reason ~ is that ~.","ja":"〜の理由は〜だからです","tip":"The reason (why) ~ is that ~. で理由をていねいに説明します。because を重ねないのがポイントです。","core":[["the reason"]],"sits":[
 {"place":"友だちとの雑談","ja":"なぜ季節があるのか聞かれ、地球が傾いているからだと説明する","p":"Why do we have seasons?","model":"The reason we have seasons is that Earth is tilted.","keys":[["tilt*","angle","axis"]]},
 {"place":"職場のキッチン","ja":"出しっぱなしのパンが固くなる理由を聞かれ、水分が抜けるからだと説明する","p":"Why does bread get hard when you leave it out?","model":"The reason is that it loses water.","keys":[["water","moisture","dr*"]]},
 {"place":"親せきの集まり","ja":"葉っぱはなぜ緑なのかとおいに聞かれ、葉緑素があるからだと説明する","p":"Why are leaves green?","model":"The reason leaves are green is that they have chlorophyll.","keys":[["chlorophyll"]]}]},
{"id":"ph-science-08","lv":4,"theme":"science","en":"It's often said that ~, but actually ~.","ja":"よく〜と言われますが、実は〜です","tip":"通説と事実を対比する上級表現。科学の話で誤解を正すときに役立ちます。","core":[["its often said","it is often said","people often say","people say","they say"],["actually","in fact"]],"sits":[
 {"place":"自宅の玄関","ja":"髪がぬれたまま外に出ると風邪をひくと言われ、よくそう言われるが実は風邪はウイルスが原因だと伝える","p":"Don't go outside with wet hair. You'll catch a cold!","model":"It's often said that wet hair gives you a cold, but actually colds are caused by viruses.","keys":[["virus*"]]},
 {"place":"ペットショップの前","ja":"金魚は3秒しか覚えていないと言う友だちに、よくそう言われるが実は何か月も覚えていられると伝える","p":"Goldfish only remember things for three seconds, right?","model":"People often say that, but actually goldfish can remember things for months.","keys":[["month*","remember","long*"]]},
 {"place":"市民向けの科学講座","ja":"よくある誤解の話題で、人は脳の10%しか使っていないと言われるが実は全部使っていると話す","p":"Let's talk about some common myths.","model":"It's often said that we only use 10% of our brains, but actually we use all of it.","keys":[["brain*"]]}]},
// ===== music =====
{"id":"ph-music-01","lv":1,"theme":"music","en":"Can I try ~?","ja":"〜を試してもいいですか?","tip":"お店で試奏や試着を頼む定番。Could I try ~? だとさらに丁寧です。","core":[["can i try","could i try","may i try"]],"sits":[
 {"place":"ギターショップ","ja":"気になるものがあればと言う店員さんに、この赤いギターを試奏していいか聞く","p":"Welcome! Let me know if anything catches your eye.","model":"Can I try this red guitar?","keys":[["guitar"]]},
 {"place":"バンドの練習スタジオ","ja":"新しいエフェクターを買ったという仲間に、使わせてもらえるか聞く","p":"I just got a new pedal.","model":"Cool! Can I try your new pedal?","keys":[["pedal"]]},
 {"place":"楽器店","ja":"入荷したばかりのアンプを、少し大きい音で試していいか聞く","p":"That amp just came in this week.","model":"Can I try it with a little more volume?","keys":[["volume","louder"]]}]},
{"id":"ph-music-02","lv":1,"theme":"music","en":"My favorite ~ is ~.","ja":"私の一番好きな〜は〜です","tip":"好きなものを伝える基本形。favorite は米語のつづり(英国式は favourite)です。","core":[["favorite","favourite"]],"sits":[
 {"place":"バンドの初顔合わせ","ja":"どんな音楽が好きか聞かれ、一番好きなジャンルはロックだと答える","p":"So, what kind of music do you like?","model":"My favorite genre is rock.","keys":[["rock","blues","jazz","metal","pop","funk"]]},
 {"place":"ギター教室","ja":"影響を受けたギタリストを聞かれ、最初のコードを教えてくれたおじだと答える","p":"Which guitarist inspired you?","model":"My favorite guitarist is my uncle. He taught me my first chords.","keys":[["uncle"]]},
 {"place":"ライブハウスの出口","ja":"いいライブだったと言う友だちに、一番好きだったのは最後の曲だと話す","p":"That was a great show!","model":"Yeah, my favorite song was the last one.","keys":[["song*","tune"],["last","final"]]}]},
{"id":"ph-music-03","lv":1,"theme":"music","en":"I've just started ~ing.","ja":"〜を始めたばかりです","tip":"just + 現在完了 で「始めたばかり」。初心者だと伝えると相手が合わせてくれます。","core":[["just started","recently started","only started"]],"sits":[
 {"place":"ギター教室","ja":"ギター歴を聞かれ、弾き始めたばかりだと答える","p":"How long have you been playing?","model":"I've just started playing the guitar.","keys":[["guitar","playing"]]},
 {"place":"楽器店","ja":"弦を探しているか聞かれ、習い始めたばかりでどれを買えばいいかわからないと伝える","p":"Are you looking for strings?","model":"Yes. I've just started learning, so I'm not sure which ones to get.","keys":[["learn*","playing"]]},
 {"place":"職場","ja":"音楽好きとは知らなかったと言う同僚に、レッスンを受け始めたばかりだと話す","p":"I didn't know you liked music!","model":"I've just started taking lessons.","keys":[["lesson*","class*"]]}]},
{"id":"ph-music-04","lv":2,"theme":"music","en":"I'm looking for ~.","ja":"〜を探しています","tip":"お店で探し物を伝える定番。進行形で「今探している」ことを表します。","core":[["looking for"]],"sits":[
 {"place":"ギターショップ","ja":"声をかけてきた店員さんに、初心者向けのギターを探していると伝える","p":"Hi, can I help you?","model":"Yes, I'm looking for a beginner's guitar.","keys":[["beginner*","first","starter"]]},
 {"place":"練習スタジオのロビー","ja":"バンドを組むのかと聞かれ、ドラマーを探していると答える","p":"So you're putting a band together?","model":"Yes, I'm looking for a drummer.","keys":[["drum*"]]},
 {"place":"楽譜店","ja":"店員さんに、簡単なギター曲の楽譜集を探していると伝える","p":"Anything I can help you find?","model":"I'm looking for a book of easy guitar songs.","keys":[["song*","book","sheet music","score*"]]}]},
{"id":"ph-music-05","lv":2,"theme":"music","en":"How often do you ~?","ja":"どのくらいの頻度で〜しますか?","tip":"頻度をたずねる形。答えは once a week / every day / twice a month などです。","core":[["how often"]],"sits":[
 {"place":"ギター教室","ja":"上手になったとほめてくれた仲間に、どのくらい練習しているか聞く","p":"Your playing is getting so good.","model":"Thanks! How often do you practice?","keys":[["practic*"]]},
 {"place":"バンドのミーティング","ja":"本番前にリハーサルしようと言うメンバーに、どのくらいの頻度で集まりたいか聞く","p":"We should rehearse before the show.","model":"How often do you want to meet?","keys":[["meet","rehears*","practic*"]]},
 {"place":"ギターショップ","ja":"弦が古いと言われ、どのくらいの頻度で替えればいいか聞く","p":"Your strings look pretty old.","model":"How often should I change them?","keys":[["change*","replace*","new"]]}]},
{"id":"ph-music-06","lv":2,"theme":"music","en":"Why don't we ~?","ja":"〜しませんか?","tip":"Why don't we ~? は理由をたずねるのではなく「一緒に〜しようよ」という提案。Let's ~. より少し控えめです。","core":[["why do not we","lets","should we","how about we"]],"sits":[
 {"place":"バンドの練習","ja":"曲がまだしっくりこないと言うメンバーに、少しゆっくり演奏しようと提案する","p":"This song still doesn't sound right.","model":"Why don't we play it a little slower?","keys":[["slow*"]]},
 {"place":"友だちとの電話","ja":"今週末ギターのフェスがあると聞き、一緒に行こうと提案する","p":"There's a guitar festival this weekend.","model":"Why don't we go together?","keys":[["go","together"]]},
 {"place":"ライブ前の楽屋","ja":"緊張しているメンバーに、最初の曲をもう一度通して合わせようと提案する","p":"I'm so nervous about tonight.","model":"Why don't we run through the first song one more time?","keys":[["run through","play*","practic*"]]}]},
{"id":"ph-music-07","lv":3,"theme":"music","en":"I'm having trouble ~ing.","ja":"〜するのに苦労しています","tip":"have trouble ~ing で「〜するのが難しい」。何に困っているかを具体的に伝えられます。","core":[["having trouble","having a hard time","having difficulty","struggling"]],"sits":[
 {"place":"ギター教室","ja":"新しいコードの調子を聞かれ、全部の弦を一度に押さえるのに苦労していると答える","p":"How's the new chord coming along?","model":"I'm having trouble pressing all the strings at once.","keys":[["string*","press*"]]},
 {"place":"バンドの練習","ja":"足元ばかり見ていると言われ、ソロ中にエフェクターを切り替えるのに苦労していると答える","p":"You keep looking at your feet.","model":"I'm having trouble switching my pedals during the solo.","keys":[["pedal*","switch*"]]},
 {"place":"楽器店","ja":"ギターに問題があるか聞かれ、一番低い弦の音合わせに苦労していると伝える","p":"Is everything okay with the guitar?","model":"I'm having trouble tuning the low E string.","keys":[["tun*"]]}]},
{"id":"ph-music-08","lv":4,"theme":"music","en":"It took me ages to ~.","ja":"〜するのにすごく時間がかかりました","tip":"It took me + 時間 + to ~. で「〜するのに(時間が)かかった」。ages は「とても長い間」のくだけた言い方です。","core":[["took me"],["ages","forever","a long time","years","months","a while"]],"sits":[
 {"place":"ライブのあと","ja":"ソロが完璧だったとほめられ、覚えるのにすごく時間がかかったと答える","p":"Wow, you nailed that solo!","model":"Thanks. It took me ages to learn it.","keys":[["learn*","get it","practic*"]]},
 {"place":"ギター教室","ja":"セーハのコードがどうしてうまいのか聞かれ、きれいに鳴らせるまで何か月もかかったと答える","p":"How did you get so good at barre chords?","model":"Honestly, it took me months to play them cleanly.","keys":[["play*","clean*"]]},
 {"place":"友だちの家","ja":"自宅で録音した音がすごいとほめられ、音を整えるのにものすごく時間がかかったと答える","p":"Your home recording sounds amazing.","model":"Thanks! It took me forever to get the sound right.","keys":[["sound","mix*","record*"]]}]}
];

const P2 = [
  {"q":"Where should I put these boxes of brochures?","o":["Next to the reception desk is fine.","About two hundred copies.","Yes, they look great."],"a":0,"why":"Where(どこに)に対して「受付の横」と場所で答えているAが正解です。Bは数(いくつ)の答え、Cは疑問詞の質問にYesで答えているのでダメです。","type":"WH"},
  {"q":"Who's in charge of the client presentation on Friday?","o":["It's on the fifth floor.","I think Ms. Patel is leading it.","The present was wrapped nicely."],"a":1,"why":"Who(だれが担当)に対して人の名前で答えているBが正解です。Aは場所の答え。Cは presentation と音が似た present(プレゼント)を使ったひっかけです。","type":"WH"},
  {"q":"Why was the staff meeting moved to Thursday?","o":["We moved here last year.","For about an hour.","Didn't you see Mr. Okada's memo?"],"a":2,"why":"「岡田さんのメモを見なかったの?(そこに理由が書いてあるよ)」と、理由を直接言わずに答えるCが正解です(遠回しな答え)。Aは同じ単語 moved をくり返したひっかけ、Bは時間の長さの答えです。","type":"WH"},
  {"q":"How long does it take to get to the airport from here?","o":["About forty minutes by taxi.","Yes, it's a long flight.","At Gate 12."],"a":0,"why":"How long(どのくらい時間がかかる)に対して「タクシーで約40分」と答えるAが正解です。Bは疑問詞の質問にYesで答えていて、long をくり返したひっかけ。Cは場所の答えです。","type":"WH"},
  {"q":"What time does the store open on Sundays?","o":["It's on Main Street.","Let me check the schedule online.","I'd like to open an account."],"a":1,"why":"「ネットで営業時間を調べてみます」と、すぐに答えずに対応するBが正解です(遠回しな答え)。Aは場所の答え、Cは open を別の意味(口座を開く)でくり返したひっかけです。","type":"WH"},
  {"q":"Which supplier did we choose for the office chairs?","o":["They're very comfortable.","Please choose any seat.","The one from Lakeside Furniture."],"a":2,"why":"Which supplier(どの業者)に対して「レイクサイド家具のもの」と答えるCが正解です。Aはいすの感想で、どの業者かに答えていません。Bは choose をくり返したひっかけです。","type":"WH"},
  {"q":"How did the product launch go yesterday?","o":["Better than we expected.","It launches next month.","I'll go by train."],"a":0,"why":"How did ~ go(どうだった)に対して「思ったより良かった」と答えるAが正解です。Bは「昨日」の話なのに来月と言っていて合いません。Cは go をくり返したひっかけです。","type":"WH"},
  {"q":"Where can I find the updated sales figures?","o":["They went up by ten percent.","Mr. Chen sent them to everyone this morning.","Fine, thank you."],"a":1,"why":"「チェンさんが今朝みんなに送りましたよ(メールを見て)」と、場所を直接言わずに教えるBが正解です(遠回しな答え)。Aは数字の中身の話で、どこにあるかに答えていません。Cはあいさつへの返事です。","type":"WH"},
  {"q":"Who should I contact about the broken projector?","o":["It was projected to rise.","In Conference Room B.","Call the IT help desk at extension 204."],"a":2,"why":"Who(だれに連絡)に対して「IT ヘルプデスクの内線204へ」と連絡先を答えるCが正解です。Aは projector と音が似た projected(予測された)のひっかけ、Bは場所の答えです。","type":"WH"},
  {"q":"Why is the parking lot closed today?","o":["They're repaving it.","Close to the station.","Until six o'clock."],"a":0,"why":"Why(なぜ)に対して「舗装し直しているから」と理由を答えるAが正解です。Bは closed と音が似た close(近い)のひっかけ、Cはいつまでかの答えです。","type":"WH"},
  {"q":"How many people have signed up for the workshop?","o":["Sign here, please.","I haven't checked the list yet.","It's a two-day workshop."],"a":1,"why":"「まだ名簿を確認していません」と、人数を知らないことを伝えるBが正解です(遠回しな答え)。Aは signed と似た sign、Cは workshop をくり返したひっかけです。","type":"WH"},
  {"q":"When is the deadline for the budget proposal?","o":["About fifty thousand dollars.","I proposed it last week.","It's due at the end of the month."],"a":2,"why":"When(いつ)に対して「月末が締め切り」と時期を答えるCが正解です。Aは金額の答え、Bは proposal と似た proposed のひっかけです。","type":"WH"},
  {"q":"Have you finished reviewing the contract?","o":["Almost. I just have one page left.","The contact list is on my desk.","Yes, a two-year contract."],"a":0,"why":"「もう少し。あと1ページです」と進み具合を答えるAが正解です。Bは contract と音が似た contact のひっかけ。CはYesのあとが「2年契約」で、読み終えたかどうかに答えていません。","type":"YN"},
  {"q":"Is Ms. Rivera coming to the training session?","o":["The train leaves at nine.","She's out of town this week.","Yes, it was a long session."],"a":1,"why":"「今週は出張(町にいない)です」と、来られないことを遠回しに伝えるBが正解です。Aは training と音が似た train、Cは session をくり返し、しかも過去の話なので合いません。","type":"YN"},
  {"q":"Do you know where the spare keys are kept?","o":["Yes, keep the change.","The key point is cost.","In the top drawer of my desk."],"a":2,"why":"「机のいちばん上の引き出しです」と場所を教えるCが正解です。Aは kept と似た keep、Bは key を別の意味(大事な点)で使ったひっかけです。","type":"YN"},
  {"q":"Did the shipment from Denver arrive?","o":["Yes, it came in an hour ago.","No, I've never been to Denver.","It's a large ship."],"a":0,"why":"「はい、1時間前に届きました」と答えるAが正解です。Bは Denver をくり返していますが、荷物の話ではありません。Cは shipment と似た ship(船)のひっかけです。","type":"YN"},
  {"q":"Are we still meeting with the clients at three?","o":["Yes, I met them at the station.","Three copies, please.","They asked to push it back to four."],"a":2,"why":"「先方が4時に遅らせてほしいと言っています」と、予定の変更を伝えるCが正解です(Yes/Noを言わない遠回しな答え)。Aは過去の話、Bは three をくり返したひっかけです。","type":"YN"},
  {"q":"Is there a pharmacy near the hotel?","o":["The hotel has a pool.","There's one right across the street.","Near the end of the year."],"a":1,"why":"「道のすぐ向かいにありますよ」と答えるBが正解です(one = a pharmacy)。Aは hotel、Cは near をくり返したひっかけです。","type":"YN"},
  {"q":"Will you be able to finish the report by tomorrow?","o":["I'll need a couple more days.","Yes, I read the report.","The finish line is over there."],"a":0,"why":"「あと2、3日必要です」と、明日はむずかしいことを遠回しに伝えるAが正解です。Bは過去の話で質問に合わず、Cは finish をくり返したひっかけです。","type":"YN"},
  {"q":"Would you like to sit by the window or near the aisle?","o":["Yes, I'd like that.","The window seat, please.","It was a nice view."],"a":1,"why":"「AかBか」の質問には、どちらかを選ぶBが正解です。選択の質問にYesで答えるAはダメです。Cは景色の感想で、選んでいません。","type":"選択"},
  {"q":"Should we hold the party in the cafeteria or rent a restaurant?","o":["Yes, it was a great party.","I'll have the pasta.","The cafeteria would save us money."],"a":2,"why":"「社員食堂ならお金が節約できます」と理由つきで片方を選ぶCが正解です。Aは選択の質問にYesで答えていて、しかも過去の話。Bは restaurant から連想させる料理の注文です。","type":"選択"},
  {"q":"Are you taking the train or driving to the conference?","o":["I haven't decided yet.","Yes, the conference was useful.","He's a good driver."],"a":0,"why":"「まだ決めていません」と答えるAが正解です。どちらも選ばない答え方もTOEICではよく正解になります。Bは conference をくり返したひっかけ、Cは driving と似た driver で、主語の He もおかしいです。","type":"選択"},
  {"q":"Do you want the report printed, or should I email it to you?","o":["Yes, the printer's fixed.","Email is fine, thanks.","It's a twenty-page report."],"a":1,"why":"「メールでいいです」と片方を選ぶBが正解です。Aは printed と似た printer、Cは report をくり返したひっかけです。","type":"選択"},
  {"q":"Is the seminar on Tuesday or Wednesday?","o":["Yes, I'll be there.","It's a seminar on marketing.","It's listed on the company calendar."],"a":2,"why":"「会社のカレンダーに載っていますよ(見てね)」と、どこで確かめられるかを伝えるCが正解です(遠回しな答え)。Aは選択の質問にYes、Bは seminar と on をくり返していますが曜日に答えていません。","type":"選択"},
  {"q":"Could you help me move these tables after lunch?","o":["Sure, just let me know when.","We had lunch at noon.","The movie was too long."],"a":0,"why":"Could you ~?(〜してくれますか)というお願いに「いいですよ、時間を教えて」と引き受けるAが正解です。Bは lunch をくり返し、Cは move と音が似た movie のひっかけです。","type":"依頼・提案"},
  {"q":"Why don't we order some food for the team tonight?","o":["Because the order was late.","That's a great idea.","The team won the game."],"a":1,"why":"Why don't we ~?は「〜しませんか」という提案です。「いい考えですね」と賛成するBが正解です。Why につられて Because で答えるAは定番のひっかけ。Cは team をくり返しています。","type":"依頼・提案"},
  {"q":"Would you mind reviewing my slides before the meeting?","o":["It was a positive review.","The meeting room is booked.","I'm free after two o'clock."],"a":2,"why":"「2時以降なら空いています(そのときに見ますよ)」と、引き受けることを遠回しに伝えるCが正解です。Aは review、Bは meeting をくり返したひっかけです。","type":"依頼・提案"},
  {"q":"Can you send me the client's phone number?","o":["I'll text it to you right now.","The phone is new.","A number of clients."],"a":0,"why":"「今すぐメッセージで送ります」と引き受けるAが正解です。Bは phone、Cは number と client をくり返したひっかけです。","type":"依頼・提案"},
  {"q":"Let's take a short break before we continue.","o":["It's a long story.","Can we finish this section first?","The brakes were repaired."],"a":1,"why":"「休けいしよう」という提案に「先にこの部分を終わらせませんか」と別の案を返すBが正解です(遠回しな答え)。Aは short の反対の long で連想させるひっかけ、Cは break と同じ音の brakes(ブレーキ)です。","type":"依頼・提案"},
  {"q":"How about meeting at the café across from the office?","o":["I'd like a coffee, please.","It's about two hours.","That works for me."],"a":2,"why":"How about ~?(〜はどう?)という提案に「それでいいですよ」と答えるCが正解です。Aは café から連想させる注文、Bは about をくり返したひっかけです。","type":"依頼・提案"},
  {"q":"The copy machine on the third floor is out of paper again.","o":["I'll bring some from the supply room.","Three copies each.","It's not on the floor."],"a":0,"why":"「紙がない」という報告に「備品室から持ってきます」と対応するAが正解です(some = some paper)。Bは copy と third(three)、Cは floor をくり返したひっかけです。","type":"平叙文"},
  {"q":"I can't find the file for the Harmon account.","o":["I'll open an account.","Kenji was using it this morning.","I'll file a complaint."],"a":1,"why":"「今朝ケンジさんが使っていましたよ」と、ありかのヒントを伝えるBが正解です(遠回しな答え)。Aは account、Cは file を別の意味(苦情を申し立てる)でくり返したひっかけです。","type":"平叙文"},
  {"q":"The flight to Chicago has been delayed by two hours.","o":["It's a short flight.","Two tickets to Chicago.","Then we'll miss the opening session."],"a":2,"why":"「2時間遅れる」に対して「じゃあ開会のセッションに間に合わないね」と、その結果を話すCが自然です。Aは flight、Bは two と Chicago をくり返したひっかけです。","type":"平叙文"},
  {"q":"Our sales numbers improved a lot this quarter.","o":["The new ad campaign really helped.","A quarter past nine.","The numbers are on the door."],"a":0,"why":"「売上が伸びた」に対して「新しい広告が効いたね」と理由を返すAが正解です。Bは quarter を別の意味(15分)で、Cは numbers をくり返したひっかけです。","type":"平叙文"},
  {"q":"I think the heating isn't working in this room.","o":["It was a heated debate.","Maintenance is already on the way.","Room service, please."],"a":1,"why":"「暖房が動いていない」に対して「修理の人がもう向かっています」と答えるBが正解です(遠回しな答え)。Aは heating と似た heated(白熱した)、Cは room をくり返したひっかけです。","type":"平叙文"},
  {"q":"Isn't the bank closed on national holidays?","o":["The river bank is beautiful.","There's a holiday sale.","Yes, so we'll have to go tomorrow."],"a":2,"why":"Isn't ~?(〜じゃないの?)は「閉まっているよね」という確認です。「うん、だから明日行かないとね」と答えるCが正解です。Aは bank を別の意味(川岸)で、Bは holiday をくり返したひっかけです。","type":"否定・付加"},
  {"q":"You've met our new marketing director, haven't you?","o":["Yes, at last week's dinner.","The market opens at eight.","She directed the movie."],"a":0,"why":"「会ったことあるよね?」に「はい、先週の夕食会で」と答えるAが正解です。Bは marketing と似た market、Cは director と似た directed のひっかけです。","type":"否定・付加"},
  {"q":"Didn't Mr. Lopez say he'd call back this afternoon?","o":["In the back of the room.","He's still in a meeting.","Yes, call me back."],"a":1,"why":"「午後に折り返すと言ってなかった?」に「まだ会議中なんです(だから電話がない)」と事情を伝えるBが正解です(遠回しな答え)。Aは back、Cは call back をくり返したひっかけです。","type":"否定・付加"},
  {"q":"This software update is free, isn't it?","o":["I'm free on Friday.","The date was updated.","Yes, it's included in our license."],"a":2,"why":"「無料だよね?」に「はい、ライセンスに含まれています」と答えるCが正解です。Aは free を別の意味(ひま)で、Bは update と似た updated をくり返したひっかけです。","type":"否定・付加"},
  {"q":"Shouldn't we have received the invoice by now?","o":["I'll call the vendor to check.","Yes, she has a nice voice.","By the front door."],"a":0,"why":"「もう請求書が届いているはずでは?」に「業者に電話して確認します」と対応するAが正解です(遠回しな答え)。Bは invoice と音が似た voice、Cは by をくり返した場所の答えです。","type":"否定・付加"}
];

const P3 = [
  {"title":"会議室の予約","lines":[
    {"s":"W","en":"Hi, Daniel. I'm trying to reserve Conference Room A for Thursday morning, but the system says it's already taken."},
    {"s":"M","en":"Yeah, the sales team booked it for their quarterly review. How many people are coming to your meeting?"},
    {"s":"W","en":"Just five, including two visitors from Brightwell Consulting."},
    {"s":"M","en":"Then Room C should be big enough. It has a new video screen, too."},
    {"s":"W","en":"Oh, that's perfect. We'll be showing a short product demo."},
    {"s":"M","en":"I'll change the booking for you now. Just remember to return the remote to the front desk afterward."}
  ],"ja":"女性: こんにちは、ダニエル。木曜の午前に会議室Aを予約しようとしているんですが、システムでは「もう予約済み」になっているんです。\n男性: ええ、営業チームが四半期の報告会で押さえています。あなたの会議には何人来ますか?\n女性: 5人だけです。ブライトウェル・コンサルティングからのお客さま2人を含めて。\n男性: それなら会議室Cで十分な広さですよ。新しいビデオスクリーンもありますし。\n女性: まあ、ぴったりです。短い製品デモを見せる予定なので。\n男性: では今、予約を変更しておきますね。終わったらリモコンを受付に返すのだけ忘れないでください。",
  "qs":[
    {"q":"What are the speakers mainly discussing?","o":["A product demonstration that failed","Finding a space for a meeting","Hiring a consulting firm","Repairing a video screen"],"a":1,"why":"会議室Aが使えないので、代わりの部屋を探している会話です。「会議の場所を見つけること」が正解。デモは「失敗した」とは言っていません。"},
    {"q":"Who will attend the woman's meeting?","o":["Members of the sales team","Some new employees","People from another company","The front desk staff"],"a":2,"why":"visitors from Brightwell Consulting(別の会社からの訪問者)を「他社の人たち」と言いかえたCが正解です。営業チームは会議室Aを使う人たちなのでひっかけです。"},
    {"q":"What does the man ask the woman to do?","o":["Print a meeting agenda","Contact the visitors","Cancel her reservation","Return a piece of equipment"],"a":3,"why":"最後に「リモコンを受付に返して」と頼んでいます。remote(リモコン)を a piece of equipment(機器)と言いかえたDが正解です。"}
  ]},
  {"title":"お店で在庫切れ","lines":[
    {"s":"M","en":"Excuse me, I'm looking for the SoundLeaf wireless headphones in black. I saw them on your website."},
    {"s":"W","en":"I'm sorry, we sold the last black pair this morning. We do have them in silver, though."},
    {"s":"M","en":"Hmm, I really wanted black. They're a gift for my brother."},
    {"s":"W","en":"I understand. I can order a pair from our other branch. They'd arrive here by Saturday."},
    {"s":"M","en":"Saturday's a little late. His birthday's on Friday."},
    {"s":"W","en":"In that case, we could ship them directly to your home. Shipping is free for orders over fifty dollars, and they'd get there on Thursday."},
    {"s":"M","en":"Great, let's do that."}
  ],"ja":"男性: すみません、サウンドリーフのワイヤレスヘッドホンの黒を探しています。そちらのウェブサイトで見たんです。\n女性: 申し訳ありません、黒の最後の1つは今朝売れてしまいました。シルバーならございますが。\n男性: うーん、どうしても黒がよかったんです。弟へのプレゼントなので。\n女性: わかりました。別の支店から1つ取り寄せることができます。こちらには土曜日までに届きます。\n男性: 土曜日だと少し遅いんです。弟の誕生日は金曜日なので。\n女性: それでしたら、ご自宅へ直接お送りできます。50ドル以上のご注文は送料無料で、木曜日に届きます。\n男性: いいですね、それでお願いします。",
  "qs":[
    {"q":"Where does the conversation most likely take place?","o":["At a post office","At an electronics store","At a birthday party","At a shipping company"],"a":1,"why":"ヘッドホンの在庫や支店からの取り寄せを話しているので、電器店での会話です。birthday や ship は会話に出てくる単語を使ったひっかけです。"},
    {"q":"Why does the man say, \"Saturday's a little late\"?","o":["He will be busy on the weekend.","He wants a refund.","He needs the item before a certain date.","He thinks the store closes early."],"a":2,"why":"直後に「誕生日は金曜日」と言っています。つまり「金曜より前に必要だ」という意味なのでCが正解です。"},
    {"q":"What will the woman most likely do next?","o":["Arrange a home delivery","Show the man a silver pair","Call the man's brother","Give the man a discount"],"a":0,"why":"ship them directly to your home(自宅へ直接送る)を home delivery(自宅配送)と言いかえたAが正解です。男性は黒がほしいので、シルバーを見せるBは合いません。"}
  ]},
  {"title":"出張のフライト欠航","lines":[
    {"s":"M","en":"Ms. Ito, I just got an email from the airline. Our flight to Seattle on Monday has been canceled."},
    {"s":"W","en":"Oh no. We're supposed to give our presentation at the trade show on Tuesday at ten."},
    {"s":"M","en":"There's an evening flight on Sunday with seats available. Would that work?"},
    {"s":"W","en":"I'd rather not travel on the weekend, but I guess we have no choice."},
    {"s":"M","en":"I'll book it, then. Should I also add an extra night at the hotel?"},
    {"s":"W","en":"Yes, please. And let the organizers know we'll be arriving early, in case they need us for a rehearsal."}
  ],"ja":"男性: 伊藤さん、今航空会社からメールが来ました。月曜日のシアトル行きの便が欠航になったそうです。\n女性: ええっ。火曜日の10時に見本市で発表することになっているのに。\n男性: 日曜日の夜の便なら空席があります。それで大丈夫ですか?\n女性: 週末に移動するのはできれば避けたいけれど、ほかに方法がないですね。\n男性: では予約します。ホテルも1泊追加しましょうか?\n女性: はい、お願いします。それと、リハーサルで私たちが必要になるかもしれないので、早めに着くことを主催者に伝えておいてください。",
  "qs":[
    {"q":"What problem does the man mention?","o":["A hotel is fully booked.","A presentation has been postponed.","A flight is no longer available.","A trade show has changed locations."],"a":2,"why":"canceled(欠航になった)を no longer available(もう利用できない)と言いかえたCが正解です。発表の延期やホテル満室の話は出てきません。"},
    {"q":"What does the woman imply when she says, \"I guess we have no choice\"?","o":["She wants the man to choose the hotel.","She thinks the trade show should be canceled.","She has not decided on a presentation topic.","She will accept a plan she does not prefer."],"a":3,"why":"「週末の移動は避けたい」と言ったあとに「ほかに方法がない」と続けています。気が進まないけれど日曜の便を受け入れる、という意味なのでDが正解です。choice と choose の音につられたAはひっかけです。"},
    {"q":"What does the woman ask the man to do?","o":["Prepare presentation slides","Contact the event organizers","Rent a car in Seattle","Request a refund from the airline"],"a":1,"why":"最後に let the organizers know(主催者に知らせて)と頼んでいます。これを「イベント主催者に連絡する」と言いかえたBが正解です。"}
  ]},
  {"title":"新入社員の研修計画","lines":[
    {"s":"W","en":"Okay, I wanted to talk about the training schedule for the three new hires starting next week."},
    {"s":"M","en":"Right. I've reserved the computer lab for Monday and Tuesday so they can learn our accounting software."},
    {"s":"M2","en":"I can lead those sessions. But I'll be at a client's office on Wednesday morning."},
    {"s":"W","en":"That's fine. On Wednesday, they'll be shadowing the customer service team anyway."},
    {"s":"M","en":"Should we give them their laptops before Monday?"},
    {"s":"W","en":"Good idea. Could you ask IT to have them set up by Friday?"},
    {"s":"M","en":"Sure. I'll send them a request this afternoon."}
  ],"ja":"女性: では、来週から入社する3人の新人の研修スケジュールについて話したいと思います。\n男性: はい。月曜と火曜にパソコン室を予約しました。うちの会計ソフトを覚えてもらうためです。\n男性2: その講習は私が担当できます。ただ、水曜の午前は取引先のオフィスに行っています。\n女性: 大丈夫です。水曜日はどのみち、カスタマーサービスチームについて仕事を見学してもらう予定なので。\n男性: ノートパソコンは月曜より前に渡したほうがいいでしょうか?\n女性: いい考えですね。金曜までに設定を済ませておくよう、IT部に頼んでもらえますか?\n男性: わかりました。今日の午後に依頼を送っておきます。",
  "qs":[
    {"q":"What is the conversation mainly about?","o":["Choosing new accounting software","Hiring customer service staff","Repairing computers in a lab","Planning training for new employees"],"a":3,"why":"最初に the training schedule for the three new hires(新人3人の研修予定)と言っています。new hires を new employees と言いかえたDが正解です。会計ソフトは「選ぶ」話ではありません。"},
    {"q":"What will happen on Wednesday?","o":["The new employees will take a test.","The new employees will observe another team.","The computer lab will be cleaned.","A client will visit the office."],"a":1,"why":"shadowing(ついて回って仕事を見て学ぶ)を observe(見学する)と言いかえたBが正解です。水曜に取引先へ行くのは男性2で、取引先が来るわけではないのでDはひっかけです。"},
    {"q":"What does one of the men say he will do this afternoon?","o":["Lead a training session","Visit a client","Contact the IT department","Buy new laptops"],"a":2,"why":"最後に「今日の午後にIT部へ依頼を送る」と言っています。それを「IT部門に連絡する」と言いかえたCが正解です。講習は月曜と火曜、取引先訪問は水曜です。"}
  ]},
  {"title":"イベントの弁当注文の変更","lines":[
    {"s":"W","en":"Hi, this is Hannah Kim from Oakridge Events. I'm calling about the lunch order for the charity fundraiser on May third."},
    {"s":"M","en":"Yes, Ms. Kim. We have you down for one hundred twenty sandwich boxes."},
    {"s":"W","en":"Actually, that's why I'm calling. More people have registered than we expected, so we'll need one hundred fifty."},
    {"s":"M","en":"That shouldn't be a problem. Do any of the additional guests have dietary restrictions?"},
    {"s":"W","en":"About ten of them have asked for vegetarian meals."},
    {"s":"M","en":"Okay. I'll update the order and send you a revised invoice by the end of the day."}
  ],"ja":"女性: こんにちは、オークリッジ・イベンツのハンナ・キムです。5月3日のチャリティー募金イベントのランチの注文についてお電話しました。\n男性: はい、キムさま。サンドイッチボックス120個でご注文を承っています。\n女性: 実はそのことでお電話したんです。予想より多くの人が申し込んだので、150個必要になりました。\n男性: 問題ないと思います。追加のお客さまの中に、食事の制限がある方はいらっしゃいますか?\n女性: 10人ほどがベジタリアンの食事を希望しています。\n男性: わかりました。注文内容を更新して、今日中に修正した請求書をお送りします。",
  "qs":[
    {"q":"Why is the woman calling?","o":["To cancel an event","To ask for a refund","To book a new venue","To change the size of an order"],"a":3,"why":"120個から150個に増やしたいと伝えています。「注文の量を変えるため」のDが正解です。"},
    {"q":"According to the woman, what has happened?","o":["Attendance will be higher than planned.","The event date has been changed.","Some guests canceled their registrations.","A payment was sent to the wrong account."],"a":0,"why":"More people have registered than we expected(予想より多くが申し込んだ)を「参加者が予定より多くなる」と言いかえたAが正解です。Cは反対の内容です。"},
    {"q":"What does the man say he will send?","o":["A menu","A list of guests","An updated bill","A delivery schedule"],"a":2,"why":"a revised invoice(修正した請求書)を an updated bill(更新された請求書)と言いかえたCが正解です。"}
  ]},
  {"title":"共有ドライブにつながらない","lines":[
    {"s":"M","en":"Sandra, is your computer connecting to the shared drive? Mine keeps showing an error message."},
    {"s":"W","en":"No, mine isn't either. I think the whole floor is having the same problem."},
    {"s":"M","en":"That's bad timing. I need to send the final design files to the printer by noon."},
    {"s":"W","en":"Have you tried saving them to a USB drive? The computers in the library on the second floor use a different network."},
    {"s":"M","en":"Oh, good thinking. I'll head down there right now."},
    {"s":"W","en":"And I'll call the help desk and let them know what's going on."}
  ],"ja":"男性: サンドラ、あなたのパソコンは共有ドライブにつながってる? ぼくのはエラーメッセージが出続けているんだ。\n女性: いいえ、私のもつながらない。フロア全体で同じ問題が起きているみたい。\n男性: タイミングが悪いな。お昼までに最終デザインのファイルを印刷会社に送らないといけないんだ。\n女性: USBメモリに保存してみた? 2階の資料室のパソコンは別のネットワークを使っているわよ。\n男性: ああ、いい考えだね。今すぐ下に行ってくるよ。\n女性: 私はヘルプデスクに電話して、状況を伝えておくわ。",
  "qs":[
    {"q":"What problem are the speakers discussing?","o":["A printer is out of ink.","They cannot access shared files.","A design was rejected by a client.","The library is closed for repairs."],"a":1,"why":"共有ドライブにつながらない、という問題です。それを「共有ファイルにアクセスできない」と言いかえたBが正解です。printer(印刷会社)はひっかけです。"},
    {"q":"Why does the man say, \"That's bad timing\"?","o":["He has an urgent deadline.","He arrived late to work.","He missed a meeting.","He is about to go on vacation."],"a":0,"why":"直後に「お昼までにファイルを送らないといけない」と言っています。急ぎの締め切りがあるから困っているので、Aが正解です。"},
    {"q":"What will the woman most likely do next?","o":["Go to the second floor","Buy a USB drive","Send files to a printing company","Report a problem"],"a":3,"why":"女性は「ヘルプデスクに電話して状況を伝える」と言っています。これを「問題を報告する」と言いかえたDが正解です。2階へ行くのは男性なのでAはひっかけです。"}
  ]},
  {"title":"新しいオフィス選び","lines":[
    {"s":"W","en":"Mr. Fischer, I've looked at the two office spaces downtown that you suggested."},
    {"s":"M","en":"Great. What did you think?"},
    {"s":"W","en":"The one on Elm Street is bright and has plenty of room, but it's a fifteen-minute walk from the subway."},
    {"s":"M","en":"And the one on Harbor Avenue?"},
    {"s":"W","en":"It's smaller, but it's right next to the station, and the rent is lower. Since most of our staff commute by train, I'd go with that one."},
    {"s":"M","en":"Makes sense. I'll call the property manager and see if we can sign the lease next week."}
  ],"ja":"女性: フィッシャーさん、ご提案いただいた中心街の2つのオフィスを見てきました。\n男性: よかった。どうでしたか?\n女性: エルム通りのほうは明るくて広さも十分ですが、地下鉄から歩いて15分かかります。\n男性: ハーバー通りのほうは?\n女性: そちらは狭いですが、駅のすぐ隣で、家賃も安いです。社員のほとんどが電車で通勤しているので、私はそちらにします。\n男性: なるほど。物件の管理者に電話して、来週に賃貸契約を結べるか聞いてみます。",
  "qs":[
    {"q":"What are the speakers trying to decide?","o":["Where to move their office","When to hire new staff","How to reduce train fares","Which property manager to hire"],"a":0,"why":"2つのオフィス物件を比べて、どちらにするかを話しています。「オフィスをどこへ移すか」のAが正解です。"},
    {"q":"What is mentioned as an advantage of the Harbor Avenue space?","o":["It has more space.","It gets more sunlight.","It has a parking garage.","It is less expensive."],"a":3,"why":"the rent is lower(家賃が安い)を less expensive(費用が安い)と言いかえたDが正解です。「広い」「明るい」はエルム通りの物件の長所なのでひっかけです。"},
    {"q":"What does the woman suggest about the company's employees?","o":["They prefer working from home.","Most of them use public transportation.","Many of them live downtown.","They want a larger break room."],"a":1,"why":"most of our staff commute by train(社員の多くが電車通勤)を「ほとんどが公共交通機関を使う」と言いかえたBが正解です。"}
  ]},
  {"title":"ホテルのチェックイン","lines":[
    {"s":"M","en":"Hi, I'm checking in. The reservation is under Gordon Blake."},
    {"s":"W","en":"Welcome, Mr. Blake. I see you're staying with us for three nights. I'm afraid your room won't be ready until two o'clock."},
    {"s":"M","en":"Oh, I was hoping to change before a meeting at one."},
    {"s":"W","en":"I understand. Our fitness center has a locker room with showers that you're welcome to use. And we can keep your luggage at the front desk."},
    {"s":"M","en":"That would be very helpful. Thanks."},
    {"s":"W","en":"Here's a pass for the fitness center. It's on the lower level, past the elevators."}
  ],"ja":"男性: こんにちは、チェックインをお願いします。予約はゴードン・ブレイクの名前です。\n女性: ようこそ、ブレイクさま。3泊のご滞在ですね。申し訳ございませんが、お部屋のご用意は2時までできません。\n男性: ああ、1時の会議の前に着替えたかったんですが。\n女性: かしこまりました。当ホテルのフィットネスセンターにシャワー付きの更衣室がございますので、ご自由にお使いください。お荷物はフロントでお預かりできます。\n男性: それはとても助かります。ありがとう。\n女性: こちらがフィットネスセンターの利用証です。エレベーターを過ぎた地下の階にございます。",
  "qs":[
    {"q":"Where does the woman most likely work?","o":["At a fitness club","At a hotel","At an airport","At a clothing store"],"a":1,"why":"チェックイン、3泊、部屋の準備、フロントなどの言葉から、ホテルで働いているとわかります。fitness center はホテルの中の施設なのでAはひっかけです。"},
    {"q":"Why does the man say, \"I was hoping to change before a meeting at one\"?","o":["To ask for a different room","To cancel his meeting","To request a later checkout","To explain why the delay is a problem"],"a":3,"why":"部屋が2時まで使えないと言われたあとの発言です。「1時の会議の前に着替えたかった」と、部屋の準備が遅いと困る理由を説明しているのでDが正解です。"},
    {"q":"What does the woman give the man?","o":["A room key","A map of the city","A pass to use a facility","A meal voucher"],"a":2,"why":"最後に a pass for the fitness center(フィットネスセンターの利用証)を渡しています。これを「施設を使うための利用証」と言いかえたCが正解です。部屋はまだ準備中なので、鍵(A)は渡していません。"}
  ]},
  {"title":"顧客アンケートの結果","lines":[
    {"s":"M","en":"Thanks for joining me. I wanted to go over the results of last month's customer survey."},
    {"s":"W","en":"Sure. I noticed that a lot of people said our online checkout process takes too long."},
    {"s":"W2","en":"Yes, and several mentioned they'd like more payment options, like mobile wallets."},
    {"s":"M","en":"Both good points. Elena, how long would it take your team to simplify the checkout page?"},
    {"s":"W","en":"Probably about three weeks, if we start right away."},
    {"s":"M","en":"Okay. Let's aim to launch the new version before the holiday shopping season. I'll present the plan to the director on Monday."}
  ],"ja":"男性: 集まってくれてありがとう。先月の顧客アンケートの結果を確認したいと思います。\n女性: はい。オンラインの購入手続きに時間がかかりすぎる、という声が多かったですね。\n女性2: ええ、それにモバイルウォレットなど、支払い方法をもっと増やしてほしいという声もいくつかありました。\n男性: どちらもいい指摘だね。エレナ、きみのチームで購入手続きのページを簡単にするのにどのくらいかかる?\n女性: すぐに始めれば、たぶん3週間くらいです。\n男性: よし。年末商戦の前に新しいバージョンを公開することを目標にしよう。月曜日に部長にこの計画を説明するよ。",
  "qs":[
    {"q":"What are the speakers discussing?","o":["Feedback from customers","A new store opening","Results of a sales contest","Hiring a web designer"],"a":0,"why":"customer survey(顧客アンケート)の結果について話しています。それを Feedback from customers(お客さまからの意見)と言いかえたAが正解です。"},
    {"q":"What did some customers request?","o":["Faster delivery","Additional ways to pay","Lower prices","A mobile phone repair service"],"a":1,"why":"more payment options(もっと多くの支払い方法)を Additional ways to pay と言いかえたBが正解です。mobile という同じ単語を使ったDはひっかけです。"},
    {"q":"What will the man do on Monday?","o":["Launch a new website","Conduct another survey","Begin a holiday sale","Share a plan with a supervisor"],"a":3,"why":"I'll present the plan to the director(部長に計画を説明する)を「上司に計画を共有する」と言いかえたDが正解です。新しいバージョンの公開は年末商戦の前なのでAは合いません。"}
  ]},
  {"title":"注文品の納品遅れ","lines":[
    {"s":"M","en":"Hi, Ms. Duarte. This is Victor from Northline Packaging. I'm afraid there's going to be a delay with your box order."},
    {"s":"W","en":"Oh, what happened?"},
    {"s":"M","en":"One of our machines broke down yesterday, and the replacement part won't arrive until Wednesday."},
    {"s":"W","en":"Hmm. We were planning to ship our new line of teas to stores next Friday."},
    {"s":"M","en":"I understand. We can send half of your order by Monday from our other factory, and the rest by Thursday."},
    {"s":"W","en":"Well, I suppose half would be enough to get started. Let's do that."}
  ],"ja":"男性: こんにちは、ドゥアルテさん。ノースライン包装のビクターです。申し訳ないのですが、箱のご注文が遅れることになりそうです。\n女性: まあ、何があったんですか?\n男性: 昨日、機械の1台が故障しまして、交換部品が水曜日まで届かないんです。\n女性: うーん。来週の金曜日に、新しい紅茶シリーズを店舗に出荷する予定だったんですが。\n男性: わかります。もう一つの工場から、ご注文の半分を月曜日までに、残りを木曜日までにお送りできます。\n女性: そうですね、始めるには半分あれば足りると思います。それでお願いします。",
  "qs":[
    {"q":"Why is the man calling?","o":["To promote a new product","To report a delay in an order","To ask for payment","To schedule a factory tour"],"a":1,"why":"最初に「箱の注文が遅れる」と伝えています。それを「注文の遅れを報告するため」と表したBが正解です。新商品(紅茶)は女性の会社の話なのでAはひっかけです。"},
    {"q":"What caused the problem?","o":["Some equipment stopped working.","A shipment was lost.","A worker was injured.","A store closed."],"a":0,"why":"One of our machines broke down(機械が故障した)を Some equipment stopped working(機器が動かなくなった)と言いかえたAが正解です。"},
    {"q":"What does the woman mean when she says, \"I suppose half would be enough to get started\"?","o":["She wants to cancel half of the order.","She thinks the price is too high.","She will accept a partial delivery.","She needs more time to decide."],"a":2,"why":"「半分あれば始められる。それでお願いします」と言っているので、注文の一部だけ先に届くこと(partial delivery)を受け入れるという意味です。Cが正解。半分を取り消すわけではないのでAはひっかけです。"}
  ]}
];

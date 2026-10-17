const GRAM1 = [
{"id":"g01","lv":1,"t":"文の型(SV/SVC/SVO/SVOO/SVOC)","sub":"英語は「だれが→どうする→なにを」の順番","cat":"文の基本",
 "img":"英語は<b>「だれが→どうする→なにを」</b>の順番がいのちです。日本語は「私は 毎朝 コーヒーを 飲む」と動詞が最後ですが、英語は<span class=\"mk\">主語のすぐ後に動詞</span>が来ます。電車の連結のように、車両(単語)の並び順を入れかえると意味が変わってしまいます。",
 "rule":["S(主語)+V(動詞)が骨組み。英語では主語のすぐ後に動詞が来ます。","SVC: S=Cの関係。She is a nurse.(彼女=看護師)。be動詞・become・look・seem などを使います。","SVO: SがOを〜する。I like music.","SVOO: 人にモノを〜する。give / send / show / tell + 人 + モノ。","SVOC: OをCにする・OがCだとわかる。make / keep / call / find + O + C(O=Cの関係)。"],
 "ex":[
  {"en":"The meeting started at nine.","ja":"会議は9時に始まりました。","note":"SV。at nine は「おまけ」(修飾語)"},
  {"en":"Ms. Patel looks tired today.","ja":"パテルさんは今日、疲れているように見えます。","note":"SVC。Ms. Patel = tired"},
  {"en":"Could you send me the file?","ja":"そのファイルを私に送ってもらえますか?","note":"SVOO。send + 人(me) + モノ(the file)"},
  {"en":"The news made everyone happy.","ja":"その知らせで、みんなが幸せな気持ちになりました。","note":"SVOC。everyone = happy"}
 ],
 "trap":"日本語の感覚で名詞を並べるだけにしがちです。「私は学生」は I a student ではなく I am a student. と、主語の後に必ず動詞を置きましょう。また look や sound の後には形容詞(happy)が来ます。副詞(happily)ではありません。",
 "talk":{"en":"You look great today!","ja":"今日はすてきですね!"},
 "build":[
  {"ja":"彼は私に地図を見せてくれました。","en":"He showed me the map."},
  {"ja":"窓を開けたままにしておいてください。","en":"Please keep the window open."},
  {"ja":"その計画はおもしろそうですね。","en":"The plan sounds interesting."}
 ],
 "q":[
  {"s":"The new manager seems very ____.","c":["kindly","kind","kindness","kinds"],"a":1,"why":"seem は「〜のようだ」で、後ろにC(様子を表す形容詞)をとるSVCの動詞。形容詞の kind が正解。kindly は副詞、kindness は名詞です。"},
  {"s":"Ms. Chen ____ us the results of the survey yesterday.","c":["explained","said","talked","showed"],"a":3,"why":"空所の後ろに us(人)と the results(モノ)が並ぶSVOOの形。これができるのは show。explain や say は explain the results to us のように to が必要です。"},
  {"s":"Please keep the door ____ during the inspection.","c":["closed","close","closely","closing"],"a":0,"why":"keep O C で「OをCの状態に保つ」。ドアは「閉められた」状態なので過去分詞の closed。closely は副詞で、Cには入りません。"},
  {"s":"The committee ____ Mr. Grant the new team leader.","c":["agreed","decided","named","approved"],"a":2,"why":"Mr. Grant = the new team leader の関係(SVOC)。name O C で「OをCに任命する」。agree・decide・approve はこの形をとれません。"},
  {"s":"The customer's comments made our staff ____.","c":["happily","happiness","happy","to happy"],"a":2,"why":"make O C で「OをCにする」。our staff = happy の関係なので形容詞の happy。副詞の happily は C になれません。"},
  {"s":"The price of the tickets ____ every year.","c":["rises","raises","raising","rise"],"a":0,"why":"後ろに目的語がないので「上がる」の自動詞 rise。主語 price は3人称単数なので rises。raise は「〜を上げる」で目的語が必要です。"},
  {"s":"Our sales team found the new software very ____ to use.","c":["easily","ease","easiness","easy"],"a":3,"why":"find O C で「OがCだとわかる」。the new software = easy の関係なので形容詞の easy。easily は副詞なので C には入りません。"},
  {"s":"Could you ____ me the name of the hotel?","c":["say","tell","speak","talk"],"a":1,"why":"me(人)と the name(モノ)が並ぶSVOO。tell 人 モノ の形がとれるのは tell。say は say to me のように to が必要です。"}
 ]
},
{"id":"g02","lv":1,"t":"現在形と現在進行形","sub":"プロフィール写真と、動画の一時停止","cat":"時制",
 "img":"現在形は<b>「いつもの習慣・変わらない事実」</b>で、プロフィール写真のようなものです。一方、現在進行形(be + -ing)は<span class=\"mk\">動画の一時停止</span>。「今まさにこの場面が動いている途中」を切り取ります。I work in Tokyo. は自己紹介、I'm working now. は「今まさに作業中」です。",
 "rule":["現在形: 習慣・くり返し・変わらない事実。主語が3人称単数(he / she / it など)なら動詞に -s。","現在進行形: am / is / are + -ing で「今〜している最中」。","now, right now, at the moment, currently は進行形のサイン。every day, usually, always は現在形のサイン。","know, like, want, belong など「状態」を表す動詞は、ふつう進行形にしません。","進行形は「一時的に〜している」も表せます。I'm staying at a hotel this week."],
 "ex":[
  {"en":"I usually take the train to work.","ja":"ふだんは電車で通勤しています。","note":"usually = 習慣なので現在形"},
  {"en":"She is talking on the phone right now.","ja":"彼女は今、電話中です。","note":"right now = 今まさに"},
  {"en":"This store opens at ten.","ja":"この店は10時に開きます。","note":"決まった事実・スケジュール"},
  {"en":"We are currently looking for a new designer.","ja":"現在、新しいデザイナーを探しています。","note":"currently = 一時的に今進行中"}
 ],
 "trap":"「知っています」「(車を)持っています」を I'm knowing や I'm having a car としがちですが、know や have(持っている)は状態の動詞なので I know / I have a car. です。また He work ではなく He works. と -s を忘れないようにしましょう。",
 "talk":{"en":"What do you do for a living?","ja":"お仕事は何をされていますか?"},
 "build":[
  {"ja":"彼は毎朝ジョギングをします。","en":"He jogs every morning."},
  {"ja":"私は今、昼ごはんを食べています。","en":"I am eating lunch now."},
  {"ja":"この本は私の姉のものです。","en":"This book belongs to my sister."}
 ],
 "q":[
  {"s":"Mr. Tanaka usually ____ to work by bus.","c":["go","going","goes","is go"],"a":2,"why":"usually(ふだん)は習慣のサインなので現在形。主語 Mr. Tanaka は3人称単数なので goes です。"},
  {"s":"Please be quiet. The manager ____ a phone call right now.","c":["is taking","takes","took","take"],"a":0,"why":"right now(今まさに)は進行中の動作のサイン。現在進行形 is taking が正解です。"},
  {"s":"Ms. Rivera ____ the answer to your question.","c":["is knowing","are knowing","knowing","knows"],"a":3,"why":"know(知っている)は状態を表す動詞なので、ふつう進行形にしません。3人称単数の現在形 knows が正解です。"},
  {"s":"The shuttle bus ____ every 20 minutes from the hotel.","c":["is leave","leaves","leaving","are leaving"],"a":1,"why":"every 20 minutes(20分ごと)は決まったくり返しなので現在形。主語 bus は単数なので leaves です。"},
  {"s":"Our team ____ on a new marketing plan at the moment.","c":["work","is working","works","have work"],"a":1,"why":"at the moment(今のところ・ちょうど今)は進行形のサイン。team は1つのまとまりとして is で受け、is working となります。"},
  {"s":"This laptop ____ to the IT department, so please don't take it home.","c":["belong","is belonging","are belonging","belongs"],"a":3,"why":"belong to(〜のものである)は状態の動詞なので進行形にしません。主語 laptop は単数なので belongs です。"},
  {"s":"Water ____ at 100 degrees Celsius.","c":["boils","is boiling","boiling","boil"],"a":0,"why":"「水は100度で沸騰する」はいつでも変わらない事実なので現在形。主語 water は単数扱いなので boils です。"},
  {"s":"Look! It ____ outside. Take an umbrella.","c":["rains","rain","is raining","rained"],"a":2,"why":"Look!(見て!)は、今目の前で起きていることのサイン。現在進行形 is raining が正解です。"}
 ]
},
{"id":"g03","lv":1,"t":"過去形と過去進行形","sub":"終わった出来事の写真と、過去で一時停止した動画","cat":"時制",
 "img":"過去形は<b>もう終わった出来事を1枚の写真に撮ったもの</b>です。過去進行形(was / were + -ing)は、<span class=\"mk\">過去のある瞬間で動画を一時停止</span>した場面。「電話が鳴った(写真)とき、私はシャワーを浴びていた(一時停止した動画)」のように、2つを組み合わせると場面が生き生きします。",
 "rule":["過去形: 過去に終わったこと。yesterday, last week, 〜 ago, in 2020 などがサイン。","規則動詞は -ed(worked)、不規則動詞は形が変わります(go → went, buy → bought)。","過去進行形: was / were + -ing で「(その時)〜している最中だった」。","when + 過去形(短い出来事)と、while + 過去進行形(続いていた動作)の組み合わせがよく出ます。"],
 "ex":[
  {"en":"I visited my grandmother last Sunday.","ja":"先週の日曜日に祖母を訪ねました。","note":"last Sunday = 終わった過去"},
  {"en":"We were having lunch when the boss called.","ja":"上司から電話があったとき、私たちは昼食を食べていました。","note":"続いていた動作 + 短い出来事"},
  {"en":"The company opened its first store ten years ago.","ja":"その会社は10年前に1号店を開きました。","note":"〜 ago は過去形のサイン"},
  {"en":"While I was waiting for the bus, it started to rain.","ja":"バスを待っている間に雨が降り出しました。","note":"while + 過去進行形"}
 ],
 "trap":"「〜前に」の ago を現在完了と一緒に使う間違い(I have visited it two years ago.)が多いです。ago, yesterday, last 〜 など「過去の一点」を示す語があれば過去形にしましょう。",
 "talk":{"en":"What did you do last weekend?","ja":"先週末は何をしましたか?"},
 "build":[
  {"ja":"私は昨日、新しいかばんを買いました。","en":"I bought a new bag yesterday."},
  {"ja":"彼女はそのときテレビを見ていました。","en":"She was watching TV at that time."},
  {"ja":"私たちは3年前に出会いました。","en":"We met three years ago."}
 ],
 "q":[
  {"s":"Ms. Kim ____ the report to her manager yesterday afternoon.","c":["sends","sent","has sent","will send"],"a":1,"why":"yesterday afternoon(昨日の午後)は過去の一点なので過去形 sent。現在完了 has sent は yesterday と一緒に使えません。"},
  {"s":"When I arrived at the office, my coworkers ____ a meeting.","c":["have","are having","has","were having"],"a":3,"why":"When I arrived(私が着いたとき)という過去の瞬間に「会議をしている最中だった」ので過去進行形 were having です。"},
  {"s":"The factory ____ production two weeks ago.","c":["stopped","stops","has stopped","is stopping"],"a":0,"why":"two weeks ago(2週間前)は過去形のサイン。ago は現在完了と一緒に使えないので stopped です。"},
  {"s":"Mr. Silva hurt his back while he ____ some heavy boxes.","c":["carries","carry","was carrying","is carrying"],"a":2,"why":"hurt(痛めた)は過去の出来事。while(〜している間)の中は、その時続いていた動作なので過去進行形 was carrying です。"},
  {"s":"Greenfield Corp. ____ its new product line at a trade show last month.","c":["introduces","has introduced","will introduce","introduced"],"a":3,"why":"last month(先月)は過去の一点なので過去形 introduced。has introduced は last month と一緒に使えません。"},
  {"s":"I ____ dinner when you called me last night, so I couldn't answer.","c":["was cooking","am cooking","cook","have cooked"],"a":0,"why":"when you called me last night(昨夜電話をくれたとき)という過去の瞬間に「料理している最中だった」ので過去進行形です。"},
  {"s":"Our sales ____ by 15 percent in 2023.","c":["increase","have increased","increased","are increasing"],"a":2,"why":"in 2023 は終わった過去の年なので過去形 increased。現在完了は「in + 過去の年」と一緒に使えません。"},
  {"s":"At 3 p.m. yesterday, the staff ____ for the client's visit.","c":["prepare","were preparing","are preparing","have prepared"],"a":1,"why":"At 3 p.m. yesterday(昨日の午後3時に)は過去の一瞬。その瞬間に進行中だった動作なので過去進行形 were preparing です。"}
 ]
},
{"id":"g04","lv":1,"t":"未来の言い方(will / be going to / 現在進行形の予定)","sub":"未来は「気持ちの温度」で選ぶ","cat":"時制",
 "img":"未来の言い方は<b>「気持ちの温度」</b>で選びます。will は<span class=\"mk\">その場で決めた未来・予想</span>(「じゃあ、私がやります!」)。be going to は<span class=\"mk\">前から心が向かっている未来</span>で、もう矢印が未来に向いているイメージ。現在進行形は、手帳にもう書き込んである予定です。",
 "rule":["will + 動詞の原形: その場で決めたこと・予想・申し出。","be going to + 動詞の原形: 前から決めていた予定・はっきりした兆しがある予想。","現在進行形(be + -ing)+ 未来の時: 日時や相手まで決まっている予定。","時や条件を表す when / if / as soon as / until の中では、未来のことでも現在形を使います。"],
 "ex":[
  {"en":"It's cold. I'll close the window.","ja":"寒いですね。窓を閉めますね。","note":"その場で決めた → will"},
  {"en":"I'm going to study abroad next year.","ja":"来年、留学するつもりです。","note":"前から決めていた計画"},
  {"en":"We're meeting the client at two tomorrow.","ja":"明日2時にお客様と会う予定です。","note":"手帳に書いた予定 → 進行形"},
  {"en":"I'll call you as soon as I arrive.","ja":"着いたらすぐに電話します。","note":"as soon as の中は現在形"}
 ],
 "trap":"「明日雨が降ったら」を If it will rain tomorrow とするのはよくある間違いです。if や when の中は現在形で If it rains tomorrow とします。「未来なのに現在形」と覚えておきましょう。",
 "talk":{"en":"I'll have the same, please.","ja":"私も同じものをお願いします。"},
 "build":[
  {"ja":"週末に映画を見に行くつもりです。","en":"I'm going to see a movie this weekend."},
  {"ja":"私があなたのかばんを持ちますよ。","en":"I'll carry your bag for you."},
  {"ja":"彼女は来週パリへ飛ぶ予定です。","en":"She is flying to Paris next week."}
 ],
 "q":[
  {"s":"Please wait here until Mr. Brown ____ back from lunch.","c":["comes","will come","came","coming"],"a":0,"why":"until(〜まで)は時を表す接続詞。その中では未来のことでも現在形を使うので comes です。"},
  {"s":"Look at those dark clouds. It ____ rain.","c":["is","will be","is going to","has"],"a":2,"why":"dark clouds(黒い雲)というはっきりした兆しがある予想なので be going to。後ろが原形 rain なので is going to rain となります。"},
  {"s":"If the weather ____ good tomorrow, the outdoor event will be held as planned.","c":["will be","was","being","is"],"a":3,"why":"if(もし〜なら)の中は、tomorrow の話でも現在形を使います。主語 weather は単数なので is です。"},
  {"s":"A: The printer is out of paper. B: I ____ get some from the supply room.","c":["am","will","was","have"],"a":1,"why":"紙切れを聞いて「じゃあ私が取ってきます」とその場で決めた申し出なので will。後ろの get が原形なのもヒントです。"},
  {"s":"We ____ the Greenfield Corp. team at 10 a.m. tomorrow.","c":["met","have met","are meeting","meets"],"a":2,"why":"tomorrow の10時と日時が決まった予定は、現在進行形で表せます。met や have met は過去・完了なので tomorrow と合いません。"},
  {"s":"As soon as the contract ____ signed, we will start the project.","c":["will be","is","was","being"],"a":1,"why":"as soon as(〜したらすぐに)は時を表す接続詞なので、中は未来のことでも現在形。「契約が署名される」は受動態 is signed です。"},
  {"s":"Ms. Patel ____ give a presentation at next week's conference.","c":["is going to","is going","going to","goes to"],"a":0,"why":"next week's conference の予定。be going to + 動詞の原形の形がそろっているのは is going to だけです。"},
  {"s":"The sales report ____ ready by the end of the day.","c":["is being","was","has been","will be"],"a":3,"why":"by the end of the day(今日の終わりまでに)は未来の話なので will be。was や has been は過去・完了で未来を表せません。"}
 ]
},
{"id":"g05","lv":2,"t":"現在完了","sub":"過去から今までつながる矢印","cat":"時制",
 "img":"現在完了(have + 過去分詞)は<b>過去から今までつながる矢印</b>です。過去形が「過去にポツンと置いた点」なのに対し、現在完了は<span class=\"mk\">矢印の先が今に届いている</span>のがポイント。「経験(今までに〜したことがある)」「完了(ちょうど・もう〜した)」「継続(ずっと〜している)」は、どれも今の自分とつながった話です。",
 "rule":["形: have / has + 過去分詞。否定は have not、疑問は Have you 〜?","経験: ever, never, before, once, 〜 times がサイン。","完了: just, already, yet(疑問文・否定文で)がサイン。","継続: for + 期間、since + 始まった時点 がサイン。","現在完了進行形 have been + -ing: 「ずっと〜し続けている」と動作の継続を強調します。"],
 "ex":[
  {"en":"I have lived in Osaka for ten years.","ja":"大阪に10年住んでいます。","note":"for + 期間で「継続」"},
  {"en":"Have you ever tried Thai food?","ja":"タイ料理を食べたことはありますか?","note":"ever で「経験」"},
  {"en":"The train has just left.","ja":"電車はちょうど出たところです。","note":"just で「完了」"},
  {"en":"She has been working on the report since this morning.","ja":"彼女は今朝からずっと報告書に取り組んでいます。","note":"動作が今も続いている → 現在完了進行形"}
 ],
 "trap":"yesterday や last year、〜 ago など「過去の一点」を示す語とは一緒に使えません。I have seen him yesterday. は誤りで、I saw him yesterday. が正解です。矢印ではなく「点」の話だからです。",
 "talk":{"en":"Have you ever been to Kyoto?","ja":"京都に行ったことはありますか?"},
 "build":[
  {"ja":"このメールをもう読みましたか?","en":"Have you read this email yet?"},
  {"ja":"私は一度も海外に行ったことがありません。","en":"I have never been abroad."},
  {"ja":"彼は2015年からここで働いています。","en":"He has worked here since 2015."}
 ],
 "q":[
  {"s":"Mr. Kato ____ at this company since 2018.","c":["works","worked","has worked","is working"],"a":2,"why":"since 2018(2018年から今まで)は「継続」のサインなので現在完了 has worked です。"},
  {"s":"The client ____ already approved the budget.","c":["has","is","was","does"],"a":0,"why":"already(もう)は「完了」のサイン。approved(過去分詞)の前に置いて現在完了を作れるのは has だけです。"},
  {"s":"Ms. Lee ____ to Singapore three times on business.","c":["is","has been","was been","have been"],"a":1,"why":"three times(3回)は「経験」のサイン。have been to で「〜へ行ったことがある」。主語は3人称単数なので has been です。"},
  {"s":"We ____ for the bus for 30 minutes, and it still hasn't come.","c":["wait","are waiting","waited","have been waiting"],"a":3,"why":"for 30 minutes(30分間)待ち続けて、今も待っている状態なので現在完了進行形 have been waiting です。"},
  {"s":"Sales of the product ____ steadily over the past five years.","c":["have risen","rise","raise","are rising"],"a":0,"why":"over the past five years(この5年間で)は、過去から今までの期間を表すので現在完了。主語 Sales は複数なので have risen です。"},
  {"s":"Mr. Wong ____ the company two years ago.","c":["has joined","has been joining","joins","joined"],"a":3,"why":"two years ago(2年前)は過去の一点。ago は現在完了と一緒に使えないので過去形 joined です。"},
  {"s":"This is the most exciting movie I ____.","c":["ever see","was seeing","have ever seen","am seeing"],"a":2,"why":"「今までに見た中でいちばん」は、過去から今までの経験の話。最上級 + I have ever seen の形がよく使われます。"},
  {"s":"How long ____ you known Ms. Garcia?","c":["are","have","did","do"],"a":1,"why":"known は過去分詞。How long(どのくらいの間)と合わせて「継続」をたずねる現在完了の疑問文なので have です。"}
 ]
},
{"id":"g06","lv":3,"t":"過去完了と未来完了","sub":"矢印を過去や未来にずらす","cat":"時制",
 "img":"過去完了(had + 過去分詞)は、現在完了の矢印を<b>まるごと過去にずらしたもの</b>です。「駅に着いたとき(過去の基準点)、電車はもう出ていた(それより前)」のように、<span class=\"mk\">過去のある時点より前</span>を表します。未来完了(will have + 過去分詞)は逆に矢印のゴールを未来に置き、「その時までには〜し終えているだろう」を表します。",
 "rule":["過去完了: had + 過去分詞。過去の基準点より前に起きたこと、その時までの経験や継続。","when + 過去形 / by the time + 過去形 と組み合わせることが多いです。","未来完了: will have + 過去分詞。「(未来のある時)までに〜し終えているだろう」。","by + 未来の時(by next Friday)や by the time + 現在形 が未来完了のサイン。","had been + -ing / will have been + -ing で、動作の継続を強調できます。"],
 "ex":[
  {"en":"When I got to the station, the train had already left.","ja":"駅に着いたとき、電車はもう出ていました。","note":"着いた時点より前に出発"},
  {"en":"She had never seen snow before she moved to Hokkaido.","ja":"北海道に引っ越すまで、彼女は雪を見たことがありませんでした。","note":"過去の時点までの経験"},
  {"en":"I will have finished the report by noon.","ja":"正午までには報告書を書き終えているでしょう。","note":"by noon = 未来の締め切り"},
  {"en":"By next April, he will have worked here for 20 years.","ja":"来年の4月で、彼はここに20年勤めたことになります。","note":"未来の時点までの継続"}
 ],
 "trap":"過去完了は「過去の基準点」があってはじめて使えます。また by the time の後ろは、未来のことでも現在形です(By the time you arrive, ...)。will を入れないよう注意しましょう。",
 "talk":{"en":"I had never heard of it until today.","ja":"今日まで聞いたこともありませんでした。"},
 "build":[
  {"ja":"私が起きたとき、彼はもう出かけていました。","en":"He had already left when I woke up."},
  {"ja":"金曜日までにはそれを終えているでしょう。","en":"I will have finished it by Friday."},
  {"ja":"彼女は以前にその映画を見たことがありました。","en":"She had seen the movie before."}
 ],
 "q":[
  {"s":"By the time the manager arrived, the meeting ____.","c":["already starts","has already started","is already starting","had already started"],"a":3,"why":"By the time the manager arrived(部長が着いた時までに)は過去の基準点。それより前に始まっていたので過去完了 had already started です。"},
  {"s":"By the end of next month, we ____ all the new equipment.","c":["installed","will have installed","have installed","had installed"],"a":1,"why":"By the end of next month(来月末までに)は未来の締め切り。その時までに終えているので未来完了 will have installed です。"},
  {"s":"Ms. Ito ____ in sales for ten years before she became a manager.","c":["had worked","has worked","works","will have worked"],"a":0,"why":"before she became a manager(部長になる前)という過去の時点までの10年間の継続なので、過去完了 had worked です。"},
  {"s":"By the time you ____ this email, I will have left the office.","c":["will read","will have read","read","had read"],"a":2,"why":"by the time(〜する時までに)は時を表す接続詞なので、未来のことでも中は現在形。read(現在形)が正解です。"},
  {"s":"The client said that he ____ our proposal the day before.","c":["receives","had received","has received","will receive"],"a":1,"why":"said(言った)という過去の時点より前の「前日に」受け取っていたので、過去完了 had received です。"},
  {"s":"By 2030, the company ____ its business to ten countries.","c":["expanded","had expanded","has expanded","will have expanded"],"a":3,"why":"By 2030(2030年までに)は未来の時点。それまでに完了しているはずのことなので未来完了 will have expanded です。"},
  {"s":"I didn't recognize Mr. Hall because I ____ him before.","c":["never meet","have never met","had never met","will never meet"],"a":2,"why":"didn't recognize(わからなかった)という過去の時点までに「一度も会ったことがなかった」経験なので過去完了 had never met です。"},
  {"s":"By the time the construction is completed, the city ____ more than $5 million on the project.","c":["will have spent","had spent","spent","has spent"],"a":0,"why":"By the time the construction is completed(工事が終わる時までに)は未来の時点(中は現在形)。それまでに使い終えている額なので未来完了です。"}
 ]
},
{"id":"g07","lv":1,"t":"助動詞(can / must / have to / should / may / will・would)","sub":"動詞に気持ちのスパイスをふりかける","cat":"助動詞",
 "img":"助動詞は動詞に<b>「気持ちのスパイス」</b>をふりかけるものです。can は「できる」、must は「絶対!」、should は「〜したほうがいいよ」というアドバイス、may は「〜してもよい・〜かもしれない」。<span class=\"mk\">助動詞の後ろは必ず動詞の原形</span>というルールさえ守れば、あとは味付けを選ぶだけです。",
 "rule":["助動詞 + 動詞の原形。主語が he / she でも -s はつけません(He can swim.)。","must = 「〜しなければならない」(話し手の強い気持ち)。have to = 「(ルールや状況で)〜しなければならない」。","must not = 「〜してはいけない」(禁止)。don't have to = 「〜しなくてもよい」(不要)。意味がまったく違います。","should = 「〜したほうがいい・〜すべき」。may = 「〜してもよい・〜かもしれない」。","Will you 〜? より Would you 〜? / Could you 〜? のほうが丁寧なお願いになります。"],
 "ex":[
  {"en":"Can you speak Chinese?","ja":"中国語を話せますか?","note":"can = 能力"},
  {"en":"You must not use your phone during the test.","ja":"試験中に携帯電話を使ってはいけません。","note":"must not = 禁止"},
  {"en":"You don't have to bring anything.","ja":"何も持ってこなくて大丈夫ですよ。","note":"don't have to = 不要"},
  {"en":"Could you check this document for me?","ja":"この書類を確認していただけますか?","note":"Could you 〜? で丁寧なお願い"}
 ],
 "trap":"must not(禁止)と don't have to(しなくてよい)を同じ意味だと思いがちです。「しなくていいよ」と言いたいのに must not を使うと「してはいけない」になってしまいます。また He can swims. のように -s をつけないようにしましょう。",
 "talk":{"en":"Could you say that again, please?","ja":"もう一度言っていただけますか?"},
 "build":[
  {"ja":"あなたは医者に診てもらったほうがいいです。","en":"You should see a doctor."},
  {"ja":"ここで写真を撮ってもいいですか?","en":"May I take a picture here?"},
  {"ja":"明日は早く起きなければなりません。","en":"I have to get up early tomorrow."}
 ],
 "q":[
  {"s":"Mr. Davis can ____ three languages.","c":["speaks","speak","speaking","to speak"],"a":1,"why":"助動詞 can の後ろは必ず動詞の原形。主語が3人称単数でも -s はつけないので speak です。"},
  {"s":"Employees ____ wear their ID badges at all times in the building.","c":["has to","must to","must","musts"],"a":2,"why":"主語 Employees は複数なので has to は不可。must の後ろは to なしの原形で、must に -s もつきません。"},
  {"s":"The event is free, so you ____ pay anything.","c":["don't have to","must not","have to","must"],"a":0,"why":"free(無料)なので「払わなくてよい」という不要の意味。don't have to です。must not だと「払ってはいけない」になります。"},
  {"s":"____ you please tell me the way to the station?","c":["Could","Are","May","Have"],"a":0,"why":"「〜していただけますか」と相手に丁寧に頼むときは Could you 〜?。May は May I 〜? のように自分が許可を求めるときに使います。"},
  {"s":"Smoking is strictly prohibited. Visitors ____ smoke anywhere on the factory grounds.","c":["don't have to","need","may","must not"],"a":3,"why":"strictly prohibited(厳しく禁止)とあるので「吸ってはいけない」。禁止を表す must not が正解です。"},
  {"s":"You look tired. You ____ go home and get some rest.","c":["must not","should","cannot","had not"],"a":1,"why":"You look tired(疲れているね)に続くのは「帰って休んだほうがいい」というアドバイス。should が正解です。"},
  {"s":"The weather report says it ____ snow tonight, so drive carefully.","c":["may","will to","should to","can to"],"a":0,"why":"天気予報の内容なので「降るかもしれない」という推量の may。will・should・can などの助動詞の後ろに to はつきません。"},
  {"s":"____ I use this meeting room this afternoon?","c":["Am","Have","May","Does"],"a":2,"why":"後ろが原形 use なので助動詞が必要。「使ってもいいですか」と許可を求める May I 〜? が正解です。"}
 ]
},
{"id":"g08","lv":3,"t":"助動詞 + have + 過去分詞","sub":"タイムマシンで過去をふり返る","cat":"助動詞",
 "img":"助動詞 + have + 過去分詞は、<b>タイムマシンで過去をふり返る形</b>です。今の自分が過去を見て、「〜すべきだったのに(後悔)」「〜したにちがいない(確信)」「〜したかもしれない(推測)」と気持ちをつけます。<span class=\"mk\">have + 過去分詞が「過去へのワープ」</span>の役目をしていると考えましょう。",
 "rule":["should have + 過去分詞: 〜すべきだったのに(実際はしなかった)。後悔・非難。","must have + 過去分詞: 〜したにちがいない。強い確信。","may / might have + 過去分詞: 〜したかもしれない。","can't / couldn't have + 過去分詞: 〜したはずがない。","could have + 過去分詞: 〜できたのに(しなかった)。"],
 "ex":[
  {"en":"I should have left home earlier.","ja":"もっと早く家を出るべきでした。","note":"後悔"},
  {"en":"He must have missed the train.","ja":"彼は電車に乗り遅れたにちがいありません。","note":"強い確信"},
  {"en":"She might have forgotten about the meeting.","ja":"彼女は会議のことを忘れたのかもしれません。","note":"推測"},
  {"en":"You can't have seen Mr. Ford yesterday. He was in London.","ja":"昨日フォードさんを見たはずがありません。彼はロンドンにいたのです。","note":"ありえない"}
 ],
 "trap":"should have + 過去分詞には「実際にはしなかった」という意味が隠れています。「(これから)〜したほうがいい」は should + 原形、「〜すべきだった」は should have + 過去分詞と、時間の向きで使い分けましょう。会話では should've(シュダヴ)と縮まって聞こえます。",
 "talk":{"en":"You should have told me earlier!","ja":"もっと早く言ってくれればよかったのに!"},
 "build":[
  {"ja":"私はもっと一生懸命勉強すべきでした。","en":"I should have studied harder."},
  {"ja":"彼は道に迷ったにちがいありません。","en":"He must have gotten lost."},
  {"ja":"彼女はそのことを知っていたかもしれません。","en":"She may have known about it."}
 ],
 "q":[
  {"s":"The streets are wet. It ____ rained last night.","c":["must have","should","must","can't have"],"a":0,"why":"道がぬれている(今の証拠)から「昨夜雨が降ったにちがいない」と過去を確信しています。must have + 過去分詞です。should rained や must rained は形がまちがいです。"},
  {"s":"I failed the test. I ____ more.","c":["should studied","must have studied","can't have studied","should have studied"],"a":3,"why":"failed(落ちた)とあるので「もっと勉強すべきだった」という後悔。should have + 過去分詞 です。should studied は形がまちがいです。"},
  {"s":"Ms. Diaz ____ the report by herself. It is 200 pages long, and she only started this morning.","c":["must have written","should have written","has written","can't have written"],"a":3,"why":"200ページもあり今朝始めたばかりなので「一人で書いたはずがない」。can't have + 過去分詞 が正解です。"},
  {"s":"We ____ the earlier flight, but we decided to stay one more night.","c":["can't have taken","could have taken","must have taken","should take"],"a":1,"why":"but we decided to stay(でも泊まることにした)とあるので「早い便に乗ることもできたのに(乗らなかった)」。could have + 過去分詞 です。"},
  {"s":"Mr. Ross isn't at his desk. He ____ gone home early.","c":["should","must","may have","can't"],"a":2,"why":"空所の後ろが gone(過去分詞)なので、助動詞 + have の形が必要。選択肢でこの形は may have だけで「早退したのかもしれない」となります。"},
  {"s":"You ____ the client so many personal questions. She looked uncomfortable.","c":["shouldn't have asked","must have asked","can't have asked","should ask"],"a":0,"why":"She looked uncomfortable(居心地が悪そうだった)とあるので「あんなに聞くべきではなかった」という非難。shouldn't have + 過去分詞 です。"},
  {"s":"I can't find my key. I ____ left it in the taxi.","c":["can","might have","must","would"],"a":1,"why":"鍵が見つからない状況で「タクシーに置き忘れたかもしれない」という推測。後ろが left(過去分詞)なので might have が入ります。"},
  {"s":"The package ____ arrived yet. I sent it only this morning from Osaka.","c":["must have","should have","may","can't have"],"a":3,"why":"今朝送ったばかりなので「まだ届いたはずがない」。否定の推量 can't have + 過去分詞 です。yet は否定の文で使うので、肯定の must have や should have とは合いません。"}
 ]
},
{"id":"g09","lv":2,"t":"受動態","sub":"カメラを「される側」に向ける","cat":"態",
 "img":"受動態(be + 過去分詞)は<b>カメラの向きを変える</b>ことです。能動態は「する側」にカメラを向け、受動態は<span class=\"mk\">「される側」を主役にして撮る</span>。「多くの人がこの歌を歌う」を「この歌は多くの人に歌われている」と言いかえると、主役が歌に変わります。だれがしたかが重要でないときに特に便利です。",
 "rule":["形: be動詞 + 過去分詞 で「〜される・〜されている」。","する人を言うときは by 〜。言う必要がなければ省略します。","時制は be動詞で表します: is made / was made / will be made / has been made / is being made。","by 以外の前置詞: be interested in, be known for, be covered with, be satisfied with など。","TOEICのコツ: 空所の後ろに目的語(名詞)があれば能動態、なければ受動態が基本です。"],
 "ex":[
  {"en":"English is spoken in many countries.","ja":"英語は多くの国で話されています。","note":"する人(人々)は言わなくてもわかる"},
  {"en":"This bridge was built in 1990.","ja":"この橋は1990年に建てられました。","note":"過去の受動態は was + 過去分詞"},
  {"en":"The meeting room is being cleaned now.","ja":"会議室は今、掃除されているところです。","note":"is being + 過去分詞 = 進行形の受動態"},
  {"en":"The mountain is covered with snow.","ja":"その山は雪でおおわれています。","note":"by 以外の前置詞"}
 ],
 "trap":"「される側」が主語なのに能動態のままにしてしまうミスが多いです。The package delivered yesterday. ではなく The package was delivered yesterday. のように、be動詞を忘れないようにしましょう。",
 "talk":{"en":"Is this seat taken?","ja":"この席は空いていますか?(だれか座っていますか?)"},
 "build":[
  {"ja":"この写真は私の父が撮りました。","en":"This photo was taken by my father."},
  {"ja":"私はアートに興味があります。","en":"I am interested in art."},
  {"ja":"その会議は延期されました。","en":"The meeting was postponed."}
 ],
 "q":[
  {"s":"The new software ____ by our IT team last week.","c":["installed","installs","was installed","was installing"],"a":2,"why":"ソフトは「インストールされる」側で、後ろに by our IT team(する人)があります。last week なので過去の受動態 was installed です。"},
  {"s":"All employees are required to ____ the training session.","c":["be attended","attend","attending","attended"],"a":1,"why":"to の後ろは動詞の原形。後ろに目的語 the training session があり、社員が「出席する」側なので能動の attend です。"},
  {"s":"The museum is well known ____ its collection of modern art.","c":["by","to","with","for"],"a":3,"why":"be known for 〜 で「〜で有名だ」。有名な理由を表すときは for を使います。"},
  {"s":"Ms. Grant ____ the new marketing plan at yesterday's meeting.","c":["presented","is presented","is presenting","has been presented"],"a":0,"why":"後ろに目的語 the new marketing plan があり、グラントさんが「発表する」側なので能動態。yesterday's meeting なので過去形 presented です。"},
  {"s":"Your order ____ within three business days.","c":["will deliver","will be delivered","delivers","is delivering"],"a":1,"why":"注文品は「配達される」側で、後ろに目的語がありません。これからのことなので未来の受動態 will be delivered です。"},
  {"s":"The conference room ____ right now, so we'll meet in the lobby.","c":["is cleaning","cleans","cleaned","is being cleaned"],"a":3,"why":"部屋は「掃除される」側で、right now(今まさに)進行中。進行形の受動態 is being cleaned です。"},
  {"s":"Customers who are not satisfied ____ the product can return it within 30 days.","c":["with","at","on","by"],"a":0,"why":"be satisfied with 〜 で「〜に満足している」。by ではなく with を使う決まった組み合わせです。"},
  {"s":"Several new employees ____ since the beginning of the year.","c":["hired","have hired","have been hired","were hiring"],"a":2,"why":"社員は「雇われる」側で、後ろに目的語がありません。since(〜以来)があるので現在完了の受動態 have been hired です。"}
 ]
},
{"id":"g10","lv":2,"t":"不定詞(to + 動詞の原形)","sub":"to は「これからやること」への矢印","cat":"準動詞",
 "img":"to + 動詞の原形は<b>「→(矢印)これからやること」</b>のイメージです。to はもともと「〜へ向かう」という意味。I want to go. は「行くことに気持ちが向かっている」ということ。<span class=\"mk\">to の矢印は名詞・形容詞・副詞のどこにでもつなげられる</span>ので、3つの用法があるのです。",
 "rule":["名詞的用法「〜すること」: I want to travel. / My goal is to pass the test.","形容詞的用法「〜するための・〜すべき」: something to drink, time to go。","副詞的用法「〜するために(目的)」「〜して(感情の原因)」: I came here to study. / I'm glad to see you.","形容詞 + enough to 〜「〜するのに十分…」、too … to 〜「…すぎて〜できない」。","want / ask / tell + 人 + to 〜「人に〜してほしい・〜するよう頼む・言う」。"],
 "ex":[
  {"en":"I want to learn English for my job.","ja":"仕事のために英語を学びたいです。","note":"名詞的用法: 学ぶこと"},
  {"en":"Do you have anything to drink?","ja":"何か飲み物はありますか?","note":"形容詞的用法: 飲むための何か"},
  {"en":"She is old enough to drive.","ja":"彼女は運転できる年齢です。","note":"形容詞 + enough to"},
  {"en":"My boss asked me to check the data.","ja":"上司は私にデータを確認するよう頼みました。","note":"ask + 人 + to"}
 ],
 "trap":"「彼に来てほしい」を I want that he comes. としがちですが、英語では I want him to come. が自然です。また enough は形容詞の後ろ(old enough)に置く点に注意しましょう。",
 "talk":{"en":"Nice to meet you.","ja":"はじめまして。(お会いできてうれしいです)"},
 "build":[
  {"ja":"私は医者になりたいです。","en":"I want to be a doctor."},
  {"ja":"このスープは熱すぎて飲めません。","en":"This soup is too hot to eat."},
  {"ja":"彼女は私に窓を開けるように頼みました。","en":"She asked me to open the window."}
 ],
 "q":[
  {"s":"Ms. Okada went to the bank ____ some money.","c":["withdraw","withdrew","withdrawing","to withdraw"],"a":3,"why":"銀行に行った「目的」は「お金を引き出すため」。目的を表す副詞的用法の to withdraw です。"},
  {"s":"The manager asked all staff members ____ the survey by Friday.","c":["to complete","completing","complete","completed"],"a":0,"why":"ask + 人 + to 〜 で「人に〜するよう頼む」。all staff members が「人」なので to complete です。"},
  {"s":"This box is too heavy for me ____.","c":["carry","carrying","to carry","carried"],"a":2,"why":"too … to 〜 で「…すぎて〜できない」。too heavy があるので to carry です。"},
  {"s":"We don't have enough time ____ every item on the agenda.","c":["discuss","to discuss","discussed","discussing"],"a":1,"why":"enough time to 〜 で「〜するのに十分な時間」。time を後ろから説明する形容詞的用法の to discuss です。"},
  {"s":"Mr. Park was surprised ____ that the project had been canceled.","c":["to hear","hear","heard","hears"],"a":0,"why":"surprised(驚いた)という感情の原因を表すのは副詞的用法の to + 原形。「聞いて驚いた」で to hear です。"},
  {"s":"The new office is large ____ 200 employees.","c":["too to hold","to enough hold","enough to hold","enough holding"],"a":2,"why":"形容詞 + enough to 〜 で「〜するのに十分…」。enough は形容詞 large の後ろに置き、後ろは to + 原形です。"},
  {"s":"Our goal this year is ____ sales by 10 percent.","c":["increase","increased","increases","to increase"],"a":3,"why":"is の後ろで「目標 = 売上を増やすこと」を表す名詞的用法。「〜すること」になる to increase です。"},
  {"s":"Please let me know if you need anything ____ for the trip.","c":["prepares","to prepare","to preparing","prepare"],"a":1,"why":"anything を後ろから説明する形容詞的用法で「準備すべき何か」。to の後ろは原形なので to prepare。to preparing は形がまちがいです。"}
 ]
},
{"id":"g11","lv":2,"t":"動名詞(-ing)と不定詞の使い分け","sub":"-ing は「手ざわりのある動作カード」","cat":"準動詞",
 "img":"動名詞(-ing)は<b>動作を「名詞のカード」にしたもの</b>です。to が「これから向かう矢印」なのに対して、-ing は<span class=\"mk\">実際にしている・したことがある、手ざわりのある動作</span>。だから enjoy(楽しむ)や finish(終える)のように、実際の動作を相手にする動詞は -ing と相性がいいのです。",
 "rule":["動名詞 = 動詞の -ing 形で「〜すること」。主語・目的語・前置詞の後ろに置けます。","-ing だけを目的語にとる動詞: enjoy, finish, avoid, consider, mind, suggest など。","前置詞の後ろは -ing: look forward to -ing, be used to -ing, thank you for -ing。この to は前置詞です。","stop -ing「〜するのをやめる」/ stop to 〜「〜するために立ち止まる」。","remember / forget -ing「(過去に)〜したことを」/ remember / forget to 〜「(これから)〜することを」。"],
 "ex":[
  {"en":"I enjoy cooking on weekends.","ja":"週末は料理を楽しんでいます。","note":"enjoy + -ing"},
  {"en":"We are considering moving to a bigger office.","ja":"もっと大きなオフィスへの移転を検討しています。","note":"consider + -ing"},
  {"en":"I'm looking forward to seeing you.","ja":"お会いできるのを楽しみにしています。","note":"前置詞 to の後ろは -ing"},
  {"en":"Please remember to lock the door.","ja":"忘れずにドアの鍵をかけてください。","note":"これからすること → to"}
 ],
 "trap":"look forward to の to を不定詞だと思って look forward to see としてしまうミスが定番です。この to は前置詞なので、後ろは名詞か -ing。「to の後ろは必ず原形」ではない、と覚えておきましょう。",
 "talk":{"en":"Would you mind opening the window?","ja":"窓を開けていただけませんか?"},
 "build":[
  {"ja":"彼は去年たばこをやめました。","en":"He stopped smoking last year."},
  {"ja":"あなたに会えるのを楽しみにしています。","en":"I look forward to seeing you."},
  {"ja":"宿題をやり終えましたか?","en":"Have you finished doing your homework?"}
 ],
 "q":[
  {"s":"We enjoyed ____ with the clients at the dinner party.","c":["to talk","talking","talk","talked"],"a":1,"why":"enjoy は -ing だけを目的語にとる動詞。「話すことを楽しんだ」で talking です。to talk は使えません。"},
  {"s":"The company is considering ____ a new branch in Fukuoka.","c":["open","to open","opened","opening"],"a":3,"why":"consider(検討する)は -ing を目的語にとる動詞。consider opening で「開設を検討する」です。"},
  {"s":"I look forward to ____ from you soon.","c":["hearing","hear","heard","be heard"],"a":0,"why":"look forward to の to は前置詞なので、後ろは -ing。hear from 〜(〜から連絡をもらう)で hearing です。"},
  {"s":"Would you mind ____ the door for me?","c":["to close","close","closing","closed"],"a":2,"why":"mind(気にする)は -ing を目的語にとる動詞。Would you mind -ing? で「〜していただけませんか」というお願いになります。"},
  {"s":"Drivers should avoid ____ this road during rush hour.","c":["use","to use","using","used"],"a":2,"why":"avoid(避ける)は -ing を目的語にとる動詞。avoid using で「使うのを避ける」です。"},
  {"s":"Thank you for ____ me with the project.","c":["helping","to help","help","helped"],"a":0,"why":"for は前置詞なので、後ろの動詞は -ing。Thank you for helping me. で「手伝ってくれてありがとう」です。"},
  {"s":"Please remember ____ the lights before you leave the office.","c":["turning off","turned off","turn off","to turn off"],"a":3,"why":"before you leave(帰る前に)とあり、これからすることなので remember to 〜「忘れずに〜する」。remember -ing は「(過去に)〜したことを覚えている」です。"},
  {"s":"On the way to the airport, Mr. Hill stopped ____ some gas.","c":["buying","to buy","buy","bought"],"a":1,"why":"空港へ向かう途中で「ガソリンを買うために止まった」場面。stop to 〜 は「〜するために立ち止まる」。stop buying だと「買うのをやめた」になり場面に合いません。"}
 ]
},
{"id":"g12","lv":2,"t":"分詞(-ing / -ed で名詞を説明する)","sub":"動詞が形容詞に変身する","cat":"修飾",
 "img":"分詞は動詞を<b>形容詞に変身させたもの</b>です。-ing は<span class=\"mk\">「〜している・〜させる(する側)」</span>、-ed(過去分詞)は<span class=\"mk\">「〜された・〜させられた(される側)」</span>。感情なら、映画が人を退屈させる → a boring movie、人が退屈させられる → I'm bored。「気持ちを生み出す側か、受け取る側か」で選びます。",
 "rule":["現在分詞(-ing): 「〜している」。a sleeping baby(眠っている赤ちゃん)。","過去分詞(-ed など): 「〜された」。a broken window(割れた窓)。","感情の分詞: 人やモノが感情を与える側なら -ing(exciting)、人が感情を受ける側なら -ed(excited)。","分詞1語なら名詞の前に、ほかの語がつくと名詞の後ろから説明します: the man standing over there / a car made in Japan。"],
 "ex":[
  {"en":"Who is the girl talking with Ken?","ja":"ケンと話している女の子はだれですか?","note":"talking with Ken が後ろから説明"},
  {"en":"The movie was so boring that I fell asleep.","ja":"その映画はとても退屈で、寝てしまいました。","note":"映画は退屈させる側 → -ing"},
  {"en":"I was surprised at the news.","ja":"その知らせに驚きました。","note":"人は驚かされる側 → -ed"},
  {"en":"This is a watch made in Switzerland.","ja":"これはスイス製の腕時計です。","note":"made in 〜 が後ろから説明"}
 ],
 "trap":"「私はわくわくしている」を I'm exciting. と言うと「私は(人を)わくわくさせる人だ」という意味になってしまいます。自分の気持ちは I'm excited. と -ed を使いましょう。",
 "talk":{"en":"I'm so excited about the trip!","ja":"旅行がすごく楽しみです!"},
 "build":[
  {"ja":"その知らせはとても衝撃的でした。","en":"The news was very shocking."},
  {"ja":"あそこで踊っている男の人を知っていますか?","en":"Do you know the man dancing over there?"},
  {"ja":"私は自分の仕事に満足しています。","en":"I am satisfied with my job."}
 ],
 "q":[
  {"s":"The results of the survey were very ____.","c":["surprising","surprised","surprise","to surprise"],"a":0,"why":"主語は results(結果)で、人を驚かせる側。感情を与える側は -ing なので surprising です。"},
  {"s":"Please read the ____ document before the meeting.","c":["attach","attaching","attached","attaches"],"a":2,"why":"書類はメールなどに「添付された」側なので過去分詞 attached。the attached document(添付の書類)はビジネスの定番表現です。"},
  {"s":"The employees ____ in the new project will receive extra training.","c":["involve","involved","involving","are involved"],"a":1,"why":"文の動詞は will receive。employees を後ろから説明する「プロジェクトに関わっている(be involved in)」で、過去分詞 involved が入ります。"},
  {"s":"Ms. Hayes was ____ with the quality of the service.","c":["satisfying","satisfy","satisfaction","satisfied"],"a":3,"why":"人(ヘイズさん)が満足させられる側なので -ed。be satisfied with 〜 で「〜に満足している」です。"},
  {"s":"The man ____ next to Mr. Kent is our new CEO.","c":["stand","stood","stands","standing"],"a":3,"why":"文の動詞は is。The man を後ろから説明する「ケントさんの隣に立っている」なので、現在分詞 standing です。"},
  {"s":"Many people were ____ by the speaker's inspiring story.","c":["moving","moved","move","to move"],"a":1,"why":"人々は話によって「感動させられた」側で、後ろに by もあります。過去分詞 moved です。"},
  {"s":"The museum has a large collection of paintings ____ by local artists.","c":["paint","painting","painted","paints"],"a":2,"why":"絵は地元の画家に「描かれた」側。by local artists をともなって paintings を後ろから説明する過去分詞 painted です。"},
  {"s":"Customers ____ in the new service can sign up on our website.","c":["interested","interesting","interest","are interested"],"a":0,"why":"文の動詞は can sign up。Customers を後ろから説明する「新サービスに興味がある」で、人は興味を持たされる側なので interested です。"}
 ]
}
];

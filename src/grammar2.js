const GRAM2 = [
{"id":"g13","lv":3,"t":"分詞構文","sub":"接続詞と主語をカットした「省エネ文」","cat":"修飾",
 "img":"分詞構文は、<b>接続詞と主語をカットして動詞を -ing にした「省エネ文」</b>です。長いメールを「〜して、」とひとことにまとめるイメージです。<span class=\"mk\">カットした主語は、後ろのメインの文の主語と同じ</span>なので、言わなくても伝わります。",
 "rule":["When I walked ~ → Walking ~(接続詞と主語を省いて -ing)","メインの文より前に終わったこと → Having + 過去分詞","主語が「される」側なら過去分詞で始める: Written ~(書かれているので)","否定は Not を先頭に: Not knowing ~(知らなかったので)","TOEIC: 他動詞なら、空所の後ろに目的語があれば -ing、なければ過去分詞を疑う"],
 "ex":[
  {"en":"Walking to the station, I saw an old friend.","ja":"駅へ歩いていると、旧友を見かけました。","note":"-ing = 〜していると"},
  {"en":"Having finished the report, she went home.","ja":"報告書を書き終えてから、彼女は帰宅しました。","note":"Having done = 先に終わっていること"},
  {"en":"Written in simple English, the manual is easy to read.","ja":"やさしい英語で書かれているので、そのマニュアルは読みやすいです。","note":"過去分詞で始まる = 受け身"},
  {"en":"The meeting ended at noon, leaving us time for lunch.","ja":"会議は正午に終わり、私たちには昼食の時間が残りました。","note":"文の後ろの -ing = その結果"}
 ],
 "trap":"カットした主語は、メインの文の主語と同じでなければなりません。Walking down the street, the rain started. は「雨が歩いている」ことになるのでダメです。まず「メインの文の主語がその動作をするのか、されるのか」を確認しましょう。",
 "talk":{"en":"Generally speaking, I prefer email to phone calls.","ja":"一般的に言うと、私は電話よりメールのほうが好きです。"},
 "build":[
  {"ja":"疲れていたので、私は早く寝ました。","en":"Feeling tired, I went to bed early."},
  {"ja":"仕事を終えてから、彼は帰宅しました。","en":"Having finished his work, he went home."},
  {"ja":"簡単な英語で書かれているので、その本は読みやすいです。","en":"Written in simple English, the book is easy to read."}
 ],
 "q":[
  {"s":"____ the report carefully, Ms. Patel found several errors.","c":["Reads","Reading","To be read","Has read"],"a":1,"why":"コンマの後ろに主語と動詞(Ms. Patel found)があるので、前半は分詞構文。Ms. Patel が報告書を「読む」側なので Reading。"},
  {"s":"____ in 1985, Greenfield Corp. has grown into a global company.","c":["Founding","Having founded","Founded","To found"],"a":2,"why":"会社は「設立される」側なので、受け身の過去分詞 Founded。後ろに目的語がないのもヒントです。"},
  {"s":"____ finished the presentation, Mr. Lee answered questions from the audience.","c":["Having","Being","Had","Have"],"a":0,"why":"発表を終えたのは質問に答えるより前なので Having + 過去分詞。Had だと主語がなく文になりません。"},
  {"s":"The new policy will take effect next month, ____ employees to work from home twice a week.","c":["allow","allowed","allowing","allows"],"a":2,"why":"コンマの後ろに続けて「その結果〜させる」を表す分詞構文。後ろに目的語 employees があるので -ing の allowing。"},
  {"s":"If ____ properly, this machine will last for more than ten years.","c":["maintain","maintaining","maintains","maintained"],"a":3,"why":"機械は「手入れされる」側なので過去分詞 maintained。If (it is) maintained の省略形で、後ろに目的語がありません。"},
  {"s":"____ no experience in sales, Mr. Ford found the first month challenging.","c":["Had","Having","Has","Been"],"a":1,"why":"「経験がなかったので」という理由の分詞構文。Because he had → Having。Had や Has だと主語がなく文になりません。"},
  {"s":"Not ____ what to say, the new intern remained silent during the meeting.","c":["know","known","knew","knowing"],"a":3,"why":"分詞構文の否定は Not + -ing。インターンが「知らない」側なので knowing。"},
  {"s":"Weather ____, the outdoor event will be held on Saturday.","c":["permitting","permitted","permits","permit"],"a":0,"why":"Weather permitting は「天気がよければ」という決まった分詞構文。permits だと文が2つコンマだけでつながってしまいます。"}
 ]},

{"id":"g14","lv":2,"t":"関係代名詞","sub":"名詞にくっつける説明シール","cat":"修飾",
 "img":"関係代名詞は、名詞にペタッと貼る<b>「説明シール」</b>です。The woman に [who called you] というシールを貼ると「あなたに電話した女性」になります。<span class=\"mk\">シールの中は主語か目的語が1つ抜けていて、その穴を前の名詞が埋めている</span>のがポイントです。",
 "rule":["who = 人の説明シール(シールの中の主語が抜けている)","which = モノの説明シール / that = 人にもモノにも使える(コンマの後ろには使えない)","whose = 「その人(モノ)の〜」: the man whose car ~","what = the thing(s) which「〜なこと・もの」。前に名詞(先行詞)がない","目的語が抜けているシールの関係代名詞は省略できる: the book (that) I read"],
 "ex":[
  {"en":"The woman who called you is my manager.","ja":"あなたに電話した女性は私の上司です。","note":"who = 人の説明シール"},
  {"en":"I bought a laptop which has a long battery life.","ja":"バッテリーが長持ちするノートパソコンを買いました。","note":"which = モノの説明シール"},
  {"en":"The man whose car was stolen called the police.","ja":"車を盗まれた男性は警察に電話しました。","note":"whose = その人の〜"},
  {"en":"The book I borrowed from you was very interesting.","ja":"あなたから借りた本はとてもおもしろかったです。","note":"目的格の that / which は省略OK"}
 ],
 "trap":"日本語は説明が名詞の前、英語は名詞の後ろに来ます。The book I borrowed のようにシールが省略されると見落としがちです。「名詞 + 主語 + 動詞」と続いたら、省略されたシールだと考えましょう。",
 "talk":{"en":"Is there anything I can help you with?","ja":"何かお手伝いできることはありますか。"},
 "build":[
  {"ja":"私には東京に住む友達がいます。","en":"I have a friend who lives in Tokyo."},
  {"ja":"これは私が昨日買ったかばんです。","en":"This is the bag I bought yesterday."},
  {"ja":"私に必要なのはもっと多くの時間です。","en":"What I need is more time."}
 ],
 "q":[
  {"s":"The engineer ____ designed the new system will give a demonstration.","c":["who","which","whose","whom"],"a":0,"why":"空所の後ろに主語がなく、先行詞が人(engineer)なので who。whom は目的語が抜けているときに使います。"},
  {"s":"Ms. Patel is the consultant ____ advice helped us reduce costs.","c":["who","which","whom","whose"],"a":3,"why":"「そのコンサルタントの助言」という意味で、後ろに名詞 advice が続くので whose。"},
  {"s":"Please return the documents ____ were sent to you last week.","c":["who","which","whose","what"],"a":1,"why":"先行詞がモノ(documents)で、後ろに主語が抜けているので which。what は前に名詞がないときに使います。"},
  {"s":"____ the customers want most is faster delivery.","c":["That","Which","What","Who"],"a":2,"why":"前に名詞(先行詞)がなく、「顧客が最も望んでいること」という意味なので What。"},
  {"s":"The hotel ____ we stayed at was close to the convention center.","c":["who","whose","which","what"],"a":2,"why":"先行詞がモノ(hotel)で、at の目的語が抜けているので which。"},
  {"s":"Greenfield Corp. is looking for applicants ____ have experience in marketing.","c":["who","whose","which","what"],"a":0,"why":"先行詞が人(applicants)で、後ろに主語が抜けているので who。"},
  {"s":"The candidate ____ we interviewed yesterday has accepted the offer.","c":["whose","which","what","whom"],"a":3,"why":"先行詞が人(candidate)で、interviewed の目的語が抜けているので目的格の whom。"},
  {"s":"This is exactly ____ I was looking for.","c":["which","what","that","whom"],"a":1,"why":"前に名詞(先行詞)がなく、「私が探していたもの」という意味なので what。which や that は前に名詞が必要です。"}
 ]},

{"id":"g15","lv":3,"t":"関係副詞と複合関係詞","sub":"場所・時・理由・方法の専用シールと「なんでもOKカード」","cat":"修飾",
 "img":"関係副詞は「場所・時・理由・方法」専用の<b>説明シール</b>です。関係代名詞のシールとの違いは、<span class=\"mk\">シールの中が穴のない完全な文</span>であること。-ever が付く複合関係詞は「どんな〜でも」の<b>「なんでもOKカード」</b>です。",
 "rule":["where = 場所 / when = 時 / why = 理由(the reason why ~)","how = 方法。the way と how は並べない(× the way how)","後ろが完全な文 → 関係副詞、主語や目的語が抜けている → 関係代名詞","whoever = 〜する人は誰でも / whatever = 〜するものは何でも / whichever = どちらでも","however + 形容詞・副詞 = どんなに〜でも / whenever = 〜するときはいつでも"],
 "ex":[
  {"en":"This is the town where I grew up.","ja":"ここは私が育った町です。","note":"where = 場所の説明シール"},
  {"en":"I remember the day when we first met.","ja":"私たちが初めて会った日を覚えています。","note":"when = 時の説明シール"},
  {"en":"That's why I changed jobs.","ja":"そういうわけで私は転職しました。","note":"That's why ~ = だから〜"},
  {"en":"Whatever you decide, I will support you.","ja":"あなたが何を決めても、私は応援します。","note":"whatever = 何を〜しても"}
 ],
 "trap":"場所の名詞を見ただけで where を選ばないようにしましょう。the place which I visited は visit の目的語が抜けているので which です。シールの中が完全な文かどうかを必ず確認します。",
 "talk":{"en":"That's how I learned English.","ja":"そうやって私は英語を身につけました。"},
 "build":[
  {"ja":"ここは私が生まれた町です。","en":"This is the town where I was born."},
  {"ja":"好きなときに電話してください。","en":"Call me whenever you like."},
  {"ja":"それが私が遅れた理由です。","en":"That is why I was late."}
 ],
 "q":[
  {"s":"This is the office ____ Mr. Lee has worked since 2015.","c":["which","what","where","when"],"a":2,"why":"後ろが「Mr. Lee has worked since 2015」という完全な文(抜けている語がない)で、先行詞が場所(office)なので where。"},
  {"s":"I still remember the day ____ our company launched its first product.","c":["when","where","which","what"],"a":0,"why":"先行詞が時(day)で、後ろは目的語まである完全な文なので when。"},
  {"s":"Nobody knows the reason ____ the meeting was canceled.","c":["where","what","which","why"],"a":3,"why":"先行詞が reason(理由)で、後ろが完全な文なので why。"},
  {"s":"Ms. Patel explained ____ she had reduced shipping costs by 30 percent.","c":["what","how","which","whom"],"a":1,"why":"後ろが完全な文で、「どうやって削減したか」という方法を表すので how。what だと後ろに抜けている語が必要です。"},
  {"s":"____ arrives first should turn on the lights in the office.","c":["However","Whoever","Whenever","Wherever"],"a":1,"why":"空所が arrives の主語になり、「最初に来た人は誰でも」という意味なので Whoever。"},
  {"s":"____ hard the task may be, we must finish it by Friday.","c":["Whatever","Whoever","Whichever","However"],"a":3,"why":"直後に形容詞 hard があり、「どんなに大変でも」という意味なので However。"},
  {"s":"You can choose ____ seat you like.","c":["whichever","however","whoever","wherever"],"a":0,"why":"直後に名詞 seat があり、「好きなどの席でも」という意味なので whichever。ほかの選択肢は名詞の前に置けません。"},
  {"s":"Please call me ____ you have a problem with the software.","c":["whatever","whoever","whenever","however"],"a":2,"why":"後ろが完全な文で、「問題があるときはいつでも」という意味なので whenever。"}
 ]},

{"id":"g16","lv":1,"t":"比較","sub":"シーソーと表彰台で比べる","cat":"文の基本",
 "img":"比較は<b>シーソー</b>のイメージです。-er / more は2つを乗せて「どっちが上か」、as ~ as は<span class=\"mk\">つりあったシーソー</span>。the -est / the most は全員を並べた<b>表彰台の1位</b>です。",
 "rule":["短い語は -er / -est(fast → faster → fastest)、長い語は more / most","as + 形容詞(副詞) + as = 同じくらい〜 / not as ~ as = 〜ほど…ない","比較級を強めるのは much / far / even / a lot(very は使えない)","最上級は the + -est / most。範囲は in(in Japan)、仲間は of(of the three)","the + 比較級, the + 比較級 = 〜すればするほど…"],
 "ex":[
  {"en":"This bag is lighter than that one.","ja":"このかばんはあのかばんより軽いです。","note":"-er than = 〜より"},
  {"en":"Tokyo is the largest city in Japan.","ja":"東京は日本で一番大きな都市です。","note":"the -est = 一番"},
  {"en":"My English is not as good as yours.","ja":"私の英語はあなたほど上手ではありません。","note":"not as ~ as = 〜ほど…ない"},
  {"en":"This plan is far better than the old one.","ja":"この計画は前のものよりずっと良いです。","note":"far + 比較級 = ずっと〜"}
 ],
 "trap":"「ずっと背が高い」を very taller と言うのはまちがいで、much taller が正解です。また good → better → best、bad → worse → worst のように形が変わる語も覚えておきましょう。",
 "talk":{"en":"Could you speak a little more slowly?","ja":"もう少しゆっくり話していただけますか。"},
 "build":[
  {"ja":"今日は昨日より暑いです。","en":"It is hotter today than yesterday."},
  {"ja":"これは私が今まで見た中で最高の映画です。","en":"This is the best movie I have ever seen."},
  {"ja":"彼は私と同じくらい背が高いです。","en":"He is as tall as I am."}
 ],
 "q":[
  {"s":"The new printer is ____ than the old one.","c":["fast","fastest","most fast","faster"],"a":3,"why":"後ろに than があるので比較級。fast は短い語なので faster。"},
  {"s":"This is the ____ expensive hotel in the city.","c":["more","most","much","many"],"a":1,"why":"the と in the city(範囲)があるので最上級。expensive は長い語なので most。"},
  {"s":"Our sales this year are ____ higher than last year's.","c":["much","very","more","most"],"a":0,"why":"比較級 higher を強めるのは much。very は比較級を強められません。"},
  {"s":"The conference room is as large ____ the cafeteria.","c":["than","so","as","more"],"a":2,"why":"前に as large があるので、as ~ as(同じくらい)の形にします。"},
  {"s":"Ms. Patel is the ____ experienced member of the team.","c":["most","much","many","such"],"a":0,"why":"the と of the team(仲間の範囲)があるので最上級。experienced は長い語なので most。"},
  {"s":"Of the three proposals, Mr. Ford's was ____ the most practical.","c":["very","more","so","by far"],"a":3,"why":"最上級 the most practical を強めるのは by far(断然)。very や so は the の前に置けません。"},
  {"s":"The more you practice, the ____ you will become.","c":["good","best","better","well"],"a":2,"why":"「the + 比較級, the + 比較級」で「〜すればするほど…」。good の比較級は better。"},
  {"s":"Shipping by sea is ____ expensive than shipping by air.","c":["least","less","little","fewer"],"a":1,"why":"後ろに than があるので比較級。expensive の前に置いて「より安い」を表すのは less。fewer は数えられる名詞に使います。"}
 ]},

{"id":"g17","lv":3,"t":"仮定法","sub":"時制を1つ過去にずらして現実から距離をとる","cat":"仮定法",
 "img":"仮定法は、<b>時制を1つ過去にずらして「現実から距離をとる」</b>話し方です。今の空想は過去形、過去の空想は過去完了。英語では<span class=\"mk\">「時間が遠い」と「現実から遠い」を同じ「過去」で表す</span>と考えるとスッキリします。",
 "rule":["今の現実の反対: If + 過去形, would + 動詞の原形(be動詞は were)","過去の現実の反対: If + had + 過去分詞, would have + 過去分詞","I wish + 過去形 = 今〜ならいいのに / I wish + had + 過去分詞 = あのとき〜ならよかったのに","If it were not for ~ = 〜がなければ / If it had not been for ~ = 〜がなかったら","倒置: Had I known = If I had known / Should you have ~ = 万一〜なら"],
 "ex":[
  {"en":"If I were you, I would accept the offer.","ja":"私があなたなら、その申し出を受けます。","note":"今の反対 = 過去形"},
  {"en":"If I had studied harder, I would have passed the exam.","ja":"もっと勉強していたら、試験に受かっていたでしょう。","note":"過去の反対 = 過去完了"},
  {"en":"I wish I lived closer to the office.","ja":"会社のもっと近くに住んでいればいいのに。","note":"I wish + 過去形 = 今の願望"},
  {"en":"Had I known, I would have helped you.","ja":"知っていたら、手伝ったのに。","note":"If を省くと Had が前に出る"}
 ],
 "trap":"会話では If I was you と言う人もいますが、テストでは were を選びましょう。また Should you have any questions, ~ は「万一質問があれば」という意味で、後ろには please contact ~ のような命令文がよく続きます。",
 "talk":{"en":"I wish I could stay longer.","ja":"もっと長くいられたらいいのに。"},
 "build":[
  {"ja":"時間があれば、あなたを手伝うのに。","en":"If I had time, I would help you."},
  {"ja":"英語が上手に話せたらいいのに。","en":"I wish I could speak English well."},
  {"ja":"知っていたら、あなたに教えたのに。","en":"If I had known, I would have told you."}
 ],
 "q":[
  {"s":"If I ____ more time, I would take the advanced course.","c":["have","had","will have","have had"],"a":1,"why":"後ろが would take なので、今の現実の反対を表す仮定法過去。If の中は過去形 had。"},
  {"s":"If we had left earlier, we ____ the train.","c":["caught","will catch","would catch","would have caught"],"a":3,"why":"If の中が had left(過去完了)なので、過去の反対を表す仮定法過去完了。would have + 過去分詞。"},
  {"s":"I wish I ____ speak Chinese fluently.","c":["can","will","could","am able"],"a":2,"why":"I wish の後ろは時制を1つ過去にずらすので、can の過去形 could。"},
  {"s":"____ it not been for your help, the project would have failed.","c":["Had","Were","Has","If"],"a":0,"why":"If it had not been for の If を省いた倒置の形。been があるので Had。"},
  {"s":"____ you have any questions, please contact our customer service team.","c":["Were","Had","Would","Should"],"a":3,"why":"If you should have(万一〜なら)の If を省いた倒置。後ろの have が原形なので Should。"},
  {"s":"If it ____ not for the rain, we could hold the event outdoors.","c":["were","is","had","has"],"a":0,"why":"後ろが could hold なので仮定法過去。If it were not for ~ で「〜がなければ」。"},
  {"s":"____ I known about the traffic, I would have taken the subway.","c":["If","Had","Have","Were"],"a":1,"why":"後ろが would have taken なので仮定法過去完了。If I had known の If を省くと Had I known。"},
  {"s":"If Ms. Patel were here, she ____ what to do.","c":["knows","will know","would know","had known"],"a":2,"why":"If の中が were なので、今の現実の反対を表す仮定法過去。主節は would + 動詞の原形。"}
 ]},

{"id":"g18","lv":1,"t":"前置詞","sub":"点・面・箱と、締め切りの壁","cat":"前置詞・接続詞",
 "img":"in / on / at は<b>「広さの3段階」</b>です。at は地図上の<b>点</b>、on はカレンダーの1日の<b>面</b>の上、in は月や年という大きな<b>箱</b>の中。by は<span class=\"mk\">「締め切りの壁」</span>、until は<span class=\"mk\">「ずっと続く線の終わり」</span>です。",
 "rule":["at + 時刻・地点(at 7:00 / at the station)","on + 曜日・日付・表面(on Monday / on May 5)","in + 月・年・季節・空間(in March / in 2025 / in the room)","by = 〜までに(1回の締め切り) / until = 〜までずっと(続く動作)","for + 期間の長さ(for three days) / during + 出来事・期間の名前(during the meeting)"],
 "ex":[
  {"en":"I get up at seven.","ja":"私は7時に起きます。","note":"at = 時計の一点"},
  {"en":"We have a meeting on Monday.","ja":"月曜日に会議があります。","note":"on = 曜日"},
  {"en":"Please finish this by Friday.","ja":"金曜日までにこれを終えてください。","note":"by = 締め切り"},
  {"en":"I'll wait here until five.","ja":"5時までここで待ちます。","note":"until = ずっと続く"}
 ],
 "trap":"日本語の「まで」だけで選ぶとまちがえます。提出のように1回で終わる動作なら by、待つ・開いているのように続く動作なら until です。",
 "talk":{"en":"Can we meet on Friday at three?","ja":"金曜日の3時に会えますか。"},
 "build":[
  {"ja":"私は毎朝7時に起きます。","en":"I get up at seven every morning."},
  {"ja":"正午までにそのメールを送ってください。","en":"Please send the email by noon."},
  {"ja":"夏休みの間に私は京都を訪れました。","en":"I visited Kyoto during the summer vacation."}
 ],
 "q":[
  {"s":"The meeting will start ____ 9 A.M.","c":["in","on","at","for"],"a":2,"why":"時刻(9 A.M.)は時計の一点なので at。"},
  {"s":"Our office is closed ____ Sundays.","c":["on","in","at","by"],"a":0,"why":"曜日には on。Sundays と複数形にすると「毎週日曜日」の意味になります。"},
  {"s":"Please submit the report ____ Friday.","c":["until","by","during","since"],"a":1,"why":"提出は1回で終わる動作なので、締め切りを表す by。until は動作が続くときに使います。"},
  {"s":"The store will be closed ____ the holidays.","c":["while","since","among","during"],"a":3,"why":"後ろが名詞(the holidays)で「休暇の間」なので during。while は後ろに文が来ます。"},
  {"s":"Mr. Ford has worked here ____ ten years.","c":["for","during","since","in"],"a":0,"why":"ten years は期間の長さなので for。since は始まった時点(since 2015 など)に使います。"},
  {"s":"The new branch will open ____ March.","c":["at","on","in","to"],"a":2,"why":"月(March)は大きな箱なので in。"},
  {"s":"The printer is located ____ the copy machine and the window.","c":["among","through","across","between"],"a":3,"why":"A and B の2つの「間」なので between。among は3つ以上のものの中に使います。"},
  {"s":"You can keep the book ____ next Monday.","c":["by","until","within","at"],"a":1,"why":"keep(持っておく)は続く動作なので、「〜までずっと」の until。"}
 ]},

{"id":"g19","lv":2,"t":"接続詞と前置詞の区別","sub":"文を引っぱる連結車両か、名詞を乗せる荷台か","cat":"前置詞・接続詞",
 "img":"接続詞は後ろに<b>文(主語 + 動詞)</b>を引っぱる<b>「連結車両」</b>、前置詞は後ろに<b>名詞</b>だけを乗せる<b>「荷台」</b>です。意味が同じでも、<span class=\"mk\">乗せられる形がちがう</span>ので、まず空所の後ろを見ます。",
 "rule":["後ろに主語 + 動詞 → 接続詞(although, because, while)","後ろが名詞のカタマリ → 前置詞(despite, in spite of, because of, due to, during)","意味のペア: although = despite / because = because of / while = during","TOEIC: 意味より先に「空所の後ろに動詞があるか」を確認"],
 "ex":[
  {"en":"Although it was raining, we went out.","ja":"雨が降っていたけれど、私たちは出かけました。","note":"although + 文"},
  {"en":"Despite the rain, we went out.","ja":"雨にもかかわらず、私たちは出かけました。","note":"despite + 名詞"},
  {"en":"I stayed home because I had a cold.","ja":"風邪をひいていたので、家にいました。","note":"because + 文"},
  {"en":"I fell asleep during the movie.","ja":"映画の間に眠ってしまいました。","note":"during + 名詞"}
 ],
 "trap":"despite of とは言いません(in spite of と混ざったまちがい)。TOEICでは選択肢の意味がそっくりなので、意味で迷わず、空所の後ろが文か名詞かで決めましょう。",
 "talk":{"en":"Sorry, I'm busy because of a deadline.","ja":"すみません、締め切りのせいで忙しいんです。"},
 "build":[
  {"ja":"雨にもかかわらず、彼らは試合をしました。","en":"They played the game despite the rain."},
  {"ja":"疲れていたけれど、私は勉強しました。","en":"Although I was tired, I studied."},
  {"ja":"会議の間は電話の電源を切ってください。","en":"Please turn off your phone during the meeting."}
 ],
 "q":[
  {"s":"____ the heavy rain, the event was held as scheduled.","c":["Despite","Although","Even though","Because"],"a":0,"why":"後ろが名詞(the heavy rain)だけなので前置詞 Despite。ほかは後ろに文が必要な接続詞です。"},
  {"s":"The flight was delayed ____ bad weather.","c":["because","since","because of","so"],"a":2,"why":"後ろが名詞(bad weather)なので前置詞の because of。because と since は後ろに文が来ます。"},
  {"s":"____ the prices are high, the product sells well.","c":["Despite","In spite of","Because of","Although"],"a":3,"why":"後ろに主語 + 動詞(the prices are)があるので接続詞 Although。"},
  {"s":"Please do not use your phone ____ the presentation.","c":["while","during","although","when"],"a":1,"why":"後ろが名詞(the presentation)なので前置詞の during。while と when は後ろに文が来ます。"},
  {"s":"Ms. Patel checked her email ____ she was waiting for the train.","c":["during","despite","while","because of"],"a":2,"why":"後ろに主語 + 動詞(she was waiting)があり、「〜している間」なので接続詞 while。"},
  {"s":"The project was completed on time ____ a shortage of staff.","c":["although","despite","even if","though"],"a":1,"why":"後ろが名詞(a shortage of staff)なので前置詞の despite。ほかは接続詞です。"},
  {"s":"We will start the meeting ____ everyone arrives.","c":["once","by","during","despite"],"a":0,"why":"後ろに主語 + 動詞(everyone arrives)があるので接続詞。「全員がそろったらすぐ」という意味の once。"},
  {"s":"____ his lack of experience, Mr. Ford was hired as a team leader.","c":["Though","Although","Even though","In spite of"],"a":3,"why":"後ろが名詞(his lack of experience)なので前置詞の In spite of。ほかは後ろに文が必要です。"}
 ]},

{"id":"g20","lv":2,"t":"品詞の見分け","sub":"空所の「席」で入る品詞が決まる","cat":"品詞",
 "img":"品詞は、文の中の<b>「席(ポジション)」</b>です。サッカーでゴールキーパーの位置にはキーパーしか立てないように、<span class=\"mk\">空所の位置を見れば入る品詞が決まります</span>。語尾(-tion, -ly など)は選手の<b>背番号</b>のようなものです。",
 "rule":["名詞の語尾: -tion, -ment, -ness, -ity, -ance","形容詞の語尾: -ful, -ous, -ive, -able, -al / 副詞: 形容詞 + -ly","a / the / 所有格 + ____ → 名詞(形容詞をはさむこともある)","be動詞の後ろ、名詞の前 → 形容詞","動詞の前後、形容詞の前、文の最後 → 副詞 / to や助動詞の後ろ → 動詞の原形"],
 "ex":[
  {"en":"She gave a clear explanation.","ja":"彼女はわかりやすい説明をしました。","note":"-tion = 名詞 / 名詞の前 = 形容詞"},
  {"en":"He explained the plan clearly.","ja":"彼はその計画をわかりやすく説明しました。","note":"-ly = 副詞は動詞を説明"},
  {"en":"This product is very popular.","ja":"この商品はとても人気があります。","note":"be動詞の後ろ = 形容詞"},
  {"en":"We need to decide soon.","ja":"私たちはすぐに決める必要があります。","note":"to の後ろ = 動詞の原形"}
 ],
 "trap":"friendly や lovely は -ly で終わっても形容詞です。語尾だけで決めず、位置で判断しましょう。TOEIC Part 5 の品詞問題は、文の意味を全部読まなくても位置だけで解けることが多く、時間の節約になります。",
 "talk":{"en":"That's a great idea.","ja":"それはすばらしいアイデアですね。"},
 "build":[
  {"ja":"彼はとても上手に英語を話します。","en":"He speaks English very well."},
  {"ja":"その説明はとてもわかりやすかったです。","en":"The explanation was very clear."},
  {"ja":"私たちは慎重に決める必要があります。","en":"We need to decide carefully."}
 ],
 "q":[
  {"s":"The manager made an important ____ about the budget.","c":["announce","announced","announcing","announcement"],"a":3,"why":"an important(冠詞 + 形容詞)の後ろは名詞の席。-ment で終わる announcement。"},
  {"s":"Ms. Patel ____ reviewed the contract before signing it.","c":["carefully","careful","care","carefulness"],"a":0,"why":"主語と動詞(reviewed)の間は、動詞を説明する副詞の席。carefully。"},
  {"s":"The new software is very ____ to use.","c":["ease","easily","easy","easiness"],"a":2,"why":"be動詞 is + very の後ろは形容詞の席。easy。"},
  {"s":"We need to ____ our customer service.","c":["improvement","improve","improving","improved"],"a":1,"why":"to の後ろで、目的語 our customer service をとるので動詞の原形 improve。"},
  {"s":"The hotel offers ____ rooms at reasonable prices.","c":["space","spacious","spaciously","spaciousness"],"a":1,"why":"名詞 rooms の前は、名詞を説明する形容詞の席。-ous で終わる spacious。"},
  {"s":"Sales increased ____ after the advertising campaign.","c":["significant","significance","signify","significantly"],"a":3,"why":"動詞 increased を説明するのは副詞。significantly(大きく)。"},
  {"s":"Applicants must submit their ____ by May 31.","c":["apply","applied","applications","applicable"],"a":2,"why":"所有格 their の後ろは名詞の席で、submit の目的語になります。-tion で終わる applications。"},
  {"s":"The results of the survey were ____ positive.","c":["surprisingly","surprising","surprise","surprised"],"a":0,"why":"形容詞 positive の前で、それを説明するのは副詞。surprisingly(意外にも)。"}
 ]},

{"id":"g21","lv":2,"t":"代名詞","sub":"立つ場所で衣装を替える「代役」","cat":"名詞・代名詞",
 "img":"代名詞は名詞の<b>「代役」</b>です。代役は<span class=\"mk\">立つ場所で衣装(形)を替えます</span>: 主語の席は I、目的語の席は me、持ち主は my、「〜のもの」は mine。one / another / the other は<b>「残りがいくつあるか」</b>で決まり、最後の1つなら特定できるので the が付きます。",
 "rule":["主格 I / 目的格 me / 所有格 my / 所有代名詞 mine(she / her / her / hers)","主語と目的語が同じ人 → -self(by oneself = 一人で)","each other = お互い(動詞や前置詞の後ろに置く)","those who ~ = 〜する人々 / 前に出た複数名詞のくり返しは those","2つなら one と the other / 3つ以上なら one, another, the other(最後の1つ)"],
 "ex":[
  {"en":"Please call me tomorrow.","ja":"明日私に電話してください。","note":"動詞の後ろ = 目的格 me"},
  {"en":"I taught myself to cook.","ja":"私は独学で料理を覚えました。","note":"-self = 自分自身"},
  {"en":"They help each other.","ja":"彼らはお互いに助け合っています。","note":"each other = お互い"},
  {"en":"I have two pens. One is red, and the other is blue.","ja":"ペンを2本持っています。1本は赤で、もう1本は青です。","note":"2つなら one と the other"}
 ],
 "trap":"between you and I はまちがいです。前置詞の後ろは目的格なので between you and me が正しい形です。and でつながると迷いやすいので、1人ずつに分けて考えましょう。",
 "talk":{"en":"Help yourself to some coffee.","ja":"コーヒーをご自由にどうぞ。"},
 "build":[
  {"ja":"私たちはお互いを知っています。","en":"We know each other."},
  {"ja":"彼女は一人でその仕事を終えました。","en":"She finished the work by herself."},
  {"ja":"これは私のものではなく、彼のものです。","en":"This is not mine but his."}
 ],
 "q":[
  {"s":"Mr. Lee asked ____ to join the project team.","c":["I","me","my","mine"],"a":1,"why":"動詞 asked の後ろは目的語の席なので目的格 me。"},
  {"s":"Ms. Patel finished the report by ____.","c":["she","her","herself","hers"],"a":2,"why":"by oneself で「一人で」。主語が Ms. Patel なので herself。"},
  {"s":"The two companies have worked with ____ for many years.","c":["each other","themselves","other","the other"],"a":0,"why":"2つの会社が「お互いに」協力してきたので each other。"},
  {"s":"This laptop is not mine. It is ____.","c":["her","she","herself","hers"],"a":3,"why":"「彼女のもの」は所有代名詞 hers。her だけでは後ろに名詞が必要です。"},
  {"s":"____ who wish to attend the seminar should register online.","c":["That","Them","These","Those"],"a":3,"why":"those who ~ で「〜する人々」。Them は主語になれません。"},
  {"s":"I have two brothers. One lives in Osaka, and ____ lives in Tokyo.","c":["another","the other","other","others"],"a":1,"why":"2人のうち残りの1人は特定できるので the other。another は残りが2つ以上あるときに使います。"},
  {"s":"The sales figures for this year are better than ____ for last year.","c":["those","that","these","them"],"a":0,"why":"くり返しをさける the sales figures は複数なので those。that は単数の名詞のくり返しに使います。"},
  {"s":"Our team has three new members. One is from Canada, another is from Brazil, and ____ is from India.","c":["other","others","the other","each"],"a":2,"why":"3人のうち最後に残った1人は特定できるので the other。"}
 ]},

{"id":"g22","lv":2,"t":"主語と動詞の一致・数えられる名詞","sub":"サイズをそろえるペアと、形のない「水や砂」","cat":"名詞・代名詞",
 "img":"主語と動詞は<b>「サイズをそろえるペア」</b>です。主語が1つなら動詞も単数サイズ(has, is, -s)。each / every は<span class=\"mk\">1人ずつスポットライトを当てる</span>ので単数です。information や advice のような数えられない名詞は、<b>形が決まっていない水や砂</b>のようなもので、a も -s も付きません。",
 "rule":["each / every + 単数名詞 → 単数の動詞(Every student has ~)","a number of + 複数名詞 → 複数の動詞 / the number of ~ → 単数の動詞","many / few = 数えられる名詞、much / little = 数えられない名詞","a few / a little = 少しある、few / little = ほとんどない","information, advice, equipment, furniture, baggage は数えられない"],
 "ex":[
  {"en":"Every student has a tablet.","ja":"すべての生徒がタブレットを持っています。","note":"every + 単数名詞 + 単数の動詞"},
  {"en":"A number of people are waiting outside.","ja":"たくさんの人が外で待っています。","note":"a number of = たくさんの → 複数"},
  {"en":"The number of cars is increasing.","ja":"車の数が増えています。","note":"the number = 「数」1つ → 単数"},
  {"en":"Can you give me some advice?","ja":"アドバイスをもらえますか。","note":"advice は数えられない"}
 ],
 "trap":"The list of names ____ のように主語が長いと、すぐ前の names につられて are を選びがちです。本当の主語(list)を見つけてから動詞を選びましょう。",
 "talk":{"en":"How much time do we have?","ja":"時間はどれくらいありますか。"},
 "build":[
  {"ja":"それぞれの部屋にテレビがあります。","en":"Each room has a TV."},
  {"ja":"私たちにはもうほとんど時間が残っていません。","en":"We have very little time left."},
  {"ja":"たくさんの人がそのイベントに来ました。","en":"A number of people came to the event."}
 ],
 "q":[
  {"s":"Each employee ____ a security card.","c":["have","are having","has","having"],"a":2,"why":"each + 単数名詞は単数あつかいなので has。"},
  {"s":"A number of customers ____ complained about the delay.","c":["has","is","was","have"],"a":3,"why":"a number of ~ は「たくさんの〜」で複数あつかい。後ろが過去分詞 complained なので have。"},
  {"s":"The number of visitors ____ increasing every year.","c":["are","is","have","were"],"a":1,"why":"主語の中心は the number(数)で単数。後ろが increasing なので is。"},
  {"s":"We don't have ____ information about the new product yet.","c":["much","many","a few","several"],"a":0,"why":"information は数えられない名詞なので much。many, a few, several は数えられる名詞に使います。"},
  {"s":"Very ____ people attended the meeting because of the snow.","c":["few","little","much","less"],"a":0,"why":"people は数えられる名詞で、「ほとんどいない」なので few。little と much は数えられない名詞に使います。"},
  {"s":"The office needs some new ____.","c":["furnitures","furniture's","furniture","a furniture"],"a":2,"why":"furniture は数えられない名詞なので、-s も a も付けない furniture。"},
  {"s":"There is ____ time left before the deadline, so we must hurry.","c":["few","a few","many","little"],"a":3,"why":"time(時間)は数えられない名詞で、「急がなければ」とあるので「ほとんどない」の little。"},
  {"s":"Every manager and employee ____ invited to the year-end party.","c":["are","is","were","have"],"a":1,"why":"every A and B は「一人ひとり」を見るので単数あつかい。is。"}
 ]},

{"id":"g23","lv":1,"t":"疑問文の作り方","sub":"語順の入れかえゲーム","cat":"文の基本",
 "img":"疑問文は<b>「語順の入れかえゲーム」</b>です。主語と be動詞・助動詞をひっくり返すと質問になります。ただし Could you tell me ~ のように文の中に入れると、<span class=\"mk\">質問の箱に入ったので、もう入れかえない(普通の文の順番に戻る)</span>のがポイントです。",
 "rule":["疑問詞(what, where, when, who, why, how)は文の先頭","be動詞・助動詞は主語の前へ。一般動詞は do / does / did を使う","間接疑問: Do you know + 疑問詞 + 主語 + 動詞(where the station is)","Yes / No の間接疑問は if / whether(I wonder if ~)","付加疑問: 前が肯定なら否定、否定なら肯定の短い疑問を付ける(~, isn't it?)"],
 "ex":[
  {"en":"Where do you live?","ja":"どこに住んでいますか。","note":"疑問詞 + do + 主語 + 動詞"},
  {"en":"Could you tell me where the station is?","ja":"駅がどこか教えていただけますか。","note":"間接疑問は 主語 + 動詞 の順"},
  {"en":"You're from Osaka, aren't you?","ja":"大阪出身ですよね。","note":"付加疑問 = 確認"},
  {"en":"Sorry, could you say that again?","ja":"すみません、もう一度言っていただけますか。","note":"聞き返しの定番"}
 ],
 "trap":"Could you tell me where is the station? としがちですが、文の中に入ったら where the station is の順です。付加疑問は前の動詞に合わせます(She hasn't ~ → has she?)。",
 "talk":{"en":"Sorry, what did you say?","ja":"すみません、何とおっしゃいましたか。"},
 "build":[
  {"ja":"会議が何時に始まるか知っていますか。","en":"Do you know what time the meeting starts?"},
  {"ja":"あなたはどれくらい英語を勉強していますか。","en":"How long have you studied English?"},
  {"ja":"今日は寒いですよね。","en":"It's cold today, isn't it?"}
 ],
 "q":[
  {"s":"____ is the meeting room? — It's on the third floor.","c":["Where","When","Who","What"],"a":0,"why":"答えが「3階です」という場所なので Where。"},
  {"s":"Could you tell me where ____?","c":["is the station","the station is","does the station","the station does"],"a":1,"why":"Could you tell me の後ろは間接疑問なので、主語 + 動詞の順(the station is)。"},
  {"s":"You work in the sales department, ____ you?","c":["do","aren't","are","don't"],"a":3,"why":"前の文が一般動詞 work の肯定文なので、付加疑問は否定の don't you。"},
  {"s":"____ long have you worked for this company?","c":["What","Which","How","When"],"a":2,"why":"How long で「どれくらいの期間」。"},
  {"s":"Do you know when ____?","c":["will the shipment arrive","the shipment will arrive","does the shipment arrive","arrives the shipment"],"a":1,"why":"Do you know の後ろは間接疑問なので、主語 + 動詞の順(the shipment will arrive)。"},
  {"s":"____ bag is this? — It's Ms. Patel's.","c":["Whose","Who's","Whom","Who"],"a":0,"why":"答えが「パテルさんのもの」なので、「誰の」をたずねる Whose。後ろに名詞 bag を置けるのも Whose だけです。"},
  {"s":"Ms. Patel hasn't arrived yet, ____ she?","c":["is","isn't","has","hasn't"],"a":2,"why":"前が hasn't の否定文なので、付加疑問は肯定の has she。"},
  {"s":"I wonder ____ the client will accept our proposal.","c":["what","that","which","whether"],"a":3,"why":"後ろが完全な文で「受け入れるかどうか」なので whether。what や which だと後ろに抜けている語が必要です。"}
 ]},

{"id":"g24","lv":4,"t":"倒置・強調・省略","sub":"スポットライト演出と、あうんの呼吸","cat":"特殊構文",
 "img":"倒置は<b>「スポットライト演出」</b>です。言いたい言葉(Never, Only after など)を舞台の最前列に出すと、<span class=\"mk\">後ろは疑問文の語順にひっくり返ります</span>。強調構文 It is ~ that は「〜こそが」と<b>額縁で囲む</b>演出。省略は、言わなくてもわかる部分をカットする<b>「あうんの呼吸」</b>です。",
 "rule":["否定語(Never, Rarely, Little, Not only)が文頭 → 助動詞 + 主語 + 動詞","Only + 時・条件(Only after ~, Only if ~)が文頭 → 後ろの文が倒置","It is A that ~ = 〜なのはAだ(Aが人なら who も可)","if necessary / if possible: 主語 + be動詞(it is)を省略","while staying ~: 接続詞の後ろの 主語 + be動詞 を省略(While I was staying)"],
 "ex":[
  {"en":"Never have I seen such a beautiful view.","ja":"こんなに美しい景色は見たことがありません。","note":"否定語が先頭 → 疑問文の語順"},
  {"en":"Only after the meeting did I understand the plan.","ja":"会議の後になって初めて、その計画がわかりました。","note":"Only + 時 → 後ろが倒置"},
  {"en":"It was Tom that broke the window.","ja":"窓を割ったのはトムでした。","note":"It was ~ that = 〜こそが"},
  {"en":"Call me if necessary.","ja":"必要なら電話してください。","note":"if (it is) necessary の省略"}
 ],
 "trap":"Never I have seen はまちがいです。倒置になるのは否定語が文頭に来たときだけで、I have never seen ~ と普通の位置に置くときは倒置しません。",
 "talk":{"en":"Let me know by Friday, if possible.","ja":"できれば金曜日までに知らせてください。"},
 "build":[
  {"ja":"こんなに疲れたことはありません。","en":"Never have I been so tired."},
  {"ja":"窓を割ったのはケンでした。","en":"It was Ken who broke the window."},
  {"ja":"必要ならお手伝いできます。","en":"I can help you if necessary."}
 ],
 "q":[
  {"s":"Never ____ such a successful product launch.","c":["I have seen","I saw","have seen I","have I seen"],"a":3,"why":"否定語 Never が文頭にあるので、疑問文の語順(have + I + seen)に倒置します。"},
  {"s":"Only after the contract was signed ____ the project begin.","c":["it did","does","did","was"],"a":2,"why":"Only after ~ が文頭なので後ろは倒置。過去の話で、後ろが原形 begin なので did。"},
  {"s":"It was Ms. Patel ____ suggested the new marketing strategy.","c":["who","which","what","where"],"a":0,"why":"It was ~ that の強調構文で、強調されているのが人(Ms. Patel)なので who。"},
  {"s":"Please complete the form and, if ____, attach a copy of your ID.","c":["necessity","necessary","necessarily","necessitate"],"a":1,"why":"if (it is) necessary の省略形。be動詞の後ろなので形容詞 necessary。"},
  {"s":"Not only ____ the deadline, but she also reduced the costs.","c":["she met","met she","did she meet","she did meet"],"a":2,"why":"Not only が文頭にあるので倒置。一般動詞の過去なので did + she + meet。"},
  {"s":"Rarely ____ the CEO attend these weekly meetings.","c":["do","does","is","has"],"a":1,"why":"否定語 Rarely が文頭なので倒置。主語 the CEO は単数で、後ろが原形 attend なので does。"},
  {"s":"Little ____ that the company was about to be sold.","c":["we knew","knew we","we did know","did we know"],"a":3,"why":"否定の意味の Little(ほとんど〜ない)が文頭なので倒置。did + we + know。"},
  {"s":"While ____ in London, Mr. Ford visited several clients.","c":["staying","stay","stayed","to stay"],"a":0,"why":"While he was staying の he was が省略された形。残るのは staying。"}
 ]}
];

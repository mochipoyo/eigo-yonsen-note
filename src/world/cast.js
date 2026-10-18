// ===== ワールド: 登場人物の見た目と、シーン定義で使う共通の書き方 =====
// 座標は 1000x600。人物の y は足元。家具の y は床に接する位置。surf=天板 / under=下 / inside=中 / near=横に立つ位置 / behind=後ろ
// missions[].t は動作確認用の手順(誰が・何を・どの動作)。['drag',物,行き先] / ['direct',設備,動作] / [人,相手|'self',動作]
const LK={// 登場人物の見た目
 man:{skin:'#ffe0c7',hair:'#3a2a24',hs:'short',top:'#4a7fc1',bottom:'#3d4a5c',kind:'tee'},
 woman:{skin:'#ffe3cf',hair:'#8a4b2a',hs:'long',top:'#e7768f',bottom:'#5b6b8a',kind:'tee',skirt:true},
 boy:{skin:'#ffe0c7',hair:'#2b2b33',hs:'spiky',top:'#f2b33d',bottom:'#3f6fb0',kind:'tee',k:.78},
 girl:{skin:'#fde2cf',hair:'#5a3a2a',hs:'twin',top:'#8fd1a8',bottom:'#e98a9a',kind:'dress',k:.78},
 mother:{skin:'#ffe3cf',hair:'#3a2a24',hs:'bun',top:'#c97b6b',bottom:'#5a4a3a',kind:'apron',apron:'#c97b6b'},
 father:{skin:'#f6d3b8',hair:'#4a3a30',hs:'short',top:'#6a8f5a',bottom:'#4a4f5c',kind:'tee',glasses:true},
 barista:{skin:'#ffe0c7',hair:'#6b3f2a',hs:'pony',top:'#3d3a44',bottom:'#2b2f38',kind:'apron',apron:'#6b4a32'},
 teacher:{skin:'#ffe3cf',hair:'#3a2a24',hs:'bob',top:'#5a6b8c',bottom:'#3b4256',kind:'suit',glasses:true,tie:'#e7768f'},
 ken:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#2f3e6b',bottom:'#2f3e6b',kind:'school',k:.85},
 mia:{skin:'#fde2cf',hair:'#5a3a2a',hs:'pony',top:'#2f3e6b',bottom:'#3f5a8c',kind:'school',skirt:true,tie:'#c0392b',k:.85},
 sora:{skin:'#f6d3b8',hair:'#4a3020',hs:'spiky',top:'#2f3e6b',bottom:'#2f3e6b',kind:'school',k:.85},
 clerk:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#5aa83a',bottom:'#3d4a5c',kind:'apron',apron:'#5aa83a'},
 staff:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#2b4c8c',bottom:'#2b3550',kind:'uniform',cap:'#2b4c8c'},
 boss:{skin:'#f6d3b8',hair:'#666',hs:'short',top:'#3b4256',bottom:'#3b4256',kind:'suit',glasses:true},
 emma:{skin:'#ffe3cf',hair:'#c9853a',hs:'bob',top:'#5a6b8c',bottom:'#3b4256',kind:'suit',skirt:true,tie:'#f5c542'},
 ryo:{skin:'#ffe0c7',hair:'#2b2b33',hs:'spiky',top:'#e9eef5',bottom:'#4a4f5c',kind:'suit',tie:'#2a63c4'},
 waiter:{skin:'#ffe0c7',hair:'#3a2a24',hs:'short',top:'#f6f6f2',bottom:'#2b2b33',kind:'suit',tie:'#2b2b33'},
 swimman:{skin:'#f6d3b8',hair:'#3a2a24',hs:'short',top:'#f28b7f',bottom:'#3a8fd0',kind:'tee',shortSleeve:true},
 swimwoman:{skin:'#ffe3cf',hair:'#8a4b2a',hs:'pony',top:'#f5c542',bottom:'#f5c542',kind:'dress'},
 guest:{skin:'#f3cfb3',hair:'#2f2f3a',hs:'bob',top:'#3aa0db',bottom:'#4a4f5c',kind:'hoodie'},
 recep:{skin:'#ffe3cf',hair:'#2b2b33',hs:'bun',top:'#7a2638',bottom:'#2b2b33',kind:'suit',skirt:true,tie:'#f5c542'},
 traveler:{skin:'#ffe0c7',hair:'#4a3020',hs:'short',top:'#e98a4a',bottom:'#3d4a5c',kind:'hoodie'},
 traveler2:{skin:'#fde2cf',hair:'#2b2b33',hs:'long',top:'#5aa8a0',bottom:'#3d4a5c',kind:'tee',skirt:true},
 agent:{skin:'#f6d3b8',hair:'#3a2a24',hs:'bob',top:'#2a63c4',bottom:'#2b3550',kind:'uniform',skirt:true},
 gstaff:{skin:'#ffe0c7',hair:'#2b2b33',hs:'short',top:'#2a63c4',bottom:'#2b3550',kind:'uniform'},
 cyclist:{skin:'#ffe0c7',hair:'#3a2a24',hs:'short',top:'#3aa0db',bottom:'#2b2f38',kind:'hoodie',bike:'#3a8a5a'},
};
const P=(id,en,ja,pron,look,x,y,o={})=>({id,k:'person',en,ja,pron,look,x,y,...o});
// ---- 会話ミッションを書くための部品 ----
const I=(id,units,model,o={})=>({id,units,model,...o});// 意図: 意味のかたまり・模範の言い方
const SAY=(npc,say,ja,o={})=>({npc,say,ja,...o});
const DO=(...ops)=>({do:ops});
// よく使う「意味のかたまり」(言い方の候補)。照合のときに短縮形はそろえる(don't → do not)
const U={
 req:['please','could i','can i','may i','i would like','i will have','could you','can you','would you','could we','can we','i will get','let me get','i will take'],
 could:['could you','can you','would you','will you','could i','can i','may i'],
 sorry:['afraid','sorry','unfortunately','apolog*'],
 outof:['out of','sold out','run out','ran out','no more','do not have any','do not have','dont have','not available','none left','finished'],
 propose:['how about','what about','would you like','can i suggest','could i suggest','why not','maybe','instead','i recommend','we have','we do have','try'],
 yes:['yes','yeah','yep','sure','of course','certainly','no problem','ok','okay','absolutely','go ahead','right','fine'],
 no:['no','nope','not really'],
 notatall:['not at all','no problem','of course not','go ahead','i do not mind','dont mind','no not at all','sure','no','no worries','that is fine','thats fine','fine','okay'],
 thanks:['thank you','thanks','appreciate','cheers'],
 bye:['have a nice day','have a good day','have a great day','enjoy','see you','take care','come again','bye','goodbye','have a good one','have a nice','have a good'],
 hello:['hello','hi','good morning','good afternoon','good evening','hey','welcome'],
 problem:['problem with','problem','something wrong','wrong with','issue','does not work','is not working','not working','broken','doesnt work','isnt working'],
 mean:['what i mean','i mean','i meant','i said','what i said','i ordered','i wanted','i asked for','actually'],
 doyoumean:['do you mean','you mean','did you say','you said','so you mean','is that'],
 reason:['the reason','because','since','that is why','thats why','due to'],
 think:['i think','i believe','in my opinion','i feel','maybe we should','we should','i suggest','how about'],
};


import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class gameUI extends View {
		public gameBg:Laya.Panel;
		public gameBg1:Laya.Image;
		public gameBg2:Laya.Image;
		public gameBg3:Laya.Image;
		public gameScore:laya.display.Text;
		public gameBall:Laya.Image;
		public gameNav:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":749,"var":"gameBg","height":1470},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"gameBg1","skin":"res/bg@2x.jpg","height":1470}},{"type":"Image","props":{"y":0,"x":750,"width":750,"var":"gameBg2","skin":"res/bg@2x.jpg","height":1470}},{"type":"Image","props":{"y":0,"x":1500,"width":750,"var":"gameBg3","skin":"res/bg@2x.jpg","height":1470},"child":[{"type":"Image","props":{"y":372,"x":186,"width":56,"skin":"res/hider.png","height":56}}]}]},{"type":"Image","props":{"y":78,"x":67,"width":1,"visible":false,"pivotY":68,"pivotX":57,"height":1},"child":[{"type":"Image","props":{"y":66,"x":57,"width":200,"visible":true,"skin":"res/border.png","height":76},"child":[{"type":"Text","props":{"y":0,"x":110,"width":85,"visible":true,"valign":"middle","text":"0","height":78,"fontSize":60,"color":"#000000","align":"center"}},{"type":"Image","props":{"y":25,"x":24,"width":40,"visible":true,"skin":"res/zuanshi.png","height":40}},{"type":"Text","props":{"y":6,"x":78,"width":43,"visible":true,"text":"x","height":45,"font":"20","color":"#000000"}}]},{"type":"Image","props":{"y":66,"x":282,"width":200,"visible":true,"skin":"res/border.png","height":76},"child":[{"type":"Text","props":{"y":-3,"x":0,"width":136,"visible":true,"var":"gameScore","valign":"middle","text":"0","height":79,"fontSize":60,"color":"#000000","bold":true,"align":"right"}},{"type":"Text","props":{"y":83,"x":153,"width":58,"visible":true,"valign":"middle","text":"米","pivotY":71,"pivotX":18,"height":63,"fontSize":40,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":938,"x":-3,"width":298,"visible":true,"skin":"res/yandou.png","height":199}},{"type":"Image","props":{"y":857,"x":192,"width":76,"visible":true,"var":"gameBall","skin":"res/ball.png","height":76}}]},{"type":"Image","props":{"y":258,"x":79,"visible":false,"var":"gameNav","skin":"res/nav.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.gameUI.uiView);

        }

    }
}

module ui {
    export class indexUI extends View {
		public bg:Laya.Panel;
		public bg1:Laya.Image;
		public bg2:Laya.Image;
		public bg3:Laya.Image;
		public bgbottom:Laya.Image;
		public gamescene:Laya.Image;
		public challengeList:Laya.Image;
		public backBtn:Laya.Image;
		public invitChallengeBtn:Laya.Image;
		public game:Laya.Image;
		public score:laya.display.Text;
		public gameThing:Laya.Image;
		public ball:Laya.Image;
		public timeout:Laya.Image;
		public timeNum:laya.display.Text;
		public currentScore:Laya.Image;
		public currentBg:Laya.Image;
		public scoreM:Laya.Label;
		public useCardFalse:Laya.Label;
		public heart:Laya.Image;
		public cardNum:Laya.Label;
		public cardBtn:Laya.Image;
		public resumText:Laya.Image;
		public resumBtn:Laya.Image;
		public toAv:Laya.Image;
		public videoIcon:Laya.Image;
		public currentCloseBtn:Laya.Image;
		public noCardTips:Laya.Image;
		public jumpOff:Laya.Image;
		public resultPage:Laya.Image;
		public shareimg:Laya.Image;
		public userHead:Laya.Image;
		public resultScore:Laya.Label;
		public percent:Laya.Label;
		public gameAgain:Laya.Image;
		public saveImg:Laya.Image;
		public reviveBtn:Laya.Image;
		public cardN:Laya.Label;
		public back:Laya.Image;
		public resultIcon:Laya.Image;
		public invitBtn:Laya.Image;
		public more:Laya.Image;
		public indexBtn:Laya.Image;
		public friendRelay:Laya.Image;
		public giftBox:Laya.Image;
		public giftBtn:Laya.Image;
		public resultUrl:Laya.Image;
		public giftBg:Laya.Image;
		public giftClose:Laya.Image;
		public sendGift:Laya.Image;
		public giftOFF:Laya.Image;
		public index:Laya.Image;
		public head:Laya.Image;
		public nickName:laya.display.Text;
		public startGame:Laya.Image;
		public skinShop:Laya.Image;
		public grounRank:Laya.Image;
		public corpation:Laya.Image;
		public friendsList:Laya.Image;
		public worldRankBtn:Laya.Image;
		public moreGame:Laya.Image;
		public music_btn:Laya.Image;
		public revive:Laya.Image;
		public cardIndx:Laya.Label;
		public closeBtn:Laya.Image;
		public shareBtn:Laya.Image;
		public reviveClose:Laya.Image;
		public nav:Laya.Image;
		public relay:Laya.Image;
		public relayList:Laya.List;
		public face:Laya.Image;
		public myName:Laya.Label;
		public indexScore:laya.display.Text;
		public finalScore:laya.display.Text;
		public bestRelay:laya.display.Text;
		public backIndex:Laya.Image;
		public startRelay:Laya.Image;
		public backbackRelay:Laya.Image;
		public addToMy:Laya.Image;
		public rankList:Laya.Image;
		public rankbg:Laya.Image;
		public rList:Laya.List;
		public rankbk:Laya.Image;
		public mRank:laya.display.Text;
		public myFace:Laya.Image;
		public mUser:Laya.Label;
		public mScore:Laya.Label;
		public backBtnList:Laya.Image;
		public rankListTab:Laya.Image;
		public fontPage:Laya.Image;
		public nextPage:Laya.Image;
		public rankSprite:Laya.Sprite;
		public backback:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":750,"visible":false,"var":"bg","height":1334},"child":[{"type":"Image","props":{"var":"bg1","top":0,"skin":"res/bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Image","props":{"var":"bg2","top":0,"skin":"res/bg.jpg","left":750,"bottom":0}},{"type":"Image","props":{"var":"bg3","top":0,"skin":"res/bg.jpg","left":1500,"bottom":0},"child":[{"type":"Image","props":{"y":484,"x":188,"width":56,"visible":false,"skin":"res/hider.png","height":56,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":808,"x":216,"width":150,"visible":false,"skin":"res/star.png","height":150}},{"type":"Image","props":{"visible":false,"skin":"res/first.png"}}]}]},{"type":"Image","props":{"y":1334,"x":0,"var":"bgbottom","skin":"res/bg.jpg"}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"gamescene","height":1334}},{"type":"Image","props":{"y":0,"x":0,"width":750,"visible":false,"var":"challengeList","skin":"res/bg@2x.jpg","height":1334},"child":[{"type":"Label","props":{"y":315,"x":0,"width":754,"valign":"middle","text":"淡墨痕story","height":81,"fontSize":30,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":397,"x":34},"child":[{"type":"Image","props":{"y":33,"x":228}},{"type":"Image","props":{"y":101,"x":32},"child":[{"type":"List","props":{"width":620,"height":520},"child":[{"type":"Box","props":{"y":97,"x":297,"width":618,"pivotY":97,"pivotX":297,"height":144},"child":[{"type":"Text","props":{"y":46,"x":38,"width":59,"text":"1","height":60,"fontSize":40,"color":"#ffffff"}},{"type":"Image","props":{"y":31,"x":139,"width":88,"height":85}},{"type":"Text","props":{"y":26,"x":248,"width":211,"valign":"middle","text":"用户名称","height":84,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":31,"x":464,"width":135,"valign":"middle","text":"6879分","height":85,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Line","props":{"y":139,"x":32,"toY":1.3513513513513544,"toX":571.3513513513515,"lineWidth":1,"lineColor":"#ffffff"}}]}]}]}]},{"type":"Image","props":{"y":166,"x":290}},{"type":"Image","props":{"y":51,"x":48,"var":"backBtn"}},{"type":"Image","props":{"y":1142,"x":84,"width":596,"var":"invitChallengeBtn","height":124}}]},{"type":"Image","props":{"y":0,"x":0,"width":750,"visible":false,"var":"game","height":1334},"child":[{"type":"Image","props":{"y":50,"x":44,"width":200,"skin":"res/border.png","height":76},"child":[{"type":"Text","props":{"y":-3,"x":0,"width":136,"var":"score","valign":"middle","text":"0","height":79,"fontSize":60,"color":"#000000","bold":true,"align":"right"}},{"type":"Text","props":{"y":77,"x":150,"width":58,"valign":"middle","text":"m","pivotY":71,"pivotX":18,"height":63,"fontSize":40,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":806,"x":0,"width":294,"var":"gameThing","skin":"res/down.png","height":335}},{"type":"Image","props":{"y":894,"x":229,"width":76,"var":"ball","skin":"res/football.png","height":76,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":492,"x":255,"var":"timeout","skin":"res/timeOut.png"},"child":[{"type":"Text","props":{"y":9,"x":58,"width":150,"var":"timeNum","text":"3","pivotY":-49,"pivotX":7,"height":133,"fontSize":120,"color":"#FFFFFF","align":"center"}}]}]},{"type":"Image","props":{"y":0,"x":0,"width":750,"visible":false,"var":"currentScore","skin":"res/cover7.png","height":1334},"child":[{"type":"Image","props":{"y":239,"x":76,"width":607,"var":"currentBg","skin":"res/bg1.png","height":659},"child":[{"type":"Label","props":{"y":50,"x":0,"width":607,"valign":"middle","text":"-  当前成绩  - ","height":67,"fontSize":30,"color":"#000000","bold":true,"align":"center"}},{"type":"Label","props":{"y":90,"x":0,"width":607,"var":"scoreM","valign":"middle","text":"86m","height":136,"fontSize":80,"color":"#000000","bold":true,"align":"center"}},{"type":"Label","props":{"y":248,"x":1,"width":607,"var":"useCardFalse","valign":"middle","text":"是否复活？","height":139,"fontSize":36,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":386,"x":239,"width":54,"var":"heart","skin":"res/heart.png","height":48}},{"type":"Label","props":{"y":380,"x":309,"width":57,"var":"cardNum","valign":"middle","text":"x 0","height":60,"fontSize":40,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":493,"x":86,"var":"cardBtn","skin":"res/btn_nocards.png"}},{"type":"Image","props":{"y":314,"x":65,"var":"resumText","skin":"res/resum_2_txt.png"}},{"type":"Image","props":{"y":455,"x":198,"var":"resumBtn","skin":"res/resum_2_btn.png"}},{"type":"Image","props":{"y":493,"x":329,"var":"toAv","skin":"res/mid_btn.png","name":"toAv"}},{"type":"Image","props":{"y":378,"x":264,"var":"videoIcon","skin":"res/mid_icon.png"}},{"type":"Image","props":{"y":26,"x":520,"var":"currentCloseBtn","skin":"res/btn_close.png"}}]},{"type":"Image","props":{"y":438,"x":273,"visible":false,"var":"noCardTips","skin":"res/noCardTips.png"}},{"type":"Image","props":{"y":954,"x":304,"var":"jumpOff","skin":"res/jumpOff.png"}}]},{"type":"Image","props":{"y":0,"x":0,"width":750,"visible":false,"var":"resultPage","skin":"res/cover7.png","height":1334},"child":[{"type":"Image","props":{"y":251,"x":70,"width":600,"var":"shareimg","skin":"res/result_bg.png","height":490},"child":[{"type":"Image","props":{"y":380,"x":37,"width":200,"height":62},"child":[{"type":"Image","props":{"y":0,"x":0,"width":60,"var":"userHead","height":60},"child":[{"type":"Image","props":{"y":0,"x":0,"width":60,"skin":"res/result_avart_mask.png","height":60}}]}]},{"type":"Image","props":{"y":98,"x":169,"width":270,"skin":"res/result_moren.png","height":270}},{"type":"Label","props":{"y":414,"x":98,"width":71,"text":"已超越","height":23,"fontSize":20,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":539,"x":151},"child":[{"type":"Label","props":{"y":-170,"x":-43,"width":121,"var":"resultScore","valign":"middle","text":"2m","height":43,"fontSize":36,"color":"#18171A","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":416,"x":171,"width":49,"var":"percent","text":"78%","pivotY":3,"pivotX":3,"height":23,"fontSize":20,"color":"#000000","bold":true}},{"type":"Label","props":{"y":414,"x":209,"width":70,"text":"的玩家","height":23,"fontSize":20,"color":"#000000","bold":true}},{"type":"Image","props":{"y":34,"x":34,"skin":"res/result_icon.png"}},{"type":"Image","props":{"y":342,"x":458,"width":98,"skin":"res/erweima.jpg","height":98}}]},{"type":"Image","props":{"y":760,"x":81,"var":"gameAgain","skin":"res/btn_continue.png"}},{"type":"Image","props":{"y":760,"x":204,"var":"saveImg","skin":"res/btn_save.png"}},{"type":"Image","props":{"y":760,"x":389,"width":110,"var":"reviveBtn","skin":"res/btn_card.png","height":98},"child":[{"type":"Label","props":{"y":53,"x":127,"width":68,"var":"cardN","text":"x 0","pivotY":23,"pivotX":43,"height":31,"fontSize":24,"color":"#ffffff","bold":false}},{"type":"Image","props":{"y":-720,"x":-363,"width":400,"var":"back","height":320,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":760,"x":564,"var":"resultIcon"}},{"type":"Image","props":{"y":898,"x":397,"var":"invitBtn","skin":"res/btn_invite_callenge.png"}},{"type":"Image","props":{"y":750,"x":450,"width":80,"var":"more","skin":"res/more_card.png","height":32}},{"type":"Image","props":{"y":0,"x":0,"width":200,"var":"indexBtn","height":200},"child":[{"type":"Image","props":{"y":40,"x":20,"skin":"res/btn_home.png"}}]},{"type":"Image","props":{"y":899,"x":73,"var":"friendRelay","skin":"res/friendrelay_btn.png"},"child":[{"type":"Image","props":{"y":21,"x":39,"skin":"res/dup.png"}}]},{"type":"Image","props":{"y":143,"x":642,"var":"giftBox","skin":"res/bg_gift.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":76,"x":588,"var":"giftBtn","skin":"res/gift_box.png"}},{"type":"Image","props":{"var":"resultUrl"}},{"type":"Image","props":{"var":"giftBg","skin":"res/cover7.png"},"child":[{"type":"Image","props":{"y":341,"x":78,"skin":"res/bg2.png"},"child":[{"type":"Image","props":{"y":51,"x":213,"skin":"res/txt_bag.png"}},{"type":"Image","props":{"y":15,"x":522,"var":"giftClose","skin":"res/btn_close.png"}},{"type":"Image","props":{"y":177,"x":162,"skin":"res/messgae.png"}},{"type":"Image","props":{"y":448,"x":135,"var":"sendGift","skin":"res/btn_sendbag.png"}},{"type":"Image","props":{"y":0,"x":503,"width":100,"var":"giftOFF","height":100}}]}]}]},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"index","height":1334},"child":[{"type":"Image","props":{"y":177,"x":353,"width":150,"var":"head","pivotY":77,"pivotX":65,"height":150},"child":[{"type":"Image","props":{"y":0,"x":0,"width":150,"skin":"res/avart_mask.png","height":150}}]},{"type":"Text","props":{"y":281,"x":-2,"width":749,"var":"nickName","height":59,"fontSize":40,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":342,"x":51,"width":660,"skin":"res/index_logo.png","height":400}},{"type":"Image","props":{"y":773,"x":51,"width":660,"var":"startGame","skin":"res/start_game_btn.png","height":120}},{"type":"Image","props":{"y":1079,"x":312,"width":400,"var":"skinShop","skin":"res/honor_btn.png","height":160}},{"type":"Image","props":{"y":1080,"x":51,"width":230,"var":"grounRank","skin":"res/group_rank_btn.png","height":160}},{"type":"Image","props":{"y":643,"x":671,"width":159,"var":"corpation","skin":"res/bg_gift.png","height":179,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":929,"x":51,"width":370,"var":"friendsList","skin":"res/friend_rank_btn.png","height":120}},{"type":"Image","props":{"y":927,"x":449,"width":260,"var":"worldRankBtn","skin":"res/world_rank_btn.png","height":120}},{"type":"Image","props":{"y":586,"x":77,"width":142,"var":"moreGame","height":168,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":595,"x":633,"width":89,"skin":"res/btn_gift.png","height":98}},{"type":"Image","props":{"y":26,"x":104,"var":"music_btn","skin":"res/sound_on.png"}}]},{"type":"Image","props":{"y":0,"x":0,"width":750,"visible":false,"var":"revive","skin":"res/cover7.png","height":1334},"child":[{"type":"Image","props":{"y":354,"x":75,"skin":"res/bg2.png"}},{"type":"Label","props":{"y":362,"x":79,"width":594,"valign":"middle","text":"复活卡","height":115,"fontSize":50,"color":"#000000","bold":true,"align":"center"}},{"type":"Label","props":{"y":508,"x":79,"width":594,"valign":"middle","text":"邀请好友可得复活卡","height":101,"fontSize":36,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":645,"x":306,"width":54,"skin":"res/heart.png","height":48}},{"type":"Label","props":{"y":653,"x":371,"width":84,"var":"cardIndx","text":"x 1","height":44,"fontSize":40,"color":"#000000","bold":true}},{"type":"Label","props":{"y":703,"x":81,"width":603,"valign":"middle","text":"最多可拥有2张","height":99,"fontSize":26,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":364,"x":587,"width":73,"var":"closeBtn","skin":"res/btn_close.png","height":73}},{"type":"Image","props":{"y":802,"x":282,"var":"shareBtn","skin":"res/yaoqing.png"}},{"type":"Image","props":{"y":354,"x":575,"width":100,"var":"reviveClose","height":100}}]},{"type":"Image","props":{"y":346,"x":94,"visible":false,"var":"nav","skin":"res/nav.png"}},{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"relay","skin":"res/bg.jpg","height":1334},"child":[{"type":"Image","props":{"y":251,"x":41,"width":686,"skin":"res/rank_bg2.png","height":831},"child":[{"type":"List","props":{"y":175,"x":22,"width":641,"var":"relayList","repeatY":5,"repeatX":1,"height":632},"child":[{"type":"Box","props":{"y":51,"x":69,"width":603,"pivotY":43,"pivotX":81,"name":"render","height":125},"child":[{"type":"Image","props":{"y":-8,"x":-8,"width":70,"skin":"res/rank_other_rank_bg.png","pivotY":-14,"pivotX":-24,"name":"rk","height":36},"child":[{"type":"Text","props":{"y":-1,"x":6,"width":65,"valign":"middle","text":"1","name":"relayRank","height":34,"fontSize":30,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":30,"x":100,"width":90,"name":"relayFace","height":90},"child":[{"type":"Image","props":{"y":0,"x":0,"width":90,"skin":"res/rank_other_bg.png","height":90}}]},{"type":"Label","props":{"y":26,"x":241,"width":200,"valign":"middle","text":"用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名用户名","overflow":"hidden","name":"relayNameNn","height":84,"fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":27,"x":436,"width":152,"valign":"middle","text":"871分","strokeColor":"#000000","stroke":4,"name":"relayMk","height":76,"fontSize":30,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Line","props":{"y":121,"x":245,"toY":-1.1969111969111168,"toX":344.0154440154438,"lineWidth":1,"lineColor":" #91DAF2"}}]}]},{"type":"Image","props":{"y":34,"x":92,"width":79,"var":"face","height":79},"child":[{"type":"Image","props":{"y":-1,"x":-1,"width":80,"skin":"res/rank_head_self.png","height":80}}]},{"type":"Label","props":{"y":116,"x":78,"width":95,"var":"myName","valign":"middle","overflow":"hidden","height":37,"fontSize":20,"color":"#000000","bold":true,"align":"center"}},{"type":"Text","props":{"y":34,"x":326,"width":94,"valign":"middle","text":"初始成绩：","height":37,"fontSize":20,"color":"#000000","bold":true,"align":"center"}},{"type":"Text","props":{"y":82,"x":324,"width":103,"text":"最佳助力：","height":32,"fontSize":20,"color":"#000000","bold":true}},{"type":"Text","props":{"y":125,"x":327,"width":85,"text":"最终成绩：","height":25,"fontSize":20,"color":"#000000","bold":true}},{"type":"Line","props":{"y":24,"x":248,"toY":119.38775510204084,"toX":0,"lineWidth":1,"lineColor":"#A3D0D9"}},{"type":"Image","props":{"y":33,"x":443,"skin":"res/rank_result_bg.png"},"child":[{"type":"Text","props":{"y":-2,"x":0,"width":201,"var":"indexScore","valign":"middle","text":"66米","height":33,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":121,"x":443,"skin":"res/rank_result_bg.png"},"child":[{"type":"Text","props":{"y":0,"x":0,"width":201,"var":"finalScore","valign":"middle","text":"100米","height":33,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":76,"x":443,"skin":"res/rank_result_bg.png"},"child":[{"type":"Text","props":{"y":-2,"x":0,"width":201,"var":"bestRelay","valign":"middle","text":"34米","height":33,"fontSize":20,"color":"#000000","bold":true,"align":"center"}}]}]},{"type":"Image","props":{"y":61,"x":52,"var":"backIndex","skin":"res/back_btn.png"}},{"type":"Image","props":{"y":1131,"x":82,"var":"startRelay","skin":"res/btn_relay_4.png"}},{"type":"Image","props":{"y":3,"x":3,"width":172,"var":"backbackRelay","height":172}}]},{"type":"Image","props":{"y":60,"x":219,"var":"addToMy","skin":"res/nnnnav.png","anchorY":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":750,"visible":false,"var":"rankList","skin":"res/bg.jpg","height":1334},"child":[{"type":"Image","props":{"y":241,"x":31,"width":686,"var":"rankbg","skin":"res/rank_bg1.png","height":831},"child":[{"type":"List","props":{"y":19,"x":25,"width":641,"var":"rList","repeatY":5,"repeatX":1,"height":644},"child":[{"type":"Box","props":{"y":45,"x":70,"width":632,"pivotY":43,"pivotX":81,"name":"render","height":125},"child":[{"type":"Image","props":{"y":-8,"x":-8,"width":70,"skin":"res/rank_other_rank_bg.png","pivotY":-14,"pivotX":-24,"name":"rk","height":36},"child":[{"type":"Text","props":{"y":-1,"x":6,"width":65,"valign":"middle","text":"1","name":"rank","height":34,"fontSize":30,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":30,"x":100,"width":90,"name":"face","height":90},"child":[{"type":"Image","props":{"y":0,"x":0,"width":90,"skin":"res/rank_other_bg.png","height":90}}]},{"type":"Label","props":{"y":26,"x":241,"width":217,"valign":"middle","text":"用户名","overflow":"hidden","name":"name","height":84,"fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":27,"x":439,"width":149,"valign":"middle","text":"871分","strokeColor":"#000000","stroke":4,"name":"mk","height":76,"fontSize":30,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Line","props":{"y":121,"x":245,"toY":-1.1969111969111168,"toX":344.0154440154438,"lineWidth":1,"lineColor":" #91DAF2"}}]}]},{"type":"Image","props":{"y":666,"x":-22,"width":102,"var":"rankbk","skin":"res/rank_my_rank_bg.png","pivotY":-14,"pivotX":-24,"height":36},"child":[{"type":"Text","props":{"y":-2,"x":1,"width":98,"var":"mRank","valign":"middle","text":"1","height":27,"fontSize":36,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":706,"x":114,"width":79,"var":"myFace","height":79},"child":[{"type":"Image","props":{"y":-1,"x":-1,"width":80,"skin":"res/rank_head_self.png","height":80}}]},{"type":"Label","props":{"y":706,"x":258,"width":183,"var":"mUser","valign":"middle","text":"用户名","overflow":"hidden","height":80,"fontSize":30,"color":"#2D2E2E","bold":true,"align":"left"}},{"type":"Label","props":{"y":706,"x":482,"width":124,"var":"mScore","valign":"middle","text":"871分","strokeColor":"#000000","stroke":4,"height":76,"fontSize":30,"color":"#FFFFFF","bold":true,"align":"right"}}]},{"type":"Image","props":{"y":51,"x":42,"width":63,"var":"backBtnList","skin":"res/back_btn.png","height":60}},{"type":"Image","props":{"y":161,"x":256,"var":"rankListTab","skin":"res/rank_friend.png"}},{"type":"Image","props":{"y":1115,"x":67,"var":"fontPage","skin":"res/rank_last.png"}},{"type":"Image","props":{"y":1115,"x":388,"var":"nextPage","skin":"res/rank_next.png"}},{"type":"Sprite","props":{"y":0,"x":0,"var":"rankSprite","name":"rankSprite"}},{"type":"Image","props":{"y":0,"x":0,"width":164,"var":"backback","height":172}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.indexUI.uiView);

        }

    }
}

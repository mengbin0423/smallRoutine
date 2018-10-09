import SoundManager = Laya.SoundManager;
import Handler = Laya.Handler;


class IndexV extends ui.indexUI {
    public arr: Array<Object> = [];
    public jewelArr: Array<Object> = [];
    public hiderArr:Array<Object> = [];
    public starArr:Array<Object> = [];
    public boomArr:Array<Object> = [];
    private num: number = 0;
     public mSDKVersion:string = "";
    private master_uid:number;
    private master_mark:number;
    private master_id:number;
    public crackRadius: number = 60;
    public hiderPos: Object;
    private scoreNum: number = 0;
    public animation2;
     public mType:number = 0;
    public skinName: String;
    public skinBuy: boolean = true;
    public track;
    public openSound:boolean = true; // 记录是否静音
    public speedDown:number=5;//下落速度
    public speedUp:number=-5;//上升速度
    
    public showCloseBtn:boolean = false;
    public banner = null;//广告

    public modalNum:number=0;

    public startMusic:boolean = false;

    public wudiY: boolean=false;
    public ids: IndexV;
    public scoreRrep:Number = 0;
    private dataPage: number = 0;
    public mWX: wxMinPro;
    public wRankData: Array<Object> = [];
    public wRelayData: Array<Object> = [];
    private cWRankPage: number = 1;
    public changeP:Array<Object> = [-0.2,-0.1,0.1,0.2]
    public gameMusic;
    public wudiMusic;
    public mVersion:string='';
    public type:boolean = true;
    public relayType:boolean = true;
   

    public mScreenHeight:number = 0;
    public mScreenWidth:number = 0;

    public videoShow:boolean = true;

    public showVideobtn:boolean = false;

    public gameClub = null;//论坛
    public music_btn_type:boolean = true;
    public gameOver:boolean = false;


    public  top1:number = 0;
    public  top2:number = 0;
    public  top3:number = 0;
    public  top4:number = 0;
    public  top5:number = 0;
    public  top6:number = 0;
    public  top7:number = 0;
    public  top8:number = 0;
    public  top9:number = 0;
    public  top10:number = 0;
    public  top11:number = 0;
    public  top12:number = 0;


    constructor() {
        super();
        var info = wx.getSystemInfoSync();
        this.mVersion = info['version']  
        this.mSDKVersion = info['SDKVersion']
        this.mScreenHeight = Number(info['screenHeight']);
        this.mScreenWidth = Number(info['screenWidth']);
        this.height = Laya.stage.height;   
        if(info['brand'] == 'vivo'){
          this.bg.height = 1660;
        }else{
          this.bg.height = Laya.stage.height;
        }    
 
        this.init();
        this.y = (Laya.stage.height - 1334) / 2;
        this.bg.height = Laya.stage.height;
       
        this.top1 = this.currentBg.y;
        this.top2 =  this.jumpOff.y 
        this.top3 =  this.shareimg.y 
        this.top4 =  this.gameAgain.y 
        this.top5 =  this.saveImg.y 
        this.top6 =  this.invitBtn.y 
        this.top7 =  this.friendRelay.y 
        this.top8 =  this.reviveBtn.y 
        this.top9 =  this.giftBox.y 
        this.top10 =  this.giftBtn.y 
        this.top11 =  this.resultIcon.y
        this.top12 =  this.more.y 

        this.back.zOrder=999;
        this.currentScore.y = -(Laya.stage.height - 1334) / 2;
        this.revive.y = -(Laya.stage.height - 1334) / 2;
        this.resultPage.y = -(Laya.stage.height - 1334) / 2;

        // this.indexBtn.y = this.indexBtn.y + (Laya.stage.height - 1334) / 2;

        this.shareimg.y = this.shareimg.y + (Laya.stage.height - 1334) / 2;
        this.gameAgain.y = this.gameAgain.y + (Laya.stage.height - 1334) / 2;
        this.saveImg.y = this.saveImg.y + (Laya.stage.height - 1334) / 2;
        this.invitBtn.y = this.invitBtn.y + (Laya.stage.height - 1334) / 2;
        this.friendRelay.y = this.friendRelay.y + (Laya.stage.height - 1334) / 2;
        this.reviveBtn.y = this.reviveBtn.y + (Laya.stage.height - 1334) / 2;
        this.giftBox.y = this.giftBox.y + (Laya.stage.height - 1334) / 2;
        this.giftBtn.y = this.giftBtn.y + (Laya.stage.height - 1334) / 2;
        this.resultIcon.y = this.resultIcon.y + (Laya.stage.height - 1334) / 2;
        this.more.y = this.more.y +  (Laya.stage.height - 1334) / 2;
        this.giftBg.height = Laya.stage.height;
         
        console.log('高度'+Laya.stage.height)
       if(Laya.stage.height > 1600){
            
            this.indexBtn.y = this.indexBtn.y + 80 ;
            //  this.back.y = this.indexBtn.y - 100 ;
            this.addToMy.y = this.addToMy.y -  70;
        }
        
        if(Laya.stage.height > 1334 &&　Laya.stage.height < 1600){
            // this.indexBtn.y = this.indexBtn.y - 80 ;
            //  this.back.y = this.indexBtn.y - 100 ;
            this.addToMy.y = this.addToMy.y -  70;
        }
        
        this.currentBg.y =  this.currentBg.y +  (Laya.stage.height - 1334) / 2;
        this.noCardTips.y = this.noCardTips.y +  (Laya.stage.height - 1334) / 2;
        this.jumpOff.y = this.jumpOff.y +  (Laya.stage.height - 1334) / 2;

        // this.index.y = this.index.y + (Laya.stage.height - 1334) / 2;
        this.music_btn.y = this.music_btn.y - (Laya.stage.height - 1334) / 2

        this.currentScore.height = Laya.stage.height; 
        this.revive.height = Laya.stage.height; 
        this.resultPage.height = Laya.stage.height; 

        this.bg.y = - (Laya.stage.height - 1334) / 2
        wx.onShareAppMessage(function () {
            return {
                title: "吹啊~吹啊~我的骄傲放纵~来快活啊！",
                imageUrl: "res/title.png",
                query: "uid=123&score=0&client=0&type=0&id=0&invit=0"
            }
        });

        this.tween1(this.moreGame)
    }

    init() {
        
        this.arr = [];
        this.scoreNum = 0;
        this.rList.renderHandler = new Laya.Handler(this, this.updateUser);
        this.relayList.renderHandler = new Laya.Handler(this,this.updateRelayUser)
        this.toAv.visible = false;
        this.videoIcon.visible = false;
        this.bgbottom.visible = true;

        console.log('论坛')
        
        this.initMusic();
        
        this.challengeList.visible = false;
        this.index.visible = true;
        this.ball.visible = false;
        this.gameThing.visible = false;
        this.rankList.visible = false;
        this.relay.visible = false;

        this.score.text = (this.scoreRrep).toString()
        this.game.visible = false;
        this.revive.visible = false;
        this.currentScore.visible = false;
         this.currentScore.zOrder = -11;
        this.resultPage.visible = false;
        this.resultPage.zOrder = -11;
        this.addToMy.visible = false;
        this.addToMy.zOrder = -11;
        
        this.noCardTips.visible = false;
        this.bg.visible = true;
        this.nav.visible = false;
        
        this.timeout.visible = false;
        this.gamescene.visible = true;

        this.ball.zOrder = 99999;
        this.startGame.on(Events.CLICK, this, this.onstartGame);
        this.backBtn.on(Events.CLICK, this, this.onbackBtn);
        this.skinShop.on(Events.CLICK, this, this.onskinShop);
        this.friendsList.on(Events.CLICK, this, this.onFriendsList);
        this.worldRankBtn.on(Events.CLICK, this, this.onWorldRankBtn);
        this.grounRank.on(Events.CLICK, this, this.onGrounRank);
        this.corpation.on(Events.CLICK, this, this.oncorpation);
        this.closeBtn.on(Events.CLICK, this, this.oncloseBtn);
        this.reviveClose.on(Events.CLICK, this, this.oncloseBtn);
        this.shareBtn.on(Events.CLICK, this, this.onshareBtn);
        this.gameAgain.on(Events.CLICK, this, this.onGameAgain);
        this.saveImg.on(Events.CLICK, this, this.onsaveImg);
        
        this.resumBtn.on(Events.CLICK,this,this.onResumBtn)

        this.backIndex.on(Events.CLICK,this,this.onRelayBackBtn)
        this.backbackRelay.on(Events.CLICK,this,this.onRelayBackBtn)


        this.indexBtn.on(Events.CLICK, this, this.onIndexBtn);
        this.invitBtn.on(Events.CLICK, this, this.onInvitBtn);
        this.jumpOff.on(Events.CLICK, this, this.onJumpOff);
        this.cardBtn.on(Events.CLICK, this, this.onCardBtn);
        
        this.currentCloseBtn.on(Events.CLICK,this,this.onJumpOff)

        this.backBtnList.on(Events.CLICK, this, this.onBackBtnList);
        this.backback.on(Events.CLICK, this, this.onBackBtnList);
       
        this.nav.on(Events.CLICK, this, this.onStartAni)

        this.fontPage.on(Events.CLICK,this,this.onchangePage,["previous"])//
        this.nextPage.on(Events.CLICK,this,this.onchangePage,["next"])

        this.moreGame.on(Events.CLICK, this, this.moreGameBtn,[this.moreGame])
        this.startRelay.on(Events.CLICK,this,this.onStartRelay)

        this.bg.on(Events.MOUSE_DOWN, this, this.numDown)
        this.bg.on(Events.MOUSE_UP, this, this.numUp)
        //购买皮肤
        
        Laya.timer.frameLoop(3,this,this.corpationAnimation)
        Laya.timer.frameLoop(3,this,this.giftBtnanimation)
        

        this.gameMusic = wx.createInnerAudioContext();
        this.gameMusic.src= 'sounds/bgm.mp3';
        this.gameMusic.loop = true;
        this.gameMusic.volume = 1;

        this.wudiMusic = wx.createInnerAudioContext();
        this.wudiMusic.src= 'sounds/wudi.mp3';
        this.wudiMusic.loop = false;
        this.wudiMusic.volume = 1;

        this.toAv.visible = true
        this.resultUrl.visible = false;
        this.giftBg.visible = false;
        this.currentCloseBtn.visible = false;
        this.resultIcon.on(Events.CLICK,this,this.onResultIcon,[this.resultIcon])
        // this.resultUrl.on(Events.CLICK,this,this.onResultUrl)
        this.giftBtn.on(Events.CLICK,this,this.onGiftBox)
        this.giftClose.on(Events.CLICK,this,this.onGiftClose)
        this.giftOFF.on(Events.CLICK,this,this.onGiftClose)
        this.sendGift.on(Events.CLICK,this,this.onSendGift)
        this.friendRelay.on(Events.CLICK,this,this.onFriendRelay)

        this.music_btn.on(Events.CLICK,this,this.onMusicBtn)

        this.back.on(Events.CLICK,this,this.onIndexBtn)
        
       
        this.toAv.on(Events.CLICK,this,this.showAVGG)
    }

    onBackIndex():void
    {
        console.log('论坛')
        if (this.gameClub !== null){
            this.gameClub.show()
        } else{
            this.initMusic();
        }
    }


    public showhide():void
    {
        wx.onHide(function(){
            this.gameOver = true;
        })
    }

    public initMusic():void
    {
        if (this.gameClub !== null){
            this.gameClub.show()
        }else{
            var top;
        var h = this.mScreenHeight / 1334;
        var w = this.mScreenWidth / 750;
        if (this.mScreenHeight < 800) {
            this.bg.width = Laya.stage.width;
            this.bg.height = Laya.stage.height;
            this.music_btn.x = 60 / w;
            this.music_btn.y = 20 / h 
            this.music_btn.width = 36 / w;
            this.music_btn.height = 36 / w;
            console.log(this.mSDKVersion)
            if (this.mSDKVersion > '2.0.3') {
                this.gameClub = wx.createGameClubButton({
                    icon: 'dark',
                    style: {
                        left: 20,
                        top:  25 ,
                        width: 30,
                        height: 30
                    }
                });
                console.log(this.gameClub)
            }
            
        } else if (this.mScreenHeight > 800) {
            this.bg.height = Laya.stage.height;
            this.music_btn.x = 60 / w;
            this.music_btn.y = 90 ;
            this.music_btn.width = 36 / w;
            this.music_btn.height = 36 / w;
            if (this.mSDKVersion > '2.0.3') {
                this.gameClub = wx.createGameClubButton({
                    icon: 'dark',
                    style: {
                        left: 20,
                        top: 48,
                        width: 30,
                        height: 30
                    }
                });
            }
            console.log(this.gameClub)
        }       
        }
        
    }

    moreGameBtn():void
    {
        if (GameMain.app.mWX.buttonType) {
            var obj: Object = GameMain.app.mWX.getMoreUrl(GameMain.app.mWX.gameID);
            if (obj == null)
            return;
            // GameMain.app.mWX.reportADHit(btn.name);

            if (this.mSDKVersion >= "2.2.0") {
                if (obj['type'] == 0) {
                    console.log("type===0");
                    var url: string = obj['url'];
                    wx.previewImage({
                    urls: [url],
                    success: (res) => {
                        console.log('预览图片成功');
                    }
                });
            }
            if (obj['type'] == 1) {
                console.log("type===1");
                var path: string = obj['path'] + "&agentid=0";
                wx.navigateToMiniProgram({
                    appId: obj['appid'],
                    path: path
                });
              }
            } else {
            var url: string = obj['url'];
            wx.previewImage({
                urls: [url],
                success: (res) => {
                    console.log('预览图片成功');
                }
            });
           }
       }
    }

    closeBtnShow():void
    {
        

        // GameMain.app.mWX.adBanner.style.top = GameMain.app.mScreenHeight - GameMain.app.mWX.adBanner.style.realHeight - top;

        if(this.showCloseBtn) {

            GameMain.app.indexV.currentCloseBtn.visible = true;
        }

    }


    onMusicBtn():void
    {
        this.music_btn_type ? this.music_btn_type = false : this.music_btn_type = true
        this.music_btn_type ? this.music_btn.skin = `res/sound_on.png` : this.music_btn.skin = `res/sound_off.png`
    }


    onResultIcon():void
    {
        if (GameMain.app.mWX.buttonType) {
            var obj: Object = GameMain.app.mWX.getMoreUrl(GameMain.app.mWX.gameOverId);
            if (obj == null)
            return;
            // GameMain.app.mWX.reportADHit(btn.name);

            if (this.mSDKVersion >= "2.2.0") {
                if (obj['type'] == 0) {
                    console.log("type===0");
                    var url: string = obj['url'];
                    wx.previewImage({
                    urls: [url],
                    success: (res) => {
                        console.log('预览图片成功');
                    }
                });
            }
            if (obj['type'] == 1) {
                console.log("type===1");
                var path: string = obj['path'] + "&agentid=0";
                wx.navigateToMiniProgram({
                    appId: obj['appid'],
                    path: path
                });
              }
            } else {
            var url: string = obj['url'];
            wx.previewImage({
                urls: [url],
                success: (res) => {
                    console.log('预览图片成功');
                }
            });
           }
       }
    }

   onStartRelay():void
   {
       GameMain.app.indexV.startMusic = false;
        if(this.relayType)
        {
            this.onFriendRelay();
            wx.shareAppMessage({
            title: '帮我再跑几米，我要冲上榜首！',
            imageUrl: 'res/share.jpg',
            query: "uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + Number(this.score.text) + "&client=0&type=0",
            success: function (res) {
                console.log('分享成功')
                // this.revive.visible = false;
                
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                })

            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
        }else{
            
            this.onstartGame();
            this.relay.visible = false;
            
        }
   }

    onGiftBox():void
    {

        GameMain.app.indexV.closeBanner()
        this.giftBg.visible = true;
        GameMain.app.indexV.showBanner();
        
    }

    onGiftClose():void
    {
        GameMain.app.indexV.closeBanner();
        this.giftBg.visible = false;

        GameMain.app.indexV.showBanner();
    }

    //发个礼包

    onSendGift():void
    {
        GameMain.app.indexV.startMusic = false;
        wx.shareAppMessage({
            title: "【神浮球礼包：10张复活卡】先到先得，抢完为止",
            imageUrl: 'res/share.jpg',
            query: "uid=" + mainInst.mWX.mUID + "&id="+ mainInst.mWX.mShareID + "&client=0&type=0&gift=" + mainInst.mWX.mUID,
            success: function (res) {
                console.log('分享成功')
                 
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    }
    //好友接力
    onFriendRelay():void
    {
         GameMain.app.indexV.startMusic = false;
        console.log("uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + Number(this.score.text) + "&client=0&type=0")
        wx.shareAppMessage({
            title: '神浮球'+Number(this.score.text)+'米，帮我冲上榜首吧',
            imageUrl: 'res/share.jpg',
            query: "uid=" + mainInst.mWX.mUID + "&id=" + mainInst.mWX.mShareID + "&score=" + Number(this.score.text) + "&client=0&type=0",
            success: function (res) {
                console.log('分享成功')
                // this.revive.visible = false;
                
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                })

            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    }

    public corpationAnimation()
    {
        this.corpation.rotation +=2
    }

    public giftBtnanimation():void
    {
        this.giftBox.rotation +=2;
    }

    private numDown(): void {  
        if(this.nav.visible){
            this.onStartAni();
        }else{
            this.num = this.speedUp; 
            this.gameThing.skin = 'res/up.png' 
        }

    }

    private numUp(): void {
        this.num = this.speedDown;
        this.gameThing.skin = 'res/down.png' 
    }


    //开始游戏按钮
    public onstartGame(): void 
    {
        this.gamescene.removeChildren()
        console.log(GameMain.app.indexV.gameClub)
        if(GameMain.app.indexV.gameClub != null){
           GameMain.app.indexV.gameClub.hide();
        }
         
        this.rankList.visible = false;
        this.game.visible = true;
        this.index.visible = false;
        this.resultPage.visible = false;
        this.bg.visible = true;
        this.nav.visible = true;
        this.score.text = '0';
        this.scoreRrep = 0;
        this.toAv.x = 329;
        this.addToMy.visible = false;
        this.addToMy.zOrder = -11;
        GameMain.app.mUseCards = false;
        this.currentScore.zOrder = 1;
        this.resultPage.zOrder = 1;
        
        this.currentScore.visible = false;
        this.gameOver = false;
        if(GameMain.app.indexV.banner != null)
        {
            GameMain.app.indexV.closeBanner();
        }
        if(GameMain.app.indexV.gameClub != null)
        {
            GameMain.app.indexV.gameClub.hide()
        }
    }

    //开始玩游戏
    public onStartAni(): void  
    {
        GameMain.app.mWX.initMoreGame(this.resultIcon, 'icon');
        this.nav.visible = false;
        this.ball.visible = true;
        this.ball.x = 230;
        this.ball.y = 895;
        this.startMusic = true;
        this.gameThing.visible = true;
        Laya.timer.frameLoop(1, this, this.onAnimation)
        Laya.timer.frameLoop(1, this, this.onAnim)
        this.createHider(7);
        if(this.music_btn_type){
            this.gameMusic.play();
            console.log(this.gameMusic)
        }
        
        var animation = new Laya.Animation;
        var animation1 = new Laya.Animation;
        animation1.x = this.bg1.x;
        animation1.y = this.bg1.y;

        animation1.x = this.bg2.x;
        animation1.y = this.bg2.y;

        animation1.x = this.bg3.x;
        animation1.y = this.bg3.y;

        animation1.play(0, true, 'ani2')

        animation.x = this.ball.x;
        animation.y = this.ball.y
        animation.play(0, true, 'ani1')
        Laya.timer.loop(15000,this,this.createStar)
        
    }

    //球运动
    public onAnimation(): void 
    {
        if (this.ball.y > 900 || this.ball.y < 180) {
            if (this.ball.y > 900) {
                this.ball.y = 900;
                this.num = 0
            }
            if (this.ball.y < 180) {
                this.ball.y = 180
                this.num = 0;
            }
        } else {
            
            this.ball.y += this.num;
        }  
        
    }

    //背景移动
    public onAnim(): void  
    {       
        this.scoreNum += 3
        this.score.text = (Number(this.scoreRrep) + Math.floor(Math.abs(this.scoreNum) / 150)).toString();
        
        this.bg1.x -= 3, this.bg2.x -= 3, this.bg3.x -= 3
        for(let i=0; i<this.arr.length;i++){
            this.arr[i]['x'] -=3
            if(this.arr[i]['x']<=-100)
            {
                this.arr.splice(i,1)
            }
             this.checkCrack(this.arr[i])
            
        } 
        
        if(this.starArr.length>0)
        {
            for(let i=0; i<this.starArr.length;i++){
                this.starArr[i]['x'] -=3;  
                this.starwd(this.starArr[i]) 
            } 
        }
         
        if (this.bg1.x <= -750) {
            this.bg1.x = 1500;  
            this.starNum() 
        }

        if (this.bg2.x <= -750) {
            this.bg2.x = 1500;
            this.starNum()   
        }

        if (this.bg3.x <= -750) {
            this.bg3.x = 1500;
            this.starNum()
        }
         
    }

    
    /**
     * 生成障碍
     */
    public createHider(n): void {
        this.hiderArr = [];       
        for(let i=0;i<n;i++)
        {
            var animation = new Laya.Animation;
            animation.loadAnimation('hider.ani');
            animation.play();
            var hiderX = 750 + Math.floor(Math.random() * 1500);
            var hiderY = 180 + Math.floor(Math.random() * 750);

            if(this.hiderArr.length>0)
            {
                for(let i =0;i<this.arr.length;i++)
                {
                    if(Math.abs(this.arr[i]['x'] - hiderX ) <= 50)
                    {
                        hiderX = hiderX + 750;
                    }
                }
                animation.x = hiderX;
                animation.y = hiderY;
               
            }
            else
            {
                animation.x = hiderX;
                animation.y = hiderY;
            }
           
            let hid = {
                x:hiderX,
                y:hiderY
            }
            this.gamescene.addChild(animation)
            this.arr.push(animation)
            this.hiderArr.push(hid)

        }   
    }

    /**
     * 生成钻石
     */
    public createJewel():void
    {
        var jewel = new Laya.Image;
        jewel.skin = 'res/zuanshi.png';
        var jewelX = 750 + Math.floor(Math.random() * 750);
        var jewelY = 160 + Math.floor(Math.random() * 750);
            jewel.x = jewelX;
            jewel.y = jewelY;     
            this.gamescene.addChild(jewel)
            this.jewelArr.push(jewel)  
    }

    /**
     * 生成星星
     */
    public createStar():void
    {
       
        var star = new Laya.Animation;
            star.loadAnimation('star.ani');
            star.play();
            var starX = 750 + Math.floor(Math.random() * 2000);
            var starY = 160 + Math.floor(Math.random() * 730);
            star.x = starX;
            star.y = starY;
            this.gamescene.addChild(star)
            this.starArr.push(star)   

    }

    //碰撞检测
    public checkCrack(track): void {
        if(Math.abs(track.x -Number(this.ball.x)) <= 60 )
        {
            if(track.y > Number(this.ball.y) && track.y  - Number(this.ball.y)  <= 50 )
            {
                if(this.wudiY ==false)
                {   
                    mainInst.mWX.reportMark(Number(this.score.text)); 
                    mainInst.mWX.updateCards()
                    this.closeBanner();
                    console.log(mainInst.mWX.mCards)
                    this.gameMusic.stop();
                    if(GameMain.app.indexV.music_btn_type){
                         this.playAudio('die.mp3')
                    }
                    Laya.timer.clear(this,this.onAnimation)           
                    Laya.timer.clear(this, this.onAnim)
                    Laya.timer.clear(this,this.createStar)
                   
                    if(GameMain.app.videoAd !==null && this.mSDKVersion >= "2.0.4"){
                        this.showVideoBtn();
                    }else{
                        // this.videoShow = false;
                        this.showVideoBtn();
                    }
 
                    if(this.modalNum >=2){
                        mainInst.mWX.updateCards()
                        this.addToMy.zOrder = 5
                         if(GameMain.app.indexV.gameClub !== null){
                                GameMain.app.indexV.gameClub.hide()
                            }
                        Laya.timer.once(1000,this,this.onJumpOff)                            
                    } else{
                        this.addToMy.zOrder = 5
                        if(GameMain.app.indexV.gameClub !== null){
                                GameMain.app.indexV.gameClub.hide()
                            }
                        Laya.timer.once(1000,this,this.resultShow) 
                    }  
                     
                    
                } 
            }
            else if(track.y < Number(this.ball.y) &&  Math.abs(track.y  - Number(this.ball.y))   <= 40 )
            {
                
                if(this.wudiY ==false)
                {
                    this.gameMusic.stop()
                    if(GameMain.app.indexV.music_btn_type){
                         this.playAudio('die.mp3')
                    }
                   
                    mainInst.mWX.reportMark(Number(this.score.text)); 
                    mainInst.mWX.updateCards()
                    Laya.timer.clear(this,this.onAnimation)           
                    Laya.timer.clear(this, this.onAnim)
                    
                    if(GameMain.app.videoAd !==null && GameMain.app.mSDKVersion >= "2.0.4"){
                        this.showVideoBtn();
                    }else{
                        // this.videoShow = false;
                        this.showVideoBtn();
                    }

                    Laya.timer.clear(this,this.createStar) 
                    if(this.modalNum >=2){
                        mainInst.mWX.updateCards()
                        this.addToMy.zOrder = 5
                        if(GameMain.app.indexV.gameClub !== null){
                                GameMain.app.indexV.gameClub.hide()
                            }
                        Laya.timer.once(1000,this,this.onJumpOff)                            
                    } else{
                        this.addToMy.zOrder = 5
                        if(GameMain.app.indexV.gameClub !== null){
                                GameMain.app.indexV.gameClub.hide()
                            }
                        Laya.timer.once(1000,this,this.resultShow) 
                    }  
                   
                    
                } 
            }
             
        }                        
    }

     public initGame():void
    {
        
        Laya.timer.clear(this,this.onAnimation)           
        Laya.timer.clear(this, this.onAnim)
        Laya.timer.clear(this,this.createStar)
        this.nav.visible = false;
        this.index.visible = false;
        this.addToMy.visible = false;
        this.addToMy.zOrder = -11;
        // this.currentBg.visible = false;
        // this.jumpOff.visible = false;
        // this.resultPage.visible = false;
        this.currentScore.visible = false;
        this.gamescene.removeChildren()
        this.closeBanner()
        this.revive.visible = false;
        this.game.visible = false;
        this.modalNum = 0;
        
        GameMain.app.mUseCards = false;
        this.showVideobtn = false;
       
        mainInst.mWX.getIcon()
        
                            
    }

    public boomNum():void
    {
        var boom = new Laya.Animation;
        boom.loadAnimation('boom.ani');
        boom.play(this,false);
        boom.x = this.ball.x;
        boom.y = this.ball.y;
        this.bg.addChild(boom);
        this.boomArr.push(boom)
        boom.zOrder=9999; 
    }

    /**
     * 检测无敌
     */ 
     public starwd(star):void
     {
        if(Math.abs(star.x -Number(this.ball.x)) <= 50 && Math.abs(star.y - Number(this.ball.y)) <=50){
            star.visible = false;
            this.ball.skin='res/wudiball.png'
            this.ball.width=140;
            this.ball.height=140;
            this.wudiY = true;
            if(this.music_btn_type){
                this.wudiMusic.play()
            }
            
            Laya.timer.once(7000,this,()=>{
                this.ball.alpha = 0.8
            });
            Laya.timer.once(7400,this,()=>{
                this.ball.alpha = 0.4
            });
            Laya.timer.once(7800,this,()=>{
                this.ball.alpha = 0.3
            });
            Laya.timer.once(8000,this,()=>{
                this.wudiY = false;
                this.ball.width=76;
                this.ball.height=76;
                this.ball.skin='res/football.png';
                this.ball.alpha=1   
            })
        }

     }

    //获取钻石
    public getJewel(coor):void
    {
        if(Math.abs(coor.x -Number(this.ball.x)) <= 40 && Math.abs(coor.y - Number(this.ball.y)) <=40)
        {
            coor.visible = false;
            // Laya.timer.once(100, this, this.jewelN);
        }
    }


    public wudi():void
    {
        var wudi = new Laya.Animation;
        wudi.loadAnimation('wudi.ani');
        wudi.play();
        wudi.x = this.ball.x;
        wudi.y = this.ball.y;
        this.bg.addChild(wudi)
        // Laya.timer.once(3000,this,()=>{
        //     wudi.clear();
        // })
    }

     //显示结果
    public resultShow():void
    {
       GameMain.app.indexV.startMusic = false;
        if(this.currentScore.zOrder >0){
            this.showBanner();
        }
        this.closeBtnShow();
        if(mainInst.mWX.mCards >0){
            this.cardBtn.skin = 'res/usecard.png';    
        }
       
        if(mainInst.mWX.mCards ==0){
            this.cardBtn.skin = 'res/btn_nocards.png'  
        }
        this.cardNum.text = 'x'+ mainInst.mWX.mCards;
        this.currentScore.visible = true;
        this.gamescene.removeChildren()
        this.scoreM.text = this.score.text + 'm';
        this.scoreRrep = Number(this.score.text);
        this.score.text = this.score.text;
        this.ball.visible = true;

        console.log(mainInst.mWX.fnOff)
        if(mainInst.mWX.fnOff)
        {
            GameMain.app.indexV.useCardFalse.visible = true;
            GameMain.app.indexV.resumText.visible = false;
            GameMain.app.indexV.resumBtn.visible = false;
            GameMain.app.indexV.useCard();
        }else{
            GameMain.app.indexV.useCardFalse.visible = false;
            GameMain.app.indexV.heart.visible = false;
            GameMain.app.indexV.cardBtn.visible = false;
            GameMain.app.indexV.cardNum.visible = false;
            GameMain.app.indexV.resumText.visible = true;
            GameMain.app.indexV.resumBtn.visible = true; 
            GameMain.app.indexV.toAv.visible = false;
        }


       
    }

    public useCard():void
    {
        console.log('使用卡'+ GameMain.app.mUseCards)
        
        if(this.showVideobtn)
        {   
            if(GameMain.app.videoAd !== null){
                GameMain.app.indexV.cardBtn.visible = false;
                GameMain.app.indexV.heart.visible = false;
                GameMain.app.indexV.cardNum.visible = false;
                GameMain.app.indexV.videoIcon.visible = true;
                GameMain.app.indexV.toAv.visible = true;
                GameMain.app.indexV.toAv.x = 185;
            }
        } 
        else{
            GameMain.app.indexV.cardBtn.visible = true;
            GameMain.app.indexV.heart.visible = true;
            GameMain.app.indexV.cardNum.visible = true;
            GameMain.app.indexV.videoIcon.visible = false;
            GameMain.app.indexV.toAv.x = 329
            // this.toAv.visible = true;
        } 
    }


    public showVideoBtn():void
    {

        console.log('广告按钮'+this.videoShow)
        if(!this.videoShow){
            this.toAv.visible = false;
            this.cardBtn.x = 198;
        }

        if(GameMain.app.videoAd !==null && GameMain.app.mSDKVersion >= "2.0.4"){
            console.log(1)
        }else{
            this.toAv.visible = false;
            this.cardBtn.x = 198;
        }
    }

    public showAVGG(): void {
        let that = this
        this.closeBanner()
        GameMain.app.mWX.reportData(1);
        if (GameMain.app.mSDKVersion >= "2.0.4" && GameMain.app.videoAd != null) {
            try {
                GameMain.app.videoAd.show(() => {
                    console.log("广告播放成功");
                }).catch(err => function () {
                    console.log("广告播放失败");

                });
            }
            catch (err) {
                console.log("广告播放失败");

            }
            GameMain.app.videoAd.onError(() => {
                console.log("广告播放失败");
            });

            GameMain.app.videoAd.onClose((res) => {
                console.log(res);
                console.log("sdk:" + GameMain.app.mSDKVersion);
                if (GameMain.app.mSDKVersion >= "2.1.0") {
                    if (res['isEnded'] == true) {
                        console.log(`看完广告`);
                        this.currentScore.visible = false;
                        this.replay();  
                        this.videoShow = false;  
                        GameMain.app.mUseCards = false;
                        GameMain.app.videoAd.offClose()
                    }
                    else {
                        console.log(`中途退出`);
                        GameMain.app.videoAd.offClose()
                        GameMain.app.indexV.showBanner();
                    }
                }
                else {
                    console.log(`低版本`);
                    this.currentScore.visible = false;
                    this.replay();  
                    this.videoShow = false;  
                    GameMain.app.mUseCards = false;
                    GameMain.app.videoAd.offClose()
                }
            });
        }
    }


    //障碍数量
    public starNum():void
    {
        if( Number(this.score.text)<20)
        {
            var num =5 + Math.floor(Math.random()*2) 
            this.createHider(num); 
           
        }

         if(Number(this.score.text) >=20 && Number(this.score.text) <60)
        {
            var num = 7 + Math.floor(Math.random()*5) 
            this.createHider(num);   
        }

         if(Number(this.score.text)>=60 && Number(this.score.text) <120)
        {
            var num = 9 + Math.floor(Math.random()*6) 
            this.createHider(num); 
        }

        if(Number(this.score.text)>=120 && Number(this.score.text) <180)
        {
            var num = 11 + Math.floor(Math.random()*6) 
            this.createHider(num); 
        }

        if(Number(this.score.text)>=180 && Number(this.score.text) < 220)
        {
            var num = 13 + Math.floor(Math.random()*7) 
            this.createHider(num); 
        }

        if(Number(this.score.text) >=220 && Number(this.score.text) < 280)
        {
            var num = 17 + Math.floor(Math.random()*7) 
            this.createHider(num); 
            //Laya.timer.loop(10000,this,this.createJewel)
             Laya.timer.loop(20000,this,this.createStar)
        }
        if( Number(this.score.text)>=150)
        {
            var num = 22 
            this.createHider(num) ;
        }
    }
    
    public Init(): void 
    {
        this.currentScore.visible =false;
        this.closeBanner();
        if(GameMain.app.indexV.banner != null)
        {
            GameMain.app.indexV.closeBanner();
        }
      
        this.scoreNum = 0;
        this.bg1.x = 0;
        this.bg2.x = 750;
        this.bg3.x = 1500;
        this.ball.x = 230;
        this.ball.y = 895;
        this.arr = [];
        this.starArr = [];
        this.ball.visible = false;
        this.gameThing.visible = false;
        this.bg.removeChildren()
        this.bg.addChild(this.bg1)
        this.bg.addChild(this.bg2)
        this.bg.addChild(this.bg3)
        this.addToMy.visible = false;
        this.addToMy.zOrder = -11;
        // this.music_btn_type = true;
        this.toAv.visible = true;
        this.cardBtn.x = 86;
        this.videoShow = true;

        
    }

    public onbackBtn(): void
     {
        this.challengeList.visible = false;
        this.index.visible = true;
        
        mainInst.mWX.getIcon()
        
        
       
    }

    public onskinShop(): void
     {
        wx.showToast({
            title: '模块暂未开放',
            icon: 'success',
            duration: 2000
        })

    }

    //好友排行
    public onFriendsList(): void 
    {
        this.rankList.visible = true;
        this.index.visible = false;   
        this.game.visible = false;
        this.rankListTab.skin = 'res/rank_friend.png'
        GameMain.app.indexV.showRank() ;
        if(GameMain.app.indexV.gameClub !== null){
            GameMain.app.indexV.gameClub.hide();
        }
       

    }

    
    //世界排行
    public onWorldRankBtn(): void 
    {
        this.rankList.visible = true;
        this.rankSprite.visible = false;
        this.rankbg.visible = true;
        this.index.visible = false;
        this.game.visible = false;
        this.rankListTab.skin = 'res/rank_world.png'       
        GameMain.app.mWX.showWorldRank(this.dataPage);
        this.mType = 4;
        if(GameMain.app.indexV.gameClub !==null){
            GameMain.app.indexV.gameClub.hide();
        }
        
         
    }

    public parseRankData(rData: Array<Object>): void 
    {
        this.wRankData = rData;
        console.log('排行数据')
        this.rankList1();
    }

    public rankList1():void
    {
        let mDate: Array<Object> = [];
        let starIndex: number = (this.cWRankPage - 1) * 5;
        for (let i: number = starIndex; i < starIndex + 5; i++) {
            let mInfo: Object = this.wRankData[i];
            if (mInfo == null || mInfo == undefined) break;
            mDate.push(mInfo);
        }
        console.log(mDate)

        this.rList.repeatX = 1;
        this.rList.repeatY = 5;
        this.rList.array = mDate;
    }

    onchangePage(dir:string):void
    {
       if (this.mType == 1) {
            wx.postMessage({
                type: "rank", show: 1, level: 0, info: GameMain.app.mWX.mUser, dir: dir
            });
            return;
        }
        // 群
        if (this.mType == 2) {
            wx.postMessage({
                type: "group", show: 1, "groupid": GameMain.app.mWX.mLaunch['shareTicket'], level: 0, openid: GameMain.app.mWX.mUser['openid'], dir: dir
            });
            return;
        }


        if (dir === "previous") this.cWRankPage--;
        else if (dir === "next") this.cWRankPage++;
        console.log(this.cWRankPage)
        let pages: number = Math.floor(this.wRankData.length / 5) + 1;
        if (this.wRankData.length % 50 == 0)
            pages--;
        if (this.cWRankPage < 1) {
            this.cWRankPage = 1;
            return;
        }
        console.log(this.cWRankPage)
        if (this.cWRankPage >= pages) {
            if (pages % 10 == 0) {
                this.dataPage++;
                GameMain.app.mWX.showWorldRank(this.dataPage);
            } else {
                this.cWRankPage--;
            }
            return;
        }
        this.rankList1()  
    }


    public onGrounRank(): void 
    
    {
        GameMain.app.indexV.startMusic = false;
         wx.shareAppMessage({
            title: "你在群里排第几名？",
            imageUrl: "res/share.jpg",
            query: 'uid='+mainInst.mWX.mUID+'&id=0&type=8&map=0',
            success: function (res) {
                
                wx.showToast({title:"可入群看排名",
                    icon:"success",
                    image:"",
                    duration:2000
                });            
               
            },
            fail: function (res) {
                
            }
        });
    }

    public oncorpation(): void 
    {

        this.revive.visible = true;
        mainInst.mWX.updateCards()   
        this.showBanner();  
    }

    public oncloseBtn(): void 
    {
        this.revive.visible = false;
        this.closeBanner();
    }


    //分享
    public onshareBtn(): void
     {
         GameMain.app.indexV.startMusic = false;
        wx.shareAppMessage({
            title: "我这颗浮躁的球球，需要你来安慰一下",
            imageUrl: "res/share.jpg",
            query: "gift=" + mainInst.mWX.mUID +'&uid='+mainInst.mWX.mUID+'&id=0&type=0&map=0&invit=0',
            success: function (res) {
                console.log('分享成功')
                // this.revive.visible = false;
                
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                })
                console.log(mainInst.mWX.mUID)
            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });

    }


    //再玩一次
    public onGameAgain(): void 
    {  
        this.resultPage.visible = false;
        this.addToMy.visible = false
        this.index.visible = false;
        this.currentScore.visible = false;
        this.game.visible = true;
        this.addToMy.visible = false;
        this.score.text = '0';
        this.nav.visible = true;
        this.showVideobtn = false;
        GameMain.app.mUseCards = false;
        this.timeNum.text = '3'
        this.scoreRrep = 0;
        this.modalNum =0;
        this.Init(); 
        this.toAv.x = 329;
        if(GameMain.app.indexV.banner !== null){
            GameMain.app.indexV.closeBanner() 
        }
        
    }

    //播放音效，成功音效，失败音效等
    public playAudio(sound:string, callBack:Function=null):void{
        if(sound == null || !this.openSound)
            return;
        let url = "sounds/" + sound;
        if(callBack != null)
            SoundManager.playSound(url, 1, new Handler(this, callBack));
        else
            SoundManager.playSound(url, 1);
    }

    //保存朋友圈图片
    public onsaveImg(): void
     {
        var file: string = canvas.toTempFilePathSync({
            x: this.shareimg.x,
            y: this.shareimg.y,
            width: 600,
            height: 490,
            destWidth: 750,
            destHeight: 600,
            fileType: "jpg",
            quality: 0.8
        });
        wx.saveImageToPhotosAlbum({
            filePath: file,
            success: function (res) {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        })

    }

    public onreviveBtn(): void 
    {
        // this.revive.visible = true;
    }

    //返回首页
    public onIndexBtn(): void 
    {
        GameMain.app.mWX.getIcon()
        GameMain.app.mWX.getUrl()
        this.index.visible = true;
        this.resultPage.visible = false;
        GameMain.app.indexV.init();
        GameMain.app.mUseCards = false;
        this.showVideobtn = false;
        this.Init();
        GameMain.app.indexV.initMusic();
        this.scoreRrep = 0;
        this.modalNum =0;
        this.timeNum.text = '3'
        if(GameMain.app.indexV.banner !== null){
            GameMain.app.indexV.closeBanner() 
        }
    }


    public onRelayBackBtn():void
    {
        this.relay.visible = false;
        this.index.visible = true;
        this.currentScore.visible = false;
        this.closeBanner();
        
        mainInst.mWX.getIcon()
        
        if(GameMain.app.indexV.gameClub !==null){
            GameMain.app.indexV.gameClub.show()
        }
    }

    public onJumpOff(): void 
    {   
        this.closeBanner();
        GameMain.app.mWX.getUrl()
        if(this.currentScore !=null){
            this.currentScore.visible = false;
        }
        
        this.gamescene.removeChildren()
        this.resultPage.visible = true;      
        this.resultScore.text = this.score.text+'m';
        this.level(Number(this.score.text))
        this.noCardTips.visible = false;
        this.ball.visible = true;
        this.giftBg.visible = false;
        mainInst.mWX.updateCards()

        if(this.resultPage.zOrder >=0){
            GameMain.app.indexV.showBanner()
        }  
         
        
        if(this.mVersion >='6.7.1'){
            if (laya.wx.mini.MiniLocalStorage.getItem('isShowToMy') == '1') {
                console.log(`已收藏不现实手指`);
                this.addToMy.visible = false;
            } else {
                console.log(`显示手指`);
                this.addToMy.visible = true;
                this.addToMyTw1();
            }          
        }else{
             this.addToMy.visible = false;
        }
        
        
    }

    //复活卡
    public onCardBtn(): void 
    {
        mainInst.mWX.updateCards()
        console.log(mainInst.mWX.mCards == null)
        if (mainInst.mWX.mCards > 0 ) {
            GameMain.app.mUseCards = true;
            this.showVideobtn = true;
            this.replay();
        }
        else 
        {
            
           wx.showToast({
                title: '您没有卡',
                icon: 'success',
                duration: 2000
            })  
        
         }
         
    }

    public replay():void
    {
        this.currentScore.visible = false;
        this.timeout.visible = true;
        Laya.timer.loop(1000,this,this.timeOut)
        GameMain.app.indexV.gameOver = true;
        this.score.text = (this.scoreRrep).toString();
        this.Init();
        this.ball.x = 230;
        this.ball.y = 895;
        this.timeNum.text = '3'
        Laya.timer.once(3000,this,this.onStartAni)
        this.modalNum = this.modalNum+1;
        if(GameMain.app.indexV.banner !=null){
            GameMain.app.indexV.closeBanner();
        }
    }

    // 广告按钮显示
    public showGG(): void {
        this.moreGame.visible = true;
        GameMain.app.mWX.initMoreGame(this.moreGame, 'btn');
    }

    public timeOut():void
    {
        this.timeNum.text = (Number(this.timeNum.text) -1).toString();
        if(this.timeNum.text == '0'){
            Laya.timer.clear(this,this.timeOut)
            this.timeout.visible = false;
            this.starNum()
        }
    }

    public onFriendRank(): void 
    {
        this.rankListTab.skin = 'res/rank_friend.png'
        if(GameMain.app.indexV.gameClub !==null){
            GameMain.app.indexV.gameClub.hide()
        }
    }

    public onWorldRank(): void 
    {
        this.rankListTab.skin = 'res/rank_world.png'
        if(GameMain.app.indexV.gameClub !==null){
            GameMain.app.indexV.gameClub.hide()
        }
    }

     public onRelay() {
        this.relay.visible = true;
        
        mainInst.mWX.showRelay();
        console.log('接力')
        console.log(GameMain.app.indexV.gameClub !==null);
        //  GameMain.app.indexV.gameClub.hide();
        
       
    }

    public onBackBtnList(): void 
    {
        this.rankList.visible = false;
        this.currentScore.visible = false;
        this.closeBanner()
        this.index.visible = true;
        this.rList.array = [];
        this.cWRankPage = 1;
       
        mainInst.mWX.getIcon()
       
        if(GameMain.app.indexV.gameClub !==null){
            GameMain.app.indexV.gameClub.show()
        }
    }


    showRelayData(master:any, mData:any):void
    {

        console.log(GameMain.app.indexV.gameClub)
        // GameMain.app.indexV.gameClub.hide()
        // GameMain.app.indexV.closeBanner()
        this.master_uid = master['uid'];
        if (this.master_uid == mainInst.mWX.mUID) {
            this.startRelay.skin = "res/btn_relay_3.png"
            this.type = true;
            this.relayType = true;
        } else {
            this.startRelay.skin = "res/btn_relay_4.png"
            this.type = false;
            this.relayType = false;
        }
        
        this.visible = true;
        this.relayList.visible = true;

        this.face.skin = master["avatar"];
        this.myName.text = master['name'];
        this.master_mark = Math.floor(master["mark"]);
        console.log(master["mark"]+'--'+master["friend_base"] )
        this.master_id = Number(master["id"]);
        let bestNum = Math.floor( (Number(master["mark"]) + Number(master["friend_base"]))) 

        console.log('jieli'+ master);
        this.indexScore.text =  Math.floor(master["mark"]) + "米";
        this.bestRelay.text = Math.floor(master["friend_base"]) + "米";
        this.finalScore.text = bestNum + "米";
        this.wRelayData = mData;
       
        this.parseRelayData();
    }

    parseRelayData():void
    {
        this.relayList.repeatX = 1;
        this.relayList.repeatY = this.wRelayData.length;
        this.relayList.array = this.wRelayData;
    }



    //邀请挑战
    public onInvitBtn(): void {
        GameMain.app.indexV.startMusic = false;
        var file: string = canvas.toTempFilePathSync({
            x: this.shareimg.x,
            y: this.shareimg.y,
            width: 600,
            height: 490,
            destWidth: 750,
            destHeight: 600,
            fileType: "jpg",
            quality: 0.8
        });
        wx.shareAppMessage({
            title: "打赌" + this.percent.text + "的人超不过我，这浮球可不是吹出来的",
            imageUrl: file,
            query: 'uid='+mainInst.mWX.mUID+'&id=0&type=0&map=0&invit=0',
            success: function (res) {
                console.log('分享成功')
                // this.revive.visible = false;
                wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 2000
                })

            },
            fail: function (res) {
                console.log('分享失败' + res);
            }
        });
    }

    public level(score: number): void {
        if (score < 10) {
            this.percent.text = '78%'
        } else if (score > 10 && score <= 20) {
            this.percent.text = '80%'
        } else if (score > 20 && score <= 30) {
            this.percent.text = '88%'
        } else if (score > 30 && score <= 50) {
            this.percent.text = '90%'
        } else if (score > 50 && score <= 80) {
            this.percent.text = '93%'
        } else if (score > 80 && score <= 100) {
            this.percent.text = '96%'
        } else if (score > 100) {
            this.percent.text = '98%'
        }
    }

    public updateUser(cell: Laya.Box, index: number) {
        var face: Laya.Image = cell.getChildByName("face") as Laya.Image;
        var name: Laya.Label = cell.getChildByName("name") as Laya.Label;
        var rank: Laya.Label = cell.getChildByName("rk").getChildByName("rank") as Laya.Label;

        var mark: Laya.Label = cell.getChildByName("mk") as Laya.Label;

        name.changeText(cell.dataSource['name']);
        face.skin = cell.dataSource['avatar'];
        rank.text = cell.dataSource['rank'];
        mark.text = cell.dataSource['mark'] + "米";
        //画星星


    }

    public updateRelayUser(cell: Laya.Box, index: number) {
        var face: Laya.Image = cell.getChildByName("relayFace") as Laya.Image;
        var name: Laya.Label = cell.getChildByName("relayNameNn") as Laya.Label;
        var rank: Laya.Label = cell.getChildByName("rk").getChildByName("relayRank") as Laya.Label;
        var mark: Laya.Label = cell.getChildByName("relayMk") as Laya.Label;
        
        name.text = cell.dataSource['name'];
        face.skin = cell.dataSource['avatar'];
        rank.text = cell.dataSource['rank'];
        mark.text = cell.dataSource['mark'] + "米";
        //画星星
    }

    // 群排行
    public showGroupRank(): void {
        console.log('显示群排行')
        
        console.log(GameMain.app.indexV.gameClub)
        
        GameMain.app.indexV.gameClub.hide()
        GameMain.app.indexV.closeBanner()
        wx.showLoading({
            title: "",
            mask: true
        });
        Laya.timer.once(2000, this, () => {
            wx.hideLoading({});
        });

        this.rankbg.visible = false;
        this.rankListTab.skin = 'res/rank_crowd.png'
        this.rankListTab.visible = true;
        
        this.mType = 2;
        wx.postMessage({
            type: "group", show: 1, "groupid": GameMain.app.mWX.mLaunch['shareTicket'], level: 0, openid: GameMain.app.mWX.mUser['openid'], dir: "none"
        });

        if (GameMain.app.mWX.mMyRank > 0) {
            this.rankbk.visible = true;
            if (GameMain.app.mWX.mMyRank < 999999)
                this.mRank.text = GameMain.app.mWX.mMyRank.toString();
            else
                this.mRank.text = "未上榜";
        }


        if (GameMain.app.mWX.mMarks[0] == 0)
            this.mScore.changeText("暂无成绩");
        else
            this.mScore.changeText(Math.floor(GameMain.app.mWX.mMarks[0]/100).toString() + "米"); /*更改 ---------- 需要根据自己的游戏更改单位 ---------- */
        this.rankSprite.visible = true;
        var rankSprite = new Laya.Sprite();
        this.rankSprite.addChild(rankSprite);
        rankSprite.name = "rank";

        var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
        rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
        rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
    }


    public showRank(): void {
       
        this.rankSprite.visible=true;
        this.rankListTab.visible = true;
        this.rankListTab.skin = "res/rank_friend.png";
        this.mType = 1;

        console.log('好友排行')
        this.rankbg.visible = false;
        if (GameMain.app.mWX.mMyRank > 0) {
            this.rankbk.visible = true;
            if (GameMain.app.mWX.mMyRank < 999999)
                this.mRank.text = GameMain.app.mWX.mMyRank.toString();
            else
                this.mRank.text = "未上榜";
        }


        if (GameMain.app.mWX.mMarks[0] == 0)
            this.mRank.changeText("暂无成绩");
        else
            this.mRank.changeText(Math.floor(GameMain.app.mWX.mMarks[0]/100).toString() + "米"); /*更改 ---------- 需要根据自己的游戏更改单位 ---------- */


        wx.postMessage({
            type: "rank", show: 1, level: 0, info: GameMain.app.mWX.mUser, dir: "none"
        });

        var rankSprite = new Laya.Sprite();
        this.rankSprite.addChild(rankSprite);
        rankSprite.name = "rank";

        var rankTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
        rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
        rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
    }


    public addToMyTw1():void {
            Laya.Tween.to(this.addToMy, {x:220}, 250, null, Laya.Handler.create(this, this.addToMyTw2));
        }
        public addToMyTw2():void {
            Laya.Tween.to(this.addToMy, {x:190}, 250, null, Laya.Handler.create(this, this.addToMyTw3));
        }
        public addToMyTw3():void {
            Laya.Tween.to(this.addToMy, {x:220}, 250, null, Laya.Handler.create(this, this.addToMyTw2), 1000);
        }


    showBanner():void
    {
        if (GameMain.app.mSDKVersion >= "2.0.4") {
            console.log(GameMain.app.mSDKVersion);
            if (this.banner == null) {
                this.banner = wx.createBannerAd({
                    adUnitId: 'adunit-6e258f89e13dce02',
                    style: {
                        left: 0,
                        top: this.mScreenHeight - 107,
                        width: this.mScreenWidth,
                        background:"",
                    }
                });
                let top = this.mScreenHeight == 812 ? 20 : 0
                this.banner.onResize(res => {
                    this.banner.style.top = this.mScreenHeight - this.banner.style.realHeight - top;
                    if(this.banner.style.realHeight > 107 && Laya.stage.height < 1280)
                    {
                        this.currentBg.y = this.top1 - 30;
                        this.jumpOff.y = this.top2 - 30;
                        this.shareimg.y = this.top3 -30;
                        this.gameAgain.y = this.top4 -30;
                        this.saveImg.y = this.top5 -30;
                        this.invitBtn.y = this.top6 -30;
                        this.friendRelay.y = this.top7 -30;
                        this.reviveBtn.y = this.top8 -30;
                        this.giftBox.y = this.top9 -30;
                        this.giftBtn.y = this.top10 -30;
                        this.resultIcon.y = this.top11 -30;
                        this.more.y = this.top12 -30;
                    }
                    
                });

                this.banner.onLoad(() => {
                    console.log('banner 广告加载成功2');
                    GameMain.app.mWX.reportData(0);
                });
                this.banner.show();
            }
        }
    }


    closeBanner():void
    {
        if (this.banner != null) {
            this.banner.hide();
            this.banner.destroy();
            this.banner = null;
        }
    }


    public onResumBtn():void
    {
        GameMain.app.indexV.startMusic = false;

        wx.shareAppMessage({
            title: "吹啊~吹啊~我的骄傲放纵~来快活啊！",
            imageUrl: "res/share.jpg",
            query: 'uid='+mainInst.mWX.mUID+'&id=0&map=0&invit=9',
            success: function (res) {
                console.log('转发到群'+res.shareTickets);
                mainInst.mUseCards = true;
                GameMain.app.indexV.replay();
            },
            fail: function (res) {
            }
        });
    }


    public tween1(btn: Laya.Image, delay: number = 0) {
        Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween2, [btn]), delay);
    }
    public tween2(btn: Laya.Image) {
        Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween3, [btn]));
    }
    public tween3(btn: Laya.Image) {
        Laya.Tween.to(btn, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween4, [btn]));
    }
    public tween4(btn: Laya.Image) {
        Laya.Tween.to(btn, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween1, [btn]), 2000);
    }


}
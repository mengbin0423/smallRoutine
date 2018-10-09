var Events = Laya.Event;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.indexV = null;
        this.mServerTime = 0;
        this.mWX = null;
        this.mSDKVersion = "";
        this.login = null;
        this.wRankData = [];
        this.iosT = false;
        this.mVersion = '';
        this.mUseCards = false;
        this.mScreenHeight = 0;
        this.mScreenWidth = 0;
        this.videoAd = null;
        var info = wx.getSystemInfoSync();
        this.mSDKVersion = info['SDKVersion'];
        Laya.init(750, 1334);
        Laya.ResourceManager.systemResourceManager.autoRelease = false; //开启内存管理
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        this.mScreenHeight = Number(info['screenHeight']);
        this.mScreenWidth = Number(info['screenWidth']);
        if (info['screenHeight'] * 2 > Laya.stage.height) {
            Laya.stage.height = info['screenHeight'] * 2;
        }
        this.init();
        wx.onShareAppMessage(function () {
            return {
                title: "吹啊~吹啊~我的骄傲放纵~来快活啊！",
                imageUrl: "res/share.jpg",
                query: "uid=123&score=0&client=0&type=0&id=0&invit=0"
            };
        });
        GameMain.app = this;
        GameMain.app.mWX = new wxMinPro();
        GameMain.app.mWX.initWX();
        wx.postMessage({
            type: "init", width: Laya.stage.width, height: Laya.stage.height
        });
        if (GameMain.app.mSDKVersion >= "2.0.4") {
            try {
                GameMain.app.videoAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-1ac199a8d7d89453'
                });
                GameMain.app.videoAd.onError(function (res) {
                    console.log(res.errMsg);
                    GameMain.app.videoAd = null;
                });
                GameMain.app.videoAd.load();
            }
            catch (err) {
                console.log("读取广告失败");
                GameMain.app.videoAd = null;
            }
        }
    }
    GameMain.prototype.init = function () {
        if (this.indexV == null) {
            this.indexV = new IndexV();
            Laya.stage.addChild(this.indexV);
        }
        else
            this.indexV.visible = false;
    };
    GameMain.prototype.Login = function () {
        this.login = wx.createUserInfoButton({
            type: 'image',
            image: "res/blogin.png",
            style: {
                left: 100,
                top: 100,
                width: 200,
                height: 50
            }
        });
        this.login.onTap(function (res) {
            console.log(res);
        });
    };
    // private onStartGame(): void
    // {
    //     var assets: Array<any> = [];
    //     assets.push({ url:  "res/atlas/res.png", type: Laya.Loader.IMAGE });
    //     assets.push({ url:  "res/atlas/res.atlas", type: Laya.Loader.ATLAS });
    //     assets.push({ url:  "res/balk.gif", type: Laya.Loader.IMAGE });
    //      assets.push({ url:  "res/first.png", type: Laya.Loader.IMAGE });
    //      assets.push({ url:  "res/star.png", type: Laya.Loader.IMAGE });
    //      assets.push({ url:  "res/wudi.png", type: Laya.Loader.IMAGE });
    //     Laya.loader.load(assets, Laya.Handler.create(this, this.onShowGame), null);
    // }
    // public onShowGame():void
    // {
    //     this.indexV = new IndexV();
    //     Laya.stage.addChild(this.indexV) ;
    //     Laya.timer.callLater(this.indexV, this.indexV.init);
    // }
    GameMain.prototype.isBase64 = function (str) {
        try {
            return base64.Base64.encode(base64.Base64.decode(str)) == str;
        }
        catch (e) {
            return false;
        }
    };
    GameMain.prototype.MD5 = function (str) {
        var ff = md5.create();
        var cc = ff.update(str);
        return cc;
    };
    GameMain.prototype.getServerTime = function () {
        var date = new Date();
        return this.mServerTime + Math.floor(date.getTime() / 1000);
    };
    GameMain.prototype.setServerTime = function (tick) {
        var date = new Date();
        this.mServerTime = tick - Math.floor(date.getTime() / 1000);
    };
    GameMain.prototype.getCDN = function () {
        return util.getCDN();
    };
    GameMain.prototype.queryGroupRank = function () {
        console.log('qunpaihangshouye');
        this.indexV.rankList.visible = true;
        this.indexV.index.visible = false;
        this.indexV.relay.visible = false;
        this.indexV.currentScore.visible = false;
        this.indexV.currentScore.zOrder = -11;
        this.indexV.resultPage.visible = false;
        this.indexV.resultPage.zOrder = -11;
        this.indexV.game.visible = false;
        this.indexV.addToMy.visible = false;
        this.indexV.addToMy.zOrder = -11;
        this.indexV.rankListTab.skin = 'res/rank_crowd.png';
        GameMain.app.indexV.showGroupRank();
        GameMain.app.mUseCards = false;
    };
    GameMain.prototype.showRelay = function () {
        if (GameMain.app.indexV.gameClub != null) {
            GameMain.app.indexV.gameClub.hide();
        }
        this.indexV.currentScore.visible = false;
        this.indexV.currentScore.zOrder = -11;
        this.indexV.resultPage.visible = false;
        this.indexV.rankList.visible = false;
        this.indexV.resultPage.zOrder = -11;
        this.indexV.relay.visible = true;
        this.indexV.addToMy.visible = false;
        this.indexV.addToMy.zOrder = -11;
        GameMain.app.indexV.closeBanner();
        this.indexV.onRelay();
        GameMain.app.mUseCards = false;
    };
    GameMain.app = null;
    return GameMain;
}());
Laya.MiniAdpter.init(true);
var mainInst = new GameMain(); //主入口的单例
//# sourceMappingURL=LayaSample.js.map
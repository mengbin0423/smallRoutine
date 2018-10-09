/*
* wx登录;
*/
var md5 = require('/ultima/md5.min.js');
var base64 = require('/ultima/base64.min.js');
var HttpRequest = Laya.HttpRequest;
var wxMinPro = /** @class */ (function () {
    function wxMinPro() {
        this.mOpenid = "";
        this.mVersion = 4;
        this.mUID = 0;
        this.mADKeep = 0;
        this.mCards = 0; //复活卡
        this.mMoreGames = [];
        this.flag = true;
        this.mMyRank = 0;
        this.arrNumber = 0;
        //默认无敌时间
        this.mWudi = 5;
        //续命开头 0-关，1-开
        this.fhOnoff = 0;
        this.mHttpCall = null;
        // 线上地址
        this.mURL = "https://mini.wanzhushipin.cn/fu_qui/";
        // 线下地址
        //public mURL:string = "https://xcx.wanzhuwenhua.com/fu_qui/";
        this.mCmd = {
            "challenge": "1.0.2/fq/challenge?",
            "check": "1.0.1/server/check?",
            "report": "1.0.2/fq/report?",
            "querycards": "1.0.2/fq/querycards?",
            "qr": "1.0.2/server/qr?",
            "login": "1.0.1/server/login?",
            "rank": "1.0.2/fq/rank?",
            "AddCard": "1.0.2/fq/AddCard?",
        };
        this.mUser = {};
        this.mSaveImage = "";
        this.mLaunch = null;
        this.iconArray = [];
        //当前续命的题目
        this.mrelayID = 0;
        //当前挑战的题目--只有返回了才会改
        this.mChallengeID = 0;
        //当前分享的题目--只要有新题出来，都会改
        this.mShareID = 0;
        this.mChallenge = null;
        this.mMarks = [0, 0, 0, 0];
        this.gameID = '';
        this.gameOverId = '';
        this.mQR = 0;
        this.mQRs = {};
        this.buttonType = true;
        this.mLogined = false;
        this.gameClub = null; // 游戏圈按钮
        this.moreGameUrl = '';
        this.resultUrl = '';
        this.addCardtrue = true;
        this.shrrID = 0;
        this.fnOff = true;
    }
    wxMinPro.prototype.initWX = function () {
        var _this = this;
        this.mLaunch = {};
        wx.showShareMenu({ withShareTicket: true });
        var option = wx.getLaunchOptionsSync();
        console.log(option);
        this.mLaunch['query'] = option['query'];
        this.mLaunch['scene'] = option['scene'];
        this.mLaunch['isSticky'] = option['isSticky'];
        this.mLaunch['shareTicket'] = option['shareTicket'];
        //this.mLaunch['query']['scene'] = "uid%3D1006063%26id%3D2425318863";
        if (this.mLaunch['query']['scene'] != null) {
            var scene = decodeURIComponent(this.mLaunch['query']['scene']);
            console.log("Launchscene: " + scene);
            //uid=1000031&id=2393485006
            var params = scene.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var keys = param.split("=");
                if (keys.length == 2)
                    this.mLaunch['query'][keys[0]] = keys[1];
            }
        }
        console.log(this.mLaunch);
        this.checkAuthorize();
        // wx.onHide(function(res) {
        //     if (mainInst.gameView != null && mainInst.startView.parent == null  && mainInst.gameView._mgr != null){
        //         mainInst.gameView._mgr.onDie()
        //     }
        // })
        wx.onShow(function (option) {
            var res = {};
            console.log('复活卡参数');
            console.log(option);
            res['query'] = option['query'];
            res['scene'] = option['scene'];
            res['shareTicket'] = option['shareTicket'];
            res['isSticky'] = option['isSticky'];
            wx.hideLoading({});
            if (res['scene'] == 1104) {
                if (laya.wx.mini.MiniLocalStorage.getItem('isShowToMy') != '1') {
                    console.log("\u672C\u5730\u7F13\u5B58\u624B\u6307\u663E\u793A");
                    laya.wx.mini.MiniLocalStorage.setItem("isShowToMy", '1');
                }
            }
            if (GameMain.app.mWX.mChallenge != null)
                console.log(GameMain.app.mWX.mChallenge);
            if (GameMain.app.mWX.mUID <= 0)
                GameMain.app.mWX.checkAuthorize();
            else {
                //二维码过来的参数         
                if (res['query']['scene'] != null) {
                    var scene = decodeURIComponent(res['query']['scene']);
                    //uid=1000031&id=2393485006
                    var params = scene.split("&");
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i];
                        var keys = param.split("=");
                        if (keys.length == 2)
                            res['query'][keys[0]] = keys[1];
                    }
                }
                _this.mLaunch = res;
                console.log(res);
                //获取或者给别人加卡
                if (_this.mLaunch['query']['gift'] != null && typeof (_this.mLaunch['query']['gift']) != "undefined") {
                    //自己领卡（道具礼包）
                    if (_this.mLaunch['query']['id'] > 0) {
                        console.log('加卡刺激' + _this.flag);
                        if (_this.mLaunch['query']['id'] !== _this.shrrID) {
                            _this.addCardForMe(_this.mLaunch['query']['id']);
                            _this.shrrID = _this.mLaunch['query']['id'];
                        }
                        //给别人加卡
                    }
                    else {
                        mainInst.mWX.dealCards(Number(_this.mLaunch['query']['gift']));
                    }
                    mainInst.indexV.initGame();
                    mainInst.indexV.init();
                    mainInst.indexV.Init();
                    if (GameMain.app.indexV.gameClub != null) {
                        GameMain.app.indexV.gameClub.show();
                    }
                    mainInst.indexV.scoreRrep = 0;
                }
                else if (res['query']['id'] != null && Number(_this.mLaunch['query']['type']) == 8) {
                    mainInst.queryGroupRank();
                    mainInst.indexV.initGame();
                    mainInst.indexV.Init();
                }
                else if (res['query']['id'] > 0) {
                    _this.mrelayID = res['query']['id'];
                    mainInst.showRelay();
                    mainInst.indexV.initGame();
                    mainInst.indexV.Init();
                    // _this.showChallenge(true);
                }
                else if (res['query']['invit'] == 0) {
                    mainInst.indexV.initGame();
                    mainInst.indexV.init();
                    mainInst.indexV.Init();
                    if (GameMain.app.indexV.gameClub != null) {
                        GameMain.app.indexV.gameClub.show();
                    }
                    mainInst.indexV.scoreRrep = 0;
                }
                else {
                    if (GameMain.app.indexV.startMusic) {
                        mainInst.indexV.initGame();
                        mainInst.indexV.init();
                        mainInst.indexV.Init();
                        if (GameMain.app.indexV.gameClub != null) {
                            GameMain.app.indexV.gameClub.show();
                        }
                        GameMain.app.indexV.startMusic = false;
                    }
                }
            }
            wx.hideLoading({});
        });
    };
    wxMinPro.prototype.reportData = function (type) {
        var _this = this;
        function onResult(e) {
            var ret = null;
            ret = util.getJSON(e);
            console.log(ret);
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);
        console.log("uo/ad");
        var params = [];
        params['uid'] = this.mUID;
        params['type'] = type;
        var str = this.mURL + "1.0.2/fq/ad?" + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    wxMinPro.prototype.dealAuthorize = function () {
        var _this = this;
        wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
                _this.checkSession();
            },
            fail: function (res) {
                _this.openSeting();
            }
        });
    };
    wxMinPro.prototype.openSeting = function () {
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '游戏需要您授权头像和用户名信息',
            showCancel: false,
            cancelText: '取消',
            confirmText: "确认",
            success: function (res) {
                wx.openSetting({
                    success: function (res) {
                        if (res.authSetting['scope.userInfo'] == false) {
                            _this.openSeting();
                        }
                        else {
                            _this.checkSession();
                        }
                    },
                    fail: function (res) {
                        _this.openSeting();
                    }
                });
            }
        });
    };
    wxMinPro.prototype.checkSession = function () {
        var _this = this;
        var openid = laya.wx.mini.MiniLocalStorage.getItem("openid");
        if (openid.length <= 2) {
            _this.login();
            return;
        }
        else {
            this.mOpenid = openid;
            this.mUser['openid'] = this.mOpenid;
        }
        if (GameMain.app.mSDKVersion >= "3.0.1") {
            _this.login();
        }
        else {
            console.log("start wx.checkSession");
            wx.checkSession({
                success: function (res) {
                    _this.getUserInfo();
                },
                fail: function (res) {
                    _this.login();
                }
            });
        }
    };
    wxMinPro.prototype.login = function () {
        var _this = this;
        wx.login({
            success: function (res) {
                _this.checkCode(res.code);
            }
        });
    };
    //提交code
    wxMinPro.prototype.checkCode = function (code, res) {
        if (res === void 0) { res = null; }
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                _this.mOpenid = ret['openid'];
                _this.mUser['openid'] = _this.mOpenid;
                laya.wx.mini.MiniLocalStorage.setItem("openid", _this.mOpenid);
                if (res == null) {
                    _this.getUserInfo();
                }
                else {
                    _this.loginServer(res.rawData, res.signature, res.encryptedData, res.iv);
                }
            }
            else
                console.log(ret);
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        console.log("uo/check");
        var params = [];
        params['code'] = code;
        var str = this.mURL + this.mCmd["check"] + util.getUrlParams(params);
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    //汇报成绩
    //continue=1表示使用复活卡
    wxMinPro.prototype.reportMark = function (mark) {
        var _this = this;
        function onResult(e) {
            wx.hideLoading({});
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                _this.mShareID = ret['id'];
                _this.mCards = Number(ret['cards']);
                wx.postMessage({
                    type: "send", mark: mark, level: 0, best: mark, user: GameMain.app.mWX.mUser
                });
                // }
                //复活
                // if (mainInst.mUseCards == true) mainInst.scoreView.resume();
                if (mark >= _this.mMarks[0]) {
                    GameMain.app.indexV.mScore.text = mark + '米';
                }
            }
            _this.mHttpCall = null;
        }
        wx.postMessage({
            type: "send", mark: mark, level: 0, best: 0, user: GameMain.app.mWX.mUser
        });
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        console.log(this.mCmd["report"]);
        console.log("report id: " + this.mrelayID);
        var params = [];
        params['mark'] = mark;
        params['uid'] = this.mUID;
        params['id'] = this.mrelayID;
        console.log(params);
        if (GameMain.app.mUseCards == true)
            params['continue'] = 1;
        else
            params['continue'] = 0;
        //闯关地图
        // params['level']= GameMain.app.mMapLevel;
        // //分享次数
        // params['shares']=GameMain.app.mShares;
        var str = this.mURL + this.mCmd["report"] + util.getUrlParams(params, "1.0.2");
        wx.showLoading({
            title: "",
            mask: true
        });
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    //更新复活卡
    wxMinPro.prototype.updateCards = function () {
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                _this.mCards = Number(ret['cards']);
                if (_this.mCards <= 0) {
                }
                GameMain.app.indexV.cardNum.text = 'x' + _this.mCards;
                GameMain.app.indexV.cardN.text = 'x' + _this.mCards;
                GameMain.app.indexV.cardIndx.text = 'x' + _this.mCards;
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        var params = [];
        params['uid'] = this.mUID;
        console.log(this.mCmd["querycards"]);
        var str = this.mURL + this.mCmd["querycards"] + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    //获取复活卡
    wxMinPro.prototype.queryCards = function () {
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            wx.hideLoading({});
            if (ret['code'] == 0) {
                _this.mCards = Number(ret['cards']);
                // GameMain.app.mGameGift.show();
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        wx.showLoading({
            title: "",
            mask: true
        });
        var params = [];
        params['uid'] = this.mUID;
        console.log("uo/querycards");
        var str = this.mURL + this.mCmd["querycards"] + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    // 获取我的成绩
    wxMinPro.prototype.getMyMark = function (rank_type, type) {
        if (type === void 0) { type = true; }
        console.log(' 获取我的成绩');
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                if (ret['mark'] && ret['mark']['mark']) {
                    this.mUser['mark'] = ret['mark']['mark'];
                    GameMain.app.indexV.mScore.text = Math.floor(this.mUser['mark']) + '米';
                    wx.postMessage({
                        type: "send", mark: ret['mark']['mark'], level: 0, map: ret['mark']['mark'], best: this.mMarks[0], user: this.mUser
                    });
                }
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);
        var params = [];
        params['uid'] = this.mUID;
        var str = this.mURL + "1.0.2/fq/mymark?" + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    wxMinPro.prototype.checkAuthorize = function () {
        var _this = this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo'] == null) {
                    _this.dealAuthorize();
                }
                else {
                    if (res.authSetting['scope.userInfo'] == true) {
                        _this.checkSession();
                    }
                    else {
                        _this.openSeting();
                    }
                }
            },
            fail: function (res) {
                _this.dealAuthorize();
            }
        });
    };
    /**
     * 给自己加卡
     * @param uid
     */
    wxMinPro.prototype.addCardForMe = function (shareId) {
        console.log("addCardForMe");
        // this.addCardtrue = false;
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                _this.mCards = _this.mCards + 1;
                wx.showToast({
                    title: "获得复活卡1张",
                    icon: "success",
                    image: "",
                    duration: 3000
                });
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);
        var params = [];
        params['uid'] = _this.mUID;
        params['id'] = shareId;
        var str = this.mURL + "1.0.2/fq/AddMyCard?" + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
        console.log(str);
    };
    wxMinPro.prototype.dealCards = function (gift) {
        this.flag = false;
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            if (ret['code'] == 0) {
                _this.mCards = Number(ret['cards']);
                console.log('复活卡获取成功');
            }
            _this.mHttpCall = null;
            console.log('复活卡结果' + ret);
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        var params = [];
        params['uid'] = this.mUID;
        if (gift != null)
            params['gift'] = gift;
        else {
            if (typeof (this.mLaunch['query']['gift']) != "undefined") {
                params['gift'] = Number(this.mLaunch['query']['gift']);
            }
            else {
                params['gift'] = 0;
            }
        }
        // if(shareTicket != null)
        // {
        //     params['ticket'] = shareTicket;
        // }
        // else
        // {
        //     if(typeof(this.mLaunch['shareTicket']) != "undefined")
        //     {
        //         params['ticket'] = this.mLaunch['shareTicket'];
        //     }
        // }
        console.log("server/AddCard");
        var str = this.mURL + this.mCmd["AddCard"] + util.getUrlParams(params, '1.0.2');
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    //获取二维码
    wxMinPro.prototype.createQR = function (qr) {
        var _this = this;
        this.mQR = qr;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                var url = ret['url'];
                if (url.length > 10) {
                    _this.mQRs[_this.mShareID] = url;
                    // if(_this.mQR == 1)
                    // {
                    //     Laya.loader.load(url, Laya.Handler.create(GameMain.app, GameMain.app.saveimage1,[url]), null);
                    // }
                    // else
                    // {
                    //     Laya.loader.load(url, Laya.Handler.create(GameMain.app, GameMain.app.saveimage2,[url]), null);
                    // }
                }
                else {
                    // if(_this.mQR == 1)
                    //     GameMain.app.saveimage1("");
                    // else
                    //     GameMain.app.saveimage2("");
                }
            }
            else {
                // if(_this.mQR == 1)
                //     GameMain.app.saveimage1("");
                // else
                //     GameMain.app.saveimage2("");
            }
            _this.mHttpCall = null;
        }
        if (this.mQRs[this.mShareID] != null) {
            console.log("已经有了");
            // if(this.mQR == 1)
            //     GameMain.app.saveimage1(this.mQRs[this.mShareID]);
            // else
            //     GameMain.app.saveimage2(this.mQRs[this.mShareID]);
            return;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        var params = [];
        params['uid'] = this.mUID;
        params['id'] = this.mShareID;
        console.log("server/qr");
        var str = this.mURL + this.mCmd["qr"] + util.getUrlParams(params);
        wx.showLoading({
            title: "生成图片中",
            mask: true
        });
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    //获取用户信息
    wxMinPro.prototype.getUserInfo = function () {
        if (GameMain.app.mSDKVersion >= "3.0.1") {
            GameMain.app.Login();
        }
        else {
            var _this_1 = this;
            wx.getUserInfo({
                withCredentials: true,
                lang: "zh_CN",
                success: function (res) {
                    var userInfo = res.userInfo;
                    _this_1.mUser['nickName'] = userInfo.nickName;
                    var face = userInfo.avatarUrl;
                    if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                        face = face.substr(0, face.length - 2);
                        face = face + "/132";
                    }
                    _this_1.mUser['avatarUrl'] = face;
                    _this_1.mUser['gender'] = userInfo.gender; //性别 0：未知、1：男、2：女
                    _this_1.mUser['province'] = userInfo.province;
                    _this_1.mUser['city'] = userInfo.city;
                    _this_1.mUser['country'] = userInfo.country;
                    _this_1.loginServer(res.rawData, res.signature, res.encryptedData, res.iv);
                    GameMain.app.indexV.head.skin = face;
                    GameMain.app.indexV.userHead.skin = face;
                    GameMain.app.indexV.myFace.skin = face;
                    GameMain.app.indexV.mUser.text = userInfo.nickName;
                    GameMain.app.indexV.nickName.text = userInfo.nickName;
                    // GameMain.app.indexV.userName.text = userInfo.nickName
                },
                fail: function (res) {
                    _this_1.login();
                }
            });
        }
    };
    //按钮登录
    wxMinPro.prototype.onLogin = function (res) {
        var userInfo = res.userInfo;
        this.mUser['nickName'] = userInfo.nickName;
        var face = userInfo.avatarUrl;
        if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
            face = face.substr(0, face.length - 2);
            face = face + "/132";
        }
        this.mUser['avatarUrl'] = face;
        this.mUser['gender'] = userInfo.gender; //性别 0：未知、1：男、2：女
        this.mUser['province'] = userInfo.province;
        this.mUser['city'] = userInfo.city;
        this.mUser['country'] = userInfo.country;
        var _this = this;
        wx.login({
            success: function (rescode) {
                _this.checkCode(rescode.code, res);
            }
        });
        // this.loginServer(res.rawData,res.signature,res.encryptedData,res.iv);
    };
    //登录服务器
    wxMinPro.prototype.loginServer = function (rawData, signature, encryptedData, iv) {
        var _this = this;
        console.log("openid:" + this.mOpenid);
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            if (ret['code'] == 0) {
                Laya.Browser.window.sharedCanvas.width = Laya.stage.width;
                Laya.Browser.window.sharedCanvas.height = Laya.stage.height;
                _this.getMyMark("none", false);
                _this.mUID = ret['uid'];
                _this.mMoreGames = ret['games'];
                _this.mMarks[0] = Number(ret['marks']['mark']);
                _this.mMarks[1] = Number(ret['marks']['mark1']);
                _this.mMarks[2] = Number(ret['marks']['mark2']);
                _this.mMarks[3] = Number(ret['marks']['mark3']);
                _this.fhOnoff = Number(ret['fh_onoff']);
                wx.postMessage({
                    type: "send", mark: _this.mMarks[0], level: 0, best: 0, user: GameMain.app.mWX.mUser
                });
                if (Number(ret['fh_onoff']) == 0) {
                    this.fnOff = true;
                }
                else {
                    this.fnOff = false;
                }
                _this.mADKeep = Number(ret['ad_onoff']);
                if (typeof (_this.mLaunch['query']['gift']) != "undefined")
                    if (_this.flag) {
                        mainInst.mWX.dealCards(Number(_this.mLaunch['query']['gift']));
                    }
                if (_this.mLaunch['query']['gift'] != null && typeof (_this.mLaunch['query']['gift']) != "undefined") {
                    //自己领卡（道具礼包）
                    if (_this.mLaunch['query']['id'] > 0) {
                        if (_this.mLaunch['query']['id'] !== _this.shrrID) {
                            _this.addCardForMe(_this.mLaunch['query']['id']);
                            _this.shrrID = _this.mLaunch['query']['id'];
                        }
                        //给别人加卡
                    }
                    else {
                        mainInst.mWX.dealCards(Number(_this.mLaunch['query']['gift']));
                    }
                    mainInst.indexV.initGame();
                    mainInst.indexV.init();
                    mainInst.indexV.Init();
                    mainInst.indexV.scoreRrep = 0;
                }
                else if (_this.mLaunch['query']['id'] != null && Number(_this.mLaunch['query']['type']) == 8) {
                    mainInst.queryGroupRank();
                    mainInst.indexV.initGame();
                }
                else if (_this.mLaunch['query']['id'] > 0) {
                    _this.mrelayID = _this.mLaunch['query']['id'];
                    mainInst.showRelay();
                    mainInst.indexV.initGame();
                    // _this.showChallenge(true);
                }
                else {
                }
                wx.hideLoading({});
                _this.mMoreGames = ret['games'];
                // GameMain.app.indexV.showGG();
                if (ret['games'].length > 0) {
                    _this.iconArray = ret['games'];
                    _this.getIcon();
                    _this.getUrl();
                }
            }
            console.log(ret);
            if (ret['code'] == -3) {
                _this.login();
            }
            if (ret['code'] == -999) {
                _this.onHttpRequestError("error");
            }
            if (ret['marks'] != '') {
                console.log(ret['marks']['mark']);
                GameMain.app.indexV.mScore.text = ret['marks']['mark'] + '米';
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        console.log("uo/login");
        var params = [];
        params['secen'] = 0;
        if (Laya.Browser.onIOS)
            params['platform'] = 2;
        else
            params['platform'] = 1;
        params['openid'] = this.mOpenid;
        params['ver'] = this.mVersion;
        params['raw'] = base64.Base64.encodeURI(rawData);
        params['data'] = base64.Base64.encodeURI(encryptedData);
        params['signature'] = signature;
        params['iv'] = base64.Base64.encodeURI(iv);
        if (typeof (this.mLaunch['query']['gift']) != "undefined") {
            params['gift'] = Number(this.mLaunch['query']['gift']);
        }
        else {
            params['gift'] = 0;
        }
        if (this.mLaunch != null && this.mLaunch['query']['uid'] != null && Number(this.mLaunch['query']['uid']) != this.mUID)
            params['friend'] = this.mLaunch['query']['uid'];
        var str = this.mURL + this.mCmd["login"] + util.getUrlParams(params);
        wx.showLoading({
            title: "获取用户信息",
            mask: true
        });
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    wxMinPro.prototype.getIcon = function () {
        if (this.iconArray.length > 0) {
            var gameRandom = Math.floor(Math.random() * (this.iconArray.length - 1));
            GameMain.app.indexV.moreGame.skin = this.iconArray[gameRandom]['btn'];
            this.moreGameUrl = this.iconArray[gameRandom]['url'];
            this.gameID = this.iconArray[gameRandom]['id'];
        }
    };
    wxMinPro.prototype.getUrl = function () {
        console.log('立即跳过' + this.iconArray.length);
        var i = this.arrNumber;
        if (this.iconArray.length > 0) {
            var gameRandom = Math.floor(Math.random() * (this.iconArray.length - 1));
            console.log(gameRandom);
            GameMain.app.indexV.resultIcon.skin = this.iconArray[gameRandom]['icon'];
            this.resultUrl = this.iconArray[gameRandom]['url'];
            this.gameOverId = this.iconArray[gameRandom]['id'];
            // this.arrNumber = i + 1;
            // if(i>=this.iconArray.length -1 ){
            //     i=0;
            //     this.arrNumber = 0;
            // }else{
            //    this.arrNumber = i+1
            // }
        }
    };
    /**
     * @desc 好友接力数据获取
     */
    wxMinPro.prototype.showRelay = function () {
        var _this = this;
        function onResult(e) {
            wx.hideLoading({});
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                var master = {
                    name: base64.Base64.decode(ret['master']['name']),
                    friend_base: ret['master']['friend_base'],
                    mark: ret['master']['mark'],
                    uid: ret['master']['uid'],
                    id: ret['master']['id'],
                };
                var face1 = base64.Base64.decode(ret['master']['avatar']);
                if (face1.charAt(face1.length - 1) == '0' && face1.charAt(face1.length - 2) == '/') {
                    face1 = face1.substr(0, face1.length - 2);
                    face1 = face1 + "/132";
                }
                master['avatar'] = face1;
                var mData = [];
                var rData = ret['data'];
                for (var i = 0; i < rData.length; i++) {
                    if (rData[i]['uid'] != ret['master']['uid']) {
                        var obj = {};
                        obj['uid'] = rData[i]['uid'];
                        obj['name'] = base64.Base64.decode(rData[i]['name']);
                        var face = base64.Base64.decode(rData[i]['avatar']);
                        if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                            face = face.substr(0, face.length - 2);
                            face = face + "/132";
                        }
                        obj['avatar'] = face;
                        obj['mark'] = rData[i]['mark'];
                        mData.push(obj);
                    }
                }
                for (var i = 0; i < mData.length; i++) {
                    mData[i]['rank'] = i + 1;
                }
                mainInst.indexV.showRelayData(master, mData);
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        wx.showLoading({
            title: "",
            mask: true
        });
        console.log('fq/challenge');
        var params = [];
        params['uid'] = this.mUID;
        params['id'] = this.mrelayID;
        var str = this.mURL + '1.0.2/fq/challenge?' + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
        console.log(params);
        console.log(str);
    };
    wxMinPro.prototype.showChallenge = function (show) {
        var _this = this;
        function onResult(e) {
            wx.hideLoading({});
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                _this.mChallenge = ret;
                var master = {
                    name: base64.Base64.decode(ret['master']['name']),
                    friend_base: ret['master']['friend_base'],
                    mark: ret['master']['mark'],
                    uid: ret['master']['uid'],
                    id: ret['master']['id'],
                };
                var face1 = base64.Base64.decode(ret['master']['avatar']);
                if (face1.charAt(face1.length - 1) == '0' && face1.charAt(face1.length - 2) == '/') {
                    face1 = face1.substr(0, face1.length - 2);
                    face1 = face1 + "/132";
                }
                master['avatar'] = face1;
                var mData = [];
                var rData = ret['data'];
                for (var i = 0; i < rData.length; i++) {
                    if (rData[i]['uid'] != ret['master']['uid']) {
                        var obj = {};
                        obj['uid'] = rData[i]['uid'];
                        obj['name'] = base64.Base64.decode(rData[i]['name']);
                        var face = base64.Base64.decode(rData[i]['avatar']);
                        if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                            face = face.substr(0, face.length - 2);
                            face = face + "/132";
                        }
                        obj['avatar'] = face;
                        obj['mark'] = rData[i]['mark'];
                        mData.push(obj);
                    }
                }
                for (var i = 0; i < mData.length; i++) {
                    mData[i]['rank'] = i + 1;
                }
                // mainInst.relayView.showrelayData(master, mData);
            }
            else {
                // GameMain.app.mGameScene.showPage();
            }
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        if (show == true) {
            wx.showLoading({
                title: "",
                mask: true
            });
        }
        console.log(this.mCmd["challenge"]);
        var params = [];
        params['uid'] = this.mUID;
        params['id'] = this.mrelayID;
        var str = this.mURL + this.mCmd["challenge"] + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    wxMinPro.prototype.showWorldRank = function (page) {
        if (page === void 0) { page = 0; }
        var _this = this;
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(_this.mHttpCall.data);
            console.log(ret);
            if (ret['code'] == 0) {
                if (Number(ret['rank']) > 0) {
                    var mrank = Number(ret['rank']);
                    if (mrank > 0 && _this.mMarks[0] > 0) {
                        _this.mMyRank = mrank;
                    }
                    _this.getMyMark("none", false);
                    GameMain.app.indexV.mRank.text = mrank.toString();
                }
                var mData = GameMain.app.indexV.wRankData;
                var rData = ret['data'];
                for (var i = 0; i < rData.length; i++) {
                    var obj = {};
                    obj['name'] = base64.Base64.decode(rData[i]['name']);
                    var face = base64.Base64.decode(rData[i]['avatar']);
                    if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
                        face = face.substr(0, face.length - 2);
                        face = face + "/132";
                    }
                    obj['avatar'] = face;
                    obj['mark'] = Math.floor(rData[i]['hismark']);
                    obj['city'] = rData[i]['city'];
                    obj['uid'] = rData[i]['uid'];
                    obj['map1'] = Math.floor(rData[i]['mark1']);
                    obj['map2'] = Math.floor(rData[i]['mark2']);
                    obj['map3'] = Math.floor(rData[i]['mark3']);
                    // let mLevel = GameMain.app.mLevel;
                    // let mLevelName = GameMain.app.mLevelName;
                    // let level:number = mLevel.length;
                    // for(let m:number=0;m<mLevel.length;m++)
                    // {
                    //     if(obj['mark']<mLevel[m])
                    //     {
                    //         level = m + 1;
                    //         break;
                    //     }
                    // }
                    // obj['level'] = mLevelName[level-1];
                    mData.push(obj);
                }
                for (var i = 0; i < mData.length; i++) {
                    mData[i]['rank'] = i + 1;
                }
                if (rData.length > 0) {
                    GameMain.app.indexV.parseRankData(mData);
                }
                wx.hideLoading({});
            }
            _this.mHttpCall = null;
        }
        wx.showLoading({
            title: "",
            mask: true
        });
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        console.log(this.mCmd["rank"]);
        var params = [];
        params['uid'] = this.mUID;
        params['page'] = page;
        var str = this.mURL + this.mCmd["rank"] + util.getUrlParams(params, '1.0.2');
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    wxMinPro.prototype.onHttpRequestError = function (e) {
        wx.hideLoading({});
        this.mHttpCall = null;
        // GameMain.app.mGameScene.showNetError();
        console.log("onHttpRequestError:" + e);
    };
    wxMinPro.prototype.openAlbumSeting = function () {
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '游戏需要您授权保存图片到相册',
            showCancel: false,
            cancelText: '取消',
            confirmText: "确认",
            success: function (res) {
                wx.openSetting({
                    success: function (res) {
                        if (res.authSetting['scope.writePhotosAlbum'] == false) {
                        }
                        else {
                            _this.saveToAlbum();
                        }
                    }
                });
            }
        });
    };
    wxMinPro.prototype.dealAlbum = function () {
        var _this = this;
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
                _this.saveToAlbum();
            },
            fail: function (res) {
                _this.openAlbumSeting();
            }
        });
    };
    wxMinPro.prototype.saveImage = function (file) {
        this.mSaveImage = file;
        var _this = this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.writePhotosAlbum'] == null) {
                    _this.dealAlbum();
                }
                else {
                    if (res.authSetting['scope.writePhotosAlbum'] == true) {
                        _this.saveToAlbum();
                    }
                    else {
                        _this.openAlbumSeting();
                    }
                }
            },
            fail: function (res) {
                _this.dealAlbum();
            }
        });
    };
    wxMinPro.prototype.saveToAlbum = function () {
        wx.saveImageToPhotosAlbum({
            filePath: this.mSaveImage,
            success: function (res) {
                wx.showToast({ title: "保存成功",
                    icon: "success",
                    image: "",
                    duration: 2000
                });
            }
        });
    };
    /**
     * 测量屏幕尺寸
     */
    wxMinPro.prototype.getBrowserInfo = function () {
        var info = wx.getSystemInfoSync();
        mainInst.mSDKVersion = info['SDKVersion'];
        // mainInst.mScreenHeight = Number(info['screenHeight']);
        // mainInst.mScreenWidth = Number(info['screenWidth']);
        // console.log("width = "+mainInst.mScreenWidth+",height="+mainInst.mScreenHeight);
    };
    //根据百分比显示更多好玩
    //isIndex 是否是首页广告
    wxMinPro.prototype.initMoreGame = function (btn, type) {
        console.log("根据百分比显示更多好玩");
        var total = 0;
        for (var i = 0; i < this.mMoreGames.length; i++) {
            total = total + Number(this.mMoreGames[i]['random']);
        }
        var rd = Math.floor(Math.random() * total) - 1;
        total = 0;
        for (var i = 0; i < this.mMoreGames.length; i++) {
            if (Number(this.mMoreGames[i]['sys']) == 0)
                total = total + Number(this.mMoreGames[i]['random']);
            else if (Laya.Browser.onAndriod == true && Number(this.mMoreGames[i]['sys']) == 2)
                total = total + Number(this.mMoreGames[i]['random']);
            else if (Laya.Browser.onIOS == true && Number(this.mMoreGames[i]['sys']) == 1)
                total = total + Number(this.mMoreGames[i]['random']);
            if (rd <= total) {
                btn.name = this.mMoreGames[i]['id'];
                // 首页广告
                if (type == "btn") {
                    btn.skin = this.mMoreGames[i]['btn'];
                    console.log(btn.skin);
                }
                else if (type == 'icon') {
                    btn.skin = this.mMoreGames[i]['icon'];
                }
                return;
            }
        }
    };
    wxMinPro.prototype.getMoreUrl = function (id) {
        for (var i = 0; i < this.mMoreGames.length; i++) {
            if (Number(id) == Number(this.mMoreGames[i]['id']))
                return this.mMoreGames[i];
        }
        return null;
    };
    wxMinPro.prototype.reportADHit = function (id) {
        var _this = this;
        function onResult(e) {
            _this.mHttpCall = null;
        }
        this.mHttpCall = new HttpRequest();
        this.mHttpCall.once(Events.COMPLETE, this, onResult);
        this.mHttpCall.once(Events.ERROR, this, this.onHttpRequestError);
        console.log("qq/data");
        var params = [];
        params['uid'] = this.mUID;
        params['id'] = id;
        var str = this.mURL + "1.0.2/qq/data?" + util.getUrlParams(params, "1.0.2");
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    // public showMoreGamePage(btn:Laya.Image):void
    // {
    //     var url:string = mainInst.mWX.getMoreUrl(btn.name);
    //     mainInst.mWX.reportADHit(btn.name);
    //     console.log(url);
    //     wx.previewImage({
    //         urls: [url],
    //         success: (res) => {
    //             wx.hideLoading({});
    //             console.log('预览图片成功');
    //         }
    //     });
    // }
    wxMinPro.prototype.initGameClub = function (offset) {
        var topY = 15 + offset / 2;
        if (mainInst.mSDKVersion >= "2.0.3") {
            this.gameClub = wx.createGameClubButton({
                icon: 'dark',
                style: {
                    left: 15,
                    top: topY,
                    width: 30,
                    height: 30
                }
            });
            // this.gameClub.hide();
        }
    };
    return wxMinPro;
}());
//# sourceMappingURL=wxMinPro.js.map
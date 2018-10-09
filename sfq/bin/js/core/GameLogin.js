var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var GameLogin = /** @class */ (function (_super) {
    __extends(GameLogin, _super);
    function GameLogin() {
        var _this = _super.call(this) || this;
        _this.login = null;
        return _this;
    }
    GameLogin.prototype.init = function () {
        var w = Math.floor(424 * GameMain.app.mScreenWidth / Laya.stage.width);
        var h = Math.floor(134 * GameMain.app.mScreenWidth / Laya.stage.width);
        var left = Math.floor((375 - 212) * GameMain.app.mScreenWidth / Laya.stage.width);
        var top = Math.floor((880 + (Laya.stage.height - 1334) / 2) * GameMain.app.mScreenHeight / Laya.stage.height);
        this.y = this.y + (Laya.stage.height - 1334) / 2;
        //424,134
        GameMain.app.startView.mGameBtns.visible = false;
        this.login = wx.createUserInfoButton({
            type: 'image',
            image: "check/blogin.png",
            style: {
                left: left,
                top: top,
                width: w,
                height: h
            }
        });
        this.login.show();
        var app = this;
        this.login.onTap(function (res) {
            wx.showLoading({
                title: "获取用户信息",
                mask: true
            });
            GameMain.app.mWX.onLogin(res);
            GameMain.app.startView.mGameBtns.visible = true;
            GameMain.app.startView.clickButtons();
            app.login.hide();
            app.login.destroy();
            app.removeSelf();
        });
    };
    return GameLogin;
}(ui.loginUI));
//# sourceMappingURL=GameLogin.js.map
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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var newRankUI = /** @class */ (function (_super) {
        __extends(newRankUI, _super);
        function newRankUI() {
            return _super.call(this) || this;
        }
        newRankUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.newRankUI.uiView);
        };
        newRankUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 241, "x": 31, "width": 686, "var": "rankListBg", "skin": "res/rank_bg1.png", "height": 789 }, "child": [{ "type": "List", "props": { "y": 24, "x": 23, "width": 620, "var": "mlist", "repeatY": 5, "repeatX": 1, "height": 610 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 620, "name": "render", "height": 116 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "res/rank_other_rank_bg.png", "name": "rk" }, "child": [{ "type": "Label", "props": { "y": 3, "x": 3, "width": 50, "text": "1", "overflow": "hidden", "name": "rank", "fontSize": 20, "color": "#FFFFFF", "anchorX": 0, "align": "center" } }] }, { "type": "Image", "props": { "y": 26, "x": 50, "width": 80, "name": "face", "height": 80, "anchorY": 0, "anchorX": 0 }, "child": [{ "type": "Image", "props": { "y": -1, "x": -1, "width": 82, "skin": "res/rank_other_bg.png", "height": 82, "anchorY": 0, "anchorX": 0 } }] }, { "type": "Label", "props": { "y": 34, "x": 159, "width": 217, "valign": "middle", "text": "测试用户", "overflow": "hidden", "name": "name", "height": 84, "fontSize": 30, "color": "#ffffff", "align": "left" } }, { "type": "Label", "props": { "y": 60, "x": 590, "width": 120, "text": "999分", "strokeColor": "#18171A", "stroke": 4, "overflow": "hidden", "name": "mk", "fontSize": 30, "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 1, "align": "right" } }, { "type": "Line", "props": { "y": 126, "x": 157, "toY": 0, "toX": 426.4516129032258, "lineWidth": 1, "lineColor": "#8FB7BF" } }] }] }, { "type": "Box", "props": { "y": 652, "x": 331, "width": 620, "var": "mSelf", "height": 130, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": -10, "x": -20, "var": "rankbk", "skin": "res/rank_my_rank_bg.png" }, "child": [{ "type": "Label", "props": { "y": 14, "x": 13, "var": "mRank", "text": "未上榜", "overflow": "hidden", "fontSize": 24, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0, "align": "center" } }] }, { "type": "Image", "props": { "y": 24, "x": 50, "width": 80, "var": "myFace", "height": 80, "anchorY": 0, "anchorX": 0 }, "child": [{ "type": "Image", "props": { "y": -1, "x": -1, "width": 82, "skin": "res/rank_head_self.png", "height": 82, "anchorY": 0, "anchorX": 0 } }] }, { "type": "Label", "props": { "y": 24, "x": 157, "width": 217, "var": "mUser", "valign": "middle", "text": "测试用户", "overflow": "hidden", "height": 84, "fontSize": 30, "color": "#000000", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 59, "x": 591, "width": 130, "var": "mMark", "text": "暂无成绩", "strokeColor": "#18171A", "stroke": 4, "overflow": "hidden", "fontSize": 30, "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 1, "align": "right" } }] }] }] };
        return newRankUI;
    }(View));
    ui.newRankUI = newRankUI;
})(ui || (ui = {}));
(function (ui) {
    var nextPlayerUI = /** @class */ (function (_super) {
        __extends(nextPlayerUI, _super);
        function nextPlayerUI() {
            return _super.call(this) || this;
        }
        nextPlayerUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.nextPlayerUI.uiView);
        };
        nextPlayerUI.uiView = { "type": "View", "props": { "width": 750, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 60, "x": 375, "skin": "res/flip/nextbg.png", "sizeGrid": "0,0,0,0", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 60, "x": 387, "width": 74, "var": "face", "height": 74, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 60, "x": 52, "skin": "res/flip/nextby.png", "anchorY": 0.5, "anchorX": 0 } }, { "type": "Label", "props": { "y": 60, "x": 526, "var": "mark", "text": "90米", "fontSize": 36, "color": "#FFEA80", "bold": true, "anchorY": 0.5, "align": "left" } }] }] };
        return nextPlayerUI;
    }(View));
    ui.nextPlayerUI = nextPlayerUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map
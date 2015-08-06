var Window1 = (function (_super) {
    __extends(Window1, _super);
    function Window1() {
        _super.call(this, skins.window.Window1Skin);
    }
    var __egretProto__ = Window1.prototype;
    __egretProto__.childrenCreated = function () {
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            GUIManager.closeWindow(this);
        }, this);
    };
    return Window1;
})(ASkinCom);
Window1.prototype.__class__ = "Window1";
//# sourceMappingURL=Window1.js.map
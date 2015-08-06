var Window2 = (function (_super) {
    __extends(Window2, _super);
    function Window2() {
        _super.call(this, skins.window.Window2Skin);
    }
    var __egretProto__ = Window2.prototype;
    __egretProto__.childrenCreated = function () {
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            GUIManager.closeWindow(this);
        }, this);
    };
    return Window2;
})(ASkinCom);
Window2.prototype.__class__ = "Window2";
//# sourceMappingURL=Window2.js.map
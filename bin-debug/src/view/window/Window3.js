var Window3 = (function (_super) {
    __extends(Window3, _super);
    function Window3() {
        _super.call(this, skins.window.Window3Skin);
    }
    var __egretProto__ = Window3.prototype;
    __egretProto__.childrenCreated = function () {
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            GUIManager.closeWindow(this);
        }, this);
    };
    return Window3;
})(ASkinCom);
Window3.prototype.__class__ = "Window3";
//# sourceMappingURL=Window3.js.map
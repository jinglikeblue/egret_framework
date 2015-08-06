var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Window1 = (function (_super) {
    __extends(Window1, _super);
    function Window1() {
        _super.call(this);
        this.skinName = skins.window.Window1Skin;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            GUIManager.closeWindow(this);
        }, this);
    }
    return Window1;
})(egret.gui.SkinnableComponent);

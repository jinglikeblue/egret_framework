var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Hall = (function (_super) {
    __extends(Hall, _super);
    function Hall() {
        _super.call(this);
        this.skinName = skins.scene.HallSkin;
    }
    Hall.prototype.childrenCreated = function () {
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            GUIManager.showScene(new StageChange());
        }, this);
    };
    return Hall;
})(egret.gui.SkinnableComponent);

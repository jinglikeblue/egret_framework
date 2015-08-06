var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StageChange = (function (_super) {
    __extends(StageChange, _super);
    function StageChange() {
        _super.call(this);
        this.skinName = skins.scene.StageChangeSkin;
    }
    StageChange.prototype.childrenCreated = function () {
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            GUIManager.showScene(new Hall());
        }, this);
    };
    return StageChange;
})(egret.gui.SkinnableComponent);

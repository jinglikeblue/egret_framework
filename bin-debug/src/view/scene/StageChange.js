var StageChange = (function (_super) {
    __extends(StageChange, _super);
    function StageChange() {
        _super.call(this, skins.scene.StageChangeSkin);
    }
    var __egretProto__ = StageChange.prototype;
    __egretProto__.childrenCreated = function () {
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            GUIManager.showScene(new Hall(null));
        }, this);
    };
    return StageChange;
})(ASkinCom);
StageChange.prototype.__class__ = "StageChange";
//# sourceMappingURL=StageChange.js.map
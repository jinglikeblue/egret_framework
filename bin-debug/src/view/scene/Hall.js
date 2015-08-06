var Hall = (function (_super) {
    __extends(Hall, _super);
    function Hall(data) {
        _super.call(this, skins.scene.HallSkin, data);
    }
    var __egretProto__ = Hall.prototype;
    __egretProto__.init = function () {
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            GUIManager.closeAllWindow();
            GUIManager.showScene(new StageChange());
        }, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            GUIManager.showWindow(new Window1(), true, true);
        }, this);
        this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            GUIManager.closeWindowIndex();
        }, this);
    };
    return Hall;
})(ASkinCom);
Hall.prototype.__class__ = "Hall";
//# sourceMappingURL=Hall.js.map
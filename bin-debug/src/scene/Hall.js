var Hall = (function (_super) {
    __extends(Hall, _super);
    function Hall() {
        _super.call(this);
        //  指定当前类的皮肤名称
        //  Assign the skin name used by this Component
        this.skinName = skins.scene.HallSkin;
    }
    var __egretProto__ = Hall.prototype;
    __egretProto__.childrenCreated = function () {
        console.log("childrenCreated");
    };
    return Hall;
})(egret.gui.SkinnableComponent);
Hall.prototype.__class__ = "Hall";
//# sourceMappingURL=Hall.js.map
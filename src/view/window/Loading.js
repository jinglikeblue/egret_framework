var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        _super.call(this);
        this.skinName = skins.window.LoadingSkin;
    }
    return Loading;
})(egret.gui.SkinnableComponent);

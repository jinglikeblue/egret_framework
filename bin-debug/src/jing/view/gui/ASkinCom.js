var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
*
*/
var ASkinCom = (function (_super) {
    __extends(ASkinCom, _super);
    function ASkinCom(skin, data) {
        if (data === void 0) { data = null; }
        _super.call(this);
        this.skinName = skin;
        this.data = data;
    }
    ASkinCom.prototype.childrenCreated = function () {
        this.init();
        this.addListeners();
    };
    ASkinCom.prototype.init = function () {
    };
    ASkinCom.prototype.addListeners = function () {
    };
    ASkinCom.prototype.removeListeners = function () {
    };
    ASkinCom.prototype.dispose = function () {
        this.removeListeners();
    };
    return ASkinCom;
})(egret.gui.SkinnableComponent);
//# sourceMappingURL=ASkinCom.js.map
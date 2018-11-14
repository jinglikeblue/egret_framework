var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DemoWin = (function (_super) {
    __extends(DemoWin, _super);
    function DemoWin() {
        var _this = _super.call(this) || this;
        _this.skinName = DemoWinSkin;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        return _this;
    }
    /**
     * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
     */
    DemoWin.prototype.onInit = function (data) {
    };
    /**
     * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
     */
    DemoWin.prototype.onShow = function (data) {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
    };
    /**
     * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
     */
    DemoWin.prototype.onDispose = function () {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
    };
    DemoWin.prototype.onBtnClickTouchTap = function (e) {
        GWindowMgr.close(this);
    };
    return DemoWin;
}(eui.Component));
__reflect(DemoWin.prototype, "DemoWin", ["IView", "egret.IEventDispatcher"]);
//# sourceMappingURL=DemoWin.js.map
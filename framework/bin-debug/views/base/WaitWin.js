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
var WaitWin = (function (_super) {
    __extends(WaitWin, _super);
    function WaitWin() {
        var _this = _super.call(this) || this;
        //窗口在到达极限时间时关闭
        _this._maxTime = 0;
        _this._delayId = -1;
        _this.skinName = WaitWinSkin;
        return _this;
    }
    WaitWin.show = function (maxTime) {
        if (maxTime === void 0) { maxTime = -1; }
        if (this._ins != null) {
            this.close();
        }
        this._ins = WindowMgr.open(WindowName.WAIT, maxTime);
    };
    WaitWin.close = function () {
        if (this._ins != null) {
            WindowMgr.close(this._ins);
            this._ins = null;
        }
    };
    /**
     * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
     */
    WaitWin.prototype.onInit = function (data) {
        this._maxTime = data;
    };
    /**
     * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
     */
    WaitWin.prototype.onShow = function (data) {
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        if (this._maxTime > -1) {
            this._delayId = DelayCaller.create(this._maxTime, this.onTimeOver, this);
        }
    };
    /**
     * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
     */
    WaitWin.prototype.onDispose = function () {
        if (this._delayId > -1) {
            DelayCaller.dispose(this._delayId);
            this._delayId = -1;
        }
    };
    WaitWin.prototype.onTimeOver = function () {
        this._delayId = -1;
        WaitWin.close();
    };
    return WaitWin;
}(eui.Component));
__reflect(WaitWin.prototype, "WaitWin", ["IView", "egret.IEventDispatcher"]);
//# sourceMappingURL=WaitWin.js.map
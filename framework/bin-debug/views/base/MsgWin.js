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
var MsgWin = (function (_super) {
    __extends(MsgWin, _super);
    function MsgWin() {
        var _this = _super.call(this) || this;
        _this.skinName = MsgWinSkin;
        return _this;
    }
    MsgWin.show = function (str, callback) {
        if (callback === void 0) { callback = null; }
        var vo = new MsgWinVO(str, callback);
        WindowMgr.open(WindowName.MSG_BOX, vo);
    };
    /**
     * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
     */
    MsgWin.prototype.onInit = function (data) {
        this.vo = data;
    };
    /**
     * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
     */
    MsgWin.prototype.onShow = function (data) {
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.lbMsg.text = this.vo.msg;
    };
    /**
     * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
     */
    MsgWin.prototype.onDispose = function () {
        this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    MsgWin.prototype.onTouchTap = function (e) {
        WindowMgr.close(this);
        if (this.vo.callback != null) {
            this.vo.callback.doCallback();
        }
    };
    return MsgWin;
}(eui.Component));
__reflect(MsgWin.prototype, "MsgWin", ["IView", "egret.IEventDispatcher"]);
//# sourceMappingURL=MsgWin.js.map
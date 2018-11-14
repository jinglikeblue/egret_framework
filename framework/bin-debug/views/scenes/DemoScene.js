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
var DemoScene = (function (_super) {
    __extends(DemoScene, _super);
    function DemoScene() {
        var _this = _super.call(this) || this;
        _this.skinName = DemoSceneSkin;
        return _this;
    }
    /**
     * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
     */
    DemoScene.prototype.onInit = function (data) {
    };
    /**
     * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
     */
    DemoScene.prototype.onShow = function (data) {
        this.btnClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
        this.btnAudio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAudioTouchTap, this);
        this.btnWX.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
        this.btnWS.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
        this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnRecordTouchBegin, this);
        this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnRecordTouchEnd, this);
        this.btnRequest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
        MsgWin.show("你好这是DEMO", new CallbackModel(function () {
            MsgWin.show("再次点击关闭");
        }, this));
        AudioDevice.playBGM("bg_mp3");
        NoticeManager.addNoticeAction(YaYaIMNotice.ON_RCD_UPLOAD, this.onRcdUploadNotice, this);
        YaYaIM.login(new Date().getTime().toString());
    };
    /**
     * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
     */
    DemoScene.prototype.onDispose = function () {
        this.btnClick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
        this.btnAudio.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAudioTouchTap, this);
        this.btnWX.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
        this.btnWS.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
        this.btnRecord.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnRecordTouchBegin, this);
        this.btnRecord.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnRecordTouchEnd, this);
        this.btnRequest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
        NoticeManager.removeNoticeAction(YaYaIMNotice.ON_RCD_UPLOAD, this.onRcdUploadNotice, this);
    };
    DemoScene.prototype.onBtnClickTouchTap = function (e) {
        GWindowMgr.open(WindowName.DEMO);
    };
    DemoScene.prototype.onBtnAudioTouchTap = function (e) {
        AudioDevice.playEffect("chat_mp3");
    };
    DemoScene.prototype.onButtonTouchTap = function (e) {
        switch (e.currentTarget) {
            case this.btnWX:
                DeviceUtil.wxLogin();
                break;
            case this.btnRequest:
                WaitWin.show(5000);
                break;
            case this.btnWS:
                GWindowMgr.open(WindowName.DEMO_WS);
                break;
        }
    };
    DemoScene.prototype.onBtnRecordTouchBegin = function (e) {
        DeviceUtil.startRcd();
    };
    DemoScene.prototype.onBtnRecordTouchEnd = function (e) {
        DeviceUtil.stopRcd();
    };
    DemoScene.prototype.onRcdUploadNotice = function (n) {
        var rcdUrl = n.data;
        YaYaIM.playRcd(rcdUrl);
    };
    return DemoScene;
}(eui.Component));
__reflect(DemoScene.prototype, "DemoScene", ["IView", "egret.IEventDispatcher"]);
//# sourceMappingURL=DemoScene.js.map
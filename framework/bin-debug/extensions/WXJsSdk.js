var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WXJsSdk = (function () {
    function WXJsSdk() {
    }
    WXJsSdk.ins = function () {
        return this._ins;
    };
    /**
     * 初始化微信JS-SDK
     */
    WXJsSdk.prototype.init = function (debug, appId, timestamp, nonceStr, signature, jsApiList) {
        if (jsApiList === void 0) { jsApiList = null; }
        Extension.registerFun("onWXReady", this.onWXReady, this);
        Extension.registerFun("onWXError", this.onWXError, this);
        Extension.registerFun("onWXShareSuccess", this.onWXShareSuccess, this);
        Extension.registerFun("onWXShareCancel", this.onWXShareCancel, this);
        Extension.registerFun("onChooseWXPaySuccess", this.onChooseWXPaySuccess, this);
        var cfg = {};
        cfg.debug = debug;
        cfg.appId = appId;
        cfg.timestamp = timestamp;
        cfg.nonceStr = nonceStr;
        cfg.signature = signature;
        cfg.jsApiList = jsApiList;
        if (null == jsApiList) {
            cfg.jsApiList = [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'chooseImage',
                'chooseWXPay' //
            ];
        }
        ;
        Extension.callJS("registerWX", cfg);
    };
    WXJsSdk.prototype.onWXReady = function () {
        this.updateShareMsg(DC.setting.wxShareIconUrl, DC.setting.wxShareLinkUrl, "\u5206\u4EAB\u6807\u9898", "\u5206\u4EAB\u5185\u5BB9");
    };
    WXJsSdk.prototype.onWXError = function () {
        // MsgBox.show("微信授权失败！部分功能受限！");
    };
    WXJsSdk.prototype.onWXShareSuccess = function () {
        // MsgBox.show("分享成功");
    };
    WXJsSdk.prototype.onWXShareCancel = function () {
        //MsgBox.show("分享取消");
    };
    WXJsSdk.prototype.onChooseWXPaySuccess = function (res) {
    };
    WXJsSdk.prototype.updateShareMsg = function (iconUrl, linkUrl, title, desc) {
        Extension.callJS("initShareMsg", iconUrl, linkUrl, title, desc);
    };
    return WXJsSdk;
}());
__reflect(WXJsSdk.prototype, "WXJsSdk");
//# sourceMappingURL=WXJsSdk.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DeviceUtil = (function () {
    function DeviceUtil() {
    }
    DeviceUtil.getClientType = function () {
        return DC.startParams.clientType;
    };
    //设备启动
    DeviceUtil.startDevice = function () {
    };
    DeviceUtil.wechatInvite = function (title, desc) {
        if (this.getClientType() == ClientType.WEBVIEW_ANDROID || this.getClientType() == ClientType.WEBVIEW_IOS) {
            // let t: egret.Texture = RES.getRes(DC.armor.bigLogo);
            // if (t) {
            // 	let base64 = t.toDataURL("image/png");
            // 	WeChat.shareUrl(base64, DC.cfgs.setting.appUrl, title, desc, false);
            // }
        }
        else {
            WXJsSdk.ins().updateShareMsg(DC.setting.wxShareIconUrl, DC.setting.wxShareLinkUrl, title, desc);
            //开始分享
        }
    };
    DeviceUtil.wxLogin = function () {
        if (this.getClientType() == ClientType.WEBVIEW_ANDROID || this.getClientType() == ClientType.WEBVIEW_IOS) {
            WeChat.getCode();
        }
        else {
            MsgWin.show("暂时只支持APP");
        }
    };
    /**
     * 获取微信授权code
     */
    DeviceUtil.wxGetCode = function (uuid) {
        // StorageUtil.saveAccountToLocal(uuid);
        // if (this.getClientType() == ClientType.WEBVIEW_ANDROID || this.getClientType() == ClientType.WEBVIEW_IOS) {
        // 	DC.ne.callNative({ "id": "wxLogin" });
        // }
        // else {
        // 	StorageUtil.save("wx_auth", "requesting");
        // 	let callbackUrl = DC.cfgs.setting.wxCallbackUrl;
        // 	let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${DC.cfgs.setting.wxAppId}&`;
        // 	url += `redirect_uri=${callbackUrl}&response_type=code&scope=snsapi_userinfo&state=`;//snsapi_userinfo snsapi_base
        // 	url += uuid;
        // 	url += "#wechat_redirect";
        // 	//跳转网页
        // 	ClientUtil.jumpUrl(url);
        // }
    };
    DeviceUtil.startRcd = function () {
        if (this.getClientType() == ClientType.WEBVIEW_ANDROID || this.getClientType() == ClientType.WEBVIEW_IOS) {
            // DC.isPrepareVoice = true;
            YaYaIM.startRcd();
            // StackTip.alert("开始录音");
        }
        else {
            MsgWin.show("下载app可使用语音功能");
            // new DownloadAppTipCmd().run();
        }
    };
    DeviceUtil.stopRcd = function () {
        if (this.getClientType() == ClientType.WEBVIEW_ANDROID || this.getClientType() == ClientType.WEBVIEW_IOS) {
            if (YaYaIM.isRecordingVoice == true) {
                // StackTip.alert("结束录音");
            }
            YaYaIM.stopRcd();
        }
        else {
        }
    };
    /**
     * 退出设备
     */
    DeviceUtil.exit = function () {
        if (this.getClientType() == ClientType.WEBVIEW_ANDROID || this.getClientType() == ClientType.WEBVIEW_IOS) {
            NativeCaller.exit();
        }
        else {
        }
    };
    DeviceUtil.onAppStop = function () {
        egret.log("app进入后台");
        if (this.getClientType() == ClientType.WEBVIEW_IOS) {
            DC.stage.frameRate = 0.000001;
        }
        if (this.getClientType() == ClientType.WEBVIEW_ANDROID) {
            AudioDevice.pauseBGM();
        }
    };
    DeviceUtil.onAppResume = function () {
        egret.log("app被唤醒");
        if (this.getClientType() == ClientType.WEBVIEW_IOS) {
            DC.stage.frameRate = 30;
        }
        if (this.getClientType() == ClientType.WEBVIEW_ANDROID) {
            if (AudioDevice.bgmEnable) {
                AudioDevice.continueBGM();
            }
            else {
                AudioDevice.stopBGM();
            }
        }
    };
    return DeviceUtil;
}());
__reflect(DeviceUtil.prototype, "DeviceUtil");
//# sourceMappingURL=DeviceUtil.js.map
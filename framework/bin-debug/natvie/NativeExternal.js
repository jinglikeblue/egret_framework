var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NativeExternal = (function () {
    function NativeExternal() {
        // egret.ExternalInterface.addCallback("native2egret", this.onNativeCall);
    }
    NativeExternal.ins = function () {
        if (null == this._ins) {
            this._ins = new NativeExternal();
        }
        return this._ins;
    };
    NativeExternal.addMsgFromNative = function (msg) {
        this._msgListFromNative.push(msg);
    };
    NativeExternal.prototype.startCacheWebviewMsgs = function () {
        //使用egret.setInterval会在页面最小化后不再出发
        setInterval(this.getNativeMsgs.bind(this), NativeExternal.CALL_NATIVE_INTERVAL);
    };
    NativeExternal.prototype.send = function (data) {
        if (null == data) {
            data = {};
        }
        var msg = JSON.stringify(data);
        egret.ExternalInterface.call("egret2native", msg);
    };
    // private onNativeCall(msg: string): void {
    // 	console.log("message form native : " + msg);
    // 	// StackTip.alert("message form native : " + msg);
    // }
    /**
     * 以webview方式运行时可以调用该方法
     */
    NativeExternal.prototype.callNative = function (data) {
        if (egret.RuntimeType.WEB != egret.Capabilities.runtimeType) {
            return null;
        }
        var res = null;
        switch (DC.startParams.clientType) {
            case ClientType.WEBVIEW_ANDROID:
                res = this.callWebViewAndroid(data);
                break;
            case ClientType.WEBVIEW_IOS:
                res = this.callWebViewIOS(data);
                break;
        }
        return res;
    };
    NativeExternal.prototype.callWebViewAndroid = function (data) {
        if (null == window['callAndroidNative']) {
            return null;
        }
        var msg = JSON.stringify(data);
        egret.log("请求native: " + msg);
        var res = window['callAndroidNative'](msg);
        if (res == 0) {
            //成功
        }
        else {
            //错误
        }
        return res;
    };
    NativeExternal.prototype.callWebViewIOS = function (data) {
        if (null == window['callIosNative']) {
            return null;
        }
        var msg = JSON.stringify(data);
        var res = window['callIosNative'](msg);
        return null;
    };
    NativeExternal.prototype.getNativeMsgs = function () {
        if (egret.RuntimeType.WEB != egret.Capabilities.runtimeType) {
            return null;
        }
        // egret.log("获取natvie协议");
        switch (DC.startParams.clientType) {
            case ClientType.WEBVIEW_ANDROID:
                this.getWebViewAndroidMsgs();
                break;
            case ClientType.WEBVIEW_IOS:
                this.getWebViewIOSMsgs();
                break;
        }
    };
    NativeExternal.prototype.getWebViewAndroidMsgs = function () {
        if (null == window['getNativeMsgs']) {
            return;
        }
        var msg = window['getNativeMsgs']();
        if (msg != null && msg != "") {
            var jobj = JSON.parse(msg);
            for (var i = 0; i < jobj.length; i++) {
                var msgFromNative = jobj[i];
                egret.log("egret收到native协议: " + msgFromNative);
                this.parseNativeMsg(JSON.parse(msgFromNative));
            }
        }
    };
    NativeExternal.prototype.getWebViewIOSMsgs = function () {
        var msgs = NativeExternal._msgListFromNative;
        for (var i = 0; i < msgs.length; i++) {
            var msg = msgs[i];
            egret.log("egret收到native协议: " + msg);
            this.parseNativeMsg(JSON.parse(msg));
        }
        NativeExternal._msgListFromNative.length = 0;
    };
    NativeExternal.prototype.parseNativeMsg = function (obj) {
        switch (obj.id) {
            case "clientType":
                // DC.clientType = obj.type;
                // egret.log("设置客户端类型：" + DC.clientType);
                break;
            case "onRcdUpload":
                //录音上传完成
                YaYaIM.onRcdUpload(obj);
                break;
            case "onRcdPlayStop":
                //录音播放结束
                YaYaIM.onRcdPlayStop(obj);
                break;
            case "onLoginResult":
                //登录结果
                YaYaIM.onLoginResult(obj);
                break;
            case "onRcdVolume":
                //音量改变
                YaYaIM.onRcdVolume(obj);
                break;
            case "onRcdComplete":
                //录音完成                
                YaYaIM.onRcdComplete(obj);
                break;
            case "onNetState":
                YaYaIM.onNetState(obj);
                break;
            case "onAppStop":
                DeviceUtil.onAppStop();
                break;
            case "onAppResume":
                DeviceUtil.onAppResume();
                break;
            case "onClickBack":
                egret.log("点击返回键");
                NoticeManager.sendNoticeQuick(GameNotice.BACK);
                break;
            case "onGetWxCode":
                if (null != obj.code) {
                    NoticeManager.sendNoticeQuick(NativeNotice.GET_WX_CODE, obj.code);
                    MsgWin.show("微信code：" + obj.code);
                    // egret.log("微信code：" + obj.code);
                }
                else {
                    // RequestWaitWin.close();
                }
                break;
            case "onPayResp":
                // egret.log("微信app支付结果：" + obj.error);
                break;
            case "onApplePayResp":
                // if (DC.clientType == ClientType.WEBVIEW_IOS) {
                // 	DC.stage.frameRate = 30;
                // }
                // // MsgBox.show("苹果支付返回");
                // AppleUtil.onApplePayResp(obj);
                break;
        }
    };
    NativeExternal._ins = null;
    /**
     * 请求native的间隔
     */
    NativeExternal.CALL_NATIVE_INTERVAL = 200;
    /**
     * 原生层发送过来的消息列表
     */
    NativeExternal._msgListFromNative = [];
    return NativeExternal;
}());
__reflect(NativeExternal.prototype, "NativeExternal");
//# sourceMappingURL=NativeExternal.js.map
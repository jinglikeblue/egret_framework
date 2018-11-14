var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var YaYaIM = (function () {
    function YaYaIM() {
    }
    //是否支持丫丫语音
    YaYaIM.isSupport = function () {
        if (DC.startParams.clientType == ClientType.WEBVIEW_ANDROID || DC.startParams.clientType == ClientType.WEBVIEW_IOS) {
            return true;
        }
        return false;
    };
    //登录
    YaYaIM.login = function (uid) {
        if (this._logined) {
            return;
        }
        this._logined = true;
        var obj = {};
        obj.id = "login";
        obj.uid = uid;
        NativeExternal.ins().callNative(obj);
    };
    //开始录音
    YaYaIM.startRcd = function () {
        YaYaIM.isRecordingVoice = true;
        var obj = {};
        obj.id = "startRcd";
        NativeExternal.ins().callNative(obj);
    };
    //停止录音
    YaYaIM.stopRcd = function () {
        var obj = {};
        obj.id = "stopRcd";
        NativeExternal.ins().callNative(obj);
        YaYaIM.isRecordingVoice = false;
    };
    //播放录音
    YaYaIM.playRcd = function (rcdUrl) {
        if (rcdUrl == null) {
            return;
        }
        var obj = {};
        obj.id = "playRcd";
        obj.rcdUrl = rcdUrl;
        NativeExternal.ins().callNative(obj);
        YaYaIM.isPlayingRcd = true;
        AudioDevice.changeBgmVolume(0.1);
    };
    //停止播放录音
    YaYaIM.stopPlayRcd = function () {
        var obj = {};
        obj.id = "stopPlayRcd";
        NativeExternal.ins().callNative(obj);
        YaYaIM.isPlayingRcd = false;
    };
    //-------------------------------------回调部分-------------------------------
    //录音上传完成
    YaYaIM.onRcdUpload = function (obj) {
        YaYaIM.isUploadVoice = false;
        var rcdUrl = obj.rcdUrl;
        if (rcdUrl.indexOf(".amr") > -1) {
            egret.log("录音上传完成：" + obj.rcdUrl);
            NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_UPLOAD, rcdUrl);
        }
        else {
            egret.log("录音上传失败：" + obj.rcdUrl);
        }
    };
    //录音播放结束
    YaYaIM.onRcdPlayStop = function (obj) {
        //调回背景音量
        // AudioUtil.changeBgVolume(1);
        YaYaIM.isPlayingRcd = false;
        YaYaIM.isUploadVoice = true;
        egret.log("录音播放结束");
        NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_PLAY_STOP);
    };
    //登录结果
    YaYaIM.onLoginResult = function (obj) {
        egret.log("登录：" + obj.isSuccess ? "成功" : "失败");
        NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_LOGIN_RESULT);
    };
    //音量改变
    YaYaIM.onRcdVolume = function (obj) {
        egret.log("音量改变：" + obj.volume);
        NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_VOLUME, obj.volume);
    };
    //录音完成   
    YaYaIM.onRcdComplete = function (obj) {
        YaYaIM.isRecordingVoice = false;
        egret.log("\u5F55\u97F3\u5B8C\u6210 \u65F6\u957F:" + obj.time);
        YaYaIM.rcdTime = obj.time;
        NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_COMPLETE);
    };
    //网络状态
    YaYaIM.onNetState = function (obj) {
        egret.log("网络状态：" + obj.state);
        NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_NET_STATE);
    };
    YaYaIM._logined = false;
    //是否正在录音
    YaYaIM.isRecordingVoice = false;
    //是否正在上传录音
    YaYaIM.isUploadVoice = false;
    //是否正在播放录音
    YaYaIM.isPlayingRcd = false;
    //录音时间长度
    YaYaIM.rcdTime = 0;
    return YaYaIM;
}());
__reflect(YaYaIM.prototype, "YaYaIM");
//# sourceMappingURL=YaYaIM.js.map
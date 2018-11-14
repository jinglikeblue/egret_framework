class YaYaIM {
	private static _logined: boolean = false;

	//是否正在录音
	public static isRecordingVoice: boolean = false;

	//是否正在上传录音
	public static isUploadVoice: boolean = false;

	//是否正在播放录音
	public static isPlayingRcd: boolean = false;

	//录音时间长度
	public static rcdTime: number = 0;

	//是否支持丫丫语音
	public static isSupport(): boolean {
		if (DC.startParams.clientType == ClientType.WEBVIEW_ANDROID || DC.startParams.clientType == ClientType.WEBVIEW_IOS) {
			return true;
		}
		return false;
	}

	//登录
	public static login(uid: string) {
		if (this._logined) {
			return;
		}
		this._logined = true;
		var obj: any = {};
		obj.id = "login";
		obj.uid = uid;
		NativeExternal.ins().callNative(obj);
	}

	//开始录音
	public static startRcd() {
		YaYaIM.isRecordingVoice = true;
		var obj: any = {};
		obj.id = "startRcd";
		NativeExternal.ins().callNative(obj);
	}

	//停止录音
	public static stopRcd() {
		var obj: any = {};
		obj.id = "stopRcd";
		NativeExternal.ins().callNative(obj);

		YaYaIM.isRecordingVoice = false;
	}

	//播放录音
	public static playRcd(rcdUrl: string) {
		if (rcdUrl == null) {
			return;
		}
		var obj: any = {};
		obj.id = "playRcd";
		obj.rcdUrl = rcdUrl;
		NativeExternal.ins().callNative(obj);

		YaYaIM.isPlayingRcd = true;
		AudioDevice.changeBgmVolume(0.1);
	}

	//停止播放录音
	public static stopPlayRcd() {
		var obj: any = {};
		obj.id = "stopPlayRcd";
		NativeExternal.ins().callNative(obj);

		YaYaIM.isPlayingRcd = false;
	}

	//-------------------------------------回调部分-------------------------------

	//录音上传完成
	public static onRcdUpload(obj: any) {
		YaYaIM.isUploadVoice = false;
		let rcdUrl: string = obj.rcdUrl;
		if (rcdUrl.indexOf(".amr") > -1) {
			egret.log("录音上传完成：" + obj.rcdUrl);
			NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_UPLOAD, rcdUrl);
		}
		else {
			egret.log("录音上传失败：" + obj.rcdUrl);
		}
	}

	//录音播放结束
	public static onRcdPlayStop(obj: any) {
		//调回背景音量
		// AudioUtil.changeBgVolume(1);
		YaYaIM.isPlayingRcd = false;
		YaYaIM.isUploadVoice = true;
		egret.log("录音播放结束");
		NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_PLAY_STOP);
	}

	//登录结果
	public static onLoginResult(obj: any) {
		egret.log("登录：" + obj.isSuccess ? "成功" : "失败");
		NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_LOGIN_RESULT);
	}

	//音量改变
	public static onRcdVolume(obj: any) {
		egret.log("音量改变：" + obj.volume);
		NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_VOLUME, obj.volume);
	}

	//录音完成   
	public static onRcdComplete(obj: any) {
		YaYaIM.isRecordingVoice = false;
		egret.log(`录音完成 时长:${obj.time}`);
		YaYaIM.rcdTime = obj.time;
		NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_RCD_COMPLETE);
	}

	//网络状态
	public static onNetState(obj: any) {
		egret.log("网络状态：" + obj.state);
		NoticeManager.sendNoticeQuick(YaYaIMNotice.ON_NET_STATE);
	}
}
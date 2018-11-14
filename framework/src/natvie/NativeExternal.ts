class NativeExternal {

	public static _ins: NativeExternal = null;
	public static ins(): NativeExternal {
		if (null == this._ins) {
			this._ins = new NativeExternal();
		}
		return this._ins;
	}

	/**
	 * 请求native的间隔
	 */
	public static CALL_NATIVE_INTERVAL: number = 200;

	/**
	 * 原生层发送过来的消息列表
	 */
	private static _msgListFromNative: string[] = [];

	public static addMsgFromNative(msg: string): void {
		this._msgListFromNative.push(msg);
	}

	public constructor() {
		// egret.ExternalInterface.addCallback("native2egret", this.onNativeCall);
	}

	public startCacheWebviewMsgs(): void {
		//使用egret.setInterval会在页面最小化后不再出发
		setInterval(this.getNativeMsgs.bind(this), NativeExternal.CALL_NATIVE_INTERVAL);
	}

	public send(data: any): void {
		if (null == data) {
			data = {};
		}
		let msg = JSON.stringify(data);
		egret.ExternalInterface.call("egret2native", msg);
	}

	// private onNativeCall(msg: string): void {
	// 	console.log("message form native : " + msg);
	// 	// StackTip.alert("message form native : " + msg);
	// }

	/**
	 * 以webview方式运行时可以调用该方法
	 */
	public callNative(data: any): string {
		if (egret.RuntimeType.WEB != egret.Capabilities.runtimeType) {
			return null;
		}

		let res: string = null;
		switch (DC.startParams.clientType) {
			case ClientType.WEBVIEW_ANDROID:
				res = this.callWebViewAndroid(data);
				break;
			case ClientType.WEBVIEW_IOS:
				res = this.callWebViewIOS(data);
				break;
		}
		return res;
	}

	private callWebViewAndroid(data: any): string {
		if (null == window['callAndroidNative']) {
			return null;
		}

		let msg = JSON.stringify(data);
		egret.log("请求native: " + msg);
		let res = window['callAndroidNative'](msg);
		if (res == 0) {
			//成功
		}
		else {
			//错误
		}
		return res;
	}

	private callWebViewIOS(data: any): string {
		if (null == window['callIosNative']) {
			return null;
		}

		let msg = JSON.stringify(data);
		let res = window['callIosNative'](msg);
		return null;
	}

	private getNativeMsgs(): void {
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
	}

	private getWebViewAndroidMsgs(): void {
		if (null == window['getNativeMsgs']) {
			return;
		}

		let msg = window['getNativeMsgs']();
		if (msg != null && msg != "") {
			var jobj = JSON.parse(msg);
			for (var i = 0; i < jobj.length; i++) {
				let msgFromNative = jobj[i];
				egret.log("egret收到native协议: " + msgFromNative);
				this.parseNativeMsg(JSON.parse(msgFromNative));
			}
		}
	}

	private getWebViewIOSMsgs(): void {
		let msgs = NativeExternal._msgListFromNative;
		for (let i = 0; i < msgs.length; i++) {
			let msg = msgs[i];
			egret.log("egret收到native协议: " + msg);
			this.parseNativeMsg(JSON.parse(msg));
		}
		NativeExternal._msgListFromNative.length = 0;
	}

	private parseNativeMsg(obj: any) {
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
	}
}
class WXJsSdk {

	private static _ins: WXJsSdk;
	public static ins(): WXJsSdk {
		return this._ins;
	}

	public constructor() {

	}

	/**
	 * 初始化微信JS-SDK
	 */
	public init(debug: boolean, appId: string, timestamp: string, nonceStr: string, signature: string, jsApiList: string[] = null): void {
		Extension.registerFun("onWXReady", this.onWXReady, this);
		Extension.registerFun("onWXError", this.onWXError, this);
		Extension.registerFun("onWXShareSuccess", this.onWXShareSuccess, this);
		Extension.registerFun("onWXShareCancel", this.onWXShareCancel, this);
		Extension.registerFun("onChooseWXPaySuccess", this.onChooseWXPaySuccess, this);

		var cfg: any = {};
		cfg.debug = debug;
		cfg.appId = appId
		cfg.timestamp = timestamp
		cfg.nonceStr = nonceStr
		cfg.signature = signature
		cfg.jsApiList = jsApiList;
		if (null == jsApiList) {
			cfg.jsApiList = [
				'onMenuShareTimeline',	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
				'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone',
				'chooseImage',          //拍照或从手机相册中选图接口
				'chooseWXPay'			//
			]
		};
		Extension.callJS(`registerWX`, cfg);
	}

	public onWXReady() {
		this.updateShareMsg(DC.setting.wxShareIconUrl, DC.setting.wxShareLinkUrl, `分享标题`, `分享内容`);
	}

	public onWXError() {
		// MsgBox.show("微信授权失败！部分功能受限！");
	}

	public onWXShareSuccess() {
		// MsgBox.show("分享成功");
	}

	public onWXShareCancel() {
		//MsgBox.show("分享取消");
	}

	public onChooseWXPaySuccess(res) {

	}

	public updateShareMsg(iconUrl: string, linkUrl: string, title: string, desc: string, ): void {
		Extension.callJS(`initShareMsg`, iconUrl, linkUrl, title, desc);
	}
}
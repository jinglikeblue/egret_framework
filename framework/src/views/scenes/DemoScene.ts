class DemoScene extends eui.Component implements IView {

	public btnClick: eui.Button;
	public btnAudio: eui.Button;
	public btnWX: eui.Button;
	public btnRecord: eui.Button;
	public btnRequest: eui.Button;
	public btnWS: eui.Button;

	public constructor() {
		super();
		this.skinName = DemoSceneSkin;
	}

	/**
	 * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
	 */
	public onInit(data: any): void {

	}

	/**
	 * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
	 */
	public onShow(data: any): void {
		this.btnClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
		this.btnAudio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAudioTouchTap, this);
		this.btnWX.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
		this.btnWS.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
		this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnRecordTouchBegin, this);
		this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnRecordTouchEnd, this);
		this.btnRequest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);

		MsgWin.show("你好这是DEMO", new CallbackModel(function (): void {
			MsgWin.show("再次点击关闭");
		}, this));

		AudioDevice.playBGM("bg_mp3");

		NoticeManager.addNoticeAction(YaYaIMNotice.ON_RCD_UPLOAD, this.onRcdUploadNotice, this);

		YaYaIM.login(new Date().getTime().toString());
	}

	/**
	 * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
	 */
	public onDispose(): void {
		this.btnClick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
		this.btnAudio.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAudioTouchTap, this);
		this.btnWX.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
		this.btnWS.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);
		this.btnRecord.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnRecordTouchBegin, this);
		this.btnRecord.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnRecordTouchEnd, this);
		this.btnRequest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchTap, this);

		NoticeManager.removeNoticeAction(YaYaIMNotice.ON_RCD_UPLOAD, this.onRcdUploadNotice, this);
	}

	private onBtnClickTouchTap(e: egret.TouchEvent): void {
		GWindowMgr.open(WindowName.DEMO);
	}

	private onBtnAudioTouchTap(e: egret.TouchEvent): void {
		AudioDevice.playEffect("chat_mp3");
	}

	private onButtonTouchTap(e: egret.TouchEvent): void {
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
	}

	private onBtnRecordTouchBegin(e: egret.TouchEvent): void {
		DeviceUtil.startRcd();
	}

	private onBtnRecordTouchEnd(e: egret.TouchEvent): void {
		DeviceUtil.stopRcd();
	}

	private onRcdUploadNotice(n: YaYaIMNotice): void {
		let rcdUrl: string = n.data;
		YaYaIM.playRcd(rcdUrl);
	}
}
class MsgWin extends eui.Component implements IView {

	public static show(str: string, callback: CallbackModel = null): void {
		let vo = new MsgWinVO(str, callback);
		WindowMgr.open(WindowName.MSG_BOX, vo);
	}

	private vo: any;

	private btnOK: eui.Button;
	private lbMsg: eui.Label;
	public constructor() {
		super();
		this.skinName = MsgWinSkin;
	}

	/**
	 * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
	 */
	public onInit(data: any): void {
		this.vo = data;
	}

	/**
	 * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
	 */
	public onShow(data: any): void {
		this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		this.horizontalCenter = 0;
		this.verticalCenter = 0;
		this.lbMsg.text = this.vo.msg;
	}

	/**
	 * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
	 */
	public onDispose(): void {
		this.btnOK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private onTouchTap(e: egret.TouchEvent): void {
		WindowMgr.close(this);
		if (this.vo.callback != null) {
			this.vo.callback.doCallback();
		}
	}
}
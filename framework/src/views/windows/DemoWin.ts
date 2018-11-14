class DemoWin extends eui.Component implements IView {

	public btnClose: eui.Button;



	public constructor() {
		super();
		this.skinName = DemoWinSkin;
		this.horizontalCenter = 0;
		this.verticalCenter = 0;
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
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
	}

	/**
	 * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
	 */
	public onDispose(): void {
		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickTouchTap, this);
	}

	private onBtnClickTouchTap(e: egret.TouchEvent): void {
		GWindowMgr.close(this);
	}
}
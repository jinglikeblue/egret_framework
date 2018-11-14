class WaitWin extends eui.Component implements IView {
	private static _ins: IView;
	public static show(maxTime: number = -1): void {
		if (this._ins != null) {
			this.close();
		}
		this._ins = WindowMgr.open(WindowName.WAIT, maxTime);
	}

	public static close(): void {
		if (this._ins != null) {
			WindowMgr.close(this._ins);
			this._ins = null;
		}
	}

	//窗口在到达极限时间时关闭
	private _maxTime: number = 0;
	private _delayId: number = -1;

	public constructor() {
		super();
		this.skinName = WaitWinSkin;
	}

	/**
	 * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
	 */
	public onInit(data: any): void {
		this._maxTime = data;
	}

	/**
	 * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
	 */
	public onShow(data: any): void {
		this.horizontalCenter = 0;
		this.verticalCenter = 0;

		if (this._maxTime > -1) {
			this._delayId = DelayCaller.create(this._maxTime, this.onTimeOver, this);
		}
	}

	/**
	 * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
	 */
	public onDispose(): void {
		if (this._delayId > -1) {
			DelayCaller.dispose(this._delayId);
			this._delayId = -1;
		}
	}

	private onTimeOver(): void {
		this._delayId = -1;
		WaitWin.close();
	}
}

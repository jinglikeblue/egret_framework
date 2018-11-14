class HistoryRecord extends egret.EventDispatcher {

	private _isStart: boolean = false;

	public constructor() {
		super();
	}

	public start(): void {
		if (this._isStart) {
			return;
		}
		this._isStart = true;
		window.addEventListener("popstate", this.onPopState.bind(this), false);
	}

	public close(): void {
		if (false == this._isStart) {
			return;
		}
		this._isStart = false;
		window.removeEventListener("popstate", this.onPopState.bind(this), false);
	}

	/**
	 * 将当前页面加入到浏览器历史记录中
	 */
	public addHistory(url: string = "", data: any = null): void {
		window.history.pushState(data, "", url);
	}

	/**
	 * 替换浏览器中当前页面的历史记录信息
	 */
	public replaceHistory(url: string = "", data: any = null): void {
		window.history.replaceState(data, "", url);
	}

	private onPopState(e: PopStateEvent): void {
		let data: any = e.state;
		this.dispatchEvent(new HistoryRecordEvent(HistoryRecordEvent.POP_STATE, data));
	}
}
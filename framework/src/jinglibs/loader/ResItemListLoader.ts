class ResItemListLoader extends egret.EventDispatcher {

	private _resKeys: string[];
	private _idx2Load: number;

	public data: any;

	private _lastLoaded: any;
	public getLastLoaded(): any {
		return this._lastLoaded;
	}
	public constructor() {
		super();
	}

	public load(resKeys: string[]): void {
		if (this._resKeys != null) {
			throw new Error("暂不支持加载器重复使用");
		}

		this._resKeys = resKeys;
		this._idx2Load = 0;
		this.loadItem();
	}

	private loadItem(): void {
		if (this._idx2Load == this._resKeys.length) {
			this.allOver();
			return;
		}
		let key2Load = this._resKeys[this._idx2Load++];

		//只加载存在且没有加载的资源
		let res = RES.getRes(key2Load);
		if (RES.hasRes(key2Load) && null == res) {
			RES.getResAsync(key2Load, this.onResLoaded, this);
		}
		else {
			this.onResLoaded(res, key2Load);
		}
	}

	/**
	 * 资源已加载到内存
	 */
	private onResLoaded(data: any, key: string): void {
		this._lastLoaded = data;
		this.dispatchEvent(new egret.ProgressEvent(egret.ProgressEvent.PROGRESS, false, false, this._idx2Load, this._resKeys.length));
		this.loadItem();
	}

	private allOver(): void {
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}
}
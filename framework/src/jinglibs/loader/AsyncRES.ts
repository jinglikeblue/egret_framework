class AsyncRES {
	private _resWatchers: Object = {};

	public constructor() {
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResResourceProgress, this);
	}

	private onResResourceProgress(e: RES.ResourceEvent): void {
		let loadedItem = e.resItem;
		this.onResItemLoaded(loadedItem, loadedItem.name);
	}

	/**
	 * 快速获取资源，如果资源存在则返回，如果不存在，则在后台加载并返回null
	 */
	public quickGet(resName: string): any {
		let res = RES.getRes(resName);
		if (null == res && RES.hasRes(resName)) {
			RES.getResAsync(resName, function (): void { }, this);
		}
		return res;
	}

	/**
	 * 需要某个资源
	 */
	public need(resName: string, callback: Function, thisObj: any, params: any = null): void {

		if (false == RES.hasRes(resName)) {
			throw new Error(`需要的资源${resName}并不存在`);
		}

		let item = RES.getRes(resName);
		if (item != null) {
			//资源已有，直接返回
			this.itemCallback(resName, item, callback, thisObj, params);
		}
		else {
			if (false == this.checkIsWatch(resName, callback, thisObj)) {
				let watchers = this._resWatchers[resName] as CallbackModel[];
				if (null == watchers) {
					watchers = [];
					this._resWatchers[resName] = watchers;
				}
				watchers.push(new CallbackModel(callback, thisObj, params));
				RES.getResAsync(resName, this.onResItemLoaded, this);
			}
		}
	}

	private checkIsWatch(resName: string, callback: Function, thisObj: any): boolean {
		let watchers = this._resWatchers[resName] as CallbackModel[];
		if (null == watchers) {
			return false;
		}

		for (let watcher of watchers) {
			if (watcher.getCallback() == callback && watcher.getThisObj() == thisObj) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 不再需要某个资源
	 */
	public needless(resName: string, callback: Function, thisObj: any): void {
		let watchers = this._resWatchers[resName] as CallbackModel[];
		if (null != watchers) {
			for (let i = watchers.length - 1; i >= 0; i--) {
				let watcher = watchers[i];
				if (watcher.getCallback() == callback && watcher.getThisObj() == thisObj) {
					watchers.splice(i, 1);
					break;
				}
			}
		}
	}

	private onResItemLoaded(resItem: any, resName: string): void {
		let watchers = this._resWatchers[resName] as CallbackModel[];
		if (watchers == null) {
			return;
		}
		for (let watcher of watchers) {
			this.itemCallback(resName, resItem, watcher.getCallback(), watcher.getThisObj(), watcher.getParams());
		}
		this._resWatchers[resName] = null;
		delete this._resWatchers[resName];
	}

	private itemCallback(resName: string, resItem: any, callback: Function, thisObj: any, params: any): void {
		if (null != callback) {
			callback.call(thisObj, resName, resItem, params);
		}
	}
}
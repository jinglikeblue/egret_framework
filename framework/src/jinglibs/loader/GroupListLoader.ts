/**
 * 资源组列表加载器
 * 优点：多线程，最快的速度加载完需要资源
 * 缺点：不适合后台加载资源使用，会占用所有的加载线程
 */
class GroupListLoader extends egret.EventDispatcher {
	//资源组列表的名称
	private _arrGroupName: string[];
	//已加载的资源组数量
	private _loadedGroupsCount: number = 0;
	public get loadedGroupsCount(): number {
		return this._loadedGroupsCount;
	}

	//要加载的资源组总数
	public get totalGroupsCount(): number {
		return this._arrGroupName.length;
	}

	//已加载的资源数
	private _loadedItemsCount: number = 0;
	public get loadedItemsCount(): number {
		return this._loadedItemsCount;
	}
	//要加载的资源总数
	private _totalItemsCount: number = 0;
	public get totalItemsCount(): number {
		return this._totalItemsCount;
	}

	public constructor() {
		super();
	}

	public dispose(): void {
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResGroupComplete, this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResGroupLoadError, this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResResourceProgress, this);
		RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResItemLoadError, this);
	}

	public load(grpNames: string[]): void {
		if (this._arrGroupName != null) {
			throw new Error("暂不支持加载器重复使用");
		}
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResGroupComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResGroupLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResItemLoadError, this);
		this.start(grpNames);
	}

	private start(grpNames: string[]) {
		this._arrGroupName = [];
		for (let groupName of grpNames) {
			let items = RES.getGroupByName(groupName);
			if (null == items || 0 == items.length) {
				egret.log(`加载的资源组[${groupName}]没有可用资源,将不被加载`);
			}
			else {
				this._arrGroupName.push(groupName);
				this._totalItemsCount += items.length;
			}
		}
		this.loadNextGroup();
	}

	private loadNextGroup() {
		if (this._loadedGroupsCount == this._arrGroupName.length) {
			//load all over
			this.allOver();
			return;
		}

		RES.loadGroup(this._arrGroupName[this._loadedGroupsCount]);
	}

	private allOver() {
		// console.log(`所有资源组加载完毕`);
		this.dispose();
		this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.COMPLETE));
	}

	private onResGroupComplete(e: RES.ResourceEvent): void {
		if (this._arrGroupName.indexOf(e.groupName) == -1) {
			return;
		}
		console.log(`资源组[${e.groupName}](${this._totalItemsCount})加载完毕`);
		this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.GROUP_LOADED, e.groupName));
		this._loadedGroupsCount++;
		this.loadNextGroup();
	}

	private onResGroupLoadError(e: RES.ResourceEvent): void {
		if (this._arrGroupName.indexOf(e.groupName) == -1) {
			return;
		}
		console.log(`资源组[${e.groupName}]加载出错！`);
		this._loadedGroupsCount++;
		this.loadNextGroup();
	}

	private onResResourceProgress(e: RES.ResourceEvent): void {
		let loadedItem = e.resItem;
		if (loadedItem && this._arrGroupName.indexOf(loadedItem.groupName) == -1) {
			return;
		}
		this._loadedItemsCount++;
		// console.log(this._loadedItemsCount + "/" + this._totalItemsCount);
		this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.ITEM_LOADED, loadedItem.groupName, loadedItem.data));
	}

	private onResItemLoadError(e: RES.ResourceEvent): void {
		console.log(`资源项[${e.resItem.name} in ${e.resItem.groupName}]加载出错！`);
	}
}
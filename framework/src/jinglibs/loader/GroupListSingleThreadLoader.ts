/**
 * 单个线程的资源组加载器
 * 优点：单线程，适合在后台静默加载资源，不会占用所有的加载线程
 * 缺点：因为是单线程队列加载，所有资源加载完的时间会相对慢一些
 */
class GroupListSingleThreadLoader extends egret.EventDispatcher {

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

	private dispose(): void {

	}

	public load(grpNames: string[]): void {
		if (this._arrGroupName != null) {
			throw new Error("暂不支持加载器重复使用");
		}

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
			this.allOver();
			return;
		}

		let groupName = this._arrGroupName[this._loadedGroupsCount++];
		let items = RES.getGroupByName(groupName);
		let resKeys: string[] = [];
		for (let i = 0; i < items.length; i++) {
			resKeys.push(items[i].name);
		}
		let resListLoader = new ResItemListLoader();
		resListLoader.data = groupName;
		resListLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onResListLoaderProgress, this);
		resListLoader.addEventListener(egret.Event.COMPLETE, this.onResListLoaderComplete, this);
		resListLoader.load(resKeys);
	}

	private onResListLoaderProgress(e: egret.ProgressEvent): void {
		let resListLoader: ResItemListLoader = e.currentTarget;
		this._loadedItemsCount++;
		// console.log(this._loadedItemsCount + "/" + this._totalItemsCount);
		this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.ITEM_LOADED, resListLoader.data, resListLoader.getLastLoaded()));
	}

	private onResListLoaderComplete(e: egret.Event): void {
		let resListLoader: ResItemListLoader = e.currentTarget;
		resListLoader.removeEventListener(egret.ProgressEvent.PROGRESS, this.onResListLoaderProgress, this);
		resListLoader.removeEventListener(egret.Event.COMPLETE, this.onResListLoaderComplete, this);

		console.log(`资源组[${resListLoader.data}]加载完毕`);
		this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.GROUP_LOADED, resListLoader.data));

		this.loadNextGroup();
	}

	private allOver() {
		console.log(`所有资源组加载完毕`);
		this.dispose();
		this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.COMPLETE));
	}
}
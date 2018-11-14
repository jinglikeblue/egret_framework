class LoadScene extends eui.Component implements IView {

	private _vo: SceneLoadingVO;
	private _gll: GroupListLoader;

	private _bar: eui.Image;
	private lbProgress: eui.Label;

	public constructor() {
		super();
		this.skinName = LoadSceneSkin;
	}

	/**
	 * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
	 */
	public onInit(data: any): void {
		this._vo = data;
	}

	/**
	 * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
	 */
	public onShow(data: any): void {
		this.clearGLL();
		let gll = new GroupListLoader();
		gll.addEventListener(GroupListLoaderEvent.COMPLETE, this.onGroupListLoaderComplete, this);
		gll.addEventListener(GroupListLoaderEvent.ITEM_LOADED, this.onGroupListLoaderItemLoaded, this);
		gll.load(this._vo.groups);
		this._gll = gll;
	}

	/**
	 * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
	 */
	public onDispose(): void {
		this.clearGLL();
	}

	private setProgress(current: number, total: number): void {
		this._bar.scrollRect = new egret.Rectangle(0, 0, this._bar.width * current / total, this._bar.height);
		this.lbProgress.text = ((current / total * 100) >> 0) + '%';
	}


	private clearGLL(): void {
		if (this._gll) {
			this._gll.removeEventListener(GroupListLoaderEvent.COMPLETE, this.onGroupListLoaderComplete, this);
			this._gll.removeEventListener(GroupListLoaderEvent.ITEM_LOADED, this.onGroupListLoaderItemLoaded, this);
			this._gll = null;
		}
	}

	/**
	 * preload资源组加载完成
	 * preload resource group is loaded
	 */
	private onGroupListLoaderComplete(e: GroupListLoaderEvent): void {
		let gll = e.currentTarget as GroupListLoader;
		gll.removeEventListener(GroupListLoaderEvent.COMPLETE, this.onGroupListLoaderComplete, this);
		gll.removeEventListener(GroupListLoaderEvent.ITEM_LOADED, this.onGroupListLoaderItemLoaded, this);
		//资源准备好了，打开界面
		SceneMgr.change(this._vo.toSceneName, this._vo.data);
	}

	/**
	 * preload资源组加载进度
	 * loading process of preload resource
	 */
	private onGroupListLoaderItemLoaded(e: GroupListLoaderEvent): void {
		let gll = e.currentTarget as GroupListLoader;
		this.setProgress(gll.loadedItemsCount, gll.totalItemsCount);
	}
}
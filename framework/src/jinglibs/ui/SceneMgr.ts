/**
 * 场景管理器
 */
class SceneMgr {
	//舞台	 
	private static _stage: egret.DisplayObjectContainer;
	//当前视图对象
	private static _nowView: IView = null;
	//当前视图名称
	private static _nowViewName: string = null;

	public static nowViewName(): string {
		return this._nowViewName;
	}
	//视图映射
	private static _viewClsMap: any = {};
	/**
	 * 最近打开的场景名称的存储。
	 * 最后进入的场景总是放到数组最前端
	 * 只保留最近10次的场景信息
	 */
	private static _recentScenes: string[] = [];

	/**
	 * 初始化场景管理器(必须)
	 */
	public static init(stage: egret.DisplayObjectContainer): void {
		this._stage = stage;
	}

	/**
	 * 注册一个场景
	 */
	public static regist(viewName: string, cls: any): void {
		this._viewClsMap[viewName] = cls;
	}

	/**
	 * 切换场景
	 * @param viewName 切换的场景的名称
	 * @param data 传递到场景的数据
	 */
	public static change(viewName: string, data: any = null): void {
		let cls = this._viewClsMap[viewName];
		if (null == cls) {
			egret.error(`切换的场景[${viewName}]不存在`);
			return;
		}

		if (this._nowViewName != null) {
			//将当前界面存入到面包屑中
			this.recordCrumb(this._nowViewName);
		}

		this.switchScene(viewName, data);
	}

	/**
	 * 回到上一次的场景
	 */
	public static revert(data: any = null): void {
		let viewName = this._recentScenes.shift();
		this.switchScene(viewName, data);
	}

	private static switchScene(viewName: string, data: any = null): void {
		let cls = this._viewClsMap[viewName];
		if (this._nowView != null) {
			this._nowView.onDispose();
			let t = (<any>this._nowView);
			this._stage.removeChild(<any>this._nowView);
		}

		let newView: IView = new cls();
		newView.onInit(data);
		this._stage.addChildAt(<any>newView, 0);
		this._nowView = newView;
		this._nowViewName = viewName;
		newView.onShow(data);
	}

	/**
 	 * 记录场景轨迹
 	 */
	private static recordCrumb(viewName: string): void {
		if (this._recentScenes.length > 0 && this._recentScenes[0] == viewName) {
			//之前刚插入的场景不再重复插入
			return;
		}
		this._recentScenes.unshift(viewName);
		if (this._recentScenes.length > 20) {
			this._recentScenes.length = 10;
		}
	}
}
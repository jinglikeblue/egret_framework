class GWindowMgr {
	//资源组依赖表
	private static _dependGroupList: any = {};

	/**
	 * 初始化场景管理器(必须)
	 */
	public static init(stage: egret.DisplayObjectContainer): void {
		WindowMgr.init(stage);
	}

	/**
	 * 注册一个场景
	 */
	public static regist(viewName: string, cls: any, dependGroupList: string[]): void {
		WindowMgr.regist(viewName, cls);
		this._dependGroupList[viewName] = dependGroupList;
	}

	/**
	 * 使用预加载方式打开窗口
	 * @param viewName 打开窗口的名称
	 * @param data 传递到打开窗口的数据。默认为null
	 * @param blur 是否在窗口下显示遮罩。该值只确定是否在窗口下可视的显示遮罩。并不影响触摸事件的向下传递。默认为true
	 * @param closeOthers 是否在打开窗口同时关闭其它所有已打开的窗口。默认为false
	 * @returns 返回打开窗口的实例化对象
	 */
	public static open(viewName: string, data: any = null, blur: boolean = true, closeOthers: boolean = false): void {
		//检查依赖的资源
		let groups: string[] = this._dependGroupList[viewName];

		if (null == groups || groups.length == 0) {
			//直接加载
			WindowMgr.open(viewName, data, blur, closeOthers);
			return;
		}

		let vo = new WindowLoadingVO();
		vo.winName = viewName;
		vo.data = data;
		vo.blur = blur;
		vo.closeOther = closeOthers;
		vo.groups = groups;
		WindowMgr.open(WindowName.LOADING, vo);
	}

	/**
	 * 关闭对应的窗口
	 * @param target 要关闭的对象
	 */
	public static close(target: IView): void {
		WindowMgr.close(target);
	}

	/**
	 * 关闭所有窗口
	 */
	public static closeAll(): void {
		WindowMgr.closeAll();
	}
}
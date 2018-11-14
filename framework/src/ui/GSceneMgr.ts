class GSceneMgr {

	//资源组依赖表
	private static _dependGroupList: any = {};

	/**
	 * 初始化场景管理器(必须)
	 */
	public static init(stage: egret.DisplayObjectContainer): void {
		SceneMgr.init(stage);
	}

	/**
	 * 注册一个场景
	 */
	public static regist(viewName: string, cls: any, dependGroupList: string[]): void {
		SceneMgr.regist(viewName, cls);
		this._dependGroupList[viewName] = dependGroupList;
	}

	/**
	 * 切换场景
	 * @param viewName 切换的场景的名称
	 * @param data 传递到场景的数据
	 */
	public static change(viewName: string, data: any = null): void {
		//检查依赖的资源
		let groups: string[] = this._dependGroupList[viewName];
		if (null == groups || 0 == groups.length) {
			//并没有依赖的资源，直接切换
			SceneMgr.change(viewName, data);
			return;
		}

		let vo = new SceneLoadingVO();
		vo.fromSceneName = SceneMgr.nowViewName();
		vo.toSceneName = viewName;
		vo.data = data;
		vo.groups = groups;
		SceneMgr.change(SceneName.LOADING, vo);
	}
}
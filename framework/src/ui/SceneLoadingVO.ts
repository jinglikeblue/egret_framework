class SceneLoadingVO {
	//切换的初始场景
	public fromSceneName: string;
	//切换的目标场景
	public toSceneName: string;
	//切换场景携带的参数
	public data: any;
	//依赖的资源组
	public groups: string[];
}
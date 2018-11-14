class GroupListLoaderEvent extends egret.Event {
	private _grpName: string;
	public get grpName(): string {
		return this._grpName;
	}

	private _res: RES.ResourceItem;
	public get res(): any {
		return this._res;
	}

	public constructor(type: string, grpName: string = null, res: any = null) {
		super(type);
		this._grpName = grpName;
		this._res = res;
	}

	/**
	 * 加载完一个资源组
	 */
	public static GROUP_LOADED: string = "GROUP_LOADED";

	/**
	 * 加载完一个资源
	 */
	public static ITEM_LOADED: string = "ITEM_LOADED";

}
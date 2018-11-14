class HistoryRecordEvent extends egret.Event {
	private _type: string;

	public get type(): string {
		return this._type;
	}

	private _data: any;

	public get data(): string {
		return this._data;
	}

	public constructor(type: string, data: any) {
		super(type);
		this._type = type;
		this._data = data;
	}

	/**
	 * 浏览器历史跳转事件
	 */
	public static POP_STATE: string = "POP_STATE";
}
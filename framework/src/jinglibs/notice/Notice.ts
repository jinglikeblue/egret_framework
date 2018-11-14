class Notice {
	private _type: string;

	/**
	 * 通知的类型
	 */
	public get type(): string {
		return this._type;
	}

	private _data: any;

	/**
	 * 通知的数据
	 */
	public get data(): any {
		return this._data;
	}

	public constructor(type: string, data: any = null) {
		this._type = type;
		this._data = data;
	}

	public static WINDOW_BLUR_TOUCHED: string = "Notice::WINDOW_BLUR_TOUCHED";
}

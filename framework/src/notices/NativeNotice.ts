class NativeNotice extends Notice {
	public constructor(type: string, data: any = null) {
		super(type, data);
	}

	/**
	 * 获取到微信的code
	 */
	public static GET_WX_CODE: string = "NativeNotice::GET_WX_CODE";
}
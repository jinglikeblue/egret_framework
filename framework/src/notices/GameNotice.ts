class GameNotice extends Notice {
	public constructor(type: string, data: any = null) {
		super(type, data);
	}

	//预加载完成
	public static PRELOAD_OVER: string = "GameNotice::PRELOAD_OVER";

	/**
	 * 游戏中的返回
	 */
	public static BACK: string = "GameNotice::BACK";
}
/**
 * 数据中心
 */
class DC {

	/**
	 * 代码版本号
	 */
	public static CODE_VER: string = "ver: 1.0";

	/**
	 * 启动参数
	 */
	public static startParams: StartParamsVO = new StartParamsVO();

	/**
	 * 游戏舞台
	 */
	public static stage: egret.Stage = null;

	/**
	 * 游戏显示列表根
	 */
	public static root: eui.UILayer = null;

	/**
	 * 游戏启动时的utc
	 */
	public static gameStartUTC: number;

	/**
	 * 配置文件
	 */
	public static setting: SettingVO;
}
/**
 * 游戏套接字事件的处理
 */
class GameSocketEvent extends egret.Event {
	private _data: any = null;

	/**
	 * 事件携带的数据
	 */
	public get data(): void {
		return this._data;
	}

	public constructor(type: string, data: any = null) {
		super(type);
		this._data = data;
	}

	/**
	 * 连接成功
	 */
	public static CONNECT_SUCCESS: string = "CONNECT_SUCCESS";

	/**
	 * 连接失败
	 */
	public static CONNECT_FAIL: string = "CONNECT_FAIL";

	/**
	 * 连接断开
	 */
	public static CLOSED: string = "CLOSED";

	/**
	 * 接收到协议
	 */
	public static PROTO: string = "PROTO";
}
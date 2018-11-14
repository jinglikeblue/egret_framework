class DelayCaller {
	/**
	 * 延迟呼叫器编号
	 */
	private static _idx: number = 1;

	/**
	 * 延迟呼叫器表
	 */
	private static _map: any = {};

	/**
	 * 创建一个延迟呼叫器
	 * @param delay 延迟的毫秒值，必须大于0
	 */
	public static create(delay: number, callback: Function, thisObj: any, data: any = null): number {
		if (delay <= 0) {
			return;
		}

		let vo = new DelayCallerParamVO();
		vo.callback = callback;
		vo.thisObj = thisObj;
		vo.data = data;

		let id = this._idx++;
		let dc = new DelayCaller(id, delay, vo);
		this._map[id] = dc;
		return id;
	}

	/**
	 * 在指定延迟呼叫器上增加一个回调
	 */
	public static add(id: number, callback: Function, thisObj: any, data: any = null): void {
		let dc = this._map[id] as DelayCaller;
		if (dc != null) {
			let vo = new DelayCallerParamVO();
			vo.callback = callback;
			vo.thisObj = thisObj;
			vo.data = data;
			dc.add(vo);
		}
	}

	/**
	 * 销毁一个延迟呼叫器
	 */
	public static dispose(id: number): void {
		let dc = this._map[id] as DelayCaller;
		if (dc != null) {
			dc.dispose();
			this._map[id] = null;
			delete this._map[id];
		}
	}

	/**
	 * 呼叫器编号
	 */
	private _id: number;

	/**
	 * 回调信息数组
	 */
	private _params: DelayCallerParamVO[];

	/**
	 * 延迟计时器
	 */
	private _timer: egret.Timer;

	private constructor(id: number, delay: number, vo: DelayCallerParamVO) {
		this._id = id;
		this._params = [vo];
		this.start(delay);
	}

	/**
	 * 启动延迟回调，单位毫秒后回调
	 */
	private start(delay: number): void {
		if (this._timer != null) {
			return;
		}

		let timer = new egret.Timer(delay, 1);
		timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		timer.start();
		this._timer = timer;
	}

	/**
	 * 添加回调
	 */
	private add(vo: DelayCallerParamVO) {
		if (this._params != null) {
			this._params.push(vo);
		}
	}

	private onTimer(e: egret.TimerEvent): void {

		while (this._params && this._params.length > 0) {
			let vo = this._params.shift();
			vo.callback.call(vo.thisObj, vo.data);
		}

		//回调完毕，请求销毁自己
		DelayCaller.dispose(this._id);
	}

	/**
	 * 销毁该延迟回调对象
	 */
	private dispose(): void {
		if (null != this._timer) {
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._timer = null;
		}
		this._params = null;
	}
}
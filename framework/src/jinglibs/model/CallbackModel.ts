/**
 * 对回调方式的封装模型
 * 目标对象通过调用doCallback方法，回调对象方法
 */
class CallbackModel {

	/**
	 * 回调函数
	 */
	private _callback: Function;
	public getCallback(): Function {
		return this._callback;
	}

	/**
	 * 目标对象
	 */
	private _thisObj: any;
	public getThisObj(): any {
		return this._thisObj;
	}

	/**
	 * 回调携带的参数
	 */
	private _params: any;
	public getParams(): any {
		return this._params;
	}



	/**
	 * @param callback 回调时调用的方法
	 * @param thisObj 回调时传递的调用对象
	 * @param params 回调携带的参数
	 */
	public constructor(callback: Function, thisObj: any, params: any = null) {
		this._callback = callback;
		this._thisObj = thisObj;
		this._params = params;
	}

	/**
	 * 执行回调
	 * @param params 回调携带的参数，如果实例化时没有传入，可在执行回调时传入。如果都有，以最后传入为准。
	 */
	public doCallback(params: any = null): void {
		if (params == null && this._params != null) {
			params = this._params;
		}
		this._callback.call(this._thisObj, params);
	}

	/**
	 * 执行回调
	 * @param params 回调携带的参数，如果实例化时没有传入，可在执行回调时传入。如果都有，以最后传入为准。
	 */
	public doApply(params: any[]): void {
		if (params == null && this._params != null) {
			params = this._params;
		}
		this._callback.apply(this._thisObj, params);
	}

	/**
	 * 清空数据
	 */
	public dispose(): void {
		this._callback = null;
		this._thisObj = null;
		this._params = null;
	}
}
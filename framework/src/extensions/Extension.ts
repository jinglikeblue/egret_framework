class Extension {
	private static _map: any = {};

	public static registerFun(funName: string, fun: Function, thisObj: any): void {
		this._map[funName] = new CallbackModel(fun, thisObj);
	}

	public static unregisterFun(funName: string): void {
		this._map[funName] = null;
	}

	public static callJS(funName: string, ...params: any[]): void {
		if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
			return;
		}
		let fun: Function = window[funName];
		if (fun) {
			try {
				fun.apply(null, params);
			}
			catch (e) {
				console.log(`请求JS方法[${funName}]出错\n${e}`);
			}
		}
		else {
			console.log(`请求的JS方法[${funName}]不存在`);
		}
	}

	public static onCall(funName: string, ...params: any[]): void {
		let fun: CallbackModel = this._map[funName];
		fun.doApply(params);
	}

	public static tdAccount(accountId: string, accountType: number, accountName: string, level: number, gender: number, age: number, gameServer: string): void {
		if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
			return;
		}
		if (window['tdAccount']) {
			window['tdAccount'](accountId, accountType, accountName, level, gender, age, gameServer);
		}
	}

	public static tdEvent(eventId: string, eventData: any): void {
		if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
			return;
		}
		if (window['tdEvent']) {
			console.log(`记录事件：[${eventId}] Data:[${JSON.stringify(eventData)}]`);
			window['tdEvent'](eventId, eventData);
		}
	}

	public static tdMissionBegin(role: string): void {
		if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
			return;
		}
		if (window['tdMission']) {
			window['tdMission'](0, "扮演" + role, null);
		}
	}

	public static tdMissionCompleted(role: string): void {
		if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
			return;
		}
		if (window['tdMission']) {
			window['tdMission'](1, "扮演" + role, null);
		}
	}

	public static tdMissionFailed(role: string): void {
		if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
			return;
		}
		if (window['tdMission']) {
			window['tdMission'](2, "扮演" + role, "失败");
		}
	}

	public static tdCharge(gold): void {
		if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
			return;
		}
		if (window['tdCharge']) {
			window['tdCharge'](gold);
		}
	}
}
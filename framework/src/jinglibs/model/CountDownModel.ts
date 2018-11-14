/**
 * 倒计时的模型
 */
class CountDownModel {
	private _endTime: number = 0;
	private _startTime: number = 0;
	public constructor() {
	}

	/**
	 * 设置数据
	 * @param startTime 起始utc毫秒
	 * @param endTime 结束utc毫秒
	 */
	public setRange(startTime: number, endTime: number): void {
		this._startTime = startTime;
		this._endTime = endTime;
	}

	/**
	 * 设置从当前时间开始进行的倒计时
	 */
	public setCD(time: number): void {
		let now = egret.getTimer();
		this.setRange(now, now + time);
	}

	/**
	 * 获取倒计时剩余的毫秒
	 */
	public getRemainTime(): number {
		let remain: number = this._endTime - egret.getTimer();
		if (remain < 0) {
			remain = 0;
		}
		return remain;
	}

	/**
	 * 获取倒计时已通过的毫秒
	 */
	public getPastTime(): number {
		let past: number = egret.getTimer() - this._startTime;
		if (past < 0) {
			past = 0;
		}
		return past;
	}

	/**
	 * 获取总的倒计时时间长度
	 */
	public getTotalTime(): number {
		let total = this._endTime - this._startTime;
		return total;
	}
}
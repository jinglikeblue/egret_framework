class MsgWinVO {

	public constructor(msg: string, callback: CallbackModel = null) {
		this.msg = msg;
		this.callback = callback;
	}

	//消息
	public msg: string;

	//信息确认调用的方法
	public callback: CallbackModel;
}
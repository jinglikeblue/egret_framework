class DemoWebSocket extends eui.Component implements IView {

	public btnClose: eui.Button;
	public txtServer: eui.EditableText;
	public txtMsg: eui.EditableText;
	public btnConnect: eui.Button;
	public btnSend: eui.Button;

	private _socket: GameSocket;

	public constructor() {
		super();
		this.skinName = DemoWebSocketSkin;
		this.horizontalCenter = 0;
		this.verticalCenter = 0;
	}

	/**
	 * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
	 */
	public onInit(data: any): void {
		this._socket = new GameSocket();
	}

	/**
	 * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
	 */
	public onShow(data: any): void {
		let btns: eui.Button[] = [this.btnClose, this.btnConnect, this.btnSend];
		for (let btn of btns) {
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouchTap, this);
		}

		this._socket.addEventListener(GameSocketEvent.CONNECT_SUCCESS, this.onSocket, this);
		this._socket.addEventListener(GameSocketEvent.CONNECT_FAIL, this.onSocket, this);
		this._socket.addEventListener(GameSocketEvent.CLOSED, this.onSocket, this);
		this._socket.addEventListener(GameSocketEvent.PROTO, this.onSocket, this);
	}

	/**
	 * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
	 */
	public onDispose(): void {
		let btns: eui.Button[] = [this.btnClose, this.btnConnect, this.btnSend];
		for (let btn of btns) {
			btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouchTap, this);
		}

		this._socket.removeEventListener(GameSocketEvent.CONNECT_SUCCESS, this.onSocket, this);
		this._socket.removeEventListener(GameSocketEvent.CONNECT_FAIL, this.onSocket, this);
		this._socket.removeEventListener(GameSocketEvent.CLOSED, this.onSocket, this);
		this._socket.removeEventListener(GameSocketEvent.PROTO, this.onSocket, this);
		this._socket.close();
	}

	private onBtnTouchTap(e: egret.TouchEvent): void {
		switch (e.currentTarget) {
			case this.btnClose:
				GWindowMgr.close(this);
				break;
			case this.btnConnect:
				WaitWin.show();
				this._socket.connectByUrl(this.txtServer.text.trim());
				break;
			case this.btnSend:
				if (this._socket.isConnected) {
					this._socket.sendProtocol(1, this.txtMsg.text.trim());
				}
				else {
					MsgWin.show("还未连接服务器！");
				}
				break;
		}
	}

	private onSocket(e: GameSocketEvent): void {
		WaitWin.close();
		switch (e.type) {
			case GameSocketEvent.CONNECT_SUCCESS:
				MsgWin.show("连接服务器成功！");
				break;
			case GameSocketEvent.CONNECT_FAIL:
				MsgWin.show("连接服务器失败！");
				break;
			case GameSocketEvent.CLOSED:
				MsgWin.show("服务器连接断开！");
				break;
			case GameSocketEvent.PROTO:
				MsgWin.show(e.data + "");
				break;
		}
	}
}
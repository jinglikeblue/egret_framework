class GameSocket extends egret.EventDispatcher {
	private _socket: egret.WebSocket;

	/**
	 * 协议捕获器映射
	 */
	private _protocolCacherMap: any = {};

	private _url: string;
	/**
	 * 连接地址
	 */
	public get url(): string {
		return this._url;
	}
	public constructor() {
		super();
	}

	/**
	 * 连接服务器
	 */
	public connect(host: string, port: number): void {
		let url = `ws://${host}:${port}`;
		this.connectByUrl(url);
	}

	/**
	 * 根据提供的url连接
	 * @param url 全地址。如ws://echo.websocket.org:80
	 */
	public connectByUrl(url: string): void {
		this.close();
		this._url = url;
		this._socket = new egret.WebSocket();
		this.addListeners();
		try {
			egret.log(`连接服务器：${url}`)
			this._socket.connectByUrl(url);
		}
		catch (e) {
			this.close();
			this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CONNECT_FAIL));
		}
	}

	/**
	 * 重连服务器
	 */
	public reconnect(): void {
		this.connectByUrl(this._url);
	}

	/**
	 * 关闭套接字连接
	 */
	public close(): void {
		if (this._socket) {
			if (this._socket.connected) {
				this._socket.close();
			}
			this.removeListeners();
			this._socket = null;
		}
	}

	/**
	 * 终端是否已连接
	 */
	public get isConnected(): boolean {
		if (this._socket) {
			return this._socket.connected;
		}
		return false;
	}

	/**
	 * 发送UTF数据
	 */
	public sendUTF(str: string): void {
		if (this._socket && this._socket.connected) {
			this._socket.writeUTF(str);
			this._socket.flush();
		}
	}

	/**
	 * 发送协议数据
	 */
	public sendProtocol(id: any, data: any = null): void {
		let proto = {};
		proto['id'] = id;
		proto['data'] = data;
		let json = JSON.stringify(proto);
		this.sendUTF(json);
		if (id != EC2S.PING) {
			egret.log(`发送协议 ${json}`);
		}
	}

	private addListeners(): void {
		let socket = this._socket;
		socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
		socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
		socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
		socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
	}

	private removeListeners(): void {
		let socket = this._socket;
		socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
		socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
		socket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
		socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
	}

	private onConnect(e: egret.Event): void {
		egret.log("服务器连接成功！");
		this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CONNECT_SUCCESS));
	}

	private onClose(e: egret.Event): void {
		egret.log("服务器连接断开！");
		this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CLOSED));
	}

	private onIOError(e: egret.IOErrorEvent): void {
		egret.log("服务器连接出错！");
		this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CONNECT_FAIL));
	}

	private onSocketData(e: egret.ProgressEvent): void {
		let proto = this._socket.readUTF();
		this.dispatchEvent(new GameSocketEvent(GameSocketEvent.PROTO, proto));

		var protoData: any;
		try {
			protoData = JSON.parse(proto);
		}
		catch (e) {
			console.log("接收的数据无法解析 ---> " + proto);
			return;
		}

		if (null == protoData || protoData.id == null) {
			console.log("接收的协议数据格式不正确 ---> " + proto);
			return;
		}

		//获取协议捕获器
		let cacherCls = this._protocolCacherMap[protoData.id];
		if (null == cacherCls) {
			egret.error(`协议[${protoData.id}]没有对应的捕获器。 数据内容 ${proto}`);
			return;
		}

		if (protoData.id != ES2C.PING) {
			egret.log(`收到协议 ${proto}`);
		}
		//生成捕获器实例
		let cacher: AProtocolCacher = new cacherCls();
		//处理数据
		cacher.onCacheProtocol(protoData.data);
	}

	/**
	 * 注册协议捕获器
	 */
	public registerProtocolCacher(protocolId: any, cacherCls: any): void {
		if (new cacherCls() instanceof AProtocolCacher) {
			this._protocolCacherMap[protocolId] = cacherCls;
		}
		else {
			egret.error(`注册的协议[${protocolId}]对应的捕获器不正确，请检查！`);
		}
	}

	/**
	 * 注销协议处理器
	 */
	public unregisterProtocolCacher(protocolId: any): void {
		this._protocolCacherMap[protocolId] = null;
		delete this._protocolCacherMap[protocolId];
	}
}
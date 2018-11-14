var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameSocket = (function (_super) {
    __extends(GameSocket, _super);
    function GameSocket() {
        var _this = _super.call(this) || this;
        /**
         * 协议捕获器映射
         */
        _this._protocolCacherMap = {};
        return _this;
    }
    Object.defineProperty(GameSocket.prototype, "url", {
        /**
         * 连接地址
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 连接服务器
     */
    GameSocket.prototype.connect = function (host, port) {
        var url = "ws://" + host + ":" + port;
        this.connectByUrl(url);
    };
    /**
     * 根据提供的url连接
     * @param url 全地址。如ws://echo.websocket.org:80
     */
    GameSocket.prototype.connectByUrl = function (url) {
        this.close();
        this._url = url;
        this._socket = new egret.WebSocket();
        this.addListeners();
        try {
            egret.log("\u8FDE\u63A5\u670D\u52A1\u5668\uFF1A" + url);
            this._socket.connectByUrl(url);
        }
        catch (e) {
            this.close();
            this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CONNECT_FAIL));
        }
    };
    /**
     * 重连服务器
     */
    GameSocket.prototype.reconnect = function () {
        this.connectByUrl(this._url);
    };
    /**
     * 关闭套接字连接
     */
    GameSocket.prototype.close = function () {
        if (this._socket) {
            if (this._socket.connected) {
                this._socket.close();
            }
            this.removeListeners();
            this._socket = null;
        }
    };
    Object.defineProperty(GameSocket.prototype, "isConnected", {
        /**
         * 终端是否已连接
         */
        get: function () {
            if (this._socket) {
                return this._socket.connected;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 发送UTF数据
     */
    GameSocket.prototype.sendUTF = function (str) {
        if (this._socket && this._socket.connected) {
            this._socket.writeUTF(str);
            this._socket.flush();
        }
    };
    /**
     * 发送协议数据
     */
    GameSocket.prototype.sendProtocol = function (id, data) {
        if (data === void 0) { data = null; }
        var proto = {};
        proto['id'] = id;
        proto['data'] = data;
        var json = JSON.stringify(proto);
        this.sendUTF(json);
        if (id != EC2S.PING) {
            egret.log("\u53D1\u9001\u534F\u8BAE " + json);
        }
    };
    GameSocket.prototype.addListeners = function () {
        var socket = this._socket;
        socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
        socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
        socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
    };
    GameSocket.prototype.removeListeners = function () {
        var socket = this._socket;
        socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
        socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
        socket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
        socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
    };
    GameSocket.prototype.onConnect = function (e) {
        egret.log("服务器连接成功！");
        this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CONNECT_SUCCESS));
    };
    GameSocket.prototype.onClose = function (e) {
        egret.log("服务器连接断开！");
        this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CLOSED));
    };
    GameSocket.prototype.onIOError = function (e) {
        egret.log("服务器连接出错！");
        this.dispatchEvent(new GameSocketEvent(GameSocketEvent.CONNECT_FAIL));
    };
    GameSocket.prototype.onSocketData = function (e) {
        var proto = this._socket.readUTF();
        this.dispatchEvent(new GameSocketEvent(GameSocketEvent.PROTO, proto));
        var protoData;
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
        var cacherCls = this._protocolCacherMap[protoData.id];
        if (null == cacherCls) {
            egret.error("\u534F\u8BAE[" + protoData.id + "]\u6CA1\u6709\u5BF9\u5E94\u7684\u6355\u83B7\u5668\u3002 \u6570\u636E\u5185\u5BB9 " + proto);
            return;
        }
        if (protoData.id != ES2C.PING) {
            egret.log("\u6536\u5230\u534F\u8BAE " + proto);
        }
        //生成捕获器实例
        var cacher = new cacherCls();
        //处理数据
        cacher.onCacheProtocol(protoData.data);
    };
    /**
     * 注册协议捕获器
     */
    GameSocket.prototype.registerProtocolCacher = function (protocolId, cacherCls) {
        if (new cacherCls() instanceof AProtocolCacher) {
            this._protocolCacherMap[protocolId] = cacherCls;
        }
        else {
            egret.error("\u6CE8\u518C\u7684\u534F\u8BAE[" + protocolId + "]\u5BF9\u5E94\u7684\u6355\u83B7\u5668\u4E0D\u6B63\u786E\uFF0C\u8BF7\u68C0\u67E5\uFF01");
        }
    };
    /**
     * 注销协议处理器
     */
    GameSocket.prototype.unregisterProtocolCacher = function (protocolId) {
        this._protocolCacherMap[protocolId] = null;
        delete this._protocolCacherMap[protocolId];
    };
    return GameSocket;
}(egret.EventDispatcher));
__reflect(GameSocket.prototype, "GameSocket");
//# sourceMappingURL=GameSocket.js.map
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
var DemoWebSocket = (function (_super) {
    __extends(DemoWebSocket, _super);
    function DemoWebSocket() {
        var _this = _super.call(this) || this;
        _this.skinName = DemoWebSocketSkin;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        return _this;
    }
    /**
     * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
     */
    DemoWebSocket.prototype.onInit = function (data) {
        this._socket = new GameSocket();
    };
    /**
     * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
     */
    DemoWebSocket.prototype.onShow = function (data) {
        var btns = [this.btnClose, this.btnConnect, this.btnSend];
        for (var _i = 0, btns_1 = btns; _i < btns_1.length; _i++) {
            var btn = btns_1[_i];
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouchTap, this);
        }
        this._socket.addEventListener(GameSocketEvent.CONNECT_SUCCESS, this.onSocket, this);
        this._socket.addEventListener(GameSocketEvent.CONNECT_FAIL, this.onSocket, this);
        this._socket.addEventListener(GameSocketEvent.CLOSED, this.onSocket, this);
        this._socket.addEventListener(GameSocketEvent.PROTO, this.onSocket, this);
    };
    /**
     * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
     */
    DemoWebSocket.prototype.onDispose = function () {
        var btns = [this.btnClose, this.btnConnect, this.btnSend];
        for (var _i = 0, btns_2 = btns; _i < btns_2.length; _i++) {
            var btn = btns_2[_i];
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouchTap, this);
        }
        this._socket.removeEventListener(GameSocketEvent.CONNECT_SUCCESS, this.onSocket, this);
        this._socket.removeEventListener(GameSocketEvent.CONNECT_FAIL, this.onSocket, this);
        this._socket.removeEventListener(GameSocketEvent.CLOSED, this.onSocket, this);
        this._socket.removeEventListener(GameSocketEvent.PROTO, this.onSocket, this);
        this._socket.close();
    };
    DemoWebSocket.prototype.onBtnTouchTap = function (e) {
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
    };
    DemoWebSocket.prototype.onSocket = function (e) {
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
    };
    return DemoWebSocket;
}(eui.Component));
__reflect(DemoWebSocket.prototype, "DemoWebSocket", ["IView", "egret.IEventDispatcher"]);
//# sourceMappingURL=DemoWebSocket.js.map
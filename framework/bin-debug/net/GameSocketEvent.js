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
/**
 * 游戏套接字事件的处理
 */
var GameSocketEvent = (function (_super) {
    __extends(GameSocketEvent, _super);
    function GameSocketEvent(type, data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this, type) || this;
        _this._data = null;
        _this._data = data;
        return _this;
    }
    Object.defineProperty(GameSocketEvent.prototype, "data", {
        /**
         * 事件携带的数据
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 连接成功
     */
    GameSocketEvent.CONNECT_SUCCESS = "CONNECT_SUCCESS";
    /**
     * 连接失败
     */
    GameSocketEvent.CONNECT_FAIL = "CONNECT_FAIL";
    /**
     * 连接断开
     */
    GameSocketEvent.CLOSED = "CLOSED";
    /**
     * 接收到协议
     */
    GameSocketEvent.PROTO = "PROTO";
    return GameSocketEvent;
}(egret.Event));
__reflect(GameSocketEvent.prototype, "GameSocketEvent");
//# sourceMappingURL=GameSocketEvent.js.map
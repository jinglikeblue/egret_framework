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
var HistoryRecordEvent = (function (_super) {
    __extends(HistoryRecordEvent, _super);
    function HistoryRecordEvent(type, data) {
        var _this = _super.call(this, type) || this;
        _this._type = type;
        _this._data = data;
        return _this;
    }
    Object.defineProperty(HistoryRecordEvent.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HistoryRecordEvent.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 浏览器历史跳转事件
     */
    HistoryRecordEvent.POP_STATE = "POP_STATE";
    return HistoryRecordEvent;
}(egret.Event));
__reflect(HistoryRecordEvent.prototype, "HistoryRecordEvent");
//# sourceMappingURL=HistoryRecordEvent.js.map
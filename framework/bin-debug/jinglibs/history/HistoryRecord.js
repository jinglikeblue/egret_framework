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
var HistoryRecord = (function (_super) {
    __extends(HistoryRecord, _super);
    function HistoryRecord() {
        var _this = _super.call(this) || this;
        _this._isStart = false;
        return _this;
    }
    HistoryRecord.prototype.start = function () {
        if (this._isStart) {
            return;
        }
        this._isStart = true;
        window.addEventListener("popstate", this.onPopState.bind(this), false);
    };
    HistoryRecord.prototype.close = function () {
        if (false == this._isStart) {
            return;
        }
        this._isStart = false;
        window.removeEventListener("popstate", this.onPopState.bind(this), false);
    };
    /**
     * 将当前页面加入到浏览器历史记录中
     */
    HistoryRecord.prototype.addHistory = function (url, data) {
        if (url === void 0) { url = ""; }
        if (data === void 0) { data = null; }
        window.history.pushState(data, "", url);
    };
    /**
     * 替换浏览器中当前页面的历史记录信息
     */
    HistoryRecord.prototype.replaceHistory = function (url, data) {
        if (url === void 0) { url = ""; }
        if (data === void 0) { data = null; }
        window.history.replaceState(data, "", url);
    };
    HistoryRecord.prototype.onPopState = function (e) {
        var data = e.state;
        this.dispatchEvent(new HistoryRecordEvent(HistoryRecordEvent.POP_STATE, data));
    };
    return HistoryRecord;
}(egret.EventDispatcher));
__reflect(HistoryRecord.prototype, "HistoryRecord");
//# sourceMappingURL=HistoryRecord.js.map
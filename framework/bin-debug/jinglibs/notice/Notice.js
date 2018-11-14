var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Notice = (function () {
    function Notice(type, data) {
        if (data === void 0) { data = null; }
        this._type = type;
        this._data = data;
    }
    Object.defineProperty(Notice.prototype, "type", {
        /**
         * 通知的类型
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notice.prototype, "data", {
        /**
         * 通知的数据
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Notice.WINDOW_BLUR_TOUCHED = "Notice::WINDOW_BLUR_TOUCHED";
    return Notice;
}());
__reflect(Notice.prototype, "Notice");
//# sourceMappingURL=Notice.js.map
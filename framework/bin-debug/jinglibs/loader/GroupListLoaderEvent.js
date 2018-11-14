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
var GroupListLoaderEvent = (function (_super) {
    __extends(GroupListLoaderEvent, _super);
    function GroupListLoaderEvent(type, grpName, res) {
        if (grpName === void 0) { grpName = null; }
        if (res === void 0) { res = null; }
        var _this = _super.call(this, type) || this;
        _this._grpName = grpName;
        _this._res = res;
        return _this;
    }
    Object.defineProperty(GroupListLoaderEvent.prototype, "grpName", {
        get: function () {
            return this._grpName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupListLoaderEvent.prototype, "res", {
        get: function () {
            return this._res;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载完一个资源组
     */
    GroupListLoaderEvent.GROUP_LOADED = "GROUP_LOADED";
    /**
     * 加载完一个资源
     */
    GroupListLoaderEvent.ITEM_LOADED = "ITEM_LOADED";
    return GroupListLoaderEvent;
}(egret.Event));
__reflect(GroupListLoaderEvent.prototype, "GroupListLoaderEvent");
//# sourceMappingURL=GroupListLoaderEvent.js.map
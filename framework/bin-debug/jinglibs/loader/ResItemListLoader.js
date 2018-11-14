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
var ResItemListLoader = (function (_super) {
    __extends(ResItemListLoader, _super);
    function ResItemListLoader() {
        return _super.call(this) || this;
    }
    ResItemListLoader.prototype.getLastLoaded = function () {
        return this._lastLoaded;
    };
    ResItemListLoader.prototype.load = function (resKeys) {
        if (this._resKeys != null) {
            throw new Error("暂不支持加载器重复使用");
        }
        this._resKeys = resKeys;
        this._idx2Load = 0;
        this.loadItem();
    };
    ResItemListLoader.prototype.loadItem = function () {
        if (this._idx2Load == this._resKeys.length) {
            this.allOver();
            return;
        }
        var key2Load = this._resKeys[this._idx2Load++];
        //只加载存在且没有加载的资源
        var res = RES.getRes(key2Load);
        if (RES.hasRes(key2Load) && null == res) {
            RES.getResAsync(key2Load, this.onResLoaded, this);
        }
        else {
            this.onResLoaded(res, key2Load);
        }
    };
    /**
     * 资源已加载到内存
     */
    ResItemListLoader.prototype.onResLoaded = function (data, key) {
        this._lastLoaded = data;
        this.dispatchEvent(new egret.ProgressEvent(egret.ProgressEvent.PROGRESS, false, false, this._idx2Load, this._resKeys.length));
        this.loadItem();
    };
    ResItemListLoader.prototype.allOver = function () {
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    return ResItemListLoader;
}(egret.EventDispatcher));
__reflect(ResItemListLoader.prototype, "ResItemListLoader");
//# sourceMappingURL=ResItemListLoader.js.map
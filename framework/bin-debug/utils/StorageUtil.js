var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StorageUtil = (function () {
    function StorageUtil() {
    }
    /**
     * 保存数据
     */
    StorageUtil.save = function (key, value) {
        egret.localStorage.setItem(key, value);
    };
    /**
     * 加载数据
     */
    StorageUtil.load = function (key) {
        return egret.localStorage.getItem(key);
    };
    /**
     * 移除数据
     */
    StorageUtil.clear = function (key) {
        egret.localStorage.removeItem(key);
    };
    return StorageUtil;
}());
__reflect(StorageUtil.prototype, "StorageUtil");
//# sourceMappingURL=StorageUtil.js.map
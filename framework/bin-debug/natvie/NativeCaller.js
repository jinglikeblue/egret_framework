var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NativeCaller = (function () {
    function NativeCaller() {
    }
    /**
     * 白鹭引擎启动
     */
    NativeCaller.egretStart = function () {
        NativeExternal.ins().callNative({ "id": "egretStart" });
        NativeExternal.ins().startCacheWebviewMsgs();
    };
    /**
     * 请求苹果支付
     */
    NativeCaller.applePay = function (id) {
        var obj = {};
        obj.id = "openApplePay";
        obj.product = id;
        NativeExternal.ins().callNative(obj);
    };
    /**
     * 退出
     */
    NativeCaller.exit = function () {
        NativeExternal.ins().callNative({ "id": "exitGame" });
    };
    return NativeCaller;
}());
__reflect(NativeCaller.prototype, "NativeCaller");
//# sourceMappingURL=NativeCaller.js.map
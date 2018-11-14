var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClientType = (function () {
    function ClientType() {
    }
    /**
     * android微端
     */
    ClientType.WEBVIEW_ANDROID = "WEBVIEW_ANDROID";
    /**
     * ios微端
     */
    ClientType.WEBVIEW_IOS = "WEBVIEW_IOS";
    return ClientType;
}());
__reflect(ClientType.prototype, "ClientType");
//# sourceMappingURL=ClientType.js.map
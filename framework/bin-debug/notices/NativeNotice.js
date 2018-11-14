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
var NativeNotice = (function (_super) {
    __extends(NativeNotice, _super);
    function NativeNotice(type, data) {
        if (data === void 0) { data = null; }
        return _super.call(this, type, data) || this;
    }
    /**
     * 获取到微信的code
     */
    NativeNotice.GET_WX_CODE = "NativeNotice::GET_WX_CODE";
    return NativeNotice;
}(Notice));
__reflect(NativeNotice.prototype, "NativeNotice");
//# sourceMappingURL=NativeNotice.js.map
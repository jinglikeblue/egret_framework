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
var YaYaIMNotice = (function (_super) {
    __extends(YaYaIMNotice, _super);
    function YaYaIMNotice(type, data) {
        if (data === void 0) { data = null; }
        return _super.call(this, type, data) || this;
    }
    YaYaIMNotice.ON_RCD_UPLOAD = "YaYaIMNotice::ON_RCD_UPLOAD";
    YaYaIMNotice.ON_RCD_PLAY_STOP = "YaYaIMNotice::ON_RCD_PLAY_STOP";
    YaYaIMNotice.ON_LOGIN_RESULT = "YaYaIMNotice::ON_LOGIN_RESULT";
    YaYaIMNotice.ON_RCD_VOLUME = "YaYaIMNotice::ON_RCD_VOLUME";
    YaYaIMNotice.ON_RCD_COMPLETE = "YaYaIMNotice::ON_RCD_COMPLETE";
    YaYaIMNotice.ON_NET_STATE = "YaYaIMNotice::ON_NET_STATE";
    return YaYaIMNotice;
}(Notice));
__reflect(YaYaIMNotice.prototype, "YaYaIMNotice");
//# sourceMappingURL=YaYaIMNotice.js.map
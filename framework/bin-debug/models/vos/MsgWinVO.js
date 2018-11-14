var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MsgWinVO = (function () {
    function MsgWinVO(msg, callback) {
        if (callback === void 0) { callback = null; }
        this.msg = msg;
        this.callback = callback;
    }
    return MsgWinVO;
}());
__reflect(MsgWinVO.prototype, "MsgWinVO");
//# sourceMappingURL=MsgWinVO.js.map
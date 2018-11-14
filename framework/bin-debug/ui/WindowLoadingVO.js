var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WindowLoadingVO = (function () {
    function WindowLoadingVO() {
        //是否在窗口下显示遮罩。该值只确定是否在窗口下可视的显示遮罩。并不影响触摸事件的向下传递。默认为true
        this.blur = true;
        //是否在打开窗口同时关闭其它所有已打开的窗口。默认为false
        this.closeOther = false;
    }
    return WindowLoadingVO;
}());
__reflect(WindowLoadingVO.prototype, "WindowLoadingVO");
//# sourceMappingURL=WindowLoadingVO.js.map
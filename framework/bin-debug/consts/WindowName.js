var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WindowName = (function () {
    function WindowName() {
    }
    //窗口形式的加载界面
    WindowName.LOADING = "LOADING";
    //消息提示框
    WindowName.MSG_BOX = "MSG_BOX";
    //网络请求窗口
    WindowName.WAIT = "WAIT";
    WindowName.DEMO = "DEMO";
    WindowName.DEMO_WS = "DEMO_WS";
    return WindowName;
}());
__reflect(WindowName.prototype, "WindowName");
//# sourceMappingURL=WindowName.js.map
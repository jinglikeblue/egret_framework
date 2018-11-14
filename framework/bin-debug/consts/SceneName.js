var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneName = (function () {
    function SceneName() {
    }
    //预加载界面
    SceneName.PRELOADING = "PRELOADING";
    //场景形式的加载界面
    SceneName.LOADING = "LOADING";
    SceneName.DEMO = "DEMO";
    return SceneName;
}());
__reflect(SceneName.prototype, "SceneName");
//# sourceMappingURL=SceneName.js.map
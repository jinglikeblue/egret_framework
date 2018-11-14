var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数据中心
 */
var DC = (function () {
    function DC() {
    }
    /**
     * 代码版本号
     */
    DC.CODE_VER = "ver: 1.0";
    /**
     * 启动参数
     */
    DC.startParams = new StartParamsVO();
    /**
     * 游戏舞台
     */
    DC.stage = null;
    /**
     * 游戏显示列表根
     */
    DC.root = null;
    return DC;
}());
__reflect(DC.prototype, "DC");
//# sourceMappingURL=DC.js.map
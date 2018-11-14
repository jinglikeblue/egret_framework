var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//游戏的启动参数
var StartParamsVO = (function () {
    function StartParamsVO() {
        //客户端版本号
        this.ver = "";
        //客户端类型
        this.clientType = "web";
    }
    return StartParamsVO;
}());
__reflect(StartParamsVO.prototype, "StartParamsVO");
//# sourceMappingURL=StartParamsVO.js.map
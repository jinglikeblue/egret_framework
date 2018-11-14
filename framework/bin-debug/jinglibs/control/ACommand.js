var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 抽象命令工具
 */
var ACommand = (function () {
    function ACommand() {
        /**
         * 命令接收的参数通过构造函数传入，子类各自实现
         */
    }
    return ACommand;
}());
__reflect(ACommand.prototype, "ACommand");
//# sourceMappingURL=ACommand.js.map
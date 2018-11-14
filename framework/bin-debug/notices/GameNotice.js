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
var GameNotice = (function (_super) {
    __extends(GameNotice, _super);
    function GameNotice(type, data) {
        if (data === void 0) { data = null; }
        return _super.call(this, type, data) || this;
    }
    //预加载完成
    GameNotice.PRELOAD_OVER = "GameNotice::PRELOAD_OVER";
    /**
     * 游戏中的返回
     */
    GameNotice.BACK = "GameNotice::BACK";
    return GameNotice;
}(Notice));
__reflect(GameNotice.prototype, "GameNotice");
//# sourceMappingURL=GameNotice.js.map
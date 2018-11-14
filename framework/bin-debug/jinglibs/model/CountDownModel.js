var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 倒计时的模型
 */
var CountDownModel = (function () {
    function CountDownModel() {
        this._endTime = 0;
        this._startTime = 0;
    }
    /**
     * 设置数据
     * @param startTime 起始utc毫秒
     * @param endTime 结束utc毫秒
     */
    CountDownModel.prototype.setRange = function (startTime, endTime) {
        this._startTime = startTime;
        this._endTime = endTime;
    };
    /**
     * 设置从当前时间开始进行的倒计时
     */
    CountDownModel.prototype.setCD = function (time) {
        var now = egret.getTimer();
        this.setRange(now, now + time);
    };
    /**
     * 获取倒计时剩余的毫秒
     */
    CountDownModel.prototype.getRemainTime = function () {
        var remain = this._endTime - egret.getTimer();
        if (remain < 0) {
            remain = 0;
        }
        return remain;
    };
    /**
     * 获取倒计时已通过的毫秒
     */
    CountDownModel.prototype.getPastTime = function () {
        var past = egret.getTimer() - this._startTime;
        if (past < 0) {
            past = 0;
        }
        return past;
    };
    /**
     * 获取总的倒计时时间长度
     */
    CountDownModel.prototype.getTotalTime = function () {
        var total = this._endTime - this._startTime;
        return total;
    };
    return CountDownModel;
}());
__reflect(CountDownModel.prototype, "CountDownModel");
//# sourceMappingURL=CountDownModel.js.map
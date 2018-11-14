var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DateUtil = (function () {
    function DateUtil() {
    }
    DateUtil.getTodayStart = function () {
        var date = new Date();
        var time = TimeUtil.getTime(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        return time;
    };
    DateUtil.getYesterdayStart = function () {
        var date = new Date();
        date.setTime(date.getTime() - DateUtil.ONE_DAY_TIME);
        var time = TimeUtil.getTime(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        return time;
    };
    DateUtil.getThisWeekStart = function () {
        var date = new Date();
        var day = date.getDay() - 1;
        var offTime = day * DateUtil.ONE_DAY_TIME;
        date.setTime(date.getTime() - offTime);
        var time = TimeUtil.getTime(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        return time;
    };
    DateUtil.getThisMonthStart = function () {
        var date = new Date();
        var month = date.getMonth();
        var time = TimeUtil.getTime(date.getFullYear(), month, 1, 0, 0, 0);
        return time;
    };
    DateUtil.ONE_DAY_TIME = 1000 * 60 * 60 * 24;
    return DateUtil;
}());
__reflect(DateUtil.prototype, "DateUtil");
//# sourceMappingURL=DateUtil.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 所有的时间单位为秒
 */
var TimeUtil = (function () {
    function TimeUtil() {
    }
    TimeUtil.getNowUTC = function () {
        var time = new Date().getTime() / 1000;
        return time >> 0;
    };
    TimeUtil.getTime = function (year, month, day, hour, min, sec) {
        var date = new Date();
        date.setFullYear(year, month, day);
        date.setHours(hour, min, sec);
        return this.milli2Seconds(date.getTime());
    };
    TimeUtil.milli2Seconds = function (utc) {
        return (utc / 1000) >> 0;
    };
    TimeUtil.formatUTC = function (time, format) {
        if (format === void 0) { format = "yyyy-mm-dd HH:MM:SS"; }
        var date = new Date();
        date.setTime(time * 1000);
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        var HH = date.getHours().toString();
        var MM = date.getMinutes().toString();
        var SS = date.getSeconds().toString();
        if (mm.length == 1) {
            mm = "0" + mm;
        }
        if (dd.length == 1) {
            dd = "0" + dd;
        }
        if (HH.length == 1) {
            HH = "0" + HH;
        }
        if (MM.length == 1) {
            MM = "0" + MM;
        }
        if (SS.length == 1) {
            SS = "0" + SS;
        }
        format = format.replace(/yyyy/, yyyy);
        format = format.replace(/mm/, mm);
        format = format.replace(/dd/, dd);
        format = format.replace(/HH/, HH);
        format = format.replace(/MM/, MM);
        format = format.replace(/SS/, SS);
        return format;
    };
    TimeUtil.formatSeconds = function (seconds, format) {
        if (format === void 0) { format = "HH:MM:SS"; }
        var HH = ((seconds / 3600) >> 0).toString();
        var MM = (((seconds % 3600) / 60) >> 0).toString();
        var SS = (seconds % 60).toString();
        if (HH.length == 1) {
            HH = "0" + HH;
        }
        if (MM.length == 1) {
            MM = "0" + MM;
        }
        if (SS.length == 1) {
            SS = "0" + SS;
        }
        format = format.replace(/HH/, HH);
        format = format.replace(/MM/, MM);
        format = format.replace(/SS/, SS);
        return format;
    };
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");
//# sourceMappingURL=TimeUtil.js.map
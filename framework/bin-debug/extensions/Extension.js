var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Extension = (function () {
    function Extension() {
    }
    Extension.registerFun = function (funName, fun, thisObj) {
        this._map[funName] = new CallbackModel(fun, thisObj);
    };
    Extension.unregisterFun = function (funName) {
        this._map[funName] = null;
    };
    Extension.callJS = function (funName) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return;
        }
        var fun = window[funName];
        if (fun) {
            try {
                fun.apply(null, params);
            }
            catch (e) {
                console.log("\u8BF7\u6C42JS\u65B9\u6CD5[" + funName + "]\u51FA\u9519\n" + e);
            }
        }
        else {
            console.log("\u8BF7\u6C42\u7684JS\u65B9\u6CD5[" + funName + "]\u4E0D\u5B58\u5728");
        }
    };
    Extension.onCall = function (funName) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var fun = this._map[funName];
        fun.doApply(params);
    };
    Extension.tdAccount = function (accountId, accountType, accountName, level, gender, age, gameServer) {
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return;
        }
        if (window['tdAccount']) {
            window['tdAccount'](accountId, accountType, accountName, level, gender, age, gameServer);
        }
    };
    Extension.tdEvent = function (eventId, eventData) {
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return;
        }
        if (window['tdEvent']) {
            console.log("\u8BB0\u5F55\u4E8B\u4EF6\uFF1A[" + eventId + "] Data:[" + JSON.stringify(eventData) + "]");
            window['tdEvent'](eventId, eventData);
        }
    };
    Extension.tdMissionBegin = function (role) {
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return;
        }
        if (window['tdMission']) {
            window['tdMission'](0, "扮演" + role, null);
        }
    };
    Extension.tdMissionCompleted = function (role) {
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return;
        }
        if (window['tdMission']) {
            window['tdMission'](1, "扮演" + role, null);
        }
    };
    Extension.tdMissionFailed = function (role) {
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return;
        }
        if (window['tdMission']) {
            window['tdMission'](2, "扮演" + role, "失败");
        }
    };
    Extension.tdCharge = function (gold) {
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            return;
        }
        if (window['tdCharge']) {
            window['tdCharge'](gold);
        }
    };
    Extension._map = {};
    return Extension;
}());
__reflect(Extension.prototype, "Extension");
//# sourceMappingURL=Extension.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对回调方式的封装模型
 * 目标对象通过调用doCallback方法，回调对象方法
 */
var CallbackModel = (function () {
    /**
     * @param callback 回调时调用的方法
     * @param thisObj 回调时传递的调用对象
     * @param params 回调携带的参数
     */
    function CallbackModel(callback, thisObj, params) {
        if (params === void 0) { params = null; }
        this._callback = callback;
        this._thisObj = thisObj;
        this._params = params;
    }
    CallbackModel.prototype.getCallback = function () {
        return this._callback;
    };
    CallbackModel.prototype.getThisObj = function () {
        return this._thisObj;
    };
    CallbackModel.prototype.getParams = function () {
        return this._params;
    };
    /**
     * 执行回调
     * @param params 回调携带的参数，如果实例化时没有传入，可在执行回调时传入。如果都有，以最后传入为准。
     */
    CallbackModel.prototype.doCallback = function (params) {
        if (params === void 0) { params = null; }
        if (params == null && this._params != null) {
            params = this._params;
        }
        this._callback.call(this._thisObj, params);
    };
    /**
     * 执行回调
     * @param params 回调携带的参数，如果实例化时没有传入，可在执行回调时传入。如果都有，以最后传入为准。
     */
    CallbackModel.prototype.doApply = function (params) {
        if (params == null && this._params != null) {
            params = this._params;
        }
        this._callback.apply(this._thisObj, params);
    };
    /**
     * 清空数据
     */
    CallbackModel.prototype.dispose = function () {
        this._callback = null;
        this._thisObj = null;
        this._params = null;
    };
    return CallbackModel;
}());
__reflect(CallbackModel.prototype, "CallbackModel");
//# sourceMappingURL=CallbackModel.js.map
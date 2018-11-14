var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DelayCaller = (function () {
    function DelayCaller(id, delay, vo) {
        this._id = id;
        this._params = [vo];
        this.start(delay);
    }
    /**
     * 创建一个延迟呼叫器
     * @param delay 延迟的毫秒值，必须大于0
     */
    DelayCaller.create = function (delay, callback, thisObj, data) {
        if (data === void 0) { data = null; }
        if (delay <= 0) {
            return;
        }
        var vo = new DelayCallerParamVO();
        vo.callback = callback;
        vo.thisObj = thisObj;
        vo.data = data;
        var id = this._idx++;
        var dc = new DelayCaller(id, delay, vo);
        this._map[id] = dc;
        return id;
    };
    /**
     * 在指定延迟呼叫器上增加一个回调
     */
    DelayCaller.add = function (id, callback, thisObj, data) {
        if (data === void 0) { data = null; }
        var dc = this._map[id];
        if (dc != null) {
            var vo = new DelayCallerParamVO();
            vo.callback = callback;
            vo.thisObj = thisObj;
            vo.data = data;
            dc.add(vo);
        }
    };
    /**
     * 销毁一个延迟呼叫器
     */
    DelayCaller.dispose = function (id) {
        var dc = this._map[id];
        if (dc != null) {
            dc.dispose();
            this._map[id] = null;
            delete this._map[id];
        }
    };
    /**
     * 启动延迟回调，单位毫秒后回调
     */
    DelayCaller.prototype.start = function (delay) {
        if (this._timer != null) {
            return;
        }
        var timer = new egret.Timer(delay, 1);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        timer.start();
        this._timer = timer;
    };
    /**
     * 添加回调
     */
    DelayCaller.prototype.add = function (vo) {
        if (this._params != null) {
            this._params.push(vo);
        }
    };
    DelayCaller.prototype.onTimer = function (e) {
        while (this._params && this._params.length > 0) {
            var vo = this._params.shift();
            vo.callback.call(vo.thisObj, vo.data);
        }
        //回调完毕，请求销毁自己
        DelayCaller.dispose(this._id);
    };
    /**
     * 销毁该延迟回调对象
     */
    DelayCaller.prototype.dispose = function () {
        if (null != this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer = null;
        }
        this._params = null;
    };
    /**
     * 延迟呼叫器编号
     */
    DelayCaller._idx = 1;
    /**
     * 延迟呼叫器表
     */
    DelayCaller._map = {};
    return DelayCaller;
}());
__reflect(DelayCaller.prototype, "DelayCaller");
//# sourceMappingURL=DelayCaller.js.map
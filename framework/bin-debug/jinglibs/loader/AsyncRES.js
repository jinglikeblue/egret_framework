var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AsyncRES = (function () {
    function AsyncRES() {
        this._resWatchers = {};
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResResourceProgress, this);
    }
    AsyncRES.prototype.onResResourceProgress = function (e) {
        var loadedItem = e.resItem;
        this.onResItemLoaded(loadedItem, loadedItem.name);
    };
    /**
     * 快速获取资源，如果资源存在则返回，如果不存在，则在后台加载并返回null
     */
    AsyncRES.prototype.quickGet = function (resName) {
        var res = RES.getRes(resName);
        if (null == res && RES.hasRes(resName)) {
            RES.getResAsync(resName, function () { }, this);
        }
        return res;
    };
    /**
     * 需要某个资源
     */
    AsyncRES.prototype.need = function (resName, callback, thisObj, params) {
        if (params === void 0) { params = null; }
        if (false == RES.hasRes(resName)) {
            throw new Error("\u9700\u8981\u7684\u8D44\u6E90" + resName + "\u5E76\u4E0D\u5B58\u5728");
        }
        var item = RES.getRes(resName);
        if (item != null) {
            //资源已有，直接返回
            this.itemCallback(resName, item, callback, thisObj, params);
        }
        else {
            if (false == this.checkIsWatch(resName, callback, thisObj)) {
                var watchers = this._resWatchers[resName];
                if (null == watchers) {
                    watchers = [];
                    this._resWatchers[resName] = watchers;
                }
                watchers.push(new CallbackModel(callback, thisObj, params));
                RES.getResAsync(resName, this.onResItemLoaded, this);
            }
        }
    };
    AsyncRES.prototype.checkIsWatch = function (resName, callback, thisObj) {
        var watchers = this._resWatchers[resName];
        if (null == watchers) {
            return false;
        }
        for (var _i = 0, watchers_1 = watchers; _i < watchers_1.length; _i++) {
            var watcher = watchers_1[_i];
            if (watcher.getCallback() == callback && watcher.getThisObj() == thisObj) {
                return true;
            }
        }
        return false;
    };
    /**
     * 不再需要某个资源
     */
    AsyncRES.prototype.needless = function (resName, callback, thisObj) {
        var watchers = this._resWatchers[resName];
        if (null != watchers) {
            for (var i = watchers.length - 1; i >= 0; i--) {
                var watcher = watchers[i];
                if (watcher.getCallback() == callback && watcher.getThisObj() == thisObj) {
                    watchers.splice(i, 1);
                    break;
                }
            }
        }
    };
    AsyncRES.prototype.onResItemLoaded = function (resItem, resName) {
        var watchers = this._resWatchers[resName];
        if (watchers == null) {
            return;
        }
        for (var _i = 0, watchers_2 = watchers; _i < watchers_2.length; _i++) {
            var watcher = watchers_2[_i];
            this.itemCallback(resName, resItem, watcher.getCallback(), watcher.getThisObj(), watcher.getParams());
        }
        this._resWatchers[resName] = null;
        delete this._resWatchers[resName];
    };
    AsyncRES.prototype.itemCallback = function (resName, resItem, callback, thisObj, params) {
        if (null != callback) {
            callback.call(thisObj, resName, resItem, params);
        }
    };
    return AsyncRES;
}());
__reflect(AsyncRES.prototype, "AsyncRES");
//# sourceMappingURL=AsyncRES.js.map
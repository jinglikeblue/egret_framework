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
/**
 * 单个线程的资源组加载器
 * 优点：单线程，适合在后台静默加载资源，不会占用所有的加载线程
 * 缺点：因为是单线程队列加载，所有资源加载完的时间会相对慢一些
 */
var GroupListSingleThreadLoader = (function (_super) {
    __extends(GroupListSingleThreadLoader, _super);
    function GroupListSingleThreadLoader() {
        var _this = _super.call(this) || this;
        //已加载的资源组数量
        _this._loadedGroupsCount = 0;
        //已加载的资源数
        _this._loadedItemsCount = 0;
        //要加载的资源总数
        _this._totalItemsCount = 0;
        return _this;
    }
    Object.defineProperty(GroupListSingleThreadLoader.prototype, "loadedGroupsCount", {
        get: function () {
            return this._loadedGroupsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupListSingleThreadLoader.prototype, "totalGroupsCount", {
        //要加载的资源组总数
        get: function () {
            return this._arrGroupName.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupListSingleThreadLoader.prototype, "loadedItemsCount", {
        get: function () {
            return this._loadedItemsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupListSingleThreadLoader.prototype, "totalItemsCount", {
        get: function () {
            return this._totalItemsCount;
        },
        enumerable: true,
        configurable: true
    });
    GroupListSingleThreadLoader.prototype.dispose = function () {
    };
    GroupListSingleThreadLoader.prototype.load = function (grpNames) {
        if (this._arrGroupName != null) {
            throw new Error("暂不支持加载器重复使用");
        }
        this.start(grpNames);
    };
    GroupListSingleThreadLoader.prototype.start = function (grpNames) {
        this._arrGroupName = [];
        for (var _i = 0, grpNames_1 = grpNames; _i < grpNames_1.length; _i++) {
            var groupName = grpNames_1[_i];
            var items = RES.getGroupByName(groupName);
            if (null == items || 0 == items.length) {
                egret.log("\u52A0\u8F7D\u7684\u8D44\u6E90\u7EC4[" + groupName + "]\u6CA1\u6709\u53EF\u7528\u8D44\u6E90,\u5C06\u4E0D\u88AB\u52A0\u8F7D");
            }
            else {
                this._arrGroupName.push(groupName);
                this._totalItemsCount += items.length;
            }
        }
        this.loadNextGroup();
    };
    GroupListSingleThreadLoader.prototype.loadNextGroup = function () {
        if (this._loadedGroupsCount == this._arrGroupName.length) {
            this.allOver();
            return;
        }
        var groupName = this._arrGroupName[this._loadedGroupsCount++];
        var items = RES.getGroupByName(groupName);
        var resKeys = [];
        for (var i = 0; i < items.length; i++) {
            resKeys.push(items[i].name);
        }
        var resListLoader = new ResItemListLoader();
        resListLoader.data = groupName;
        resListLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onResListLoaderProgress, this);
        resListLoader.addEventListener(egret.Event.COMPLETE, this.onResListLoaderComplete, this);
        resListLoader.load(resKeys);
    };
    GroupListSingleThreadLoader.prototype.onResListLoaderProgress = function (e) {
        var resListLoader = e.currentTarget;
        this._loadedItemsCount++;
        // console.log(this._loadedItemsCount + "/" + this._totalItemsCount);
        this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.ITEM_LOADED, resListLoader.data, resListLoader.getLastLoaded()));
    };
    GroupListSingleThreadLoader.prototype.onResListLoaderComplete = function (e) {
        var resListLoader = e.currentTarget;
        resListLoader.removeEventListener(egret.ProgressEvent.PROGRESS, this.onResListLoaderProgress, this);
        resListLoader.removeEventListener(egret.Event.COMPLETE, this.onResListLoaderComplete, this);
        console.log("\u8D44\u6E90\u7EC4[" + resListLoader.data + "]\u52A0\u8F7D\u5B8C\u6BD5");
        this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.GROUP_LOADED, resListLoader.data));
        this.loadNextGroup();
    };
    GroupListSingleThreadLoader.prototype.allOver = function () {
        console.log("\u6240\u6709\u8D44\u6E90\u7EC4\u52A0\u8F7D\u5B8C\u6BD5");
        this.dispose();
        this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.COMPLETE));
    };
    return GroupListSingleThreadLoader;
}(egret.EventDispatcher));
__reflect(GroupListSingleThreadLoader.prototype, "GroupListSingleThreadLoader");
//# sourceMappingURL=GroupListSingleThreadLoader.js.map
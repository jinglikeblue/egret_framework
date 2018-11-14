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
 * 资源组列表加载器
 * 优点：多线程，最快的速度加载完需要资源
 * 缺点：不适合后台加载资源使用，会占用所有的加载线程
 */
var GroupListLoader = (function (_super) {
    __extends(GroupListLoader, _super);
    function GroupListLoader() {
        var _this = _super.call(this) || this;
        //已加载的资源组数量
        _this._loadedGroupsCount = 0;
        //已加载的资源数
        _this._loadedItemsCount = 0;
        //要加载的资源总数
        _this._totalItemsCount = 0;
        return _this;
    }
    Object.defineProperty(GroupListLoader.prototype, "loadedGroupsCount", {
        get: function () {
            return this._loadedGroupsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupListLoader.prototype, "totalGroupsCount", {
        //要加载的资源组总数
        get: function () {
            return this._arrGroupName.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupListLoader.prototype, "loadedItemsCount", {
        get: function () {
            return this._loadedItemsCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupListLoader.prototype, "totalItemsCount", {
        get: function () {
            return this._totalItemsCount;
        },
        enumerable: true,
        configurable: true
    });
    GroupListLoader.prototype.dispose = function () {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResGroupComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResGroupLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResItemLoadError, this);
    };
    GroupListLoader.prototype.load = function (grpNames) {
        if (this._arrGroupName != null) {
            throw new Error("暂不支持加载器重复使用");
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResGroupLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResItemLoadError, this);
        this.start(grpNames);
    };
    GroupListLoader.prototype.start = function (grpNames) {
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
    GroupListLoader.prototype.loadNextGroup = function () {
        if (this._loadedGroupsCount == this._arrGroupName.length) {
            //load all over
            this.allOver();
            return;
        }
        RES.loadGroup(this._arrGroupName[this._loadedGroupsCount]);
    };
    GroupListLoader.prototype.allOver = function () {
        // console.log(`所有资源组加载完毕`);
        this.dispose();
        this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.COMPLETE));
    };
    GroupListLoader.prototype.onResGroupComplete = function (e) {
        if (this._arrGroupName.indexOf(e.groupName) == -1) {
            return;
        }
        console.log("\u8D44\u6E90\u7EC4[" + e.groupName + "](" + this._totalItemsCount + ")\u52A0\u8F7D\u5B8C\u6BD5");
        this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.GROUP_LOADED, e.groupName));
        this._loadedGroupsCount++;
        this.loadNextGroup();
    };
    GroupListLoader.prototype.onResGroupLoadError = function (e) {
        if (this._arrGroupName.indexOf(e.groupName) == -1) {
            return;
        }
        console.log("\u8D44\u6E90\u7EC4[" + e.groupName + "]\u52A0\u8F7D\u51FA\u9519\uFF01");
        this._loadedGroupsCount++;
        this.loadNextGroup();
    };
    GroupListLoader.prototype.onResResourceProgress = function (e) {
        var loadedItem = e.resItem;
        if (loadedItem && this._arrGroupName.indexOf(loadedItem.groupName) == -1) {
            return;
        }
        this._loadedItemsCount++;
        // console.log(this._loadedItemsCount + "/" + this._totalItemsCount);
        this.dispatchEvent(new GroupListLoaderEvent(GroupListLoaderEvent.ITEM_LOADED, loadedItem.groupName, loadedItem.data));
    };
    GroupListLoader.prototype.onResItemLoadError = function (e) {
        console.log("\u8D44\u6E90\u9879[" + e.resItem.name + " in " + e.resItem.groupName + "]\u52A0\u8F7D\u51FA\u9519\uFF01");
    };
    return GroupListLoader;
}(egret.EventDispatcher));
__reflect(GroupListLoader.prototype, "GroupListLoader");
//# sourceMappingURL=GroupListLoader.js.map
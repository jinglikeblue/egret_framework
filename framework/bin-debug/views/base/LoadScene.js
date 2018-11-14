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
var LoadScene = (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        var _this = _super.call(this) || this;
        _this.skinName = LoadSceneSkin;
        return _this;
    }
    /**
     * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
     */
    LoadScene.prototype.onInit = function (data) {
        this._vo = data;
    };
    /**
     * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
     */
    LoadScene.prototype.onShow = function (data) {
        this.clearGLL();
        var gll = new GroupListLoader();
        gll.addEventListener(GroupListLoaderEvent.COMPLETE, this.onGroupListLoaderComplete, this);
        gll.addEventListener(GroupListLoaderEvent.ITEM_LOADED, this.onGroupListLoaderItemLoaded, this);
        gll.load(this._vo.groups);
        this._gll = gll;
    };
    /**
     * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
     */
    LoadScene.prototype.onDispose = function () {
        this.clearGLL();
    };
    LoadScene.prototype.setProgress = function (current, total) {
        this._bar.scrollRect = new egret.Rectangle(0, 0, this._bar.width * current / total, this._bar.height);
        this.lbProgress.text = ((current / total * 100) >> 0) + '%';
    };
    LoadScene.prototype.clearGLL = function () {
        if (this._gll) {
            this._gll.removeEventListener(GroupListLoaderEvent.COMPLETE, this.onGroupListLoaderComplete, this);
            this._gll.removeEventListener(GroupListLoaderEvent.ITEM_LOADED, this.onGroupListLoaderItemLoaded, this);
            this._gll = null;
        }
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    LoadScene.prototype.onGroupListLoaderComplete = function (e) {
        var gll = e.currentTarget;
        gll.removeEventListener(GroupListLoaderEvent.COMPLETE, this.onGroupListLoaderComplete, this);
        gll.removeEventListener(GroupListLoaderEvent.ITEM_LOADED, this.onGroupListLoaderItemLoaded, this);
        //资源准备好了，打开界面
        SceneMgr.change(this._vo.toSceneName, this._vo.data);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    LoadScene.prototype.onGroupListLoaderItemLoaded = function (e) {
        var gll = e.currentTarget;
        this.setProgress(gll.loadedItemsCount, gll.totalItemsCount);
    };
    return LoadScene;
}(eui.Component));
__reflect(LoadScene.prototype, "LoadScene", ["IView", "egret.IEventDispatcher"]);
//# sourceMappingURL=LoadScene.js.map
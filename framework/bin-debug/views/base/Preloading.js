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
 * 预加载资源的加载条,显示该对象时，游戏中的资源还未加载。
 */
var Preloading = (function (_super) {
    __extends(Preloading, _super);
    function Preloading() {
        var _this = _super.call(this) || this;
        _this._txt = new egret.TextField();
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        return _this;
    }
    /**
     * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
     */
    Preloading.prototype.onInit = function (data) {
    };
    /**
     * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
     */
    Preloading.prototype.onShow = function (data) {
        this.graphics.beginFill(0, 1);
        this.graphics.drawRect(0, 0, 1280, 720);
        this.graphics.endFill();
        var rect = RectUtil.createRectShape(800, 50, 10, 0xFFFFFF, -1);
        this.addChild(rect);
        rect.x = (1280 - rect.width) >> 1;
        rect.y = 400;
        rect = RectUtil.createRectShape(800, 50, 0, 0, 0xFFFFFF);
        rect.x = (1280 - rect.width) >> 1;
        rect.y = 400;
        this.addChild(rect);
        this._bar = rect;
        this._bar.scaleX = 0;
        this._txt.x = 400;
        this._txt.y = 300;
        this._txt.width = 500;
        this._txt.height = 100;
        this._txt.size = 60;
        this.addChild(this._txt);
        this._txt.text = 'Loading......';
        this.preload();
    };
    /**
     * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
     */
    Preloading.prototype.onDispose = function () {
    };
    Preloading.prototype.setProgress = function (current, total) {
        var k = current / total;
        this._bar.scaleX = k;
        this._txt.text = "Loading " + ((k * 100) >> 0) + "%";
    };
    Preloading.prototype.loadedOver = function () {
        NoticeManager.sendNotice(new GameNotice(GameNotice.PRELOAD_OVER));
    };
    Preloading.prototype.preload = function () {
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var configPath = "resource/default.res.json";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            configPath += "?version=" + DC.startParams.ver;
        }
        RES.loadConfig(configPath, "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Preloading.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var path = "resource/default.thm.json";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            path += "?version=" + DC.startParams.ver;
        }
        var theme = new eui.Theme(path, this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Preloading.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Preloading.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    Preloading.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.loadedOver();
        }
    };
    /**
 * 资源组加载出错
 *  The resource group loading failed
 */
    Preloading.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Preloading.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Preloading.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            NativeCaller.egretStart();
            this.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    return Preloading;
}(egret.Sprite));
__reflect(Preloading.prototype, "Preloading", ["IView", "egret.IEventDispatcher"]);
//# sourceMappingURL=Preloading.js.map
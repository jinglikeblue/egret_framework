/**
 * 预加载资源的加载条,显示该对象时，游戏中的资源还未加载。
 */
class Preloading extends egret.Sprite implements IView {

    private _txt: egret.TextField = new egret.TextField();
    private _bar: egret.Shape;

    public constructor() {
        super();
    }

    /**
	 * 当显示对象被实例化后该方法被调用。在该方法中可以预备视图所需要的数据。
	 */
    public onInit(data: any): void {

    }

	/**
	 * 当显示对象被添加到舞台上后被调用。在该方法中对UI进行初始化，例如监听按键点击等。
	 */
    public onShow(data: any): void {
        this.graphics.beginFill(0, 1);
        this.graphics.drawRect(0, 0, 1280, 720);
        this.graphics.endFill();

        let rect = RectUtil.createRectShape(800, 50, 10, 0xFFFFFF, -1);
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
    }

	/**
	 * 当显示对象被销毁时调用。在该方法中进行内存回收工作或其它。
	 */
    public onDispose(): void {

    }

    public setProgress(current: number, total: number): void {
        let k = current / total;
        this._bar.scaleX = k;
        this._txt.text = `Loading ${(k * 100) >> 0}%`;
    }

    private loadedOver(): void {
        NoticeManager.sendNotice(new GameNotice(GameNotice.PRELOAD_OVER));
    }

    private preload(): void {
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        let configPath = "resource/default.res.json";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            configPath += `?version=${DC.startParams.ver}`;
        }
        RES.loadConfig(configPath, "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let path = "resource/default.thm.json";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            path += `?version=${DC.startParams.ver}`;
        }
        let theme = new eui.Theme(path, this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.loadedOver();
        }
    }

    /**
 * 资源组加载出错
 *  The resource group loading failed
 */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            NativeCaller.egretStart();
            this.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
}

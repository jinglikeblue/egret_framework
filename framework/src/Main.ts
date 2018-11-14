class Main extends eui.UILayer {
    protected createChildren(): void {
        super.createChildren();
        if (window["startParams"]) {
            DC.startParams = window["startParams"];
        }

        //引擎配置
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
        egret.TextField.default_fontFamily = "黑体";
        RES.setMaxLoadingThread(8);

        //框架初始化
        DC.root = this;
        DC.stage = this.stage;
        DC.gameStartUTC = new Date().getTime();
        this.registScenes();
        this.registWindows();
        this.registMsgCachers();

        //进入预加载场景
        NoticeManager.addNoticeAction(GameNotice.PRELOAD_OVER, this.onPreloadOverNotice, this);
        GSceneMgr.change(SceneName.PRELOADING);
    }

    private onPreloadOverNotice(n: GameNotice): void {
        NoticeManager.removeNoticeAction(GameNotice.PRELOAD_OVER, this.onPreloadOverNotice, this);
        this.initGame();
    }

    //注册场景
    private registScenes(): void {
        GSceneMgr.init(this);
        GSceneMgr.regist(SceneName.PRELOADING, Preloading, null);
        GSceneMgr.regist(SceneName.LOADING, LoadScene, null);
        GSceneMgr.regist(SceneName.DEMO, DemoScene, ["demo_scene"]);
    }

    //注册窗口
    private registWindows(): void {
        GWindowMgr.init(this);
        GWindowMgr.regist(WindowName.LOADING, LoadWin, null);
        GWindowMgr.regist(WindowName.MSG_BOX, MsgWin, null);
        GWindowMgr.regist(WindowName.WAIT, WaitWin, null);
        GWindowMgr.regist(WindowName.DEMO, DemoWin, ["demo_win"]);
        GWindowMgr.regist(WindowName.DEMO_WS, DemoWebSocket, null);
        // GWindowMgr.regist(WindowName.NET_REQUESTING, LoadWin, null);
    }

    //注册消息捕获器
    private registMsgCachers(): void {

    }

    /**
     * 从这里开始初始化游戏
     */
    private initGame(): void {
        this.initConfigs();

        this.startBackgroundLoader();
        DeviceUtil.startDevice();

        GSceneMgr.change(SceneName.DEMO);
    }

    /**
     * 初始化配置文件
     */
    private initConfigs(): void {
        DC.setting = RES.getRes("setting_json");
    }

    /**
     * 启动后台加载器线程
     */
    private startBackgroundLoader(): void {
        let groups = DC.setting.bgLoadGroups;
        new GroupListSingleThreadLoader().load(groups);
    }
}

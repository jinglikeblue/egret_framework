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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
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
    };
    Main.prototype.onPreloadOverNotice = function (n) {
        NoticeManager.removeNoticeAction(GameNotice.PRELOAD_OVER, this.onPreloadOverNotice, this);
        this.initGame();
    };
    //注册场景
    Main.prototype.registScenes = function () {
        GSceneMgr.init(this);
        GSceneMgr.regist(SceneName.PRELOADING, Preloading, null);
        GSceneMgr.regist(SceneName.LOADING, LoadScene, null);
        GSceneMgr.regist(SceneName.DEMO, DemoScene, ["demo_scene"]);
    };
    //注册窗口
    Main.prototype.registWindows = function () {
        GWindowMgr.init(this);
        GWindowMgr.regist(WindowName.LOADING, LoadWin, null);
        GWindowMgr.regist(WindowName.MSG_BOX, MsgWin, null);
        GWindowMgr.regist(WindowName.WAIT, WaitWin, null);
        GWindowMgr.regist(WindowName.DEMO, DemoWin, ["demo_win"]);
        GWindowMgr.regist(WindowName.DEMO_WS, DemoWebSocket, null);
        // GWindowMgr.regist(WindowName.NET_REQUESTING, LoadWin, null);
    };
    //注册消息捕获器
    Main.prototype.registMsgCachers = function () {
    };
    /**
     * 从这里开始初始化游戏
     */
    Main.prototype.initGame = function () {
        this.initConfigs();
        this.startBackgroundLoader();
        DeviceUtil.startDevice();
        GSceneMgr.change(SceneName.DEMO);
    };
    /**
     * 初始化配置文件
     */
    Main.prototype.initConfigs = function () {
        DC.setting = RES.getRes("setting_json");
    };
    /**
     * 启动后台加载器线程
     */
    Main.prototype.startBackgroundLoader = function () {
        var groups = DC.setting.bgLoadGroups;
        new GroupListSingleThreadLoader().load(groups);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map
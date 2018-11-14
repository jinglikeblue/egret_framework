var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景管理器
 */
var SceneMgr = (function () {
    function SceneMgr() {
    }
    SceneMgr.nowViewName = function () {
        return this._nowViewName;
    };
    /**
     * 初始化场景管理器(必须)
     */
    SceneMgr.init = function (stage) {
        this._stage = stage;
    };
    /**
     * 注册一个场景
     */
    SceneMgr.regist = function (viewName, cls) {
        this._viewClsMap[viewName] = cls;
    };
    /**
     * 切换场景
     * @param viewName 切换的场景的名称
     * @param data 传递到场景的数据
     */
    SceneMgr.change = function (viewName, data) {
        if (data === void 0) { data = null; }
        var cls = this._viewClsMap[viewName];
        if (null == cls) {
            egret.error("\u5207\u6362\u7684\u573A\u666F[" + viewName + "]\u4E0D\u5B58\u5728");
            return;
        }
        if (this._nowViewName != null) {
            //将当前界面存入到面包屑中
            this.recordCrumb(this._nowViewName);
        }
        this.switchScene(viewName, data);
    };
    /**
     * 回到上一次的场景
     */
    SceneMgr.revert = function (data) {
        if (data === void 0) { data = null; }
        var viewName = this._recentScenes.shift();
        this.switchScene(viewName, data);
    };
    SceneMgr.switchScene = function (viewName, data) {
        if (data === void 0) { data = null; }
        var cls = this._viewClsMap[viewName];
        if (this._nowView != null) {
            this._nowView.onDispose();
            var t = this._nowView;
            this._stage.removeChild(this._nowView);
        }
        var newView = new cls();
        newView.onInit(data);
        this._stage.addChildAt(newView, 0);
        this._nowView = newView;
        this._nowViewName = viewName;
        newView.onShow(data);
    };
    /**
     * 记录场景轨迹
     */
    SceneMgr.recordCrumb = function (viewName) {
        if (this._recentScenes.length > 0 && this._recentScenes[0] == viewName) {
            //之前刚插入的场景不再重复插入
            return;
        }
        this._recentScenes.unshift(viewName);
        if (this._recentScenes.length > 20) {
            this._recentScenes.length = 10;
        }
    };
    //当前视图对象
    SceneMgr._nowView = null;
    //当前视图名称
    SceneMgr._nowViewName = null;
    //视图映射
    SceneMgr._viewClsMap = {};
    /**
     * 最近打开的场景名称的存储。
     * 最后进入的场景总是放到数组最前端
     * 只保留最近10次的场景信息
     */
    SceneMgr._recentScenes = [];
    return SceneMgr;
}());
__reflect(SceneMgr.prototype, "SceneMgr");
//# sourceMappingURL=SceneMgr.js.map
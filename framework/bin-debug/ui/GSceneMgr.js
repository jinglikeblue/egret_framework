var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GSceneMgr = (function () {
    function GSceneMgr() {
    }
    /**
     * 初始化场景管理器(必须)
     */
    GSceneMgr.init = function (stage) {
        SceneMgr.init(stage);
    };
    /**
     * 注册一个场景
     */
    GSceneMgr.regist = function (viewName, cls, dependGroupList) {
        SceneMgr.regist(viewName, cls);
        this._dependGroupList[viewName] = dependGroupList;
    };
    /**
     * 切换场景
     * @param viewName 切换的场景的名称
     * @param data 传递到场景的数据
     */
    GSceneMgr.change = function (viewName, data) {
        if (data === void 0) { data = null; }
        //检查依赖的资源
        var groups = this._dependGroupList[viewName];
        if (null == groups || 0 == groups.length) {
            //并没有依赖的资源，直接切换
            SceneMgr.change(viewName, data);
            return;
        }
        var vo = new SceneLoadingVO();
        vo.fromSceneName = SceneMgr.nowViewName();
        vo.toSceneName = viewName;
        vo.data = data;
        vo.groups = groups;
        SceneMgr.change(SceneName.LOADING, vo);
    };
    //资源组依赖表
    GSceneMgr._dependGroupList = {};
    return GSceneMgr;
}());
__reflect(GSceneMgr.prototype, "GSceneMgr");
//# sourceMappingURL=GSceneMgr.js.map
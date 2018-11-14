var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GWindowMgr = (function () {
    function GWindowMgr() {
    }
    /**
     * 初始化场景管理器(必须)
     */
    GWindowMgr.init = function (stage) {
        WindowMgr.init(stage);
    };
    /**
     * 注册一个场景
     */
    GWindowMgr.regist = function (viewName, cls, dependGroupList) {
        WindowMgr.regist(viewName, cls);
        this._dependGroupList[viewName] = dependGroupList;
    };
    /**
     * 使用预加载方式打开窗口
     * @param viewName 打开窗口的名称
     * @param data 传递到打开窗口的数据。默认为null
     * @param blur 是否在窗口下显示遮罩。该值只确定是否在窗口下可视的显示遮罩。并不影响触摸事件的向下传递。默认为true
     * @param closeOthers 是否在打开窗口同时关闭其它所有已打开的窗口。默认为false
     * @returns 返回打开窗口的实例化对象
     */
    GWindowMgr.open = function (viewName, data, blur, closeOthers) {
        if (data === void 0) { data = null; }
        if (blur === void 0) { blur = true; }
        if (closeOthers === void 0) { closeOthers = false; }
        //检查依赖的资源
        var groups = this._dependGroupList[viewName];
        if (null == groups || groups.length == 0) {
            //直接加载
            WindowMgr.open(viewName, data, blur, closeOthers);
            return;
        }
        var vo = new WindowLoadingVO();
        vo.winName = viewName;
        vo.data = data;
        vo.blur = blur;
        vo.closeOther = closeOthers;
        vo.groups = groups;
        WindowMgr.open(WindowName.LOADING, vo);
    };
    /**
     * 关闭对应的窗口
     * @param target 要关闭的对象
     */
    GWindowMgr.close = function (target) {
        WindowMgr.close(target);
    };
    /**
     * 关闭所有窗口
     */
    GWindowMgr.closeAll = function () {
        WindowMgr.closeAll();
    };
    //资源组依赖表
    GWindowMgr._dependGroupList = {};
    return GWindowMgr;
}());
__reflect(GWindowMgr.prototype, "GWindowMgr");
//# sourceMappingURL=GWindowMgr.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WindowMgr = (function () {
    function WindowMgr() {
    }
    /**
     * 初始化管理器(必须)
     */
    WindowMgr.init = function (stage) {
        this._stage = stage;
        this._blur = RectUtil.createRectShape(stage.width, stage.height, 0, -1, 0);
        this._blur.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBlurTouchTap, this);
        this._blur.touchEnabled = true;
    };
    WindowMgr.resizeBlur = function () {
        this._blur.graphics.beginFill(0, 1);
        this._blur.graphics.drawRect(0, 0, this._stage.width, this._stage.height);
        this._blur.graphics.endFill();
    };
    WindowMgr.onBlurTouchTap = function (e) {
        NoticeManager.sendNoticeQuick(Notice.WINDOW_BLUR_TOUCHED, this._nowWindows[this._nowWindows.length - 1]);
    };
    /**
     * 注册一个场景
     */
    WindowMgr.regist = function (viewName, cls) {
        this._viewClsMap[viewName] = cls;
    };
    /**
     * 打开窗口
     * @param viewName 打开窗口的名称
     * @param data 传递到打开窗口的数据。默认为null
     * @param blur 是否在窗口下显示遮罩。该值只确定是否在窗口下可视的显示遮罩。并不影响触摸事件的向下传递。默认为true
     * @param closeOthers 是否在打开窗口同时关闭其它所有已打开的窗口。默认为false
     * @returns 返回打开窗口的实例化对象
     */
    WindowMgr.open = function (viewName, data, blur, closeOthers) {
        if (data === void 0) { data = null; }
        if (blur === void 0) { blur = true; }
        if (closeOthers === void 0) { closeOthers = false; }
        var cls = this._viewClsMap[viewName];
        if (null == cls) {
            egret.error("\u6253\u5F00\u7684\u7A97\u53E3[" + viewName + "]\u4E0D\u5B58\u5728");
            return;
        }
        if (closeOthers) {
            this.closeAll();
        }
        this._stage.addChild(this._blur);
        this.resizeBlur();
        this._blur.alpha = blur ? 0.7 : 0;
        var newView = new cls();
        newView.onInit(data);
        this._stage.addChild(newView);
        var lastIdx = this._nowWindows.length;
        this._nowWindows.push(newView);
        this._blurInfo[lastIdx] = blur;
        newView.onShow(data);
        return newView;
    };
    /**
     * 关闭对应的窗口
     * @param target 要关闭的对象
     */
    WindowMgr.close = function (target) {
        if (null == target) {
            return;
        }
        var idx = this._nowWindows.indexOf(target);
        if (idx > -1) {
            //从列表移除
            this._nowWindows.splice(idx, 1);
            this._blurInfo.splice(idx, 1);
            target.onDispose();
            this._stage.removeChild(target);
            delete this._blurInfo[target];
        }
        var windowCount = this._nowWindows.length;
        if (windowCount > 0) {
            this._stage.addChild(this._blur);
            var topWindow = this._nowWindows[windowCount - 1];
            this._stage.swapChildren(this._blur, topWindow);
            this._blur.alpha = this._blurInfo[windowCount - 1] ? 0.7 : 0;
        }
        else if (0 == windowCount && null != this._blur.parent) {
            this._blur.parent.removeChild(this._blur);
        }
    };
    /**
     * 关闭所有窗口
     */
    WindowMgr.closeAll = function () {
        var size = this._nowWindows.length;
        while (--size > -1) {
            var target = this._nowWindows[size];
            target.onDispose();
            this._stage.removeChild(target);
        }
        this._nowWindows.length = 0;
        if (this._blur.parent != null) {
            this._blur.parent.removeChild(this._blur);
        }
    };
    //当前视图对象列表，最后打开的窗口在数组末位
    WindowMgr._nowWindows = [];
    //视图映射
    WindowMgr._viewClsMap = {};
    //模糊背景
    WindowMgr._blur = null;
    //遮挡信息
    WindowMgr._blurInfo = [];
    return WindowMgr;
}());
__reflect(WindowMgr.prototype, "WindowMgr");
//# sourceMappingURL=WindowMgr.js.map
var GUIManager = (function () {
    function GUIManager() {
    }
    /**
    * 注册舞台
    */
    GUIManager.init = function (stage, sceneLoading, windowLoading) {
        if (sceneLoading === void 0) { sceneLoading = null; }
        if (windowLoading === void 0) { windowLoading = null; }
        var uiStage = new egret.gui.UIStage();
        stage.addChild(uiStage);
        GUIManager.uiStage = uiStage;
        GUIManager._sceneLoading = sceneLoading;
        GUIManager._windowLoading = windowLoading;
    };
    /**
    * 显示场景(场景是唯一的，不能在舞台上叠加，新的场景会移除旧的场景
    */
    GUIManager.showScene = function (scene) {
        if (GUIManager._scene != null) {
            GUIManager.uiStage.removeElement(GUIManager._scene);
            GUIManager._scene.dispose();
        }
        if (GUIManager._sceneLoading != null) {
            egret.gui.PopUpManager.addPopUp(GUIManager._sceneLoading, true, true);
            var onCreationComplete = function () {
                scene.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
                egret.gui.PopUpManager.removePopUp(GUIManager._sceneLoading);
            };
            scene.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
        }
        GUIManager.uiStage.addElement(scene);
        GUIManager._scene = scene;
    };
    /**
    * 显示窗口（窗口会移除叠加在舞台上）
    */
    GUIManager.showWindow = function (window, modal, center) {
        if (modal === void 0) { modal = true; }
        if (center === void 0) { center = true; }
        var windows = GUIManager._windows;
        var index = windows.indexOf(window);
        if (index > -1) {
            GUIManager.closeWindowIndex(index);
        }
        egret.gui.PopUpManager.addPopUp(window, modal, center);
        GUIManager._windows.push(window);
        if (window.initialized == false && GUIManager._windowLoading != null) {
            egret.gui.PopUpManager.addPopUp(GUIManager._windowLoading, true, true);
            var onCreationComplete = function () {
                window.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
                //egret.gui.PopUpManager.removePopUp(GUIManager._windowLoading);
            };
            window.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
        }
    };
    /**
    * 通过索引关闭窗口
    */
    GUIManager.closeWindowIndex = function (index) {
        if (index === void 0) { index = Number.MAX_VALUE; }
        if (index < 0) {
            index = 0;
        }
        else if (index >= GUIManager._windows.length) {
            index = GUIManager._windows.length - 1;
        }
        var window = GUIManager._windows[index];
        GUIManager._windows.splice(index, 1);
        egret.gui.PopUpManager.removePopUp(window);
        window.dispose();
    };
    GUIManager.closeWindow = function (window) {
        var index = GUIManager._windows.indexOf(window);
        if (index > -1) {
            GUIManager.closeWindowIndex(index);
        }
    };
    GUIManager.closeAllWindow = function () {
        var len = GUIManager._windows.length;
        while (--len > -1) {
            var window = GUIManager._windows[len];
            egret.gui.PopUpManager.removePopUp(window);
            window.dispose();
        }
        GUIManager._windows.length = 0;
    };
    GUIManager.uiStage = null;
    GUIManager._windows = [];
    GUIManager._scene = null;
    GUIManager._sceneLoading = null;
    GUIManager._windowLoading = null;
    return GUIManager;
})();
//# sourceMappingURL=GUIManager.js.map
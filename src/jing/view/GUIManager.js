var GUIManager = (function () {
    function GUIManager() {
    }
    GUIManager.init = function (stage, sceneLoading, windowLoading) {
        if (sceneLoading === void 0) { sceneLoading = null; }
        if (windowLoading === void 0) { windowLoading = null; }
        var uiStage = new egret.gui.UIStage();
        stage.addChild(uiStage);
        GUIManager.uiStage = uiStage;
        GUIManager._sceneLoading = sceneLoading;
        GUIManager._windowLoading = windowLoading;
    };
    GUIManager.showScene = function (scene) {
        if (GUIManager._scene != null) {
            GUIManager.uiStage.removeElement(GUIManager._scene);
        }
        if (GUIManager._sceneLoading != null) {
            GUIManager.showWindow(GUIManager._sceneLoading, true, true);
            var onCreationComplete = function () {
                scene.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
                GUIManager.closeWindow(GUIManager._sceneLoading);
            };
            scene.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
        }
        GUIManager.uiStage.addElement(scene);
        GUIManager._scene = scene;
    };
    GUIManager.showWindow = function (window, modal, center) {
        var windows = GUIManager._windows;
        var index = windows.indexOf(window);
        if (index > -1) {
            GUIManager.closeWindowIndex(index);
        }
        egret.gui.PopUpManager.addPopUp(window, modal, center);
        GUIManager._windows.push(window);
    };
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
            egret.gui.PopUpManager.removePopUp(GUIManager._windows[len]);
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

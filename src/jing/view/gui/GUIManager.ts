﻿class GUIManager
{
    public static uiStage: egret.gui.UIStage = null;

    private static _windows: ASkinCom[] = [];

    private static _scene: ASkinCom = null;

    private static _sceneLoading: ASkinCom = null;
    private static _windowLoading: ASkinCom = null;

    /**
    * 注册舞台
    */
    public static init(stage: egret.Stage, sceneLoading: ASkinCom = null, windowLoading: ASkinCom = null)
    {
        var uiStage:egret.gui.UIStage = new egret.gui.UIStage();
        stage.addChild(uiStage);
        GUIManager.uiStage = uiStage;
        GUIManager._sceneLoading = sceneLoading;
        GUIManager._windowLoading = windowLoading;
    }

    /**
    * 显示场景(场景是唯一的，不能在舞台上叠加，新的场景会移除旧的场景
    */
    public static showScene(scene: ASkinCom)
    {       
        if (GUIManager._scene != null)
        {            
            GUIManager.uiStage.removeElement(GUIManager._scene);
            GUIManager._scene.dispose();
        }

        if (GUIManager._sceneLoading != null)
        {            
            egret.gui.PopUpManager.addPopUp(GUIManager._sceneLoading, true, true);

            var onCreationComplete = function (): void
            {
                scene.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
                egret.gui.PopUpManager.removePopUp(GUIManager._sceneLoading);
            };

            scene.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
        }

        GUIManager.uiStage.addElement(scene);
        GUIManager._scene = scene;
    }

    /**
    * 显示窗口（窗口会移除叠加在舞台上）
    */ 
    public static showWindow(window: ASkinCom, modal:boolean = true, center:boolean = true):void
    {
        var windows: egret.gui.UIComponent[] = GUIManager._windows;
        var index: number = windows.indexOf(window);
        if (index > -1)
        {
            GUIManager.closeWindowIndex(index);
        }
        egret.gui.PopUpManager.addPopUp(window, modal, center);
        GUIManager._windows.push(window);

        if (window.initialized == false && GUIManager._windowLoading != null)
        {
            egret.gui.PopUpManager.addPopUp(GUIManager._windowLoading, true, true);

            var onCreationComplete = function (): void
            {
                window.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
                //egret.gui.PopUpManager.removePopUp(GUIManager._windowLoading);
            };

            window.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, onCreationComplete, this);
        }
    }

    /**
    * 通过索引关闭窗口
    */
    public static closeWindowIndex(index: number = Number.MAX_VALUE):void
    {
        if (index < 0)
        {
            index = 0;
        }
        else if (index >= GUIManager._windows.length)
        {
            index = GUIManager._windows.length - 1;
        }

        var window:ASkinCom = GUIManager._windows[index];
        GUIManager._windows.splice(index, 1);
        egret.gui.PopUpManager.removePopUp(window);
        window.dispose();
    }

    public static closeWindow(window: ASkinCom): void
    {
        var index: number = GUIManager._windows.indexOf(window);
        if (index > -1)
        {
            GUIManager.closeWindowIndex(index);
        }
    }

    public static closeAllWindow(): void
    {
        var len: number = GUIManager._windows.length;
        while (--len > -1)
        {
            var window: ASkinCom = GUIManager._windows[len];
            egret.gui.PopUpManager.removePopUp(window);
            window.dispose();
        }
        GUIManager._windows.length = 0;
    }
}
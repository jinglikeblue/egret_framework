﻿class Window3 extends ASkinCom
{
    public bg: egret.gui.Rect;

    public constructor()
    {
        super(skins.window.Window3Skin);
    }

    public childrenCreated(): void
    {
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e): void
        {
            GUIManager.closeWindow(this)
        }, this);
    }
}  
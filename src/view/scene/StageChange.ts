class StageChange extends ASkinCom
{
    public btnBack: egret.gui.Button;

    public constructor()
    {
        super(skins.scene.StageChangeSkin);
    }

    public childrenCreated(): void
    {
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: any): void
        {
            GUIManager.showScene(new Hall(null));
        }, this);
    }
} 
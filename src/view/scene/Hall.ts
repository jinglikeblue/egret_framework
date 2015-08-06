class Hall extends ASkinCom
{
    public btnStart: egret.gui.Button;
    public btnAdd: egret.gui.Button;
    public btnReduce: egret.gui.Button;

    public constructor(data:any)
    {
        super(skins.scene.HallSkin, data);    
    }

    public init(): void
    {
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: any): void
        {
            GUIManager.closeAllWindow();
            GUIManager.showScene(new StageChange());
        }, this);

        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: any): void
        {
            GUIManager.showWindow(new Window1(), true, true);
        }, this);

        this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: any): void
        {
            GUIManager.closeWindowIndex();
        }, this);
    }
}
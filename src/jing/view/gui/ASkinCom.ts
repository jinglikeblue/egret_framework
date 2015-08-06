/**
* 
*/
class ASkinCom extends egret.gui.SkinnableComponent
{
    //附带的参数
    public data: any;

    public constructor(skin:any, data:any = null)
    {        
        super();
        this.skinName = skin;
        this.data = data;
    }

    public childrenCreated(): void
    {
        this.init();
        this.addListeners();
    }

    public init(): void
    {

    }

    public addListeners(): void
    {

    }

    public removeListeners(): void
    {

    }

    public dispose(): void
    {
        this.removeListeners();
    }
} 
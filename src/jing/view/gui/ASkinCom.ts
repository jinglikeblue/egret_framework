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
        //重写该代码来完成初始化
    }

    public addListeners(): void
    {
        //重写代码来实现监听
    }

    public removeListeners(): void
    {
        //重写代码来释放监听
    }

    public dispose(): void
    {
        this.removeListeners();
    }
} 
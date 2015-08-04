/**
* 轻量级的序列图工具
*/
class Strip extends egret.Bitmap
{
    //纹理集合
    private _textures: egret.Texture[] = null;
    //纹理间隔
    private _interval: number = 0;
    //下次切换纹理的时间
    private _changeTime: number = 0;
    //当前纹理索引
    private _tIndex: number = 0;
    //是否循环播放
    private _loop: boolean = false;

    /**
    * 
    */
    public constructor(textures: egret.Texture[], fps: number, loop:boolean = false)
    {
        super();

        this._textures = textures;
        this._interval = (1000 / fps) >> 0;   
        this._changeTime = 0;
        this._tIndex = -1;    
        this._loop = loop;
        this.anchorX = this.anchorY = 0.5;

        this.addListeners();
    }

    private addListeners(): void
    {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
    }

    private removeListeners(): void
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    private addedToStageHandler(e: egret.Event): void
    {
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    private enterFrameHandler(e: egret.Event): void
    {        
        var now: number = egret.getTimer();
        if (now >= this._changeTime)
        {
            this.next();
            this._changeTime = now + this._interval;
        }
       
    }

    //切换到下一帧
    private next():void
    {
        this._tIndex++;
        if (this._tIndex >= this._textures.length)
        {
            if (this._loop)
            {
                this._tIndex = 0;
            }
            else
            {
                this.dispatchEventWith("strip_end");
                this.dispose();
                return;
            }
        }

        this.texture = this._textures[this._tIndex];        
    }

    public dispose(): void
    {
        this.removeListeners();
        if (null != this.parent)
        {
            this.parent.removeChild(this);
        }
    }
}
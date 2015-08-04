class AudioDevice {

    private static _soundDic: any = {};    
    private static _names: string[] = null;
    private static _stage: egret.Stage = null;
    private static _onPrepFun: Function = null;
    private static _bgm: egret.Sound = null;

    /**
    * 在第一次捕获到点击事件时，预加载声音文件，用这个的好处是第一次准备好以后，可以在IOS或ANDROID中无点击事件时播放声音
    */
    public static prep(names: string[], stage: egret.Stage, onPrep:Function = null): void {
        if (stage != null && names != null) {
            this._names = names;
            this._stage = stage;
            this._onPrepFun = onPrep;
            this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);
        }
    } 

    private static prepTriggered(): void {

        this._stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);

        var names: string[] = this._names;
        var count: number = names.length;
        for (var i: number = 0; i < names.length; i++) {
            var name: string = names[i];
            if (null == this._soundDic[name]) {
                var sound: egret.Sound = AudioDevice.getSound(name);
                sound.play();
                sound.pause();
                this._soundDic[name] = sound;
            }
        }     

        if (this._onPrepFun != null) {
            this._onPrepFun.call(null);
        }   
    }
    
    

    /**
    * 播放BGM
    */
    public static playBGM(name: string): egret.Sound
    {
        if (this._bgm != null)
        {
            this._bgm.pause();
        }
        var sound: egret.Sound = AudioDevice.getSound(name);
        sound.type = egret.Sound.MUSIC;
        sound.play(true);
        this._bgm = sound;
        return sound;
    }

    /**
    * 播放音效
    */
    public static playEffect(name: string): egret.Sound {
        var sound: egret.Sound = AudioDevice.getSound(name);
        sound.play();        
        return sound;
    }

    /**
    * 暂停指定的音乐
    */
    public static pause(name: string): egret.Sound {
        var sound: egret.Sound = this._soundDic[name];
        if (sound) {
            sound.pause();
        }
        return sound;
    }

    private static getSound(name: string): egret.Sound {

        var sound: egret.Sound = this._soundDic[name];
        if (null == sound) {
            this._soundDic[name] = RES.getRes(name);
            sound = AudioDevice.getSound(name);
        }
        return sound;
    }
}
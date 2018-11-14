class AudioDevice {
    public static effectEnable: boolean = true;
    public static bgmEnable: boolean = true;

    //背景音名称
    private static _bgmName: string;
    //背景音音轨
    private static _bgmChannel: egret.SoundChannel;
    //正在播放的音效
    private static _playingEffect: egret.SoundChannel[] = [];

    /**
    * 播放BGM
    */
    public static playBGM(name: string, volume: number = 1): void {
        if (false == this.bgmEnable) {
            return;
        }

        if (this._bgmName == name && this._bgmChannel != null) {
            return;
        }
        this._bgmName = name;

        //停止之前的背景音乐
        if (null != this._bgmChannel) {
            this._bgmChannel.stop();
            this._bgmChannel = null;
        }

        let sound = RES.getRes(name) as egret.Sound;
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            this._bgmChannel = sound.play(0, 0);
            this._bgmChannel.volume = volume;
        }
        else {
            //背景音乐还没加载到，监控
            RES.getResAsync(name, function (data: any, key: string): void {
                if (this._bgmName == key) {
                    this._bgmName = null;
                    this.playBGM(key);
                }
            }, this);
        }
    }

    public static changeBgmVolume(volume: number): void {
        if (this._bgmChannel == null) {
            return;
        }

        if (volume > 1) {
            volume = 1;
        }
        else if (volume < 0) {
            volume = 0;
        }

        this._bgmChannel.volume = volume;
    }

    public static stopBGM(): void {
        if (null != this._bgmChannel) {
            this._bgmChannel.stop();
            this._bgmChannel = null;
            this._bgmName = null;
        }
    }

    public static pauseBGM(): void {
        if (null != this._bgmChannel) {
            this._bgmChannel.stop();
            this._bgmChannel = null;
        }
    }

    public static continueBGM(): void {
        if (null != this._bgmName && null == this._bgmChannel) {
            let bgName = this._bgmName;
            this.playBGM(bgName);
        }
    }

    /**
     * 播放音效
     */
    public static playEffect(name: string, volume: number = 1): void {
        if (false == this.effectEnable) {
            return;
        }
        let sound = RES.getRes(name) as egret.Sound;
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            let channel = sound.play(0, 1);
            channel.volume = volume;
            channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onEffectComplete, this);
            this._playingEffect.push(channel);
        }
        else if (RES.hasRes(name)) {
            RES.getResAsync(name, function (data, key): void {
                egret.log(`音效[${key}]加载完毕`)
            }, this);
        }
    }

    private static onEffectComplete(e: egret.Event): void {
        let channel: egret.SoundChannel = e.currentTarget;
        for (let i = 0; i < this._playingEffect.length; i++) {
            if (this._playingEffect[i] == channel) {
                this._playingEffect.splice(i, 1);
                break;
            }
        }
    }
}
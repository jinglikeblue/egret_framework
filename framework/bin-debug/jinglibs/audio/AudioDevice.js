var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AudioDevice = (function () {
    function AudioDevice() {
    }
    /**
    * 播放BGM
    */
    AudioDevice.playBGM = function (name, volume) {
        if (volume === void 0) { volume = 1; }
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
        var sound = RES.getRes(name);
        if (sound) {
            sound.type = egret.Sound.MUSIC;
            this._bgmChannel = sound.play(0, 0);
            this._bgmChannel.volume = volume;
        }
        else {
            //背景音乐还没加载到，监控
            RES.getResAsync(name, function (data, key) {
                if (this._bgmName == key) {
                    this._bgmName = null;
                    this.playBGM(key);
                }
            }, this);
        }
    };
    AudioDevice.changeBgmVolume = function (volume) {
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
    };
    AudioDevice.stopBGM = function () {
        if (null != this._bgmChannel) {
            this._bgmChannel.stop();
            this._bgmChannel = null;
            this._bgmName = null;
        }
    };
    AudioDevice.pauseBGM = function () {
        if (null != this._bgmChannel) {
            this._bgmChannel.stop();
            this._bgmChannel = null;
        }
    };
    AudioDevice.continueBGM = function () {
        if (null != this._bgmName && null == this._bgmChannel) {
            var bgName = this._bgmName;
            this.playBGM(bgName);
        }
    };
    /**
     * 播放音效
     */
    AudioDevice.playEffect = function (name, volume) {
        if (volume === void 0) { volume = 1; }
        if (false == this.effectEnable) {
            return;
        }
        var sound = RES.getRes(name);
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            var channel = sound.play(0, 1);
            channel.volume = volume;
            channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onEffectComplete, this);
            this._playingEffect.push(channel);
        }
        else if (RES.hasRes(name)) {
            RES.getResAsync(name, function (data, key) {
                egret.log("\u97F3\u6548[" + key + "]\u52A0\u8F7D\u5B8C\u6BD5");
            }, this);
        }
    };
    AudioDevice.onEffectComplete = function (e) {
        var channel = e.currentTarget;
        for (var i = 0; i < this._playingEffect.length; i++) {
            if (this._playingEffect[i] == channel) {
                this._playingEffect.splice(i, 1);
                break;
            }
        }
    };
    AudioDevice.effectEnable = true;
    AudioDevice.bgmEnable = true;
    //正在播放的音效
    AudioDevice._playingEffect = [];
    return AudioDevice;
}());
__reflect(AudioDevice.prototype, "AudioDevice");
//# sourceMappingURL=AudioDevice.js.map
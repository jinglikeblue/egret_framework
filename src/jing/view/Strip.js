var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Strip = (function (_super) {
    __extends(Strip, _super);
    function Strip(textures, fps, loop) {
        if (loop === void 0) { loop = false; }
        _super.call(this);
        this._textures = null;
        this._interval = 0;
        this._changeTime = 0;
        this._tIndex = 0;
        this._loop = false;
        this._textures = textures;
        this._interval = (1000 / fps) >> 0;
        this._changeTime = 0;
        this._tIndex = -1;
        this._loop = loop;
        this.anchorX = this.anchorY = 0.5;
        this.addListeners();
    }
    Strip.prototype.addListeners = function () {
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
    };
    Strip.prototype.removeListeners = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    Strip.prototype.addedToStageHandler = function (e) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    Strip.prototype.enterFrameHandler = function (e) {
        var now = egret.getTimer();
        if (now >= this._changeTime) {
            this.next();
            this._changeTime = now + this._interval;
        }
    };
    Strip.prototype.next = function () {
        this._tIndex++;
        if (this._tIndex >= this._textures.length) {
            if (this._loop) {
                this._tIndex = 0;
            }
            else {
                this.dispatchEventWith("strip_end");
                this.dispose();
                return;
            }
        }
        this.texture = this._textures[this._tIndex];
    };
    Strip.prototype.dispose = function () {
        this.removeListeners();
        if (null != this.parent) {
            this.parent.removeChild(this);
        }
    };
    return Strip;
})(egret.Bitmap);

var Texture = (function () {
    function Texture() {
    }
    Texture.createBitmap = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Texture.createTexture = function (name) {
        var texture = RES.getRes(name);
        return texture;
    };
    Texture.createMC = function (fileName, mcName) {
        var data = RES.getRes(fileName + "_json");
        var texture = RES.getRes(fileName + "_png");
        var factory = new egret.MovieClipDataFactory(data, texture);
        var mc = new egret.MovieClip(factory.generateMovieClipData(mcName));
        return mc;
    };
    Texture.createBitmapTF = function (fntName, content, anchorX, anchorY) {
        if (content === void 0) { content = ""; }
        if (anchorX === void 0) { anchorX = 0; }
        if (anchorY === void 0) { anchorY = 0; }
        var tf = new egret.BitmapText();
        tf.anchorX = anchorX;
        tf.anchorY = anchorY;
        var font = RES.getRes(fntName);
        tf.font = font;
        tf.text = content;
        return tf;
    };
    return Texture;
})();

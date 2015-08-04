
class Texture {
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmap(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static createTexture(name: string): egret.Texture {
        var texture: egret.Texture = RES.getRes(name);
        return texture;
    }

    /*
    *   根据文件名和动画名称来生成MovieClip对象
    */
    public static createMC(fileName: string, mcName:string): egret.MovieClip {
        var data = RES.getRes(fileName + "_json");
        var texture = RES.getRes(fileName + "_png");
        var factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        var mc: egret.MovieClip = new egret.MovieClip(factory.generateMovieClipData(mcName));
        return mc;
    }

    /**
    * 创建一个位图文本框
    */
    public static createBitmapTF(fntName: string, content: string = "", anchorX: number = 0, anchorY: number= 0): egret.BitmapText {
        var tf = new egret.BitmapText();
        tf.anchorX = anchorX;
        tf.anchorY = anchorY;
        var font: any = RES.getRes(fntName);
        tf.font = font;
        tf.text = content;
        return tf;
    }
}
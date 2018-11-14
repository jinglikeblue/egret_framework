var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextUtil = (function () {
    function TextUtil() {
    }
    TextUtil.euiLabel2BitmapText = function (lb, fnt) {
        var bt = new egret.BitmapText();
        bt.font = RES.getRes(fnt + "_fnt");
        bt.textAlign = lb.textAlign;
        bt.verticalAlign = lb.verticalAlign;
        bt.width = lb.width;
        bt.height = lb.height;
        bt.x = lb.x;
        bt.y = lb.y;
        bt.text = lb.text;
        lb.parent.addChild(bt);
        lb.parent.removeChild(lb);
        return bt;
    };
    return TextUtil;
}());
__reflect(TextUtil.prototype, "TextUtil");
//# sourceMappingURL=TextUtil.js.map
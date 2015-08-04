var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HGroup = (function (_super) {
    __extends(HGroup, _super);
    function HGroup(elements, align, gap) {
        if (elements === void 0) { elements = null; }
        if (align === void 0) { align = 0; }
        if (gap === void 0) { gap = 0; }
        _super.call(this);
        this._gap = 0;
        this._elements = null;
        this._align = 0;
        this.setElements(elements, align, gap);
    }
    HGroup.prototype.setElements = function (elements, align, gap) {
        if (elements === void 0) { elements = null; }
        if (align === void 0) { align = 0; }
        if (gap === void 0) { gap = 0; }
        this._elements = elements;
        this._align = align;
        this._gap = gap;
        this.update();
    };
    HGroup.prototype.update = function () {
        this.removeChildren();
        if (null == this._elements) {
            return;
        }
        var maxHeight = 0;
        var count = this._elements.length;
        for (var i = 0; i < count; i++) {
            var ele = this._elements[i];
            if (ele.height > maxHeight) {
                maxHeight = ele.height;
            }
        }
        var useAnchorY = 0;
        var posY = 0;
        switch (this._align) {
            case 0:
                useAnchorY = 0;
                break;
            case 1:
                useAnchorY = 0.5;
                posY = maxHeight >> 1;
                break;
            case 2:
                useAnchorY = 1;
                posY = maxHeight;
                break;
        }
        var posX = 0;
        for (var i = 0; i < count; i++) {
            var ele = this._elements[i];
            ele.anchorX = 0;
            ele.anchorY = useAnchorY;
            ele.x = posX;
            ele.y = posY;
            posX += ele.width + this._gap;
            this.addChild(ele);
        }
    };
    return HGroup;
})(egret.Sprite);

class HGroup extends egret.Sprite {

    private _gap: number = 0;
    private _elements: egret.DisplayObject[] = null;
    private _align: number = 0;

    /**
    * align 对齐的方式 0:顶部对齐   1:居中对齐   2:下部对齐
    */
    public constructor(elements: egret.DisplayObject[]= null, align:number = 0, gap:number = 0) {
        super();
        this.setElements(elements, align, gap);
    }

    public setElements(elements: egret.DisplayObject[]= null, align: number = 0, gap:number = 0) {
        this._elements = elements;
        this._align = align;
        this._gap = gap;
        this.update();
    }

    private update(): void {
        this.removeChildren();
        if (null == this._elements) {           
            return;
        }

        //首先遍历出高度
        var maxHeight: number = 0;
        var count: number = this._elements.length;
        for (var i: number = 0; i < count; i++) {
            var ele: egret.DisplayObject = this._elements[i];
            if (ele.height > maxHeight) {
                maxHeight = ele.height;
            }
        }


        var useAnchorY: number = 0;
        var posY: number = 0;
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


        var posX: number = 0;
        for (var i: number = 0; i < count; i++) {
            var ele: egret.DisplayObject = this._elements[i];
            //强制调整注册点
            ele.anchorX = 0;
            ele.anchorY = useAnchorY;
            ele.x = posX;
            ele.y = posY;
            posX += ele.width + this._gap;
            this.addChild(ele);
        }
    }
} 
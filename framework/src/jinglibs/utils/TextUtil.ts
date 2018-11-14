class TextUtil {
	public static euiLabel2BitmapText(lb: eui.Label, fnt: string): egret.BitmapText {
		let bt = new egret.BitmapText();
		bt.font = RES.getRes(`${fnt}_fnt`);
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
	}
}
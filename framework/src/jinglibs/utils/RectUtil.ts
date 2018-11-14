class RectUtil {
	public constructor() {
	}

	/**
	 * 创建一个矩形图形	 
	 * @param w 矩形宽度
	 * @param h 矩形高度
	 * @param lineSize 边线宽度
	 * @param lineColor 边线颜色 -1表示无边线
	 * @param fillColor 填充颜色 -1表示不填充
	 */
	public static createRectShape(w: number, h: number, lineSize: number, lineColor: number, fillColor: number): egret.Shape {
		let shape = new egret.Shape();
		if (lineColor >= 0) {
			shape.graphics.lineStyle(lineSize, lineColor);
		}
		if (fillColor >= 0) {
			shape.graphics.beginFill(fillColor);
		}
		shape.graphics.drawRect(0, 0, w, h);
		shape.graphics.endFill();
		return shape;
	}
}
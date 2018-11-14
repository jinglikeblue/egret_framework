class NativeCaller {

	/**
	 * 白鹭引擎启动
	 */
	public static egretStart(): void {
		NativeExternal.ins().callNative({ "id": "egretStart" });
		NativeExternal.ins().startCacheWebviewMsgs();
	}

	/**
	 * 请求苹果支付
	 */
	public static applePay(id): void {
		var obj: any = {};
		obj.id = "openApplePay";
		obj.product = id;
		NativeExternal.ins().callNative(obj);
	}

	/**
	 * 退出
	 */
	public static exit(): void {
		NativeExternal.ins().callNative({ "id": "exitGame" });
	}
}
class StorageUtil {
	/**
	 * 保存数据
	 */
	public static save(key: string, value: string): void {
		egret.localStorage.setItem(key, value);
	}

	/**
	 * 加载数据
	 */
	public static load(key: string): string {
		return egret.localStorage.getItem(key);
	}

	/**
	 * 移除数据
	 */
	public static clear(key: string): void {
		egret.localStorage.removeItem(key);
	}
}
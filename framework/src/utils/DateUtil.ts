class DateUtil {

	public static ONE_DAY_TIME: number = 1000 * 60 * 60 * 24;

	public static getTodayStart(): number {
		let date = new Date();
		let time = TimeUtil.getTime(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
		return time;
	}

	public static getYesterdayStart(): number {
		let date = new Date();
		date.setTime(date.getTime() - DateUtil.ONE_DAY_TIME);
		let time = TimeUtil.getTime(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
		return time;
	}

	public static getThisWeekStart(): number {
		let date = new Date();
		let day = date.getDay() - 1;
		let offTime = day * DateUtil.ONE_DAY_TIME;
		date.setTime(date.getTime() - offTime);
		let time = TimeUtil.getTime(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
		return time;
	}

	public static getThisMonthStart(): number {
		let date = new Date();
		let month = date.getMonth();
		let time = TimeUtil.getTime(date.getFullYear(), month, 1, 0, 0, 0);
		return time;
	}
}
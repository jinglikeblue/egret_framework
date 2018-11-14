
/**
 * 所有的时间单位为秒
 */
class TimeUtil {
	public static getNowUTC(): number {
		let time = new Date().getTime() / 1000;
		return time >> 0;
	}

	public static getTime(year: number, month: number, day: number, hour: number, min: number, sec: number): number {
		let date = new Date();
		date.setFullYear(year, month, day);
		date.setHours(hour, min, sec);
		return this.milli2Seconds(date.getTime());
	}

	public static milli2Seconds(utc: number): number {
		return (utc / 1000) >> 0
	}

	public static formatUTC(time: number, format: string = "yyyy-mm-dd HH:MM:SS"): string {
		let date = new Date();
		date.setTime(time * 1000);
		let yyyy = date.getFullYear().toString();
		let mm = (date.getMonth() + 1).toString();
		let dd = date.getDate().toString();
		let HH = date.getHours().toString();
		let MM = date.getMinutes().toString();
		let SS = date.getSeconds().toString();
		if (mm.length == 1) {
			mm = `0` + mm;
		}
		if (dd.length == 1) {
			dd = `0` + dd;
		}

		if (HH.length == 1) {
			HH = `0` + HH;
		}
		if (MM.length == 1) {
			MM = `0` + MM;
		}
		if (SS.length == 1) {
			SS = `0` + SS;
		}

		format = format.replace(/yyyy/, yyyy);
		format = format.replace(/mm/, mm);
		format = format.replace(/dd/, dd);
		format = format.replace(/HH/, HH);
		format = format.replace(/MM/, MM);
		format = format.replace(/SS/, SS);
		return format;
	}

	public static formatSeconds(seconds: number, format: string = "HH:MM:SS"): string {
		let HH = ((seconds / 3600) >> 0).toString();
		let MM = (((seconds % 3600) / 60) >> 0).toString();
		let SS = (seconds % 60).toString();
		if (HH.length == 1) {
			HH = `0` + HH;
		}
		if (MM.length == 1) {
			MM = `0` + MM;
		}
		if (SS.length == 1) {
			SS = `0` + SS;
		}
		format = format.replace(/HH/, HH);
		format = format.replace(/MM/, MM);
		format = format.replace(/SS/, SS);
		return format;
	}

}
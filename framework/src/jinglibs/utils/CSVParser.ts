class CSVParser {
	public constructor() {
	}


	/**
	 * 处理带Key值的表
	 */
	public static parse(str: string): any {
		let results: any[] = [];
		let rows: string[] = str.split(`\r\n`);
		//删除第一行解释
		rows.shift();
		//获取第二行字段名
		let keys = rows.shift().split(`,`);
		for (let i = 0; i < rows.length; i++) {
			let row = rows[i].split(`,`);
			if (row.length != keys.length || row[0] == "") {
				continue;
			}
			results.push(this.getObject(row, keys));
		}
		return results;
	}

	private static getObject(row: string[], keys: string[]): any {
		let obj: any = {};
		for (let i = 0; i < keys.length; i++) {
			obj[keys[i]] = row[i];
		}
		return obj;
	}

	/**
	 * 处理没有key值的二维表
	 */
	public static parseTable(str: string, ignore: number = 0): any {
		let results: any[] = [];
		let rows: string[] = str.split(`\r\n`);
		if (ignore > 0) {
			rows.splice(0, ignore);
		}
		for (let i = 0; i < rows.length; i++) {
			let row = rows[i].split(`,`);
			if (row.length > 0 && row[0] == "") {
				continue;
			}
			results.push(row);
		}
		return results;
	}
}
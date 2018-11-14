var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CSVParser = (function () {
    function CSVParser() {
    }
    /**
     * 处理带Key值的表
     */
    CSVParser.parse = function (str) {
        var results = [];
        var rows = str.split("\r\n");
        //删除第一行解释
        rows.shift();
        //获取第二行字段名
        var keys = rows.shift().split(",");
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i].split(",");
            if (row.length != keys.length || row[0] == "") {
                continue;
            }
            results.push(this.getObject(row, keys));
        }
        return results;
    };
    CSVParser.getObject = function (row, keys) {
        var obj = {};
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = row[i];
        }
        return obj;
    };
    /**
     * 处理没有key值的二维表
     */
    CSVParser.parseTable = function (str, ignore) {
        if (ignore === void 0) { ignore = 0; }
        var results = [];
        var rows = str.split("\r\n");
        if (ignore > 0) {
            rows.splice(0, ignore);
        }
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i].split(",");
            if (row.length > 0 && row[0] == "") {
                continue;
            }
            results.push(row);
        }
        return results;
    };
    return CSVParser;
}());
__reflect(CSVParser.prototype, "CSVParser");
//# sourceMappingURL=CSVParser.js.map
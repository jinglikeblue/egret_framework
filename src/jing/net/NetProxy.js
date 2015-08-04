var NetProxy = (function () {
    function NetProxy() {
        this._loader = null;
        this._request = null;
        this._callBack = null;
    }
    NetProxy.prototype.request = function (url, callBack, thisObject, params, method, dataFormat) {
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (params === void 0) { params = null; }
        if (method === void 0) { method = egret.URLRequestMethod.GET; }
        if (dataFormat === void 0) { dataFormat = egret.URLLoaderDataFormat.TEXT; }
        if (callBack) {
            this._callBack = callBack.bind(thisObject);
        }
        this._loader = new egret.URLLoader();
        this._loader.dataFormat = dataFormat;
        this._request = new egret.URLRequest(url);
        this._request.method = method;
        if (params) {
            var values = new egret.URLVariables();
            values.variables = params;
            this._request.data = values;
        }
        this._loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        this._loader.load(this._request);
    };
    NetProxy.prototype.onRequestData = function (e) {
        this._loader.removeEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        if (this._callBack) {
            this._callBack(this._loader.data);
        }
    };
    return NetProxy;
})();

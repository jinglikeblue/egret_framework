/*
* 网络通信代理
*/
class NetProxy {

    private _loader: egret.URLLoader = null;
    private _request: egret.URLRequest = null;
    private _callBack: Function = null;

    public request(url: string, callBack: Function = null, thisObject: any = null, params: any = null, method: string = egret.URLRequestMethod.GET, dataFormat: string = egret.URLLoaderDataFormat.TEXT): void {

        if (callBack)
        {
            this._callBack = callBack.bind(thisObject);
        }
        

        this._loader = new egret.URLLoader();
        this._loader.dataFormat = dataFormat;

        this._request = new egret.URLRequest(url);
        this._request.method = method;

        if (params) {
            var values: egret.URLVariables = new egret.URLVariables();
            values.variables = params;
            this._request.data = values;
        }


        this._loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        this._loader.load(this._request);
    }

    //private requestData(): void {
    //    //创建POST请求
    //    var url: string = DataCenter.server + "server/load.php";
    //    var loader: egret.URLLoader = new egret.URLLoader();
    //    loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
    //    loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
    //    var request: egret.URLRequest = new egret.URLRequest(url);
    //    request.method = egret.URLRequestMethod.GET;
    //    var values: egret.URLVariables = new egret.URLVariables("id=" + DataCenter.selectedId);
    //    request.data = values;
    //    loader.load(request);
    //}

    private onRequestData(e: egret.Event): void {
        this._loader.removeEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        if (this._callBack) {
            this._callBack(this._loader.data);
        }
    }
} 
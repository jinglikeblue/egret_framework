class Extend
{

    /**
     * 调用外部方法
     */
    public static callWindow(funName: string): any
    {
        if (null == window[funName])
        {
            //alert("找不到外部方法：" + funName);
            return null;
        }
        var result: any = window[funName]();
        return result;
    }

    public static callReadyShare(): any
    {
        //alert("调用初始化分享");
        return Extend.callWindow("readyShare");
    }


}
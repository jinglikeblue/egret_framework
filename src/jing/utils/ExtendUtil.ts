class ExtendUtil
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
}
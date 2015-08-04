//字符串处理类
class StringUtil 
{
    //格式化字符串
    public static format(input: string, ...args)
    {        
        for (var i: number = 0; i < args.length; ++i)
        {
            input = input.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        }
        return input;
    }
} 
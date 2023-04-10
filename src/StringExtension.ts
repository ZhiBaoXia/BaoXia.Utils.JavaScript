/* ************************************************/
/*
/*          宝匣软件 Java Script 工具集
/*
/* ************************************************/

class StringExtension
{

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数值（Number）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    static tryParseInt(anyObject?: any): Number
    {
        let intValue = 0;
        try
        {
            intValue = parseInt(anyObject);
            if (isNaN(intValue))
            {
                intValue = 0;
            }
        }
        catch (exception)
        {
            intValue = 0;
        }
        return intValue;
    }

    static tryParseFloat(anyObject?: any): Number
    {
        let floatValue = 0;
        try
        {
            floatValue = parseFloat(anyObject);
            if (isNaN(floatValue))
            {
                floatValue = 0;
            }
        }
        catch (exception)
        {
            floatValue = 0;
        }
        return floatValue;
    }
}

export { StringExtension }
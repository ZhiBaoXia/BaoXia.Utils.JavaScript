/* ************************************************/
/*
/*          宝匣软件 Java Script 工具集
/*
/* ************************************************/

export class StringUtil
{
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数值（Number）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    static tryParseToInt(anyObject?: any): number
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

    static tryParseToFloat(anyObject?: any): number
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

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 字符串（String）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    static isEquals(
        strA: string | null,
        strB: string | null,
        isIgnoreCase = false,
        isNullEqualsEmpty = true): boolean
    {
        if (strA == strB)
        {
            return true;
        }
        if (strA == null
            && (strB!.length <= 0
                && isNullEqualsEmpty))
        {
            return true;
        }
        if (strB == null
            && (strA!.length <= 0
                && isNullEqualsEmpty))
        {
            return true;
        }

        strA = strA!;
        strB = strB!;
        if (strA.length == strB.length)
        {
            @last
        }

        return false;
    }

    static indexOfKeywordsIn(
        str: string,
        keywords: string,
        isIgnoreCase: boolean = true): number
    {
        let regExp
            = isIgnoreCase
                ? eval("/" + keywords + "/i")
                : eval("/" + keywords + "/");
        let result = str.match(regExp);
        if (result != null)
        {
            return result.index as number;
        }
        return -1;
    };

    static lastIndexOfKeywordsIn(
        str: string,
        keywords: string,
        isIgnoreCase: boolean = true): number
    {
        let indexOfKeywords = -1;
        let lastIndexOfKeywords = -1;
        do
        {
            indexOfKeywords = StringUtil.indexOfKeywordsIn(
                str,
                keywords,
                isIgnoreCase);
            if (indexOfKeywords >= 0)
            {
                lastIndexOfKeywords = indexOfKeywords;
            }
        } while (indexOfKeywords >= 0)
        return lastIndexOfKeywords;
    };

    static isBeginWithKeywordsIn(
        str: string,
        keywords: string,
        isIgnoreCase: boolean = true): boolean
    {
        try
        {
            if (StringUtil.indexOfKeywordsIn(
                str,
                keywords,
                isIgnoreCase) == 0)
            {
                return true;
            }
        }
        catch (exception)
        {
            console.error(exception);
        }
        return false;
    };

    static isEndWithKeywordsInString(
        str: string,
        keywords: string,
        isIgnoreCase: boolean = true): boolean
    {
        try
        {
            if (StringUtil.indexOfKeywordsIn(
                str,
                keywords,
                isIgnoreCase) == 0)
            {
                return true;
            }
        }
        catch (exception)
        {
            console.error(exception);
        }
        return false;
    };

    static replaceAllKeywordsInString(
        str: string,
        keywords: string,
        newValue: string,
        isIgnoreCase = true)
    {
        // g,全局;m,多次;i,大小写不敏感
        let regExpText
            = isIgnoreCase
                ? "gmi"
                : "gm";
        let regExp = new RegExp(keywords, regExpText);
        { }
        return str.replace(regExp, newValue);
    };

    static replaceAllReturnCharsIn(
        str: string,
        newReturnChars: string = "<br>")
    {
        return str.replace(/(\r\n)|(\n)/g, newReturnChars);
    };

    static removeAllReturnCharsIn(
        str: string)
    {
        return StringUtil.replaceAllReturnCharsIn(
            str,
            "");
    };

    static getIntegerNumberDigitsInNumberString(
        numberString: string): number
    {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0)
        {
            return this.length;
        }
        return dotIndex;
    };

    static getDecimalNumberDigitsInNumberString(
        numberString: string): number
    {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0)
        {
            return 0;
        }
        return this.length - (dotIndex + 1);
    };

    static complementZeroToIntegerNumberDigitsInNumberString(
        numberString: string,
        integerNumberDigits: number): string
    {
        let newString = numberString;
        let integerNumberDigitsNeedComplement
            = integerNumberDigits
            - StringUtil.getIntegerNumberDigitsInNumberString(newString);
        while (integerNumberDigitsNeedComplement > 0)
        {
            newString = "0" + newString;
            integerNumberDigitsNeedComplement--;
        }
        return newString;
    };

    static complementZeroToDecimalNumberDigitsInNumberString(
        numberString: string,
        decimalNumberDigits: number): string
    {
        let newString = numberString;
        let decimalNumberDigitsNeedComplement
            = decimalNumberDigits
            - StringUtil.getDecimalNumberDigitsInNumberString(newString);
        while (decimalNumberDigitsNeedComplement > 0)
        {
            newString = newString + "0";
            decimalNumberDigitsNeedComplement--;
        }
        return newString;
    };

    static register()
    {
        Object.defineProperty(
            String.prototype,
            "bxIsNullOrEmpty",
            {
                get: function ()
                {
                    return this == null || this.trim() === "";
                },
                configurable: true
            });

        Object.defineProperty(
            String.prototype,
            "bxTryToInt",
            {
                get: function ()
                {
                    return () =>
                    {
                        return StringUtil.tryParseToInt(this);
                    };
                },
                configurable: true
            });

        Object.defineProperty(
            String.prototype,
            "bxTryToFloat",
            {
                get: function ()
                {
                    return () =>
                    {
                        return StringUtil.tryParseToFloat(this);
                    };
                },
                configurable: true
            });


        Object.defineProperty(
            String.prototype,
            "bxIndexOf",
            {
                get: function ()
                {
                    return (
                        keywords: string,
                        isIgnoreCase: boolean = true): number =>
                    {
                        return StringUtil.indexOfKeywordsIn(
                            this,
                            keywords,
                            isIgnoreCase);
                    };
                },
                configurable: true
            });


        Object.defineProperty(
            String.prototype,
            "bxLastIndexOf",
            {
                get: function ()
                {
                    return (
                        keywords: string,
                        isIgnoreCase: boolean = true): number =>
                    {
                        return StringUtil.indexOfKeywordsIn(
                            this,
                            keywords,
                            isIgnoreCase);
                    };
                },
                configurable: true
            });
    }
}
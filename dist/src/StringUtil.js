/* ************************************************/
/*
/*          宝匣软件 Java Script 工具集
/*
/* ************************************************/
export class StringUtil {
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数值（Number）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    static tryParseToInt(anyObject) {
        let intValue = 0;
        try {
            intValue = parseInt(anyObject);
            if (isNaN(intValue)) {
                intValue = 0;
            }
        }
        catch (exception) {
            intValue = 0;
        }
        return intValue;
    }
    static tryParseToFloat(anyObject) {
        let floatValue = 0;
        try {
            floatValue = parseFloat(anyObject);
            if (isNaN(floatValue)) {
                floatValue = 0;
            }
        }
        catch (exception) {
            floatValue = 0;
        }
        return floatValue;
    }
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 字符串（String）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    static indexOfKeywordsIn(str, keywords, isIgnoreCase = true) {
        let regExp = isIgnoreCase
            ? eval("/" + keywords + "/i")
            : eval("/" + keywords + "/");
        let result = str.match(regExp);
        if (result != null) {
            return result.index;
        }
        return -1;
    }
    ;
    static isBeginWithKeywordsIn(str, keywords, isIgnoreCase = true) {
        try {
            if (StringUtil.indexOfKeywordsIn(str, keywords, isIgnoreCase) == 0) {
                return true;
            }
        }
        catch (exception) {
            console.error(exception);
        }
        return false;
    }
    ;
    static isEndWithKeywordsInString(str, keywords, isIgnoreCase = true) {
        try {
            if (StringUtil.indexOfKeywordsIn(str, keywords, isIgnoreCase) == 0) {
                return true;
            }
        }
        catch (exception) {
            console.error(exception);
        }
        return false;
    }
    ;
    static replaceAllKeywordsInString(str, keywords, newValue, isIgnoreCase = true) {
        // g,全局;m,多次;i,大小写不敏感
        let regExpText = isIgnoreCase
            ? "gmi"
            : "gm";
        let regExp = new RegExp(keywords, regExpText);
        { }
        return str.replace(regExp, newValue);
    }
    ;
    static replaceAllReturnCharsIn(str, newReturnChars = "<br>") {
        return str.replace(/(\r\n)|(\n)/g, newReturnChars);
    }
    ;
    static removeAllReturnCharsIn(str) {
        return StringUtil.replaceAllReturnCharsIn(str, "");
    }
    ;
    static getIntegerNumberDigitsInNumberString(numberString) {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0) {
            return this.length;
        }
        return dotIndex;
    }
    ;
    static getDecimalNumberDigitsInNumberString(numberString) {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0) {
            return 0;
        }
        return this.length - (dotIndex + 1);
    }
    ;
    static complementZeroToIntegerNumberDigitsInNumberString(numberString, integerNumberDigits) {
        let newString = numberString;
        let integerNumberDigitsNeedComplement = integerNumberDigits
            - StringUtil.getIntegerNumberDigitsInNumberString(newString);
        while (integerNumberDigitsNeedComplement > 0) {
            newString = "0" + newString;
            integerNumberDigitsNeedComplement--;
        }
        return newString;
    }
    ;
    static complementZeroToDecimalNumberDigitsInNumberString(numberString, decimalNumberDigits) {
        let newString = numberString;
        let decimalNumberDigitsNeedComplement = decimalNumberDigits
            - StringUtil.getDecimalNumberDigitsInNumberString(newString);
        while (decimalNumberDigitsNeedComplement > 0) {
            newString = newString + "0";
            decimalNumberDigitsNeedComplement--;
        }
        return newString;
    }
    ;
}

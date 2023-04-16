/* ************************************************/
/*
/*          宝匣软件 Java Script 工具集
/*
/* ************************************************/
import { StringRange } from "./model/StringRange.js";
export class StringUtil {
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数值（Number）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    /**
     * 尝试转换字符串为整数数值。
     * @param string 指定的字符串。
     * @param [number] 转换失败时返回的数值，默认为：0。
     * @returns 转换成功时，返回：对应的整数数值，否则返回：0。
     */
    static parseToInt(anyObject, defaultValue = 0) {
        let intValue = defaultValue;
        try {
            if (anyObject != null) {
                intValue = parseInt(anyObject);
                if (isNaN(intValue)) {
                    intValue = defaultValue;
                }
            }
        }
        catch (exception) {
            intValue = defaultValue;
        }
        return intValue;
    }
    /**
     * 尝试转换字符串为浮点数值。
     * @param string 指定的字符串。
     * @param [number] 转换失败时返回的数值，默认为：0.0。
     * @returns 转换成功时，返回：对应的浮点数值，否则返回：0.0。
     */
    static parseToFloat(anyObject, defaultValue = 0.0) {
        let floatValue = defaultValue;
        try {
            if (anyObject != null) {
                floatValue = parseFloat(anyObject);
                if (isNaN(floatValue)) {
                    floatValue = defaultValue;
                }
            }
        }
        catch (exception) {
            floatValue = defaultValue;
        }
        return floatValue;
    }
    /**
     * 获取数字字符串中整数部分的字符个数。
     * @param numberString 指定的数字字符串。
     * @returns 数字字符串中整数部分的字符个数。
     */
    static getIntegerNumberDigitsOf(numberString) {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0) {
            return this.length;
        }
        return dotIndex;
    }
    ;
    /**
     * 获取数字字符串中小数部分的字符个数。
     * @param numberString 指定的数字字符串。
     * @returns 数字字符串中小数部分的字符个数。
     */
    static getDecimalNumberDigitsOf(numberString) {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0) {
            return 0;
        }
        return this.length - (dotIndex + 1);
    }
    ;
    /**
     * 补充“0”到指定的数字字符串中，直到整数部分的字符个数大于等于指定的整数位数。
     * @param numberString 指定的数字字符串。
     * @param integerNumberDigits 指定的整数部分位数。
     * @returns 返回整数部分补足“0”的数字字符串。
     */
    static complementZeroToIntegerNumberDigitsTo(numberString, integerNumberDigits) {
        let newString = numberString;
        let integerNumberDigitsNeedComplement = integerNumberDigits
            - StringUtil.getIntegerNumberDigitsOf(newString);
        while (integerNumberDigitsNeedComplement > 0) {
            newString = "0" + newString;
            integerNumberDigitsNeedComplement--;
        }
        return newString;
    }
    ;
    /**
     * 补充“0”到指定的数字字符串中，直到小数部分的字符个数大于等于指定的小数位数。
     * @param numberString 指定的数字字符串。
     * @param integerNumberDigits 指定的小数部分位数。
     * @returns 返回整数部分补足“0”的数字字符串。
     */
    static complementZeroToDecimalNumberDigitsTo(numberString, decimalNumberDigits) {
        let newString = numberString;
        let decimalNumberDigitsNeedComplement = decimalNumberDigits
            - StringUtil.getDecimalNumberDigitsOf(newString);
        while (decimalNumberDigitsNeedComplement > 0) {
            newString = newString + "0";
            decimalNumberDigitsNeedComplement--;
        }
        return newString;
    }
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 字符串（String）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    /**
     * 判断指定的字符串，是否为“null”，或“空字符串”。
     * @param str 指定的字符串对象。
     * @returns 如果指定的字符串对象为“null”，或“空字符串”，则返回：true，否则返回：false。
     */
    static isEmpty(str) {
        if (str == null
            || str.length < 1) {
            return true;
        }
        return false;
    }
    /**
     * 判断指定的字符串，是否不为“null”，或“空字符串”。
     * @param str 指定的字符串对象。
     * @returns 如果指定的字符串对象不为“null”，或“空字符串”，则返回：true，否则返回：false。
     */
    static isNotEmpty(str) {
        return !StringUtil.isEmpty(str);
    }
    /**
     * 判断指定的两个字符串，是否完全相同。
     * @param strA 指定的字符串A。
     * @param strB 指定的字符串B。
     * @param [isIgnoreCase] 可选参数，比较时是否忽略大小写，默认为：false。
     * @param [isNullEqualsEmpty] 可选参数，是否判定“null”值等同于“空字符串”，默认为：true。
     * @returns 如果指定的两个字符串相同，则返回：true，否则返回：false。
     */
    static isEquals(strA, strB, isIgnoreCase = false, isNullEqualsEmpty = true) {
        if (strA == strB) {
            return true;
        }
        if (strA == null) {
            if (strB.length <= 0
                && isNullEqualsEmpty) {
                return true;
            }
            return false;
        }
        if (strB == null) {
            if (strA.length <= 0
                && isNullEqualsEmpty) {
                return true;
            }
            return false;
        }
        strA = strA;
        strB = strB;
        if (strA.length != strB.length) {
            return false;
        }
        let charsCount = strA.length;
        if (isIgnoreCase) {
            for (let charIndex = 0; charIndex < charsCount; charIndex++) {
                let charA = strA[charIndex];
                let charB = strB[charIndex];
                if (charA != charB) {
                    let charAIntValue = parseInt(charA);
                    // A-Z
                    if (charAIntValue >= 65
                        && charAIntValue <= 90) {
                        let charBIntValue = parseInt(charB);
                        if (charBIntValue != (charAIntValue + 32)) {
                            return false;
                        }
                    }
                    // a-z
                    else if (charAIntValue >= 97
                        && charAIntValue <= 122) {
                        let charBIntValue = parseInt(charB);
                        if (charBIntValue != (charAIntValue - 32)) {
                            return false;
                        }
                    }
                }
            }
        }
        else {
            for (let charIndex = 0; charIndex < charsCount; charIndex++) {
                let charA = strA[charIndex];
                let charB = strB[charIndex];
                if (charA != charB) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * 获取指定关键字，在指定的字符串中，第一次出现的索引值。
     * @param str 指定的字符串。
     * @param keyword 要查找的关键字。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @param [firstCharIndexToSearch] 可选参数，指定查找范围的第一个字符索引值，默认为：0。
     * @returns 查找到指定的关键字时，返回关键字在指定字符串中的第一次出现的索引值，如果查找不到指定的关键字，则返回：-1。
     */
    static indexOfKeywordIn(str, keyword, isIgnoreCase = false, firstCharIndexToSearch = 0) {
        if (StringUtil.isEmpty(str)
            || StringUtil.isEmpty(keyword)) {
            return -1;
        }
        str = str;
        keyword = keyword;
        if ((firstCharIndexToSearch + keyword.length) > str.length) {
            return -1;
        }
        if (firstCharIndexToSearch > 0) {
            str = str.substring(firstCharIndexToSearch);
        }
        if (isIgnoreCase) {
            str = str.toLowerCase();
            keyword = keyword.toLowerCase();
        }
        let indexOfKeyword = str.indexOf(keyword);
        { }
        return indexOfKeyword;
    }
    /**
     * 获取指定关键字，在指定的字符串中，最后一次出现的索引值。
     * @param str 指定的字符串。
     * @param keyword 要查找的关键字。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @param [firstCharIndexToSearch] 可选参数，指定查找范围的第一个字符索引值，默认为：0。
     * @returns 查找到指定的关键字时，返回关键字在指定字符串中的最后一次出现的索引值，如果查找不到指定的关键字，则返回：-1。
     */
    static lastIndexOfKeywordIn(str, keyword, isIgnoreCase = false, firstCharIndexToSearch = 0) {
        if (StringUtil.isEmpty(str)
            || StringUtil.isEmpty(keyword)) {
            return -1;
        }
        str = str;
        keyword = keyword;
        if ((firstCharIndexToSearch + keyword.length) > str.length) {
            return -1;
        }
        if (firstCharIndexToSearch > 0) {
            str = str.substring(firstCharIndexToSearch);
        }
        if (isIgnoreCase) {
            str = str.toLowerCase();
            keyword = keyword.toLowerCase();
        }
        let indexOfKeyword = str.lastIndexOf(keyword);
        { }
        return indexOfKeyword;
    }
    /**
     * 是否指定的字符串是以指定的关键字开头。
     * @param str 指定的字符串。
     * @param keyword 指定的关键字。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @returns 当指定的字符串是以指定的关键字开头开头时，返回：true，否则返回：false。
     */
    static isBeginWithKeywordIn(str, keyword, isIgnoreCase = false) {
        if (StringUtil.indexOfKeywordIn(str, keyword, isIgnoreCase) == 0) {
            return true;
        }
        return false;
    }
    /**
     * 是否指定的字符串是以指定的关键字结尾。
     * @param str 指定的字符串。
     * @param keyword 指定的关键字。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @returns 当指定的字符串是以指定的关键字结尾时，返回：true，否则返回：false。
     */
    static isEndWithKeywordIn(str, keyword, isIgnoreCase = false) {
        let lastIndexOfKeyword = StringUtil.indexOfKeywordIn(str, keyword, isIgnoreCase);
        if (lastIndexOfKeyword >= 0
            && (lastIndexOfKeyword + keyword.length) == str.length) {
            return true;
        }
        return false;
    }
    ;
    /**
     * 获取指定关键字，在指定字符串中出现的全部区域信息数组。
     * @param str 指定的字符串。
     * @param keyword 指定关键字。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @param [firstCharIndexToSearch] 可选参数，指定查找范围的第一个字符索引值，默认为：0。
     * @returns 返回指定关键字，在指定字符串中出现的全部区域信息数组。
     */
    static getRangesOfKeywordIn(str, keyword, isIgnoreCase = false, firstCharIndexToSearch = 0) {
        let keywordRanges = new Array();
        if (StringUtil.isEmpty(str)
            || StringUtil.isEmpty(keyword)) {
            return keywordRanges;
        }
        str = str;
        keyword = keyword;
        if ((firstCharIndexToSearch + keyword.length) > str.length) {
            return keywordRanges;
        }
        let prevOriginalStringLength = firstCharIndexToSearch;
        if (firstCharIndexToSearch > 0) {
            str = str.substring(firstCharIndexToSearch);
        }
        if (isIgnoreCase) {
            str = str.toLowerCase();
            keyword = keyword.toLowerCase();
        }
        let keywordLength = keyword.length;
        for (let indexOfKeyword = str.indexOf(keyword); indexOfKeyword >= 0; indexOfKeyword = str.indexOf(keyword)) {
            let keywordRange = new StringRange(prevOriginalStringLength + indexOfKeyword, keywordLength);
            {
                keywordRanges.push(keywordRange);
            }
            let nextOriginalStringBeingCharIndex = indexOfKeyword
                + keywordLength;
            {
                str = str.substring(nextOriginalStringBeingCharIndex);
            }
            prevOriginalStringLength
                += nextOriginalStringBeingCharIndex;
        }
        return keywordRanges;
    }
    /**
     * 在指定的字符串中替换指定的关键字为指定的新字符串。
     * @param str 指定的字符串。
     * @param keyword 要替换的关键字。
     * @param newValue 要替代关键字的新字符串。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @returns 返回替换成功的关键字数量。
     */
    static replaceAllKeywordIn(str, keyword, newValue, isIgnoreCase = false) {
        var _a;
        let keywordRanges = StringUtil.getRangesOfKeywordIn(str, keyword, isIgnoreCase);
        if (keywordRanges.length < 1) {
            // 没有发现关键字时，返回原始字符串。
            return str;
        }
        let keywordLength = (_a = keyword === null || keyword === void 0 ? void 0 : keyword.length) !== null && _a !== void 0 ? _a : 0;
        let newString = "";
        let lastKeywordEndCharIndex = 0;
        let keywordRangesCount = keywordRanges.length;
        for (let keywordRangeIndex = 0; keywordRangeIndex <= keywordRangesCount; keywordRangeIndex++) {
            let keywordRange = keywordRangeIndex < keywordRangesCount
                ? keywordRanges[keywordRangeIndex]
                : new StringRange(str.length, 0);
            // 1/2，填充关键字之间的文字：
            let originalSubstringBeginCharIndex = lastKeywordEndCharIndex;
            let originalSubstringEndCharIndex = keywordRange.beginCharIndex;
            let originalSubstringLength = originalSubstringEndCharIndex
                - originalSubstringBeginCharIndex;
            if (originalSubstringLength > 0) {
                let originalSubstring = str === null || str === void 0 ? void 0 : str.substring(originalSubstringBeginCharIndex, originalSubstringEndCharIndex);
                {
                    // !!!
                    newString += originalSubstring;
                    // !!!
                }
            }
            // 2/2，填充要替换关键字的新字符：
            if (newValue != null
                && newValue.length > 0
                && keywordRange.charsCount > 0) {
                // !!!
                newString += newValue;
                // !!!
            }
            lastKeywordEndCharIndex
                = keywordRange.endCharIndex;
        }
        return newString;
    }
    /**
     * 在指定的字符串中替换指定的关键字为指定的新字符串。
     * @param str 指定的字符串。
     * @param keywordArray 要替换的关键字数组。
     * @param newValue 要替代关键字的新字符串。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @returns 返回替换成功的关键字数量。
     */
    static replaceAllKeywordInArrayIn(str, keywordArray, newValue, isIgnoreCase = false) {
        let newString = null;
        if (keywordArray != null) {
            for (let keyword of keywordArray) {
                newString = StringUtil.replaceAllKeywordIn(str, keyword, newValue, isIgnoreCase);
                if (StringUtil.isEmpty(newString)) {
                    break;
                }
                // !!!
                str = newString;
                // !!!
            }
        }
        return newString;
    }
}

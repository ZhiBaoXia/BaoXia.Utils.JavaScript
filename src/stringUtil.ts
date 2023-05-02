/* ************************************************/
/*
/*          宝匣软件 Java Script 工具集
/*
/* ************************************************/

import { ArrayUtil } from "./arrayUtil.js";
import { StringRange } from "./model/stringRange.js"
import { NumberUtil } from "./numberUtil.js";

export class StringUtil
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    static readonly Empty: string = "";


    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数值（Number）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////


    /**
     * 判断指定的字符，是否为“数字字符”。
     * @param character 指定的字符。
     * @param [isIncludeDot] 是否包含“小数点”字符，默认为：false。
     * @returns 如果指定的字符为“数字字符”，则返回：true，否则返回：false。
     */
    static isNumberChar(
        character: string | null,
        isIncludeDot: boolean = false): boolean
    {
        if (character == null
            || character.length < 1)
        {
            return false;
        }
        let characterCode = character.charCodeAt(0);
        if (characterCode >= 48
            && characterCode <= 57)
        {
            return true;
        }
        else if (characterCode == 46
            && isIncludeDot)
        {
            return true;
        }
        return false;
    }


    /**
     * 判断指定的字符，是否为“英文字母字符”。
     * @param character 指定的字符。
     * @returns 如果指定的字符为“英文字母字符”，则返回：true，否则返回：false。 
     */
    static isAlphabetChar(
        character: string | null): boolean
    {
        if (character == null
            || character.length < 1)
        {
            return false;
        }

        let characterCode = character.charCodeAt(0);
        if (characterCode >= 65
            && characterCode <= 90)
        {
            return true;
        }
        if (characterCode >= 97
            && characterCode <= 122)
        {
            return true;
        }
        return false;
    }

    /**
     * 尝试转换字符串为整数数值。
     * @param string 指定的字符串。
     * @param [number] 转换失败时返回的数值，默认为：0。
     * @returns 转换成功时，返回：对应的整数数值，否则返回：0。
     */
    static parseToInt(
        anyObject: string | null,
        defaultValue: number = 0): number
    {
        let intValue = defaultValue;
        try
        {
            if (anyObject != null)
            {
                intValue = parseInt(anyObject);
                if (isNaN(intValue))
                {
                    intValue = defaultValue;
                }
            }
        }
        catch (exception)
        {
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
    static parseToFloat(
        anyObject: string | null,
        defaultValue: number = 0.0): number
    {
        let floatValue = defaultValue;
        try
        {
            if (anyObject != null)
            {
                floatValue = parseFloat(anyObject);
                if (isNaN(floatValue))
                {
                    floatValue = defaultValue;
                }
            }
        }
        catch (exception)
        {
            floatValue = defaultValue;
        }
        return floatValue;
    }

    /**
     * 获取数字字符串中整数部分的字符个数。
     * @param numberString 指定的数字字符串。
     * @returns 数字字符串中整数部分的字符个数。
     */
    static getIntegerCharsCountOf(
        numberString: string): number
    {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0)
        {
            return numberString.length;
        }
        return dotIndex;
    };

    /**
     * 获取数字字符串中小数部分的字符个数。
     * @param numberString 指定的数字字符串。
     * @returns 数字字符串中小数部分的字符个数。
     */
    static getFloatNumberDigitsOf(
        numberString: string): number
    {
        let dotIndex = numberString.indexOf(".");
        if (dotIndex < 0)
        {
            return 0;
        }
        return numberString.length - (dotIndex + 1);
    };

    /**
     * 补充“0”到指定的数字字符串中，直到整数部分的字符个数大于等于指定的整数位数。
     * @param numberString 指定的数字字符串。
     * @param integerNumberDigits 指定的整数部分位数。
     * @returns 返回整数部分补足“0”的数字字符串。
     */
    static complementZeroAtIntegerCharsLeftTo(
        numberString: string,
        integerNumberDigits: number): string
    {
        let newString = numberString;
        let integerNumberDigitsNeedComplement
            = integerNumberDigits
            - StringUtil.getIntegerCharsCountOf(newString);
        while (integerNumberDigitsNeedComplement > 0)
        {
            newString = "0" + newString;
            integerNumberDigitsNeedComplement--;
        }
        return newString;
    };

    /**
     * 补充“0”到指定的数字字符串中，直到小数部分的字符个数大于等于指定的小数位数。
     * @param numberString 指定的数字字符串。
     * @param integerNumberDigits 指定的小数部分位数。
     * @returns 返回整数部分补足“0”的数字字符串。
     */
    static complementZeroAtFloatCharsRightTo(
        numberString: string,
        decimalNumberDigits: number): string
    {
        let newString = numberString;
        let decimalNumberDigitsNeedComplement
            = decimalNumberDigits
            - StringUtil.getFloatNumberDigitsOf(newString);
        while (decimalNumberDigitsNeedComplement > 0)
        {
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
    static isEmpty(str: string | null): boolean
    {
        if (str == null
            || str.length < 1)
        {
            return true;
        }
        return false;
    }

    /**
     * 判断指定的字符串，是否不为“null”，或“空字符串”。
     * @param str 指定的字符串对象。
     * @returns 如果指定的字符串对象不为“null”，或“空字符串”，则返回：true，否则返回：false。
     */
    static isNotEmpty(str: string | null): boolean
    {
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
    static isEquals(
        strA: string | null,
        strB: string | null,
        isIgnoreCase: boolean = false,
        isNullEqualsEmpty = true): boolean
    {
        if (strA == strB)
        {
            return true;
        }
        if (strA == null)
        {
            if (strB!.length <= 0
                && isNullEqualsEmpty)
            {
                return true;
            }
            return false;
        }
        if (strB == null)
        {
            if (strA!.length <= 0
                && isNullEqualsEmpty)
            {
                return true;
            }
            return false;
        }

        strA = strA!;
        strB = strB!;
        if (strA.length != strB.length)
        {
            return false;
        }

        let charsCount = strA.length;
        if (isIgnoreCase)
        {
            for (let charIndex = 0;
                charIndex < charsCount;
                charIndex++)
            {
                let charA = strA[charIndex];
                let charB = strB[charIndex];
                if (charA != charB)
                {
                    let charAIntValue = strA.charCodeAt(charIndex);
                    // A-Z
                    if (charAIntValue >= 65
                        && charAIntValue <= 90)
                    {
                        let charBIntValue = strB.charCodeAt(charIndex);
                        if (charBIntValue != (charAIntValue + 32))
                        {
                            return false;
                        }
                    }
                    // a-z
                    else if (charAIntValue >= 97
                        && charAIntValue <= 122)
                    {
                        let charBIntValue = strB.charCodeAt(charIndex);
                        if (charBIntValue != (charAIntValue - 32))
                        {
                            return false;
                        }
                    }
                }
            }
        }
        else
        {
            for (let charIndex = 0;
                charIndex < charsCount;
                charIndex++)
            {
                let charA = strA[charIndex];
                let charB = strB[charIndex];
                if (charA != charB)
                {
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
    static indexOfKeywordIn(
        str: string | null,
        keyword: string | null,
        isIgnoreCase: boolean = false,
        firstCharIndexToSearch = 0): number
    {
        if (StringUtil.isEmpty(str)
            || StringUtil.isEmpty(keyword))
        {
            return -1;
        }

        str = str!;
        keyword = keyword!;

        if ((firstCharIndexToSearch + keyword.length) > str.length)
        {
            return -1;
        }
        if (firstCharIndexToSearch > 0)
        {
            str = str.substring(firstCharIndexToSearch);
        }

        if (isIgnoreCase)
        {
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
    static lastIndexOfKeywordIn(
        str: string | null,
        keyword: string | null,
        isIgnoreCase: boolean = false,
        firstCharIndexToSearch = 0): number
    {
        if (StringUtil.isEmpty(str)
            || StringUtil.isEmpty(keyword))
        {
            return -1;
        }

        str = str!;
        keyword = keyword!;

        if ((firstCharIndexToSearch + keyword.length) > str.length)
        {
            return -1;
        }
        if (firstCharIndexToSearch > 0)
        {
            str = str.substring(firstCharIndexToSearch);
        }

        if (isIgnoreCase)
        {
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
    static isBeginWithKeywordIn(
        str: string | null,
        keyword: string | null,
        isIgnoreCase: boolean = false): boolean
    {
        if (StringUtil.indexOfKeywordIn(
            str,
            keyword,
            isIgnoreCase) == 0)
        {
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
    static isEndWithKeywordIn(
        str: string | null,
        keyword: string | null,
        isIgnoreCase: boolean = false): boolean
    {
        let lastIndexOfKeyword
            = StringUtil.indexOfKeywordIn(
                str,
                keyword,
                isIgnoreCase);
        if (lastIndexOfKeyword >= 0
            && (lastIndexOfKeyword + keyword!.length) == str!.length)
        {
            return true;
        }
        return false;
    };

    /**
     * 获取指定关键字，在指定字符串中出现的全部区域信息数组。
     * @param str 指定的字符串。
     * @param keyword 指定关键字。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @param [firstCharIndexToSearch] 可选参数，指定查找范围的第一个字符索引值，默认为：0。
     * @returns 返回指定关键字，在指定字符串中出现的全部区域信息数组。
     */
    static getRangesOfKeywordIn(
        str: string | null,
        keyword: string | null,
        isIgnoreCase: boolean = false,
        firstCharIndexToSearch = 0): Array<StringRange>
    {
        let keywordRanges = new Array<StringRange>();
        if (StringUtil.isEmpty(str)
            || StringUtil.isEmpty(keyword))
        {
            return keywordRanges
        }

        str = str!
        keyword = keyword!

        if ((firstCharIndexToSearch + keyword.length) > str.length)
        {
            return keywordRanges
        }
        let prevOriginalStringLength = firstCharIndexToSearch;
        if (firstCharIndexToSearch > 0)
        {
            str = str.substring(firstCharIndexToSearch);
        }

        if (isIgnoreCase)
        {
            str = str.toLowerCase()
            keyword = keyword.toLowerCase()
        }

        let keywordLength = keyword.length
        for (let indexOfKeyword = str.indexOf(keyword);
            indexOfKeyword >= 0;
            indexOfKeyword = str.indexOf(keyword))
        {
            let keywordRange = new StringRange(
                prevOriginalStringLength + indexOfKeyword,
                keywordLength)
            {
                keywordRanges.push(keywordRange);
            }

            let nextOriginalStringBeingCharIndex
                = indexOfKeyword
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
     * 在字符串中，使用指定的字符串替换指定的关键字。
     * @param str 要进行替换操作的字符串。
     * @param substringRanges 指定要替换字符串的区域信息数组。
     * @param newSubstringsSpecified 指定要使用的新字符串数组。
     * @param [isUseLastNewSubstringsSpecifiedAsDefault] 是否使用最后一个新字符串作为默认新字符串使用，为“true”时，当指定的字符串区域没有对应的新字符串时，将尝试使用最后一个新字符串进行替换。
     * @returns 使用指定的字符串替换指定的关键字后的字符串。
     */
    static replaceKeywordsInRangesWithStringsSpecifiedIn(
        str: string | null,
        substringRanges: StringRange[] | null,
        newSubstringsSpecified: string[] | null,
        isUseLastNewSubstringsSpecifiedToRange = false): string | null
    {
        if (StringUtil.isEmpty(str))
        {
            return str;
        }
        if (ArrayUtil.isEmpty(substringRanges))
        {
            return str;
        }

        let newString = "";
        let lastSubstringRangeEndCharIndex = 0;
        let substringRangesCount = substringRanges!.length;
        for (let substringRangeIndex = 0;
            substringRangeIndex <= substringRangesCount;
            substringRangeIndex++)
        {
            let substringRange
                = substringRangeIndex < substringRangesCount
                    ? substringRanges![substringRangeIndex]
                    : new StringRange(
                        str!.length,
                        0);

            // 1/2，填充“子字符串区域之间”的文字：
            let originalSubstringBeginCharIndex
                = lastSubstringRangeEndCharIndex;
            let originalSubstringEndCharIndex
                = substringRange.beginCharIndex;
            let originalSubstringLength
                = originalSubstringEndCharIndex
                - originalSubstringBeginCharIndex;
            if (originalSubstringLength > 0)
            {
                let originalSubstring = str?.substring(
                    originalSubstringBeginCharIndex,
                    originalSubstringEndCharIndex);
                {
                    // !!!
                    newString += originalSubstring;
                    // !!!
                }
            }

            // 2/2，填充要替换关键字的新字符：
            if (substringRange.charsCount > 0)
            {
                let newSubstring: string | null = StringUtil.Empty;
                if (newSubstringsSpecified != null)
                {
                    let newSubstringSpecifiedIndex = substringRangeIndex;
                    if (newSubstringSpecifiedIndex >= newSubstringsSpecified.length
                        && isUseLastNewSubstringsSpecifiedToRange)
                    {
                        newSubstringSpecifiedIndex = newSubstringsSpecified.length - 1;
                    }
                    if (newSubstringSpecifiedIndex < newSubstringsSpecified.length)
                    {
                        newSubstring = newSubstringsSpecified[newSubstringSpecifiedIndex];
                        if (newSubstring == null)
                        {
                            newSubstring = StringUtil.Empty;
                        }
                    }
                }
                // !!!
                newString += newSubstring;
                // !!!
            }
            lastSubstringRangeEndCharIndex
                = substringRange.endCharIndex;
        }
        return newString;
    }

    /**
     * 在指定的字符串中替换指定的关键字为指定的新字符串。
     * @param str 指定的字符串。
     * @param keyword 要替换的关键字。
     * @param newValue 要替代关键字的新字符串。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @returns 返回替换成功的关键字数量。
     */
    static replaceAllKeywordIn(
        str: string | null,
        keyword: string | null,
        newValue: string | null,
        isIgnoreCase: boolean = false): string | null
    {
        let keywordRanges
            = StringUtil.getRangesOfKeywordIn(
                str,
                keyword,
                isIgnoreCase)
        if (keywordRanges.length < 1)
        {
            // 没有发现关键字时，返回原始字符串。
            return str;
        }
        if (StringUtil.isEmpty(newValue))
        {
            return str;
        }

        return StringUtil.replaceKeywordsInRangesWithStringsSpecifiedIn(
            str,
            keywordRanges,
            [newValue!],
            true);
    }

    /**
     * 在指定的字符串中替换指定的关键字为指定的新字符串。
     * @param str 指定的字符串。
     * @param keywordArray 要替换的关键字数组。
     * @param newValue 要替代关键字的新字符串。
     * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
     * @returns 返回替换成功的关键字数量。
     */
    static replaceAllKeywordInArrayIn(
        str: string | null,
        keywordArray: string[] | null,
        newValue: string | null,
        isIgnoreCase: boolean = false): string | null
    {
        let newString: string | null = null;
        if (keywordArray != null)
        {
            for (let keyword of keywordArray)
            {
                newString = StringUtil.replaceAllKeywordIn(
                    str,
                    keyword,
                    newValue,
                    isIgnoreCase);
                if (StringUtil.isEmpty(newString))
                {
                    break;
                }
                // !!!
                str = newString;
                // !!!
            }
        }
        return newString;
    }


    /**
     * 根据指定的格式化字符串，格式化指定的值。
     * @param formatter 指定的字符串格式，支持格式有：
     * %%，百分号；
     * “%x1.x2d”，“%x1.x2i”或“%x1.x2f”，
     * 其中x1表示要展示的整数位数，“0”或“不指定”表示不需要限制位数，不足时左侧补“0”，
     * x2表示要展示的浮点数位数，“0”或“不指定”表示不需要限制位数，不足时右侧补“0”。
     * @param values 要进行格式化的值。
     * @returns format 格式化后的字符串。
     */
    static toFormatString(formatter: string | null, ...values: any[]): string
    {
        if (StringUtil.isEmpty(formatter))
        {
            return StringUtil.Empty;
        }

        formatter = formatter!;

        const Placeholder_Escape_Char = "%";
        const Placeholder_Type_Char_Percent = "%";
        const Placeholder_Type_Char_Decimal = "d";
        const Placeholder_Type_Char_Integer = "i";
        const Placeholder_Type_Char_Float = "f";
        const Placeholder_Type_Char_String = "s";

        ////////////////////////////////////////////////
        // 1/2，查找对应的占位符，并设置对应的填充值：
        ////////////////////////////////////////////////
        let placeholderRanges = new Array<StringRange>();
        let placeholderValues = new Array<string>();
        const charsCount = formatter.length;
        for (let charIndex = 0;
            charIndex < charsCount;
            charIndex++)
        {
            let character = formatter.charAt(charIndex);
            if (character == Placeholder_Escape_Char)
            {
                let placeholderRange: StringRange | null = null;
                let placeholderEscapeCharBeginIndex = charIndex;
                let placeholderEscapeCharEndIndex
                    = placeholderEscapeCharBeginIndex
                    + Placeholder_Escape_Char.length;
                for (let placeholderBodyCharIndex = placeholderEscapeCharBeginIndex + 1;
                    placeholderBodyCharIndex < charsCount;
                    placeholderBodyCharIndex++)
                {
                    let placeholderBodyChar = formatter.charAt(placeholderBodyCharIndex);
                    // 如果格式符号字符，为数字，则继续查找。
                    if (StringUtil.isNumberChar(placeholderBodyChar, true))
                    {
                        continue;
                    }
                    let placeholderTypeCharBeginIndex = placeholderBodyCharIndex;
                    // 如果格式符号字符，为转义字符，则尝试结束查找。
                    if (StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Percent, true))
                    {
                        let placeholderParamLength
                            = placeholderTypeCharBeginIndex
                            - placeholderEscapeCharEndIndex;
                        if (placeholderParamLength == 0)
                        {
                            ////////////////////////////////////////////////
                            // !!!
                            placeholderRange
                                = new StringRange(
                                    placeholderEscapeCharBeginIndex,
                                    placeholderTypeCharBeginIndex
                                    + Placeholder_Type_Char_Percent.length
                                    - placeholderEscapeCharBeginIndex);
                            placeholderRanges.push(placeholderRange);
                            placeholderValues.push("%");
                            // !!!
                            ////////////////////////////////////////////////
                        }
                        // !!!
                        charIndex
                            = placeholderEscapeCharBeginIndex
                            + Placeholder_Escape_Char.length
                            + placeholderParamLength
                            + Placeholder_Type_Char_Percent.length
                            - 1;
                        // !!!
                        break;
                        // !!!
                    }
                    // 如果格式符号字符，为整数符号，则尝试结束查找。
                    else if (StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Decimal, true)
                        || StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Integer, true)
                        // 如果格式符号字符，为浮点数符号，则尝试结束查找。
                        || StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Float, true))
                    {
                        let value: number | null = null;
                        let placeholderIndex = placeholderRanges.length;
                        if (values != null
                            && placeholderIndex < values.length)
                        {
                            let valueObject = values[placeholderIndex];
                            if (typeof valueObject == "number")
                            {
                                value = valueObject as number;
                            }
                            else if (typeof valueObject == "string")
                            {
                                value = StringUtil.parseToFloat(valueObject);
                            }
                            else
                            {
                                value = 0;
                            }
                        }

                        let placeholderTypeChar
                            = StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Decimal, true)
                                ? Placeholder_Type_Char_Decimal
                                : (StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Integer, true)
                                    ? Placeholder_Type_Char_Integer
                                    : Placeholder_Type_Char_Float);

                        if (value != null)
                        {
                            let valueString: string = StringUtil.Empty;
                            let placeholderParamString
                                = formatter.substring(
                                    placeholderEscapeCharEndIndex,
                                    placeholderTypeCharBeginIndex);
                            if (StringUtil.isEmpty(placeholderParamString))
                            {
                                valueString = value.toString();
                            }
                            else
                            {
                                let floatCharsCount
                                    = StringUtil.getFloatNumberDigitsOf(placeholderParamString);
                                if (floatCharsCount > 0)
                                {
                                    valueString = value.toFixed(floatCharsCount);
                                }
                                let decimalCharsCount
                                    = StringUtil.getIntegerCharsCountOf(placeholderParamString);
                                if (decimalCharsCount > 0)
                                {
                                    valueString = StringUtil.complementZeroAtIntegerCharsLeftTo(
                                        valueString,
                                        decimalCharsCount);
                                }
                            }
                            ////////////////////////////////////////////////
                            // !!!
                            placeholderRange
                                = new StringRange(
                                    placeholderEscapeCharBeginIndex,
                                    placeholderTypeCharBeginIndex
                                    + placeholderTypeChar.length
                                    - placeholderEscapeCharBeginIndex);
                            placeholderRanges.push(placeholderRange);
                            placeholderValues.push(valueString);
                            // !!!
                            ////////////////////////////////////////////////
                        }

                        // !!!
                        charIndex
                            = placeholderBodyCharIndex
                            + placeholderTypeChar.length
                            - 1;
                        // !!!
                        break;
                        // !!!
                    }
                    // 如果格式符号字符，为字符串符号，则尝试结束查找。
                    else if (StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_String, true))
                    {
                        let placeholderParamLength
                            = placeholderTypeCharBeginIndex
                            - placeholderEscapeCharEndIndex;
                        if (placeholderParamLength == 0)
                        {
                            let valueString: string | null = null;
                            let placeholderIndex = placeholderRanges.length;
                            if (values != null
                                && placeholderIndex < values.length)
                            {
                                let valueObject = values[placeholderIndex];
                                if (typeof valueObject == "string")
                                {
                                    valueString = valueObject;
                                }
                                else
                                {
                                    valueString
                                        = valueObject != null
                                            ? valueObject?.toString()
                                            : StringUtil.Empty;
                                }
                            }

                            if (valueString != null)
                            {
                                ////////////////////////////////////////////////
                                // !!!
                                placeholderRange
                                    = new StringRange(
                                        placeholderEscapeCharBeginIndex,
                                        placeholderTypeCharBeginIndex
                                        + Placeholder_Type_Char_String.length
                                        - placeholderEscapeCharBeginIndex);
                                placeholderRanges.push(placeholderRange);
                                placeholderValues.push(valueString);
                                // !!!
                                ////////////////////////////////////////////////
                            }
                        }
                        // !!!
                        charIndex
                            = placeholderEscapeCharBeginIndex
                            + Placeholder_Escape_Char.length
                            + placeholderParamLength
                            + Placeholder_Type_Char_Percent.length
                            - 1;
                        // !!!
                        break;
                        // !!!
                    }
                }
                if (placeholderRange == null)
                {
                    // !!!
                    charIndex = charsCount - 1;
                    // !!!
                }
            }
        }

        ////////////////////////////////////////////////
        // 2/2，使用对应的填充值，替换格式占位符：
        ////////////////////////////////////////////////
        if (placeholderRanges.length > 0)
        {
            formatter = StringUtil.replaceKeywordsInRangesWithStringsSpecifiedIn(
                formatter,
                placeholderRanges,
                placeholderValues);
        }
        return formatter!;
    }
}
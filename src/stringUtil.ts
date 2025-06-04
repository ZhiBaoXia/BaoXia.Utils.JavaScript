/* ************************************************/
/*
/*          宝匣软件 Java Script 工具集
/*
/* ************************************************/

import { ArrayUtil } from "./arrayUtil.js";
import { NumberRoundType } from "./constant/numberRoundType.js";
import { NumberStringInfo } from "./model/numberStringInfo.js";
import { StringRange } from "./model/stringRange.js";
import { NumberUtil } from "./numberUtil.js";
import { ObjectUtil } from "./objectUtil.js";

export class StringUtil
{
	////////////////////////////////////////////////
	// @静态常量
	////////////////////////////////////////////////

	/**
	 * 空字符串。
	 */
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
		character: string | null | undefined,
		isIncludeDot: boolean = false): boolean
	{
		if (character == null
			|| character == undefined
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
	 * 判断指定的字符串，是否为“数字字符串”。
	 * @param stringValue 指定的字符。
	 * @param [isDecimalsEnable] 是否可以是小数，默认为：true。
	 * @returns 如果指定的字符为“数字字符串”，则返回：true，否则返回：false。
	 */
	static isNumberString(
		stringValue: string | null | undefined,
		isDecimalsEnable: boolean = true
	): boolean
	{
		if (!stringValue
			|| stringValue.length < 1)
		{
			return false;
		}

		const stringValueLength = stringValue.length;
		let indexOfDotChar = -1;
		for (let charIndex = 0;
			charIndex < stringValueLength;
			charIndex++)
		{
			const character = stringValue[charIndex];
			if (character == ".")
			{
				if (isDecimalsEnable != true)
				{
					return false;
				}
				if (indexOfDotChar < 0)
				{
					indexOfDotChar = charIndex;
				}
				else
				{
					return false;
				}
			}
			else if (StringUtil.isNumberChar(character, false) != true)
			{
				return false;
			}
		}
		return true;
	}

	/**
	 * 判断指定的字符，是否为“英文字母字符”。
	 * @param character 指定的字符。
	 * @returns 如果指定的字符为“英文字母字符”，则返回：true，否则返回：false。 
	 */
	static isAlphabetChar(
		character: string | null | undefined): boolean
	{
		if (character == null
			|| character == undefined
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
	 * 判断指定的字符串，是否为“英文字母字符串”。
	 * @param stringValue 指定的字符。
	 * @returns 如果指定的字符为“英文字母字符串”，则返回：true，否则返回：false。
	 */
	static isAlphabetString(
		stringValue: string | null | undefined
	): boolean
	{
		if (!stringValue
			|| stringValue.length < 1)
		{
			return false;
		}
		const stringValueLength = stringValue.length;
		for (let charIndex = 0;
			charIndex < stringValueLength;
			charIndex++)
		{
			const character = stringValue[charIndex];
			if (StringUtil.isAlphabetChar(character) != true)
			{
				return false;
			}
		}
		return true;
	}

	/**
	 * 判断指定的字符是否相等。
	 * @param charA 指定的字符A。
	 * @param charB 指定的字符B。
	 * @param [isIgnoreCase] 是否忽略大小写，默认为：false。
	 * @returns 如果指定的字符相等，则返回：true，否则返回：false。
	 */
	static isSameChar(
		charA: number,
		charB: number,
		isIgnoreCase: boolean = false): boolean
	{
		if (charA == charB)
		{
			return true;
		}
		if (!isIgnoreCase)
		{
			return false;
		}
		// "A-Z"：65-90
		if (charA >= 65
			&& charA <= 90)
		{
			// "a-z"：97-122
			if (charB == charA + 32)
			{
				return true;
			}
		}
		// "a-z"：97-122
		else if (charA >= 97
			&& charA <= 122)
		{
			// "A-Z"：65-90
			if (charB == charA - 32)
			{
				return true;
			}
		}
		return false;
	}


	/**
	 * 指定未知类型的对象是否为字符串。
	 * 
	 * @static
	 * @param {unknown} object 指定的未知类型的对象。 
	 * @returns {boolean} 如果指定未知类型的对象为字符串，则返回：true，否则返回：false。
	 * 
	 * @memberOf StringUtil
	 */
	static isString(object: unknown): boolean
	{
		return ObjectUtil.isString(object);
	}

	/**
	 * 尝试转换字符串为整数数值。
	 * @param string 指定的字符串。
	 * @param [number] 转换失败时返回的数值，默认为：0。
	 * @returns 转换成功时，返回：对应的整数数值，否则返回：0。
	 */
	static parseToInt(
		anyObject: string | null | undefined,
		defaultValue: number = 0): number
	{
		let intValue = defaultValue;
		try
		{
			if (anyObject != null
				&& anyObject != undefined)
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
		anyObject: string | null | undefined,
		defaultValue: number = 0.0): number
	{
		let floatValue = defaultValue;
		try
		{
			if (anyObject != null
				&& anyObject != undefined)
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
	 * 获取数字字符串中整数和小数部分的字符串信息。
	 * @param numberString 指定的数字字符串。
	 * @returns 返回数字字符串中整数和小数部分的字符串信息。
	 */
	static getNumberStringInfo(numberString: string | null | undefined): NumberStringInfo
	{
		if (StringUtil.isEmpty(numberString))
		{
			return new NumberStringInfo();
		}

		numberString = numberString!;

		let integerString: string = StringUtil.Empty;
		let floatString: string = StringUtil.Empty;

		let dotIndex = numberString.indexOf(".");
		if (dotIndex < 0)
		{
			integerString = numberString;
		}
		else
		{
			integerString = numberString.substring(0, dotIndex);
			floatString = numberString.substring(dotIndex + 1);
		}

		let numberStringInfo = new NumberStringInfo(
			dotIndex,
			integerString,
			floatString);
		{ }
		return numberStringInfo;
	}

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
		floatNumberDigits: number): string
	{
		let newString = numberString;
		let floatNumberDigitsNeedComplement
			= floatNumberDigits
			- StringUtil.getFloatNumberDigitsOf(newString);
		if (newString.indexOf(".") < 0)
		{
			newString = newString + ".";
		}
		while (floatNumberDigitsNeedComplement > 0)
		{
			newString = newString + "0";
			floatNumberDigitsNeedComplement--;
		}
		return newString;
	}

	/**
	 * 将指定的数字字符串转换为指定位数的小数位数的数字字符串。
	 * @param numberString 指定的数字字符串。
	 * @param floatNumberDigits 指定的小数位数。
	 * @returns 返回指定位数的小数位数的数字字符串。
	 */
	static stringByFixedFloat(
		numberObject: string | number | null,
		floatNumberDigits: number,
		numberRoundType: NumberRoundType = NumberRoundType.Round): string
	{
		let numberValue = 0;
		if (numberObject != null)
		{
			if (typeof (numberObject) == "number")
			{
				numberValue = numberObject as number;
			}
			else if (typeof (numberObject) == "string")
			{
				numberValue = parseFloat(numberObject as string);
			}
		}
		let numberFixed = NumberUtil.numberByFixed(
			numberValue,
			floatNumberDigits,
			numberRoundType);
		let numberStringFixed = numberFixed.toString();
		let numberStringInfo = StringUtil.getNumberStringInfo(numberStringFixed);
		if (floatNumberDigits > 0)
		{
			if (StringUtil.isEmpty(numberStringInfo.floatString))
			{
				numberStringFixed = numberStringFixed + ".";
				for (let floatNumberDigit = 0;
					floatNumberDigit < floatNumberDigits;
					floatNumberDigit++)
				{
					numberStringFixed = numberStringFixed + "0";
				}
			}
			else
			{
				numberStringFixed = StringUtil.complementZeroAtFloatCharsRightTo(
					numberStringFixed,
					floatNumberDigits);
			}
		}
		else
		{
			// !!!
			numberStringFixed = numberStringInfo.integerString;
			// !!!
		}
		return numberStringFixed;
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
	static isEmpty(str: string | null | undefined): boolean
	{
		if (str == undefined
			|| str == null
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
	static isNotEmpty(str: string | null | undefined): boolean
	{
		return !StringUtil.isEmpty(str);
	}

	/**
	 * 判断指定的字符串，是否为“null”，“空字符串”，或“空白字符串”。
	 * @param str 指定的字符串对象。
	 * @returns 如果指定的字符串对象为“null”，或“空字符串”，则返回：true，否则返回：false。
	 */
	static isBlank(str: string | null | undefined): boolean
	{
		if (str == undefined
			|| str == null
			|| str.length < 1)
		{
			return true;
		}
		for (let character of str)
		{
			if (character != " ")
			{
				return false;
			}
		}
		return true;
	}

	/**
	 * 判断指定的字符串，是否不为“null”，“空字符串”，或“空白字符串”。
	 * @param str 指定的字符串对象。
	 * @returns 如果指定的字符串对象为“null”，或“空字符串”，则返回：true，否则返回：false。
	 */
	static isNotBlank(str: string | null | undefined): boolean
	{
		return !StringUtil.isBlank(str);
	}

	/**
	 * 返回指定字符串，或“Empty”。
	 * @param str 指定的字符串对象。
	 * @returns 指定的字符串对象不为“null”时返回：指定的字符串，否则返回：StringUtil.Empty。
	 */
	static emptyOr(str: string | null | undefined): string
	{
		if (str == null
			|| str == undefined
			|| str.length < 1)
		{
			str = StringUtil.Empty;
		}
		return str;
	}

	/**
	 * 返回指定字符串的长度。
	 * @param str 指定的字符串对象。
	 * @returns 指定的字符串对象不为“null”时返回：指定字符串的长度，否则返回：0 。
	 */
	static lengthOf(str: string | null | undefined): number
	{
		if (str == null
			|| str == undefined)
		{
			return 0;
		}
		return str.length;
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
		strA: string | null | undefined,
		strB: string | null | undefined,
		isIgnoreCase: boolean = false,
		isNullEqualsEmpty = true): boolean
	{
		if (strA == strB)
		{
			return true;
		}
		if (StringUtil.isEmpty(strA))
		{
			if (isNullEqualsEmpty
				&& StringUtil.isEmpty(strB))
			{
				return true;
			}
			return false;
		}
		if (StringUtil.isEmpty(strB))
		{
			if (isNullEqualsEmpty
				&& StringUtil.isEmpty(strA))
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
					else
					{
						// !!!
						return false;
						// !!!
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
	 * 判断指定的两个字符串，是否不相同。
	 * @param strA 指定的字符串A。
	 * @param strB 指定的字符串B。
	 * @param [isIgnoreCase] 可选参数，比较时是否忽略大小写，默认为：false。
	 * @param [isNullEqualsEmpty] 可选参数，是否判定“null”值等同于“空字符串”，默认为：true。
	 * @returns 如果指定的两个字符串相同，则返回：true，否则返回：false。 
	 */
	static isNotEquals(
		strA: string | null | undefined,
		strB: string | null | undefined,
		isIgnoreCase: boolean = false,
		isNullEqualsEmpty = true): boolean
	{
		return !StringUtil.isEquals(
			strA,
			strB,
			isIgnoreCase,
			isNullEqualsEmpty);
	}


	/**
	 * 忽略大小写的，判断指定的两个字符串，是否相同。
	 * @param strA 指定的字符串A。
	 * @param strB 指定的字符串B。
	 * @param [isNullEqualsEmpty] 可选参数，是否判定“null”值等同于“空字符串”，默认为：true。
	 * @returns 如果指定的两个字符串相同，则返回：true，否则返回：false。 
	 */
	static isEqualsIgnoreCase(
		strA: string | null | undefined,
		strB: string | null | undefined,
		isNullEqualsEmpty = true): boolean
	{
		return StringUtil.isEquals(
			strA,
			strB,
			true,
			isNullEqualsEmpty);
	}


	/**
	 * 忽略大小写的，判断指定的两个字符串，是否不相同。
	 * @param strA 指定的字符串A。
	 * @param strB 指定的字符串B。
	 * @param [isNullEqualsEmpty] 可选参数，是否判定“null”值等同于“空字符串”，默认为：true。
	 * @returns 如果指定的两个字符串相同，则返回：true，否则返回：false。 
	 */
	static isNotEqualsIgnoreCase(
		strA: string | null | undefined,
		strB: string | null | undefined,
		isNullEqualsEmpty = true): boolean
	{
		return !StringUtil.isEquals(
			strA,
			strB,
			true,
			isNullEqualsEmpty);
	}

	/**
	 * 字符串A中指定的局部字符串，是否和字符串B中指定的局部字符串相同。
	 * @param stringA 指定的字符串A。
	 * @param stringACompareBeginCharIndex 指定的字符串A中，要比较的局部字符串的起始字符索引值。
	 * @param stringB 指定的字符串B。
	 * @param stringBCompareBeginCharIndex 指定的字符串B中，要比较的局部字符串的起始字符索引值。 
	 * @param compareCharsCount 指定的要比较的字符个数。
	 * @param isIgnoreCase 可选参数，比较时是否忽略大小写，默认为：false。
	 * @param isNullEqualsEmpty 可选参数，是否判定“null”值等同于“空字符串”，默认为：true。
	 * @returns 如果指定的两个字符串相同，则返回：true，否则返回：false。
	 */
	static isSameCharsFromIndexIn(
		stringA: string | null | undefined,
		stringACompareBeginCharIndex: number,
		stringB: string | null | undefined,
		stringBCompareBeginCharIndex: number,
		//
		compareCharsCount: number,
		isIgnoreCase: boolean = false,
		isNullEqualsEmpty = true): boolean
	{
		if ((stringA == null || stringA == undefined)
			&& (stringB == null || stringB == undefined))
		{
			return true;
		}
		if (StringUtil.isEmpty(stringA))
		{
			if (isNullEqualsEmpty
				&& StringUtil.isEmpty(stringB))
			{
				return true;
			}
			return false;
		}
		if (StringUtil.isEmpty(stringB))
		{
			if (isNullEqualsEmpty
				&& StringUtil.isEmpty(stringA))
			{
				return true;
			}
			return false;
		}

		let stringACompareCharsCount = compareCharsCount;
		if (stringACompareBeginCharIndex < 0)
		{
			stringACompareCharsCount += stringACompareBeginCharIndex;
			stringACompareBeginCharIndex = 0;
		}
		let stringBCompareCharsCount = compareCharsCount;
		if (stringBCompareBeginCharIndex < 0)
		{
			stringBCompareCharsCount += stringBCompareBeginCharIndex;
			stringBCompareBeginCharIndex = 0;
		}
		if (stringACompareCharsCount != stringBCompareCharsCount)
		{
			return false;
		}

		compareCharsCount = stringACompareCharsCount;
		if (compareCharsCount < 1)
		{
			return true;
		}

		stringA = stringA!;
		stringB = stringB!;

		let stringACompareEndCharIndex
			= stringACompareBeginCharIndex
			+ compareCharsCount;
		if (stringACompareEndCharIndex > stringA.length)
		{
			return false;
		}
		let stringBCompareEndCharIndex
			= stringBCompareBeginCharIndex
			+ compareCharsCount;
		if (stringBCompareEndCharIndex > stringB.length)
		{
			return false;
		}

		for (let charIndex = 0;
			charIndex < compareCharsCount;
			charIndex++)
		{
			let charCodeA
				= stringA.charCodeAt(stringACompareBeginCharIndex + charIndex);
			let charCodeB
				= stringB.charCodeAt(stringBCompareBeginCharIndex + charIndex);

			if (!StringUtil.isSameChar(
				charCodeA,
				charCodeB,
				isIgnoreCase))
			{
				return false;
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
	 * @param [lastCharIndexToSearch] 可选参数，指定查找范围的最后一个字符索引值，默认为：-1，表示不限制。
	 * @returns 查找到指定的关键字时，返回关键字在指定字符串中的第一次出现的索引值，如果查找不到指定的关键字，则返回：-1。
	 */
	static indexOfKeywordIn(
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false,
		firstCharIndexToSearch = 0,
		lastCharIndexToSearch = -1): number
	{
		if (StringUtil.isEmpty(str)
			|| StringUtil.isEmpty(keyword))
		{
			return -1;
		}

		str = str!;
		keyword = keyword!;

		if (firstCharIndexToSearch < 0)
		{
			firstCharIndexToSearch = 0;
		}
		if (lastCharIndexToSearch < 0)
		{
			lastCharIndexToSearch = str.length;
		}
		let maxCharIndexToSearch = lastCharIndexToSearch + 1 - keyword.length;
		for (let charIndex = firstCharIndexToSearch;
			charIndex <= maxCharIndexToSearch;
			charIndex++)
		{
			if (StringUtil.isSameCharsFromIndexIn(
				str,
				charIndex,
				keyword,
				0,
				keyword.length,
				isIgnoreCase))
			{
				return charIndex;
			}
		}
		return -1;
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
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false,
		firstCharIndexToSearch = 0,
		lastCharIndexToSearch = -1): number
	{
		if (StringUtil.isEmpty(str)
			|| StringUtil.isEmpty(keyword))
		{
			return -1;
		}

		str = str!;
		keyword = keyword!;

		if (firstCharIndexToSearch < 0)
		{
			firstCharIndexToSearch = 0;
		}
		if (lastCharIndexToSearch < 0)
		{
			lastCharIndexToSearch = str.length;
		}
		for (let charIndex = lastCharIndexToSearch + 1 - keyword.length;
			charIndex >= firstCharIndexToSearch;
			charIndex--)
		{
			if (StringUtil.isSameCharsFromIndexIn(
				str,
				charIndex,
				keyword,
				0,
				keyword.length,
				isIgnoreCase))
			{
				return charIndex;
			}
		}
		return -1;
	}

	/**
	 * 是否指定的字符串是以指定的关键字开头。
	 * @param str 指定的字符串。
	 * @param keyword 指定的关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 当指定的字符串是以指定的关键字开头开头时，返回：true，否则返回：false。
	 */
	static isBeginWithKeywordIn(
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false): boolean
	{
		if (StringUtil.indexOfKeywordIn(
			str,
			keyword,
			isIgnoreCase,
			0,
			keyword != null
				? keyword.length - 1
				: 0) == 0)
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
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false): boolean
	{
		let lastIndexOfKeyword
			= StringUtil.lastIndexOfKeywordIn(
				str,
				keyword,
				isIgnoreCase,
				(str != null && keyword != null)
					? str.length - keyword.length
					: 0);
		if (lastIndexOfKeyword >= 0
			&& (lastIndexOfKeyword + keyword!.length) == str!.length)
		{
			return true;
		}
		return false;
	};

	/**
	 * 是否指定的字符串包含指定的关键字。
	 * @param str 指定的字符串。
	 * @param keyword 指定的关键字。
	 * @param [isIgnoreCase] 查找时是否忽略大小写，默认为： false 。
	 * @returns 当指定的字符串包含指定的关键字时，返回：true，否则返回：false。
	 */
	static isContainsKeywordIn(
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false): boolean
	{
		return this.indexOfKeywordIn(
			str,
			keyword,
			isIgnoreCase) >= 0;
	}

	/**
	 * 计算字符串中指定键的出现次数。
	 * @param stringValue 指定的字符串。
	 * @param keywords 指定的关键词。
	 * @param [isIgnoreCase] 是否忽略大小写，默认为：true。
	 * @param [isKeywordsOverlapEnable] 是否允许关键词重叠计数，默认为：false。
	 * @returns 返回字符串中指定键的出现次数。
	 */
	static countOfStringIn(
		stringValue?: string | null,
		keywords?: string | null,
		isIgnoreCase: boolean = true,
		isKeywordsOverlapEnable: boolean = false
	): number
	{
		if (StringUtil.isEmpty(stringValue)
			|| StringUtil.isEmpty(keywords))
		{
			return 0.0;
		}

		stringValue = stringValue!;
		keywords = keywords!;

		let keysCount = 0;
		const keyLength = keywords.length;
		let lastKeyEndIndex = 0;

		while (true)
		{
			const indexOfKey = StringUtil.indexOfKeywordIn(
				stringValue,
				keywords,
				isIgnoreCase,
				lastKeyEndIndex);
			if (indexOfKey >= 0)
			{
				keysCount++;
				if (isKeywordsOverlapEnable)
				{
					lastKeyEndIndex = indexOfKey + 1;
				} else
				{
					lastKeyEndIndex = indexOfKey + keyLength;
				}
			}
			else
			{
				break;
			}
		}
		return keysCount;
	}

	/**
	 * 计算字符串中匹配值的匹配进度值
	 * @param stringValue 要搜索的字符串
	 * @param matchValue 要匹配的关键字
	 * @param isIgnoreCase 是否忽略大小写，默认为true
	 * @param isMatchValueCharsOverlapEnable 是否允许匹配值字符重叠，默认为false
	 * @returns 返回匹配进度值，范围在0到1之间
	 */
	static getMatchProgressValueIn(
		stringValue?: string | null,
		matchValue?: string | null,
		isIgnoreCase: boolean = true,
		isMatchValueCharsOverlapEnable: boolean = false)
	{
		if (StringUtil.isEmpty(stringValue)
			|| StringUtil.isEmpty(matchValue))
		{
			return 0.0;
		}

		stringValue = stringValue!;
		matchValue = matchValue!;

		var searchKeysCount = StringUtil.countOfStringIn(
			stringValue,
			matchValue,
			isIgnoreCase,
			isMatchValueCharsOverlapEnable);
		if (searchKeysCount < 0)
		{
			return 0;
		}
		var matchedProgressValue
			= (matchValue.length * searchKeysCount)
			/ stringValue.length;
		{ }
		return matchedProgressValue;
	}

	/**
	 * 获取指定字符串的左边指定长度的子字符串。
	 * @param str 指定的字符串。
	 * @param leftLength 指定长度。
	 * @returns 返回指定字符串的左边指定长度的子字符串。
	 */
	static left(str: string | null | undefined, leftLength: number): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		if (leftLength >= str!.length)
		{
			leftLength = str.length;
		}
		if (leftLength <= 0)
		{
			return StringUtil.Empty;
		}
		let leftSubstring = str.substring(0, leftLength);
		{ }
		return leftSubstring;
	}

	/**
	 * 获取指定字符串的右边指定长度的子字符串。
	 * @param str 指定的字符串。
	 * @param rightLength 指定长度。
	 * @returns 返回指定字符串的右边指定长度的子字符串。
	 */
	static right(str: string | null | undefined, rightLength: number): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		if (rightLength >= str!.length)
		{
			rightLength = str.length;
		}
		if (rightLength <= 0)
		{
			return StringUtil.Empty;
		}
		let rightSubstring = str.substring(str.length - rightLength);
		{ }
		return rightSubstring;
	}

	/**
	 * 获取在指定字符串中位于指定关键字左侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 * @param str 指定的字符串。
	 * @param keyword 指定的关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回在指定字符串中位于指定关键字左侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 */
	static substringBefore(
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		let substring = str;
		let indexOfKeyword = StringUtil.indexOfKeywordIn(
			str,
			keyword,
			isIgnoreCase);
		if (indexOfKeyword >= 0)
		{
			substring = str.substring(0, indexOfKeyword);
		}
		return substring;
	}

	/**
	 * 获取在指定字符串中位于指定关键字（最后一次出现）左侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 * @param str 指定的字符串。
	 * @param keyword 指定的关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回在指定字符串中位于指定关键字（最后一次出现）左侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 */
	static substringBeforeLast(
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		let substring = str;
		let lastIndexOfKeyword = StringUtil.lastIndexOfKeywordIn(
			str,
			keyword,
			isIgnoreCase);
		if (lastIndexOfKeyword >= 0)
		{
			substring = str.substring(0, lastIndexOfKeyword);
		}
		return substring;
	}

	/**
	 * 获取在指定字符串中位于指定关键字右侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 * @param str 指定的字符串。
	 * @param keyword 指定的关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回在指定字符串中位于指定关键字右侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 */
	static substringAfter(
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		let substring = str;
		let indexOfKeyword = StringUtil.indexOfKeywordIn(
			str,
			keyword,
			isIgnoreCase);
		if (indexOfKeyword >= 0)
		{
			substring = str.substring(indexOfKeyword + keyword!.length);
		}
		return substring;
	}

	/**
	 * 获取在指定字符串中位于指定关键字（最后一次出现）右侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 * @param str 指定的字符串。
	 * @param keyword 指定的关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回在指定字符串中位于指定关键字（最后一次出现）右侧的子字符串，没有查找到关键字时，返回整个指定字符串。
	 */
	static substringAfterLast(
		str: string | null | undefined,
		keyword: string | null | undefined,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		let substring = str;
		let lastIndexOfKeyword = StringUtil.lastIndexOfKeywordIn(
			str,
			keyword,
			isIgnoreCase);
		if (lastIndexOfKeyword >= 0)
		{
			substring = str.substring(lastIndexOfKeyword + keyword!.length);
		}
		return substring;
	}

	/**
	 * 移除指定字符串左边的关键字。
	 * @param str 指定的字符串。
	 * @param keywordsNeedTrimed 需要被移除的关键字数组。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回移除指定字符串左边的关键字后的字符串。
	 */
	static trimLeftKeywordsIn(
		str: string | null | undefined,
		keywordsNeedTrimed: Array<string>,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		if (ArrayUtil.isEmpty(keywordsNeedTrimed))
		{
			return str;
		}

		for (let keywordNeedTrimed of keywordsNeedTrimed)
		{
			if (StringUtil.isBeginWithKeywordIn(
				str,
				keywordNeedTrimed,
				isIgnoreCase))
			{
				str = str.substring(keywordNeedTrimed.length);
			}
		}

		return str;
	}

	/**
	 * 移除指定字符串左边的关键字。
	 * @param str 指定的字符串。
	 * @param keywordsNeedTrimed 需要被移除的关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回移除指定字符串左边的关键字后的字符串。
	 */
	static trimLeftKeywordIn(
		str: string | null | undefined,
		keywordNeedTrimed: string | null | undefined,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(keywordNeedTrimed))
		{
			return StringUtil.emptyOr(str);
		}

		return this.trimLeftKeywordsIn(
			str,
			[keywordNeedTrimed!],
			isIgnoreCase);
	}

	/**
	 * 移除指定字符串右边的关键字。
	 * @param str 指定的字符串。
	 * @param keywordsNeedTrimed 需要被移除的关键字数组。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回移除指定字符串右边的关键字后的字符串。
	 */
	static trimRightKeywordsIn(
		str: string | null | undefined,
		keywordsNeedTrimed: Array<string>,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(str))
		{
			return StringUtil.Empty;
		}

		str = str!;

		if (ArrayUtil.isEmpty(keywordsNeedTrimed))
		{
			return str;
		}

		for (let keywordNeedTrimed of keywordsNeedTrimed)
		{
			if (StringUtil.isEndWithKeywordIn(
				str,
				keywordNeedTrimed,
				isIgnoreCase))
			{
				str = str.substring(
					0,
					str.length - keywordNeedTrimed.length);
			}
		}

		return str;
	}

	/**
	 * 移除指定字符串右边的关键字。
	 * @param str 指定的字符串。
	 * @param keywordsNeedTrimed 需要被移除的关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @returns 返回移除指定字符串右边的关键字后的字符串。
	 */
	static trimRightKeywordIn(
		str: string | null | undefined,
		keywordNeedTrimed: string | undefined,
		isIgnoreCase: boolean = false): string
	{
		if (StringUtil.isEmpty(keywordNeedTrimed))
		{
			return StringUtil.emptyOr(str);
		}

		return this.trimRightKeywordsIn(
			str,
			[keywordNeedTrimed!],
			isIgnoreCase);
	}

	/**
	 * 获取指定关键字，在指定字符串中出现的全部区域信息数组。
	 * @param str 指定的字符串。
	 * @param keyword 指定关键字。
	 * @param [isIgnoreCase] 可选参数，查找时是否忽略大小写，默认为：false。
	 * @param [firstCharIndexToSearch] 可选参数，指定查找范围的第一个字符索引值，默认为：0。
	 * @returns 返回指定关键字，在指定字符串中出现的全部区域信息数组。
	 */
	static getRangesOfKeywordIn(
		str: string | null | undefined,
		keyword: string | null | undefined,
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
		str: string | null | undefined,
		substringRanges: StringRange[] | null,
		newSubstringsSpecified: string[] | null,
		isUseLastNewSubstringsSpecifiedToRange = false): string | null
	{
		if (StringUtil.isEmpty(str))
		{
			if (str == undefined)
			{
				return null;
			}
			return str;
		}
		if (ArrayUtil.isEmpty(substringRanges))
		{
			if (str == undefined)
			{
				return null;
			}
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
		str: string | null | undefined,
		keyword: string | null | undefined,
		newValue: string | null | undefined,
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
			if (str == undefined)
			{
				str = null;
			}
			return str;
		}
		if (StringUtil.isEmpty(newValue))
		{
			if (str == undefined)
			{
				str = null;
			}
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
		str: string | null | undefined,
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
	static format(formatter: string | null | undefined, ...values: any[]): string
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
		let currentObjectValuesIndex = 0;
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
					////////////////////////////////////////////////
					// 格式占位符类型字符，为整数符号“%n.nd”或“%n.ni”：
					////////////////////////////////////////////////
					else if (StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Decimal, true)
						|| StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Integer, true))
					{
						let value: number | null = null;
						if (values != null
							&& currentObjectValuesIndex < values.length)
						{
							let valueObject = values[currentObjectValuesIndex];
							// !!!
							currentObjectValuesIndex++;
							// !!!
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
								: Placeholder_Type_Char_Integer;

						if (value != null)
						{
							let valueString: string = StringUtil.Empty;
							let placeholderParamString
								= formatter.substring(
									placeholderEscapeCharEndIndex,
									placeholderTypeCharBeginIndex);
							{
								let integerCharsCountMin = -1;
								let integerCharsCountMax = -1;
								// 整数类型的占位符，浮点数的位数永远为“0”
								let floatCharsCount = 0;
								let numberStringInfo
									= StringUtil.getNumberStringInfo(placeholderParamString);
								if (StringUtil.isNotEmpty(numberStringInfo.integerString))
								{
									integerCharsCountMin
										= this.parseToInt(numberStringInfo.integerString);
								}
								if (StringUtil.isNotEmpty(numberStringInfo.floatString))
								{
									integerCharsCountMax
										= this.parseToInt(numberStringInfo.floatString);
								}

								// !!!
								valueString
									= StringUtil.stringByFixedFloat(
										value,
										floatCharsCount);
								// !!!
								if (integerCharsCountMin > 0)
								{
									valueString = StringUtil.complementZeroAtIntegerCharsLeftTo(
										valueString,
										integerCharsCountMin);
								}
								if (integerCharsCountMax > 0)
								{
									if (valueString.length > integerCharsCountMax)
									{
										valueString = valueString.substring(
											valueString.length - integerCharsCountMax);
									}
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
					////////////////////////////////////////////////
					// 格式占位符类型字符，为浮点数符号“%n.nf”：
					////////////////////////////////////////////////
					else if (StringUtil.isEquals(placeholderBodyChar, Placeholder_Type_Char_Float, true))
					{
						let value: number | null = null;
						if (values != null
							&& currentObjectValuesIndex < values.length)
						{
							let valueObject = values[currentObjectValuesIndex];
							// !!!
							currentObjectValuesIndex++;
							// !!!
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
							= Placeholder_Type_Char_Float;
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
								let integerCharsCount = -1;
								let floatCharsCount = -1;
								let numberStringInfo
									= StringUtil.getNumberStringInfo(placeholderParamString);
								if (numberStringInfo != null)
								{
									if (StringUtil.isNotEmpty(numberStringInfo.integerString))
									{
										integerCharsCount
											= this.parseToInt(numberStringInfo.integerString);
									}
									if (StringUtil.isNotEmpty(numberStringInfo.floatString))
									{
										floatCharsCount
											= this.parseToInt(numberStringInfo.floatString);
									}
								}
								if (floatCharsCount >= 0)
								{
									valueString
										= StringUtil.stringByFixedFloat(
											value,
											floatCharsCount);
								}
								else
								{
									valueString = value.toString();
								}
								if (integerCharsCount > 0)
								{
									valueString = StringUtil.complementZeroAtIntegerCharsLeftTo(
										valueString,
										integerCharsCount);
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
							if (values != null
								&& currentObjectValuesIndex < values.length)
							{
								let valueObject = values[currentObjectValuesIndex];
								// !!!
								currentObjectValuesIndex++;
								// !!!
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

	/**
	 * 使用指定的分隔符连接指定的字符串数组。
	 * @param delimiter 指定的连接分隔符。
	 * @param isDelimiterConsecutiveDisable 是否允许连续的分隔符，在“连接处”出现。 
	 * @param substrings 要进行连接的字符串数组。
	 * @returns 使用指定的分隔符连接指定字符串数组后，生成的最终字符串。
	 */
	static joinStringsWithDelimiter(
		delimiter: string | null | undefined,
		isDelimiterConsecutiveDisable: boolean,
		...substrings: (string | null | undefined)[] | Array<string | null | undefined>[]): string
	{
		if (ArrayUtil.isEmpty(substrings))
		{
			return StringUtil.Empty;
		}
		let finalSubstrings: Array<string | null | undefined>;
		if (substrings[0] instanceof Array)
		{
			if (substrings.length == 1)
			{
				finalSubstrings = substrings[0];
			}
			else
			{
				finalSubstrings = new Array<string | null | undefined>();
				for (let stringArray of substrings)
				{
					if (stringArray instanceof Array)
					{
						finalSubstrings = finalSubstrings.concat(stringArray);
					}
					else// if (typeof (stringArray) == 'string')
					{
						finalSubstrings.push(stringArray);
					}
				}
			}
		}
		else
		{
			finalSubstrings = substrings as (string | null | undefined)[];
		}

		let finalString = StringUtil.Empty;
		let isDelimiterNotEmpty = StringUtil.isNotEmpty(delimiter);
		let finalDelimiter = isDelimiterNotEmpty
			? delimiter as string
			: StringUtil.Empty;
		for (let substring of finalSubstrings)
		{
			if (substring
				&& substring.length > 0)
			{
				if (isDelimiterConsecutiveDisable)
				{
					while (substring.startsWith(finalDelimiter))
					{
						substring = substring.substring(finalDelimiter.length);
					}
					while (substring.endsWith(finalDelimiter))
					{
						substring = substring.substring(0, substring.length - finalDelimiter.length);
					}
					if (substring.length < 1)
					{
						// !!!
						continue;
						// !!!
					}
					if (finalString.length > 0)
					{
						finalString += finalDelimiter;
					}
				}
			}
			else if (isDelimiterConsecutiveDisable)
			{
				// !!!
				continue;
				// !!!
			}

			// !!!
			finalString += substring;
			// !!!
		}
		return finalString;
	}
}
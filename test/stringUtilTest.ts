import { TestCase, StringUtil } from "../src/index.js";

export class StringUtilTest extends TestCase
{
	constructor()
	{
		super("StringUtil Test",
			(assert, assertFalse) =>
			{
				////////////////////////////////////////////////
				// 字符串比较相关测试：
				////////////////////////////////////////////////

				// “isNumberString”测试：
				{
					assert(StringUtil.isNumberString("a123") == false);
					assert(StringUtil.isNumberString("123a") == false);
					assert(StringUtil.isNumberString("123") == true);
					assert(StringUtil.isNumberString("123.0") == true);
				}

				// “isAlphabetString”测试：
				{
					assert(StringUtil.isAlphabetString("a123") == false);
					assert(StringUtil.isAlphabetString("123a") == false);
					assert(StringUtil.isAlphabetString("123") == false);
					assert(StringUtil.isAlphabetString("123.0") == false);
					assert(StringUtil.isAlphabetString("a") == true);
					assert(StringUtil.isAlphabetString("A") == true);
					assert(StringUtil.isAlphabetString("aA") == true);
					assert(StringUtil.isAlphabetString("a啊") == false);
				}

				// “getMatchProgressValueIn”测试：
				{
					// 当任意一个字符串为空时，应返回 0。
					assert(StringUtil.getMatchProgressValueIn('', 'test') == 0);
					assert(StringUtil.getMatchProgressValueIn('test', '') == 0);
					assert(StringUtil.getMatchProgressValueIn(undefined, 'test') == 0);
					assert(StringUtil.getMatchProgressValueIn('test', null) == 0);

					// 当 countOfStringIn 返回负数时，应返回 0。
					assert(StringUtil.getMatchProgressValueIn('hello', 'world') == 0);

					// 对于单次匹配，应计算出正确的进度。
					let matchProgressValue = StringUtil.getMatchProgressValueIn('hello world', 'hello');
					assert(matchProgressValue == 5 / 11); // (5 * 1) / 11

					// 对于多次匹配，应计算出正确的进度。
					matchProgressValue = StringUtil.getMatchProgressValueIn('hello hello', 'hello');
					assert(matchProgressValue == 10 / 11); // (5 * 2) / 11

					// 当 isIgnoreCase 为 false 时，应处理大小写敏感情况。
					matchProgressValue = StringUtil.getMatchProgressValueIn('Hello', 'hello', false);
					assert(matchProgressValue == 0);

					// 当 isIgnoreCase 为 false 时，应处理大小写敏感情况。
					matchProgressValue = StringUtil.getMatchProgressValueIn('Hello', 'hello', true);
					assert(matchProgressValue == 5 / 5);

					// 当启用重叠匹配时，应处理重叠匹配情况。
					matchProgressValue = StringUtil.getMatchProgressValueIn('aaa', 'aa', true, true);
					assert(matchProgressValue == 4 / 3); // (2 * 3) / 3

					// 对于完全匹配的情况，应返回 1。
					matchProgressValue = StringUtil.getMatchProgressValueIn('test', 'test');
					assert(matchProgressValue == 1); // (4 * 1) / 4

					// 对于无匹配的情况，应返回 0。
					matchProgressValue = StringUtil.getMatchProgressValueIn('hello', 'world');
					assert(matchProgressValue == 0);
				}



				////////////////////////////////////////////////
				// 数字操作相关测试：
				////////////////////////////////////////////////
				{
					let number = StringUtil.parseToInt("0");
					// !!!
					assert(number == 0);
					// !!!

					number = StringUtil.parseToInt("123");
					// !!!
					assert(number == 123);
					// !!!
					// !!!

					number = StringUtil.parseToInt("0123");
					// !!!
					assert(number == 123);
					// !!!
					// !!!

					number = StringUtil.parseToInt("123.0");
					// !!!
					assert(number == 123);
					// !!!

					number = StringUtil.parseToInt("123.5");
					// !!!
					assert(number == 123);
					// !!!


					number = StringUtil.parseToInt("-123");
					// !!!
					assert(number == -123);
					// !!!

					number = StringUtil.parseToInt("a123");
					// !!!
					assert(number == 0);
					// !!!

					number = StringUtil.parseToInt("a456", 789);
					// !!!
					assert(number == 789);
					// !!!


					////////////////////////////////////////////////


					number = StringUtil.parseToFloat("0");
					// !!!
					assert(number == 0);
					// !!!

					number = StringUtil.parseToFloat("123");
					// !!!
					assert(number == 123);
					// !!!
					// !!!

					number = StringUtil.parseToFloat("0123");
					// !!!
					assert(number == 123);
					// !!!
					// !!!

					number = StringUtil.parseToFloat("123.0");
					// !!!
					assert(number == 123.0);
					// !!!

					number = StringUtil.parseToFloat("123.5");
					// !!!
					assert(number == 123.5);
					// !!!


					number = StringUtil.parseToFloat("-123");
					// !!!
					assert(number == -123);
					// !!!

					number = StringUtil.parseToFloat("a123");
					// !!!
					assert(number == 0);
					// !!!

					number = StringUtil.parseToFloat("a456", 789.0);
					// !!!
					assert(number == 789.0);
					// !!!
				}

				////////////////////////////////////////////////
				// 字符串操作相关测试：
				////////////////////////////////////////////////
				{
					const originalString = "0123Abc0123Abc";
					const originalString_Copied = originalString + StringUtil.Empty;
					const originalString_LowerCase = originalString.toLowerCase();

					if (StringUtil.isEquals(originalString, originalString_Copied))
					{
						assert(true);
					}
					if (!StringUtil.isNotEquals(originalString, originalString_Copied))
					{
						assert(true);
					}
					if (StringUtil.isEquals(originalString, originalString_LowerCase, true))
					{
						assert(true);
					}
					if (!StringUtil.isNotEquals(originalString, originalString_LowerCase, true))
					{
						assert(true);
					}

					if (StringUtil.isEqualsIgnoreCase(originalString, originalString_Copied))
					{
						assert(true);
					}
					if (!StringUtil.isNotEqualsIgnoreCase(originalString, originalString_Copied))
					{
						assert(true);
					}
					if (StringUtil.isEqualsIgnoreCase(originalString, originalString_LowerCase))
					{
						assert(true);
					}
					if (!StringUtil.isNotEqualsIgnoreCase(originalString, originalString_LowerCase))
					{
						assert(true);
					}


					let leftSubstring = StringUtil.left(originalString, 0);
					{
						assert(leftSubstring == StringUtil.Empty);
					}
					leftSubstring = StringUtil.left(originalString, 3);
					{
						assert(leftSubstring == "012");
					}

					let rightSubstring = StringUtil.right(originalString, 0);
					{
						assert(rightSubstring == StringUtil.Empty);
					}
					rightSubstring = StringUtil.right(originalString, 3);
					{
						assert(rightSubstring == "Abc");
					}

					leftSubstring = StringUtil.substringBefore(originalString, "Abc");
					{
						assert(leftSubstring == "0123");
					}
					leftSubstring = StringUtil.substringBefore(originalString, "abc", true);
					{
						assert(leftSubstring == "0123");
					}
					leftSubstring = StringUtil.substringBeforeLast(originalString, "Abc");
					{
						assert(leftSubstring == "0123Abc0123");
					}
					leftSubstring = StringUtil.substringBeforeLast(originalString, "abc", true);
					{
						assert(leftSubstring == "0123Abc0123");
					}

					rightSubstring = StringUtil.substringAfter(originalString, "Abc");
					{
						assert(rightSubstring == "0123Abc");
					}
					rightSubstring = StringUtil.substringAfter(originalString, "abc", true);
					{
						assert(rightSubstring == "0123Abc");
					}
					rightSubstring = StringUtil.substringAfterLast(originalString, "Abc");
					{
						assert(rightSubstring == "");
					}
					rightSubstring = StringUtil.substringAfterLast(originalString, "abc", true);
					{
						assert(rightSubstring == "");
					}


					let newString = StringUtil.replaceAllKeywordIn(
						originalString,
						"0123",
						"4567");
					{
						// !!!
						assert(newString == "4567Abc4567Abc")
						// !!!   
					}

					newString = StringUtil.replaceAllKeywordIn(
						originalString,
						"Abc",
						"Def");
					{
						// !!!
						assert(newString == "0123Def0123Def")
						// !!!   
					}

					newString = StringUtil.replaceAllKeywordIn(
						originalString,
						"abc",
						"Def",
						true);
					{
						// !!!
						assert(newString == "0123Def0123Def")
						// !!!   
					}

					newString = StringUtil.replaceAllKeywordInArrayIn(
						originalString,
						["4567", "Abc"],
						"Def");
					{
						// !!!
						assert(newString == "0123Def0123Def")
						// !!!   
					}

					newString = StringUtil.replaceAllKeywordInArrayIn(
						originalString,
						["4567", "abc"],
						"Def",
						true);
					{
						// !!!
						assert(newString == "0123Def0123Def")
						// !!!   
					}

					newString = StringUtil.replaceAllKeywordInArrayIn(
						originalString,
						["0123", "Abc"],
						"Def");
					{
						// !!!
						assert(newString == "DefDefDefDef")
						// !!!   
					}

					newString = StringUtil.replaceAllKeywordInArrayIn(
						originalString,
						["0123", "abc"],
						"Def",
						true);
					{
						// !!!
						assert(newString == "DefDefDefDef")
						// !!!   
					}

					newString = StringUtil.joinStringsWithDelimiter(
						",",
						true,
						"0",
						"1",
						"2",);
					{
						// !!!
						assert(newString == "0,1,2")
						// !!!   
					}

					newString = StringUtil.joinStringsWithDelimiter(
						",",
						true,
						"0,",
						",1,",
						",2",);
					{
						// !!!
						assert(newString == "0,1,2")
						// !!!   
					}

					newString = StringUtil.joinStringsWithDelimiter(
						",",
						true,
						["0", "1", "2"]);
					{
						// !!!
						assert(newString == "0,1,2")
						// !!!   
					}
				}
			});
	}
}
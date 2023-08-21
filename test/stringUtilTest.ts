import { TestCase, StringUtil } from "../src/index.js";

export class StringUtilTest extends TestCase
{
    constructor()
    {
        super("StringUtil Test",
            (assert, assertFalse) =>
            {
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
import { TestCase } from "@baoxia/utils.javascript.testutil";
import { StringUtil } from "../src/index.js";

export class StringUtilIndexOfTest extends TestCase
{
    constructor()
    {
        super("StringUtil.indexOf Test",
            (assert, assertFalse) =>
            {
                const testStringA = "012Abc678def901901def678Abc012";
                // indexOf
                {
                    assert(StringUtil.indexOfKeywordIn(testStringA, "012") === 0);

                    assert(StringUtil.indexOfKeywordIn(testStringA, "Abc") === 3);

                    assert(StringUtil.indexOfKeywordIn(testStringA, "678") === 6);

                    assert(StringUtil.indexOfKeywordIn(testStringA, "def") === 9);

                    assert(StringUtil.indexOfKeywordIn(testStringA, "901") === 12);

                    assert(StringUtil.indexOfKeywordIn(testStringA, "Not found") === -1);
                }
                // lastIndexOf
                {
                    assert(StringUtil.lastIndexOfKeywordIn(testStringA, "012") === 27);

                    assert(StringUtil.lastIndexOfKeywordIn(testStringA, "Abc") === 24);

                    assert(StringUtil.lastIndexOfKeywordIn(testStringA, "678") === 21);

                    assert(StringUtil.lastIndexOfKeywordIn(testStringA, "def") === 18);

                    assert(StringUtil.lastIndexOfKeywordIn(testStringA, "901") === 15);

                    assert(StringUtil.lastIndexOfKeywordIn(testStringA, "Not found") === -1);
                }

                const testStringB = "012abc678def901901Def678Abc012";
                // indexOf with ignoreCase
                {
                    assert(StringUtil.indexOfKeywordIn(testStringB, "Abc") === 24);
                    assert(StringUtil.indexOfKeywordIn(testStringB, "Abc", true) === 3);

                    assert(StringUtil.indexOfKeywordIn(testStringB, "Def") === 18);
                    assert(StringUtil.indexOfKeywordIn(testStringB, "Def", true) === 9);
                }
                // lastIndexOf with ignoreCase
                {
                    assert(StringUtil.lastIndexOfKeywordIn(testStringB, "abc") === 3);
                    assert(StringUtil.lastIndexOfKeywordIn(testStringB, "abc", true) === 24);

                    assert(StringUtil.lastIndexOfKeywordIn(testStringB, "def") === 9);
                    assert(StringUtil.lastIndexOfKeywordIn(testStringB, "def", true) === 18);
                }

                const testStringC = "abcdefghi";
                // isBeginWithKeyword
                {
                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "abc") === true);
                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "def") === false);

                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "012") === false);
                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "abcdefghijkl") === false);

                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "Abc", true) === true);
                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "Def", true) === false);

                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "012", true) === false);
                    assert(StringUtil.isBeginWithKeywordIn(testStringC, "abcdefghijkl", true) === false);
                }
                // isEndWithKeyword
                {
                    assert(StringUtil.isEndWithKeywordIn(testStringC, "ghi") === true);
                    assert(StringUtil.isEndWithKeywordIn(testStringC, "def") === false);

                    assert(StringUtil.isEndWithKeywordIn(testStringC, "012") === false);
                    assert(StringUtil.isEndWithKeywordIn(testStringC, "abcdefghijkl") === false);

                    assert(StringUtil.isEndWithKeywordIn(testStringC, "ghi", true) === true);
                    assert(StringUtil.isEndWithKeywordIn(testStringC, "Def", true) === false);

                    assert(StringUtil.isEndWithKeywordIn(testStringC, "012", true) === false);
                    assert(StringUtil.isEndWithKeywordIn(testStringC, "abcdefghijkl", true) === false);
                }
            });
    }
}
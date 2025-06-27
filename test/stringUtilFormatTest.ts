import { TestCase } from "@baoxia/utils.javascript.testutil";
import { StringUtil } from "../src/index.js";

export class StringUtilFormatTest extends TestCase
{
    constructor()
    {
        super("StringUtilFormatTest Test",
            (assert, assertFalse) =>
            {
                let stringFormated
                    = StringUtil.format(
                        "0123Abc");
                {
                    assert(stringFormated == "0123Abc");
                }

                stringFormated
                    = StringUtil.format("%");
                {
                    assert(stringFormated == "%");
                }
                stringFormated
                    = StringUtil.format("%%");
                {
                    assert(stringFormated == "%");
                }
                stringFormated
                    = StringUtil.format("%%0123");
                {
                    assert(stringFormated == "%0123");
                }
                stringFormated
                    = StringUtil.format("01%%23");
                {
                    assert(stringFormated == "01%23");
                }
                stringFormated
                    = StringUtil.format("0123%%");
                {
                    assert(stringFormated == "0123%");
                }
                stringFormated
                    = StringUtil.format("%%0123%%");
                {
                    assert(stringFormated == "%0123%");
                }
                stringFormated
                    = StringUtil.format("%%01%%23%%");
                {
                    assert(stringFormated == "%01%23%");
                }

                stringFormated
                    = StringUtil.format("%%%");
                {
                    assert(stringFormated == "%%");
                }
                stringFormated
                    = StringUtil.format("%%%%");
                {
                    assert(stringFormated == "%%");
                }
                stringFormated
                    = StringUtil.format("%%%%%");
                {
                    assert(stringFormated == "%%%");
                }
                stringFormated
                    = StringUtil.format("%%%%%%");
                {
                    assert(stringFormated == "%%%");
                }

                stringFormated
                    = StringUtil.format("%s", "abc");
                {
                    assert(stringFormated == "abc");
                }
                stringFormated
                    = StringUtil.format("%%s", "abc");
                {
                    assert(stringFormated == "%s");
                }
                stringFormated
                    = StringUtil.format("%s%", "abc");
                {
                    assert(stringFormated == "abc%");
                }
                stringFormated
                    = StringUtil.format("%s%%", "abc");
                {
                    assert(stringFormated == "abc%");
                }

                ////////////////////////////////////////////////
                // 纯整数部分格式化。
                ////////////////////////////////////////////////

                let numberPlaceholders: string[] = ["%d", "%i", "%f"];
                for (let numberPlaceholder of numberPlaceholders)
                {
                    stringFormated
                        = StringUtil.format(numberPlaceholder, 123);
                    {
                        assert(stringFormated == "123");
                    }

                    stringFormated
                        = StringUtil.format("%%" + numberPlaceholder, 123);
                    {
                        assert(stringFormated == "%123");
                    }
                    stringFormated
                        = StringUtil.format(numberPlaceholder + "%%", 123);
                    {
                        assert(stringFormated == "123%");
                    }


                    stringFormated
                        = StringUtil.format("abc" + numberPlaceholder, 123);
                    {
                        assert(stringFormated == "abc123");
                    }
                    stringFormated
                        = StringUtil.format(numberPlaceholder + "abc", 123);
                    {
                        assert(stringFormated == "123abc");
                    }
                    stringFormated
                        = StringUtil.format("abc" + numberPlaceholder + "abc", 123);
                    {
                        assert(stringFormated == "abc123abc");
                    }
                    stringFormated
                        = StringUtil.format(
                            "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                            123,
                            456);
                    {
                        assert(stringFormated == "abc123abc456");
                    }
                    stringFormated
                        = StringUtil.format(
                            "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                            123);
                    {
                        assert(stringFormated == "abc123abc" + numberPlaceholder);
                    }
                    stringFormated
                        = StringUtil.format(
                            "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                            123,
                            456,
                            789);
                    {
                        assert(stringFormated == "abc123abc456");
                    }
                }

                ////////////////////////////////////////////////
                // 纯小数部分格式。
                ////////////////////////////////////////////////
                {
                    numberPlaceholders = ["%.1d", "%.1i"];
                    for (let numberPlaceholder of numberPlaceholders)
                    {
                        stringFormated
                            = StringUtil.format(numberPlaceholder, 123);
                        {
                            assert(stringFormated == "3");
                        }

                        stringFormated
                            = StringUtil.format("%%" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "%3");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "%%", 123);
                        {
                            assert(stringFormated == "3%");
                        }


                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "abc3");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "3abc");
                        }
                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "abc3abc");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456);
                        {
                            assert(stringFormated == "abc3abc6");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123);
                        {
                            assert(stringFormated == "abc3abc" + numberPlaceholder);
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456,
                                789);
                        {
                            assert(stringFormated == "abc3abc6");
                        }
                    }

                    let numberPlaceholder = "%.1f";
                    {
                        stringFormated
                            = StringUtil.format(numberPlaceholder, 123);
                        {
                            assert(stringFormated == "123.0");
                        }

                        stringFormated
                            = StringUtil.format("%%" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "%123.0");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "%%", 123);
                        {
                            assert(stringFormated == "123.0%");
                        }


                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "abc123.0");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "123.0abc");
                        }
                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "abc123.0abc");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456);
                        {
                            assert(stringFormated == "abc123.0abc456.0");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123);
                        {
                            assert(stringFormated == "abc123.0abc" + numberPlaceholder);
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456,
                                789);
                        {
                            assert(stringFormated == "abc123.0abc456.0");
                        }
                    }
                }

                ////////////////////////////////////////////////
                // 整数和小数部分格式。
                ////////////////////////////////////////////////
                {
                    numberPlaceholders = ["%4.1d", "%4.1i"];
                    for (let numberPlaceholder of numberPlaceholders)
                    {
                        stringFormated
                            = StringUtil.format(numberPlaceholder, 123);
                        {
                            assert(stringFormated == "3");
                        }

                        stringFormated
                            = StringUtil.format("%%" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "%3");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "%%", 123);
                        {
                            assert(stringFormated == "3%");
                        }


                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "abc3");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "3abc");
                        }
                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "abc3abc");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456);
                        {
                            assert(stringFormated == "abc3abc6");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123);
                        {
                            assert(stringFormated == "abc3abc" + numberPlaceholder);
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456,
                                789);
                        {
                            assert(stringFormated == "abc3abc6");
                        }
                    }

                    let numberPlaceholder = "%4.1f";
                    {
                        stringFormated
                            = StringUtil.format(numberPlaceholder, 123);
                        {
                            assert(stringFormated == "0123.0");
                        }

                        stringFormated
                            = StringUtil.format("%%" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "%0123.0");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "%%", 123);
                        {
                            assert(stringFormated == "0123.0%");
                        }


                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder, 123);
                        {
                            assert(stringFormated == "abc0123.0");
                        }
                        stringFormated
                            = StringUtil.format(numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "0123.0abc");
                        }
                        stringFormated
                            = StringUtil.format("abc" + numberPlaceholder + "abc", 123);
                        {
                            assert(stringFormated == "abc0123.0abc");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456);
                        {
                            assert(stringFormated == "abc0123.0abc0456.0");
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123);
                        {
                            assert(stringFormated == "abc0123.0abc" + numberPlaceholder);
                        }
                        stringFormated
                            = StringUtil.format(
                                "abc" + numberPlaceholder + "abc" + numberPlaceholder,
                                123,
                                456,
                                789);
                        {
                            assert(stringFormated == "abc0123.0abc0456.0");
                        }
                    }
                }

                ////////////////////////////////////////////////
                // 时间相关
                ////////////////////////////////////////////////
                {
                    let hourAndMinute = StringUtil.format("%2d:%2d", 8, 15);
                    {
                        assert(hourAndMinute == "08:15");
                    }
                }

                ////////////////////////////////////////////////
                // 强制数字长度相关，“%d”或“%i”占位符：
                ////////////////////////////////////////////////
                numberPlaceholders = ["d", "i"];
                for (let numberPlaceholder of numberPlaceholders)
                {
                    let number = 123.456;
                    let numberCaption = StringUtil.format("%" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%1" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%2" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%3" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%4" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "0123");
                    }
                    numberCaption = StringUtil.format("%5" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "00123");
                    }
                    numberCaption = StringUtil.format("%0.1" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "3");
                    }
                    numberCaption = StringUtil.format("%0.2" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "23");
                    }
                    numberCaption = StringUtil.format("%0.3" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%0.4" + numberPlaceholder, number);
                    {
                        assert(numberCaption == "123");
                    }
                }

                ////////////////////////////////////////////////
                // 强制数字长度相关，“%f”占位符：
                ////////////////////////////////////////////////
                {
                    let number = 123.456;
                    let numberCaption = StringUtil.format("%f", number);
                    {
                        assert(numberCaption == "123.456");
                    }
                    numberCaption = StringUtil.format("%.1f", number);
                    {
                        assert(numberCaption == "123.5");
                    }
                    numberCaption = StringUtil.format("%.2f", number);
                    {
                        assert(numberCaption == "123.46");
                    }
                    numberCaption = StringUtil.format("%.3f", number);
                    {
                        assert(numberCaption == "123.456");
                    }
                    numberCaption = StringUtil.format("%.4f", number);
                    {
                        assert(numberCaption == "123.4560");
                    }

                    numberCaption = StringUtil.format("%1.0f", number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%2.0f", number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%3.0f", number);
                    {
                        assert(numberCaption == "123");
                    }
                    numberCaption = StringUtil.format("%4.0f", number);
                    {
                        assert(numberCaption == "0123");
                    }

                    numberCaption = StringUtil.format("%1.1f", number);
                    {
                        assert(numberCaption == "123.5");
                    }
                    numberCaption = StringUtil.format("%2.2f", number);
                    {
                        assert(numberCaption == "123.46");
                    }
                    numberCaption = StringUtil.format("%3.3f", number);
                    {
                        assert(numberCaption == "123.456");
                    }
                    numberCaption = StringUtil.format("%4.4f", number);
                    {
                        assert(numberCaption == "0123.4560");
                    }
                }
            });
    }
}
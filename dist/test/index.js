import { UnitTest, StringExtension } from "../index.js";
try {
    // 测试数字转换：
    new UnitTest.TestCase("字符串转整数，01", (assert, assertFalse) => {
        let number = StringExtension.tryParseInt("0");
        // !!!
        assert(number != 0);
        // !!!
    });
}
catch (exception) {
    console.error(exception);
}

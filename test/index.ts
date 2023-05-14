
import { TestProject } from "../src/index.js"
import { StringUtilTest } from "./stringUtilTest.js";
import { StringUtilIndexOfTest } from "./stringUtilIndexOfTest.js";
import { StringUtilFormatTest } from "./stringUtilFormatTest.js";
import { ArrayUtilTest } from "./arrayUtilTest.js";
import { DateTimeTest } from "./dateTimeTest.js";
import { UriUtilParseTest } from "./uriUtilParseTest.js";
import { UriUtilPathOperationTest_1 } from "./uriUtilPathOperationTest_1.js";
import { UriUtilPathOperationTest_2 } from "./uriUtilPathOperationTest_2.js";
import { CookieUtilTest } from "./cookieUtilTest.js";


let testProject = new TestProject(
    "BaoXia.Utils.Javascript",
    [
        new StringUtilTest(),
        new StringUtilIndexOfTest(),
        new StringUtilFormatTest(),
        new ArrayUtilTest(),
        new DateTimeTest(),
        new UriUtilParseTest(),
        new UriUtilPathOperationTest_1(),
        new UriUtilPathOperationTest_2(),
        new CookieUtilTest()
    ]);
// !!!
testProject.test();
// !!!
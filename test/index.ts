
import { TestProject } from "../src/index.js"
import { StringUtilTest } from "./stringUtilTest.js";
import { StringUtilIndexOfTest } from "./stringUtilIndexOfTest.js";
import { StringUtilFormatTest } from "./stringUtilFormatTest.js";
import { PathUtilTest } from "./pathUtilTest.js";
import { ArrayUtilTest } from "./arrayUtilTest.js";
import { DateTimeTest } from "./dateTimeTest.js";
import { UriUtilParseTest } from "./uriUtilParseTest.js";
import { UriUtilPathOperationTest } from "./uriUtilPathOperationTest.js";
import { CookieUtilTest } from "./cookieUtilTest.js";
import { JsonUtilTest } from "./jsonUtilTest.js";


let testProject = new TestProject(
    "BaoXia.Utils.Javascript",
    [
        new StringUtilTest(),
        new StringUtilIndexOfTest(),
        new StringUtilFormatTest(),
        new PathUtilTest(),
        new ArrayUtilTest(),
        new DateTimeTest(),
        new UriUtilParseTest(),
        new UriUtilPathOperationTest(),
        new CookieUtilTest(),
        new JsonUtilTest()
    ]);
// !!!
testProject.test();
// !!!
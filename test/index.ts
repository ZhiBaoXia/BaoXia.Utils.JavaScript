
import { TestProject } from "../src/index.js"
import { StringUtilTest } from "./stringUtilTest.js";
import { ArrayUtilTest } from "./arrayUtilTest.js";
import { DateTimeTest } from "./dateTimeTest.js";
import { UriUtilTest } from "./uriUtilTest.js";
import { CookieUtilTest } from "./cookieUtilTest.js";


let testProject = new TestProject(
    "BaoXia.Utils.Javascript",
    [
        new StringUtilTest(),
        new ArrayUtilTest(),
        new DateTimeTest(),
        new UriUtilTest(),
        new CookieUtilTest()
    ]);
// !!!
testProject.test();
// !!!
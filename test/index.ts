
import { TestProject } from "../src/unitTest/testProject.js"
import { StringUtilTest } from "./stringUtilTest.js";
import { ArrayUtilTest } from "./arrayUtilTest.js";
import { DateTimeTest } from "./dateTimeTest.js";


let testProject = new TestProject(
    "BaoXia.Utils.Javascript",
    [
        new StringUtilTest(),
        new ArrayUtilTest(),
        new DateTimeTest()
    ]);
// !!!
testProject.test();
// !!!
import { TestProject } from "../src/unitTest/testProject.js";
import { StringUtilTest } from "./stringUtilTest.js";
import { ArrayUtilTest } from "./arrayUtilTest.js";
let testProject = new TestProject("BaoXia.Utils.Javascript", [
    new StringUtilTest(),
    new ArrayUtilTest()
]);
// !!!
testProject.test();
// !!!

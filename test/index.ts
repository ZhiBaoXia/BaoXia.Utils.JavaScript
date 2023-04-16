
import { TestProject } from "../src/UnitTest/TestProject.js"
import { StringUtilTest } from "./StringUtilTest.js";


let testProject = new TestProject(
    "BaoXia.Utils.Javascript",
    [
        new StringUtilTest()
    ]);
// !!!
testProject.test();
// !!!
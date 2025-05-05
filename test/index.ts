
import { TestProject } from "../src/index.js";
import { ArrayUtilTest } from "./arrayUtilTest.js";
import { CookieUtilTest } from "./cookieUtilTest.js";
import { DateTimeTest } from "./dateTimeTest.js";
import { DelayTaskTest } from "./delayTaskTest.js";
import { JsonUtilTest } from "./jsonUtilTest.js";
import { LoopTaskTest } from "./loopTaskTest.js";
import { ObjectUtilTest } from "./objectUtilTest.js";
import { PathUtilTest } from "./pathUtilTest.js";
import { RecursionUtilTest } from "./recursionUtilTest.js";
import { StringUtilFormatTest } from "./stringUtilFormatTest.js";
import { StringUtilIndexOfTest } from "./stringUtilIndexOfTest.js";
import { StringUtilTest } from "./stringUtilTest.js";
import { TestCaseAsyncTest } from "./testCaseAsyncTest.js";
import { UriUtilParseTest } from "./uriUtilParseTest.js";
import { UriUtilPathOperationTest } from "./uriUtilPathOperationTest.js";
import { VersionInfoTest } from "./versionInfoTest.js";
import { MapUtilTest } from "./mapUtilTest.js";

let testProject = new TestProject(
	"BaoXia.Utils.Javascript",
	[
		new TestCaseAsyncTest(),
		new ObjectUtilTest(),
		new StringUtilTest(),
		new StringUtilIndexOfTest(),
		new StringUtilFormatTest(),
		new LoopTaskTest(),
		new PathUtilTest(),
		new ArrayUtilTest(),
		new DateTimeTest(),
		new UriUtilParseTest(),
		new UriUtilPathOperationTest(),
		new CookieUtilTest(),
		new JsonUtilTest(),
		new VersionInfoTest(),
		new RecursionUtilTest(),
		new DelayTaskTest(),
		new MapUtilTest()
	]);
// !!!
await testProject.testAsync();
// !!!
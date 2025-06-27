import { VersionInfo } from "../src/versionInfo.js";
import { TestCase } from "@baoxia/utils.javascript.testutil"

export class VersionInfoTest extends TestCase
{
	constructor()
	{
		super("VersionInfo Test",
			(assert, assertFalse) =>
			{
				const version_1_0_0 = new VersionInfo("1.0.0");
				const version_1_0_0b = new VersionInfo("1.0.0");
				const version_1_0_1 = new VersionInfo("1.0.1");
				const version_1_1_0 = new VersionInfo("1.1.0");
				const version_1_1_1 = new VersionInfo("1.1.1");
				const version_2_1_1 = new VersionInfo("2.1.1");
				const version_1_0 = new VersionInfo("1.0");
				const version_1_0_0_0 = new VersionInfo("1.0.0.0");
				
				// #pragma warning disable CS1718 // 对同一变量进行了比较
				assert(version_1_0_0.isEquals(version_1_0_0));
				// #pragma warning restore CS1718 // 对同一变量进行了比较
				assert(version_1_0_0.isEquals(version_1_0_0b));
				assert(version_1_0_0.isLessThan(version_1_0_1));
				assert(version_1_0_0.isLessThan(version_1_1_0));
				assert(version_1_0_0.isLessThan(version_1_1_1));
				assert(version_1_0_0.isLessThan(version_2_1_1));
				assert(version_1_0_0.isGreaterThan(version_1_0));
				assert(version_1_0_0.isLessThan(version_1_0_0_0));
				// #pragma warning disable CS1718 // 对同一变量进行了比较
				assert(version_1_0_0.isEquals(version_1_0_0));
				// #pragma warning restore CS1718 // 对同一变量进行了比较
				assert(version_1_0_0.isEquals(version_1_0_0b));
				assert(version_1_0_0.isLessOrEquals(version_1_0_1));
				assert(version_1_0_0.isLessOrEquals(version_1_1_0));
				assert(version_1_0_0.isLessOrEquals(version_1_1_1));
				assert(version_1_0_0.isLessOrEquals(version_2_1_1));
				assert(version_1_0_0.isGreaterOrEquals(version_1_0));
				assert(version_1_0_0.isLessOrEquals(version_1_0_0_0));
				assert(version_1_1_1.isGreaterThan(version_1_0_0b));
				assert(version_1_1_1.isGreaterThan(version_1_0_1));
				assert(version_1_1_1.isGreaterThan(version_1_1_0));
				// #pragma warning disable CS1718 // 对同一变量进行了比较
				assert(version_1_1_1.isEquals(version_1_1_1));
				// #pragma warning restore CS1718 // 对同一变量进行了比较
				assert(version_1_1_1.isLessThan(version_2_1_1));
				assert(version_1_1_1.isGreaterThan(version_1_0));
				assert(version_1_1_1.isLessThan(version_1_0_0_0));
				assert(version_1_1_1.isGreaterOrEquals(version_1_0_0b));
				assert(version_1_1_1.isGreaterOrEquals(version_1_0_1));
				assert(version_1_1_1.isGreaterOrEquals(version_1_1_0));
				// #pragma warning disable CS1718 // 对同一变量进行了比较
				assert(version_1_1_1.isEquals(version_1_1_1));
				// #pragma warning restore CS1718 // 对同一变量进行了比较
				assert(version_1_1_1.isLessOrEquals(version_2_1_1));
				assert(version_1_1_1.isGreaterOrEquals(version_1_0));
				assert(version_1_1_1.isLessOrEquals(version_1_0_0_0));
			});
	}
}
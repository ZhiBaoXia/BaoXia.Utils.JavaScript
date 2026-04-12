import { TestCase } from "@baoxia/utils.javascript.testutil";
import { GuidUtil } from "../src/index.js";

export class GuidUtilTest extends TestCase
{
	constructor()
	{
		super("GuidUtil Test", (assert, assertFalse) =>
		{
			// 测试生成【不重复】的Guid。
			let guidsGenerated = new Set<string>();
			for (let i = 0; i < 1000; i++)
			{
				let guid = GuidUtil.generateGuid();
				assert(guid != "");
				assert(!guidsGenerated.has(guid));
				guidsGenerated.add(guid);
			}
		});
	}
}
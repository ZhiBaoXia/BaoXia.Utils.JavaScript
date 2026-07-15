import { TestCase } from "@baoxia/utils.javascript.testutil";
import { TraceUtil } from "../src/traceUtil.js";

export class TraceUtilTest extends TestCase
{
	constructor()
	{
		super("TraceUtil Test", (assert, assertFalse) =>
		{
			const traceIdsGenerated = new Set<string>();
			for (let i = 0; i < 1000; i++)
			{
				const traceId = TraceUtil.generateTraceId();
				assert(/^[0-9a-f]{32}$/.test(traceId));
				assert(!traceIdsGenerated.has(traceId));
				traceIdsGenerated.add(traceId);
			}
		});
	}
}

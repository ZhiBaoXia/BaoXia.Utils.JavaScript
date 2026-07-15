
import { GuidUtil } from "./guidUtil.js";

export class TraceUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	/**
	 * 生成跟踪ID
	 * @returns {string} 跟踪ID
	 */
	public static generateTraceId(): string
	{
		const guid = GuidUtil.generateGuid();
		const traceId = guid.replace(/-/g, "").toLowerCase();
		return traceId;
	}

	// #endRegion
}

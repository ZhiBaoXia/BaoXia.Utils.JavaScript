import { DateTime, LoopTask } from "../src/index.js";
import { TestCaseAsync } from "../src/unitTest/testCaseAsync.js";

export class LoopTaskTest extends TestCaseAsync
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("LoopTask Test",
			async (assert, assertFalse) =>
			{
				let testPromise = new Promise((testResolve, reject) =>
				{
					const loopTaskIntervalSeconds = 0.05;
					const taskProcessSeconds = 0.1;
					const taskIntervalSecondsMin = 0.15;
					let lastTaskProcessBeginTime: DateTime | null;
					let testTask = new LoopTask(async () =>
					{
						let now = DateTime.Now;
						if (lastTaskProcessBeginTime != null)
						{
							let taskIntervalSeconds
								= now.timeSpanBySubtract(lastTaskProcessBeginTime)
									.totalSeconds;
							// !!! 实际时间一定大于等于计划时间。 !!!
							assert(taskIntervalSeconds >= taskIntervalSecondsMin);
							// !!!
							testResolve(void 0);
							// !!!
							return false;
						}
						lastTaskProcessBeginTime = now;

						let timeoutResult = await new Promise<boolean>((resolve, reject) =>
						{
							setTimeout(() =>
							{
								resolve(true);
							},
								1000.0 * taskProcessSeconds);
						});
						return timeoutResult;
					},
						loopTaskIntervalSeconds);
				});
				//	
				await testPromise;
				//
				assert(true);
				//
			});
	}
}
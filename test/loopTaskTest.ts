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
					let loopTaskIntervalSeconds = 0.05;
					let taskProcessSeconds = 0.1;
					let lastTaskProcessBeginTime: DateTime | null;
					let testTask = new LoopTask(async () =>
					{
						let now = DateTime.Now;
						if (lastTaskProcessBeginTime != null)
						{
							let taskIntervalSeconds
								= now.timeSpanBySubtract(lastTaskProcessBeginTime)
									.totalSeconds;
							let taskIntervalSecondsMin
								= loopTaskIntervalSeconds + taskProcessSeconds;
							// !!!
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
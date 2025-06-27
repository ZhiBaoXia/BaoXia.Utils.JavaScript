import { DelayTask } from "../src/index.js";
import { TestCase } from "@baoxia/utils.javascript.testutil";

export class DelayTaskTest extends TestCase
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("DelayTask Test",
			(assert, assertFalse) =>
			{
				let testNumber = 0;
				const testNumberShouldBe = 1;
				const delayTask = new DelayTask();

				delayTask.runAfter(
					0.1,
					() =>
					{
						testNumber++;
					});
				delayTask.runAfter(
					0.1,
					() =>
					{
						testNumber++;
					});
				delayTask.runAfter(
					0.1,
					() =>
					{
						testNumber++;
					});
				setTimeout(() =>
				{
					// !!!
					assert(testNumber == testNumberShouldBe);
					// !!!
				},
					500);
			});
	}

}
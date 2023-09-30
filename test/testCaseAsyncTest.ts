import { DateTime } from "../src/index.js";
import { TestCaseAsync } from "../src/unitTest/testCaseAsync.js";

export class TestCaseAsyncTest extends TestCaseAsync
{
	////////////////////////////////////////////////
	// @静态常量
	////////////////////////////////////////////////

	private static readonly TestDurationMinSeconds = 0.1;

	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	private _testStartTime: DateTime | null = null;

	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("TestCaseAsync Test",
			async (assert, assertFalse) =>
			{
				let promise = new Promise((resolve, reject) =>
				{
					setTimeout(() =>
					{
						resolve('异步操作测试完成。');
					},
						1000 * TestCaseAsyncTest.TestDurationMinSeconds);
				});
				return promise;
			});
	}

	////////////////////////////////////////////////
	// @重载
	////////////////////////////////////////////////

	protected override didPretest()
	{
		super.didPretest();

		this._testStartTime = DateTime.Now;
	}

	protected override didTested(): void
	{
		super.didTested();

		let secondsToTest
			= DateTime.Now
				.timeSpanBySubtract(this._testStartTime)
				.totalSeconds;
		// !!!
		TestCaseAsyncTest.assertTrue(
			secondsToTest >= TestCaseAsyncTest.TestDurationMinSeconds
		);
		// !!!
	}
}
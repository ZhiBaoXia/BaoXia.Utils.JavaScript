import { DateTime } from "./dateTime.js";

export class DelayTask
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	// #region 自身属性

	protected _timeoutId: any = undefined;

	protected _timeToRunPlaned: DateTime | null = null;

	public get timeToRunPlaned(): DateTime | null
	{
		return this._timeToRunPlaned;
	}

	// #endregion


	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	// #region 自身实现

	runAfter<TimerParamType>(
		delaySeconds: number,
		toTimerFired: ((runParam: TimerParamType | null) => void),
		runParam: TimerParamType | null = null)
		: void
	{
		// !!!
		this.cancel();
		// !!!

		this._timeToRunPlaned = DateTime.Now.addSeconds(delaySeconds);
		this._timeoutId
			= setTimeout(
				() =>
				{
					toTimerFired(runParam);
				},
				1000 * delaySeconds);
	}

	cancel(): void
	{
		if (this._timeoutId)
		{
			clearTimeout(this._timeoutId);
			this._timeoutId = undefined;
		}
	}

	// #endregion

}
export class LoopTask
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	private _toProcessTask: () => Promise<boolean>;

	private _toGetTaskIntervalSeconds: () => number;

	private _timerIdToProcessNextTask: number = 0;

	private _isStopped: boolean = false;

	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	public constructor(
		toProcessTask: () => Promise<boolean>,
		taskIntervalSeconds: number | (() => number),
		isStartImmediately: boolean = true)	
	{
		this._toProcessTask = toProcessTask;
		if (typeof (taskIntervalSeconds) == "number")
		{
			let taskIntervalSecondsInNumber = taskIntervalSeconds as number;
			this._toGetTaskIntervalSeconds
				= () =>
				{
					return taskIntervalSecondsInNumber
				}
		}
		else
		{
			let taskIntervalSecondsInAction = taskIntervalSeconds as (() => number);
			this._toGetTaskIntervalSeconds = taskIntervalSecondsInAction;
		}

		if (isStartImmediately)
		{
			this.startTimerToProcessNextTask();
		}
	}

	protected startTimerToProcessNextTask(): number
	{
		if (this._isStopped)
		{
			return 0;
		}
		let taskIntervalSeconds = this._toGetTaskIntervalSeconds();
		if (taskIntervalSeconds < 0)
		{
			taskIntervalSeconds = 0;
		}
		if (this._timerIdToProcessNextTask != 0)
		{
			clearTimeout(this._timerIdToProcessNextTask);
			this._timerIdToProcessNextTask = 0;
		}
		let timerId = this._timerIdToProcessNextTask
			= setTimeout(async () =>
			{
				this._timerIdToProcessNextTask = 0;
				let isProcessContinue = await this._toProcessTask();
				if (isProcessContinue == true
					&& this._isStopped == false)
				{
					this.startTimerToProcessNextTask();
				}
			},
				1000 * taskIntervalSeconds);
		{
			// !!!
			this._timerIdToProcessNextTask = timerId;
			// !!!
		}
		return timerId;
	}

	public start(): void
	{
		this._isStopped = false;
		this.startTimerToProcessNextTask();
	}

	public stop(): void
	{
		this._isStopped = true;
		if (this._timerIdToProcessNextTask != 0)
		{
			clearTimeout(this._timerIdToProcessNextTask);
			this._timerIdToProcessNextTask = 0;
		}
	}
}
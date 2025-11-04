export class IntervalTask
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	// #region

	intervalSeconds: number = 0;

	invokesCountMax: number = 0;

	invokeIndex: number = 0;

	toInvokeNext: ((toInvokeFinished: () => void, isLastInvoke: boolean, invokeIndex: number, invokesCountMax: number) => void) | null = null;

	private _lastInvokeTimestamp: number = 0;

	private _timeoutTimerId: number | null = null;

	// #endRegion


	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	// #region

	start(
		intervalSeconds: number,
		invokesCountMax: number,
		toInvokeNext: ((toInvokeFinished: () => void, isLastInvoke: boolean, invokeIndex: number, invokesCountMax: number) => void) | null,
		isInvokeTaskAtNow: boolean = false)
	{
		// !!!
		this.stop();
		// !!!

		this.intervalSeconds = intervalSeconds;
		this.invokesCountMax = invokesCountMax;
		this.invokeIndex = 0;
		this.toInvokeNext = toInvokeNext;

		if (!this.toInvokeNext)
		{
			return;
		}

		if (isInvokeTaskAtNow)
		{
			////////////////////////////////////////////////
			// !!!
			this.invokeTask();
			// !!!
			////////////////////////////////////////////////
		}
		else
		{
			const timeoutTimerId = setTimeout(
				() =>
				{
					////////////////////////////////////////////////
					// !!!
					this.invokeTask();
					// !!!
					////////////////////////////////////////////////
				},
				intervalSeconds * 1000);
			// !!!
			this._timeoutTimerId = timeoutTimerId as unknown as number;
			// !!!
		}
	}

	trystart(
		intervalSeconds: number,
		invokesCountMax: number,
		toInvokeNext: ((toInvokeFinished: () => void, isLastInvoke: boolean, invokeIndex: number, invokesCountMax: number) => boolean) | null)
		: boolean
	{
		if (this._timeoutTimerId)
		{
			return false;
		}
		//
		this.start(intervalSeconds, invokesCountMax, toInvokeNext);
		//
		return true;
	}

	stop()
	{
		if (!this._timeoutTimerId)
		{
			return;
		}
		clearInterval(this._timeoutTimerId);
		this._timeoutTimerId = null;
	}

	protected invokeTask()
	{
		// !!!
		this.stop();
		// !!!

		const toInvokeNext = this.toInvokeNext;
		if (!toInvokeNext)
		{
			return;
		}
		if (this.invokeIndex >= this.invokesCountMax)
		{
			return;
		}


		this._lastInvokeTimestamp = new Date().getTime();
		toInvokeNext(
			() =>
			{
				this.invokeIndex++;
				if (this.invokeIndex >= this.invokesCountMax)
				{
					return;
				}


				const nowTimestamp = new Date().getTime();
				let intervalSecondsToNextInvoke
					= this.intervalSeconds
					- (nowTimestamp - this._lastInvokeTimestamp) / 1000;
				if (intervalSecondsToNextInvoke < 0)
				{
					intervalSecondsToNextInvoke = 0;
				}
				const timeoutTimerId = setTimeout(
					() =>
					{
						// !!!
						this.invokeTask();
						// !!!
					},
					intervalSecondsToNextInvoke * 1000);
				// !!!
				this._timeoutTimerId = timeoutTimerId as unknown as number;
				// !!!
			},
			this.invokeIndex == this.invokesCountMax - 1,
			this.invokeIndex,
			this.invokesCountMax);
	}

	// #endRegion
}
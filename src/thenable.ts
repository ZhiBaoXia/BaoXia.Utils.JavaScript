
import { ThenableState } from "./constant/thenableState.js";
import { ObjectUtil } from "./objectUtil.js";

////////////////////////////////////////////////
// @ThenableState
////////////////////////////////////////////////

export class Thenable<ErrorType, ThenableParamType>
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	readonly createTimestamp = Date.now();

	callbackIntervalSecondsMin: number | null = null;

	protected _state: ThenableState = ThenableState.Working;

	protected _callback: ((error: ErrorType | null, callbackParam: ThenableParamType | null) => void) | null = null;

	error: ErrorType | null = null;

	callbackParam: ThenableParamType | null = null;


	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	protected tryInvokeThenable()
	{
		if (this._state != ThenableState.WorkFinished)
		{
			return;
		}
		// !!!
		this._state = ThenableState.Thenableed;
		// !!!

		let callback = this._callback;
		if (!callback)
		{
			return;
		}

		const callbackIntervalSecondsMin = this.callbackIntervalSecondsMin;
		if (!callbackIntervalSecondsMin
			|| callbackIntervalSecondsMin <= 0)
		{
			callback(this.error, this.callbackParam);
		}
		else
		{
			const callbackIntervalSeconds = (Date.now() - this.createTimestamp) / 1000;
			if (callbackIntervalSeconds >= callbackIntervalSecondsMin)
			{
				callback(this.error, this.callbackParam);
			}
			else
			{
				setTimeout(() =>
				{
					// !!!
					callback(this.error, this.callbackParam);
					// !!!
				},
					(callbackIntervalSecondsMin - callbackIntervalSeconds) * 1000);
			}
		}
	}

	setResult(error: ErrorType, callbackParam: ThenableParamType | null | undefined): void
	{
		if (this._state != ThenableState.Working)
		{
			return;
		}
		// !!!
		this._state = ThenableState.WorkFinished;
		// !!!

		this.error = error;
		if (typeof callbackParam == 'undefined')
		{
			callbackParam = null;
		}
		this.callbackParam = callbackParam;

		// !!!
		this.tryInvokeThenable();
		// !!!
	}

	then(
		callback_or_callbackIntervalSecondsMin: ((error: ErrorType | null, callbackParam: ThenableParamType | null) => void) | null | number,
		callback: ((error: ErrorType | null, callbackParam: ThenableParamType | null) => void) | null = null)
		: void
	{
		let callbackIntervalSecondsMin: number | null = null;
		if (typeof callback_or_callbackIntervalSecondsMin == 'number')
		{
			callbackIntervalSecondsMin = callback_or_callbackIntervalSecondsMin;
		}
		else
		{
			callback = callback_or_callbackIntervalSecondsMin;
		}

		this._callback = callback;
		this.callbackIntervalSecondsMin = callbackIntervalSecondsMin;

		// !!!
		this.tryInvokeThenable();
		// !!!
	}
}
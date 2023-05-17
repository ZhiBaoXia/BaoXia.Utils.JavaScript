
import { ThenableState } from "./constant/thenableState.js";

////////////////////////////////////////////////
// @ThenableState
////////////////////////////////////////////////

export class Thenable<ErrorType, ThenableParamType>
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    protected _state: ThenableState = ThenableState.Working;

    protected _callback: ((error: ErrorType, callbackParam: ThenableParamType | null) => void) | null = null;

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

        let callback = this._callback
        if (callback != null)
        {
            callback(this.error, this.callbackParam);
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

    then(callback: (error: ErrorType, callbackParam: ThenableParamType | null) => void | null): void
    {
        this._callback = callback;

        // !!!
        this.tryInvokeThenable();
        // !!!
    }
}
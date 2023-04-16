
import { DateTimeField } from "./constants/dateTimeField.js"

export class DateTime
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    _date: Date;

    get year(): number
    {
        return this._date.getFullYear();
    }

    set year(year: number)
    {
        this._date.setFullYear(year);
    }

    get month(): number
    {
        return this._date.getMonth() + 1;
    }

    set month(month: number)
    {
        this._date.setMonth(month);
    }

    get day(): number
    {
        return this._date.getDate();
    }

    get weekDay(): number
    {
        return this._date.getDay();
    }

    get hour(): number
    {
        return this._date.getHours();
    }

    set hour(hour: number)
    {
        this._date.setHours(hour);
    }

    get minute(): number
    {
        return this._date.getMinutes();
    }

    set minute(minute: number)
    {
        this._date.setMinutes(minute);
    }

    get second(): number
    {
        return this._date.getSeconds();
    }

    set second(second: number)
    {
        this._date.setSeconds(second);
    }

    get millisecond(): number
    {
        return this._date.getMilliseconds();
    }

    set millisecond(millisecond: number)
    {
        this._date.setMilliseconds(millisecond);
    }

    get millsecondsFrom1970(): number
    {
        return this._date.getTime();
    }

    set millsecondsFrom1970(millsecondsFrom1970: number)
    {
        this._date.setTime(millsecondsFrom1970);
    }

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor()
    {
        this._date = new Date();
    }

    compareTo(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): number
    {
        if (anotherDateTime == null)
        {
            return -1;
        }

        @last

        if (this.year == anotherDateTime.year
            && compareAccuracy <= DateTimeField.Year)
        {
            return true;
        }

        if (this.year == anotherDateTime.year
            && compareAccuracy <= DateTimeField.Year)
        {
            return true;
        }

        return 0;
    }

    isEquals(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return false;
    }
}
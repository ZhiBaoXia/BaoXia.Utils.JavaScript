
import { DateTimeField } from "./constants/dateTimeField.js"
import { StringRange } from "./model/stringRange.js";
import { StringUtil } from "./stringUtil.js";

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
    // @类方法
    ////////////////////////////////////////////////

    /**
     * 根据指定的比较精度，比较两个时间对象的“早晚”，当“dateTimeA”早于“dateTimeB”时返回“-1”；当“dateTimeA”晚于“dateTimeB”时返回“1”；当“dateTimeA”等于“dateTimeB”时返回“0”。
     * @param dateTimeA 要进行比较的时间对象A。
     * @param dateTimeB 要进行比较的时间对象B。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当“dateTimeA”早于“dateTimeB”时返回“-1”；当“dateTimeA”晚于“dateTimeB”时返回“1”；当“dateTimeA”等于“dateTimeB”时返回“0”。
     */
    static compareDateTimes(
        dateTimeA: DateTime | null,
        dateTimeB: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): number
    {
        if (dateTimeA == null
            || dateTimeB == null)
        {
            return 0;
        }
        if (dateTimeA == null)
        {
            return -1;
        }
        if (dateTimeB == null)
        {
            return 1;
        }

        let year = dateTimeA.year;
        let anotherYear = dateTimeB.year;
        if (year < anotherYear)
        {
            return -1;
        }
        else if (year > anotherYear)
        {
            return 1;
        }
        if (compareAccuracy <= DateTimeField.Year)
        {
            return 0;
        }

        let month = dateTimeA.month;
        let anotherMonth = dateTimeB.month;
        if (month < anotherMonth)
        {
            return -1;
        }
        else if (month > anotherMonth)
        {
            return 1;
        }
        if (compareAccuracy <= DateTimeField.Month)
        {
            return 0;
        }

        let day = dateTimeA.day;
        let anotherDay = dateTimeB.day;
        if (day < anotherDay)
        {
            return -1;
        }
        else if (day > anotherDay)
        {
            return 1;
        }
        if (compareAccuracy <= DateTimeField.Day)
        {
            return 0;
        }

        let hour = dateTimeA.hour;
        let anotherHour = dateTimeB.hour;
        if (hour < anotherHour)
        {
            return -1;
        }
        else if (hour > anotherHour)
        {
            return 1;
        }
        if (compareAccuracy <= DateTimeField.Hour)
        {
            return 0;
        }

        let minute = dateTimeA.minute;
        let anotherMinute = dateTimeB.minute;
        if (minute < anotherMinute)
        {
            return -1;
        }
        else if (minute > anotherMinute)
        {
            return 1;
        }
        if (compareAccuracy <= DateTimeField.Minute)
        {
            return 0;
        }

        let second = dateTimeA.second;
        let anotherSecond = dateTimeB.second;
        if (second < anotherSecond)
        {
            return -1;
        }
        else if (second > anotherSecond)
        {
            return 1;
        }
        if (compareAccuracy <= DateTimeField.Second)
        {
            return 0;
        }

        let millisecond = dateTimeA.millisecond;
        let anotherMillisecond = dateTimeB.millisecond;
        if (millisecond < anotherMillisecond)
        {
            return -1;
        }
        else if (millisecond > anotherMillisecond)
        {
            return 1;
        }
        if (compareAccuracy <= DateTimeField.Millisecond)
        {
            return 0;
        }

        return 0;
    }

    /**
     * 根据指定的比较精度，比较两个时间对象是否相等。
     * @param dateTimeA 要进行比较的时间对象A。
     * @param dateTimeB 要进行比较的时间对象B。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当“dateTimeA”等于“dateTimeB”时返回“true”，否则返回“false”。
     */
    static equalsDateTimes(
        dateTimeA: DateTime | null,
        dateTimeB: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return DateTime.compareDateTimes(
            dateTimeA,
            dateTimeB,
            compareAccuracy)
            == 0;
    }

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(date: Date | number | null = null)
    {
        if (typeof (date) == "number")
        {
            date = new Date(date);
        }
        this._date
            = date != null
                ? date
                : new Date();
    }

    /**
     * 根据指定的比较精度，比较两个时间对象的“早晚”，当前时间对象早于“anotherDateTime”时返回“-1”；当前时间对象晚于“anotherDateTime”时返回“1”；当前时间对象等于“anotherDateTime”时返回“0”。
     * @param anotherDateTime 要进行比较的时间对象。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当前时间对象早于“anotherDateTime”时返回“-1”；当前时间对象晚于“anotherDateTime”时返回“1”；当前时间对象等于“anotherDateTime”时返回“0”。
     */
    compareTo(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): number
    {
        return DateTime.compareDateTimes(
            this,
            anotherDateTime,
            compareAccuracy);
    }

    /**
     * 根据指定的比较精度，比较两个时间对象是否相等。
     * @param anotherDateTime 要进行比较的时间对象。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当前时间等于“anotherDateTime”时返回“true”，否则返回“false”。
     */
    isEquals(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return DateTime.equalsDateTimes(
            this,
            anotherDateTime,
            compareAccuracy);
    }


    /**
     * 根据指定的格式化模板，将当前时间对象，转为指定模板结构的字符串，字符串模板的可选参数有：
     * y，年；M，月；d，日；H，24小时格式的小时；m，分钟；s，秒钟；f，毫秒。
     * @param stringFormatter 指定的格式化模板。
     * @returns 指定模板结构的当前时间对象字符串。
     */
    toString(
        stringFormatter: string | null): string
    {
        if (StringUtil.isEmpty(stringFormatter))
        {
            return StringUtil.Empty;
        }

        // 先替换年份的占位符：
        let yearPlaceholder = "y";
        let yearPlaceholderRanges
            = StringUtil.getRangesOfKeywordIn(
                stringFormatter,
                "y",
                true);
        if (yearPlaceholderRanges.length > 0)
        {
            yearPlaceholderRanges
                = StringRange.tryCompressionRangesWithConsecutiveCharIndex(
                    yearPlaceholderRanges);
            let yearCaptions:string[] = [];
            for (let yearPlaceholder of yearPlaceholderRanges)
            {
                let yearPlaceholderLength = yearPlaceholder.charsCount;
                let yearCaption = this.year.toString();
                {
                    yearCaption = StringUtil.complementZeroToIntegerNumberDigitsTo(
                        yearCaption,
                        yearPlaceholderLength);
                }
                yearCaptions.push(yearCaption);
            }
        }



        return StringUtil.Empty;
    }
}
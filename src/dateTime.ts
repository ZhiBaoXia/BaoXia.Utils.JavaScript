
import { DateTimeField } from "./constants/dateTimeField.js"
import { StringRange } from "./model/stringRange.js";
import { DateTimeSpan } from "./model/dateTimeSpan.js"
import { StringUtil } from "./stringUtil.js";

export class DateTime
{
    ////////////////////////////////////////////////
    // @静态变量
    ////////////////////////////////////////////////

    static WeekdayCaptions: string[] = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

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
        this._date.setMonth(month - 1);
    }

    get day(): number
    {
        return this._date.getDate();
    }

    set day(day: number)
    {
        this._date.setDate(day);
    }

    get weekday(): number
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

    constructor(date: DateTime | Date | number | null = null)
    {
        if (typeof (date) == "number")
        {
            date = new Date(date);
        }
        else if (date instanceof DateTime)
        {
            date = date._date;
        }
        this._date
            = date != null
                ? date
                : new Date();
    }

    /**
     * 在当前时间对象上增加指定的年数，返回增加后的时间对象（当前对象）。
     * @param years 要增加的年数。
     * @returns 返回已增加指定年数后的时间对象（当前对象）。
     */
    addYears(years: number): DateTime
    {
        this._date = new Date(
            this._date.getTime()
            + years * 365 * 24 * 60 * 60 * 1000);
        { }
        return this;
    }

    /**
     * 在当前时间对象上增加指定的月数，返回增加后的时间对象（当前对象）。
     * @param years 要增加的月数。
     * @returns 返回已增加指定月数后的时间对象（当前对象）。
     */
    addMonths(months: number): DateTime
    {
        var dateTime = this.addYears(Math.floor(months / 12))
        {
            dateTime.month = Math.round(months) % 12;
        }
        return this;
    }

    /**
     * 在当前时间对象上增加指定的天数，返回增加后的时间对象（当前对象）。
     * @param years 要增加的天数。
     * @returns 返回已增加指定天数后的时间对象（当前对象）。
     */
    addDays(days: number): DateTime
    {
        this._date = new Date(
            this._date.getTime()
            + days * 24 * 60 * 60 * 1000);
        { }
        return this;
    }

    /**
     * 在当前时间对象上增加指定的小时数，返回增加后的时间对象（当前对象）。
     * @param years 要增加的小时数。
     * @returns 返回已增加指定小时数后的时间对象（当前对象）。
     */
    addHours(hours: number): DateTime
    {
        this._date = new Date(
            this._date.getTime()
            + hours * 60 * 60 * 1000);
        { }
        return this;
    }

    /**
     * 在当前时间对象上增加指定的分钟数，返回增加后的时间对象（当前对象）。
     * @param years 要增加的分钟数。
     * @returns 返回已增加指定分钟数后的时间对象（当前对象）。
     */
    addMinutes(minutes: number): DateTime
    {
        this._date = new Date(
            this._date.getTime()
            + minutes * 60 * 1000);
        { }
        return this;
    }

    /**
     * 在当前时间对象上增加指定的秒数，返回增加后的时间对象（当前对象）。
     * @param years 要增加的秒数。
     * @returns 返回已增加指定秒数后的时间对象（当前对象）。
     */
    addSeconds(seconds: number): DateTime
    {
        this._date = new Date(
            this._date.getTime()
            + seconds * 1000);
        { }
        return this;
    }

    /**
     * 在当前时间对象上增加指定的毫秒数，返回增加后的时间对象（当前对象）。
     * @param years 要增加的毫秒数。
     * @returns 返回已增加指定毫秒数后的时间对象（当前对象）。
     */
    addMilliseconds(milliseconds: number): DateTime
    {
        this._date = new Date(
            this._date.getTime()
            + milliseconds);
        { }
        return this;
    }

    /**
     * 获取当前时间对象减去指定时间对象后的时间间隔对象。
     * @param anotherDateTime 指定的另一个时间对象。
     * @returns 当前时间对象减去指定时间对象后的时间间隔对象。
     */
    timeSpanBySubtract(anotherDateTime: DateTime | null): DateTimeSpan
    {
        let currentDateTimeStamp = this.millsecondsFrom1970;
        let anotherDateTimeStamp = 0
        if (anotherDateTime != null)
        {
            anotherDateTimeStamp = anotherDateTime.millsecondsFrom1970;
        }

        let dateTimeSpan = new DateTimeSpan(
            currentDateTimeStamp
            - anotherDateTimeStamp);
        { }
        return dateTimeSpan;
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
     * 根据指定的比较精度，比较两个时间对象的“早晚”，当前时间对象早于“anotherDateTime”时返回“true”，否则返回“false”。
     * @param anotherDateTime 要进行比较的时间对象。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当前时间早于“anotherDateTime”时返回“true”，否则返回“false”。
     */
    isLessThan(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return DateTime.compareDateTimes(
            this,
            anotherDateTime,
            compareAccuracy) < 0;
    }

    /**
     * 根据指定的比较精度，比较两个时间对象的“早晚”，当前时间对象早于或等于“anotherDateTime”时返回“true”，否则返回“false”。
     * @param anotherDateTime 要进行比较的时间对象。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当前时间早于或等于“anotherDateTime”时返回“true”，否则返回“false”。
     */
    isLessThanOrEquals(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return DateTime.compareDateTimes(
            this,
            anotherDateTime,
            compareAccuracy) <= 0;
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
     * 根据指定的比较精度，比较两个时间对象是否不相等。
     * @param anotherDateTime 要进行比较的时间对象。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当前时间不等于“anotherDateTime”时返回“true”，否则返回“false”。
     */
    isNotEquals(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return !this.isEquals(anotherDateTime, compareAccuracy);
    }

    /**
     * 根据指定的比较精度，比较两个时间对象的“早晚”，当前时间对象晚于或等于“anotherDateTime”时返回“true”，否则返回“false”。
     * @param anotherDateTime 要进行比较的时间对象。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当前时间晚于“anotherDateTime”时返回“true”，否则返回“false”。
     */
    isGreaterThan(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return DateTime.compareDateTimes(
            this,
            anotherDateTime,
            compareAccuracy) > 0;
    }

    /**
     * 根据指定的比较精度，比较两个时间对象的“早晚”，当前时间对象晚于或等于“anotherDateTime”时返回“true”，否则返回“false”。
     * @param anotherDateTime 要进行比较的时间对象。
     * @param [compareAccuracy] 指定的时间比较精度，类型为“DateTimeField”。
     * @returns 当前时间晚于或等于“anotherDateTime”时返回“true”，否则返回“false”。
     */
    isGreaterThanOrEquals(
        anotherDateTime: DateTime | null,
        compareAccuracy: DateTimeField = DateTimeField.Millisecond): boolean
    {
        return DateTime.compareDateTimes(
            this,
            anotherDateTime,
            compareAccuracy) >= 0;
    }

    /**
     * 在当前时间对象的基础上，通过指定的时间偏移量，创建并返回一个新的时间对象。
     * @param dateTimeField 指定的时间偏移量，类型为“DateTimeField”。
     * @param offset 指定的时间偏移量。
     * @returns 偏移指定时间后的，新的时间对象。
     */
    dateTimeByOffset(
        dateTimeField: DateTimeField,
        offset: number): DateTime
    {
        var dateTime = new DateTime(this);
        switch (dateTimeField)
        {
            case DateTimeField.Year:
                {
                    dateTime.addYears(offset);
                } break;
            case DateTimeField.Month:
                {
                    dateTime.addMonths(offset);
                } break;
            case DateTimeField.Day:
                {
                    dateTime.addDays(offset);
                } break;
            case DateTimeField.Hour:
                {
                    dateTime.addHours(offset);
                } break;
            case DateTimeField.Minute:
                {
                    dateTime.addMinutes(offset);
                } break;
            case DateTimeField.Second:
                {
                    dateTime.addSeconds(offset);
                } break;
            case DateTimeField.Millisecond:
                {
                    dateTime.addMilliseconds(offset);
                } break;
        }
        return dateTime;
    }

    /**
     * 通过增加指定的年份数，创建并返回一个新的时间对象。
     * @param years 指定的年份数。
     * @returns 增加指定的年份数后的，新的时间对象。
     */
    dateTimeByAddYears(years: number): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.addYears(years);
        }
        return dateTime;
    }

    /**
     * 通过增加指定的月份数，创建并返回一个新的时间对象。
     * @param months 指定的月份数。
     * @returns 增加指定的月份数后的，新的时间对象。
     */
    dateTimeByAddMonths(months: number): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.addMonths(months);
        }
        return dateTime;
    }

    /**
     * 通过增加指定的天数，创建并返回一个新的时间对象。
     * @param days 指定的天数。
     * @returns 增加指定的天数后的，新的时间对象。
     */
    dateTimeByAddDays(days: number): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.addDays(days);
        }
        return dateTime;
    }

    /**
     * 通过增加指定的小时数，创建并返回一个新的时间对象。
     * @param hours 指定的小时数。
     * @returns 增加指定的小时数后的，新的时间对象。
     */
    dateTimeByAddHours(hours: number): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.addHours(hours);
        }
        return dateTime;
    }

    /**
     * 通过增加指定的分钟数，创建并返回一个新的时间对象。
     * @param minutes 指定的分钟数。
     * @returns 增加指定的分钟数后的，新的时间对象。
     */
    dateTimeByAddMinutes(minutes: number): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.addMinutes(minutes);
        }
        return dateTime;
    }

    /**
     * 通过增加指定的秒数，创建并返回一个新的时间对象。
     * @param seconds 指定的秒数。
     * @returns 增加指定的秒数后的，新的时间对象。
     */
    dateTimeByAddSeconds(seconds: number): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.addSeconds(seconds);
        }
        return dateTime;
    }

    /**
     * 通过增加指定的毫秒数，创建并返回一个新的时间对象。
     * @param milliseconds 指定的毫秒数。
     * @returns 增加指定的毫秒数后的，新的时间对象。
     */
    dateTimeByAddMilliseconds(milliseconds: number): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.addMilliseconds(milliseconds);
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtBeginOfDay(): DateTime
    {
        var dateTime = new DateTime(this);
        {
            dateTime.hour = 0;
            dateTime.minute = 0;
            dateTime.second = 0;
            dateTime.millisecond = 0;
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“明日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“明日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtEndOfDay(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfDay();
        {
            dateTime.addDays(1);
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“周日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“周日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtBeginOfWeek(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfDay();
        {
            dateTime.addDays(-dateTime.weekday);
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“下周日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“周日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtEndOfWeek(): DateTime
    {
        var dateTime = this.dateTimeAtEndOfDay();
        {
            dateTime.addDays(6 - dateTime.weekday);
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“当月1日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“当月1日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtBeginOfMonth(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfDay();
        {
            dateTime.day = 1;
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“下月1日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“下月1日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtEndOfMonth(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfMonth();
        {
            dateTime.month += 1;
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“当季1日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“当季1日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtBeginOfQuarter(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfMonth();
        {
            dateTime.month = Math.floor((dateTime.month - 1) / 3) * 3 + 1;
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“下季1日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“下季1日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtEndOfQuarter(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfQuarter();
        {
            dateTime.month += 3;
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“当年1月1日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“当年1月1日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtBeginOfYear(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfDay();
        {
            dateTime.month = 1;
            dateTime.day = 1;
        }
        return dateTime;
    }

    /**
     * 获取当前日期时间，“下一年1月1日，0点0分0秒0毫秒”的日期时间对象。
     * @returns 返回当前日期时间，“下一年1月1日，0点0分0秒0毫秒”的日期时间对象。
     */
    dateTimeAtEndOfYear(): DateTime
    {
        var dateTime = this.dateTimeAtBeginOfYear();
        {
            dateTime.year += 1;
        }
        return dateTime;
    }

    /**
     * 在字符串格式化模板中替换日期格式化占位符为指定的日期字段名称。
     * @param stringFormatter 字符串格式化模板。
     * @param formatterPlaceholder 日期格式化占位符。  
     * @param dateFieldCaption 日期字段标题。
     * @param isRemoveLeftCharsByPlaceholder 是否依据日期格式化占位符移除时间字段左边的字符，默认为：false。
     * @returns 使用给定的模板和日期字段标题替换后的日期字符串。 
     */
    _replaceDateFormatterPlaceholderInFormatter(
        stringFormatter: string | null,
        formatterPlaceholder: string | null,
        dateFieldCaption: string | null,
        isRemoveLeftCharsByPlaceholder: boolean = false): string | null
    {
        if (StringUtil.isEmpty(stringFormatter)
            || StringUtil.isEmpty(formatterPlaceholder))
        {
            return stringFormatter;
        }
        if (StringUtil.isEmpty(dateFieldCaption))
        {
            dateFieldCaption = StringUtil.Empty;
        }

        let formatterPlaceholderRanges
            = StringUtil.getRangesOfKeywordIn(
                stringFormatter,
                formatterPlaceholder,
                false);
        if (formatterPlaceholderRanges.length > 0)
        {
            formatterPlaceholderRanges
                = StringRange.tryCompressionRangesWithConsecutiveCharIndex(
                    formatterPlaceholderRanges);
            let dateFieldCaptions: string[] = [];
            let dateFieldCaptionOriginal = dateFieldCaption;
            for (let formatterPlaceholderRange of formatterPlaceholderRanges)
            {
                let formatterPlaceholderLength = formatterPlaceholderRange.charsCount;
                {
                    dateFieldCaption = StringUtil.complementZeroToIntegerNumberDigitsTo(
                        dateFieldCaptionOriginal!,
                        formatterPlaceholderLength);
                    if (isRemoveLeftCharsByPlaceholder
                        && dateFieldCaption.length > formatterPlaceholderLength)
                    {
                        dateFieldCaption = dateFieldCaption.substring(
                            (dateFieldCaption.length - formatterPlaceholderLength));
                    }
                }
                dateFieldCaptions.push(dateFieldCaption);
            }
            // !!!
            stringFormatter
                = StringUtil.replaceKeywordsInRangesWithStringsSpecifiedIn(
                    stringFormatter,
                    formatterPlaceholderRanges,
                    dateFieldCaptions,
                    false);
            // !!!
        }
        return stringFormatter;
    }

    /**
     * 根据指定的格式化模板，将当前时间对象，转为指定模板结构的字符串，字符串模板的可选参数有：
     * y，年；M，月；d，日；w，周日期；H，24小时格式的小时；m，分钟；s，秒钟；f，毫秒。
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

        ////////////////////////////////////////////////
        // 年份的占位符： y 。
        ////////////////////////////////////////////////
        let yearFormatterPlaceholder = "y";
        let yearFieldCaption = this.year.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                yearFormatterPlaceholder,
                yearFieldCaption,
                true);

        ////////////////////////////////////////////////
        // 月份的占位符： M 。
        ////////////////////////////////////////////////
        let monthFormatterPlaceholder = "M";
        let monthFieldCaption = this.month.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                monthFormatterPlaceholder,
                monthFieldCaption);

        ////////////////////////////////////////////////
        // 日期的占位符： d 。
        ////////////////////////////////////////////////
        let dayFormatterPlaceholder = "d";
        let dayFieldCaption = this.day.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                dayFormatterPlaceholder,
                dayFieldCaption);

        ////////////////////////////////////////////////
        // 周日期的占位符： w 。
        ////////////////////////////////////////////////
        let weekdayFormatterPlaceholder = "w";
        let weekdayIndex = this.weekday;
        let weekdayFieldCaption: string | null = null;
        let weekdayCaptions = DateTime.WeekdayCaptions;
        if (weekdayCaptions != null
            && weekdayIndex >= 0
            && weekdayIndex < weekdayCaptions.length)
        {
            weekdayFieldCaption = weekdayCaptions[weekdayIndex];
        }
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                weekdayFormatterPlaceholder,
                weekdayFieldCaption);

        ////////////////////////////////////////////////
        // 24小时制，小时的占位符： H 。
        ////////////////////////////////////////////////
        let hourIn24FormatterPlaceholder = "H";
        let hourIn24FieldCaption = this.hour.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                hourIn24FormatterPlaceholder,
                hourIn24FieldCaption);

        ////////////////////////////////////////////////
        // 12小时制，小时的占位符： h 。
        ////////////////////////////////////////////////
        let hourIn12FormatterPlaceholder = "h";
        let hourIn12 = this.hour;
        if (hourIn12 > 12)
        {
            hourIn12 -= 12;
        }
        let hourIn12FieldCaption = hourIn12.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                hourIn12FormatterPlaceholder,
                hourIn12FieldCaption);

        ////////////////////////////////////////////////
        // 分钟的占位符： m 。
        ////////////////////////////////////////////////
        let minuteFormatterPlaceholder = "m";
        let minuteFieldCaption = this.minute.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                minuteFormatterPlaceholder,
                minuteFieldCaption);

        ////////////////////////////////////////////////
        // 秒钟的占位符： s 。
        ////////////////////////////////////////////////
        let secondFormatterPlaceholder = "s";
        let secondFieldCaption = this.second.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                secondFormatterPlaceholder,
                secondFieldCaption);


        ////////////////////////////////////////////////
        // 毫秒的占位符： f 。
        ////////////////////////////////////////////////
        let millisecondFormatterPlaceholder = "f";
        let millisecondFieldCaption = this.millisecond.toString();
        stringFormatter
            = this._replaceDateFormatterPlaceholderInFormatter(
                stringFormatter,
                millisecondFormatterPlaceholder,
                millisecondFieldCaption);

        if (stringFormatter != null)
        {
            return stringFormatter
        }
        return StringUtil.Empty;
    }
}
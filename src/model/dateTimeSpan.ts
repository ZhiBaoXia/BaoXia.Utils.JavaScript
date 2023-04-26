import { DateTimeFieldConverter } from "../constants/dateTimeFieldConverter.js";

export class DateTimeSpan
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;

    get totalYears(): number
    {
        return this.years
            + this.months / DateTimeFieldConverter.MonthsPerYear
            + this.days / DateTimeFieldConverter.DaysPerYear
            + this.hours / DateTimeFieldConverter.HoursPerYear
            + this.minutes / DateTimeFieldConverter.MinutesPerYear
            + this.seconds / DateTimeFieldConverter.SecondsPerYear
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerYear;
    }

    set totalYears(years: number)
    {
        this.years = Math.floor(years);

        let months = (years - this.years) * DateTimeFieldConverter.MonthsPerYear;
        {
            this.months = Math.floor(months);
        }

        let days = (months - this.months) * DateTimeFieldConverter.DaysPerMonth;
        {
            this.days = Math.floor(days);
        }

        let hours = (days - this.days) * DateTimeFieldConverter.HoursPerDay;
        {
            this.hours = Math.floor(hours);
        }

        let minutes = (hours - this.hours) * DateTimeFieldConverter.MinutesPerHour;
        {
            this.minutes = Math.floor(minutes);
        }

        let seconds = (minutes - this.minutes) * DateTimeFieldConverter.SecondsPerMinute;
        {
            this.seconds = Math.floor(seconds);
        }

        let milliseconds = (seconds - this.seconds) * DateTimeFieldConverter.MillisecondsPerSecond;
        {
            this.milliseconds = Math.floor(milliseconds);
        }
    }

    get totalMonths(): number
    {
        return this.years * DateTimeFieldConverter.MonthsPerYear
            + this.months
            + this.days / DateTimeFieldConverter.DaysPerMonth
            + this.hours / DateTimeFieldConverter.HoursPerMonth
            + this.minutes / DateTimeFieldConverter.MinutesPerMonth
            + this.seconds / DateTimeFieldConverter.SecondsPerMonth
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerMonth;
    }

    set totalMonths(months:number)
    {
        this.totalYears = months / DateTimeFieldConverter.MonthsPerYear;
    }

    get totalDays(): number
    {
        return this.years * DateTimeFieldConverter.DaysPerYear
            + this.months * DateTimeFieldConverter.DaysPerMonth
            + this.days
            + this.hours / DateTimeFieldConverter.HoursPerDay
            + this.minutes / DateTimeFieldConverter.MinutesPerDay
            + this.seconds / DateTimeFieldConverter.SecondsPerDay
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerDay;
    }

    set totalDays(days: number)
    {
        this.totalYears = days / DateTimeFieldConverter.DaysPerYear;
    }
    
    get totalHours(): number
    {
        return this.years * DateTimeFieldConverter.HoursPerYear
            + this.months * DateTimeFieldConverter.HoursPerMonth
            + this.days * DateTimeFieldConverter.HoursPerDay
            + this.hours
            + this.minutes / DateTimeFieldConverter.MinutesPerHour
            + this.seconds / DateTimeFieldConverter.SecondsPerHour
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerHour;
    }

    set totalHours(hours: number)
    {
        this.totalYears = hours / DateTimeFieldConverter.HoursPerYear;
    }

    get totalMinutes(): number
    {
        return this.years * DateTimeFieldConverter.MinutesPerYear
            + this.months * DateTimeFieldConverter.MinutesPerMonth
            + this.days * DateTimeFieldConverter.MinutesPerDay
            + this.hours * DateTimeFieldConverter.MinutesPerHour
            + this.minutes
            + this.seconds / DateTimeFieldConverter.SecondsPerMinute
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerMinute;
    }

    set totalMinutes(minutes: number)
    {
        this.totalYears = minutes / DateTimeFieldConverter.MinutesPerYear;
    }

    get totalSeconds(): number
    {
        return this.years * DateTimeFieldConverter.SecondsPerYear
            + this.months * DateTimeFieldConverter.SecondsPerMonth
            + this.days * DateTimeFieldConverter.SecondsPerDay
            + this.hours * DateTimeFieldConverter.SecondsPerHour
            + this.minutes * DateTimeFieldConverter.SecondsPerMinute
            + this.seconds
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerSecond;
    }

    set totalSeconds(seconds: number)
    {
        this.totalYears = seconds / DateTimeFieldConverter.SecondsPerYear;
    }

    get totalMilliseconds(): number
    {
        return this.years * DateTimeFieldConverter.MillisecondsPerYear
            + this.months * DateTimeFieldConverter.MillisecondsPerMonth
            + this.days * DateTimeFieldConverter.MillisecondsPerDay
            + this.hours * DateTimeFieldConverter.MillisecondsPerHour
            + this.minutes * DateTimeFieldConverter.MillisecondsPerMinute
            + this.seconds * DateTimeFieldConverter.MillisecondsPerSecond
            + this.milliseconds;
    }

    set totalMilliseconds(milliseconds: number)
    {
        this.totalYears = milliseconds / DateTimeFieldConverter.MillisecondsPerYear;
    }

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        milliseconds: number = 0,
        seconds: number = 0,
        minutes: number = 0,
        hours: number = 0,
        days: number = 0,
        months: number = 0,
        years: number = 0)
    {
        this.years = years;
        this.months = months;
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
    }
}
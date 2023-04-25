
export class DateTimeFieldConverter
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    static readonly MillisecondsToSeconds = 1000;
    static readonly MillisecondsToMinutes = 60000;
    static readonly MillisecondsToHours = 3600000;
    static readonly MillisecondsToDays = 86400000;
    static readonly MillisecondsToMonths = 2592000000;
    static readonly MillisecondsToYears = 31536000000;

    static readonly SecondsToMinutes = 60;
    static readonly SecondsToHours = 3600;
    static readonly SecondsToDays = 86400;
    static readonly SecondsToMonths = 2592000;
    static readonly SecondsToYears = 31536000;

    static readonly MinutesToHours = 60;
    static  readonly MinutesToDays = 1440;
    static readonly MinutesToMonths = 43200;
    static readonly MinutesToYears = 525600;

    static readonly HoursToDays = 24;
    static readonly HoursToMonths = 720;
    static readonly HoursToYears = 8760;

    static readonly DaysToMonths = 30;
    static readonly DaysToYears = 365;

    static readonly MonthsToYears = 12;
}
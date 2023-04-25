

export class DateTimeSppan
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    year:number;
    month:number;
    day:number;
    hour:number;
    minute:number;
    second:number;
    millisecond:number;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        year: number = 0,
        month: number = 0,
        day: number = 0,
        hour: number = 0,
        minute: number = 0,
        second: number = 0,
        millisecond: number = 0)
    {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
    }

    totalYears(): number
    {
        return this.year
        + 
}
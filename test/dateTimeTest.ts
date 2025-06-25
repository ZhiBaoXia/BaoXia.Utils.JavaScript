import { TestCase, DateTime, DateTimeField, DateTimeUtil } from "../src/index.js";

export class DateTimeTest extends TestCase
{
	constructor()
	{
		super("DateTime Test",
			(assert, assertFalse) =>
			{
				////////////////////////////////////////////////
				// 日期时间操作相关测试：
				////////////////////////////////////////////////
				let dateTimeA = new DateTime();
				let dateTimeB = dateTimeA.dateTimeByAddSeconds(1);
				let dateTimeSpan = dateTimeB.timeSpanBySubtract(dateTimeA);
				{
					assert(dateTimeSpan.totalSeconds == 1);
				}

				dateTimeSpan = dateTimeA.timeSpanBySubtract(dateTimeB);
				{
					assert(dateTimeSpan.totalSeconds == -1);
				}

				dateTimeB = dateTimeA.dateTimeByAddSeconds(-1);
				dateTimeSpan = dateTimeB.timeSpanBySubtract(dateTimeA);
				{
					assert(dateTimeSpan.totalSeconds == -1);
				}

				dateTimeSpan = dateTimeA.timeSpanBySubtract(dateTimeB);
				{
					assert(dateTimeSpan.totalSeconds == 1);
				}

				////////////////////////////////////////////////
				// 日期时间比较相关测试：
				////////////////////////////////////////////////
				dateTimeA = new DateTime();
				dateTimeB = dateTimeA;
				assertFalse(dateTimeA.isLessThan(dateTimeB));
				assert(dateTimeA.isLessThanOrEquals(dateTimeB));
				assert(dateTimeA.isEquals(dateTimeB));
				assertFalse(dateTimeA.isGreaterThan(dateTimeB));
				assert(dateTimeA.isGreaterThanOrEquals(dateTimeB));

				dateTimeB = dateTimeA.dateTimeByOffset(
					DateTimeField.Second,
					1);
				assert(dateTimeA.isLessThan(dateTimeB));
				assert(dateTimeA.isLessThanOrEquals(dateTimeB));
				assertFalse(dateTimeA.isEquals(dateTimeB));
				assertFalse(dateTimeA.isGreaterThan(dateTimeB));
				assertFalse(dateTimeA.isGreaterThanOrEquals(dateTimeB));


				dateTimeB = dateTimeA.dateTimeByOffset(
					DateTimeField.Second,
					-1);
				assertFalse(dateTimeA.isLessThan(dateTimeB));
				assertFalse(dateTimeA.isLessThanOrEquals(dateTimeB));
				assertFalse(dateTimeA.isEquals(dateTimeB));
				assert(dateTimeA.isGreaterThan(dateTimeB));
				assert(dateTimeA.isGreaterThanOrEquals(dateTimeB));

				////////////////////////////////////////////////
				// 其他相关测试：
				////////////////////////////////////////////////
				dateTimeA = new DateTime();
				{
					dateTimeA.year = 2023;
					dateTimeA.month = 4;
					dateTimeA.day = 26;
					dateTimeA.hour = 16;
					dateTimeA.minute = 30;
					dateTimeA.second = 1;
					dateTimeA.millisecond = 123;
				}
				let dateTimeCaption = dateTimeA.toString("yyyy-MM-dd HH:mm:ss.fff");
				{
					assert(dateTimeCaption == "2023-04-26 16:30:01.123");
				}

				dateTimeCaption = dateTimeA.toString("yy-M-dd HH:mm:ss.fff");
				{
					assert(dateTimeCaption == "23-4-26 16:30:01.123");
				}

				dateTimeCaption = dateTimeA.toString("yyyy-MM-dd hh:mm:ss.fff");
				{
					assert(dateTimeCaption == "2023-04-26 04:30:01.123");
				}

				dateTimeCaption = dateTimeA.toString("yy-M-dd hh:mm:ss.fff");
				{
					assert(dateTimeCaption == "23-4-26 04:30:01.123");
				}

				////////////////////////////////////////////////
				// ISO时间字符串相关测试：
				////////////////////////////////////////////////

				// 时间戳“1682899200000”，
				// 对应的ISO时间字符串为：2023-05-01 08:00:00+08:00 。
				// 对应的零时区时间字符串为： 2023-05-01 00:00:00Z 。
				dateTimeA = new DateTime(1682899200000);
				{
					let localTimeZone = -1 * new Date().getTimezoneOffset();

					assert(dateTimeA.year == 2023);
					assert(dateTimeA.month == 5);
					assert(dateTimeA.day == 1);
					let localHour = Math.floor(localTimeZone / 60);
					assert(dateTimeA.hour == localHour);
					let localMinute = Math.floor(localTimeZone % 60);
					assert(dateTimeA.minute == localMinute);
					assert(dateTimeA.second == 0);
					assert(dateTimeA.millisecond == 0);
				}
				let dateTimeISOStirngWithLocalTimeZone = dateTimeA.toISOString();
				{
					assert(dateTimeISOStirngWithLocalTimeZone == "2023-05-01T08:00:00.000+08:00");
				}
				let dateTimeISOStirngWithZeroTimeZone = dateTimeA.toISOString(false);
				{
					assert(dateTimeISOStirngWithZeroTimeZone == "2023-05-01T00:00:00.000Z");
				}

				assert(dateTimeA.toISOString() == dateTimeA.toString());


				////////////////////////////////////////////////
				// DateTimeUtil相关测试：
				////////////////////////////////////////////////

				let now = DateTime.Now;
				let nowListCaption = DateTimeUtil.captionOfListElementDefault(now);
				{
					assert(nowListCaption!.length > 0);
				}
				let nowDetailCaption = DateTimeUtil.captionOfDetailPageDefault(now);
				{
					assert(nowDetailCaption!.length > 0);
				}
			});
	}
}
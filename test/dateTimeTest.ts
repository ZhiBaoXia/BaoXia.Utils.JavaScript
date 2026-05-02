import { TestCase } from "@baoxia/utils.javascript.testutil";
import { DateTime, DateTimeField, DateTimeUtil } from "../src/index.js";

export class DateTimeTest extends TestCase
{
	constructor()
	{
		super("DateTime Test", (assert, assertFalse) =>
		{
			////////////////////////////////////////////////
			// 构造方法相关测试：
			////////////////////////////////////////////////
			let dateTimeByYearMonthDay = new DateTime(2023, 10, 1, 11, 12, 13);
			{
				assert(dateTimeByYearMonthDay.year == 2023);
				assert(dateTimeByYearMonthDay.month == 10);
				assert(dateTimeByYearMonthDay.day == 1);
				assert(dateTimeByYearMonthDay.hour == 11);
				assert(dateTimeByYearMonthDay.minute == 12);
				assert(dateTimeByYearMonthDay.second == 13);
			}


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


			dateTimeB = dateTimeA.dateTimeByOffset(DateTimeField.Second, -1);
			assertFalse(dateTimeA.isLessThan(dateTimeB));
			assertFalse(dateTimeA.isLessThanOrEquals(dateTimeB));
			assertFalse(dateTimeA.isEquals(dateTimeB));
			assert(dateTimeA.isGreaterThan(dateTimeB));
			assert(dateTimeA.isGreaterThanOrEquals(dateTimeB));

			dateTimeA = new DateTime(2026, 1, 4);
			assertFalse(dateTimeA.isEquals(DateTime.Now, DateTimeField.Day));

			dateTimeA = new DateTime(2026, 4, 24);

			const dateTimeOfLastOfDay = dateTimeA.dateTimeAtLastOfDay();
			{
				assert(dateTimeOfLastOfDay.year == 2026);
				assert(dateTimeOfLastOfDay.month == 4);
				assert(dateTimeOfLastOfDay.day == 24);
				assert(dateTimeOfLastOfDay.hour == 23);
				assert(dateTimeOfLastOfDay.minute == 59);
				assert(dateTimeOfLastOfDay.second == 59);
				assert(dateTimeOfLastOfDay.millisecond == 999);
			}

			const dateTimeOfEndOfWeek = dateTimeA.dateTimeAtEndOfWeek();
			{
				assert(dateTimeOfEndOfWeek.year == 2026);
				assert(dateTimeOfEndOfWeek.month == 4);
				assert(dateTimeOfEndOfWeek.day == 26);
				assert(dateTimeOfEndOfWeek.hour == 0);
				assert(dateTimeOfEndOfWeek.minute == 0);
				assert(dateTimeOfEndOfWeek.second == 0);
				assert(dateTimeOfEndOfWeek.millisecond == 0);
			}

			const dateTimeOfLastOfWeek = dateTimeA.dateTimeAtLastOfWeek();
			{
				assert(dateTimeOfLastOfWeek.year == 2026);
				assert(dateTimeOfLastOfWeek.month == 4);
				assert(dateTimeOfLastOfWeek.day == 25);
				assert(dateTimeOfLastOfWeek.hour == 23);
				assert(dateTimeOfLastOfWeek.minute == 59);
				assert(dateTimeOfLastOfWeek.second == 59);
				assert(dateTimeOfLastOfWeek.millisecond == 999);
			}

			const dateTimeOfLastOfChineseWeek = dateTimeA.dateTimeAtLastOfChineseWeek();
			{
				assert(dateTimeOfLastOfChineseWeek.year == 2026);
				assert(dateTimeOfLastOfChineseWeek.month == 4);
				assert(dateTimeOfLastOfChineseWeek.day == 26);
				assert(dateTimeOfLastOfChineseWeek.hour == 23);
				assert(dateTimeOfLastOfChineseWeek.minute == 59);
				assert(dateTimeOfLastOfChineseWeek.second == 59);
				assert(dateTimeOfLastOfChineseWeek.millisecond == 999);
			}

			const dateTimeOfLastOfMonth = dateTimeA.dateTimeAtLastOfMonth();
			{
				assert(dateTimeOfLastOfMonth.year == 2026);
				assert(dateTimeOfLastOfMonth.month == 4);
				assert(dateTimeOfLastOfMonth.day == 30);
				assert(dateTimeOfLastOfMonth.hour == 23);
				assert(dateTimeOfLastOfMonth.minute == 59);
				assert(dateTimeOfLastOfMonth.second == 59);
				assert(dateTimeOfLastOfMonth.millisecond == 999);
			}

			const dateTimeOfLastOfQuarter = dateTimeA.dateTimeAtLastOfQuarter();
			{
				assert(dateTimeOfLastOfQuarter.year == 2026);
				assert(dateTimeOfLastOfQuarter.month == 6);
				assert(dateTimeOfLastOfQuarter.day == 30);
				assert(dateTimeOfLastOfQuarter.hour == 23);
				assert(dateTimeOfLastOfQuarter.minute == 59);
				assert(dateTimeOfLastOfQuarter.second == 59);
				assert(dateTimeOfLastOfQuarter.millisecond == 999);
			}

			const dateTimeOfLastOfYear = dateTimeA.dateTimeAtLastOfYear();
			{
				assert(dateTimeOfLastOfYear.year == 2026);
				assert(dateTimeOfLastOfYear.month == 12);
				assert(dateTimeOfLastOfYear.day == 31);
				assert(dateTimeOfLastOfYear.hour == 23);
				assert(dateTimeOfLastOfYear.minute == 59);
				assert(dateTimeOfLastOfYear.second == 59);
				assert(dateTimeOfLastOfYear.millisecond == 999);
			}




			dateTimeA = new DateTime(2023, 4, 26, 16, 30, 1, 123);
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

			const endOfYear = dateTimeA.dateTimeAtEndOfYear();
			{
				assert(endOfYear.year == 2024);
				assert(endOfYear.month == 1);
				assert(endOfYear.day == 1);
				assert(endOfYear.hour == 0);
				assert(endOfYear.minute == 0);
				assert(endOfYear.second == 0);
				assert(endOfYear.millisecond == 0);
			}
			{
				assert(dateTimeA.year == 2023);
				assert(dateTimeA.month == 4);
				assert(dateTimeA.day == 26);
				assert(dateTimeA.hour == 16);
				assert(dateTimeA.minute == 30);
				assert(dateTimeA.second == 1);
				assert(dateTimeA.millisecond == 123);
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



			////////////////////////////////////////////////
			// 极限值相关测试：
			////////////////////////////////////////////////
			const dateTimeMaxString = "9999-12-31T23:59:59.9999999+00:00";
			const dateTimeMax = new DateTime(dateTimeMaxString);
			const dateTimeMaxISOString = dateTimeMax.toISOString();
			{
				assert(dateTimeMaxISOString == "10000-01-01T07:59:59.999+08:00");
			}
		});
	}
}
import { DateTime, DateTimeField } from "./index.js";

export class DateTimeUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region


	public static captionOfListElementDefault(
		dateTimeOffset: DateTime,
		isNeedSecondsField: boolean = false)
		: string
	{
		let caption: string;
		var now = DateTime.Now;
		if (dateTimeOffset.isTodayOf(now))
		{
			if (isNeedSecondsField)
			{
				caption = dateTimeOffset.toString("今天 HH:mm:ss");
			}
			else
			{
				caption = dateTimeOffset.toString("今天 HH:mm");
			}
		}
		else if (dateTimeOffset.isYesterdayOf(now))
		{
			if (isNeedSecondsField)
			{
				caption = dateTimeOffset.toString("昨天 HH:mm:ss");
			}
			else
			{
				caption = dateTimeOffset.toString("昨天 HH:mm");
			}
		}
		else if (dateTimeOffset.isTomorrowOf(now))
		{
			if (isNeedSecondsField)
			{
				caption = dateTimeOffset.toString("明天 HH:mm:ss");
			}
			else
			{
				caption = dateTimeOffset.toString("明天 HH:mm");
			}
		}
		else if (dateTimeOffset.isEquals(now, DateTimeField.Year))
		{
			caption = dateTimeOffset.toString("MM月dd天 HH:mm");
		}
		else
		{
			caption = dateTimeOffset.toString("yyyy年MM月dd日");
		}
		return caption;
	}

	public static captionOfDetailPageDefault(
		dateTime: DateTime,
		isNeedSecondsField: boolean = false): string
	{
		let caption: string;
		var now = DateTime.Now;
		if (dateTime.isTodayOf(now))
		{
			if (isNeedSecondsField)
			{
				caption = dateTime.toString("今天 HH:mm:ss");
			}
			else
			{
				caption = dateTime.toString("今天 HH:mm");
			}
		}
		else if (dateTime.isYesterdayOf(now))
		{
			if (isNeedSecondsField)
			{
				caption = dateTime.toString("昨天 HH:mm:ss");
			}
			else
			{
				caption = dateTime.toString("昨天 HH:mm");
			}
		}
		else if (dateTime.isTomorrowOf(now))
		{
			if (isNeedSecondsField)
			{
				caption = dateTime.toString("明天 HH:mm:ss");
			}
			else
			{
				caption = dateTime.toString("明天 HH:mm");
			}
		}
		else if (dateTime.isEquals(now, DateTimeField.Year))
{
			if (isNeedSecondsField)
			{
				caption = dateTime.toString("MM月dd日 HH:mm:ss");
			}
			else
			{
				caption = dateTime.toString("MM月dd日 HH:mm");
			}
		}
		else
		{
			if (isNeedSecondsField)
			{
				caption = dateTime.toString("yyyy年MM月dd日 HH:mm:ss");
			}
			else
			{
				caption = dateTime.toString("yyyy年MM月dd日");
			}
		}
		return caption;
	}

	// #endRegion
}
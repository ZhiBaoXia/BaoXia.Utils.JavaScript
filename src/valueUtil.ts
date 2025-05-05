import { StringUtil } from "./stringUtil.js";

export class ValueUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	public static isTrue(value: any): boolean
	{
		if (value === undefined || value === null)
		{
			return false;
		}
		var typeOfValue = typeof value;
		if (typeOfValue == "string")
		{
			if (StringUtil.isEqualsIgnoreCase(value, "true"))
			{
				return true;
			}
		}
		else if (typeOfValue == "boolean")
		{
			return value;
		}
		return false;
	}

	public static isNotTrue(value: any): boolean
	{
		return !ValueUtil.isTrue(value);
	}

	public static isFalse(value: any): boolean
	{
		return ValueUtil.isNotTrue(value);
	}

	public static isNotFalse(value: any): boolean
	{
		return ValueUtil.isTrue(value);
	}

	public static isEquals<ValueType>(
		value1: ValueType | null | undefined,
		value2: ValueType | null | undefined,
		toIsEquals: (value1: ValueType, value2: ValueType) => boolean)
		: boolean
	{
		if (value1 === value2)
		{
			return true;
		}
		if (!value1 && !value2)
		{
			return true;
		}
		if (!value1)
		{
			return false;
		}
		if (!value2)
		{
			return false;
		}
		return toIsEquals(value1, value2);
	}

	// #endRegion
}
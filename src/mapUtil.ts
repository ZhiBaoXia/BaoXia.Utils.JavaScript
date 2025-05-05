

export class MapUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	static isEquals<KeyType, ValueType>(
		map1: Map<KeyType, ValueType> | null | undefined,
		map2: Map<KeyType, ValueType> | null | undefined,
		toIsEqualsKeyValue: (key: KeyType, value1: ValueType | undefined, value2: ValueType | undefined) => boolean): boolean
	{
		if (map1 === map2)
		{
			return true;
		}
		if (!map1
			&& !map2)
		{
			return true;
		}
		if (!map1)
		{
			return false;
		}
		if (!map2)
		{
			return false;
		}

		if (map1.size != map2.size)
		{
			return false;
		}

		for (const [key, value1] of map1)
		{
			const value2 = map2.get(key);
			if (!toIsEqualsKeyValue(
				key,
				value1,
				value2))
			{
				return false;
			}
		}
		return true;
	}

	// #endRegion
}
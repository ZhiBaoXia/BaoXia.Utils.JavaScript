import { StringUtil } from "./stringUtil.js";

export class ArrayUtil
{
	////////////////////////////////////////////////
	////////////////////////////////////////////////
	// 数组（Array）操作相关。
	////////////////////////////////////////////////
	////////////////////////////////////////////////

	/**
	 * 空数组。
	 */
	static readonly Empty: [] = [];

	/**
	 * 判断指定的数组，是否为“null”，或“空数组”。
	 * @param str 指定的数组对象。
	 * @returns 如果指定的数组对象为“null”，或“空数组”，则返回：true，否则返回：false。
	 */
	static isEmpty(items: Array<any> | null | undefined): boolean
	{
		if (items == undefined
			|| items == null
			|| items.length <= 0)
		{
			return true;
		}
		return false;
	}

	/**
	 * 判断指定的数组，是否不为“null”，或“空数组”。
	 * @param str 指定的数组对象。
	 * @returns 如果指定的数组对象不为“null”，或“空数组”，则返回：true，否则返回：false。
	 */
	static isNotEmpty(items: Array<any> | null | undefined): boolean
	{
		return !ArrayUtil.isEmpty(items);
	}

	/**
	 * 获取数组中的第一个元素。
	 * @param items 指定的数组。
	 * @returns 返回数组中的第一个元素。
	 */
	static firstItemOf<ItemType>(items: Array<ItemType> | null | undefined): ItemType | null
	{
		if (!items)
		{
			return null;
		}
		if (items.length > 0)
		{
			return items[0];
		}
		return null;
	}

	/**
	 * 获取数组中的最后一个元素。
	 * @param items 指定的数组。
	 * @returns 返回数组中的最后一个元素。
	 */
	static lastItemOf<ItemType>(items: Array<ItemType> | null | undefined): ItemType | null
	{
		if (!items)
		{
			return null;
		}
		if (items.length > 0)
		{
			return items[items.length - 1];
		}
		return null;
	}

	/**
	 * 添加元素到指定的数组对象。
	 * @param items 指定的数组对象。
	 * @param newItem 要添加的元素。
	 * @returns 返回已添加的元素。
	 */
	static addItemTo<ItemType>(
		items: Array<ItemType>,
		newItem: ItemType): ItemType
	{
		//
		items.push(newItem);
		//
		return newItem;
	}

	/**
	 * 添加元素集合到指定的数组对象。
	 * @param items 指定的数组对象。
	 * @param newItems 要添加的元素。
	 * @returns 返回已添加的元素。
	 */
	static addItemsTo<ItemType>(
		items: Array<ItemType>,
		newItems: ItemType[]): ItemType[]
	{
		for (let item of newItems)
		{
			//
			items.push(item);
			//
		}
		return newItems;
	}

	/**
	 * 在指定数组的指定位置上插入新的元素。
	 * @param items 指定的数组对象。
	 * @param insertIndex 要插入新元素的索引值。
	 * @param newItems 要插入的新元素对象。
	 * @returns 返回已插入的新元素对象。
	 */
	static insertItemTo<ItemType>(
		items: Array<ItemType>,
		insertIndex: number,
		newItem: ItemType): Array<ItemType>
	{
		items.splice(
			insertIndex,
			0,
			newItem);
		return items;
	}

	/**
	 * 在指定数组的指定位置上插入新的数组元素。
	 * @param items 指定的数组对象。
	 * @param insertIndex 要插入新元素的索引值。
	 * @param newItems 要插入的新元素数组对象。
	 * @returns 返回已插入的新元素数组。
	 */
	static insertItemsTo<ItemType>(
		items: Array<ItemType>,
		insertIndex: number,
		newItems: Array<ItemType>): Array<ItemType>
	{
		if (newItems != null
			&& newItems.length > 0)
		{
			items.splice(
				insertIndex,
				0,
				...newItems);
		}
		return newItems;
	}

	/**
	 * 移除指定数组内，指定范围内的元素。
	 * @param items 指定的数组对象。
	 * @param removeRangeBeginIndex 指定范围的起始元素索引值。
	 * @param removeItemsCount 要移除范围的元素数量。
	 * @returns 返回已删除的元素数组。
	 */
	static removeItemsInRangeFrom<ItemType>(
		items: Array<ItemType>,
		removeRangeBeginIndex: number,
		removeItemsCount: number): Array<ItemType> | null
	{
		let removeRangeEndIndex
			= removeRangeBeginIndex
			+ removeItemsCount;
		if (removeRangeBeginIndex < 0)
		{
			removeRangeBeginIndex = 0;
		}
		if (removeRangeEndIndex > items.length)
		{
			removeRangeEndIndex = items.length;
		}
		removeItemsCount
			= removeRangeEndIndex
			- removeRangeBeginIndex;
		if (removeItemsCount <= 0)
		{
			return null;
		}
		let itemsRemoved = items.slice(
			removeRangeBeginIndex,
			removeRangeEndIndex)
		{
			items.splice(
				removeRangeBeginIndex,
				removeItemsCount);
		}
		return itemsRemoved;
	}

	/**
	 * 移除指定数组中指定位置上的元素。
	 * @param items 指定的数组。
	 * @param itemIndex 要移除元素的索引值。
	 * @returns 移除成功时，返回刚刚移除的元素，否则返回：null。
	 */
	static removeItemAt<ItemType>(
		items: Array<ItemType>,
		itemIndex: number): ItemType | null
	{
		if (itemIndex >= 0
			&& itemIndex < items.length)
		{
			let item = items[itemIndex];
			{
				items.splice(itemIndex, 1);
			}
			return item;
		}
		return null;
	}

	/**
	 * 移除指定数组中指定的元素。
	 * @param items 指定的数组。
	 * @param item 要移除的元素。
	 * @returns item 移除成功时，返回刚刚移除的元素，否则返回：null。
	 */
	static removeItemFrom<ItemType>(items: Array<ItemType>, item: ItemType): ItemType | null
	{
		let itemIndex = items.indexOf(item);
		{ }
		return ArrayUtil.removeItemAt(
			items,
			itemIndex);
	}

	/**
	 * 获取指定数组指定范围内的元素数组。
	 * @param items 指定的数组对象。
	 * @param subarrayBeginIndex 指定范围的起始元素索引值。
	 * @param subarrayLength 指定范围的元素数量。
	 * @returns 返回指定数组指定范围内的元素数组。
	 */
	static subarrayInRangeFrom<ItemType>(
		items: Array<ItemType>,
		subarrayBeginIndex: number,
		subarrayLength: number): Array<ItemType> | null
	{
		let subarrayEndIndex
			= subarrayBeginIndex
			+ subarrayLength;
		if (subarrayBeginIndex < 0)
		{
			subarrayBeginIndex = 0;
		}
		if (subarrayEndIndex > items.length)
		{
			subarrayEndIndex = items.length;
		}
		subarrayLength
			= subarrayEndIndex
			- subarrayBeginIndex;
		if (subarrayLength <= 0)
		{
			return null;
		}

		let subarray = items.slice(
			subarrayBeginIndex,
			subarrayEndIndex);
		{ }
		return subarray;
	}

	/**
	 * 清空指定数组中的全部元素。
	 * @param items 要清空元素的指定数组对象。
	 * @returns items 已被移除的元素数组对象。
	 */
	static clearItems<ItemType>(items: Array<ItemType>): Array<ItemType>
	{
		let lastArray = items.slice(0, items.length);
		{
			items.length = 0;
		}
		return lastArray;
	}

	static enumerateItemIn<ItemType>(
		items: Array<ItemType> | null | undefined,
		toReceiveItem: (item: ItemType, itemIndex: number) => boolean)
	{
		if (!items)
		{
			return;
		}
		const itemsCount = items.length;
		for (let itemIndex = 0;
			itemIndex < itemsCount;
			itemIndex++)
		{
			let item = items[itemIndex];
			if (!toReceiveItem(
				item,
				itemIndex))
			{
				break;
			}
		}
	}

	static isItemIn<ItemType>(
		items: Array<ItemType> | null | undefined,
		objectItem: ItemType | null | undefined)
		: boolean
	{
		if (!items)
		{
			return false;
		}
		const itemsCount = items.length;
		for (let itemIndex = 0;
			itemIndex < itemsCount;
			itemIndex++)
		{
			let item = items[itemIndex];
			if (item == objectItem)
			{
				return true;
			}
		}
		return false;
	}

	static isItemNotIn<ItemType>(
		items: Array<ItemType> | null | undefined,
		objectItem: ItemType | null | undefined)
		: boolean
	{
		return !this.isItemIn(items, objectItem);
	}

	static isAnyItemsIn<ItemType>(
		items: Array<ItemType> | null | undefined,
		...objectItems: (ItemType | null | undefined)[])
		: boolean
	{
		if (!items)
		{
			return false;
		}
		if (!objectItems
			|| objectItems.length < 1)
		{
			return false;
		}
		const itemsCount = items.length;
		for (let itemIndex = 0;
			itemIndex < itemsCount;
			itemIndex++)
		{
			let item = items[itemIndex];
			if (objectItems.indexOf(item) >= 0)
			{
				return true;
			}
		}
		return false;
	}
	static isAnyItemsNotIn<ItemType>(
		items: Array<ItemType> | null | undefined,
		...objectItems: (ItemType | null | undefined)[])
		: boolean
	{
		return !this.isAnyItemsIn(
			items,
			...objectItems);
	}

	static isAllItemsIn<ItemType>(
		items: Array<ItemType> | null | undefined,
		...objectItems: (ItemType | null | undefined)[])
		: boolean
	{
		if (!items)
		{
			return false;
		}
		if (!objectItems
			|| objectItems.length < 1)
		{
			return false;
		}

		for (let objectItem of objectItems)
		{
			if (!ArrayUtil.isItemIn(items, objectItem))
			{
				return false;
			}
		}
		return true;
	}

	static isAllItemsNotIn<ItemType>(
		items: Array<ItemType> | null | undefined,
		...objectItems: (ItemType | null | undefined)[])
		: boolean
	{
		return !this.isAllItemsIn<ItemType>(
			items,
			...objectItems);
	}

	static isStringItemIn(
		items: Array<string> | null | undefined,
		objectItem: string | null | undefined,
		isIgnoreCase: boolean = false)
		: boolean
	{
		if (!items)
		{
			return false;
		}
		const itemsCount = items.length;
		if (isIgnoreCase)
		{
			for (let itemIndex = 0;
				itemIndex < itemsCount;
				itemIndex++)
			{
				let item = items[itemIndex];
				if (StringUtil.isEqualsIgnoreCase(item, objectItem))
				{
					return true;
				}
			}
		}
		else
		{
			for (let itemIndex = 0;
				itemIndex < itemsCount;
				itemIndex++)
			{
				let item = items[itemIndex];
				if (item == objectItem)
				{
					return true;
				}
			}
		}
		return false;
	}

	static isStringItemNotIn(
		items: Array<string> | null | undefined,
		objectItem: string | null | undefined,
		isIgnoreCase: boolean = false)
		: boolean
	{
		return !this.isStringItemIn(
			items,
			objectItem,
			isIgnoreCase);
	}

	static isAnyStringItemsIn(
		items: Array<string> | null | undefined,
		...objectItems: string[])
		: boolean
	{
		if (!items)
		{
			return false;
		}
		if (!objectItems
			|| objectItems.length < 1)
		{
			return false;
		}
		const itemsCount = items.length;
		for (let itemIndex = 0;
			itemIndex < itemsCount;
			itemIndex++)
		{
			let item = items[itemIndex];
			if (this.isStringItemIn(objectItems, item))
			{
				return true;
			}
		}
		return false;
	}

	static isAnyStringItemsNotIn(
		items: Array<string> | null | undefined,
		...objectItems: string[])
		: boolean
	{
		return !this.isAnyStringItemsIn(
			items,
			...objectItems);
	}

	static isAllStringItemsIn(
		items: Array<string> | null | undefined,
		isIgnoreCase: boolean,
		...objectItems: (string | null | undefined)[])
		: boolean
	{
		if (!items)
		{
			return false;
		}
		if (!objectItems
			|| objectItems.length < 1)
		{
			return false;
		}

		for (let objectItem of objectItems)
		{
			if (!ArrayUtil.isStringItemIn(items, objectItem, isIgnoreCase))
			{
				return false;
			}
		}
		return true;
	}

	static isAllStringItemsNotIn(
		items: Array<string> | null | undefined,
		isIgnoreCase: boolean,
		...objectItems: (string | null | undefined)[])
		: boolean
	{
		return !this.isAllStringItemsIn(
			items,
			isIgnoreCase,
			...objectItems);
	}

	static isEquals<ValueType>(
		array1: Array<ValueType> | null | undefined,
		array2: Array<ValueType> | null | undefined,
		toIsEqualsValue: (value1: ValueType | undefined, value2: ValueType | undefined) => boolean,
		isSequenceIgnored = false): boolean
	{
		if (array1 === array2)
		{
			return true;
		}
		if (!array1
			&& !array2)
		{
			return true;
		}
		if (!array1)
		{
			return false;
		}
		if (!array2)
		{
			return false;
		}

		if (array1.length != array2.length)
		{
			return false;
		}

		const itemsCount = array1.length;
		if (isSequenceIgnored)
		{
			for (let value1 of array1)
			{
				let isValue1ExistedInArray2 = false;
				for (let value2 of array2)
				{
					if (toIsEqualsValue(
						value1,
						value2))
					{
						isValue1ExistedInArray2 = true;
						break;
					}
				}
				if (!isValue1ExistedInArray2)
				{
					return false;
				}
			}
			for (let value2 of array2)
			{
				let isValue2ExistedInArray1 = false;
				for (let value1 of array1)
				{
					if (toIsEqualsValue(
						value1,
						value2))
					{
						isValue2ExistedInArray1 = true;
						break;
					}
				}
				if (!isValue2ExistedInArray1)
				{
					return false;
				}
			}
			return true;
		}

		for (let itemIndex = 0;
			itemIndex < itemsCount;
			itemIndex++)
		{
			const value1 = array1[itemIndex];
			const value2 = array2[itemIndex];
			if (!toIsEqualsValue(
				value1,
				value2))
			{
				return false;
			}
		}
		return true;
	}
}
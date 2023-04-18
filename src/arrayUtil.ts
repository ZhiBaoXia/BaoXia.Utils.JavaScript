export class ArrayUtil
{
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数组（Array）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    /**
     * 判断指定的数组，是否为“null”，或“空数组”。
     * @param str 指定的数组对象。
     * @returns 如果指定的数组对象为“null”，或“空数组”，则返回：true，否则返回：false。
     */
    static isEmpty(items: Array<any> | null): boolean
    {
        if (items == null
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
    static isNotEmpty(items: Array<any> | null): boolean
    {
        return !ArrayUtil.isEmpty(items);
    }

    /**
     * 获取数组中的第一个元素。
     * @param items 指定的数组。
     * @returns 返回数组中的第一个元素。
     */
    static firstItemOf(items: Array<any>): any
    {
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
    static lastItemOf(items: Array<any>): any
    {
        if (items.length > 0)
        {
            return items[items.length - 1];
        }
        return null;
    }

    /**
     * 添加元素到指定的数组对象。
     * @param items 指定的数组对象。
     * @param item 要添加的元素。
     * @returns 返回已添加的元素。
     */
    static addItemTo(items: Array<any>, item: any): any
    {
        items.push(item);

        return item;
    }

    /**
     * 在指定数组的指定位置上插入新的数组元素。
     * @param items 指定的数组对象。
     * @param insertIndex 要插入新元素的索引值。
     * @param newItems 要插入的新元素数组对象。
     * @returns 返回已插入的新元素数组。
     */
    static insertItemsTo(
        items: Array<any>,
        insertIndex: number,
        newItems: Array<any>): Array<any>
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
     * 在指定数组的指定位置上插入新的元素。
     * @param items 指定的数组对象。
     * @param insertIndex 要插入新元素的索引值。
     * @param newItems 要插入的新元素对象。
     * @returns 返回已插入的新元素对象。
     */
    static insertItemTo(
        items: Array<any>,
        insertIndex: number,
        newItem: any): any
    {
        items.splice(
            insertIndex,
            0,
            newItem);
        return items;
    }

    /**
     * 移除指定数组内，指定范围内的元素。
     * @param items 指定的数组对象。
     * @param removeRangeBeginIndex 指定范围的起始元素索引值。
     * @param removeItemsCount 要移除范围的元素数量。
     * @returns 返回已删除的元素数组。
     */
    static removeItemsInRangeFrom(
        items: Array<any>,
        removeRangeBeginIndex: number,
        removeItemsCount: number): Array<any> | null
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
    static removeItemAt(items: Array<any>, itemIndex: number): any
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
    static removeItemFrom(items: Array<any>, item: any): any
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
    static subarrayInRangeFrom(
        items: Array<any>,
        subarrayBeginIndex: number,
        subarrayLength: number): Array<any> | null
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
    static clearItems(items: Array<any>): Array<any>
    {
        let lastArray = items.slice(0, items.length);
        {
            items.length = 0;
        }
        return lastArray;
    }
}
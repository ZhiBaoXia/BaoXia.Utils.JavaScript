export class ArrayUtil {
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数组（Array）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    /**
     * 获取数组中的第一个元素。
     * @param items 指定的数组。
     * @returns 返回数组中的第一个元素。
     */
    static firstItemOf(items) {
        if (items.length > 0) {
            return items[0];
        }
        return null;
    }
    /**
     * 获取数组中的最后一个元素。
     * @param items 指定的数组。
     * @returns 返回数组中的最后一个元素。
     */
    static lastItemOf(items) {
        if (items.length > 0) {
            return items[items.length - 1];
        }
        return null;
    }
    /**
     * 移除指定数组中指定位置上的元素。
     * @param items 指定的数组。
     * @param itemIndex 要移除元素的索引值。
     * @returns 移除成功时，返回刚刚移除的元素，否则返回：null。
     */
    static removeItemAt(items, itemIndex) {
        if (itemIndex >= 0
            && itemIndex < items.length) {
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
    static removeItem(items, item) {
        let itemIndex = items.indexOf(item);
        { }
        return ArrayUtil.removeItemAt(items, itemIndex);
    }
}

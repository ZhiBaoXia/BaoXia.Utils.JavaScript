export class ArrayUtil
{
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    // 数组（Array）操作相关。
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    static firstItemOf(items: Array<any>): any
    {
        if (items.length > 0)
        {
            return items[0];
        }
        return null;
    }

    static lastItemOf(items: Array<any>): any
    {
        if (items.length > 0)
        {
            return items[items.length - 1];
        }
        return null;
    }

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

    static removeItem(items: Array<any>, item: any): any
    {
        let itemIndex = items.indexOf(item);
        { }
        return ArrayUtil.removeItemAt(
            items,
            itemIndex);
    }
}
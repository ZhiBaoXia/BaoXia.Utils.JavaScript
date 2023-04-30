import { UnitTest } from "../index.js";
import { ArrayUtil } from "../arrayUtil.js";

export class ArrayUtilTest extends UnitTest.TestCase
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor()
    {
        super("ArrayUtil Test",
            (assert, assertFalse) =>
            {
                let items = new Array<number>();

                ArrayUtil.addItemTo(items, 0);
                {
                    assert(items.length == 1);
                    assert(items[0] == 0);
                }

                ArrayUtil.insertItemsTo(
                    items,
                    1,
                    [2, 3, 4]);
                {
                    assert(items.length == 4);
                    assert(items[1] == 2);
                    assert(items[2] == 3);
                    assert(items[3] == 4);
                }

                ArrayUtil.insertItemTo(
                    items,
                    1,
                    1);
                {
                    assert(items.length == 5);
                    assert(items[1] == 1);
                    assert(items[2] == 2);
                    assert(items[3] == 3);
                    assert(items[4] == 4);
                }

                ArrayUtil.insertItemsTo(
                    items,
                    3,
                    [2, 3, 4]);
                {
                    assert(items.length == 8);
                    assert(items[3] == 2);
                    assert(items[4] == 3);
                    assert(items[5] == 4);
                }

                ArrayUtil.removeItemAt(
                    items,
                    4);
                {
                    assert(items.length == 7);
                    assert(items[3] == 2);
                    assert(items[4] == 4);
                }

                ArrayUtil.removeItemsInRangeFrom(
                    items,
                    3,
                    2);
                {
                    assert(items.length == 5);
                    assert(items[3] == 3);
                    assert(items[4] == 4);
                }

                for (let itemIndex = 0;
                    itemIndex < items.length;
                    itemIndex++)
                {
                    let item = items[itemIndex];
                    {
                        assert(item == itemIndex);
                    }
                }

                let lastItemsLength = items.length;
                {
                    assert(ArrayUtil.clearItems(items).length == lastItemsLength);
                }
            });
    }
}
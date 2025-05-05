import { TestCase, ArrayUtil } from "../src/index.js";

export class ArrayUtilTest extends TestCase
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

				ArrayUtil.addItemsTo(items, [1, 2]);
				{
					assert(items.length == 3);
					assert(items[0] == 0);
					assert(items[1] == 1);
					assert(items[2] == 2);
				}

				//
				items = [0];
				//

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


				////////////////////////////////////////////////	
				// “isEquals”相关测试：
				////////////////////////////////////////////////
				{
					// 基础比较函数
					const simpleEquals = (a: any, b: any) => a === b;

					// same array reference should return true.
					const arr = [1, 2, 3];
					assert(ArrayUtil.isEquals(arr, arr, simpleEquals) == true);

					// both null should return true.
					assert(ArrayUtil.isEquals(null, null, simpleEquals) == true);

					// both undefined should return true.
					assert(ArrayUtil.isEquals(undefined, undefined, simpleEquals) == true);

					// null and undefined should return false.
					assert(ArrayUtil.isEquals(null, undefined, simpleEquals) == true);

					// one null and one array should return false.
					assert(ArrayUtil.isEquals(null, [1], simpleEquals) == false);

					// different length arrays should return false.
					assert(ArrayUtil.isEquals([1, 2], [1], simpleEquals) == false);

					// same length but different values should return false.
					assert(ArrayUtil.isEquals([1, 2], [1, 3], simpleEquals) == false);

					// same values should return true.
					assert(ArrayUtil.isEquals([1, 2], [1, 2], simpleEquals) == true);

					// custom comparison function should work.
					const customEquals = (a: any, b: any) => Math.floor(a) === Math.floor(b);
					assert(ArrayUtil.isEquals([1.1, 2.9], [1.0, 2.0], customEquals) == true);

					// empty arrays should return true.
					assert(ArrayUtil.isEquals([], [], simpleEquals) == true);
				}
			});
	}
}
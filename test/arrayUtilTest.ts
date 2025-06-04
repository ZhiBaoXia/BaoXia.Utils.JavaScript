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


				////////////////////////////////////////////////	
				// “enumerateItemIn”相关测试：
				////////////////////////////////////////////////
				{
					const testItems = [1, 2, 3];
					let itemsCount = 0;
					let itemsIndexSum = 0;
					let itemsSum = 0;
					ArrayUtil.enumerateItemIn(
						testItems,
						(item, itemIndex) =>
						{
							itemsCount++;
							itemsIndexSum += itemIndex;
							itemsSum += item;
							return true;
						});
					assert(itemsCount == testItems.length);
					assert(itemsIndexSum == 3);
					assert(itemsSum == 6);
				}


				////////////////////////////////////////////////	
				// “isItemIn，isItemNotIn”相关测试：
				////////////////////////////////////////////////
				{
					const testItems = [1, 2, 3];

					assertFalse(ArrayUtil.isItemIn(testItems, -2));
					assertFalse(ArrayUtil.isItemIn(testItems, -1));
					assertFalse(ArrayUtil.isItemIn(testItems, 0));
					assert(ArrayUtil.isItemIn(testItems, 1));
					assert(ArrayUtil.isItemIn(testItems, 2));
					assert(ArrayUtil.isItemIn(testItems, 3));
					assertFalse(ArrayUtil.isItemIn(testItems, 4));
					assertFalse(ArrayUtil.isItemIn(testItems, 5));
					assertFalse(ArrayUtil.isItemIn(testItems, 6));


					assert(ArrayUtil.isItemNotIn(testItems, -2));
					assert(ArrayUtil.isItemNotIn(testItems, -1));
					assert(ArrayUtil.isItemNotIn(testItems, 0));
					assertFalse(ArrayUtil.isItemNotIn(testItems, 1));
					assertFalse(ArrayUtil.isItemNotIn(testItems, 2));
					assertFalse(ArrayUtil.isItemNotIn(testItems, 3));
					assert(ArrayUtil.isItemNotIn(testItems, 4));
					assert(ArrayUtil.isItemNotIn(testItems, 5));
					assert(ArrayUtil.isItemNotIn(testItems, 6));
				}

				////////////////////////////////////////////////	
				// “isAnyItemsIn，isAnyItemsNotIn”相关测试：
				////////////////////////////////////////////////
				{
					const testItems = [1, 2, 3];
					const objectItems_0 = [0];
					const objectItems_1 = [1];
					const objectItems_2 = [1, 2];
					const objectItems_3 = [1, 2, 3];
					const objectItems_4 = [1, 2, 3, 4];
					const unobjectItems = [-1, -2, 0, 4, 5, 6];

					assertFalse(ArrayUtil.isAnyItemsIn(testItems, ...objectItems_0));
					assert(ArrayUtil.isAnyItemsIn(testItems, ...objectItems_1));
					assert(ArrayUtil.isAnyItemsIn(testItems, ...objectItems_2));
					assert(ArrayUtil.isAnyItemsIn(testItems, ...objectItems_3));
					assert(ArrayUtil.isAnyItemsIn(testItems, ...objectItems_4));
					assertFalse(ArrayUtil.isAnyItemsIn(testItems, ...unobjectItems));

					assert(ArrayUtil.isAnyItemsNotIn(testItems, ...objectItems_0));
					assertFalse(ArrayUtil.isAnyItemsNotIn(testItems, ...objectItems_1));
					assertFalse(ArrayUtil.isAnyItemsNotIn(testItems, ...objectItems_2));
					assertFalse(ArrayUtil.isAnyItemsNotIn(testItems, ...objectItems_3));
					assertFalse(ArrayUtil.isAnyItemsNotIn(testItems, ...objectItems_4));
					assert(ArrayUtil.isAnyItemsNotIn(testItems, ...unobjectItems));
				}


				////////////////////////////////////////////////	
				// “isAllItemsIn，isAllItemsNotIn”相关测试：
				////////////////////////////////////////////////
				{
					const testItems = [1, 2, 3];
					const objectItems_0 = [0];
					const objectItems_1 = [1];
					const objectItems_2 = [1, 2];
					const objectItems_3 = [1, 2, 3];
					const objectItems_4 = [1, 2, 3, 4];
					const unobjectItems = [-1, -2, 0, 4, 5, 6];

					assertFalse(ArrayUtil.isAllItemsIn(testItems, ...objectItems_0));
					assert(ArrayUtil.isAllItemsIn(testItems, ...objectItems_1));
					assert(ArrayUtil.isAllItemsIn(testItems, ...objectItems_2));
					assert(ArrayUtil.isAllItemsIn(testItems, ...objectItems_3));
					assertFalse(ArrayUtil.isAllItemsIn(testItems, ...objectItems_4));
					assertFalse(ArrayUtil.isAllItemsIn(testItems, ...unobjectItems));

					assert(ArrayUtil.isAllItemsNotIn(testItems, ...objectItems_0));
					assertFalse(ArrayUtil.isAllItemsNotIn(testItems, ...objectItems_1));
					assertFalse(ArrayUtil.isAllItemsNotIn(testItems, ...objectItems_2));
					assertFalse(ArrayUtil.isAllItemsNotIn(testItems, ...objectItems_3));
					assert(ArrayUtil.isAllItemsNotIn(testItems, ...objectItems_4));
					assert(ArrayUtil.isAllItemsNotIn(testItems, ...unobjectItems));
				}


				////////////////////////////////////////////////	
				// “isStringItemIn，isStringItemNotIn”相关测试（大小写，敏感）：
				////////////////////////////////////////////////
				{
					const testItems = ["a", "b", "c"];

					assertFalse(ArrayUtil.isStringItemIn(testItems, "x"));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "y"));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "z"));
					assert(ArrayUtil.isStringItemIn(testItems, "a"));
					assert(ArrayUtil.isStringItemIn(testItems, "b"));
					assert(ArrayUtil.isStringItemIn(testItems, "c"));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "d"));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "e"));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "f"));


					assert(ArrayUtil.isStringItemNotIn(testItems, "x"));
					assert(ArrayUtil.isStringItemNotIn(testItems, "y"));
					assert(ArrayUtil.isStringItemNotIn(testItems, "z"));
					assertFalse(ArrayUtil.isStringItemNotIn(testItems, "a"));
					assertFalse(ArrayUtil.isStringItemNotIn(testItems, "b"));
					assertFalse(ArrayUtil.isStringItemNotIn(testItems, "c"));
					assert(ArrayUtil.isStringItemNotIn(testItems, "d"));
					assert(ArrayUtil.isStringItemNotIn(testItems, "e"));
					assert(ArrayUtil.isStringItemNotIn(testItems, "f"));
				}

				////////////////////////////////////////////////	
				// “isAnyStringItemsIn，isAnyStringItemsNotIn”相关测试（大小写，敏感）：
				////////////////////////////////////////////////
				{
					const testItems = ["a", "b", "c"];
					const objectItems_0 = ["z"];
					const objectItems_1 = ["a"];
					const objectItems_2 = ["a", "b"];
					const objectItems_3 = ["a", "b", "c"];
					const objectItems_4 = ["a", "b", "c", "d"];
					const unobjectItems = ["x", "y", "z", "d", "e", "f"];

					assertFalse(ArrayUtil.isAnyStringItemsIn(testItems, false, ...objectItems_0));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, false, ...objectItems_1));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, false, ...objectItems_2));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, false, ...objectItems_3));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, false, ...objectItems_4));
					assertFalse(ArrayUtil.isAnyStringItemsIn(testItems, false, ...unobjectItems));

					assert(ArrayUtil.isAnyStringItemsNotIn(testItems, false, ...objectItems_0));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, false, ...objectItems_1));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, false, ...objectItems_2));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, false, ...objectItems_3));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, false, ...objectItems_4));
					assert(ArrayUtil.isAnyStringItemsNotIn(testItems, false, ...unobjectItems));
				}


				////////////////////////////////////////////////	
				// “isAllStringItemsIn，isAllStringItemsNotIn”相关测试（大小写，敏感）：
				////////////////////////////////////////////////
				{
					const testItems = ["a", "b", "c"];
					const objectItems_0 = ["z"];
					const objectItems_1 = ["a"];
					const objectItems_2 = ["a", "b"];
					const objectItems_3 = ["a", "b", "c"];
					const objectItems_4 = ["a", "b", "c", "d"];
					const unobjectItems = ["x", "y", "z", "d", "e", "f"];

					assertFalse(ArrayUtil.isAllStringItemsIn(testItems, false, ...objectItems_0));
					assert(ArrayUtil.isAllStringItemsIn(testItems, false, ...objectItems_1));
					assert(ArrayUtil.isAllStringItemsIn(testItems, false, ...objectItems_2));
					assert(ArrayUtil.isAllStringItemsIn(testItems, false, ...objectItems_3));
					assertFalse(ArrayUtil.isAllStringItemsIn(testItems, false, ...objectItems_4));
					assertFalse(ArrayUtil.isAllStringItemsIn(testItems, false, ...unobjectItems));

					assert(ArrayUtil.isAllStringItemsNotIn(testItems, false, ...objectItems_0));
					assertFalse(ArrayUtil.isAllStringItemsNotIn(testItems, false, ...objectItems_1));
					assertFalse(ArrayUtil.isAllStringItemsNotIn(testItems, false, ...objectItems_2));
					assertFalse(ArrayUtil.isAllStringItemsNotIn(testItems, false, ...objectItems_3));
					assert(ArrayUtil.isAllStringItemsNotIn(testItems, false, ...objectItems_4));
					assert(ArrayUtil.isAllStringItemsNotIn(testItems, false, ...unobjectItems));
				}




				////////////////////////////////////////////////	
				// “isStringItemIn，isStringItemNotIn”相关测试（大小写，不敏感）：
				////////////////////////////////////////////////
				{
					const testItems = ["a", "B", "c"];

					assertFalse(ArrayUtil.isStringItemIn(testItems, "x", true));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "y", true));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "z", true));
					assert(ArrayUtil.isStringItemIn(testItems, "a", true));
					assert(ArrayUtil.isStringItemIn(testItems, "b", true));
					assert(ArrayUtil.isStringItemIn(testItems, "c", true));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "d", true));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "e", true));
					assertFalse(ArrayUtil.isStringItemIn(testItems, "f", true));


					assert(ArrayUtil.isStringItemNotIn(testItems, "x", true));
					assert(ArrayUtil.isStringItemNotIn(testItems, "y", true));
					assert(ArrayUtil.isStringItemNotIn(testItems, "z", true));
					assertFalse(ArrayUtil.isStringItemNotIn(testItems, "a", true));
					assertFalse(ArrayUtil.isStringItemNotIn(testItems, "b", true));
					assertFalse(ArrayUtil.isStringItemNotIn(testItems, "c", true));
					assert(ArrayUtil.isStringItemNotIn(testItems, "d", true));
					assert(ArrayUtil.isStringItemNotIn(testItems, "e", true));
					assert(ArrayUtil.isStringItemNotIn(testItems, "f", true));
				}

				////////////////////////////////////////////////	
				// “isAnyStringItemsIn，isAnyStringItemsNotIn”相关测试（大小写，不敏感）：
				////////////////////////////////////////////////
				{
					const testItems = ["a", "B", "c"];
					const objectItems_0 = ["z"];
					const objectItems_1 = ["a"];
					const objectItems_2 = ["a", "b"];
					const objectItems_3 = ["a", "b", "c"];
					const objectItems_4 = ["a", "b", "c", "d"];
					const unobjectItems = ["x", "y", "z", "d", "e", "f"];

					assertFalse(ArrayUtil.isAnyStringItemsIn(testItems, true, ...objectItems_0));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, true, ...objectItems_1));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, true, ...objectItems_2));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, true, ...objectItems_3));
					assert(ArrayUtil.isAnyStringItemsIn(testItems, true, ...objectItems_4));
					assertFalse(ArrayUtil.isAnyStringItemsIn(testItems, true, ...unobjectItems));

					assert(ArrayUtil.isAnyStringItemsNotIn(testItems, true, ...objectItems_0));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, true, ...objectItems_1));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, true, ...objectItems_2));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, true, ...objectItems_3));
					assertFalse(ArrayUtil.isAnyStringItemsNotIn(testItems, true, ...objectItems_4));
					assert(ArrayUtil.isAnyStringItemsNotIn(testItems, true, ...unobjectItems));
				}


				////////////////////////////////////////////////	
				// “isAllStringItemsIn，isAllStringItemsNotIn”相关测试（大小写，不敏感）：
				////////////////////////////////////////////////
				{
					const testItems = ["a", "B", "c"];
					const objectItems_0 = ["z"];
					const objectItems_1 = ["a"];
					const objectItems_2 = ["a", "b"];
					const objectItems_3 = ["a", "b", "c"];
					const objectItems_4 = ["a", "b", "c", "d"];
					const unobjectItems = ["x", "y", "z", "d", "e", "f"];

					assertFalse(ArrayUtil.isAllStringItemsIn(testItems, true, ...objectItems_0));
					assert(ArrayUtil.isAllStringItemsIn(testItems, true, ...objectItems_1));
					assert(ArrayUtil.isAllStringItemsIn(testItems, true, ...objectItems_2));
					assert(ArrayUtil.isAllStringItemsIn(testItems, true, ...objectItems_3));
					assertFalse(ArrayUtil.isAllStringItemsIn(testItems, true, ...objectItems_4));
					assertFalse(ArrayUtil.isAllStringItemsIn(testItems, true, ...unobjectItems));

					assert(ArrayUtil.isAllStringItemsNotIn(testItems, true, ...objectItems_0));
					assertFalse(ArrayUtil.isAllStringItemsNotIn(testItems, true, ...objectItems_1));
					assertFalse(ArrayUtil.isAllStringItemsNotIn(testItems, true, ...objectItems_2));
					assertFalse(ArrayUtil.isAllStringItemsNotIn(testItems, true, ...objectItems_3));
					assert(ArrayUtil.isAllStringItemsNotIn(testItems, true, ...objectItems_4));
					assert(ArrayUtil.isAllStringItemsNotIn(testItems, true, ...unobjectItems));
				}
			});
	}
}
import { ValueUtil } from "../src/index.js";
import { MapUtil } from "../src/index.js";
import { TestCase } from "@baoxia/utils.javascript.testutil"

export class MapUtilTest extends TestCase
{
	constructor()
	{
		super("MapUtil Test",
			(assert, assertFalse) =>
			{
				// 测试相同引用的情况
				// should return true when maps are the same reference (分支1).
				let map = new Map<string, number>();
				assert(MapUtil.isEquals(map, map, () => false) == true);

				// 测试两个null/undefined的情况
				// should return true when both maps are null or undefined (分支2).
				assert(MapUtil.isEquals(null, null, () => false) == true);
				assert(MapUtil.isEquals(undefined, undefined, () => false) == true);
				assert(MapUtil.isEquals(null, undefined, () => false) == true);

				// 测试其中一个为null/undefined的情况
				// should return false when one map is null/undefined and the other is not (分支3,4).
				map = new Map<string, number>();
				assert(MapUtil.isEquals(null, map, () => false) == false);
				assert(MapUtil.isEquals(map, undefined, () => false) == false);

				// 测试大小不同的情况
				// should return false when maps have different sizes (分支5).
				let map1 = new Map([['a', 1]]);
				let map2 = new Map([['a', 1], ['b', 2]]);
				assert(MapUtil.isEquals(map1, map2, () => false) == false);

				// 测试键值比较失败的情况
				// should return false when toCompareValues returns true (分支6).
				map1 = new Map([['a', 1]]);
				map2 = new Map([['a', 2]]);
				assert(MapUtil.isEquals(map1, map2, (key, val1, val2) => val1 == val2) == false);

				// 测试键值比较成功的情况
				// should return true when all key-value pairs are equal.
				map1 = new Map([['a', 1], ['b', 2]]);
				map2 = new Map([['a', 1], ['b', 2]]);
				assert(MapUtil.isEquals(
					map1,
					map2,
					(key, value1, value2) =>
					{
						if (value1 == value2)	
						{
							return true;
						}
						return false;
					}) == true);

				// 测试键顺序不影响比较结果
				// should return true regardless of key insertion order.
				map1 = new Map([['a', 1], ['b', 2]]);
				map2 = new Map([['b', 2], ['a', 1]]);
				assert(MapUtil.isEquals(map1, map2, (key, value1, value2) => value1 == value2) == true);

				// 测试自定义比较函数的行为
				// should use custom comparison function correctly.
				let map3 = new Map([['a', { x: 1 }]]);
				let map4 = new Map([['a', { x: 1 }]]);
				assert(MapUtil.isEquals(
					map3,
					map4,
					(key, val1, val2) => 
					{
						return ValueUtil.isEquals(
							val1,
							val2,
							(val1, val2) =>
							{
								return val1.x == val2.x;
							});
					}) == true);

				// 测试自定义比较函数的行为
				// should use custom comparison function correctly.
				map3 = new Map([['a', { x: 1 }]]);
				map4 = new Map([['a', { x: 2 }]]);
				assert(MapUtil.isEquals(map3, map4, (key, val1, val2) => 
				{
					return ValueUtil.isEquals(
						val1,
						val2,
						(val1, val2) =>
						{
							return val1.x == val2.x;
						});
				}) == false);
			});
	}
}
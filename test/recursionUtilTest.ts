import { TestCase } from "@baoxia/utils.javascript.testutil";
import { RecursionUtil } from "../src/index.js";
import { ItemWithChildren } from "./model/ItemWithChildren.js";

export class RecursionUtilTest extends TestCase
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("RecursionUtil Test",
			(assert, assertFalse) =>
			{
				const testRootItem = new ItemWithChildren(
					1,
					"Item-Level-1",
					null,
					[
						new ItemWithChildren(
							11,
							"Item-Level-2",
							null,
							[
								new ItemWithChildren(
									111,
									"Item-Level-3",
									null),
								new ItemWithChildren(
									112,
									"Item-Level-3",
									null,
									[
										new ItemWithChildren(
											1121,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1122,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1123,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1124,
											"Item-Level-4",
											null),
									]),
								new ItemWithChildren(
									113,
									"Item-Level-3",
									null),
							]),
						new ItemWithChildren(
							12,
							"Item-Level-2",
							null,
							[
								new ItemWithChildren(
									121,
									"Item-Level-3",
									null),
								new ItemWithChildren(
									122,
									"Item-Level-3",
									null,
									[
										new ItemWithChildren(
											1221,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1222,
											"Item-Level-4",
											null)
									]),
								new ItemWithChildren(
									123,
									"Item-Level-3",
									null,
									[
										new ItemWithChildren(
											1231,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1232,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1233,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1234,
											"Item-Level-4",
											null),
										new ItemWithChildren(
											1235,
											"Item-Level-4",
											null,
											[
												new ItemWithChildren(
													12351,
													"Item-Level-5",
													null),
												new ItemWithChildren(
													12352,
													"Item-Level-5",
													null),
												new ItemWithChildren(
													12353,
													"Item-Level-5",
													null),
												new ItemWithChildren(
													12354,
													"Item-Level-5",
													null),
												new ItemWithChildren(
													12355,
													"Item-Level-5",
													null)
											])
									])
							])
					]);
				const testItemNumbersStringShouldBe
					= "1,11,111,112,1121,1122,1123,1124,113,12,121,122,1221,1222,123,1231,1232,1233,1234,1235,12351,12352,12353,12354,12355";

				let testItemNumbersString = "";
				RecursionUtil.enumerate(
					testRootItem,
					(item) =>
					{
						return item.children;
					},
					(parentItem, item) =>
					{
						// !!!
						if (testItemNumbersString.length > 0)
						{
							testItemNumbersString += ",";
						}
						testItemNumbersString += item.number.toString();
						// !!!
						return true;
					});
				////////////////////////////////////////////////
				// !!!
				assert(testItemNumbersString == testItemNumbersStringShouldBe);
				// !!!
				////////////////////////////////////////////////
			});
	}
}
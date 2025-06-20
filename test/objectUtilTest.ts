import { TestCase, ObjectUtil } from "../src/index.js";
import { TestParentClass } from "./model/testParentClass.js"
import { TestChildClassA } from "./model/testChildClassA.js"

export class ObjectUtilTest extends TestCase
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("ObjectUtil Test",
			(assert, assertFalse) =>
			{
				assert(ObjectUtil.isBoolean(undefined) == false);
				assert(ObjectUtil.isBoolean(null) == false);
				assert(ObjectUtil.isBoolean(true) == true);
				assert(ObjectUtil.isBoolean(false) == true);
				assert(ObjectUtil.isBoolean(0) == false);
				assert(ObjectUtil.isBoolean(123) == false);
				assert(ObjectUtil.isBoolean(123.456) == false);
				assert(ObjectUtil.isBoolean("abc") == false);
				assert(ObjectUtil.isBoolean(new Object()) == false);

				assert(ObjectUtil.isNumber(undefined) == false);
				assert(ObjectUtil.isNumber(null) == false);
				assert(ObjectUtil.isNumber(true) == false);
				assert(ObjectUtil.isNumber(false) == false);
				assert(ObjectUtil.isNumber(0) == true);
				assert(ObjectUtil.isNumber(123) == true);
				assert(ObjectUtil.isNumber(123.456) == true);
				assert(ObjectUtil.isNumber("abc") == false);
				assert(ObjectUtil.isNumber(new Object()) == false);

				assert(ObjectUtil.isString(undefined) == false);
				assert(ObjectUtil.isString(null) == false);
				assert(ObjectUtil.isString(true) == false);
				assert(ObjectUtil.isString(false) == false);
				assert(ObjectUtil.isString(0) == false);
				assert(ObjectUtil.isString(123) == false);
				assert(ObjectUtil.isString(123.456) == false);
				assert(ObjectUtil.isString('abc') == true);
				assert(ObjectUtil.isString("Abc") == true);
				assert(ObjectUtil.isString(new Object()) == false);



				let testObject = {
					// 0
					name: 'John',
					// 1
					age: 30,
					// 2
					address: {
						// 2
						city: 'San Francisco',
						// 3
						state: 'CA',
						// 4
						country: 'USA',
						// 5
						houseInfo:
						{
							// 5
							unit: 1,
							// 6
							floor: 2
						}
					},
					// 7
					flag: "red"
				};

				let allPropertiesCount = 0;
				ObjectUtil.enumerateAllPropertiesOf(
					testObject,
					(objectName,
						object,
						propertyName,
						propertyValue) =>
					{
						if ("name" == propertyName)
						{
							assert("John" == propertyValue);
						}
						else if ("country" == propertyName)
						{
							assert("USA" == propertyValue);
						}
						else if ("unit" == propertyName)
						{
							assert(1 == propertyValue);
						}
						allPropertiesCount++;
					});
				//
				assert(allPropertiesCount == 8);
				//


				let testParentObject = new TestParentClass(1, "2", "3", ["4", "5", "6"]);
				let testChildObjectA = new TestChildClassA();
				{
					ObjectUtil.setAllPropertiesFrom(
						testParentObject,
						testChildObjectA);
				}
				//
				assert(testChildObjectA.number == 1);
				assert(testChildObjectA.name == "2");
				assert(testChildObjectA.value == "3");
				assert(testChildObjectA.stringValues![0] == "4");
				assert(testChildObjectA.stringValues![1] == "5");
				assert(testChildObjectA.stringValues![2] == "6");
				assert(testChildObjectA.childNumberValue == 0);
				assert(testChildObjectA.childStringValue == null);
				//

				testParentObject = new TestParentClass(1, "2", "3", ["4", "5", "6"]);
				testChildObjectA = new TestChildClassA();
				{
					Object.assign(testChildObjectA, testParentObject);
				}
			});
	}
}
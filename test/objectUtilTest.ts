import { TestCase, ObjectUtil } from "../src/index.js";

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
            });
    }
}
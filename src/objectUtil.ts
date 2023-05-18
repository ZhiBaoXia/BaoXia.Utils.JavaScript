import { ObjectPropertyInfo } from "./model/objectPropertyInfo.js";

export class ObjectUtil
{
    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    /**
     * 判断指定的对象是否为“undefined”或“null”。
     * @param obj 指定的对象。
     * @returns 指定的对象是否为“undefined”或“null”时，返回：true，否则返回：false。 
     */
    static isUndefinedOrNull(obj: any | null): boolean
    {
        if (typeof (obj) == "undefined"
            || obj == null)
        {
            return true;
        }
        return false;
    }

    /**
     * 判断指定的对象是否不为“undefined”或“null”。
     * @param obj 指定的对象。
     * @returns 指定的对象是否不为“undefined”或“null”时，返回：true，否则返回：false。
     */
    static isNotUndefinedOrNull(obj: any | null): boolean
    {
        return ObjectUtil.isUndefinedOrNull(obj) == false;
    }

    /**
     * 判断指定的对象是否不为“undefined”或“null”。
     * @param obj 指定的对象。
     * @returns 指定的对象是否不为“undefined”或“null”时，返回：true，否则返回：false。
     */
    static isValid(obj: any | null): boolean
    {
        return ObjectUtil.isNotUndefinedOrNull(obj);
    }
    /**
 * 判断指定的对象是否为“undefined”或“null”。
 * @param obj 指定的对象。
 * @returns 指定的对象是否为“undefined”或“null”时，返回：true，否则返回：false。 
 */
    static isInvalid(obj: any | null): boolean
    {
        return ObjectUtil.isUndefinedOrNull(obj);
    }


    /**
     * 枚举指定对象中的所有属性，包括对象属性的属性。
     * @param objectItem 指定的对象。
     * @param toReceiveProperty 接收属性的回调函数。
        */
    static enumerateAllPropertiesOf(
        objectItem: any,
        toReceiveProperty: (
            propertyOwnerName: string | null,
            propertyOwner: any,
            propertyName: string,
            property: any) => void)
    {
        let objectPropertyInfoStack = new Array<ObjectPropertyInfo>()
        //
        objectPropertyInfoStack.push(new ObjectPropertyInfo(null, objectItem));
        //

        while (objectPropertyInfoStack.length > 0)
        {
            let objectPropertyInfo = objectPropertyInfoStack.shift();
            if (objectPropertyInfo === undefined)
            {
                continue;
            }

            let objectProperty = objectPropertyInfo.propertyValue;
            for (let propertyName in objectProperty)
            {
                if (objectProperty.hasOwnProperty(propertyName))
                {
                    let propertyValue = objectProperty[propertyName];
                    if (typeof propertyValue === 'object'
                        && propertyValue !== null)
                    {
                        objectPropertyInfoStack.push(
                            {
                                propertyName: propertyName,
                                propertyValue: propertyValue
                            });
                    }
                    else
                    {
                        toReceiveProperty(
                            objectPropertyInfo.propertyName,
                            objectProperty,
                            propertyName,
                            propertyValue);
                    }
                }
            }
        }
    }
}
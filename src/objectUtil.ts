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

	static isBoolean(object: unknown): boolean
	{
		if (object != null
			&& object != undefined
			&& typeof (object) === "boolean")
		{
			return true;
		}
		return false;
	}

	static isNumber(object: unknown): boolean
	{
		if (object != null
			&& object != undefined
			&& typeof (object) === "number")
		{
			return true;
		}
		return false;
	}

	static isString(object: unknown): boolean
	{
		if (object != null
			&& object != undefined
			&& typeof (object) === "string")
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
		objectPropertyInfoStack.push(new ObjectPropertyInfo(null, null, objectItem));
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
							new ObjectPropertyInfo(
								null,
								propertyName,
								propertyValue));
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

	/**
	 * 通过浅拷贝，克隆指定的对象。
	 * @param obj 指定的对象。
	 * @returns 返回克隆的对象。
	 */
	static cloneObject<ObjectType>(obj: ObjectType | null): ObjectType | null
	{
		if (obj == null)
		{
			return null;
		}

		let objectCloned = Object.assign({}, obj);
		{
		}
		return objectCloned;
	}

	static setAllPropertiesFrom
		<SoruceObjectType extends object,
			propertyKeyType extends keyof SoruceObjectType>
		(sourceObject: Pick<SoruceObjectType, propertyKeyType>,
			targetObject: SoruceObjectType,
			exceptionsBySetProperty: Array<any> | null = null)
		: SoruceObjectType
	{
		for (const key in sourceObject)
		{
			try
			{
				targetObject[key] = sourceObject[key];
			}
			catch (exception: any) 
			{
				// !!!
				exceptionsBySetProperty?.push(exception);
				// !!!
			}
		}
		return targetObject;
	}

	static isEqualsWithProperties(
		obj1: object,
		obj2: object,
		...excludedPropertyNames: Array<string>
	): boolean
	{
		// 检查两个对象是否引用同一个实例
		if (obj1 === obj2)
		{
			return true;
		}

		// 获取两个对象的所有自身可枚举属性（公开属性）
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		// 检查属性数量是否相同
		if (keys1.length !== keys2.length)
		{
			return false;
		}

		// 检查每个属性的值是否相等
		for (const key of keys1)
		{
			// 确保obj2也有这个属性
			if (!keys2.includes(key))
			{
				return false;
			}

			if (excludedPropertyNames.includes(key))
			{
				continue;
			}

			const value1 = (obj1 as any)[key];
			const value2 = (obj2 as any)[key];

			// 如果属性值是对象，则递归比较
			if (typeof value1 === 'object' && value1 !== null &&
				typeof value2 === 'object' && value2 !== null)
			{
				if (!ObjectUtil.isEqualsWithProperties(value1, value2, ...excludedPropertyNames))
				{
					return false;
				}
			}
			else
			{
				// 基本类型直接比较
				if (value1 !== value2)
				{
					return false;
				}
			}
		}
		return true;
	}
}

import { NumberRoundType } from "./constant/numberRoundType.js";

export class NumberUtil
{
	///////////////////////////////
	// @类方法
	///////////////////////////////

	/**
 * 判断给定的值是否为数字类型。
 * @param value 要判断的值，可以是任意类型。
 * @returns 如果值是数字类型返回 true，否则返回 false。
 */
	public static isNumber(value: any): boolean
	{
		return typeof value === 'number';
	}
	
	/**
     * 将字符串解析为整数。
     * @param value 要解析的字符串。
     * @returns 如果解析成功返回对应的整数，如果解析失败返回 0。
     */
	public static parseInt(value: string): number
	{
		const parsedValue = parseInt(value);
		return isNaN(parsedValue) ? 0 : parsedValue;
	}

	/**
     * 将字符串解析为浮点数。
     * @param value 要解析的字符串。
     * @returns 如果解析成功返回对应的浮点数，如果解析失败返回 0。
     */
	public static parseNumber(value: string): number 
	{
		const parsedValue = parseFloat(value);
		return isNaN(parsedValue)? 0 : parsedValue;
	}

	/**
	 * 在指定的数值范围内，生成一个随机整数。
	 * @param min 指定数值范围的最小值。
	 * @param max 指定数值范围的最大值。
	 * @returns 生成的随机整数。
	 */
	public static randomInt(min: number, max: number): number
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * 在指定的数值范围内，生成一个随机浮点数。
	 * @param min 指定数值范围的最小值。
	 * @param max 指定数值范围的最大值。
	 * @returns 生成的随机浮点数。
	 */
	public static randomFloat(min: number, max: number): number
	{
		return Math.random() * (max - min) + min;
	}

	/**
	 * 根据指定的小数精度（位数），对指定的数值进行取整。
	 * @param numberValue 指定的数值。
	 * @param floatPrecision 指定的小数精度（位数）。
	 * @param numberRoundType 指定的取整类型，默认为：NumberRoundType.Round，四舍五入。
	 * @returns 取整后的数值。
	 */
	public static numberByFixed(
		numberValue: number,
		floatPrecision: number,
		numberRoundType: NumberRoundType = NumberRoundType.Round): number
	{
		let pow = Math.pow(10, floatPrecision);

		switch (numberRoundType)
		{
			case NumberRoundType.Floor:
				{
					return Math.floor(numberValue * pow) / pow;
				}
			case NumberRoundType.Ceil:
				{
					return Math.ceil(numberValue * pow) / pow;
				}
			case NumberRoundType.Round:
			default:
				{
					return Math.round(numberValue * pow) / pow;
				}
		}
	}
}
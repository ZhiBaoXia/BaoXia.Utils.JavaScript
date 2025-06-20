import { TestParentClass } from './testParentClass.js'

export class TestChildClassA extends TestParentClass
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	childNumberValue: number;

	childStringValue: string | null;

	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor(
		number: number = 0,
		name: string | null = null,
		value: string | null = null,
		children: string[] | null = null,
		childNumberValue: number = 0,
		childStringValue: string | null = null)
	{
		super(
			number,
			name,
			value,
			children);

		this.childNumberValue = childNumberValue;
		this.childStringValue = childStringValue;
	}
}
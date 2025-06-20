
export class TestParentClass
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	number: number;

	name: string | null;

	value: string | null;

	stringValues: string[] | null;

	get isValid(): boolean
	{
		if (this.number != 0)
		{
			return true;
		}
		return false;
	}

	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor(
		number: number,
		name: string | null = null,
		value: string | null = null,
		children: string[] | null = null)
	{
		this.number = number;
		this.name = name;
		this.value = value;
		this.stringValues = children;
	}
}
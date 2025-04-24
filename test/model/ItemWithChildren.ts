
export class ItemWithChildren
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	number: number;

	name: string | null;

	value: string | null;

	children: ItemWithChildren[] | null;

	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor(
		number: number,
		name: string | null = null,
		value: string | null = null,
		children: ItemWithChildren[] | null = null)
	{
		this.number = number;
		this.name = name;
		this.value = value;
		this.children = children;
	}
}

/**
 * 字符串的区域信息。
 */
export class RecursionStep<ItemType>
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	// #region

	public prevRecursionStep: RecursionStep<ItemType> | null = null;
	public recursionDepthIndex: number = 0;
	public parentItem: ItemType | null = null;
	public items: ItemType[] = [];
	public currentItem: ItemType | null = null;
	public nextItemIndex: number = 0;

	// #endRegion


	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	// #region

	constructor()
	constructor(
		parentItem?: ItemType | null,
		steps?: ItemType[],
		nextStepIndex?: number)
	{
		if (parentItem !== undefined && steps !== undefined && nextStepIndex !== undefined)
		{
			this.parentItem = parentItem;
			this.items = steps;
			this.nextItemIndex = nextStepIndex;
		}
	}

	// #endRegion
}
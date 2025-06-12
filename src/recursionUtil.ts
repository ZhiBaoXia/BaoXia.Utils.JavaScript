import { RecursionStep } from "./model/recursionStep.js";

export class RecursionUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	static enumerateWithRecursionStepType
		<ItemType,
			RecursionStepType extends RecursionStep<ItemType>>(
				recursionStepType: new () => RecursionStepType,
				rootItem: ItemType | null,
				toGetChildItems: (item: ItemType, currentStep: RecursionStepType, stepsStack: RecursionStepType[]) => ItemType[] | null,
				toEnumerateItem: (parentItem: ItemType | null, item: ItemType, currentStep: RecursionStepType) => boolean,
				toCreateNextRecursionStepType: ((currentStep: RecursionStepType) => RecursionStepType) | null
			): void
	{
		if (!rootItem)
		{
			return;
		}

		const rootItems: ItemType[] = [rootItem];

		const recursionSteps: RecursionStepType[] = [];
		const initialStep = new recursionStepType();
		initialStep.prevRecursionStep = null;
		initialStep.recursionDepthIndex = 0;
		initialStep.parentItem = null;
		initialStep.items = rootItems;
		initialStep.nextItemIndex = 0;
		recursionSteps.push(initialStep);

		while (recursionSteps.length > 0)
		{
			const currentRecursionStep = recursionSteps[recursionSteps.length - 1];
			if (!currentRecursionStep)
			{
				recursionSteps.pop();
				continue;
			}

			const parentItem = currentRecursionStep.parentItem;
			const items = currentRecursionStep.items;
			let itemIndex = currentRecursionStep.nextItemIndex;
			const itemsCount = items.length;
			if (itemIndex < 0 || itemIndex >= itemsCount)
			{
				recursionSteps.pop();
				continue;
			}

			for (; itemIndex < itemsCount; itemIndex++)
			{
				const item = items[itemIndex];
				currentRecursionStep.currentItem = item;

				if (!toEnumerateItem(parentItem, item, currentRecursionStep))
				{
					return;
				}

				const childItems = toGetChildItems(item, currentRecursionStep, recursionSteps);
				if (!childItems || childItems.length < 1)
				{
					continue;
				}

				currentRecursionStep.nextItemIndex = itemIndex + 1;

				let nextRecursionStep: RecursionStepType;
				if (toCreateNextRecursionStepType)
				{
					nextRecursionStep = toCreateNextRecursionStepType(currentRecursionStep);
				} else
				{
					nextRecursionStep = new recursionStepType();
				}
				nextRecursionStep.prevRecursionStep = currentRecursionStep;
				nextRecursionStep.recursionDepthIndex = currentRecursionStep.recursionDepthIndex + 1;
				nextRecursionStep.parentItem = item;
				nextRecursionStep.items = childItems;
				nextRecursionStep.nextItemIndex = 0;
				recursionSteps.push(nextRecursionStep);
				break;
			}
			if (itemIndex >= itemsCount)
			{
				recursionSteps.pop();
			}
		}
	}


	static enumerate
		<ItemType>
		(rootItem: ItemType | null,
			toGetChildItems: (item: ItemType, currentStep: RecursionStep<ItemType>, stepsStack: RecursionStep<ItemType>[]) => ItemType[] | null,
			toEnumerateItem: (parentItem: ItemType | null, item: ItemType, currentStep: RecursionStep<ItemType>) => boolean)
		: void
	{
		RecursionUtil
			.enumerateWithRecursionStepType<ItemType, RecursionStep<ItemType>>(
				RecursionStep<ItemType>,
				rootItem,
				(currentItem, currentRecursionStep, stepsStack) =>
				{
					return toGetChildItems(currentItem, currentRecursionStep, stepsStack);
				},
				(parentItem, currentItem, currentRecursionStep) =>
				{
					return toEnumerateItem(parentItem, currentItem, currentRecursionStep);
				},
				null);
	}

	// #endRegion
}
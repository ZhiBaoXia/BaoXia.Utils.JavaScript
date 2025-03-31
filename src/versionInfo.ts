import { NumberUtil } from "./numberUtil.js";
import { StringUtil } from "./stringUtil.js";

export class VersionInfo
{
	////////////////////////////////////////////////
	// @静态常量
	////////////////////////////////////////////////

	// #region 静态常量

	static readonly VersionSectionSplitChar = '.';

	// #endregion


	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	// #region 自身属性

	protected _versionString: string = '';

	get versionString(): string
	{
		return this._versionString;
	}

	set versionString(value: string)
	{
		if (StringUtil.isEquals(this._versionString, value))
		{
			return;
		}

		this._versionString = value;
		this.versionSectionNumbers = this.DidCreateVersionSectionNumbersFromString(this._versionString);
	}


	protected _versionSectionNumbers: Array<Number> = [];

	get versionSectionNumbers(): Array<Number>
	{
		return this._versionSectionNumbers;
	}

	protected set versionSectionNumbers(value: Array<Number>)
	{
		this._versionSectionNumbers = value;
	}

	get versionSectionsCount(): number
	{
		return this._versionSectionNumbers.length;
	}

	// #endregion


	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region 类方法

	static isEquals(versionInfoA?: VersionInfo, versionInfoB?: VersionInfo): boolean
	{
		let isVersionInfoA_Null = versionInfoA ? false : true;
		let isVersionInfoB_Null = versionInfoB ? false : true;
		if (isVersionInfoA_Null
			&& isVersionInfoB_Null)
		{
			return true;
		}
		else if (isVersionInfoA_Null
			|| isVersionInfoB_Null)
		{
			return false;
		}
		return versionInfoA!.compareTo(versionInfoB) == 0;
	}

	static isNotEquals(versionInfoA?: VersionInfo, versionInfoB?: VersionInfo): boolean
	{
		let isVersionInfoA_Null = versionInfoA ? false : true;
		let isVersionInfoB_Null = versionInfoB ? false : true;
		if (isVersionInfoA_Null
			&& isVersionInfoB_Null)
		{
			return false;
		}
		else if (isVersionInfoA_Null
			|| isVersionInfoB_Null)
		{
			return true;
		}
		return versionInfoA!.compareTo(versionInfoB) != 0;
	}

	static isGreaterThan(versionInfoA?: VersionInfo, versionInfoB?: VersionInfo): boolean
	{
		let isVersionInfoA_Null = versionInfoA ? false : true;
		let isVersionInfoB_Null = versionInfoB ? false : true;
		if (isVersionInfoA_Null
			&& isVersionInfoB_Null)
		{
			return false;
		}
		else if (isVersionInfoA_Null)
		{
			return false;
		}
		return versionInfoA!.compareTo(versionInfoB) > 0;
	}


	static isLessThan(versionInfoA?: VersionInfo, versionInfoB?: VersionInfo): boolean
	{
		let isVersionInfoA_Null = versionInfoA ? false : true;
		let isVersionInfoB_Null = versionInfoB ? false : true;
		if (isVersionInfoA_Null
			&& isVersionInfoB_Null)
		{
			return false;
		}
		else if (isVersionInfoA_Null)
		{
			return true;
		}
		return versionInfoA!.compareTo(versionInfoB) < 0;
	}

	static isGreaterOrEquals(versionInfoA?: VersionInfo, versionInfoB?: VersionInfo): boolean
	{
		let isVersionInfoA_Null = versionInfoA ? false : true;
		let isVersionInfoB_Null = versionInfoB ? false : true;
		if (isVersionInfoA_Null
			&& isVersionInfoB_Null)
		{
			return true;
		}
		else if (isVersionInfoA_Null)
		{
			return false;
		}
		return versionInfoA!.compareTo(versionInfoB) >= 0;
	}

	static isLessOrEquals(versionInfoA?: VersionInfo, versionInfoB?: VersionInfo): boolean
	{
		let isVersionInfoA_Null = versionInfoA ? false : true;
		let isVersionInfoB_Null = versionInfoB ? false : true;
		if (isVersionInfoA_Null
			&& isVersionInfoB_Null)
		{
			return true;
		}
		else if (isVersionInfoA_Null)
		{
			return true;
		}
		return versionInfoA!.compareTo(versionInfoB) <= 0;
	}

	// #endregion


	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	// #region 自身实现

	constructor(versionString: string = '')
	{
		this.versionString = versionString;
	}


	compareTo(anotherVersionInfo?: VersionInfo): number
	{
		if (anotherVersionInfo == null)
		{
			return 1;
		}

		let versionSectionsCount = this.versionSectionsCount;
		let anotherVersionSectionsCount = anotherVersionInfo.versionSectionsCount;
		if (versionSectionsCount > anotherVersionSectionsCount)
		{
			return 1;
		}
		else if (versionSectionsCount < anotherVersionSectionsCount)
		{
			return -1;
		}

		for (let versionSectionIndex = 0;
			versionSectionIndex < versionSectionsCount;
			versionSectionIndex++)
		{
			let versionSectionNumber = this._versionSectionNumbers[versionSectionIndex];
			let anotherVersionSectionNumber = anotherVersionInfo._versionSectionNumbers[versionSectionIndex];
			if (versionSectionNumber > anotherVersionSectionNumber)
			{
				return 1;
			}
			if (versionSectionNumber < anotherVersionSectionNumber)
			{
				return -1;
			}
		}
		return 0;
	}

	isGreaterThan(anotherVersionInfo?: VersionInfo)
	{
		return VersionInfo.isGreaterThan(this, anotherVersionInfo);
	}

	isGreaterOrEquals(anotherVersionInfo?: VersionInfo)
	{
		return VersionInfo.isGreaterOrEquals(this, anotherVersionInfo);
	}

	isEquals(anotherVersionInfo?: VersionInfo)
	{
		return VersionInfo.isEquals(this, anotherVersionInfo);
	}

	isLessThan(anotherVersionInfo?: VersionInfo)
	{
		return VersionInfo.isLessThan(this, anotherVersionInfo);
	}

	isLessOrEquals(anotherVersionInfo?: VersionInfo)
	{
		return VersionInfo.isLessOrEquals(this, anotherVersionInfo);
	}

	// #endregion


	////////////////////////////////////////////////
	// @事件节点
	////////////////////////////////////////////////

	// #region 事件节点

	protected DidCreateVersionSectionNumbersFromString(versionString?: string): Array<Number>
	{
		if (StringUtil.isEmpty(versionString))
		{
			return [];
		}

		let versionSectionStrings = versionString!.split(VersionInfo.VersionSectionSplitChar);
		if (versionSectionStrings.length < 1)
		{
			return [];
		}

		let versionSectionNumbers = new Array<Number>(versionSectionStrings.length);
		for (let i = 0; i < versionSectionStrings.length; i++)
		{
			let versionSectionNumberString = versionSectionStrings[i];
			let versionSectionNumber = NumberUtil.parseInt(versionSectionNumberString);
			// !!!
			versionSectionNumbers[i] = versionSectionNumber;
			// !!!
		}
		return versionSectionNumbers;
	}

	// #endregion
}
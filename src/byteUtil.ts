

export class ByteUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	static bytesFromBase64(stringInBase64: string)
		: number[] 
	{
		return atob(stringInBase64).split('').map(c => c.charCodeAt(0));
	}

	static base64FromBytes(bytes: number[])
		: string 
	{
		return btoa(String.fromCharCode.apply(null, bytes));
	}

	// #endRegion
}
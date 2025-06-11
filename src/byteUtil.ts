

export class ByteUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	static atob(stringInBase64: string): string
	{
		if (typeof atob != 'undefined')
		{
			return atob(stringInBase64);
		}
		if (typeof window !== 'undefined' && window.atob)
		{
			return window.atob(stringInBase64);
		}

		const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		let output = '';
		let charIndex = 0;

		// 处理每4个Base64字符
		while (charIndex < stringInBase64.length)
		{
			// 获取4个Base64字符
			const c1 = stringInBase64.charAt(charIndex++);
			const c2 = stringInBase64.charAt(charIndex++);
			const c3 = stringInBase64.charAt(charIndex++);
			const c4 = stringInBase64.charAt(charIndex++);

			// 查找字符在Base64表中的索引
			const e1 = base64Chars.indexOf(c1);
			const e2 = base64Chars.indexOf(c2);
			const e3 = base64Chars.indexOf(c3);
			const e4 = base64Chars.indexOf(c4);

			// 验证输入有效性
			if (e1 === -1 || e2 === -1)
			{
				throw new Error(`指定字符串中存在无效的Base64字符。`);
			}

			// 计算解码后的字节
			let decoded = (e1 << 18) | (e2 << 12);

			// 根据是否为填充字符处理剩余字节
			if (c3 !== '=')
			{
				if (e3 === -1) 
				{
					throw new Error(`指定字符串中存在无效的Base64字符。`);
				}
				decoded |= (e3 << 6);

				if (c4 !== '=')
				{
					if (e4 === -1) 
					{
						throw new Error(`指定字符串中存在无效的Base64字符。`);
					}
					decoded |= e4;

					// 4个Base64字符 -> 3个普通字符
					output += String.fromCharCode((decoded >> 16) & 0xFF);
					output += String.fromCharCode((decoded >> 8) & 0xFF);
					output += String.fromCharCode(decoded & 0xFF);
				} else
				{
					// 3个Base64字符 + 1个填充 -> 2个普通字符
					output += String.fromCharCode((decoded >> 16) & 0xFF);
					output += String.fromCharCode((decoded >> 8) & 0xFF);
				}
			} else
			{
				// 2个Base64字符 + 2个填充 -> 1个普通字符
				output += String.fromCharCode((decoded >> 16) & 0xFF);
			}
		}

		return output;

	}

	static btoa(byteString: string): string
	{
		if (typeof btoa != 'undefined')
		{
			return btoa(byteString);
		}
		if (typeof window !== 'undefined' && window.btoa)
		{
			return window.btoa(byteString);
		}

		const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		let output = '';
		let charIndex = 0;

		// 遍历字符串的每个字符
		while (charIndex < byteString.length)
		{
			// 获取三个8位字节
			const char1 = byteString.charCodeAt(charIndex++);
			const char2 = byteString.charCodeAt(charIndex++);
			const char3 = byteString.charCodeAt(charIndex++);

			// 处理非Latin1字符
			if (char1 > 255 || char2 > 255 || char3 > 255)
			{
				throw new Error(`要编码的字符串包含无效的字节信息。`);
			}

			// 转换为四个6位字节
			const enc1 = char1 >> 2;
			const enc2 = ((char1 & 3) << 4) | (char2 >> 4);
			const enc3 = ((char2 & 15) << 2) | (char3 >> 6);
			const enc4 = char3 & 63;

			// 处理填充
			if (isNaN(char2))
			{
				output += base64Chars.charAt(enc1) + base64Chars.charAt(enc2) + '==';
			}
			else if (isNaN(char3))
			{
				output += base64Chars.charAt(enc1) + base64Chars.charAt(enc2) + base64Chars.charAt(enc3) + '=';
			}
			else
			{
				output += base64Chars.charAt(enc1) + base64Chars.charAt(enc2) + base64Chars.charAt(enc3) + base64Chars.charAt(enc4);
			}
		}
		return output;
	}

	static bytesFromBase64(stringInBase64: string)
		: number[]
	{
		return ByteUtil.atob(stringInBase64).split('').map(c => c.charCodeAt(0));
	}

	static base64FromBytes(bytes: number[])
		: string
	{
		return btoa(String.fromCharCode.apply(null, bytes));
	}

	// #endRegion
}
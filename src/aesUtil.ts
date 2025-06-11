import aesJs from "aes-js";
import { ByteUtil } from "./index.js";

export class AesUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	protected static bytesFromBase64(stringInBase64: string)
		: Uint8Array 
	{
		return new Uint8Array(ByteUtil.atob(stringInBase64).split('').map(c => c.charCodeAt(0)));
	}

	protected static base64FromBytes(bytes: Uint8Array)
		: string 
	{
		return ByteUtil.btoa(String.fromCharCode.apply(null, bytes as unknown as number[]));
	}

	protected static normalizeKeyBytes(keyBytes: Uint8Array): Uint8Array
	{
		// AES 密钥必须为 16/24/32 字节（AES-128/192/256）
		var keyBytesLength = keyBytes.length;
		if (keyBytesLength < 16)
		{
			// 截取 keyBytes 的前16个字节，赋值给 keyBytesNormalized
			var keyBytesNormalized = new Uint8Array(16);
			{
				keyBytesNormalized.set(keyBytes);
			}
			return keyBytesNormalized;
		}
		else if (keyBytesLength == 16)
		{
			return keyBytes;
		}
		else if (keyBytesLength < 24)
		{
			keyBytesNormalized = new Uint8Array(24);
			{
				keyBytesNormalized.set(keyBytes);
			}
			return keyBytesNormalized;
		}
		else if (keyBytesLength == 24)
		{
			return keyBytes;
		}
		else if (keyBytesLength < 32)
		{
			keyBytesNormalized = new Uint8Array(32);
			{
				keyBytesNormalized.set(keyBytes);
			}
			return keyBytesNormalized;
		}
		else if (keyBytesLength == 32)
		{
			return keyBytes;
		}
		keyBytesNormalized = new Uint8Array(32);
		{
			keyBytesNormalized.set(keyBytes.subarray(0, 32));
		}
		return keyBytesNormalized;
	}



	// 加密函数
	static encryptWithCtr(
		plaintext: string,
		keyString: string,
		nonceInBase64: string)
	{
		const plaintextUtf8Bytes = aesJs.utils.utf8.toBytes(plaintext);
		const keyOriginalBytes = aesJs.utils.utf8.toBytes(keyString);
		// 参数校验
		// 确保密钥长度合法
		const keyBytes = this.normalizeKeyBytes(keyOriginalBytes);
		const nonceBytes = AesUtil.bytesFromBase64(nonceInBase64);

		const counter = new aesJs.Counter(nonceBytes);
		const aesCtr = new aesJs.ModeOfOperation.ctr(keyBytes, counter);

		// !!!
		const encryptedBytes = aesCtr.encrypt(plaintextUtf8Bytes);
		// !!!

		return AesUtil.base64FromBytes(encryptedBytes);
	}

	static decryptWithCtr(
		ciphertextInBase64: string,
		keyString: string,
		nonceInBase64: string)
	{
		const ciphertextBytes = AesUtil.bytesFromBase64(ciphertextInBase64);
		const keyOriginalBytes = aesJs.utils.utf8.toBytes(keyString);
		// 参数校验
		// 确保密钥长度合法
		const keyBytes = this.normalizeKeyBytes(keyOriginalBytes);
		const nonceBytes = AesUtil.bytesFromBase64(nonceInBase64);

		const counter = new aesJs.Counter(nonceBytes);
		const aesCtr = new aesJs.ModeOfOperation.ctr(keyBytes, counter);

		// !!!
		const plaintextBytes = aesCtr.decrypt(ciphertextBytes);
		// !!!

		return aesJs.utils.utf8.fromBytes(plaintextBytes);
	}

	// #endRegion
}
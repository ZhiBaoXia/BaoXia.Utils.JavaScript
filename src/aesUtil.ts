import aesJs from "aes-js";

export class AesUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region


	protected static bytesFromBase64(stringInBase64: string)
		: Uint8Array 
	{
		return new Uint8Array(atob(stringInBase64).split('').map(c => c.charCodeAt(0)));
	}

	static base64FromBytes(bytes: Uint8Array)
		: string 
	{
		return btoa(String.fromCharCode.apply(null, bytes as unknown as number[]));
	}

	// 加密函数
	static encryptWithCtr(
		plaintext: string,
		keyString: string,
		nonceInBase64: string)
	{
		const plaintextUtf8Bytes = aesJs.utils.utf8.toBytes(plaintext);
		const keyUtf8Bytes = aesJs.utils.utf8.toBytes(keyString);
		const nonceBytes = AesUtil.bytesFromBase64(nonceInBase64);

		const counter = new aesJs.Counter(nonceBytes);
		const aesCtr = new aesJs.ModeOfOperation.ctr(keyUtf8Bytes, counter);

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
		let keyBytes = aesJs.utils.utf8.toBytes(keyString);
		keyBytes = keyBytes.slice(0, 32);
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
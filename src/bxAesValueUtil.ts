import { StringUtil } from "./stringUtil.js";
import { BxAesValueEncryptionMethodNames } from "./constant/bxAesValueEncryptionMethodNames.js";
import { BxAesValueEncryptionParamNames } from "./constant/bxAesValueEncryptionParamNames.js";
import { UriUtil } from "./uriUtil.js";
import { AesUtil } from "./aesUtil.js";

export class BxAesValueUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	static decryptBxAesValue(
		bxAesValue: string | null | undefined,
		aesKey: string | null | undefined)
		: string | null
	{
		if (!bxAesValue)
		{
			return null;
		}
		if (bxAesValue.length < 1)
		{
			return null;
		}
		if (!StringUtil.isBeginWithKeywordIn(
			bxAesValue,
			BxAesValueEncryptionMethodNames.Aes_Ctr + ":"))
		{
			return null;
		}
		if (!aesKey
			|| aesKey.length < 1)
		{
			return null;
		}

		let bxAesValueUri = UriUtil.parseUri(bxAesValue);
		if (!bxAesValueUri)
		{
			return null;
		}

		const ciphertext
			= bxAesValueUri
				.queryParameters
				?.get(BxAesValueEncryptionParamNames.Ciphertext);
		if (!ciphertext
			|| ciphertext.length < 1)
		{
			return null;
		}
		const nonce
			= bxAesValueUri
				.queryParameters
				?.get(BxAesValueEncryptionParamNames.Nonce);
		if (!nonce
			|| nonce.length < 1)
		{
			return null;
		}

		const plaintext
			= AesUtil.decryptWithCtr(
				ciphertext,
				aesKey,
				nonce);
		{ }
		return plaintext;
	}

	// #endRegion
}
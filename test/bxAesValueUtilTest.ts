import { TestCase, AesUtil, BxAesValueUtil } from "../src/index.js";

export class BxAesValueUtilTest extends TestCase
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("BxAesValueUtil Test",
			(assert, assertFalse) =>
			{
				////////////////////////////////////////////////
				// 解密服务端响应测试：
				////////////////////////////////////////////////
				const Bx_Aes_Key = "F11144532E6F45F5A3D66D97B61E652F67116502E17547C0AB6B8C8ADE0155F2";
				const Bx_Aes_Value = "aes-ctr:/?ciphertext=muEbzMEZjXWegz0%3D\u0026nonce=HmSIQEutyQKg2jcXN5oxog%3D%3D";

				const plaintextByDecrypted = BxAesValueUtil.decryptBxAesValue(
					Bx_Aes_Value,
					Bx_Aes_Key);

				assert("16645670001" == plaintextByDecrypted);
			});
	}
}
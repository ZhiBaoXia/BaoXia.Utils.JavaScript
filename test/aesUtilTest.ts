import { TestCase, AesUtil } from "../src/index.js";

export class AesUtilTest extends TestCase
{
	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor()
	{
		super("AesUtil Test",
			(assert, assertFalse) =>
			{
				////////////////////////////////////////////////
				// 本地加密&解密测试：
				////////////////////////////////////////////////
				// {
				// 	const TestParams_Key = "4341F7D1FD8F4D8B88873D1CD7E387B1";
				// 	const TestParams_Plaintext = 'Hello World！';
				// 	const TestParams_Nonce = "ELMqoE+WfRbD4bRzWn8UVw==";
				// 	const TestParams_Ciphertext = "p5G1yOLg+1JjudFocUg=";

				// 	const ciphertext = AesUtil.encryptWithCtr(TestParams_Plaintext, TestParams_Key, TestParams_Nonce);
				// 	// !!!
				// 	assert(TestParams_Ciphertext == ciphertext);
				// 	// !!!

				// 	const plaintext = AesUtil.decryptWithCtr(ciphertext, TestParams_Key, TestParams_Nonce);
				// 	// !!!
				// 	assert(TestParams_Plaintext == plaintext);
				// 	// !!!
				// }


				////////////////////////////////////////////////
				// 解密服务端响应测试：
				////////////////////////////////////////////////
				{
					const TestParams_Key = "F11144532E6F45F5A3D66D97B61E652F67116502E17547C0AB6B8C8ADE0155F2";
					const TestParams_Ciphertext = "L1vRH7Ay0EJyNx8=";
					const TestParams_Nonce = "ZUht7UQHEQYAlZqPN5oxlg==";

					const plaintextByDecrypted = AesUtil.decryptWithCtr(TestParams_Ciphertext, TestParams_Key, TestParams_Nonce);

					assert(plaintextByDecrypted.length > 0);
				}
			});
	}
}
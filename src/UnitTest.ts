
////////////////////////////////////////////////
// TestCase
////////////////////////////////////////////////
export class TestCase
{
    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    static assertTrue(isTure: boolean): any
    {
        if (isTure != true)
        {
            throw "验证失败"
        }
    }

    static assertFalse(isFalse: boolean): any
    {
        this.assertTrue(!isFalse)
    }

    static assert(isTure: boolean): any
    {
        this.assertTrue(isTure)
    }


    ////////////////////////////////////////////////
    // @私有方法
    ////////////////////////////////////////////////

    constructor(name: string,
        runable: (
            assert: (isTure: boolean) => any,
            assertFalse: (isTure: boolean) => any)
            => any)
    {
        try
        {
            console.error("用例“" + name + "”，开始测试：");
            {
                // !!!
                runable(TestCase.assert, TestCase.assertFalse);
                // !!!
            }
            console.error("✔\t用例“" + name + "”，测试成功。");
        }
        catch (exception)
        {
            console.error("\t❌\t用例“" + name + "”，测试失败，错误信息：\r\n" + exception);
        }
    }
}
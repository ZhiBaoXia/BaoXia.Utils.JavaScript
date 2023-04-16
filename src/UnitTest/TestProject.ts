import { TestCase } from "./TestCase.js";

export class TestProject
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    name: string;
    testCases: TestCase[];


    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        name: string,
        testCases: TestCase[])
    {
        this.name = name;
        this.testCases = testCases;
    }

    test()
    {
        try
        {
            let testCases = this.testCases;
            let testCasesCount = testCases.length;
            console.log("测试开始，共 " + testCasesCount + " 个用例待进行。");

            let testCasesCountWithTestSuccess = 0;
            let testCasesCountWithTestFailed = 0;

            for (let testCaseIndex = 0;
                testCaseIndex < testCasesCount;
                testCaseIndex++)
            {
                let testCase = testCases[testCaseIndex];
                let testCaseNumber = testCaseIndex + 1;
                let testProgressCaption = testCaseNumber + "/" + testCasesCount;
                console.log("\r\n第 " + testProgressCaption + " 个用例，测试开始...");
                {
                    if (testCase.test())
                    {
                        testCasesCountWithTestSuccess++;
                    }
                    else
                    {
                        testCasesCountWithTestFailed++;
                    }
                }
                console.log("第 " + testProgressCaption + " 个用例，测试结束。\r\n");
            }
            if (testCasesCountWithTestFailed > 0)
            {
                console.log("💣测试未通过，共 " + testCasesCountWithTestFailed + "/" + testCasesCount + " 个用例，未通过测试。");
            }
            else
            {
                console.log("🎉测试完成，共 " + testCasesCount + " 个用例，全部通过测试！");
            }
        }
        catch (exception)
        {
            console.error("测试失败，程序异常：\r\n" + exception);
        }
    }
}
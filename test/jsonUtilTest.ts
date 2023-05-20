import { TestCase, PathUtil, DateTime, StringUtil } from "../src/index.js";
import { JsonUtilTestModel } from "./model/jsonUtilTestModel.js"
import { JsonUtil } from "../src/index.js";

export class JsonUtilTest extends TestCase
{
    constructor()
    {
        super("JsonUtil Test",
            (assert, assertFalse) =>
            {
                // 序列化测试
                let testObjectA = new JsonUtilTestModel(
                    "testObjectA",
                    "testValueA",
                    new DateTime());
                let testObjectAJson = JsonUtil.stringify(testObjectA);
                {
                    assert(StringUtil.isContainsKeywordIn(
                        testObjectAJson,
                        testObjectA.createTime!.toISOString()));
                }

                let testObjectB = JsonUtil.parse<JsonUtilTestModel>(testObjectAJson);
                {
                    assert(testObjectB != null);

                    testObjectB = testObjectB!;

                    assert(testObjectB.name! == testObjectA.name);
                    assert(testObjectB.value! == testObjectA.value);

                    assert(testObjectB.createTime!.isEquals(testObjectA.createTime!));
                }

                let testObjectBWithJSON = JSON.parse(testObjectAJson!);
                let testObjectBWithJsonUtilConvert
                    = JsonUtil.parseOrConvertValue<JsonUtilTestModel>(testObjectBWithJSON);
                {
                    assert(testObjectBWithJsonUtilConvert != null);
                    //
                    testObjectBWithJsonUtilConvert = testObjectBWithJsonUtilConvert!;
                    //
                    assert(testObjectBWithJsonUtilConvert.createTime instanceof DateTime);
                    assert(testObjectBWithJsonUtilConvert.createTime!.isEquals(testObjectA.createTime!));
                }
            });
    }
}
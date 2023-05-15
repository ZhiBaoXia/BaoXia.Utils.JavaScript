import { DateTime } from "../../src/index.js";

export class JsonUtilTestModel
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    name: string | null;
    value: string | null;

    createTime: DateTime | null;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        name: string | null = null,
        value: string | null = null,
        createTime: DateTime | null = null)
    {
        this.name = name;
        this.value = value;

        this.createTime = createTime;
    }
}
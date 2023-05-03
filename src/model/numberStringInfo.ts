import { StringUtil } from "../stringUtil.js";

export class NumberStringInfo
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    dotCharIndex: number;
    
    integerString: string;

    floatString: string;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        dotCharIndex: number = -1,
        integerString: string = StringUtil.Empty, 
        floatString: string = StringUtil.Empty)
    {
        this.dotCharIndex = dotCharIndex;
        this.integerString = integerString;
        this.floatString = floatString;
    }
}
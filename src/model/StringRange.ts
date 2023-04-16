
/**
 * 字符串的区域信息。
 */
export class StringRange
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    /**
     * 开始的字符索引值。
     */
    beginCharIndex:number

    /**
     * 结束的字符索引值。
     */
    get endCharIndex():number {
        return this.beginCharIndex + this.charsCount;
    }

    /**
     * 结束的字符索引值。
     */
    set endCharIndex(endCharIndex:number) {
        this.charsCount = endCharIndex - this.beginCharIndex;
    }

    /**
     * 字符区域的长度。
     */
    charsCount:number


    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        beginCharIndex:number = -1,
        charsCount:number = 0)
    {
        this.beginCharIndex = beginCharIndex;
        this.charsCount = charsCount;
    }
}
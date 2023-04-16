/**
 * 字符串的区域信息。
 */
export class StringRange {
    /**
     * 结束的字符索引值。
     */
    get endCharIndex() {
        return this.beginCharIndex + this.charsCount;
    }
    /**
     * 结束的字符索引值。
     */
    set endCharIndex(endCharIndex) {
        this.charsCount = endCharIndex - this.beginCharIndex;
    }
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////
    constructor(beginCharIndex = -1, charsCount = 0) {
        this.beginCharIndex = beginCharIndex;
        this.charsCount = charsCount;
    }
}

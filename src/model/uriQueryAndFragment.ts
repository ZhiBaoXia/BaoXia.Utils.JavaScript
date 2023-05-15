
import { StringUtil } from "../stringUtil.js"
import { UriPathDelimiter } from "../constant/uriPathDelimiter.js";
/**
 * Uri查询参数和锚点部分。
 */
export class UriQueryAndFragment
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    query: string = StringUtil.Empty;

    queryBeginCharIndex: number = -1;

    fragment: string = StringUtil.Empty;

    fragmentBeginCharIndex: number = -1;

    isIncludeDelimiter: boolean = true;

    get beginCharIndex(): number
    {
        let beginCharIndex = -1;
        if (this.queryBeginCharIndex >= 0
            && (this.fragmentBeginCharIndex < 0
                || this.fragmentBeginCharIndex >= this.queryBeginCharIndex))
        {
            beginCharIndex
                = this.queryBeginCharIndex
                + (this.isIncludeDelimiter
                    ? 0
                    : UriPathDelimiter.PathToQuery.length);
        }
        else if (this.fragmentBeginCharIndex >= 0
            && (this.queryBeginCharIndex < 0
                || this.queryBeginCharIndex >= this.queryBeginCharIndex))
        {
            beginCharIndex
                = this.fragmentBeginCharIndex
                + (this.isIncludeDelimiter
                    ? 0
                    : UriPathDelimiter.QueryParamToFragment.length);
        }
        return beginCharIndex;
    }

    length: number;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        query: string = StringUtil.Empty,
        queryBeginCharIndex: number = -1,
        fragment: string = StringUtil.Empty,
        fragmentBeginCharIndex: number = -1,
        isIncludeDelimiter: boolean = true,
        length:number = 0)
    {
        this.query = query;
        this.queryBeginCharIndex = queryBeginCharIndex;
        this.fragment = fragment;
        this.fragmentBeginCharIndex = fragmentBeginCharIndex;
        this.isIncludeDelimiter = isIncludeDelimiter;
        this.length = length;
    }
}
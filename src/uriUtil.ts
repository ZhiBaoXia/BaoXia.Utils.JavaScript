
import { Uri } from "./model/uri.js";
import { StringUtil } from "./stringUtil.js";
import { UriQueryAndFragment } from "./model/uriQueryAndFragment.js";

export class UriUtil
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////


    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    /**
     * 解析Uri字符串。
     * @param uriString 指定的Uri字符串。
     * @returns uri 解析成功时，返回Uri对象，否则返回：null。
     */
    static parseUri(uriString: string): Uri | null
    {
        let uri = new Uri(uriString);
        if (uri.isValid)
        {
            return uri;
        }
        return null;
    }

    /**
     * 获取指定Uri字符串中的查询参数和锚点部分。
     * @param uriString 指定的Uri字符串。
     * @param isIncludeDelimiter 返回的查询参数和锚点部分是否包含与路径的分隔符。
     * @returns 指定Uri字符串中的查询参数和锚点部分。
     */
    static getUriQueryAndFragmentFrom(
        uriString: string | null,
        isIncludeDelimiter: boolean = true): UriQueryAndFragment | null
    {
        if (StringUtil.isEmpty(uriString))
        {
            return null;
        }

        uriString = uriString!;

        let uriQuery: string = StringUtil.Empty;
        let uriQueryBeginCharIndex: number = -1;
        let uriFragment: string = StringUtil.Empty;
        let uriFragmentBeginCharIndex: number = -1;

        let uriPathQueryDelimiterIndex = uriString.indexOf(Uri.PathQueryDelimiter);
        let uriQueryFragmentDelimiterIndex = uriString.indexOf(Uri.QueryFragmentDelimiter);
        if (uriPathQueryDelimiterIndex >= 0
            && uriQueryFragmentDelimiterIndex >= 0)
        {
            if (uriPathQueryDelimiterIndex < uriQueryFragmentDelimiterIndex)
            {
                uriQueryBeginCharIndex
                    = isIncludeDelimiter
                        ? uriPathQueryDelimiterIndex
                        : (uriPathQueryDelimiterIndex + Uri.PathQueryDelimiter.length)
                uriQuery
                    = uriString.substring(
                        uriQueryBeginCharIndex,
                        uriQueryFragmentDelimiterIndex);
                uriFragmentBeginCharIndex
                    = isIncludeDelimiter
                        ? uriQueryFragmentDelimiterIndex
                        : (uriQueryFragmentDelimiterIndex + Uri.QueryFragmentDelimiter.length)
                uriFragment
                    = uriString.substring(
                        uriFragmentBeginCharIndex);
            }
            else
            {
                uriQueryBeginCharIndex
                    = isIncludeDelimiter
                        ? uriQueryFragmentDelimiterIndex
                        : (uriQueryFragmentDelimiterIndex + Uri.QueryFragmentDelimiter.length)
                uriQuery
                    = uriString.substring(
                        uriQueryBeginCharIndex);

                uriFragmentBeginCharIndex
                    = isIncludeDelimiter
                        ? uriPathQueryDelimiterIndex
                        : (uriPathQueryDelimiterIndex + Uri.PathQueryDelimiter.length)
                uriFragment
                    = uriString.substring(
                        uriFragmentBeginCharIndex,
                        uriPathQueryDelimiterIndex);
            }
        }
        else if (uriPathQueryDelimiterIndex >= 0)
        {
            uriQueryBeginCharIndex
                = isIncludeDelimiter
                    ? uriPathQueryDelimiterIndex
                    : (uriPathQueryDelimiterIndex + Uri.PathQueryDelimiter.length)
            uriQuery
                = uriString.substring(
                    uriQueryBeginCharIndex);
        }
        else if (uriQueryFragmentDelimiterIndex >= 0)
        {
            uriFragmentBeginCharIndex
                = isIncludeDelimiter
                    ? uriQueryFragmentDelimiterIndex
                    : (uriQueryFragmentDelimiterIndex + Uri.QueryFragmentDelimiter.length)
            uriFragment
                = uriString.substring(
                    uriFragmentBeginCharIndex);
        }
        else
        {
            return null;
        }

        var uriQueryAndFragment = new UriQueryAndFragment(
            uriQuery,
            uriQueryBeginCharIndex,
            uriFragment,
            uriFragmentBeginCharIndex,
            isIncludeDelimiter,
            uriString.length - uriQueryBeginCharIndex);
        { }
        return uriQueryAndFragment;
    }

    /**
     * 将指定的路径追加到指定的Uri字符串中。
     * @param uriString 指定的Uri字符串。
     * @param pathNeedAppend 要追加的路径。
     * @returns 返回追加后的Uri字符串。
     */
    static appendPathToUri(
        uriString: string | null,
        pathNeedAppend: string | null): string
    {
        if (StringUtil.isEmpty(uriString))
        {
            return StringUtil.emptyOr(pathNeedAppend);
        }
        if (StringUtil.isEmpty(pathNeedAppend))
        {
            return StringUtil.emptyOr(uriString);
        }

        uriString = uriString!;
        pathNeedAppend = pathNeedAppend!;

        let uriQueryAndFragment
            = this.getUriQueryAndFragmentFrom(uriString);
        if (uriQueryAndFragment != null)
        {
            uriString = uriString.substring(
                0,
                uriString.length - uriQueryAndFragment.length);
        }

        let uriQueryAndFragmentInPathNeedAppend
            = this.getUriQueryAndFragmentFrom(pathNeedAppend);
        if (uriQueryAndFragmentInPathNeedAppend != null)
        {
            pathNeedAppend = pathNeedAppend.substring(
                0,
                pathNeedAppend.length - uriQueryAndFragmentInPathNeedAppend.length);
        }

        // 拼接路径：
        uriString = StringUtil.joinStringsWithDelimiter(
            Uri.HostPathDelimiter,
            true,
            uriString,
            pathNeedAppend);

        let queryInUrString
            = uriQueryAndFragment?.query;
        let isUriQueryNotEmpty
            = StringUtil.isNotEmpty(queryInUrString);
        let queryInPathNeedAppend
            = uriQueryAndFragmentInPathNeedAppend?.query;
        let isUriQueryInPathNeedAppendNotEmpty
            = StringUtil.isNotEmpty(queryInPathNeedAppend);
        if (isUriQueryNotEmpty
            && isUriQueryInPathNeedAppendNotEmpty)
        {
            queryInPathNeedAppend
                = StringUtil.trimLeftKeywordIn(
                    queryInPathNeedAppend!,
                    Uri.PathQueryDelimiter);
            queryInUrString
                = StringUtil.joinStringsWithDelimiter(
                    Uri.QueryParamsDelimiter,
                    true,
                    queryInUrString!,
                    queryInPathNeedAppend);
        }
        else if (isUriQueryInPathNeedAppendNotEmpty)
        {
            queryInUrString = queryInPathNeedAppend!;
            isUriQueryNotEmpty = true;
        }

        if (isUriQueryNotEmpty)
        {
            // 拼接路径和查询参数：
            uriString
                = StringUtil.joinStringsWithDelimiter(
                    Uri.PathQueryDelimiter,
                    true,
                    uriString,
                    queryInUrString!);
        }

        let uriFragment = uriQueryAndFragment?.fragment;
        let isUriFragmentNotEmpty
            = StringUtil.isNotEmpty(uriFragment);
        let isUriFragmentInPathNeedAppendNotEmpty
            = StringUtil.isNotEmpty(uriQueryAndFragmentInPathNeedAppend?.fragment);
        if (isUriFragmentNotEmpty
            && isUriFragmentInPathNeedAppendNotEmpty)
        {
            var uriFragmentInPathNeedAppend
                = StringUtil.trimLeftKeywordIn(
                    uriQueryAndFragmentInPathNeedAppend!.fragment,
                    Uri.QueryFragmentDelimiter);
            uriFragment
                = StringUtil.joinStringsWithDelimiter(
                    Uri.QueryParamsDelimiter,
                    true,
                    uriFragment!,
                    uriFragmentInPathNeedAppend);
        }
        else if (isUriFragmentInPathNeedAppendNotEmpty)
        {
            uriFragment = uriQueryAndFragmentInPathNeedAppend!.fragment;
        }
        if (StringUtil.isNotEmpty(uriFragment))
        {
            // 拼接路径（包含查询参数）和锚点：
            uriString
                = StringUtil.joinStringsWithDelimiter(
                    Uri.QueryFragmentDelimiter,
                    true,
                    uriString,
                    uriFragment!);
        }

        return uriString;
    }

    /**
     * 根据指定的Uri字符串和查询参数Map对象，创建查询参数字符串。
     * @param queryParams 查询参数Map对象。
     * @returns 返回查询参数字符串。
     */
    static createQueryParamsStringWithMap(
        queryParams: Map<string, string> | null): string
    {
        if (queryParams == null)
        {
            return StringUtil.Empty;
        }
        queryParams = queryParams!;

        let queryParamsString = StringUtil.Empty;
        let queryParamsEntries = queryParams.entries();
        for (let [paramName, paramValue] of queryParamsEntries)
        {
            queryParamsString += paramName;
            if (StringUtil.isNotEmpty(paramValue))
            {
                paramValue
                    = encodeURIComponent(paramValue);
                queryParamsString
                    += Uri.QueryParamValudDelimiter
                    + paramValue;
            }
        }
        return queryParamsString;
    }

    /**
     * 将指定的查询参数追加到指定的Uri字符串中。
     * @param uriString 指定的Uri字符串。
     * @param queryParams 要追加的查询参数。
     * @returns 返回追加后的Uri字符串。
     */
    static appendQueryParamsToUri(
        uriString: string | null,
        queryParams: string | Map<string, string> | null): string
    {
        if (queryParams == null)
        {
            return StringUtil.emptyOr(uriString);
        }
        if (typeof (queryParams) != "string")
        {
            queryParams = this.createQueryParamsStringWithMap(queryParams);
        }

        queryParams = queryParams as string;
        if (StringUtil.isEmpty(uriString))
        {
            return queryParams;
        }

        uriString = uriString!;

        let uriQueryAndFragment
            = this.getUriQueryAndFragmentFrom(uriString);
        let fragmentInUri: string | null = null;
        if (uriQueryAndFragment != null
            && uriQueryAndFragment.fragmentBeginCharIndex >= 0)
        {
            fragmentInUri
                = uriString.substring(
                    uriQueryAndFragment.fragmentBeginCharIndex);
            uriString
                = uriString.substring(
                    0,
                    uriQueryAndFragment.fragmentBeginCharIndex);
        }

        var uriQueryAndFragmentInQueryParamsNeedAppend
            = this.getUriQueryAndFragmentFrom(queryParams);
        var fragmentInQueryParamsNeedAppend: string | null = null;
        if (uriQueryAndFragmentInQueryParamsNeedAppend != null
            && uriQueryAndFragmentInQueryParamsNeedAppend.fragmentBeginCharIndex >= 0)
        {
            fragmentInQueryParamsNeedAppend
                = uriQueryAndFragmentInQueryParamsNeedAppend.fragment;
            queryParams
                = queryParams.substring(
                    0,
                    uriQueryAndFragmentInQueryParamsNeedAppend.fragmentBeginCharIndex);
        }

        let queryParamsDelimiter = Uri.PathQueryDelimiter;
        if (uriQueryAndFragment != null
            && uriQueryAndFragment.queryBeginCharIndex >= 0)
        {
            queryParams
                = StringUtil.trimLeftKeywordIn(
                    queryParams,
                    Uri.PathQueryDelimiter);
            queryParamsDelimiter
                = Uri.QueryParamsDelimiter;
        }
        uriString
            = StringUtil.joinStringsWithDelimiter(
                queryParamsDelimiter,
                true,
                uriString,
                queryParams);

        var isFragmentInUriNotEmpty 
        = StringUtil.isNotEmpty(fragmentInUri);
        var isFragmentInQueryParamsNeedAppendNotEmpty
         = StringUtil.isNotEmpty(fragmentInQueryParamsNeedAppend);
        if (isFragmentInUriNotEmpty
            && isFragmentInQueryParamsNeedAppendNotEmpty)
        {
            fragmentInQueryParamsNeedAppend
                = StringUtil.trimLeftKeywordIn(
                    fragmentInQueryParamsNeedAppend,
                    Uri.QueryFragmentDelimiter);
            fragmentInUri
                = StringUtil.joinStringsWithDelimiter(
                    Uri.QueryParamsDelimiter,
                    true,
                    fragmentInUri!,
                    fragmentInQueryParamsNeedAppend);
        }
        else if (isFragmentInQueryParamsNeedAppendNotEmpty)
        {
            fragmentInUri = fragmentInQueryParamsNeedAppend;
            isFragmentInUriNotEmpty = true;
        }

        if (isFragmentInUriNotEmpty)
        {
            uriString
                = StringUtil.joinStringsWithDelimiter(
                    Uri.QueryFragmentDelimiter,
                    true,
                    uriString,
                    fragmentInUri!);
        }
        return uriString;
    }

    /**
     * 将指定的锚点参数追加到指定的Uri字符串中。
     * @param uriString 指定的Uri字符串。
     * @param fragmentParams 要追加的锚点参数。
     * @returns 返回追加后的Uri字符串。
     */
    static appendFragmentParamsToUri(
        uriString: string | null,
        fragmentParams: string | Map<string, string> | null): string
    {
        if (fragmentParams == null)
        {
            return StringUtil.emptyOr(uriString);
        }
        if (typeof (fragmentParams) != "string")
        {
            fragmentParams = this.createQueryParamsStringWithMap(fragmentParams);
        }

        fragmentParams = fragmentParams as string;
        if (StringUtil.isEmpty(uriString))
        {
            return fragmentParams;
        }

        uriString = uriString!;

        let uriQueryAndFragment
            = this.getUriQueryAndFragmentFrom(uriString);
        let fragmetnDelimiter = Uri.QueryFragmentDelimiter;
        if (uriQueryAndFragment != null
            && uriQueryAndFragment.fragmentBeginCharIndex >= 0)
        {
            fragmentParams
                = StringUtil.trimLeftKeywordIn(
                    fragmentParams,
                    Uri.QueryFragmentDelimiter);
            fragmetnDelimiter
                = Uri.QueryParamsDelimiter;
        }
        uriString
            = StringUtil.joinStringsWithDelimiter(
                fragmetnDelimiter,
                true,
                uriString,
                fragmentParams)

        return uriString;
    }
}
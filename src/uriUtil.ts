
import { UriPathDelimiter } from "./constant/uriPathDelimiter.js";
import { Uri } from "./model/uri.js";
import { UriQueryAndFragment } from "./model/uriQueryAndFragment.js";
import { StringUtil } from "./stringUtil.js";

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
		uriString: string | null | undefined,
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

		let uriPathQueryDelimiterIndex = uriString.indexOf(UriPathDelimiter.PathToQuery);
		let uriQueryFragmentDelimiterIndex = uriString.indexOf(UriPathDelimiter.QueryParamToFragment);
		if (uriPathQueryDelimiterIndex >= 0
			&& uriQueryFragmentDelimiterIndex >= 0)
		{
			if (uriPathQueryDelimiterIndex < uriQueryFragmentDelimiterIndex)
			{
				uriQueryBeginCharIndex
					= isIncludeDelimiter
						? uriPathQueryDelimiterIndex
						: (uriPathQueryDelimiterIndex + UriPathDelimiter.PathToQuery.length)
				uriQuery
					= uriString.substring(
						uriQueryBeginCharIndex,
						uriQueryFragmentDelimiterIndex);
				uriFragmentBeginCharIndex
					= isIncludeDelimiter
						? uriQueryFragmentDelimiterIndex
						: (uriQueryFragmentDelimiterIndex + UriPathDelimiter.QueryParamToFragment.length)
				uriFragment
					= uriString.substring(
						uriFragmentBeginCharIndex);
			}
			else
			{
				uriQueryBeginCharIndex
					= isIncludeDelimiter
						? uriQueryFragmentDelimiterIndex
						: (uriQueryFragmentDelimiterIndex + UriPathDelimiter.QueryParamToFragment.length)
				uriQuery
					= uriString.substring(
						uriQueryBeginCharIndex);

				uriFragmentBeginCharIndex
					= isIncludeDelimiter
						? uriPathQueryDelimiterIndex
						: (uriPathQueryDelimiterIndex + UriPathDelimiter.PathToQuery.length)
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
					: (uriPathQueryDelimiterIndex + UriPathDelimiter.PathToQuery.length)
			uriQuery
				= uriString.substring(
					uriQueryBeginCharIndex);
		}
		else if (uriQueryFragmentDelimiterIndex >= 0)
		{
			uriFragmentBeginCharIndex
				= isIncludeDelimiter
					? uriQueryFragmentDelimiterIndex
					: (uriQueryFragmentDelimiterIndex + UriPathDelimiter.QueryParamToFragment.length)
			uriFragment
				= uriString.substring(
					uriFragmentBeginCharIndex);
		}
		else
		{
			return null;
		}

		let uriQueryAndFragment = new UriQueryAndFragment(
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
		uriString: string | null | undefined,
		pathNeedAppend: string | null | undefined): string
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
			UriPathDelimiter.Paths,
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
					UriPathDelimiter.PathToQuery);
			queryInUrString
				= StringUtil.joinStringsWithDelimiter(
					UriPathDelimiter.QueryParams,
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
					UriPathDelimiter.PathToQuery,
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
			let uriFragmentInPathNeedAppend
				= StringUtil.trimLeftKeywordIn(
					uriQueryAndFragmentInPathNeedAppend!.fragment,
					UriPathDelimiter.QueryParamToFragment);
			uriFragment
				= StringUtil.joinStringsWithDelimiter(
					UriPathDelimiter.QueryParams,
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
					UriPathDelimiter.QueryParamToFragment,
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
		queryParams: Map<string, string> | Object | null | undefined): string
	{
		if (queryParams == null)
		{
			return StringUtil.Empty;
		}

		queryParams = queryParams!;

		let queryParamsString = StringUtil.Empty;
		if (queryParams instanceof Map)
		{
			let queryParamsEntries = queryParams.entries();
			for (let [paramName, paramValue] of queryParamsEntries)
			{
				if (queryParamsString.length > 0)
				{
					queryParamsString += UriPathDelimiter.QueryParams;
				}
				//
				queryParamsString += paramName;
				//
				if (StringUtil.isNotEmpty(paramValue))
				{
					paramValue = encodeURIComponent(paramValue);
					//
					queryParamsString
						+= UriPathDelimiter.QueryParamNameToValue
						+ paramValue;
					//
				}
			}
		}
		else if (queryParams instanceof Object)
		{

			for (let paramName in queryParams)
			{
				if (queryParamsString.length > 0)
				{
					queryParamsString += UriPathDelimiter.QueryParams;
				}
				//
				queryParamsString += paramName;
				//
				let paramValue = (queryParams as { [key: string]: unknown })[paramName]?.toString();
				if (StringUtil.isNotEmpty(paramValue))
				{
					paramValue = encodeURIComponent(paramValue!);
					//
					queryParamsString
						+= UriPathDelimiter.QueryParamNameToValue
						+ paramValue;
					//
				}
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
		uriString: string | null | undefined,
		queryParams: string | Map<string, string> | Object | null | undefined): string
	{
		if (queryParams == null
			|| queryParams == undefined)
		{
			return StringUtil.emptyOr(uriString);
		}
		let queryParamsString: string;
		if (typeof (queryParams) == "string")
		{
			queryParamsString = queryParams as string;
		}
		else
		{
			queryParamsString = this.createQueryParamsStringWithMap(queryParams);
		}

		if (StringUtil.isEmpty(uriString))
		{
			return queryParamsString;
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

		let uriQueryAndFragmentInQueryParamsNeedAppend
			= this.getUriQueryAndFragmentFrom(queryParamsString);
		let fragmentInQueryParamsNeedAppend: string | null = null;
		if (uriQueryAndFragmentInQueryParamsNeedAppend != null
			&& uriQueryAndFragmentInQueryParamsNeedAppend.fragmentBeginCharIndex >= 0)
		{
			fragmentInQueryParamsNeedAppend
				= uriQueryAndFragmentInQueryParamsNeedAppend.fragment;
			queryParamsString
				= queryParamsString.substring(
					0,
					uriQueryAndFragmentInQueryParamsNeedAppend.fragmentBeginCharIndex);
		}

		let queryParamsDelimiter = UriPathDelimiter.PathToQuery;
		if (uriQueryAndFragment != null
			&& uriQueryAndFragment.queryBeginCharIndex >= 0)
		{
			queryParamsString
				= StringUtil.trimLeftKeywordIn(
					queryParamsString,
					UriPathDelimiter.PathToQuery);
			queryParamsDelimiter
				= UriPathDelimiter.QueryParams;
		}
		uriString
			= StringUtil.joinStringsWithDelimiter(
				queryParamsDelimiter,
				true,
				uriString,
				queryParamsString);

		let isFragmentInUriNotEmpty
			= StringUtil.isNotEmpty(fragmentInUri);
		let isFragmentInQueryParamsNeedAppendNotEmpty
			= StringUtil.isNotEmpty(fragmentInQueryParamsNeedAppend);
		if (isFragmentInUriNotEmpty
			&& isFragmentInQueryParamsNeedAppendNotEmpty)
		{
			fragmentInQueryParamsNeedAppend
				= StringUtil.trimLeftKeywordIn(
					fragmentInQueryParamsNeedAppend,
					UriPathDelimiter.QueryParamToFragment);
			fragmentInUri
				= StringUtil.joinStringsWithDelimiter(
					UriPathDelimiter.QueryParams,
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
					UriPathDelimiter.QueryParamToFragment,
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
		uriString: string | null | undefined,
		fragmentParams: string | Map<string, string> | null | undefined): string
	{
		if (fragmentParams == null
			|| fragmentParams == undefined)
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
		let fragmetnDelimiter = UriPathDelimiter.QueryParamToFragment;
		if (uriQueryAndFragment != null
			&& uriQueryAndFragment.fragmentBeginCharIndex >= 0)
		{
			fragmentParams
				= StringUtil.trimLeftKeywordIn(
					fragmentParams,
					UriPathDelimiter.QueryParamToFragment);
			fragmetnDelimiter
				= UriPathDelimiter.QueryParams;
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
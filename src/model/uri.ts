
import { StringUtil } from "../stringUtil.js";
import { UriPathDelimiter } from "../constant/uriPathDelimiter.js";

export class Uri
{
	////////////////////////////////////////////////
	// @自身属性
	////////////////////////////////////////////////

	get absoluteUri(): string | null
	{
		if (StringUtil.isEmpty(this.scheme)
			|| StringUtil.isEmpty(this.host))
		{
			return null;
		}

		let absoluteUri = StringUtil.Empty;
		{
			if (this.scheme != null)
			{
				absoluteUri += this.scheme + UriPathDelimiter.SchemeToHost;
			}
			if (this.host != null)
			{
				absoluteUri += this.host;
			}
			if (this.port != null)
			{
				absoluteUri += UriPathDelimiter.HostToPort + this.port;
			}
			if (this.path != null)
			{
				absoluteUri += this.path;
			}
			if (this.query != null)
			{
				absoluteUri += UriPathDelimiter.PathToQuery + this.query;
			}
			if (this.fragment != null)
			{
				absoluteUri += UriPathDelimiter.QueryParamToFragment + this.fragment;
			}
		}
		return absoluteUri;
	}

	set absoluteUri(absoluteUri: string | null)
	{
		if (StringUtil.isEmpty(absoluteUri))
		{
			return;
		}

		absoluteUri = absoluteUri!;

		let schemeDelimiterIndex = absoluteUri.indexOf(UriPathDelimiter.SchemeToHost);
		if (schemeDelimiterIndex >= 0)
		{
			this.scheme = absoluteUri.substring(0, schemeDelimiterIndex);
			absoluteUri = absoluteUri.substring(schemeDelimiterIndex + UriPathDelimiter.SchemeToHost.length);
			if (StringUtil.isEmpty(absoluteUri))
			{
				return;
			}
		}
		else
		{
			schemeDelimiterIndex = absoluteUri.indexOf(UriPathDelimiter.SchemeToHostSimplify);
			if (schemeDelimiterIndex >= 0)
			{
				this.scheme = absoluteUri.substring(0, schemeDelimiterIndex);
				absoluteUri = absoluteUri.substring(schemeDelimiterIndex + UriPathDelimiter.SchemeToHostSimplify.length);
				if (StringUtil.isEmpty(absoluteUri))
				{
					return;
				}
			}
		}


		let hostPathDelimiter = UriPathDelimiter.Paths;
		let hostPathDelimiterIndex = absoluteUri.indexOf(hostPathDelimiter);
		if (hostPathDelimiterIndex < 0)
		{
			hostPathDelimiter = UriPathDelimiter.Paths;
			hostPathDelimiterIndex = absoluteUri.indexOf(hostPathDelimiter);
			if (hostPathDelimiterIndex < 0)
			{
				hostPathDelimiter = UriPathDelimiter.PathToQuery;
				hostPathDelimiterIndex = absoluteUri.indexOf(hostPathDelimiter);
				if (hostPathDelimiterIndex < 0)
				{
					hostPathDelimiter = UriPathDelimiter.QueryParamToFragment;
					hostPathDelimiterIndex = absoluteUri.indexOf(hostPathDelimiter);
					if (hostPathDelimiterIndex < 0)
					{
						hostPathDelimiter = StringUtil.Empty;
						hostPathDelimiterIndex = absoluteUri.length;
					}
				}
			}
		}
		////////////////////////////////////////////////
		let host = absoluteUri.substring(0, hostPathDelimiterIndex);
		let hostPortDelimiterIndex = host.indexOf(UriPathDelimiter.HostToPort);
		if (hostPortDelimiterIndex > -1)
		{
			this.host = host.substring(0, hostPortDelimiterIndex);
			this.port = StringUtil.parseToInt(
				host.substring(hostPortDelimiterIndex + UriPathDelimiter.HostToPort.length));
		}
		else
		{
			this.host = host;
		}
		// absoluteUri = absoluteUri.substring(hostPathDelimiterIndex + hostPathDelimiter.length);
		absoluteUri = absoluteUri.substring(hostPathDelimiterIndex);
		if (StringUtil.isEmpty(absoluteUri))
		{
			return;
		}
		////////////////////////////////////////////////


		let pathQueryDelimiter = UriPathDelimiter.PathToQuery;
		let pathQueryDelimiterIndex = absoluteUri.indexOf(pathQueryDelimiter);
		if (pathQueryDelimiterIndex < 0)
		{
			pathQueryDelimiter = UriPathDelimiter.QueryParamToFragment;
			pathQueryDelimiterIndex = absoluteUri.indexOf(pathQueryDelimiter);
			if (pathQueryDelimiterIndex < 0)
			{
				pathQueryDelimiter = StringUtil.Empty;
				pathQueryDelimiterIndex = absoluteUri.length;
			}
		}
		if (pathQueryDelimiterIndex > -1)
		{
			this.path = absoluteUri.substring(0, pathQueryDelimiterIndex);
			absoluteUri
				= pathQueryDelimiterIndex < absoluteUri.length
					? absoluteUri.substring(pathQueryDelimiterIndex + pathQueryDelimiter.length)
					: StringUtil.Empty;
			if (StringUtil.isEmpty(absoluteUri))
			{
				return;
			}
		}


		if (pathQueryDelimiter == UriPathDelimiter.PathToQuery)
		{
			let queryFragmentDelimiter = UriPathDelimiter.QueryParamToFragment;
			let queryFragmentDelimiterIndex = absoluteUri.indexOf(queryFragmentDelimiter);
			if (queryFragmentDelimiterIndex < 0)
			{
				queryFragmentDelimiter = StringUtil.Empty;
				queryFragmentDelimiterIndex = absoluteUri.length;
			}
			if (queryFragmentDelimiterIndex > -1)
			{
				this.query = absoluteUri.substring(
					0,
					queryFragmentDelimiterIndex);

				let fragmentBeginIndex
					= queryFragmentDelimiterIndex
					+ queryFragmentDelimiter.length;
				if (fragmentBeginIndex < absoluteUri.length)
				{
					this.fragment = absoluteUri.substring(fragmentBeginIndex);
				}
			}
		}
		else if (pathQueryDelimiter == UriPathDelimiter.QueryParamToFragment)
		{
			this.fragment = absoluteUri;
		}
	}

	scheme: string | null = null;

	host: string | null = null;

	port: number = 0;

	path: string | null = null;

	protected _query: string | null = null;

	get query(): string | null
	{
		return this._query;
	}

	set query(query: string | null)
	{
		if (StringUtil.isEquals(this._query, query, false, true))
		{
			return;
		}

		this._query = query;

		this.queryParameters = null;
		if (StringUtil.isEmpty(query))
		{
			return;
		}

		query = query!;

		let queryParameters = new Map<string, string>();
		let queryParameterStrings = query.split(UriPathDelimiter.QueryParams);
		for (let queryParameterString of queryParameterStrings)
		{
			if (StringUtil.isEmpty(queryParameterString))
			{
				continue;
			}

			let queryParameterNameValue = queryParameterString.split(UriPathDelimiter.QueryParamNameToValue);
			let queryParameterName = queryParameterNameValue[0];
			if (StringUtil.isEmpty(queryParameterName))
			{
				continue;
			}
			let queryParameterValue = StringUtil.Empty;
			if (queryParameterNameValue.length > 1)
			{
				queryParameterValue = queryParameterNameValue[1];
				queryParameterValue = decodeURIComponent(queryParameterValue);
			}
			queryParameters.set(queryParameterName, queryParameterValue);
		}
		// !!!
		this.queryParameters = queryParameters;
		// !!!
	}

	queryParameters: Map<string, string> | null = null;

	protected _fragment: string | null = null;

	get fragment(): string | null
	{
		return this._fragment;
	}

	set fragment(fragment: string | null)
	{
		if (StringUtil.isEquals(
			this._fragment,
			fragment,
			false,
			true))
		{
			return;
		}

		this._fragment = fragment;
		this.fragmentParameters = null;

		if (StringUtil.isEmpty(fragment))
		{
			return;
		}

		fragment = fragment!;

		let fragmentParameters = new Map<string, string>();
		let fragmentParameterStrings = fragment.split(UriPathDelimiter.QueryParams);
		for (let fragmentParameterString of fragmentParameterStrings)   
		{
			if (StringUtil.isEmpty(fragmentParameterString))
			{
				continue;
			}

			let fragmentParameterNameValue = fragmentParameterString.split(UriPathDelimiter.QueryParamNameToValue);
			let fragmentParameterName = fragmentParameterNameValue[0];
			if (StringUtil.isEmpty(fragmentParameterName))
			{
				continue;
			}
			let fragmentParameterValue = StringUtil.Empty;
			if (fragmentParameterNameValue.length > 1)
			{
				fragmentParameterValue = fragmentParameterNameValue[1];
				fragmentParameterValue = decodeURIComponent(fragmentParameterValue);
			}
			fragmentParameters.set(fragmentParameterName, fragmentParameterValue);
		}
		// !!!
		this.fragmentParameters = fragmentParameters;
		// !!!
	}

	fragmentParameters: Map<string, string> | null = null;

	get isValid(): boolean
	{
		////////////////////////////////////////////////
		// 执意要有一个字段不为空，即为有效，
		// 原因：Uri对象的主要作用是提取信息，而不是判断各字段的有效性。
		////////////////////////////////////////////////
		if (StringUtil.isNotEmpty(this.scheme)
			// host 是允许为“空”的。
			|| StringUtil.isNotEmpty(this.host)
			|| StringUtil.isNotEmpty(this.path)
			|| StringUtil.isNotEmpty(this.query)
			|| StringUtil.isNotEmpty(this.fragment))
		{
			return true;
		}
		return false;
	}

	////////////////////////////////////////////////
	// @自身实现
	////////////////////////////////////////////////

	constructor(
		absoluteUri: string | null = null)
	{
		this.absoluteUri = absoluteUri;
	}

	toString(): string
	{
		return StringUtil.emptyOr(this.absoluteUri);
	}

	toJSON(): string | null
	{
		return this.absoluteUri;
	}
}
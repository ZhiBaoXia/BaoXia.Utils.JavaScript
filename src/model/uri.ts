
import { StringUtil } from "../stringUtil.js";

export class Uri
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    static readonly SchemeDelimiter: string = "://";

    static readonly HostPortDelimiter: string = ":";

    static readonly HostPathDelimiter: string = "/";

    static readonly PathQueryDelimiter: string = "?";

    static readonly QueryParamsDelimiter: string = "&";
    
    static readonly QueryParamValudDelimiter: string = "=";

    static readonly QueryFragmentDelimiter: string = "#";


    static readonly DefaultScheme: string = "https";


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
                absoluteUri += this.scheme + Uri.SchemeDelimiter;
            }
            if (this.host != null)
            {
                absoluteUri += this.host;
            }
            if (this.port != null)
            {
                absoluteUri += Uri.HostPortDelimiter + this.port;
            }
            if (this.path != null)
            {
                absoluteUri += this.path;
            }
            if (this.query != null)
            {
                absoluteUri += Uri.PathQueryDelimiter + this.query;
            }
            if (this.fragment != null)
            {
                absoluteUri += Uri.QueryFragmentDelimiter + this.fragment;
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

        let schemeDelimiterIndex = absoluteUri.indexOf(Uri.SchemeDelimiter);
        if (schemeDelimiterIndex > -1)
        {
            this.scheme = absoluteUri.substring(0, schemeDelimiterIndex);
            absoluteUri = absoluteUri.substring(schemeDelimiterIndex + Uri.SchemeDelimiter.length);
            if (StringUtil.isEmpty(absoluteUri))
            {
                return;
            }
        }

        let hostPathDelimiter = Uri.HostPathDelimiter;
        let hostPathDelimiterIndex = absoluteUri.indexOf(hostPathDelimiter);
        if (hostPathDelimiterIndex < 0)
        {
            hostPathDelimiter = Uri.HostPathDelimiter;
            hostPathDelimiterIndex = absoluteUri.indexOf(hostPathDelimiter);
            if (hostPathDelimiterIndex < 0)
            {
                hostPathDelimiter = Uri.QueryFragmentDelimiter;
                hostPathDelimiterIndex = absoluteUri.indexOf(hostPathDelimiter);
                if (hostPathDelimiterIndex < 0)
                {
                    hostPathDelimiter = StringUtil.Empty;
                    hostPathDelimiterIndex = absoluteUri.length;
                }
            }
        }
        ////////////////////////////////////////////////
        let host = absoluteUri.substring(0, hostPathDelimiterIndex);
        let hostPortDelimiterIndex = host.indexOf(Uri.HostPortDelimiter);
        if (hostPortDelimiterIndex > -1)
        {
            this.host = host.substring(0, hostPortDelimiterIndex);
            this.port = StringUtil.parseToInt(
                host.substring(hostPortDelimiterIndex + Uri.HostPortDelimiter.length));
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


        let pathQueryDelimiter = Uri.PathQueryDelimiter;
        let pathQueryDelimiterIndex = absoluteUri.indexOf(pathQueryDelimiter);
        if (pathQueryDelimiterIndex < 0)
        {
            pathQueryDelimiter = Uri.QueryFragmentDelimiter;
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


        if (pathQueryDelimiter == Uri.PathQueryDelimiter)
        {
            let queryFragmentDelimiter = Uri.QueryFragmentDelimiter;
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
        else if (pathQueryDelimiter == Uri.QueryFragmentDelimiter)
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
        let queryParameterStrings = query.split(Uri.QueryParamsDelimiter);
        for (let queryParameterString of queryParameterStrings)
        {
            if (StringUtil.isEmpty(queryParameterString))
            {
                continue;
            }

            let queryParameterNameValue = queryParameterString.split(Uri.QueryParamValudDelimiter);
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
        let fragmentParameterStrings = fragment.split(Uri.QueryParamsDelimiter);
        for (let fragmentParameterString of fragmentParameterStrings)   
        {
            if (StringUtil.isEmpty(fragmentParameterString))
            {
                continue;
            }

            let fragmentParameterNameValue = fragmentParameterString.split(Uri.QueryParamValudDelimiter);
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
        if (StringUtil.isEmpty(this.scheme)
            || StringUtil.isEmpty(this.host))
        {
            return false;
        }
        return true;
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

    toJson(): string | null
    {
        return this.absoluteUri;
    }
}
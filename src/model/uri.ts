
import { StringUtil } from "../stringUtil.js";

export class Uri
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    static readonly SchemeDelimiter: string = "://";

    static readonly HostPortDelimiter: string = ":";

    static readonly PathDirectoryDelimiter: string = "/";

    static readonly PathQueryDelimiter: string = "?";

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
        if (absoluteUri.startsWith("//"))
        {
            absoluteUri = Uri.DefaultScheme + ":" + absoluteUri;
        }

        let schemeDelimiterIndex = absoluteUri.indexOf(Uri.SchemeDelimiter);
        if (schemeDelimiterIndex > -1)
        {
            this.scheme = absoluteUri.substring(0, schemeDelimiterIndex);
            absoluteUri = absoluteUri.substring(schemeDelimiterIndex + Uri.SchemeDelimiter.length);
        }

        let pathDirectoryDelimiterIndex = absoluteUri.indexOf(Uri.PathDirectoryDelimiter);
        if (pathDirectoryDelimiterIndex > -1)
        {
            let host = absoluteUri.substring(0, pathDirectoryDelimiterIndex);
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
            absoluteUri = absoluteUri.substring(pathDirectoryDelimiterIndex);
        }

        let pathQueryDelimiterIndex = absoluteUri.indexOf(Uri.PathQueryDelimiter);
        if (pathQueryDelimiterIndex > -1)
        {
            this.path = absoluteUri.substring(0, pathQueryDelimiterIndex);
            absoluteUri = absoluteUri.substring(pathQueryDelimiterIndex + Uri.PathQueryDelimiter.length);
        }

        let queryFragmentDelimiterIndex = absoluteUri.indexOf(Uri.QueryFragmentDelimiter);
        if (queryFragmentDelimiterIndex > -1)
        {
            this.query = absoluteUri.substring(0, queryFragmentDelimiterIndex);
            this.fragment = absoluteUri.substring(queryFragmentDelimiterIndex + Uri.QueryFragmentDelimiter.length);
        }
    }

    scheme: string | null = null;

    host: string | null = null;

    port: number | null = null;

    path: string | null = null;

    _query: string | null = null;

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
        let queryParameterStrings = query.split("&");
        for (let queryParameterString of queryParameterStrings)
        {
            if (StringUtil.isEmpty(queryParameterString))
            {
                continue;
            }

            let queryParameterNameValue = queryParameterString.split("=");
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

    fragment: string | null = null;

    get isValid():boolean
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
}

import { StringUtil } from "../stringUtil.js";

export class UriUtil
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    static readonly SchemeDelimiter: string = "://";

    static readonly HostPortDelimiter: string = ":";

    static readonly PathDirectoryDelimiter: string = "/";

    static readonly PathQueryDelimiter: string = "?";

    static readonly QueryFragmentDelimiter: string = "#";


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
                absoluteUri += this.scheme + UriUtil.SchemeDelimiter;
            }
            if (this.host != null)
            {
                absoluteUri += this.host;
            }
            if (this.port != null)
            {
                absoluteUri += UriUtil.HostPortDelimiter + this.port;
            }
            if (this.path != null)
            {
                absoluteUri += this.path;
            }
            if (this.query != null)
            {
                absoluteUri += UriUtil.PathQueryDelimiter + this.query;
            }
            if (this.fragment != null)
            {
                absoluteUri += UriUtil.QueryFragmentDelimiter + this.fragment;
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

        let schemeDelimiterIndex = absoluteUri.indexOf(UriUtil.SchemeDelimiter);
        if (schemeDelimiterIndex > -1)
        {
            this.scheme = absoluteUri.substring(0, schemeDelimiterIndex);
            absoluteUri = absoluteUri.substring(schemeDelimiterIndex + UriUtil.SchemeDelimiter.length);
        }

        let pathDirectoryDelimiterIndex = absoluteUri.indexOf(UriUtil.PathDirectoryDelimiter);
        if (pathDirectoryDelimiterIndex > -1)
        {
            let host = absoluteUri.substring(0, pathDirectoryDelimiterIndex);
            let hostPortDelimiterIndex = host.indexOf(UriUtil.HostPortDelimiter);
            if (hostPortDelimiterIndex > -1)
            {
                this.host = host.substring(0, hostPortDelimiterIndex);
                this.port = StringUtil.parseToInt(
                    host.substring(hostPortDelimiterIndex + UriUtil.HostPortDelimiter.length));
            }
            else
            {
                this.host = host;
            }
            absoluteUri = absoluteUri.substring(pathDirectoryDelimiterIndex);
        }

        let pathQueryDelimiterIndex = absoluteUri.indexOf(UriUtil.PathQueryDelimiter);
        if (pathQueryDelimiterIndex > -1)
        {
            this.path = absoluteUri.substring(0, pathQueryDelimiterIndex);
            absoluteUri = absoluteUri.substring(pathQueryDelimiterIndex + UriUtil.PathQueryDelimiter.length);
        }

        let queryFragmentDelimiterIndex = absoluteUri.indexOf(UriUtil.QueryFragmentDelimiter);
        if (queryFragmentDelimiterIndex > -1)
        {
            this.query = absoluteUri.substring(0, queryFragmentDelimiterIndex);
            this.fragment = absoluteUri.substring(queryFragmentDelimiterIndex + UriUtil.QueryFragmentDelimiter.length);
        }
    }

    scheme: string | null;

    host: string | null;

    port: number | null;

    path: string | null;

    _query: string | null;

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

    queryParameters: Map<string, string> | null;

    fragment: string | null;

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        absoluteUri: string | null = null)
    {
        this.absoluteUri = absoluteUri;
    }
}
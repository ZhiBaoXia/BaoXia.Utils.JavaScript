
import { SystemName } from "./constant/systemName.js";
import { StringUtil } from "./stringUtil.js";

export class EnvironmentUtil
{
    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    protected static _systemName: string = StringUtil.Empty;

    static get systemName(): string
    {
        if (StringUtil.isEmpty(this._systemName))
        {
            let userAgent = EnvironmentUtil.UserAgent;
            if (StringUtil.isNotEmpty(userAgent))
            {
                if (StringUtil.indexOfKeywordIn(userAgent, "Windows", true)
                    >= 0)
                {
                    this._systemName = SystemName.Windows;
                }
                if (StringUtil.indexOfKeywordIn(userAgent, "Linux", true)
                    >= 0)
                {
                    this._systemName = SystemName.Linux;
                }
                if (StringUtil.indexOfKeywordIn(userAgent, "Mac", true)
                    >= 0)
                {
                    this._systemName = SystemName.Mac;
                }
                if (StringUtil.indexOfKeywordIn(userAgent, "Android", true)
                    >= 0)
                {
                    this._systemName = SystemName.Android;
                }
                if (StringUtil.indexOfKeywordIn(userAgent, "iPhone", true)
                    >= 0)
                {
                    this._systemName = SystemName.IOS;
                }
                this._systemName = SystemName.Unknown;
            }
        }
        return this._systemName;
    }

    static set systemName(systemName: string)
    {
        this._systemName = systemName;
    }

    static get UserAgent(): string | null
    {
        let userAgent: string | null = null;
        if (typeof (window) != "undefined")
        {
            userAgent = window.navigator.userAgent;
        }
        return userAgent;
    }

    static get isWindows(): boolean
    {
        return EnvironmentUtil.systemName == SystemName.Windows;
    }

    static get isLinux(): boolean
    {
        return EnvironmentUtil.systemName != SystemName.Windows;
    }

    static get isMac(): boolean
    {
        return EnvironmentUtil.systemName == SystemName.Mac;
    }

    static get isAndroid(): boolean
    {
        return EnvironmentUtil.systemName == SystemName.Android;
    }

    static get isIOS(): boolean
    {
        return EnvironmentUtil.systemName == SystemName.IOS;
    }
}
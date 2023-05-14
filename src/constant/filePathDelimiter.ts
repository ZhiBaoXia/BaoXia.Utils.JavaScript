
import { EnvironmentUtil } from "../environmentUtil.js";
import {SystemName} from  "./systemName.js"

export class FilePathDelimiter
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    static readonly PathsDefault = "/";

    static readonly PathsInWindow = "\\";

    static readonly PathsInLinux = "/";

    static get PathDelimiter(): string
    {
        if (EnvironmentUtil.isWindows)
        {
            return FilePathDelimiter.PathsInWindow;
        }
        else if (EnvironmentUtil.isLinux)
        {
            return FilePathDelimiter.PathsInLinux;
        }
        return FilePathDelimiter.PathsDefault;
    }

    static readonly FileExtensionNameDelimiter = ".";
}
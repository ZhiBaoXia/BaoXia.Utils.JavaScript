
import { Uri } from "./model/uri.js";

export class UriUtil
{
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
}
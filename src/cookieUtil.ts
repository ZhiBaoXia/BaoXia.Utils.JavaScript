import { StringUtil } from "./stringUtil.js";

export class CookieUtil
{
    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////


    /**
     * 获取指定名称的Cookie值。
     * @param cookieName 指定的Cookie名称。
     * @returns 返回指定名称的Cookie值。
     */
    static get(
        cookieName: string | null,
        isIgnoreCase: boolean = true): string | null
    {

        if (cookieName == null
            || cookieName.length < 1)
        {
            return null;
        }

        let documentCookiesString = document.cookie;
        if (documentCookiesString == null
            || documentCookiesString.length < 1)
        {
            return null;
        }

        let documentCookieStrings = documentCookiesString.split(";");
        if (documentCookieStrings == null
            || documentCookieStrings.length < 1)
        {
            return null;
        }

        for (let cookieIndex = 0;
            cookieIndex < documentCookieStrings.length;
            cookieIndex++)
        {
            let documentCookieString = documentCookieStrings[cookieIndex].trim();
            let isCookieNameMatched = false;
            if (isIgnoreCase)
            {
                isCookieNameMatched = StringUtil.indexOfKeywordIn(
                    documentCookieString,
                    cookieName,
                    true) == 0;
            }
            else
            {
                isCookieNameMatched
                = documentCookieString.indexOf(cookieName) == 0;
            }
            if (isCookieNameMatched == true)
            {
                let documentCookieNameEndCharIndex = documentCookieString.length;
                let indexOfEqualMark = documentCookieString.indexOf("=");
                if (indexOfEqualMark >= 0)
                {
                    documentCookieNameEndCharIndex = indexOfEqualMark;
                }
                let documentCookieName = documentCookieString.substring(
                    0,
                    documentCookieNameEndCharIndex)
                    .trim();
                if (documentCookieName.length == cookieName.length)
                {
                    let cookieValue = null;
                    if (indexOfEqualMark >= 0)
                    {
                        cookieValue = documentCookieString.substring(
                            indexOfEqualMark + 1,
                            documentCookieString.length)
                            .trim();
                    }
                    return cookieValue;
                }
            }
        }
        return null;
    }
}

import { ArrayUtil, Model, StringUtil, TestCase, UriUtil } from "../src/index.js";

export class UriUtilPathOperationTest_2 extends TestCase
{
    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor()
    {
        super("UriUtilPathOperation Test 2",
            (assert, assertFalse) =>
            {
                ////////////////////////////////////////////////
                // “appendPathToUri”相关测试：
                ////////////////////////////////////////////////

                let testUriStrings = new Array<string>();
                ArrayUtil.enumerateItemInItemArraysTo(
                    (testUriParams) =>
                    {
                        let scheme = testUriParams[0];
                        let host = testUriParams[1];
                        let port = testUriParams[2];
                        let path = testUriParams[3];
                        let query = testUriParams[4];
                        let fragment = testUriParams[5];
                        //
                        this.didTestWithUriScheme(
                            scheme,
                            host,
                            port,
                            path,
                            query,
                            fragment);
                        //
                    },
                    // 0
                    ["", "https", "http"],
                    // 1
                    ["", "www.baidu.com"],
                    // 2
                    ["", ":80", ":443"],
                    // 3
                    ["", "/", "/search", "/search/game"],
                    // 4
                    ["", "keyword=cod", "keyword=cod&type=fps"],
                    // 5
                    ["", "catalog=weapon", "catalog=weapon&color=blue"]);
            })
    }

    ////////////////////////////////////////////////
    // @事件节点
    ////////////////////////////////////////////////

    didTestWithUriScheme(
        scheme: string | null,
        host: string | null,
        port: string | null,
        path: string | null,
        query: string | null,
        fragment: string | null)
    {
        const uriString
            = scheme
            + Model.Uri.SchemeDelimiter
            + host
            + (StringUtil.isNotEmpty(port) + Model.Uri.HostPortDelimiter + port)
            + path
            + (StringUtil.isNotEmpty(query) + Model.Uri.PathQueryDelimiter + query)
            + (StringUtil.isNotEmpty(fragment) + Model.Uri.QueryFragmentDelimiter + fragment);

        const pathsNeedAppened = [
            null,
            "",
            "/",
            "/game",
            "/game/fps",
            "/game/fps/cod"
        ]

        const queryParamsNeedAppened = [
            null,
            "",
            //
            "keyword=cod",
            "keyword=cod&type=fps",
            //
            "keyword=cod#color=blue",
            "keyword=cod&type=fps#color=blue",
            //
            "?keyword=cod",
            "?keyword=cod&type=fps",
            //
            "?keyword=cod#color=blue",
            "?keyword=cod&type=fps#color=blue"
        ];

        const fragmentParamsNeedAppened = [
            null,
            "",
            "level=1",
            "level=1&attribute=fire",
            //
            "#level=1",
            "#level=1&attribute=fire"
        ];
    }
} 
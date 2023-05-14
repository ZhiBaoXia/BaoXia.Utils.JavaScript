
import { TestCase, UriUtil } from "../src/index.js";

export class UriUtilPathOperationTest_1 extends TestCase
{
    ////////////////////////////////////////////////
    // @测试函数
    ////////////////////////////////////////////////

    constructor()
    {
        super("UriUtilPathOperation Test 1",
            (assert, assertFalse) =>
            {
                ////////////////////////////////////////////////
                // “appendPathToUri”相关测试：
                ////////////////////////////////////////////////

                let uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com", 
                    "/search");
                {
                    assert(uriString == "https://www.baidu.com/search");
                }

                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/search", 
                    "/game");
                {
                    assert(uriString == "https://www.baidu.com/search/game");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/search?keyword=cod", 
                    "/game");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=cod");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/search?keyword=cod#catalog=weapon", 
                    "/game");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=cod#catalog=weapon");
                }

                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/search?keyword=cod", 
                    "/game?type=fps");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=cod&type=fps");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/search?keyword=cod#catalog=weapon", 
                    "/game?type=fps#color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=cod&type=fps#catalog=weapon&color=blue");
                }
                
                ////////////////////////////////////////////////
                // “appendQueryParamsToUri”相关测试：
                ////////////////////////////////////////////////
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "type=fps");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "?type=fps");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "type=fps&color=blue");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps&color=blue");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "?type=fps&color=blue");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps&color=blue");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "color=blue");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps&color=blue");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "?color=blue");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps&color=blue");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com#type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com?color=blue#type=fps&catalog=weapon");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com?keyword=cod#type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com?keyword=cod&color=blue#type=fps&catalog=weapon");
                }

                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod", 
                    "type=fps");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod", 
                    "?type=fps");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod", 
                    "type=fps&color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod", 
                    "?type=fps&color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod&type=fps", 
                    "color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod&type=fps", 
                    "?color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod&type=fps", 
                    "color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod&type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod&type=fps", 
                    "color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search#type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?color=blue#type=fps&catalog=weapon");
                }

                uriString = UriUtil.appendQueryParamsToUri(
                    "https://www.baidu.com/search?keyword=cod#type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&color=blue#type=fps&catalog=weapon");
                }
            });
    }
} 
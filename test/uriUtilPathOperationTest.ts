
import { TestCase, UriUtil } from "../src/index.js";

export class UriUtilPathOperationTest extends TestCase
{
    ////////////////////////////////////////////////
    // @测试函数
    ////////////////////////////////////////////////

    constructor()
    {
        super("UriUtilPathOperationTest Test",
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
                    "https://www.baidu.com/serach", 
                    "/game");
                {
                    assert(uriString == "https://www.baidu.com/search/game");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/serach?keyword=cod", 
                    "/game");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=code");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/serach?keyword=cod#catalog=weapon", 
                    "/game");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=code#catalog=weapon");
                }

                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/serach?keyword=cod", 
                    "/game?type=fps");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=code&type=fps");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com/serach?keyword=cod#catalog=weapon", 
                    "/game?type=fps#color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search/game?keyword=code#catalog=weapon&color=blue");
                }
                
                ////////////////////////////////////////////////
                // “appendPathToUri”相关测试：
                ////////////////////////////////////////////////
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "type=fps");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps");
                }

                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "?type=fps");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "type=fps&color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }

                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod", 
                    "?type=fps&color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }

                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "?color=blue");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod&type=fps", 
                    "color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&type=fps&color=blue#catalog=weapon");
                }
                
                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com#type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?color=blue#type=fps&catalog=weapon");
                }

                uriString = UriUtil.appendPathToUri(
                    "https://www.baidu.com?keyword=cod#type=fps", 
                    "?color=blue#catalog=weapon");
                {
                    assert(uriString == "https://www.baidu.com/search?keyword=cod&color=blue#type=fps&catalog=weapon");
                }
            });
    }
} 
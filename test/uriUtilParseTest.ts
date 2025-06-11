
import { TestCase, UriUtil, StringUtil } from "../src/index.js";

export class UriUtilParseTest extends TestCase
{
	////////////////////////////////////////////////
	// @测试函数
	////////////////////////////////////////////////

	constructor()
	{
		super("UriUtilParseTest Test",
			(assert, assertFalse) =>
			{
				let uriString = "www.baidu.com";
				let uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
				}

				uriString = "http://";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
				}


				uriString = "://www.baidu.com";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
				}

				uriString = "http:/www.baidu.com";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "http");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 0);
					assert(StringUtil.isEmpty(uri.path));
					assert(StringUtil.isEmpty(uri.query));
					assert(StringUtil.isEmpty(uri.fragment));
				}

				uriString = "http://www.baidu.com";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "http");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 0);
					assert(StringUtil.isEmpty(uri.path));
					assert(StringUtil.isEmpty(uri.query));
					assert(StringUtil.isEmpty(uri.fragment));
				}

				uriString = "https://www.baidu.com";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "https");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 0);
					assert(StringUtil.isEmpty(uri.path));
					assert(StringUtil.isEmpty(uri.query));
					assert(StringUtil.isEmpty(uri.fragment));
				}

				uriString = "https://www.baidu.com:8080";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "https");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 8080);
					assert(StringUtil.isEmpty(uri.path));
					assert(StringUtil.isEmpty(uri.query));
					assert(StringUtil.isEmpty(uri.fragment));
				}

				uriString = "https://www.baidu.com:8080/search";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "https");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 8080);
					assert(uri.path == "/search");
					assert(StringUtil.isEmpty(uri.query));
					assert(StringUtil.isEmpty(uri.fragment));
				}

				uriString = "https://www.baidu.com:8080/search?keyword=abc";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "https");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 8080);
					assert(uri.path == "/search");
					assert(uri.query == "keyword=abc");
					{
						assert(uri.queryParameters!.get("keyword") == "abc");
					}
					assert(StringUtil.isEmpty(uri.fragment));
				}


				uriString = "https://www.baidu.com:8080/search#fragment=lastReadPosition";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "https");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 8080);
					assert(uri.path == "/search");
					assert(StringUtil.isEmpty(uri.query));
					assert(uri.fragment == "fragment=lastReadPosition");
					{
						let fragment = uri.fragmentParameters!.get("fragment");
						assert(fragment == "lastReadPosition");
					}
				}

				uriString = "https://www.baidu.com:8080/search?keyword=abc#fragment=lastReadPosition";
				uri = UriUtil.parseUri(uriString);
				{
					assert(uri != null);
					uri = uri!;

					assert(uri.scheme == "https");
					assert(uri.host == "www.baidu.com");
					assert(uri.port == 8080);
					assert(uri.path == "/search");
					assert(uri.query == "keyword=abc");
					assert(uri.fragment == "fragment=lastReadPosition");
					{
						assert(uri.queryParameters!.get("keyword") == "abc");

						let fragment = uri.fragmentParameters!.get("fragment");
						assert(fragment == "lastReadPosition");
					}
				}
			});
	}
} 
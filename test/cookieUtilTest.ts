import { TestCase } from "@baoxia/utils.javascript.testutil";
import { CookieUtil, StringUtil } from "../src/index.js";

export class CookieUtilTest extends TestCase
{
    ////////////////////////////////////////////////
    // @测试函数
    ////////////////////////////////////////////////

    constructor()
    {
        super("CookieUtil Test",
            (assert, assertFalse) =>
            {
                let cookieString = "OTZ=6976810_24_24__24_; 1P_JAR=2023-04-29-03";
                let cookieValue: string | null = null;
                {
                    cookieValue = CookieUtil.get("OTZ", cookieString)
                    assert(StringUtil.isEquals(cookieValue, "6976810_24_24__24_"));

                    cookieValue = CookieUtil.get("otz", cookieString, true)
                    assert(StringUtil.isEquals(cookieValue, "6976810_24_24__24_"));
                }
                {
                    cookieValue = CookieUtil.get("1P_JAR", cookieString)
                    assert(StringUtil.isEquals(cookieValue, "2023-04-29-03"));

                    cookieValue = CookieUtil.get("1p_Jar", cookieString, true)
                    assert(StringUtil.isEquals(cookieValue, "2023-04-29-03"));
                }
                let cookieKeyValues = CookieUtil.parseToMap(cookieString);
                assert(cookieKeyValues != null);
                {
                    cookieKeyValues = cookieKeyValues!;

                    assert(cookieKeyValues.size == 2);

                    cookieValue = cookieKeyValues.get("OTZ") as string;
                    assert(StringUtil.isEquals(cookieValue, "6976810_24_24__24_"));

                    cookieValue = cookieKeyValues.get("1P_JAR") as string;
                    assert(StringUtil.isEquals(cookieValue, "2023-04-29-03"));
                }

                cookieString = "buvid3=D2D58403-5C91-E701-24A2-F8EA691218C580766infoc; b_nut=1673767280; i-wanna-go-back=-1; _uuid=E2E75FF10-2A97-19A6-25106-C5E6F655E42582721infoc; CURRENT_FNVAL=4048; rpdid=|(u~)Y|lY|YY0J'uY~J))J|~Y; is-2022-channel=1; nostalgia_conf=-1; hit-new-style-dyn=0; hit-dyn-v2=1; LIVE_BUVID=AUTO8916742291694597; buvid4=F863193B-EB5F-A668-30BF-264FB6C77AB681625-023011515-eFZHYp%2FCJ3hPylnrJ%2FaJww%3D%3D; buvid_fp_plain=undefined; header_theme_version=CLOSE; CURRENT_QUALITY=116; CURRENT_PID=62daa0c0-c7fa-11ed-8f45-6b9fabc6dead; DedeUserID=297604290; DedeUserID__ckMd5=4cee1d917519787a; b_ut=5; fingerprint=12d0626bce0c7a24cd0f51cf1ed6b9cf; buvid_fp=12d0626bce0c7a24cd0f51cf1ed6b9cf; FEED_LIVE_VERSION=V8; bili_jct=279398f5c5ea98d50130ebd5c145bc97; sid=50pc27fr; PVID=2; b_lsid=117869AE_187CAEC6F70; innersign=1; bp_video_offset_297604290=789826447122366500; home_feed_column=4; browser_resolution=1060-2294";
                {
                    cookieValue = CookieUtil.get("buvid3", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "D2D58403-5C91-E701-24A2-F8EA691218C580766infoc"));

                    cookieValue = CookieUtil.get("b_nut", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "1673767280"));

                    cookieValue = CookieUtil.get("i-wanna-go-back", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "-1"));

                    cookieValue = CookieUtil.get("_uuid", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "E2E75FF10-2A97-19A6-25106-C5E6F655E42582721infoc"));

                    cookieValue = CookieUtil.get("CURRENT_FNVAL", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "4048"));

                    cookieValue = CookieUtil.get("rpdid", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "|(u~)Y|lY|YY0J'uY~J))J|~Y"));

                    cookieValue = CookieUtil.get("bili_jct", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "279398f5c5ea98d50130ebd5c145bc97"));

                    cookieValue = CookieUtil.get("browser_resolution", cookieString);
                    assert(StringUtil.isEquals(cookieValue, "1060-2294"));
                }
                cookieKeyValues = CookieUtil.parseToMap(cookieString);
                assert(cookieKeyValues != null);
                {
                    cookieKeyValues = cookieKeyValues!;
                    assert(cookieKeyValues.size == 30);

                    cookieValue = cookieKeyValues.get("buvid3") as string;
                    assert(StringUtil.isEquals(cookieValue, "D2D58403-5C91-E701-24A2-F8EA691218C580766infoc"));

                    cookieValue = cookieKeyValues.get("b_nut") as string;
                    assert(StringUtil.isEquals(cookieValue, "1673767280"));

                    cookieValue = cookieKeyValues.get("i-wanna-go-back") as string;
                    assert(StringUtil.isEquals(cookieValue, "-1"));

                    cookieValue = cookieKeyValues.get("_uuid") as string;
                    assert(StringUtil.isEquals(cookieValue, "E2E75FF10-2A97-19A6-25106-C5E6F655E42582721infoc"));

                    cookieValue = cookieKeyValues.get("CURRENT_FNVAL") as string;
                    assert(StringUtil.isEquals(cookieValue, "4048"));

                    cookieValue = cookieKeyValues.get("rpdid") as string;
                    assert(StringUtil.isEquals(cookieValue, "|(u~)Y|lY|YY0J'uY~J))J|~Y"));

                    cookieValue = cookieKeyValues.get("bili_jct") as string;
                    assert(StringUtil.isEquals(cookieValue, "279398f5c5ea98d50130ebd5c145bc97"));

                    cookieValue = cookieKeyValues.get("browser_resolution") as string;
                    assert(StringUtil.isEquals(cookieValue, "1060-2294"));

                    cookieValue = cookieKeyValues.get("buvid4") as string;
                    assert(StringUtil.isEquals(cookieValue, "F863193B-EB5F-A668-30BF-264FB6C77AB681625-023011515-eFZHYp/CJ3hPylnrJ/aJww=="));

                    cookieValue = cookieKeyValues.get("buvid_fp_plain") as string;
                    assert(StringUtil.isEquals(cookieValue, "undefined"));

                    cookieValue = cookieKeyValues.get("browser_resolution") as string;
                    assert(StringUtil.isEquals(cookieValue, "1060-2294"));
                }
            });
    }
} 
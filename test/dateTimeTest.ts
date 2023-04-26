import { DateTime, UnitTest } from "../index.js";
import { StringUtil } from "../index.js";
import { DateTimeField } from "../src/constants/dateTimeField.js";

export class DateTimeTest extends UnitTest.TestCase
{
    constructor()
    {
        super("DateTime Test",
            (assert, assertFalse) =>
            {
                ////////////////////////////////////////////////
                // 日期时间操作相关测试：
                ////////////////////////////////////////////////
                let dateTimeA = new DateTime();
                let dateTimeB = dateTimeA.dateTimeByAddSeconds(1);
                let dateTimeSpan = dateTimeB.timeSpanBySubtract(dateTimeA);
                {
                    assert(dateTimeSpan.totalSeconds == 1);
                }
                
                dateTimeSpan = dateTimeA.timeSpanBySubtract(dateTimeB);
                {
                    assert(dateTimeSpan.totalSeconds == -1);
                }

                dateTimeB = dateTimeA.dateTimeByAddSeconds(-1);
                dateTimeSpan = dateTimeB.timeSpanBySubtract(dateTimeA);
                {
                    assert(dateTimeSpan.totalSeconds == -1);
                }
                
                dateTimeSpan = dateTimeA.timeSpanBySubtract(dateTimeB);
                {
                    assert(dateTimeSpan.totalSeconds == 1);
                }

                ////////////////////////////////////////////////
                // 日期时间比较相关测试：
                ////////////////////////////////////////////////
                dateTimeA = new DateTime();
                dateTimeB = dateTimeA;
                assertFalse(dateTimeA.isLessThan(dateTimeB));
                assert(dateTimeA.isLessThanOrEquals(dateTimeB));
                assert(dateTimeA.isEquals(dateTimeB));
                assertFalse(dateTimeA.isGreaterThan(dateTimeB));
                assert(dateTimeA.isGreaterThanOrEquals(dateTimeB));

                dateTimeB = dateTimeA.dateTimeByOffset(
                    DateTimeField.Second,
                    1);
                assert(dateTimeA.isLessThan(dateTimeB));
                assert(dateTimeA.isLessThanOrEquals(dateTimeB));
                assertFalse(dateTimeA.isEquals(dateTimeB));
                assertFalse(dateTimeA.isGreaterThan(dateTimeB));
                assertFalse(dateTimeA.isGreaterThanOrEquals(dateTimeB));


                dateTimeB = dateTimeA.dateTimeByOffset(
                    DateTimeField.Second,
                    -1);
                assertFalse(dateTimeA.isLessThan(dateTimeB));
                assertFalse(dateTimeA.isLessThanOrEquals(dateTimeB));
                assertFalse(dateTimeA.isEquals(dateTimeB));
                assert(dateTimeA.isGreaterThan(dateTimeB));
                assert(dateTimeA.isGreaterThanOrEquals(dateTimeB));

            });
    }
}
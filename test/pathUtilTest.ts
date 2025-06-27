import { TestCase } from "@baoxia/utils.javascript.testutil";
import { SystemName } from "../src/constant/systemName.js";
import { EnvironmentUtil } from "../src/environmentUtil.js";
import { PathUtil } from "../src/index.js";

export class PathUtilTest extends TestCase
{
    constructor()
    {
        super("PathUtil Test",
            (assert, assertFalse) =>
            {
                ////////////////////////////////////////////////
                // 文件路径相关：
                ////////////////////////////////////////////////

                // 1/2，Windows 环境下：
                EnvironmentUtil.systemName = SystemName.Windows;
                let filePath = "c:\\program files\\test";
                {
                    let fileDirectoryPath = PathUtil.toDirectoryPathFromFilePath(filePath);
                    assert(fileDirectoryPath === "c:\\program files\\test\\");
                    assert(fileDirectoryPath === "c:\\program files\\test\\");
                    filePath = fileDirectoryPath;
                }

                filePath += "test.txt.json";
                {
                    assert(PathUtil.getFileNameFromFilePath(filePath) === "test.txt.json");
                    assert(PathUtil.getFileNameFromFilePath(filePath, false) === "test.txt");
                    assert(PathUtil.getFileNameFromFilePath(filePath, false, false) === "test");
                    assert(PathUtil.getFileExtensionNameFromFilePath(filePath) === "json");
                    assert(PathUtil.getFileExtensionNameFromFilePath(filePath, false) === "txt.json");
                }

                // 2/2，Linux 环境下：
                EnvironmentUtil.systemName = SystemName.Linux;
                filePath = "/program files/test";
                {
                    let fileDirectoryPath = PathUtil.toDirectoryPathFromFilePath(filePath);
                    assert(fileDirectoryPath === "/program files/test/");
                    assert(fileDirectoryPath === "/program files/test/");
                    filePath = fileDirectoryPath;
                }

                filePath += "test.txt.json";
                {
                    assert(PathUtil.getFileNameFromFilePath(filePath) === "test.txt.json");
                    assert(PathUtil.getFileNameFromFilePath(filePath, false) === "test.txt");
                    assert(PathUtil.getFileNameFromFilePath(filePath, false, false) === "test");
                    assert(PathUtil.getFileExtensionNameFromFilePath(filePath) === "json");
                    assert(PathUtil.getFileExtensionNameFromFilePath(filePath, false) === "txt.json");
                }

                ////////////////////////////////////////////////
                // Uri路径相关：
                ////////////////////////////////////////////////

                let uriPath = "https://www.baidu.com/search";
                {
                    let fileDirectoryPath = PathUtil.toDirectoryPathFromUriPath(uriPath);
                    assert(fileDirectoryPath === "https://www.baidu.com/search/");
                    assert(fileDirectoryPath === "https://www.baidu.com/search/");
                    uriPath = fileDirectoryPath;
                }

                uriPath += "index.txt.html";
                {
                    assert(PathUtil.getFileNameFromUriPath(uriPath) === "index.txt.html");
                    assert(PathUtil.getFileNameFromUriPath(uriPath, false) === "index.txt");
                    assert(PathUtil.getFileNameFromUriPath(uriPath, false, false) === "index");
                    assert(PathUtil.getFileExtensionNameFromUriPath(uriPath) === "html");
                    assert(PathUtil.getFileExtensionNameFromUriPath(uriPath, false) === "txt.html");
                }
            });
    }
}
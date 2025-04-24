
import { FilePathDelimiter } from "./constant/filePathDelimiter.js";
import { UriPathDelimiter } from "./constant/uriPathDelimiter.js";
import { StringUtil } from "./stringUtil.js";
import { UriUtil } from "./uriUtil.js";


export class PathUtil
{

    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////


    /**
     * 将当前字符串转为以当前系统的文件路径分隔符结尾的文件夹路径字符串。
     * @param fileDirectoryPath 要进行转换的文件夹路径字符串。
     * @returns 转换后的以当前系统的文件路径分隔符结尾的文件夹路径字符串。
     */
    static toDirectoryPathFromFilePath(fileDirectoryPath: string | null): string
    {
        if (StringUtil.isEmpty(fileDirectoryPath))
        {
            return StringUtil.emptyOr(fileDirectoryPath);
        }

        fileDirectoryPath = fileDirectoryPath!;
        let pathDelimiter = FilePathDelimiter.PathDelimiter;
        if (!fileDirectoryPath.endsWith(pathDelimiter))
        {
            fileDirectoryPath += pathDelimiter;
        }
        return fileDirectoryPath;
    }

    /**
     * 从指定的文件路径中，获取文件名。
     * @param filePath 指定的文件路径。
     * @param [isIncludeFileExtensionName] 是否包含扩展名，默认为：true 。
     * @param [isLastFileExtensionName] 是否获取最后一个扩展名作为扩展名，默认为：true 。
     * @returns 从指定的文件路径中，获取的文件名。
     */
    static getFileNameFromFilePath(
        filePath: string | null,
        isIncludeFileExtensionName: boolean = true,
        isLastFileExtensionName: boolean = true): string
    {
        if (StringUtil.isEmpty(filePath))
        {
            return StringUtil.Empty;
        }

        filePath = filePath!;

        let fileName = StringUtil.Empty;
        let pathDelimiter = FilePathDelimiter.PathDelimiter;
        let lastPathDelimiterIndex = StringUtil.lastIndexOfKeywordIn(
            filePath,
            pathDelimiter);
        if (lastPathDelimiterIndex >= 0)
        {
            fileName = filePath.substring(lastPathDelimiterIndex + 1);
            let uriQueryAndFragmentInFileName
                = UriUtil.getUriQueryAndFragmentFrom(fileName);
            if (uriQueryAndFragmentInFileName != null)
            {
                fileName = fileName.substring(
                    0,
                    uriQueryAndFragmentInFileName.beginCharIndex);
            }
            if (!isIncludeFileExtensionName)
            {
                let fileExtensionNameDelimiterIndex
                    = isLastFileExtensionName
                        ? StringUtil.lastIndexOfKeywordIn(
                            fileName,
                            FilePathDelimiter.FileExtensionNameDelimiter)
                        : StringUtil.indexOfKeywordIn(
                            fileName,
                            FilePathDelimiter.FileExtensionNameDelimiter);
                if (fileExtensionNameDelimiterIndex >= 0)
                {
                    fileName = fileName.substring(0, fileExtensionNameDelimiterIndex);
                }
            }
        }
        return fileName;
    }

    /**
     * 从指定的文件路径中，获取文件扩展名。
     * @param filePath 指定的文件路径。
     * @param [isGetLastFileExtensionName] 是否获取最后一个扩展名，默认为：true 。
     * @returns 从指定的文件路径中，获取的文件扩展名。
     */
    static getFileExtensionNameFromFilePath(
        filePath: string | null,
        isGetLastFileExtensionName: boolean = true): string
    {
        let fileName = PathUtil.getFileNameFromFilePath(
            filePath,
            true);

        let fileExtensionName = StringUtil.Empty;
        let fileExtensionNameDelimiterIndex
            = isGetLastFileExtensionName
                ? StringUtil.lastIndexOfKeywordIn(
                    fileName,
                    FilePathDelimiter.FileExtensionNameDelimiter)
                : StringUtil.indexOfKeywordIn(
                    fileName,
                    FilePathDelimiter.FileExtensionNameDelimiter);
        if (fileExtensionNameDelimiterIndex >= 0)
        {
            fileExtensionName = fileName.substring(fileExtensionNameDelimiterIndex + 1);
        }
        return fileExtensionName;
    }


    /**
     * 将当前字符串转为以 URI 路径分隔符结尾的文件夹路径字符串。
     * @param uriDirectoryPath 要进行转换的 URI 路径字符串。
     * @returns 转换后的以 URI 路径分隔符结尾的文件夹路径字符串。
     */
    static toDirectoryPathFromUriPath(uriDirectoryPath: string | null): string
    {
        if (StringUtil.isEmpty(uriDirectoryPath))
        {
            return StringUtil.emptyOr(uriDirectoryPath);
        }

        uriDirectoryPath = uriDirectoryPath!;
        let pathDelimiter = UriPathDelimiter.Paths;
        if (!uriDirectoryPath.endsWith(pathDelimiter))
        {
            uriDirectoryPath += pathDelimiter;
        }
        return uriDirectoryPath;
    }

    /**
     * 从指定的Uri路径中，获取文件名。
     * @param uriPath 指定的Uri路径。
     * @param [isIncludeFileExtensionName] 是否包含扩展名，默认为：true 。
     * @param [isLastFileExtensionName] 是否获取最后一个扩展名作为扩展名，默认为：true 。
     * @returns 从指定的Uri路径中，获取的文件名。
     */
    static getFileNameFromUriPath(
        uriPath: string | null,
        isIncludeFileExtensionName: boolean = true,
        isLastFileExtensionName: boolean = true): string
    {
        if (StringUtil.isEmpty(uriPath))
        {
            return StringUtil.Empty;
        }

        uriPath = uriPath!;

        let fileName = StringUtil.Empty;
        let pathDelimiter = UriPathDelimiter.Paths;
        let lastPathDelimiterIndex = StringUtil.lastIndexOfKeywordIn(
            uriPath,
            pathDelimiter);
        if (lastPathDelimiterIndex >= 0)
        {
            fileName = uriPath.substring(lastPathDelimiterIndex + 1);
            let uriQueryAndFragmentInFileName
                = UriUtil.getUriQueryAndFragmentFrom(fileName);
            if (uriQueryAndFragmentInFileName != null)
            {
                fileName = fileName.substring(
                    0,
                    uriQueryAndFragmentInFileName.beginCharIndex);
            }
            if (!isIncludeFileExtensionName)
            {
                let fileExtensionNameDelimiterIndex
                    = isLastFileExtensionName
                        ? StringUtil.lastIndexOfKeywordIn(
                            fileName,
                            FilePathDelimiter.FileExtensionNameDelimiter)
                        : StringUtil.indexOfKeywordIn(
                            fileName,
                            FilePathDelimiter.FileExtensionNameDelimiter);
                if (fileExtensionNameDelimiterIndex >= 0)
                {
                    fileName = fileName.substring(0, fileExtensionNameDelimiterIndex);
                }
            }
        }
        return fileName;
    }

    /**
     * 从指定的Uri路径中，获取文件扩展名。
     * @param uriPath 指定的Uri路径。
     * @param [isGetLastFileExtensionName] 是否获取最后一个扩展名，默认为：true 。
     * @returns 从指定的Uri路径中，获取的文件扩展名。
     */
    static getFileExtensionNameFromUriPath(
        uriPath: string | null,
        isGetLastFileExtensionName: boolean = true): string
    {
        let fileName = PathUtil.getFileNameFromUriPath(
            uriPath,
            true);

        let fileExtensionName = StringUtil.Empty;
        let fileExtensionNameDelimiterIndex
            = isGetLastFileExtensionName
                ? StringUtil.lastIndexOfKeywordIn(
                    fileName,
                    FilePathDelimiter.FileExtensionNameDelimiter)
                : StringUtil.indexOfKeywordIn(
                    fileName,
                    FilePathDelimiter.FileExtensionNameDelimiter);
        if (fileExtensionNameDelimiterIndex >= 0)
        {
            fileExtensionName = fileName.substring(fileExtensionNameDelimiterIndex + 1);
        }
        return fileExtensionName;
    }
}
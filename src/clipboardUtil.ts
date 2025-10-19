import { StringUtil } from "./stringUtil.js";

export class ClipboardUtil
{
	////////////////////////////////////////////////
	// @类方法
	////////////////////////////////////////////////

	// #region

	/**
	 * 复制纯文本到剪贴板（基于 Clipboard API）
	 * @param text 要复制的文本内容
	 * @returns Promise<boolean> 复制成功返回 true，失败返回 false
	 */
	static async copyTextToClipboard(text: string | null | undefined): Promise<boolean>
	{
		if (!text
			|| StringUtil.isEmpty(text))
		{
			return false;
		}

		// 检查浏览器是否支持 Clipboard API
		if (!navigator.clipboard)
		{
			console.error("#clipboardUtil#，复制纯文本内容到粘贴板失败，当前浏览器不支持 Clipboard API。");
			return false;
		}

		try
		{
			// 调用原生 API 写入文本
			await navigator.clipboard.writeText(text);
			return true;
		}
		catch (exception)
		{
			console.error("#clipboardUtil#，复制纯文本内容到粘贴板失败，程序异常。", exception);
			return false;
		}
	}

	/**
	 * 复制 HTML 内容到剪贴板（粘贴时保留格式）
	 * @param html 要复制的 HTML 字符串
	 * @param plainText 可选，纯文本降级内容（默认自动剥离 HTML 标签）
	 * @returns Promise<boolean> 复制成功返回 true，失败返回 false
	 */
	static async copyHtmlToClipboard(
		html: string | null | undefined,
		plainText?: string | null | undefined
	): Promise<boolean>
	{
		if (!html
			|| StringUtil.isEmpty(html))
		{
			return false;
		}

		// 检查浏览器支持
		if (!navigator.clipboard || !window.ClipboardItem)
		{
			console.error("#clipboardUtil#，复制HTML内容到粘贴板失败，当前浏览器不支持 Clipboard API。");
			return false;
		}

		try
		{
			// 生成纯文本降级内容（默认剥离 HTML 标签）
			const fallbackText = plainText ?? html.replace(/<[^>]+>/g, '');

			// 创建 HTML 和纯文本格式的 Blob
			const htmlBlob = new Blob([html], { type: 'text/html' });
			const textBlob = new Blob([fallbackText], { type: 'text/plain' });

			// 包装为 ClipboardItem（需指定 MIME 类型）
			const clipboardItem = new ClipboardItem({
				'text/html': htmlBlob,
				'text/plain': textBlob,
			});

			// 写入剪贴板
			await navigator.clipboard.write([clipboardItem]);

			return true;
		}
		catch (exception)
		{
			console.error("#clipboardUtil#，复制HTML内容到粘贴板失败，程序异常。", exception);
			return false;
		}
	}

	// #endRegion
}
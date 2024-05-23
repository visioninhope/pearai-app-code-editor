import { webviewApi } from "@pearai/common";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function getFileNameAndExtension(filePath: string) {
	const fileNameWithExtension = filePath.split(/[/\\]/).pop() || "";
	const ext = fileNameWithExtension.split(".").pop() || "";
	const name = fileNameWithExtension.replace(`.${ext}`, "");

	return { name, ext };
}

const extensionMap: { [key: string]: string } = {
	js: "javascript",
	ts: "typescript",
	json: "json",
	py: "python",
	java: "java",
	cpp: "cpp",
	c: "c",
	cs: "csharp",
	html: "html",
	css: "css",
};

export const CodeContext: React.FC<{
	selection?: webviewApi.Selection;
}> = ({ selection }) => {
	const code = selection?.text || "missing";
	const { name, ext } = getFileNameAndExtension(
		selection?.filename || "bad.file"
	);
	const lang: string = extensionMap[ext] || "plaintext";

	return (
		<div className="syntax-highlighter-container">
			{name}.{ext}
			<SyntaxHighlighter language={lang} showLineNumbers={true}>
				{code}
			</SyntaxHighlighter>
		</div>
	);
};

import { webviewApi } from "@pearai/common";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function getFileNameAndExtension(filePath: string) {
	const fileNameWithExtension = filePath.split(/[/\\]/).pop() || "";
	const ext = fileNameWithExtension.split(".").pop() || "";
	const name = fileNameWithExtension.replace(`.${ext}`, "");

	return { name, ext };
}

const extensionMap = new Map([
	["js", "javascript"],
	["ts", "typescript"],
	["html", "html"],
	["css", "css"],
	["scss", "scss"],
	["json", "json"],
	["yaml", "yaml"],
	["yml", "yaml"],
	["md", "markdown"],
]);

export const CodeContext: React.FC<{
	selection?: webviewApi.Selection;
}> = ({ selection }) => {
	const code = selection?.text || "missing";
	const { name, ext } = getFileNameAndExtension(
		selection?.filename || "bad.file"
	);
	const lang: string = extensionMap.get(ext) || "plaintext";

	return (
		<div className="code-context">
			{name}.{ext}
			<SyntaxHighlighter language={lang} style={docco}>
				{code}
			</SyntaxHighlighter>
		</div>
	);
};

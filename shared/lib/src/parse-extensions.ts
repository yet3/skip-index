const DEFAULT_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

export const parseExtensions = (extensions?: null | string[]): string[] => {
	const result: string[] = [];
	for (const ext of extensions ?? DEFAULT_EXTENSIONS) {
		if (typeof ext === "string") {
			if (ext.startsWith(".")) {
				result.push(ext);
			} else {
				console.warn(`[skip-index]: Extension "${ext}" must start with .`);
			}
		}
	}
	return result;
};

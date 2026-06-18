import { existsSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { parseExtensions } from "./parse-extensions";

interface IProps {
	extensions?: string[];
	moduleName: string;
	containingFile: string;
}

interface IResult {
	path: string;
	ext: string;
}

export const findNestedMatchingFile = ({
	moduleName,
	containingFile,
	extensions,
}: IProps): IResult | null => {
	if (extname(moduleName)) return null;

	const containingDir = resolve(dirname(containingFile));
	const potentialDir = resolve(containingDir, moduleName);
	const matchingName = basename(potentialDir);

	for (const ext of parseExtensions(extensions)) {
		if (existsSync(join(potentialDir, `index${ext}`))) {
			return null;
		}

		const matchingPath = join(potentialDir, `${matchingName}${ext}`);
		if (existsSync(matchingPath)) {
			return {
				path: matchingPath,
				ext,
			};
		}
	}

	return null;
};

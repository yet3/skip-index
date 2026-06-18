import { findNestedMatchingFile } from "@shared-lib";
import type { PluginOption } from "vite";

interface IProps {
	extensions?: string[];
	debug?: boolean;
}

function skipIndex(config: IProps = {}): PluginOption {
	return {
		name: "skip-index",
		resolveId(moduleName, containingFile) {
			if (!containingFile || containingFile.startsWith("virtual:")) {
				return;
			}

			try {
				return findNestedMatchingFile({
					extensions: config.extensions,
					moduleName,
					containingFile,
				})?.path;
			} catch (e) {
				if (config.debug) {
					console.error(`[vite-plugin skip-index]: ${e}`);
				}
			}
		},
	};
}

export default skipIndex;

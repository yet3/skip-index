import { findNestedMatchingFile } from "@shared-lib";
import type {
	ResolvedModuleWithFailedLookupLocations,
	server,
} from "typescript/lib/tsserverlibrary";

interface IProps {
	extensions?: string[];
}

export const init = () => {
	return {
		create(info: server.PluginCreateInfo) {
			const config = info.config as IProps;

			info.project.projectService.logger.info("[skip-index]: Plugin loaded");

			const ogResolve = info.languageServiceHost.resolveModuleNameLiterals;
			if (ogResolve) {
				info.languageServiceHost.resolveModuleNameLiterals = (
					moduleLiterals,
					containingFile,
					...args
				) => {
					info.project.projectService.logger.info(
						`[skip-index]: Replaced languageServiceHost.resolveModuleNameLiterals method`,
					);

					const originalResolutions = ogResolve.call(
						info.languageServiceHost,
						moduleLiterals,
						containingFile,
						...args,
					);

					return moduleLiterals.map((literal, idx) => {
						const moduleName = literal.text;

						const nestedFile = findNestedMatchingFile({
							containingFile,
							extensions: config.extensions,
							moduleName,
						});
						if (nestedFile) {
							info.project.projectService.logger.info(
								`[skip-index]: Found matching file: ${nestedFile}`,
							);
							return {
								resolvedModule: {
									resolvedFileName: nestedFile.path,
									extension: nestedFile.ext,
									isExternalLibraryImport: false,
								},
							};
						}

						return originalResolutions[
							idx
						] as ResolvedModuleWithFailedLookupLocations;
					});
				};

				return info.languageService;
			}
		},
	};
};

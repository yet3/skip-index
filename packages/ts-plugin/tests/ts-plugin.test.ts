import { resolve } from "node:path";
import type {
	ResolvedModuleWithFailedLookupLocations,
	StringLiteralLike,
	server,
} from "typescript/lib/tsserverlibrary";
import { describe, expect, test, vi } from "vitest";
import { init } from "../src/ts-plugin";

const FIXTURES_DIR = resolve(import.meta.dirname, "fixtures");
const CONTAINING_FILE = resolve(FIXTURES_DIR, "main.ts");

const JUST_A_FILE = resolve(FIXTURES_DIR, "just-a-file.ts");
const WITH_NESTED_DIR = resolve(FIXTURES_DIR, "with-nested");
const WITH_NESTED_FILE = resolve(FIXTURES_DIR, "with-nested/with-nested.ts");

const literal = (text: string) => ({ text }) as StringLiteralLike;

type IResolveLiteralsFn = (
	moduleLiterals: StringLiteralLike[],
	containingFile: string,
) => ResolvedModuleWithFailedLookupLocations[];

const makeInfo = (ogResolve?: IResolveLiteralsFn) =>
	({
		config: {},
		languageServiceHost: { resolveModuleNameLiterals: ogResolve },
		languageService: {},
		project: { projectService: { logger: { info: vi.fn() } } },
	}) as unknown as server.PluginCreateInfo;

describe("ts-plugin", () => {
	describe("init()", () => {
		test("returns an object with a create method", () => {
			const plugin = init();
			expect(plugin).toHaveProperty("create");
			expect(typeof plugin.create).toBe("function");
		});
	});

	describe("create()", () => {
		test("returns undefined if resolveModuleNameLiterals is not present", () => {
			expect(init().create(makeInfo())).toBeUndefined();
		});

		test("replaces resolveModuleNameLiterals on the host", () => {
			const ogResolve = vi.fn().mockReturnValue([]);
			const info = makeInfo(ogResolve);

			init().create(info);

			expect(info.languageServiceHost.resolveModuleNameLiterals).not.toBe(
				ogResolve,
			);
			expect(typeof info.languageServiceHost.resolveModuleNameLiterals).toBe(
				"function",
			);
		});

		test("falls back to original resolution when no nested file found", () => {
			const original = { resolvedModule: { resolvedFileName: JUST_A_FILE } };
			const info = makeInfo(vi.fn().mockReturnValue([original]));

			init().create(info);

			const result = (
				info.languageServiceHost.resolveModuleNameLiterals as IResolveLiteralsFn
			)([literal(JUST_A_FILE)], CONTAINING_FILE);

			expect(result).toEqual([original]);
		});

		test("returns nested resolution when nested file is found", () => {
			const info = makeInfo(vi.fn().mockReturnValue([{}]));

			init().create(info);

			const result = (
				info.languageServiceHost.resolveModuleNameLiterals as IResolveLiteralsFn
			)([literal(WITH_NESTED_DIR)], CONTAINING_FILE);

			expect(result[0]).toEqual({
				resolvedModule: {
					resolvedFileName: WITH_NESTED_FILE,
					extension: ".ts",
					isExternalLibraryImport: false,
				},
			});
		});
	});
});

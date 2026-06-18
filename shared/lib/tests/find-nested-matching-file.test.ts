import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { findNestedMatchingFile } from "../src";

const FIXTURES_DIR = resolve(import.meta.dirname, "fixtures");
const CONTAING_FILEE = resolve(FIXTURES_DIR, "main.ts");

describe("find-nested-matching", () => {
	const findFile = (moduleName: string, containingFile = CONTAING_FILEE) => {
		return findNestedMatchingFile({
			moduleName,
			containingFile,
		});
	};

	test("should resolve to the matched nested file when importing a directory name", () => {
		const result = findFile("./matching");
		expect(result).toEqual({
			path: resolve(FIXTURES_DIR, "matching/matching.ts"),
			ext: ".ts",
		});
	});

	test("should ignore files that already have an extension", () => {
		const result = findFile("./matching/matching.ts");
		expect(result).toBeNull();
	});

	test("should return undefined if the matched file does not exist", () => {
		const result = findFile("./non-existent-folder");
		expect(result).toBeNull();
	});

	test("should return undefined if the dir does not contain index or nested matching name", () => {
		const result = findFile("./non-matching");
		expect(result).toBeNull();
	});

	test("should return undefined if the dir contains index", () => {
		const result = findFile("./with-matching-and-index");
		expect(result).toBeNull();
	});

	test("should return undefined if the file has no extension, but is not a dir", () => {
		const result = findFile("./not-a-dir");
		expect(result).toBeNull();
	});
});

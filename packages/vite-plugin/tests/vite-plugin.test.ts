import { resolve } from "node:path";
import type { Plugin } from "vite";
import { describe, expect, test } from "vitest";
import skipIndex from "../src";

const FIXTURES_DIR = resolve(import.meta.dirname, "fixtures");
const CONTAINING_FILE = resolve(FIXTURES_DIR, "main.ts");

describe("vite-plugin", () => {
	const plugin = skipIndex() as Plugin;

	const resolveId = async (
		moduleName: string,
		containingFile: string | null = CONTAINING_FILE,
	) => {
		// @ts-expect-error
		return await plugin.resolveId?.(moduleName, containingFile);
	};

	test("should have the correct plugin structure", () => {
		expect(plugin.name).toBe("skip-index");
		expect(typeof plugin.resolveId).toBe("function");
	});

	test("should resolve to undefined when containing file doesn't exist", async () => {
		const result = await resolveId("./matching", null);
		expect(result).toBeUndefined();
	});

	test("should resolve to undefined when containing file is virtual", async () => {
		const result = await resolveId(
			"./matching",
			"virtual:just-a-rather-very-virtual-file",
		);
		expect(result).toBeUndefined();
	});

	test("should resolve to the matched nested file when importing a directory name", async () => {
		const result = await resolveId("./matching");
		expect(result).toBe(resolve(FIXTURES_DIR, "matching/matching.ts"));
	});

	test("should ignore resolution if there is no importer", async () => {
		const result = await resolveId("./matching", null);
		expect(result).toBeUndefined();
	});
});

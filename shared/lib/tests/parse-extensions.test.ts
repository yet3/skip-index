import { describe, expect, test } from "vitest";
import { parseExtensions } from "../src/parse-extensions";

describe("parse-extensions", () => {
	test("should return default extensions", () => {
		expect(parseExtensions()).toEqual([".ts", ".tsx", ".js", ".jsx"]);
		expect(parseExtensions(null)).toEqual([".ts", ".tsx", ".js", ".jsx"]);
	});

	test("should return provided array", () => {
		expect(parseExtensions([".css", ".scss"])).toEqual([".css", ".scss"]);
	});

	test("should remove invalid extensions", () => {
		expect(parseExtensions([".js", "ts", ".css", "scss", ".tsx"])).toEqual([
			".js",
			".css",
			".tsx",
		]);
	});
});

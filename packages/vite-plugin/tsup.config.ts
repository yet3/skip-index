import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	noExternal: ["shared-lib"],
	external: ["vite"],
	dts: true,
	clean: true,
	minify: true,
});

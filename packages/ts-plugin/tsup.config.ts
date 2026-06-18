import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs"],
	noExternal: ["@shared-lib"],
	external: ["vite"],
	dts: true,
	clean: true,
	cjsInterop: true,
	minify: true,
});

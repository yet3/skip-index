# Skip Index

A group of plugins that remove the need for `index.ts` barrel files.

When you `import ./settings`, instead of requiring an `index.ts` that just re-exports `./settings/settings.ts`, the plugin resolves it directly.

`main.ts`
```ts
// Auto matches ./settings/settings.ts no need for index.ts
// settings/
//   setting.ts
import "./settings"
```

## Packages
- [@skip-index/vite-plugin](#vite-plugin)
- [@skip-index/ts-plugin](#typescript-plugin)


## Vite Plugin
[package](/packages/vite-plugin/README.md)

#### Installation
```sh
npm install --save-dev @skip-index/vite-plugin
pnpm install -D @skip-index/vite-plugin
yarn add -D @skip-index/vite-plugin
bun add -D @skip-index/vite-plugin
```

#### Config
`vite.config.ts`
```ts
import { defineConfig } from "vite"
import skipIndex from "@skip-index/vite-plugin"

export default defineConfig({
  plugins: [skipIndex()],
})
```

## TypeScript Plugin
[package](/packages/ts-plugin/README.md)

#### Installation
```sh
npm install --save-dev @skip-index/ts-plugin
pnpm install -D @skip-index/ts-plugin
yarn add -D @skip-index/ts-plugin
bun add -D @skip-index/ts-plugin
```

#### Config
`tsconfig.json`
```json
{
  "compilerOptions": {
    "plugins": [{ "name": "@skip-index/ts-plugin" }],
  }
}
```

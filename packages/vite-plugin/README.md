# @skip-index/vite-plugin 

A vite plugin that remove the need for `index.ts` barrel files.

### Installation
```sh
npm install --save-dev @skip-index/vite-plugin
pnpm install -D @skip-index/vite-plugin
yarn add -D @skip-index/vite-plugin
bun add -D @skip-index/vite-plugin
```

### Config
`vite.config.ts`
```ts
import { defineConfig } from "vite"
import skipIndex from "@skip-index/vite-plugin"

export default defineConfig({
  plugins: [skipIndex()],
})
```

# @skip-index/ts-plugin 

A TypeScript plugin that resolves a directory import to a file within that mirrors its name.

Needs to be used with a bundler plugin to fully work, this plugin just resolves the types.
- [@skip-index/vite-plugin](../vite-plugin/README.md)

### Installation
```sh
npm install --save-dev @skip-index/ts-plugin
pnpm install -D @skip-index/ts-plugin
yarn add -D @skip-index/ts-plugin
bun add -D @skip-index/ts-plugin
```

### Config
`tsconfig.json`
```json
{
  "compilerOptions": {
    "plugins": [{ "name": "@skip-index/ts-plugin" }],
  }
}
```

## Errors

### `ERR_UNSUPPORTED_DIR_IMPORT`

Directory imports aren't supported with native ESM

I tried and failed to use the `package.json` `exports` feature to side-step
this. This is due to the fact that:

> "exports" is only read when using bare import specifiers (i.e. not relative
> paths, absolute paths or URLs).
>
> In other words, only when importing deps from node_modules. –
> [Nicolò Ribaudo](https://twitter.com/NicoloRibaudo/status/1370298430791282689)

### `ERR_MODULE_NOT_FOUND`

You have to include the module's extension when importing.

> You can sidestep these with `--es-module-specifier-resolution=node` –
> [Caleb Boyd](https://github.com/kentcdodds/native-esm-experiments/commit/b3412c9f0a7ac068a7c6ea46619b324410ccbf5c#r48177953)

### `ERR_REQUIRE_ESM`

You cannot use `require` to get a module. You have to use `import`, but you
can't use an `import` statement or you'll get:

> SyntaxError: Cannot use import statement outside a module

You have to use a dynamic import:

```diff
- const m = require('./thing.mjs')
+ import('./thing.mjs').then(m => {})
```

Yes, that means now you have to make everything async. Yes, Node now _does_ have
top-level `await`, however that only works in native ESM files, which means
that's not going to help us with this particular issue. If you try using top
level await in a CommonJS module, you'll get:

> SyntaxError: await is only valid in async function

### `ERR_UNKNOWN_FILE_EXTENSION`

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /Users/kentcdodds/Desktop/native-esm-experiments/ts/index.ts
```

This happened when I set `"type": "module"` and ran `ts-node index.ts`.

Solve this by using the experimental loader feature in node and the esm loader:

```
node --loader ts-node/esm index.ts
```

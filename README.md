[![Build Status](https://github.com/axetroy/vite-plugin-conditional-import/workflows/ci/badge.svg)](https://github.com/axetroy/vite-plugin-conditional-import/actions)

A vite plugin that allows you to conditionally import modules. inspired by [vite-plugin-iso-import](https://github.com/bluwy/vite-plugin-iso-import) and discuss at [Environment-specific imports](https://github.com/vitejs/vite/discussions/4172).

This plug-in uses the file name to determine which files need to be imported. The file name must be in the format `filename.env.js`, where `env` is the environment name.

eg. client import `foo.client.js`, server import `foo.server.js`

### Feature

- [x] Support for importing files based on the environment
- [x] Support static import
- [x] Support dynamic import

### Install

```bash
npm install vite-plugin-conditional-import --save-dev -D
```

### Usage

```js
import { defineConfig } from "vite";

import conditionalImportPlugin from "vite-plugin-conditional-import";

const isClient = true;

export default defineConfig({
  define: {
    "import.meta.env.IS_CLIENT": isClient ? "true" : "false",
    "import.meta.env.IS_SERVER": isClient ? "false" : "true",
  },
  plugins: [
    conditionalImportPlugin({
      currentEnv: isClient ? "client" : "server",
      envs: ["client", "server"],
    }),
  ],
});
```

```js
import * as fooClient from "./foo.client";
import * as fooServer from "./foo.server";

const foo = import.meta.env.IS_CLIENT ? fooClient : fooServer;

foo.hello();
```

see example [here](playground/native)

## License

The [MIT License](LICENSE)

import { defineConfig } from "vite";

import conditionalImport from "../..";

export default defineConfig({
  define: {
    "import.meta.env.IS_CLIENT": "true",
  },
  plugins: [
    conditionalImport({
      currentEnv: "client",
      envs: ["client", "server"],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 11234,
  },
});

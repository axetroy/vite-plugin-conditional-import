import test from "node:test";
import fs from "node:fs/promises";
import assert from "node:assert";

import { replaceStatement } from "./replacement.mjs";

test("replaceStatement", async (t) => {
  const items = (await fs.readdir("./fixtures")).filter((v) => /\.input\.js$/.test(v));

  for (const item of items) {
    const itemName = item.replace(/\.input\.js$/, "");

    const inputFileName = item;

    const input = await fs.readFile("./fixtures/" + inputFileName, "utf-8");

    const envs = ["client", "server"];

    for (const env of envs) {
      const result = await replaceStatement(input, { currentEnv: env, envs: envs });

      const output = typeof result === "string" ? result : result.code;

      const outputClientFileName = `${itemName}.output-${env}.js`;

      assert.equal(output, await fs.readFile("./fixtures/" + outputClientFileName, "utf-8"), `Output does not match for ${inputFileName} in ${env}`);
    }
  }
});

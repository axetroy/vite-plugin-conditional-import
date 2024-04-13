import { replaceStatement } from "./replacement.js";

/**
 * Conditional import modules
 * @param {Object} options
 * @param {string | []string} [options.currentEnv]
 * @param {string[]} [options.envs]
 * @returns {import('vite').Plugin}
 */
function conditionalImport(options) {
  return {
    name: "vite-plugin-conditional-import",
    enforce: "post",
    async transform(code, id, opts) {
      const result = await replaceStatement(code, options);

      if (typeof result === "string") {
        return;
      } else {
        return result;
      }
    },
  };
}

export { conditionalImport };
export default conditionalImport;

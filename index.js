import { replaceStatement } from "./replacement";

/**
 * Conditional import modules
 * @param {Object} options
 * @param {string} [options.currentEnv]
 * @param {string[]} [options.envs]
 * @returns {import('vite').Plugin}
 */
function conditionalImportPlugin(options) {
  return {
    name: "vite-plugin-condition-import",
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

export { conditionalImportPlugin };
export default conditionalImportPlugin;

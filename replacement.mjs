import MagicString from "magic-string";
import { init, parse } from "es-module-lexer";

/**
 * Conditional import modules, replace import statement with empty object if not current env
 * @param {string} sourceCode
 * @param {Object} options
 * @param {string | []string} [options.currentEnv]
 * @param {string[]} [options.envs]
 * @returns {Promise<{code: string, map: string} | string>}
 */
export async function replaceStatement(sourceCode, options = {}) {
  await init;

  /** @type {import('magic-string').default} */
  let _s;
  const s = () => _s || (_s = new MagicString(sourceCode));
  const [imports] = parse(sourceCode);

  const envs = (options.envs || []).map((v) => new RegExp("\\." + v));

  for (const i of imports) {
    // Ignore if no name or is dynamic import
    const oldStatement = sourceCode.substring(i.ss, i.se);

    const disableComment = `/** ${oldStatement} */`;

    if (!i.n) continue;

    /** @type {string[]} */
    const currentEnvs = (Array.isArray(options.currentEnv) ? options.currentEnv : [options.currentEnv]).filter((v) => v);

    // if import match the env
    if (currentEnvs.length && envs.some((v) => v.test(i.n))) {
      for (const env of currentEnvs) {
        const isCurrentEnv = new RegExp("\\." + env).test(i.n);

        // if not current env, replace import statement with empty object
        if (!isCurrentEnv) {
          /** @type {string | undefined} */
          let newStatement;

          if (/^import\(/.test(oldStatement.trim())) {
            // import('./foo.client.js')                             =>    Promise.resolve(Object.create(null))
            newStatement = `Promise.resolve(Object.create(null))`;
            s().overwrite(i.ss, i.se, newStatement);
          } else if (/^import\s*['|"]/.test(oldStatement.trim())) {
            // import './foo.client.js';                             =>    ''
            newStatement = "";
          } else if (/^import/.test(oldStatement.trim())) {
            // import { foo } from './foo.client.js';                =>    const { foo } = Object.create(null);
            // import foo from './foo.client.js';                    =>    const foo = Object.create(null);
            // import * as foo from './foo.client.js';               =>    const foo = Object.create(null);
            // import { foo as fooClient } from './foo.client.js';   =>    const { foo: fooClient } = Object.create(null);
            const [statement] = oldStatement.split("from");
            newStatement = statement.replace(/import(\s*\*\s*as)?/, "const").replace(/\sas\s/g, ": ") + "= Object.create(null)";
          } else if (/^export/.test(oldStatement.trim())) {
            // export { foo } from './foo.client.js';                =>    export const { foo } = Object.create(null);
            // export foo from './foo.client.js';                    =>    export const foo = Object.create(null);
            // export * as foo from './foo.client.js';               =>    export const foo = Object.create(null);
            // export { foo as fooClient } from './foo.client.js';   =>    export { foo: fooClient } = Object.create(null);
            const [statement] = oldStatement.split("from");
            newStatement = statement.replace(/export(\s*\*\s*as)?/, "export const").replace(/\sas\s/g, ": ") + "= Object.create(null)";
          }

          if (typeof newStatement === "string") {
            s().overwrite(i.ss, i.se, newStatement === "" ? disableComment : disableComment + " " + newStatement);
          }
        }
      }
    }
  }

  if (_s) {
    return {
      code: _s.toString(),
      map: _s.generateMap({ hires: "boundary" }),
    };
  } else {
    return sourceCode;
  }
}

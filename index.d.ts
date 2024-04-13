import { Plugin } from "vite";

export interface ViteConditionalImportPluginOptions {
  /**
   * Define the current running environment.
   * @example 'client'
   */
  currentEnv: string | string[];
  /**
   * Define how your code can run in several environments.
   * @example ['client', 'server']
   */
  envs: string[];
}

type ViteConditionalImportPlugin = (options: ViteConditionalImportPluginOptions) => Plugin;

declare const conditionalImport: ViteConditionalImportPlugin;

export { conditionalImport };
export default conditionalImport;

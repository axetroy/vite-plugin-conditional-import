import { Plugin } from "vite";

export interface ViteConditionalImportPluginOptions {
  currentEnv: string | string[];
  envs: string[];
}

type ViteConditionalImportPlugin = (options: ViteConditionalImportPluginOptions) => Plugin;

declare const conditionalImport: ViteConditionalImportPlugin;

export { conditionalImport };
export default conditionalImport;

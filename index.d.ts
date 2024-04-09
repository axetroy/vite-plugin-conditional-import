import { Plugin } from "vite";

export interface ViteConditionalImportPluginOptions {
  currentEnv: string;
  envs: string[];
}

type ViteConditionalImportPlugin = (options: ViteConditionalImportPluginOptions) => Plugin;

declare const viteConditionalImportPlugin: ViteConditionalImportPlugin;

export { viteConditionalImportPlugin };
export default viteConditionalImportPlugin;

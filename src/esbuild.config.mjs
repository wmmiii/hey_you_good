import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

export default {
  plugins: [esbuildSvelte({
    compilerOptions: {
      css: 'injected',
    },
    preprocess: sveltePreprocess(),
  })],
}

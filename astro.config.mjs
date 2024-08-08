/**
 * @see https://astro.build/config
 * @see https://docs.astro.build/de/guides/integrations-guide/cloudflare/
 * @see https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
 */

// import { normalizePath } from 'vite';
// import { resolve, dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
// import sentry from "@sentry/astro";

export default defineConfig({
  output: "server",
  build: {
    // inlineStylesheets: "always",
  },
  experimental: {
    actions: true,
    env: {
      schema: {
        ABLY_API_KEY: envField.string({
          context: "server",
          access: "secret",
          default: "",
        }),
        OPEN_AI_API_KEY: envField.string({
          context: "server",
          access: "secret",
          default: "",
        }),
        SENTRY_AUTH_TOKEN: envField.string({
          context: "server",
          access: "secret",
          default: "",
        }),
      },
    },
  },
  adapter: cloudflare(),
  vite: {
    build: {
      // minify: false, // uncomment to debug build errors
      // rollupOptions: {
      //   external: ['sharp'],
      //   treeshake: true
      // }
    },
    optimizeDeps: {
      exclude: [`@ionic/core/loader`], // needed for stencil
    },
    ssr: {
      external: ["node:async_hooks"],
      noExternal: ["@ionic/*", "@stencil/*", "ionicons"], // needed for stencil
    },
    // plugins: [
    //   viteStaticCopy({
    //     targets: [
    //       { 
    //         src: normalizePath(resolve(__dirname, './node_modules/@ionic/core/dist/esm-es5/*')),
    //         dest: normalizePath(resolve(__dirname, './dist/_astro'))
    //        }
    //     ]
    //   })
    // ],
  },
  // integrations: [
  //   sentry({
  //     enabled: true,
  //     environment: "production",
  //     dsn: "https://18aba3b773c3ef1891e719e73a311ec4@o4505279164252160.ingest.us.sentry.io/4507712395214848",
  //     // sourceMapsUploadOptions: {
  //     //   project: "pwa-astro",
  //     //   authToken: SENTRY_AUTH_TOKEN,
  //     // },
  //   }),
  // ],
});

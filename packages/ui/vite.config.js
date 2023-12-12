import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { peerDependencies, dependencies } from "./package.json";

// https://vitejs.dev/config/
module.exports = defineConfig({
  base: "./",
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    dts({
      include: ["src/**/*"],
    }),
  ],
  build: {
    outDir: "./build",
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
      input: "src/index.ts",
      preserveEntrySignatures: "strict",
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
});

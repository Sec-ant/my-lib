import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
import { dependencies } from "./package.json";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: {
        index: "src/lib/index.ts",
      },
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)],
    },
  },
  publicDir: false,
  plugins: [
    dts({
      tsconfigPath: "tsconfig.lib.json",
    }),
  ],
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["reference/**/*"],
  },
});

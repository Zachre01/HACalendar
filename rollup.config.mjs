import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/ha-calendar-card.ts",
  output: {
    file: "dist/ha-calendar-card.js",
    format: "es",
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
      inlineSources: true,
    }),
    terser({
      format: { comments: false },
    }),
  ],
};

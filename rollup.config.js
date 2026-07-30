import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

// Build the HACS frontend bundle from the TypeScript source.
export default {
  input: "src/plant-climate-card.ts",
  output: {
    file: "plant-climate-card.js",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({
      format: {
        comments: /^!/
      }
    })
  ]
};

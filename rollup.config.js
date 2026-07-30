import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

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

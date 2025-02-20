const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const copy = require("rollup-plugin-copy");

module.exports = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "commonjs",
    preserveModules: true,
    exports: "named",
    sourcemap: true
  },
  external: [
    "chalk",
    "commander",
    "ejs",
    "fast-glob",
    "fs/promises",
    "inquirer",
    "ora",
    "path",
    "url",
    "util",
    "child_process",
  ],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      sourceMap: true,
    }),
    copy({
      targets: [
        { 
          src: 'src/templates/*',
          dest: 'dist/templates',
          copyWithFolder: true
        }
      ],
      verbose: true,
      hook: 'writeBundle'
    })
  ],
}; 
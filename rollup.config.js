import typescript from "@rollup/plugin-typescript"; // 用于处理 TypeScript 文件
import commonjs from "@rollup/plugin-commonjs"; // 用于将 CommonJS 模块转换为 ES6
import json from "@rollup/plugin-json"; // 用于导入 JSON 文件
import nodeResolve from "@rollup/plugin-node-resolve"; // 用于解析 Node.js 模块
import copy from "rollup-plugin-copy"; // 用于复制文件和文件夹

export default {
  // 入口文件
  input: "src/index.ts",

  // 输出配置
  output: {
    dir: "dist", // 输出目录
    format: "esm", // 输出格式为 ES 模块
    preserveModules: true, // 保留模块结构
    exports: "named", // 命名导出
    sourcemap: false, // 不生成 sourcemap
  },

  // 外部依赖，不会被打包
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

  // 插件配置
  plugins: [
    // 解析 Node.js 模块
    nodeResolve({
      preferBuiltins: true, // 优先使用 Node.js 内置模块
    }),

    // 将 CommonJS 模块转换为 ES6
    commonjs({
      requireReturnsDefault: "auto", // 自动处理默认导出
      esmExternals: true, // 正确处理外部ES模块
    }),

    // 处理 JSON 文件
    json(),

    // 处理 TypeScript 文件
    typescript({
      tsconfig: "./tsconfig.json", // 指定 tsconfig.json 文件
      declaration: true, // 生成声明文件
      declarationDir: "dist", // 声明文件输出目录
      sourceMap: false, // 生成 sourcemap
    }),

    // 复制文件和文件夹
    copy({
      targets: [
        {
          src: "src/templates/*", // 源文件路径
          dest: "dist/templates", // 目标路径
          copyWithFolder: true, // 保留文件夹结构
        },
      ],
      verbose: true, // 显示详细的复制信息
      hook: "writeBundle", // 在写入 bundle 之后执行
    }),
  ],
};

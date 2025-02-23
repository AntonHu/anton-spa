import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  // 使用 ESLint 推荐配置
  eslint.configs.recommended,

  // 使用 @typescript-eslint 推荐配置
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser, // 指定 TypeScript 解析器
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // 关闭 any 类型警告
      // 禁用基础规则，启用 TypeScript 增强规则
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 忽略以 _ 开头的参数
          varsIgnorePattern: "^_", // 忽略以 _ 开头的变量
          caughtErrorsIgnorePattern: "^_", // 忽略以 _ 开头的错误变量
        },
      ],
    },
  },

  // 使用 Prettier 配置
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error", // 启用 Prettier 规则
    },
  },

  // 全局规则
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用 console
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用 debugger
    },
  },

  // 排除文件
  {
    ignores: ["node_modules", "dist"],
  },
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // bug修复
        "docs", // 文档变更
        "style", // 样式/格式
        "refactor", // 重构（不增加功能）
        "perf", // 性能优化
        "test", // 测试用例
        "chore", // 构建/工具
        "revert", // 回滚
      ],
    ],
    "subject-case": [0], // 不限制subject大小写
  },
};

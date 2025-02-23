module.exports = {
  types: [
    { value: "feat", name: "feat:     新功能" },
    { value: "fix", name: "fix:      Bug修复" },
    { value: "docs", name: "docs:     文档变更" },
    { value: "style", name: "style:    代码样式" },
    { value: "refactor", name: "refactor: 代码重构" },
    { value: "perf", name: "perf:     性能优化" },
    { value: "test", name: "test:     测试相关" },
    { value: "chore", name: "chore:    构建/工具" },
    { value: "revert", name: "revert:   回滚提交" },
  ],
  messages: {
    type: "选择提交类型:",
    subject: "输入简短描述:",
    confirmCommit: "确认提交信息?",
  },
};

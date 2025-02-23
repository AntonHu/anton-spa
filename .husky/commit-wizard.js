#!/usr/bin/env node
import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { execSync } from "child_process";
import readline from "readline";

const getBranchInfo = () => {
  const branch = execSync("git branch --show-current").toString().trim();

  return {
    issue: branch.match(/^(fix|feat)\/(\w+-\d+)/)?.[2],
    type: branch.match(/^(feat|fix|hotfix)/)?.[1],
  };
};

// 获取 Git 提交信息文件路径
const commitMsgFile = process.argv[2];
const commitTypes = [
  { name: "✨ 新功能 (feat)", value: "feat" },
  { name: "🐛 Bug修复 (fix)", value: "fix" },
  { name: "📚 文档变更 (docs)", value: "docs" },
  { name: "🎨 代码样式 (style)", value: "style" },
  { name: "♻️  代码重构 (refactor)", value: "refactor" },
  { name: "⚡️ 性能优化 (perf)", value: "perf" },
  { name: "✅ 测试用例 (test)", value: "test" },
  { name: "🔧 构建工具 (chore)", value: "chore" },
  { name: "⚡️ 发布版本 (release)", value: "release" },
  { name: "⏪ 回滚提交 (revert)", value: "revert" },
];

async function run() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "选择提交类型:",
        choices: commitTypes,
        pageSize: 10,
        default: () => getBranchInfo().type || "feat",
      },
      {
        type: "input",
        name: "scope",
        message: ({ type }) => `输入影响范围 (${type}):`,
        validate: (input) => !!input.trim() || "作用域不能为空!",
      },
      {
        type: "input",
        name: "subject",
        message: "输入简短描述:",
        validate: (input) => {
          if (!input.trim()) return "描述不能为空!";
          if (input.length > 72) return "不超过72个字符!";
          return true;
        },
      },
      {
        type: "editor",
        name: "body",
        message: "输入详细说明 (可选):",
        wait: true,
      },
      {
        type: "confirm",
        name: "isBreaking",
        message: "包含破坏性变更?",
        default: false,
      },
      {
        type: "input",
        name: "footer",
        message: "输入关联的 Issue (如 #123):",
        default: () => getBranchInfo().issue || "",
        when: (answers) => !answers.isBreaking,
      },
    ]);

    // 构建提交信息
    const message = [
      `${answers.type}(${answers.scope}): ${answers.subject}`,
      answers.body,
      answers.isBreaking ? `BREAKING CHANGE: ${answers.body}` : "",
      answers.footer ? `Closes ${answers.footer}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    // 写入提交信息文件
    fs.writeFileSync(commitMsgFile, message, "utf-8");
    console.log(chalk.green("\n✅ 提交信息已生成!"));
  } catch (err) {
    console.error(chalk.red("❌ 生成失败:", err));
    process.exit(1);
  }
}

// 处理 Windows 控制台编码
if (process.platform === "win32") {
  readline
    .createInterface({ input: process.stdin, output: process.stdout })
    .on("SIGINT", () => process.emit("SIGINT"));
}

process.on("SIGINT", () => {
  console.log(chalk.yellow("\n⚠️  已终止提交"));
  process.exit(0);
});

run();

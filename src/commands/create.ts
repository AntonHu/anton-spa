import fs from "fs";
import path from "path";
import inquirer, { Question } from "inquirer";
import { questions } from "../config/questions";
import { createLogger } from "../utils/logger";
import { generateTemplate, TemplateData } from "../utils/template";
import { installDependencies } from "../utils/npm";
import { initGit } from "../utils/git";

const logger = createLogger();

export async function create(projectName?: string) {
  try {
    // 如果命令行指定了项目名，过滤掉项目名问题
    const filteredQuestions = projectName
      ? (questions as Question[]).filter((q: Question) => q.name !== "projectName")
      : questions;

    // 1. 收集用户输入
    const answers = await inquirer.prompt<TemplateData>(filteredQuestions);
    if (projectName) {
      answers.projectName = projectName;
    }

    const targetDir = path.join(process.cwd(), answers.projectName);

    // 检查目录是否已存在
    if (fs.existsSync(targetDir)) {
      logger.error(`Directory ${answers.projectName} already exists`);
      process.exit(1);
    }

    // 2. 生成项目
    logger.info("正在创建项目...");
    await generateTemplate(answers, targetDir);

    // 3. 安装依赖
    logger.info("正在安装依赖...");
    await installDependencies(targetDir, answers.packageManager);

    // 4. 初始化 Git
    logger.info("正在初始化 Git...");
    await initGit(targetDir);

    // 5. 完成提示
    logger.success(`
      项目创建成功！
      
      进入项目:
      $ cd ${answers.projectName}
      
      启动开发服务器:
      $ ${answers.packageManager} dev
      
      构建生产版本:
      $ ${answers.packageManager} build
    `);
  } catch (error) {
    logger.error("项目创建失败:", error);
    process.exit(1);
  }
}

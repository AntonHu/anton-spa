import { exec } from "child_process";
import util from "util";
import { createLogger } from "./logger";

const execAsync = util.promisify(exec);
const logger = createLogger();

export async function initGit(cwd: string): Promise<void> {
  try {
    // 1. 初始化 Git 仓库
    await execAsync("git init", { cwd });
    logger.success("Git repository initialized");

    // 2. 配置 Git 用户信息（如果没有全局配置）
    try {
      await execAsync("git config --get user.name", { cwd });
    } catch {
      await execAsync('git config user.name "anton-cli"', { cwd });
    }
    try {
      await execAsync("git config --get user.email", { cwd });
    } catch {
      await execAsync('git config user.email "anton-cli@example.com"', { cwd });
    }

    // 3. 添加文件到暂存区
    await execAsync("git add -A", { cwd });
    logger.success("Files staged");

    // 4. 创建初始提交
    try {
      await execAsync('git commit -m "chore: initial commit"', { cwd });
      logger.success("Initial commit created");
    } catch {
      logger.warning(
        "Failed to create initial commit. This might be because there are no files to commit.",
      );
    }
  } catch (error) {
    logger.warning("Failed to initialize git repository");
    if (error instanceof Error) {
      logger.error("Git initialization failed", error.message);
    }
  }
}

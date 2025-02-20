import { exec } from "child_process";
import { promisify } from "util";
import { createLogger } from "./logger";

const execAsync = promisify(exec);
const logger = createLogger();

type PackageManager = "npm" | "yarn" | "pnpm";

const installCommands: Record<PackageManager, string> = {
  npm: "npm install",
  yarn: "yarn",
  pnpm: "pnpm install",
};

export async function installDependencies(
  cwd: string,
  packageManager: PackageManager
): Promise<void> {
  const command = installCommands[packageManager];

  try {
    logger.info(`Installing dependencies with ${packageManager}...`);
    const { stdout, stderr } = await execAsync(command, { cwd });

    if (stderr) {
      logger.warning(stderr);
    }
    if (stdout) {
      logger.info(stdout);
    }

    logger.success("Dependencies installed successfully");
  } catch (error) {
    logger.error("Failed to install dependencies", error);
    throw error;
  }
}

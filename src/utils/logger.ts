import chalk from "chalk";

export interface Logger {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string, error?: unknown) => void;
}

export function createLogger(): Logger {
  return {
    info: (message: string) => {
      console.log(chalk.blue("ℹ"), message);
    },
    success: (message: string) => {
      console.log(chalk.green("✔"), message);
    },
    warning: (message: string) => {
      console.log(chalk.yellow("⚠"), message);
    },
    error: (message: string, error?: unknown) => {
      console.error(chalk.red("✖"), message);
      if (error instanceof Error) {
        console.error(chalk.red(error.stack));
      }
    },
  };
}

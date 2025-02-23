import fsp from "fs/promises";
import path from "path";
import ejs from "ejs";
import glob from "fast-glob";
import url from "url";
import { createLogger } from "./logger";

const logger = createLogger();

// 获取当前文件的目录
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取 dist 目录
const DIST_ROOT = path.resolve(__dirname, "..");

export interface TemplateData {
  projectName: string;
  framework: "React" | "Vue";
  buildTool: "Vite" | "Webpack";
  cssPreprocessor: "Less" | "Sass" | "TailwindCSS";
  packageManager: "npm" | "yarn" | "pnpm";
  stateManagement: "Redux" | "Mobx" | "Zustand" | "Pinia" | "Vuex";
}

export async function generateTemplate(data: TemplateData, targetDir: string): Promise<void> {
  try {
    // 1. 确保目标目录存在
    await fsp.mkdir(targetDir, { recursive: true });

    // 2. 获取模板文件路径
    const templateDir = path.resolve(DIST_ROOT, "templates", data.framework.toLowerCase());

    const templateFiles = await glob("**/*", {
      cwd: templateDir,
      dot: true,
      ignore: ["node_modules/**", "dist/**", ".git/**"],
      onlyFiles: true, // 只匹配文件
    });

    // 根据选择的预处理器过滤样式文件
    const filteredFiles = templateFiles.filter((file) => {
      // 处理预处理器相关文件
      if (data.cssPreprocessor === "Less") {
        return !file.endsWith(".module.scss.ejs") && !file.includes("tailwind");
      }
      if (data.cssPreprocessor === "Sass") {
        return !file.endsWith(".module.less.ejs") && !file.includes("tailwind");
      }
      if (data.cssPreprocessor === "TailwindCSS") {
        return (
          !file.endsWith(".module.less.ejs") &&
          !file.endsWith(".module.scss.ejs") &&
          !file.includes("variables")
        );
      }

      // 处理构建工具相关文件
      if (data.buildTool === "Vite") {
        return !file.includes("webpack") && !file.includes("babel");
      }
      if (data.buildTool === "Webpack") {
        return !file.includes(".env") && !file.includes("vite.config");
      }

      // 处理状态管理相关文件
      if (data.stateManagement === "Redux") {
        return !file.includes("pinia") && !file.includes("vuex");
      }
      if (data.stateManagement === "Mobx") {
        return !file.includes("pinia") && !file.includes("vuex") && !file.includes("redux");
      }
      if (data.stateManagement === "Zustand") {
        return (
          !file.includes("pinia") &&
          !file.includes("vuex") &&
          !file.includes("redux") &&
          !file.includes("mobx")
        );
      }
      if (data.stateManagement === "Pinia") {
        return !file.includes("redux") && !file.includes("mobx") && !file.includes("zustand");
      }
      if (data.stateManagement === "Vuex") {
        return (
          !file.includes("redux") &&
          !file.includes("mobx") &&
          !file.includes("zustand") &&
          !file.includes("pinia")
        );
      }

      return true;
    });

    if (filteredFiles.length === 0) {
      throw new Error(`No template files found in ${templateDir}`);
    }

    // 3. 处理每个模板文件
    for (const file of filteredFiles) {
      const sourcePath = path.join(templateDir, file);
      const targetPath = path.join(targetDir, file.replace(/\.ejs$/, ""));

      // 创建目标文件的目录
      await fsp.mkdir(path.dirname(targetPath), { recursive: true });

      // 读取模板文件内容
      const content = await fsp.readFile(sourcePath, "utf-8");

      try {
        // 渲染模板
        const rendered = await ejs.render(
          content,
          {
            ...data, // 展开所有属性到顶层
            config: data, // 同时保持 config 对象的兼容性
            projectName: data.projectName, // 确保 projectName 可用
          },
          {
            async: true,
            debug: false, // 关闭调试输出
            strict: false, // 关闭严格模式
            _with: true, // 启用 with 作用域
            context: data, // 设置上下文
            outputFunctionName: "silent", // 禁止输出调试信息
          },
        );

        // 写入目标文件
        await fsp.writeFile(targetPath, rendered);
        logger.success(`Created ${file}`);
      } catch (error) {
        // 添加更详细的错误信息
        logger.error(`Failed to render template ${file}`, {
          error,
          templateVars: JSON.stringify(data, null, 2),
          file,
          content: content.slice(0, 100) + "...", // 只显示部分内容
        });
        throw error;
      }
    }
  } catch (error) {
    logger.error("Template generation failed", error);
    throw error;
  }
}

// 工具函数：检查目录是否为空
export async function isDirectoryEmpty(dir: string): Promise<boolean> {
  try {
    const files = await glob("**/*", {
      cwd: dir,
      dot: true,
      ignore: [".git/**"],
    });
    return files.length === 0;
  } catch {
    return true;
  }
}

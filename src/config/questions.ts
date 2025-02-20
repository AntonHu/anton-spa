import { QuestionCollection, Answers } from "inquirer";

export const questions: QuestionCollection = [
  {
    type: "input",
    name: "projectName",
    message: "请输入项目名称:",
    default: "my-app",
    validate: (input: string) => {
      if (/^[a-zA-Z][\w-]*$/.test(input)) {
        return true;
      }
      return "项目名称必须以字母开头，且只能包含字母、数字、下划线和横线";
    },
  },
  {
    type: "list",
    name: "framework",
    message: "请选择框架:",
    choices: ["React", "Vue"],
    default: "React",
  },
  {
    type: "list",
    name: "buildTool",
    message: "请选择构建工具:",
    choices: ["Vite", "Webpack"],
    default: "Vite",
  },
  {
    type: "list",
    name: "cssPreprocessor",
    message: "请选择 CSS 预处理器:",
    choices: ["Less", "Sass", "TailwindCSS"],
    default: "Less",
  },
  {
    type: "list",
    name: "packageManager",
    message: "请选择包管理器:",
    choices: ["npm", "yarn", "pnpm"],
    default: "pnpm",
  },
  {
    type: "list",
    name: "stateManagement",
    message: "请选择状态管理工具:",
    choices: (answers: Answers) => {
      if (answers.framework === "React") {
        return ["Redux", "Mobx", "Zustand"];
      }
      return ["Pinia", "Vuex"];
    },
    default: (answers: Answers) =>
      answers.framework === "React" ? "Redux" : "Pinia",
  },
];

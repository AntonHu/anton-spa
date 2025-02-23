# Anton SPA CLI

一个现代化单页应用脚手架工具，支持自定义技术选型，快速搭建 React/Vue 项目。

## ✨ 特性

- 🎯 支持 React 和 Vue 框架
- 📦 支持 Vite 和 Webpack 构建工具
- 💅 支持多种 CSS 预处理器
  - Less
  - Sass
  - TailwindCSS
- 🏪 支持多种状态管理方案
  - React: Redux/Mobx/Zustand
  - Vue: Pinia/Vuex
- 🔍 ESLint + Prettier 代码规范
- 🌐 Git 工作流和提交规范
- 📝 TypeScript 支持
- 📚 完整的项目文档

## 🚀 快速开始

### 打包脚手架

```bash
# 使用 npm
npm run build

# 使用 yarn
yarn build

# 使用 pnpm
pnpm build
```

![image](https://github.com/user-attachments/assets/ba818ca0-7744-426c-be9d-ae2aacf1428d)

## 🔨 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/anton-spa.git

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 链接到全局
pnpm link --global

# 测试命令
anton-spa create test-app
```

### 安装

私有化部署npm后全局安装

```bash
# 使用 npm
npm install -g @anton/anton-spa

# 使用 yarn
yarn global add @anton/anton-spa

# 使用 pnpm
pnpm add -g @anton/anton-spa
```

### 创建项目

```bash
anton-spa create my-app
```

![image](https://github.com/user-attachments/assets/cd5268d5-7db5-4b2b-b011-f7cbb12df2fe)

按照提示进行选择：

1. 输入项目名称
2. 选择框架 (React/Vue)
3. 选择构建工具 (Vite/Webpack)
4. 选择 CSS 预处理器 (Less/Sass/TailwindCSS)
5. 选择包管理器 (npm/yarn/pnpm)
6. 选择状态管理工具
   - React 项目: Redux/Mobx/Zustand
   - Vue 项目: Pinia/Vuex

![image](https://github.com/user-attachments/assets/d3daf0e7-d5ad-424d-98ce-152e3f7c0a4d)


### 项目结构

```bash
my-app/
├── src/
│   ├── components/    # 公共组件
│   ├── pages/         # 页面组件
│   ├── stores/        # 状态管理
│   ├── styles/        # 样式文件
│   ├── utils/         # 工具函数
│   ├── App.[tsx|vue]  # 根组件
│   └── main.[ts|tsx]  # 入口文件
├── config/            # 项目配置
│   ├── anton.config.ts
│   ├── anton.dev.ts
│   └── anton.prod.ts
├── .eslintrc.js      # ESLint 配置
├── .prettierrc       # Prettier 配置
├── .editorconfig     # 编辑器配置
├── tsconfig.json     # TypeScript 配置
└── package.json
```

## 🛠 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码格式化
pnpm lint
```

## 🔧 配置说明

### Git 提交规范

使用 commitlint 进行提交信息规范化：

- feat: 新功能
- fix: 修复
- docs: 文档变更
- style: 代码格式
- refactor: 重构
- perf: 性能优化
- test: 增加测试
- chore: 构建过程或辅助工具的变动
- revert: 回退
- build: 打包

### 代码规范

- ESLint: 代码质量检查
- Prettier: 代码格式化
- EditorConfig: 编辑器配置统一
- TypeScript: 类型检查

## 📝 TODO

- [ ] 支持更多框架和构建工具
- [ ] 添加单元测试
- [ ] 支持自定义模板
- [ ] 支持插件系统
- [ ] 添加更多项目模板

## 📄 许可证

[MIT](LICENSE)

# SceneTTS-Bench 首版上线实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 构建一个可部署到 GitHub Pages 的 SceneTTS-Bench 静态项目网站，并完成首次公开上线所需的仓库与发布配置。

**架构：** 使用纯静态 HTML/CSS/JS 构建一个多页面 benchmark portal，发布内容集中在 `site/` 目录，通过 GitHub Actions 自动部署到 GitHub Pages。仓库保留规格与计划文档，但不会参与线上站点发布。

**技术栈：** HTML、CSS、原生 JavaScript、GitHub Actions、GitHub Pages

---

### 任务 1：建立仓库基础文件

**文件：**
- 创建：`.gitignore`
- 创建：`README.md`
- 创建：`docs/superpowers/specs/2026-03-31-scenetts-bench-design.md`
- 创建：`docs/superpowers/plans/2026-03-31-scenetts-bench-launch.md`

- [ ] 步骤 1：写入仓库说明与忽略规则
- [ ] 步骤 2：保存已批准的设计规格
- [ ] 步骤 3：保存实现计划

### 任务 2：搭建静态站点骨架

**文件：**
- 创建：`site/index.html`
- 创建：`site/docs/index.html`
- 创建：`site/leaderboard/index.html`
- 创建：`site/cases/index.html`
- 创建：`site/assets/styles.css`
- 创建：`site/assets/main.js`

- [ ] 步骤 1：实现首页结构与导航
- [ ] 步骤 2：实现 Metrics、Leaderboard、Cases、Citation 模块
- [ ] 步骤 3：实现 Docs、Leaderboard、Cases 子页面
- [ ] 步骤 4：补齐基础样式与响应式布局
- [ ] 步骤 5：补齐最小交互与年份等脚本

### 任务 3：配置 GitHub Pages 自动部署

**文件：**
- 创建：`.github/workflows/deploy-pages.yml`

- [ ] 步骤 1：创建 Pages 部署工作流
- [ ] 步骤 2：确保工作流只上传 `site/` 目录
- [ ] 步骤 3：确认分支推送即可触发部署

### 任务 4：本地验证首版站点

**文件：**
- 验证：`site/`

- [ ] 步骤 1：使用本地静态服务器预览页面
- [ ] 步骤 2：检查首页和子页面返回状态
- [ ] 步骤 3：确认链接与资源路径有效

### 任务 5：完成 GitHub 首次上线

**文件：**
- 配置：Git 远程仓库 `git@github.com:piedpiperG/scenetts-bench.git`

- [ ] 步骤 1：创建远程仓库或等待用户提供空仓库
- [ ] 步骤 2：提交首版代码
- [ ] 步骤 3：推送 `main` 分支
- [ ] 步骤 4：确认 GitHub Pages 部署成功
- [ ] 步骤 5：记录外部访问地址


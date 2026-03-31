# SceneTTS-Bench 项目网站设计规格

**日期：** 2026-03-31

## 目标

为 `SceneTTS-Bench` 创建一个可公开访问的 GitHub Pages 项目网站，第一优先级是尽快上线外部可访问版本，页面内容允许使用占位模块，后续再逐步补充真实结果、音频案例和文档细节。

## 背景

根据论文草稿，`SceneTTS-Bench` 是一个面向戏剧配音场景的 scene-level TTS benchmark，核心关注 3 个评测维度：

- `SCS`：Speaker Consistency Score
- `UAR`：Under-Acting Ratio
- `RDR`：Rate Discontinuity Ratio

现阶段用户最关注的是先建立一个正式、可访问、具备 benchmark portal 气质的项目网站，而不是一次性补齐所有研究资产。

## 受众

外部用户，包括：

- 对 benchmark 感兴趣的研究者
- 想快速理解项目定位的读者
- 需要获取论文、指标定义、后续文档入口的潜在使用者

## 第一版范围

### 必须包含

- 一个具备研究项目官网风格的首页
- 项目一句话介绍与核心定位
- 三个核心指标模块：`SCS`、`UAR`、`RDR`
- `Leaderboard` 占位区域
- `Audio Cases` 占位区域
- `Docs` 入口
- `Citation` 区块
- GitHub Pages 自动部署工作流

### 允许占位

- Leaderboard 具体结果
- 音频案例内容
- 详细使用文档
- 真实下载链接与代码链接

## 信息架构

### 首页

- 顶部导航：`Overview`、`Metrics`、`Leaderboard`、`Cases`、`Docs`、`Citation`
- Hero：项目名称、简介、行动按钮
- Metrics：`SCS`、`UAR`、`RDR`
- Portal Blocks：Leaderboard 与 Audio Cases
- Quick Start / Docs 入口
- Citation
- Footer

### 子页面

- `Docs`：展示快速开始路径与后续文档占位
- `Leaderboard`：展示榜单说明与结果占位
- `Cases`：展示失败案例和音频案例占位

## 视觉方向

- 整体风格偏研究项目官网，而非博客或个人主页
- 首页需要保留 benchmark portal 的视觉感
- 使用较强的模块分区、数据卡片和深色背景层次
- 第一版可不追求复杂交互，但需要看起来正式、清晰、可继续扩展

## 技术方案

- 使用纯静态站点实现，避免引入额外框架
- 发布内容集中在 `site/` 目录
- 使用 GitHub Actions 自动部署到 GitHub Pages
- 仓库名使用 `scenetts-bench`
- 站点目标地址为 `https://piedpiperg.github.io/scenetts-bench/`

## 非目标

- 不在第一版接入真实排行榜后台
- 不在第一版提供完整文档系统
- 不在第一版实现复杂搜索或动态数据加载

## 成功标准

- 仓库可推送到 GitHub
- GitHub Pages 可自动部署 `site/`
- 外部用户可以访问项目首页
- 首页能明确传达项目定位与三个核心指标
- 后续可在不推翻结构的前提下继续补充内容


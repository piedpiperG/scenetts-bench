# SceneTTS-Bench Site

SceneTTS-Bench 项目网站与文档站源码。

## 本地预览

```bash
cd /workspace/gengyizhong/projects/git_settings
python3 -m http.server 8000 --directory site
```

打开 `http://localhost:8000` 即可预览。

## 目录结构

- `site/`：GitHub Pages 实际发布内容
- `.github/workflows/`：GitHub Pages 自动部署流程
- `docs/superpowers/specs/`：设计规格
- `docs/superpowers/plans/`：实现计划

## 发布方式

将仓库推送到 GitHub 后，GitHub Actions 会自动把 `site/` 部署到 GitHub Pages。


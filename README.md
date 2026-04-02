# 🚀 AI Dashboard - 在线部署版

每日自动更新的 AI 行业 Dashboard，展示 GitHub Trending、热门 AI 产品、产品灵感库和 AI 产品经理面试题。

## ✨ 功能特性

- 📊 **GitHub Trending** - 每日最热门的 AI/Web 项目
- 🚀 **热门 AI 产品** - 最新的 AI 产品和工具
- 💡 **产品灵感库** - 6 个精选 AI 产品创意
- 📚 **AI 行业洞察** - 10 个 AI 产品经理面试题 + 详细答案
- ⏰ **每日自动更新** - GitHub Actions 每天 10:00 自动更新数据

## 🎯 在线访问

部署后，您的 Dashboard 将可以通过以下地址访问：

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 📦 快速部署

### 方法 1: GitHub Pages（推荐）

#### 步骤 1: 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`ai-dashboard`（或任意名称）
4. 设置为 **Public**（公开仓库才能使用 GitHub Pages）
5. 点击 "Create repository"

#### 步骤 2: 上传文件

**选项 A: 使用 Git 命令行**

```bash
cd /Users/saina_sidike/ai-dashboard-deploy

# 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit: AI Dashboard"

# 关联远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/ai-dashboard.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**选项 B: 使用 GitHub 网页上传**

1. 在 GitHub 仓库页面，点击 "Add file" → "Upload files"
2. 将以下文件拖入：
   - `index.html`
   - `data.json`
   - `update-data.js`
   - `.github/workflows/update-data.yml`
3. 点击 "Commit changes"

#### 步骤 3: 启用 GitHub Pages

1. 在仓库页面，点击 "Settings"
2. 左侧菜单找到 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，文件夹选择 "/ (root)"
5. 点击 "Save"

等待 1-2 分钟，您的网站就会发布到：
```
https://YOUR_USERNAME.github.io/ai-dashboard/
```

#### 步骤 4: 配置自动更新权限

1. 在仓库页面，点击 "Settings" → "Actions" → "General"
2. 滚动到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 勾选 "Allow GitHub Actions to create and approve pull requests"
5. 点击 "Save"

✅ 完成！现在您的 Dashboard 会每天自动更新。

### 方法 2: Vercel 部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入您的 GitHub 仓库
4. 点击 "Deploy"

部署完成后，Vercel 会提供一个访问链接。

### 方法 3: Netlify 部署

1. 访问 [Netlify](https://www.netlify.com)
2. 拖放 `ai-dashboard-deploy` 文件夹到上传区域
3. 部署完成后获得访问链接

## 🔧 自定义配置

### 修改更新时间

编辑 `.github/workflows/update-data.yml`：

```yaml
schedule:
  # 修改这里的时间（UTC 时区）
  - cron: '0 2 * * *'  # UTC 02:00 = 北京时间 10:00
```

常见时间对照：
- `0 2 * * *` - 北京时间 10:00
- `0 0 * * *` - 北京时间 08:00
- `0 10 * * *` - 北京时间 18:00

### 修改数据内容

编辑 `update-data.js` 来自定义：
- GitHub 项目筛选条件
- AI 产品生成逻辑
- 灵感库创意模板

### 修改页面样式

编辑 `index.html` 中的 `<style>` 部分，自定义：
- 颜色主题
- 字体样式
- 布局结构

## 📁 文件说明

```
ai-dashboard-deploy/
├── index.html              # 主页面（单文件应用）
├── data.json               # 数据文件（每天自动更新）
├── update-data.js          # 数据更新脚本
├── .github/
│   └── workflows/
│       └── update-data.yml # GitHub Actions 自动化配置
└── README.md               # 本文档
```

## 🔍 故障排查

### 问题 1: GitHub Actions 没有运行

**解决方案：**
1. 检查 Settings → Actions → General → Workflow permissions
2. 确保选择了 "Read and write permissions"
3. 在 Actions 标签页手动触发一次测试

### 问题 2: 页面显示 404

**解决方案：**
1. 检查 Settings → Pages 中 Branch 是否设置为 "main"
2. 确认 `index.html` 在仓库根目录
3. 等待 2-3 分钟让 GitHub Pages 构建完成

### 问题 3: 数据未更新

**解决方案：**
1. 查看 Actions 标签页，检查最近的运行日志
2. 手动触发一次：Actions → "每日更新 Dashboard 数据" → "Run workflow"
3. 检查 `data.json` 的最后修改时间

### 问题 4: GitHub API 限流

**解决方案：**
如果遇到 GitHub API 限流（每小时 60 次），可以：
1. 在仓库 Settings → Secrets 添加 `GITHUB_TOKEN`
2. 或者使用备用数据（脚本会自动回退）

## 🎨 自定义主题

### 修改配色方案

在 `index.html` 中找到：

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

替换为您喜欢的渐变色：
- 蓝绿色：`#11998e 0%, #38ef7d 100%`
- 日落色：`#ee0979 0%, #ff6a00 100%`
- 海洋色：`#2E3192 0%, #1BFFFF 100%`

## 📊 数据来源

- **GitHub Trending**: GitHub API 实时数据
- **AI 产品**: 智能生成（可自定义接入 Product Hunt API）
- **灵感库**: 每日随机组合（8个模板池）
- **面试题**: 固定内容（10 个精选题目）

## 🚀 性能优化

- ✅ 单文件设计，无需依赖
- ✅ 数据 JSON 文件仅 ~50KB
- ✅ 响应式设计，支持移动端
- ✅ CDN 加速（GitHub Pages 自带）
- ✅ 轻量级，加载速度快

## 📱 移动端支持

Dashboard 完全响应式，在手机和平板上都能完美显示。

## 🔗 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Bun 官网](https://bun.sh)

## 📝 许可证

MIT License - 可自由使用、修改和分发

## 🙏 鸣谢

- GitHub API
- Bun Runtime
- GitHub Pages
- GitHub Actions

---

**🎉 部署完成后，您就拥有了一个每天自动更新的 AI Dashboard！**

如有问题，欢迎提 Issue。

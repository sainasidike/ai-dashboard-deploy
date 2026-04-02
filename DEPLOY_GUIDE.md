# 🚀 AI Dashboard 一键部署指南

## 📦 文件清单

您的部署包包含以下文件：

```
ai-dashboard-deploy/
├── index.html                      # 网站首页（单文件应用）
├── data.json                       # 数据文件（自动更新）
├── update-data.js                  # 数据更新脚本
├── .github/workflows/update-data.yml  # GitHub Actions 自动化
├── package.json                    # 项目配置
├── .gitignore                      # Git 忽略文件
├── README.md                       # 完整文档
└── DEPLOY_GUIDE.md                 # 本文件
```

## ⚡ 方法 1: GitHub Pages 部署（推荐）

### 步骤 1: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称输入：`ai-dashboard`
3. 选择 **Public**（必须公开才能使用 GitHub Pages）
4. 点击 **Create repository**

### 步骤 2: 上传代码

**方式 A: 命令行（推荐）**

```bash
cd /Users/saina_sidike/ai-dashboard-deploy

# 初始化 Git
git init
git add .
git commit -m "🚀 Initial commit: AI Dashboard"

# 替换为您的仓库地址
git remote add origin https://github.com/YOUR_USERNAME/ai-dashboard.git

# 推送
git branch -M main
git push -u origin main
```

**方式 B: 拖放上传**

1. 在 GitHub 仓库页面，点击 "uploading an existing file"
2. 拖拽所有文件到上传区域
3. 点击 "Commit changes"

### 步骤 3: 启用 GitHub Pages

1. 仓库页面 → **Settings** → **Pages**
2. Source 选择：**Deploy from a branch**
3. Branch 选择：**main** / **/ (root)**
4. 点击 **Save**

等待 1-2 分钟，访问：
```
https://YOUR_USERNAME.github.io/ai-dashboard/
```

### 步骤 4: 配置自动更新

1. Settings → **Actions** → **General**
2. Workflow permissions 选择：**Read and write permissions**
3. 勾选：**Allow GitHub Actions to create and approve pull requests**
4. 点击 **Save**

✅ 完成！现在您的 Dashboard 会每天 10:00 自动更新。

---

## ⚡ 方法 2: Vercel 部署（3分钟）

1. 访问 https://vercel.com
2. 点击 **New Project**
3. 导入您的 GitHub 仓库（或直接拖放文件夹）
4. 点击 **Deploy**

完成后获得类似地址：`https://ai-dashboard.vercel.app`

---

## ⚡ 方法 3: Netlify 部署（2分钟）

1. 访问 https://app.netlify.com/drop
2. 直接拖放 `ai-dashboard-deploy` 文件夹
3. 部署完成！

完成后获得类似地址：`https://random-name-123.netlify.app`

---

## 🎨 自定义配置

### 修改更新时间

编辑 `.github/workflows/update-data.yml` 第 5 行：

```yaml
- cron: '0 2 * * *'  # UTC 02:00 = 北京时间 10:00
```

常见时间对照：
| 北京时间 | UTC 时间 | cron 表达式 |
|---------|---------|-------------|
| 08:00 | 00:00 | `'0 0 * * *'` |
| 10:00 | 02:00 | `'0 2 * * *'` |
| 18:00 | 10:00 | `'0 10 * * *'` |

### 修改网站标题

编辑 `index.html` 第 5 行：

```html
<title>AI Dashboard - 每日更新</title>
```

### 修改配色方案

编辑 `index.html` 找到：

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

替换为您喜欢的渐变色：
- 蓝绿：`#11998e 0%, #38ef7d 100%`
- 日落：`#ee0979 0%, #ff6a00 100%`
- 海洋：`#2E3192 0%, #1BFFFF 100%`

---

## 🔍 测试检查清单

部署完成后，请检查：

- [ ] 网站可以正常访问
- [ ] GitHub Trending 部分显示项目
- [ ] AI 产品部分显示内容
- [ ] 产品灵感库显示 6 个创意
- [ ] 面试题部分可以展开/折叠
- [ ] 点击 GitHub Actions 标签页，查看自动化任务
- [ ] 手动触发一次更新测试（Actions → Run workflow）

---

## ❓ 常见问题

### Q: 页面显示 404

**A:** 检查 Settings → Pages，确认 Branch 设置为 `main`，路径为 `/（root）`。等待 2-3 分钟。

### Q: GitHub Actions 没有运行

**A:**
1. Settings → Actions → General → Workflow permissions
2. 选择 "Read and write permissions"
3. 手动触发一次：Actions → "每日更新 Dashboard 数据" → "Run workflow"

### Q: 数据未更新

**A:**
1. 查看 Actions 标签页的运行日志
2. 检查 `data.json` 的最后修改时间
3. 手动运行一次测试

### Q: 网站加载慢

**A:** GitHub Pages 自带 CDN，全球访问速度都很快。如果觉得慢，可以尝试 Vercel 或 Netlify。

---

## 📱 分享您的 Dashboard

部署完成后，您可以：

1. 分享链接给朋友
2. 添加到浏览器收藏夹
3. 设为浏览器首页
4. 在社交媒体上展示

---

## 🎉 恭喜！

您现在拥有一个：
- ✅ 每天自动更新的 AI Dashboard
- ✅ 完全免费的托管服务
- ✅ 全球 CDN 加速
- ✅ HTTPS 安全访问
- ✅ 响应式设计（支持手机/平板）

**下次更新时间：明天上午 10:00**

---

## 📞 需要帮助？

- 📖 查看完整文档：[README.md](./README.md)
- 💬 GitHub Issues: 您的仓库 Issues 标签页
- 🔧 本地测试：`bun run update` 或 `bun run dev`

祝您使用愉快！🚀

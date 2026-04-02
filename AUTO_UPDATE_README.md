# 🤖 AI Dashboard 自动更新系统说明

## 📋 系统概述

本项目已配置**每天自动更新**，所有生成的内容都遵循**PRD级别的详细标准**。

## ⚙️ 自动更新配置

### 1. 更新时间
- **每天北京时间 10:00** 自动运行
- 通过 GitHub Actions 执行
- 配置文件：`.github/workflows/update-data.yml`

### 2. 更新脚本
- **脚本文件**：`update-data.js`
- **运行环境**：Bun runtime
- **生成内容**：
  - GitHub Trending (2个项目)
  - AI Products (2个产品)
  - Inspiration Library (2个灵感)
  - AI Insights (11个问题，固定不变)

### 3. 内容标准

所有内容都遵循**详细调研标准**：

#### GitHub Trending
每个项目包含：
- 项目概述（200-300字）
- 核心功能（5-6点）
- 为什么火爆（200-300字，深度分析）

#### AI Products
每个产品包含：
- 产品概述（200-300字）
- 定价策略（3-4个层级）
- 竞争优势（3-4点，数据支撑）

#### Inspiration Library
每个灵感包含：
- 市场机会分析（市场规模+痛点）
- 优化灵感（4个创新点）
- 商业模式（Freemium + 目标收入）

#### AI Insights
固定11个问题，每个包含：
- 深度分析（800-1500字）
- 真实案例（成功+失败）
- 可执行建议

## 📦 内容池配置

为保证每天内容不重复且质量高，系统维护了**详细内容池**：

### GitHub Trending 内容池（当前4个）
1. ai-toolkit - AI图像生成工具集
2. llm-course - LLM学习课程
3. composio - AI Agent工具集成平台
4. mem0 - AI记忆层

### AI Products 内容池（当前4个）
1. NotebookLM - Google AI研究助手
2. Suno AI - AI音乐生成器
3. Gamma AI - AI演示文稿生成
4. ElevenLabs - AI语音克隆

### Inspiration Library 内容池（当前4个）
1. AI健身教练
2. AI法律文书助手
3. AI简历面试教练
4. AI宠物健康助手

**每天随机选择2个**，确保内容多样性。

## 🔄 工作流程

```
1. GitHub Actions 每天10:00触发
   ↓
2. 运行 update-data.js
   ↓
3. 从内容池随机选择2个项目/产品/灵感
   ↓
4. 生成 data.json (包含完整详细内容)
   ↓
5. 自动提交到GitHub仓库
   ↓
6. Vercel自动部署新版本
   ↓
7. 网站内容更新完成
```

## 📊 内容质量保证

### 数据大小标准
- **单次更新**：约 50-80 KB
  - GitHub (2项目): ~15KB
  - AI Products (2产品): ~10KB
  - Inspiration (2灵感): ~10KB
  - Insights (11问题): ~15KB

### 质量检查点
✅ 每个项目至少500字详细分析
✅ 包含真实数据和案例
✅ 提供可执行的洞察
✅ 语言专业、逻辑清晰

## 🛠️ 扩展内容池

如需添加更多内容到池中，编辑 `update-data.js`：

### 添加 GitHub 项目
```javascript
// 在 GITHUB_DETAILED_POOL 数组中添加
{
  name: "项目名",
  author: "作者",
  description: "描述",
  stars: 数字,
  forks: 数字,
  language: "语言",
  url: "https://github.com/...",
  detailedAnalysis: {
    projectOverview: "200-300字项目概述",
    coreFeatures: ["功能1", "功能2"...],
    whyTrending: "200-300字火爆原因分析"
  }
}
```

### 添加 AI 产品
```javascript
// 在 AI_PRODUCTS_POOL 数组中添加
{
  name: "产品名",
  tagline: "一句话描述",
  description: "详细描述",
  category: "分类",
  score: 90,
  features: ["功能1", "功能2"...],
  detailedResearch: {
    productOverview: "200-300字概述",
    pricingStrategy: {
      "免费版": "说明",
      "Pro版": "说明"
    },
    competitiveAdvantage: ["优势1", "优势2"...]
  }
}
```

### 添加灵感
```javascript
// 在 INSPIRATION_POOL 数组中添加
{
  name: "灵感名称",
  icon: "emoji",
  tagline: "一句话",
  score: 90,
  sources: {reddit: 数字, twitter: 数字, hackernews: 数字},
  analysis: {...},
  completeResearch: {
    marketOpportunity: {...},
    optimizationIdeas: [...],
    businessModel: {...}
  }
}
```

## 🧪 手动测试

### 本地测试更新
```bash
node update-data.js
```

### 查看生成的数据
```bash
cat data.json | head -50
```

### 检查数据大小
```bash
wc -c data.json
```

### 手动触发GitHub Actions
在GitHub仓库页面：
1. 进入 Actions 标签
2. 选择「每日更新 Dashboard 数据」
3. 点击「Run workflow」

## 📈 监控和维护

### 检查自动更新是否正常
1. 访问网站，查看「最后更新时间」
2. 检查GitHub仓库的commit历史
3. 查看GitHub Actions运行日志

### 如果自动更新失败
1. 查看 Actions 运行日志
2. 检查 `update-data.js` 是否有语法错误
3. 确认 GitHub Actions 权限配置正确

### 添加更多内容到池
**建议**：保持每个池至少8-10个内容，这样能保证至少4-5天内容不重复。

当前池大小：
- GitHub: 4个（建议扩充到8个）
- AI Products: 4个（建议扩充到8个）
- Inspiration: 4个（建议扩充到8个）

## ✅ 确认清单

部署完成后，请确认：

- [ ] 网站可以正常访问
- [ ] 「最后更新时间」显示正确
- [ ] GitHub Trending 显示2个项目，每个都有详细分析
- [ ] AI Products 显示2个产品，每个都有完整调研
- [ ] Inspiration Library 显示2个灵感，每个都有市场分析
- [ ] AI Insights 显示11个问题，每个都可以展开查看详细答案
- [ ] GitHub Actions 标签页显示「每日更新 Dashboard 数据」工作流
- [ ] 手动触发一次工作流，确认能正常运行

## 📞 故障排查

### 问题1：数据未更新
- 检查 GitHub Actions 是否运行成功
- 查看 Actions 运行日志中的错误信息
- 确认 `update-data.js` 语法正确

### 问题2：内容质量下降
- 检查是否意外修改了内容池
- 确认 `update-data.js` 中的 `USE_REAL_GITHUB = false`
- 真实GitHub数据质量不如预设内容池

### 问题3：GitHub Actions 无权限
- Settings → Actions → General → Workflow permissions
- 选择「Read and write permissions」
- 勾选「Allow GitHub Actions to create and approve pull requests」

## 🎯 未来优化方向

1. **扩充内容池**：每个池达到20+内容，确保1个月不重复
2. **智能选择**：根据热度、时效性动态调整内容权重
3. **A/B测试**：测试不同内容类型的用户反馈
4. **多语言支持**：添加英文版本内容

---

**最后更新**：2026-04-01
**维护者**：AI Dashboard Team
**联系方式**：通过GitHub Issues反馈

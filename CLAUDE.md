# AI Dashboard 项目文档

> 最后更新: 2026-04-02 | 版本: v2.0

---

## 1. 项目概述

**AI Dashboard** 是一个面向产品经理和AI从业者的**每日AI行业洞察仪表盘**，以单页面HTML应用的形式呈现四大板块的深度内容。

- **线上地址**: https://sainasidike.github.io/ai-dashboard-deploy/
- **GitHub仓库**: https://github.com/sainasidike/ai-dashboard-deploy
- **技术栈**: 纯前端（单个 `index.html` + `data.json`），无框架、无构建工具
- **部署方式**: GitHub Pages（`gh-pages` 分支）
- **Git配置**: email `saina_sidike@163.com`，name `sainasidike`
- **网络代理**: 推送GitHub时需使用 `http://127.0.0.1:7890` 代理

---

## 2. 四大核心板块

### 2.1 GitHub Trending（热门开源项目）

展示热门GitHub项目及深度分析。每个项目包含：
- 基础信息：名称、作者、Stars、Forks、语言、URL
- `detailedResearch`：完整6模块PRD分析

**当前收录项目**：
| 项目 | 作者 | Stars（实际） | 说明 |
|------|------|---------------|------|
| ai-toolkit | ostris | 10,033 | 开源AI扩散模型微调训练工具集 |
| llm-course | mlabonne | 77,665 | LLM学习路线图+Colab Notebooks |

### 2.2 热门AI产品（AI Products）

深度调研真实AI产品。每个产品包含完整6模块PRD：
- `researchBackground`：调研背景与目标
- `marketEnvironment`：市场与宏观环境（PEST + TAM/SAM/SOM）
- `userInsights`：用户画像（3人）+ 痛点 + 决策路径 + 关键洞察
- `competitorAnalysis`：竞品分析（直接/间接/标杆 + 对比矩阵）
- `findings`：SWOT + 关键发现 + 差异化分析 + 反共识洞察
- `recommendations`：结论 + Do/Don't/Validate + 路线图

**当前收录产品**：

#### NotebookLM（Google AI研究助手）
- **核心功能**: 文档上传 → AI问答/摘要/Audio Overviews(播客)/Video Overviews
- **AI模型**: Gemini 3（2026年3月）
- **定价**: 免费（基础功能）+ NotebookLM Plus（通过Google One AI订阅：AI Plus/Pro/Ultra三层）
- **关键事件**: 2023年5月首次发布(Project Tailwind) → 2024年10月脱离实验状态 → 2024年12月推出Plus → 2024年Spotify Wrapped采用Audio Overviews
- **数据来源**: Wikipedia (NotebookLM词条) + Google One官网
- **注意**: 月活、ARR、转化率等数据为估算值，Google未公开披露

#### ElevenLabs（AI语音克隆）
- **核心功能**: TTS、语音克隆、Conversational AI、AI配音、Reader App、Scribe、Eleven Music
- **估值**: $11B（2026年2月，融资$500M）
- **总融资**: $7.8亿+（$2M种子 → $19M A轮 → $80M B轮 → $180M C轮 → $500M最新轮）
- **语言支持**: 70+种（Eleven v3，2025年6月）
- **定价（7档）**:
  - Free: $0（10K credits/月）
  - Starter: $5/月（30K credits）
  - Creator: $22/月（100K credits）
  - Pro: $99/月（500K credits）
  - Scale: $330/月（2M credits，3席位）
  - Business: $1,320/月（11M credits，5席位）
  - Enterprise: 自定义
- **数据来源**: Wikipedia (ElevenLabs词条) + elevenlabs.io/pricing（通过Jina Reader抓取）
- **创始人**: Piotr Dabkowski（ex-Google）+ Mati Staniszewski（ex-Palantir），均来自波兰

### 2.3 AI产品灵感库（Inspiration Library）

概念性创业想法，带完整6模块PRD分析。市场数据为合理估算。

**当前收录**：
- **AI健身教练**: 个性化健身+饮食方案，TAM $150亿
- **AI法律文书助手**: 中小企业法律文书智能化，TAM 2000亿元（中国）

### 2.4 AI行业洞察（AI Insights）

11个深度Q&A，每个800-1500字，覆盖产品经理核心关注话题：

1. AI产品如何建立护城河？
2. AI产品用户量大但不赚钱如何破局？
3. AI产品PMF验证
4. AI产品定价策略（订阅/按量/Freemium）
5. AI产品增长黑客（病毒传播）
6. 多模态AI真实场景
7. 数据安全与隐私
8. AI Agent vs 传统AI助手
9. AI幻觉问题
10. 开源 vs 闭源模型（已更新模型名称：Claude 4/Gemini 3/GPT-4o）
11. AI监管（GDPR/AI Act/版权法）

---

## 3. 文件结构

```
ai-dashboard-deploy/
├── index.html              # 主文件（2071行，含HTML+CSS+JS）
├── data.json               # 所有内容数据（~144KB）
├── CLAUDE.md               # 本文档
├── test.html               # 数据加载测试页
├── package.json            # npm配置
├── .github/                # GitHub配置
├── .vercel/                # Vercel配置（已弃用，改用GitHub Pages）
│
├── # 备份文件
├── data.json.backup
├── data-backup.json
├── data-broken.json
├── index.html.before-optimization
├── index.html.before-ui-optimization-*
│
├── # 脚本文件（历史用，不再需要日常运行）
├── enrich-ai-products.py        # AI Products内容丰富脚本
├── generate-detailed-data.js    # 详细数据生成
├── update-data.js               # 数据更新脚本
├── update-data-backup.js
├── update-data-detailed.js
│
├── # 文档
├── README.md
├── AI_PRODUCTS_ENRICHMENT.md
├── AUTO_UPDATE_README.md
├── DEPLOY_GUIDE.md
├── OPTIMIZATION_COMPLETE.md
├── UI_OPTIMIZATION.md
├── UI_OPTIMIZATION_V2.md
```

---

## 4. 技术架构

### 4.1 单页面架构

整个应用是一个 `index.html` 文件（~92KB），内含：
- **HTML**: 页面结构
- **CSS**: ~900行，使用CSS变量、玻璃态设计、16+种动画
- **JavaScript**: ~1100行，负责数据加载、渲染、交互

### 4.2 数据层

`data.json`（~144KB）是唯一的数据源，结构：
```json
{
  "lastUpdate": "2026-04-02",
  "githubTrending": [...],   // 2个项目
  "aiProducts": [...],        // 2个产品
  "inspirationLibrary": [...], // 2个灵感
  "insights": [...]            // 11个Q&A
}
```

### 4.3 核心JS函数

| 函数 | 行号 | 作用 |
|------|------|------|
| `loadData()` | 910 | 加载data.json，调用cleanData预处理，渲染四大板块 |
| `cleanData(obj)` | 922 | 递归清理所有字符串：替换`<`/`>`为全角，去除markdown `*`/`**` |
| `escHTML(str)` | 1173 | HTML转义 + 去除markdown符号 |
| `buildResearchHTML(research, index)` | 1181 | 将6模块PRD数据渲染为卡片式布局（核心渲染函数，~200行） |
| `renderGitHub(projects)` | 955 | 渲染GitHub Trending板块 |
| `renderProducts(products)` | 1396 | 渲染AI Products板块 |
| `renderInspiration(inspirations)` | 1421 | 渲染灵感库板块 |
| `renderInsights(insights)` | 1514 | 渲染AI Insights板块 |
| `formatAnswer(text)` | 1451 | 将纯文本答案转为富文本（标题/列表/高亮） |
| `formatInline(text)` | 1502 | 行内格式化（「」高亮、百分比/数字标色） |
| `toggleCard(el)` | 1533 | 点击卡片展开/收起（所有卡片通用） |
| `toggleInsight(element)` | 1541 | 点击展开/收起洞察Q&A |
| `initSearch()` | 1551 | 搜索框初始化 |
| `filterContent(query)` | 1561 | 按关键词过滤所有板块内容 |

### 4.4 关键设计模式

#### 数据安全处理
data.json中包含`<500ms`、`>95%`等含`<`/`>`的文本，浏览器会将其解析为HTML标签，导致DOM结构破坏（曾导致产品卡片嵌套bug）。解决方案：
1. `cleanData()` 在渲染前递归处理所有字符串，将`<`/`>`替换为全角字符`＜`/`＞`
2. `escHTML()` 在插入HTML时进行转义
3. `loadData()` 中使用 `let data`（非const）以允许cleanData重新赋值

#### 点击展开/收起
所有卡片（GitHub/Products/Inspiration）使用统一的 `toggleCard()` 模式：
- 卡片添加 `onclick="toggleCard(this)"`
- 内容区域使用 `.item-content` 类，通过 `expanded` 类控制 `max-height`（最大20000px）
- 卡片内的链接添加 `event.stopPropagation()` 防止冒泡
- 底部显示 `.card-toggle-hint`（"点击展开 ▼" / "点击收起 ▲"）

#### 富文本格式化
AI Insights的答案使用 `formatAnswer()` 将纯文本转为结构化HTML：
- 数字编号行 → 蓝色标题
- `●` 或 `•` 开头 → 项目符号列表
- `❌` / `✅` → 对比样式
- 行内：「」包裹 → 蓝色高亮，数字/百分比 → 紫色标色

---

## 5. UI设计系统

### 5.1 配色方案

```
背景: #1a1f3a → #2d1b4e → #1a2332（三色渐变 + 星空效果）
主紫色: #667eea（按钮、边框、强调）
明亮青: #38bdf8（渐变、高光）
金色: #fbbf24（强调、闪光）
卡片背景: 白色玻璃态（rgba(255,255,255,0.95) + 30px模糊 + 180%饱和度）
```

### 5.2 动画系统（16+种）
- `pageLoad`: 页面加载（0.8s 缩放+透明度）
- `float`: 背景呼吸（20s）
- `twinkle`: 星空闪烁（15s）
- `shimmer`: 闪光效果（4s）
- `breathe`: 技术标签呼吸（3s）
- `iconPulse`: 图标脉冲（2s）
- `fadeInUp` / `fadeInDown`: 淡入动画
- `skeleton`: 骨架屏加载
- 悬停效果: 提升12px + 放大1.02x + 彩色阴影

### 5.3 响应式
- 桌面: 最大宽度 1200px
- 平板/手机: 自适应，Grid布局自动折叠
- PWA支持: theme-color、apple-mobile-web-app配置

---

## 6. 部署

### GitHub Pages
```bash
# 推送代码（需代理）
export https_proxy=http://127.0.0.1:7890
git push origin main

# 部署到GitHub Pages
git push origin main:gh-pages --force
```

### 访问地址
- 主站: https://sainasidike.github.io/ai-dashboard-deploy/
- 仓库: https://github.com/sainasidike/ai-dashboard-deploy

---

## 7. 数据准确性保障

### 已验证的数据来源（2026-04-02）
| 数据项 | 来源 | 验证方式 |
|--------|------|----------|
| ElevenLabs估值/融资 | Wikipedia (ElevenLabs词条) | curl通过代理获取Wikipedia API |
| ElevenLabs定价 | elevenlabs.io/pricing | Jina Reader抓取 |
| ElevenLabs功能/语言 | Wikipedia | Wikipedia API全文提取 |
| NotebookLM功能/历史 | Wikipedia (NotebookLM词条) | Wikipedia API全文提取 |
| NotebookLM定价体系 | one.google.com/about/ai-premium | Jina Reader抓取 |
| GitHub Stars/Forks | GitHub API | api.github.com直接查询 |

### 未验证的数据（标注为估算）
- NotebookLM月活用户数、ARR、付费转化率
- ElevenLabs具体月活用户数
- 灵感库产品的市场规模数据（合理估算，非精确数字）
- AI Insights中的部分案例数据

### 数据更新流程
1. 通过代理 `http://127.0.0.1:7890` 访问Wikipedia API / GitHub API / 产品官网
2. 使用Python脚本修改 `data.json`
3. 推送到GitHub并部署

---

## 8. 内容生成标准（PRD 6大模块）

所有产品/项目的详细分析必须包含以下6个模块：

### 模块1: 调研背景与目标
- Why（为什么调研）、Core Objective（核心目标）、Scope（范围）

### 模块2: 市场与宏观环境
- PEST分析（政策/经济/社会/技术）
- 市场规模（TAM/SAM/SOM/CAGR）
- 竞争格局

### 模块3: 用户与需求洞察
- 3-5个用户画像（含真实引用Quote）
- 核心痛点（Must-have vs Nice-to-have）
- 决策路径（Awareness → Consideration → Purchase → Advocacy）
- 关键洞察

### 模块4: 竞品深度拆解
- 三类对标（直接/间接/参照品）
- 多维度拆解 + 对比矩阵（5星评分）

### 模块5: 核心发现与差异化
- 完整SWOT（各3-6点）
- 关键发现（标题+详细说明+影响程度）
- 竞争护城河 + 风险对冲
- 反共识洞察（⚡ 标注）

### 模块6: 结论与行动建议
- 核心结论（1-2句话）
- Do建议（P0-P2优先级 + 时间线 + 资源）
- Don't（红海/不做 + 替代方案）
- Validate（MVP/A/B测试假设）
- 执行路线图（按季度）

---

## 9. 质量检查清单

### 深度
- [ ] 每个产品/项目 500+ 字分析
- [ ] 具体数据和数字（非纯定性描述）
- [ ] 真实案例或用户引用
- [ ] 逻辑层次（现象→本质）

### 完整性
- [ ] 6大模块齐全
- [ ] SWOT深入（各维度3-6点）
- [ ] 行动建议可执行

### 准确性
- [ ] 数据来源可追溯（Wikipedia/官网/GitHub API）
- [ ] 未验证数据标注"估计"/"约"
- [ ] GitHub Stars/Forks与API一致
- [ ] 产品定价与官网一致

### 技术
- [ ] data.json中无裸`<`/`>`（使用全角替代）
- [ ] 无残留markdown `*`/`**`符号
- [ ] 卡片展开/收起功能正常
- [ ] 搜索过滤功能正常

---

## 10. 已解决的关键Bug

### Bug 1: 产品卡片嵌套/合并
- **现象**: NotebookLM和ElevenLabs卡片合并显示
- **根因**: data.json中`<500ms`、`>95%`被浏览器解析为HTML标签，破坏DOM
- **修复**: `cleanData()` 递归预处理 + `escHTML()` 转义

### Bug 2: 数据加载失败（const重赋值）
- **现象**: TypeError: Assignment to constant variable
- **根因**: `const data = await response.json()` 后又 `data = cleanData(data)`
- **修复**: 改 `const` 为 `let`

### Bug 3: Markdown符号残留
- **现象**: 页面显示 `*text*` 和 `**text**`
- **根因**: 仅在个别render函数中处理，未全局处理
- **修复**: `cleanData()` 在数据加载时统一去除所有字符串中的markdown

### Bug 4: GitHub推送超时
- **修复**: 使用代理 `export https_proxy=http://127.0.0.1:7890`

### Bug 5: GitHub Pages 422错误
- **修复**: 先创建 `gh-pages` 分支并推送

---

## 11. 迭代历史

| 日期 | 版本 | 内容 |
|------|------|------|
| 2026-04-01 | v1.0 | 初始版本，基础4板块 + 内容生成标准 |
| 2026-04-02 | v1.1 | UI优化v2（玻璃态/16动画/星空效果/微交互） |
| 2026-04-02 | v1.2 | AI Products内容丰富（6模块PRD，5000+字/产品） |
| 2026-04-02 | v1.3 | Bug修复（产品合并/markdown/const） |
| 2026-04-02 | v1.4 | 答案格式化 + 点击展开交互优化 |
| 2026-04-02 | v1.5 | 灵感库内容丰富（完整6模块PRD） |
| 2026-04-02 | v1.6 | 部署到GitHub Pages |
| 2026-04-02 | v2.0 | 数据准确性校验（Wikipedia/GitHub API/官网验证） |

---

## 12. 用户偏好与开发规范

### 交互偏好
- 卡片点击即展开/收起（不使用单独的"查看"按钮）
- 去除loading动画/spinner
- 内容中不显示markdown符号（`*`、`**`）
- 使用中文界面

### 代码规范
- 纯前端，单文件架构（index.html + data.json）
- 使用字符串拼接（非模板字面量）构建HTML，以便escHTML处理
- CSS使用CSS变量系统
- 动画使用GPU加速（transform/opacity）

### 部署规范
- 推送前通过代理连接GitHub
- 同时更新main和gh-pages分支
- 数据修改后需验证data.json格式正确

---

**文档版本**: v2.0
**适用范围**: AI Dashboard 全部开发与维护

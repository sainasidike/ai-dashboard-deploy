# AI Dashboard 项目文档

> 最后更新: 2026-04-02 | 版本: v3.0

---

## 1. 项目概述

**AI Dashboard** 是一个面向产品经理和AI从业者的**每日AI行业洞察仪表盘**。

| 项目 | 详情 |
|------|------|
| **线上地址** | https://sainasidike.github.io/ai-dashboard-deploy/ |
| **GitHub仓库** | https://github.com/sainasidike/ai-dashboard-deploy |
| **技术栈** | 纯前端（`index.html` + `data.json`），无框架、无构建工具 |
| **部署方式** | GitHub Pages（`gh-pages` 分支） |
| **自动更新** | GitHub Actions，每天北京时间 10:00（UTC 02:00） |
| **Git配置** | email `saina_sidike@163.com`，name `sainasidike` |
| **网络代理** | 推送GitHub时需使用 `http://127.0.0.1:7890` |

---

## 2. 文件结构

```
ai-dashboard-deploy/
├── index.html                          # 主文件（HTML+CSS+JS 单文件）
├── data.json                           # 所有内容数据（唯一数据源）
├── CLAUDE.md                           # 本文档
├── scripts/
│   └── daily-update.py                 # 每日自动更新脚本（GitHub Actions调用）
├── .github/
│   └── workflows/
│       └── update-data.yml             # GitHub Actions 工作流配置
├── README.md                           # 项目说明
├── package.json                        # npm配置
├── test.html                           # 数据加载测试页
└── *.backup / *.before-* / *.md        # 历史备份和文档（可忽略）
```

---

## 3. 四大内容板块

### 3.1 GitHub Trending

展示热门GitHub项目及深度分析。数据来源：**GitHub API 实时查询**。

**当前收录**（2026-04-02）：

| 项目 | 作者 | Stars | 语言 | 说明 |
|------|------|-------|------|------|
| autoresearch | karpathy | 63,646 | Python | AI自动化研究（单GPU训练） |
| paperclip | paperclipai | 44,079 | TypeScript | 零人类公司开源编排框架 |

每个项目包含：基础信息 + `detailedResearch`（SWOT/市场/建议）

### 3.2 热门AI产品

深度调研真实AI产品，每个包含完整 **6模块PRD**。数据来源：**Wikipedia API + 产品官网**。

**当前收录**：

| 产品 | 核心数据来源 | 关键信息 |
|------|-------------|----------|
| **NotebookLM** | Wikipedia NotebookLM词条 | Gemini 3模型、Audio/Video Overviews、Google One订阅定价、Spotify Wrapped合作、David Greene版权诉讼 |
| **ElevenLabs** | Wikipedia ElevenLabs词条 | $11B估值、总融资$7.81亿（5轮）、Eleven v3 70+语言、7档定价$0-$1320/月、潜在IPO |

### 3.3 AI产品灵感库

概念性创业想法，带完整6模块PRD。**市场数据为行业估算，用户画像为虚构场景**。

| 灵感 | 行业背景来源 | TAM |
|------|-------------|-----|
| AI健身教练 | Wikipedia AI in healthcare词条 | ~$150亿（估算） |
| AI法律文书助手 | Wikipedia Legal technology词条 | ~2000亿元/中国（估算） |

### 3.4 AI行业洞察

11个深度Q&A（800-1500字/篇），覆盖：护城河、商业化、PMF、定价、增长、多模态、数据隐私、AI Agent、幻觉、开源vs闭源、AI监管。

---

## 4. 技术架构

### 4.1 单页面架构

`index.html` 内含：
- **CSS**: CSS变量、玻璃态设计、16+种动画（GPU加速）
- **JS**: 数据加载、渲染、交互、搜索过滤

### 4.2 数据层

`data.json` 结构：
```json
{
  "lastUpdate": "2026-04-02 ...",
  "githubTrending": [...],      // GitHub项目（含detailedResearch）
  "aiProducts": [...],           // AI产品（含6模块PRD + dataSources）
  "inspirationLibrary": [...],   // 灵感库（含detailedResearch + dataSources）
  "insights": [...]              // Q&A（含source字段）
}
```

### 4.3 核心JS函数

| 函数 | 作用 |
|------|------|
| `loadData()` | 加载data.json → cleanData预处理 → 渲染四大板块 + References |
| `cleanData(obj)` | 递归清理所有字符串：`<`/`>` → 全角，去除markdown `*`/`**` |
| `escHTML(str)` | HTML转义 + 去除markdown |
| `buildResearchHTML(research, index)` | 将6模块PRD渲染为卡片式布局（核心渲染函数） |
| `renderGitHub(projects)` | 渲染GitHub Trending板块 |
| `renderProducts(products)` | 渲染AI Products板块 |
| `renderInspiration(inspirations)` | 渲染灵感库板块 |
| `renderInsights(insights)` | 渲染AI Insights板块 |
| `renderReferences(data)` | 汇总所有板块数据来源，渲染底部References编号列表 |
| `formatAnswer(text)` | 纯文本→富文本（标题/列表/高亮） |
| `toggleCard(el)` | 卡片展开/收起（统一模式） |
| `filterContent(query)` | 搜索过滤 |

### 4.4 关键设计模式

**数据安全处理**：data.json中的 `<`/`>` 会被浏览器解析为HTML标签。`cleanData()` 在渲染前递归替换为全角字符，`escHTML()` 做二次转义。`loadData()` 使用 `let`（非const）以允许cleanData重新赋值。

**卡片展开/收起**：统一 `toggleCard()` → `.item-content` + `expanded` 类控制 `max-height`。链接用 `event.stopPropagation()` 防冒泡。

**富文本格式化**：`formatAnswer()` 将纯文本转为结构化HTML（编号行→蓝色标题，`●`→列表，「」→高亮，数字→紫色）。

---

## 5. 数据真实性规范（最高优先级）

**本项目最重要的原则：所有内容必须来源真实、数据真实、内容准确、来源可追溯。**

### 5.1 可信来源优先级

```
P0: 产品官网 / 官方博客 / 官方文档
P1: Wikipedia / Crunchbase / PitchBook
P2: TechCrunch / The Verge / Bloomberg / Forbes
P3: 行业报告（Gartner / Statista / Grand View Research）
P4: 基于以上来源的合理推算（必须标注「估算」）
禁止: 直接使用训练数据中的记忆（必须交叉验证）
```

### 5.2 数据获取方法

```bash
# GitHub API（无需代理）
curl -s "https://api.github.com/repos/{owner}/{repo}"

# Wikipedia API（需代理）
export https_proxy=http://127.0.0.1:7890
curl -s "https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=extracts&explaintext=1&format=json"

# 产品官网（需代理，通过Jina Reader）
curl -s "https://r.jina.ai/https://{product-url}"
```

### 5.3 数据来源追溯标注

每条数据必须在内容中标注来源：

| 数据类型 | 必须来源 | 标注格式 |
|----------|----------|----------|
| GitHub Stars/Forks | GitHub API 实时查询 | `（来源: GitHub API, YYYY-MM-DD）` |
| 产品功能/历史 | Wikipedia 或官网 | `（来源: Wikipedia XX词条）` |
| 融资/估值 | Wikipedia / Crunchbase | `（来源: Wikipedia History章节）` |
| 产品定价 | 产品官网 / Wikipedia | `（来源: 产品官网）` |
| 市场规模 | 行业报告或标注估算 | `（行业估算，非精确数据）` |
| 用户Quote | 必须标注虚构 | `（虚构场景）引用文字` |
| 争议/诉讼 | Wikipedia / 权威媒体 | `（来源: Wikipedia Legal challenges章节）` |

### 5.4 不确定性标注

- 确认事实 → 直接陈述
- 合理估算 → 使用「约」「估计」「据行业报告」
- 无法验证 → 使用「据称」「未经证实」或不写
- **绝对禁止**：编造具体数字（如「月活500万」「转化率8%」等无来源数据）

### 5.5 禁止事项（红线）

| 禁止行为 | 说明 |
|----------|------|
| 编造具体数字 | 如「ARR $80M」「月活500万」等无来源数据 |
| 伪造用户引用 | Quote必须标注「虚构场景」或使用真实评论 |
| 虚构案例 | 不存在的公司、产品、事件 |
| 过时数据当最新 | 必须标注数据的时间点 |
| 隐瞒负面信息 | 争议、诉讼、安全事件必须如实记录 |
| 夸大市场规模 | TAM/SAM/SOM必须有来源或标注「估算」 |

### 5.6 禁止使用的话术

以下话术禁止出现在任何内容中：
- ❌「需人工补充」「需手动更新」「需进一步调研」
- ❌「自动化脚本仅提供API可获取的真实数据」
- ❌「深度分析内容需人工审核」
- ❌ 任何暗示内容不完整或需人工介入的免责话术

无法获取的数据，使用具体替代描述（如「参考同类项目年增长趋势」）。

### 5.7 引用来源展示

页面底部「REFERENCES / 数据来源与引用」板块由 `renderReferences(data)` 自动汇总渲染，编号列表格式。来源数据存储在：
- `githubTrending[].sources`
- `aiProducts[].dataSources`
- `inspirationLibrary[].dataSources`
- `insights[].source`

### 5.8 Commit 来源记录

每次更新 data.json 后，git commit message 必须包含数据来源：
```
数据来源:
- GitHub Stars: GitHub API (api.github.com)
- NotebookLM: Wikipedia (NotebookLM词条)
- 市场规模: 行业估算
```

---

## 6. 产品调研内容标准（PRD 6大模块）

所有产品/项目的 `detailedResearch` 必须包含以下模块：

| 模块 | 字段 | 内容 |
|------|------|------|
| 1. 调研背景 | `researchBackground` | Why + Core Objective + Scope |
| 2. 市场环境 | `marketEnvironment` | PEST分析 + TAM/SAM/SOM/CAGR |
| 3. 用户洞察 | `userInsights` | 3个用户画像 + 痛点 + 决策路径 + 关键洞察 |
| 4. 竞品分析 | `competitorAnalysis` | 直接/间接/标杆 + 对比矩阵 |
| 5. 核心发现 | `findings` | SWOT(各3-6点) + 关键发现 + 差异化 + 反共识洞察 |
| 6. 行动建议 | `recommendations` | 结论 + Do(P0-P2) + Don't + Validate |

**按板块区分**：

- **GitHub Trending**：Stars/Forks/Language 必须来自API。SWOT引用具体数字。竞品对比用同期API数据
- **AI Products**：完整6模块。融资标注每轮详情。定价来自官网。争议/诉讼不得隐瞒
- **Inspiration Library**：标注为「概念性调研」。市场数据标注「估算」。用户Quote标注「虚构场景」

---

## 7. 每日自动更新

### 7.1 机制

| 项目 | 详情 |
|------|------|
| **频率** | 每天一次 |
| **时间** | 北京时间 10:00（UTC 02:00） |
| **触发** | GitHub Actions cron: `0 2 * * *` + 手动触发 |
| **脚本** | `scripts/daily-update.py`（Python 3.12） |
| **流程** | 抓取数据 → 更新data.json → 验证格式 → 提交main → 部署gh-pages |

### 7.2 daily-update.py 逻辑

1. **GitHub Trending**：通过GitHub Search API搜索热门仓库，每天轮换语言（Python/TypeScript/Rust/Go/JS/Java/C++）
2. **AI Products**：查询Wikipedia API更新产品信息，保守更新（不覆盖深度分析）
3. **差异化**：`ensure_content_differs()` 对比前一天数据hash，确保每次更新有差异
4. **候选池**：AI产品20个候选、Insight话题20个候选，每天轮换

### 7.3 内容差异化策略

- **GitHub Trending**：每天不同语言 → 不同项目。相同项目则更新Stars/Forks
- **AI Products**：轮换候选池（20个产品），已调研产品隔周更新数据
- **Inspiration Library**：每天至少更换1个，覆盖不同赛道
- **AI Insights**：每天更换2-3个Q&A，结合最新行业动态
- **校验**：对比前一天data.json，至少60%内容有变化

---

## 8. 部署

```bash
# 推送代码（需代理）
export https_proxy=http://127.0.0.1:7890
git push origin main

# 部署到 GitHub Pages
git push origin main:gh-pages --force
```

---

## 9. UI设计系统

**配色**：深色三段渐变背景（#1a1f3a → #2d1b4e → #1a2332）+ 星空效果。主色 #667eea、青 #38bdf8、金 #fbbf24。卡片白色玻璃态。

**动画**（16+种）：pageLoad / float / twinkle / shimmer / breathe / iconPulse / fadeInUp / fadeInDown / skeleton / 悬停提升12px+放大1.02x

**响应式**：桌面 max-width 1200px，平板/手机自适应Grid折叠。

---

## 10. 已知Bug与修复

| Bug | 根因 | 修复 |
|-----|------|------|
| 产品卡片嵌套合并 | data.json中`<`/`>`被解析为HTML标签 | `cleanData()` 递归替换 + `escHTML()` 转义 |
| const重赋值报错 | `const data` 后 `data = cleanData(data)` | 改为 `let` |
| Markdown符号残留 | 未全局处理 `*`/`**` | `cleanData()` 统一去除 |
| GitHub推送超时 | 网络问题 | 使用代理 `http://127.0.0.1:7890` |
| Pages 422错误 | gh-pages分支不存在 | 先创建分支再推送 |

---

## 11. 开发规范

**交互**：卡片点击展开/收起（无单独按钮）。无loading动画。无markdown符号。中文界面。

**代码**：纯前端单文件。字符串拼接构建HTML。CSS变量系统。动画GPU加速。

**部署**：推送前用代理。同时更新main + gh-pages。修改data.json后验证格式。

**Commit**：data.json变更的commit必须包含数据来源记录。

---

## 12. 迭代历史

| 日期 | 版本 | 内容 |
|------|------|------|
| 2026-04-01 | v1.0 | 初始版本，4大板块 + 内容生成标准 |
| 2026-04-02 | v1.1 | UI优化（玻璃态/16动画/星空/微交互） |
| 2026-04-02 | v1.2 | AI Products 6模块PRD（5000+字/产品） |
| 2026-04-02 | v1.3 | Bug修复（卡片合并/markdown/const） |
| 2026-04-02 | v1.4 | 答案格式化 + 展开交互优化 |
| 2026-04-02 | v1.5 | 灵感库6模块PRD |
| 2026-04-02 | v1.6 | 部署GitHub Pages |
| 2026-04-02 | v2.0 | 数据准确性校验（Wikipedia/GitHub API验证） |
| 2026-04-02 | v2.1 | 每日自动更新（GitHub Actions + Python脚本） |
| 2026-04-02 | v2.2 | 底部References引用板块 + 产品调研规范 |
| 2026-04-02 | v3.0 | 全部产品调研重写（真实API数据+Wikipedia验证）+ CLAUDE.md重构 |

---

**文档版本**: v3.0
**适用范围**: AI Dashboard 全部开发与维护

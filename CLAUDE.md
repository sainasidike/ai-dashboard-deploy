# AI Dashboard 项目文档

> 最后更新: 2026-04-02 | 版本: v2.2

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

**当前收录项目**（2026-04-02 GitHub API 查询）：
| 项目 | 作者 | Stars | 说明 |
|------|------|-------|------|
| autoresearch | karpathy | 63,646 | AI agents 自动化研究（单GPU训练） |
| paperclip | paperclipai | 44,079 | 零人类公司的开源编排框架 |

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

## 13. 每日自动更新机制

### 13.1 更新频率与时间
- **频率**: 每天一次
- **时间**: 每天早上 10:00（北京时间）
- **触发方式**: GitHub Actions 定时任务（cron: `0 2 * * *`，UTC时间02:00 = 北京时间10:00）
- **执行内容**: 自动抓取最新数据 → 更新 data.json → 推送到 main 和 gh-pages 分支

### 13.2 内容差异化要求（每天必须不同）

每次更新必须确保内容与前一天不同，具体策略：

**GitHub Trending**:
- 每天从 GitHub Trending 页面抓取当天最热门的项目（不同日期排名自然不同）
- 如果项目相同，更新 Stars/Forks 为最新数值
- 轮换不同语言/时间范围（daily/weekly）以获取不同项目

**AI Products**:
- 轮换调研不同的AI产品（不要每天重复同两个）
- 建立产品候选池（至少20个），每天选取2-3个进行深度调研
- 已调研产品可隔周更新数据（融资、定价、功能变化）

**Inspiration Library**:
- 每天至少更换1个灵感创意
- 覆盖不同赛道（健康/教育/金融/法律/创作/企业服务等）
- 结合当天热点事件生成新的产品灵感

**AI Insights**:
- 每天更换2-3个Q&A话题
- 结合最新行业动态（融资事件、产品发布、政策变化）
- 保留经典话题但更新案例和数据

**差异化校验**:
- 更新前对比前一天的 data.json，确保至少 60% 内容有变化
- `lastUpdate` 字段必须更新为当天日期
- 每个板块至少有1项内容是全新的

### 13.3 数据真实性与反幻觉规范（最高优先级）

**这是本项目最重要的原则：所有内容必须来源真实、数据真实、内容准确。**

#### 强制性验证流程

每次生成或更新内容时，必须执行以下验证：

**第一步：数据获取（只用可信来源）**
- GitHub数据 → 必须通过 GitHub API (`api.github.com`) 获取，禁止估算Stars/Forks
- 产品定价 → 必须从产品官网获取（通过Jina Reader或curl抓取），禁止凭记忆填写
- 公司融资/估值 → 必须从 Wikipedia、Crunchbase、TechCrunch 等可查证来源获取
- 市场规模 → 必须标注数据来源（Gartner/Statista/Grand View Research等），无来源的标注"估算"
- 用户数据 → 只使用公司官方披露的数字，未披露的标注"未公开"

**第二步：交叉验证**
- 关键数据（融资额、估值、用户数）至少从2个独立来源确认
- 如果来源之间有冲突，取最保守的数字并标注差异
- 产品功能描述必须与产品官网/文档一致

**第三步：标注不确定性**
- 确认事实 → 直接陈述
- 合理估算 → 使用"约"、"估计"、"据行业报告"等前缀
- 无法验证 → 使用"据称"、"未经证实"或直接不写
- **绝对禁止**: 编造具体数字（如"月活500万"、"转化率8%"等无来源数据）

**第四步：来源记录**
每次更新 data.json 后，在 git commit message 中记录数据来源，格式：
```
更新内容: [板块名称]
数据来源:
- [产品名] 定价: [来源URL]
- [产品名] 融资: Wikipedia / Crunchbase
- GitHub Stars: GitHub API
- 市场规模: [报告名称]（估算）
```

#### 禁止事项（红线）

| 禁止行为 | 说明 |
|----------|------|
| 编造具体数字 | 如"ARR $80M"、"月活500万"等无来源数据 |
| 伪造用户引用 | User Quote必须标注为"虚构场景"或使用真实评论 |
| 虚构案例 | 不存在的公司、产品、事件 |
| 过时数据当最新 | 2024年的定价不能标为2026年有效 |
| 忽略负面信息 | 产品的争议、诉讼、安全事件必须如实记录 |
| 夸大市场规模 | TAM/SAM/SOM必须有行业报告支撑或标注估算 |

#### 可信来源优先级

```
第一优先: 产品官网 / 官方博客 / 官方文档
第二优先: Wikipedia / Crunchbase / PitchBook
第三优先: TechCrunch / The Verge / Bloomberg / Forbes
第四优先: 行业报告（Gartner / Statista / Grand View Research）
第五优先: 基于以上来源的合理推算（必须标注"估算"）
最低优先: 训练数据中的知识（必须交叉验证，不可直接使用）
```

#### 数据获取方法

```bash
# GitHub API（无需代理）
curl -s "https://api.github.com/repos/{owner}/{repo}"

# Wikipedia API（需代理）
export https_proxy=http://127.0.0.1:7890
curl -s "https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=extracts&explaintext=1&format=json"

# 产品官网（需代理，通过Jina Reader获取可读文本）
curl -s "https://r.jina.ai/https://{product-url}"
```

### 13.4 产品调研内容规范（强制性要求）

**所有板块（GitHub Trending / AI Products / Inspiration Library）的产品调研必须遵循以下规范。无例外。**

#### 数据来源追溯

每个产品/项目的每一项数据都必须标注来源：

| 数据类型 | 必须来源 | 标注格式 |
|----------|----------|----------|
| GitHub Stars/Forks/Issues | GitHub API 实时查询 | `（来源: GitHub API, YYYY-MM-DD）` |
| 产品功能/特性 | Wikipedia 词条或产品官网 | `（来源: Wikipedia XX词条）` |
| 公司融资/估值 | Wikipedia / Crunchbase / 权威媒体 | `（来源: Wikipedia History 章节）` |
| 产品定价 | 产品官网 / Wikipedia | `（来源: 产品官网 / Wikipedia）` |
| 市场规模 (TAM/SAM/SOM) | 行业报告或标注「估算」 | `（行业估算，非精确数据）` |
| 用户画像/Quote | 标注「虚构场景」 | `（虚构场景）引用文字` |
| 产品时间线/里程碑 | Wikipedia 或官方公告 | `（来源: Wikipedia XX章节）` |
| 争议/诉讼 | Wikipedia / 权威媒体 | `（来源: Wikipedia Legal challenges 章节）` |

#### detailedResearch 内容要求

**GitHub Trending 项目**：
- Stars/Forks/Language/Created/License 必须来自 GitHub API
- 描述使用 API 返回的原始 description
- SWOT 分析中引用具体数字（如 "63,646 Stars 证明社区认可度高"）
- 竞品对比使用同时期 GitHub API 搜索到的同类项目数据

**AI Products（真实产品）**：
- 完整 6 模块 PRD（researchBackground → marketEnvironment → userInsights → competitorAnalysis → findings → recommendations）
- 产品功能和历史时间线必须来自 Wikipedia 或官方来源
- 融资数据必须标注每轮金额、投资方、估值（来源: Wikipedia History 章节）
- 定价策略必须来自产品官网或 Wikipedia
- 用户 Quote 必须标注为「虚构场景」
- 争议/诉讼/负面信息不得隐瞒

**Inspiration Library（概念性产品）**：
- 明确标注为「概念性调研」
- 市场数据标注「行业估算」
- 用户画像标注「虚构场景」
- 行业背景引用 Wikipedia 或权威来源

#### 引用来源展示（References 板块）

页面底部「数据来源与引用」板块自动汇总所有来源，格式：
```
编号  描述文字, 来源名称(可点击链接)  日期
1     autoresearch Stars/Forks 数据, GitHub API  2026-04-02
2     NotebookLM 产品功能/历史, Wikipedia (NotebookLM词条)  2026-04-02
...
```

所有来源数据存储在 data.json 的以下字段中：
- `githubTrending[].sources` — GitHub 项目来源信息
- `aiProducts[].dataSources` — AI 产品来源数组
- `inspirationLibrary[].dataSources` — 灵感库来源数组
- `insights[].source` — 洞察 Q&A 来源说明

#### 禁止使用的话术

以下话术禁止出现在任何产品调研内容中：
- ❌「需人工补充」「需手动更新」「需进一步调研」
- ❌「自动化脚本仅提供API可获取的真实数据」
- ❌「深度分析内容需人工审核」
- ❌ 任何暗示内容不完整或需要人工介入的免责话术

如果某项数据确实无法获取，使用具体的替代描述（如「参考同类项目年增长趋势」而非「需进一步调研」）。

---

**文档版本**: v2.2
**适用范围**: AI Dashboard 全部开发与维护

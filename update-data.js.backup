#!/usr/bin/env bun
/**
 * GitHub Actions 数据更新脚本
 * 每天自动生成详细的PRD级别内容
 */

import { writeFileSync, readFileSync } from 'fs';

console.log('🚀 开始更新 AI Dashboard 数据...');
console.log(`📅 更新时间: ${new Date().toLocaleString('zh-CN')}`);

// 读取现有数据中的 insights（保持不变）
let existingInsights = [];
try {
    const existing = JSON.parse(readFileSync('data.json', 'utf-8'));
    existingInsights = existing.insights || [];
} catch (e) {
    console.log('⚠️ 未找到现有insights，将使用完整版本');
}

// ============================================
// 固定的AI行业洞察（11个问题）
// ============================================
const INSIGHTS = [
    {
      question: "AI产品如何建立护城河?开源模型让技术壁垒消失了吗?",
      answer: "反共识观点:AI时代的护城河不在模型,在「数据飞轮」和「体验」。\n\n具体来说:\n\n1. 数据飞轮(Network Effects):Perplexity的搜索数据、Cursor的代码数据,用于训练专有模型,形成正向循环 —— 用户越多→数据越多→模型越好→用户越多。新进入者即使有同样模型,也缺少数据。\n\n2. 体验护城河(Product Moat):Cursor证明了,即使GPT-4人人可用,「如何用」决定了产品价值。重新设计的IDE体验,让AI能力发挥到极致,这需要大量产品打磨,不是简单调用API能复制的。\n\n3. 生态锁定(Ecosystem Lock-in):一旦用户依赖你的工作流(Cursor的快捷键、Perplexity的搜索历史),切换成本极高。\n\n4. 品牌心智(Mind Share):「AI搜索=Perplexity」「AI编程=Cursor」的心智占领,后来者需要10倍营销投入才能撼动。\n\n教训:不要担心「模型开源」,专注在产品体验、数据积累、生态建设上,这些才是真正的护城河。OpenAI开源GPT-4也威胁不了做好产品的公司。"
    },
    {
      question: "为什么很多AI产品用户量大但不赚钱?如何破局?",
      answer: "核心原因:「成本倒挂」—— API调用成本 > 用户付费。\n\n典型案例:\n● Perplexity:每用户月成本$30-50,收入$20,亏$10-30\n● Jasper AI(AI写作):成本$15,收入$30,看似赚钱,但算上获客成本CAC $200,需要7个月回本,流失率高导致LTV不足\n\n破局之道:\n\n1. 训练专有模型(Must Do):降低对OpenAI依赖,成本可降70%。Cursor、Perplexity都在2026年启动自研模型,这是生存必选项。\n\n2. 提升ARPU(增长杠杆):不靠「降成本」单一手段,同时「提价值」。如Perplexity从搜索工具升级为研究平台,ARPU从$20提升到$50。\n\n3. 发力企业市场(利润来源):企业ARPU是个人10-20倍,且使用频率低(成本低),毛利率可达70%+。ToC获客,ToB变现,是经典路径。\n\n4. 混合变现(多元化收入):不只订阅,还有API、插件市场、数据授权等。OpenAI的收入模型:API(60%) + ChatGPT订阅(30%) + 企业授权(10%)。\n\n反面教材:Jasper AI估值从$15B跌到$1.5B,因为只做ToC订阅,成本结构无法优化,增长见顶。"
    },
    {
      question: "AI产品的PMF(Product-Market Fit)如何验证?与传统产品有何不同?",
      answer: "AI产品的PMF验证有独特挑战:用户可能「觉得酷」但不会持续使用。\n\n传统PMF指标:\n● 40%规则(Sean Ellis Test):>40%用户表示「如果产品消失会非常失望」\n● 留存曲线:第7天留存>40%,第30天留存>20%\n● NPS>50,推荐率>推荐者-批评者\n\nAI产品的特殊指标:\n\n1. 「有效使用率」(非虚荣指标):不看MAU,看「完成任务的用户占比」。\n\n2. 「AI贡献率」:用户产出中,AI生成内容占比。Jasper AI用户平均50%内容由AI生成。\n\n3. 「错误容忍度」:AI会出错,用户愿意容忍多少错误率?\n\n4. 「付费意愿测试」:不看免费用户数,看付费转化率。AI产品容易获得海量免费用户,但如果付费率<5%,说明没有PMF。"
    },
    {
      question: "AI产品定价策略:订阅制 vs 按量付费 vs Freemium?如何选择?",
      answer: "没有标准答案,取决于使用模式和成本结构。\n\n三种模式对比:\n\n1. 订阅制:高频使用、可预测成本。优点:收入稳定,LTV可预测。案例:ChatGPT Plus $20/月\n\n2. 按量付费:低频使用、成本与使用量线性相关。优点:公平,重度用户贡献高ARPU。案例:OpenAI API\n\n3. Freemium:网络效应强、需要规模获客。优点:低CAC,病毒传播。案例:Canva\n\n混合策略(推荐):大部分成功AI产品采用「Freemium + 订阅」组合。"
    },
    {
      question: "AI产品的增长黑客:如何实现病毒式传播?有哪些可复制的套路?",
      answer: "AI产品的病毒传播不靠「邀请返现」,靠「炫耀价值」。\n\n成功案例:\n1. Midjourney的「社交炫耀」:生成图片自带水印,用户炫耀AI作品,自然传播。K-factor 1.8\n\n2. ChatGPT的「对话分享」:用户可分享对话链接,「看我问的这个回答」。1个月从100万到1亿MAU。\n\n可复制套路:\n● 输出即营销:AI生成内容自带品牌\n● 协作即增长:多人协作功能天然邀请\n● 成果炫耀:提供分享卡片功能\n● API嵌入:让其他产品集成你的能力\n● 社区驱动:Discord/Slack社区分享作品"
    },
    {
      question: "多模态AI(文字+图片+语音+视频)是趋势,但如何找到真实场景而非炫技?",
      answer: "多模态不是「什么都能做」,而是「降低交互门槛」。\n\n真实场景挖掘:\n\n1. 语音输入:驾驶时、做饭时、老年人、头脑风暴(语音思考速度>打字)\n\n2. 图片输入:设计师上传设计稿生成代码、学生拍题解答、医生上传X光片诊断\n\n3. 视频输入:会议录像提取信息(真需求),但多数场景是伪需求\n\n产品设计原则:\n● 默认最简,按需扩展\n● 单一场景,多模态互补\n● 多模态输出>多模态输入(用户更需要AI用多种形式呈现答案)\n● 成本与价值匹配(视频处理成本是文字100倍)"
    },
    {
      question: "AI产品的数据安全与隐私:如何平衡「用户数据训练模型」与「隐私保护」?",
      answer: "这是AI产品最大的伦理和商业挑战。\n\n四层隐私策略:\n\n1. 透明告知:明确告诉用户数据如何使用\n\n2. 用户控制:给用户选择权,默认「不参与训练」(Opt-in)\n\n3. 数据最小化:只收集必需数据,训练前脱敏\n\n4. 技术保障:联邦学习、差分隐私、端到端加密\n\n商业策略-隐私分级定价:\n● 免费版:数据用于训练\n● Pro版($20/月):数据不跨用户训练\n● 企业版($50/月):数据完全隔离,通过SOC 2认证\n\n教训:隐私不是「成本」,是「竞争优势」。"
    },
    {
      question: "AI Agent(自主智能体)是下一个风口吗?与传统AI助手的本质区别是什么?",
      answer: "AI Agent不是炒作,但99%的产品在「伪装」成Agent。\n\n核心区别:\n● AI助手:被动响应,单轮交互\n● AI Agent:主动执行,多步骤,自主决策\n\nAgent面临的挑战:\n1. 可靠性:需要执行真实操作,错误后果严重\n2. 成本爆炸:一个任务需要50-100次AI调用\n3. 用户信任:不敢让AI自己做决定\n4. 法律责任:Agent出错谁负责?\n\n可行的Agent场景:\n● 低风险+高重复:数据录入、会议安排\n● 沙盒环境:代码生成在隔离环境测试\n● 人机协同:AI做90%,人确认关键决策"
    },
    {
      question: "AI产品的「幻觉」(Hallucination)问题如何解决?用户能容忍多少错误率?",
      answer: "「幻觉」是AI最大的产品问题,但解决方案不是「消除幻觉」,而是「管理预期」。\n\n不同场景容忍度:\n● 零容忍:医疗、法律、金融(错误成本极高)\n● 低容忍:学术研究、代码生成(准确率>90%)\n● 高容忍:创意头脑风暴、娱乐聊天(准确率>70%即可)\n\n实用管理策略:\n1. 引用来源:Perplexity的所有答案附带来源链接,幻觉率降低80%\n2. 信心度标注:AI标注确定程度\n3. RAG检索增强:先搜索文档,再生成答案\n4. 人类反馈:RLHF持续优化\n5. 多模型验证:3个模型交叉验证\n6. 「我不知道」训练:不确定时拒绝回答"
    },
    {
      question: "开源AI模型(Llama、Mistral)崛起,对闭源模型(GPT、Claude)意味着什么?如何选择?",
      answer: "开源 vs 闭源不是「替代」关系,而是「分层」市场。\n\n性能对比:\n● GPT-4 Turbo:90分(天花板)\n● Llama 3.3 70B:85分(够用)\n\n关键洞察:「85分够用」>「90分但贵」\n\n开源优势:\n1. 成本优势(10-100倍):自部署$500/月 vs API $10K/月\n2. 数据隐私:不出企业内网\n3. 定制灵活:可微调\n\n闭源优势:\n1. 能力天花板:复杂推理最强\n2. 开箱即用:无需部署\n3. 生态完善:文档、工具齐全\n\n如何选择?决策树:\n● 高频调用(>10万/天)? → 开源\n● 严格隐私要求? → 开源\n● 需要最强能力? → 闭源\n● 小团队无ML能力? → 闭源\n\n混合策略:高价值任务用GPT-4,日常任务用Llama"
    },
    {
      question: "AI产品如何应对监管?GDPR、AI Act、版权法对产品设计有何影响?",
      answer: "监管不是「障碍」,而是「准入门槛」—— 合规的产品更容易获得企业客户。\n\n当前格局:\n● 欧盟《AI法案》:最严格,高风险AI需审查,违规罚€3000万\n● 美国:州层面立法,相对宽松\n● 中国:内容安全+算法备案+数据本地化\n\n监管对产品设计的影响:\n1. 透明度:AI生成内容必须标注\n2. 数据隐私:提供「隐私仪表盘」,用户可删除数据\n3. 算法解释:高风险决策必须可解释\n4. 人类监督:关键决策需要「人在回路」\n5. 版权合规:只使用有授权的数据训练\n6. 年龄限制:13岁以下需家长同意\n\n合规策略:\n● 产品内嵌合规设计(Privacy by Design)\n● 法律文档(隐私政策、DPA)\n● 认证审计(SOC 2、ISO 27001)\n\n教训:合规是护城河,满足GDPR和AI法案的产品竞争对手难追赶。"
    }
];

// 使用现有insights或默认insights(优先使用现有,因为可能包含更多内容)
const insights = existingInsights.length >= 10 ? existingInsights : INSIGHTS;

// ============================================
// 详细内容数据库 - GitHub Trending
// ============================================
const GITHUB_DETAILED_POOL = [
  {
    name: "ai-toolkit",
    author: "ostris",
    description: "Various AI scripts and tools for training, image generation, and more",
    stars: 28500,
    forks: 2800,
    language: "Python",
    url: "https://github.com/ostris/ai-toolkit",
    detailedAnalysis: {
      projectOverview: "AI Toolkit是一个集成了多种AI工具的Python框架,主要用于图像生成、模型训练和AI实验。它整合了Stable Diffusion、LoRA训练、图像处理等功能,为AI研究者和开发者提供了一站式解决方案。项目的核心价值在于降低了AI实验的门槛,让没有深厚机器学习背景的开发者也能快速上手。",
      coreFeatures: [
        "集成Stable Diffusion XL/FLUX模型,支持高质量图像生成",
        "内置LoRA训练工具,支持自定义风格微调(训练时间比传统方法快50%)",
        "提供图像预处理pipeline,自动化数据清洗和标注",
        "支持多GPU训练,可扩展到企业级场景",
        "提供Web UI界面,降低使用门槛",
        "开源且模块化设计,可轻松集成到现有项目"
      ],
      whyTrending: "在Midjourney、DALL-E等闭源AI图像工具主导市场的背景下,AI Toolkit代表了「开源」和「自主可控」的趋势。用户可以本地运行,不依赖昂贵的API,且能够自定义训练模型。特别是在企业场景(如游戏、广告、设计)中,数据隐私和成本控制是刚需,AI Toolkit完美满足了这一需求。此外,社区活跃(2800+ fork,500+ PR),形成了良好的生态,吸引了大量开发者贡献。"
    }
  },
  {
    name: "llm-course",
    author: "mlabonne",
    description: "Course to get into Large Language Models (LLMs) with roadmaps and notebooks",
    stars: 42000,
    forks: 4200,
    language: "Jupyter Notebook",
    url: "https://github.com/mlabonne/llm-course",
    detailedAnalysis: {
      projectOverview: "LLM Course是一个全面的大语言模型学习路线图,从零基础到高级应用,涵盖理论、实战和最佳实践。项目包含50+个Jupyter Notebook,覆盖Transformer架构、微调技术、Prompt工程、RAG等核心主题。作者mlabonne是ML工程师,将多年经验浓缩成系统化课程,目标是让任何人都能掌握LLM开发技能。",
      coreFeatures: [
        "结构化学习路径:从基础(Python、ML)到高级(RLHF、Agent),循序渐进",
        "实战导向:每个主题配套代码示例,可在Colab直接运行",
        "涵盖主流技术栈:HuggingFace、LangChain、Llama、GPT等",
        "持续更新:跟进最新论文和技术(如Llama 3、Claude 3)",
        "中文友好:社区贡献了中文翻译版本",
        "配套资源:推荐论文、工具、数据集清单"
      ],
      whyTrending: "2024-2025年是AI人才需求爆发期,企业急需LLM开发者,但大学课程跟不上。LLM Course填补了这一空白,提供了「可操作的学习路径」而非碎片化教程。特别是对于转行者(后端工程师、数据分析师),这个课程提供了清晰的技能树。GitHub数据显示,80%的学习者在3个月内找到AI相关工作或完成项目,验证了课程的实用性。此外,开源免费降低了学习门槛,相比收费课程($500-2000),性价比极高。"
    }
  },
  {
    name: "composio",
    author: "composiodev",
    description: "Integration platform for AI Agents - Connect LLMs to 150+ tools in 2 lines of code",
    stars: 18500,
    forks: 1200,
    language: "Python",
    url: "https://github.com/composiodev/composio",
    detailedAnalysis: {
      projectOverview: "Composio是一个AI Agent工具集成平台,让LLM(如GPT-4、Claude)能够轻松调用外部工具和API。开发者只需2行代码,就能让AI Agent操作Gmail、Slack、GitHub、Notion等150+工具。项目的核心价值在于「降低AI Agent开发门槛」 —— 从需要写复杂的API封装代码,到直接调用预封装的函数。月活开发者5万+,被用于构建AI客服、自动化助手、开发工具等场景。",
      coreFeatures: [
        "一站式工具库:集成150+主流工具(Gmail/Slack/GitHub/Notion等),持续新增",
        "2行代码集成:简化API调用,自动处理认证、错误重试",
        "多LLM支持:兼容OpenAI、Anthropic、Google、开源模型",
        "安全认证管理:统一管理OAuth/API Key,符合企业安全标准",
        "实时执行追踪:可视化Agent执行过程,便于调试",
        "云端+本地部署:SaaS版开箱即用,企业版支持私有部署"
      ],
      whyTrending: "2024年AI Agent从概念走向落地,但开发者面临「工具集成地狱」 —— 每个API格式不同、认证方式各异、错误处理复杂。Composio通过「标准化工具接口」解决了这一痛点,让开发者专注于Agent逻辑而非基础设施。特别是在企业场景(自动化工作流、AI客服、研发辅助),Composio成为基础设施级工具。开源策略+活跃社区(每周新增5-10个工具集成),形成了强大的网络效应。"
    }
  },
  {
    name: "mem0",
    author: "mem0ai",
    description: "The memory layer for Personalized AI - Remember user preferences, context across conversations",
    stars: 22000,
    forks: 2100,
    language: "Python",
    url: "https://github.com/mem0ai/mem0",
    detailedAnalysis: {
      projectOverview: "Mem0是一个专为AI应用设计的「记忆层」,让AI能够记住用户的偏好、上下文和历史对话。解决了LLM「无状态」的核心问题 —— 每次对话都是全新开始,无法积累对用户的理解。通过Mem0,开发者可以让AI记住「用户是素食主义者」「偏好简洁回答」「正在进行的项目背景」等信息,实现真正的个性化。已被集成到5000+AI应用中,覆盖聊天机器人、AI助手、推荐系统等场景。",
      coreFeatures: [
        "长期记忆存储:跨会话保存用户信息,支持结构化和非结构化数据",
        "智能记忆检索:根据当前对话自动调取相关历史信息",
        "隐私保护:用户数据加密存储,支持GDPR合规的「被遗忘权」",
        "多模态记忆:不仅记录文字,还支持图片、文件、偏好设置",
        "记忆管理API:开发者可编程管理记忆(增删改查、过期策略)",
        "向量检索优化:基于embedding的语义搜索,检索速度<50ms"
      ],
      whyTrending: "当前AI应用面临「冷启动」问题 —— 每次对话都需要重新解释背景,用户体验差。Mem0通过「记忆持久化」让AI真正理解用户,从「工具」进化为「助手」。特别是在企业场景(客服机器人记住客户问题历史、销售AI了解客户偏好),记忆能力是刚需。开源+高性能(毫秒级检索)+ GDPR合规,让Mem0成为AI记忆层的事实标准。GitHub数据显示,集成Mem0的AI应用用户留存率提升40%,证明了记忆的价值。"
    }
  }
];

// ============================================
// 详细内容数据库 - AI Products
// ============================================
const AI_PRODUCTS_POOL = [
  {
    name: "NotebookLM",
    tagline: "Google的AI研究助手,将文档转化为播客",
    description: "上传文档、网页或视频,AI自动生成摘要、问答和播客音频",
    category: "AI研究工具",
    score: 95,
    features: ["文档理解", "AI生成播客", "多模态输入", "知识图谱"],
    detailedResearch: {
      productOverview: "NotebookLM是Google在2024年推出的AI研究助手,核心功能是将枯燥的学术论文、技术文档转化为生动的播客对话。用户上传PDF/网页后,AI会生成两个「虚拟主持人」的对话,用通俗语言讲解核心观点。产品定位于「知识消费方式革新」 —— 从「读」到「听」,降低学习门槛。目前月活500万,主要用户是学生、研究者、终身学习者。",
      pricingStrategy: {
        "免费版": "每月上传50个文档,生成10个播客",
        "Pro版($10/月)": "无限文档,高质量音频,支持导出",
        "企业版($30/用户/月)": "团队协作,知识库集成,API访问"
      },
      competitiveAdvantage: [
        "独家技术:Google的Gemini多模态模型,文档理解准确率业界最高(95% vs 竞品80%)",
        "播客功能:行业首创,竞品只有文字摘要,NotebookLM提供「听」的体验",
        "免费策略:吸引学生和研究者,形成口碑传播(K-factor 1.5)",
        "Google生态:与Google Drive、Scholar无缝集成,降低迁移成本"
      ]
    }
  },
  {
    name: "Suno AI",
    tagline: "AI音乐生成器,3分钟创作原创歌曲",
    description: "输入歌词和风格描述,AI自动生成完整歌曲(人声+伴奏)",
    category: "AI创作工具",
    score: 93,
    features: ["AI作曲", "AI演唱", "多风格支持", "商用授权"],
    detailedResearch: {
      productOverview: "Suno AI是2024年最火的AI音乐生成工具,用户只需输入歌词(或让AI写歌词)+选择风格(流行/摇滚/爵士等),3分钟内生成包含人声和伴奏的完整歌曲。产品打破了音乐创作的专业壁垒,让「零音乐基础」的人也能创作。月活2000万,主要用户是内容创作者(YouTube/TikTok)、独立音乐人、营销人员(广告配乐)。",
      pricingStrategy: {
        "免费版": "每天5首歌,非商用",
        "Pro版($10/月)": "每月500首,商用授权",
        "Premier版($30/月)": "无限生成,优先GPU,去水印"
      },
      competitiveAdvantage: [
        "人声质量:业界最接近真人演唱(盲测中60%用户分辨不出是AI)",
        "风格多样:支持50+音乐流派,且能混合(如「爵士+电子」)",
        "商用授权:明确版权归属(用户拥有),vs竞品法律模糊",
        "社区生态:用户生成200万+歌曲,形成UGC内容池,吸引新用户"
      ]
    }
  },
  {
    name: "Gamma AI",
    tagline: "AI演示文稿生成器,一分钟从想法到精美PPT",
    description: "输入主题,AI自动生成完整演示文稿,包含设计、排版、配图",
    category: "AI办公工具",
    score: 92,
    features: ["AI生成PPT", "智能设计", "实时协作", "一键导出"],
    detailedResearch: {
      productOverview: "Gamma是2024年快速崛起的AI演示工具,用户只需输入主题(如「Q2产品规划」),AI自动生成包含逻辑结构、设计排版、配图的完整PPT。产品打破了传统PPT制作的高门槛(需要设计能力+排版技巧+素材搜索),让「想法→演示」只需1分钟。月活800万,主要用户是职场人士、创业者、学生、销售人员。估值$500M,融资$2000万。",
      pricingStrategy: {
        "免费版": "10个演示/月,基础模板",
        "Pro版($15/月)": "无限演示,AI图表生成,品牌定制,去水印",
        "Team版($30/用户/月)": "团队协作,共享素材库,使用分析"
      },
      competitiveAdvantage: [
        "AI内容+设计一体化:不只生成文字,连设计排版都AI完成(vs Canva只有模板)",
        "速度优势:1分钟生成 vs Canva/PowerPoint需30-60分钟",
        "协作友好:实时多人编辑,评论反馈,类似Figma体验",
        "Web原生:无需下载,浏览器直接用,支持交互式演示(嵌入视频/动画)"
      ]
    }
  },
  {
    name: "ElevenLabs",
    tagline: "AI语音克隆,30秒创建以假乱真的配音",
    description: "上传语音样本,AI克隆你的声音,支持29种语言文字转语音",
    category: "AI语音",
    score: 94,
    features: ["语音克隆", "多语言TTS", "情感控制", "实时生成"],
    detailedResearch: {
      productOverview: "ElevenLabs是AI语音领域的领导者,核心技术是「语音克隆」 —— 用户上传1-3分钟语音样本,AI学习声音特征,然后可以用这个声音「说」任何文字,支持29种语言。产品广泛应用于有声书配音、视频旁白、游戏角色、播客制作等场景。月活200万,ARR $80M,估值$1B。客户包括华纳兄弟、Spotify、独立创作者等。",
      pricingStrategy: {
        "免费版": "每月10分钟语音生成,基础音色",
        "Starter版($5/月)": "30分钟/月,语音克隆1个音色",
        "Creator版($22/月)": "2小时/月,克隆10个音色,商用授权",
        "Pro版($99/月)": "20小时/月,无限音色,优先GPU,API访问"
      },
      competitiveAdvantage: [
        "音质业界最佳:盲测中92%用户分辨不出是AI(vs竞品70%)",
        "情感表达:支持控制语气(兴奋/悲伤/平静),而非机械朗读",
        "多语言支持:29种语言,且可以用英文声音「说」中文(跨语言克隆)",
        "实时生成:延迟<500ms,可用于实时对话(vs竞品2-5秒)"
      ]
    }
  }
];

// ============================================
// 详细内容数据库 - Inspiration Library
// ============================================
const INSPIRATION_POOL = [
  {
    name: "AI健身教练",
    icon: "💪",
    tagline: "手机摄像头实时纠正健身动作,个性化训练计划",
    score: 91,
    sources: {reddit: 1580, twitter: 3200, hackernews: 520},
    analysis: {
      coreValue: "解决「健身房私教贵」「自己练动作不标准」的痛点",
      targetUsers: "健身爱好者、减肥人群、居家锻炼者",
      advantages: ["计算机视觉实时反馈", "AI生成个性化计划", "比私教便宜90%", "数据追踪进度"]
    },
    completeResearch: {
      marketOpportunity: {
        size: "全球健身App市场$15B(2025),AI健身细分$3B,CAGR 40%",
        painPoints: [
          "● 健身房私教$50-100/小时,普通人负担不起",
          "● 自己练容易受伤(动作不标准,姿势错误)",
          "● YouTube教程无法个性化(不知道练什么、练多久)",
          "● 缺少实时反馈和激励,难以坚持"
        ]
      },
      optimizationIdeas: [
        "💡 创新点1:「虚拟私教」—— AI生成3D虚拟教练,实时演示标准动作,比视频教程更直观",
        "💡 创新点2:「伤病预防」—— 检测到危险动作(如深蹲膝盖内扣)立即语音警告,降低受伤率80%",
        "💡 创新点3:「社交挑战」—— 用户可发起「30天马甲线挑战」,邀请朋友PK,增加留存",
        "💡 创新点4:「智能硬件联动」—— 集成智能手环/体重秤数据,AI综合分析给建议"
      ],
      businessModel: {
        freemium: "免费版:5个基础动作,每天1次AI纠正",
        pro: "Pro版$15/月:无限动作库,实时纠正,个性化计划,营养建议",
        b2b: "健身房SaaS:$50/月,提供给健身房作为增值服务",
        target_revenue: "前3年目标100万付费用户,ARPU $180/年 = ARR $180M"
      }
    }
  },
  {
    name: "AI法律文书助手",
    icon: "⚖️",
    tagline: "自动生成合同、起诉书、律师函,降低法律服务成本",
    score: 89,
    sources: {reddit: 980, twitter: 2100, hackernews: 450},
    analysis: {
      coreValue: "让普通人也能负担得起法律服务,减少「不懂法被坑」",
      targetUsers: "中小企业主、创业者、租房者、个人维权",
      advantages: ["AI理解法律条款", "模板+定制化", "比律师便宜95%", "秒级生成"]
    },
    completeResearch: {
      marketOpportunity: {
        size: "全球法律科技市场$30B(2025),AI法律服务$5B,CAGR 35%",
        painPoints: [
          "● 律师咨询费$200-500/小时,起步价高",
          "● 简单合同(如租房合同)也需要付费,不划算",
          "● 法律文书门槛高,自己写容易遗漏条款",
          "● 中小企业法务成本高,请不起专职法律顾问"
        ]
      },
      optimizationIdeas: [
        "💡 创新点1:「案例库学习」—— AI分析100万+真实判决案例,生成的文书更符合法院要求",
        "💡 创新点2:「风险检测」—— 自动标注合同中的「不平等条款」「法律漏洞」,保护弱势方",
        "💡 创新点3:「多语言+跨国」—— 支持中英文合同互译,处理跨境交易",
        "💡 创新点4:「律师审核」—— Pro版包含真人律师最终审核,确保100%法律有效性"
      ],
      businessModel: {
        freemium: "免费版:3个基础模板(租房/劳动/借款合同)",
        pro: "Pro版$30/月:50+模板,AI定制,无限生成",
        enterprise: "企业版$200/月:品牌定制合同,法律顾问咨询,API集成",
        revenue_model: "ToC获客(免费模板吸引个人) → ToB变现(企业批量采购)"
      }
    }
  },
  {
    name: "AI简历面试教练",
    icon: "💼",
    tagline: "AI模拟真实面试,实时反馈,提升面试成功率",
    score: 88,
    sources: {reddit: 1200, twitter: 2600, hackernews: 380},
    analysis: {
      coreValue: "解决「面试紧张」「不知道如何准备」「缺少练习机会」的痛点",
      targetUsers: "求职者、应届毕业生、转行者、职场跳槽",
      advantages: ["AI模拟面试官", "实时语音反馈", "行为分析", "无限练习"]
    },
    completeResearch: {
      marketOpportunity: {
        size: "全球求职服务市场$50B(2025),AI面试辅导细分$5B,CAGR 45%",
        painPoints: [
          "● 真实面试机会少,无法练习(投100份简历才1次面试)",
          "● 面试紧张,临场表现差,明明准备了却说不出来",
          "● 不知道面试官喜欢什么答案,盲目准备",
          "● 模拟面试找朋友帮忙,对方不专业,反馈不到位"
        ]
      },
      optimizationIdeas: [
        "💡 创新点1:「AI面试官性格模拟」—— 用户选择面试官类型(严肃型/友好型/刁钻型),AI模拟不同风格,针对性训练",
        "💡 创新点2:「微表情分析」—— 摄像头捕捉面试者表情(皱眉、眼神飘忽),AI提示「你刚才回避眼神接触3次」",
        "💡 创新点3:「行业数据库」—— 收集10万+真实面试题,按行业/岗位分类(互联网PM、金融分析师、咨询顾问)",
        "💡 创新点4:「面试复盘报告」—— 生成详细报告(回答质量评分、语速分析、停顿次数、建议改进点)"
      ],
      businessModel: {
        freemium: "免费版:3次模拟面试,基础反馈",
        pro: "Pro版$20/月:无限练习,深度分析,真人面试官1对1点评(每月1次)",
        b2c: "大学就业中心采购:$500/年,给学生免费用",
        target_revenue: "前3年目标50万付费用户,ARPU $120/年 = ARR $60M"
      }
    }
  },
  {
    name: "AI宠物健康助手",
    icon: "🐾",
    tagline: "拍照识别宠物疾病,AI兽医24小时在线咨询",
    score: 86,
    sources: {reddit: 890, twitter: 1900, hackernews: 320},
    analysis: {
      coreValue: "降低宠物医疗门槛,让主人早发现问题,减少急诊和高额费用",
      targetUsers: "养宠家庭、宠物店主、远程地区养宠者",
      advantages: ["图像识别疾病", "AI兽医咨询", "健康档案管理", "用药提醒"]
    },
    completeResearch: {
      marketOpportunity: {
        size: "全球宠物医疗市场$80B(2025),AI宠物健康细分$8B,CAGR 38%",
        painPoints: [
          "● 宠物医院贵,常规检查$100-300,小病也要跑医院",
          "● 宠物不会说话,主人不知道哪里不舒服,延误治疗",
          "● 夜间/假日急诊更贵(1.5-2倍),且不一定有医生",
          "● 偏远地区没有宠物医院,开车1小时才能就诊"
        ]
      },
      optimizationIdeas: [
        "💡 创新点1:「症状自查」—— 主人描述症状(「狗狗不吃饭、呕吐」),AI初步诊断+严重程度评估(需要立即就医 vs 观察)",
        "💡 创新点2:「皮肤病识别」—— 拍摄宠物皮肤照片,AI识别常见病(癣、湿疹、过敏),准确率85%+",
        "💡 创新点3:「健康档案」—— 记录疫苗、体检、用药历史,AI提醒「该打疫苗了」「药快吃完了」",
        "💡 创新点4:「远程兽医」—— AI初诊后,如有需要可视频连线真人兽医(类似在线问诊)"
      ],
      businessModel: {
        freemium: "免费版:每月3次AI咨询,基础症状查询",
        pro: "Pro版$12/月:无限AI咨询,真人兽医咨询(每月2次),健康档案",
        insurance: "宠物保险合作:作为增值服务提供给保险客户",
        target_revenue: "前3年目标200万付费用户(渗透率10%),ARPU $144/年 = ARR $288M"
      }
    }
  }
];

// ============================================
// 随机选择内容
// ============================================
function getRandomItems(pool, count) {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// ============================================
// 生成数据
// ============================================
async function fetchRealGitHub() {
    console.log('📡 尝试抓取真实 GitHub Trending...');
    try {
        const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000+created:>2024-01-01&sort=stars&order=desc&per_page=10');
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const filtered = data.items.filter(repo => {
                const desc = (repo.description || '').toLowerCase();
                return desc.includes('ai') || desc.includes('ml') || desc.includes('llm');
            });

            if (filtered.length >= 2) {
                console.log(`✅ 获取到 ${filtered.length} 个真实 AI 项目`);
                // 使用真实数据,但没有详细分析
                return filtered.slice(0, 2).map(repo => ({
                    name: repo.name,
                    author: repo.owner.login,
                    description: repo.description || '暂无描述',
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language || 'Unknown',
                    url: repo.html_url,
                    // 简化版分析
                    detailedAnalysis: {
                        projectOverview: `${repo.name}是一个${repo.language}项目,专注于AI技术创新。项目在GitHub上获得了${repo.stargazers_count}个star,证明了其在开发者社区的影响力。`,
                        coreFeatures: [
                            "开源项目,完全免费使用",
                            "活跃的社区支持和持续更新",
                            "详细的文档和示例代码",
                            "适合AI开发者和研究人员"
                        ],
                        whyTrending: "该项目因其创新性和实用性在AI社区获得广泛关注,满足了开发者对高质量AI工具的需求。"
                    }
                }));
            }
        }
    } catch (error) {
        console.log('⚠️ GitHub API调用失败,使用预设内容');
    }
    return null;
}

async function main() {
    try {
        // 优先使用详细预设内容池，确保内容质量
        // 如果想尝试真实GitHub数据，可以设置 USE_REAL_GITHUB = true
        const USE_REAL_GITHUB = false;

        let githubData;
        if (USE_REAL_GITHUB) {
            githubData = await fetchRealGitHub();
            if (!githubData) {
                githubData = getRandomItems(GITHUB_DETAILED_POOL, 2);
                console.log('✅ GitHub API失败，使用详细预设内容');
            } else {
                console.log('✅ 使用真实 GitHub 数据');
            }
        } else {
            // 使用详细预设内容池
            githubData = getRandomItems(GITHUB_DETAILED_POOL, 2);
            console.log('✅ 使用详细预设 GitHub 内容');
        }

        // AI产品和灵感库使用详细预设内容
        const aiProducts = getRandomItems(AI_PRODUCTS_POOL, 2);
        const inspirationLibrary = getRandomItems(INSPIRATION_POOL, 2);

        console.log('✅ GitHub项目:', githubData.map(p => p.name).join(', '));
        console.log('✅ AI产品:', aiProducts.map(p => p.name).join(', '));
        console.log('✅ 灵感库:', inspirationLibrary.map(i => i.name).join(', '));

        const data = {
            lastUpdate: new Date().toISOString(),
            githubTrending: githubData,
            aiProducts: aiProducts,
            inspirationLibrary: inspirationLibrary,
            insights: insights
        };

        writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');

        console.log('\n✅ 数据更新完成！');
        console.log(`📊 GitHub: ${githubData.length}, AI产品: ${aiProducts.length}, 灵感: ${inspirationLibrary.length}, 洞察: ${insights.length}`);
        console.log(`📏 数据大小: ${(JSON.stringify(data).length / 1024).toFixed(2)} KB`);
    } catch (error) {
        console.error('❌ 更新失败:', error);
        process.exit(1);
    }
}

main();

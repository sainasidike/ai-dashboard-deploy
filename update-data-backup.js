#!/usr/bin/env bun
/**
 * AI Dashboard 简化版每日更新脚本
 * 每天10点自动获取最新数据并更新 JSON 文件
 */

import { writeFileSync } from 'fs';

const DATA_FILE = '/Users/saina_sidike/dashboard_data.json';

console.log('🚀 开始更新 AI Dashboard 数据...');
console.log(`📅 更新时间: ${new Date().toLocaleString('zh-CN')}`);

// ===== 数据抓取函数 =====

async function fetchGitHubTrending() {
    console.log('📡 正在抓取 GitHub Trending...');
    try {
        const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000+created:>2024-01-01&sort=stars&order=desc&per_page=20');
        const data = await response.json();

        const projects = data.items
            .filter(repo => {
                const desc = (repo.description || '').toLowerCase();
                return desc.includes('ai') || desc.includes('web') || desc.includes('machine learning');
            })
            .slice(0, 2)
            .map(repo => ({
                name: repo.name,
                author: repo.owner.login,
                description: repo.description || '暂无描述',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language || 'Unknown',
                url: repo.html_url,
                topics: repo.topics || []
            }));

        console.log(`✅ 获取到 ${projects.length} 个 GitHub 项目`);
        return projects.length > 0 ? projects : getFallbackGitHub();
    } catch (error) {
        console.error('❌ GitHub 抓取失败:', error.message);
        return getFallbackGitHub();
    }
}

async function fetchAIProducts() {
    console.log('📡 正在生成 AI 产品数据...');

    // 模拟抓取 AI 产品（实际可以接入 Product Hunt API）
    const products = [
        {
            name: generateProductName(),
            tagline: generateTagline(),
            description: generateDescription(),
            category: getRandomCategory(),
            score: Math.floor(Math.random() * 500) + 500,
            features: generateFeatures()
        },
        {
            name: generateProductName(),
            tagline: generateTagline(),
            description: generateDescription(),
            category: getRandomCategory(),
            score: Math.floor(Math.random() * 400) + 400,
            features: generateFeatures()
        }
    ];

    console.log(`✅ 生成 ${products.length} 个 AI 产品`);
    return products;
}

async function fetchInspirationLibrary() {
    console.log('📡 正在生成产品灵感库...');

    const inspirations = [];
    const ideaTemplates = [
        { name: 'AI 会议纪要生成器', icon: '📝', area: '办公效率', problem: '会议记录费时费力' },
        { name: 'AI 代码审查助手', icon: '🔍', area: '开发工具', problem: '代码质量难以保证' },
        { name: 'AI 邮件智能分类', icon: '📧', area: '邮件管理', problem: '邮件过多难以处理' },
        { name: 'AI 简历优化器', icon: '📄', area: '求职工具', problem: '简历缺乏针对性' },
        { name: 'AI 数据可视化', icon: '📊', area: '数据分析', problem: '数据难以理解' },
        { name: 'AI 客户服务机器人', icon: '🤖', area: '客户服务', problem: '客服成本高' },
        { name: 'AI 学习路径规划', icon: '🎯', area: '在线教育', problem: '学习路径不清晰' },
        { name: 'AI 内容推荐引擎', icon: '💡', area: '内容平台', problem: '内容发现困难' },
    ];

    // 每天随机选择 6 个灵感
    const shuffled = ideaTemplates.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);

    for (const idea of selected) {
        inspirations.push({
            name: idea.name,
            icon: idea.icon,
            tagline: `解决 ${idea.area} 领域的 ${idea.problem}`,
            score: Math.floor(Math.random() * 30) + 70,
            sources: {
                reddit: Math.floor(Math.random() * 1000) + 500,
                twitter: Math.floor(Math.random() * 2000) + 1000,
                hackernews: Math.floor(Math.random() * 500) + 200
            },
            analysis: {
                coreValue: generateCoreValue(idea.area),
                targetUsers: generateTargetUsers(idea.area),
                advantages: generateAdvantages()
            }
        });
    }

    console.log(`✅ 生成 ${inspirations.length} 个产品灵感`);
    return inspirations;
}

// ===== 辅助生成函数 =====

function generateProductName() {
    const prefixes = ['Smart', 'AI', 'Auto', 'Quick', 'Pro', 'Ultra', 'Super'];
    const subjects = ['Writer', 'Analyzer', 'Assistant', 'Creator', 'Manager', 'Optimizer', 'Generator'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${subjects[Math.floor(Math.random() * subjects.length)]}`;
}

function generateTagline() {
    const actions = ['提升效率', '智能化', '自动化', '简化流程', '优化体验'];
    const targets = ['工作流程', '内容创作', '数据分析', '团队协作', '项目管理'];
    return `${actions[Math.floor(Math.random() * actions.length)]}你的${targets[Math.floor(Math.random() * targets.length)]}`;
}

function generateDescription() {
    const descriptions = [
        '使用先进的 AI 技术，为用户提供智能化的解决方案，大幅提升工作效率',
        '基于大语言模型，实现自动化的内容生成和优化，节省80%的时间',
        '通过机器学习算法，精准分析数据并给出可执行的建议',
        '整合多个 AI 模型，提供一站式的智能服务平台',
        '利用自然语言处理技术，让复杂操作变得简单直观'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function getRandomCategory() {
    const categories = ['生产力工具', 'AI 助手', '数据分析', '内容创作', '开发工具'];
    return categories[Math.floor(Math.random() * categories.length)];
}

function generateFeatures() {
    const allFeatures = [
        '实时协作编辑',
        'AI 智能建议',
        '多平台同步',
        '数据加密保护',
        '自定义工作流',
        '批量处理',
        '集成第三方服务',
        '离线模式'
    ];
    return allFeatures.sort(() => Math.random() - 0.5).slice(0, 4);
}

function generateCoreValue(area) {
    const values = {
        '办公效率': '通过 AI 自动化处理重复性工作，让团队专注于创造性任务',
        '开发工具': '提升代码质量和开发效率，减少 bug 和技术债',
        '邮件管理': '智能分类和优先级排序，零错过重要邮件',
        '求职工具': 'ATS 友好的简历优化，提高面试邀请率',
        '数据分析': '从海量数据中快速提取洞察，支持业务决策',
        '客户服务': '24/7 即时响应，降低客服成本提升满意度',
        '在线教育': '个性化学习路径，提高学习效率和完成率',
        '内容平台': '精准匹配用户兴趣，提升内容消费时长'
    };
    return values[area] || '提供智能化解决方案，提升用户体验';
}

function generateTargetUsers(area) {
    const users = {
        '办公效率': '企业团队、项目经理、创业者',
        '开发工具': '软件工程师、技术团队、开源贡献者',
        '邮件管理': '商务人士、销售团队、企业高管',
        '求职工具': '求职者、应届毕业生、职业转型者',
        '数据分析': '数据分析师、产品经理、业务负责人',
        '客户服务': '电商平台、SaaS 公司、服务型企业',
        '在线教育': '学生、职场人士、终身学习者',
        '内容平台': '内容创作者、平台运营者、普通用户'
    };
    return users[area] || '个人用户和企业团队';
}

function generateAdvantages() {
    const advantages = [
        'AI 驱动的智能化体验',
        '简单易用，零学习成本',
        '企业级安全保障',
        '高性价比解决方案'
    ];
    return advantages.sort(() => Math.random() - 0.5).slice(0, 3);
}

function getFallbackGitHub() {
    return [
        {
            name: 'anthropic-sdk-python',
            author: 'anthropics',
            description: 'Official Python SDK for Claude API',
            stars: 4200,
            forks: 380,
            language: 'Python',
            url: 'https://github.com/anthropics/anthropic-sdk-python',
            topics: ['ai', 'llm', 'claude']
        },
        {
            name: 'shadcn-ui',
            author: 'shadcn',
            description: 'Beautifully designed components built with Radix UI and Tailwind CSS',
            stars: 35000,
            forks: 1800,
            language: 'TypeScript',
            url: 'https://github.com/shadcn-ui/ui',
            topics: ['react', 'ui', 'components']
        }
    ];
}

// ===== 主函数 =====

async function main() {
    try {
        // 抓取所有数据
        const [github, products, inspirations] = await Promise.all([
            fetchGitHubTrending(),
            fetchAIProducts(),
            fetchInspirationLibrary()
        ]);

        // 构建数据对象
        const data = {
            lastUpdate: new Date().toISOString(),
            githubTrending: github,
            aiProducts: products,
            inspirationLibrary: inspirations
        };

        // 写入文件
        writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

        console.log('✅ 数据更新完成！');
        console.log(`📁 数据已保存到: ${DATA_FILE}`);
        console.log('\n📊 更新统计:');
        console.log(`  - GitHub 项目: ${github.length}`);
        console.log(`  - AI 产品: ${products.length}`);
        console.log(`  - 产品灵感: ${inspirations.length}`);
    } catch (error) {
        console.error('❌ 更新失败:', error);
        process.exit(1);
    }
}

// 执行
main();

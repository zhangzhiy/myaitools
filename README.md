# 智工具集 (AIToolbox)

一个现代化的工具导航网站，专门用于展示和管理各种优质工具，包括AI工具、开发工具、效率工具和设计工具。

## ✨ 特性

- 🎨 **现代简约设计** - 采用卡片式布局，支持响应式设计
- 🌙 **深色模式** - 支持明暗主题切换
- 🔍 **智能搜索** - 快速搜索和筛选工具
- 📱 **响应式布局** - 完美适配桌面端和移动端
- ⚡ **性能优化** - 基于Next.js构建，支持SSG/SSR
- 🛠️ **易于配置** - 通过JSON文件轻松管理工具
- 🚀 **SEO友好** - 优化搜索引擎收录

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm、yarn、pnpm 或 bun

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
myaitools/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 布局组件
│   │   └── page.tsx         # 主页面
│   ├── components/          # React组件
│   │   ├── Header.tsx       # 顶部导航
│   │   ├── Hero.tsx         # 首页Hero区域
│   │   ├── ToolCard.tsx     # 工具卡片
│   │   └── CategorySection.tsx # 分类区域
│   ├── data/               # 数据文件
│   │   └── tools.json      # 工具配置数据
│   └── types/              # TypeScript类型定义
│       └── index.ts
├── public/                 # 静态资源
└── tailwind.config.ts     # Tailwind CSS配置
```

## ⚙️ 配置管理

### 添加新工具

编辑 `src/data/tools.json` 文件：

```json
{
  "tools": [
    {
      "id": "unique-tool-id",
      "name": "工具名称",
      "description": "工具描述",
      "category": "ai-tools",
      "tags": ["AI", "聊天", "智能"],
      "url": "https://example.com",
      "icon": "/icons/tool-icon.svg",
      "status": "active",
      "createdAt": "2024-01-01",
      "updatedAt": "2024-01-01"
    }
  ]
}
```

### 添加新分类

在同一个文件中的 `categories` 数组中添加：

```json
{
  "categories": [
    {
      "id": "new-category",
      "name": "新分类",
      "description": "分类描述",
      "icon": "/icons/category-icon.svg"
    }
  ]
}
```

### 字段说明

- `status`: `active`(可用) | `developing`(开发中) | `deprecated`(已废弃)
- `category`: 必须对应 `categories` 中的某个 `id`

## 🎨 自定义样式

项目使用 Tailwind CSS，你可以：

1. 修改 `tailwind.config.ts` 自定义主题
2. 在 `src/app/globals.css` 中添加全局样式
3. 使用 Tailwind 类名进行样式开发

## 📦 构建和部署

### 构建生产版本

```bash
npm run build
npm start
```

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置自定义域名 `myaitools.cloud`
4. 部署完成！

Vercel 会自动：
- 检测到Next.js项目
- 配置构建命令
- 设置环境变量
- 分配SSL证书

## 🔧 开发工具

### 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 代码检查

### 代码规范

项目使用 ESLint 进行代码规范检查：

```bash
npm run lint
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🌟 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel
- **图标**: Heroicons (内嵌SVG)

## 📞 联系方式

- 邮箱: contact@myaitools.cloud
- GitHub: [项目地址]

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

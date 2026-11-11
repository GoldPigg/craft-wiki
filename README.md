# 守艺志 · Craft Wiki

> 以宣纸为底，以朱砂为记。记录手艺人的手掌与光阴，让正在远去的手艺，有迹可循。

**守艺志（Craft Wiki）** 是一个以中国传统非物质文化遗产为主题的静态数字图鉴：首页以茶、舞、书、乐、剪纸五段视觉叙事进入；正文按「地区 — 省份 — 门类 — 项目」四级展开，以宣纸、宋体与朱印的版式呈现。

- GitHub 仓库：[GoldPigg/craft-wiki](https://github.com/GoldPigg/craft-wiki)
- 线上预览：[craft-wiki.netlify.app](https://craft-wiki.netlify.app/)
- 队员: 姚崇宇、高睿、黎仁皓
- 队名: token乱飞队

## 目录

- [运行与构建](#运行与构建)
- [项目简介](#项目简介)
- [项目内容](#项目内容)
- [技术实现](#技术实现)
- [目录结构](#目录结构)

---

## 运行与构建

需要 Node.js 20 及以上与 pnpm。

```bash
pnpm install                  # 安装依赖
pnpm generate                 # 生成静态站点
pnpm dlx serve dist           #开启服务器
```

- `pnpm generate` 会把 `content/wiki.config.ts` 中的全部 Wiki 路径预渲染为静态页面；
- Netlify 使用 `pnpm generate` 构建并发布 `dist`，仓库中的 `dist` 指向 `.output/public`。

---

## 项目简介

站点分为两套阅读场景：

- **首页**：用茶壶、水波、书页、乐舞与剪纸五段视觉叙事，建立「手艺与时间」的基调；
- **Wiki 阅读页**：左侧树形目录、右侧页内目录、正文 Markdown 渲染，构成一册可浏览的地方工艺志。

内容与展示分层：Markdown 与目录配置存放在 `content/`，页面渲染与交互在 `app/`，文件读取与接口在 `server/`，便于后续替换数据源。

**项目特色**:
- 完成了**屏幕适配**
- 完成了**移动端适配**(包括尺寸适配与性能取舍)
- 有**清晰的路由结构**
- 采用Netlify进行**开发时的预览**
- CMS**静态网站**, 部署简易

---

## 项目内容

wiki 内容以地区为第一层入口（另有「简介」栏目）：简介 / 北方 / 东部 / 南方 / 西部 → 省份 → 门类 → 项目。

### 规模

| 维度 | 数量 |
| --- | --- |
| 地区 | 4 个（北方、东部、南方、西部） |
| 省级行政区 | 31 个 |
| 门类 | 10 个 |
| 项目 | 102 个 |
| 页面 | 141 个 |
| 配图 | 102 幅 |

内容依据国家级非物质文化遗产代表性项目名录与公开资料整理，跨省联合申报项目会归入一个申报地区并在正文说明。

### 门类分布

| 门类 | 项目数 |
| --- | --- |
| 传统技艺 | 33 |
| 传统美术 | 21 |
| 传统戏剧 | 19 |
| 传统音乐 | 9 |
| 曲艺 | 5 |
| 传统舞蹈 | 4 |
| 民俗 | 4 |
| 传统体育、游艺与杂技 | 3 |
| 民间文学 | 2 |
| 传统医药 | 2 |

### 主要特色

- **视觉**：宣纸底色、宋体标题、楷体正文，朱砂与黛蓝点缀；
- **阅读**：左侧树形目录、右侧页内目录、顶部书眉导航，支持亮 / 暗主题与皮影切换；
- **移动端**：窄屏下目录收进抽屉、正文单列，首页重动画降级为轻量入场。

---

## 技术实现

Nuxt 4 以 SSR 运行，构建时预渲染为静态站点；内容读取、Markdown 渲染与页面展示相互分离，便于以后替换数据源。

### 技术栈

| 分类 | 依赖 | 说明 |
| --- | --- | --- |
| 核心 | `nuxt` | 应用框架，负责 SSR、文件路由与预渲染 |
| 核心 | `vue` | UI 框架，组件基于 Composition API |
| 核心 | `vue-router` | 页面路由与参数解析 |
| 界面与资源 | `@nuxt/icon` | Icon 组件与 Iconify 集成 |
| 界面与资源 | `@iconify-json/lucide` | Lucide 图标数据源 |
| 界面与资源 | `@nuxt/image` | 图片组件与图片优化 |
| 界面与资源 | `@fontize/nuxt` | 本地字体注册模块 |
| 界面与资源 | `@fontize/vue` | `useText` 文字生成与排版 |
| 动效 | `gsap` | 动画与滚动插件的基础库 |
| 动效 | `@hypernym/nuxt-gsap` | GSAP 的 Nuxt 集成模块 |
| Markdown | `gray-matter` | 解析 Markdown frontmatter |
| Markdown | `unified` | Markdown / HTML 处理管线 |
| Markdown | `remark-parse` | Markdown 解析为 mdast |
| Markdown | `remark-gfm` | GFM 表格、删除线等扩展语法 |
| Markdown | `remark-rehype` | mdast 转换为 hast |
| Markdown | `rehype-slug` | 为标题生成锚点 id |
| Markdown | `rehype-sanitize` | 白名单过滤 HTML |
| Markdown | `rehype-stringify` | hast 序列化为 HTML |
| Markdown | `unist-util-visit` | 遍历 AST，提取目录与锚点 |
| Markdown | `hast` | HAST 节点类型与工具 |
| Markdown | `@types/hast` | HAST 的 TypeScript 类型声明 |
| 类型 | `@types/node` | Node.js API 的 TypeScript 类型 |

### 内容与路由

- Markdown 由 `unified` + `remark` / `rehype` 解析，自动生成标题锚点与页内目录，并用 `rehype-sanitize` 过滤 HTML；
- `content/wiki.config.ts` 同时驱动侧栏目录树与预渲染路径，Nitro API 负责读取 `content/wiki` 下的文件；
- 页面只负责展示接口返回的 HTML 与目录数据，后续可把文件数据源替换为数据库或 CMS。

### 响应式与动效

- 桌面首页使用 GSAP 的滚动叙事；窄屏下关闭 ScrollSmoother 与 pin，改用原生滚动、横向画廊和轻量淡入；
- Wiki 在窄屏下将目录收进抽屉、正文改为单列；
- 移动端动画尊重 `prefers-reduced-motion`，减少动效模式下直接显示内容。

---

## 目录结构

```text
craft-wiki/
├─ app/                # 页面、布局、组件、样式与工具
│  ├─ components/      # 通用组件与首页视觉组件
│  ├─ layouts/         # 首页 / Wiki 布局
│  ├─ pages/           # 首页与 Wiki 路由
│  ├─ composables/     # 组合式函数
│  ├─ assets/          # 全局样式与 SVG
│  └─ utils/           # 注入 key、DOM、视口等工具
├─ content/
│  ├─ wiki.config.ts   # 目录树配置
│  └─ wiki/            # 地区 / 省份 / 门类 / 项目 Markdown
├─ public/             # 首页素材、Wiki 配图、纹理与图标
├─ server/             # Nitro API 与 Markdown 读取
├─ shared/             # Markdown 管线与目录树模型
├─ fonts/              # 首页标题字体
├─ nuxt.config.ts
├─ netlify.toml
├─ package.json
└─ README.md
```

> `.output/`、`.nuxt/` 等为构建产物，不在此展开。

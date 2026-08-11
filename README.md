# OI 练习助手

> 面向算法竞赛学习者的离线练习工具 —— 94 个算法专题，1410 道洛谷真题，即开即用。

## 功能特点

- **94 个算法章节** — 涵盖 Part 1~10，从搜索/动态规划到计算几何/多项式，系统覆盖竞赛核心知识体系
- **每章 15 题阶梯训练** — 1 模板 + 3 绿 + 5 青 + 3 蓝 + 3 紫，全部为洛谷真实难度
- **1410 道完全独立题目** — 每道题只属于一个章节，不重复、不跨章复用
- **完整离线缓存** — 题面描述、输入输出格式、样例、数据范围均本地缓存（2.9MB），无需网络即可浏览全部题目
- **LaTeX 数学渲染** — 所有数学公式使用 KaTeX 自动渲染为最终样式
- **代码高亮** — highlight.js 渲染代码块，支持多语言
- **AI 答疑助手** — 内置 AI 对话面板，支持 OpenAI / Claude / Gemini / DeepSeek / GLM / Qwen / Kimi 等 11 家服务商
- **知识地图视图** — 章节以可视化迷宫形式展示，关卡带进度标记
- **进度持久化** — localStorage 保存学习进度和统计数据
- **路径可移植** — 下载到任意目录均可正常运行，不依赖绝对路径

## 快速开始

### 浏览器直接使用

用浏览器打开 `index.html` 即可使用。

### 桌面应用

`build/` 目录下提供了预打包的桌面应用：

| 平台 | 文件 |
|------|------|
| Windows | `build/OI练习助手.exe` |
| Linux | `build/OI练习助手-linux.tar.gz` |

### 重新生成数据（可选）

```bash
# 安装依赖
pip install curl_cffi python-docx

# 从 .docx 文档生成章节题目分配
python build_from_expanded.py

# 从洛谷爬取题目详情（需要网络）
python batch_fetch.py

# 更新本地缓存
python update_cache.py
```

## 项目结构

```
OI练习助手/
├── index.html                 # 主页面 (SPA)
├── main.js                    # Electron 主进程入口
├── package.json               # 项目配置 & 打包脚本
├── css/
│   ├── style.css              # 全局样式 & 主题变量
│   ├── map.css                # 知识地图视图样式
│   ├── lesson.css             # 课程/练习页样式
│   └── ai-chat.css            # AI 对话面板样式
├── js/
│   ├── app.js                 # 应用主控 (App 对象)
│   ├── data.js                # 94 章节 × 15 题的分配数据
│   ├── content.js             # 课程内容 (Part 1-5)
│   ├── missing_part6.js       # 课程内容 (Part 6)
│   ├── missing_part7.js       # 课程内容 (Part 7)
│   ├── missing_part8_10.js    # 课程内容 (Part 8-10)
│   ├── problem_cache.js       # 1410 道题完整题面缓存 (~2.9MB)
│   ├── lesson.js              # 课程/练习视图渲染
│   ├── map.js                 # 知识地图视图
│   ├── ai.js                  # AI 助手 (11家服务商)
│   ├── luogu.js               # 洛谷 OJ 集成
│   └── storage.js             # 进度持久化
├── assets/
│   └── icon.png               # 应用图标
├── build/
│   ├── OI练习助手.exe          # Windows 安装包
│   └── OI练习助手-linux.tar.gz  # Linux 安装包
├── build_from_expanded.py     # 从 docx 生成题目分配 (15题/章)
├── batch_fetch.py             # 批量爬取洛谷题目
├── update_cache.py            # 更新本地缓存
└── 题目_expanded.docx         # 扩充后的原始题目文档 (数据源)
```

## 技术栈

| 层级 | 技术 |
|------|------|
| 应用容器 | Electron 28 |
| 前端 | 原生 HTML + CSS + JavaScript (无框架 SPA) |
| Markdown 渲染 | marked.js |
| 数学公式 | KaTeX (auto-render) |
| 代码高亮 | highlight.js |
| 数据提取 | Python (python-docx, curl_cffi) |
| 打包 | electron-builder |

## 难度对照与分布

| 标签 | 洛谷颜色 | 难度值 | 每章数量 | 总计 | 含义 |
|------|---------|--------|---------|------|------|
| 模板 | — | 1 | 1 | 94 | 各算法最经典的入门题 |
| 绿 | 普及+/提高 | 4 | 3 | 282 | NOIP 提高组难度 |
| 青 | 提高+/省选- | 5 | 5 | 470 | 省选入门难度 |
| 蓝 | 省选/NOI- | 6 | 3 | 282 | 省选核心难度 |
| 紫 | NOI/NOI+ | 7 | 3 | 282 | 全国赛难度 |
| **合计** | | | **15** | **1410** | |

- 青及以上（省选难度）占比 73.3%
- 所有 1410 道题目完全不重复，每道题仅属于一个章节
- 难度为洛谷站上真实标注的难度

## 数据来源

所有题目通过 `题目_expanded.docx` 文档配置，由 Python 脚本从洛谷（luogu.com.cn）实时爬取完整题面数据。题目按章节主题 + 难度搜索匹配，确保每道题与其所属章节的算法主题高度相关。

## License

本项目仅用于个人学习目的。

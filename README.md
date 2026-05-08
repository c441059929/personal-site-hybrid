# Personal Site Hybrid Version

这是一个同时包含“求职模块”和“生活模块”的个人网站版本。

它不是纯求职网站，也不是纯生活博客，而是一个兼顾正式展示与个人记录的空间：

- 求职模块：个人介绍、能力卡片、项目/材料整理库、PDF 下载入口
- 生活模块：生活切片、照片、阅读、日常记录、轻量复盘
- 文章模块：正式复盘 + 生活随笔
- 时间线：记录阶段性关注点

## 本地运行

```bash
npm install
npm run dev
```

打开终端显示的地址，通常是：

```text
http://localhost:5173/
```

## 构建检查

```bash
npm run build
npm run preview
```

## 替换真实内容

### 1. 联系方式

打开：

```text
src/App.jsx
```

替换：

```js
email: "your-email@example.com",
github: "https://github.com/yourname",
wechatName: "Tim 的慢速记录",
```

### 2. PDF

替换这个文件：

```text
public/resume/Tim-Chen-Resume.pdf
```

如果不想放简历，可以换成个人介绍 PDF，也可以删除页面里的下载按钮。

### 3. 图片

求职模块图片：

```text
public/images/career/
```

生活模块图片：

```text
public/images/life/
```

文章图片：

```text
public/images/posts/
```

公众号二维码：

```text
public/images/wechat-qr.png
```

## 免费部署到 Vercel

1. 把整个项目上传到 GitHub
2. 在 Vercel 导入 GitHub 仓库
3. Framework Preset: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. 点击 Deploy

## 文件结构

```text
personal-site-hybrid/
├─ public/
│  ├─ images/
│  │  ├─ career/
│  │  ├─ life/
│  │  ├─ posts/
│  │  └─ wechat-qr.png
│  └─ resume/
│     └─ Tim-Chen-Resume.pdf
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ package.json
├─ index.html
├─ vite.config.js
├─ tailwind.config.js
└─ postcss.config.js
```

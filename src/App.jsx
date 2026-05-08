import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Camera,
  ChevronRight,
  Coffee,
  Download,
  FileText,
  Github,
  GraduationCap,
  Home,
  Layers,
  Mail,
  MapPin,
  Moon,
  Newspaper,
  PenLine,
  QrCode,
  Search,
  Sparkles,
  Star,
  Sun,
  Tags,
  User,
  X,
} from "lucide-react";

function Button({ children, className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50";
  const styles = variant === "outline"
    ? "border border-black/10 bg-white/60 text-stone-950 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
    : "bg-stone-950 text-white hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100";
  return <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>;
}

function Card({ children, className = "", ...props }) {
  return <div className={`rounded-[2rem] bg-white/65 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10 ${className}`} {...props}>{children}</div>;
}

function CardContent({ children, className = "", ...props }) {
  return <div className={`p-7 ${className}`} {...props}>{children}</div>;
}

function Badge({ children }) {
  return <span className="inline-flex items-center rounded-full border border-stone-200 bg-white/60 px-3 py-1 text-xs text-stone-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-stone-300">{children}</span>;
}

function FilterButton({ active, children, onClick }) {
  return (
    <button onClick={onClick} className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${active ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950" : "bg-white/60 text-stone-600 hover:bg-white dark:bg-white/10 dark:text-stone-300"}`}>
      {children}
    </button>
  );
}

const ASSETS = {
  resumePdf: "/resume/Tim-Chen-Resume.pdf",
  wechatQr: "/images/wechat-qr.png",
};

const SITE = {
  name: "Tim Chen",
  headline: "在认真做事和好好生活之间，慢慢建立自己的节奏。",
  subHeadline: "这是一个同时保留职业展示和生活记录的个人网站：一部分用来呈现能力、项目和简历入口，另一部分用来沉淀文章、照片、生活切片和阶段性复盘。",
  location: "Shanghai / ZheJiang",
  email: "c441059929@163.com",
  github: "https://github.com/yourname",
  wechatName: "Cyc",
  introTags: ["求职展示", "生活切片", "项目整理", "文章复盘", "长期记录"],
};

const NAV = [
  { id: "home", label: "首页", icon: Home },
  { id: "about", label: "关于", icon: User },
  { id: "career", label: "求职模块", icon: Briefcase },
  { id: "life", label: "生活模块", icon: Camera },
  { id: "journal", label: "文章", icon: Newspaper },
  { id: "timeline", label: "时间线", icon: GraduationCap },
  { id: "setup", label: "说明", icon: FileText },
];

const careerItems = [
  {
    id: "profile-card",
    title: "个人介绍与能力卡片",
    type: "Profile",
    year: "2026",
    status: "可持续更新",
    cover: "/images/career/profile-card.jpg",
    desc: "用更轻量的方式概括自己的学习背景、做事方式、工具能力和长期积累。",
    tags: ["Profile", "Writing", "Structure"],
    role: "内容整理 / 个人叙事 / 页面设计",
    problem: "简历通常比较正式，很多做事方式和个人节奏很难在一页 PDF 里表达清楚。",
    process: ["把能力拆成材料整理、数据处理、表达写作和复盘习惯。", "用网站模块承接简历无法展开的内容。", "保留下载入口，但不让整个网站变成求职广告。"],
    outcome: "形成一个兼顾正式和松弛的个人介绍页。",
    next: "后续可以补充英文版、自我介绍 PDF 和更完整的项目说明。",
  },
  {
    id: "project-archive",
    title: "项目与材料整理库",
    type: "Work",
    year: "长期更新",
    status: "整理中",
    cover: "/images/career/project-archive.jpg",
    desc: "存放做过的项目、报告、资料整理方法、表格模板和复盘笔记。",
    tags: ["Projects", "Notes", "Review"],
    role: "资料归纳 / 流程复盘 / 结构化表达",
    problem: "很多经历如果只写成一句话，很难保留过程中的判断和方法。",
    process: ["按背景、任务、过程、结果和复盘整理。", "把重复性经验做成清单或模板。", "在需要时再选择性展示。"],
    outcome: "形成一个不夸张但可回看的项目 archive。",
    next: "后续可以按类别加入真实案例、截图和链接。",
  },
  {
    id: "toolbox",
    title: "个人工具箱",
    type: "Method",
    year: "长期更新",
    status: "轻量维护",
    cover: "/images/career/toolbox.jpg",
    desc: "整理常用工具、工作流、写作模板和检查清单，让之后做事更稳定。",
    tags: ["Tools", "Workflow", "Template"],
    role: "工具整理 / 模板设计 / 自我管理",
    problem: "很多效率不是靠临时冲刺，而是靠提前准备好的结构。",
    process: ["记录常用工具和步骤。", "把容易出错的环节写成 checklist。", "定期更新更顺手的工作流。"],
    outcome: "形成一个服务长期学习和工作的轻量系统。",
    next: "后续可以补充 Excel、Python、写作和资料整理模板。",
  },
];

const lifeItems = [
  {
    id: "daily-notes",
    title: "日常记录库",
    type: "Notes",
    year: "长期更新",
    status: "慢慢填补",
    cover: "/images/life/daily-notes.jpg",
    desc: "放一些阶段性的小想法、阅读片段、生活观察和轻量复盘。",
    tags: ["记录", "整理", "复盘"],
    role: "观察 / 写作 / 整理",
    problem: "很多想法如果不及时整理，很快就会散掉。",
    process: ["用短句先记录下来。", "定期回看，把相近的想法归类。", "挑出值得展开的部分写成长一点的文章。"],
    outcome: "形成一个不用很正式、但可以长期回看的个人 archive。",
    next: "后续可以加月份筛选、关键词搜索和 Markdown 写作。",
  },
  {
    id: "reading-corner",
    title: "阅读与输入角落",
    type: "Reading",
    year: "长期更新",
    status: "轻量维护",
    cover: "/images/life/reading-corner.jpg",
    desc: "记录最近读到、看到、听到的内容，不追求完整，只保留当时被触动的部分。",
    tags: ["阅读", "输入", "摘记"],
    role: "摘录 / 归纳 / 复盘",
    problem: "输入很多不等于真正吸收，留下自己的理解更重要。",
    process: ["记录一句话或一个问题。", "写下当时为什么在意。", "过一段时间再回看是否仍然重要。"],
    outcome: "沉淀一个低压力的阅读和输入记录。",
    next: "后续可以按书、文章、播客、电影分类。",
  },
  {
    id: "city-walk",
    title: "城市散步与生活切片",
    type: "Life",
    year: "长期更新",
    status: "随手记录",
    cover: "/images/life/city-walk.jpg",
    desc: "把路上看到的光、街道、咖啡、天气和一些普通但舒服的瞬间放在这里。",
    tags: ["散步", "照片", "生活"],
    role: "观察 / 拍照 / 短文",
    problem: "很多日子没有大事发生，但依然值得被留下。",
    process: ["拍一张照片。", "写一两句话。", "按城市、月份或主题归档。"],
    outcome: "形成一个更松弛的生活相册。",
    next: "后续可以加旅行地图和音乐列表。",
  },
];

const posts = [
  {
    id: "balance",
    title: "为什么想把求职和生活放在同一个网站",
    date: "2026-05",
    category: "最近在想",
    cover: "/images/posts/balance.jpg",
    excerpt: "人不只有一份简历，也不只有一些生活照片。把两部分放在一起，反而更接近真实状态。",
    readTime: "5 min",
    content: [
      { heading: "网站不一定只能服务一个目的", body: "有时候网站可以是一个简历入口，也可以是一个生活记录本。正式的部分用于表达能力，松弛的部分用于保留日常。" },
      { heading: "长期记录比一次性展示更重要", body: "如果只把网站当作一次性展示，很快就会过期。把网站当作长期空间，反而更容易慢慢维护。" },
    ],
  },
  {
    id: "ordinary-days",
    title: "一些普通但舒服的日子",
    date: "待补充",
    category: "生活切片",
    cover: "/images/posts/ordinary-days.jpg",
    excerpt: "窗边、咖啡、傍晚、街道、雨天，以及一些没有目的的瞬间。",
    readTime: "3 min",
    content: [
      { heading: "没有目的也可以被记录", body: "这类内容可以很短：一张照片、一句话、一个阶段的生活状态，都足够构成一次轻量记录。" },
      { heading: "生活不是总要很有效率", body: "有些时间不是用来产出的，而是用来恢复、观察和重新整理自己的。" },
    ],
  },
  {
    id: "review-lightly",
    title: "轻量复盘：不用太严肃也可以",
    date: "待补充",
    category: "复盘",
    cover: "/images/posts/review-lightly.jpg",
    excerpt: "复盘可以不是总结大会，也可以只是问自己：最近还好吗？",
    readTime: "4 min",
    content: [
      { heading: "复盘可以很轻", body: "不一定要列出完整表格，也不一定要马上得出结论。知道自己最近在忙什么、消耗什么、喜欢什么，就已经有意义。" },
      { heading: "给下一次一点提醒", body: "一次复盘只要留下一个提醒，就足够了。" },
    ],
  },
];

const photos = [
  { id: "coffee", title: "窗边咖啡", tag: "慢节奏", location: "Afternoon", src: "/images/life/photo-coffee.jpg", note: "适合放一张真实的窗边咖啡照。" },
  { id: "rain", title: "雨天玻璃", tag: "雨天", location: "Rainy Day", src: "/images/life/photo-rain.jpg", note: "雨天、玻璃、水滴、模糊灯光。" },
  { id: "walk", title: "傍晚散步", tag: "散步", location: "City Walk", src: "/images/life/photo-walk.jpg", note: "可以替换成路上拍到的街景或傍晚天空。" },
  { id: "desk", title: "安静桌面", tag: "整理", location: "Desk", src: "/images/life/photo-desk.jpg", note: "适合放真实桌面、笔记、便签。" },
];

const timeline = [
  { time: "现在", title: "搭建一个兼顾正式与松弛的个人网站", desc: "首页保留求职入口，也给生活、文章和照片留出空间。" },
  { time: "最近", title: "整理个人内容系统", desc: "把项目、文章、照片和复盘分门别类，方便之后持续更新。" },
  { time: "过去", title: "积累输入和整理习惯", desc: "阅读、笔记、项目和生活观察，慢慢变成自己的材料库。" },
];

const checklist = [
  "将真实照片放入 public/images/life/。",
  "将求职相关封面放入 public/images/career/。",
  "将公众号二维码放入 public/images/wechat-qr.png。",
  "将简历或个人介绍 PDF 放入 public/resume/Tim-Chen-Resume.pdf。",
  "替换 SITE 中的邮箱、GitHub、公众号名称。",
  "运行 npm install 和 npm run dev。",
];

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-8 grid gap-3 md:grid-cols-[0.85fr_1.15fr] md:items-end">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-700">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-stone-50 md:text-5xl">{title}</h2>
      </div>
      {desc && <p className="max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300 md:text-base">{desc}</p>}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-stone-950/55 p-4 backdrop-blur-xl" onClick={onClose}>
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.25 }} className="relative max-h-[88vh] w-full max-w-5xl overflow-auto rounded-[2rem] bg-[#f6f1e9] shadow-2xl dark:bg-stone-950" onClick={(event) => event.stopPropagation()}>
          <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-stone-950 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white"><X size={18} /></button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DetailBlock({ title, body }) {
  return <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{title}</p><p className="leading-8 text-stone-600 dark:text-stone-300">{body}</p></div>;
}

function ItemDetail({ item, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <img src={item.cover} alt={item.title} className="min-h-[360px] h-full w-full object-cover" />
        <div className="p-7 md:p-10">
          <div className="mb-5 flex flex-wrap items-center gap-2"><Badge>{item.type}</Badge><Badge>{item.year}</Badge><Badge>{item.status}</Badge></div>
          <h2 className="mb-4 text-4xl font-semibold tracking-[-0.06em] text-stone-950 dark:text-white md:text-5xl">{item.title}</h2>
          <p className="mb-7 leading-8 text-stone-600 dark:text-stone-300">{item.desc}</p>
          <div className="space-y-6">
            <DetailBlock title="角色 / 记录方式" body={item.role} />
            <DetailBlock title="背景" body={item.problem} />
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Process</p><ul className="space-y-3 text-stone-600 dark:text-stone-300">{item.process.map((step) => <li key={step} className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-700" />{step}</li>)}</ul></div>
            <DetailBlock title="目前结果" body={item.outcome} />
            <DetailBlock title="之后可以补充" body={item.next} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

function PostDetail({ post, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div>
        <img src={post.cover} alt={post.title} className="h-[320px] w-full object-cover" />
        <article className="mx-auto max-w-3xl p-7 md:p-12">
          <div className="mb-5 flex flex-wrap items-center gap-2"><Badge>{post.category}</Badge><span className="text-sm text-stone-500 dark:text-stone-400">{post.date}</span><span className="text-sm text-stone-400">·</span><span className="text-sm text-stone-500 dark:text-stone-400">{post.readTime}</span></div>
          <h2 className="mb-5 text-4xl font-semibold leading-tight tracking-[-0.06em] text-stone-950 dark:text-white md:text-6xl">{post.title}</h2>
          <p className="mb-10 text-lg leading-8 text-stone-600 dark:text-stone-300">{post.excerpt}</p>
          <div className="space-y-9">{post.content.map((section, index) => <section key={section.heading}><p className="mb-3 text-4xl font-semibold tracking-[-0.06em] text-amber-700">0{index + 1}</p><h3 className="mb-3 text-2xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white">{section.heading}</h3><p className="leading-8 text-stone-600 dark:text-stone-300">{section.body}</p></section>)}</div>
        </article>
      </div>
    </Modal>
  );
}

function PhotoDetail({ photo, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <img src={photo.src} alt={photo.title} className="h-full max-h-[88vh] min-h-[360px] w-full object-cover" />
        <div className="flex flex-col justify-center p-7 md:p-10">
          <div className="mb-5 flex flex-wrap gap-2"><Badge>{photo.tag}</Badge><Badge>{photo.location}</Badge></div>
          <h2 className="mb-5 text-5xl font-semibold tracking-[-0.07em] text-stone-950 dark:text-white">{photo.title}</h2>
          <p className="leading-8 text-stone-600 dark:text-stone-300">{photo.note}</p>
        </div>
      </div>
    </Modal>
  );
}

function ContactDetail({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[380px] bg-stone-950 p-8 text-white dark:bg-white dark:text-stone-950">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,#fbbf24,transparent_28%),radial-gradient(circle_at_80%_70%,#ffffff,transparent_22%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div><p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/55 dark:text-stone-500">Contact</p><h2 className="text-5xl font-semibold leading-tight tracking-[-0.07em]">保持联系，慢慢更新。</h2></div>
            <p className="max-w-sm leading-8 text-white/70 dark:text-stone-600">这里可以放邮箱、GitHub、公众号二维码，也可以以后接入真实表单。</p>
          </div>
        </div>
        <div className="p-7 md:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Reach me</p>
          <h3 className="mb-8 text-3xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white">联系方式</h3>
          <div className="space-y-4">
            <div className="rounded-[1.5rem] bg-white/65 p-5 ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-950 dark:text-white"><Mail size={16} /> Email</p><p className="text-stone-600 dark:text-stone-300">{SITE.email}</p></div>
            <div className="rounded-[1.5rem] bg-white/65 p-5 ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-950 dark:text-white"><Github size={16} /> GitHub</p><p className="text-stone-600 dark:text-stone-300">{SITE.github}</p></div>
            <div className="rounded-[1.5rem] bg-white/65 p-5 ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-950 dark:text-white"><QrCode size={16} /> 公众号</p><p className="mb-4 text-stone-600 dark:text-stone-300">{SITE.wechatName}</p><div className="grid h-32 w-32 place-items-center overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"><img src={ASSETS.wechatQr} alt="公众号二维码" className="h-full w-full object-cover" /><QrCode className="text-stone-300" /></div></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function FeatureCard({ label, title, desc, image, darkCard, onClick }) {
  return <motion.article whileHover={{ y: -6 }} onClick={onClick} className={`cursor-pointer overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5 dark:ring-white/10 ${darkCard ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950" : "bg-white/65 dark:bg-white/10"}`}><img src={image} alt={title} className="h-52 w-full object-cover" /><div className="p-6">{darkCard ? <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs dark:bg-stone-950/10">{label}</span> : <Badge>{label}</Badge>}<h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em]">{title}</h3><p className={`mt-3 leading-7 ${darkCard ? "text-white/70 dark:text-stone-600" : "text-stone-600 dark:text-stone-300"}`}>{desc}</p></div></motion.article>;
}

export default function App() {
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [careerFilter, setCareerFilter] = useState("All");
  const [lifeFilter, setLifeFilter] = useState("All");
  const [postFilter, setPostFilter] = useState("全部");
  const [photoFilter, setPhotoFilter] = useState("全部");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showContact, setShowContact] = useState(false);

  const filteredCareer = useMemo(() => careerItems.filter((item) => (careerFilter === "All" || item.type === careerFilter) && [item.title, item.desc, item.type, ...item.tags].join(" ").toLowerCase().includes(query.toLowerCase())), [careerFilter, query]);
  const filteredLife = useMemo(() => lifeItems.filter((item) => (lifeFilter === "All" || item.type === lifeFilter)), [lifeFilter]);
  const postCategories = ["全部", ...Array.from(new Set(posts.map((post) => post.category)))];
  const photoTags = ["全部", ...Array.from(new Set(photos.map((photo) => photo.tag)))];
  const filteredPosts = useMemo(() => posts.filter((post) => postFilter === "全部" || post.category === postFilter), [postFilter]);
  const filteredPhotos = useMemo(() => photos.filter((photo) => photoFilter === "全部" || photo.tag === photoFilter), [photoFilter]);
  const currentNav = NAV.find((item) => item.id === active) || NAV[0];

  return (
    <div className={dark ? "dark" : ""}>
      <main className="min-h-screen bg-[#f6f1e9] text-stone-950 transition-colors dark:bg-stone-950 dark:text-stone-50">
        <div className="pointer-events-none fixed inset-0 opacity-[0.16] mix-blend-soft-light [background-image:linear-gradient(45deg,rgba(255,255,255,.6)_25%,transparent_25%),linear-gradient(-45deg,rgba(0,0,0,.18)_25%,transparent_25%)] [background-size:7px_7px]" />

        <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f6f1e9]/75 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/75 md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <button onClick={() => setActive("home")} className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-stone-950 text-white shadow-sm dark:bg-white dark:text-stone-950"><Sparkles size={18} /></div><div className="text-left"><p className="text-sm font-bold tracking-[-0.03em]">{SITE.name}</p><p className="hidden text-xs text-stone-500 dark:text-stone-400 sm:block">Career & Life Archive</p></div></button>
            <nav className="hidden items-center gap-1 rounded-full border border-black/5 bg-white/45 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 lg:flex">{NAV.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setActive(item.id)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${active === item.id ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950" : "text-stone-600 hover:bg-white/70 dark:text-stone-300 dark:hover:bg-white/10"}`}><Icon size={15} />{item.label}</button>; })}</nav>
            <div className="flex items-center gap-2"><Button variant="outline" onClick={() => setDark(!dark)}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button><a href={ASSETS.resumePdf} download><Button variant="outline" className="hidden md:inline-flex"><Download size={15} className="mr-2" />简历/介绍</Button></a><Button onClick={() => setShowContact(true)}>联系我 <ArrowRight size={15} className="ml-2" /></Button></div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:hidden"><div className="flex gap-2 overflow-x-auto pb-2">{NAV.map((item) => <button key={item.id} onClick={() => setActive(item.id)} className={`shrink-0 rounded-full px-4 py-2 text-sm ${active === item.id ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950" : "bg-white/60 text-stone-600 dark:bg-white/10 dark:text-stone-300"}`}>{item.label}</button>)}</div></div>

        <AnimatePresence mode="wait">
          <motion.div key={active + String(dark)} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.32 }} className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
            {active === "home" && <><section className="grid min-h-[78vh] items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]"><div><div className="mb-5 flex flex-wrap gap-2">{SITE.introTags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div><h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.07em] md:text-7xl lg:text-8xl">{SITE.headline}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 md:text-lg">{SITE.subHeadline}</p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={() => setActive("career")}>看求职模块 <ChevronRight size={16} className="ml-1" /></Button><Button onClick={() => setActive("life")} variant="outline">看生活模块</Button><a href={ASSETS.resumePdf} download><Button variant="outline"><Download size={15} className="mr-2" />下载简历/介绍</Button></a></div></div><div className="relative min-h-[560px]"><motion.div initial={{ rotate: -3, y: 20 }} animate={{ rotate: -2, y: 0 }} className="absolute left-0 top-8 h-[360px] w-[56%] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-black/5"><img src={photos[0].src} alt="生活切片" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" /><div className="absolute bottom-6 left-6 text-white"><Camera className="mb-5" /><p className="text-xs uppercase tracking-[0.18em] text-white/70">life</p><h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">生活切片</h3></div></motion.div><motion.div initial={{ rotate: 4, y: -10 }} animate={{ rotate: 3, y: 0 }} className="absolute right-0 top-0 h-[430px] w-[62%] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-black/5"><img src={careerItems[0].cover} alt="求职模块" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-7 left-7 text-white"><Briefcase className="mb-5" /><p className="text-xs uppercase tracking-[0.18em] text-white/70">career</p><h3 className="mt-2 text-4xl font-semibold tracking-[-0.06em]">正式但不紧绷</h3></div></motion.div><motion.div initial={{ rotate: 7, y: 24 }} animate={{ rotate: 6, y: 0 }} className="absolute bottom-8 left-[22%] h-[230px] w-[58%] rounded-[2.2rem] bg-stone-950 p-6 text-white shadow-2xl dark:bg-white dark:text-stone-950"><div className="flex h-full flex-col justify-between"><Star className="text-amber-300" /><div><p className="text-xs uppercase tracking-[0.18em] text-white/60 dark:text-stone-500">both sides</p><h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">认真做事，也认真生活</h3></div></div></motion.div></div></section><section className="pb-16"><SectionTitle eyebrow="Featured" title="首页先放这三块" desc="左边是正式展示，中间是文字记录，右边是生活切片。" /><div className="grid gap-5 lg:grid-cols-3"><FeatureCard label="求职模块" title={careerItems[0].title} desc={careerItems[0].desc} image={careerItems[0].cover} onClick={() => setSelectedItem(careerItems[0])} /><FeatureCard label="文章" title={posts[0].title} desc={posts[0].excerpt} image={posts[0].cover} darkCard onClick={() => setSelectedPost(posts[0])} /><FeatureCard label="生活模块" title={lifeItems[2].title} desc={lifeItems[2].desc} image={lifeItems[2].cover} onClick={() => setSelectedItem(lifeItems[2])} /></div></section></>}

            {active === "about" && <section className="py-12"><SectionTitle eyebrow="About" title="关于这个网站" desc="这个网站不是单纯的简历页，也不是纯生活博客，而是两者之间的一个个人空间。" /><div className="grid gap-5 md:grid-cols-3">{[["正式的一面", "保留简历入口、能力卡片、项目整理和资料归档，方便需要时快速展示。", Briefcase], ["松弛的一面", "记录生活照片、文章草稿、阅读片段和阶段性复盘，慢慢更新，不追求完整。", Coffee], ["长期的一面", "把想法、经历和日常逐渐整理成一个可以回看的个人 archive。", Sparkles]].map(([title, desc, Icon]) => <Card key={title}><CardContent><Icon className="mb-8 text-amber-700" /><h3 className="mb-3 text-2xl font-semibold tracking-[-0.05em]">{title}</h3><p className="leading-7 text-stone-600 dark:text-stone-300">{desc}</p></CardContent></Card>)}</div></section>}

            {active === "career" && <section className="py-12"><SectionTitle eyebrow="Career" title="求职模块" desc="这里不需要写得很功利。保持正式、清楚、可下载即可。" /><div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div className="relative max-w-md flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索能力、项目、标签..." className="w-full rounded-full border border-black/5 bg-white/70 py-3 pl-11 pr-4 outline-none dark:border-white/10 dark:bg-white/10" /></div><div className="flex gap-2 overflow-x-auto">{["All", "Profile", "Work", "Method"].map((filter) => <FilterButton key={filter} active={careerFilter === filter} onClick={() => setCareerFilter(filter)}>{filter}</FilterButton>)}</div></div><div className="mb-6 rounded-[2rem] bg-stone-950 p-7 text-white dark:bg-white dark:text-stone-950"><p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50 dark:text-stone-500">download</p><h3 className="mb-4 text-3xl font-semibold tracking-[-0.05em]">简历 / 个人介绍入口</h3><p className="mb-5 max-w-2xl leading-8 text-white/70 dark:text-stone-600">如果这个网站用于正式场景，可以把 PDF 放在 public/resume/Tim-Chen-Resume.pdf。平时也可以改成个人介绍 PDF。</p><a href={ASSETS.resumePdf} download><Button variant="outline"><Download size={15} className="mr-2" />下载 PDF</Button></a></div><div className="grid gap-5 md:grid-cols-3">{filteredCareer.map((item) => <motion.article whileHover={{ y: -6 }} key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer overflow-hidden rounded-[2rem] bg-white/65 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"><img src={item.cover} alt={item.title} className="h-44 w-full object-cover" /><div className="p-6"><div className="mb-6 flex items-center justify-between"><Badge>{item.type}</Badge><span className="text-xs text-stone-500">{item.year}</span></div><h3 className="mb-3 text-2xl font-semibold tracking-[-0.05em]">{item.title}</h3><p className="mb-5 leading-7 text-stone-600 dark:text-stone-300">{item.desc}</p><div className="mb-6 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 dark:bg-white/10 dark:text-stone-300">#{tag}</span>)}</div><button className="inline-flex items-center text-sm font-semibold text-amber-700">查看详情 <ArrowRight size={14} className="ml-1" /></button></div></motion.article>)}</div></section>}

            {active === "life" && <section className="py-12"><SectionTitle eyebrow="Life" title="生活模块" desc="这里更轻松：照片、散步、阅读、生活片段和一些不急着写完的想法。" /><div className="mb-6 flex gap-2 overflow-x-auto">{["All", "Notes", "Reading", "Life"].map((filter) => <FilterButton key={filter} active={lifeFilter === filter} onClick={() => setLifeFilter(filter)}>{filter}</FilterButton>)}</div><div className="grid gap-5 md:grid-cols-3">{filteredLife.map((item) => <motion.article whileHover={{ y: -6 }} key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer overflow-hidden rounded-[2rem] bg-white/65 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"><img src={item.cover} alt={item.title} className="h-44 w-full object-cover" /><div className="p-6"><div className="mb-6 flex items-center justify-between"><Badge>{item.type}</Badge><span className="text-xs text-stone-500">{item.year}</span></div><h3 className="mb-3 text-2xl font-semibold tracking-[-0.05em]">{item.title}</h3><p className="mb-5 leading-7 text-stone-600 dark:text-stone-300">{item.desc}</p><div className="mb-6 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 dark:bg-white/10 dark:text-stone-300">#{tag}</span>)}</div><button className="inline-flex items-center text-sm font-semibold text-amber-700">打开记录 <ArrowRight size={14} className="ml-1" /></button></div></motion.article>)}</div><div className="mt-10"><SectionTitle eyebrow="Gallery" title="照片切片" desc="先放几张生活占位图，之后可以直接替换成真实照片。" /><div className="columns-1 gap-5 md:columns-2 lg:columns-4">{filteredPhotos.map((photo, index) => <motion.article whileHover={{ y: -6 }} key={photo.id} onClick={() => setSelectedPhoto(photo)} className="mb-5 inline-block w-full cursor-pointer overflow-hidden rounded-[2rem] bg-white/65 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"><img src={photo.src} alt={photo.title} className={`${index % 2 === 0 ? "h-64" : "h-80"} w-full object-cover`} /><div className="p-5"><div className="mb-4 flex items-center justify-between"><Badge>{photo.tag}</Badge><span className="text-sm text-stone-500">0{index + 1}</span></div><h3 className="text-2xl font-semibold tracking-[-0.04em] text-stone-900 dark:text-white">{photo.title}</h3></div></motion.article>)}</div></div></section>}

            {active === "journal" && <section className="py-12"><SectionTitle eyebrow="Journal" title="文章" desc="这里既可以放正式复盘，也可以放生活随笔。" /><div className="mb-6 flex gap-2 overflow-x-auto">{postCategories.map((category) => <FilterButton key={category} active={postFilter === category} onClick={() => setPostFilter(category)}>{category}</FilterButton>)}</div><div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><div className="space-y-4">{filteredPosts.map((post) => <motion.article whileHover={{ x: 5 }} key={post.id} onClick={() => setSelectedPost(post)} className="grid cursor-pointer overflow-hidden rounded-[2rem] bg-white/65 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10 md:grid-cols-[240px_1fr]"><img src={post.cover} alt={post.title} className="h-full min-h-[190px] w-full object-cover" /><div className="p-6"><div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-stone-500"><Badge>{post.category}</Badge><span>{post.date}</span><span>·</span><span>{post.readTime}</span></div><h3 className="mb-3 text-2xl font-semibold tracking-[-0.05em]">{post.title}</h3><p className="mb-5 leading-7 text-stone-600 dark:text-stone-300">{post.excerpt}</p><button className="inline-flex items-center text-sm font-semibold text-amber-700">阅读详情 <ArrowRight size={14} className="ml-1" /></button></div></motion.article>)}</div><Card className="bg-stone-950 text-white dark:bg-white dark:text-stone-950"><CardContent><Tags className="mb-8 text-amber-300 dark:text-amber-700" /><h3 className="mb-4 text-3xl font-semibold tracking-[-0.05em]">栏目想法</h3><div className="space-y-3 text-sm text-white/75 dark:text-stone-600"><p>01 正式复盘</p><p>02 生活切片</p><p>03 阅读摘记</p><p>04 项目整理</p><p>05 月度小结</p></div></CardContent></Card></div></section>}

            {active === "timeline" && <section className="py-12"><SectionTitle eyebrow="Timeline" title="时间线" desc="不是严格的履历时间线，更像记录每个阶段在关注什么。" /><div className="relative space-y-5 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-stone-300 dark:before:bg-white/20">{timeline.map((item) => <div key={item.title} className="relative grid gap-4 pl-14 md:grid-cols-[180px_1fr]"><div className="absolute left-2 top-2 h-7 w-7 rounded-full border-4 border-[#f6f1e9] bg-amber-700 dark:border-stone-950" /><p className="text-sm font-semibold text-amber-700">{item.time}</p><div className="rounded-[2rem] bg-white/65 p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"><h3 className="mb-2 text-2xl font-semibold tracking-[-0.05em]">{item.title}</h3><p className="leading-7 text-stone-600 dark:text-stone-300">{item.desc}</p></div></div>)}</div></section>}

            {active === "setup" && <section className="py-12"><SectionTitle eyebrow="Setup" title="使用说明" desc="这个项目可以直接本地运行，也可以免费部署到 Vercel。" /><div className="grid gap-5 lg:grid-cols-[1fr_1fr]"><Card><CardContent><FileText className="mb-8 text-amber-700" /><h3 className="mb-4 text-2xl font-semibold tracking-[-0.05em]">本地运行</h3><pre className="overflow-auto rounded-2xl bg-stone-950 p-5 text-xs leading-6 text-white"><code>{`npm install\nnpm run dev\n\n# 构建预览\nnpm run build\nnpm run preview`}</code></pre></CardContent></Card><Card className="bg-stone-950 text-white dark:bg-white dark:text-stone-950"><CardContent><Briefcase className="mb-8 text-amber-300 dark:text-amber-700" /><h3 className="mb-4 text-2xl font-semibold tracking-[-0.05em]">替换清单</h3><ul className="space-y-3 text-sm leading-7 text-white/75 dark:text-stone-600">{checklist.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-300 dark:bg-amber-700" />{item}</li>)}</ul></CardContent></Card></div></section>}
          </motion.div>
        </AnimatePresence>

        <footer className="border-t border-black/5 px-4 py-10 text-center text-sm text-stone-500 dark:border-white/10 dark:text-stone-400 md:px-8"><p>© 2026 {SITE.name}. Built as a living archive. 当前页面：{currentNav.label}</p></footer>

        {selectedItem && <ItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />}
        {selectedPost && <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />}
        {selectedPhoto && <PhotoDetail photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
        {showContact && <ContactDetail onClose={() => setShowContact(false)} />}
      </main>
    </div>
  );
}

import React, { useMemo, useState } from 'react'
import {
  Search,
  Home,
  Package,
  Monitor,
  AlertTriangle,
  Database,
  Truck,
  HardHat,
  GraduationCap,
  BarChart3,
  Globe2,
  Star,
  HelpCircle,
  Bookmark,
  Clock,
  User,
  Bell,
  ChevronRight,
  Settings,
  FileText,
  Wrench,
  Layers,
} from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'operation', label: '运营流程', icon: Package },
  { key: 'system', label: '系统管理', icon: Monitor },
  { key: 'error', label: '异常处理', icon: AlertTriangle },
  { key: 'inventory', label: '库存管理', icon: Database },
  { key: 'export', label: '出口运营', icon: Truck },
  { key: 'field', label: '现场管理', icon: HardHat },
  { key: 'training', label: '培训资料', icon: GraduationCap },
  { key: 'improvement', label: 'KPI & 改善', icon: BarChart3 },
  { key: 'global', label: '全球标准', icon: Globe2 },
  { key: 'favorites', label: '收藏夹', icon: Star },
]

const quickCards = [
  { title: '运营流程', desc: '入库、出库、拣选、工程出库', icon: Package, key: 'operation' },
  { title: '系统管理', desc: 'WMS、WCS、RCP、SAP', icon: Monitor, key: 'system' },
  { title: '异常处理', desc: '错误代码、故障解决、恢复步骤', icon: AlertTriangle, key: 'error' },
  { title: '库存管理', desc: '库存查询、调整、盘点、FIFO', icon: Database, key: 'inventory' },
  { title: '出口运营', desc: '出口流程、混载、部分入库、文件', icon: Truck, key: 'export' },
  { title: '现场管理', desc: '安全、设备、动线、5S', icon: HardHat, key: 'field' },
]

const popularDocs = [
  { title: 'NOREAD 发生时对应方法', category: '异常处理', date: '2025-05-20', keywords: ['NOREAD', '标签', 'WCS'] },
  { title: 'WMS / WCS 不同步对应 SOP', category: '异常处理', date: '2025-05-18', keywords: ['WMS', 'WCS', '库存移动'] },
  { title: '入库流程 AUTIN 操作指南', category: '运营流程', date: '2025-05-15', keywords: ['AUTIN', '入库', 'WMS'] },
  { title: 'RGV 错误代码整理', category: '异常处理', date: '2025-05-14', keywords: ['RGV', 'SITE141', '设备'] },
  { title: '공출고 处理流程', category: '运营流程', date: '2025-05-12', keywords: ['공출고', 'WCS', '手动出库'] },
]

const notices = [
  { title: '5月系统点检通知', date: '2025-05-21' },
  { title: 'RCP 系统账号变更 안내', date: '2025-05-19' },
  { title: '新人培训资料上传', date: '2025-05-17' },
  { title: '安全点检结果共享', date: '2025-05-16' },
  { title: 'KPI 报告模板更新', date: '2025-05-15' },
]

const tags = ['NOREAD', 'SITE141', '库存移动', '공출고', 'KPP', '더블 JOB']

const categoryMap = {
  operation: ['入库流程', '出库流程', '拣选 / 分拣', '工程出库', '混载 / 部分入库', 'KPP 管理', 'NOREAD 处理', 'FIFO 管理', '库存移动', '托盘拆分 / 合并'],
  system: ['WMS', 'WCS', 'RCP', 'SAP', 'MES', '系统接口结构', '接口错误处理', '权限管理', '主数据管理'],
  error: ['WMS/WCS 不同步', '未作业状态', 'Double Job', 'RGV 错误', 'SITE141 错误', 'NOREAD 发生', '工程出库异常', '库存移动异常', 'SAP 批次错误'],
  inventory: ['可用库存', '分配库存', '冻结库存', '库存调整', '移动中库存', 'FIFO / 批次管理', '效期管理', '库存盘点', '库存事务追踪'],
  export: ['出口流程总览', '混载 LCL', '部分入库', '国家/地区条件', '装车/配载代码', '集装箱管理', '文件管理', '报关流程'],
  field: ['安全管理', '设备管理', 'Dock 管理', '叉车动线管理', '人员动线管理', '托盘标准', '包装标准', '货物堆码标准', '5S 管理'],
  training: ['新人培训 Day 1~30', '系统培训', '岗位操作培训', '安全培训', '设备培训', '异常处理培训', '术语词典', 'FAQ'],
  improvement: ['KPI 指标', '改善案例', '问题分析', '改善任务', '成果确认', '报告模板', '创意提案'],
  global: ['中国嘉兴项目', '运营标准化', '差异分析', '全球模板', '术语标准化', '多语言资料', '现场教育资料'],
}

function IconBadge({ Icon, active = false }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${active ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
      <Icon size={22} strokeWidth={2.2} />
    </div>
  )
}

export default function MiryangAutoOpsPortal() {
  const [active, setActive] = useState('home')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return popularDocs
    return popularDocs.filter((doc) => [doc.title, doc.category, ...doc.keywords].some((x) => x.toLowerCase().includes(q)))
  }, [query])

  const currentList = categoryMap[active] || []

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <Package size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">密阳自动化物流知识库</h1>
              <p className="text-sm text-slate-500">全球标准化 · 可搜索 · 可持续更新</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <button className="flex items-center gap-2 hover:text-blue-600">
              <Search size={18} />搜索
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600">
              <Bookmark size={18} />收藏
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600">
              <Clock size={18} />最近浏览
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600">
              <Bell size={18} />通知
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600">
              <User size={18} />我的
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-5rem)] w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-8 lg:block">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = active === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-10 border-t border-slate-200 pt-6">
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <HelpCircle size={20} />快速帮助
            </button>
            <button className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Settings size={20} />系统设置
            </button>
          </div>

          <div className="absolute bottom-8 text-xs text-slate-400">
            <p>版本：v1.0</p>
            <p className="mt-1">更新时间：2025-05-21</p>
          </div>
        </aside>

        <main className="flex-1 px-5 py-8 md:px-8 lg:px-12">
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight">你好，欢迎来到知识库 👋</h2>
              <p className="mt-3 text-slate-600">快速搜索你需要的内容，让现场问题更快被解决。</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                  <Search className="text-slate-400" size={24} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                    placeholder="输入关键词，例如：NOREAD、WMS、SITE141、库存移动..."
                  />
                </div>
                <button className="rounded-2xl bg-blue-600 px-10 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700">
                  搜索
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">热门搜索：</span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.section>

          {active === 'home' ? (
            <>
              <section className="mt-9 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold">快速入口</h3>
                  <button className="text-sm font-medium text-blue-600">自定义</button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
                  {quickCards.map((card) => {
                    const Icon = card.icon
                    return (
                      <button
                        key={card.key}
                        onClick={() => setActive(card.key)}
                        className="group rounded-3xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                      >
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                          <Icon size={30} />
                        </div>
                        <p className="font-bold">{card.title}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{card.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold">热门文档</h3>
                    <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-600">
                      查看更多 <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {results.map((doc, idx) => (
                      <div key={doc.title} className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-slate-50">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">{idx + 1}</div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{doc.title}</p>
                        </div>
                        <span className="rounded-xl bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{doc.category}</span>
                        <span className="hidden text-sm text-slate-500 md:block">{doc.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold">最新公告</h3>
                    <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-600">
                      查看更多 <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <div key={notice.title} className="flex items-center justify-between gap-4 rounded-2xl p-3 transition hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
                          <p className="font-medium">{notice.title}</p>
                        </div>
                        <span className="text-sm text-slate-500">{notice.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <footer className="mt-10 text-center text-sm text-slate-500">
                💡 知识分享 · 经验沉淀 · 持续改善 · 共创价值
              </footer>
            </>
          ) : (
            <section className="mt-9 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <IconBadge Icon={(navItems.find((x) => x.key === active) || navItems[0]).icon} active />
                <div>
                  <h3 className="text-2xl font-bold">{(navItems.find((x) => x.key === active) || navItems[0]).label}</h3>
                  <p className="mt-1 text-sm text-slate-500">选择一个主题开始整理 SOP / 操作指南 / 异常案例。</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentList.map((item, index) => (
                  <button key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <FileText className="text-blue-600" size={22} />
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="font-bold">{item}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">点击后可进入文档、流程图、检查点与异常处理记录。</p>
                  </button>
                ))}
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl bg-blue-50 p-6">
                  <Wrench className="mb-3 text-blue-600" />
                  <h4 className="font-bold">推荐文档结构</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">目的 → 适用范围 → 相关系统 → 操作步骤 → 注意事项 → 异常处理 → 现场确认点。</p>
                </div>
                <div className="rounded-3xl bg-emerald-50 p-6">
                  <Layers className="mb-3 text-emerald-600" />
                  <h4 className="font-bold">标签建议</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">#WMS #WCS #RCP #ERROR #EXPORT #KPP #FIFO #SAFETY</p>
                </div>
                <div className="rounded-3xl bg-amber-50 p-6">
                  <AlertTriangle className="mb-3 text-amber-600" />
                  <h4 className="font-bold">现场优先原则</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">先确认实物，再处理电算。任何异常都要留下原因、处理人、结果确认。</p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

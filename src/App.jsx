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
  { title: '运营流程', desc: '入库、出库、拣选、공출고 标准路径', icon: Package, key: 'operation' },
  { title: '系统管理', desc: 'WMS、WCS、RCP、SAP 权限与接口', icon: Monitor, key: 'system' },
  { title: '异常处理', desc: 'NOREAD、SITE141、Double Job 恢复', icon: AlertTriangle, key: 'error' },
  { title: '库存管理', desc: '库存查询、调整、盘点、FIFO / FEFO', icon: Database, key: 'inventory' },
  { title: '出口运营', desc: '出口流程、혼재、部分入库、文件', icon: Truck, key: 'export' },
  { title: '现场管理', desc: '安全、设备、动线、5S / 안전점검', icon: HardHat, key: 'field' },
]

const knowledgeModules = {
  operation: {
    title: '运营流程',
    subtitle: '覆盖从收货入库到生产/工程出库的标准作业路径，统一 WMS、WCS 与现场确认口径。',
    cards: [
      {
        title: '入库 AUTIN',
        desc: 'ASN 到货、条码扫描、自动入库指令、上架完成确认。',
        tags: ['AUTIN', '입고', 'WMS', 'WCS'],
        owner: '入库班长',
        steps: ['核对 ASN、车型、供应商与批次', '确认托盘标签可读并完成 스캔', '观察 WCS 入库任务是否正常下发', '上架完成后抽查库位与系统一致'],
        checks: ['标签方向朝外，禁止遮挡条码', 'NOREAD 需先重扫再判断是否补打标签', '异常托盘进入待处理区并登记原因'],
      },
      {
        title: '出库 / 拣选',
        desc: '按生产计划、配送波次与库位策略完成拣选、复核和交接。',
        tags: ['출고', 'Picking', 'FIFO', 'KPP'],
        owner: '出库担当',
        steps: ['接收 WMS 出库波次', '按 FIFO 或批次要求执行拣选', '复核 SKU、数量、批次与目的地', '完成交接并关闭系统任务'],
        checks: ['先进先出例外必须保留 승인 记录', '少量尾数使用指定周转容器', '复核人与作业人分离确认'],
      },
      {
        title: '工程出库 공출고',
        desc: '工程样品、维修备件、临时需求的手动出库与回写规则。',
        tags: ['공출고', 'Manual', 'SAP', '승인'],
        owner: '运营主管',
        steps: ['确认申请部门、用途和审批状态', '在 WMS 创建手动出库任务', '现场拣货后拍照或签收留痕', '同步 SAP 消耗或移动凭证'],
        checks: ['无审批不得出库', '工程出库不得混入量产发料', '当天完成系统关闭，避免 미처리 状态'],
      },
    ],
  },
  system: {
    title: '系统管理',
    subtitle: '沉淀 WMS、WCS、RCP、SAP 的账号、接口、主数据与每日点检方法。',
    cards: [
      {
        title: 'WMS / WCS 接口点检',
        desc: '检查库存移动、任务状态、接口队列与自动化设备指令链路。',
        tags: ['WMS', 'WCS', 'Interface', 'Queue'],
        owner: '系统管理员',
        steps: ['查看接口队列是否存在 적체', '比对 WMS 任务号与 WCS Job ID', '确认设备回传状态是否闭环', '记录异常时间段和影响范围'],
        checks: ['接口重发前先截图保留原始错误', '禁止重复下发同一出库任务', '恢复后抽查 3 笔库存事务'],
      },
      {
        title: 'RCP 账号与权限',
        desc: '维护作业员、班长、管理员权限，避免越权操作和共用账号。',
        tags: ['RCP', '권한', 'Account', 'Audit'],
        owner: 'IT / 运营管理',
        steps: ['按岗位模板申请账号', '绑定员工编号和班组', '每月复核离职、调岗、临时账号', '导出权限变更记录'],
        checks: ['管理员账号必须使用 개인 계정', '临时权限设置到期日', '重大操作需保留审批编号'],
      },
      {
        title: 'SAP 主数据同步',
        desc: '物料、批次、供应商、库存地点与移动类型的同步确认。',
        tags: ['SAP', 'Master Data', 'Batch', 'Plant'],
        owner: '主数据担当',
        steps: ['确认物料状态和库存地点开放', '检查批次属性与效期字段', '同步失败时比对错误消息', '通知 SAP 담당자 修正并重传'],
        checks: ['主数据未同步不得强制收货', '批次 오류 需确认是否影响 FIFO', '保留变更前后截图'],
      },
    ],
  },
  error: {
    title: '异常处理',
    subtitle: '把高频错误从“靠经验处理”转为可检索、可复盘、可升级的 SOP。',
    cards: [
      {
        title: 'NOREAD 标签未读',
        desc: '自动线无法识别托盘或箱标签时的现场确认、补打与重入线流程。',
        tags: ['NOREAD', 'Label', 'Scanner', '복구'],
        owner: '现场班长',
        steps: ['暂停该托盘继续流转', '检查标签破损、位置、污渍和方向', '手持终端重扫确认条码内容', '补打标签后从指定入口重新投入'],
        checks: ['不得手动修改未核实的托盘号', '连续发生 3 次需通知设备担当清洁 Scanner', '记录发生库位、设备号和照片'],
      },
      {
        title: 'SITE141 / RGV 错误',
        desc: 'RGV 任务卡滞、站点占用、信号未回传时的恢复顺序。',
        tags: ['SITE141', 'RGV', '설비', 'WCS'],
        owner: '设备担当',
        steps: ['确认现场是否有人或货物占道', '在 RCP 查看 RGV 当前任务', '按设备 SOP 执行 Reset 或 수동 운전', '恢复后关闭 WCS 异常任务'],
        checks: ['进入设备区域前必须执行 안전 확인', '禁止同时由多人下达移动指令', '恢复后确认无残留占位状态'],
      },
      {
        title: 'WMS / WCS 不同步',
        desc: '系统库存、任务状态或库位状态不一致时的排查和补偿。',
        tags: ['Sync', '재고이동', 'WMS', 'WCS'],
        owner: '系统管理员',
        steps: ['锁定异常托盘和任务号', '比对 WMS 库存事务与 WCS 设备日志', '判断是实物先行还是系统未回写', '按审批执行重发、取消或手工调整'],
        checks: ['先确认实物位置，再做系统处理', '所有手工调整需双人确认', '复盘时标记根因：接口、设备、操作或主数据'],
      },
    ],
  },
  inventory: {
    title: '库存管理',
    subtitle: '围绕账实一致、批次追踪、先进先出和盘点闭环建立库存治理规则。',
    cards: [
      {
        title: '库存查询与追踪',
        desc: '按物料、批次、库位、托盘号查询库存状态和历史事务。',
        tags: ['Inventory', 'Lot', 'Pallet', 'Trace'],
        owner: '库存担当',
        steps: ['输入 SKU / Lot / HU 查询库存', '确认可用、冻结、分配、移动中状态', '追踪最近 10 笔事务', '导出记录用于异常分析'],
        checks: ['移动中库存需确认是否有未关闭任务', '冻结库存不可参与分配', '查询结果需标注 기준 시간'],
      },
      {
        title: '盘点 Cycle Count',
        desc: '按 ABC 等级和异常库位执行循环盘点，形成差异原因库。',
        tags: ['盘点', 'Cycle Count', '차이', 'Audit'],
        owner: '库存主管',
        steps: ['冻结盘点范围内的移动任务', '现场扫描并记录实物数量', '系统比对差异并二次确认', '审批后执行库存调整'],
        checks: ['盘点人不得提前查看系统数量', '差异需分类：漏扫、错位、破损、系统异常', '重大差异当天升级'],
      },
      {
        title: 'FIFO / FEFO 管理',
        desc: '按入库日期、批次和效期控制出库顺序，减少呆滞和过期风险。',
        tags: ['FIFO', 'FEFO', '유효기간', 'Batch'],
        owner: '计划 / 库存',
        steps: ['维护物料 FIFO 或 FEFO 策略', '出库前检查推荐批次', '例外发料提交审批', '每周输出临期和呆滞清单'],
        checks: ['效期字段为空需阻断入库', '例外原因写明客户、品质或工程需求', '优先处理 장기재고'],
      },
    ],
  },
  export: {
    title: '出口运营',
    subtitle: '整理从出口订单、混载、装车到文件交付的跨部门协同流程。',
    cards: [
      {
        title: '出口流程总览',
        desc: '订单确认、库存分配、拣选复核、装车、文件和系统关闭。',
        tags: ['Export', '출하', 'Invoice', 'Packing List'],
        owner: '出口担当',
        steps: ['确认出口订单和国家条件', '锁定库存并生成拣选任务', '完成包装、唛头和装箱复核', '提交 Invoice / Packing List 并关闭出货'],
        checks: ['订单、箱单、实物三方一致', '目的国家特殊要求提前 확인', '出货后回传装车照片和 Seal No.'],
      },
      {
        title: '混载 혼재 / LCL',
        desc: '多个订单或目的地共用车辆、容器时的分隔、标识与复核规则。',
        tags: ['혼재', 'LCL', 'Loading', 'Label'],
        owner: '装车班长',
        steps: ['按目的地和订单分区摆放', '使用颜色标签区分混载批次', '装车前逐托盘复核', '记录装载顺序和位置'],
        checks: ['不同客户货物不得无隔离混放', '尾数箱需单独标识', '装车图与实际装载一致'],
      },
      {
        title: '部分入库 / 부분입고',
        desc: '供应商或出口退回数量不完整时的接收、差异和后续补齐。',
        tags: ['부분입고', 'Shortage', 'Return', 'ASN'],
        owner: '收发货担当',
        steps: ['确认 ASN 与实到数量差异', '创建部分入库记录', '通知采购 / 客户服务确认补货计划', '后续补齐时关联原差异单'],
        checks: ['差异照片和签收单必须上传', '不得用其他批次补平原批次差异', '超 24 小时未确认需升级'],
      },
    ],
  },
  field: {
    title: '现场管理',
    subtitle: '把安全、设备、动线、5S 和人员交接固化为日常可执行检查点。',
    cards: [
      {
        title: '安全点检 안전점검',
        desc: '班前、班中、班后的人员、设备、消防和通道安全检查。',
        tags: ['Safety', '안전점검', 'PPE', '5S'],
        owner: '安全担当',
        steps: ['班前确认 PPE 和作业许可', '检查消防通道、急停按钮和警示灯', '班中巡检叉车、RGV 区域和 Dock', '班后关闭异常项并上传照片'],
        checks: ['红色通道不得堆放货物', '设备异常先挂牌再报修', '未关闭隐患进入交接清单'],
      },
      {
        title: '设备与 Dock 管理',
        desc: '自动化设备、月台、门禁和装卸资源的状态管理。',
        tags: ['Dock', '설비', 'RGV', 'PM'],
        owner: '设备 / 现场',
        steps: ['登记设备可用状态', '按出货计划分配 Dock', '设备保养期间设置禁用标识', '异常占用时通知计划调整节奏'],
        checks: ['Dock 门编号与系统一致', '保养窗口不得创建自动任务', '设备恢复需现场和系统双确认'],
      },
      {
        title: '叉车 / 人员动线',
        desc: '控制人车分流、交叉口让行、临时堆放和高峰期调度。',
        tags: ['동선', 'Forklift', 'Traffic', '5S'],
        owner: '现场主管',
        steps: ['维护叉车单向通道和限速标识', '高峰时段设置临时指挥点', '异常货物移动到 지정 구역', '班后复盘拥堵点'],
        checks: ['人行道不可被托盘占用', '交叉口必须减速鸣笛', '临时堆放超过 2 小时需重新规划库位'],
      },
    ],
  },
}

const allKnowledgeCards = Object.entries(knowledgeModules).flatMap(([moduleKey, module]) =>
  module.cards.map((card) => ({ ...card, moduleKey, category: module.title }))
)

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
  const [selectedCard, setSelectedCard] = useState('operation-入库 AUTIN')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return popularDocs
    const knowledgeResults = allKnowledgeCards
      .filter((doc) => [doc.title, doc.desc, doc.category, ...doc.tags].some((x) => x.toLowerCase().includes(q)))
      .map((doc) => ({
        title: doc.title,
        category: doc.category,
        date: 'V1 模块',
        keywords: doc.tags,
      }))
    const docResults = popularDocs.filter((doc) => [doc.title, doc.category, ...doc.keywords].some((x) => x.toLowerCase().includes(q)))
    return [...docResults, ...knowledgeResults]
  }, [query])

  const currentList = categoryMap[active] || []
  const currentModule = knowledgeModules[active]
  const activeModuleCard = currentModule?.cards.find((card) => `${active}-${card.title}` === selectedCard) || currentModule?.cards[0]

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
                  onClick={() => {
                    setActive(item.key)
                    if (knowledgeModules[item.key]) setSelectedCard(`${item.key}-${knowledgeModules[item.key].cards[0].title}`)
                  }}
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
                        onClick={() => {
                          setActive(card.key)
                          setSelectedCard(`${card.key}-${knowledgeModules[card.key].cards[0].title}`)
                        }}
                        className="group rounded-3xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                      >
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                          <Icon size={30} />
                        </div>
                        <p className="font-bold">{card.title}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{card.desc}</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                          {knowledgeModules[card.key].cards[0].tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
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
                  <p className="mt-1 text-sm text-slate-500">
                    {currentModule?.subtitle || '选择一个主题开始整理 SOP / 操作指南 / 异常案例。'}
                  </p>
                </div>
              </div>

              {currentModule ? (
                <>
                  <div className="grid gap-4 lg:grid-cols-3">
                    {currentModule.cards.map((card, index) => {
                      const isSelected = activeModuleCard?.title === card.title
                      return (
                        <button
                          key={card.title}
                          onClick={() => setSelectedCard(`${active}-${card.title}`)}
                          className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-md ${
                            isSelected ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white'
                          }`}
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <FileText className={isSelected ? 'text-blue-700' : 'text-blue-600'} size={22} />
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">#{String(index + 1).padStart(2, '0')}</span>
                          </div>
                          <p className="font-bold">{card.title}</p>
                          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{card.desc}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {card.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-7 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50">
                    <div className="border-b border-blue-100 bg-white/70 px-6 py-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-blue-700">当前详情</p>
                          <h4 className="mt-1 text-2xl font-bold text-slate-900">{activeModuleCard?.title}</h4>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{activeModuleCard?.desc}</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-slate-200">
                          <span className="text-slate-500">责任角色</span>
                          <p className="mt-1 font-bold text-slate-900">{activeModuleCard?.owner}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-0 lg:grid-cols-2">
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Wrench className="text-blue-600" size={20} />
                          <h5 className="font-bold">标准操作步骤 SOP</h5>
                        </div>
                        <div className="space-y-3">
                          {activeModuleCard?.steps.map((step, index) => (
                            <div key={step} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
                              <p className="text-sm leading-6 text-slate-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-blue-100 p-6 lg:border-l lg:border-t-0">
                        <div className="mb-4 flex items-center gap-2">
                          <AlertTriangle className="text-amber-500" size={20} />
                          <h5 className="font-bold">现场确认点</h5>
                        </div>
                        <div className="space-y-3">
                          {activeModuleCard?.checks.map((check) => (
                            <div key={check} className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-100">
                              {check}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
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
              )}

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

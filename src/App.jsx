import React, { useMemo, useState } from "react";
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
  Bookmark,
  Clock,
  User,
  Bell,
  ChevronRight,
  ChevronDown,
  FileText,
  ShieldCheck,
  ClipboardList,
  Languages,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { key: "home", zh: "首页", ko: "홈", en: "Home", icon: Home },
  { key: "operation", zh: "运营流程", ko: "운영 프로세스", en: "Operations", icon: Package },
  { key: "system", zh: "系统管理", ko: "시스템 관리", en: "Systems", icon: Monitor },
  { key: "error", zh: "异常处理", ko: "오류 대응", en: "Error Handling", icon: AlertTriangle },
  { key: "inventory", zh: "库存管理", ko: "재고 관리", en: "Inventory", icon: Database },
  { key: "export", zh: "出口运营", ko: "수출 운영", en: "Export", icon: Truck },
  { key: "field", zh: "现场管理", ko: "현장 관리", en: "Field Ops", icon: HardHat },
  { key: "training", zh: "培训资料", ko: "교육 자료", en: "Training", icon: GraduationCap },
  { key: "improvement", zh: "KPI & 改善", ko: "KPI & 개선", en: "KPI & Improvement", icon: BarChart3 },
  { key: "global", zh: "全球标准", ko: "글로벌 표준", en: "Global Standards", icon: Globe2 },
];

const quickCards = [
  { key: "operation", zh: "运营流程", ko: "운영 프로세스", descZh: "入库、出库、拣选、工程出库", descKo: "입고, 출고, 피킹, 공정출고", icon: Package },
  { key: "system", zh: "系统管理", ko: "시스템 관리", descZh: "WMS、WCS、RCP、SAP", descKo: "WMS, WCS, RCP, SAP", icon: Monitor },
  { key: "error", zh: "异常处理", ko: "오류 대응", descZh: "错误代码、故障解决、恢复步骤", descKo: "오류 코드, 원인, 복구 절차", icon: AlertTriangle },
  { key: "inventory", zh: "库存管理", ko: "재고 관리", descZh: "库存查询、调整、盘点、FIFO", descKo: "재고 조회, 조정, 실사, FIFO", icon: Database },
  { key: "export", zh: "出口运营", ko: "수출 운영", descZh: "出口流程、混载、部分入库、文件", descKo: "수출, 혼적, 일부입고, 서류", icon: Truck },
  { key: "field", zh: "现场管理", ko: "현장 관리", descZh: "安全、设备、动线、5S", descKo: "안전, 설비, 동선, 5S", icon: HardHat },
];

const docs = [
  { titleZh: "NOREAD 发生时对应方法", titleKo: "NOREAD 발생 시 대응 방법", categoryZh: "异常处理", categoryKo: "오류 대응", date: "2025-05-20", level: "High", keywords: ["NOREAD", "标签", "라벨", "WCS"] },
  { titleZh: "WMS / WCS 不同步对应 SOP", titleKo: "WMS / WCS 불일치 대응 SOP", categoryZh: "异常处理", categoryKo: "오류 대응", date: "2025-05-18", level: "High", keywords: ["WMS", "WCS", "库存移动", "재고이동"] },
  { titleZh: "入库流程 AUTIN 操作指南", titleKo: "입고 프로세스 AUTIN 작업 가이드", categoryZh: "运营流程", categoryKo: "운영 프로세스", date: "2025-05-15", level: "Normal", keywords: ["AUTIN", "入库", "입고", "WMS"] },
  { titleZh: "RGV 错误代码整理", titleKo: "RGV 오류 코드 정리", categoryZh: "异常处理", categoryKo: "오류 대응", date: "2025-05-14", level: "High", keywords: ["RGV", "SITE141", "设备", "설비"] },
  { titleZh: "공출고 处理流程", titleKo: "공출고 처리 절차", categoryZh: "运营流程", categoryKo: "운영 프로세스", date: "2025-05-12", level: "Normal", keywords: ["공출고", "WCS", "手动出库", "수동출고"] },
];

const categoryMap = {
  operation: ["入库流程 / 입고 프로세스", "出库流程 / 출고 프로세스", "拣选与分拣 / 피킹·선별", "工程出库 / 공정출고", "KPP 管理 / KPP 관리", "FIFO 管理 / FIFO 관리"],
  system: ["WMS", "WCS", "RCP", "SAP", "MES", "系统联动结构 / 시스템 연동 구조"],
  error: ["WMS/WCS 不同步 / WMS-WCS 불일치", "未作业状态 / 미작업 상태", "Double Job", "RGV 错误 / RGV 오류", "SITE141 错误 / SITE141 오류", "NOREAD 发生 / NOREAD 발생"],
  inventory: ["可用库存 / 가용재고", "分配库存 / 할당재고", "冻结库存 / 보류재고", "移动中库存 / 이동중 재고", "批次管理 / 배치 관리", "库存事务追踪 / 재고 트랜잭션"],
  export: ["出口流程总览 / 수출 프로세스", "混载 LCL / 혼적", "国家条件 / 국가별 조건", "集装箱管理 / 컨테이너 관리", "部分入库 / 일부입고", "文件管理 / 서류 관리"],
  field: ["安全管理 / 안전관리", "设备管理 / 설비관리", "Dock 管理 / 도크 관리", "叉车动线 / 지게차 동선", "托盘标准 / 파렛트 기준", "5S 管理 / 5S 관리"],
  training: ["新人 30 天路线 / 신규 교육 30일", "系统培训 / 시스템 교육", "异常处理培训 / 오류 대응 교육", "术语词典 / 용어 사전", "FAQ", "现场教育 / 현장 교육"],
  improvement: ["KPI 指标 / KPI 지표", "改善案例 / 개선 사례", "问题分析 / 문제 분석", "报告模板 / 보고서 템플릿", "创意提案 / 아이디어 제안", "成果确认 / 성과 확인"],
  global: ["中国嘉兴项目 / 중국 가흥 프로젝트", "全球模板 / 글로벌 템플릿", "多语言资料 / 다국어 자료", "差异分析 / 차이점 분석", "运营移管计划 / 운영 이관 계획", "标准化路线图 / 표준화 로드맵"],
};

const hotTags = ["NOREAD", "SITE141", "WMS", "WCS", "KPP", "공출고", "FIFO", "재고이동"];

const languages = [
  { key: "zh", label: "中文", short: "中" },
  { key: "ko", label: "한국어", short: "한" },
  { key: "en", label: "English", short: "EN" },
];

function t(lang, zh, ko, en) {
  if (lang === "zh") return zh;
  if (lang === "ko") return ko;
  return en || zh;
}

function CategoryIcon({ Icon, active }) {
  return (
    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${active ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600"}`}>
      <Icon size={22} />
    </div>
  );
}

export default function MiryangAutoOpsPortal() {
  const [active, setActive] = useState("home");
  const [lang, setLang] = useState("zh");
  const [query, setQuery] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs.filter((doc) =>
      [doc.titleZh, doc.titleKo, doc.categoryZh, doc.categoryKo, ...doc.keywords].some((x) => x.toLowerCase().includes(q))
    );
  }, [query]);

  const currentList = categoryMap[active] || [];
  const activeItem = navItems.find((item) => item.key === active) || navItems[0];

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-8">
          <button onClick={() => setActive("home")} className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <Package size={27} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">{t(lang, "密阳自动化物流知识库", "밀양 자동화 물류 지식포털", "MIRYANG AUTO LOGISTICS PORTAL")}</h1>
              <p className="text-sm text-slate-500">{t(lang, "全球标准化 · 可搜索 · 可持续更新", "글로벌 표준화 · 검색 기반 · 지속 업데이트", "Global Standardization · Searchable · Continuously Updated")}</p>
            </div>
          </button>

          <div className="hidden items-center gap-3 md:flex">
            <button className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600">
              <Search size={18} />{t(lang, "搜索", "검색", "Search")}
            </button>
            <button className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600">
              <Bookmark size={18} />{t(lang, "收藏", "즐겨찾기", "Favorites")}
            </button>
            <button className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600">
              <Clock size={18} />{t(lang, "最近浏览", "최근 문서", "Recent")}
            </button>
            <button className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600">
              <Bell size={18} />{t(lang, "通知", "알림", "Notifications")}
            </button>
            <div className="relative">
              <button
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                <Globe2 size={18} />
                {languages.find((item) => item.key === lang)?.label}
                <ChevronDown size={15} className={`transition ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {languages.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setLang(item.key);
                        setIsLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${lang === item.key ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <span className="flex items-center gap-2">
                        <Languages size={16} />
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-400">{item.short}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
              <User size={19} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="hidden min-h-[calc(100vh-5rem)] w-72 shrink-0 border-r border-slate-200 bg-white/70 px-4 py-6 lg:block">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"}`}
                >
                  <Icon size={19} />
                  {t(lang, item.zh, item.ko, item.en)}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-bold">
              <Sparkles className="text-blue-600" size={18} />
              {t(lang, "现场优先原则", "현장 우선 원칙")}
            </div>
            <p className="text-sm leading-6 text-slate-500">
              {t(lang, "先确认实物，再处理系统。所有异常都要留下原因、处理步骤和结果确认。", "실물을 먼저 확인하고 시스템을 처리합니다. 모든 오류는 원인, 조치, 결과를 기록합니다.")}
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 text-xs text-slate-400 shadow-sm">
            <p>Version v1.0</p>
            <p className="mt-1">Updated 2025-05-21</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 lg:px-9">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm lg:p-9">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  <ShieldCheck size={16} />
                  {t(lang, "自动化仓库运营知识平台", "자동화 창고 운영 지식 플랫폼", "Automation Warehouse Knowledge Platform")}
                </div>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  {t(lang, "需要什么，直接搜索。", "필요한 내용은 바로 검색하세요.", "Search Anything You Need.")}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  {t(
                    lang,
                    "把密阳自动化中心的现场经验、系统操作、异常处理和改善案例整理成一个可检索、可更新、可复制到嘉兴项目的知识库。",
                    "밀양 자동화센터의 현장 경험, 시스템 작업, 오류 대응, 개선 사례를 검색 가능하고 업데이트 가능한 지식 자산으로 정리합니다."
                  )}
                </p>

                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-2">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
                      <Search className="text-slate-400" size={23} />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                        placeholder={t(lang, "输入关键词：NOREAD、WMS、SITE141、库存移动...", "검색어 입력: NOREAD, WMS, SITE141, 재고이동...", "Search: NOREAD, WMS, SITE141, Inventory Move...")}
                      />
                    </div>
                    <button className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700">
                      {t(lang, "搜索", "검색", "Search")}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {hotTags.map((tag) => (
                    <button key={tag} onClick={() => setQuery(tag)} className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-3xl bg-blue-600 p-5 text-white shadow-sm">
                  <p className="text-3xl font-black">125</p>
                  <p className="mt-1 text-sm text-blue-100">{t(lang, "SOP 文档", "SOP 문서", "SOP Documents")}</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
                  <p className="text-3xl font-black">42</p>
                  <p className="mt-1 text-sm text-slate-300">{t(lang, "异常案例", "오류 사례", "Error Cases")}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-3xl font-black text-slate-900">9</p>
                  <p className="mt-1 text-sm text-slate-500">{t(lang, "核心模块", "핵심 모듈", "Core Modules")}</p>
                </div>
              </div>
            </div>
          </motion.section>

          {active === "home" ? (
            <>
              <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                {quickCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button key={card.key} onClick={() => setActive(card.key)} className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                      <CategoryIcon Icon={Icon} />
                      <p className="mt-4 font-black">{t(lang, card.zh, card.ko)}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{t(lang, card.descZh, card.descKo)}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
                        {t(lang, "进入", "열기")} <ArrowRight size={15} />
                      </div>
                    </button>
                  );
                })}
              </section>

              <section className="mt-7 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="text-blue-600" size={21} />
                      <h3 className="text-lg font-black">{t(lang, "热门文档", "인기 문서")}</h3>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600">{t(lang, "查看更多", "더보기")} <ChevronRight size={16} /></button>
                  </div>

                  <div className="space-y-3">
                    {filteredDocs.map((doc, index) => (
                      <button key={doc.titleZh} className="flex w-full items-center gap-4 rounded-2xl p-3 text-left transition hover:bg-slate-50">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-sm font-black text-blue-700">{index + 1}</div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{t(lang, doc.titleZh, doc.titleKo)}</p>
                          <p className="mt-1 text-xs text-slate-400">{doc.keywords.slice(0, 3).join(" · ")}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${doc.level === "High" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>{doc.level}</span>
                        <span className="hidden text-sm text-slate-400 md:block">{doc.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2">
                    <ClipboardList className="text-blue-600" size={21} />
                    <h3 className="text-lg font-black">{t(lang, "SOP 标准模板", "SOP 표준 템플릿")}</h3>
                  </div>
                  <ol className="space-y-3 text-sm text-slate-600">
                    {[t(lang, "目的", "목적"), t(lang, "适用范围", "적용 범위"), t(lang, "相关系统", "관련 시스템"), t(lang, "操作步骤", "작업 절차"), t(lang, "注意事项", "주의사항"), t(lang, "异常处理", "오류 발생 시 대응"), t(lang, "现场确认点", "현장 확인 포인트"), t(lang, "参考图片 / 文件", "참고 이미지 / 자료")].map((item, idx) => (
                      <li key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-blue-600 shadow-sm">{idx + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            </>
          ) : (
            <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <CategoryIcon Icon={activeItem.icon} active />
                  <div>
                    <h3 className="text-2xl font-black">{t(lang, activeItem.zh, activeItem.ko)}</h3>
                    <p className="mt-1 text-sm text-slate-500">{t(lang, "选择一个主题，开始整理 SOP / 操作指南 / 异常案例。", "주제를 선택하여 SOP, 작업 가이드, 오류 사례를 정리하세요.")}</p>
                  </div>
                </div>
                <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700">
                  {t(lang, "新建文档", "문서 추가")}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {currentList.map((item, index) => (
                  <button key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md">
                    <div className="mb-5 flex items-center justify-between">
                      <FileText className="text-blue-600" size={22} />
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-400">#{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="font-black">{item}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {t(lang, "可放入流程图、截图、检查点、处理记录和版本变更。", "프로세스, 화면 캡처, 체크포인트, 처리 이력, 버전 변경을 정리할 수 있습니다.")}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

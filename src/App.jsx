import React, { useMemo, useState } from "react";
import {
  Search,
  Home,
  Package,
  Database,
  Truck,
  ArrowLeftRight,
  Settings,
  AlertTriangle,
  GraduationCap,
  Bookmark,
  ChevronRight,
  ChevronDown,
  FileText,
  ClipboardList,
  ArrowRight,
  ArrowLeft,
  Star,
  X,
  Pencil,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Monitor,
  User,
  Globe2,
  Languages,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- i18n helper ---------------- */
function t(lang, zh, ko, en) {
  if (lang === "zh") return zh;
  if (lang === "ko") return ko;
  return en || ko;
}

const languages = [
  { key: "ko", label: "한국어", short: "한" },
  { key: "zh", label: "中文", short: "中" },
  { key: "en", label: "English", short: "EN" },
];

/* ---------------- categories ---------------- */
const categories = [
  { key: "all", ko: "전체", zh: "全部", en: "All", icon: Home },
  { key: "inbound", ko: "입고관리", zh: "入库管理", en: "Inbound", icon: Package },
  { key: "inventory", ko: "재고관리", zh: "库存管理", en: "Inventory", icon: Database },
  { key: "outbound", ko: "출고관리", zh: "出库管理", en: "Outbound", icon: Truck },
  { key: "transfer", ko: "이송", zh: "移送", en: "Transfer", icon: ArrowLeftRight },
  { key: "operation", ko: "운영 프로세스", zh: "运营流程", en: "Operations", icon: Settings },
  { key: "error", ko: "오류 대응", zh: "异常处理", en: "Error Handling", icon: AlertTriangle },
  { key: "training", ko: "교육 자료", zh: "培训资料", en: "Training", icon: GraduationCap },
];

/* ---------------- SOP step builder ---------------- */
// Standard WMS menu-path steps: WMS 시스템 → 메뉴 → 화면 → actions
function wmsSteps(menu, screen, actions) {
  return [
    {
      ko: "WMS 시스템",
      zh: "WMS 系统",
      dko: "WMS 시스템 기준으로 다음 메뉴 경로를 확인합니다.",
      dzh: "以 WMS 系统为准，确认下一步的菜单路径。",
    },
    {
      ko: menu[0],
      zh: menu[1],
      dko: `${menu[0]} 메뉴로 이동합니다.`,
      dzh: `进入${menu[1]}菜单。`,
    },
    {
      ko: screen[0],
      zh: screen[1],
      dko: `${screen[0]} 화면을 엽니다.`,
      dzh: `打开${screen[1]}画面。`,
    },
    ...actions.map((a) => ({ ko: a[0], zh: a[1], dko: a[2], dzh: a[3] })),
  ];
}

/* ---------------- SOP data ---------------- */
const sopItems = [
  /* ===== 입고관리 ===== */
  {
    code: "GR01",
    titleKo: "입고 확정",
    titleZh: "入库确认",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "입고 오더를 확인하고 입고를 확정하는 절차입니다.",
    descZh: "确认入库订单并完成入库确认的流程。",
    cautionKo: "확정 전에 오더번호와 수량을 실물과 대조하세요.",
    cautionZh: "确认前请将订单号和数量与实物核对。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[GR01] 입고 확정", "[GR01] 入库确认"], [
      ["오더번호 확인", "确认订单号", "입고 오더번호를 확인합니다.", "确认入库订单号。"],
      ["조회", "查询", "오더번호로 조회하여 입고 내역을 확인합니다.", "按订单号查询，确认入库明细。"],
      ["확정", "确认", "수량과 상태를 확인한 뒤 확정합니다.", "确认数量和状态后点击确认。"],
    ]),
  },
  {
    code: "AS11",
    titleKo: "입고예정 생성(부자재)",
    titleZh: "入库预定生成(辅料)",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.21",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "부자재 입고예정을 생성하는 절차입니다.",
    descZh: "生成辅料入库预定的流程。",
    cautionKo: "부자재 코드와 예정 수량을 다시 확인하세요.",
    cautionZh: "请再次确认辅料代码和预定数量。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[AS11] 입고예정 생성(부자재)", "[AS11] 入库预定生成(辅料)"], [
      ["입고예정 정보 입력", "录入入库预定信息", "거래선, 자재, 예정 수량을 입력합니다.", "录入客户、物料和预定数量。"],
      ["저장", "保存", "입력 내용을 확인한 뒤 저장합니다.", "确认录入内容后保存。"],
      ["생성 확인", "确认生成", "입고예정 번호가 생성되었는지 확인합니다.", "确认入库预定编号已生成。"],
    ]),
  },
  {
    code: "GR12",
    titleKo: "WCS생산입고실적 조정",
    titleZh: "WCS生产入库实绩调整",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.21",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "WCS 생산입고 실적을 조정하는 절차입니다.",
    descZh: "调整 WCS 生产入库实绩的流程。",
    cautionKo: "조정 전후 수량을 기록으로 남기세요.",
    cautionZh: "请记录调整前后的数量。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[GR12] WCS생산입고실적 조정", "[GR12] WCS生产入库实绩调整"], [
      ["실적 조회", "查询实绩", "조정 대상 생산입고 실적을 조회합니다.", "查询要调整的生产入库实绩。"],
      ["수량 조정", "调整数量", "실물 확인 후 조정 수량을 입력합니다.", "确认实物后录入调整数量。"],
      ["저장 및 확인", "保存并确认", "저장 후 반영 결과를 확인합니다.", "保存后确认反映结果。"],
    ]),
  },
  {
    code: "GR09",
    titleKo: "입고이력 조회",
    titleZh: "入库履历查询",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.21",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "입고 이력을 조회하는 절차입니다.",
    descZh: "查询入库履历的流程。",
    cautionKo: "조회 기간을 정확히 설정하세요.",
    cautionZh: "请准确设置查询期间。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[GR09] 입고이력 조회", "[GR09] 入库履历查询"], [
      ["조회 조건 입력", "录入查询条件", "기간, 오더번호 등 조회 조건을 입력합니다.", "录入期间、订单号等查询条件。"],
      ["조회", "查询", "조회 버튼을 눌러 이력을 확인합니다.", "点击查询按钮确认履历。"],
    ]),
  },
  {
    code: "AS03",
    titleKo: "입고검수 입력",
    titleZh: "入库检收录入",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.21",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "입고 검수 결과를 입력하는 절차입니다.",
    descZh: "录入入库检收结果的流程。",
    cautionKo: "검수 수량은 실물 기준으로 입력하세요.",
    cautionZh: "检收数量请以实物为准录入。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[AS03] 입고검수 입력", "[AS03] 入库检收录入"], [
      ["입고 건 조회", "查询入库件", "검수 대상 입고 건을 조회합니다.", "查询要检收的入库件。"],
      ["검수 수량 입력", "录入检收数量", "실물 검수 수량을 입력합니다.", "录入实物检收数量。"],
      ["저장", "保存", "입력 후 저장하고 반영을 확인합니다.", "保存后确认已反映。"],
    ]),
  },
  {
    code: "AS02",
    titleKo: "입고예정 삭제",
    titleZh: "入库预定删除",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.21",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "입고예정을 삭제하는 절차입니다.",
    descZh: "删除入库预定的流程。",
    cautionKo: "삭제 전 입고 진행 여부를 반드시 확인하세요.",
    cautionZh: "删除前务必确认是否已开始入库。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[AS02] 입고예정 삭제", "[AS02] 入库预定删除"], [
      ["삭제 대상 조회", "查询删除对象", "삭제할 입고예정을 조회합니다.", "查询要删除的入库预定。"],
      ["진행 상태 확인", "确认进度状态", "입고가 진행되지 않았는지 확인합니다.", "确认尚未开始入库。"],
      ["삭제", "删除", "대상 행을 선택하고 삭제합니다.", "选择对象行并删除。"],
    ]),
  },
  {
    code: "AS01",
    titleKo: "입고예정 생성(원재품)",
    titleZh: "入库预定生成(原材料)",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.21",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "원재품 입고예정을 생성하는 절차입니다.",
    descZh: "生成原材料入库预定的流程。",
    cautionKo: "원재품 코드와 예정 수량을 다시 확인하세요.",
    cautionZh: "请再次确认原材料代码和预定数量。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[AS01] 입고예정 생성(원재품)", "[AS01] 入库预定生成(原材料)"], [
      ["입고예정 정보 입력", "录入入库预定信息", "거래선, 자재, 예정 수량을 입력합니다.", "录入客户、物料和预定数量。"],
      ["저장", "保存", "입력 내용을 확인한 뒤 저장합니다.", "确认录入内容后保存。"],
      ["생성 확인", "确认生成", "입고예정 번호가 생성되었는지 확인합니다.", "确认入库预定编号已生成。"],
    ]),
  },
  {
    code: "OM01",
    titleKo: "입고오더 생성",
    titleZh: "入库订单生成",
    category: "inbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.21",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "입고오더를 생성하는 절차입니다.",
    descZh: "生成入库订单的流程。",
    cautionKo: "오더 생성 후 입고예정과 연결되었는지 확인하세요.",
    cautionZh: "生成订单后确认是否已与入库预定关联。",
    steps: wmsSteps(["입고관리(물류)", "入库管理(物流)"], ["[OM01] 입고오더 생성", "[OM01] 入库订单生成"], [
      ["오더 정보 입력", "录入订单信息", "입고오더 정보를 입력합니다.", "录入入库订单信息。"],
      ["저장", "保存", "입력 내용을 확인한 뒤 저장합니다.", "确认录入内容后保存。"],
      ["생성 확인", "确认生成", "오더번호가 생성되었는지 확인합니다.", "确认订单号已生成。"],
    ]),
  },
  /* ===== 출고관리 ===== */
  {
    code: "WDL19",
    titleKo: "출고이력 상세조회",
    titleZh: "出库履历详细查询",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "출고내역조회보다 더 상세한 이력조회가 필요한 경우 사용 (단, 이미지 확인 불가).",
    descZh: "需要比出库明细查询更详细的履历时使用（但无法确认图片）。",
    cautionKo: "상세 이력에서는 출고 사진을 확인할 수 없습니다.",
    cautionZh: "详细履历中无法确认出库照片。",
    tags: ["출고관리", "WMS"],
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL19] 출고이력 상세조회", "[WDL19] 出库履历详细查询"], [
      ["조회 조건 입력", "录入查询条件", "기간, 오더번호 등 조회 조건을 입력합니다.", "录入期间、订单号等查询条件。"],
      ["조회", "查询", "조회 버튼을 눌러 상세 이력을 확인합니다.", "点击查询按钮确认详细履历。"],
    ]),
  },
  {
    code: "WDL09",
    titleKo: "출고내역조회",
    titleZh: "出库明细查询",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "출고된 간략한 이력 및 출고 사진 확인, 출고된 명세서(서류) 재발행 시 사용.",
    descZh: "确认出库简略履历及出库照片、重新发行出库明细书（文件）时使用。",
    cautionKo: "명세서 재발행 시 발행 구분(고객용/인수증/운임청구용)을 확인하세요.",
    cautionZh: "重新发行明细书时请确认发行区分（客户用/ 인수증/运费请求用）。",
    tags: ["출고관리", "WMS"],
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL09] 출고내역조회", "[WDL09] 出库明细查询"], [
      ["조회 조건 입력", "录入查询条件", "기간, 차량번호 등 조회 조건을 입력합니다.", "录入期间、车牌号等查询条件。"],
      ["조회", "查询", "조회 버튼을 눌러 출고 내역을 확인합니다.", "点击查询按钮确认出库明细。"],
      ["사진·명세서 확인", "确认照片和明细书", "출고 사진을 확인하고 필요 시 명세서를 재발행합니다.", "确认出库照片，需要时重新发行明细书。"],
    ]),
  },
  {
    code: "WDL07",
    titleKo: "출고완료",
    titleZh: "出库完成",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "피킹, 검수까지 완료된 출고유형에 대한 출고확정 시 사용.",
    descZh: "对已完成拣货、检收的出库类型进行出库确认时使用。",
    cautionKo: "출고완료 전에 오더수량과 검수수량이 일치하는지 반드시 확인하세요.",
    cautionZh: "出库完成前务必确认订单数量与检收数量一致。",
    tags: ["출고관리", "WMS", "출고완료"],
    hasSimulator: true,
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL07] 출고완료", "[WDL07] 出库完成"], [
      ["조회", "查询", "출고완료 대상 목록을 조회합니다.", "查询出库完成对象列表。"],
      ["수량 확인", "确认数量", "오더수량과 검수수량이 일치하는지 확인합니다.", "确认订单数量与检收数量是否一致。"],
      ["출고완료 처리", "出库完成处理", "대상 행을 선택하고 출고완료 버튼을 눌러 확정합니다.", "选择对象行，点击出库完成按钮确认。"],
    ]),
  },
  {
    code: "WDL77",
    titleKo: "피킹검수",
    titleZh: "拣货检收",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "피킹이 완료된 내역에 대한 검수 처리 시 사용.",
    descZh: "对已完成拣货的明细进行检收处理时使用。",
    cautionKo: "검수 수량이 피킹 수량과 다르면 원인을 먼저 확인하세요.",
    cautionZh: "检收数量与拣货数量不一致时请先确认原因。",
    tags: ["출고관리", "WMS"],
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL77] 피킹검수", "[WDL77] 拣货检收"], [
      ["검수 대상 조회", "查询检收对象", "피킹 완료 내역을 조회합니다.", "查询拣货完成明细。"],
      ["검수 수량 입력", "录入检收数量", "실물 검수 수량을 입력합니다.", "录入实物检收数量。"],
      ["검수 확정", "检收确认", "수량을 확인한 뒤 검수를 확정합니다.", "确认数量后确认检收。"],
    ]),
  },
  {
    code: "WDL16",
    titleKo: "피킹관리",
    titleZh: "拣货管理",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "할당된 오더 별 출고 지시 및 예약전송, 서류 발행 시 사용.",
    descZh: "按已分配订单进行出库指示、预约传送及文件发行时使用。",
    cautionKo: "출고 지시 전에 할당 수량을 확인하세요.",
    cautionZh: "出库指示前请确认分配数量。",
    tags: ["출고관리", "WMS", "WCS"],
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL16] 피킹관리", "[WDL16] 拣货管理"], [
      ["할당 오더 조회", "查询已分配订单", "할당된 오더를 조회합니다.", "查询已分配的订单。"],
      ["출고 지시", "出库指示", "오더 별로 출고 지시를 전송합니다.", "按订单传送出库指示。"],
      ["서류 발행", "发行文件", "필요한 서류를 발행합니다.", "发行所需文件。"],
    ]),
  },
  {
    code: "WDL26",
    titleKo: "자동창고 피킹관리",
    titleZh: "自动仓库拣货管理",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "할당된 오더 전체 출고 지시 및 예약 전송 시 사용.",
    descZh: "对已分配订单整体进行出库指示及预约传送时使用。",
    cautionKo: "전체 전송 전에 대상 오더 범위를 확인하세요.",
    cautionZh: "整体传送前请确认对象订单范围。",
    tags: ["출고관리", "WMS", "WCS"],
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL26] 자동창고 피킹관리", "[WDL26] 自动仓库拣货管理"], [
      ["할당 오더 조회", "查询已分配订单", "할당된 오더 전체를 조회합니다.", "查询全部已分配订单。"],
      ["전체 출고 지시", "整体出库指示", "오더 전체에 출고 지시를 전송합니다.", "对全部订单传送出库指示。"],
      ["예약 전송 확인", "确认预约传送", "예약 전송 결과를 확인합니다.", "确认预约传送结果。"],
    ]),
  },
  {
    code: "WDL04",
    titleKo: "WAVE 생성",
    titleZh: "WAVE生成",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "배차계획 생성 이후 할당 가능한 오더를 묶어 WAVE를 생성할 때 사용.",
    descZh: "配车计划生成后，将可分配订单合并生成 WAVE 时使用。",
    cautionKo: "WAVE 생성 전에 배차계획이 확정되었는지 확인하세요.",
    cautionZh: "生成 WAVE 前请确认配车计划已确定。",
    tags: ["출고관리", "WMS"],
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL04] WAVE 생성", "[WDL04] WAVE生成"], [
      ["대상 오더 조회", "查询对象订单", "할당 가능한 오더를 조회합니다.", "查询可分配的订单。"],
      ["WAVE 생성", "生成 WAVE", "오더를 선택하고 WAVE를 생성합니다.", "选择订单并生成 WAVE。"],
      ["생성 확인", "确认生成", "WAVE 번호가 생성되었는지 확인합니다.", "确认 WAVE 编号已生成。"],
    ]),
  },
  {
    code: "WDL98",
    titleKo: "배차등록(수출)",
    titleZh: "配车登记(出口)",
    category: "outbound",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2026.07.22",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "수출 건의 배차를 등록하는 절차입니다.",
    descZh: "登记出口件配车的流程。",
    cautionKo: "수출 건은 국가별 조건과 서류를 함께 확인하세요.",
    cautionZh: "出口件请同时确认各国条件和文件。",
    tags: ["출고관리", "WMS", "수출"],
    steps: wmsSteps(["출고관리(출하)", "出库管理(出货)"], ["[WDL98] 배차등록(수출)", "[WDL98] 配车登记(出口)"], [
      ["배차 정보 입력", "录入配车信息", "차량, DOCK, 배차요청일자를 입력합니다.", "录入车辆、DOCK、配车请求日期。"],
      ["저장", "保存", "입력 내용을 확인한 뒤 저장합니다.", "确认录入内容后保存。"],
      ["등록 확인", "确认登记", "배차계획번호가 생성되었는지 확인합니다.", "确认配车计划编号已生成。"],
    ]),
  },
  /* ===== 오류 대응 (기존 문서 유지) ===== */
  {
    code: "ERR-01",
    titleKo: "NOREAD 발생 시 대응 방법",
    titleZh: "NOREAD 发生时对应方法",
    category: "error",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2025.05.20",
    scopeKo: "밀양 자동화센터 전 담당자",
    scopeZh: "密阳自动化中心全体担当",
    descKo: "라벨 NOREAD 발생 시 확인 순서와 대응 방법입니다.",
    descZh: "标签 NOREAD 发生时的确认顺序和对应方法。",
    cautionKo: "실물을 먼저 확인하고 시스템을 처리하세요.",
    cautionZh: "先确认实物，再处理系统。",
    tags: ["NOREAD", "라벨", "WCS"],
    steps: [
      { ko: "실물 확인", zh: "确认实物", dko: "해당 팔레트와 라벨 상태를 실물로 확인합니다.", dzh: "实物确认该托盘和标签状态。" },
      { ko: "라벨 재발행", zh: "重新发行标签", dko: "라벨을 재발행하고 재스캔합니다.", dzh: "重新发行标签并重新扫描。" },
      { ko: "시스템 처리", zh: "系统处理", dko: "WCS/WMS 상태를 확인하고 정상 흐름으로 복귀시킵니다.", dzh: "确认 WCS/WMS 状态并恢复正常流程。" },
      { ko: "기록", zh: "记录", dko: "원인, 조치, 결과를 기록합니다.", dzh: "记录原因、措施和结果。" },
    ],
  },
  {
    code: "ERR-02",
    titleKo: "WMS / WCS 불일치 대응 SOP",
    titleZh: "WMS / WCS 不同步对应 SOP",
    category: "error",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2025.05.18",
    scopeKo: "밀양 자동화센터 전 담당자",
    scopeZh: "密阳自动化中心全体担当",
    descKo: "WMS와 WCS 재고가 불일치할 때의 대응 절차입니다.",
    descZh: "WMS 与 WCS 库存不一致时的对应流程。",
    cautionKo: "재고이동 전에 양쪽 시스템 수량을 모두 확인하세요.",
    cautionZh: "库存移动前请确认两个系统的数量。",
    tags: ["WMS", "WCS", "재고이동"],
    steps: [
      { ko: "불일치 확인", zh: "确认不一致", dko: "WMS와 WCS의 재고 수량을 비교합니다.", dzh: "比较 WMS 与 WCS 的库存数量。" },
      { ko: "실물 확인", zh: "确认实物", dko: "현장 실물 수량을 확인합니다.", dzh: "确认现场实物数量。" },
      { ko: "재고 조정", zh: "库存调整", dko: "기준 시스템에 맞춰 재고를 조정합니다.", dzh: "按基准系统调整库存。" },
      { ko: "기록", zh: "记录", dko: "원인, 조치, 결과를 기록합니다.", dzh: "记录原因、措施和结果。" },
    ],
  },
  {
    code: "ERR-03",
    titleKo: "RGV 오류 코드 정리",
    titleZh: "RGV 错误代码整理",
    category: "error",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2025.05.14",
    scopeKo: "밀양 자동화센터 전 담당자",
    scopeZh: "密阳自动化中心全体担当",
    descKo: "RGV 오류 코드별 원인과 복구 절차입니다.",
    descZh: "按 RGV 错误代码整理原因和恢复流程。",
    cautionKo: "설비 오류는 안전 확인 후 조치하세요.",
    cautionZh: "设备错误请在确认安全后处理。",
    tags: ["RGV", "SITE141", "설비"],
    steps: [
      { ko: "오류 코드 확인", zh: "确认错误代码", dko: "발생한 오류 코드를 확인합니다.", dzh: "确认发生的错误代码。" },
      { ko: "안전 확인", zh: "确认安全", dko: "설비 주변 안전을 확인합니다.", dzh: "确认设备周边安全。" },
      { ko: "복구 조치", zh: "恢复措施", dko: "코드별 복구 절차를 수행합니다.", dzh: "执行各代码的恢复流程。" },
      { ko: "기록", zh: "记录", dko: "원인, 조치, 결과를 기록합니다.", dzh: "记录原因、措施和结果。" },
    ],
  },
  /* ===== 운영 프로세스 (기존 문서 유지) ===== */
  {
    code: "OP-01",
    titleKo: "입고 프로세스 AUTIN 작업 가이드",
    titleZh: "入库流程 AUTIN 操作指南",
    category: "operation",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2025.05.15",
    scopeKo: "밀양 자동화센터 전 입고 담당자",
    scopeZh: "密阳自动化中心全体入库担当",
    descKo: "AUTIN을 이용한 입고 작업 가이드입니다.",
    descZh: "使用 AUTIN 的入库操作指南。",
    cautionKo: "입고 전 라벨과 수량을 실물과 대조하세요.",
    cautionZh: "入库前请将标签和数量与实物核对。",
    tags: ["AUTIN", "입고", "WMS"],
    steps: [
      { ko: "입고 건 확인", zh: "确认入库件", dko: "입고 예정 건을 확인합니다.", dzh: "确认入库预定件。" },
      { ko: "AUTIN 스캔", zh: "AUTIN 扫描", dko: "라벨을 스캔하여 입고를 진행합니다.", dzh: "扫描标签进行入库。" },
      { ko: "입고 확정", zh: "入库确认", dko: "수량을 확인하고 입고를 확정합니다.", dzh: "确认数量并完成入库确认。" },
    ],
  },
  {
    code: "OP-02",
    titleKo: "공출고 처리 절차",
    titleZh: "공출고 处理流程",
    category: "operation",
    centerKo: "미지정",
    centerZh: "未指定",
    revised: "2025.05.12",
    scopeKo: "밀양 자동화센터 전 출고 담당자",
    scopeZh: "密阳自动化中心全体出库担当",
    descKo: "공출고(공정 출고) 처리 절차입니다.",
    descZh: "工程出库处理流程。",
    cautionKo: "수동출고 시 사유를 반드시 기록하세요.",
    cautionZh: "手动出库时务必记录原因。",
    tags: ["공출고", "WCS", "수동출고"],
    steps: [
      { ko: "공출고 대상 확인", zh: "确认工程出库对象", dko: "공출고 대상 자재와 수량을 확인합니다.", dzh: "确认工程出库的物料和数量。" },
      { ko: "출고 처리", zh: "出库处理", dko: "WCS에서 공출고를 처리합니다.", dzh: "在 WCS 中处理工程出库。" },
      { ko: "기록", zh: "记录", dko: "사유와 결과를 기록합니다.", dzh: "记录原因和结果。" },
    ],
  },
];

const hotTags = ["NOREAD", "SITE141", "WMS", "WCS", "KPP", "공출고", "FIFO", "재고이동"];

/* ---------------- simulator dummy data ---------------- */
const simRows = [
  { id: 1, vehicle: "경남99아0001", customer: "연습상사 26-1차", dock: "05", plan: "2611230001", country: "China", date: "2026.11.23", dest: "연습상사(연습창고)", img: "Y", order: 2030, alloc: 2030, pick: 1945, inspect: 1944, wave: "20261123-001", orderNo: "1002016501", seq: "010020", driver: "연습기사1", doc: "2000129301", docSeq: "000010", item: "313601" },
  { id: 2, vehicle: "부산99사0002", customer: "연습상사 26-1차", dock: "02", plan: "2611230002", country: "China", date: "2026.11.23", dest: "연습상사(연습창고)", img: "Y", order: 2030, alloc: 2030, pick: 1816, inspect: 0, wave: "20261123-002", orderNo: "1002016502", seq: "010020", driver: "연습기사2", doc: "2000129302", docSeq: "000010", item: "313602" },
  { id: 3, vehicle: "부산99사0003", customer: "연습상사 26-1차", dock: "03", plan: "2611230003", country: "China", date: "2026.11.23", dest: "연습상사(연습창고)", img: "Y", order: 2030, alloc: 2030, pick: 2030, inspect: 2030, wave: "20261123-003", orderNo: "1002016503", seq: "010020", driver: "연습기사3", doc: "2000129303", docSeq: "000010", item: "313603" },
  { id: 4, vehicle: "부산99사0004", customer: "연습상사 26-1차", dock: "07", plan: "2611230004", country: "China", date: "2026.11.23", dest: "연습상사(연습창고)", img: "N", order: 2030, alloc: 2030, pick: 1456, inspect: 0, wave: "20261123-004", orderNo: "1002016504", seq: "010020", driver: "연습기사4", doc: "2000129304", docSeq: "000010", item: "313604" },
  { id: 5, vehicle: "부산98허0005", customer: "연습상사 26-1차", dock: "08", plan: "2611230005", country: "China", date: "2026.11.23", dest: "연습상사(연습창고)", img: "N", order: 2030, alloc: 2030, pick: 1470, inspect: 0, wave: "20261123-005", orderNo: "1002016505", seq: "010020", driver: "연습기사5", doc: "2000129305", docSeq: "000010", item: "313605" },
  { id: 6, vehicle: "광주99바0006", customer: "테스트물산 2차", dock: "19", plan: "2611230006", country: "USA", date: "2026.11.23", dest: "테스트물산 동부창고", img: "Y", order: 5400, alloc: 5400, pick: 5080, inspect: 5080, wave: "20261123-006", orderNo: "1002016506", seq: "010020", driver: "연습기사6", doc: "2000129306", docSeq: "000010", item: "313606" },
  { id: 7, vehicle: "경남99바0007", customer: "테스트물산 2차", dock: "20", plan: "2611230007", country: "USA", date: "2026.11.23", dest: "테스트물산 서부창고", img: "Y", order: 5400, alloc: 5400, pick: 5061, inspect: 3678, wave: "20261123-007", orderNo: "1002016507", seq: "010020", driver: "연습기사7", doc: "2000129307", docSeq: "000010", item: "313607" },
  { id: 8, vehicle: "부산98바0008", customer: "테스트물산 2차", dock: "21", plan: "2611230008", country: "USA", date: "2026.11.23", dest: "테스트물산 서부창고", img: "N", order: 5400, alloc: 5400, pick: 5280, inspect: 3840, wave: "20261123-008", orderNo: "1002016508", seq: "010020", driver: "연습기사8", doc: "2000129308", docSeq: "000010", item: "313608" },
  { id: 9, vehicle: "광주99바0009", customer: "테스트물산 2차", dock: "22", plan: "2611230009", country: "USA", date: "2026.11.23", dest: "테스트물산 서부창고", img: "Y", order: 5400, alloc: 5400, pick: 5400, inspect: 5400, wave: "20261123-009", orderNo: "1002016509", seq: "010020", driver: "연습기사9", doc: "2000129309", docSeq: "000010", item: "313609" },
];

const wmsMenu = [
  { label: "[SD01] 재고 현황" },
  { label: "[SD55] 재고 현황(ALL)" },
  { label: "[SD02] 재고 트랜잭션 조회" },
  { label: "[SD03] 재고 수불 조회" },
  { label: "[SD04] 할당별 재고 조회" },
  { label: "[SD05] SAP 재고현황" },
  { label: "[DS10] 공팔레트 등록" },
  { label: "재고이동" },
  { label: "재고조정" },
  { label: "재고실사" },
  {
    label: "출고관리(출하)",
    open: true,
    children: [
      { label: "생산계획" },
      { label: "출고오더" },
      {
        label: "배차",
        children: [
          { label: "[WDL01] 배차 계획" },
          { label: "[WDL02] 배차 등록" },
          { label: "[WDL98] 배차등록(수출)" },
          { label: "[WDL03] 배차 확인" },
          { label: "[WDL88] 납품분할" },
        ],
      },
      { label: "웨이브", children: [{ label: "[WDL04] WAVE 생성" }] },
      { label: "할당" },
      {
        label: "피킹",
        children: [
          { label: "[WDL26] 자동창고 피킹관리" },
          { label: "[WDL16] 피킹관리" },
          { label: "[WDL77] 피킹검수" },
        ],
      },
      { label: "출고확정" },
      { label: "[WDL07] 출고완료", active: true },
      { label: "출고이력" },
    ],
  },
];

const ORANGE = "#F26522";
const ORANGE_DARK = "#D9541A";
const fmt = (n) => n.toLocaleString("ko-KR");

/* ---------------- portal: sidebar ---------------- */
function Sidebar({ lang, category, setCategory, counts }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#2B2B30] text-slate-300 lg:flex">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ background: ORANGE }}>
          <Package size={22} />
        </div>
        <div>
          <p className="text-sm font-black leading-tight text-white">AutoOps Portal</p>
          <p className="text-[11px] leading-tight text-slate-400">Miryang Logistics</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = category === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${isActive ? "text-white" : "hover:bg-white/10 hover:text-white"}`}
              style={isActive ? { background: ORANGE } : {}}
            >
              <Icon size={17} />
              <span className="flex-1">{t(lang, c.zh, c.ko, c.en)}</span>
              {c.key !== "all" && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${isActive ? "bg-white/25 text-white" : "bg-white/10 text-slate-400"}`}>
                  {counts[c.key] || 0}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="mx-3 mb-3 rounded-xl bg-white/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <ShieldCheck size={16} style={{ color: ORANGE }} />
          {t(lang, "现场优先原则", "현장 우선 원칙", "Field-First Principle")}
        </div>
        <p className="text-xs leading-5 text-slate-400">
          {t(lang, "先确认实物，再处理系统。所有异常都要留下原因、处理步骤和结果确认。", "실물을 먼저 확인하고 시스템을 처리합니다. 모든 오류는 원인, 조치, 결과를 기록합니다.", "Check the physical goods first, then the system. Record cause, action and result for every error.")}
        </p>
      </div>
      <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300">
          <User size={16} />
        </div>
        <div>
          <p className="text-xs font-bold text-white">{t(lang, "管理员", "관리자", "Admin")}</p>
          <p className="text-[11px] text-slate-500">Version v2.0 · 2026-11-23</p>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- portal: briefing panel ---------------- */
function BriefingPanel({ lang, item, onOpenDetail, onOpenSimulator }) {
  if (!item) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-400 shadow-sm">
        {t(lang, "选择一个 SOP 条目查看简报。", "SOP 항목을 선택하면 브리핑이 표시됩니다.", "Select an SOP item to see its briefing.")}
      </div>
    );
  }
  const cat = categories.find((c) => c.key === item.category);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="h-1 w-6 rounded-full" style={{ background: ORANGE }} />
        <span className="text-xs font-bold text-slate-500">{t(lang, "业务简报", "업무 브리핑", "Work Briefing")}</span>
      </div>
      <h3 className="mt-3 text-xl font-black text-slate-900">
        [{item.code}] {t(lang, item.titleZh, item.titleKo, item.titleKo)}
      </h3>
      <p className="mt-1 text-xs text-slate-400">
        SOP · {t(lang, cat?.zh, cat?.ko, cat?.en)} · {t(lang, item.centerZh, item.centerKo, item.centerKo)}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{t(lang, item.descZh, item.descKo, item.descKo)}</p>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-sm font-black text-slate-800">{t(lang, "开始前准备", "시작 전 준비", "Before You Start")}</p>
        <p className="mt-1.5 text-sm text-slate-500">{t(lang, item.scopeZh, item.scopeKo, item.scopeKo)}</p>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-sm font-black text-slate-800">{t(lang, "核心流程", "핵심 절차", "Key Steps")}</p>
        <ol className="mt-2 space-y-1.5">
          {item.steps.slice(0, 3).map((s, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className="text-xs font-black" style={{ color: ORANGE }}>{String(i + 1).padStart(2, "0")}</span>
              {t(lang, s.zh, s.ko, s.ko)}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-slate-400">
          {t(lang, `共 ${item.steps.length} 步`, `전체 ${item.steps.length}단계`, `${item.steps.length} steps total`)}
        </p>
      </div>

      <div className="mt-4 rounded-xl bg-amber-50 p-4">
        <p className="text-sm font-black text-amber-800">{t(lang, "请确认", "확인하세요", "Please Check")}</p>
        <p className="mt-1 text-sm leading-6 text-amber-700">{t(lang, item.cautionZh, item.cautionKo, item.cautionKo)}</p>
      </div>

      <div className="mt-4 space-y-1 text-xs text-slate-400">
        <p>{t(lang, "编写·修改", "작성·수정", "Author")} · {t(lang, "管理员", "관리자", "Admin")}</p>
        <p>{t(lang, "修订日", "개정일", "Revised")} · {item.revised}</p>
      </div>

      {item.hasSimulator ? (
        <>
          <button
            onClick={onOpenSimulator}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white shadow-sm transition hover:opacity-90"
            style={{ background: ORANGE }}
          >
            <Play size={16} />
            {t(lang, "打开练习模拟器", "연습 시뮬레이터 열기", "Open Practice Simulator")}
          </button>
          <button
            onClick={onOpenDetail}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
          >
            {t(lang, "查看详细流程", "절차 자세히 보기", "View Procedure")}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onOpenDetail}
            className="mt-5 w-full rounded-xl px-4 py-3 text-sm font-black text-white shadow-sm transition hover:opacity-90"
            style={{ background: ORANGE }}
          >
            {t(lang, "查看详细流程", "절차 자세히 보기", "View Procedure")}
          </button>
          <p className="mt-2 text-center text-xs text-slate-400">
            {t(lang, "练习模拟器准备中 — 需要 WMS 画面截图", "연습 시뮬레이터 준비 중 — WMS 화면 캡처가 필요합니다", "Practice simulator in preparation — WMS screenshot needed")}
          </p>
        </>
      )}
    </div>
  );
}

/* ---------------- portal: SOP detail modal (flowchart) ---------------- */
function SopDetailModal({ lang, item, onClose, onOpenSimulator, onSwitchItem, notify }) {
  const [tab, setTab] = useState("steps");
  const [stepIdx, setStepIdx] = useState(0);
  const steps = item.steps;
  const cur = steps[stepIdx];
  const cat = categories.find((c) => c.key === item.category);
  const related = sopItems.filter((x) => x.category === item.category && x.code !== item.code);

  const tabs = [
    { key: "steps", ko: "작업 절차", zh: "操作流程", en: "Procedure" },
    { key: "caution", ko: "주의사항", zh: "注意事项", en: "Cautions" },
    { key: "history", ko: "수정 이력", zh: "修订记录", en: "History" },
    { key: "related", ko: "관련 문서", zh: "相关文档", en: "Related" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="border-b border-slate-100 px-6 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">
                {t(lang, cat?.zh, cat?.ko, cat?.en)} · {t(lang, "修订", "개정", "Rev.")} {item.revised}
              </p>
              <h3 className="mt-1 text-2xl font-black text-slate-900">
                [{item.code}] {t(lang, item.titleZh, item.titleKo, item.titleKo)}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => notify(t(lang, "已加入收藏（演示）", "즐겨찾기에 추가되었습니다 (데모)", "Bookmarked (demo)"))} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-orange-200 hover:text-orange-600">
                <Bookmark size={14} /> {t(lang, "收藏", "즐겨찾기", "Bookmark")}
              </button>
              <button onClick={() => notify(t(lang, "编辑功能准备中", "편집 기능 준비 중입니다", "Editing in preparation"))} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-orange-200 hover:text-orange-600">
                <Pencil size={14} /> {t(lang, "编辑", "편집", "Edit")}
              </button>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="mt-4 flex gap-5">
            {tabs.map((tb) => (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={`border-b-2 pb-2.5 text-sm font-bold transition ${tab === tb.key ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}
              >
                {t(lang, tb.zh, tb.ko, tb.en)}
              </button>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {tab === "steps" && (
            <div className="grid gap-8 md:grid-cols-[1fr_320px]">
              {/* flowchart */}
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-[#232C3D] px-10 py-2.5 text-sm font-black text-white">
                  {t(lang, "开始", "시작", "Start")}
                </div>
                {steps.map((s, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center py-1 text-slate-300">
                      <span className="h-4 w-px bg-slate-300" />
                      <ChevronDown size={14} />
                    </div>
                    <button
                      onClick={() => setStepIdx(i)}
                      className={`w-72 rounded-xl border-2 px-4 py-3 text-center transition ${i === stepIdx ? "border-[#232C3D] bg-slate-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}
                    >
                      <p className="text-[11px] font-black" style={{ color: i === stepIdx ? ORANGE : "#94A3B8" }}>
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-0.5 text-sm font-black text-slate-800">{t(lang, s.zh, s.ko, s.ko)}</p>
                      <p className="text-[11px] text-slate-400">WMS</p>
                    </button>
                  </React.Fragment>
                ))}
              </div>
              {/* step description */}
              <div className="border-l border-slate-100 pl-6">
                <p className="text-xs text-slate-400">{t(lang, "用户添加的知识条目", "사용자가 추가한 지식 항목", "User-added knowledge item")}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {t(lang, "适用范围", "적용 범위", "Scope")} · {t(lang, item.scopeZh, item.scopeKo, item.scopeKo)}
                </p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold text-slate-400">{t(lang, "步骤说明", "단계 설명", "Step Description")}</p>
                  <p className="mt-2 text-base font-black text-slate-900">{t(lang, cur.zh, cur.ko, cur.ko)}</p>
                  <p className="mt-1 text-xs text-slate-400">WMS</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{t(lang, cur.dzh, cur.dko, cur.dko)}</p>
                </div>
                {item.hasSimulator && (
                  <button
                    onClick={onOpenSimulator}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-white transition hover:opacity-90"
                    style={{ background: ORANGE }}
                  >
                    <Play size={16} />
                    {t(lang, "打开练习模拟器", "연습 시뮬레이터 열기", "Open Practice Simulator")}
                  </button>
                )}
              </div>
            </div>
          )}

          {tab === "caution" && (
            <div className="mx-auto max-w-2xl">
              <div className="rounded-xl bg-amber-50 p-5">
                <p className="text-sm font-black text-amber-800">{t(lang, "请确认", "확인하세요", "Please Check")}</p>
                <p className="mt-2 text-sm leading-7 text-amber-700">{t(lang, item.cautionZh, item.cautionKo, item.cautionKo)}</p>
              </div>
              <div className="mt-4 rounded-xl bg-slate-50 p-5">
                <p className="text-sm font-black text-slate-800">{t(lang, "现场优先原则", "현장 우선 원칙", "Field-First Principle")}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {t(lang, "先确认实物，再处理系统。所有异常都要留下原因、处理步骤和结果确认。", "실물을 먼저 확인하고 시스템을 처리합니다. 모든 오류는 원인, 조치, 결과를 기록합니다.", "Check the physical goods first, then the system. Record cause, action and result for every error.")}
                </p>
              </div>
            </div>
          )}

          {tab === "history" && (
            <div className="mx-auto max-w-2xl space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                <span className="text-sm font-bold text-slate-700">{t(lang, "修订", "개정", "Revision")}</span>
                <span className="text-sm text-slate-400">{item.revised} · {t(lang, "管理员", "관리자", "Admin")}</span>
              </div>
              <p className="text-sm text-slate-400">{t(lang, "暂无更多修订记录。", "추가 수정 이력이 없습니다.", "No further revisions.")}</p>
            </div>
          )}

          {tab === "related" && (
            <div className="mx-auto max-w-2xl space-y-2">
              {related.length === 0 && (
                <p className="text-sm text-slate-400">{t(lang, "暂无相关文档。", "관련 문서가 없습니다.", "No related documents.")}</p>
              )}
              {related.map((r) => (
                <button
                  key={r.code}
                  onClick={() => onSwitchItem(r)}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-left transition hover:border-orange-200 hover:bg-orange-50/40"
                >
                  <FileText size={16} style={{ color: ORANGE }} />
                  <span className="flex-1 text-sm font-bold text-slate-700">[{r.code}] {t(lang, r.titleZh, r.titleKo, r.titleKo)}</span>
                  <ChevronRight size={15} className="text-slate-300" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5">
          <span className="text-xs text-slate-400">{t(lang, "更多", "더보기", "More")}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStepIdx((v) => Math.max(0, v - 1))}
              disabled={stepIdx === 0}
              className="rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-600 transition enabled:hover:bg-slate-200 disabled:opacity-40"
            >
              {t(lang, "上一步", "이전 단계", "Prev")}
            </button>
            <span className="px-1 text-xs font-bold text-slate-500">{stepIdx + 1} / {steps.length}</span>
            <button
              onClick={() => setStepIdx((v) => Math.min(steps.length - 1, v + 1))}
              disabled={stepIdx === steps.length - 1}
              className="rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-600 transition enabled:hover:bg-slate-200 disabled:opacity-40"
            >
              {t(lang, "下一步", "다음 단계", "Next")}
            </button>
          </div>
          <button onClick={onClose} className="rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-200">
            {t(lang, "返回列表", "목록으로", "Back to List")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- WMS simulator: [WDL07] 출고완료 ---------------- */
function WmsMenuTree({ nodes, depth = 0 }) {
  return (
    <ul className={depth === 0 ? "space-y-0.5" : "ml-3 space-y-0.5 border-l border-white/10 pl-2"}>
      {nodes.map((n, i) => (
        <li key={i}>
          <div
            className={`rounded px-2 py-1 text-[12px] leading-5 ${n.active ? "font-black" : n.children ? "font-bold text-slate-200" : "text-slate-400"}`}
            style={n.active ? { color: ORANGE } : {}}
          >
            {n.label}
          </div>
          {n.children && <WmsMenuTree nodes={n.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

function Simulator({ lang, onBack, notify }) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [popup, setPopup] = useState(null); // {type:'warn'|'confirm', msg}
  const [mission3, setMission3] = useState(false);

  const selectedRow = simRows.find((r) => r.id === selectedId);
  const matchedChecked = checked.some((id) => {
    const r = simRows.find((x) => x.id === id);
    return r && r.inspect === r.order && !completed.includes(id);
  });
  const mission = [
    { ko: "조회 버튼을 눌러 목록을 불러오세요", zh: "点击查询按钮加载列表", done: loaded },
    { ko: "검수수량이 오더수량과 일치하는 행을 체크하세요", zh: "勾选检收数量与订单数量一致的行", done: matchedChecked || completed.length > 0 },
    { ko: "출고완료 버튼을 누르세요", zh: "点击出库完成按钮", done: mission3 || completed.length > 0 },
    { ko: "확인 팝업에서 \"예\"를 누르세요", zh: "在确认弹窗点击\"예\"", done: completed.length > 0 },
  ];
  const allDone = mission.every((m) => m.done);

  const doSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
      if (!selectedId) setSelectedId(simRows[0].id);
    }, 450);
  };

  const toggleCheck = (id) => {
    if (completed.includes(id)) return;
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const doComplete = () => {
    if (!loaded) {
      setPopup({ type: "warn", msg: t(lang, "先点击查询加载列表。", "먼저 조회 버튼을 눌러 목록을 불러오세요.", "Press 조회 first to load the list.") });
      return;
    }
    const activeChecked = checked.filter((id) => !completed.includes(id));
    if (activeChecked.length === 0) {
      setPopup({ type: "warn", msg: t(lang, "没有选中的行。", "선택된 행이 없습니다.", "No row selected.") });
      return;
    }
    const bad = activeChecked.some((id) => {
      const r = simRows.find((x) => x.id === id);
      return r.inspect !== r.order;
    });
    if (bad) {
      setPopup({ type: "warn", msg: t(lang, "检收数量与订单数量不一致。请确认后重试。", "검수수량이 오더수량과 일치하지 않습니다. 확인 후 다시 시도하세요.", "Inspected quantity does not match the order quantity. Please check and try again.") });
      return;
    }
    setMission3(true);
    setPopup({ type: "confirm", msg: t(lang, "要将选中的件处理为出库完成吗？", "선택한 건을 출고완료 처리하시겠습니까?", "Mark the selected rows as shipment-complete?") });
  };

  const confirmComplete = () => {
    const activeChecked = checked.filter((id) => !completed.includes(id));
    setCompleted((prev) => [...prev, ...activeChecked]);
    setChecked([]);
    setPopup(null);
    notify(t(lang, "出库完成处理成功。", "출고완료 처리되었습니다.", "Shipment completed."));
  };

  const reset = () => {
    setLoaded(false);
    setChecked([]);
    setSelectedId(null);
    setCompleted([]);
    setMission3(false);
    setPopup(null);
  };

  const unsupported = () => notify(t(lang, "练习模式下不支持此功能。", "연습 모드에서는 지원하지 않습니다.", "Not supported in practice mode."));

  const gridHead = "border border-slate-300 bg-[#3A4356] px-2 py-1.5 text-left text-[11px] font-bold text-white whitespace-nowrap";
  const gridCell = "border border-slate-200 px-2 py-1.5 text-[12px] whitespace-nowrap";

  return (
    <div className="flex min-h-screen flex-col bg-[#EEF1F5]">
      {/* portal back bar */}
      <div className="flex items-center gap-3 bg-white px-4 py-2.5 shadow-sm">
        <button onClick={onBack} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-orange-200 hover:text-orange-600">
          <ArrowLeft size={14} /> {t(lang, "返回门户", "포털로 돌아가기", "Back to Portal")}
        </button>
        <span className="text-xs font-bold text-slate-500">
          {t(lang, "出库管理", "출고관리", "Outbound")} &gt; [WDL07] {t(lang, "出库完成", "출고완료", "Shipment Complete")} — {t(lang, "练习模拟器", "연습 시뮬레이터", "Practice Simulator")}
        </span>
      </div>

      {/* WMS top bar */}
      <div className="bg-[#232C3D] text-white">
        <div className="flex items-center gap-4 px-4 pt-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded text-white" style={{ background: ORANGE }}>
              <Monitor size={15} />
            </span>
            <span className="text-base font-black tracking-wide">WMS</span>
          </div>
          <div className="ml-auto flex items-center gap-3 text-xs">
            <span className="rounded border border-white/25 px-2 py-1">[WH01]{t(lang, "练习中心", "연습센터", "Practice Center")}</span>
            <span className="flex items-center gap-1.5"><User size={13} /> {t(lang, "练习生", "연습생", "Trainee")}</span>
          </div>
        </div>
        <div className="mt-2 flex gap-1 overflow-x-auto px-4">
          {["[WDL16] 피킹관리", "[WDL04] WAVE 생성", "[WDL98] 배차등록(수출)", "[SD01] 재고 현황", "[WDL07] 출고완료"].map((tab, i) => (
            <span
              key={tab}
              className={`whitespace-nowrap rounded-t-md px-3.5 py-1.5 text-xs font-bold ${i === 4 ? "bg-[#EEF1F5] text-slate-800" : "bg-white/10 text-slate-300"}`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1">
        {/* WMS side menu */}
        <aside className="hidden w-52 shrink-0 overflow-y-auto bg-[#2B3440] px-2 py-3 md:block">
          <WmsMenuTree nodes={wmsMenu} />
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1 px-3 py-3 md:px-4">
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
            <AlertCircle size={14} />
            {t(lang, "练习用模拟器 — 不是真实 WMS 数据", "연습용 시뮬레이터 — 실제 WMS 데이터가 아닙니다", "Practice simulator — not real WMS data")}
          </div>

          {/* mission */}
          <div className="mb-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-sm font-black text-slate-800">{t(lang, "练习任务", "연습 미션", "Practice Mission")}</span>
              {mission.map((m, i) => (
                <span key={i} className={`flex items-center gap-1.5 text-xs font-bold ${m.done ? "text-emerald-600" : "text-slate-400"}`}>
                  {m.done ? <CheckCircle2 size={14} /> : <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px]">{i + 1}</span>}
                  {t(lang, m.zh, m.ko, m.ko)}
                </span>
              ))}
              {allDone && (
                <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black text-white transition hover:opacity-90" style={{ background: ORANGE }}>
                  <RotateCcw size={13} /> {t(lang, "再次练习", "다시 연습", "Practice Again")}
                </button>
              )}
            </div>
          </div>

          {/* toolbar */}
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <button onClick={doSearch} className="rounded-md bg-[#3A4356] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#2B3440]">
              {loading ? t(lang, "查询中...", "조회 중...", "Loading...") : "조회"}
            </button>
            <button onClick={doComplete} className="rounded-md px-3.5 py-1.5 text-xs font-black text-white transition hover:opacity-90" style={{ background: ORANGE }}>
              출고완료
            </button>
            {["미리보기", "사진추가", "사진삭제", "거래명세서(발송처용)", "거래명세서"].map((b) => (
              <button key={b} onClick={unsupported} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50">
                {b}
              </button>
            ))}
            <span className="ml-2 flex items-center gap-3 text-xs text-slate-600">
              {["고객용", "인수증", "운임청구용"].map((c) => (
                <label key={c} className="flex items-center gap-1">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#F26522]" /> {c}
                </label>
              ))}
            </span>
          </div>

          {/* list grid */}
          <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">리스트</div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["번호", "", "차량번호", "거래선/차수", "DOCK", "배차계획번호", "납품처 국가명", "배차요청일자", "납품처명", "이미지 등록여부", "오더수량", "할당수량", "피킹수량", "검수수량"].map((h, i) => (
                    <th key={i} className={gridHead}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!loaded && (
                  <tr>
                    <td colSpan={14} className="px-3 py-8 text-center text-sm text-slate-400">
                      {t(lang, "查询前 — 点击「조회」加载列表", "조회 전 — 조회 버튼을 눌러 목록을 불러오세요", "Not loaded — press 조회 to load the list")}
                    </td>
                  </tr>
                )}
                {loaded &&
                  simRows.map((r) => {
                    const isDone = completed.includes(r.id);
                    const isSel = selectedId === r.id;
                    return (
                      <tr
                        key={r.id}
                        onClick={() => setSelectedId(r.id)}
                        className={`cursor-pointer ${isDone ? "bg-emerald-50 text-slate-400" : isSel ? "bg-yellow-100" : "hover:bg-slate-50"}`}
                      >
                        <td className={gridCell}>{r.id}</td>
                        <td className={gridCell} onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" checked={checked.includes(r.id)} disabled={isDone} onChange={() => toggleCheck(r.id)} className="h-3.5 w-3.5 accent-[#F26522]" />
                        </td>
                        <td className={gridCell}>{r.vehicle}</td>
                        <td className={gridCell}>{r.customer}</td>
                        <td className={gridCell}>{r.dock}</td>
                        <td className={gridCell}>{r.plan}</td>
                        <td className={gridCell}>{r.country}</td>
                        <td className={gridCell}>{r.date}</td>
                        <td className={gridCell}>{r.dest}</td>
                        <td className={gridCell}>{r.img}</td>
                        <td className={`${gridCell} text-right`}>{fmt(r.order)}</td>
                        <td className={`${gridCell} text-right`}>{fmt(r.alloc)}</td>
                        <td className={`${gridCell} text-right`}>{fmt(r.pick)}</td>
                        <td className={`${gridCell} text-right font-bold ${r.inspect === r.order ? "text-emerald-600" : "text-red-500"}`}>{fmt(r.inspect)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-slate-200 px-3 py-1.5 text-[11px] text-slate-400">
              <span>{loaded ? `${simRows.length} Record` : "0 Record"}</span>
              <span>{t(lang, "完成", "완료", "Done")} {completed.length} / {simRows.length}</span>
            </div>
          </div>

          {/* detail grid */}
          <div className="mt-3 overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700">상세리스트</div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["번호", "", "물류센터", "WAVE번호", "배차계획번호", "오더번호", "오더순번", "차량번호", "차량기사", "출고문서번호", "출고문서순번", "상태", "자재번호"].map((h, i) => (
                    <th key={i} className={gridHead}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loaded && selectedRow ? (
                  <tr className={completed.includes(selectedRow.id) ? "bg-emerald-50 text-slate-400" : "bg-yellow-50"}>
                    <td className={gridCell}>1</td>
                    <td className={gridCell}><input type="checkbox" className="h-3.5 w-3.5 accent-[#F26522]" /></td>
                    <td className={gridCell}>WH01</td>
                    <td className={gridCell}>{selectedRow.wave}</td>
                    <td className={gridCell}>{selectedRow.plan}</td>
                    <td className={gridCell}>{selectedRow.orderNo}</td>
                    <td className={gridCell}>{selectedRow.seq}</td>
                    <td className={gridCell}>{selectedRow.vehicle}</td>
                    <td className={gridCell}>{selectedRow.driver}</td>
                    <td className={gridCell}>{selectedRow.doc}</td>
                    <td className={gridCell}>{selectedRow.docSeq}</td>
                    <td className={`${gridCell} font-black ${completed.includes(selectedRow.id) ? "text-emerald-600" : "text-slate-700"}`}>
                      {completed.includes(selectedRow.id) ? "완료" : "PCK"}
                    </td>
                    <td className={gridCell}>{selectedRow.item}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={13} className="px-3 py-6 text-center text-sm text-slate-400">
                      {t(lang, "查询后点击行查看详细", "조회 후 행을 클릭하면 상세가 표시됩니다", "Load the list and click a row to see details")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* popup */}
      <AnimatePresence>
        {popup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
            <motion.div initial={{ scale: 0.96, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, opacity: 0 }} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center gap-2">
                {popup.type === "warn" ? <AlertCircle size={20} className="text-amber-500" /> : <CheckCircle2 size={20} style={{ color: ORANGE }} />}
                <p className="font-black text-slate-800">{popup.type === "warn" ? t(lang, "提示", "알림", "Notice") : t(lang, "确认", "확인", "Confirm")}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{popup.msg}</p>
              <div className="mt-5 flex justify-end gap-2">
                {popup.type === "warn" ? (
                  <button onClick={() => setPopup(null)} className="rounded-lg px-4 py-2 text-sm font-black text-white transition hover:opacity-90" style={{ background: ORANGE }}>
                    {t(lang, "确认", "확인", "OK")}
                  </button>
                ) : (
                  <>
                    <button onClick={() => setPopup(null)} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                      {t(lang, "否", "아니오", "No")}
                    </button>
                    <button onClick={confirmComplete} className="rounded-lg px-4 py-2 text-sm font-black text-white transition hover:opacity-90" style={{ background: ORANGE }}>
                      {t(lang, "是", "예", "Yes")}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- portal view ---------------- */
function PortalView({ lang, setLang, category, setCategory, query, setQuery, items, selected, setSelected, onOpenDetail, onOpenSimulator, notify }) {
  const counts = useMemo(() => {
    const c = {};
    sopItems.forEach((x) => { c[x.category] = (c[x.category] || 0) + 1; });
    return c;
  }, []);
  const [langOpen, setLangOpen] = useState(false);
  const activeCat = categories.find((c) => c.key === category);

  return (
    <div className="flex min-h-screen bg-[#F4F4F5]">
      <Sidebar lang={lang} category={category} setCategory={setCategory} counts={counts} />
      <div className="min-w-0 flex-1">
        {/* header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#F4F4F5]/90 backdrop-blur">
          <div className="mx-auto max-w-[1400px] px-4 pb-4 pt-5 md:px-7">
            <div className="flex flex-wrap items-center gap-3">
              <div className="min-w-0">
                <p className="text-xs text-slate-400">{t(lang, "业务支援", "업무지원", "Support")} / {t(lang, "智能SOP", "스마트SOP", "Smart SOP")}</p>
                <h1 className="mt-0.5 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">{t(lang, "智能SOP", "스마트SOP", "Smart SOP")}</h1>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 outline-none">
                  <option>{t(lang, "全部中心", "전체 센터", "All Centers")}</option>
                  <option>{t(lang, "密阳自动化中心", "밀양 자동화센터", "Miryang Auto Center")}</option>
                </select>
                <div className="relative">
                  <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-orange-200">
                    <Globe2 size={15} />
                    {languages.find((l) => l.key === lang)?.label}
                    <ChevronDown size={14} className={`transition ${langOpen ? "rotate-180" : ""}`} />
                  </button>
                  {langOpen && (
                    <div className="absolute right-0 top-11 z-40 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                      {languages.map((l) => (
                        <button
                          key={l.key}
                          onClick={() => { setLang(l.key); setLangOpen(false); }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold transition ${lang === l.key ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                          <Languages size={14} /> {l.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => notify(t(lang, "文档登记功能准备中", "문서 등록 기능 준비 중입니다", "Document registration in preparation"))} className="rounded-lg border px-3.5 py-2 text-sm font-black transition hover:bg-orange-50" style={{ borderColor: ORANGE, color: ORANGE }}>
                  {t(lang, "登记文档", "문서 등록", "New Document")}
                </button>
              </div>
            </div>

            {/* search */}
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder={t(lang, "搜索标题·关键词·流程内容", "제목·키워드·절차 내용 검색", "Search titles, keywords, procedures")}
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-slate-300 transition hover:text-slate-500"><X size={16} /></button>
              )}
            </div>

            {/* category tabs */}
            <div className="mt-3 flex flex-wrap items-center gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-bold transition ${category === c.key ? "text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
                  style={category === c.key ? { background: ORANGE } : {}}
                >
                  {t(lang, c.zh, c.ko, c.en)}
                </button>
              ))}
              <span className="ml-auto hidden items-center gap-2 md:flex">
                <select className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-500 outline-none">
                  <option>{t(lang, "全部类型", "모든 유형", "All Types")}</option>
                </select>
                <select className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-500 outline-none">
                  <option>{t(lang, "最近修订", "최근 수정순", "Recently Revised")}</option>
                </select>
              </span>
            </div>
          </div>
        </header>

        {/* body */}
        <main className="mx-auto max-w-[1400px] px-4 py-5 md:px-7">
          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            {/* list */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                <p className="text-sm font-black text-slate-800">
                  {t(lang, activeCat?.zh, activeCat?.ko, activeCat?.en)} <span className="ml-1 text-slate-400">{items.length}</span>
                </p>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className="text-slate-700 underline underline-offset-4">{t(lang, "全部文档", "전체 문서", "All")}</span>
                  <span className="hidden sm:inline">{t(lang, "最近浏览", "최근 열람", "Recent")}</span>
                  <span className="hidden sm:inline">☆ {t(lang, "仅收藏", "즐겨찾기만", "Bookmarks")}</span>
                </div>
              </div>
              <div className="hidden grid-cols-[110px_1fr_110px_110px] gap-3 border-b border-slate-100 bg-slate-50 px-5 py-2.5 text-[11px] font-bold text-slate-400 md:grid">
                <span>{t(lang, "业务分类", "업무 분류", "Category")}</span>
                <span>{t(lang, "文档名", "문서명", "Document")}</span>
                <span>{t(lang, "适用中心", "적용 센터", "Center")}</span>
                <span>{t(lang, "修订日", "개정일", "Revised")}</span>
              </div>
              {items.length === 0 && (
                <div className="px-5 py-14 text-center">
                  <ClipboardList size={28} className="mx-auto text-slate-300" />
                  <p className="mt-3 text-sm font-bold text-slate-500">{t(lang, "暂无登记的文档（准备中）", "등록된 문서가 없습니다 (준비 중)", "No documents yet (in preparation)")}</p>
                </div>
              )}
              {items.map((item) => {
                const cat = categories.find((c) => c.key === item.category);
                const isSel = selected?.code === item.code;
                return (
                  <button
                    key={item.code}
                    onClick={() => setSelected(item)}
                    className={`grid w-full grid-cols-1 gap-1 border-b border-slate-50 px-5 py-4 text-left transition md:grid-cols-[110px_1fr_110px_110px] md:items-center md:gap-3 ${isSel ? "bg-orange-50/60" : "hover:bg-slate-50"}`}
                    style={isSel ? { boxShadow: `inset 3px 0 0 ${ORANGE}` } : {}}
                  >
                    <span className="text-xs font-semibold text-slate-400">{t(lang, cat?.zh, cat?.ko, cat?.en)}</span>
                    <span className="flex items-start gap-2.5">
                      <Star size={15} className="mt-0.5 shrink-0 text-slate-300" />
                      <span>
                        <span className="block text-sm font-black text-slate-800">
                          [{item.code}] {t(lang, item.titleZh, item.titleKo, item.titleKo)}
                          {item.hasSimulator && (
                            <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-black text-white" style={{ background: ORANGE }}>
                              {t(lang, "模拟器", "시뮬레이터", "Simulator")}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-bold" style={{ color: ORANGE }}>{t(lang, "修订", "개정", "Rev.")}</span>
                      </span>
                    </span>
                    <span className="text-xs text-slate-400">{t(lang, item.centerZh, item.centerKo, item.centerKo)}</span>
                    <span className="text-xs text-slate-400">{item.revised}</span>
                  </button>
                );
              })}
              <div className="flex items-center justify-between px-5 py-3 text-xs text-slate-400">
                <span>{items.length > 0 ? `1-${items.length} / ${items.length}` : "0 / 0"}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-black text-white" style={{ background: ORANGE }}>1</span>
              </div>
            </section>

            {/* briefing */}
            <div className="xl:sticky xl:top-5 xl:self-start">
              <BriefingPanel lang={lang} item={selected} onOpenDetail={() => selected && onOpenDetail(selected)} onOpenSimulator={onOpenSimulator} />
              <div className="mt-4 flex flex-wrap gap-1.5">
                {hotTags.map((tag) => (
                  <button key={tag} onClick={() => setQuery(tag)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-orange-200 hover:text-orange-600">
                    {tag}
                  </button>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                <Clock size={12} /> Miryang AutoOps Portal · {t(lang, "自动化仓库运营知识平台", "자동화 창고 운영 지식 플랫폼", "Automation Warehouse Knowledge Platform")}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------------- app root ---------------- */
export default function MiryangAutoOpsPortal() {
  const [lang, setLang] = useState("ko");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(sopItems.find((x) => x.code === "GR01"));
  const [detailItem, setDetailItem] = useState(null);
  const [view, setView] = useState("portal");
  const [toast, setToast] = useState(null);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sopItems.filter((x) => {
      if (category !== "all" && x.category !== category) return false;
      if (!q) return true;
      const hay = [x.code, x.titleKo, x.titleZh, x.descKo, x.descZh, ...(x.tags || [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  const changeCategory = (key) => {
    setCategory(key);
    const first = key === "all" ? sopItems[0] : sopItems.find((x) => x.category === key);
    if (first) setSelected(first);
  };

  return (
    <>
      {view === "portal" ? (
        <PortalView
          lang={lang}
          setLang={setLang}
          category={category}
          setCategory={changeCategory}
          query={query}
          setQuery={setQuery}
          items={items}
          selected={selected}
          setSelected={setSelected}
          onOpenDetail={setDetailItem}
          onOpenSimulator={() => { setDetailItem(null); setView("simulator"); window.scrollTo(0, 0); }}
          notify={notify}
        />
      ) : (
        <Simulator lang={lang} onBack={() => { setView("portal"); window.scrollTo(0, 0); }} notify={notify} />
      )}

      <AnimatePresence>
        {detailItem && (
          <SopDetailModal
            lang={lang}
            item={detailItem}
            onClose={() => setDetailItem(null)}
            onOpenSimulator={() => { setDetailItem(null); setView("simulator"); window.scrollTo(0, 0); }}
            onSwitchItem={(r) => { setSelected(r); setDetailItem(r); }}
            notify={notify}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-xl"
          >
            <CheckCircle2 size={15} className="text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

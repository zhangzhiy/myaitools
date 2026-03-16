/** 业绩及单量目标进展 - 表格行 */
export interface TargetProgressRow {
  scope: string
  target: string
  completed: string
  gap: string
  estimatedComplete: string
  submitted: string
}

/** 今日商机汇报概述 - 表格行（简化：组织范围 + 总存量 + 周净增 + 100/90/80/70 存量） */
export interface OverviewRow {
  scope: string
  totalStock: number
  weeklyIncrease: number
  stock100: number
  stock90: number
  stock80: number
  stock70: number
}

/** 具体商机卡片 */
export interface OpportunityCard {
  id: number
  level: string
  levelLabel: string
  count: number
  customerName: string
  tags: string[]
  createDate: string
  storeName: string
  region: string
  property: string
  salesAmount: string
  estimatedComplete?: string
  hasSuggestButton?: boolean
}

export interface ReportHeader {
  title: string
  subtitle: string
  deadline: string
}

export const reportHeader: ReportHeader = {
  title: '北京新房项目部6月商机汇报',
  subtitle: '大都会 nava-2 号楼 2 单元 1',
  deadline: '截止日期 2023.06.04',
}

export const targetProgressList: TargetProgressRow[] = [
  { scope: '项目部A组', target: '5000万', completed: '3000万', gap: '2000万', estimatedComplete: '2周', submitted: '2周' },
  { scope: '项目部B组', target: '5000万', completed: '2000万', gap: '3000万', estimatedComplete: '3周', submitted: '3周' },
  { scope: '项目部C组', target: '5000万', completed: '3000万', gap: '2000万', estimatedComplete: '2周', submitted: '2周' },
  { scope: '项目部D组', target: '5000万', completed: '2000万', gap: '3000万', estimatedComplete: '3周', submitted: '2周' },
  { scope: '项目部E组', target: '5000万', completed: '3000万', gap: '2000万', estimatedComplete: '2周', submitted: '3周' },
  { scope: '项目部F组', target: '5000万', completed: '2000万', gap: '3000万', estimatedComplete: '3周', submitted: '3周' },
]

export const overviewList: OverviewRow[] = [
  { scope: '项目部A组', totalStock: 20, weeklyIncrease: 10, stock100: 10, stock90: 10, stock80: 10, stock70: 10 },
  { scope: '项目部B组', totalStock: 10, weeklyIncrease: 10, stock100: 10, stock90: 10, stock80: 10, stock70: 10 },
  { scope: '项目部C组', totalStock: 10, weeklyIncrease: 10, stock100: 10, stock90: 10, stock80: 10, stock70: 10 },
  { scope: '项目部D组', totalStock: 10, weeklyIncrease: 10, stock100: 10, stock90: 10, stock80: 10, stock70: 10 },
  { scope: '项目部E组', totalStock: 10, weeklyIncrease: 10, stock100: 10, stock90: 10, stock80: 10, stock70: 10 },
  { scope: '项目部F组', totalStock: 10, weeklyIncrease: 10, stock100: 10, stock90: 10, stock80: 10, stock70: 10 },
]

export const opportunityCards: OpportunityCard[] = [
  {
    id: 1,
    level: '100',
    levelLabel: '100商机',
    count: 1,
    customerName: '王先生',
    tags: ['成交', '意向客户'],
    createDate: '2023.03.10',
    storeName: '项目部A组',
    region: '门店名称相同销售人员',
    property: '融创北京壹号庄园. 3号楼2单元1934s',
    salesAmount: '50万销售额',
    estimatedComplete: '2023.03.23 预计完成100万',
    hasSuggestButton: true,
  },
  {
    id: 2,
    level: '90',
    levelLabel: '90商机',
    count: 2,
    customerName: '乔先生',
    tags: ['成交', '意向客户'],
    createDate: '2023.03.10',
    storeName: '项目部A组',
    region: '门店名称相同销售人员',
    property: '融创北京壹号庄园. 3号楼2单元1934s',
    salesAmount: '50万销售额',
    estimatedComplete: '2023.03.23 预计完成100万',
  },
  {
    id: 3,
    level: '80',
    levelLabel: '80商机',
    count: 1,
    customerName: '李先生',
    tags: ['成交', '意向客户'],
    createDate: '2023.03.10',
    storeName: '项目部A组',
    region: '门店名称相同销售人员',
    property: '融创北京壹号庄园. 3号楼2单元1934s',
    salesAmount: '50万销售额',
    estimatedComplete: '2023.03.23 预计完成100万',
  },
  {
    id: 4,
    level: '70',
    levelLabel: '70商机',
    count: 1,
    customerName: '杨先生',
    tags: ['成交', '意向客户'],
    createDate: '2023.03.10',
    storeName: '项目部A组',
    region: '门店名称相同销售人员',
    property: '融创北京壹号庄园. 3号楼2单元1934s',
    salesAmount: '50万销售额',
    estimatedComplete: '2023.03.23 预计完成100万',
  },
  {
    id: 5,
    level: '7090',
    levelLabel: '手感7090商机',
    count: 1,
    customerName: '王先生',
    tags: ['合作方', '成交客户', '高意向客户', '无意向'],
    createDate: '2023.03.10',
    storeName: '项目部A组',
    region: '门店名称相同',
    property: '融创北京壹号庄园. 3号楼2单元1934s',
    salesAmount: '50万销售额',
    estimatedComplete: '2023.03.23 预计完成100万',
  },
]

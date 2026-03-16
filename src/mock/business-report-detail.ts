/** 业绩及单量目标进展 - 总目标 */
export interface TotalTarget {
  performance: string
  marketShare: string
  signed: string
  insured: string
}

/** 业绩及单量目标进展 - 二手/一手/海外/租赁 */
export interface BizProgress {
  signed: string
  concluded: string
  propertySide?: string
  clientSide?: string
}

/** 业绩及单量目标进展 - 表格行（含层级组织范围） */
export interface TargetProgressRow {
  scope: string
  totalTarget: TotalTarget
  completionRate: string
  secondHand: BizProgress
  firstHand: Omit<BizProgress, 'propertySide' | 'clientSide'>
  overseas: Omit<BizProgress, 'propertySide' | 'clientSide'>
  rental: BizProgress
  children?: TargetProgressRow[]
}

/** 今日商机汇报概述 - 全部商机量 */
export interface AllOpportunity {
  inventory: number
  converted: number
  progressToday: number
}

/** 今日商机汇报概述 - 100保签 */
export interface Stock100Insured {
  inventory: number
  converted: number
  progressToday: number
  new90: number
}

/** 今日商机汇报概述 - 90商机 */
export interface Stock90 {
  inventory: number
  intentOrSubscribe: number
  progressToday: number
  new80: number
}

/** 今日商机汇报概述 - 80商机 */
export interface Stock80 {
  inventory: number
  progressToday: number
  new70: number
}

/** 今日商机汇报概述 - 70商机 */
export interface Stock70 {
  inventory: number
  progressToday: number
}

/** 今日商机汇报概述 - 表格行（含层级组织范围） */
export interface OverviewRow {
  scope: string
  allOpportunity: AllOpportunity
  stock100Insured: Stock100Insured
  stock90: Stock90
  stock80: Stock80
  stock70: Stock70
  children?: OverviewRow[]
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

/** 展开详情 - 房产头（列表项头部） */
export interface ExpandPropertyHeader {
  title: string
  tags: { text: string; type: 'primary' | 'default' }[]
  meta: string
}

/** 展开详情 - 磋商单子概述（金额行） */
export interface NegotiationSummaryRow {
  label: string
  value: string
}

/** 展开详情 - 区块（原始差距/目标/方向/进展/计划） */
export interface ExpandSection {
  title: string
  indicatorColor?: string
  rows: { label: string; value: string }[]
  paragraphs?: { title: string; content: string }[]
}

/** 展开详情 - 下一步计划 */
export interface NextStepSection {
  general: string
  second: string
  third: string
  fourth: string
  overall: string
  dateUser: string
}

/** 点击「查看更多」后的完整磋商单子数据 */
export interface OpportunityExpandDetail {
  propertyHeader: ExpandPropertyHeader
  commission: string
  commissionNote: string
  summaryRows: NegotiationSummaryRow[]
  sections: ExpandSection[]
  nextStep: NextStepSection
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

const targetRow = (
  scope: string,
  concluded: string = '20单',
): TargetProgressRow => ({
  scope,
  totalTarget: {
    performance: '5000万',
    marketShare: '2000万',
    signed: '5000万',
    insured: '2000万',
  },
  completionRate: '40%',
  secondHand: { signed: '5000万', concluded, propertySide: concluded, clientSide: concluded },
  firstHand: { signed: '5000万', concluded },
  overseas: { signed: '5000万', concluded },
  rental: { signed: '5000万', concluded, propertySide: concluded, clientSide: concluded },
})

export const targetProgressList: TargetProgressRow[] = [
  {
    ...targetRow('北京', '20单'),
    children: [
      targetRow('中央别墅大区', '3单'),
      targetRow('观塘别墅店', '3单'),
      targetRow('观塘别墅店A组', '3单'),
      targetRow('观塘别墅店B组', '3单'),
      targetRow('后沙峪别墅1店', '3单'),
    ],
  },
  targetRow('上海', '20单'),
  targetRow('深圳', '20单'),
  targetRow('广州', '20单'),
]

const overviewRow = (
  scope: string,
  allInv: number,
  allConverted: number,
  allProgress: number,
  catValue: number,
): OverviewRow => ({
  scope,
  allOpportunity: { inventory: allInv, converted: allConverted, progressToday: allProgress },
  stock100Insured: { inventory: catValue, converted: catValue, progressToday: catValue, new90: catValue },
  stock90: { inventory: catValue, intentOrSubscribe: catValue, progressToday: catValue, new80: catValue },
  stock80: { inventory: catValue, progressToday: catValue, new70: catValue },
  stock70: { inventory: catValue, progressToday: catValue },
})

export const overviewList: OverviewRow[] = [
  {
    ...overviewRow('北京', 80, 10, 10, 10),
    children: [
      overviewRow('中央别墅大区', 20, 10, 10, 10),
      overviewRow('观塘别墅店', 15, 10, 10, 10),
      overviewRow('观塘别墅店A组', 10, 10, 10, 10),
      overviewRow('观塘别墅店B组', 5, 10, 10, 10),
      overviewRow('后沙峪别墅1店', 5, 10, 10, 10),
    ],
  },
  overviewRow('上海', 60, 20, 20, 20),
  overviewRow('深圳', 20, 20, 20, 20),
  overviewRow('广州', 10, 20, 20, 20),
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

/** 获取某张卡片的展开详情（点击「查看更多」时使用） */
export function getExpandDetailByCardId(cardId: number): OpportunityExpandDetail | undefined {
  return expandDetailsByCardId[cardId]
}

const expandDetailsByCardId: Record<number, OpportunityExpandDetail> = {
  1: {
    propertyHeader: {
      title: '融创北京壹号庄园 · 3号楼2单元1934',
      tags: [
        { text: 'TOP1', type: 'primary' },
        { text: '90房源涨价小', type: 'primary' },
        { text: '纯推荐', type: 'primary' },
        { text: '门牌TOP1', type: 'default' },
      ],
      meta: '3 天未沟通 · 23 天前带看 · 3',
    },
    commission: '50,000 元',
    commissionNote: '预计佣金100万 (50/50)',
    summaryRows: [
      { label: '主因', value: '这里是具体原因' },
      { label: '客户意向', value: '第3次交意向金,交了3个楼盘的意向金' },
      { label: '库存状态', value: '第5次交意向金、目前共有5个意向金, 2300万/2400万/2600万' },
    ],
    sections: [
      {
        title: '原始差距-交意向金时',
        indicatorColor: '#BF9660',
        rows: [
          { label: '客户出价', value: '300万' },
          { label: '业主报价', value: '300万' },
          { label: '当前价格', value: '客户出价 1900万(涨) / 给客户报价 1800万 / 业主报价 2100万(降) / 给业主报价 1990万' },
        ],
      },
      {
        title: '磋商目标及方向',
        indicatorColor: '#F29A15',
        rows: [
          { label: '预计成交', value: '1800-2000万' },
          { label: '客户报价', value: '1800-1900万' },
          { label: '业主报价', value: '2000-2100万' },
        ],
      },
      {
        title: '磋商方向',
        indicatorColor: '#F29A15',
        paragraphs: [
          { title: '一维方向', content: '客户业主双方一推到既' },
          { title: '二三四推', content: '和客户小作文争联现价3轮,电话询诅2轮,主要对比历史成交情况则在售货源' },
        ],
        rows: [
          { label: '关键卡点', value: '【客户】核心是要解决何安全解抵押的风险' },
          { label: '价格卡点', value: '无' },
          { label: '周期差距', value: '无' },
          { label: '落槌类型', value: '客户没有购房资格,正在解决资格问题' },
        ],
      },
      {
        title: '今日进展',
        indicatorColor: '#F29A15',
        rows: [
          { label: '一般进展', value: '事件达成一致；客户出价: 1900万；业主报价: 2100万；客户说了这已约到客户明天面见；业三领了能产权人已回京,约好防天晚上免检' },
          { label: '二般进展', value: '【结果】1套老房新价,让业主重新高价2100万,无合适。【过程】已再次精选了一遍门户型及唱心户型所有在售' },
          { label: '三推进展', value: '【结果】...【过程】...' },
          { label: '四推进展', value: '【结果】...【过程】...' },
        ],
      },
    ],
    nextStep: {
      general: '约客户业主双方今天晚上连夜老奇,尽快地签约',
      second: '红',
      third: '推进展三线内跟踪,关注70客直推售价意向金',
      fourth: '无',
      overall: '这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容',
      dateUser: '2026.01.24 大区经理/证书XXX 录入',
    },
  },
  2: {
    propertyHeader: {
      title: '广渠金茂府 · 20号楼-...1202',
      tags: [
        { text: 'TOP1', type: 'primary' },
        { text: '90房源涨价小', type: 'primary' },
        { text: '纯推荐', type: 'primary' },
        { text: '门牌TOP1', type: 'default' },
      ],
      meta: '3 天未沟通 · 23 天前带看 · 3',
    },
    commission: '50,000 元',
    commissionNote: '预计佣金100万 (50/50)',
    summaryRows: [
      { label: '主因', value: '这里是具体原因' },
      { label: '客户意向', value: '第3次交意向金,交了3个楼盘的意向金' },
      { label: '库存状态', value: '第5次交意向金、目前共有5个意向金, 2300万/2400万/2600万' },
    ],
    sections: [
      {
        title: '原始差距-交意向金时',
        indicatorColor: '#BF9660',
        rows: [
          { label: '客户出价', value: '1700万' },
          { label: '业主报价', value: '2200万' },
          { label: '当前价格', value: '客户出价 1900万(涨) / 给客户报价 1800万 / 业主报价 2100万(降) / 给业主报价 1990万' },
        ],
      },
      {
        title: '磋商目标及方向',
        indicatorColor: '#F29A15',
        rows: [
          { label: '预计成交', value: '1800-2000万' },
          { label: '客户报价', value: '1800-1900万' },
          { label: '业主报价', value: '2000-2100万' },
        ],
      },
      {
        title: '磋商方向',
        indicatorColor: '#F29A15',
        paragraphs: [
          { title: '一维方向', content: '客业双方一推到既' },
          { title: '二三四推', content: '和客户小作文争联现价3轮,电话询诅2轮,主要对比历史成交情况则在售货源' },
        ],
        rows: [
          { label: '关键卡点', value: '【客户】核心是要解决何安全解抵押的风险' },
          { label: '价格卡点', value: '无' },
          { label: '周期差距', value: '无' },
          { label: '落槌类型', value: '客户没有购房资格,正在解决资格问题' },
        ],
      },
      {
        title: '今日进展',
        indicatorColor: '#F29A15',
        rows: [
          { label: '一般进展', value: '事件达成一致；客户出价: 1900万；业主报价: 2100万；客户说了这已约到客户明天面见；业三领了能产权人已回京,约好防天晚上免检' },
          { label: '二般进展', value: '【结果】1套老房新价,让业主重新高价2100万,无合适。【过程】已再次精选了一遍门户型及唱心户型所有在售' },
          { label: '三推进展', value: '推进展三线内跟踪' },
          { label: '四推进展', value: '无' },
        ],
      },
    ],
    nextStep: {
      general: '约客户业主双方今天晚上连夜老奇,尽快地签约',
      second: '红',
      third: '推进展三线内跟踪,关注70客直推售价意向金',
      fourth: '无',
      overall: '这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容这里是具体内容',
      dateUser: '2026.01.24 大区经理/证书XXX 录入',
    },
  },
}

// 为其余卡片复用 id=2 的展开结构（或可后续按需区分）
;[3, 4, 5].forEach((id) => {
  const base = expandDetailsByCardId[2]
  if (base) {
    const card = opportunityCards.find((c) => c.id === id)
    expandDetailsByCardId[id] = {
      ...base,
      propertyHeader: {
        ...base.propertyHeader,
        title: card?.property ?? base.propertyHeader.title,
      },
    }
  }
})

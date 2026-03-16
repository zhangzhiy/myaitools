export interface ChatReportMessage {
  id: number
  sender: string
  title: string
  detail: string
  date: string
}

export const chatReportList: ChatReportMessage[] = [
  {
    id: 1,
    sender: 'Tony',
    title: '城市 【北京】 3月24日商机汇报',
    detail: '100 保笔 12 个 / 90 商机 20 个 / 80 商机 20 个 / 70 商机 10 个',
    date: '3月24日',
  },
  {
    id: 2,
    sender: 'KIKI',
    title: '【北京-新房项目部】 3月24日商机汇报',
    detail: '100 保笔 12 个 / 90 商机 20 个 / 80 商机 20 个 / 70 商机 10 个',
    date: '3月24日',
  },
  {
    id: 3,
    sender: 'Libby',
    title: '城市 【深圳】 3月24日商机汇报',
    detail: '100 保笔 12 个 / 90 商机 20 个 / 80 商机 20 个 / 70 商机 10 个',
    date: '3月24日',
  },
]

export function getChatReportById(id: number): ChatReportMessage | undefined {
  return chatReportList.find((item) => item.id === id)
}

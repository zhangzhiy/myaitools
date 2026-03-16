export interface StatCard {
  title: string
  value: string
  unit: string
  trend: 'up' | 'down'
  trendValue: string
  icon: string
  color: string
}

export interface Activity {
  id: number
  user: string
  action: string
  target: string
  time: string
  avatar: string
}

export interface TodoItem {
  id: number
  title: string
  status: 'pending' | 'done' | 'overdue'
  deadline: string
}

export const statCards: StatCard[] = [
  { title: '项目总数', value: '128', unit: '个', trend: 'up', trendValue: '12%', icon: 'FolderOpened', color: '#409EFF' },
  { title: '活跃用户', value: '2,845', unit: '人', trend: 'up', trendValue: '8.5%', icon: 'User', color: '#67C23A' },
  { title: '本月收入', value: '56.8', unit: '万', trend: 'down', trendValue: '3.2%', icon: 'Money', color: '#E6A23C' },
  { title: '待处理工单', value: '36', unit: '个', trend: 'up', trendValue: '15%', icon: 'Bell', color: '#F56C6C' },
]

export const activities: Activity[] = [
  { id: 1, user: '李明', action: '创建了项目', target: '智慧园区平台', time: '5 分钟前', avatar: '' },
  { id: 2, user: '王芳', action: '完成了任务', target: '数据看板开发', time: '20 分钟前', avatar: '' },
  { id: 3, user: '赵强', action: '提交了代码', target: '用户模块重构', time: '1 小时前', avatar: '' },
  { id: 4, user: '陈丽', action: '发布了版本', target: 'v2.3.1', time: '2 小时前', avatar: '' },
  { id: 5, user: '刘伟', action: '回复了评论', target: '需求评审#42', time: '3 小时前', avatar: '' },
  { id: 6, user: '张三', action: '更新了文档', target: 'API 接口规范', time: '4 小时前', avatar: '' },
]

export const todoList: TodoItem[] = [
  { id: 1, title: '完成首页设计稿评审', status: 'pending', deadline: '2026-03-17' },
  { id: 2, title: '部署测试环境', status: 'done', deadline: '2026-03-15' },
  { id: 3, title: '更新项目周报', status: 'overdue', deadline: '2026-03-14' },
  { id: 4, title: '整理 API 文档', status: 'pending', deadline: '2026-03-18' },
  { id: 5, title: '代码 Review - 支付模块', status: 'pending', deadline: '2026-03-19' },
]

export const chartData = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月'],
  projectCount: [18, 25, 30, 22, 35, 42],
  userGrowth: [320, 480, 550, 620, 780, 920],
}

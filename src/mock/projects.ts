export interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  progress: number
  owner: string
  members: number
  createdAt: string
  updatedAt: string
  tags: string[]
}

export const projectStatusMap: Record<string, { label: string; type: 'success' | 'warning' | 'info' }> = {
  active: { label: '进行中', type: 'success' },
  paused: { label: '已暂停', type: 'warning' },
  completed: { label: '已完成', type: 'info' },
}

export const projects: Project[] = [
  {
    id: 1, name: '智慧园区平台', description: '基于物联网的智慧园区综合管理系统，包含设备监控、能耗分析等功能',
    status: 'active', progress: 68, owner: '李明', members: 8, createdAt: '2026-01-10', updatedAt: '2026-03-15', tags: ['IoT', 'Vue3', '大屏'],
  },
  {
    id: 2, name: '电商后台管理', description: '多租户电商运营管理后台，支持商品管理、订单处理、营销活动等',
    status: 'active', progress: 45, owner: '王芳', members: 6, createdAt: '2026-02-01', updatedAt: '2026-03-14', tags: ['电商', 'TypeScript', 'Element Plus'],
  },
  {
    id: 3, name: '数据分析平台', description: '企业级数据可视化分析平台，支持自定义图表、报表导出等功能',
    status: 'completed', progress: 100, owner: '赵强', members: 5, createdAt: '2025-10-15', updatedAt: '2026-02-28', tags: ['BI', 'ECharts', '报表'],
  },
  {
    id: 4, name: '移动端 App', description: '面向 C 端用户的移动应用，提供预约、支付、消息推送等服务',
    status: 'active', progress: 32, owner: '陈丽', members: 10, createdAt: '2026-02-20', updatedAt: '2026-03-16', tags: ['UniApp', '微信', '支付'],
  },
  {
    id: 5, name: 'CRM 客户管理', description: '客户关系管理系统，集成客户跟进、合同管理、数据统计',
    status: 'paused', progress: 55, owner: '刘伟', members: 4, createdAt: '2025-11-05', updatedAt: '2026-01-20', tags: ['CRM', '销售', '报表'],
  },
  {
    id: 6, name: 'OA 审批系统', description: '企业 OA 流程审批，支持自定义工作流、电子签章、移动审批',
    status: 'active', progress: 78, owner: '张三', members: 7, createdAt: '2025-12-01', updatedAt: '2026-03-12', tags: ['OA', '工作流', '审批'],
  },
]

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id)
}

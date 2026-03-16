export interface UserRecord {
  id: number
  name: string
  email: string
  phone: string
  role: '管理员' | '开发者' | '项目经理' | '设计师' | '测试'
  department: string
  status: 'active' | 'inactive'
  joinDate: string
}

export const roleOptions = ['管理员', '开发者', '项目经理', '设计师', '测试'] as const
export const departmentOptions = ['技术部', '产品部', '设计部', '运营部', '市场部'] as const

export const users: UserRecord[] = [
  { id: 1, name: '张三', email: 'zhangsan@demo.com', phone: '138****1234', role: '管理员', department: '技术部', status: 'active', joinDate: '2024-03-15' },
  { id: 2, name: '李明', email: 'liming@demo.com', phone: '139****5678', role: '开发者', department: '技术部', status: 'active', joinDate: '2024-06-01' },
  { id: 3, name: '王芳', email: 'wangfang@demo.com', phone: '137****9012', role: '项目经理', department: '产品部', status: 'active', joinDate: '2024-01-10' },
  { id: 4, name: '赵强', email: 'zhaoqiang@demo.com', phone: '136****3456', role: '开发者', department: '技术部', status: 'active', joinDate: '2024-09-20' },
  { id: 5, name: '陈丽', email: 'chenli@demo.com', phone: '135****7890', role: '设计师', department: '设计部', status: 'active', joinDate: '2025-01-05' },
  { id: 6, name: '刘伟', email: 'liuwei@demo.com', phone: '133****2345', role: '测试', department: '技术部', status: 'inactive', joinDate: '2024-07-15' },
  { id: 7, name: '周燕', email: 'zhouyan@demo.com', phone: '131****6789', role: '项目经理', department: '运营部', status: 'active', joinDate: '2024-11-01' },
  { id: 8, name: '吴鹏', email: 'wupeng@demo.com', phone: '132****0123', role: '开发者', department: '技术部', status: 'active', joinDate: '2025-02-14' },
]

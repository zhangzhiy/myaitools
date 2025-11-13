// 工具信息类型定义
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  icon: string;
  status: 'active' | 'developing' | 'deprecated';
  createdAt: string;
  updatedAt: string;
}

// 分类信息类型定义
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// 工具配置数据类型
export interface ToolsConfig {
  tools: Tool[];
  categories: Category[];
}
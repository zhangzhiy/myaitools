import { Category, Tool } from '@/types';
import ToolCard from './ToolCard';

interface CategorySectionProps {
  category: Category;
  tools: Tool[];
}

export default function CategorySection({ category, tools }: CategorySectionProps) {
  const categoryTools = tools.filter(tool => tool.category === category.id);

  if (categoryTools.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      {/* 分类标题 */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{category.description}</p>
        </div>
      </div>

      {/* 工具卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
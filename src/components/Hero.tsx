import { ToolsConfig } from '@/types';

interface HeroProps {
  config: ToolsConfig;
}

export default function Hero({ config }: HeroProps) {
  const totalTools = config.tools.length;
  const activeTools = config.tools.filter(tool => tool.status === 'active').length;
  const categoriesCount = config.categories.length;

  const stats = [
    { label: '工具总数', value: totalTools },
    { label: '可用工具', value: activeTools },
    { label: '分类数量', value: categoriesCount },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 主标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              智工具集
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            发现和探索最优质的AI工具、开发工具、效率工具和设计工具。
            让你的工作和学习更加高效，释放创造力的无限可能。
          </p>

          {/* 统计数据 */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA按钮 */}
          <div className="flex justify-center space-x-4">
            <a
              href="#tools"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              浏览工具
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              提交工具
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
import toolsConfigRaw from '@/data/tools.json';
import { ToolsConfig } from '@/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';

// 类型断言
const toolsConfig: ToolsConfig = toolsConfigRaw as ToolsConfig;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <Hero config={toolsConfig} />

        <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {toolsConfig.categories.map(category => (
              <CategorySection
                key={category.id}
                category={category}
                tools={toolsConfig.tools}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 智工具集. 致力于发现和分享最优质的工具.
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                GitHub
              </a>
              <a
                href="mailto:contact@myaitools.cloud"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                联系我们
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

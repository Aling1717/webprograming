import React, { useState } from 'react';
// 导入管理组件
import ProjectManager from '../components/admin/ProjectManager.jsx';
import BlogManager from '../components/admin/BlogManager.jsx';

function AdminDashboard() {
  // 状态管理来切换当前活动视图：'projects' 或 'blog'
  const [activeView, setActiveView] = useState('projects'); 

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">
        🔐 管理仪表盘 (Admin Dashboard)
      </h1>
      
      {/* 视图切换导航 */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView('projects')}
            // 动态应用 Tailwind 样式来突出显示当前活动的 Tab
            className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out ${
              activeView === 'projects'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            管理项目 (Projects)
          </button>
          <button
            onClick={() => setActiveView('blog')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out ${
              activeView === 'blog'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            管理博客 (Blog Posts)
          </button>
        </nav>
      </div>

      {/* 渲染当前活动视图的组件 */}
      <div className="mt-8">
        {activeView === 'projects' ? (
          <ProjectManager />
        ) : (
          <BlogManager />
        )}
      </div>

    </div>
  );
}

export default AdminDashboard;
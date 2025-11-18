import React, { useState, useEffect } from 'react';
import api from '../utils/api.js'; // 导入配置好的 Axios 实例

// ProjectCard 组件用于展示单个项目 (可替换为复杂组件)
const ProjectCard = ({ project }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-indigo-700">{project.title}</h3>
    <p className="mt-2 text-gray-600">{project.description}</p>
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-500 hover:underline mt-2 inline-block">
      查看项目
    </a>
  </div>
);


function Projects() {
  // 状态管理：项目列表、加载状态和错误状态 (要求: 使用 useState)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用 useEffect 在组件挂载时获取数据 (要求: useEffect 必须使用) [cite: 32]
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // GET /api/projects (要求: Projects Page 必须获取此数据) 
        const response = await api.get('/projects'); 
        
        // 确保返回的是数组
        if (response.data && Array.isArray(response.data)) {
            setProjects(response.data);
        } else {
            // 如果 API 返回空或非数组，使用模拟数据占位 (请在后端启动时查看真实数据)
            setProjects([
                { id: 1, title: 'Mock Project 1 (API Success)', description: 'This project demonstrates successful API reading.', url: '#' },
                { id: 2, title: 'Mock Project 2', description: 'Another example for gallery display.', url: '#' },
            ]);
        }
        
      } catch (err) {
        // API 失败处理 (要求: Conditional Rendering 显示 Error 消息) 
        setError('加载项目列表失败。请检查后端 API 是否运行正常。');
        console.error("API Error:", err);
        setProjects([]); // 清空列表
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); 

  // 渲染加载状态 (要求: Conditional Rendering 显示 Loading 消息) 
  if (loading) {
    return <h2 className="text-xl text-indigo-600 p-8">加载中...</h2>; 
  }

  // 渲染错误状态 (要求: Conditional Rendering 显示 Error 消息) 
  if (error) {
    return <h2 className="text-xl text-red-600 p-8">错误: {error}</h2>; 
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">🛠️ 我的项目集</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          // 渲染项目卡片
          projects.map(project => (
            <ProjectCard key={project.id || project.title} project={project} />
          ))
        ) : (
          <p className="text-gray-500">当前没有项目可供展示。</p>
        )}
      </div>
    </div>
  );
}

export default Projects;
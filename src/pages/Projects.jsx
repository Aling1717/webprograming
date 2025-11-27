import React, { useState, useEffect } from 'react';
import api from '../utils/api.js'; // 导入配置好的 Axios 实例

// ProjectCard 组件用于展示单个项目
const ProjectCard = ({ project }) => {
  // 确保链接地址使用 liveUrl 或 repoUrl 字段 (Admin Form 中填写的字段)
  const linkUrl = project.liveUrl || project.repoUrl || '#';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-indigo-700">{project.title}</h3>
      <p className="mt-2 text-gray-600">{project.description}</p>
      
      {/* 修复：确保 href 属性被正确渲染 */}
      <a 
        href={linkUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-sm text-indigo-500 hover:underline mt-2 inline-block"
      >
        查看项目
      </a>
    </div>
  );
};


function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects'); 
        
        if (response.data && Array.isArray(response.data)) {
            setProjects(response.data);
        } else {
            // 模拟数据占位 (因为后端未运行)
            setProjects([
                { id: 1, title: 'Mock Project 1 (API Success)', description: 'Displaying data from API response.', repoUrl: 'https://github.com/fallback' },
            ]);
        }
        
      } catch (err) {
        setError('加载项目列表失败。请检查后端 API 是否运行正常。');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); 

  // 渲染加载/错误状态
  if (loading) return <h2 className="text-xl text-indigo-600 p-8">加载中...</h2>; 
  if (error) return <h2 className="text-xl text-red-600 p-8">错误: {error}</h2>; 

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">🛠️ 我的项目集</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map(project => (
            <ProjectCard key={project._id || project.title} project={project} />
          ))
        ) : (
          <p className="text-gray-500">当前没有项目可供展示。</p>
        )}
      </div>
    </div>
  );
}

export default Projects;
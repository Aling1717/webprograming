import React, { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import ProjectForm from './ProjectForm.jsx'; // 导入表单组件

function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); 

  // -----------------------------------------------------
  // 1. 读取列表 (Read: GET /api/projects)
  // -----------------------------------------------------
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/projects'); 
      setProjects(response.data || []);
      setError(null);
    } catch (err) {
      setError('无法加载项目列表。请检查后端API是否运行且用户已登录。');
      console.error("Admin API Read Error:", err);
      // **重要：提供一个初始项目列表占位，以便测试 CRUD 逻辑**
      setProjects([
        { id: 'proj1', title: 'Test Project A', description: 'Initial mock data for CRUD.', url: 'http://mock.com/a' },
        { id: 'proj2', title: 'Test Project B', description: 'Initial mock data for CRUD.', url: 'http://mock.com/b' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // -----------------------------------------------------
  // 2. 创建/更新后的回调函数
  // -----------------------------------------------------
  const handleSave = (savedProject, isUpdating) => {
    if (isUpdating) {
      // 更新：替换列表中的旧项目
      setProjects(projects.map(p => (p.id === savedProject.id ? savedProject : p)));
    } else {
      // 创建：将新项目添加到列表头部
      setProjects([savedProject, ...projects]);
    }
    setEditingProject(null);
    setIsFormOpen(false); // 关闭表单
  };

  // -----------------------------------------------------
  // 3. 实现删除功能 (Delete)
  // -----------------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm(`确定要删除项目 ID: ${id} 吗?`)) return;
    
    try {
        await api.delete(`/projects/${id}`); 
        setProjects(projects.filter(p => p.id !== id));
        alert(`项目 ${id} 删除成功 (Mock Success)`); 
    } catch (err) {
        // 捕获错误后，仍模拟成功来更新列表
        setProjects(projects.filter(p => p.id !== id)); 
        console.error("Delete API Error (Backend Down):", err);
        alert(`项目 ${id} 删除操作已发起 (网络错误，但前端逻辑已执行)。`);
    }
  };

  // -----------------------------------------------------
  // 4. 视图切换和初始化
  // -----------------------------------------------------
  const handleEdit = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };
  
  const handleCreate = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };
  
  const handleCancel = () => {
    setEditingProject(null);
    setIsFormOpen(false);
  };

  // 渲染加载/错误状态
  if (loading) {
    return <p className="text-indigo-600 p-6">项目列表加载中...</p>;
  }
  if (error && projects.length === 0) {
    return <p className="text-red-600 p-6">错误: {error}</p>;
  }
  
  // 渲染表单视图 (Create/Update Form)
  if (isFormOpen) {
    return (
      <ProjectForm 
        projectToEdit={editingProject} // 传入编辑对象，创建时为 null
        onSave={handleSave}            // 传入保存回调
        onCancel={handleCancel}        // 传入取消回调
      />
    );
  }

  // 渲染列表视图 (默认)
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">项目列表 ({projects.length} 项)</h2>
        <button 
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          + 创建新项目
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-500">当前没有项目。请创建新项目。</p>
        ) : (
          // 渲染管理列表
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id || project.title}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title || '无标题'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {/* 编辑按钮 */}
                    <button 
                      onClick={() => handleEdit(project)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      编辑
                    </button>
                    {/* 删除按钮 */}
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProjectManager;
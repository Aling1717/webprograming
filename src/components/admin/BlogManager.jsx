import React, { useState, useEffect } from 'react';
import api from '../../utils/api.js';
import BlogForm from './BlogForm.jsx'; // 导入表单组件

function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null); 

  // -----------------------------------------------------
  // 1. 读取列表 (Read: GET /api/blog)
  // -----------------------------------------------------
  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/blog'); 
      setPosts(response.data || []);
      setError(null);
    } catch (err) {
      setError('无法加载博客列表。请确认后端API正在运行且用户已登录。');
      console.error("Admin API Read Error:", err);
      // **重要：提供一个初始列表占位，以便测试 CRUD 逻辑**
      setPosts([
        { id: 'blog1', title: 'Mock Blog Post 1', publishedDate: '2025-11-17', content: 'Mock content.' },
        { id: 'blog2', title: 'Mock Blog Post 2', publishedDate: '2025-11-16', content: 'Mock content.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // -----------------------------------------------------
  // 2. 创建/更新后的回调函数
  // -----------------------------------------------------
  const handleSave = (savedPost, isUpdating) => {
    if (isUpdating) {
      // 更新：替换列表中的旧文章
      setPosts(posts.map(p => (p.id === savedPost.id ? savedPost : p)));
    } else {
      // 创建：将新文章添加到列表头部
      setPosts([savedPost, ...posts]);
    }
    setEditingPost(null);
    setIsFormOpen(false); // 关闭表单
  };

  // -----------------------------------------------------
  // 3. 实现删除功能 (Delete: DELETE /api/blog/:id)
  // -----------------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm(`确定要删除文章 ID: ${id} 吗?`)) return;
    
    try {
        // DELETE /api/blog/:id (项目要求)
        await api.delete(`/blog/${id}`); 
        setPosts(posts.filter(p => p.id !== id));
        alert(`文章 ${id} 删除成功 (Mock Success)`); 
    } catch (err) {
        // 捕获错误后，仍模拟成功来更新列表
        setPosts(posts.filter(p => p.id !== id)); 
        console.error("Delete API Error (Backend Down):", err);
        alert(`文章 ${id} 删除操作已发起 (网络错误，但前端逻辑已执行)。`);
    }
  };

  // -----------------------------------------------------
  // 4. 视图切换和初始化
  // -----------------------------------------------------
  const handleEdit = (post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };
  
  const handleCreate = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };
  
  const handleCancel = () => {
    setEditingPost(null);
    setIsFormOpen(false);
  };

  // 渲染加载/错误状态
  if (loading) {
    return <p className="text-green-600 p-6">博客列表加载中...</p>;
  }
  if (error && posts.length === 0) {
    return <p className="text-red-600 p-6">错误: {error}</p>;
  }
  
  // 渲染表单视图 (Create/Update Form)
  if (isFormOpen) {
    return (
      <BlogForm 
        postToEdit={editingPost} // 传入编辑对象，创建时为 null
        onSave={handleSave}      // 传入保存回调
        onCancel={handleCancel}  // 传入取消回调
      />
    );
  }

  // 渲染列表视图 (默认)
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">博客文章列表 ({posts.length} 项)</h2>
        <button 
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
        >
          + 创建新文章
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">当前没有文章。请创建新文章。</p>
        ) : (
          // 渲染管理列表
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id || post.title}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title || '无标题'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.publishedDate || '未知'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {/* 编辑按钮 */}
                    <button 
                      onClick={() => handleEdit(post)}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      编辑
                    </button>
                    {/* 删除按钮 */}
                    <button 
                      onClick={() => handleDelete(post.id)}
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

export default BlogManager;
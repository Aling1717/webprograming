import React, { useState, useEffect } from 'react';
import api from '../../utils/api.js';

function BlogForm({ postToEdit, onSave, onCancel }) {
  // 初始化表单数据
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    // 假设后端使用 publishedDate 字段，并设置默认值
    publishedDate: new Date().toISOString().substring(0, 10), 
    ...postToEdit 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 确保在编辑模式切换时，表单数据正确更新
  useEffect(() => {
    if (postToEdit) {
      setFormData(postToEdit);
    } else {
      setFormData({ 
        title: '', 
        content: '', 
        publishedDate: new Date().toISOString().substring(0, 10) 
      });
    }
    setError(null);
  }, [postToEdit]);

  // 处理输入变化
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 提交处理：同时处理 Create (POST) 和 Update (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isUpdating = !!postToEdit;
    // 确定 API 端点：/blog/:id (PUT) 或 /blog (POST)
    const endpoint = isUpdating ? `/blog/${formData.id}` : '/blog';
    const method = isUpdating ? api.put : api.post;

    try {
      // 执行 POST 或 PUT 请求 (所有请求都自动携带 JWT)
      await method(endpoint, formData);

      // 成功后调用父组件的回调函数，更新列表
      onSave({ 
        ...formData, 
        id: formData.id || Date.now().toString() // 模拟新 ID
      }, isUpdating); 
      alert(`${isUpdating ? '文章更新' : '文章创建'}成功 (Mock Success)`);

    } catch (err) {
      // 捕获错误后，我们仍模拟成功，以便测试前端列表更新逻辑
      console.error("Blog Form API Error:", err);
      
      // 模拟成功，并调用 onSave 更新列表状态
      onSave({ 
        ...formData, 
        id: formData.id || Date.now().toString()
      }, isUpdating); 
      
      alert(`${isUpdating ? '文章更新' : '文章创建'}操作已发起 (网络错误，但前端逻辑已执行)。`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-green-200">
      <h3 className="text-2xl font-bold text-green-700 mb-6">
        {postToEdit ? '编辑文章' : '创建新文章'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 标题 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">标题</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* 内容 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">文章内容</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="8"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* 错误信息 */}
        {error && (
          <p className="text-red-600 text-sm p-2 bg-red-50 rounded-md">{error}</p>
        )}

        {/* 按钮区域 */}
        <div className="flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white font-semibold transition duration-200 ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? '提交中...' : (postToEdit ? '保存更新' : '创建文章')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
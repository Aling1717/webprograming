import React, { useState } from 'react';
import api from '../utils/api.js';

function Contact() {
  // 状态管理：表单输入、加载状态、错误状态和成功状态
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 处理输入变化，实现受控表单 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // 重置状态
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // 提交处理：POST 数据到 POST /api/contact 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError('请填写所有必需的字段。');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // POST 数据到 API 
      await api.post('/contact', formData); 
      
      // 成功处理
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // 清空表单
      
    } catch (err) {
      // API 失败处理
      setError('消息发送失败。请检查 API 是否运行正常。');
      console.error("Contact API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-yellow-600 mb-6">📧 联系我</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 姓名输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">姓名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* 邮箱输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* 消息输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">消息</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* 错误和成功信息 */}
        {error && (
          <p className="text-red-600 text-sm p-2 bg-red-50 rounded-md">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm p-2 bg-green-50 rounded-md">
            消息已成功发送！感谢您的留言。
          </p>
        )}

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md text-white font-semibold transition duration-200 ${
            loading ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
          }`}
        >
          {loading ? '发送中...' : '发送消息'}
        </button>
      </form>
    </div>
  );
}

export default Contact;
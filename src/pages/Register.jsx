import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  // 使用 useState 管理表单输入，需要用户名、邮箱和两次密码
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // 用于显示注册成功信息

  const navigate = useNavigate();

  // 处理输入变化，实现受控表单
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  // 提交处理：未来将 POST 数据到 POST /api/users/register 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 客户端验证：检查密码是否一致
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致。');
      return;
    }
    if (!formData.username || !formData.email || !formData.password) {
      setError('请填写所有必需的字段。');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // --- 占位符：模拟 API 注册成功响应 ---
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      // 模拟注册成功
      setSuccess(true);
      
      // 注册成功后，延时跳转到登录页面
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);

    } catch (err) {
      // 实际项目中: 处理 API 错误
      setError('注册失败，请稍后再试。');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-green-600 mb-6">📝 注册</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 用户名输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">用户名</label>
          <input
            type="text"
            name="username"
            value={formData.username}
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

        {/* 密码输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">密码</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* 确认密码输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">确认密码</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* 错误和成功信息 */}
        {error && (
          <p className="text-red-600 text-sm p-2 bg-red-50 rounded-md">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm p-2 bg-green-50 rounded-md">
            注册成功！正在跳转到登录页面...
          </p>
        )}

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading || success}
          className={`w-full py-2 px-4 border border-transparent rounded-md text-white font-semibold transition duration-200 ${
            (loading || success) ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? '注册中...' : '注册'}
        </button>
      </form>
    </div>
  );
}

export default Register;
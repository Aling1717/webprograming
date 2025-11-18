import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

function Login() {
  // 使用 useState 管理表单输入
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  // 使用 useState 管理加载和错误状态 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 获取全局状态和路由导航
  const { login } = useAuth();
  const navigate = useNavigate();

  // 处理输入变化，实现受控表单 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // 输入时清除错误
  };

  // 提交处理：未来将 POST 数据到 POST /api/users/login 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      setError('请输入用户名/邮箱和密码。');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // --- 占位符：模拟 API 登录成功响应 ---
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      // 模拟后端返回的数据和 token
      const mockUserData = {
        id: '1',
        email: formData.identifier,
        username: 'Admin User',
      };
      const mockToken = 'jwt-token-from-backend-12345';
      
      // 调用全局 login 函数更新认证状态 
      login(mockUserData, mockToken);
      
      // 登录成功后，跳转到 Admin Dashboard
      navigate('/admin', { replace: true });

    } catch (err) {
      // 实际项目中: 处理 API 错误
      setError('登录失败，请检查您的凭证。');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">🔑 登录</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 用户名/邮箱输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">用户名或邮箱</label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
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

        {/* 错误信息 [cite: 36] */}
        {error && (
          <p className="text-red-600 text-sm p-2 bg-red-50 rounded-md">{error}</p>
        )}

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md text-white font-semibold transition duration-200 ${
            loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
}

export default Login;
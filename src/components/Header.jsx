import React from 'react';
import { Link } from 'react-router-dom';
// 导入自定义 Hook
import { useAuth } from '../context/AuthContext.jsx'; 

function Header() {
  // 使用 useAuth Hook 来获取全局认证状态和登出函数
  const { isAuthenticated, user, logout } = useAuth();

  // 登出按钮的点击事件处理
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* 1. Logo / Home 链接 */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
          My Portfolio
        </Link>
        
        {/* 2. 主导航链接 */}
        <nav className="flex space-x-6">
          <Link to="/projects" className="text-gray-600 hover:text-indigo-600">Projects</Link>
          <Link to="/blog" className="text-gray-600 hover:text-indigo-600">Blog</Link>
          <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
        </nav>
        
        {/* 3. 认证相关链接 (Auth-Aware Section) */}
        <div className="space-x-4 flex items-center">
          {isAuthenticated ? (
            // 如果已认证，显示 Admin Dashboard 链接和 Logout 按钮
            <>
              {/* 可选：显示用户名 */}
              {user && <span className="text-sm text-gray-500 mr-2">Hello, {user.username}</span>}
              
              <Link to="/admin" className="text-indigo-600 font-medium hover:underline">
                Admin Dashboard
              </Link>
              <button 
                onClick={handleLogout} // 添加登出事件
                className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            // 如果未认证，显示 Login 和 Register 链接
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                Login
              </Link>
              <Link to="/register" className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700 transition-colors duration-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
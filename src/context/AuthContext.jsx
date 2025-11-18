import React, { createContext, useContext, useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';

// 1. 创建 Context 对象
const AuthContext = createContext(null);

// 2. 创建自定义 Hook，用于在任何组件中获取认证状态
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. 创建 Provider 组件：用于管理和分发全局认证状态
export const AuthProvider = ({ children }) => {
  // 用户的身份信息，初始从 localStorage 中获取 (模拟持久化)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  
  // 认证状态 (true/false)
  const isAuthenticated = useMemo(() => !!user, [user]);

  // 登录函数：负责存储用户数据和 token
  const login = (userData, token) => {
    const userState = { ...userData, token, username: 'Admin User' }; 
    setUser(userState);
    localStorage.setItem('user', JSON.stringify(userState));
  };

  // 登出函数：负责清除状态和本地存储
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // 暴露给外部组件的状态和方法
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout,
  }), [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. 创建 ProtectedRoute 组件：用于保护路由
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // 项目要求：如果未登录，必须重定向到 /login 页面 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
import axios from 'axios';

// 从环境变量获取后端 API 的基础 URL
// 部署时，需要设置 VITE_API_BASE_URL 环境变量 (例如：https://your-deployed-api.com/api)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// 1. 创建 Axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. 实现请求拦截器 (Request Interceptor)
// 拦截器在每次发送请求前执行，用于自动附加认证 Token
api.interceptors.request.use(
  (config) => {
    // 从本地存储获取用户数据 (包含 token)
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      // 检查是否存在 token，如果存在，将其附加到请求头中
      // 格式必须是 Authorization: Bearer <token> 
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 3. 导出 Axios 实例，供应用中的其他地方使用
export default api;
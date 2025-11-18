import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js'; // 导入配置好的 Axios 实例

// BlogCard 组件用于展示单个博客文章（可替换为复杂组件）
const BlogCard = ({ post }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
    <p className="text-sm text-gray-500 mb-4">
      发布日期: {post.publishedDate || '未知'}
    </p>
    {/* 截取部分内容作为摘要 */}
    <p className="text-gray-600 mb-4">{post.summary || post.content.substring(0, 150) + '...'}</p>
    
    {/* 点击卡片跳转到详情页 */}
    <Link to={`/blog/${post.id}`} className="text-indigo-600 font-medium hover:underline">
      阅读全文 &rarr;
    </Link>
  </div>
);


function BlogList() {
  // 状态管理：文章列表、加载状态和错误状态
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用 useEffect 在组件挂载时获取数据
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // GET /api/blog (要求: Blog Page 必须获取此数据)
        const response = await api.get('/blog'); 
        
        // 确保返回的是数组
        if (response.data && Array.isArray(response.data)) {
            setPosts(response.data);
        } else {
            // 如果 API 返回空或非数组，使用模拟数据占位
            setPosts([
                { id: 1, title: 'Mock Post 1: Full-Stack Development', summary: '这是关于全栈开发的最新趋势和技术介绍。', publishedDate: '2025-05-01' },
                { id: 2, title: 'Mock Post 2: React State Management', summary: '深入探讨 React 中的各种状态管理解决方案：Context, Redux, Zustand等。', publishedDate: '2025-04-15' },
            ]);
        }
        
      } catch (err) {
        // API 失败处理
        setError('加载博客列表失败。请检查后端 API 是否运行正常。');
        console.error("API Error:", err);
        setPosts([]); // 清空列表
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []); 

  // 渲染加载状态
  if (loading) {
    return <h2 className="text-xl text-indigo-600 p-8">加载中...</h2>; 
  }

  // 渲染错误状态
  if (error) {
    return <h2 className="text-xl text-red-600 p-8">错误: {error}</h2>; 
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">📰 博客文章</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          // 渲染文章卡片
          posts.map(post => (
            <BlogCard key={post.id || post.title} post={post} />
          ))
        ) : (
          <p className="text-gray-500">当前没有博客文章可供展示。</p>
        )}
      </div>
    </div>
  );
}

export default BlogList;
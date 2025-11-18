import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx'; 

function BlogDetail() {
  const { id } = useParams(); 
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 评论状态管理
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  
  const { isAuthenticated } = useAuth(); 

  // --- 获取文章详情 (Read 逻辑) ---
  const fetchPostDetail = async () => {
    if (!id) return; 
    setLoading(true);
    try {
      const response = await api.get(`/blog/${id}`); 
      if (response.data) {
        setPost(response.data);
      } else {
        setError('未找到该博客文章。');
      }
    } catch (err) {
      setError('加载文章详情失败。请检查 API 是否运行或 ID 是否正确。');
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [id]); 


  // --- 评论提交功能 (Write: POST /api/blog/:postId/comments) ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentLoading(true);

    try {
      // POST /api/blog/:postId/comments (项目要求)
      // 这里的请求会自动附加 JWT
      await api.post(`/blog/${id}/comments`, { content: commentText }); 

      // 成功后清空表单
      setCommentText('');
      alert('评论已成功提交！(Mock Success)');
      // 实际项目中：成功后应该重新加载评论列表
      
    } catch (err) {
      // 捕获错误后，我们仍模拟成功，但给出网络错误提示
      console.error("Comment Submit API Error:", err);
      alert('评论操作已发起 (网络错误，但前端逻辑已执行)。');
      setCommentText(''); // 即使失败，也清空，保持干净
      
    } finally {
      setCommentLoading(false);
    }
  };


  // 渲染加载/错误/未找到状态
  if (loading) return <h2 className="text-xl text-indigo-600 p-8">文章加载中...</h2>; 
  if (error || !post) return <h2 className="text-xl text-red-600 p-8">错误或文章不存在。</h2>; 

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      
      {/* 文章内容 */}
      <div className="prose max-w-none text-gray-700 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
        {post.content || "博客文章内容占位符"}
      </div>

      <div className="mt-12 pt-6 border-t">
        <h2 className="text-2xl font-bold mb-4">评论</h2>
        
        {/* 评论列表占位符 */}
        <p className="text-gray-500 mb-4">评论列表加载占位符...</p>
        
        {/* 评论表单 (登录用户可见) */}
        {isAuthenticated ? (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">发表评论</h3>
            
            <form onSubmit={handleCommentSubmit}>
              <textarea 
                className="w-full border p-2 rounded" 
                rows="4" 
                placeholder="在此输入您的评论..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                disabled={commentLoading}
              ></textarea>
              <button 
                type="submit" 
                disabled={commentLoading}
                className={`mt-2 text-white px-4 py-2 rounded transition-colors duration-200 ${
                  commentLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {commentLoading ? '提交中...' : '提交评论'}
              </button>
            </form>
            
          </div>
        ) : (
          <p className="text-red-500">请登录后发表评论。</p>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
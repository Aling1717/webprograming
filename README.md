# Full-Stack Portfolio SPA (前端)

该项目是 Web 编程课程的 Capstone 考核项目，旨在构建一个完整的、全栈的作品集单页应用 (SPA)。

该应用使用 React 和 Tailwind CSS 构建，并通过 Axios 实例与后端 API 进行通信。

## 提交信息 (Submission Links)

项目要求提交以下三个 URL:

| 描述 | 链接 |
| :--- | :--- |
| **Live FRONT-END URL** | [在此粘贴部署后的前端网址] |
| **Live BACK-END URL** | [在此粘贴部署后的后端 API 网址] |
| **Source Code (此仓库)** | [在此粘贴你的 GitHub 仓库链接] |

---

## 核心功能概述

该前端应用实现了 Capstone 项目的所有核心要求：

1.  **完整认证流:** 实现了注册、登录、登出功能，并使用 Context API 管理全局状态。
2.  **受保护路由:** `/admin` 路由受 JWT 保护，未登录用户将被重定向。
3.  **公共 API 集成 (Read & Write):**
    * Projects Page、Blog List/Detail 均从后端获取数据。
    * Contact 表单提交功能已实现。
    * Blog Detail 页面为登录用户提供了评论提交功能。
4.  **Admin Dashboard (CRUD):** 实现了对 Projects 和 Blog Posts 的完整的创建、更新和删除操作。所有管理请求自动携带 `Authorization: Bearer <token>` 请求头。

## 本地运行指南 (前端)

1.  **克隆仓库:** `git clone [此仓库链接]`
2.  **进入项目:** `cd project-folder`
3.  **配置环境:** 在项目根目录创建 `.env.development` 文件，并设置 API 基础地址：
    ```env
    VITE_API_BASE_URL="[你的 API 基础地址，例如 http://localhost:5000/api]"
    ```
4.  **安装依赖:** `npm install`
5.  **运行前端:** `npm run dev`
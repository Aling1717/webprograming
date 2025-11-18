import { Routes, Route } from 'react-router-dom';

// 导入核心组件
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// 导入所有页面组件
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// 导入 ProtectedRoute
import { ProtectedRoute } from './context/AuthContext.jsx'; 

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100"> 
      
      <Header />

      <main className="container mx-auto p-4 flex-grow">
        <Routes>
          {/* --- 公共路由 --- */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 受保护路由  */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard /> 
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
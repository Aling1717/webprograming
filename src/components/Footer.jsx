import React from 'react';

function Footer() {
  return (
    // 使用 Tailwind CSS 添加背景色、文字颜色和内边距
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        <p>
          {/* &copy; 是版权符号, {new Date().getFullYear()} 动态获取当前年份 */}
          &copy; {new Date().getFullYear()} Full-Stack Portfolio Capstone. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
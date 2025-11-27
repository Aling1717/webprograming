import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ABOUT_LINES = [
    "✅ Hi, my name is Pan Yuling",
    "🔐 My student number is 23998120",
    "🛠️ I am a student at Synu.",
    "💡 This time I will show you my website.",
    "🤝 Hope I can get high marks."
];

function Home() {
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        if (lineIndex < ABOUT_LINES.length) {
            const timer = setTimeout(() => {
                setLineIndex(prevIndex => prevIndex + 1);
            }, 1500); 
            return () => clearTimeout(timer);
        }
    }, [lineIndex]);

    return (
        // 使用白色背景和居中布局
        <div className="bg-white min-h-[calc(100vh-64px-40px)] flex items-center justify-center p-6">
            <div className="max-w-4xl mx-auto p-12 shadow-2xl rounded-xl bg-slate-50 border border-slate-200">
                
                {/* 顶部标题区 */}
                <header className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-800">
                        Pan Yuling's final project.
                    </h1>
                </header>

                {/* 逐条出现的信息区域 */}
                <main className="min-h-[150px]"> {/* 保证区域高度 */}
                    <ul className="space-y-4 text-xl text-gray-700 font-medium">
                        {ABOUT_LINES.slice(0, lineIndex).map((line, index) => (
                            <li 
                                key={index} 
                                // 使用自定义动画类
                                className="opacity-0 animate-fadeIn" 
                                style={{ animationDelay: `${index * 0.15}s` }} 
                            >
                                {line}
                            </li>
                        ))}
                    </ul>
                </main>

                {/* 技能和联系按钮 */}
                <footer className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center">

                    <Link
                        to="/contact"
                        // 青色是专业的强调色
                        className="rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
                    >
                        立即联系我
                    </Link>
                </footer>
            </div>
            
            {/* 注入 CSS 动画类 (为了让代码保持简洁，直接写在这里) */}
            <style jsx="true">{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fadeIn {
                animation: fadeIn 0.5s ease-out forwards;
              }
            `}</style>
        </div>
    );
}

export default Home;